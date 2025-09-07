/* script.js
   Minimal JS:
   - Mobile menu toggle
   - Simple particle animation to match the dotted/lines background vibe
   - Simple tabs functionality for skills section
*/

/* ---------- Mobile menu ---------- */
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
mobileToggle && mobileToggle.addEventListener('click', () => {
  const open = mobileMenu.getAttribute('aria-hidden') === 'false';
  mobileMenu.setAttribute('aria-hidden', open ? 'true' : 'false');
  mobileMenu.style.display = open ? 'none' : 'block';
});

/* ---------- Skills tabs ---------- */
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.target;
    document.querySelectorAll('.chips').forEach(ch => ch.classList.add('hidden'));
    const el = document.getElementById(target);
    if (el) el.classList.remove('hidden');
  });
});

/* ---------- Particles canvas (lightweight) ---------- */
(() => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const dots = [];

  function rand(min, max){ return Math.random()*(max-min)+min; }

  // create dots
  for(let i=0;i<120;i++){
    dots.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: rand(0.4,1.8),
      vx: rand(-0.3,0.3),
      vy: rand(-0.3,0.3)
    });
  }

  function resize(){
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }
  addEventListener('resize', resize);

  function draw(){
    ctx.clearRect(0,0,W,H);

    // subtle radial glow on right (like screenshot)
    const g = ctx.createRadialGradient(W*0.8, H*0.2, 0, W*0.8, H*0.2, 700);
    g.addColorStop(0, 'rgba(120,80,170,0.08)');
    g.addColorStop(1, 'rgba(12,15,28,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);

    // draw dots
    for(const d of dots){
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(160,140,220,0.95)';
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fill();
    }

    // draw lines between close dots
    for(let i=0;i<dots.length;i++){
      for(let j=i+1;j<dots.length;j++){
        const a = dots[i], b = dots[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120){
          ctx.strokeStyle = 'rgba(140,120,200,' + (1 - dist/120) * 0.18 + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();
