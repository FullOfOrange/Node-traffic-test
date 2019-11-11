```js
client.rpop('0',(err,reply) => {
    if(reply !== null){
        next();
    }else{
        res.status(403).send()
    }
})
```
확실히 문제없이 잘 뽑힌다. 문제는 두개 이상을 뽑을 때 일 것 같다. 이 경우에는 우짤지 모르겠다. 