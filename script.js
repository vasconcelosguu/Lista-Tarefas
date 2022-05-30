// Função cria botão
function createButton() {
  const section = document.querySelector('#buttons');
  const ids = ['criar-tarefa', 'apaga-tudo', 'remover-finalizados', 'salvar-tarefas',
    'mover-cima', 'mover-baixo', 'remover-selecionado'];
  const text = ['Adicionar', 'Apaga Lista', 'Limpar Completos', 'Salvar Lista', 'Cima',
    'Baixo', 'Remover Tarefa'];
  ids.forEach((id, i) => {
    const button = document.createElement('button');
    button.id = id;
    button.innerText = text[i];
    section.appendChild(button);
  });
}
createButton();

// Função completa

function completeTask(event) {
  event.target.classList.toggle('completed');
}

// função cria tarefas
function createTask() {
  const insertTask = document.querySelector('#texto-tarefa');
  const getList = document.querySelector('#lista-tarefas');
  const li = document.createElement('li');
  li.innerText = insertTask.value;
  li.addEventListener('click', (event) => {
    const foi = document.querySelector('.selected');
    if (foi) {
      foi.classList.remove('selected');
    }
    event.target.classList.add('selected');
  });
  li.addEventListener('dblclick', completeTask);
  getList.appendChild(li);
  insertTask.value = null;
}

// Seleciona itens da Lista

function getSelected(event) {
  const allLi = document.querySelector('selected');
  const liNow = allLi;
  liNow.classList.remove('selected');
  event.target.classList.add('selected');
}

// Apaga Lista

function deleteTask() {
  const getLi = document.querySelectorAll('li');
  getLi.forEach((listItem) => {
    listItem.remove();
  });
}

// Apaga completos da Lista

function deleteCompleted() {
  const completed = document.querySelectorAll('.completed');
  completed.forEach((item) => {
    item.remove();
  });
}

// Função para salvar itens
function saveItens() {
  const itensSaved = document.querySelectorAll('li');
  const arrayItens = [];
  itensSaved.forEach((value) => {
    const object = {
      task: value.innerText,
      class: value.className,
    };
    arrayItens.push(object);
  });
  localStorage.setItem('itens', JSON.stringify(arrayItens));
}

function createSavedLi(text, classe) {
  const li = document.createElement('li');
  const getOl = document.querySelector('#lista-tarefas');
  li.innerText = text;
  li.className = classe;
  getOl.appendChild(li);
}

function getItens() {
  const itenszinhos = localStorage.getItem('itens');
  const itenszinhosObject = JSON.parse(itenszinhos);
  if (itenszinhosObject) {
    itenszinhosObject.forEach((value) => {
      createSavedLi(value.task, value.class);
    });
  }
}

// Função Para Subir Tasks
function moveUp() {
  const taskToUp = document.querySelector('.selected');
  if (taskToUp && taskToUp.previousElementSibling) {
    taskToUp.parentNode.insertBefore(taskToUp, taskToUp.previousElementSibling);
  }
}

// Função Desce Task
function moveDown() {
  const taskToDown = document.querySelector('.selected');
  if (taskToDown && taskToDown.nextElementSibling) {
    taskToDown.parentNode.insertBefore(taskToDown.nextElementSibling, taskToDown);
  }
}

//  Função remove selecionado
function selectedRemove() {
  const selected = document.querySelector('.selected');
  selected.remove();
}

const saveButton = document.querySelector('#salvar-tarefas');
const buttonSend = document.querySelector('#criar-tarefa');
const li = document.querySelectorAll('li');
const buttonDelete = document.querySelector('#apaga-tudo');
const up = document.querySelector('#mover-cima');
const down = document.querySelector('#mover-baixo');
const buttonDeleteComplete = document.querySelector('#remover-finalizados');
const deleteTaskButton = document.querySelector('#remover-selecionado');

saveButton.addEventListener('click', saveItens);
up.addEventListener('click', moveUp);
down.addEventListener('click', moveDown);
deleteTaskButton.addEventListener('click', selectedRemove);
buttonDeleteComplete.addEventListener('click', deleteCompleted);
buttonDelete.addEventListener('click', deleteTask);
buttonSend.addEventListener('click', createTask);
li.forEach((value) => {
  value.appendChild('click', getSelected);
});
window.addEventListener('load', getItens);
