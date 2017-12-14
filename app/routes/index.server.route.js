const express = require("express");
const models = require("../models/topics.server.model.js");
const router = express.Router();


router.get("/", models.getTopics, function(req, res, next) {
	res.render("pages/index.njk", {
		title: "CNode",
		tag: req.query.tab || "all",
		list: req.response
	});
});

router.get("/topic/:id", models.getTopicDetail, function(req, res, next) {
	res.render("pages/topic_detail.njk", {
		data: req.response
	});
});

module.exports = router;