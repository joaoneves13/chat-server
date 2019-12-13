const express = require("express");
const app = express();
const port = 4000;
const messageRouter = require('./message/router')

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use(messageRouter)

app.listen(port, () => {
  console.log(`Listening on :${port}`);
});
