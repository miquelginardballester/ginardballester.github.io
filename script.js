// Comprovació que les preguntes es carreguin
console.log('Inicialitzant HistoQuiz SA1.1...');

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Elements del DOM
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const openAnswerContainer = document.getElementById('open-answer-container');
const openAnswer = document.getElementById('open-answer');
const submitBtn = document.getElementById('submit-btn');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');
const progressBarInner = document.getElementById('progress-bar-inner');
const progressText = document.getElementById('progress-text');

// Inicialització del qüestionari
function initQuiz() {
    console.log('Iniciant qüestionari...');
    if (questionsSA11 && questionsSA11.length > 0) {
        showQuestion();
        updateProgress();
    } else {
        showError('No s han pogut carregar les preguntes.');
    }
}

// Mostra la pregunta actual
function showQuestion() {
    const currentQuestion = questionsSA11[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    openAnswerContainer.classList.add('hidden');
    openAnswer.value = '';
    feedbackContainer.classList.add('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envia la resposta';
    
    // Netejar estats anteriors
    userAnswers[currentQuestionIndex] = undefined;
    
    switch (currentQuestion.type) {
        case 'multiple-choice':
            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('option');
                button.addEventListener('click', () => selectOption(index));
                optionsContainer.appendChild(button);
            });
            break;
            
        case 'true-false':
            const trueButton = document.createElement('button');
            trueButton.textContent = 'Verdader';
            trueButton.classList.add('option');
            trueButton.addEventListener('click', () => selectOption(true));
            optionsContainer.appendChild(trueButton);

            const falseButton = document.createElement('button');
            falseButton.textContent = 'Fals';
            falseButton.classList.add('option');
            falseButton.addEventListener('click', () => selectOption(false));
            optionsContainer.appendChild(falseButton);
            break;
            
        case 'fill-blank':
            openAnswerContainer.classList.remove('hidden');
            break;
            
        case 'short-answer':
        case 'long-answer':
            openAnswerContainer.classList.remove('hidden');
            break;
    }
}

// Selecciona una opció en preguntes objectives
function selectOption(selectedIndex) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    event.target.classList.add('selected');
    userAnswers[currentQuestionIndex] = selectedIndex;
}

// Gestiona l'enviament de la resposta
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit() {
    const currentQuestion = questionsSA11[currentQuestionIndex];
    let userAnswer;
    
    // Obtenir la resposta de l'usuari segons el tipus de pregunta
    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false') {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) {
            alert('Si us plau, selecciona una resposta.');
            return;
        }
        userAnswer = userAnswers[currentQuestionIndex];
    } else {
        userAnswer = openAnswer.value.trim();
        if (!userAnswer) {
            alert('Si us plau, escriu una resposta.');
            return;
        }
    }

    // Processar la resposta
    if (currentQuestion.type !== 'short-answer' && currentQuestion.type !== 'long-answer') {
        checkAnswer(userAnswer);
    } else {
        // Per a preguntes obertes, mostrar feedback manual
        submitBtn.disabled = true;
        feedbackText.innerHTML = generateManualFeedback(currentQuestion, userAnswer);
        feedbackContainer.classList.remove('hidden');
    }
}

// Comprova respostes objectives
function checkAnswer(userAnswer) {
    const currentQuestion = questionsSA11[currentQuestionIndex];
    let isCorrect = false;

    switch (currentQuestion.type) {
        case 'multiple-choice':
            isCorrect = userAnswer === currentQuestion.correctAnswer;
            break;
        case 'true-false':
            isCorrect = userAnswer === currentQuestion.correctAnswer;
            break;
        case 'fill-blank':
            isCorrect = currentQuestion.correctAnswer.some(correct => 
                userAnswer.toLowerCase().includes(correct.toLowerCase())
            );
            break;
    }

    if (isCorrect) {
        score++;
    }

    feedbackText.innerHTML = currentQuestion.feedback;
    feedbackContainer.classList.remove('hidden');
    submitBtn.disabled = true;
}

// Genera feedback manual per a preguntes obertes
function generateManualFeedback(question, userAnswer) {
    const userAnswerLower = userAnswer.toLowerCase();
    const modelAnswerLower = question.modelAnswer.toLowerCase();
    
    let feedback = `<h4>📝 La teva resposta:</h4><p>"${userAnswer}"</p>`;
    feedback += `<h4>✅ Resposta model:</h4><p>"${question.modelAnswer}"</p>`;
    feedback += `<h4>💡 Consells:</h4><ul>`;
    
    // Anàlisi bàsic de la resposta
    const keyConcepts = ['crisi', 'esclavista', 'inflació', 'impostos', 'sistema', 'econòmic'];
    const foundConcepts = keyConcepts.filter(concept => 
        modelAnswerLower.includes(concept) && userAnswerLower.includes(concept)
    );
    
    if (foundConcepts.length > 0) {
        feedback += `<li>Molt bé! Has mencionat conceptes clau com: ${foundConcepts.join(', ')}</li>`;
    }
    
    feedback += `<li>Compara la teva resposta amb el model i identifica els punts que podries millorar</li>`;
    feedback += `<li>Assegura't d'incloure tots els elements principals de la pregunta</li>`;
    feedback += `</ul>`;
    
    return feedback;
}

// Gestiona la següent pregunta
nextBtn.addEventListener('click', nextQuestion);

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsSA11.length) {
        showQuestion();
        updateProgress();
    } else {
        showResults();
    }
}

// Actualitza la barra de progrés
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questionsSA11.length) * 100;
    progressBarInner.style.width = progress + '%';
    progressText.textContent = `${currentQuestionIndex + 1}/${questionsSA11.length}`;
}

// Mostra els resultats finals
function showResults() {
    const percentage = Math.round((score / questionsSA11.length) * 100);
    questionText.textContent = `🏁 Has completat el qüestionari!`;
    optionsContainer.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Resultat Final</h3>
            <p style="font-size: 48px; margin: 20px 0; color: #2ecc71;">${score}/${questionsSA11.length}</p>
            <p style="font-size: 18px; color: #7f8c8d;">${percentage}% de respostes correctes</p>
            <p style="margin-top: 20px;">${getPerformanceMessage(percentage)}</p>
            <button onclick="location.reload()" style="margin-top: 20px; background: #3498db;">Tornar a començar</button>
        </div>
    `;
    openAnswerContainer.classList.add('hidden');
    feedbackContainer.classList.add('hidden');
    submitBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
}

// Missatge de rendiment personalitzat
function getPerformanceMessage(percentage) {
    if (percentage >= 90) return '🎉 Excel·lent! Dominas completament aquest tema.';
    if (percentage >= 70) return '👍 Molt bé! Tens una bona comprensió dels conceptes.';
    if (percentage >= 50) return '✅ Bé, però pots millorar. Revisa els conceptes que has fallat.';
    return '💡 No et preocupis, continua practicant! Revisa els materials i torna a intentar-ho.';
}

// Mostra error
function showError(message) {
    document.body.innerHTML = `
        <div class="container" style="text-align: center; padding: 50px;">
            <h1>❌ Error</h1>
            <p>${message}</p>
            <button onclick="location.reload()" style="margin-top: 20px;">Tornar a intentar</button>
        </div>
    `;
}

// Inicialitza el qüestionari quan la pàgina es carrega
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregat, inicialitzant qüestionari...');
    initQuiz();
});