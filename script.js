// Variables globales
let currentSection = 1;
const totalSections = 4;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    updateNavigation();
});

function changeSection(direction) {
    const currentSectionElement = document.getElementById(`section${currentSection}`);
    
    // Validation avant de passer à la section suivante
    if (direction === 1 && !validateCurrentSection()) {
        return;
    }
    
    // Cacher la section actuelle
    currentSectionElement.style.display = 'none';
    
    // Changer de section
    currentSection += direction;
    
    // Afficher la nouvelle section
    const newSectionElement = document.getElementById(`section${currentSection}`);
    newSectionElement.style.display = 'block';
    
    // Mettre à jour les boutons et la barre de progression
    updateNavigation();
    updateProgress();
    
    // Scroll vers le haut
    window.scrollTo(0, 0);
}

function validateCurrentSection() {
    const section = document.getElementById(`section${currentSection}`);
    const requiredInputs = section.querySelectorAll('input[type="radio"]');
    
    // Vérifier si au moins une option est sélectionnée pour chaque groupe
    const radioGroups = {};
    requiredInputs.forEach(input => {
        if (!radioGroups[input.name]) {
            radioGroups[input.name] = false;
        }
        if (input.checked) {
            radioGroups[input.name] = true;
        }
    });
    
    for (const groupName in radioGroups) {
        if (!radioGroups[groupName]) {
            alert('Veuillez répondre à toutes les questions avant de continuer.');
            return false;
        }
    }
    
    return true;
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Bouton précédent
    prevBtn.style.display = currentSection > 1 ? 'block' : 'none';
    
    // Boutons suivant/soumettre
    if (currentSection < totalSections) {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const percentage = (currentSection / totalSections) * 100;
    progressFill.style.width = percentage + '%';
}

function submitSurvey() {
    console.log('submitSurvey called');
    
    // Collecter toutes les données du formulaire
    const formData = new FormData(document.getElementById('surveyForm'));
    
    // Calculer le score pour chaque style
    const scores = {
        sniper: 0,
        observateur: 0,
        constructeur: 0,
        attentiste: 0
    };
    
    // Compter les réponses pour chaque style
    const questions = ['prospection', 'mandats', 'organisation', 'valorisation', 'negociation', 'closing', 'resultats', 'force'];
    
    console.log('Analyzing answers:');
    questions.forEach(question => {
        const answer = formData.get(question);
        console.log(`${question}: ${answer}`);
        if (answer && scores.hasOwnProperty(answer)) {
            scores[answer]++;
        }
    });
    
    console.log('Final scores:', scores);
    
    // Déterminer le style dominant
    let maxScore = 0;
    let dominantStyle = '';
    
    for (const style in scores) {
        if (scores[style] > maxScore) {
            maxScore = scores[style];
            dominantStyle = style;
        }
    }
    
    console.log('Dominant style:', dominantStyle);
    
    // Préparer les données pour sauvegarde
    const data = {
        timestamp: new Date().toISOString(),
        scores: scores,
        dominantStyle: dominantStyle,
        responses: Object.fromEntries(formData)
    };
    
    // Sauvegarder dans le localStorage
    saveResponse(data);
    
    // Afficher le résultat
    showStyleResult(dominantStyle, scores);
}

function showStyleResult(dominantStyle, scores) {
    // Cacher le formulaire
    document.getElementById('surveyForm').style.display = 'none';
    
    // Créer la page de résultat
    const resultDiv = document.getElementById('results');
    
    const styleInfo = getStyleInfo(dominantStyle);
    
    resultDiv.innerHTML = `
        <div class="result-header">
            <div class="result-animal">${styleInfo.emoji}</div>
            <h2>Votre Style d'Agent : ${styleInfo.name}</h2>
            <p class="result-subtitle">${styleInfo.subtitle}</p>
        </div>
        
        <div class="result-description">
            <p><strong>${styleInfo.description}</strong></p>
        </div>
        
        <div class="result-strengths">
            <h3>Vos Forces Principales</h3>
            <ul>
                ${styleInfo.strengths.map(strength => `<li>✔ ${strength}</li>`).join('')}
            </ul>
        </div>
        
        <div class="result-areas">
            <h3>Axes de Progression</h3>
            <ul>
                ${styleInfo.areas.map(area => `<li>➤ ${area}</li>`).join('')}
            </ul>
        </div>
        
        <div class="result-quote">
            <p><em>"${styleInfo.quote}"</em></p>
        </div>
        
        <div class="result-advice">
            <h3>💡 Conseil Personnalisé</h3>
            <p>${styleInfo.advice}</p>
        </div>
        
        <div class="result-scores">
            <h3>Répartition de vos réponses</h3>
            <div class="score-bars">
                ${Object.entries(scores).map(([style, score]) => `
                    <div class="score-item">
                        <span class="score-label">${getStyleInfo(style).name}</span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${(score/8)*100}%"></div>
                        </div>
                        <span class="score-value">${score}/8</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="result-actions">
            <button onclick="exportResults()">Télécharger mon profil</button>
            <button onclick="resetSurvey()">Refaire le test</button>
        </div>
    `;
    
    resultDiv.style.display = 'block';
    window.scrollTo(0, 0);
}

function getStyleInfo(style) {
    const styles = {
        sniper: {
            name: 'Le Sniper',
            emoji: '🦅',
            subtitle: 'Précis, méthodique, vise l\'impact avec peu de mandats',
            description: 'Vous êtes un agent ultra-efficace qui privilégie l\'analyse stratégique et les actions rentables. Votre approche ciblée vous permet d\'obtenir d\'excellents résultats avec moins d\'efforts.',
            strengths: [
                'Ciblage ultra-efficace des prospects',
                'Analyse stratégique pointue',
                'Actions rentables et précises',
                'Efficacité remarquable'
            ],
            areas: [
                'Travailler le relationnel',
                'Éviter la paralysie par perfectionnisme',
                'Développer la patience avec les clients'
            ],
            quote: 'Il vise juste pour conclure efficacement.',
            advice: 'Ajoutez une question d\'écoute active à votre pitch pour créer plus de lien : "Qu\'est-ce qui compte le plus pour vous dans ce projet ?" Vous restez dans votre style direct, mais vous gagnez en relationnel.'
        },
        observateur: {
            name: 'L\'Observateur',
            emoji: '🦉',
            subtitle: 'Prudent, en retrait, analyse avant d\'agir',
            description: 'Vous privilégiez l\'écoute, la réflexion et l\'empathie pour mieux comprendre vos clients. Votre approche bienveillante crée une confiance durable.',
            strengths: [
                'Sens de l\'écoute exceptionnel',
                'Réflexion approfondie',
                'Empathie naturelle',
                'Capacité d\'analyse des situations'
            ],
            areas: [
                'Passer à l\'action plus rapidement',
                'Prendre confiance en ses recommandations',
                'Assumer sa posture d\'expert'
            ],
            quote: 'Il agit avec justesse au bon moment.',
            advice: 'Posez une question ouverte pour valider votre analyse avant d\'agir : "Si je comprends bien, ce qui est le plus important pour vous, c\'est... ?" Cela vous donnera confiance pour passer à l\'action.'
        },
        constructeur: {
            name: 'Le Constructeur',
            emoji: '🐘',
            subtitle: 'Régulier, structuré, bon CA, volume maîtrisé',
            description: 'Vous misez sur l\'organisation et la stabilité des résultats. Votre méthode éprouvée et votre constance vous permettent de bâtir une activité solide.',
            strengths: [
                'Organisation exemplaire',
                'Méthode de travail éprouvée',
                'Stabilité des résultats',
                'Relations durables avec les clients'
            ],
            areas: [
                'Gagner en fluidité',
                'Mieux déléguer certaines tâches',
                'Oser sortir de sa zone de confort'
            ],
            quote: 'Il ne se presse pas, il construit.',
            advice: 'Utilisez une relance proactive pour dynamiser votre cycle : "Je vous propose une avancée concrète, êtes-vous prêt à l\'envisager ?" Cela accélère vos processus tout en gardant votre approche structurée.'
        },
        attentiste: {
            name: 'L\'Attentiste',
            emoji: '🐱',
            subtitle: 'Calme, patient, bon portefeuille mais CA faible',
            description: 'Vous excellez dans l\'analyse stratégique et cultivez les relations de confiance. Votre patience et votre finesse d\'observation sont vos atouts majeurs.',
            strengths: [
                'Analyse stratégique fine',
                'Écoute attentive et bienveillante',
                'Relations de confiance solides',
                'Patience et persévérance'
            ],
            areas: [
                'Valorisation des biens',
                'Stratégies de closing',
                'Discipline commerciale',
                'Création d\'urgence'
            ],
            quote: 'Fin et vigilant, il observe et agit avec patience et précision.',
            advice: 'Vous n\'avez pas besoin de faire plus, mais de mieux exploiter ce que vous avez déjà. Apprenez à créer des leviers de décision, à mettre en valeur vos mandats et à structurer vos suivis clients.'
        }
    };
    
    return styles[style] || styles.attentiste;
}

function saveResponse(data) {
    let responses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
    responses.push(data);
    localStorage.setItem('surveyResponses', JSON.stringify(responses));
}

function exportResults() {
    const responses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
    
    if (responses.length === 0) {
        alert('Aucune donnée à exporter.');
        return;
    }
    
    // Créer le CSV
    const headers = ['Timestamp', 'Style Dominant', 'Score Sniper', 'Score Observateur', 'Score Constructeur', 'Score Attentiste'];
    let csv = headers.join(',') + '\n';
    
    responses.forEach(response => {
        const row = [
            response.timestamp,
            response.dominantStyle,
            response.scores.sniper,
            response.scores.observateur,
            response.scores.constructeur,
            response.scores.attentiste
        ];
        csv += row.join(',') + '\n';
    });
    
    // Télécharger le fichier
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `profil-agent-immobilier-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function resetSurvey() {
    // Réinitialiser le formulaire
    document.getElementById('surveyForm').reset();
    
    // Réinitialiser les sections
    for (let i = 1; i <= totalSections; i++) {
        document.getElementById(`section${i}`).style.display = i === 1 ? 'block' : 'none';
    }
    
    currentSection = 1;
    
    // Réinitialiser l'interface
    document.getElementById('results').style.display = 'none';
    document.getElementById('surveyForm').style.display = 'block';
    
    updateNavigation();
    updateProgress();
    
    window.scrollTo(0, 0);
}
