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

### IV. JPA Auditing으로 생성시간/수정시간 자동화

## 4. 머스테치로 화면 구성
### I. 서버 템플릿 엔진과 머스테치 소개
#### 템플릿 엔진이란?
* **지정된 템플릿 양식과 데이터**가 합쳐져 HTML을 출력하는 소프트웨어
* 서버 템플릿 엔진: `JSP`, `Freemaker` 등
* 클라이언트 템플릿 엔진: `React.js`, `Vue.js` 등

#### i. 머스테치의 특징
    * 타 템플릿 엔진에 비해 문법이 간단함
    * 로직 코드를 사용할 수 없어 View의 역할과 서버의 역할을 명확하게 분리
    * `Mustache.js`와 `Mustache.java` 두 가지가 다 있어서 하나의 문법으로 클라이언트/서버 템플릿을 모두 사용 가능

#### ii. 머스테치 플러그인 설치

#### iii. 게시글 등록 화면 만들기
#### iv. 전체 조회 화면 만들기
#### v. 게시글 수정, 삭제 화면 만들기

## 5. 스프링 시큐리티와 OAuth 2.0으로 로그인 구현
### I. 스프링 시큐리티와 스프링 시큐리티 OAuth2 클라이언트
* 스프링 부트 1.5와 2.x 버전의 차이
    * properties(yaml) 파일의 url 주소 명시 차이

#### 1.5
~~~yaml
google:
    client:
        clientId: 인증정보
        clientSecret: 인증정보
        accessTokenUri: https://accounts.google.com/o/oauth2/token
        userAuthorizationUri: https://accounts.google.com/o/oauth2/auth
        clentAuthenticationScheme: form
        scope: email, profile
    resource:
        userInfoUri: https://www.googleapis.com/oauth2/v2/userinfo
~~~

#### 2.x
~~~yaml
spring:
    security:
        oauth2:
            client:
                clientId: 인증정보
                clientSecret: 인증정보
~~~
* 2.0버전부터 인증정보만 입력하고 나머지는 enum으로 대체됨(`CommonOAuth2Provider`)

### II. 구글 서비스 등록
* `spring.security.oauth2.client.registration.google.scope = profile, email`
    * scope는 openid,profile,email이 기본 값인데 openid가 있으면 Open Id Provider로 인식을 해서 Open Id Provider 서비스인 구글과 그렇지 않은 네이버, 카카오등의 서비스를 각각 나눠서 OAuth2Service를 만들어야하기 때문

* `application-oauth.properties`
    * `-` 뒤의 단어 profile이 생성됨
    * `application.properties`: spring.profiles.include = oauth 등록
### III. 구글 로그인 연동