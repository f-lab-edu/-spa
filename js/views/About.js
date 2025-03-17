export default class About {
    constructor() {
        this.title = "About Me";
    }
    
    getHtml() {
        return `
            <div class="about-container">
                <h1>${this.title}</h1>
                
                <div class="about-intro">
                    <img src="https://cdn-icons-png.freepik.com/256/3135/3135823.png?semt=ais_hybrid" alt="Profile Image" class="profile-image">
                    <div>
                        <h2>안녕하세요, 프론트엔드 개발자 박지원입니다</h2>
                        <p>
                            프론트엔드 개발자로서 사용자 경험을 중요시하며 웹 애플리케이션을 개발하고 있습니다. <br>
                            창의적인 문제 해결과 깔끔한 코드 작성을 지향합니다.
                        </p>
                        <p>
                            항상 새로운 기술을 배우고 성장하기 위해 노력하고 있습니다.
                        </p>
                    </div>
                </div>
                
                <div class="skills-container">
                    <h2>기술 스택</h2>
                    <div class="skills-list">
                        <span class="skill-item">HTML5</span>
                        <span class="skill-item">CSS3</span>
                        <span class="skill-item">JavaScript</span>
                        <span class="skill-item">React</span>
                        <span class="skill-item">Vue.js</span>
                        <span class="skill-item">Android</span>
                        <span class="skill-item">Git</span>
                    </div>
                </div>
                
                <div>
                    <h2>연락처</h2>
                    <p>Email: dev.jiwonpark@gmail.com</p>
                    <p>GitHub: <a href="https://github.com/parkjiwonn" target="_blank">github.com/parkjiwonn</a></p>
                </div>
            </div>
        `;
    }
}