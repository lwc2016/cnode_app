const express = require("express");
const models = require("../models/topics.server.model.js");
const router = express.Router();


router.get("/", models.getTopics, function(req, res, next) {
	res.render("index.njk", {
		list: req.response
	});
});

router.get("/topic/:id", models.getTopicDetail, function(req, res, next) {
	//res.send("good");
	console.log(req.response);
	res.render("topic_detail.njk", {
		data: req.response
	})
});
module.exports = router;