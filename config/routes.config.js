/*
 *** 路由配置文件
 */
const indexRoute = require("../app/routes/index.server.route.js");

module.exports = (app) => {
	app.use("/", indexRoute);
};