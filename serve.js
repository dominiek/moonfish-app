const Koa = require("koa");
const config = require("./webpack.config");
const webpack = require("koa-webpack"); // eslint-disable-line

const admin = new Koa();
const app = new Koa();

const HOST = "0.0.0.0";
const APP_PORT = parseInt(process.env.APP_PORT || 1305, 10);
const ADMIN_PORT = parseInt(process.env.API_PORT || 1304, 10);

const webpackmiddleware = webpack({
  config: {
    ...config,
    mode: "development"
  }
});
admin.use(async (ctx, next) => {
  if (ctx.url === "/") {
    ctx.url = "/admin.html";
  }
  await next();
});
admin.use(webpackmiddleware);
app.use(webpackmiddleware);

admin.listen(APP_PORT, HOST);
app.listen(ADMIN_PORT, HOST);
