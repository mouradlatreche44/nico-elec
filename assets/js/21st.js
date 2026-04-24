/* 21st.dev vanilla ports — Nico Elec */
(function(){
  'use strict';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky banner dismiss ---------- */
  function initBanner(){
    var b = document.querySelector('.st-banner');
    if(!b) return;
    try{ if(localStorage.getItem('st-banner-dismissed')==='1'){ b.hidden = true; return; } }catch(e){}
    var close = b.querySelector('.st-banner-close');
    if(close) close.addEventListener('click', function(){
      b.hidden = true;
      try{ localStorage.setItem('st-banner-dismissed','1'); }catch(e){}
    });
  }

  /* ---------- Sparkles canvas ---------- */
  function initSparkles(){
    var canvas = document.querySelector('.sparkles-canvas');
    if(!canvas || reduced) return;
    var ctx = canvas.getContext('2d');
    var parts = [];
    var MAX = 40;
    function resize(){
      var r = canvas.getBoundingClientRect();
      canvas.width = r.width * window.devicePixelRatio;
      canvas.height = r.height * window.devicePixelRatio;
    }
    resize();
    window.addEventListener('resize', resize, {passive:true});
    function spawn(){
      parts.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: (Math.random()*1.5+.5) * window.devicePixelRatio,
        life: 0, max: 60 + Math.random()*60
      });
    }
    function loop(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(parts.length < MAX && Math.random()<.3) spawn();
      for(var i=parts.length-1; i>=0; i--){
        var p = parts[i];
        p.life++;
        var t = p.life / p.max;
        var a = t < .5 ? t*2 : 1-(t-.5)*2;
        ctx.globalAlpha = Math.max(0,a)*.9;
        ctx.fillStyle = '#E8A93C';
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        if(p.life >= p.max) parts.splice(i,1);
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ---------- Spotlight ---------- */
  function initSpotlight(){
    var host = document.querySelector('.process');
    if(!host) return;
    var pending = false, lx=0, ly=0;
    host.addEventListener('mousemove', function(e){
      var r = host.getBoundingClientRect();
      lx = e.clientX - r.left; ly = e.clientY - r.top;
      if(!pending){
        pending = true;
        requestAnimationFrame(function(){
          host.style.setProperty('--x', lx+'px');
          host.style.setProperty('--y', ly+'px');
          pending = false;
        });
      }
    }, {passive:true});
  }

  /* ---------- Glowing testimonial cards ---------- */
  function initGlow(){
    var cards = document.querySelectorAll('.testi-grid > *');
    cards.forEach(function(card){
      var pending = false, lx=0, ly=0;
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        lx = e.clientX - r.left; ly = e.clientY - r.top;
        if(!pending){
          pending = true;
          requestAnimationFrame(function(){
            card.style.setProperty('--gx', lx+'px');
            card.style.setProperty('--gy', ly+'px');
            pending = false;
          });
        }
      }, {passive:true});
    });
  }

  /* ---------- 3D tilt on cert items ---------- */
  function initTilt(){
    if(reduced) return;
    var items = document.querySelectorAll('.certs-grid > *');
    items.forEach(function(it){
      it.classList.add('tilt-card');
      var pending = false, rx=0, ry=0;
      it.addEventListener('mousemove', function(e){
        var r = it.getBoundingClientRect();
        var px = (e.clientX - r.left)/r.width - .5;
        var py = (e.clientY - r.top)/r.height - .5;
        rx = (-py * 10).toFixed(2);
        ry = (px * 10).toFixed(2);
        if(!pending){
          pending = true;
          requestAnimationFrame(function(){
            it.style.transform = 'perspective(800px) rotateX('+rx+'deg) rotateY('+ry+'deg)';
            pending = false;
          });
        }
      }, {passive:true});
      it.addEventListener('mouseleave', function(){
        it.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
      });
    });
  }

  /* ---------- Hero highlight underline on scroll-in ---------- */
  function initHighlight(){
    var hl = document.querySelector('.cta .hl');
    if(!hl) return;
    if(reduced){ hl.classList.add('hl-drawn'); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ hl.classList.add('hl-drawn'); io.unobserve(hl); }
      });
    }, {threshold:.5});
    io.observe(hl);
  }

  /* ---------- Marquee duplicate for seamless loop ---------- */
  function initMarquee(){
    var tracks = document.querySelectorAll('.mq-track');
    tracks.forEach(function(t){
      t.innerHTML = t.innerHTML + t.innerHTML;
    });
  }

  function boot(){
    initBanner();
    initSparkles();
    initSpotlight();
    initGlow();
    initTilt();
    initHighlight();
    initMarquee();
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();

/* === UI/UX PRO MAX ADDITIONS === */
(function(){
  'use strict';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Phase 4 · Hero background glow --- */
  function initHeroGlow(){
    var heroEl = document.querySelector('.hero');
    if(!heroEl) return;
    // Avoid duplicating if already injected
    if(heroEl.querySelector('.hero-glow')) return;
    var glow = document.createElement('div');
    glow.className = 'hero-glow';
    glow.setAttribute('aria-hidden','true');
    heroEl.prepend(glow);
  }

  /* --- Phase 5 · Premium testimonial cards (every other = even index → 0,2,4...) --- */
  function initTestiPremium(){
    document.querySelectorAll('.testi-grid > .testi, .testi-grid > .testi-card, .testi-card').forEach(function(c, i){
      if(i % 2 === 0) c.classList.add('testi-card--premium');
    });
  }

  /* --- Phase 3 · Button ripple pulse on click --- */
  function initBtnRipple(){
    document.querySelectorAll('.btn-primary').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(reduced) return;
        btn.classList.remove('btn-clicked');
        // Force reflow so re-adding the class restarts the animation
        void btn.offsetWidth;
        btn.classList.add('btn-clicked');
        btn.addEventListener('animationend', function onEnd(){
          btn.classList.remove('btn-clicked');
          btn.removeEventListener('animationend', onEnd);
        });
      });
    });
  }

  /* --- Phase 7 · Lazy-load images outside the first viewport --- */
  function initLazyImages(){
    document.querySelectorAll('img:not(.nav-logo img):not(.hero img)').forEach(function(img){
      if(!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
    });
  }

  /* --- Boot --- */
  function bootProMax(){
    initHeroGlow();
    initTestiPremium();
    initBtnRipple();
    initLazyImages();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bootProMax);
  } else { bootProMax(); }
})();
