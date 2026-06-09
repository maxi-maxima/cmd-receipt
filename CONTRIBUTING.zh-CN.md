# 贡献指南

感谢你改进 Cmd Receipt。

## 本地开发

```bash
npm install
npm run check
```

## 开发原则

- 不自动发现并运行项目命令。
- 避免 shell 字符串拼接。
- receipt 既要机器可读，也要人类可读。
- 命令失败场景需要补测试。

## Pull Request

请说明：

- 修改的 receipt 字段或 runner 行为
- 最小命令 fixture
- `npm run check` 的验证结果
