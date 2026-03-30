// RADAR Scanner — Quiz Logic
// R = Reconocimiento, A = Automatización, D = Datos, A = Adaptación, R = Resultados

const QUESTIONS = [
    {
        category: "R — RECONOCIMIENTO",
        letter: "R",
        question: "¿Tu empresa ha mapeado qué procesos operativos podrían beneficiarse de IA?",
        options: [
            { text: "No hemos pensado en ello todavía", score: 1 },
            { text: "Tenemos una idea general, pero nada documentado", score: 2 },
            { text: "Hemos identificado 3-5 procesos concretos", score: 3 },
            { text: "Tenemos un mapa completo de oportunidades priorizado", score: 4 },
            { text: "Revisamos y actualizamos el mapa cada trimestre", score: 5 },
        ]
    },
    {
        category: "A — AUTOMATIZACIÓN",
        letter: "A",
        question: "¿Qué nivel de automatización tienen vuestros procesos de reporting y alertas?",
        options: [
            { text: "Todo es manual: Excel, emails, reuniones", score: 1 },
            { text: "Algunos informes se generan automáticamente", score: 2 },
            { text: "Tenemos dashboards con datos en tiempo real", score: 3 },
            { text: "Alertas automáticas + reporting sin intervención humana", score: 4 },
            { text: "Automatización end-to-end con decisiones autónomas", score: 5 },
        ]
    },
    {
        category: "D — DATOS",
        letter: "D",
        question: "¿Cómo de conectados están vuestros datos operativos?",
        options: [
            { text: "Datos en silos: cada departamento tiene los suyos", score: 1 },
            { text: "Algunos sistemas conectados, pero con gaps", score: 2 },
            { text: "Data warehouse centralizado, pero no en tiempo real", score: 3 },
            { text: "Datos unificados en tiempo real con una única fuente de verdad", score: 4 },
            { text: "Data lake + ML pipelines que alimentan modelos predictivos", score: 5 },
        ]
    },
    {
        category: "A — ADAPTACIÓN",
        letter: "A",
        question: "¿Vuestros sistemas sugieren acciones o solo muestran datos?",
        options: [
            { text: "Solo muestran datos históricos", score: 1 },
            { text: "Muestran datos en tiempo real, pero las decisiones son 100% humanas", score: 2 },
            { text: "Algunos sistemas sugieren acciones (demand sensing, forecasting)", score: 3 },
            { text: "El sistema sugiere y el humano aprueba o corrige", score: 4 },
            { text: "Decisiones autónomas en áreas clave (pricing, rutas, stock)", score: 5 },
        ]
    },
    {
        category: "R — RESULTADOS",
        letter: "R",
        question: "¿Cómo medís el impacto de la tecnología/IA en vuestras operaciones?",
        options: [
            { text: "No lo medimos específicamente", score: 1 },
            { text: "Métricas generales (costes, plazos) sin atribuir a IA", score: 2 },
            { text: "KPIs antes/después de implementar cada herramienta", score: 3 },
            { text: "ROI documentado por proyecto con impacto en P&L", score: 4 },
            { text: "IA es motor estratégico: ventaja competitiva medida y reportada al board", score: 5 },
        ]
    }
];

