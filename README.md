# Node Traffic Test Repo
nginx + nodejs + redis 의 트레픽 테스트용 레포지토리

### 목적
예약을 위한 트레픽 테스트용 레포지토리

### 테스팅

#### 1차 테스트
nCloud 환경의 단일 Compact Server + Redis 서비스를 이용하여 부하를 최대한 줄 예정
https://artillery.io nodejs 기반의 스트레스 테스트 툴이며 기본적인 인프라에 대한 신뢰도를 검증할 예정임

- 중점적으로 볼 사항
CPU, 메모리 점유율
Redis와 정상적으로 통신하면서 예약이 완료되는지
트레픽양을 점차적으로 늘려가면서 서버가 터지는 구간이 어디인지 찾기

