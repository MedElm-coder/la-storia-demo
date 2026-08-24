// Dynamic banner height (keeps header flush under the banner, no gap)
  const demoBanner = document.querySelector('.demo-banner');
  const setBannerHeight = () => {
    const h = demoBanner.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--banner-h', h + 'px');
  };
  setBannerHeight();
  window.addEventListener('resize', setBannerHeight);
  window.addEventListener('load', setBannerHeight);
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(setBannerHeight); }

  // Header scroll state
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if(document.body.classList.contains('nav-open')) return;
    if(window.scrollY > 40){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
  };
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  const openMobileNav = () => {
    navList.classList.add('open');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fermer le menu');
    document.body.classList.add('nav-open');
  };

  const closeMobileNav = () => {
    navList.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.classList.remove('nav-open');
  };

  navToggle.addEventListener('click', () => {
    if(navList.classList.contains('open')){ closeMobileNav(); }
    else{ openMobileNav(); }
  });
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
  const navCloseBtn = document.getElementById('navCloseBtn');
  if(navCloseBtn){ navCloseBtn.addEventListener('click', closeMobileNav); }

  // Hero load-in
  window.addEventListener('load', () => {
    document.getElementById('hero').classList.add('loaded');
  });

  // Scroll reveal via IntersectionObserver
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion){
    document.querySelectorAll('.reveal, .reveal-group').forEach(el => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
    document.querySelectorAll('.reveal, .reveal-group').forEach(el => io.observe(el));
  }


  // Gallery video sound toggle
  const reelVideo = document.getElementById('reelVideo');
  const reelBtn = document.getElementById('reelSoundBtn');
  const iconMuted = document.getElementById('reelIconMuted');
  const iconOn = document.getElementById('reelIconOn');
  if(reelBtn){
    reelBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      reelVideo.muted = !reelVideo.muted;
      const isOn = !reelVideo.muted;
      reelBtn.setAttribute('aria-pressed', isOn);
      reelBtn.setAttribute('aria-label', isOn ? 'Couper le son' : 'Activer le son');
      iconMuted.style.display = isOn ? 'none' : 'block';
      iconOn.style.display = isOn ? 'block' : 'none';
    });
  }