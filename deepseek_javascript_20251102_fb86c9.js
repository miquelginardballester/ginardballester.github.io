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
const quizContainer = document.getElementById('quiz-container');

// Configuració de l'API (per a proves - en producció hauria d'anar en variables d'entorn)
const DEEPSEEK_API_KEY = 'sk-55ece5809ba440a6bf4b78fef318f2ba';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Inicialització del qüestionari
function initQuiz() {
    showQuestion();
    updateProgress();
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

async function handleSubmit() {
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
        // Pregunta oberta - obtenir feedback de la IA
        submitBtn.disabled = true;
        submitBtn.textContent = 'Analitzant resposta...';
        feedbackText.innerHTML = "L'IA està analitzant la teva resposta<span class='typing-indicator'></span>";
        feedbackContainer.classList.remove('hidden');
        
        try {
            const feedback = await getAIFeedback(currentQuestion.question, userAnswer, currentQuestion.modelAnswer);
            feedbackText.innerHTML = feedback;
        } catch (error) {
            console.error('Error:', error);
            feedbackText.innerHTML = "❌ Ho sento, no he pogut generar feedback en aquest moment. Revisa la teva resposta amb el model proporcionat i assegura't que inclou els conceptes clau.";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envia la resposta';
        }
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

// Obté feedback de la IA per a preguntes obertes
async function getAIFeedback(question, userAnswer, modelAnswer) {
    const prompt = `
Ets un professor assistent d'història per a alumnes de 2n d'ESO. L'alumne ha respost una pregunta oberta. Avaluar la seva resposta i proporcionar feedback constructiu en català.

Pregunta: ${question}

Resposta de l'alumne: ${userAnswer}

Resposta model esperada: ${modelAnswer}

Tasca:
1. VALORA si la resposta capta els conceptes clau de la resposta model.
2. SEÑALA errors de fets o omissions importants.
3. SUGGEREIX elements que podria afegir per millorar la resposta.
4. Tona el feedback amable i constructiu, fent èmfasi en el que ha fet bé i com pot millorar.

Respon només amb el feedback per a l'alumne, sense cap encapçalament ni conclusió.
    `;

    const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                { 
                    role: 'system', 
                    content: 'Ets un professor assistent d\'història. Respon sempre en català.' 
                },
                { 
                    role: 'user', 
                    content: prompt 
                }
            ],
            max_tokens: 800,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`Error de l'API: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
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

// Inicialitza el qüestionari quan la pàgina es carrega
document.addEventListener('DOMContentLoaded', initQuiz);