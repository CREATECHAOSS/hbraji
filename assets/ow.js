{
  const C = {rose: '#c98b8b', mauve: '#b07a86', sage: '#9aab89', olive: '#7d8a5a', mustard: '#d6a84f', lav: '#a58bb0', cream: '#fffaf0'};
  let fern = `<path d="M0,0 Q3,-36 -2,-74" stroke="${C.olive}" stroke-width="1.3" fill="none"/>`;
  for (let i = 1; i <= 9; i++) {
    const y = -6 - i * 7.2, w = 8 - i * .55;
    fern += `<ellipse cx="${-w / 2 - 1}" cy="${y}" rx="${w}" ry="2.3" fill="${C.sage}" transform="rotate(28 ${-w / 2 - 1} ${y})"/><ellipse cx="${w / 2 + 1}" cy="${y - 2}" rx="${w}" ry="2.3" fill="${C.sage}" transform="rotate(-28 ${w / 2 + 1} ${y - 2})"/>`;
  }
  const petals = (n, rx, ry, cy, fill, mid) => {
    let s = '';
    for (let k = 0; k < n; k++) s += `<ellipse cx="0" cy="${cy - ry * .8}" rx="${rx}" ry="${ry}" fill="${fill}" opacity=".92" transform="rotate(${k * 360 / n} 0 ${cy})"/>`;
    return s + `<circle cx="0" cy="${cy}" r="${rx * .75}" fill="${mid}"/>`;
  };
  const bloom = `<path d="M0,0 Q-3,-22 0,-40" stroke="${C.olive}" stroke-width="1.3" fill="none"/>` + petals(6, 4.6, 9.5, -50, C.rose, C.mustard);
  const bloom2 = `<path d="M0,0 Q2,-18 0,-32" stroke="${C.olive}" stroke-width="1.1" fill="none"/>` + petals(5, 3.4, 7, -39, C.mauve, C.cream);
  let sprig = `<path d="M0,0 L0,-64" stroke="${C.olive}" stroke-width="1.1"/>`;
  for (let i = 0; i < 9; i++) sprig += `<ellipse cx="${i % 2 ? 2.6 : -2.6}" cy="${-30 - i * 4}" rx="2.2" ry="4" fill="${C.lav}" transform="rotate(${i % 2 ? 20 : -20} ${i % 2 ? 2.6 : -2.6} ${-30 - i * 4})"/>`;
  const leaf = `<path d="M0,0 C11,-16 11,-38 0,-54 C-11,-38 -11,-16 0,0Z" fill="${C.sage}"/><path d="M0,-2 L0,-50" stroke="${C.olive}" stroke-width=".9"/>`;
  const d = document.getElementById('defs');
  if (d) d.innerHTML = `<g id="fern">${fern}</g><g id="bloom">${bloom}</g><g id="bloom2">${bloom2}</g><g id="sprig">${sprig}</g><g id="leaf">${leaf}</g>`;
  document.querySelectorAll('.spray').forEach((s) => {
    s.setAttribute('viewBox', '-70 -90 140 95');
    s.innerHTML = '<use href="#fern" transform="rotate(-38) scale(.9)"/><use href="#sprig" transform="rotate(30) scale(.95)"/><use href="#bloom" transform="rotate(-12) scale(1.05)"/><use href="#leaf" transform="rotate(52) scale(.7)"/><use href="#bloom2" transform="rotate(14) scale(.9)"/>';
  });
  let seed = 31;
  const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  document.querySelectorAll('.torn').forEach((el) => {
    const top = [], bot = [];
    for (let x = 0; x <= 100; x += 2.5) top.push(`${x}% ${(rnd() * 5).toFixed(1)}px`);
    for (let x = 100; x >= 0; x -= 2.5) bot.push(`${x}% calc(100% - ${(rnd() * 5).toFixed(1)}px)`);
    el.style.clipPath = `polygon(${top.join(',')},${bot.join(',')})`;
  });
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pc = ['#c98b8b', '#b07a86', '#d6a84f', '#9aab89', '#e3b8b2'];
  window.petalsFall = (n) => {
    if (calm) return;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      p.style.left = (Math.random() * 100) + 'vw';
      p.style.background = pc[i % pc.length];
      p.style.setProperty('--dx', ((Math.random() - .5) * 160) + 'px');
      p.style.animationDuration = (4 + Math.random() * 3) + 's';
      p.style.animationDelay = (Math.random() * 1.2) + 's';
      const s = .7 + Math.random() * .8;
      p.style.width = (12 * s) + 'px';
      p.style.height = (16 * s) + 'px';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 8500);
    }
  };
}
