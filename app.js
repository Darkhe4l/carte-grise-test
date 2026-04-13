'use strict';

/* ─── OWASP A03 – XSS Prevention ────────────────────────────────────────
   Toute donnée utilisateur ou externe insérée via innerHTML DOIT passer
   par escHTML() pour neutraliser les caractères HTML spéciaux.           */
function escHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/* ═══════════════════════════════════════════════════════════════════════
   TARIFS RÉGIONAUX 2024 (taxe Y1 = CV × tarif)
   Source : Direction générale des Finances publiques (DGFIP)
   Arrêté du 1er janvier 2024
══════════════════════════════════════════════════════════════════════════ */
/* ─── MARQUES & MODÈLES ──────────────────────────────────────────────── */
const MARQUES_MODELES = {
  /* ── Europe ── */
  'Abarth':          ['500','595','695','124 Spider'],
  'Alfa Romeo':      ['147','155','156','159','166','Brera','Giulia','Giulietta','GTV','Mito','Spider','Stelvio','Tonale'],
  'Alpine':          ['A110','A110 S','A110 R','A290'],
  'Ariel':           ['Atom','Nomad','Ace'],
  'Aston Martin':    ['DB9','DB11','DBS','DBX','DBX 707','Rapide','Vantage','Virage'],
  'Audi':            ['A1','A2','A3','A4','A5','A6','A7','A8','e-tron','e-tron GT','Q2','Q3','Q4 e-tron','Q5','Q6 e-tron','Q7','Q8','Q8 e-tron','R8','RS3','RS4','RS5','RS6','RS7','S3','S4','S5','S6','S7','S8','SQ2','SQ5','SQ7','SQ8','TT','TTS'],
  'Bentley':         ['Bentayga','Continental GT','Continental GTC','Flying Spur','Mulsanne'],
  'BMW':             ['i3','i4','i5','i7','iX','iX1','iX2','iX3','M2','M3','M4','M5','M6','M8','Série 1','Série 2','Série 3','Série 4','Série 5','Série 6','Série 7','Série 8','X1','X2','X3','X4','X5','X6','X7','XM','Z3','Z4'],
  'Bugatti':         ['Chiron','Chiron Super Sport','Divo','Mistral','Tourbillon','Veyron'],
  'Caterham':        ['Seven 170','Seven 270','Seven 310','Seven 360','Seven 420','Seven 620','Super 3'],
  'Citroën':         ['Ami','Berlingo','C1','C2','C3','C3 Aircross','C4','C4 Cactus','C4 X','C5','C5 Aircross','C5 X','C6','C-Elysée','ë-C3','Grand C4 Picasso','Jumper','Jumpy','Nemo','Picasso','Saxo','SpaceTourer','Xantia','Xsara','Xsara Picasso','ZX'],
  'Cupra':           ['Ateca','Born','Formentor','Leon','Tavascan','Terramar'],
  'Dacia':           ['Bigster','Dokker','Duster','Jogger','Lodgy','Logan','Logan MCV','Sandero','Sandero Stepway','Spring'],
  'DS Automobiles':  ['DS 3','DS 3 Crossback','DS 4','DS 4 Crossback','DS 5','DS 7','DS 7 Crossback','DS 9'],
  'Ferrari':         ['296 GTB','296 GTS','488 GTB','488 Pista','488 Spider','812 Competizione','812 GTS','812 Superfast','California T','F8 Spider','F8 Tributo','GTC4Lusso','Portofino','Portofino M','Purosangue','Roma','SF90 Spider','SF90 Stradale'],
  'Fiat':            ['124 Spider','500','500C','500e','500L','500X','Bravo','Doblo','Ducato','Fiorino','Fullback','Grande Punto','Panda','Punto','Scudo','Tipo','Ulysse'],
  'Ford':            ['B-Max','Bronco','C-Max','EcoSport','Edge','Escape','Explorer','F-150','F-150 Lightning','Fiesta','Focus','Galaxy','Ka','Ka+','Kuga','Maverick','Mondeo','Mustang','Mustang Mach-E','Puma','Ranger','S-Max','Tourneo','Transit'],
  'Honda':           ['Accord','City','Civic','CR-V','e','e:Ny1','FR-V','HR-V','Jazz','Legend','NSX','Pilot','ZR-V'],
  'Hyundai':         ['Bayon','i10','i20','i30','i40','IONIQ','IONIQ 5','IONIQ 5 N','IONIQ 6','IONIQ 9','Kona','Kona Electric','Nexo','Santa Fe','Tucson','Venue'],
  'Jaguar':          ['E-Pace','F-Pace','F-Type','I-Pace','XE','XF','XJ'],
  'Jeep':            ['Avenger','Cherokee','Commander','Compass','Gladiator','Grand Cherokee','Grand Cherokee 4xe','Renegade','Wagoneer','Wrangler'],
  'Kia':             ['Ceed','EV3','EV6','EV9','Niro','Niro EV','Picanto','ProCeed','Rio','Sorento','Soul','Sportage','Stinger','Stonic','XCeed'],
  'Koenigsegg':      ['Agera','Agera RS','CC850','Gemera','Jesko','Regera'],
  'Lamborghini':     ['Aventador','Huracán','Huracán EVO','Revuelto','Urus','Urus Performante'],
  'Lancia':          ['Delta','Stratos','Thema','Ypsilon'],
  'Land Rover':      ['Defender','Discovery','Discovery Sport','Freelander','Range Rover','Range Rover Evoque','Range Rover Sport','Range Rover Velar'],
  'Lexus':           ['CT','ES','GS','IS','LC','LM','LS','LX','NX','RC','RX','RZ','UX'],
  'Lotus':           ['Eletre','Elise','Emira','Evija','Evora','Exige'],
  'Maserati':        ['GranCabrio','GranTurismo','Ghibli','Grecale','Levante','MC20','Quattroporte'],
  'Mazda':           ['2','3','6','CX-3','CX-30','CX-5','CX-60','CX-80','MX-30','MX-5','MX-5 RF'],
  'McLaren':         ['540C','570S','600LT','620R','650S','675LT','720S','750S','Artura','GT','P1','Senna','Speedtail'],
  'Mercedes-Benz':   ['AMG GT','Classe A','Classe B','Classe C','Classe CLA','Classe CLE','Classe CLS','Classe E','Classe G','Classe GLA','Classe GLB','Classe GLC','Classe GLE','Classe GLS','Classe S','Classe SL','Classe SLK','Classe V','EQA','EQB','EQC','EQE','EQE SUV','EQS','EQS SUV','EQT','EQV','Marco Polo','Sprinter','Viano','Vito'],
  'MG':              ['3','4','5','Cyberster','EHS','HS','Marvel R','ZS','ZS EV'],
  'MINI':            ['Cabrio','Clubman','Countryman','John Cooper Works','MINI 3 portes','MINI 5 portes','Paceman'],
  'Mitsubishi':      ['ASX','Colt','Eclipse Cross','Eclipse Cross PHEV','Galant','L200','Outlander','Outlander PHEV','Pajero','Space Star'],
  'Morgan':          ['Plus Four','Plus Six','Super 3'],
  'Nissan':          ['350Z','370Z','Ariya','GT-R','Juke','Leaf','Micra','Note','Pathfinder','Primastar','Qashqai','Townstar','X-Trail','Z'],
  'Opel':            ['Adam','Agila','Ampera','Astra','Combo','Corsa','Corsa-e','Crossland','Grandland','Insignia','Meriva','Mokka','Mokka-e','Movano','Vectra','Vivaro','Zafira'],
  'Pagani':          ['Huayra','Utopia','Zonda'],
  'Peugeot':         ['1007','107','108','2008','205','206','207','208','3008','301','307','308','4007','4008','405','406','407','408','5008','508','607','Boxer','e-208','e-2008','Expert','Partner','Rifter','Traveller'],
  'Polestar':        ['1','2','3','4'],
  'Porsche':         ['718 Boxster','718 Cayman','911','911 GT3','911 Turbo','Cayenne','Cayenne Coupé','Macan','Panamera','Taycan','Taycan Cross Turismo'],
  'Renault':         ['Arkana','Austral','Captur','Clio','Espace','Express','Kangoo','Koleos','Laguna','Master','Megane','Megane E-Tech','Modus','Rafale','Scenic','Scenic E-Tech','Symbol','Talisman','Twingo','Zoe'],
  'Rimac':           ['Nevera'],
  'Rolls-Royce':     ['Cullinan','Dawn','Ghost','Phantom','Silver Shadow','Spectre','Wraith'],
  'SEAT':            ['Arona','Ateca','Ibiza','Leon','Mii','Tarraco'],
  'Škoda':           ['Elroq','Enyaq','Fabia','Kamiq','Karoq','Kodiaq','Octavia','Rapid','Superb'],
  'Smart':           ['#1','#3','EQ forfour','EQ fortwo','forfour','fortwo'],
  'SsangYong':       ['Korando','Musso','Rexton','Tivoli','Torres','XLV'],
  'Subaru':          ['BRZ','Forester','Impreza','Legacy','Outback','Solterra','WRX','XV'],
  'Suzuki':          ['Alto','Baleno','Celerio','Ignis','Jimny','S-Cross','SX4','Swift','Vitara'],
  'Tesla':           ['Cybertruck','Model 3','Model S','Model X','Model Y','Roadster'],
  'Toyota':          ['Aygo','Aygo X','bZ4X','C-HR','Camry','Corolla','Corolla Cross','GR86','GR Corolla','GR Supra','GR Yaris','Hilux','Land Cruiser','Mirai','Prius','Prius Prime','ProAce','RAV4','RAV4 Prime','Urban Cruiser','Yaris','Yaris Cross'],
  'Vauxhall':        ['Adam','Astra','Corsa','Crossland','Grandland','Insignia','Meriva','Mokka','Vivaro','Zafira'],
  'Volkswagen':      ['Arteon','Caddy','California','Golf','Golf GTI','Golf R','ID.2','ID.3','ID.4','ID.5','ID.7','Multivan','Passat','Polo','Scirocco','Sharan','T-Cross','T-Roc','Taigo','Tiguan','Tiguan Allspace','Touareg','Touran','Transporter','Up!'],
  'Volvo':           ['C40 Recharge','EX30','EX40','EX90','S60','S90','V40','V60','V90','XC40','XC60','XC90'],

  /* ── Amérique du Nord ── */
  'Acura':           ['CDX','ILX','MDX','NSX','RDX','RLX','TLX'],
  'Buick':           ['Enclave','Encore','Encore GX','Envision','LaCrosse','Regal'],
  'Cadillac':        ['CT4','CT5','CT6','Escalade','Lyriq','XT4','XT5','XT6'],
  'Chevrolet':       ['Blazer','Blazer EV','Bolt EUV','Bolt EV','Camaro','Colorado','Corvette','Equinox','Equinox EV','Express','Malibu','Silverado','Spark','Suburban','Tahoe','Trailblazer','Traverse','Trax'],
  'Chrysler':        ['300','300C','Pacifica','Voyager'],
  'Dodge':           ['Challenger','Charger','Durango','Hornet','Ram 1500'],
  'GMC':             ['Acadia','Canyon','Envoy','Hummer EV','Sierra','Terrain','Yukon'],
  'Lincoln':         ['Aviator','Corsair','Nautilus','Navigator'],
  'Lucid':           ['Air','Gravity'],
  'Ram':             ['1500','1500 TRX','2500','3500','ProMaster'],
  'Rivian':          ['R1S','R1T','R2'],

  /* ── Asie – Japon ── */
  'Daihatsu':        ['Copen','Gran Max','Hijet','Move','Rocky','Sirion','Terios','Thor'],
  'Infiniti':        ['Q30','Q50','Q60','QX30','QX50','QX55','QX60','QX70','QX80'],
  'Isuzu':           ['D-Max','MU-X','Trooper'],

  /* ── Asie – Corée ── */
  'Genesis':         ['G70','G80','G90','GV60','GV70','GV80'],

  /* ── Asie – Chine ── */
  'AITO':            ['M5','M7','M9'],
  'BYD':             ['Atto 3','Dolphin','Han','Seal','Seal U','Song','Song Plus','Tang','Yuan Plus'],
  'Chery':           ['Arrizo 5','Omoda 5','Omoda 7','Tiggo 4','Tiggo 7','Tiggo 8'],
  'DFSK':            ['Glory 330','Glory 360','Glory 580'],
  'Dongfeng':        ['Aeolus','Fengshen','Rich'],
  'GAC':             ['Aion LX','Aion S','Empow','GS3','GS4','GS8'],
  'Geely':           ['Coolray','Emgrand','Okavango','Preface','Starray'],
  'Great Wall':      ['Cannon','Haval H6','Jolion','Ora Funky Cat','Poer','Tank 300','Tank 500'],
  'Haval':           ['Dargo','H2','H4','H6','H9','Jolion'],
  'JAC':             ['J7','JS4','T8','T9'],
  'Lynk & Co':       ['01','02','03','05','06','09'],
  'NIO':             ['EC7','EL6','EL7','EL8','ES6','ES7','ES8','ET5','ET5T','ET7'],
  'Ora':             ['Cat','Funky Cat','Lightning Cat'],
  'Seres':           ['3','5','7'],
  'Wuling':          ['Air EV','Almaz','Bingo','Hongguang Mini EV'],
  'Xpeng':           ['G3','G6','G9','P5','P7','P7i','X9'],
  'Zeekr':           ['001','007','009','X'],
  'Deepal':          ['L07','S07'],
  'Leapmotor':       ['C01','C10','C11','T03'],
  'Li Auto':         ['L6','L7','L8','L9','Mega'],
  'Lixiang':         ['L6','L7','L8','L9'],

  /* ── Asie – Inde ── */
  'Mahindra':        ['Bolero','BE.6','Scorpio','Scorpio-N','Thar','XUV300','XUV400','XUV700'],
  'Maruti Suzuki':   ['Alto','Baleno','Brezza','Celerio','Dzire','Ertiga','Fronx','Grand Vitara','Jimny','S-Presso','Swift','Wagon R'],
  'Tata':            ['Altroz','Curvv','Harrier','Nexon','Nexon EV','Punch','Safari','Tiago','Tigor'],
  'Force Motors':    ['Gurkha','Trax'],
  'Hindustan Motors':['Ambassador'],

  /* ── Asie – Autres ── */
  'Perodua':         ['Alza','Aruz','Ativa','Axia','Bezza','Myvi'],
  'Proton':          ['Exora','Iriz','Persona','Saga','X50','X70'],
  'Foton':           ['Gratour','Tunland'],
};


