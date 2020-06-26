# sample-lambda-puppeteer
AWS Lambda で Puppeteer を使うサンプル

## Requirements
- Node.js (10.16.3 LTS にて動作を確認)

## Deploy AWS
### Install Serverless Framework
```bash
#e.g. Global mode
sudo npm install -g serverless
```
### Setting AWS-CLI
```bash
aws configure --profile serverless
#AWS Access Key ID [None]: XXXXXXXXXXXXXXXXXXXX
#AWS Secret Access Key [None]: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#Default region name [None]: ap-northeast-1
#Default output format [None]: json
```
### Get Chromium & Puppeteer
```bash
cd /path_to_sample/layer/modules/nodejs
npm install
```
### Deploy Layer
```bash
cd /path_to_sample/layer/
sls deploy
```
### Environment variables
| 変数名 | 備考 |
----|----
| ENV_KEY | 任意の文字列 |
| PROXY_SERVER | Proxyサーバ |
| PROXY_USERNAME | Proxy認証ユーザー名 |
| PROXY_PASSWORD | Proxy認証パスワード |
- [`.env.example`](function/.env.example) を `.env` にリネームして定義する
- もしくは、下記のようにコマンドで定義する
```bash
#e.g. Use export command
export ENV_KEY=xxxx
export PROXY_SERVER=http://xxx.xxx.xxx.xx:xxxx
export PROXY_USERNAME=xxxx@dmm.com
export PROXY_PASSWORD=xxxx
```
- Deploy後は[Lambdaコンソール](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html)で環境変数を変更できる
### Deploy Function
```bash
cd /path_to_sample/function/
npm install
sls deploy
```
## Setup Local
```bash
cd /path_to_sample/test-local/
npm install
```
### Environment variables
- [`.env.example`](test-local/.env.example) を `.env` にリネームして定義する
- もしくは、コマンドで定義する

## How to run
```bash
#AWS
cd /path_to_sample/function/
sls invoke -f crawler 

#Local
cd /path_to_sample/test-local/
npm run start
```
