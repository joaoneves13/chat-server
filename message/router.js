const express = require("express");
const Message = require("./model");
const { Router } = express;
function factory(stream) {
  const router = new Router();

  router.get("/message", async (req, res, next) => {
    try {
      const messages = await Message.findAll();
      res.send(messages);
    } catch (error) {
      next(error);
    }
  });

  async function onPost(req, res, next) {
    try {
      const message = await Message.create(req.body);
      const string = JSON.stringify(message)
      stream.send(string)
      res.send(message);
    } catch (error) {
      next(error);
    }
  }

  router.post("/message", onPost);

  return router;
}
module.exports = factory;
