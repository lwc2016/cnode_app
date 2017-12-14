const axios = require("axios");
const base_url = require("../../config/env.config.js").base_url;

exports.getTopics = (req, res, next) => {
	let url = base_url + "/topics";
	let page = req.query.page || 1;
	let limit = 20;
	let mdrender = true;
	let tab = req.query.tab || "all";
	let params = {
		page,
		limit,
		mdrender,
		tab
	};
	axios.get(url, {
		params
	}).then((response) => {
		if (response.data.success) {
			console.log(response);
			req.response = response.data.data;
			next();
		} else {
			return next(response.data.error_msg);
		}
	}).catch((err) => {
		console.log("-----error------");
		return next(err);
	});
};

exports.getTopicDetail = (req, res, next) => {
	let url = base_url + `/topic/${req.params.id}`;
	axios.get(url).then((response) => {
		if (response.data.success) {
			req.response = response.data.data;
			next();
		} else {
			return next(response.data.error_msg);
		};
	}).catch((err) => {
		console.log("-------errorMsg2--------");
		next(err);
	});
};