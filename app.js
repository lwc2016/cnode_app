const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const env = require("./config/env.config.js");

/*---------实例化express--------*/
const app = express();

/*---------配置模版引擎--------*/
require("./config/nunjucks.config.js")(app);

/*---------打印请求----------*/
app.use(logger("dev"));

/*---------设置静态资源路径----------*/
app.use(express.static(path.join(__dirname, "public/")));

/*---------解析application/json数据格式------------*/
app.use(bodyParser.json());

/*---------解析application/x-www-form-urlencoded格式数据-----------*/
app.use(bodyParser.urlencoded({
	extended: false
}));

/*---------解析cookie------------*/
app.use(cookieParser());

/*--------解析session-------------*/
app.use(session({
	secret: "cnode_app",
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 10 * 60 * 60 * 1000
	},
	store: new MongoStore({
		"url": env.mongodb
	})
}));

/*-------配置路由-------*/
require("./config/routes.config.js")(app);

/*----------捕获404错误-------------*/
app.use(function(req, res, next) {
	/*
	let err = new Error("Error: 404, the source is not found!");
	err.status = 404;
	next(err);
	*/
	return res.render("404.njk");
});

/*----------捕获500错误-------------*/
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(err.status || 500).send(err.status === 404 ? err.message : "系统错误");
	next();
});

module.exports = app;