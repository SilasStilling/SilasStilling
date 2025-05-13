new fullpage('#fullpage', {
  autoScrolling: true,
  scrollOverflow: true,
  navigation: true,
  anchors: ['hero', 'about', 'cv', 'projects', 'esport', 'contact'],
  navigationTooltips: [],
  showActiveTooltip: true,
  scrollingSpeed: 700,
  sectionsColor: ['#e0e7ff', '#ffffff', '#f9fafb', '#e2e8f0'],
  onLeave: function (origin, destination, direction) {
    AOS.refresh();
    updateScrollIndicator(origin, destination);
  },
  afterRender: function () {
    updateScrollIndicator(null, { index: 0 });
  },
  normalScrollElements: 'footer'
});

AOS.init({
  duration: 1000,
  once: false
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

function updateScrollIndicator(origin, destination) {
  const totalSections = document.querySelectorAll('.section').length;
  const percentage = ((destination.index + 1) / totalSections) * 100;
  document.getElementById('scroll-indicator').style.width = `${percentage}%`;
}

// Typewriter setup (only run if element exists)
const textElements = document.querySelector('.typewriter-text');
if (textElements) {
  const textsDa = ["Datamatiker studerende", "Kreativ Skaber", "Tech-Entusiast"];
  const textsEn = ["Computer Science Student", "Creative Creator", "Tech Enthusiast"];
  let currentTexts = [];
  let textIndex = 0;
  let characterIndex = 0;
  const speed = 100;

  function typeWriter() {
    if (characterIndex < currentTexts[textIndex].length) {
      textElements.innerHTML += currentTexts[textIndex].charAt(characterIndex);
      characterIndex++;
      setTimeout(typeWriter, speed);
    } else {
      setTimeout(eraseText, 1000);
    }
  }

  function eraseText() {
    if (textElements.innerHTML.length > 0) {
      textElements.innerHTML = textElements.innerHTML.slice(0, -1);
      setTimeout(eraseText, 50);
    } else {
      textIndex = (textIndex + 1) % currentTexts.length;
      characterIndex = 0;
      setTimeout(typeWriter, 500);
    }
  }

  function setupTypewriterTexts() {
    const isDanish = window.location.pathname.includes('index.html') || window.location.pathname === '/';
    currentTexts = isDanish ? textsDa : textsEn;
    textElements.innerHTML = '';
    textIndex = 0;
    characterIndex = 0;
    typeWriter();
  }

  setupTypewriterTexts();
}

function setupLanguageToggle() {
  const btnDa = document.getElementById('lang-da');
  const btnEn = document.getElementById('lang-en');

  btnDa?.addEventListener('click', () => switchLanguage('da'));
  btnEn?.addEventListener('click', () => switchLanguage('en'));

  const isDanish = window.location.pathname.includes('index.html') || window.location.pathname === '/';

  fullpage_api.setOptions({
    navigationTooltips: isDanish
      ? ['Hjem', 'Om mig', 'CV', 'Projekter', 'Esport', 'Kontakt']
      : ['Home', 'About Me', 'CV', 'projects', 'Esports', 'Contact']
  });

  document.getElementById('lang-da')?.classList.toggle('active', isDanish);
  document.getElementById('lang-en')?.classList.toggle('active', !isDanish);
}

function switchLanguage(lang) {
  const isDanish = window.location.pathname.includes('index.html') || window.location.pathname === '/';

  if (lang === 'da' && !isDanish) {
    window.location.href = 'index.html';
  } else if (lang === 'en' && isDanish) {
    window.location.href = 'index-en.html';
  }
}

window.addEventListener('load', () => {
  setupLanguageToggle();
});
