# Serverless Oauth2.0

[Online](https://oauth.sls.plus)

[![Build Status](https://github.com/serverless-plus/oauth2.0/workflows/Validate/badge.svg)](https://github.com/serverless-plus/oauth2.0/actions?query=workflow:Validate)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

基于 [Serverless Framework](https://github.com/serverless/serverless) 的 Serverless Oauth2.0 服务

## 使用

通过 serverlesss cli 初始化：

```bash
$ sls init oauth2
```

或者，通过 Git 克隆：

```bash
$ git clone https://github.com/serverless-plus/oauth2.0.git
```

## 项目介绍

```
.
├── README.md                   项目介绍
├── apigw                       API 网关组件配置，主要用来创建 Oauth2.0 的网关API
├── cos                         COS 组件配置，主要用来将静态资源上传到 COS 桶
├── db                          PostgreSQL 组件配置
├── docker-compose.yml          Docker Compose 配置
├── layer                       Layer 配置，用来将 node_modules 部署为层
├── package.json                项目依赖
├── scripts                     项目构建相关
│   ├── copy-static-assets.ts   将静态资源和公私钥对复制到 dist 目录
│   └── gen-keypair.ts          生成 RSA 密钥对
├── serverless.yml              Express 组件配置
├── sls.ts                      Express 服务函数入口文件
├── src                         Express 服务代码
├── tsconfig.json               Typescript 配置
└── vpc                         VPC 组件配置，用来创建 VPC
```

## 开发

安装依赖:

```bash
$ npm install
```

在本地启动服务前，可以通过 Docker 来运行 PostgreSQL 镜像，提供数据库链接。

启动 PostgreSQL Dokcer 服务:

```bash
$ npm run docker:up
```

然后复制 `.env.example` 为 `.env` 文件：

```bash
$ cp .env.example .env
```

由于后端服务通过 RSA 公私钥对要生成鉴权 TOKEN，所以还需要生成公私钥对：

```bash
$ npm run gen-keypair
```

启动服务:

```bash
$ npm run dev
```

## 部署

在部署前，需要先将 Typescript 编译成 Javascript：

```bash
$ npm run build
```

然后需要先部署服务需要的相关资源。

### 部署数据库

Serverless PostgreSQL 需要配置 VPC 才行，所以首先需要先为它创建 VPC:

```bash
$ npm run deploy:vpc
```

之后，部署数据库:

```bash
$ npm run deploy:db
```

### 部署层

针对 Node.js 项目，我们可以将 `node_modules` 文件夹部署到层，然后绑定到服务函数，之后我们就不需要再次部署 `node_modules` 文件夹了，这样可以大大提高云函数的部署速率，因为大多数时候云函数的业务代码体积是很小的。

为了减小层的代码体积，我们可以只安装生产依赖:

```bash
$ rm -rf node_modules && npm install --production
```

然后执行层部署命令,

```bash
$ npm run deploy:layer
```

> **注意**：层部署后，如果没有改变过项目的生产依赖，就不需要再次部署层了。

### 部署静态文件

将项目目录 `src/public` 目录的静态文件上传到 COS 桶：

```bash
$ npm run deploy:cos
```

### 部署服务代码

```bash
$ npm run deploy
```

### 部署 Oauth2.0 网关

```bash
$ npm run deploy:apigw
```

## Curl 测试 Oauth2.0 接口

项目中添加了 `GET /post` 路由是基于 API 网关的 Oauth2.0 鉴权方式，首先通过 `GET /token` 获取 `token`，然后将 headers 中携带 `token` 来实现 Oauth2.0 鉴权：

1. 获取 `token`

```base
$ curl https://xxx/token
```

2. 通过获取的 `token` 请求 `/post`:

```bash
$ curl https://xxx/post -H 'Authorization:Bearer id_token="xxx"'
```

## License

MIT License

Copyright (c) 2020 Serverless Plus
