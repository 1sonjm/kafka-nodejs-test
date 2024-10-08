# kafka 테스트

kafka + nodejs 테스트

## kafka 다운로드

[다운로드 사이트](https://downloads.apache.org/kafka/3.8.0/kafka_2.13-3.8.0.tgz)
kafka 압푹파일 해제후 C 드라이브 이동
> 폴더 이동 가능하나 실행 경로의 주소가 긴 경우엔 실행시 에러 발생

## zookeeper 실행

cd c:\kafka_2.13-3.8.0
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties

## kafka 실행

cd c:\kafka_2.13-3.8.0
.\bin\windows\kafka-server-start.bat .\config\server.properties

## topic 생성

npm run topic

## sub 등록

npm run sub

## pub 테스트

npm run pub
테스트 문자 입력

## 참조

https://medium.com/@ketanpradhan/a-practical-guide-to-apache-kafka-with-node-js-code-examples-329cc65be502
