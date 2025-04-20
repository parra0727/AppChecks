// Solicitar permiso para notificaciones
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// Función para mostrar notificaciones
function showNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, { body: body });
    }
}

// Función para agregar tareas
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskCheckpoints = document.getElementById('task-checkpoints');
    const taskItem = document.createElement('div');
    taskItem.classList.add('checkpoint');
    taskItem.innerHTML = `
        <input type="checkbox">
        <span>${taskInput.value}</span>
    `;
    taskCheckpoints.appendChild(taskItem);
    taskInput.value = '';
    showNotification('Nueva Tarea', taskItem.querySelector('span').textContent);
}

// Función para agregar tareas de Trading
function addTradingTask() {
    const tradingTaskInput = document.getElementById('trading-task-input');
    const tradingTaskCheckpoints = document.getElementById('trading-task-checkpoints');
    const tradingTaskItem = document.createElement('div');
    tradingTaskItem.classList.add('checkpoint');
    tradingTaskItem.innerHTML = `
        <input type="checkbox">
        <span>${tradingTaskInput.value}</span>
    `;
    tradingTaskCheckpoints.appendChild(tradingTaskItem);
    tradingTaskInput.value = '';
    showNotification('Nueva Tarea de Trading', tradingTaskItem.querySelector('span').textContent);
}

// Función para agregar ideas
function addIdea() {
    const ideaInput = document.getElementById('idea-input');
    const ideaList = document.getElementById('idea-list');
    const ideaItem = document.createElement('li');
    ideaItem.textContent = ideaInput.value;
    ideaList.appendChild(ideaItem);
    ideaInput.value = '';
    showNotification('Nueva Idea', ideaItem.textContent);
}

// Función para toggle el menú de ideas
function toggleIdeasMenu() {
    const ideasMenu = document.getElementById('ideas-menu');
    ideasMenu.style.display = ideasMenu.style.display === 'none' ? 'block' : 'none';
}

// Función para actualizar el progreso
function updateProgress(progress, progressBarId) {
    const progressBar = document.getElementById(progressBarId);
    const progressDiv = progressBar.querySelector('div');
    progressDiv.style.width = `${progress}%`;
}

// Ejemplo de tareas iniciales
addTask('Estudiar fundamentos de trading');
addTask('Aprender sobre algoritmos de programación');
addTask('Investigar plataformas de trading');

// Ejemplo de progreso inicial
updateProgress(20, 'progress-bar');
updateProgress(10, 'trading-progress-bar');

// Función para obtener frase motivadora diaria
async function getMotivationalQuote() {
    try {
        const response = await fetch('https://frasedeldia.azurewebsites.net/api/phrase');
        const data = await response.json();
        const quoteElement = document.getElementById('motivational-quote');
        quoteElement.textContent = `"${data.phrase}" - ${data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        const quoteElement = document.getElementById('motivational-quote');
        quoteElement.textContent = 'No se pudo cargar la frase motivadora.';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    getMotivationalQuote();
});