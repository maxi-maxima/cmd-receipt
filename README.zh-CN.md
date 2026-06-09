<div align="center">

# Cmd Receipt

**包装验证命令，并写出可分享的执行凭证。**

[English](README.md)

</div>

AI 编码 agent 经常说“测试通过了”。Reviewer 需要更具体的证据：

- 跑了什么命令
- 在哪里跑的
- 什么时候开始和结束
- exit code
- 输出尾部
- 可用时记录 git SHA、分支和 dirty 状态

`cmd-receipt` 会执行一个明确传入的命令，并写出 JSON 和 Markdown receipt。

不需要 API key。不做遥测。不自动发现命令。

## 30 秒演示

```bash
npx github:maxi-maxima/cmd-receipt demo
```

演示会写出：

```text
reports/demo/cmd-receipt.json
reports/demo/cmd-receipt.md
```

## 包装验证命令

```bash
npx github:maxi-maxima/cmd-receipt run -- npm test -- --run
```

自定义输出目录：

```bash
npx github:maxi-maxima/cmd-receipt run --out reports/verify -- npm run check
```

CLI 会使用被包装命令的 exit code，因此可以放进 CI。

## 输出

Markdown receipt：

```md
# Command Receipt

| Command | Exit code | Duration | Started | Finished |
| --- | ---: | ---: | --- | --- |
| `npm test -- --run` | 0 | 812 ms | ... | ... |

## Context

- CWD: `E:/Projects/app`
- Git SHA: `abc123`
- Git branch: `main`
- Git dirty: no
```

JSON receipt 包含同样的结构化数据。

## 它不是什么

`cmd-receipt` 不是沙箱、加密证明系统或信任框架。它只是记录本地执行证据，方便人和 agent 检查。如果你需要签名的供应链 provenance，请使用专门的 attestation 工具。

## 安全边界

`cmd-receipt` 只运行你在 `run --` 后显式传入的命令。它不会读取 package scripts 并自行选择要运行的命令。

## 开发

```bash
npm install
npm run check
node dist/cli.js demo --out reports/demo
npm pack --dry-run --ignore-scripts
```

## 许可证

MIT