const REGIONS = {
  idf:  { nom: 'Île-de-France',                 tarif: 54.95 },
  ara:  { nom: 'Auvergne-Rhône-Alpes',          tarif: 45.20 },
  bfc:  { nom: 'Bourgogne-Franche-Comté',       tarif: 56.00 },
  bre:  { nom: 'Bretagne',                      tarif: 55.00 },
  cvl:  { nom: 'Centre-Val de Loire',           tarif: 47.50 },
  cor:  { nom: 'Corse',                         tarif: 27.00 },
  gest: { nom: 'Grand Est',                     tarif: 48.00 },
  hdf:  { nom: 'Hauts-de-France',               tarif: 33.00 },
  nor:  { nom: 'Normandie',                     tarif: 35.00 },
  naq:  { nom: 'Nouvelle-Aquitaine',            tarif: 45.00 },
  occ:  { nom: 'Occitanie',                     tarif: 44.00 },
  pdl:  { nom: 'Pays de la Loire',              tarif: 48.00 },
  paca: { nom: 'Provence-Alpes-Côte d\'Azur',   tarif: 51.20 },
};

const Y4 = 11.00;
const Y5 = 2.76;

/* ═══════════════════════════════════════════════════════════════════════
   TAX CALCULATION ENGINE
══════════════════════════════════════════════════════════════════════════ */
function calcTax() {
  const regionKey  = document.getElementById('region').value;
  const cv         = parseInt(document.getElementById('cv').value) || 0;
  const carburant  = document.getElementById('carburant').value;
  const dateCirc   = document.getElementById('datecirculation').value;

  const region     = REGIONS[regionKey];
  const tarif      = region ? region.tarif : 0;

  const ageYears   = dateCirc ? (Date.now() - new Date(dateCirc)) / 3.156e10 : 0;
  const isOld      = ageYears > 10;
  const isElec     = carburant === 'electrique';

  let Y1 = cv * tarif;
  if (isElec)        Y1 = 0;
  else if (isOld)    Y1 *= 0.50;

  const total = Y1 + Y4 + Y5;

  return { Y1, Y4, Y5, total, tarif, cv, isOld, isElec, ageYears, region, regionKey };
}

