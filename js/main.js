const botao = document.getElementById("buscar");

botao.addEventListener("click", async () => {
  const cep = document.getElementById("cep").value;
  const erro = document.getElementById("erro");
  const resultado = document.getElementById("resultado");

  // Limpar mensagens
  erro.textContent = "";
  resultado.classList.add("hidden");

  // Validação simples
  if (cep.length !== 8 || isNaN(cep)) {
    erro.textContent = "Digite um CEP válido com 8 números.";
    return;
  }

  try {
    const url = `${import.meta.env.VITE_API_URL}/${cep}/json/`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.erro) {
      erro.textContent = "CEP não encontrado.";
      return;
    }

    // Preencher dados
    document.getElementById("rua").textContent = data.logradouro;
    document.getElementById("bairro").textContent = data.bairro;
    document.getElementById("cidade").textContent = data.localidade;

    resultado.classList.remove("hidden");

  } catch (e) {
    erro.textContent = "Erro ao buscar o CEP.";
  }
});