var je = typeof window < "u";
const Me = {
  Promise: je ? window.Promise : void 0
};
var Ae = "4.25", ne = "next";
function ze(t) {
  if (t.toLowerCase() === ne)
    return ne;
  var n = t && t.match(/^(\d)\.(\d+)/);
  return n && {
    major: parseInt(n[1], 10),
    minor: parseInt(n[2], 10)
  };
}
function Ie(t) {
  return t === void 0 && (t = Ae), "https://js.arcgis.com/".concat(t, "/");
}
function Oe(t) {
  t === void 0 && (t = Ae);
  var n = Ie(t), e = ze(t);
  if (e !== ne && e.major === 3) {
    var c = e.minor <= 10 ? "js/" : "";
    return "".concat(n).concat(c, "esri/css/esri.css");
  } else
    return "".concat(n, "esri/themes/light/main.css");
}
function De(t) {
  var n = document.createElement("link");
  return n.rel = "stylesheet", n.href = t, n;
}
function _e(t, n) {
  if (n) {
    var e = document.querySelector(n);
    e.parentNode.insertBefore(t, e);
  } else
    document.head.appendChild(t);
}
function Ye(t) {
  return document.querySelector('link[href*="'.concat(t, '"]'));
}
function We(t) {
  return !t || ze(t) ? Oe(t) : t;
}
function Ke(t, n) {
  var e = We(t), c = Ye(e);
  return c || (c = De(e), _e(c, n)), c;
}
var Qe = {};
function Xe(t) {
  var n = document.createElement("script");
  return n.type = "text/javascript", n.src = t, n.setAttribute("data-esri-loader", "loading"), n;
}
function Se(t, n, e) {
  var c;
  e && (c = Ze(t, e));
  var u = function() {
    n(t), t.removeEventListener("load", u, !1), c && t.removeEventListener("error", c, !1);
  };
  t.addEventListener("load", u, !1);
}
function Ze(t, n) {
  var e = function(c) {
    n(c.error || new Error("There was an error attempting to load ".concat(t.src))), t.removeEventListener("error", e, !1);
  };
  return t.addEventListener("error", e, !1), e;
}
function Ve() {
  return document.querySelector("script[data-esri-loader]");
}
function oe() {
  var t = window.require;
  return t && t.on;
}
function et(t) {
  t === void 0 && (t = {});
  var n = {};
  [Qe, t].forEach(function(u) {
    for (var d in u)
      Object.prototype.hasOwnProperty.call(u, d) && (n[d] = u[d]);
  });
  var e = n.version, c = n.url || Ie(e);
  return new Me.Promise(function(u, d) {
    var h = Ve();
    if (h) {
      var R = h.getAttribute("src");
      R !== c ? d(new Error("The ArcGIS API for JavaScript is already loaded (".concat(R, ")."))) : oe() ? u(h) : Se(h, u, d);
    } else if (oe())
      d(new Error("The ArcGIS API for JavaScript is already loaded."));
    else {
      var N = n.css;
      if (N) {
        var _ = N === !0;
        Ke(_ ? e : N, n.insertCssBefore);
      }
      h = Xe(c), Se(h, function() {
        h.setAttribute("data-esri-loader", "loaded"), u(h);
      }, d), document.body.appendChild(h);
    }
  });
}
function Ee(t) {
  return new Me.Promise(function(n, e) {
    var c = window.require.on("error", e);
    window.require(t, function() {
      for (var u = [], d = 0; d < arguments.length; d++)
        u[d] = arguments[d];
      c.remove(), n(u);
    });
  });
}
function tt(t, n) {
  if (n === void 0 && (n = {}), oe())
    return Ee(t);
  var e = Ve(), c = e && e.getAttribute("src");
  return !n.url && c && (n.url = c), et(n).then(function() {
    return Ee(t);
  });
}
const nt = (t, n) => t.replace(/\(\?\<(.+?)\>[^)]*\)/g, (e, c) => n[c]), Ce = function(t, n) {
  if (!n) return null;
  const e = n.portalItem && n.portalItem.id;
  return e ? `item:${e}` : !t || !n.id ? null : t.fromId(n.id) ? n.id : null;
}, ot = async function(t, n, e) {
  if (!n) return null;
  if (n.startsWith("item:")) {
    const u = new t({ portalItem: { id: n.slice(5) } });
    try {
      return await u.load(), u;
    } catch (d) {
      return console.warn(
        `${e}: basemap portal item "${n.slice(5)}" from the URL could not be loaded, keeping the current basemap`,
        d
      ), null;
    }
  }
  const c = t.fromId(n);
  return c || console.warn(
    `${e}: unknown basemap "${n}" in the URL, keeping the current basemap`
  ), c;
}, S = (t, n = {}, e = "") => {
  const c = document.createElement(t);
  for (let u in n)
    c.setAttribute(u, n[u]);
  return c.innerHTML = e, c;
}, rt = (t, n) => (document.getElementById(t) || document.getElementsByTagName("head")[0].prepend(S("STYLE", { type: "text/css" }, n)), !0), at = function(t = {}) {
  rt("geocam-argis-map", `
      .geocam-auto-rotate-checkbox, .geocam-auto-brightness-checkbox {
        display: none;
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
  let e, c, u = [], d, h, R, N, _, re, J, T, q, H, ae, B, se, Y, ie, ce, le, ue, me, de, Ne, ge, Te, W, Q, j, X, fe = !0, he;
  const { sceneView: s, prevNextPlugin: Z, widgets: it, expands: ct, src: ee } = t, pe = function(o, r, i, a, l) {
    return 1 / Math.sqrt(s.scale / 70), {
      geometry: {
        type: "point",
        latitude: i,
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
            tilt: l,
            heading: o,
            material: {
              color: "rgba(0,0,255,0.6)"
            }
          }
        ]
      }
    };
  };
  let L = pe(0, 0, 0, 0, 90);
  const C = function(o, r, i, a, l) {
    if (console.log("update fov", o, r, i, a, l), d && (d.removeAll(), e.visible() && o !== null))
      if (T()) {
        const f = s.camera.clone();
        (i || i === 0) && (f.position.latitude = i), (r || r === 0) && (f.position.longitude = r), (a || a === 0) && (f.position.z = a), (o || o === 0) && (f.heading = o), (l || l === 0) && (f.tilt = 90 - l), f.fov = parseInt(e.fov()), console.log("camera fov", f), s.goTo(f, { animate: !1 }), s.camera.fov = e.fov();
      } else
        L = pe(
          o || 0,
          r || L.geometry.longitude,
          i || L.geometry.latitude,
          a || L.geometry.z,
          l ? 90 - l : L.symbol.symbolLayers[0].tilt
        ), d.add(L), (i || i === 0) && he([r, i]);
  }, be = function(o, r, i = {}) {
    const a = new RegExp(r, "i");
    let l = a.test(o.name) || a.test(o.alias);
    return l && i.description && (l = !!o.description), l;
  }, ve = function(o) {
    if (o) {
      var r = document.createElement("textarea");
      return r.innerHTML = o, r.value;
    } else
      return "https://image.geocam.xyz/";
  }, He = (o, r) => {
    const i = o.base;
    if (o.filenames)
      return JSON.parse(r[o.filenames]).map((a) => Array.isArray(a) ? a.map((l) => /^https?:\/\//i.test(l) ? a : `${i}${l}`) : /^https?:\/\//i.test(a) ? a : `${i}${a}`);
    {
      const a = r[o.capture].split(".")[0], l = a.split("/").pop(), f = JSON.parse(r[o.lengths]), p = JSON.parse(r[o.offsets]);
      return f.map((w, M) => {
        const A = encodeURIComponent(
          `https://s3.us-west-004.backblazeb2.com/gc-raw-surveys-archive/${a}_${M}.tar`
        );
        return `${i}${l}/${M}/${r[o.shot]}.jpg?offset=${p[M]}&length=${w}&container=${A}`;
      });
    }
  }, Be = function(o) {
    return u.findIndex((r) => r.layer == o.layer);
  }, $e = function(o) {
    if (e.label) {
      const { capture: r, utc_time: i, shot: a } = o, l = new Date(i);
      e.label(`${l.toLocaleString()}`);
    }
  };
  let we;
  const te = function(o, r) {
    const i = Y();
    console.log("shotclick with viewlock", i);
    const a = u[r], l = o.attributes[a.shot];
    we = l, e.shot(l), Z && (Z.prev(o.attributes.prev), Z.next(o.attributes.next));
    const f = [0, 1, 2].map(
      (A) => nt(a.calibrationBase, {
        camera: A,
        rig_id: o.attributes[a.rigId],
        calibration: o.attributes[a.calibration]
      })
    ), p = o.attributes[a.yaw], v = o.attributes[a.rotation], w = H() && a.brightness ? o.attributes[a.brightness] : null;
    ae = w;
    const M = He(a, o.attributes);
    if (i) {
      const A = bearing(o.geometry, i);
      e.facing(A);
    }
    e.show(M, p, f, v, w), C(
      e.facing(),
      o.geometry.longitude,
      o.geometry.latitude,
      o.geometry.z,
      e.horizon()
    ), $e(o.attributes);
  };
  let ye;
  const Fe = 111320, Ge = 150, Ue = function() {
    let o = null;
    const r = s.extent;
    if (r && isFinite(r.xmin)) {
      const a = r.spatialReference && r.spatialReference.isWebMercator && X ? X.webMercatorToGeographic(r) : r;
      a && isFinite(a.xmin) && (o = [a.xmin, a.ymin, a.xmax, a.ymax]);
    }
    const i = s.camera && s.camera.position;
    if (i && isFinite(i.longitude) && isFinite(i.latitude)) {
      const l = Math.max(Ge, (s.scale || 0) / 10) / Fe, f = l / Math.max(0.01, Math.cos(i.latitude * Math.PI / 180)), p = [
        i.longitude - f,
        i.latitude - l,
        i.longitude + f,
        i.latitude + l
      ];
      o = o ? [
        Math.min(o[0], p[0]),
        Math.min(o[1], p[1]),
        Math.max(o[2], p[2]),
        Math.max(o[3], p[3])
      ] : p;
    }
    return o;
  }, Le = function(o, r, i, a) {
    clearTimeout(ye), ye = setTimeout(() => {
      const l = isFinite(o) ? o : s.scale, f = Math.ceil(l / 500), p = Ue(), v = p ? `mod(id,${f}) = 0 AND extent = ${p.join(",")},4326` : `mod(id,${f}) = 0`;
      u.forEach((w) => {
        w.layer.definitionExpression !== v && (w.layer.definitionExpression = v, console.log(
          "definition expression changed for",
          w.layer,
          v
        ));
      }), se(s.zoom), T() || C(e.facing());
    }, 500);
  }, Pe = function(o, r, i, a) {
    ge([s.center.longitude, s.center.latitude]);
  }, xe = function(o) {
    const r = Ce(j, o);
    r && W(r);
  }, Re = async function(o) {
    if (!o || !j || o === Ce(j, s.map.basemap)) return;
    const r = await ot(j, o, "arcgis-scene");
    r && (s.map.basemap = r);
  }, Je = function(o, r, i, a) {
    ie(s.camera.position.latitude), ce(s.camera.position.longitude), ue(s.camera.position.z), me(s.camera.tilt), le(s.camera.heading), de(s.camera.fov);
  };
  this.init = async function(o) {
    e = o, he = e.store("marker"), se = e.store("zoom"), ge = e.store("center"), W = e.store("basemap"), ie = e.store("camLat"), ce = e.store("camLng"), ue = e.store("camAlt"), me = e.store("camTilt"), le = e.store("camHdg"), de = e.store("camFov"), Y = e.store("viewlock"), T = e.store("autorotate"), J = S("DIV", { class: "geocam-auto-rotate" });
    const r = S("LABEL", { class: "geocam-auto-rotate-label" }), i = S("INPUT", {
      type: "checkbox",
      class: "geocam-auto-rotate-checkbox"
    }), a = S(
      "SPAN",
      { class: "geocam-auto-rotate-span geocam-viewer-control-button" },
      " Autorotate"
    );
    i.checked = T(), i.addEventListener("change", () => {
      T(i.checked);
    }), r.appendChild(i), r.appendChild(a), J.appendChild(r), e.addControl(J, "left-top"), N = T((g) => {
      J.setAttribute(
        "title",
        g ? "turn auto-rotate off" : "turn auto-rotate on"
      ), C(
        e.facing(),
        L.geometry.longitude,
        L.geometry.latitude,
        L.geometry.z,
        e.horizon()
      );
    }), H = e.store("autobrightness"), q = S("DIV", { class: "geocam-auto-brightness" });
    const l = S("LABEL", { class: "geocam-auto-brightness-label" });
    B = S("INPUT", {
      type: "checkbox",
      class: "geocam-auto-brightness-checkbox"
    });
    const f = S(
      "SPAN",
      { class: "geocam-auto-brightness-span geocam-viewer-control-button" },
      " Autobrightness"
    );
    B.disabled = !0, B.checked = H(), B.addEventListener("change", () => {
      H(B.checked);
    }), l.appendChild(B), l.appendChild(f), q.appendChild(l), e.addControl(q, "left-top"), _ = H((g) => {
      q.setAttribute(
        "title",
        g ? "turn auto-brightness off" : "turn auto-brightness on"
      ), e.reload(H() ? ae : "[1,1,1]");
    }), re = e.visible((g) => C(e.facing()));
    const [
      p,
      v,
      w,
      M,
      A
    ] = await tt(
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
    if (j = M, X = A, s.when(async () => {
      s.on("clickable", (m) => {
        fe = m;
      }), s.on("immediate-click", (m) => {
        if (!fe) return;
        const x = {
          x: m.x,
          y: m.y
        };
        if (console.log("immediate-click", m, x), c) {
          console.log("space wqas down");
          const b = s.toMap(x);
          if (Y(b), lockG && s.graphics.removeAll(), lockG = lockGraphic(b), s.graphics.add(lockG), e.visible()) {
            const I = bearing(L.geometry, b);
            e.facing(I);
          }
        } else
          s.hitTest(x).then((b) => {
            if (b.results && b.results.length > 0)
              for (var I = 0; I < b.results.length; I++) {
                const y = b.results[I].graphic, V = Be(y);
                if (V >= 0) {
                  Object.entries(y.attributes).length < 2 ? y.layer.queryFeatures({
                    objectIds: [y.attributes.id],
                    returnGeometry: !0,
                    outFields: "*",
                    where: y.layer.definitionExpression
                  }).then((K) => {
                    K.features.length > 0 && te(K.features[0], V);
                  }) : te(y, V);
                  break;
                }
              }
          });
      }), h = e.facing((m) => {
        C(m, null, null, null, e.horizon());
      }), R = e.horizon((m) => {
        C(e.facing(), null, null, null, m);
      });
      const g = new URLSearchParams(window.location.hash.substr(1)), z = g.get("center");
      z && z !== "null" && (s.center = JSON.parse(z));
      const $ = g.get("zoom");
      $ && $ !== "null" && (s.zoom = JSON.parse($));
      const k = s.camera.clone(), F = g.get("camLat");
      F && F !== "null" && (k.position.latitude = JSON.parse(F));
      const G = g.get("camLng");
      G && G !== "null" && (k.position.longitude = JSON.parse(G));
      const U = g.get("camAlt");
      U && U !== "null" && (k.position.z = JSON.parse(U));
      const O = g.get("camHdg");
      O && O !== "null" && (k.heading = JSON.parse(O));
      const P = g.get("camTilt");
      P && P !== "null" && (k.tilt = JSON.parse(P));
      const E = g.get("camFov");
      E && E !== "null" && (k.fov = JSON.parse(E)), s.goTo(k, { animate: !1 });
      const D = g.get("marker");
      if (D) {
        const m = JSON.parse(D);
        if (m) {
          const [x, b] = m;
          C(e.facing(), x, b);
        }
      }
      Q = W(Re), W() || xe(s.map.basemap), v.watch(() => s.map.basemap, xe), v.watch(() => s.scale, Le), Le(s.scale), v.watch(() => s.center, Pe), v.watch(() => s.camera.position, Je), e.shot((m) => {
        const x = parseInt(
          typeof m == "object" && m !== null ? m.id : m
        );
        x && x !== we ? (console.log("Got shot", m, "layers", u.length), u.forEach((b, I) => {
          const y = b.layer;
          e.resetProgress(), console.log("Querying layer for shot", y, x), y.queryFeatures({
            objectIds: [x],
            returnGeometry: !0,
            outFields: "*",
            where: y.definitionExpression
          }).then((V) => {
            if (console.log("Got results for layer", y, V), V.features.length > 0) {
              const K = V.features[0];
              te(K, I);
            }
          });
        })) : m || e.hide();
      });
    }), ee) {
      const g = `${ee}/0`;
      console.log("shots url is", g);
      const z = new w({
        url: g,
        definitionExpression: "mod(id,100) = 0"
        // start with agressive simplifaction - view should get scale change early on to override this
      });
      s.map.add(z), z.when((F) => {
        const G = F.fields, U = G.find((m) => be(m, "filenames")), O = G.find((m) => be(m, "calibration"));
        u.push({
          layer: z,
          shot: "id",
          filenames: "filenames",
          yaw: "yaw",
          rotation: "rotation_matrix",
          datetime: "utc_time",
          brightness: null,
          base: ve(U && U.description),
          calibration: "calibration",
          rigId: null,
          calibrationBase: ve(O.description),
          capture: "capture"
        });
        const P = {
          xmin: -5e-3,
          ymin: -5e-3,
          xmax: 5e-3,
          ymax: 5e-3
        }, E = Object.keys(P), D = {};
        for (let m = 0; m < E.length; m++)
          D[E[m]] = parseFloat(F.fullExtent[E[m]]) + P[E[m]];
        s.extent = D;
      });
      const $ = `${ee}/1`;
      console.log("points features url is", $);
      const k = new w({
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
      s.map.add(k);
    }
    d = new p({
      title: "GeoCam Field of View",
      geometryType: "point",
      spatialReference: {
        wkid: 4326
      }
    }), s.map.layers.add(d);
    var ke = function(g) {
      switch (g.key, g.key) {
        case "Escape": {
          Y(null), mapView.graphics.removeAll();
          break;
        }
        case " ":
          c = !0;
      }
    }, qe = function(g) {
      switch (g.key, g.key) {
        case " ":
          c = !1;
      }
    };
    document.addEventListener("keydown", ke), document.addEventListener("keyup", qe);
  }, this.destroy = function() {
    h(), R(), N(), _(), Ne(), Te(), Q && Q(), re(), s.map.removeLayer(d), e.wrapper.removeChild(J), e.wrapper.removeChild(q);
  };
};
class st extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("GeocamViewerArcgisScene init");
  }
  connectedCallback() {
    this.link = function(n) {
      console.log("linking to ", n);
      const e = this.getAttribute("src");
      e || console.warn("No src attribute on geocam-viewer-arcgis-scene");
      const c = this.parentNode;
      if (this.viewer = c.viewer, this.sceneView = n, this.viewer && this.viewer.plugin) {
        const u = document.getElementsByTagName(
          "geocam-viewer-prev-next-control"
        )[0], d = u && u.plugin;
        this.plugin = new at({ sceneView: n, prevNextPlugin: d, src: e }), c.viewer.plugin(this.plugin);
        const h = c.getElementsByTagName(
          "geocam-viewer-screen-shot"
        )[0];
        h && h.plugin && h.plugin.arcgisView(n);
      } else
        console.error("GeocamViewerArcgisScene must be a child of GeocamViewer");
    }, console.log("GeocamViewerArcgisScene connected");
  }
  disconnectedCallback() {
    this.plugin = null, this.viewer = null, this.sceneView = null, console.log("GeocamViewerArcgisScene disconnected");
  }
}
window.customElements.define("geocam-viewer-arcgis-scene", st);
export {
  st as GeocamViewerArcgisScene
};