function fmt(n) {
  return n.toFixed(2).replace('.', ',') + ' €';
}

function refreshTaxPreview() {
  const t = calcTax();
  const bar  = document.getElementById('tax-preview-bar');
  const amt  = document.getElementById('tax-preview-amt');
  const note = document.getElementById('tax-preview-note');

  if (!t.region || !t.cv || !document.getElementById('carburant').value) {
    amt.textContent  = '— €';
    note.textContent = 'Remplissez région, CV et carburant';
    return;
  }

  amt.textContent = fmt(t.total);

  const parts = [];
  if (t.isElec) parts.push('Exonération électrique (Y1 = 0)');
  else if (t.isOld) parts.push('Réduction 50% (> 10 ans)');
  parts.push(`Y4 ${fmt(Y4)} + Y5 ${fmt(Y5)}`);
  note.textContent = parts.join(' · ');
}

function populateEstimate() {
  const t = calcTax();

  const marque = document.getElementById('marque').value;
  const modele = document.getElementById('modele').value;
  const immat  = document.getElementById('immatriculation').value;
  const dc     = document.getElementById('datecirculation').value;
  const carb   = document.getElementById('carburant');
  const carbTxt = carb.options[carb.selectedIndex]?.text.replace(/\s*⚡.*/, '') || '—';

  document.getElementById('recap-vehicule').textContent = `${marque} ${modele}` || '—';
  document.getElementById('recap-immat').textContent    = immat || '—';
  document.getElementById('recap-date').textContent     = dc ? new Date(dc).toLocaleDateString('fr-FR') : '—';
  document.getElementById('recap-region').textContent   = t.region ? t.region.nom.split(' ').slice(0,2).join(' ') : '—';
  document.getElementById('recap-cv').textContent       = t.cv ? `${t.cv} CV` : '—';
  document.getElementById('recap-carb').textContent     = carbTxt;

  const tagEl = document.getElementById('tag-y1');
  if (t.isElec) {
    tagEl.textContent = 'Exonéré'; tagEl.className = 'tag tag-exempt'; tagEl.style.display = '';
    document.getElementById('y1-base').textContent = 'Véhicule électrique';
    document.getElementById('y1-val').textContent  = '0,00 €';
  } else if (t.isOld) {
    tagEl.textContent = '−50%'; tagEl.className = 'tag tag-reduc'; tagEl.style.display = '';
    document.getElementById('y1-base').textContent = `${t.cv} CV × ${fmt(t.tarif)} × 50%`;
    document.getElementById('y1-val').textContent  = fmt(t.Y1);
  } else {
    tagEl.style.display = 'none';
    document.getElementById('y1-base').textContent = `${t.cv} CV × ${fmt(t.tarif)}`;
    document.getElementById('y1-val').textContent  = fmt(t.Y1);
  }

  document.getElementById('total-val').textContent = fmt(t.total);

  const totalStr = fmt(t.total);
  document.getElementById('pay-total-display').textContent = totalStr;
  document.getElementById('btn-pay-amount').textContent    = totalStr;
}

