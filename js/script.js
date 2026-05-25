document.addEventListener("DOMContentLoaded", function () {
	document.documentElement.style.scrollBehavior = "smooth";

	var corpoPagina = document.body;

	var botaoTema = document.createElement("button");
	botaoTema.type = "button";
	botaoTema.className = "botao-tema";
	corpoPagina.appendChild(botaoTema);

	function aplicarTema(tema) {
		corpoPagina.setAttribute("data-tema", tema);
		botaoTema.textContent = tema === "escuro" ? "Tema claro" : "Tema escuro";
		localStorage.setItem("tema-site", tema);
	}

	var temaSalvo = localStorage.getItem("tema-site") || "claro";
	aplicarTema(temaSalvo);

	var botaoTopo = document.createElement("button");
	botaoTopo.type = "button";
	botaoTopo.className = "btn btn-gourmet botao-voltar-topo";
	botaoTopo.textContent = "Topo";
	corpoPagina.appendChild(botaoTopo);

	botaoTopo.style.position = "fixed";
	botaoTopo.style.right = "20px";
	botaoTopo.style.bottom = "20px";
	botaoTopo.style.zIndex = "1200";
	botaoTopo.style.borderRadius = "10px";
	botaoTopo.style.display = "none";

	botaoTema.addEventListener("click", function () {
		var temaAtual = corpoPagina.getAttribute("data-tema") || "claro";
		var novoTema = temaAtual === "claro" ? "escuro" : "claro";
		aplicarTema(novoTema);
	});

	window.addEventListener("scroll", function () {
		if (window.scrollY > 200) {
			botaoTopo.style.display = "block";
		} else {
			botaoTopo.style.display = "none";
		}
	});

	botaoTopo.addEventListener("click", function () {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	var linksInternos = document.querySelectorAll('a[href^="#"]');
	linksInternos.forEach(function (link) {
		link.addEventListener("click", function (evento) {
			var destino = document.querySelector(link.getAttribute("href"));
			if (destino) {
				evento.preventDefault();
				destino.scrollIntoView({ behavior: "smooth" });
			}
		});
	});

	var formularioContato = document.querySelector("form");
	if (formularioContato) {
		var mensagemEnvio = document.createElement("div");
		mensagemEnvio.className = "mt-2";
		formularioContato.appendChild(mensagemEnvio);

		formularioContato.addEventListener("submit", function (evento) {
			evento.preventDefault();

			var campoNome = document.querySelector("#nome");
			var campoEmail = document.querySelector("#email");
			var campoTelefone = document.querySelector("#telefone");
			var campoAssunto = document.querySelector("#assunto");
			var campoMensagem = document.querySelector("#mensagem");

			var nomeValido = campoNome && campoNome.value.trim() !== "";
			var emailValido = campoEmail && campoEmail.value.includes("@") && campoEmail.value.includes(".");
			var telefoneValido = campoTelefone && campoTelefone.value.trim().length >= 8;
			var assuntoValido = campoAssunto && campoAssunto.value.trim() !== "";
			var mensagemValida = campoMensagem && campoMensagem.value.trim() !== "";

			if (!nomeValido || !emailValido || !telefoneValido || !assuntoValido || !mensagemValida) {
				mensagemEnvio.textContent = "Preencha todos os campos corretamente para enviar.";
				mensagemEnvio.classList.remove("text-success");
				mensagemEnvio.classList.add("text-danger");
				return;
			}

			mensagemEnvio.textContent = "Mensagem enviada com sucesso! Em breve entraremos em contato.";
			mensagemEnvio.classList.remove("text-danger");
			mensagemEnvio.classList.add("text-success");
			formularioContato.reset();
		});

		formularioContato.addEventListener("reset", function () {
			mensagemEnvio.textContent = "Formulário limpo.";
			mensagemEnvio.classList.remove("text-danger");
			mensagemEnvio.classList.add("text-muted");
		});
	}
});
