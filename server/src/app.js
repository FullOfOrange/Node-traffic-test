const express = require('express');
const app = express();
const port = 3000;

const REDIS_OPTIONS = {
    host: "127.0.0.1",
    port: 6379
}
const redis = require('redis'),
      client = redis.createClient(REDIS_OPTIONS);

//Server를 실행하면 list 에 때려박음
client.del("0")
client.lpush('0',[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],(err,rep) => {console.log(rep);});
//-------------------

app.get('/', checkTicketLeft, (req,res) => {
    res.send()
});

function checkTicketLeft(req,res,next){
    date = new Date();
    client.rpop('0',(err,reply) => {
        if(reply !== null){
            console.log(date,reply)
            next();
        }else{
            res.status(403).send()
        }
    })
}
app.listen(port);