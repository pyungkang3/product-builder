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
        // Expanded rainbow colors for more variety
        this.rainbowColors = [
            '#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#f08080',
            '#ffb703', '#00a896', '#f25f5c', '#7209b7', '#3a86ff', '#fb5607'
        ];

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                h1 {
                    font-size: 3rem; /* Made text a bit bigger */
                    font-weight: bold;
                    /* Rainbow gradient text effect */
                    background: linear-gradient(90deg, #ff595e, #ffca3a, #8ac926, #1982c4, #6a4c93);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    text-shadow: none; /* Remove previous shadow to make gradient clearer */
                }
                .numbers {
                    display: flex;
                    justify-content: center;
                    margin: 1.5rem 0; /* Increased margin */
                }
                .number {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #e0e0e0; /* Neutral starting color */
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
                    border: 2px solid white; /* Added border for pop */
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
                    padding: 0.8rem 2rem; /* Increased padding */
                    font-size: 1.2rem; /* Increased font size */
                    font-weight: bold;
                    color: white;
                    /* Rainbow gradient background */
                    background: linear-gradient(90deg, #6a4c93, #1982c4, #8ac926, #ffca3a, #ff595e);
                    border: none;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    box-shadow: 0 4px 8px var(--shadow-color);
                    transition: all 0.3s ease;
                }
                button:hover {
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 8px 15px var(--shadow-color);
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

    // Shuffle array for more random colors
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    generateNumbers(container) {
        container.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        
        // Shuffle colors every time for a new combination
        this.shuffleArray(this.rainbowColors);

        sortedNumbers.forEach((number, index) => {
            setTimeout(() => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('number');
                numberElement.textContent = number;
                // Use the shuffled rainbow colors
                numberElement.style.backgroundColor = this.rainbowColors[index];
                container.appendChild(numberElement);
            }, index * 200); // Staggered animation
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);