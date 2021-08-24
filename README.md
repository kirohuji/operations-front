后台运营管理系统

## 部署环境
### oss
#### 测试环境
- tag规则：`test-oss-v(.+)`
- 地址: http://healthy-ai.group-ds.com/operations/v0/   https://healthy-ai.group-ds.com/operations/v0/
- oss路径: `oss://gupo-healthy-ai/operations/v0/`
- build 命令：`npm run build:stage`
- publicPath: ""

#### 正式环境
- tag规则：`release-oss-v(.+)`
- 地址: http://healthy-ai.group-ds.com/operations/v1/   https://healthy-ai.group-ds.com/operations/v1/
- oss路径: `oss://gupo-healthy-ai/operations/v1/`
- build 命令：`npm run build:prod`
- publicPath: ""