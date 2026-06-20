#!/usr/bin/env python3
"""
Points Card Manager — PoC 验证脚本
验证前端项目的结构完整性、依赖正确性、构建成功性。
"""

import json
import os
import subprocess
import sys
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parent / "points-card-manager"

REQUIRED_FILES = [
    "package.json",
    "index.html",
    "vite.config.ts",
    "tsconfig.json",
    "src/main.tsx",
    "src/App.tsx",
    "src/index.css",
    "src/types/card.ts",
    "src/hooks/useCards.ts",
    "src/components/EmptyState.tsx",
    "src/components/CardGrid.tsx",
    "src/components/CardItem.tsx",
    "src/components/BarcodeViewer.tsx",
    "src/components/UploadModal.tsx",
    "src/pages/HomePage.tsx",
]

REQUIRED_DEPENDENCIES = {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
}

REQUIRED_DEV_DEPENDENCIES = {
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "vite": "^6.0.0",
    "typescript": "~5.7.0",
}


def check_project_root() -> Path:
    if not PROJECT_DIR.exists():
        print(f"✗ 项目目录不存在: {PROJECT_DIR}")
        print(f"  请确保脚本位于 poc/src/poc_verification.py 且项目在 poc/points-card-manager/")
        sys.exit(1)
    return PROJECT_DIR


def test_file_integrity(root: Path) -> bool:
    print("\n[1/5] 文件结构完整性检查")
    ok = True
    for rel in REQUIRED_FILES:
        path = root / rel
        exists = path.exists()
        if not exists:
            print(f"  ✗ 缺失: {rel}")
            ok = False
    if ok:
        print("  ✓ 所有必需文件均存在")
    return ok


def test_dependencies(root: Path) -> bool:
    print("\n[2/5] 依赖配置检查")
    pkg_path = root / "package.json"
    if not pkg_path.exists():
        print("  ✗ package.json 不存在")
        return False
    with open(pkg_path) as f:
        pkg = json.load(f)

    ok = True
    deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}

    for name, expected in {**REQUIRED_DEPENDENCIES, **REQUIRED_DEV_DEPENDENCIES}.items():
        actual = deps.get(name)
        if not actual:
            print(f"  ✗ 缺少依赖: {name}")
            ok = False
        elif actual != expected:
            print(f"  ⚠ {name}: 期望 {expected}，实际 {actual}")
        else:
            print(f"  ✓ {name}: {actual}")

    node_modules = root / "node_modules"
    if not node_modules.exists():
        print("  ✗ node_modules 不存在，请先执行 npm install")
        ok = False
    return ok


def test_typescript(root: Path) -> bool:
    print("\n[3/5] TypeScript 编译检查")
    result = subprocess.run(
        ["npx", "tsc", "-b", "--noEmit"],
        cwd=root,
        capture_output=True,
        text=True,
    )
    if result.returncode == 0:
        print("  ✓ TypeScript 编译通过")
        return True
    print(f"  ✗ TypeScript 编译失败 (exit code {result.returncode})")
    for line in result.stdout.strip().split("\n"):
        print(f"    {line}")
    for line in result.stderr.strip().split("\n"):
        print(f"    {line}")
    return False


def test_build(root: Path) -> bool:
    print("\n[4/5] Vite 构建检查")
    result = subprocess.run(
        ["npx", "vite", "build"],
        cwd=root,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"  ✗ 构建失败 (exit code {result.returncode})")
        for line in result.stderr.strip().split("\n"):
            print(f"    {line}")
        return False

    dist = root / "dist"
    index_html = dist / "index.html"
    js_files = list(dist.glob("assets/index-*.js"))
    css_files = list(dist.glob("assets/index-*.css"))

    print(f"  ✓ 构建成功")
    print(f"  ✓ {index_html.name}")
    print(f"  ✓ {js_files[0].name if js_files else '?.js'}")
    print(f"  ✓ {css_files[0].name if css_files else '?.css'}")

    dist_size = sum(f.stat().st_size for f in dist.rglob("*") if f.is_file())
    print(f"  📦 产出大小: {dist_size / 1024:.1f} KB")
    return True


def test_dev_server(root: Path) -> bool:
    print("\n[5/5] 开发服务器启动检查")
    proc = subprocess.Popen(
        ["npx", "vite", "--port", "4173", "--strictPort"],
        cwd=root,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    import time, urllib.request, urllib.error
    time.sleep(3)
    try:
        resp = urllib.request.urlopen("http://localhost:4173", timeout=5)
        ok = resp.status == 200
        print(f"  ✓ 开发服务器响应正常 (HTTP {resp.status})" if ok else f"  ✗ 响应异常: {resp.status}")
        proc.terminate()
        proc.wait()
        return ok
    except Exception as e:
        print(f"  ✗ 开发服务器不可达: {e}")
        proc.terminate()
        proc.wait()
        return False


def main():
    print("=" * 50)
    print("Points Card Manager — PoC 验证")
    print("=" * 50)
    print(f"项目路径: {PROJECT_DIR}")

    root = check_project_root()

    results = [
        ("文件结构完整性", test_file_integrity(root)),
        ("依赖配置", test_dependencies(root)),
        ("TypeScript 编译", test_typescript(root)),
        ("Vite 构建", test_build(root)),
    ]

    print("\n" + "=" * 50)
    print("验证结果汇总")
    print("=" * 50)

    all_pass = True
    for name, ok in results:
        status = "✓ PASS" if ok else "✗ FAIL"
        print(f"  [{status}] {name}")
        if not ok:
            all_pass = False

    print("=" * 50)
    if all_pass:
        print("结论: ✓ 全部通过")
    else:
        print("结论: ✗ 存在失败项")

    return all_pass


if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
