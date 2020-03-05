# 스프링 부트와 AWS로 혼자 구현하는 웹 서비스

## 1. 인텔리제이로 스프링 부트 시작하기

## 2. 스프링 부트에서 테스트코드 작성하기
### 왜 테스트 코드를 작성해야 할까
* 최근 대부분의 서비스 회사가 테스트코드에 관한 요구가 증가
* **빠른 피드백**: 톰캣을 구동시킬 필요가 없음
    * 코드를 직접 작성하고 톰캣을 실행시켜 테스트하는 방식은 시간이 너~무 오래걸린다..
* 개발자가 만든 기능을 안전하게 보호
    * 기존 기능이 잘 작동하는 것을 보장해줌

### `HelloController` 테스트 코드 작성하기
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