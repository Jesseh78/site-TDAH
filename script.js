const frases = [
  "Aqui podemos colocar contatos importantes, guias e medidas(algo definitivamente util KKK)"
];

document.getElementById("mostrarFrase").addEventListener("click", () => {
  const frase = frases[Math.floor(Math.random() * frases.length)];
  document.getElementById("frase").textContent = frase;
});
