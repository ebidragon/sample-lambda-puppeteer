require('dotenv').config();
const puppeteer = require('puppeteer');
const envKey = process.env.ENV_KEY;
const proxyServer = process.env.PROXY_SERVER;
const proxyUsername = process.env.PROXY_USERNAME;
const proxyPassword = process.env.PROXY_PASSWORD;
const args = ['--no-sandbox', '--disable-gpu'];
if (proxyServer) {
  args.push('--proxy-server=' + proxyServer);
}
const ignoreDefaultArgs = ['--disable-extensions'];

(async () => {
  const browser = await puppeteer.launch({
    args: args,
    ignoreDefaultArgs: ignoreDefaultArgs,
  });
  const page = await browser.newPage();
  if (proxyUsername && proxyPassword) {
    await page.authenticate({
      username: proxyUsername,
      password: proxyPassword,
    });
  }
  await page.goto('https://httpbin.org/ip');
  const ip = await page.evaluate(() => {
    return JSON.parse(document.querySelector('body').innerText).origin;
  });
  await browser.close();

  const responseBody = {
    ip: ip,
  };
  if (envKey) {
    responseBody.envKey = envKey;
  }
  const response = {
    body: responseBody,
  };
  console.log(response);
})();
