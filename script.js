document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".item");
  const indicators = document.querySelectorAll(".indicadores li");
  const [btnPrev, btnNext] = document.querySelectorAll(".setas button");
  const numero = document.querySelector(".numero");
  const section = document.querySelector("section");

  let currentIndex = 0;
  let autoplay = null;

  function showItem(index) {
    items.forEach((item, i) => {
      item.classList.remove("slide-ativo");
      if (i === index) item.classList.add("slide-ativo");
    });

    indicators.forEach((dot, i) => {
      dot.classList.toggle("indicador-ativo", i === index);
      dot.setAttribute("aria-selected", i === index ? "true" : "false");
    });

    numero.textContent = String(index + 1).padStart(2, "0");
  }

  function updateIndex(newIndex) {
    const index = (newIndex + items.length) % items.length;
    if (index !== currentIndex) {
      currentIndex = index;
      showItem(currentIndex);
    }
  }

  btnNext.addEventListener("click", () => updateIndex(currentIndex + 1));
  btnPrev.addEventListener("click", () => updateIndex(currentIndex - 1));

  indicators.forEach((dot, i) => {
    dot.addEventListener("click", () => updateIndex(i));
    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        updateIndex(i);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") updateIndex(currentIndex + 1);
    if (e.key === "ArrowLeft") updateIndex(currentIndex - 1);
  });

  function iniciarAutoplay() {
    autoplay = setInterval(() => updateIndex(currentIndex + 1), 5000);
  }

  function pausarAutoplay() {
    clearInterval(autoplay);
  }

  section.addEventListener("mouseenter", pausarAutoplay);
  section.addEventListener("mouseleave", iniciarAutoplay);

  // Header scroll effect
  const header = document.querySelector('header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Rolando para baixo
      header.style.transform = 'translateY(-100%)';
    } else {
      // Rolando para cima
      header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });

  // Dados dos carros para o modal
  const carrosData = [
    {
      titulo: "Carro 1",
      imagem: "imagens/1.png",
      motor: "V8 4.0L Twin-Turbo",
      potencia: "650 HP",
      aceleracao: "0-100 km/h em 3.2s",
      velocidade: "320 km/h",
      preco: "R$ 2.500.000",
      descricao: "Um supercarro extraordinário que combina performance excepcional com luxo refinado. Desenvolvido com as mais avançadas tecnologias automotivas, oferece uma experiência de condução inigualável."
    },
    {
      titulo: "Carro 2",
      imagem: "imagens/2.png",
      motor: "V12 6.5L Aspirado",
      potencia: "770 HP",
      aceleracao: "0-100 km/h em 2.8s",
      velocidade: "350 km/h",
      preco: "R$ 3.200.000",
      descricao: "Uma obra-prima da engenharia italiana que redefine os limites da performance. Cada detalhe foi cuidadosamente projetado para proporcionar emoções únicas ao volante."
    },
    {
      titulo: "Carro 3",
      imagem: "imagens/3.png",
      motor: "V10 5.2L Aspirado",
      potencia: "610 HP",
      aceleracao: "0-100 km/h em 3.1s",
      velocidade: "325 km/h",
      preco: "R$ 2.800.000",
      descricao: "Um ícone de design e performance que representa a evolução dos supercarros modernos. Tecnologia de ponta aliada à tradição automobilística de excelência."
    }
  ];

  // Adicionar eventos aos botões "Saiba Mais"
  const saibaMaisButtons = document.querySelectorAll('.content button');
  const modal = document.getElementById('carModal');
  const modalClose = document.querySelector('.modal-close');

  function openModal(carIndex) {
    const carro = carrosData[carIndex];

    // Atualizar conteúdo do modal
    document.getElementById('modalCarTitle').textContent = carro.titulo;
    document.getElementById('modalCarImg').src = carro.imagem;
    document.getElementById('motorInfo').textContent = carro.motor;
    document.getElementById('potenciaInfo').textContent = carro.potencia;
    document.getElementById('aceleracaoInfo').textContent = carro.aceleracao;
    document.getElementById('velocidadeInfo').textContent = carro.velocidade;
    document.getElementById('precoInfo').textContent = carro.preco;
    document.getElementById('modalDescription').textContent = carro.descricao;

    // Mostrar modal com animação
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  saibaMaisButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(index);
    });
  });

  // Fechar modal
  modalClose.addEventListener('click', closeModal);

  // Fechar modal clicando no overlay
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Fechar modal com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Eventos dos botões do modal
  document.querySelector('.btn-interesse').addEventListener('click', () => {
    alert('Obrigado pelo interesse! Em breve entraremos em contato.');
    closeModal();
  });

  document.querySelector('.btn-test-drive').addEventListener('click', () => {
    alert('Test drive agendado! Entraremos em contato para confirmar data e horário.');
    closeModal();
  });

  showItem(currentIndex);
  iniciarAutoplay();
});
