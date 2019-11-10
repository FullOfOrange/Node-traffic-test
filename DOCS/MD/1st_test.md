```javascript
//Codes
client.get("0",(err,ticket) => {
    let multi = client.multi();
    multi.decr("0")
    //descby(key, value) value 만큼 빼는 것이다. 티켓이 여러장일 경우 유용할 듯.
    if(ticket > -1){
        multi.exec((err, reply) => {
            next()
        })
    } else {
        res.status(403).send();
    }
})
```
```sh
$ artillery quick --count 10 -n 50 http://localhost:3000/
# Test result
2019-11-10T15:05:20.087Z [ 2 ]
2019-11-10T15:05:20.092Z [ 1 ]
2019-11-10T15:05:20.092Z [ 0 ]
2019-11-10T15:05:20.098Z [ -1 ]
2019-11-10T15:05:20.098Z [ -2 ]
```
위와 같은 테스트는, -1, -2 등이 더 예약된다.
사유는 get을 하고 transaction을 수행하는데 있어, transaction 내에 get이 요청되는데, 이때의 ticket 값이 조건을 결정하는 기준이 되기 때문.
Redis의 Transaction은 multi에 적혀있는 모든 명령어가 Queue로 들어가서 수행되며, 트랜잭션 내부에서 어떠한 결정도 내릴 수 없다.
만약 결정을 하고싶다면, get과 decr 을 같이 하면서 get에 의한 값을 가지고 decr 을 할지 결정해야 할듯