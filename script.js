document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What is the base unit of length in the metric system?",
            options: ["Inch", "Foot", "Meter", "Yard"],
            answer: "Meter"
        },
        {
            question: "What is the base unit of mass in the metric system?",
            options: ["Pound", "Kilogram", "Gram", "Ounce"],
            answer: "Kilogram"
        },
        {
            question: "What is the base unit of volume in the metric system?",
            options: ["Gallon", "Liter", "Quart", "Pint"],
            answer: "Liter"
        },
        {
            question: "What prefix means 'one thousand' (1000)?",
            options: ["Centi-", "Milli-", "Kilo-", "Deca-"],
            answer: "Kilo-"
        },
        {
            question: "What prefix means 'one hundredth' (1/100)?",
            options: ["Milli-", "Deci-", "Centi-", "Micro-"],
            answer: "Centi-"
        },
        {
            question: "Which of these is used to measure temperature in the metric system?",
            options: ["Fahrenheit", "Rankine", "Celsius", "Kelvin"],
            answer: "Celsius"
        },
        {
            question: "How many centimeters are in a meter?",
            options: ["10", "100", "1000", "10000"],
            answer: "100"
        },
        {
            question: "A milliliter is what fraction of a liter?",
            options: ["1/10", "1/100", "1/1000", "1/10000"],
            answer: "1/1000"
        },
        {
            question: "Which unit would you use to measure the distance between two cities?",
            options: ["Centimeters", "Meters", "Kilometers", "Millimeters"],
            answer: "Kilometers"
        },
        {
            question: "If you have 500 grams of something, how many kilograms do you have?",
            options: ["0.05 kg", "0.5 kg", "5 kg", "50 kg"],
            answer: "0.5 kg"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;

    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const questionNumberElement = document.getElementById('question-number');
    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-button');

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
            questionTextElement.textContent = currentQuestion.question;
            optionsContainer.innerHTML = ''; // Clear previous options
            feedbackElement.textContent = ''; // Clear feedback
            feedbackElement.classList.remove('correct', 'incorrect');
            nextButton.disabled = true; // Disable next button until an option is selected

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.textContent = option;
                button.addEventListener('click', () => selectOption(button, option));
                optionsContainer.appendChild(button);
            });
            selectedOption = null; // Reset selected option
        } else {
            showResultScreen();
        }
    }

    function selectOption(button, option) {
        // Deselect any previously selected option
        const currentSelected = document.querySelector('.option-button.selected');
        if (currentSelected) {
            currentSelected.classList.remove('selected');
        }

        // Select the new option
        button.classList.add('selected');
        selectedOption = option;
        nextButton.disabled = false; // Enable next button once an option is selected
    }

    function checkAnswer() {
        const currentQuestion = questions[currentQuestionIndex];
        const allOptionButtons = optionsContainer.querySelectorAll('.option-button');

        allOptionButtons.forEach(button => {
            button.disabled = true; // Disable all options after checking
            if (button.textContent === currentQuestion.answer) {
                button.classList.add('correct'); // Mark the correct answer
            }
            if (button.textContent === selectedOption && selectedOption !== currentQuestion.answer) {
                button.classList.add('incorrect'); // Mark the user's incorrect answer
            }
        });

        if (selectedOption === currentQuestion.answer) {
            score++;
            feedbackElement.textContent = "Correct!";
            feedbackElement.classList.add('correct');
        } else {
            feedbackElement.textContent = `Incorrect. The correct answer was: ${currentQuestion.answer}`;
            feedbackElement.classList.add('incorrect');
        }
    }

    function goToNextQuestion() {
        if (selectedOption === null) {
            feedbackElement.textContent = "Please select an answer!";
            feedbackElement.classList.add('incorrect');
            return;
        }

        checkAnswer(); // Check the answer before moving on

        // A small delay to allow user to see feedback before next question loads
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500); // 1.5 seconds delay
    }

    function showResultScreen() {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        scoreElement.textContent = score;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        selectedOption = null;
        resultScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        loadQuestion();
    }

    // Event Listeners
    nextButton.addEventListener('click', goToNextQuestion);
    restartButton.addEventListener('click', restartQuiz);

    // Initial load
    loadQuestion();
});