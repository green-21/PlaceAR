# PlaceAR
AR 기반의 주변 장소 검색 앱


# Setting
## Android 빌드 시 설정 요소
Android의 경우 ./android/(App)/build.gradle 파일에서 react-native의 버전을 0.65.1로 고정해야 한다.
일부 패키지의 경우 패키지에서 build.gradle이 존재해 이 경우도 버전을 고정시켜 줘야 한다.


## Vscode 빌드 세팅 방법
1. 확장으로 React Native 툴을 설치한다.
2. 아무것도 키지 않은 상태로 디버그 탭을 클릭한다.
3. launch.json 만들기를 클릭한다.
4. React Native를 선택하고, 원하는 빌드환경을 체크한 다음 확인을 누른다.


## npm install 도중 문제 발생시 해결 방법
1. `npm cache clean --force`로 캐시를 비운다.
2. npm_module을 지우고 다시 설치한다.
3. `npm install`을 반복적으로 시도한다.
4. 좋은 네트워크 환경에서 설치를 진행한다.