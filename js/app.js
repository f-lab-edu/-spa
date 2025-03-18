// app.js 의 존재 이유 : SPA의 진입점 역할을 함.
// -> 라우터 모듈을 가져오고 HTML 문서가 완전히 로드되었을때 실행할 함수를 등록하기위함.
import Router from './router.js';

// 앱 초기화 
document.addEventListener('DOMContentLoaded', () => {
    // DOMContentLoaded : HTML 문서가 완전히 로드되었을때 실행되는 이벤트
    // 문서가 완전히 로드되었을떄 SPA 초기화 함.
    // 왜 이렇게 하는지 ? DOM 요소가 모두 준비된 상태에서 js 코드 실행시키기 위함.
    const router = new Router();
    router.init();
});