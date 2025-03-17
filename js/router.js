// router.js 의 존재 이유 : 페이지 간 이동을 관리하는 역할을 함.
// -> 페이지 이동 시 해당 페이지의 뷰를 렌더링하고, 브라우저 뒤로가기/앞으로가기 처리 등을 담당.

import About from './views/About.js';
import Portfolio from './views/Portfolio.js';

export default class Router {
    // 웹사이트의 URL 경로 & 해당 하는 뷰 컴포넌트 매핑함.
    // 각 경로에 대해 어떤 뷰를 보여줄지 정의함.
    constructor() {
        this.routes = [
            { path: '/', view: About },
            { path: '/portfolio', view: Portfolio }
        ];
        
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }
    
    init() {
        // 링크 클릭 이벤트 리스너 추가
        document.addEventListener('click', this.handleLinkClick);
        
        // 브라우저 뒤로가기/앞으로가기 처리
        window.addEventListener('popstate', () => {
            this.render(window.location.pathname);
        });
        
        // 초기 페이지 렌더링
        this.render(window.location.pathname);
    }
    
    handleLinkClick(e) {
        if (e.target.matches('[data-link]')) {
            // data-link 속성이 있는 요소(nav 태그 안의 a 태그)가 클릭되면 이벤트 기본 동작 방지
            // -> 페이지 이동 시 새로고침되지 않도록 함.
            e.preventDefault(); // 기본 동작 방지
            const href = e.target.getAttribute('href');
            this.navigate(href);
        }
    }
    
    navigate(path) {
        // window.history.pushState : 브라우저 history api 사용해 url 변경 wwwwww
        window.history.pushState(null, null, path);
        this.render(path);
    }
    
    render(path) {
        // 현재 경로에 맞는 라우트 찾기
        const matchedRoute = this.routes.find(route => route.path === path) || this.routes[0];
        
        // 해당 뷰 인스턴스 생성 및 렌더링
        const view = new matchedRoute.view();
        // html 태그 안의 id가 app인 요소에 뷰의 html 내용 삽입함.
        document.querySelector('#app').innerHTML = view.getHtml();
        
        // 뷰가 렌더링된 후 실행할 코드가 있다면
        if (view.afterRender) {
            view.afterRender();
        }
    }
}