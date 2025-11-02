// QÜESTIONARI UNIFICAT AMB IA
let currentQuestionIndex = 0;
let selectedSA = 'all';
let score = 0;
let userAnswers = new Array(allQuestions.length).fill(null);
let saScores = { 'SA1.1': 0, 'SA1.2': 0, 'SA1.3': 0, 'SA1.4': 0 };

// Elements del DOM
const saIndex = document.getElementById('sa-index');
const quizContainer = document.getElementById('quiz-container');
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
const currentSA = document.getElementById('current-sa');
const questionCounter = document.getElementById('question-counter');

// Inicialització
document.addEventListener('DOMContentLoaded', function() {
    initSAButtons();
});

// Configuració dels botons de SA
function initSAButtons() {
    const saButtons = document.querySelectorAll('.sa-btn');
    saButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedSA = this.getAttribute('data-sa');
            startQuiz();
        });
    });
}

// Iniciar el qüestionari
function startQuiz() {
    saIndex.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.fill(null);
    resetSAScores();
    showQuestion();
    updateProgress();
}

// Reiniciar puntuacions per SA
function resetSAScores() {
    saScores = { 'SA1.1': 0, 'SA1.2': 0, 'SA1.3': 0, 'SA1.4': 0 };
}

// Mostrar pregunta actual
function showQuestion() {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) {
        showResults();
        return;
    }

    currentSA.textContent = currentQuestion.sa;
    questionCounter.textContent = `${currentQuestionIndex + 1}/${getTotalQuestions()}`;
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    openAnswerContainer.classList.add('hidden');
    openAnswer.value = '';
    feedbackContainer.classList.add('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envia la resposta';
    
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
            ['Verdader', 'Fals'].forEach((text, index) => {
                const button = document.createElement('button');
                button.textContent = text;
                button.classList.add('option');
                button.addEventListener('click', () => selectOption(index === 0));
                optionsContainer.appendChild(button);
            });
            break;
            
        case 'fill-blank':
        case 'short-answer':
        case 'long-answer':
            openAnswerContainer.classList.remove('hidden');
            break;
    }
}

// Obtenir pregunta actual
function getCurrentQuestion() {
    const questions = getFilteredQuestions();
    return questions[currentQuestionIndex];
}

// Obtenir preguntes filtrades per SA
function getFilteredQuestions() {
    if (selectedSA === 'all') return allQuestions;
    return allQuestions.filter(q => q.sa === `SA1.${selectedSA}`);
}

// Obtenir total de preguntes
function getTotalQuestions() {
    return getFilteredQuestions().length;
}

// Seleccionar opció
function selectOption(selectedIndex) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    event.target.classList.add('selected');
    userAnswers[currentQuestionIndex] = selectedIndex;
}

// Gestionar enviament
submitBtn.addEventListener('click', handleSubmit);

async function handleSubmit() {
    const currentQuestion = getCurrentQuestion();
    let userAnswer;
    
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

    if (currentQuestion.type !== 'short-answer' && currentQuestion.type !== 'long-answer') {
        checkAnswer(userAnswer, currentQuestion);
    } else {
        await getAIFeedback(currentQuestion, userAnswer);
    }
}

// Comprovar respostes objectives
function checkAnswer(userAnswer, question) {
    let isCorrect = false;

    switch (question.type) {
        case 'multiple-choice':
            isCorrect = userAnswer === question.correctAnswer;
            break;
        case 'true-false':
            isCorrect = userAnswer === question.correctAnswer;
            break;
        case 'fill-blank':
            isCorrect = question.correctAnswer.some(correct => 
                userAnswer.toLowerCase().includes(correct.toLowerCase())
            );
            break;
    }

    if (isCorrect) {
        score++;
        saScores[question.sa] = (saScores[question.sa] || 0) + 1;
    }

    feedbackText.innerHTML = question.feedback;
    feedbackContainer.classList.remove('hidden');
    submitBtn.disabled = true;
}

