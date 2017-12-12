const nunjucks = require("nunjucks");
const path = require("path");

module.exports = (app) => {
	/*-------配置模版路径------*/
	nunjucks.configure(path.join(__dirname, "../app/views/"), {
		autoescape: true,
		watch: true,
		express: app
	});
};