'use strict';

// ============================================================
// CONSTANTS
// ============================================================
const C = {
    TICK_MS:          500,
    MINS_PER_TICK:    1,

    MAP_CENTER:       [37.5, 128.5],
    MAP_ZOOM:         6,
    START_HOUR:       6 * 60,  // 0600Z

    // Sonar ranges (km, nominal ideal conditions)
    RANGE_ACTIVE_DDG: 22,
    RANGE_PASS_DDG:   18,
    RANGE_TOWED_DDG:  65,
    RANGE_ACTIVE_FF:  16,
    RANGE_PASS_FF:    12,
    RANGE_TOWED_FF:   45,
    RANGE_BUOY:       28,
    RANGE_DIP_ACT:    12,
    RANGE_DIP_PASS:   8,
    RANGE_MAD:        0.6,

    THERMOCLINE_M:    150,
    XLAY_MULT:        0.52,
    NOISE_SLOW:       0.42,
    NOISE_MID:        0.72,
    NOISE_FAST:       1.0,
    CAVITATION_KT:    12,

    PING_INT_DDG:     12,
    PING_INT_FF:      12,
    PING_INT_HELO:    8,

    CONF_POSSIBLE:    0.28,
    CONF_PROBABLE:    0.60,
    CONF_CONFIRMED:   0.86,

    GAIN_ACTIVE:      0.22,
    GAIN_PASSIVE:     0.08,
    GAIN_BUOY:        0.11,
    GAIN_MAD:         0.40,
    DECAY_PER_TICK:   0.013,

    TORP_RANGE_KM:    18,
    ASROC_RANGE_KM:   22,
    BUOY_LIFE_MINS:   90,
    BUOY_DEPLOY_MINS: 2,

    SAT_PASS_INT:     45,
    SAT_ALERT_DELAY:  3,

    DEPART_MIN:       20,
    DEPART_MAX:       200,
    DEPART_COUNT:     { ALERT: 1, ELEVATED: 2 },

    TIME_LIMIT:       720,
    SHIP_MAX:         30,
    ESCAPE_SOUTH_LAT: 33.5,
    ESCAPE_WEST_LON:  123.0,
};

// ============================================================
// NORTH KOREAN BASE DEFINITIONS (open-source coordinates)
// ============================================================
const BASE_DEFS = [
    {
        id: 'SINPO', name: 'Sinpo South Shipyard',
        lat: 40.017, lon: 128.202, coast: 'EAST',
        note: 'Primary SSBN facility — submarine construction & refit',
        subClasses: ['SINPO', 'ROMEO', 'ROMEO', 'SANGO'],
    },
    {
        id: 'MAYANG', name: 'Mayang-do Naval Base',
        lat: 40.148, lon: 128.374, coast: 'EAST',
        note: 'East Fleet submarine flotilla headquarters',
        subClasses: ['ROMEO', 'ROMEO', 'SANGO'],
    },
    {
        id: 'CHAAHO', name: 'Cha-ho Submarine Base',
        lat: 39.512, lon: 127.618, coast: 'EAST',
        note: 'East coast coastal patrol submarine base',
        subClasses: ['SANGO', 'SANGO', 'YONO'],
    },
    {
        id: 'NAMPO', name: 'Nampo West Fleet Base',
        lat: 38.724, lon: 125.386, coast: 'WEST',
        note: 'Yellow Sea submarine flotilla — covers western approaches',
        subClasses: ['ROMEO', 'ROMEO', 'SANGO', 'SANGO', 'YONO'],
    },
];

// ============================================================
// SUBMARINE CLASS PROFILES
// ============================================================
const SUB_CLASS = {
    SINPO: { label: 'Sinpo-class SSBN', len: 67, spdSurf: 10, spdDiv: 10, maxDepth: 200, sig: 0.85, icon: '◉' },
    ROMEO: { label: 'Romeo-class SSK',  len: 76, spdSurf: 13, spdDiv: 9,  maxDepth: 270, sig: 1.0,  icon: '◎' },
    SANGO: { label: 'Sang-O-class SSC', len: 35, spdSurf: 7,  spdDiv: 4,  maxDepth: 100, sig: 0.55, icon: '○' },
    YONO:  { label: 'Yono-class SSM',   len: 20, spdSurf: 8,  spdDiv: 4,  maxDepth: 50,  sig: 0.30, icon: '·' },
};

// Sub width in pixels for satellite canvas (canvas ≈ 600m wide)
const SUB_PX = { SINPO: 28, ROMEO: 32, SANGO: 14, YONO: 9 };

// ============================================================
// ROK/US ASSET TYPE PROFILES
// ============================================================
const ASSET_TYPE = {
    DDG: {
        label: 'KDX-III Aegis DDG',
        icon: '◇', color: '#3aaa3a',
        maxSpd: 30, turnRate: 3, isAircraft: false,
        sensors: { hull_act: C.RANGE_ACTIVE_DDG, hull_pass: C.RANGE_PASS_DDG, towed: C.RANGE_TOWED_DDG },
        initMuns: { mk54: 4, asroc: 6, sonobuoys: 12 },
        pingInt: C.PING_INT_DDG,
    },
    FF: {
        label: 'Incheon-class FF',
        icon: '◈', color: '#44aa66',
        maxSpd: 30, turnRate: 4, isAircraft: false,
        sensors: { hull_act: C.RANGE_ACTIVE_FF, hull_pass: C.RANGE_PASS_FF, towed: C.RANGE_TOWED_FF },
        initMuns: { mk54: 2, asroc: 4, sonobuoys: 8 },
        pingInt: C.PING_INT_FF,
    },
    MPA: {
        label: 'P-3C Orion MPA',
        icon: '△', color: '#4488cc',
        maxSpd: 350, turnRate: 8, isAircraft: true,
        sensors: { buoy_act: C.RANGE_BUOY, buoy_pass: C.RANGE_BUOY, mad: C.RANGE_MAD },
        initMuns: { mk54: 4, sonobuoys: 60 },
        pingInt: 0,
    },
    HELO: {
        label: 'AW-159 Wildcat HELO',
        icon: '✦', color: '#88aaff',
        maxSpd: 130, turnRate: 15, isAircraft: true,
        sensors: { dip_act: C.RANGE_DIP_ACT, dip_pass: C.RANGE_DIP_PASS, mad: C.RANGE_MAD },
        initMuns: { mk54: 2, sonobuoys: 12 },
        pingInt: C.PING_INT_HELO,
    },
};

// ============================================================
// MISSION LEVEL DEFINITIONS
// ============================================================
const MISSION_DEFS = {
    ALERT: {
        assets: [
            { type: 'DDG',  id: 'DDG-991', name: 'SEJONG THE GREAT', lat: 35.12, lon: 129.08 },
            { type: 'DDG',  id: 'DDG-992', name: 'YULGOK YI I',      lat: 37.52, lon: 129.15 },
            { type: 'FF',   id: 'FF-811',  name: 'INCHEON',          lat: 35.10, lon: 128.70 },
            { type: 'MPA',  id: 'MPA-01',  name: 'P-3C ALPHA',       lat: 35.10, lon: 128.93 },
            { type: 'HELO', id: 'HLO-01',  name: 'WILDCAT 1',        lat: 35.12, lon: 129.08 },
        ],
    },
    ELEVATED: {
        assets: [
            { type: 'DDG',  id: 'DDG-991', name: 'SEJONG THE GREAT', lat: 35.12, lon: 129.08 },
            { type: 'DDG',  id: 'DDG-992', name: 'YULGOK YI I',      lat: 37.52, lon: 129.15 },
            { type: 'DDG',  id: 'DDG-993', name: 'SEO AE SHIM',      lat: 37.00, lon: 126.82 },
            { type: 'FF',   id: 'FF-811',  name: 'INCHEON',          lat: 35.10, lon: 128.70 },
            { type: 'FF',   id: 'FF-812',  name: 'GYEONGGI',         lat: 36.40, lon: 126.70 },
            { type: 'MPA',  id: 'MPA-01',  name: 'P-3C ALPHA',       lat: 35.10, lon: 128.93 },
            { type: 'MPA',  id: 'MPA-02',  name: 'P-8A BRAVO',       lat: 35.10, lon: 128.93 },
            { type: 'HELO', id: 'HLO-01',  name: 'WILDCAT 1',        lat: 35.12, lon: 129.08 },
            { type: 'HELO', id: 'HLO-02',  name: 'WILDCAT 2',        lat: 37.52, lon: 129.15 },
        ],
    },
};

