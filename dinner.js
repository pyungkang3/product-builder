class DinnerRecommender extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const dinnerOptions = ['피자', '치킨', '햄버거', '초밥', '파스타', '국밥', '김치찌개', '된장찌개', '카레', '라면'];
        const randomIndex = Math.floor(Math.random() * dinnerOptions.length);
        const recommendedDinner = dinnerOptions[randomIndex];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    text-align: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: var(--text-color, #333);
                    background-color: var(--background-color, #fff);
                    padding: 40px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                h1 {
                    font-size: 3em;
                    color: var(--primary-color, #4a90e2);
                    margin-bottom: 20px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                }
                p {
                    font-size: 1.5em;
                    margin-bottom: 30px;
                }
                button {
                    font-size: 1.2em;
                    padding: 15px 30px;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    color: white;
                    background: linear-gradient(45deg, #4a90e2, #81c784);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                    font-weight: bold;
                }
                button:hover, button:focus {
                    transform: translateY(-3px);
                    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.3);
                    outline: none;
                }
                #recommendation {
                    font-weight: bold;
                    color: var(--accent-color, #d9534f);
                    font-size: 2em;
                }
            </style>
            <h1>오늘 저녁 뭐 먹지?</h1>
            <p>버튼을 눌러 추천 메뉴를 확인하세요!</p>
            <button id="recommendBtn">추천!</button>
            <p id="recommendation">${recommendedDinner}</p>
        `;

        this.shadowRoot.getElementById('recommendBtn').addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * dinnerOptions.length);
            const newRecommendation = dinnerOptions[randomIndex];
            this.shadowRoot.getElementById('recommendation').textContent = newRecommendation;
        });
    }
}

customElements.define('dinner-recommender', DinnerRecommender);