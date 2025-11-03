// Estat de les respostes de l'usuari
const userAnswers = {};

// Inicialitzar les opcions per a les preguntes multiopció
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        const questionId = this.closest('.question').id;
        const value = this.getAttribute('data-value');
        
        // Desseleccionar totes les opcions d'aquesta pregunta
        document.querySelectorAll(`#${questionId} .option`).forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Seleccionar l'opció clicada
        this.classList.add('selected');
        
        // Guardar la resposta
        userAnswers[questionId] = value;
    });
});

// Funció per seleccionar Vertader/Fals
function selectTrueFalse(questionId, value) {
    // Desseleccionar tots els botons d'aquesta pregunta
    document.querySelectorAll(`#${questionId} .true-false-btn`).forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Seleccionar el botó correcte
    if (value) {
        document.querySelector(`#${questionId} .true-btn`).classList.add('selected');
    } else {
        document.querySelector(`#${questionId} .false-btn`).classList.add('selected');
    }
    
    // Guardar la resposta
    userAnswers[questionId] = value;
}

// Funció per comprovar preguntes multiopció
function checkMultipleChoice(questionId, correctValue) {
    const userAnswer = userAnswers[questionId];
    const feedbackEl = document.querySelector(`#${questionId} .feedback`);
    
    // Desseleccionar totes les opcions
    document.querySelectorAll(`#${questionId} .option`).forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    if (userAnswer === undefined) {
        feedbackEl.textContent = "Si us plau, selecciona una resposta abans de comprovar.";
        feedbackEl.className = "feedback incorrect";
        feedbackEl.style.display = "block";
        return;
    }
    
    // Marcar l'opció seleccionada com a correcta o incorrecta
    const selectedOption = document.querySelector(`#${questionId} .option.selected`);
    
    if (userAnswer == correctValue) {
        selectedOption.classList.add('correct');
        feedbackEl.textContent = "✅ Correcte! Has seleccionat la resposta correcta.";
        feedbackEl.className = "feedback correct";
    } else {
        selectedOption.classList.add('incorrect');
        // Marcar també la resposta correcta
        document.querySelector(`#${questionId} .option[data-value="${correctValue}"]`).classList.add('correct');
        feedbackEl.textContent = "❌ Incorrecte. La resposta correcta està marcada en verd.";
        feedbackEl.className = "feedback incorrect";
    }
    
    feedbackEl.style.display = "block";
}

// Funció per comprovar preguntes Vertader/Fals
function checkTrueFalse(questionId, correctValue) {
    const userAnswer = userAnswers[questionId];
    const feedbackEl = document.querySelector(`#${questionId} .feedback`);
    
    if (userAnswer === undefined) {
        feedbackEl.textContent = "Si us plau, selecciona una resposta abans de comprovar.";
        feedbackEl.className = "feedback incorrect";
        feedbackEl.style.display = "block";
        return;
    }
    
    if (userAnswer === correctValue) {
        feedbackEl.textContent = "✅ Correcte! Has seleccionat la resposta correcta.";
        feedbackEl.className = "feedback correct";
    } else {
        feedbackEl.textContent = `❌ Incorrecte. La resposta correcta és: ${correctValue ? 'Vertader' : 'Fals'}.`;
        feedbackEl.className = "feedback incorrect";
    }
    
    feedbackEl.style.display = "block";
}

// Funció per mostrar feedback per a preguntes de desenvolupament
function showDevelopmentFeedback(questionId) {
    const feedbackEl = document.querySelector(`#${questionId} .feedback`);
    feedbackEl.style.display = "block";
}

// Funció per comprovar preguntes d'emplenar buits
function checkFillBlanks(questionId, correctAnswers) {
    let correctCount = 0;
    const totalBlanks = correctAnswers.length;
    const feedbackEl = document.querySelector(`#${questionId} .feedback`);
    let feedbackHTML = "";
    
    for (let i = 0; i < totalBlanks; i++) {
        const inputEl = document.getElementById(`${questionId}-${i}`);
        const userAnswer = inputEl.value.trim().toLowerCase();
        const correctAnswer = correctAnswers[i].toLowerCase();
        
        if (userAnswer === correctAnswer) {
            inputEl.style.backgroundColor = "#d4edda";
            correctCount++;
        } else {
            inputEl.style.backgroundColor = "#f8d7da";
            feedbackHTML += `<p>Per la paraula ${i+1}: "${userAnswer}" no és correcte. Hauria de ser: "${correctAnswers[i]}".</p>`;
        }
    }
    
    if (correctCount === totalBlanks) {
        feedbackEl.innerHTML = "<span style='color: green;'>✅ Tot correcte!</span>";
        feedbackEl.className = "feedback correct";
    } else {
        feedbackEl.innerHTML = `<span style='color: red;'>❌ Has encertat ${correctCount} de ${totalBlanks}.</span>${feedbackHTML}`;
        feedbackEl.className = "feedback incorrect";
    }
    
    feedbackEl.style.display = "block";
}

// Funció per calcular els resultats finals
function calculateResults() {
    let totalQuestions = 0;
    let correctAnswers = 0;
    
    // Comptar preguntes multiopció i vertader/fals
    document.querySelectorAll('.question').forEach(question => {
        const questionId = question.id;
        const feedbackEl = question.querySelector('.feedback');
        
        if (feedbackEl && feedbackEl.classList.contains('correct')) {
            correctAnswers++;
            totalQuestions++;
        } else if (feedbackEl && feedbackEl.classList.contains('incorrect')) {
            totalQuestions++;
        }
    });
    
    // Comptar preguntes d'emplenar buits
    document.querySelectorAll('.fill-blanks').forEach(blankSection => {
        const inputs = blankSection.querySelectorAll('input');
        let allCorrect = true;
        
        inputs.forEach(input => {
            if (input.style.backgroundColor !== "rgb(212, 237, 218)") {
                allCorrect = false;
            }
        });
        
        if (inputs.length > 0) {
            totalQuestions++;
            if (allCorrect) correctAnswers++;
        }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const scoreEl = document.getElementById('score');
    const summaryEl = document.getElementById('summary');
    
    scoreEl.textContent = `Puntuació: ${score}% (${correctAnswers} de ${totalQuestions} correctes)`;
    
    let summaryHTML = "<h3>Resum:</h3><ul>";
    document.querySelectorAll('.section').forEach(section => {
        const sectionTitle = section.querySelector('h2').textContent;
        let sectionCorrect = 0;
        let sectionTotal = 0;
        
        // Comptar preguntes correctes dins d'aquesta secció
        section.querySelectorAll('.question').forEach(question => {
            const feedbackEl = question.querySelector('.feedback');
            
            if (feedbackEl && feedbackEl.classList.contains('correct')) {
                sectionCorrect++;
                sectionTotal++;
            } else if (feedbackEl && (feedbackEl.classList.contains('incorrect') || feedbackEl.classList.contains('info'))) {
                sectionTotal++;
            }
        });
        
        const sectionScore = sectionTotal > 0 ? Math.round((sectionCorrect / sectionTotal) * 100) : 0;
        summaryHTML += `<li>${sectionTitle}: ${sectionScore}% (${sectionCorrect} de ${sectionTotal})</li>`;
    });
    
    summaryHTML += "</ul>";
    summaryEl.innerHTML = summaryHTML;
}