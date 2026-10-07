const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  },
  { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
);

document.querySelectorAll('.block .reveal, .bento .reveal, .row .reveal, .steps .reveal, .market.reveal').forEach((el) => io.observe(el));

const dock = document.querySelector('.dock');
const hero = document.querySelector('.hero');
if (dock && hero) {
  const dockIo = new IntersectionObserver(
    ([e]) => dock.classList.toggle('show', !e.isIntersecting),
    { threshold: 0.15 }
  );
  dockIo.observe(hero);
}

if (!reduce) {
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('pointermove', (ev) => {
      const r = btn.getBoundingClientRect();
      const x = ev.clientX - r.left - r.width / 2;
      const y = ev.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });

  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('pointermove', (ev) => {
      const r = card.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateX(${-py * 6}deg) rotateY(${px * 7}deg)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}
