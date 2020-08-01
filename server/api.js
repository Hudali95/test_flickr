const express = require("express"),
  router = express.Router();
var Flickr = require("flickr-sdk");
const config = require("config");

router.get("/photos", async (req, res) => {
  var flickr = new Flickr(config.appKey);
  flickr.photos
    .search({
      text: req.query.query,
      per_page: 20,
      page: req.query.page,
    })
    .then((resp) => {
      let resbody = [];
      const getInfo = resp.body.photos.photo.map((photo) => {
        // console.log("res", photo);
        return flickr.photos
          .getInfo({
            photo_id: photo.id,
          })
          .then((respwi) => {
            resbody.push({ ...photo, ...respwi.body.photo });
          })
          .catch((error) => console.log("in subFun", error));
      });
      Promise.all(getInfo)
        .then(() => {
          res.send(resbody);
        })
        .catch((error) => console.log("in promise", error));
    })
    .catch(function (err) {
      console.error("bonk", err);
    });
});

router.get("/photo", async (req, res) => {
  var flickr = new Flickr(config.appKey);
  flickr.photos
    .getInfo({
      photo_id: req.query.id,
    })
    .then(function (resp) {
      res.send(resp.body);
    })
    .catch(function (err) {
      console.error("bonk", err);
    });
});

router.get("/groups", async (req, res) => {
  var flickr = new Flickr(config.appKey);
  flickr.groups
    .search({
      text: req.query.query,
      per_page: 20,
      page: req.query.page,
    })
    .then(function (resp) {
      res.send(resp.body);
    })
    .catch(function (err) {
      res.send(err);
    });
});
router.get("/group/info", async (req, res) => {
  var flickr = new Flickr(config.appKey);

  flickr.groups
    .getInfo({
      group_id: req.query.id,
    })
    .then(function (resp) {
      res.send(resp.body);
    })
    .catch(function (err) {
      res.send(err);
    });
});
router.get("/group/photos", async (req, res) => {
  var flickr = new Flickr(config.appKey);

  flickr.groups.pools
    .getPhotos({
      group_id: req.query.id,
    })
    .then(function (resp) {
      res.send(resp.body);
    })
    .catch(function (err) {
      res.send(err);
    });
});
router.get("/group/topics", async (req, res) => {
  var flickr = new Flickr(config.appKey);

  flickr.groups.discuss.topics
    .getList({
      group_id: req.query.id,
    })
    .then(function (resp) {
      res.send(resp.body);
    })
    .catch(function (err) {
      res.send(err);
    });
});
router.get("/group/topics/info", async (req, res) => {
  var flickr = new Flickr(config.appKey);

  flickr.groups.discuss.topics
    .getInfo({
      group_id: req.query.id,
    })
    .then(function (resp) {
      res.send(resp.body);
    })
    .catch(function (err) {
      res.send(err);
    });
});
router.get("/group/page", async (req, res) => {
  var flickr = new Flickr(config.appKey);

  flickr.urls
    .getGroup({
      group_id: req.query.id,
    })
    .then(function (resp) {
      res.send(resp.body);
    })
    .catch(function (err) {
      res.send(err);
    });
});

module.exports = router;
