# Node Traffic Test Repo
nginx + nodejs + redis 의 트레픽 테스트용 레포지토리

## 목적
예약을 위한 트레픽 테스트용 레포지토리

## 테스팅
##Nodejs + Redis 트래픽 테스트

예약 시스템에서 데이터 안정성 (많은 양의 트레픽에도, 서버에 접근한 순서대로, 순차적인 예약을 정상적으로/서버가 최대한 뻗지 않고 받을 수 있도록 하는 것)을 위한 테스트 입니다.

### 0차 테스트

순수하게 Key만을 가지고 Transaction을 수행했는데, 일단 데이터 신뢰성은 확보함.

#### Transaction

```js
multi = client.multi();
    multi.decr("0",redis.print);
    multi.exec((err,rep) => {
        if(rep < 0) {
            res.status(404).send()
        } else {
            next()
        }
    })
```



### 1차 테스트 : Artillery.io

**Reference: https://artillery.io/docs/http-reference/**

**DockerImage: https://hub.docker.com/repository/docker/jdd04026/artillery**

RDB의 데이터 구조 초안은 아래의 그림과 같습니다.

<img src="/Users/fulloforange/Current_Codes/Node-traffic-test/DOCS/IMG/Bookus_DB_init.png" style="width: 50%;" />

#### Redis Structure

**redis.set(USER_TICKET_ID, AUTO_INCREASEMENT_INTEGER)** => 유저별 티켓 아이디 생성시 필요한 Status 저장용 키이다. UserTicket을 생성할 때 id를 이것을 통해 생성한다. 티켓이 없더라도 항상 유지되어야 하는 키. 이벤트/ 티켓이 늘어나더라도 오직 하나만 존재하는 단일키이다. RDB와는 특정시간마다 지속적으로 동기화가 필요할 듯.

**redis.set(TICKET_ID, LEFT_TICKET_CNT)** => 특정 티켓이 생길 때마다 추가되며, 이 키를 통해서 티켓을 주문하고, 남은 티켓을 계산, 예약 여부를 응답해줌

**redis.hset**(undefined) -> 특정 티켓을 주문에 성공한 사람들을 저장하기 위한 Logging용 키임. 이 키는 응답 이후에 저장되는 구조를 가져도 될 듯 함. / Logging 을 RDB에 바로 해도 될지?

- TIcketId 별로 남은 티켓 개수를 Integer 형태로 저장해야 하며, Transaction 형태로 각각의 트래픽의 접근을 통한 Tickect 구매에 따른 남은 티켓 개수를 카운팅 해야함. 만약 0 이 되면 Transaction 실패를 시키고 HTTP 403 Forbidden 을 날려줌
  - 성공시 응답: 200
  - 실패시 응답 403

- 성공시 응답을 보내주면서 UserId 와 예약한 시간에 따른 '주문'을 넣어주어야 함.
- Auto-Increasement 로써 생성되어야 할 UserTicketID 에 관한 Status를 계속 가지고 있어야 한다. 데이터에 대한 생성은 Redis에서 이뤄지고, 저장은 RDB에서 이뤄지므로 이것은 필수적으로 동기화 되어야 하는 항목이다.

#### Problems

1. 티켓의 오픈 시간이 다르지만, 주문은 종속된 이벤트에 관련된 모든 티켓이 포함될 수 있음. 이것을 어떤식으로 처리해야 할지 모르겠음. => 일단 주문이 아닌 티켓을 우선으로 주문을 해보기로 함.
2. 티켓이 오픈되어야만 /order 가 가능해야함. 이 라우터에 아직 열리지 않은/ 아직 존재하지 않는 티켓을 구매하려 했을 때 어떤식으로 Block을 해야하는지 모르겠음.
3. 만약 특정 사용자가 사용자가 구매할 수 있는 티켓 구매 개수를 초과할 때 어떤식으로 대응해야 할지 모르겠음. 사용자 별로 이것을 셀 수 있는 무엇인가를 추가해야 할지? 테스트가 필요하지만, 구매할 때 Select를 날려야할 수도 있음.
4. Logging(구매에 대한 로깅)을 RDB query를 통해 바로 수행해도 좋을것 같음. 티켓 발급과 티켓 남은 개수만을 Redis가 들고있어도 좋을 것 같음.

### 2차 테스트: nGrinder

**Reference: http://naver.github.io/ngrinder/**

**DockerImage: https://hub.docker.com/u/ngrinder** - Agent 사용

미정
