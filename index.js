const express = require("express");
const app = express();
const port = 4000;
const messageRouterFactory = require('./message/router')
const bodyParser = require('body-parser')
const cors = require('cors')
const Sse = require('json-sse')
const Message = require('./message/model')


const stream = new Sse();

const messageRouter = messageRouterFactory(stream);

const corsMiddleware = cors()
app.use(corsMiddleware)

app.get('/', (req, res) => {
    stream.send('Hi')
    res.send('Hello')
})

app.get('/stream', 
async (req, res, next) => {
    try {
    const messages = await Message.findAll() // Get array out of DB
    const string = JSON.stringify(messages) // Convert array into a string - 'serealize' it
    stream.updateInit(string) // Prepare string to be sent to client right after they connect
    stream.init(req, res) // *Connect* the user to the stream
} catch (error) {
    next(error) // Handle any errors
}
})



const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(messageRouter)

app.listen(port, () => {
  console.log(`Listening on :${port}`);
});
