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
      item.classList.toggle("slide-ativo", i === index);
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

  showItem(currentIndex);
  iniciarAutoplay();
});