const LEVELS = [
    { min: 5,  max: 8,  name: "Nivel R — Reconocimiento", color: "#dc4b4b",
      desc: "Tu empresa está en la fase inicial. Habéis identificado que la IA existe, pero aún no hay un plan concreto. No estáis solos: el 80% del retail español está aquí.",
      action: "Empieza por mapear tus 3 procesos más repetitivos y calcula cuántas horas/semana consumen. Ese es tu primer business case para IA." },
    { min: 9,  max: 12, name: "Nivel A — Automatización", color: "#c89633",
      desc: "Ya tenéis automatizaciones puntuales (reporting, alertas). Buen inicio, pero son islas. El reto ahora es conectarlas en un flujo coherente.",
      action: "Audita tus automatizaciones actuales: ¿se hablan entre sí? Define un flujo end-to-end para un proceso clave (ej: pedido → entrega) y automatiza los gaps." },
    { min: 13, max: 17, name: "Nivel D — Datos", color: "#4a5adc",
      desc: "Tenéis infraestructura de datos decente. El desafío es la calidad y la velocidad: ¿los datos son fiables? ¿Llegan a tiempo para decidir?",
      action: "Implementa una 'fuente única de verdad' para tu KPI más crítico. Cuando toda la organización mire el mismo número en tiempo real, todo cambia." },
    { min: 18, max: 21, name: "Nivel A — Adaptación", color: "#6e916e",
      desc: "Vuestros sistemas no solo muestran datos, sugieren acciones. Estáis en el top 10% del retail español. El siguiente paso es confiar más en el sistema.",
      action: "Identifica un área donde el sistema pueda tomar decisiones autónomas con supervisión humana ligera. Demand sensing o pricing dinámico son buenos candidatos." },
    { min: 22, max: 25, name: "Nivel R — Resultados", color: "#9b59b6",
      desc: "La IA es un motor estratégico en tu empresa. Medís ROI, el board lo entiende, y es ventaja competitiva real. Sois la excepción en España.",
      action: "Comparte tu experiencia. Habla en foros, publica casos de estudio. Tu empresa es referente y el sector necesita ejemplos reales como el vuestro." },
];

let currentQ = 0;
let answers = [];

function startQuiz() {
    document.getElementById('screen-intro').classList.remove('active');
    document.getElementById('screen-quiz').classList.add('active');
    showQuestion(0);
}

function showQuestion(idx) {
    currentQ = idx;
    const q = QUESTIONS[idx];
    document.getElementById('q-counter').textContent = `Pregunta ${idx + 1} de 5`;
    document.getElementById('progress-fill').style.width = `${(idx + 1) * 20}%`;

    const area = document.getElementById('question-area');
    area.innerHTML = `
        <div class="question-card">
            <div class="q-category">${q.category}</div>
            <p>${q.question}</p>
            <div class="options">
                ${q.options.map((opt, i) => `
                    <div class="option" onclick="selectOption(${idx}, ${i}, ${opt.score})">
                        <div class="opt-score">${opt.score}</div>
                        <div class="opt-text">${opt.text}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function selectOption(qIdx, optIdx, score) {
    // Visual feedback
    document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
    document.querySelectorAll('.option')[optIdx].classList.add('selected');

    answers[qIdx] = score;

    // Auto-advance after brief delay
    setTimeout(() => {
        if (qIdx < QUESTIONS.length - 1) {
            showQuestion(qIdx + 1);
        } else {
            showResults();
        }
    }, 500);
}

function showResults() {
    document.getElementById('screen-quiz').classList.remove('active');
    document.getElementById('screen-results').classList.add('active');

    const total = answers.reduce((a, b) => a + b, 0);
    const level = LEVELS.find(l => total >= l.min && total <= l.max) || LEVELS[0];

    // Animate score
    const scoreEl = document.getElementById('score-number');
    let current = 0;
    const interval = setInterval(() => {
        current++;
        scoreEl.textContent = current;
        if (current >= total) clearInterval(interval);
    }, 60);

    document.getElementById('score-circle').style.borderColor = level.color;
    scoreEl.style.color = level.color;
    document.getElementById('result-badge').style.borderColor = level.color;
    document.getElementById('result-badge').style.color = level.color;
    document.getElementById('result-level').textContent = level.name;
    document.getElementById('result-desc').textContent = level.desc;
    document.getElementById('result-action').textContent = level.action;

    // Radar chart bars
    const chartEl = document.getElementById('radar-chart');
    const colors = ['#dc4b4b', '#c89633', '#4a5adc', '#6e916e', '#9b59b6'];
    const letters = ['R', 'A', 'D', 'A', 'R'];
    chartEl.innerHTML = answers.map((score, i) => {
        const h = (score / 5) * 140;
        return `
            <div class="radar-bar">
                <div class="bar-score">${score}/5</div>
                <div class="bar-fill" style="height: ${h}px; background: ${colors[i]};"></div>
                <div class="bar-label" style="color: ${colors[i]};">${letters[i]}</div>
            </div>
        `;
    }).join('');
}

// PDF download is now a direct link to the static PDF asset — no JS needed
