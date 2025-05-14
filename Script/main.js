let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];



const form = document.querySelector("form");
const tituloInput = document.getElementById("titulo");
const conteudoInput = document.getElementById("conteudo");
const tarefasContainer = document.querySelector(".flex.gap-8");


function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}




function adicionarTarefa(e) {
  e.preventDefault();
  const titulo = tituloInput.value.trim();
  const conteudo = conteudoInput.value.trim();

  if (!titulo || !conteudo) return;

  tarefas.push({ titulo, conteudo, concluida: false });

  salvarTarefas();

  window.alert("tarefa criada com sucesso")
  tituloInput.value = "";
  conteudoInput.value = "";

}





form.addEventListener("submit", adicionarTarefa);
