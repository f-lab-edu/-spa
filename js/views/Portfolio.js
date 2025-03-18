export default class Portfolio {
    constructor() {
        this.title = "My Portfolio";
        this.projects = [];

        // 이미 인스턴스가 존재하는지 확인
        if (!window.portfolioInstance) {
            window.portfolioInstance = this;
            this.fetchGitHubProjects();
        } else {
            return window.portfolioInstance;
        }
    }

    async fetchGitHubProjects() {
        try {
            const headers = {
                Accept: "application/vnd.github.nightshade-preview+json",
            };
            const url = "https://api.github.com/users/parkjiwonn/repos";
            const response = await fetch(url, {
                method: "GET",
                headers: headers
            });
            const result = await response.json();
            console.log(result);
            this.projects = result.map(repo => ({
                title: repo.name,
                description: repo.description || "No description available",
                image: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
                github: repo.html_url,
            }));
            console.log(this.projects);

            // DOM이 준비된 후 업데이트 시도
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                // 문서가 로드됐는지 or 상호작용 가능한 상태가 됐는지 확인
                this.updatePortfolio();
            } else {
                // 문서가 로드되지 않았다면 DOMContentLoaded 이벤트 발생할때까지 기다렸다가 업데이트 함수 호출 
                document.addEventListener('DOMContentLoaded', () => this.updatePortfolio());
            }
        } catch (error) {
            console.error("깃헙 레포 가져오기 실패:", error);
        }
    }

    // 포트폴리오 업데이트 메서드 추가
    updatePortfolio() {
        console.log("프로젝트 갯수", this.projects.length);
        // 기존 portfolio-container를 찾거나 없으면 생성
        let portfolioContainer = document.getElementById('portfolio-container');
        // 질문 1 : 현재 h1, p 태그가 중복되서 렌더링 되고 있는데 이유를 모르겠습니다.
        if (!portfolioContainer) {
            console.log("portfolio-container 없음");
            // 없을 경우에만 새로 생성
            const mainContent = document.querySelector('main') || document.body;
            portfolioContainer = document.createElement('div');
            portfolioContainer.id = 'portfolio-container';
            mainContent.appendChild(portfolioContainer);
        }

        // 내용 업데이트 - 기존 내용을 완전히 대체
        portfolioContainer.innerHTML = this.getHtml();

    }

    getHtml() {
        return `
            <div>
                <h1>${this.title}</h1>
                <p>제가 진행한 프로젝트들을 소개합니다.</p>
                
                <div class="portfolio-container">
                    ${this.projects.map(project => `
                        <div class="project-card">
                            <img src="${project.image}" alt="${project.title}" class="project-image">
                            <div class="project-info">
                                <h3 class="project-title">${project.title}</h3>
                                <p class="project-description">${project.description}</p>
                                <div class="project-links">
                                    <a href="${project.github}" target="_blank" class="project-link">GitHub</a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}