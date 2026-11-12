var at = typeof window < "u";
const Ue = {
  Promise: at ? window.Promise : void 0
};
var He = "4.25", ue = "next";
function Be(n) {
  if (n.toLowerCase() === ue)
    return ue;
  var o = n && n.match(/^(\d)\.(\d+)/);
  return o && {
    major: parseInt(o[1], 10),
    minor: parseInt(o[2], 10)
  };
}
function $e(n) {
  return n === void 0 && (n = He), "https://js.arcgis.com/".concat(n, "/");
}
function it(n) {
  n === void 0 && (n = He);
  var o = $e(n), e = Be(n);
  if (e !== ue && e.major === 3) {
    var l = e.minor <= 10 ? "js/" : "";
    return "".concat(o).concat(l, "esri/css/esri.css");
  } else
    return "".concat(o, "esri/themes/light/main.css");
}
function st(n) {
  var o = document.createElement("link");
  return o.rel = "stylesheet", o.href = n, o;
}
function ct(n, o) {
  if (o) {
    var e = document.querySelector(o);
    e.parentNode.insertBefore(n, e);
  } else
    document.head.appendChild(n);
}
function lt(n) {
  return document.querySelector('link[href*="'.concat(n, '"]'));
}
function ut(n) {
  return !n || Be(n) ? it(n) : n;
}
function dt(n, o) {
  var e = ut(n), l = lt(e);
  return l || (l = st(e), ct(l, o)), l;
}
var mt = {};
function gt(n) {
  var o = document.createElement("script");
  return o.type = "text/javascript", o.src = n, o.setAttribute("data-esri-loader", "loading"), o;
}
function Ve(n, o, e) {
  var l;
  e && (l = pt(n, e));
  var u = function() {
    o(n), n.removeEventListener("load", u, !1), l && n.removeEventListener("error", l, !1);
  };
  n.addEventListener("load", u, !1);
}
function pt(n, o) {
  var e = function(l) {
    o(l.error || new Error("There was an error attempting to load ".concat(n.src))), n.removeEventListener("error", e, !1);
  };
  return n.addEventListener("error", e, !1), e;
}
function Pe() {
  return document.querySelector("script[data-esri-loader]");
}
function de() {
  var n = window.require;
  return n && n.on;
}
function ft(n) {
  n === void 0 && (n = {});
  var o = {};
  [mt, n].forEach(function(u) {
    for (var m in u)
      Object.prototype.hasOwnProperty.call(u, m) && (o[m] = u[m]);
  });
  var e = o.version, l = o.url || $e(e);
  return new Ue.Promise(function(u, m) {
    var b = Pe();
    if (b) {
      var _ = b.getAttribute("src");
      _ !== l ? m(new Error("The ArcGIS API for JavaScript is already loaded (".concat(_, ")."))) : de() ? u(b) : Ve(b, u, m);
    } else if (de())
      m(new Error("The ArcGIS API for JavaScript is already loaded."));
    else {
      var F = o.css;
      if (F) {
        var K = F === !0;
        dt(K ? e : F, o.insertCssBefore);
      }
      b = gt(l), Ve(b, function() {
        b.setAttribute("data-esri-loader", "loaded"), u(b);
      }, m), document.body.appendChild(b);
    }
  });
}
function Ge(n) {
  return new Ue.Promise(function(o, e) {
    var l = window.require.on("error", e);
    window.require(n, function() {
      for (var u = [], m = 0; m < arguments.length; m++)
        u[m] = arguments[m];
      l.remove(), o(u);
    });
  });
}
function ht(n, o) {
  if (o === void 0 && (o = {}), de())
    return Ge(n);
  var e = Pe(), l = e && e.getAttribute("src");
  return !o.url && l && (o.url = l), ft(o).then(function() {
    return Ge(n);
  });
}
const bt = (n, o) => n.replace(/\(\?\<(.+?)\>[^)]*\)/g, (e, l) => o[l]), Fe = function(n, o) {
  if (!o) return null;
  const e = o.portalItem && o.portalItem.id;
  return e ? `item:${e}` : !n || !o.id ? null : n.fromId(o.id) ? o.id : null;
}, vt = async function(n, o, e) {
  if (!o) return null;
  if (o.startsWith("item:")) {
    const u = new n({ portalItem: { id: o.slice(5) } });
    try {
      return await u.load(), u;
    } catch (m) {
      return console.warn(
        `${e}: basemap portal item "${o.slice(5)}" from the URL could not be loaded, keeping the current basemap`,
        m
      ), null;
    }
  }
  const l = n.fromId(o);
  return l || console.warn(
    `${e}: unknown basemap "${o}" in the URL, keeping the current basemap`
  ), l;
}, w = (n, o = {}, e = "") => {
  const l = document.createElement(n);
  for (let u in o)
    l.setAttribute(u, o[u]);
  return l.innerHTML = e, l;
}, wt = (n, o) => (document.getElementById(n) || document.getElementsByTagName("head")[0].prepend(w("STYLE", { type: "text/css" }, o)), !0), yt = function(n = {}) {
  wt("geocam-argis-map", `
      .geocam-auto-rotate-checkbox, .geocam-auto-brightness-checkbox {
        display: none;
      }

      /* Ground opacity (geocam-pm#290). Laid out beside the icon rather than under
         it so the control keeps the same height as the toggles above it. */
      .geocam-ground-opacity-label {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .geocam-ground-opacity-slider {
        width: 80px;
        cursor: pointer;
      }

      .geocam-auto-rotate-span {
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24'  viewBox='0 0 24 24' fill='currentColor'><rect fill='none' height='24' width='24'/><path d='M7.94,5.12L6.49,3.66C8.07,2.61,9.96,2,12,2c5.52,0,10,4.48,10,10c0,2.04-0.61,3.93-1.66,5.51l-1.46-1.46 C19.59,14.86,20,13.48,20,12c0-4.41-3.59-8-8-8C10.52,4,9.14,4.41,7.94,5.12z M17.66,9.53l-1.41-1.41l-2.65,2.65l1.41,1.41 L17.66,9.53z M19.78,22.61l-2.27-2.27C15.93,21.39,14.04,22,12,22C6.48,22,2,17.52,2,12c0-2.04,0.61-3.93,1.66-5.51L1.39,4.22 l1.41-1.41l18.38,18.38L19.78,22.61z M16.06,18.88l-3.88-3.88l-1.59,1.59l-4.24-4.24l1.41-1.41l2.83,2.83l0.18-0.18L5.12,7.94 C4.41,9.14,4,10.52,4,12c0,4.41,3.59,8,8,8C13.48,20,14.86,19.59,16.06,18.88z'/></svg>")
      }

      .geocam-auto-rotate-checkbox:checked +.geocam-auto-rotate-span {
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' viewBox='0 0 24 24' fill='currentColor'><rect fill='none' height='24' width='24'/><path d='M18.6,19.5H21v2h-6v-6h2v2.73c1.83-1.47,3-3.71,3-6.23c0-4.07-3.06-7.44-7-7.93V2.05c5.05,0.5,9,4.76,9,9.95 C22,14.99,20.68,17.67,18.6,19.5z M4,12c0-2.52,1.17-4.77,3-6.23V8.5h2v-6H3v2h2.4C3.32,6.33,2,9.01,2,12c0,5.19,3.95,9.45,9,9.95 v-2.02C7.06,19.44,4,16.07,4,12z M16.24,8.11l-5.66,5.66l-2.83-2.83l-1.41,1.41l4.24,4.24l7.07-7.07L16.24,8.11z'/></svg>")
      }

      .geocam-auto-brightness-span {
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'  enable-background='new 0 0 24 24' viewBox='0 0 24 24'  fill='currentColor'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'/></svg>");
      }

      .geocam-auto-brightness-checkbox:checked +.geocam-auto-brightness-span {
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' viewBox='0 0 24 24' fill='currentColor'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M11 7l-3.2 9h1.9l.7-2h3.2l.7 2h1.9L13 7h-2zm-.15 5.65L12 9l1.15 3.65h-2.3zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48z'/></svg>")
      }

     .geocam-auto-brightness-checkbox:disabled +.geocam-auto-brightness-span {
          opacity: 50%;
          cursor: auto;
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'  enable-background='new 0 0 24 24' viewBox='0 0 24 24'  fill='currentColor'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'/></svg>");
      }

    `);
  let e, l, u = [], m, b, _, F, K, me, J, U, q, H, ge, B, pe, Q, fe, he, be, ve, we, ye, Oe, Le, Re, X, ne, j, oe, E, re, A, M, xe = !0, Se;
  const { sceneView: i, prevNextPlugin: ae, widgets: xt, expands: St, src: ie } = n, ke = function(t, r, s, a, c) {
    return 1 / Math.sqrt(i.scale / 70), {
      geometry: {
        type: "point",
        latitude: s,
        longitude: r,
        z: a
      },
      symbol: {
        type: "point-3d",
        symbolLayers: [
          {
            type: "object",
            width: 8,
            //width of object in meters
            height: 4,
            //height of object in meters
            depth: 8,
            //depth in meters
            anchor: "top",
            resource: {
              primitive: "cone"
            },
            roll: 0,
            tilt: c,
            heading: t,
            material: {
              color: "rgba(0,0,255,0.6)"
            }
          }
        ]
      }
    };
  };
  let k = ke(0, 0, 0, 0, 90);
  const T = function(t, r, s, a, c) {
    if (console.log("update fov", t, r, s, a, c), m && (m.removeAll(), e.visible() && t !== null))
      if (U()) {
        const d = i.camera.clone();
        (s || s === 0) && (d.position.latitude = s), (r || r === 0) && (d.position.longitude = r), (a || a === 0) && (d.position.z = a), (t || t === 0) && (d.heading = t), (c || c === 0) && (d.tilt = 90 - c), d.fov = parseInt(e.fov()), console.log("camera fov", d), i.goTo(d, { animate: !1 }), i.camera.fov = e.fov();
      } else
        k = ke(
          t || 0,
          r || k.geometry.longitude,
          s || k.geometry.latitude,
          a || k.geometry.z,
          c ? 90 - c : k.symbol.symbolLayers[0].tilt
        ), m.add(k), (s || s === 0) && Se([r, s]);
  }, Ee = function(t, r, s = {}) {
    const a = new RegExp(r, "i");
    let c = a.test(t.name) || a.test(t.alias);
    return c && s.description && (c = !!t.description), c;
  }, Ce = function(t) {
    if (t) {
      var r = document.createElement("textarea");
      return r.innerHTML = t, r.value;
    } else
      return "https://image.geocam.xyz/";
  }, De = (t, r) => {
    const s = t.base;
    if (t.filenames)
      return JSON.parse(r[t.filenames]).map((a) => Array.isArray(a) ? a.map((c) => /^https?:\/\//i.test(c) ? a : `${s}${c}`) : /^https?:\/\//i.test(a) ? a : `${s}${a}`);
    {
      const a = r[t.capture].split(".")[0], c = a.split("/").pop(), d = JSON.parse(r[t.lengths]), h = JSON.parse(r[t.offsets]);
      return d.map((v, x) => {
        const N = encodeURIComponent(
          `https://s3.us-west-004.backblazeb2.com/gc-raw-surveys-archive/${a}_${x}.tar`
        );
        return `${s}${c}/${x}/${r[t.shot]}.jpg?offset=${h[x]}&length=${v}&container=${N}`;
      });
    }
  }, _e = function(t) {
    return u.findIndex((r) => r.layer == t.layer);
  }, Je = function(t) {
    if (e.label) {
      const { capture: r, utc_time: s, shot: a } = t, c = new Date(s);
      e.label(`${c.toLocaleString()}`);
    }
  };
  let Ae, Z = !1;
  const qe = 50, je = function(t) {
    const r = i.center;
    if (!r) return t[0];
    let s = t[0], a = 1 / 0;
    return t.forEach((c) => {
      const d = c.geometry;
      if (!d || d.longitude == null || d.latitude == null) return;
      const h = d.longitude - r.longitude, L = d.latitude - r.latitude, v = h * h + L * L;
      v < a && (a = v, s = c);
    }), s;
  }, Ye = function(t, r) {
    if (Z || e.shot()) return;
    Z = !0;
    const s = t.layer;
    s.queryFeatures({
      where: s.definitionExpression || "1=1",
      returnGeometry: !0,
      outFields: "*",
      num: qe
    }).then((a) => {
      const c = a && a.features;
      if (e.shot() || !c || !c.length) {
        e.shot() || (Z = !1);
        return;
      }
      ee(je(c), r);
    }).catch((a) => {
      console.warn("arcgis-scene: could not open a default shot", a), Z = !1;
    });
  }, ee = function(t, r) {
    const s = Q();
    console.log("shotclick with viewlock", s);
    const a = u[r], c = t.attributes[a.shot];
    Ae = c, e.shot(c), ae && (ae.prev(t.attributes.prev), ae.next(t.attributes.next));
    const d = [0, 1, 2].map(
      (N) => bt(a.calibrationBase, {
        camera: N,
        rig_id: t.attributes[a.rigId],
        calibration: t.attributes[a.calibration]
      })
    ), h = t.attributes[a.yaw], L = t.attributes[a.rotation], v = H() && a.brightness ? t.attributes[a.brightness] : null;
    ge = v;
    const x = De(a, t.attributes);
    if (s) {
      const N = bearing(t.geometry, s);
      e.facing(N);
    }
    e.show(x, h, d, L, v), T(
      e.facing(),
      t.geometry.longitude,
      t.geometry.latitude,
      t.geometry.z,
      e.horizon()
    ), Je(t.attributes);
  };
  let Me;
  const We = 111320, Ke = 150, Qe = function() {
    let t = null;
    const r = i.extent;
    if (r && isFinite(r.xmin)) {
      const a = r.spatialReference && r.spatialReference.isWebMercator && oe ? oe.webMercatorToGeographic(r) : r;
      a && isFinite(a.xmin) && (t = [a.xmin, a.ymin, a.xmax, a.ymax]);
    }
    const s = i.camera && i.camera.position;
    if (s && isFinite(s.longitude) && isFinite(s.latitude)) {
      const c = Math.max(Ke, (i.scale || 0) / 10) / We, d = c / Math.max(0.01, Math.cos(s.latitude * Math.PI / 180)), h = [
        s.longitude - d,
        s.latitude - c,
        s.longitude + d,
        s.latitude + c
      ];
      t = t ? [
        Math.min(t[0], h[0]),
        Math.min(t[1], h[1]),
        Math.max(t[2], h[2]),
        Math.max(t[3], h[3])
      ] : h;
    }
    return t;
  }, se = 1200, Ne = 5e3, ce = 0.35, Xe = function(t) {
    if (!isFinite(t) || t <= 0) return 1;
    if (t <= se) return ce;
    if (t >= Ne) return 1;
    const r = (t - se) / (Ne - se);
    return ce + r * (1 - ce);
  }, le = function(t) {
    const r = i.map && i.map.ground;
    if (!r) return;
    const s = E && E(), a = s == null || s === "" ? Xe(t) : Number(s);
    if (!isFinite(a)) return;
    const c = Math.min(1, Math.max(0, a));
    r.opacity !== c && (r.opacity = c), M && document.activeElement !== M && (M.value = String(c));
  }, Ie = function(t, r, s, a) {
    clearTimeout(Me), Me = setTimeout(() => {
      const c = isFinite(t) ? t : i.scale, d = Math.ceil(c / 500), h = Qe(), L = h ? `mod(id,${d}) = 0 AND extent = ${h.join(",")},4326` : `mod(id,${d}) = 0`;
      u.forEach((v) => {
        v.layer.definitionExpression !== L && (v.layer.definitionExpression = L, console.log(
          "definition expression changed for",
          v.layer,
          L
        ));
      }), pe(i.zoom), le(c), U() || T(e.facing());
    }, 500);
  }, Ze = function(t, r, s, a) {
    Le([i.center.longitude, i.center.latitude]);
  }, Te = function(t) {
    const r = Fe(j, t);
    r && X(r);
  }, et = async function(t) {
    if (!t || !j || t === Fe(j, i.map.basemap)) return;
    const r = await vt(j, t, "arcgis-scene");
    r && (i.map.basemap = r);
  }, tt = function(t, r, s, a) {
    fe(i.camera.position.latitude), he(i.camera.position.longitude), ve(i.camera.position.z), we(i.camera.tilt), be(i.camera.heading), ye(i.camera.fov);
  };
  this.init = async function(t) {
    e = t, Se = e.store("marker"), pe = e.store("zoom"), Le = e.store("center"), X = e.store("basemap"), fe = e.store("camLat"), he = e.store("camLng"), ve = e.store("camAlt"), we = e.store("camTilt"), be = e.store("camHdg"), ye = e.store("camFov"), Q = e.store("viewlock"), U = e.store("autorotate"), J = w("DIV", { class: "geocam-auto-rotate" });
    const r = w("LABEL", { class: "geocam-auto-rotate-label" }), s = w("INPUT", {
      type: "checkbox",
      class: "geocam-auto-rotate-checkbox"
    }), a = w(
      "SPAN",
      { class: "geocam-auto-rotate-span geocam-viewer-control-button" },
      " Autorotate"
    );
    s.checked = U(), s.addEventListener("change", () => {
      U(s.checked);
    }), r.appendChild(s), r.appendChild(a), J.appendChild(r), e.addControl(J, "left-top"), F = U((g) => {
      J.setAttribute(
        "title",
        g ? "turn auto-rotate off" : "turn auto-rotate on"
      ), T(
        e.facing(),
        k.geometry.longitude,
        k.geometry.latitude,
        k.geometry.z,
        e.horizon()
      );
    }), H = e.store("autobrightness"), q = w("DIV", { class: "geocam-auto-brightness" });
    const c = w("LABEL", { class: "geocam-auto-brightness-label" });
    B = w("INPUT", {
      type: "checkbox",
      class: "geocam-auto-brightness-checkbox"
    });
    const d = w(
      "SPAN",
      { class: "geocam-auto-brightness-span geocam-viewer-control-button" },
      " Autobrightness"
    );
    B.disabled = !0, B.checked = H(), B.addEventListener("change", () => {
      H(B.checked);
    }), c.appendChild(B), c.appendChild(d), q.appendChild(c), e.addControl(q, "left-top"), K = H((g) => {
      q.setAttribute(
        "title",
        g ? "turn auto-brightness off" : "turn auto-brightness on"
      ), e.reload(H() ? ge : "[1,1,1]");
    }), E = e.store("ground"), A = w("DIV", { class: "geocam-ground-opacity" });
    const h = w("LABEL", { class: "geocam-ground-opacity-label" });
    M = w("INPUT", {
      type: "range",
      min: "0",
      max: "1",
      step: "0.05",
      class: "geocam-ground-opacity-slider"
    });
    const L = w(
      "SPAN",
      { class: "geocam-ground-opacity-span geocam-viewer-control-button" },
      " Terrain"
    );
    M.value = String(E() == null ? 1 : E()), M.addEventListener("input", () => {
      E(Number(M.value));
    }), h.appendChild(L), h.appendChild(M), A.appendChild(h), e.addControl(A, "left-top"), re = E(() => {
      A.setAttribute(
        "title",
        E() == null ? "terrain fades automatically as you zoom in" : `terrain opacity ${E()}`
      ), le(i.scale);
    }), me = e.visible((g) => T(e.facing()));
    const [
      v,
      x,
      N,
      ze,
      nt
    ] = await ht(
      [
        "esri/layers/GraphicsLayer",
        "esri/core/reactiveUtils",
        "esri/layers/FeatureLayer",
        "esri/Basemap",
        "esri/geometry/support/webMercatorUtils"
      ],
      {
        version: "4.26"
      }
    );
    if (j = ze, oe = nt, i.when(async () => {
      i.on("clickable", (p) => {
        xe = p;
      }), i.on("immediate-click", (p) => {
        if (!xe) return;
        const f = {
          x: p.x,
          y: p.y
        };
        if (console.log("immediate-click", p, f), l) {
          console.log("space wqas down");
          const y = i.toMap(f);
          if (Q(y), lockG && i.graphics.removeAll(), lockG = lockGraphic(y), i.graphics.add(lockG), e.visible()) {
            const V = bearing(k.geometry, y);
            e.facing(V);
          }
        } else
          i.hitTest(f).then((y) => {
            if (y.results && y.results.length > 0)
              for (var V = 0; V < y.results.length; V++) {
                const S = y.results[V].graphic, G = _e(S);
                if (G >= 0) {
                  Object.entries(S.attributes).length < 2 ? S.layer.queryFeatures({
                    objectIds: [S.attributes.id],
                    returnGeometry: !0,
                    outFields: "*",
                    where: S.layer.definitionExpression
                  }).then((te) => {
                    te.features.length > 0 && ee(te.features[0], G);
                  }) : ee(S, G);
                  break;
                }
              }
          });
      }), b = e.facing((p) => {
        T(p, null, null, null, e.horizon());
      }), _ = e.horizon((p) => {
        T(e.facing(), null, null, null, p);
      });
      const g = new URLSearchParams(window.location.hash.substr(1)), z = g.get("center");
      z && z !== "null" && (i.center = JSON.parse(z));
      const $ = g.get("zoom");
      $ && $ !== "null" && (i.zoom = JSON.parse($));
      const C = i.camera.clone(), P = g.get("camLat");
      P && P !== "null" && (C.position.latitude = JSON.parse(P));
      const O = g.get("camLng");
      O && O !== "null" && (C.position.longitude = JSON.parse(O));
      const R = g.get("camAlt");
      R && R !== "null" && (C.position.z = JSON.parse(R));
      const Y = g.get("camHdg");
      Y && Y !== "null" && (C.heading = JSON.parse(Y));
      const D = g.get("camTilt");
      D && D !== "null" && (C.tilt = JSON.parse(D));
      const I = g.get("camFov");
      I && I !== "null" && (C.fov = JSON.parse(I)), i.goTo(C, { animate: !1 });
      const W = g.get("marker");
      if (W) {
        const p = JSON.parse(W);
        if (p) {
          const [f, y] = p;
          T(e.facing(), f, y);
        }
      }
      ne = X(et), X() || Te(i.map.basemap), x.watch(() => i.map.basemap, Te), i.map && i.map.ground && (i.map.ground.navigationConstraint = { type: "none" }), le(i.scale), x.watch(() => i.scale, Ie), Ie(i.scale), x.watch(() => i.center, Ze), x.watch(() => i.camera.position, tt), e.shot((p) => {
        const f = parseInt(
          typeof p == "object" && p !== null ? p.id : p
        );
        f && f !== Ae ? (console.log("Got shot", p, "layers", u.length), u.forEach((y, V) => {
          const S = y.layer;
          e.resetProgress(), console.log("Querying layer for shot", S, f), S.queryFeatures({
            objectIds: [f],
            returnGeometry: !0,
            outFields: "*",
            where: S.definitionExpression
          }).then((G) => {
            if (console.log("Got results for layer", S, G), G.features.length > 0) {
              const te = G.features[0];
              ee(te, V);
            }
          });
        })) : p || e.hide();
      });
    }), ie) {
      const g = `${ie}/0`;
      console.log("shots url is", g);
      const z = new N({
        url: g,
        definitionExpression: "mod(id,100) = 0"
        // start with agressive simplifaction - view should get scale change early on to override this
      });
      i.map.add(z), z.when((P) => {
        const O = P.fields, R = O.find((f) => Ee(f, "filenames")), Y = O.find((f) => Ee(f, "calibration"));
        u.push({
          layer: z,
          shot: "id",
          filenames: "filenames",
          yaw: "yaw",
          rotation: "rotation_matrix",
          datetime: "utc_time",
          brightness: null,
          base: Ce(R && R.description),
          calibration: "calibration",
          rigId: null,
          calibrationBase: Ce(Y.description),
          capture: "capture"
        });
        const D = {
          xmin: -5e-3,
          ymin: -5e-3,
          xmax: 5e-3,
          ymax: 5e-3
        }, I = Object.keys(D), W = {};
        for (let f = 0; f < I.length; f++)
          W[I[f]] = parseFloat(P.fullExtent[I[f]]) + D[I[f]];
        i.extent = W;
        const p = u.length - 1;
        x.whenOnce(() => !i.updating).then(() => Ye(u[p], p));
      });
      const $ = `${ie}/1`;
      console.log("points features url is", $);
      const C = new N({
        url: $,
        popupEnabled: !0,
        popupTemplate: {
          title: "{reference}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "embed",
                  label: "content"
                }
              ]
            }
          ]
        }
      });
      i.map.add(C);
    }
    m = new v({
      title: "GeoCam Field of View",
      geometryType: "point",
      spatialReference: {
        wkid: 4326
      }
    }), i.map.layers.add(m);
    var ot = function(g) {
      switch (g.key, g.key) {
        case "Escape": {
          Q(null), mapView.graphics.removeAll();
          break;
        }
        case " ":
          l = !0;
      }
    }, rt = function(g) {
      switch (g.key, g.key) {
        case " ":
          l = !1;
      }
    };
    document.addEventListener("keydown", ot), document.addEventListener("keyup", rt);
  }, this.destroy = function() {
    b(), _(), F(), K(), Oe(), Re(), ne && ne(), re && re(), me(), i.map.removeLayer(m), e.wrapper.removeChild(J), e.wrapper.removeChild(q), A && A.parentNode && A.parentNode.removeChild(A);
  };
};
class Lt extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("GeocamViewerArcgisScene init");
  }
  connectedCallback() {
    this.link = function(o) {
      console.log("linking to ", o);
      const e = this.getAttribute("src");
      e || console.warn("No src attribute on geocam-viewer-arcgis-scene");
      const l = this.parentNode;
      if (this.viewer = l.viewer, this.sceneView = o, this.viewer && this.viewer.plugin) {
        const u = document.getElementsByTagName(
          "geocam-viewer-prev-next-control"
        )[0], m = u && u.plugin;
        this.plugin = new yt({ sceneView: o, prevNextPlugin: m, src: e }), l.viewer.plugin(this.plugin);
        const b = l.getElementsByTagName(
          "geocam-viewer-screen-shot"
        )[0];
        b && b.plugin && b.plugin.arcgisView(o);
      } else
        console.error("GeocamViewerArcgisScene must be a child of GeocamViewer");
    }, console.log("GeocamViewerArcgisScene connected");
  }
  disconnectedCallback() {
    this.plugin = null, this.viewer = null, this.sceneView = null, console.log("GeocamViewerArcgisScene disconnected");
  }
}
window.customElements.define("geocam-viewer-arcgis-scene", Lt);
export {
  Lt as GeocamViewerArcgisScene
};
