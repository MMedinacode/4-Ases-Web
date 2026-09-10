/* ============================================================
   4 ASES FAST FOOD — datos y lógica
   ============================================================
   PRECIOS PARCIALES, TODOS LEÍDOS DE SU PROPIO CARTEL (foto de su ficha de
   Google, 10-09-2026).
   ✅ Confirmado: la columna encabezada "LOMITO O CHURRASCO" marca $4.500
      para las cuatro variedades.
   ⚠️ La otra columna del cartel marca $4.000, pero SU ENCABEZADO QUEDA
      TAPADO por uno de los precios pegados. Por el contexto y por las
      reseñas es casi seguro que es el completo — pero como no se lee, NO
      se publica: el completo va a "Consultar".
   ⚠️ El cartel de mechada muestra precios entre $5.500 y $6.000, pero los
      papeles están desalineados y no se puede saber cuál va con cuál. Van
      todos a "Consultar".
   Hay que confirmar la carta completa con el local.
   ============================================================ */

const MENU = {
  "completos": {
    "label": "Completos",
    "items": [
      {
        "n": "Completo italiana",
        "d": "Su cartel marca $4.000 en la columna de al lado, pero el encabezado está tapado: confirmar",
        "img": "completos.jpg"
      },
      {
        "n": "Completo napolitana",
        "d": "Con queso, aceitunas, caliente y orégano"
      },
      {
        "n": "Completo chacarera",
        "d": "Tomate, poroto verde, mayo y ají"
      },
      {
        "n": "Completo campesina",
        "d": "Choclo, queso, champiñón y mayo"
      }
    ]
  },
  "carnes": {
    "label": "Lomito o churrasco",
    "items": [
      {
        "n": "Italiana · lomito o churrasco",
        "p": 4500,
        "d": "Precio leído de su propio cartel"
      },
      {
        "n": "Napolitana · lomito o churrasco",
        "p": 4500,
        "d": "Queso, aceitunas, caliente y orégano"
      },
      {
        "n": "Chacarera · lomito o churrasco",
        "p": 4500,
        "d": "Tomate, poroto verde, mayo y ají"
      },
      {
        "n": "Campesina · lomito o churrasco",
        "p": 4500,
        "d": "Choclo, queso, champiñón y mayo"
      }
    ]
  },
  "mechada": {
    "label": "Sándwich de mechada",
    "items": [
      {
        "n": "Mechada italiana",
        "d": "Su cartel muestra la mechada entre $5.500 y $6.000 — confirmar cuál es cuál",
        "img": "carta.jpg"
      },
      {
        "n": "Mechada tomate mayo"
      },
      {
        "n": "Mechada luco"
      },
      {
        "n": "Mechada a lo pobre"
      },
      {
        "n": "Mechada brasileña"
      }
    ]
  },
  "acompanamientos": {
    "label": "Para acompañar",
    "items": [
      {
        "n": "Sopaipillas",
        "d": "Nombradas por una de sus reseñas reales — pero avisan que se demoran"
      },
      {
        "n": "Papas fritas",
        "d": "Nombradas por una de sus reseñas reales"
      }
    ]
  }
};

const money = n => '$' + n.toLocaleString('es-CL');

const tabsEl   = document.getElementById('menuTabs');
const panelsEl = document.getElementById('menuPanels');

Object.keys(MENU).forEach((key, i) => {
  const tab = document.createElement('button');
  tab.className = 'menu-tab' + (i === 0 ? ' active' : '');
  tab.type = 'button';
  tab.textContent = MENU[key].label;
  tab.dataset.key = key;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  tab.addEventListener('click', () => showTab(key));
  tabsEl.appendChild(tab);

  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i === 0 ? ' active' : '');
  panel.id = 'panel-' + key;

  const grid = document.createElement('div');
  grid.className = 'menu-grid';

  MENU[key].items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item reveal';

    if (item.img) {
      // La clase cf-thumb la necesita el grid de .menu-item para ubicarla en
      // su columna; sin ella la miniatura caia fuera de las areas y abria
      // una fila extra.
      const cont = document.createElement('div');
      cont.className = 'cf-thumb';
      const im = document.createElement('img');
      im.src = 'fotos/' + item.img; im.alt = item.n; im.loading = 'lazy';
      im.style.cssText = 'width:58px;height:58px;object-fit:cover;border-radius:12px;';
      cont.appendChild(im);
      row.appendChild(cont);
    }

    const texto = document.createElement('div');
    texto.className = 'menu-item-text';
    const nombre = document.createElement('span');
    nombre.className = 'name';
    nombre.textContent = item.n;
    texto.appendChild(nombre);

    if (item.d) {
      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = item.d;
      texto.appendChild(desc);
    }

    // Sin precio publicado: "Consultar", nunca un monto inventado.
    const precio = document.createElement('div');
    precio.className = 'price';
    precio.textContent = item.p ? money(item.p) : 'Consultar';

    row.appendChild(texto);
    row.appendChild(precio);
    grid.appendChild(row);
  });

  panel.appendChild(grid);
  panelsEl.appendChild(panel);
});

function showTab(key) {
  document.querySelectorAll('.menu-tab').forEach(t => {
    const activo = t.dataset.key === key;
    t.classList.toggle('active', activo);
    t.setAttribute('aria-selected', activo ? 'true' : 'false');
  });
  document.querySelectorAll('.menu-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + key);
  });
  initScrollReveal();
}

/* ---------- NAVEGACIÓN POR PESTAÑAS ---------- */
const navLinks = document.getElementById('navLinks');

function goToTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.dataset.tabPanel === tabId);
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.tab === tabId);
  });
  navLinks.classList.remove('open');
  document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initScrollReveal();
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); goToTab(el.dataset.tab); });
});

document.getElementById('navToggle').addEventListener('click', function () {
  const abierto = navLinks.classList.toggle('open');
  this.setAttribute('aria-expanded', abierto ? 'true' : 'false');
});

/* ---------- INDICADOR ABIERTO / CERRADO ----------
   Google mostraba 'Abre a las 12 p.m. del sáb', o sea que NO abren todos los días y el horario completo por día no está publicado. Se deja sin estado abierto/cerrado antes que mostrar uno equivocado. */
function horarioDeHoy() {
  return null;
}

function actualizarEstado(dotId, textId) {
  const dot  = document.getElementById(dotId);
  const text = document.getElementById(textId);
  if (!dot || !text) return;
  const ahora   = new Date();
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  const h       = horarioDeHoy();
  if (!h) {
    // Sin horario publicado: se esconde la pildora entera en vez de
    // afirmar que esta cerrado, cosa que no nos consta.
    const caja = text.closest('.pill, .status-line') || text.parentElement;
    if (caja) caja.hidden = true;
    return;
  }
  const abierto = minutos >= h[0] && minutos < h[1];
  text.textContent = abierto ? 'Abierto ahora' : 'Cerrado ahora';
  dot.classList.toggle('closed', !abierto);
}

actualizarEstado('statusDot', 'statusText');
actualizarEstado('statusDot2', 'statusText2');

/* ---------- SCROLL REVEAL (con red de seguridad) ---------- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i % 6, 6) * 55) + 'ms';
    io.observe(el);
  });

  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }, 1200);
}
initScrollReveal();

window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 320);
});
