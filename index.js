new fullpage('#fullpage', {
  autoScrolling: true,
  scrollOverflow: true,
  navigation: true,
  anchors: ['hero', 'about', 'cv', 'contact'],
  navigationTooltips: ['Hjem', 'Om mig', 'CV', 'Kontakt'],  
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

  
  
  
  // AOS init
  AOS.init({
    duration: 1000,
    once: false
  });
  
  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active'); // tilføjer animation
  });
  
  // Luk menuen når der klikkes på et link (mobil)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active'); // fjern animation
    });
  });
  
  
  // Scroll indicator
function updateScrollIndicator(origin, destination) {
    const totalSections = document.querySelectorAll('.section').length;
    const percentage = ((destination.index + 1) / totalSections) * 100;
    document.getElementById('scroll-indicator').style.width = `${percentage}%`;
  }
  

  const texts = [
    "Datamatiker studerende",
    "Kreativ Skaber",
    "Tech-Entusiast"
  ];
  
  let speed = 100;
  const textElements = document.querySelector('.typewriter-text');
  let textIndex = 0;
  let characterIndex = 0;
  
  function typeWriter() {
    if (characterIndex < texts[textIndex].length) {
      textElements.innerHTML += texts[textIndex].charAt(characterIndex);
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
      textIndex = (textIndex + 1) % texts.length;
      characterIndex = 0;
      setTimeout(typeWriter, 500);
    }
  }
  
  window.addEventListener('load', typeWriter);
  