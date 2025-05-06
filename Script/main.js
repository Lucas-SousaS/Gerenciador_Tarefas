let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];



const form = document.querySelector("form");
const tituloInput = document.getElementById("titulo");
const conteudoInput = document.getElementById("conteudo");
const tarefasContainer = document.querySelector(".flex.gap-8");


function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa, index) {
  const div = document.createElement("div");
  div.className =
    "bg-[#F5F5F5] w-fit p-4 rounded flex flex-col items-center justify-center gap-4 shadow";

  const textoConcluido = tarefa.concluida ? "line-through opacity-50" : "";

  div.innerHTML = `
    <div class="flex gap-6 ">
      <div>
        <h1 class="font-bold text-gray-800 ${textoConcluido}">${tarefa.titulo}</h1>
        <p class="text-gray-600 w-30 truncate ${textoConcluido}">${tarefa.conteudo}</p>
      </div>
      <div class="flex items-center justify-center gap-2">
        <img src="./Assets/check-solid.svg" alt="Concluir" class="h-4 cursor-pointer" onclick="concluirTarefa(${index})"/>
        <img src="./Assets/pen-solid.svg" alt="Editar" class="h-4 cursor-pointer" onclick="editarTarefa(${index})"/>
        <img src="./Assets/trash-solid.svg" alt="Excluir" class="h-4 cursor-pointer" onclick="excluirTarefa(${index})"/>
      </div>
    </div>
    <button class="font-medium text-sm text-blue-600 cursor-pointer hover:underline transition-all" onclick="verTarefa(${index})">
      Ver Tarefa
    </button>
  `;

  return div;
}

function renderizarTarefas() {
  tarefasContainer.innerHTML = "";
  tarefas.forEach((tarefa, index) => {
    const tarefaEl = criarElementoTarefa(tarefa, index);
    tarefasContainer.appendChild(tarefaEl);
  });
}

function adicionarTarefa(e) {
  e.preventDefault();
  const titulo = tituloInput.value.trim();
  const conteudo = conteudoInput.value.trim();

  if (!titulo || !conteudo) return;

  tarefas.push({ titulo, conteudo, concluida: false });
  salvarTarefas();
  renderizarTarefas();

  tituloInput.value = "";
  conteudoInput.value = "";
}

function excluirTarefa(index) {
  tarefas.splice(index, 1);
  salvarTarefas();
  renderizarTarefas();
}

window.excluirTarefa = excluirTarefa;

function editarTarefa(index) {
  const novaTarefa = prompt("Novo título:", tarefas[index].titulo);
  const novoConteudo = prompt("Novo conteúdo:", tarefas[index].conteudo);
  if (novaTarefa && novoConteudo) {
    tarefas[index].titulo = novaTarefa;
    tarefas[index].conteudo = novoConteudo;
    salvarTarefas();
    renderizarTarefas();
  }
}

window.editarTarefa = editarTarefa;

function verTarefa(index) {
  const tarefa = tarefas[index];
  const pop = document.createElement("div");
  pop.className =
    "w-screen h-screen fixed left-0 top-0 backdrop-blur-sm bg-white/30 z-10 flex items-center justify-center";
  pop.id = "popUp";

  pop.innerHTML = `
    <div class="bg-white p-10 rounded shadow-md relative max-w-md w-full">
      <button class="absolute top-4 right-4 text-gray-500 hover:text-red-500" onclick="fecharPopUp()">✖</button>
      <h2 class="text-xl font-semibold mb-4">${tarefa.titulo}</h2>
      <p class="text-gray-700">${tarefa.conteudo}</p>
    </div>
  `;

  document.body.appendChild(pop);
}

window.verTarefa = verTarefa;

function fecharPopUp() {
  const el = document.getElementById("popUp");
  if (el) el.remove();
}

window.fecharPopUp = fecharPopUp;

function concluirTarefa(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  salvarTarefas();
  renderizarTarefas();
}

window.concluirTarefa = concluirTarefa;

form.addEventListener("submit", adicionarTarefa);
renderizarTarefas();
