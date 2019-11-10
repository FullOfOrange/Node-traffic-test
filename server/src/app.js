const express = require('express');
const app = express();
const port = 3000;

const REDIS_OPTIONS = {
    host: "127.0.0.1",
    port: 6379
}
//initRedis로 남은 티켓 장수를 설정, key: "0"
const redis = require('redis'),
      client = redis.createClient(REDIS_OPTIONS);

app.get('/', checkTicketLeft, (req,res) => {
    res.send()
});

async function checkTicketLeft(req,res,next){
    date = new Date()
    multi = client.multi();
    multi.mget("0",(err,rep) => {
        if(+rep[0] < 0){
            console.log('a');
            multi.decr("0",redis.print);
        }
    })
    multi.exec((err,rep) => {
        console.log(date,rep)
        if(rep < 0) {
            res.status(404).send()
        } else {
            next()
        }
    })
}
app.listen(port);