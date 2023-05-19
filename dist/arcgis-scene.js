var He = typeof window < "u";
const ge = {
  Promise: He ? window.Promise : void 0
};
var he = "4.25", Y = "next";
function pe(o) {
  if (o.toLowerCase() === Y)
    return Y;
  var a = o && o.match(/^(\d)\.(\d+)/);
  return a && {
    major: parseInt(a[1], 10),
    minor: parseInt(a[2], 10)
  };
}
function ve(o) {
  return o === void 0 && (o = he), "https://js.arcgis.com/".concat(o, "/");
}
function $e(o) {
  o === void 0 && (o = he);
  var a = ve(o), e = pe(o);
  if (e !== Y && e.major === 3) {
    var l = e.minor <= 10 ? "js/" : "";
    return "".concat(a).concat(l, "esri/css/esri.css");
  } else
    return "".concat(a, "esri/themes/light/main.css");
}
function Me(o) {
  var a = document.createElement("link");
  return a.rel = "stylesheet", a.href = o, a;
}
function Ie(o, a) {
  if (a) {
    var e = document.querySelector(a);
    e.parentNode.insertBefore(o, e);
  } else
    document.head.appendChild(o);
}
function Te(o) {
  return document.querySelector('link[href*="'.concat(o, '"]'));
}
function Be(o) {
  return !o || pe(o) ? $e(o) : o;
}
function Pe(o, a) {
  var e = Be(o), l = Te(e);
  return l || (l = Me(e), Ie(l, a)), l;
}
var Fe = {};
function Je(o) {
  var a = document.createElement("script");
  return a.type = "text/javascript", a.src = o, a.setAttribute("data-esri-loader", "loading"), a;
}
function de(o, a, e) {
  var l;
  e && (l = Ge(o, e));
  var f = function() {
    a(o), o.removeEventListener("load", f, !1), l && o.removeEventListener("error", l, !1);
  };
  o.addEventListener("load", f, !1);
}
function Ge(o, a) {
  var e = function(l) {
    a(l.error || new Error("There was an error attempting to load ".concat(o.src))), o.removeEventListener("error", e, !1);
  };
  return o.addEventListener("error", e, !1), e;
}
function be() {
  return document.querySelector("script[data-esri-loader]");
}
function Z() {
  var o = window.require;
  return o && o.on;
}
function Re(o) {
  o === void 0 && (o = {});
  var a = {};
  [Fe, o].forEach(function(f) {
    for (var h in f)
      Object.prototype.hasOwnProperty.call(f, h) && (a[h] = f[h]);
  });
  var e = a.version, l = a.url || ve(e);
  return new ge.Promise(function(f, h) {
    var b = be();
    if (b) {
      var F = b.getAttribute("src");
      F !== l ? h(new Error("The ArcGIS API for JavaScript is already loaded (".concat(F, ")."))) : Z() ? f(b) : de(b, f, h);
    } else if (Z())
      h(new Error("The ArcGIS API for JavaScript is already loaded."));
    else {
      var $ = a.css;
      if ($) {
        var R = $ === !0;
        Pe(R ? e : $, a.insertCssBefore);
      }
      b = Je(l), de(b, function() {
        b.setAttribute("data-esri-loader", "loaded"), f(b);
      }, h), document.body.appendChild(b);
    }
  });
}
function me(o) {
  return new ge.Promise(function(a, e) {
    var l = window.require.on("error", e);
    window.require(o, function() {
      for (var f = [], h = 0; h < arguments.length; h++)
        f[h] = arguments[h];
      l.remove(), a(f);
    });
  });
}
function Ue(o, a) {
  if (a === void 0 && (a = {}), Z())
    return me(o);
  var e = be(), l = e && e.getAttribute("src");
  return !a.url && l && (a.url = l), Re(a).then(function() {
    return me(o);
  });
}
const qe = (o, a) => o.replace(/\(\?\<(.+?)\>[^)]*\)/g, (e, l) => a[l]), C = (o, a = {}, e = "") => {
  const l = document.createElement(o);
  for (let f in a)
    l.setAttribute(f, a[f]);
  return l.innerHTML = e, l;
}, Oe = (o, a) => (document.getElementById(o) || document.getElementsByTagName("head")[0].prepend(C("STYLE", { type: "text/css" }, a)), !0), _e = function(o = {}) {
  Oe("geocam-argis-map", `
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
  let e, l, f, h, b, F, $, R, J, M, G, I, Q, z, X, K, W, ee, te, oe, ne, we, re, ye, ae = !0, se;
  const { sceneView: u, prevNextPlugin: ie, widgets: De, expands: je } = o, ce = function(t, n, r, s, i) {
    return 1 / Math.sqrt(u.scale / 70), {
      geometry: {
        type: "point",
        latitude: r,
        longitude: n,
        z: s
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
            tilt: i,
            heading: t,
            material: {
              color: "rgba(0,0,255,0.6)"
            }
          }
        ]
      }
    };
  };
  let k = ce(0, 0, 0, 0, 90);
  const E = function(t, n, r, s, i) {
    if (console.log("update fov", t, n, r, s, i), f && (f.removeAll(), e.visible() && t !== null))
      if (M()) {
        const d = u.camera.clone();
        (r || r === 0) && (d.position.latitude = r), (n || n === 0) && (d.position.longitude = n), (s || s === 0) && (d.position.z = s), (t || t === 0) && (d.heading = t), (i || i === 0) && (d.tilt = 90 - i), d.fov = parseInt(e.fov()), console.log("camera fov", d), u.goTo(d, { animate: !1 }), u.camera.fov = e.fov();
      } else
        k = ce(
          t || 0,
          n || k.geometry.longitude,
          r || k.geometry.latitude,
          s || k.geometry.z,
          i ? 90 - i : k.symbol.symbolLayers[0].tilt
        ), f.add(k), (r || r === 0) && se([n, r]);
  }, Le = function(t) {
    const n = t.fields, r = function(c, N, m = {}) {
      const y = new RegExp(N, "i");
      let v = y.test(c.name) || y.test(c.alias);
      return v && m.description && (v = !!c.description), v;
    }, s = function(c) {
      if (c) {
        var N = document.createElement("textarea");
        return N.innerHTML = c, N.value;
      } else
        return "https://image.geocam.xyz/";
    }, i = n.find((c) => r(c, "shot"));
    if (i)
      console.log("shot field is", i);
    else
      return console.info(`Layer ${t.title} not geocam - no shot field`), !1;
    const d = n.find((c) => r(c, "filenames"));
    let p, L;
    if (!d && (p = n.find((c) => r(c, "image_offsets")), L = n.find((c) => r(c, "image_lengths")), !p && !L))
      return console.info(
        `Layer ${t.title} not geocam - filenames or image offsets/lengths fields required`
      ), !1;
    const g = !!d, w = n.find((c) => r(c, "yaw"));
    if (!w)
      return console.info(`Layer ${t.title} not geocam - no yaw field`), !1;
    const x = n.find((c) => r(c, "rotation"));
    if (!x)
      return console.info(`Layer ${t.title} not geocam - no rotation field`), !1;
    const S = n.find((c) => r(c, "time"));
    if (!S)
      return console.info(`Layer ${t.title} not geocam - no datetime field`), !1;
    const V = n.find(
      (c) => r(c, "calibration", { description: !0 })
    );
    if (!V)
      return console.info(`Layer ${t.title} not geocam - no calibration field`), !1;
    const T = n.find((c) => r(c, "capture"));
    if (!T)
      return console.info(`Layer ${t.title} not geocam - no capture field`), !1;
    const B = n.find((c) => r(c, "rig_id")), A = n.find((c) => r(c, "brightness_scalar"));
    return A && (z.disabled = !1), {
      layer: t,
      shot: i.name,
      filenames: g ? d.name : null,
      offsets: g ? null : p.name,
      lengths: g ? null : L.name,
      yaw: w.name,
      rotation: x.name,
      datetime: S.name,
      brightness: A ? A.name : null,
      base: s(d && d.description),
      calibration: V.name,
      rigId: B ? B.name : null,
      calibrationBase: s(V.description),
      capture: T.name
    };
  }, Se = (t, n) => {
    const r = t.base;
    if (t.filenames)
      return JSON.parse(n[t.filenames]).map((s) => Array.isArray(s) ? s.map((i) => /^https?:\/\//i.test(i) ? s : `${r}${i}`) : /^https?:\/\//i.test(s) ? s : `${r}${s}`);
    {
      const s = n[t.capture].split(".")[0], i = s.split("/").pop(), d = JSON.parse(n[t.lengths]), p = JSON.parse(n[t.offsets]);
      return d.map((g, w) => {
        const x = encodeURIComponent(
          `https://s3.us-west-004.backblazeb2.com/gc-raw-surveys-archive/${s}_${w}.tar`
        );
        return `${r}${i}/${w}/${n[t.shot]}.jpg?offset=${p[w]}&length=${g}&container=${x}`;
      });
    }
  }, ke = async function(t, n) {
    const r = t.layer, s = t.attributes[n.capture], i = await r.queryFeatures({
      maxRecordCountFactor: 5,
      where: `capture='${s}'`,
      geometry: t.geometry,
      distance: 10,
      spatialRelationship: "intersects",
      returnGeometry: !0,
      inSpatialReference: { wkid: "4326" },
      outSpatialReference: { wkid: "4326" },
      orderByFields: n.shot,
      outFields: ["*"].concat(
        n.filenames ? [n.filenames] : [n.offsets, n.lengths]
      ).concat(n.brigtness ? [n.brigtness] : [])
    });
    ie.shots(i.features);
  };
  let le = !1;
  const ue = function(t) {
    return t.layers.items.map((n) => n.layers ? ue(n) : n);
  }, Ce = function(t) {
    return ue(t).flat();
  }, xe = async function(t) {
    let n = [];
    const r = Ce(t.map);
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      if (await t.whenLayerView(i), i.outFields = ["*"], i.editingEnabled && (le = !0), i.fields) {
        i.fields.map((p) => p.name);
        const d = Le(i);
        d && n.push(d);
      }
    }
    return console.log("done editable checks", le), n;
  }, fe = function(t) {
    return l.findIndex((n) => n.layer == t.layer);
  }, ze = function(t) {
    if (e.label) {
      const { capture: n, utc_time: r, shot: s } = t, i = new Date(r);
      e.label(`${i.toLocaleString()}`);
    }
  };
  let U, q;
  const j = function(t, n) {
    const r = l[n];
    ke(t, r);
    const s = t.attributes[r.shot];
    U = t.attributes[r.capture], q = s, console.log("shot click set capture", U), e.capture(U), console.log("shot click set shot", q), e.shot(q);
    const i = [0, 1, 2].map(
      (w) => qe(r.calibrationBase, {
        camera: w,
        rig_id: t.attributes[r.rigId],
        calibration: t.attributes[r.calibration]
      })
    ), d = t.attributes[r.yaw], p = t.attributes[r.rotation], L = I() && r.brightness ? t.attributes[r.brightness] : null;
    Q = L;
    const g = Se(r, t.attributes);
    e.show(g, d, i, p, L), E(
      e.facing(),
      t.geometry.longitude,
      t.geometry.latitude,
      t.geometry.z,
      e.horizon()
    ), ze(t.attributes);
  }, Ee = function(t, n, r, s) {
    X(u.zoom), M() || E(e.facing());
  }, Ve = function(t, n, r, s) {
    re([u.center.longitude, u.center.latitude]);
  }, Ae = function(t, n, r, s) {
    K(u.camera.position.latitude), W(u.camera.position.longitude), te(u.camera.position.z), oe(u.camera.tilt), ee(u.camera.heading), ne(u.camera.fov);
  };
  this.init = function(t) {
    e = t, se = e.store("marker"), X = e.store("zoom"), re = e.store("center"), K = e.store("camLat"), W = e.store("camLng"), te = e.store("camAlt"), oe = e.store("camTilt"), ee = e.store("camHdg"), ne = e.store("camFov"), M = e.store("autorotate"), J = C("DIV", { class: "geocam-auto-rotate" });
    const n = C("LABEL", { class: "geocam-auto-rotate-label" }), r = C("INPUT", {
      type: "checkbox",
      class: "geocam-auto-rotate-checkbox"
    }), s = C(
      "SPAN",
      { class: "geocam-auto-rotate-span geocam-viewer-control-button" },
      " Autorotate"
    );
    r.checked = M(), r.addEventListener("change", () => {
      M(r.checked);
    }), n.appendChild(r), n.appendChild(s), J.appendChild(n), e.addControl(J, "left-top"), F = M((p) => {
      J.setAttribute(
        "title",
        p ? "turn auto-rotate off" : "turn auto-rotate on"
      ), E(
        e.facing(),
        k.geometry.longitude,
        k.geometry.latitude,
        k.geometry.z,
        e.horizon()
      );
    }), I = e.store("autobrightness"), G = C("DIV", { class: "geocam-auto-brightness" });
    const i = C("LABEL", { class: "geocam-auto-brightness-label" });
    z = C("INPUT", {
      type: "checkbox",
      class: "geocam-auto-brightness-checkbox"
    });
    const d = C(
      "SPAN",
      { class: "geocam-auto-brightness-span geocam-viewer-control-button" },
      " Autobrightness"
    );
    z.disabled = !0, z.checked = I(), z.addEventListener("change", () => {
      I(z.checked);
    }), i.appendChild(z), i.appendChild(d), G.appendChild(i), e.addControl(G, "left-top"), $ = I((p) => {
      G.setAttribute(
        "title",
        p ? "turn auto-brightness off" : "turn auto-brightness on"
      ), e.reload(I() ? Q : "[1,1,1]");
    }), R = e.visible((p) => E(e.facing())), u.when(async () => {
      l = await xe(u), u.on("clickable", (m) => {
        ae = m;
      }), u.on("immediate-click", (m) => {
        if (!ae)
          return;
        const y = {
          x: m.x,
          y: m.y
        };
        u.hitTest(y).then((v) => {
          if (v.results && v.results.length > 0)
            for (var H = 0; H < v.results.length; H++) {
              const D = v.results[H].graphic, P = fe(D);
              if (P >= 0) {
                j(D, P);
                break;
              }
            }
        });
      });
      const [p, L] = await Ue(
        ["esri/layers/GraphicsLayer", "esri/core/reactiveUtils"],
        {
          version: "4.26"
        }
      );
      f = new p({
        title: "GeoCam Field of View",
        geometryType: "point",
        spatialReference: {
          wkid: 4326
        }
      }), u.map.layers.add(f), h = e.facing((m) => {
        E(m, null, null, null, e.horizon());
      }), b = e.horizon((m) => {
        E(e.facing(), null, null, null, m);
      });
      const g = new URLSearchParams(window.location.hash.substr(1)), w = g.get("center");
      w && w !== "null" && (u.center = JSON.parse(w));
      const x = g.get("zoom");
      x && x !== "null" && (u.zoom = JSON.parse(x));
      const S = u.camera.clone(), V = g.get("camLat");
      V && V !== "null" && (S.position.latitude = JSON.parse(V));
      const T = g.get("camLng");
      T && T !== "null" && (S.position.longitude = JSON.parse(T));
      const B = g.get("camAlt");
      B && B !== "null" && (S.position.z = JSON.parse(B));
      const A = g.get("camHdg");
      A && A !== "null" && (S.heading = JSON.parse(A));
      const O = g.get("camTilt");
      O && O !== "null" && (S.tilt = JSON.parse(O));
      const c = g.get("camFov");
      c && c !== "null" && (S.fov = JSON.parse(c)), u.goTo(S, { animate: !1 });
      const N = g.get("marker");
      if (N) {
        const m = JSON.parse(N);
        if (m) {
          const [y, v] = m;
          E(e.facing(), y, v);
        }
      }
      L.watch(() => u.scale, Ee), L.watch(() => u.center, Ve), L.watch(() => u.camera.position, Ae), e.shot((m) => {
        const y = e.capture();
        if (m && y && (m !== q || y !== U)) {
          console.log("Got shot", m);
          const v = ie.currentShot();
          if (v && v.attributes.shot === m && v.attributes.capture === y) {
            const H = fe(v);
            j(v, H);
          } else
            l.forEach((H, D) => {
              const P = H.layer;
              e.resetProgress(), console.log("Querying layer for shot", P, m, y), P.queryFeatures({
                where: `shot='${m}' AND capture='${y}'`,
                returnGeometry: !0,
                returnZ: !0,
                outSpatialReference: { wkid: "4326" },
                outFields: "*"
              }).then((_) => {
                if (console.log("Got results for layer", P, _), _.features.length > 0) {
                  const Ne = _.features[0];
                  j(Ne, D);
                }
              });
            });
        } else
          m || e.hide();
      });
    });
  }, this.destroy = function() {
    h(), b(), F(), $(), we(), ye(), R(), u.map.removeLayer(f), e.wrapper.removeChild(J), e.wrapper.removeChild(G);
  };
};
export {
  _e as arcgisScene
};