/* ═══════════════════════════════════════════════════════════════════════
   ADDRESS AUTOCOMPLETE — api-adresse.data.gouv.fr
══════════════════════════════════════════════════════════════════════════ */
let adresseValidee = false;
let adresseMeta = { label: '', postcode: '', city: '', street: '' };

(function initAddressAutocomplete() {
  const input      = document.getElementById('adresse');
  const dropdown   = document.getElementById('addr-suggestions');
  const badge      = document.getElementById('addr-badge');
  const cpInput    = document.getElementById('codepostal');
  const villeInput = document.getElementById('ville');
  const fAdresse   = document.getElementById('f-adresse');
  const cpHint     = document.getElementById('cp-hint');
  const villeHint  = document.getElementById('ville-hint');

  let debounceTimer = null;
  let activeIdx     = -1;
  let currentItems  = [];

  function openDropdown(html) {
    dropdown.innerHTML = html;
    dropdown.classList.add('open');
    fAdresse.classList.add('suggestions-open');
  }
  function closeDropdown() {
    dropdown.classList.remove('open');
    fAdresse.classList.remove('suggestions-open');
    activeIdx = -1;
    currentItems = [];
  }
  function resetValidation() {
    adresseValidee = false;
    adresseMeta = { label:'', postcode:'', city:'', street:'' };
    badge.classList.remove('show');
    cpInput.value    = '';
    villeInput.value = '';
    cpHint.style.display    = 'none';
    villeHint.style.display = 'none';
    document.getElementById('f-codepostal').classList.remove('valid','error');
    document.getElementById('f-ville').classList.remove('valid','error');
    document.getElementById('f-adresse').classList.remove('valid','error');
  }
  function applySelection(feature) {
    const props = feature.properties;
    const label = props.name || props.label;
    adresseMeta = {
      label:    props.label   || '',
      postcode: props.postcode || '',
      city:     props.city    || '',
      street:   props.street  || props.name || ''
    };
    adresseValidee = true;

    input.value      = label;
    cpInput.value    = props.postcode || '';
    villeInput.value = props.city     || '';

    cpHint.style.display    = 'flex';
    villeHint.style.display = 'flex';

    markOk('adresse');
    markOk('codepostal');
    markOk('ville');

    badge.classList.add('show');
    closeDropdown();
    input.focus();
  }
  function highlightItem(idx) {
    const items = dropdown.querySelectorAll('.addr-item');
    items.forEach((el, i) => el.classList.toggle('highlighted', i === idx));
  }
  function renderItems(features) {
    if (!features.length) {
      openDropdown('<div class="addr-empty">Aucune adresse trouvée pour cette saisie.</div>');
      return;
    }
    currentItems = features;
    const html = features.map((f, i) => {
      const p = f.properties;
      return `<div class="addr-item" role="option" data-idx="${i}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <div>
          <div class="addr-item-main">${escHTML(p.name || p.label)}</div>
          <div class="addr-item-sub">${escHTML(p.postcode || '')} ${escHTML(p.city || '')}</div>
        </div>
      </div>`;
    }).join('');
    openDropdown(html);

    dropdown.querySelectorAll('.addr-item').forEach(el => {
      el.addEventListener('mousedown', e => {
        e.preventDefault();
        const idx = parseInt(el.getAttribute('data-idx'), 10);
        applySelection(currentItems[idx]);
      });
    });
  }

  async function fetchSuggestions(query) {
    openDropdown('<div class="addr-spinner-row"><div class="addr-spinner"></div> Recherche en cours…</div>');
    try {
      const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=6&autocomplete=1`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      renderItems(data.features || []);
    } catch (err) {
      openDropdown('<div class="addr-empty">Erreur de connexion à l\'API. Réessayez.</div>');
    }
  }

  input.addEventListener('input', () => {
    resetValidation();
    const q = input.value.trim();
    clearTimeout(debounceTimer);
    if (q.length < 3) { closeDropdown(); return; }
    debounceTimer = setTimeout(() => fetchSuggestions(q), 300);
  });

  input.addEventListener('keydown', e => {
    const items = dropdown.querySelectorAll('.addr-item');
    if (!dropdown.classList.contains('open') || !items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = Math.min(activeIdx + 1, items.length - 1);
      highlightItem(activeIdx);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = Math.max(activeIdx - 1, 0);
      highlightItem(activeIdx);
    } else if (e.key === 'Enter' && activeIdx >= 0 && currentItems[activeIdx]) {
      e.preventDefault();
      applySelection(currentItems[activeIdx]);
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  input.addEventListener('blur', () => {
    setTimeout(closeDropdown, 180);
  });

  document.addEventListener('click', e => {
    if (!fAdresse.contains(e.target)) closeDropdown();
  });
})();

let currentStep = 1;
const STEP_PCT  = { 1:20, 2:40, 3:60, 4:80, 5:100 };

function goTo(n) {
  if (n > currentStep && n <= 5 && !validateStep(currentStep)) return;

  const old = currentStep;

  const si = document.getElementById('si-' + old);
  const sc = document.getElementById('sc-' + old);
  if (si) {
    si.classList.remove('active');
    if (n > old) {
      si.classList.add('completed');
      if (sc) sc.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (sc) {
      si.classList.remove('completed');
      sc.textContent = old;
    }
  }

  const oldStep = document.getElementById('step-' + (old === 6 ? 'confirm' : old));
  if (oldStep) oldStep.classList.remove('active');

  currentStep = n;

  const ni = document.getElementById('si-' + n);
  if (ni) { ni.classList.add('active'); ni.classList.remove('completed'); }
  const nc = document.getElementById('sc-' + n);
  if (nc) nc.textContent = n;

  const newId = n === 6 ? 'confirm' : String(n);
  const newStep = document.getElementById('step-' + newId);
  if (newStep) newStep.classList.add('active');

  document.getElementById('progress-fill').style.width = (STEP_PCT[n] || 100) + '%';

  if (n === 4) populateEstimate();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ═══════════════════════════════════════════════════════════════════════
   VALIDATION
══════════════════════════════════════════════════════════════════════════ */
const rules = {
  nom:             { test: v => /^[a-zA-ZÀ-ÿ\s\-']{2,}$/.test(v.trim()),                   msg: 'Nom invalide (lettres, tirets, espaces).' },
  prenoms:         { test: v => v.trim().length >= 2,                                         msg: 'Veuillez saisir vos prénoms.' },
  datenaissance:   { test: v => { if(!v)return false; const a=(Date.now()-new Date(v))/3.156e10; return a>=16&&a<=120; }, msg: 'Date invalide (16–120 ans).' },
  telephone:       { test: v => /^(?:(?:\+|00)33|0)\s*[1-9](?:\s*\d{2}){4}$/.test(v.replace(/\s/g,'')), msg: 'Numéro invalide (ex: 06 12 34 56 78).' },
  email:           { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),                     msg: 'E-mail invalide.' },
  adresse:         { test: v => v.trim().length >= 5 && adresseValidee,                       msg: 'Veuillez sélectionner une adresse dans les suggestions proposées.' },
  codepostal:      { test: v => /^\d{5}$/.test(v),                                           msg: 'Code postal invalide (5 chiffres).' },
  ville:           { test: v => v.trim().length >= 2,                                         msg: 'Commune requise.' },
  immatriculation: { test: v => /^[A-Z]{2}-\d{3}-[A-Z]{2}$/.test(v.toUpperCase()),           msg: 'Format SIV requis : AB-123-CD.' },
  marque:          { test: v => Object.prototype.hasOwnProperty.call(MARQUES_MODELES, v),     msg: 'Veuillez sélectionner une marque dans la liste.' },
  modele:          { test: v => v !== '' && v !== undefined,                                  msg: 'Veuillez sélectionner un modèle dans la liste.' },
  datecirculation: { test: v => v && new Date(v) <= new Date(),                               msg: 'Date invalide ou future.' },
  cv:              { test: v => /^\d+$/.test(v) && +v >= 1 && +v <= 99,                       msg: 'Puissance entre 1 et 99 CV.' },
  region:          { test: v => !!REGIONS[v],                                                 msg: 'Sélectionnez votre région.' },
  carburant:       { test: v => v !== '',                                                      msg: 'Sélectionnez le carburant.' },
};

const STEP_FIELDS = {
  1: ['nom','prenoms','datenaissance','telephone','email','adresse','codepostal','ville'],
  2: ['immatriculation','marque','modele','datecirculation','cv','region','carburant'],
  3: [],
  4: [],
  5: [],
};

function validateStep(s) {
  let ok = true;
  (STEP_FIELDS[s] || []).forEach(id => {
    const el = document.getElementById(id);
    const v  = rules[id];
    if (!v) return;
    if (!v.test(el ? el.value : '')) { markErr(id, v.msg); ok = false; }
    else markOk(id);
  });
  if (s === 3) {
    const req = ['identite','domicile','cerfa1','cession','assurance','permis'];
    if (req.some(d => !document.getElementById('doc-'+d).classList.contains('uploaded'))) {
      alert('Veuillez déposer tous les documents obligatoires.'); ok = false;
    }
    if (ok && !document.getElementById('consent').checked) {
      alert('Veuillez accepter les conditions RGPD.'); ok = false;
    }
  }
  return ok;
}

function markErr(id, msg) {
  const w = document.getElementById('f-' + id); if (!w) return;
  w.classList.add('error'); w.classList.remove('valid');
  const e = w.querySelector('.err-msg'); if (e && msg) e.textContent = msg;
}
function markOk(id) {
  const w = document.getElementById('f-' + id); if (!w) return;
  w.classList.remove('error'); w.classList.add('valid');
}

Object.keys(rules).forEach(id => {
  const el = document.getElementById(id); if (!el) return;
  el.addEventListener('blur', () => {
    if (!el.value.trim() && el.type !== 'select-one') { document.getElementById('f-'+id)?.classList.remove('valid','error'); return; }
    rules[id].test(el.value) ? markOk(id) : markErr(id, rules[id].msg);
  });
  el.addEventListener('focus', () => document.getElementById('f-'+id)?.classList.add('focused'));
  el.addEventListener('blur',  () => document.getElementById('f-'+id)?.classList.remove('focused'));
  el.addEventListener('input', () => {
    if (document.getElementById('f-'+id)?.classList.contains('error') && rules[id].test(el.value)) markOk(id);
  });
});

/* ─── AUTOCOMPLETE MARQUE ─────────────────────────────────────────────────*/
(function() {
  const searchInput = document.getElementById('marque-search');
  const hiddenInput = document.getElementById('marque');
  const dropdown    = document.getElementById('marque-dropdown');
  const modeleEl    = document.getElementById('modele');
  let focusedIdx    = -1;

  function highlight(text, query) {
    const safeText = escHTML(text);
    if (!query) return safeText;
    const safeQuery = escHTML(query).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const re = new RegExp('(' + safeQuery + ')', 'gi');
    return safeText.replace(re, '<mark>$1</mark>');
  }

  function openDropdown(items) {
    focusedIdx = -1;
    dropdown.innerHTML = '';
    items.forEach((marque, i) => {
      const div = document.createElement('div');
      div.className = 'autocomplete-item';
      div.innerHTML = highlight(marque, searchInput.value.trim());
      div.addEventListener('mousedown', e => { e.preventDefault(); selectMarque(marque); });
      dropdown.appendChild(div);
    });
    dropdown.classList.toggle('open', items.length > 0);
  }

  function closeDropdown() { dropdown.classList.remove('open'); focusedIdx = -1; }

  function selectMarque(marque) {
    searchInput.value  = marque;
    hiddenInput.value  = marque;
    closeDropdown();
    markOk('marque');
    modeleEl.innerHTML = '<option value="">— Sélectionnez un modèle —</option>';
    (MARQUES_MODELES[marque] || []).forEach(m => {
      const opt = document.createElement('option'); opt.value = m; opt.textContent = m;
      modeleEl.appendChild(opt);
    });
    modeleEl.disabled = false;
    modeleEl.value = '';
    document.getElementById('f-modele').classList.remove('valid','error');
  }

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    hiddenInput.value = '';
    modeleEl.innerHTML = '<option value="">— Sélectionnez d\'abord une marque —</option>';
    modeleEl.disabled = true;
    document.getElementById('f-modele').classList.remove('valid','error');
    if (!q) { closeDropdown(); return; }
    const matches = Object.keys(MARQUES_MODELES).filter(m => m.toLowerCase().includes(q));
    openDropdown(matches);
  });

  searchInput.addEventListener('keydown', e => {
    const items = dropdown.querySelectorAll('.autocomplete-item');
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault(); focusedIdx = Math.min(focusedIdx + 1, items.length - 1);
      items.forEach((el,i) => el.classList.toggle('focused', i === focusedIdx));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); focusedIdx = Math.max(focusedIdx - 1, 0);
      items.forEach((el,i) => el.classList.toggle('focused', i === focusedIdx));
    } else if (e.key === 'Enter' && focusedIdx >= 0) {
      e.preventDefault(); selectMarque(Object.keys(MARQUES_MODELES).filter(m => m.toLowerCase().includes(searchInput.value.trim().toLowerCase()))[focusedIdx]);
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  searchInput.addEventListener('focus', () => document.getElementById('f-marque')?.classList.add('focused'));
  searchInput.addEventListener('blur',  () => {
    setTimeout(closeDropdown, 150);
    document.getElementById('f-marque')?.classList.remove('focused');
    if (!hiddenInput.value) markErr('marque', 'Veuillez sélectionner une marque dans la liste.');
  });

  modeleEl.addEventListener('change', () => {
    modeleEl.value ? markOk('modele') : markErr('modele', 'Veuillez sélectionner un modèle dans la liste.');
  });
})();

// Immatriculation auto-format
document.getElementById('immatriculation').addEventListener('input', function() {
  let r = this.value.replace(/[^a-zA-Z0-9]/g,'').toUpperCase().slice(0,7);
  if (r.length > 5) r = r.slice(0,2)+'-'+r.slice(2,5)+'-'+r.slice(5);
  else if (r.length > 2) r = r.slice(0,2)+'-'+r.slice(2);
  this.value = r;
});

/* ═══════════════════════════════════════════════════════════════════════
   DOCUMENT UPLOAD
══════════════════════════════════════════════════════════════════════════ */
function onFile(input, docId, descId) {
  const file = input.files[0]; if (!file) return;
  const allowed = ['application/pdf','image/jpeg'];
  if (!allowed.includes(file.type)) { alert('Format non accepté : PDF, JPG ou JPEG uniquement.'); input.value=''; return; }
  if (file.size > 5*1024*1024)       { alert('Fichier trop volumineux (max 5 Mo).');              input.value=''; return; }
  const lbl = document.getElementById(docId);
  lbl.classList.add('uploaded');
  lbl.querySelector('.doc-icon').innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
  const d = document.getElementById(descId); if (d) d.textContent = '✓ ' + file.name;
}

document.querySelectorAll('label.doc-item').forEach(lbl => {
  lbl.addEventListener('dragover',  e => { e.preventDefault(); lbl.classList.add('drag-over'); });
  lbl.addEventListener('dragleave', () => lbl.classList.remove('drag-over'));
  lbl.addEventListener('drop', e => {
    e.preventDefault(); lbl.classList.remove('drag-over');
    const inp = lbl.querySelector('input[type="file"]');
    if (inp && e.dataTransfer.files.length) {
      const dt = new DataTransfer(); dt.items.add(e.dataTransfer.files[0]);
      inp.files = dt.files;
      onFile(inp, lbl.id, 'desc-' + lbl.id.replace('doc-',''));
    }
  });
});

/* ═══════════════════════════════════════════════════════════════════════
   ENCRYPT SIMULATION (step 3 → 4)
══════════════════════════════════════════════════════════════════════════ */
function encryptThenGoTo4() {
  if (!validateStep(3)) return;

  const overlay = document.getElementById('enc-overlay');
  const bar     = document.getElementById('enc-bar');
  const msg     = document.getElementById('enc-msg');
  overlay.classList.add('show');

  const msgs = [
    'Initialisation AES-256-GCM…',
    'Chiffrement des données personnelles…',
    'Chiffrement des pièces justificatives…',
    'Génération des signatures HMAC…',
    'Vérification de l\'intégrité…',
    'Transmission sécurisée…',
  ];

  let p = 0, last = -1;
  const tick = setInterval(() => {
    p += Math.random() * 16 + 6;
    if (p > 100) p = 100;
    bar.style.width = p + '%';
    const idx = Math.min(Math.floor(p / 100 * msgs.length), msgs.length - 1);
    if (idx !== last) { last = idx; msg.style.opacity='0'; setTimeout(()=>{ msg.textContent=msgs[idx]; msg.style.transition='opacity .25s'; msg.style.opacity='1'; }, 80); }
    if (p >= 100) {
      clearInterval(tick);
      setTimeout(() => { overlay.classList.remove('show'); goTo(4); }, 400);
    }
  }, 150);
}

/* ═══════════════════════════════════════════════════════════════════════
   STRIPE-LIKE CARD INPUT
══════════════════════════════════════════════════════════════════════════ */
function detectBrand(n) {
  if (/^4/.test(n))                                  return 'visa';
  if (/^5[1-5]/.test(n) || /^2[2-7]\d{2}/.test(n)) return 'mastercard';
  if (/^3[47]/.test(n))                              return 'amex';
  return '';
}

document.getElementById('cardnum').addEventListener('input', function() {
  const raw = this.value.replace(/\D/g,'');
  const brand = detectBrand(raw);
  const maxLen = brand === 'amex' ? 15 : 16;
  const trimmed = raw.slice(0, maxLen);
  let fmt;
  if (brand === 'amex') fmt = trimmed.replace(/^(\d{4})(\d{0,6})(\d{0,5})/, (_,a,b,c) => [a,b,c].filter(Boolean).join(' '));
  else                  fmt = trimmed.replace(/(.{4})/g,'$1 ').trim();
  this.value = fmt;

  const disp = trimmed.padEnd(16,'•');
  document.getElementById('cp-num').textContent = brand === 'amex'
    ? [disp.slice(0,4), disp.slice(4,10), disp.slice(10,15)].join(' ')
    : [disp.slice(0,4), disp.slice(4,8), disp.slice(8,12), disp.slice(12,16)].join(' ');

  ['visa','mastercard','amex'].forEach(b => document.getElementById('logo-'+b)?.classList.toggle('active', b===brand));
});

document.getElementById('expiry').addEventListener('input', function() {
  let v = this.value.replace(/\D/g,'').slice(0,4);
  if (v.length >= 2) v = v.slice(0,2) + '/' + v.slice(2);
  this.value = v;
  document.getElementById('cp-exp').textContent = v || 'MM/AA';
});

document.getElementById('cvc').addEventListener('input', function() {
  this.value = this.value.replace(/\D/g,'').slice(0,4);
});

document.getElementById('cardholder').addEventListener('input', function() {
  document.getElementById('cp-name').textContent = this.value.toUpperCase() || 'NOM DU TITULAIRE';
});

/* ═══════════════════════════════════════════════════════════════════════
   ALGORITHME DE LUHN
══════════════════════════════════════════════════════════════════════════ */
function luhn(num) {
  const d = num.replace(/\D/g,'');
  if (!d.length) return false;
  let sum = 0;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = parseInt(d[i]);
    if ((d.length - 1 - i) % 2 === 1) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
  }
  return sum % 10 === 0;
}

function validateExpiry(v) {
  if (!v || v.length !== 5) return false;
  const [mm, yy] = v.split('/');
  const month = parseInt(mm), year = 2000 + parseInt(yy);
  if (month < 1 || month > 12) return false;
  return new Date(year, month, 0) >= new Date();
}

function payMarkErr(id, msg) {
  const w = document.getElementById('pf-' + id); if (!w) return;
  w.classList.add('error'); w.classList.remove('valid');
  const e = w.querySelector('.perr'); if (e && msg) e.textContent = msg;
}
function payMarkOk(id) {
  const w = document.getElementById('pf-' + id); if (!w) return;
  w.classList.remove('error'); w.classList.add('valid');
}

document.getElementById('cardnum').addEventListener('blur', function() {
  luhn(this.value) ? payMarkOk('cardnum') : payMarkErr('cardnum', 'Numéro de carte invalide (Luhn).');
});
document.getElementById('expiry').addEventListener('blur', function() {
  validateExpiry(this.value) ? payMarkOk('expiry') : payMarkErr('expiry', 'Date expirée ou invalide.');
});
document.getElementById('cvc').addEventListener('blur', function() {
  /^\d{3,4}$/.test(this.value) ? payMarkOk('cvc') : payMarkErr('cvc', 'CVC invalide (3 ou 4 chiffres).');
});
document.getElementById('cardholder').addEventListener('blur', function() {
  this.value.trim().length >= 2 ? payMarkOk('cardholder') : payMarkErr('cardholder', 'Nom du titulaire requis.');
});

/* ═══════════════════════════════════════════════════════════════════════
   PAYMENT FLOW
══════════════════════════════════════════════════════════════════════════ */
function initPayment() {
  const consentEl = document.getElementById('pay-consent');
  const consentBox = document.getElementById('pay-consent-box');
  if (!consentEl.checked) {
    consentBox.classList.add('error-state');
    consentBox.scrollIntoView({ behavior:'smooth', block:'center' });
    consentEl.focus();
    return;
  }
  consentBox.classList.remove('error-state');

  const cardnum    = document.getElementById('cardnum').value;
  const cardholder = document.getElementById('cardholder').value;
  const expiry     = document.getElementById('expiry').value;
  const cvc        = document.getElementById('cvc').value;

  let ok = true;
  if (!luhn(cardnum))             { payMarkErr('cardnum',    'Numéro invalide (Luhn).'); ok = false; }
  else                              payMarkOk('cardnum');
  if (cardholder.trim().length < 2){ payMarkErr('cardholder','Nom du titulaire requis.');ok = false; }
  else                              payMarkOk('cardholder');
  if (!validateExpiry(expiry))    { payMarkErr('expiry',     'Date expirée ou invalide.');ok = false; }
  else                              payMarkOk('expiry');
  if (!/^\d{3,4}$/.test(cvc))     { payMarkErr('cvc',        'CVC invalide.'); ok = false; }
  else                              payMarkOk('cvc');
  if (!ok) return;

  const btn = document.getElementById('btn-pay');
  btn.disabled = true;
  document.getElementById('btn-pay-label').textContent = 'Traitement en cours…';

  setTimeout(() => launch3DS(), 1200);
}

function launch3DS() {
  const overlay = document.getElementById('ds-overlay');
  const bar     = document.getElementById('ds-bar');
  const msg     = document.getElementById('ds-msg');
  overlay.classList.add('show');

  const msgs = [
    'Connexion au réseau bancaire…',
    'Tokenisation de la carte (PCI-DSS)…',
    'Vérification de l\'identité 3D Secure 2.0…',
    'Authentification biométrique…',
    'Autorisation de la transaction…',
    'Confirmation du paiement…',
  ];

  let p = 0, last = -1;
  const tick = setInterval(() => {
    p += Math.random() * 14 + 5;
    if (p > 100) p = 100;
    bar.style.width = p + '%';
    const idx = Math.min(Math.floor(p / 100 * msgs.length), msgs.length - 1);
    if (idx !== last) {
      last = idx;
      msg.style.opacity = '0';
      setTimeout(() => { msg.textContent = msgs[idx]; msg.style.transition = 'opacity .3s'; msg.style.opacity = '1'; }, 80);
    }
    if (p >= 100) {
      clearInterval(tick);
      setTimeout(() => { overlay.classList.remove('show'); showConfirmation(); }, 600);
    }
  }, 200);
}

/* ═══════════════════════════════════════════════════════════════════════
   CONFIRMATION
══════════════════════════════════════════════════════════════════════════ */
function showConfirmation() {
  const ref = 'PREF-' + new Date().getFullYear() + '-' + Math.random().toString(36).slice(2,10).toUpperCase();
  document.getElementById('ref-num').textContent = ref;

  const t       = calcTax();
  const marque  = document.getElementById('marque').value;
  const modele  = document.getElementById('modele').value;
  const immat   = document.getElementById('immatriculation').value;
  const nom     = document.getElementById('nom').value;
  const prenom  = document.getElementById('prenoms').value;
  const email   = document.getElementById('email').value;
  const dc      = document.getElementById('datecirculation').value;
  const regionNom = t.region ? t.region.nom : '—';
  const totalStr  = t.total.toFixed(2).replace('.',',') + ' €';

  const ePrenom = escHTML(prenom), eNom = escHTML(nom), eEmail = escHTML(email);
  const eMarque = escHTML(marque), eModele = escHTML(modele), eImmat = escHTML(immat);
  const eRegion = escHTML(regionNom), eRef = escHTML(ref);
  const eDateCirc = dc ? escHTML(new Date(dc).toLocaleDateString('fr-FR')) : '—';
  const eDate = escHTML(new Date().toLocaleDateString('fr-FR'));
  const eTotal = escHTML(totalStr);

  const receiptHTML = `
    <div class="receipt-row"><span>Titulaire</span><strong>${ePrenom} ${eNom}</strong></div>
    <div class="receipt-row"><span>E-mail</span><strong>${eEmail}</strong></div>
    <div class="receipt-row"><span>Véhicule</span><strong>${eMarque} ${eModele} — ${eImmat}</strong></div>
    <div class="receipt-row"><span>1ère circulation</span><strong>${eDateCirc}</strong></div>
    <div class="receipt-row"><span>Région</span><strong>${eRegion}</strong></div>
    <div class="receipt-row"><span>Y1 — Taxe régionale${t.isElec?' (exonéré)':t.isOld?' (−50%)':''}</span><strong>${escHTML(t.Y1.toFixed(2).replace('.',','))} €</strong></div>
    <div class="receipt-row"><span>Y4 — Redevance de gestion</span><strong>11,00 €</strong></div>
    <div class="receipt-row"><span>Y5 — Redevance ANTS</span><strong>2,76 €</strong></div>
    <div class="receipt-row total"><span>Total payé</span><span>${eTotal}</span></div>
    <div style="font-size:11px;color:var(--muted);margin-top:8px">Réf. dossier : <strong>${eRef}</strong> · Date : ${eDate}</div>
  `;
  document.getElementById('receipt-summary').innerHTML = receiptHTML;

  document.getElementById('print-receipt').innerHTML = `
    <h1 style="font-family:'Inter',sans-serif;color:#1e293b">Récapitulatif de Demande de Carte Grise</h1>
    <p style="color:#6B7280;margin-bottom:4px">Référence : <strong>${eRef}</strong> · Émis le ${eDate}</p>
    <table><thead><tr><th>Désignation</th><th>Détail</th></tr></thead><tbody>
      <tr><td>Titulaire</td><td>${ePrenom} ${eNom}</td></tr>
      <tr><td>E-mail</td><td>${eEmail}</td></tr>
      <tr><td>Véhicule</td><td>${eMarque} ${eModele}</td></tr>
      <tr><td>Immatriculation</td><td>${eImmat}</td></tr>
      <tr><td>1ère mise en circulation</td><td>${eDateCirc}</td></tr>
      <tr><td>Région</td><td>${eRegion}</td></tr>
      <tr><td>Y1 — Taxe régionale</td><td>${escHTML(t.Y1.toFixed(2).replace('.',','))} €${t.isElec?' (exonéré)':t.isOld?' (réduction 50%)':''}</td></tr>
      <tr><td>Y4 — Redevance gestion</td><td>11,00 €</td></tr>
      <tr><td>Y5 — Redevance ANTS</td><td>2,76 €</td></tr>
    </tbody><tfoot><tr class="total-row"><td><strong>Total payé</strong></td><td><strong>${eTotal}</strong></td></tr></tfoot></table>
    <p style="margin-top:24px;font-size:12px;color:#64748b">Document émis par PreFect Services — Service Privé d'Immatriculation. Conservez ce document. Conformément au RGPD, vos données personnelles sont traitées de façon sécurisée et confidentielle.</p>
  `;

  document.getElementById('step-5').classList.remove('active');
  document.getElementById('si-5')?.classList.add('completed');
  const sc5 = document.getElementById('sc-5');
  if (sc5) sc5.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
  document.getElementById('step-confirm').classList.add('active');
  document.getElementById('progress-fill').style.width = '100%';
  currentStep = 6;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function printReceipt() { window.print(); }

/* ═══════════════════════════════════════════════════════════════════════
   MODAL MANAGEMENT
══════════════════════════════════════════════════════════════════════════ */
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    const first = el.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
    if (first) first.focus();
  }, 50);
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['modal-privacy','modal-legal'].forEach(closeModal);
  }
});

document.getElementById('pay-consent').addEventListener('change', function() {
  if (this.checked) document.getElementById('pay-consent-box').classList.remove('error-state');
});

/* ═══════════════════════════════════════════════════════════════════════
   EVENT WIRING — Remplacement de tous les handlers inline
   CSP: 'unsafe-inline' supprimé de script-src grâce à ce fichier externe
══════════════════════════════════════════════════════════════════════════ */
// Navigation
document.getElementById('btn-step1-next').addEventListener('click', () => goTo(2));
document.getElementById('btn-step2-prev').addEventListener('click', () => goTo(1));
document.getElementById('btn-step2-next').addEventListener('click', () => goTo(3));
document.getElementById('btn-step3-prev').addEventListener('click', () => goTo(2));
document.getElementById('btn-step3-next').addEventListener('click', () => encryptThenGoTo4());
document.getElementById('btn-step4-prev').addEventListener('click', () => goTo(3));
document.getElementById('btn-step4-next').addEventListener('click', () => goTo(5));
document.getElementById('btn-step5-prev').addEventListener('click', () => goTo(4));
document.getElementById('btn-print').addEventListener('click',      () => printReceipt());
document.getElementById('btn-pay').addEventListener('click',        () => initPayment());

// Tax preview
['datecirculation', 'region', 'carburant'].forEach(id => {
  document.getElementById(id).addEventListener('change', refreshTaxPreview);
});
document.getElementById('cv').addEventListener('change', refreshTaxPreview);
document.getElementById('cv').addEventListener('input',  refreshTaxPreview);

// File uploads
['identite','domicile','cerfa1','cession','ct','assurance','permis'].forEach(doc => {
  const input = document.getElementById('file-' + doc);
  if (input) input.addEventListener('change', () => onFile(input, 'doc-' + doc, 'desc-' + doc));
});

// Modal triggers
document.getElementById('link-privacy-pay').addEventListener('click',    () => openModal('modal-privacy'));
document.getElementById('link-footer-privacy').addEventListener('click', () => openModal('modal-privacy'));
document.getElementById('link-footer-legal').addEventListener('click',   () => openModal('modal-legal'));
document.getElementById('link-footer-rgpd').addEventListener('click',    () => openModal('modal-privacy'));

// Modal close buttons (data-modal attribute)
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.modal));
});

// Modal backdrop clicks
document.getElementById('modal-privacy').addEventListener('click', e => closeModalOutside(e, 'modal-privacy'));
document.getElementById('modal-legal').addEventListener('click',   e => closeModalOutside(e, 'modal-legal'));
