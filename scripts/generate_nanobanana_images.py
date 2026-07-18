#!/usr/bin/env python3
"""Generate terminal-node illustration assets with Poe's nano-banana-pro model."""

from __future__ import annotations

import argparse
import base64
from datetime import datetime, UTC
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Any

import requests


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = PROJECT_ROOT / "data" / "data.js"
DEFAULT_OUTPUT_DIR = PROJECT_ROOT / "images"
DEFAULT_SAMPLE_IDS = ["Sphenodontidae", "Testudinidae", "Accipitriformes"]
API_URL = "https://api.poe.com/v1/chat/completions"
DEFAULT_MODEL = "nano-banana-pro"
DEFAULT_STATUS_FILE = PROJECT_ROOT / "data" / "image_generation_status.json"


NODE_LOADER = r"""
const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync(process.argv[1], 'utf8');
const context = { console };
vm.createContext(context);
vm.runInContext(code + '\nglobalThis.__OUT__ = sauropsidaData.families;', context);
process.stdout.write(JSON.stringify(context.__OUT__));
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate representative-species illustrations for terminal nodes."
    )
    parser.add_argument(
        "--api-key",
        default=os.environ.get("POE_API_KEY"),
        help="Poe API key. Defaults to POE_API_KEY.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help="Directory for output PNG files. Defaults to ./images.",
    )
    parser.add_argument(
        "--data-file",
        type=Path,
        default=DATA_FILE,
        help="Path to data/data.js.",
    )
    parser.add_argument(
        "--status-file",
        type=Path,
        default=DEFAULT_STATUS_FILE,
        help=f"Path to the resumable status JSON. Default: {DEFAULT_STATUS_FILE}.",
    )
    parser.add_argument(
        "--ids",
        nargs="+",
        help="Specific terminal node Latin names to generate, e.g. Testudinidae Accipitriformes.",
    )
    parser.add_argument(
        "--model",
        default=DEFAULT_MODEL,
        help=f"Model name. Default: {DEFAULT_MODEL}.",
    )
    parser.add_argument(
        "--sample-set",
        action="store_true",
        help="Generate the curated 3-image sample set.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        help="Generate the first N terminal nodes in data order.",
    )
    parser.add_argument(
        "--missing-limit",
        type=int,
        help="Generate the first N terminal nodes that do not already exist in the output directory.",
    )
    parser.add_argument(
        "--missing-only",
        action="store_true",
        help="Generate all terminal nodes that do not already exist in the output directory.",
    )
    parser.add_argument(
        "--failed-only",
        action="store_true",
        help="Generate only nodes marked as failed in the status file.",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite existing PNG files.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print planned prompts and filenames without calling the API.",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=180,
        help="Per-request timeout in seconds. Default: 180.",
    )
    return parser.parse_args()


def load_terminal_nodes(data_file: Path) -> list[dict[str, Any]]:
    result = subprocess.run(
        ["node", "-e", NODE_LOADER, str(data_file)],
        check=True,
        capture_output=True,
        text=True,
        cwd=PROJECT_ROOT,
    )
    return json.loads(result.stdout)


def now_iso() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def build_prompt(node: dict[str, Any]) -> str:
    taxon_en = node["family_en"]
    taxon_cn = node["family_cn"]
    rank_en = node.get("terminal_rank", "family")
    rank_cn = node.get("terminal_rank_cn", "科")
    representative_species = node.get("representative_species", "").strip()
    parent_node = node.get("parent_node", "")
    description = node.get("description", "").strip()

    return (
        f"Create a single full-body illustration of {representative_species}, the representative species "
        f"for the {rank_en} {taxon_en} ({taxon_cn}, {rank_cn}). "
        f"Taxonomic context: {parent_node}. "
        f"Visual style: vintage scientific illustration / natural history plate from the 18th-19th century. "
        f"Medium: watercolor and ink with a subtle lithograph texture. "
        f"Technique: fine hatching and stippling to render anatomy, feathers, scales, or shell accurately. "
        f"Color palette: muted warm earthy tones. "
        f"Background: mostly blank composition with aged parchment paper texture. "
        f"Composition: one specimen only, centered, horizontal 4:3 framing, museum-plate clarity. "
        f"Avoid labels, text, borders, watermarks, multiple animals, dramatic scenery, and clutter. "
        f"Prioritize anatomical accuracy and restrained scientific elegance. "
        f"Reference note: {description}"
    )


def choose_nodes(args: argparse.Namespace, terminals: list[dict[str, Any]]) -> list[dict[str, Any]]:
    by_id = {node["family_en"]: node for node in terminals}
    existing_names = {
        path.stem for path in args.output_dir.glob("*.png") if path.is_file()
    }
    existing_payload = load_status_file(args.status_file)
    failed_names = {
        name
        for name, job in existing_payload.get("jobs", {}).items()
        if job.get("status") == "failed"
    }

    if args.ids:
        missing = [node_id for node_id in args.ids if node_id not in by_id]
        if missing:
            raise SystemExit(f"Unknown terminal node ids: {', '.join(missing)}")
        return [by_id[node_id] for node_id in args.ids]

    if args.sample_set:
        return [by_id[node_id] for node_id in DEFAULT_SAMPLE_IDS]

    if args.limit:
        return terminals[: args.limit]

    if args.missing_limit:
        missing = [node for node in terminals if node["family_en"] not in existing_names]
        return missing[: args.missing_limit]

    if args.missing_only:
        return [node for node in terminals if node["family_en"] not in existing_names]

    if args.failed_only:
        return [node for node in terminals if node["family_en"] in failed_names]

    return [by_id[node_id] for node_id in DEFAULT_SAMPLE_IDS]


def ensure_ready(node: dict[str, Any]) -> None:
    if not node.get("representative_species"):
        raise SystemExit(f"{node['family_en']} is missing representative_species")


def extract_url(text: str) -> str | None:
    markdown_match = re.search(r"\((https?://[^)\s]+)\)", text)
    if markdown_match:
        return markdown_match.group(1)

    url_match = re.search(r"https?://\S+", text)
    if url_match:
        return url_match.group(0).rstrip(").,]")

    return None


def extract_image_payload(response_json: dict[str, Any]) -> tuple[str, str]:
    choice = response_json["choices"][0]["message"]
    content = choice.get("content")

    if isinstance(content, list):
        for part in content:
            if isinstance(part, dict):
                if isinstance(part.get("image_url"), str):
                    return "url", part["image_url"]
                if isinstance(part.get("url"), str):
                    return "url", part["url"]
                if isinstance(part.get("text"), str):
                    url = extract_url(part["text"])
                    if url:
                        return "url", url

    if isinstance(content, str):
        if content.startswith("data:image/"):
            return "data_url", content
        url = extract_url(content)
        if url:
            return "url", url

    for key in ("image_url", "url"):
        if isinstance(choice.get(key), str):
            return "url", choice[key]

    images = choice.get("images")
    if isinstance(images, list) and images:
        first = images[0]
        if isinstance(first, dict):
            if isinstance(first.get("url"), str):
                return "url", first["url"]
            if isinstance(first.get("b64_json"), str):
                return "b64", first["b64_json"]
        if isinstance(first, str):
            if first.startswith("data:image/"):
                return "data_url", first
            return "b64", first

    raise RuntimeError(
        "Could not find an image payload in the API response. "
        f"Top-level keys: {list(response_json.keys())}"
    )


def decode_data_url(data_url: str) -> bytes:
    _, payload = data_url.split(",", 1)
    return base64.b64decode(payload)


def request_image(api_key: str, model: str, prompt: str, timeout: int) -> bytes:
    response = requests.post(
        API_URL,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "extra_body": {
                "aspect_ratio": "4:3",
                "image_only": True,
                "image_size": "1K",
            },
        },
        timeout=timeout,
    )
    response.raise_for_status()
    payload = response.json()
    payload_type, payload_value = extract_image_payload(payload)

    if payload_type == "url":
        image_response = requests.get(payload_value, timeout=timeout)
        image_response.raise_for_status()
        return image_response.content
    if payload_type == "data_url":
        return decode_data_url(payload_value)
    if payload_type == "b64":
        return base64.b64decode(payload_value)

    raise RuntimeError(f"Unsupported payload type: {payload_type}")


def load_status_file(status_file: Path) -> dict[str, Any]:
    if not status_file.exists():
        return {"meta": {}, "jobs": {}}

    try:
        with status_file.open("r", encoding="utf-8") as handle:
            return json.load(handle)
    except json.JSONDecodeError:
        return {"meta": {}, "jobs": {}}


def write_status_file(
    status_file: Path,
    terminals: list[dict[str, Any]],
    jobs: dict[str, Any],
    model: str,
    output_dir: Path,
) -> None:
    success_count = sum(1 for item in jobs.values() if item.get("status") == "success")
    failed_count = sum(1 for item in jobs.values() if item.get("status") == "failed")
    pending_count = sum(
        1 for item in jobs.values() if item.get("status") in {"pending", "running"}
    )
    payload = {
        "meta": {
            "updated_at": now_iso(),
            "model": model,
            "output_dir": str(output_dir),
            "total_nodes": len(terminals),
            "success_count": success_count,
            "failed_count": failed_count,
            "pending_count": pending_count,
        },
        "jobs": jobs,
    }
    status_file.parent.mkdir(parents=True, exist_ok=True)
    temp_file = status_file.with_suffix(status_file.suffix + ".tmp")
    with temp_file.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
    os.replace(temp_file, status_file)


def initialize_jobs(
    terminals: list[dict[str, Any]],
    existing_payload: dict[str, Any],
    output_dir: Path,
) -> dict[str, Any]:
    existing_jobs = existing_payload.get("jobs", {})
    jobs: dict[str, Any] = {}

    for node in terminals:
        name = node["family_en"]
        output_path = output_dir / f"{name}.png"
        previous = existing_jobs.get(name, {})
        status = previous.get("status", "pending")

        if output_path.exists():
            status = "success"
        elif status == "running":
            status = "pending"

        jobs[name] = {
            "family_en": name,
            "family_cn": node["family_cn"],
            "representative_species": node.get("representative_species", ""),
            "terminal_rank": node.get("terminal_rank", ""),
            "output_path": str(output_path),
            "status": status,
            "attempts": previous.get("attempts", 0),
            "model": previous.get("model"),
            "prompt": previous.get("prompt"),
            "last_attempt_at": previous.get("last_attempt_at"),
            "completed_at": previous.get("completed_at"),
            "error": previous.get("error"),
        }

        if output_path.exists() and not jobs[name]["completed_at"]:
            jobs[name]["completed_at"] = previous.get("completed_at") or now_iso()
            jobs[name]["error"] = None

    return jobs


def main() -> int:
    args = parse_args()
    terminals = load_terminal_nodes(args.data_file)
    args.output_dir.mkdir(parents=True, exist_ok=True)
    status_payload = load_status_file(args.status_file)
    jobs = initialize_jobs(terminals, status_payload, args.output_dir)
    write_status_file(args.status_file, terminals, jobs, args.model, args.output_dir)
    nodes = choose_nodes(args, terminals)

    if not nodes:
        print("[done] No matching nodes to generate.")
        return 0

    failures = 0

    for node in nodes:
        ensure_ready(node)
        output_path = args.output_dir / f"{node['family_en']}.png"
        prompt = build_prompt(node)
        job = jobs[node["family_en"]]

        print(f"[plan] {node['family_en']} -> {output_path}")
        print(f"[prompt] {prompt}\n")

        if output_path.exists() and not args.overwrite:
            job["status"] = "success"
            job["error"] = None
            job["prompt"] = prompt
            job["model"] = args.model
            job["completed_at"] = job.get("completed_at") or now_iso()
            write_status_file(args.status_file, terminals, jobs, args.model, args.output_dir)
            print(f"[skip] {output_path.name} already exists. Use --overwrite to replace.\n")
            continue

        if args.dry_run:
            job["prompt"] = prompt
            job["model"] = args.model
            write_status_file(args.status_file, terminals, jobs, args.model, args.output_dir)
            continue

        if not args.api_key:
            raise SystemExit("Missing API key. Pass --api-key or set POE_API_KEY.")

        job["status"] = "running"
        job["attempts"] = int(job.get("attempts", 0)) + 1
        job["last_attempt_at"] = now_iso()
        job["model"] = args.model
        job["prompt"] = prompt
        job["error"] = None
        write_status_file(args.status_file, terminals, jobs, args.model, args.output_dir)

        try:
            image_bytes = request_image(args.api_key, args.model, prompt, args.timeout)
            output_path.write_bytes(image_bytes)
            job["status"] = "success"
            job["completed_at"] = now_iso()
            job["error"] = None
            print(f"[saved] {output_path}\n")
        except Exception as exc:
            failures += 1
            job["status"] = "failed"
            job["error"] = str(exc)
            print(f"[failed] {node['family_en']}: {exc}\n", file=sys.stderr)
        finally:
            write_status_file(args.status_file, terminals, jobs, args.model, args.output_dir)

    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
