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
			case "dev":
				return "测试";
			default:
				return tag;
		}
	});
	nunjucksEnv.addFilter("distance_time", (date) => {
		let timestamp = Date.parse(date);
		let nowTimestamp = new Date().getTime();
		let distance_timestamp = nowTimestamp - timestamp;
		if ((distance_timestamp / (60 * 1000)) < 1) {
			return `${Math.floor(distance_timestamp / 1000)}秒前`;
		} else if ((distance_timestamp / (60 * 60 * 1000)) < 1) {
			return `${Math.floor(distance_timestamp / (60 * 1000))}分钟前`;
		} else if ((distance_timestamp / (24 * 60 * 60 * 1000)) < 1) {
			return `${Math.floor(distance_timestamp / (60 * 60 * 1000))}小时前`;
		} else if ((distance_timestamp / (30 * 24 * 60 * 60 * 1000)) < 1) {
			return `${Math.floor(distance_timestamp / ( 24 * 60 * 60 * 1000))}天前`;
		} else if ((distance_timestamp / (12 * 30 * 24 * 60 * 60 * 1000)) < 1) {
			return `${Math.floor(distance_timestamp / (30 * 24 * 60 * 60 * 1000))}月前`;
		} else {
			return `${Math.floor(distance_timestamp / ( 12 * 30 * 24 * 60 * 60 * 1000))}年前`;
		};
	});
	nunjucksEnv.addFilter("tag_active", (tag, currentTag) => {
		if (tag == currentTag) {
			return "tag_item_active";
		} else {
			return "";
		};
	});
};