// ============================================================
// UTILITIES
// ============================================================
function haverKm(lat1, lon1, lat2, lon2) {
    const R = 6371, r = Math.PI / 180;
    const dLat = (lat2 - lat1) * r;
    const dLon = (lon2 - lon1) * r;
    const a = Math.sin(dLat/2)**2 +
              Math.cos(lat1*r) * Math.cos(lat2*r) * Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function bearing(lat1, lon1, lat2, lon2) {
    const r = Math.PI / 180;
    const dLon = (lon2 - lon1) * r;
    const y = Math.sin(dLon) * Math.cos(lat2 * r);
    const x = Math.cos(lat1*r) * Math.sin(lat2*r) -
               Math.sin(lat1*r) * Math.cos(lat2*r) * Math.cos(dLon);
    return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}
function project(lat, lon, hdgDeg, distKm) {
    const R = 6371;
    const d = distKm / R;
    const h = hdgDeg * Math.PI / 180;
    const la = lat * Math.PI / 180;
    const lo = lon * Math.PI / 180;
    const la2 = Math.asin(Math.sin(la)*Math.cos(d) + Math.cos(la)*Math.sin(d)*Math.cos(h));
    const lo2 = lo + Math.atan2(Math.sin(h)*Math.sin(d)*Math.cos(la), Math.cos(d)-Math.sin(la)*Math.sin(la2));
    return [la2*180/Math.PI, lo2*180/Math.PI];
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function rand(a, b)        { return Math.random() * (b - a) + a; }
function randInt(a, b)     { return Math.floor(rand(a, b + 1)); }
function fmtTime(m) {
    const h = Math.floor(m / 60) % 24, mn = m % 60;
    return `${String(h).padStart(2,'0')}${String(mn).padStart(2,'0')}Z`;
}
function pad3(n) { return String(Math.round(((n % 360) + 360) % 360)).padStart(3, '0'); }

// ============================================================
// PHYSICS
// ============================================================
const Physics = {
    conditions(srcDepth, tgtDepth, tgtSpd) {
        const cross = (srcDepth < C.THERMOCLINE_M) !== (tgtDepth < C.THERMOCLINE_M);
        const lay   = cross ? C.XLAY_MULT : 1.0;
        const noise = tgtSpd > C.CAVITATION_KT ? C.NOISE_FAST :
                      tgtSpd > 5               ? C.NOISE_MID  : C.NOISE_SLOW;
        return lay * noise;
    },
    detectProb(dist, effRange) {
        if (dist > effRange * 1.12) return 0;
        const t = 1 - (dist / (effRange * 0.92));
        return clamp(t * t * 0.96, 0, 0.96);
    },
    bearingErr(dist, effRange) {
        return Math.min(20, (dist / effRange) * 18);
    },
    rangeErr(dist) {
        return dist * rand(-0.10, 0.10);
    },
};

// ============================================================
// SATELLITE VIEW RENDERER
// ============================================================
const SatView = {
    // Per-base pier layout definitions
    layouts: {
        SINPO: {
            piers: [
                { x: 30, y: 88, w: 190, h: 22 },
                { x: 30, y: 128, w: 150, h: 18 },
            ],
            berths: [
                { x: 55,  y: 74, pier: 0 },
                { x: 98,  y: 74, pier: 0 },
                { x: 141, y: 74, pier: 0 },
                { x: 184, y: 74, pier: 0 },
            ],
        },
        MAYANG: {
            piers: [
                { x: 40, y: 100, w: 200, h: 20 },
            ],
            berths: [
                { x: 72,  y: 86, pier: 0 },
                { x: 125, y: 86, pier: 0 },
                { x: 178, y: 86, pier: 0 },
            ],
        },
        CHAAHO: {
            piers: [
                { x: 50, y: 105, w: 170, h: 18 },
            ],
            berths: [
                { x: 80,  y: 92, pier: 0 },
                { x: 130, y: 92, pier: 0 },
                { x: 180, y: 92, pier: 0 },
            ],
        },
        NAMPO: {
            piers: [
                { x: 25, y: 75,  w: 220, h: 20 },
                { x: 25, y: 115, w: 200, h: 18 },
                { x: 25, y: 152, w: 160, h: 16 },
            ],
            berths: [
                { x: 55,  y: 62, pier: 0 },
                { x: 105, y: 62, pier: 0 },
                { x: 155, y: 62, pier: 0 },
                { x: 55,  y: 101, pier: 1 },
                { x: 130, y: 101, pier: 1 },
            ],
        },
    },

    draw(base, lastPassTime, canvas) {
        const cv  = canvas || document.getElementById('sat-canvas');
        const ctx = cv.getContext('2d');
        const W = cv.width, H = cv.height;

        // Background: dark water
        ctx.fillStyle = '#020b14';
        ctx.fillRect(0, 0, W, H);

        // Grain noise
        const imgData = ctx.getImageData(0, 0, W, H);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
            const n = randInt(0, 6);
            d[i] += n; d[i+1] += n; d[i+2] += Math.floor(n * 1.5);
        }
        ctx.putImageData(imgData, 0, 0);

        // Coastline/land mass — rough shape in top/right area
        ctx.fillStyle = '#14200c';
        ctx.beginPath();
        ctx.moveTo(W * 0.6, 0);
        ctx.lineTo(W, 0);
        ctx.lineTo(W, H * 0.75);
        ctx.quadraticCurveTo(W * 0.85, H * 0.6, W * 0.6, H * 0.4);
        ctx.quadraticCurveTo(W * 0.55, H * 0.1, W * 0.6, 0);
        ctx.fill();
        // Some terrain variation
        ctx.fillStyle = '#162210';
        ctx.beginPath();
        ctx.moveTo(W * 0.65, 0); ctx.lineTo(W, 0); ctx.lineTo(W, H * 0.5);
        ctx.quadraticCurveTo(W * 0.85, H * 0.35, W * 0.65, 0);
        ctx.fill();

        const layout = this.layouts[base.id] || this.layouts['MAYANG'];

        // Draw piers
        for (const p of layout.piers) {
            ctx.fillStyle = '#424242';
            ctx.fillRect(p.x, p.y, p.w, p.h);
            // Pier edge highlight
            ctx.strokeStyle = '#585858';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(p.x, p.y, p.w, p.h);
            // Pier face (water edge)
            ctx.strokeStyle = '#6a6a6a';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.w, p.y);
            ctx.stroke();
        }

        // Shore connection
        ctx.fillStyle = '#353535';
        ctx.fillRect(layout.piers[0].x + layout.piers[0].w - 10, 0,
                     W - layout.piers[0].x - layout.piers[0].w + 10, H);

        // Access roads
        ctx.strokeStyle = '#4a4a30';
        ctx.lineWidth = 3;
        for (const p of layout.piers) {
            ctx.beginPath();
            ctx.moveTo(p.x + p.w - 5, p.y + p.h / 2);
            ctx.lineTo(W, p.y + p.h / 2);
            ctx.stroke();
        }

        // Draw subs at berths
        base.subs.forEach((sub, idx) => {
            const berth = layout.berths[idx];
            if (!berth) return;
            if (sub.state === 'IN_PORT') {
                this._drawSub(ctx, berth.x, berth.y, sub.cls);
                // Berth number
                ctx.fillStyle = 'rgba(140,180,255,0.7)';
                ctx.font = '6px Courier New';
                ctx.textAlign = 'center';
                ctx.fillText(sub.id.split('-')[1], berth.x, berth.y + 16);
            } else {
                // Empty berth — mooring lines
                ctx.strokeStyle = 'rgba(100,100,80,0.5)';
                ctx.lineWidth = 0.5;
                ctx.setLineDash([2, 3]);
                const pw = SUB_PX[sub.cls] / 2 + 4;
                ctx.strokeRect(berth.x - pw, berth.y - 4, pw * 2, 8);
                ctx.setLineDash([]);
                // "EMPTY" marker
                ctx.fillStyle = 'rgba(200,60,60,0.8)';
                ctx.font = 'bold 6px Courier New';
                ctx.textAlign = 'center';
                ctx.fillText('VACANT', berth.x, berth.y + 16);
            }
        });

        // Grid overlay
        ctx.strokeStyle = 'rgba(80,130,80,0.08)';
        ctx.lineWidth = 0.5;
        for (let x = 0; x < W; x += 20) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = 0; y < H; y += 20) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }

        // Classification header
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, W, 18);
        ctx.fillStyle = '#cc4444';
        ctx.font = 'bold 7px Courier New';
        ctx.textAlign = 'left';
        ctx.fillText('TS//SI//NOFORN', 5, 12);
        ctx.fillStyle = 'rgba(180,200,255,0.7)';
        ctx.textAlign = 'right';
        ctx.fillText(`LAST PASS: ${fmtTime(lastPassTime)}`, W - 5, 12);

        // Base label
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, H - 18, W, 18);
        ctx.fillStyle = '#c8c080';
        ctx.font = '7px Courier New';
        ctx.textAlign = 'left';
        ctx.fillText(base.name.toUpperCase(), 5, H - 6);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#608060';
        ctx.fillText(`${base.lat.toFixed(3)}°N  ${base.lon.toFixed(3)}°E`, W - 5, H - 6);
    },

    _drawSub(ctx, cx, cy, cls) {
        const w  = SUB_PX[cls] || 14;
        const h  = cls === 'YONO' ? 4 : cls === 'SANGO' ? 5 : 7;
        const r  = w / 2;

        ctx.save();
        ctx.translate(cx, cy);

        // Hull shadow
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.beginPath();
        ctx.ellipse(1, 1, r, h / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hull body
        ctx.fillStyle = '#1c1c2c';
        ctx.strokeStyle = '#3a3a50';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, r, h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Specular highlight (top reflection of hull)
        const grad = ctx.createLinearGradient(-r, -h/2, -r, 0);
        grad.addColorStop(0, 'rgba(100,100,130,0.4)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, -h/6, r * 0.85, h / 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sail / conning tower (not on YONO midgets)
        if (cls !== 'YONO') {
            const sailW = cls === 'ROMEO' ? 6 : 5;
            const sailH = 3;
            ctx.fillStyle = '#141420';
            ctx.fillRect(-sailW / 2, -h / 2 - sailH, sailW, sailH);
            ctx.strokeStyle = '#303048';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(-sailW / 2, -h / 2 - sailH, sailW, sailH);
        }

        ctx.restore();
    },
};

// ============================================================
// UI — TAB AND SIDEBAR MANAGEMENT
// ============================================================
const UI = {
    currentTab:  'assets',
    selectedBaseId: null,
    pendingPatrol:  [],

    switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${tab}`));
        this.currentTab = tab;
    },

    selectSatBase(baseId) {
        if (!baseId || !Game.s) return;
        this.selectedBaseId = baseId;
        const base = Game.s.bases.find(b => b.id === baseId);
        if (!base) return;
        const passTime = Game.s.lastSatPass[baseId] ?? Game.s.mins;
        SatView.draw(base, passTime);
        this._renderSatManifest(base);
        document.getElementById('sat-pass-time').textContent =
            `PASS: ${fmtTime(passTime)}`;
    },

    _renderSatManifest(base) {
        const el = document.getElementById('sat-manifest');
        el.innerHTML = base.subs.map(sub => {
            const cls = SUB_CLASS[sub.cls];
            const statLabel = sub.state === 'IN_PORT' ? 'IN BERTH' : 'DEPARTED';
            const statCls   = sub.state === 'IN_PORT' ? 'stat-inport' : 'stat-departed';
            return `<div class="sat-manifest-entry">
                <span class="sat-vessel-id">${sub.id}</span>
                <span class="sat-vessel-cls">${cls.label}</span>
                <span class="sat-vessel-stat ${statCls}">${statLabel}</span>
            </div>`;
        }).join('');
    },

    updateAssets() {
        if (!Game.s) return;
        const el = document.getElementById('assets-list');
        el.innerHTML = Game.s.assets.map(a => {
            const tp   = ASSET_TYPE[a.type];
            const sel  = Game.selectedAsset?.id === a.id;
            const stat = a.routine ? 'status-searching' :
                         (a.wpLat !== null ? 'status-transiting' : 'status-idle');
            const statLabel = a.routine ? 'PATROL' :
                              (a.wpLat !== null ? 'TRANSIT' : 'IDLE');
            const muns = Object.entries(a.munitions)
                .map(([k, v]) => `<span class="mun-chip ${v === 0 ? 'depleted' : ''}">${k.toUpperCase()} ×${v}</span>`)
                .join('');
            return `<div class="asset-card ${sel ? 'selected' : ''}" onclick="Game.selectAsset('${a.id}')">
                <div style="display:flex;align-items:center;justify-content:space-between">
                    <span class="asset-id">${a.id}</span>
                    <span class="asset-status ${stat}">${statLabel}</span>
                </div>
                <div class="asset-name">${tp.icon} ${a.name}</div>
                <div class="asset-type">${tp.label}</div>
                <div class="asset-dat">
                    SPD ${Math.round(a.spd)}kt  HDG ${pad3(a.hdg)}°
                    ${a.activeSonar ? ' · <span style="color:#f0b830">AS:ON</span>' : ''}
                </div>
                <div class="munitions-strip">${muns}</div>
            </div>`;
        }).join('');

        // Also update wf label
        const sel = Game.selectedAsset;
        document.getElementById('wf-label').textContent =
            sel ? `${sel.id} / ${ASSET_TYPE[sel.type].label}` : 'NO SENSOR';
    },

    updateContacts() {
        if (!Game.s) return;
        const { contacts } = Game.s;
        const el = document.getElementById('contacts-list');
        if (!contacts.length) {
            el.innerHTML = '<div class="dim-text">NO CONTACTS</div>';
            document.getElementById('track-count').textContent = '0';
            return;
        }
        document.getElementById('track-count').textContent = contacts.length;
        el.innerHTML = contacts.map(ct => {
            const cls   = Game._classify(ct.conf);
            const pct   = Math.round(ct.conf * 100);
            const clsLo = cls.toLowerCase();
            const distStr = ct.estLat ?
                `${Math.round(haverKm(Game.s.assets[0]?.lat ?? 36, Game.s.assets[0]?.lon ?? 129, ct.estLat, ct.estLon))}km` : '---';
            const subHint = ct.subClass ? `<div class="contact-cls">${SUB_CLASS[ct.subClass]?.label ?? '?'}</div>` : '';
            return `<div class="contact-card ${clsLo}" onclick="Game.targetContact('${ct.id}')">
                <div class="contact-id">${ct.id} — ${cls}</div>
                ${subHint}
                <div class="contact-dat">BRG ${pad3(ct.brg)}°  EST RNG ${distStr}</div>
                <div class="contact-con">CONF ${pct}%</div>
                <div class="conf-bar"><div class="conf-fill ${clsLo}" style="width:${pct}%"></div></div>
            </div>`;
        }).join('');
    },

    updateOOB() {
        if (!Game.s) return;
        const el = document.getElementById('dprk-oob');
        el.innerHTML = Game.s.bases.map(base => {
            const subLines = base.subs.map(sub => {
                const st = sub.state === 'IN_PORT' ? 'in-port' :
                           sub.state === 'DEPARTED_ALERT' ? 'departed' : 'unknown';
                const stLabel = sub.state === 'IN_PORT' ? '▪ IN PORT' :
                                sub.state === 'DEPARTED_ALERT' ? '▸ DEPARTED' : '? UNKNOWN';
                return `<div class="oob-sub ${st}">${sub.id} ${SUB_CLASS[sub.cls].icon} ${stLabel}</div>`;
            }).join('');
            return `<div class="oob-base">
                <div class="oob-base-name">${base.name}</div>
                <div class="oob-base-note">${base.note}</div>
                ${subLines}
            </div>`;
        }).join('');
    },

    buildCmdBar(asset) {
        const el = document.getElementById('cmd-content');
        if (!asset) {
            el.innerHTML = `<span class="cmd-standby">SELECT AN ASSET TO COMMAND — CLICK MAP TO NAVIGATE</span>`;
            return;
        }
        const tp   = ASSET_TYPE[asset.type];
        const isShip = !tp.isAircraft;
        const muns = asset.munitions;

        const sonarBtn = isShip ? `
            <button class="cmd-btn ${asset.activeSonar ? 'active' : ''}" onclick="Game.toggleActiveSonar('${asset.id}')">
                ACTIVE SONAR<br><span class="cmd-sub">${asset.activeSonar ? 'ON' : 'OFF'}</span>
            </button>` :
            (asset.type === 'HELO' ? `
            <button class="cmd-btn ${asset.dipping ? 'active' : ''}" onclick="Game.toggleDipSonar('${asset.id}')">
                DIP SONAR<br><span class="cmd-sub">${asset.dipping ? 'ACTIVE' : 'RETRACTED'}</span>
            </button>` : '');

        const buoyBtn = muns.sonobuoys > 0 ? `
            <button class="cmd-btn" id="btn-buoy-${asset.id}" onclick="Game.setMode('BUOY','${asset.id}')">
                DROP BUOY<br><span class="cmd-sub">${muns.sonobuoys} LEFT</span>
            </button>` : `<button class="cmd-btn" disabled>DROP BUOY<br><span class="cmd-sub">NONE</span></button>`;

        const torpBtn = (muns.mk54 > 0 || muns.asroc > 0) ? `
            <button class="cmd-btn cmd-danger ${asset._torpReady ? 'ready' : ''}" id="btn-fire-${asset.id}"
                onclick="Game.fireTorpedo('${asset.id}')" ${asset._torpReady ? '' : 'disabled'}>
                ${muns.asroc > 0 && !tp.isAircraft ? 'ASROC' : 'MK54 TORP'}<br>
                <span class="cmd-sub">${muns.asroc > 0 && !tp.isAircraft ? muns.asroc : muns.mk54} RDY</span>
            </button>` : '';

        const patrolBtn = `
            <button class="cmd-btn" onclick="Game.startPatrolSet('${asset.id}')">
                SET PATROL<br><span class="cmd-sub">${asset.routine ? 'ACTIVE' : 'NONE'}</span>
            </button>
            ${asset.routine ? `<button class="cmd-btn" onclick="Game.clearRoutine('${asset.id}')">CLR ROUTINE<br><span class="cmd-sub">CANCEL</span></button>` : ''}`;

        const pingCountdown = isShip ?
            `<div class="readout"><div class="readout-label">NEXT PING</div><div class="readout-val" style="font-size:0.72rem">${asset.activeSonar ? Math.max(0, Math.round(asset.pingTimer)) + 'm' : 'PASSIVE'}</div></div>` : '';

        el.innerHTML = `
            <div class="cmd-section" style="flex-shrink:0;min-width:130px">
                <div style="white-space:nowrap">
                    <div style="font-size:0.52rem;color:var(--text-dim);letter-spacing:1.5px">${asset.id}</div>
                    <div style="font-size:0.68rem;color:var(--amber-bright);font-weight:bold;letter-spacing:1px">${asset.name}</div>
                    <div style="font-size:0.52rem;color:var(--text-dim)">${tp.label}</div>
                </div>
            </div>
            <div class="cmd-divider"></div>
            <div class="cmd-section">
                ${sonarBtn}
                ${buoyBtn}
                ${torpBtn}
            </div>
            <div class="cmd-divider"></div>
            <div class="cmd-section">
                <div class="readout">
                    <div class="readout-label">SPEED</div>
                    <div class="readout-val" id="spd-val-${asset.id}">${Math.round(asset.spd)} KT</div>
                </div>
                <button class="cmd-sm" onclick="Game.adjSpeed('${asset.id}', ${isShip ? 4 : 20})">+</button>
                <button class="cmd-sm" onclick="Game.adjSpeed('${asset.id}', ${isShip ? -4 : -20})">−</button>
            </div>
            <div class="cmd-divider"></div>
            <div class="cmd-section">
                ${pingCountdown}
            </div>
            <div class="cmd-divider"></div>
            <div class="cmd-section">
                ${patrolBtn}
            </div>
            <div class="cmd-divider"></div>
            <div class="cmd-section">
                <button class="cmd-sm" onclick="Game.selectAsset(null)">DESELECT</button>
            </div>`;
    },

    showAlertBanner(msg, autoDismissMs) {
        const el = document.getElementById('alert-banner');
        el.innerHTML = `⚠ ${msg}<br><span class="alert-dismiss" onclick="UI.dismissAlert()">CLICK TO DISMISS</span>`;
        el.classList.remove('hidden');
        if (autoDismissMs) setTimeout(() => this.dismissAlert(), autoDismissMs);
        // Switch to intel tab to show OOB
        this.switchTab('intel');
    },

    dismissAlert() {
        document.getElementById('alert-banner').classList.add('hidden');
    },

    _pendingAlertCount: 0,
    addAlert() {
        this._pendingAlertCount++;
        const el = document.getElementById('alert-count');
        el.textContent = this._pendingAlertCount;
        el.className = 'has-alert';
    },
    clearAlerts() {
        this._pendingAlertCount = 0;
        const el = document.getElementById('alert-count');
        el.textContent = '0';
        el.className = 'no-alert';
    },
};

// ============================================================
// GAME OBJECT
// ============================================================
const Game = {
    s:    null,
    map:  null,
    wf:   null,
    loop: null,
    lyr:  {},
    mk:   {},
    selectedAsset: null,
    _mode: 'NAVIGATE',
    _modeAsset: null,
    _patrolPending: [],
    _patrolMks: [],

    // ---- INIT ----
    init() {
        this._initMap();
        this._initWaterfall();
        this._injectStyles();
        document.getElementById('modal-brief').style.display = 'flex';
    },

    _initMap() {
        this.map = L.map('tactical-map', {
            center: C.MAP_CENTER, zoom: C.MAP_ZOOM,
            zoomControl: true, attributionControl: false,
        });
        L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
            { maxZoom: 12 }
        ).addTo(this.map);

        ['tracks','arcs','pings','buoys','contacts','subs','assets','bases']
            .forEach(n => { this.lyr[n] = L.layerGroup().addTo(this.map); });

        this.map.on('click',     e => this._onMapClick(e));
        this.map.on('mousemove', e => {
            document.getElementById('cursor-coords').textContent =
                `${e.latlng.lat.toFixed(2)}°N  ${e.latlng.lng.toFixed(2)}°E`;
        });
    },

    _initWaterfall() {
        const cv  = document.getElementById('waterfall');
        cv.width  = cv.offsetWidth  || 280;
        cv.height = cv.offsetHeight || 120;
        const ctx = cv.getContext('2d');
        const px  = new Uint8ClampedArray(cv.width * cv.height * 4);
        for (let i = 0; i < px.length; i += 4) {
            const v = randInt(0, 12);
            px[i] = Math.floor(v * 0.78); px[i+1] = Math.floor(v * 0.58);
            px[i+2] = 0; px[i+3] = 255;
        }
        this.wf = { cv, ctx, px };
        this._wfRender();
    },

    _injectStyles() {
        const s = document.createElement('style');
        s.textContent = `
            .ship-mk  { font-size:17px; line-height:1; }
            .sub-mk   { font-size:13px; line-height:1; }
            .wp-mk    { font-size:14px; color:#c8960c; opacity:0.7; line-height:1; }
            .base-mk  { font-size:16px; line-height:1; }
            .patrol-wp-mk { font-size:12px; color:#c8960c; line-height:1; }
            .buoy-lbl { background:transparent!important; border:none!important;
                        box-shadow:none!important; color:#c8960c!important;
                        font-size:0.52rem!important; font-family:'Courier New',monospace!important; }
        `;
        document.head.appendChild(s);
    },

    // ---- START ----
    start(missionLevel) {
        document.getElementById('modal-brief').style.display = 'none';
        const mDef = MISSION_DEFS[missionLevel];

        // Build bases + subs
        const bases = BASE_DEFS.map(bd => {
            const subs = bd.subClasses.map((cls, i) => ({
                id:          `${bd.id[0]}-${String(i + 1).padStart(2, '0')}`,
                baseId:      bd.id,
                cls,
                state:       'IN_PORT',
                lat:         bd.lat + rand(-0.003, 0.003),
                lon:         bd.lon + rand(-0.003, 0.003),
                hdg:         rand(180, 270),
                spd:         0,
                depth:       0,
                goalLat:     bd.coast === 'EAST' ? 33.8 + rand(-0.5, 0.5) : rand(35.5, 37.0),
                goalLon:     bd.coast === 'EAST' ? 129.0 + rand(-1, 1)   : 124.5 + rand(-1, 1),
                alertTimer:  0,
                evadeTimer:  0,
                departTime:  null,
                alertFired:  false,
                detected:    false,
                berthIdx:    i,
            }));
            return { ...bd, subs };
        });

        // Select which subs depart
        const departCount = C.DEPART_COUNT[missionLevel] ?? 1;
        const candidates  = [];
        bases.forEach(b => b.subs.forEach(s => candidates.push(s)));
        // Pick subs weighted to east coast ROMEO/SINPO for drama
        const weighted = candidates.filter(s => s.cls !== 'YONO');
        const pool = weighted.length >= departCount ? weighted : candidates;
        const chosen = pool.sort(() => Math.random() - 0.5).slice(0, departCount);
        chosen.forEach(sub => {
            sub.departTime = C.START_HOUR + randInt(C.DEPART_MIN, C.DEPART_MAX);
        });

        // Build assets
        const assets = mDef.assets.map(ad => ({
            ...ad,
            spd:  0,
            hdg:  0,
            depth: 0,
            wpLat: null, wpLon: null,
            routine: null,
            activeSonar: false,
            dipping: false,
            dipTimer: 0,
            pingTimer: 0,
            munitions: { ...ASSET_TYPE[ad.type].initMuns },
            track: [],
            _torpReady: false,
            status: 'IDLE',
        }));

        this.s = {
            mins: C.START_HOUR,
            running: true,
            missionLevel,
            bases,
            assets,
            contacts:    [],
            buoys:       [],
            cntId:       1,
            alertQueue:  [],
            lastSatPass: {},
            nextSatPass: C.START_HOUR + C.SAT_PASS_INT,
            elapsedWarned: {},
        };

        // Record initial sat pass for all bases
        bases.forEach(b => { this.s.lastSatPass[b.id] = C.START_HOUR; });

        // Populate base selector
        const sel = document.getElementById('sat-base-select');
        sel.innerHTML = '<option value="">-- SELECT BASE --</option>' +
            bases.map(b => `<option value="${b.id}">${b.name}</option>`).join('');

        this._renderBases();
        this._renderAssets();
        UI.updateAssets();
        UI.updateOOB();
        this._updateHeader();
        UI.buildCmdBar(null);

        this._log('Operation commenced. Theatre ASW command is active.', 'sys');
        this._log('Satellite constellation online. DPRK bases under surveillance.', 'sat');
        this._log('Select a ROK/US asset and click the map to navigate.', 'info');
        bases.forEach(b => {
            this._log(`Monitoring: ${b.name} — ${b.subs.length} vessel(s) in port.`, 'sat');
        });

        this.loop = setInterval(() => this._tick(), C.TICK_MS);
    },

    // ---- GAME TICK ----
    _tick() {
        if (!this.s?.running) return;
        const s = this.s;
        s.mins += C.MINS_PER_TICK;

        // Time warnings
        const elapsed = s.mins - C.START_HOUR;
        if (elapsed === 360 && !s.elapsedWarned[360]) {
            s.elapsedWarned[360] = true;
            this._log('WARNING: 6 hours elapsed. Contact(s) may be approaching operational areas.', 'warn');
        }
        if (elapsed === 600 && !s.elapsedWarned[600]) {
            s.elapsedWarned[600] = true;
            this._log('CRITICAL: 10 hours elapsed. Contact(s) nearing strait approaches.', 'alert');
        }

        // Satellite pass
        if (s.mins >= s.nextSatPass) {
            this._satPass();
            s.nextSatPass += C.SAT_PASS_INT;
        }

        // Check departures + fire alerts
        this._checkDepartures();

        // Move all entities
        s.assets.forEach(a => this._moveAsset(a));
        s.bases.forEach(b => b.subs.filter(sub => sub.state !== 'IN_PORT').forEach(sub => this._moveSub(sub)));

        // Sub timers
        s.bases.forEach(b => b.subs.filter(sub => sub.state !== 'IN_PORT').forEach(sub => {
            if (sub.alertTimer > 0) { sub.alertTimer = Math.max(0, sub.alertTimer - C.MINS_PER_TICK); }
            if (sub.evadeTimer > 0) {
                sub.evadeTimer -= C.MINS_PER_TICK;
                if (sub.evadeTimer <= 0) {
                    sub.evadeTimer = 0;
                    sub.spd = SUB_CLASS[sub.cls].spdDiv;
                    sub.depth = 200;
                }
            }
        }));

        // Escape check
        s.bases.forEach(b => b.subs.forEach(sub => {
            if (sub.state === 'IN_PORT') return;
            const base = BASE_DEFS.find(bd => bd.id === sub.baseId);
            if (base?.coast === 'EAST' && sub.lat <= C.ESCAPE_SOUTH_LAT) {
                this._end(false, `CONTACT ESCAPED. ${sub.id} (${SUB_CLASS[sub.cls].label}) successfully transited the Korea Strait.`);
            } else if (base?.coast === 'WEST' && sub.lon <= C.ESCAPE_WEST_LON) {
                this._end(false, `CONTACT ESCAPED. ${sub.id} (${SUB_CLASS[sub.cls].label}) exited Yellow Sea zone of interest.`);
            }
        }));

        // Sonar processing
        this._processAllSensors();
        this._processBuoys();
        this._decayContacts();
        this._updateBuoyTimers();

        // Asset tracks
        s.assets.forEach(a => {
            if (s.mins % 15 === 0) {
                a.track.push([a.lat, a.lon]);
                if (a.track.length > 60) a.track.shift();
            }
        });

        // Waterfall
        this._wfTick();

        // Render
        this._renderSubs();
        this._renderAssets();
        this._renderContacts();
        if (s.mins % 5 === 0) this._renderTracks();

        // UI
        this._updateHeader();
        UI.updateAssets();
        UI.updateContacts();

        if (this.selectedAsset) {
            const a = s.assets.find(a => a.id === this.selectedAsset.id);
            if (a) { this.selectedAsset = a; UI.buildCmdBar(a); }
        }
    },

    // ---- MOVEMENT ----
    _moveAsset(asset) {
        // Routine: patrol loop
        if (asset.routine?.type === 'PATROL' && asset.wpLat === null) {
            const wps = asset.routine.waypoints;
            const next = wps[asset.routine.cwp];
            asset.wpLat = next[0]; asset.wpLon = next[1];
        }

        if (asset.wpLat === null) return;
        const tp     = ASSET_TYPE[asset.type];
        const dist   = haverKm(asset.lat, asset.lon, asset.wpLat, asset.wpLon);
        const kph    = asset.spd * 1.852;
        const maxD   = (kph / 60) * C.MINS_PER_TICK;

        if (dist <= Math.max(maxD, 0.2)) {
            asset.lat = asset.wpLat; asset.lon = asset.wpLon;
            asset.wpLat = null; asset.wpLon = null;
            asset.status = 'IDLE';

            // Advance patrol waypoint
            if (asset.routine?.type === 'PATROL') {
                asset.routine.cwp = (asset.routine.cwp + 1) % asset.routine.waypoints.length;
            }
        } else {
            asset.hdg    = bearing(asset.lat, asset.lon, asset.wpLat, asset.wpLon);
            const [la, lo] = project(asset.lat, asset.lon, asset.hdg, maxD);
            asset.lat    = la; asset.lon = lo;
            asset.status = 'TRANSITING';

            // Ensure cruise speed if unset
            if (asset.spd === 0) asset.spd = tp.isAircraft ? Math.floor(tp.maxSpd * 0.8) : 15;
        }
    },

    _moveSub(sub) {
        const cls = SUB_CLASS[sub.cls];
        if (sub.evadeTimer <= 0) {
            // Drift toward goal
            const g = bearing(sub.lat, sub.lon, sub.goalLat, sub.goalLon);
            const diff = ((sub.hdg - g + 540) % 360) - 180;
            sub.hdg = (sub.hdg - clamp(diff * 0.10, -5, 5) + 360) % 360;
        }
        const maxD = (sub.spd * 1.852 / 60) * C.MINS_PER_TICK;
        const [la, lo] = project(sub.lat, sub.lon, sub.hdg, maxD);
        sub.lat = la; sub.lon = lo;
    },

    // ---- DEPARTURE + ALERTS ----
    _checkDepartures() {
        const s = this.s;
        s.bases.forEach(base => {
            base.subs.forEach(sub => {
                if (sub.state !== 'IN_PORT' || sub.departTime === null) return;
                if (s.mins < sub.departTime) return;

                // Sub departs
                sub.state = 'TRANSITING';
                sub.spd   = SUB_CLASS[sub.cls].spdSurf * 0.8;
                sub.depth = 0;
                this._log(`SIGINT: Vessel activity detected at ${base.name}.`, 'warn');

                // Schedule alert after SAT_ALERT_DELAY game mins
                setTimeout(() => {
                    if (!s.running) return;
                    sub.state = 'DEPARTED_ALERT';
                    const msg = `SATELLITE ALERT — ${sub.id} (${SUB_CLASS[sub.cls].label}) HAS DEPARTED ${base.name.toUpperCase()}`;
                    this._log(msg, 'alert');
                    UI.showAlertBanner(msg, 8000);
                    UI.addAlert();
                    // Refresh sat view if this base is selected
                    if (UI.selectedBaseId === base.id) {
                        s.lastSatPass[base.id] = s.mins;
                        SatView.draw(base, s.mins);
                        UI._renderSatManifest(base);
                    }
                    UI.updateOOB();
                    // SIGINT cue: rough departure bearing
                    const cueBrg = sub.hdg + rand(-25, 25);
                    this._log(`SIGINT: Departure track estimate BRG ${pad3(cueBrg)}° from ${base.id}.`, 'warn');
                    // Place SIGINT marker on map
                    const reach = 40;
                    const bRad  = cueBrg * Math.PI / 180;
                    const eLat  = base.lat + (reach * Math.cos(bRad)) / 111;
                    const eLon  = base.lon + (reach * Math.sin(bRad)) / (111 * Math.cos(base.lat * Math.PI / 180));
                    L.polyline([[base.lat, base.lon], [eLat, eLon]], {
                        color: '#cc4444', weight: 1.2, opacity: 0.5, dashArray: '5,8',
                    }).addTo(this.lyr.arcs);
                }, C.SAT_ALERT_DELAY * C.TICK_MS);
            });
        });
    },

    // ---- SATELLITE PASS ----
    _satPass() {
        const s = this.s;
        this._log('GEOINT: Satellite pass in progress...', 'sat');
        s.bases.forEach(b => {
            s.lastSatPass[b.id] = s.mins;
            if (UI.selectedBaseId === b.id && UI.currentTab === 'sat') {
                SatView.draw(b, s.mins);
                UI._renderSatManifest(b);
            }
        });
    },

    // ---- SONAR PROCESSING ----
    _processAllSensors() {
        const s = this.s;
        const allSubs = s.bases.flatMap(b => b.subs.filter(sub => sub.state !== 'IN_PORT'));

        s.assets.forEach(asset => {
            if (!asset.lat) return;
            allSubs.forEach(sub => {
                this._processAssetSensors(asset, sub);
            });
        });
    },

    _processAssetSensors(asset, sub) {
        const tp   = ASSET_TYPE[asset.type];
        const cond = Physics.conditions(asset.depth, sub.depth, sub.spd) * SUB_CLASS[sub.cls].sig;
        const dist = haverKm(asset.lat, asset.lon, sub.lat, sub.lon);

        // Ship hull sonar (passive)
        if (tp.sensors.hull_pass) {
            const effR = tp.sensors.hull_pass * cond;
            if (dist <= effR * 1.15) {
                const prob = Physics.detectProb(dist, effR);
                if (Math.random() < prob * 0.5) {
                    const brg = bearing(asset.lat, asset.lon, sub.lat, sub.lon);
                    const err = Physics.bearingErr(dist, effR) * (Math.random() - 0.5) * 2;
                    this._addDetection(asset, brg + err, dist, 'PASSIVE', C.GAIN_PASSIVE, null, sub);
                }
            }
        }

        // Towed array (passive, more range)
        if (tp.sensors.towed && asset.spd < 18) {
            const effR = tp.sensors.towed * cond;
            if (dist <= effR * 1.15) {
                const prob = Physics.detectProb(dist, effR);
                if (Math.random() < prob * 0.6) {
                    const brg = bearing(asset.lat, asset.lon, sub.lat, sub.lon);
                    const err = Physics.bearingErr(dist, effR) * (Math.random() - 0.5) * 2;
                    this._addDetection(asset, brg + err, dist, 'TOWED', C.GAIN_PASSIVE * 1.4, null, sub);
                }
            }
        }

        // Active sonar ping
        if (asset.activeSonar && tp.sensors.hull_act) {
            asset.pingTimer -= C.MINS_PER_TICK;
            if (asset.pingTimer <= 0) {
                asset.pingTimer = tp.pingInt;
                this._firePing(asset, sub, tp.sensors.hull_act * cond);
            }
        }

        // Helicopter dipping sonar
        if (asset.dipping && tp.sensors.dip_act) {
            if (asset.dipTimer > 0) {
                asset.dipTimer -= C.MINS_PER_TICK;
            } else {
                const effRP = tp.sensors.dip_pass * cond;
                if (dist <= effRP * 1.15 && Math.random() < Physics.detectProb(dist, effRP) * 0.6) {
                    const brg = bearing(asset.lat, asset.lon, sub.lat, sub.lon);
                    const err = Physics.bearingErr(dist, effRP) * (Math.random() - 0.5) * 2;
                    this._addDetection(asset, brg + err, dist, 'DIP_PASS', C.GAIN_PASSIVE, null, sub);
                }
            }
        }

        // MAD
        if (tp.sensors.mad && dist <= C.RANGE_MAD && sub.depth < 100) {
            this._addDetection(asset, bearing(asset.lat, asset.lon, sub.lat, sub.lon),
                dist, 'MAD', C.GAIN_MAD, { lat: sub.lat, lon: sub.lon }, sub);
            this._log(`${asset.id}: MAD CONTACT — positive anomaly.`, 'alert');
        }
    },

    _firePing(asset, sub, effRange) {
        const dist = haverKm(asset.lat, asset.lon, sub.lat, sub.lon);

        // Animate ring
        const ring = L.circle([asset.lat, asset.lon], {
            radius: 100, color: '#c8960c', weight: 1, fill: false, opacity: 0.8,
        }).addTo(this.lyr.pings);
        let r = 0;
        const maxR = effRange * 1000;
        const anim = setInterval(() => {
            r += maxR / 20;
            ring.setRadius(r);
            ring.setStyle({ opacity: Math.max(0, 0.8 - r / maxR) });
            if (r >= maxR) { clearInterval(anim); this.lyr.pings.removeLayer(ring); }
        }, 80);

        // Alert sub
        sub.alertTimer = Math.max(sub.alertTimer, 120);

        const prob = Physics.detectProb(dist, effRange);
        if (Math.random() < prob) {
            const brg  = bearing(asset.lat, asset.lon, sub.lat, sub.lon);
            const bErr = Physics.bearingErr(dist, effRange) * (Math.random() - 0.5) * 2;
            const rErr = Physics.rangeErr(dist);
            const estLat = asset.lat + ((dist + rErr) * Math.cos((brg + bErr) * Math.PI / 180)) / 111;
            const estLon = asset.lon + ((dist + rErr) * Math.sin((brg + bErr) * Math.PI / 180)) / (111 * Math.cos(asset.lat * Math.PI / 180));
            this._addDetection(asset, brg + bErr, dist + rErr, 'ACTIVE', C.GAIN_ACTIVE, { lat: estLat, lon: estLon }, sub);
            this._log(`${asset.id} ACTIVE: Return BRG ${pad3(brg + bErr)}° RNG ~${Math.round(dist + rErr)}km`, 'alert');

            if (sub.evadeTimer < 40) {
                sub.evadeTimer = rand(80, 160);
                sub.spd   = SUB_CLASS[sub.cls].spdDiv;
                sub.depth = Math.min(C.THERMOCLINE_M + 50, SUB_CLASS[sub.cls].maxDepth);
                sub.hdg   = (bearing(sub.lat, sub.lon, asset.lat, asset.lon) + 180 + rand(-60, 60) + 360) % 360;
                this._log(`CAVITATION — ${sub.id} reacting: dive + sprint.`, 'alert');
            }
        } else {
            this._log(`${asset.id} ACTIVE: No return within ${Math.round(effRange)}km.`, 'info');
        }
    },

    _processBuoys() {
        const s   = this.s;
        const allSubs = s.bases.flatMap(b => b.subs.filter(sub => sub.state !== 'IN_PORT'));
        for (const b of s.buoys) {
            if (!b.active || b.deployTimer > 0) continue;
            allSubs.forEach(sub => {
                const cond  = Physics.conditions(0, sub.depth, sub.spd) * SUB_CLASS[sub.cls].sig;
                const effR  = C.RANGE_BUOY * cond;
                const dist  = haverKm(b.lat, b.lon, sub.lat, sub.lon);
                if (dist > effR * 1.15) return;
                const prob  = Physics.detectProb(dist, effR);
                if (Math.random() < prob * 0.6) {
                    const brg = bearing(b.lat, b.lon, sub.lat, sub.lon);
                    const err = Physics.bearingErr(dist, effR) * (Math.random() - 0.5) * 2;
                    this._addDetection({ id: b.id, lat: b.lat, lon: b.lon }, brg + err, dist, 'BUOY', C.GAIN_BUOY, null, sub);
                    this._drawBuoyLine(b, brg + err);
                    if (!b._lastLog || s.mins - b._lastLog > 10) {
                        this._log(`${b.id}: contact BRG ${pad3(brg + err)}°`, 'warn');
                        b._lastLog = s.mins;
                    }
                }
            });
        }
    },

    _drawBuoyLine(b, brgDeg) {
        if (b._brgLine) this.lyr.buoys.removeLayer(b._brgLine);
        const reach = 70;
        const bRad  = brgDeg * Math.PI / 180;
        const eLat  = b.lat + (reach * Math.cos(bRad)) / 111;
        const eLon  = b.lon + (reach * Math.sin(bRad)) / (111 * Math.cos(b.lat * Math.PI / 180));
        b._brgLine  = L.polyline([[b.lat, b.lon], [eLat, eLon]], {
            color: '#c8960c', weight: 1, opacity: 0.45, dashArray: '4,8',
        }).addTo(this.lyr.buoys);
        setTimeout(() => { if (b._brgLine) this.lyr.buoys.removeLayer(b._brgLine); }, 15000);
    },

    // ---- CONTACT MANAGEMENT ----
    _addDetection(src, brg, range, type, gain, estPos, sub) {
        const { contacts } = this.s;

        // Find existing contact for this sub or create new
        let ct = sub ? contacts.find(c => c.subRef === sub) : contacts[0];
        if (!ct) {
            ct = {
                id:       `Q-${String(this.s.cntId++).padStart(2, '0')}`,
                subRef:   sub || null,
                subClass: sub?.cls || null,
                conf:     0,
                brg, range,
                srcLat: src.lat, srcLon: src.lon,
                estLat: estPos?.lat ?? null,
                estLon: estPos?.lon ?? null,
                lastTime: this.s.mins,
                history:  [],
            };
            contacts.push(ct);
            this._log(`NEW CONTACT ${ct.id} — ${type} BRG ${pad3(brg)}° (${ASSET_TYPE[this._sourceType(type)]?.label ?? 'sensor'})`, 'alert');
        }

        ct.conf    = Math.min(1.0, ct.conf + gain);
        ct.brg     = brg;
        ct.range   = range;
        ct.srcLat  = src.lat; ct.srcLon = src.lon;
        ct.lastTime = this.s.mins;
        if (estPos) { ct.estLat = estPos.lat; ct.estLon = estPos.lon; }

        if (ct.estLat) {
            ct.history.push([ct.estLat, ct.estLon, this.s.mins]);
            if (ct.history.length > 20) ct.history.shift();
        }

        // Waterfall return
        this._wfAddReturn(brg, 180 + ct.conf * 70);

        // Weapons readiness check for selected asset
        if (this.selectedAsset) this._checkWeaponsReady(this.selectedAsset, ct);
    },

    _sourceType(type) {
        if (type === 'PASSIVE' || type === 'TOWED' || type === 'ACTIVE') return null;
        return null;
    },

    _decayContacts() {
        const { contacts, mins } = this.s;
        for (let i = contacts.length - 1; i >= 0; i--) {
            const ct = contacts[i];
            if (mins - ct.lastTime >= 1) ct.conf = Math.max(0, ct.conf - C.DECAY_PER_TICK);
            if (ct.conf <= 0) {
                contacts.splice(i, 1);
                this.lyr.contacts.clearLayers();
                this._log('Contact lost.', 'warn');
            }
        }
    },

    _updateBuoyTimers() {
        for (const b of this.s.buoys) {
            if (b.deployTimer > 0) {
                b.deployTimer -= C.MINS_PER_TICK;
                if (b.deployTimer <= 0) {
                    b.deployTimer = 0;
                    b.active      = true;
                    b.mk?.setStyle({ color: '#c8960c', fillColor: '#c8960c', opacity: 1 });
                    this._log(`${b.id} DIFAR sonobuoy now active.`, 'info');
                }
            }
            if (!b.active) continue;
            b.minsLeft -= C.MINS_PER_TICK;
            if (b.minsLeft <= 0) {
                b.active = false;
                if (b.ring) this.lyr.buoys.removeLayer(b.ring);
                b.mk?.setStyle({ color: '#2a1e00', fillColor: '#2a1e00', opacity: 0.3 });
                this._log(`${b.id} battery exhausted.`, 'info');
            }
        }
    },

    _classify(conf) {
        if (conf >= C.CONF_CONFIRMED) return 'CONFIRMED';
        if (conf >= C.CONF_PROBABLE)  return 'PROBABLE';
        if (conf >= C.CONF_POSSIBLE)  return 'POSSIBLE';
        return 'UNKNOWN';
    },

    _checkWeaponsReady(asset, ct) {
        if (!ct?.estLat) { asset._torpReady = false; return; }
        const muns = asset.munitions;
        const dist = haverKm(asset.lat, asset.lon, ct.estLat, ct.estLon);
        const hasWpn = muns.mk54 > 0 || muns.asroc > 0;
        const range  = ASSET_TYPE[asset.type].isAircraft ? C.TORP_RANGE_KM :
                       (muns.asroc > 0 ? C.ASROC_RANGE_KM : C.TORP_RANGE_KM);
        asset._torpReady = ct.conf >= C.CONF_PROBABLE && dist <= range && hasWpn;
    },

    targetContact(id) {
        const ct = this.s?.contacts.find(c => c.id === id);
        if (!ct) return;
        this.s.assets.forEach(a => this._checkWeaponsReady(a, ct));
        this._log(`${id} designated as primary target.`, 'sys');
    },

    // ---- WEAPONS ----
    fireTorpedo(assetId) {
        const { s } = this;
        if (!s) return;
        const asset = s.assets.find(a => a.id === assetId);
        if (!asset) return;
        const ct = s.contacts.find(c => c.conf >= C.CONF_PROBABLE && c.estLat);
        if (!ct) { this._log('Insufficient firing solution.', 'warn'); return; }

        const tp   = ASSET_TYPE[asset.type];
        const muns = asset.munitions;
        const useAsroc = !tp.isAircraft && muns.asroc > 0;
        if (useAsroc) muns.asroc--;
        else if (muns.mk54 > 0) muns.mk54--;
        else { this._log('No weapons available.', 'warn'); return; }

        const dist    = haverKm(asset.lat, asset.lon, ct.subRef?.lat ?? ct.estLat, ct.subRef?.lon ?? ct.estLon);
        const hitProb = dist <= (useAsroc ? C.ASROC_RANGE_KM : C.TORP_RANGE_KM) ?
            (1 - dist / (useAsroc ? C.ASROC_RANGE_KM : C.TORP_RANGE_KM)) * ct.conf * 0.88 : 0;

        this._log(`${asset.id}: ${useAsroc ? 'ASROC' : 'MK54'} AWAY — BRG ${pad3(ct.brg)} RNG ~${Math.round(ct.range)}km`, 'alert');
        asset.status = 'ENGAGING';

        // Draw torpedo track
        if (ct.estLat) {
            const torpLine = L.polyline([[asset.lat, asset.lon], [ct.estLat, ct.estLon]], {
                color: '#cc2222', weight: 1.5, opacity: 0.7, dashArray: '3,4',
            }).addTo(this.lyr.pings);
            setTimeout(() => this.lyr.pings.removeLayer(torpLine), 4000);
        }

        setTimeout(() => {
            if (!s.running) return;
            if (Math.random() < hitProb) {
                this._log('DETONATION CONFIRMED. Contact destroyed.', 'ok');
                const elapsed = s.mins - C.START_HOUR;
                if (ct.subRef) ct.subRef.state = 'DESTROYED';
                s.contacts.splice(s.contacts.indexOf(ct), 1);
                setTimeout(() => this._end(true,
                    `CONTACT NEUTRALISED.<br>${asset.id} (${asset.name}) achieved kill in ${Math.floor(elapsed/60)}h ${elapsed%60}m. Operation complete.`
                ), 1400);
            } else {
                this._log(`WEAPON MISS. ${ct.id} evading.`, 'warn');
                asset.status = 'SEARCHING';
                if (ct.subRef) {
                    ct.subRef.spd       = SUB_CLASS[ct.subRef.cls].spdDiv;
                    ct.subRef.evadeTimer = rand(120, 200);
                    ct.subRef.hdg        = (ct.subRef.hdg + rand(90, 200)) % 360;
                }
            }
            UI.updateAssets();
        }, 2200);
    },

    // ---- DROP BUOY ----
    _dropBuoy(assetId, lat, lon) {
        const { s } = this;
        const asset = s.assets.find(a => a.id === assetId);
        if (!asset) return;
        if (asset.munitions.sonobuoys <= 0) { this._log('No sonobuoys remaining.', 'warn'); return; }
        asset.munitions.sonobuoys--;

        const id  = `B-${String(s.buoys.length + 1).padStart(2, '0')}`;
        const mk  = L.circleMarker([lat, lon], {
            radius: 4, color: '#5a3e00', weight: 1.5, fillColor: '#5a3e00', fillOpacity: 0.4,
        }).addTo(this.lyr.buoys);
        mk.bindTooltip(id, { permanent: true, direction: 'top', offset: [0, -7], className: 'buoy-lbl' });
        const ring = L.circle([lat, lon], {
            radius: C.RANGE_BUOY * 1000,
            color: '#c8960c', weight: 0.4, fill: false, opacity: 0.2, dashArray: '5,10',
        }).addTo(this.lyr.buoys);

        s.buoys.push({
            id, lat, lon,
            active:      false,
            deployTimer: C.BUOY_DEPLOY_MINS,
            minsLeft:    C.BUOY_LIFE_MINS,
            mk, ring,
        });
        this._log(`${id} deployed from ${asset.id} at ${lat.toFixed(2)}°N. Deploying... (${C.BUOY_DEPLOY_MINS}m)`, 'info');
    },

    // ---- CONTROLS ----
    selectAsset(id) {
        this.selectedAsset = id ? (this.s?.assets.find(a => a.id === id) ?? null) : null;
        UI.updateAssets();
        UI.buildCmdBar(this.selectedAsset);
        if (this.selectedAsset) {
            this._log(`Selected: ${this.selectedAsset.id} ${this.selectedAsset.name}.`, 'sys');
        }
    },

    toggleActiveSonar(assetId) {
        const asset = this.s?.assets.find(a => a.id === assetId);
        if (!asset) return;
        asset.activeSonar = !asset.activeSonar;
        if (asset.activeSonar) {
            asset.pingTimer = 0;
            this._log(`${asset.id}: Active sonar ON — contact alerted.`, 'warn');
        } else {
            this._log(`${asset.id}: Active sonar OFF — passive only.`, 'info');
        }
        UI.buildCmdBar(asset);
    },

    toggleDipSonar(assetId) {
        const asset = this.s?.assets.find(a => a.id === assetId);
        if (!asset) return;
        asset.dipping = !asset.dipping;
        if (asset.dipping) {
            asset.dipTimer = 2;
            this._log(`${asset.id}: Lowering dipping sonar — ${asset.dipTimer}m to deploy.`, 'info');
        } else {
            this._log(`${asset.id}: Dipping sonar retracted.`, 'info');
        }
        UI.buildCmdBar(asset);
    },

    adjSpeed(assetId, delta) {
        const asset = this.s?.assets.find(a => a.id === assetId);
        if (!asset) return;
        const tp = ASSET_TYPE[asset.type];
        asset.spd = clamp(asset.spd + delta, 0, tp.maxSpd);
        UI.buildCmdBar(asset);
    },

    setMode(mode, assetId) {
        this._mode      = mode;
        this._modeAsset = assetId || null;
        document.getElementById('map-mode-label').textContent =
            mode === 'BUOY' ? `DROP BUOY — ${assetId}` :
            mode === 'NAVIGATE' ? '' : mode;
    },

    startPatrolSet(assetId) {
        this._mode      = 'PATROL_WP';
        this._modeAsset = assetId;
        this._patrolPending = [];
        document.getElementById('patrol-hud').classList.remove('hidden');
        document.getElementById('patrol-wp-count').textContent = '0';
        document.getElementById('map-mode-label').textContent = 'PATROL WP MODE — CLICK MAP';
    },

    cancelPatrol() {
        this._mode = 'NAVIGATE';
        this._patrolPending = [];
        this._patrolMks.forEach(m => this.lyr.assets.removeLayer(m));
        this._patrolMks = [];
        document.getElementById('patrol-hud').classList.add('hidden');
        document.getElementById('map-mode-label').textContent = '';
    },

    commitPatrol() {
        const wps = this._patrolPending.slice();
        if (wps.length < 2) { this._log('Need at least 2 waypoints for patrol.', 'warn'); return; }
        const asset = this.s?.assets.find(a => a.id === this._modeAsset);
        if (!asset) return;
        asset.routine = { type: 'PATROL', waypoints: wps, cwp: 0 };
        asset.wpLat   = null; asset.wpLon = null;
        this._log(`${asset.id}: Patrol routine set — ${wps.length} waypoints.`, 'sys');
        this.cancelPatrol();
        UI.buildCmdBar(asset);
    },

    clearRoutine(assetId) {
        const asset = this.s?.assets.find(a => a.id === assetId);
        if (!asset) return;
        asset.routine = null;
        asset.wpLat   = null; asset.wpLon = null;
        this._log(`${asset.id}: Patrol routine cleared.`, 'sys');
        UI.buildCmdBar(asset);
    },

    _onMapClick(e) {
        if (!this.s?.running) return;
        const { lat, lng } = e.latlng;

        if (this._mode === 'BUOY') {
            if (this._modeAsset) this._dropBuoy(this._modeAsset, lat, lng);
            this.setMode('NAVIGATE');
            return;
        }

        if (this._mode === 'PATROL_WP') {
            this._patrolPending.push([lat, lng]);
            const mk = L.marker([lat, lng], {
                icon: L.divIcon({ html: `<div class="patrol-wp-mk">⬡</div>`, className: '', iconSize: [12, 12], iconAnchor: [6, 6] }),
            }).addTo(this.lyr.assets);
            this._patrolMks.push(mk);
            document.getElementById('patrol-wp-count').textContent = this._patrolPending.length;
            return;
        }

        // NAVIGATE: set waypoint for selected asset
        if (this.selectedAsset) {
            const asset = this.s.assets.find(a => a.id === this.selectedAsset.id);
            if (!asset) return;
            asset.routine  = null;
            asset.wpLat    = lat;
            asset.wpLon    = lng;
            if (asset.spd === 0) asset.spd = ASSET_TYPE[asset.type].isAircraft ?
                Math.floor(ASSET_TYPE[asset.type].maxSpd * 0.7) : 15;

            // Waypoint marker
            const wpKey = `wp_${asset.id}`;
            if (this.mk[wpKey]) this.lyr.assets.removeLayer(this.mk[wpKey]);
            this.mk[wpKey] = L.marker([lat, lng], {
                icon: L.divIcon({ html: '<div class="wp-mk">✕</div>', className: '', iconSize: [14, 14], iconAnchor: [7, 7] }),
            }).addTo(this.lyr.assets);

            this._log(`${asset.id}: WP set ${lat.toFixed(2)}°N ${lng.toFixed(2)}°E.`, 'sys');
            UI.buildCmdBar(asset);
        }
    },

    // ---- RENDERING ----
    _renderBases() {
        this.lyr.bases.clearLayers();
        if (!this.s) return;
        this.s.bases.forEach(base => {
            const mk = L.marker([base.lat, base.lon], {
                icon: L.divIcon({
                    html: '<div class="base-mk" style="color:#cc4444;text-shadow:0 0 6px rgba(204,34,34,.7)">⬡</div>',
                    className: '', iconSize: [18, 18], iconAnchor: [9, 9],
                }),
            }).addTo(this.lyr.bases);

            mk.bindTooltip(`<strong>${base.name}</strong><br>${base.subs.length} vessel(s)`, {
                permanent: false, direction: 'top',
            });
            mk.on('click', () => {
                UI.switchTab('sat');
                document.getElementById('sat-base-select').value = base.id;
                UI.selectSatBase(base.id);
            });

            // Base label
            L.marker([base.lat, base.lon], {
                icon: L.divIcon({
                    html: `<div style="font-size:0.5rem;color:#cc4444;letter-spacing:1px;white-space:nowrap;margin-top:12px">${base.id}</div>`,
                    className: '', iconSize: [60, 14], iconAnchor: [30, -2],
                }),
            }).addTo(this.lyr.bases);

            // Detection range ring (tiny marker)
            L.circle([base.lat, base.lon], {
                radius: 5000, color: '#441111', weight: 1, fill: false, opacity: 0.4, dashArray: '3,8',
            }).addTo(this.lyr.bases);
        });
    },

    _renderSubs() {
        this.lyr.subs.clearLayers();
        if (!this.s) return;
        this.s.bases.forEach(base => {
            base.subs.filter(sub => sub.state !== 'IN_PORT').forEach(sub => {
                const cls    = SUB_CLASS[sub.cls];
                const color  = sub.detected ? '#cc4444' : '#664400';
                const icon   = L.divIcon({
                    html: `<div class="sub-mk" style="color:${color};text-shadow:0 0 5px ${color}">${cls.icon}</div>`,
                    className: '', iconSize: [14, 14], iconAnchor: [7, 7],
                });
                L.marker([sub.lat, sub.lon], { icon }).addTo(this.lyr.subs);
            });
        });
    },

    _renderAssets() {
        this.lyr.assets.clearLayers();
        if (!this.s) return;
        // Restore patrol and wp markers
        Object.entries(this.mk).forEach(([k, v]) => {
            if (k.startsWith('wp_')) this.lyr.assets.addLayer(v);
        });
        this.s.assets.forEach(asset => {
            const tp  = ASSET_TYPE[asset.type];
            const sel = this.selectedAsset?.id === asset.id;
            const glow = sel ? `text-shadow:0 0 10px ${tp.color}` : `text-shadow:0 0 5px ${tp.color}`;
            L.marker([asset.lat, asset.lon], {
                icon: L.divIcon({
                    html: `<div class="ship-mk" style="color:${tp.color};${glow}">${tp.icon}</div>`,
                    className: '', iconSize: [18, 18], iconAnchor: [9, 9],
                }),
                zIndexOffset: sel ? 2000 : 1000,
            }).on('click', () => this.selectAsset(asset.id)).addTo(this.lyr.assets);

            // Asset label
            L.marker([asset.lat, asset.lon], {
                icon: L.divIcon({
                    html: `<div style="font-size:0.5rem;color:${tp.color};letter-spacing:0.8px;white-space:nowrap;margin-top:13px;opacity:0.8">${asset.id}</div>`,
                    className: '', iconSize: [60, 14], iconAnchor: [30, -2],
                }),
            }).addTo(this.lyr.assets);

            // Sonar envelope
            const sRange = ASSET_TYPE[asset.type].sensors.towed ||
                           ASSET_TYPE[asset.type].sensors.hull_pass || 0;
            if (sRange > 0) {
                L.circle([asset.lat, asset.lon], {
                    radius:      sRange * 1000 * (asset.activeSonar ? 1.35 : 1),
                    color:       tp.color,
                    weight:      0.5,
                    fill:        true,
                    fillOpacity: sel ? 0.04 : 0.015,
                    opacity:     sel ? 0.25 : 0.12,
                    dashArray:   asset.activeSonar ? null : '5,12',
                }).addTo(this.lyr.assets);
            }
        });
    },

    _renderContacts() {
        this.lyr.contacts.clearLayers();
        if (!this.s) return;
        this.s.contacts.forEach(ct => {
            const cls   = this._classify(ct.conf);
            const color = cls === 'CONFIRMED' ? '#cc2222' :
                          cls === 'PROBABLE'  ? '#cc8800' : '#806000';

            if (!ct.estLat) {
                // Bearing-only line from source
                const bRad  = ct.brg * Math.PI / 180;
                const reach = 80;
                const eLat  = ct.srcLat + (reach * Math.cos(bRad)) / 111;
                const eLon  = ct.srcLon + (reach * Math.sin(bRad)) / (111 * Math.cos(ct.srcLat * Math.PI / 180));
                L.polyline([[ct.srcLat, ct.srcLon], [eLat, eLon]], {
                    color, weight: 1, opacity: 0.4, dashArray: '4,8',
                }).addTo(this.lyr.contacts);
                return;
            }

            // Contact blip
            L.marker([ct.estLat, ct.estLon], {
                icon: L.divIcon({
                    html: `<div style="font-size:14px;color:${color};text-shadow:0 0 8px ${color};line-height:1">◯</div>`,
                    className: '', iconSize: [14, 14], iconAnchor: [7, 7],
                }),
            }).addTo(this.lyr.contacts);

            // Uncertainty circle
            L.circle([ct.estLat, ct.estLon], {
                radius:  Math.max(2000, (1 - ct.conf) * 20000),
                color, weight: 0.6, fill: false, opacity: 0.4, dashArray: '3,7',
            }).addTo(this.lyr.contacts);

            // Contact ID label
            L.marker([ct.estLat, ct.estLon], {
                icon: L.divIcon({
                    html: `<div style="font-size:0.5rem;color:${color};letter-spacing:1px;margin-top:12px">${ct.id}</div>`,
                    className: '', iconSize: [40, 14], iconAnchor: [20, -2],
                }),
            }).addTo(this.lyr.contacts);

            // Historical track trail
            if (ct.history.length > 1) {
                L.polyline(ct.history.map(h => [h[0], h[1]]), {
                    color, weight: 0.8, opacity: 0.3, dashArray: '2,6',
                }).addTo(this.lyr.contacts);
            }
        });
    },

    _renderTracks() {
        this.lyr.tracks.clearLayers();
        if (!this.s) return;
        this.s.assets.forEach(asset => {
            if (asset.track.length < 2) return;
            const tp = ASSET_TYPE[asset.type];
            L.polyline(asset.track, {
                color: tp.color, weight: 0.8, opacity: 0.25, dashArray: '2,8',
            }).addTo(this.lyr.tracks);
        });
    },

    // ---- WATERFALL ----
    _wfTick() {
        const { px, cv } = this.wf;
        const w = cv.width, h = cv.height;

        // Scroll: shift all rows down one
        px.copyWithin(w * 4, 0, (h - 1) * w * 4);

        const row = new Float32Array(w);
        // Ambient noise floor
        for (let x = 0; x < w; x++) row[x] = randInt(3, 16);

        // Broadband tonal noise from own ship (speed-dependent)
        const selAsset = this.selectedAsset ? this.s?.assets.find(a => a.id === this.selectedAsset.id) : null;
        const ownSpd   = selAsset?.spd ?? 0;
        if (ownSpd > 5) {
            // Self-noise: wideband bloom around 180° (directly behind)
            const ownBrg = selAsset ? (selAsset.hdg + 180) % 360 : 180;
            const ownNoise = 10 + ownSpd * 0.8;
            for (let dx = -20; dx <= 20; dx++) {
                const px2 = (Math.round(ownBrg / 360 * w) + dx + w) % w;
                row[px2] = Math.max(row[px2], ownNoise * Math.max(0, 1 - Math.abs(dx) / 22));
            }
        }

        // Sub signatures on waterfall
        const allSubs = this.s?.bases.flatMap(b => b.subs.filter(s => s.state !== 'IN_PORT')) ?? [];
        const refAsset = selAsset || this.s?.assets.find(a => !ASSET_TYPE[a.type].isAircraft);

        if (refAsset) {
            allSubs.forEach(sub => {
                const cond  = Physics.conditions(refAsset.depth, sub.depth, sub.spd) * SUB_CLASS[sub.cls].sig;
                const effR  = (ASSET_TYPE[refAsset.type].sensors.towed || ASSET_TYPE[refAsset.type].sensors.hull_pass || 10) * cond;
                const dist  = haverKm(refAsset.lat, refAsset.lon, sub.lat, sub.lon);
                if (dist > effR * 1.4) return;
                const snr = Math.max(0, 1 - dist / effR);
                const brg = bearing(refAsset.lat, refAsset.lon, sub.lat, sub.lon);
                const cx  = Math.floor(brg / 360 * w);
                const sig = 20 + snr * 110;
                // Narrow tonal line with gaussian spread
                for (let dx = -6; dx <= 6; dx++) {
                    const px2   = (cx + dx + w) % w;
                    const spread = sig * Math.exp(-0.5 * (dx / 2.5) ** 2);
                    row[px2] = Math.max(row[px2], spread * (0.7 + Math.random() * 0.3));
                }
            });
        }

        // Write new top row (amber color: r*0.78, g*0.58, b=0)
        for (let x = 0; x < w; x++) {
            const v = Math.min(255, row[x]);
            const i = x * 4;
            // Additive tonal: bright peaks in green-amber, dim noise in dark amber
            const bright = v > 40;
            px[i]   = bright ? Math.floor(v * 0.72) : Math.floor(v * 0.50);
            px[i+1] = bright ? Math.floor(v * 0.72) : Math.floor(v * 0.35);
            px[i+2] = bright ? Math.floor(v * 0.15) : 0;
            px[i+3] = 255;
        }
        this._wfRender();
    },

    _wfAddReturn(brgDeg, intensity) {
        const { px, cv } = this.wf;
        const cx = Math.floor(((brgDeg % 360 + 360) % 360) / 360 * cv.width);
        for (let dx = -5; dx <= 5; dx++) {
            const px2  = (cx + dx + cv.width) % cv.width;
            const fall = intensity * Math.exp(-0.5 * (dx / 2) ** 2);
            const i    = px2 * 4;
            px[i]   = Math.min(255, px[i]   + fall * 0.72);
            px[i+1] = Math.min(255, px[i+1] + fall * 0.72);
            px[i+2] = Math.min(255, px[i+2] + fall * 0.20);
        }
        this._wfRender();
    },

    _wfRender() {
        const { ctx, px, cv } = this.wf;
        ctx.putImageData(new ImageData(px, cv.width, cv.height), 0, 0);
        // Bearing markers every 30°
        ctx.strokeStyle = 'rgba(200,150,12,0.25)';
        ctx.lineWidth   = 0.5;
        for (let deg = 0; deg < 360; deg += 30) {
            const x = Math.floor(deg / 360 * cv.width);
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, cv.height); ctx.stroke();
        }
    },

    // ---- HEADER ----
    _updateHeader() {
        if (!this.s) return;
        document.getElementById('game-time').textContent  = fmtTime(this.s.mins);
        document.getElementById('game-phase').textContent =
            this.s.contacts.length ? 'CONTACT' : 'SEARCH';
        const minsToSat = this.s.nextSatPass - this.s.mins;
        document.getElementById('next-sat').textContent   = `${Math.max(0, minsToSat)}m`;
    },

    // ---- LOG ----
    _log(msg, type = 'info') {
        const log  = document.getElementById('intel-log');
        const time = this.s ? fmtTime(this.s.mins) : '----Z';
        const el   = document.createElement('div');
        el.className = `log-entry t-${type}`;
        el.innerHTML = `<span class="log-t">${time}</span> ${msg}`;
        log.insertBefore(el, log.firstChild);
        while (log.children.length > 60) log.removeChild(log.lastChild);
    },

    // ---- END ----
    _end(won, msg) {
        if (!this.s) return;
        this.s.running = false;
        clearInterval(this.loop);
        const title = document.getElementById('end-title');
        const body  = document.getElementById('end-body');
        title.textContent = won ? '▌ OPERATION SUCCESS ▐' : '▌ OPERATION FAILED ▐';
        title.style.color = won ? '#3aaa3a' : '#cc2222';
        body.innerHTML    = `<p>${msg}</p>`;
        document.getElementById('modal-end').style.display = 'flex';
    },
};

window.addEventListener('DOMContentLoaded', () => Game.init());
