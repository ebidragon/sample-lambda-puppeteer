'use strict';
const puppeteer = require('puppeteer');
const chromium = require('chrome-aws-lambda');
const envKey = process.env.ENV_KEY;
const proxyServer = process.env.PROXY_SERVER;
const proxyUsername = process.env.PROXY_USERNAME;
const proxyPassword = process.env.PROXY_PASSWORD;
const args = ['--no-sandbox', '--disable-gpu', '--single-process'];
if (proxyServer) {
  args.push('--proxy-server=' + proxyServer);
}

exports.crawler = async (event, context, callback) => {
  try {
    const browser = await puppeteer.launch({
      args: args,
      executablePath: await chromium.executablePath,
      defaultViewport: chromium.defaultViewport,
      headless: true,
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
      body: JSON.stringify(responseBody),
    };
    callback(null, response);
  } catch (error) {
    callback(error);
  }
};
