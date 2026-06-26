# 变更记录

## Unreleased

- 在 receipt 中新增 Node.js、平台、架构和 shell 元数据。

## 0.1.0

- 首个公开版本。
- 执行显式传入的命令，不做 shell 字符串拼接。
- 记录 exit code、耗时、stdout/stderr 尾部、cwd 和 git 状态。
- 写出 JSON 和 Markdown receipt。
- 提供 `run` 和 `demo` 命令。
