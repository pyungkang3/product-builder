document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    }
});

class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                h1 {
                    font-size: 2.5rem;
                    color: var(--primary-color);
                    text-shadow: 2px 2px 4px var(--shadow-color);
                }
                .numbers {
                    display: flex;
                    justify-content: center;
                    margin: 1rem 0;
                }
                .number {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--secondary-color);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin: 0 0.5rem;
                    box-shadow: 0 4px 8px var(--shadow-color);
                    animation: pop-in 0.5s ease-out forwards;
                    color: #fff;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                }

                @keyframes pop-in {
                    0% {
                        transform: scale(0);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                button {
                    padding: 0.75rem 1.5rem;
                    font-size: 1rem;
                    font-weight: bold;
                    color: white;
                    background-color: var(--primary-color);
                    border: none;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    box-shadow: 0 4px 8px var(--shadow-color);
                    transition: all 0.2s ease;
                }
                button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px var(--shadow-color);
                }
                 button:active {
                    transform: translateY(0);
                    box-shadow: 0 4px 8px var(--shadow-color);
                 }
            </style>
            <div class="wrapper">
                <h1>Lotto Number Generator</h1>
                <div class="numbers"></div>
                <button>Generate</button>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        const button = shadow.querySelector('button');
        const numbersContainer = shadow.querySelector('.numbers');

        button.addEventListener('click', () => {
            this.generateNumbers(numbersContainer);
        });
    }

    getRandomColor() {
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (Math.floor(Math.random() * 156) + 100).toString(16);
            color += value.length < 2 ? '0' + value : value;
        }
        return color;
    }

    generateNumbers(container) {
        container.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach((number, index) => {
            setTimeout(() => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('number');
                numberElement.textContent = number;
                numberElement.style.backgroundColor = this.getRandomColor();
                container.appendChild(numberElement);
            }, index * 200);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);