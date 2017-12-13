const nunjucks = require("nunjucks");
const path = require("path");

module.exports = (app) => {
	/*-------配置模版路径------*/
	const nunjucksEnv = nunjucks.configure(path.join(__dirname, "../app/views/"), {
		autoescape: true,
		watch: true,
		express: app
	});
	/*-------自定义过滤器--------*/
	nunjucksEnv.addFilter("cnode_tag", (tag) => {
		switch (tag) {
			case "share":
				return "分享";
			case "ask":
				return "回答";
			case "job":
				return "招聘";
			case "good":
				return "精华";
			default:
				return tag;
		}
	});
};