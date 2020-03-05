# 스프링 부트와 AWS로 혼자 구현하는 웹 서비스

## 1. 인텔리제이로 스프링 부트 시작하기

## 2. 테스트코드 작성하기
### I. 왜 테스트 코드를 작성해야 할까
* 최근 대부분의 서비스 회사가 테스트코드에 관한 요구가 증가
* **빠른 피드백**: 톰캣을 구동시킬 필요가 없음
    * 코드를 직접 작성하고 톰캣을 실행시켜 테스트하는 방식은 시간이 너~무 오래걸린다..
* 개발자가 만든 기능을 안전하게 보호
    * 기존 기능이 잘 작동하는 것을 보장해줌

### II. `HelloController` 테스트 코드 작성하기
*  패키지 생성
    * 일반적으로 패키지명은 웹사이트의 역순으로 함
    * ex. www.google.com => com.google.www
* `Application` 클래스 생성(메인 클래스)
    * `@SpringBootApplcation`: 해당 어노테이션이 있는 위치부터 설정을 읽어가기 때문에 항상 프로젝트의 최 상단에 위치해야함
* `SpringApplcation.run`: 내장 `was`실행
    * 톰캣을 따로 설치할 필요가 없음!
    * 스프링부트로 만들어진 `jar`파일로 실행
    * 꼭 내장 톰캣을 써야하는 건 아니지만 스프링부트에서는 권장하고 있음
        * **언제 어디서나 같은 환경에서 스프링 부트를 배포**할 수 있기 때문

### III. 롬복 소개 및 설치하기
* 롬복이란
    * 자바를 개발할 때 자주 사용하는 코드 `Getter`, `Setter`, 기본생성자 등을 어노테이션으로 자동생성해주는 라이브러리

### IV. `HelloController`코드를 롬복으로 전환하기

## 3. JPA로 데이터베이스 다루기
### I. JPA 소개
* 인터페이스로서 자바 표준 명세서
* 대표적인 구현체: `Hibernate`, `EclipseLink` 등
* Spring에서 JPA를 사용할 땐 위의 구현체들을 직접 다루진 않음
    * `Spring Data JPA`라는 모듈을 이용하여 JPA 기술을 다룸

### II. 프로젝트에서 `Spring Data JPA` 적용
* `Entity`클래스에서는 절대로 `@Setter`를 쓰지 않음
    * 해당 필드의 값 변경이 필요하면 그 목적과 의도를 나타낼 수 있는 메소드를 추가해야 함
~~~java
public class Order {
    ...

    public void cancelOrder() {
        this.status = false;
    }
}

public void orderCancelMethod() {
    order.cancelOrder();
}
~~~

* 값을 채워 넣는 방법
    * 기본적으로는 **생성자를 통해** 값을 채운 후 DB에 삽입하고 값 변경이 필요하면 **해당 이벤트에 맞는** public 메소드를 호출하여 변경
    * 이 책에서는 생성자 대신 `@Builder`를 통해 제공되는 빌더 클래스를 사용


### III. 테스트 코드 작성하기

### IV. 등록/수정/조회 API 만들기
* API를 만들기 위해 3개의 클래스가 필요함
    * `Request Dto`, `Controller`, `Service`
* `Service`에서는 비지니스 로직을 처리하지 않고 **트랜잭션, 도메인간 순서 보장**의 역할만 함

* 그렇다면 비지니스 로직은 어디서 처리? => Domain