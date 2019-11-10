const redis = require('redis'),
      client = redis.createClient({
          host: "127.0.0.1",
          port: 6379
      });

client.set("0",5);
client.get("0",(err, reply) => {
    console.log(reply.toString());
    client.quit();
})