// Obtenir feedback de la IA
async function getAIFeedback(question, userAnswer) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Analitzant amb IA...';
    feedbackText.innerHTML = "🧠 La IA està analitzant la teva resposta<span class='typing-indicator'></span>";
    feedbackContainer.classList.remove('hidden');
    
    try {
        const response = await fetch('/.netlify/functions/feedback-ia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: question.question,
                userAnswer: userAnswer,
                modelAnswer: question.modelAnswer,
                sa: question.sa
            })
        });

        if (!response.ok) throw new Error('Error en la resposta del servidor');

        const data = await response.json();
        feedbackText.innerHTML = data.feedback;
        
    } catch (error) {
        console.error('Error:', error);
        feedbackText.innerHTML = generateManualFeedback(question, userAnswer);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envia la resposta';
    }
}

// Feedback manual de reserva
function generateManualFeedback(question, userAnswer) {
    const userAnswerLower = userAnswer.toLowerCase();
    const modelAnswerLower = question.modelAnswer.toLowerCase();
    
    let feedback = `<h4>📝 La teva resposta:</h4><p>"${userAnswer}"</p>`;
    feedback += `<h4>✅ Resposta model:</h4><p>"${question.modelAnswer}"</p>`;
    feedback += `<h4>💡 Consells de millora:</h4><ul>`;
    
    const keyWords = question.modelAnswer.toLowerCase().split(' ').filter(word => word.length > 4);
    const foundWords = keyWords.filter(word => userAnswerLower.includes(word));
    
    if (foundWords.length > 0) {
        feedback += `<li>Molt bé! Has utilitzat conceptes clau com: ${foundWords.slice(0, 3).join(', ')}</li>`;
    }
    
    feedback += `<li>Compara la teva resposta amb el model i identifica els punts que podries millorar</li>`;
    feedback += `<li>Assegura't d'incloure tots els elements principals que es demanen a l'enunciat</li>`;
    feedback += `</ul>`;
    
    return feedback;
}

// Següent pregunta
nextBtn.addEventListener('click', nextQuestion);

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < getTotalQuestions()) {
        showQuestion();
        updateProgress();
    } else {
        showResults();
    }
}

// Actualitzar progrés
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / getTotalQuestions()) * 100;
    progressBarInner.style.width = progress + '%';
    progressText.textContent = `Progrés: ${Math.round(progress)}%`;
}

// Mostrar resultats
function showResults() {
    const totalQuestions = getTotalQuestions();
    const percentage = Math.round((score / totalQuestions) * 100);
    
    let resultsHTML = `
        <div class="results">
            <h2>🏁 Resultats Finals</h2>
            <p style="font-size: 48px; margin: 20px 0; color: #2ecc71;">${score}/${totalQuestions}</p>
            <p style="font-size: 24px; color: #7f8c8d;">${percentage}% de respostes correctes</p>
            <p style="margin: 20px 0; font-size: 18px;">${getPerformanceMessage(percentage)}</p>
    `;

    // Resultats per SA
    if (selectedSA === 'all') {
        resultsHTML += `<h3>Resultats per Situació d'Aprenentatge:</h3>`;
        Object.keys(saScores).forEach(sa => {
            const saQuestions = allQuestions.filter(q => q.sa === sa).length;
            const saScore = saScores[sa] || 0;
            const saPercentage = Math.round((saScore / saQuestions) * 100);
            resultsHTML += `
                <div class="sa-result">
                    <strong>${sa}:</strong> ${saScore}/${saQuestions} (${saPercentage}%)
                </div>
            `;
        });
    }

    resultsHTML += `
            <button onclick="location.reload()" style="margin-top: 30px; background: #3498db; padding: 15px 30px;">
                Tornar a l'Inici
            </button>
        </div>
    `;

    questionText.textContent = '';
    optionsContainer.innerHTML = resultsHTML;
    openAnswerContainer.classList.add('hidden');
    feedbackContainer.classList.add('hidden');
    submitBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
}

// Missatge de rendiment
function getPerformanceMessage(percentage) {
    if (percentage >= 90) return '🎉 Excel·lent! Dominas completament tots els temes.';
    if (percentage >= 70) return '👍 Molt bé! Tens una bona comprensió dels conceptes.';
    if (percentage >= 50) return '✅ Bé, però pots millorar. Revisa els conceptes que has fallat.';
    return '💡 No et preocupis, continua practicant! Revisa els materials i torna a intentar-ho.';
}