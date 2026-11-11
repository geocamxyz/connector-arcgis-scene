var Ue = typeof window < "u";
const Ce = {
  Promise: Ue ? window.Promise : void 0
};
var ze = "4.25", te = "next";
function Ae(t) {
  if (t.toLowerCase() === te)
    return te;
  var n = t && t.match(/^(\d)\.(\d+)/);
  return n && {
    major: parseInt(n[1], 10),
    minor: parseInt(n[2], 10)
  };
}
function Ve(t) {
  return t === void 0 && (t = ze), "https://js.arcgis.com/".concat(t, "/");
}
function Pe(t) {
  t === void 0 && (t = ze);
  var n = Ve(t), e = Ae(t);
  if (e !== te && e.major === 3) {
    var a = e.minor <= 10 ? "js/" : "";
    return "".concat(n).concat(a, "esri/css/esri.css");
  } else
    return "".concat(n, "esri/themes/light/main.css");
}
function Je(t) {
  var n = document.createElement("link");
  return n.rel = "stylesheet", n.href = t, n;
}
function qe(t, n) {
  if (n) {
    var e = document.querySelector(n);
    e.parentNode.insertBefore(t, e);
  } else
    document.head.appendChild(t);
}
function Re(t) {
  return document.querySelector('link[href*="'.concat(t, '"]'));
}
function Oe(t) {
  return !t || Ae(t) ? Pe(t) : t;
}
function je(t, n) {
  var e = Oe(t), a = Re(e);
  return a || (a = Je(e), qe(a, n)), a;
}
var De = {};
function Ye(t) {
  var n = document.createElement("script");
  return n.type = "text/javascript", n.src = t, n.setAttribute("data-esri-loader", "loading"), n;
}
function xe(t, n, e) {
  var a;
  e && (a = _e(t, e));
  var l = function() {
    n(t), t.removeEventListener("load", l, !1), a && t.removeEventListener("error", a, !1);
  };
  t.addEventListener("load", l, !1);
}
function _e(t, n) {
  var e = function(a) {
    n(a.error || new Error("There was an error attempting to load ".concat(t.src))), t.removeEventListener("error", e, !1);
  };
  return t.addEventListener("error", e, !1), e;
}
function Ne() {
  return document.querySelector("script[data-esri-loader]");
}
function ne() {
  var t = window.require;
  return t && t.on;
}
function Ke(t) {
  t === void 0 && (t = {});
  var n = {};
  [De, t].forEach(function(l) {
    for (var d in l)
      Object.prototype.hasOwnProperty.call(l, d) && (n[d] = l[d]);
  });
  var e = n.version, a = n.url || Ve(e);
  return new Ce.Promise(function(l, d) {
    var f = Ne();
    if (f) {
      var J = f.getAttribute("src");
      J !== a ? d(new Error("The ArcGIS API for JavaScript is already loaded (".concat(J, ")."))) : ne() ? l(f) : xe(f, l, d);
    } else if (ne())
      d(new Error("The ArcGIS API for JavaScript is already loaded."));
    else {
      var T = n.css;
      if (T) {
        var Y = T === !0;
        je(Y ? e : T, n.insertCssBefore);
      }
      f = Ye(a), xe(f, function() {
        f.setAttribute("data-esri-loader", "loaded"), l(f);
      }, d), document.body.appendChild(f);
    }
  });
}
function Se(t) {
  return new Ce.Promise(function(n, e) {
    var a = window.require.on("error", e);
    window.require(t, function() {
      for (var l = [], d = 0; d < arguments.length; d++)
        l[d] = arguments[d];
      a.remove(), n(l);
    });
  });
}
function Qe(t, n) {
  if (n === void 0 && (n = {}), ne())
    return Se(t);
  var e = Ne(), a = e && e.getAttribute("src");
  return !n.url && a && (n.url = a), Ke(n).then(function() {
    return Se(t);
  });
}
const We = (t, n) => t.replace(/\(\?\<(.+?)\>[^)]*\)/g, (e, a) => n[a]), Ee = function(t, n) {
  if (!n) return null;
  const e = n.portalItem && n.portalItem.id;
  return e ? `item:${e}` : !t || !n.id ? null : t.fromId(n.id) ? n.id : null;
}, Xe = async function(t, n, e) {
  if (!n) return null;
  if (n.startsWith("item:")) {
    const l = new t({ portalItem: { id: n.slice(5) } });
    try {
      return await l.load(), l;
    } catch (d) {
      return console.warn(
        `${e}: basemap portal item "${n.slice(5)}" from the URL could not be loaded, keeping the current basemap`,
        d
      ), null;
    }
  }
  const a = t.fromId(n);
  return a || console.warn(
    `${e}: unknown basemap "${n}" in the URL, keeping the current basemap`
  ), a;
}, E = (t, n = {}, e = "") => {
  const a = document.createElement(t);
  for (let l in n)
    a.setAttribute(l, n[l]);
  return a.innerHTML = e, a;
}, Ze = (t, n) => (document.getElementById(t) || document.getElementsByTagName("head")[0].prepend(E("STYLE", { type: "text/css" }, n)), !0), et = function(t = {}) {
  Ze("geocam-argis-map", `
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
  let e, a, l = [], d, f, J, T, Y, oe, q, $, R, M, re, H, ae, _, se, ie, ce, le, ue, me, Ie, de, Te, K, W, O, ge = !0, fe;
  const { sceneView: r, prevNextPlugin: X, widgets: nt, expands: ot, src: Z } = t, he = function(o, s, c, i, m) {
    return 1 / Math.sqrt(r.scale / 70), {
      geometry: {
        type: "point",
        latitude: c,
        longitude: s,
        z: i
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
            tilt: m,
            heading: o,
            material: {
              color: "rgba(0,0,255,0.6)"
            }
          }
        ]
      }
    };
  };
  let L = he(0, 0, 0, 0, 90);
  const z = function(o, s, c, i, m) {
    if (console.log("update fov", o, s, c, i, m), d && (d.removeAll(), e.visible() && o !== null))
      if ($()) {
        const h = r.camera.clone();
        (c || c === 0) && (h.position.latitude = c), (s || s === 0) && (h.position.longitude = s), (i || i === 0) && (h.position.z = i), (o || o === 0) && (h.heading = o), (m || m === 0) && (h.tilt = 90 - m), h.fov = parseInt(e.fov()), console.log("camera fov", h), r.goTo(h, { animate: !1 }), r.camera.fov = e.fov();
      } else
        L = he(
          o || 0,
          s || L.geometry.longitude,
          c || L.geometry.latitude,
          i || L.geometry.z,
          m ? 90 - m : L.symbol.symbolLayers[0].tilt
        ), d.add(L), (c || c === 0) && fe([s, c]);
  }, pe = function(o, s, c = {}) {
    const i = new RegExp(s, "i");
    let m = i.test(o.name) || i.test(o.alias);
    return m && c.description && (m = !!o.description), m;
  }, ve = function(o) {
    if (o) {
      var s = document.createElement("textarea");
      return s.innerHTML = o, s.value;
    } else
      return "https://image.geocam.xyz/";
  }, $e = (o, s) => {
    const c = o.base;
    if (o.filenames)
      return JSON.parse(s[o.filenames]).map((i) => Array.isArray(i) ? i.map((m) => /^https?:\/\//i.test(m) ? i : `${c}${m}`) : /^https?:\/\//i.test(i) ? i : `${c}${i}`);
    {
      const i = s[o.capture].split(".")[0], m = i.split("/").pop(), h = JSON.parse(s[o.lengths]), v = JSON.parse(s[o.offsets]);
      return h.map((b, w) => {
        const A = encodeURIComponent(
          `https://s3.us-west-004.backblazeb2.com/gc-raw-surveys-archive/${i}_${w}.tar`
        );
        return `${c}${m}/${w}/${s[o.shot]}.jpg?offset=${v[w]}&length=${b}&container=${A}`;
      });
    }
  }, Me = function(o) {
    return l.findIndex((s) => s.layer == o.layer);
  }, He = function(o) {
    if (e.label) {
      const { capture: s, utc_time: c, shot: i } = o, m = new Date(c);
      e.label(`${m.toLocaleString()}`);
    }
  };
  let be;
  const ee = function(o, s) {
    const c = _();
    console.log("shotclick with viewlock", c);
    const i = l[s], m = o.attributes[i.shot];
    be = m, e.shot(m), X && (X.prev(o.attributes.prev), X.next(o.attributes.next));
    const h = [0, 1, 2].map(
      (A) => We(i.calibrationBase, {
        camera: A,
        rig_id: o.attributes[i.rigId],
        calibration: o.attributes[i.calibration]
      })
    ), v = o.attributes[i.yaw], x = o.attributes[i.rotation], b = M() && i.brightness ? o.attributes[i.brightness] : null;
    re = b;
    const w = $e(i, o.attributes);
    if (c) {
      const A = bearing(o.geometry, c);
      e.facing(A);
    }
    e.show(w, v, h, x, b), z(
      e.facing(),
      o.geometry.longitude,
      o.geometry.latitude,
      o.geometry.z,
      e.horizon()
    ), He(o.attributes);
  };
  let we;
  const ye = function(o, s, c, i) {
    clearTimeout(we), we = setTimeout(() => {
      const h = Math.ceil(o / 500), v = r.extent, x = `${v.xmin},${v.ymin},${v.xmax},${v.ymax},${v.spatialReference.wkid}`, b = `mod(id,${h}) = 0 AND extent = ${x}`;
      l.forEach((w) => {
        w.layer.definitionExpression !== b && (w.layer.definitionExpression = b, console.log(
          "definition expression changed for",
          w.layer,
          b
        ));
      }), ae(r.zoom), $() || z(e.facing());
    }, 500);
  }, Be = function(o, s, c, i) {
    de([r.center.longitude, r.center.latitude]);
  }, Le = function(o) {
    const s = Ee(O, o);
    s && K(s);
  }, Ge = async function(o) {
    if (!o || !O || o === Ee(O, r.map.basemap)) return;
    const s = await Xe(O, o, "arcgis-scene");
    s && (r.map.basemap = s);
  }, Fe = function(o, s, c, i) {
    se(r.camera.position.latitude), ie(r.camera.position.longitude), le(r.camera.position.z), ue(r.camera.tilt), ce(r.camera.heading), me(r.camera.fov);
  };
  this.init = async function(o) {
    e = o, fe = e.store("marker"), ae = e.store("zoom"), de = e.store("center"), K = e.store("basemap"), se = e.store("camLat"), ie = e.store("camLng"), le = e.store("camAlt"), ue = e.store("camTilt"), ce = e.store("camHdg"), me = e.store("camFov"), _ = e.store("viewlock"), $ = e.store("autorotate"), q = E("DIV", { class: "geocam-auto-rotate" });
    const s = E("LABEL", { class: "geocam-auto-rotate-label" }), c = E("INPUT", {
      type: "checkbox",
      class: "geocam-auto-rotate-checkbox"
    }), i = E(
      "SPAN",
      { class: "geocam-auto-rotate-span geocam-viewer-control-button" },
      " Autorotate"
    );
    c.checked = $(), c.addEventListener("change", () => {
      $(c.checked);
    }), s.appendChild(c), s.appendChild(i), q.appendChild(s), e.addControl(q, "left-top"), T = $((g) => {
      q.setAttribute(
        "title",
        g ? "turn auto-rotate off" : "turn auto-rotate on"
      ), z(
        e.facing(),
        L.geometry.longitude,
        L.geometry.latitude,
        L.geometry.z,
        e.horizon()
      );
    }), M = e.store("autobrightness"), R = E("DIV", { class: "geocam-auto-brightness" });
    const m = E("LABEL", { class: "geocam-auto-brightness-label" });
    H = E("INPUT", {
      type: "checkbox",
      class: "geocam-auto-brightness-checkbox"
    });
    const h = E(
      "SPAN",
      { class: "geocam-auto-brightness-span geocam-viewer-control-button" },
      " Autobrightness"
    );
    H.disabled = !0, H.checked = M(), H.addEventListener("change", () => {
      M(H.checked);
    }), m.appendChild(H), m.appendChild(h), R.appendChild(m), e.addControl(R, "left-top"), Y = M((g) => {
      R.setAttribute(
        "title",
        g ? "turn auto-brightness off" : "turn auto-brightness on"
      ), e.reload(M() ? re : "[1,1,1]");
    }), oe = e.visible((g) => z(e.facing()));
    const [v, x, b, w] = await Qe(
      [
        "esri/layers/GraphicsLayer",
        "esri/core/reactiveUtils",
        "esri/layers/FeatureLayer",
        "esri/Basemap"
      ],
      {
        version: "4.26"
      }
    );
    if (O = w, r.when(async () => {
      r.on("clickable", (u) => {
        ge = u;
      }), r.on("immediate-click", (u) => {
        if (!ge) return;
        const k = {
          x: u.x,
          y: u.y
        };
        if (console.log("immediate-click", u, k), a) {
          console.log("space wqas down");
          const p = r.toMap(k);
          if (_(p), lockG && r.graphics.removeAll(), lockG = lockGraphic(p), r.graphics.add(lockG), e.visible()) {
            const N = bearing(L.geometry, p);
            e.facing(N);
          }
        } else
          r.hitTest(k).then((p) => {
            if (p.results && p.results.length > 0)
              for (var N = 0; N < p.results.length; N++) {
                const y = p.results[N].graphic, I = Me(y);
                if (I >= 0) {
                  Object.entries(y.attributes).length < 2 ? y.layer.queryFeatures({
                    objectIds: [y.attributes.id],
                    returnGeometry: !0,
                    outFields: "*",
                    where: y.layer.definitionExpression
                  }).then((Q) => {
                    Q.features.length > 0 && ee(Q.features[0], I);
                  }) : ee(y, I);
                  break;
                }
              }
          });
      }), f = e.facing((u) => {
        z(u, null, null, null, e.horizon());
      }), J = e.horizon((u) => {
        z(e.facing(), null, null, null, u);
      });
      const g = new URLSearchParams(window.location.hash.substr(1)), V = g.get("center");
      V && V !== "null" && (r.center = JSON.parse(V));
      const B = g.get("zoom");
      B && B !== "null" && (r.zoom = JSON.parse(B));
      const S = r.camera.clone(), G = g.get("camLat");
      G && G !== "null" && (S.position.latitude = JSON.parse(G));
      const F = g.get("camLng");
      F && F !== "null" && (S.position.longitude = JSON.parse(F));
      const U = g.get("camAlt");
      U && U !== "null" && (S.position.z = JSON.parse(U));
      const j = g.get("camHdg");
      j && j !== "null" && (S.heading = JSON.parse(j));
      const P = g.get("camTilt");
      P && P !== "null" && (S.tilt = JSON.parse(P));
      const C = g.get("camFov");
      C && C !== "null" && (S.fov = JSON.parse(C)), r.goTo(S, { animate: !1 });
      const D = g.get("marker");
      if (D) {
        const u = JSON.parse(D);
        if (u) {
          const [k, p] = u;
          z(e.facing(), k, p);
        }
      }
      W = K(Ge), K() || Le(r.map.basemap), x.watch(() => r.map.basemap, Le), x.watch(() => r.scale, ye), ye(r.scale), x.watch(() => r.center, Be), x.watch(() => r.camera.position, Fe), e.shot((u) => {
        const k = parseInt(
          typeof u == "object" && u !== null ? u.id : u
        );
        k && k !== be ? (console.log("Got shot", u, "layers", l.length), l.forEach((p, N) => {
          const y = p.layer;
          e.resetProgress(), console.log("Querying layer for shot", y, k), y.queryFeatures({
            objectIds: [k],
            returnGeometry: !0,
            outFields: "*",
            where: y.definitionExpression
          }).then((I) => {
            if (console.log("Got results for layer", y, I), I.features.length > 0) {
              const Q = I.features[0];
              ee(Q, N);
            }
          });
        })) : u || e.hide();
      });
    }), Z) {
      const g = `${Z}/0`;
      console.log("shots url is", g);
      const V = new b({
        url: g,
        definitionExpression: "mod(id,100) = 0"
        // start with agressive simplifaction - view should get scale change early on to override this
      });
      r.map.add(V), V.when((G) => {
        const F = G.fields, U = F.find((u) => pe(u, "filenames")), j = F.find((u) => pe(u, "calibration"));
        l.push({
          layer: V,
          shot: "id",
          filenames: "filenames",
          yaw: "yaw",
          rotation: "rotation_matrix",
          datetime: "utc_time",
          brightness: null,
          base: ve(U && U.description),
          calibration: "calibration",
          rigId: null,
          calibrationBase: ve(j.description),
          capture: "capture"
        });
        const P = {
          xmin: -5e-3,
          ymin: -5e-3,
          xmax: 5e-3,
          ymax: 5e-3
        }, C = Object.keys(P), D = {};
        for (let u = 0; u < C.length; u++)
          D[C[u]] = parseFloat(G.fullExtent[C[u]]) + P[C[u]];
        r.extent = D;
      });
      const B = `${Z}/1`;
      console.log("points features url is", B);
      const S = new b({
        url: B,
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
      r.map.add(S);
    }
    d = new v({
      title: "GeoCam Field of View",
      geometryType: "point",
      spatialReference: {
        wkid: 4326
      }
    }), r.map.layers.add(d);
    var A = function(g) {
      switch (g.key, g.key) {
        case "Escape": {
          _(null), mapView.graphics.removeAll();
          break;
        }
        case " ":
          a = !0;
      }
    }, ke = function(g) {
      switch (g.key, g.key) {
        case " ":
          a = !1;
      }
    };
    document.addEventListener("keydown", A), document.addEventListener("keyup", ke);
  }, this.destroy = function() {
    f(), J(), T(), Y(), Ie(), Te(), W && W(), oe(), r.map.removeLayer(d), e.wrapper.removeChild(q), e.wrapper.removeChild(R);
  };
};
class tt extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("GeocamViewerArcgisScene init");
  }
  connectedCallback() {
    this.link = function(n) {
      console.log("linking to ", n);
      const e = this.getAttribute("src");
      e || console.warn("No src attribute on geocam-viewer-arcgis-scene");
      const a = this.parentNode;
      if (this.viewer = a.viewer, this.sceneView = n, this.viewer && this.viewer.plugin) {
        const l = document.getElementsByTagName(
          "geocam-viewer-prev-next-control"
        )[0], d = l && l.plugin;
        this.plugin = new et({ sceneView: n, prevNextPlugin: d, src: e }), a.viewer.plugin(this.plugin);
        const f = a.getElementsByTagName(
          "geocam-viewer-screen-shot"
        )[0];
        f && f.plugin && f.plugin.arcgisView(n);
      } else
        console.error("GeocamViewerArcgisScene must be a child of GeocamViewer");
    }, console.log("GeocamViewerArcgisScene connected");
  }
  disconnectedCallback() {
    this.plugin = null, this.viewer = null, this.sceneView = null, console.log("GeocamViewerArcgisScene disconnected");
  }
}
window.customElements.define("geocam-viewer-arcgis-scene", tt);
export {
  tt as GeocamViewerArcgisScene
};
