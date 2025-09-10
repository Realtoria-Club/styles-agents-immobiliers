// Variables globales
let currentSection = 1;
const totalSections = 4;
let surveyData = {};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupEventListeners();
    loadExistingResults();
});

function setupEventListeners() {
    // Slider pour l'importance
    const importanceRange = document.getElementById('importanceRange');
    const ratingValue = document.getElementById('ratingValue');
    
    importanceRange.addEventListener('input', function() {
        ratingValue.textContent = this.value;
    });

    // Limitation des checkboxes à 3 maximum
    const checkboxes = document.querySelectorAll('input[name="priorities"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checked = document.querySelectorAll('input[name="priorities"]:checked');
            const warning = document.querySelector('.checkbox-limit-warning') || createWarning();
            
            if (checked.length > 3) {
                this.checked = false;
                warning.style.display = 'block';
                warning.textContent = 'Vous ne pouvez sélectionner que 3 priorités maximum.';
            } else {
                warning.style.display = 'none';
            }
        });
    });

    // Soumission du formulaire
    document.getElementById('surveyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitSurvey();
    });
}

function createWarning() {
    const warning = document.createElement('div');
    warning.className = 'checkbox-limit-warning';
    document.querySelector('.checkbox-group').appendChild(warning);
    return warning;
}

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
    
    questions.forEach(question => {
        const answer = formData.get(question);
        if (answer && scores.hasOwnProperty(answer)) {
            scores[answer]++;
        }
    });
    
    // Déterminer le style dominant
    let maxScore = 0;
    let dominantStyle = '';
    
    for (const style in scores) {
        if (scores[style] > maxScore) {
            maxScore = scores[style];
            dominantStyle = style;
        }
    }
    
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
            <button onclick="viewAllResults()">Voir toutes les statistiques</button>
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

function loadExistingResults() {
    const responses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
    console.log(`${responses.length} réponses enregistrées`);
}

function viewResults() {
    const responses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
    
    if (responses.length === 0) {
        alert('Aucune réponse enregistrée pour le moment.');
        return;
    }
    
    document.getElementById('results').style.display = 'none';
    document.getElementById('resultsTable').style.display = 'block';
    
    generateStats(responses);
}

function generateStats(responses) {
    const container = document.getElementById('statsContainer');
    container.innerHTML = '';
    
    // Statistiques par âge
    const ageStats = calculateStats(responses, 'age');
    createStatsSection('Répartition par âge', ageStats, container);
    
    // Statistiques par expérience
    const experienceStats = calculateStats(responses, 'experience');
    createStatsSection('Répartition par expérience', experienceStats, container);
    
    // Statistiques par style préféré
    const styleStats = calculateStats(responses, 'style');
    createStatsSection('Styles d\'agents préférés', styleStats, container);
    
    // Statistiques par mode de communication
    const commStats = calculateStats(responses, 'communication');
    createStatsSection('Modes de communication préférés', commStats, container);
    
    // Importance moyenne
    const avgImportance = responses.reduce((sum, r) => sum + parseInt(r.importance), 0) / responses.length;
    const importanceDiv = document.createElement('div');
    importanceDiv.className = 'stats-item';
    importanceDiv.innerHTML = `
        <h3>Importance moyenne du style d'agent</h3>
        <p><strong>${avgImportance.toFixed(1)}/10</strong></p>
    `;
    container.appendChild(importanceDiv);
    
    // Nombre total de réponses
    const totalDiv = document.createElement('div');
    totalDiv.className = 'stats-item';
    totalDiv.innerHTML = `
        <h3>Nombre total de réponses</h3>
        <p><strong>${responses.length}</strong> participant(s)</p>
    `;
    container.appendChild(totalDiv);
}

function calculateStats(responses, field) {
    const counts = {};
    responses.forEach(response => {
        const value = response[field];
        if (value) {
            counts[value] = (counts[value] || 0) + 1;
        }
    });
    
    const total = responses.length;
    const stats = {};
    for (const key in counts) {
        stats[key] = {
            count: counts[key],
            percentage: (counts[key] / total * 100).toFixed(1)
        };
    }
    
    return stats;
}

function createStatsSection(title, stats, container) {
    const section = document.createElement('div');
    section.className = 'stats-item';
    
    let html = `<h3>${title}</h3>`;
    
    for (const key in stats) {
        const stat = stats[key];
        html += `
            <div style="margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>${formatLabel(key)}</span>
                    <span><strong>${stat.count}</strong> (${stat.percentage}%)</span>
                </div>
                <div class="stats-bar">
                    <div class="stats-fill" style="width: ${stat.percentage}%"></div>
                </div>
            </div>
        `;
    }
    
    section.innerHTML = html;
    container.appendChild(section);
}

function formatLabel(key) {
    const labels = {
        'moins-25': 'Moins de 25 ans',
        '26-35': '26-35 ans',
        '36-45': '36-45 ans',
        '46-55': '46-55 ans',
        'plus-55': 'Plus de 55 ans',
        'premiere-fois': 'Première expérience',
        '2-3-fois': '2-3 transactions',
        'plus-3': 'Plus de 3 transactions',
        'professionnel': 'Professionnel',
        'le-sniper': 'Le Sniper 🦅',
        'l-observateur': 'L\'Observateur 🦉',
        'le-constructeur': 'Le Constructeur 🐘',
        'l-attentiste': 'L\'Attentiste 🐱',
        'telephone': 'Téléphone',
        'email': 'Email',
        'sms': 'SMS/WhatsApp',
        'video': 'Visioconférence',
        'personne': 'En personne'
    };
    
    return labels[key] || key;
}

function exportResults() {
    const responses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
    
    if (responses.length === 0) {
        alert('Aucune donnée à exporter.');
        return;
    }
    
    // Créer le CSV
    const headers = ['Timestamp', 'Age', 'Experience', 'Style', 'Priorities', 'Communication', 'Importance', 'Comments'];
    let csv = headers.join(',') + '\n';
    
    responses.forEach(response => {
        const row = [
            response.timestamp,
            response.age || '',
            response.experience || '',
            response.style || '',
            response.priorities ? response.priorities.join(';') : '',
            response.communication || '',
            response.importance || '',
            `"${(response.comments || '').replace(/"/g, '""')}"`
        ];
        csv += row.join(',') + '\n';
    });
    
    // Télécharger le fichier
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sondage-agents-immobiliers-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function hideResults() {
    document.getElementById('resultsTable').style.display = 'none';
    document.getElementById('results').style.display = 'block';
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
    document.getElementById('resultsTable').style.display = 'none';
    document.getElementById('surveyForm').style.display = 'block';
    
    updateNavigation();
    updateProgress();
    
    // Réinitialiser la valeur du slider
    document.getElementById('ratingValue').textContent = '5';
    
    window.scrollTo(0, 0);
}

// Fonction pour mettre à jour les styles d'agents (à appeler après avoir reçu les détails)
function updateAgentStyles(styles) {
    for (let i = 1; i <= 4; i++) {
        const style = styles[i - 1];
        if (style) {
            const card = document.querySelector(`#style${i} + label`);
            if (card) {
                card.querySelector('h3').textContent = style.title;
                card.querySelector('p').textContent = style.description;
            }
        }
    }
}
