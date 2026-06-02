/* ============================
   月球基地 - 交互脚本
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  // -------- 导航栏滚动效果 --------
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // -------- 移动端菜单切换 --------
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // -------- 数字动画计数器 --------
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numberEl = entry.target.querySelector('.stat-number');
        if (numberEl && !numberEl.dataset.animated) {
          numberEl.dataset.animated = 'true';
          animateCounter(numberEl);
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-item').forEach(item => counterObserver.observe(item));

  // -------- 卡片滚动动画 --------
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay, 10) || 0;
        entry.target.style.animationDelay = delay + 'ms';
        entry.target.style.opacity = '1';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.facility-card').forEach(card => {
    card.style.opacity = '0';
    cardObserver.observe(card);
  });

  // -------- 时间线滚动动画 --------
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    timelineObserver.observe(item);
  });

  // -------- 订阅表单提交 --------
  document.querySelector('.subscribe-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input.value) {
      alert('\u611f\u8c22\u8ba2\u9605\uff01\u60a8\u5c06\u6536\u5230\u6708\u7403\u57fa\u5730\u7684\u6700\u65b0\u52a8\u6001\u3002');
      input.value = '';
    }
  });

  // -------- 平滑滚动 --------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // -------- 视频自适应加载 (懒加载) --------
  document.querySelectorAll('video').forEach(video => {
    // 当视频进入视口才开始加载
    const vidObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (video.dataset.src) {
            video.src = video.dataset.src;
          }
          video.preload = 'metadata';
          vidObserver.unobserve(video);
        }
      });
    }, { threshold: 0.1 });
    vidObserver.observe(video);
  });

  console.log('[月球基地] \u9875\u9762\u521d\u59cb\u5316\u5b8c\u6210');
});