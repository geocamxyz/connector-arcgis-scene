var Me = typeof window < "u";
const ye = {
  Promise: Me ? window.Promise : void 0
};
var Le = "4.25", Z = "next";
function xe(t) {
  if (t.toLowerCase() === Z)
    return Z;
  var o = t && t.match(/^(\d)\.(\d+)/);
  return o && {
    major: parseInt(o[1], 10),
    minor: parseInt(o[2], 10)
  };
}
function ke(t) {
  return t === void 0 && (t = Le), "https://js.arcgis.com/".concat(t, "/");
}
function He(t) {
  t === void 0 && (t = Le);
  var o = ke(t), e = xe(t);
  if (e !== Z && e.major === 3) {
    var a = e.minor <= 10 ? "js/" : "";
    return "".concat(o).concat(a, "esri/css/esri.css");
  } else
    return "".concat(o, "esri/themes/light/main.css");
}
function Ie(t) {
  var o = document.createElement("link");
  return o.rel = "stylesheet", o.href = t, o;
}
function $e(t, o) {
  if (o) {
    var e = document.querySelector(o);
    e.parentNode.insertBefore(t, e);
  } else
    document.head.appendChild(t);
}
function Ge(t) {
  return document.querySelector('link[href*="'.concat(t, '"]'));
}
function Be(t) {
  return !t || xe(t) ? He(t) : t;
}
function Pe(t, o) {
  var e = Be(t), a = Ge(e);
  return a || (a = Ie(e), $e(a, o)), a;
}
var Fe = {};
function Ue(t) {
  var o = document.createElement("script");
  return o.type = "text/javascript", o.src = t, o.setAttribute("data-esri-loader", "loading"), o;
}
function be(t, o, e) {
  var a;
  e && (a = Je(t, e));
  var u = function() {
    o(t), t.removeEventListener("load", u, !1), a && t.removeEventListener("error", a, !1);
  };
  t.addEventListener("load", u, !1);
}
function Je(t, o) {
  var e = function(a) {
    o(a.error || new Error("There was an error attempting to load ".concat(t.src))), t.removeEventListener("error", e, !1);
  };
  return t.addEventListener("error", e, !1), e;
}
function Se() {
  return document.querySelector("script[data-esri-loader]");
}
function W() {
  var t = window.require;
  return t && t.on;
}
function qe(t) {
  t === void 0 && (t = {});
  var o = {};
  [Fe, t].forEach(function(u) {
    for (var m in u)
      Object.prototype.hasOwnProperty.call(u, m) && (o[m] = u[m]);
  });
  var e = o.version, a = o.url || ke(e);
  return new ye.Promise(function(u, m) {
    var h = Se();
    if (h) {
      var J = h.getAttribute("src");
      J !== a ? m(new Error("The ArcGIS API for JavaScript is already loaded (".concat(J, ")."))) : W() ? u(h) : be(h, u, m);
    } else if (W())
      m(new Error("The ArcGIS API for JavaScript is already loaded."));
    else {
      var H = o.css;
      if (H) {
        var D = H === !0;
        Pe(D ? e : H, o.insertCssBefore);
      }
      h = Ue(a), be(h, function() {
        h.setAttribute("data-esri-loader", "loaded"), u(h);
      }, m), document.body.appendChild(h);
    }
  });
}
function we(t) {
  return new ye.Promise(function(o, e) {
    var a = window.require.on("error", e);
    window.require(t, function() {
      for (var u = [], m = 0; m < arguments.length; m++)
        u[m] = arguments[m];
      a.remove(), o(u);
    });
  });
}
function Oe(t, o) {
  if (o === void 0 && (o = {}), W())
    return we(t);
  var e = Se(), a = e && e.getAttribute("src");
  return !o.url && a && (o.url = a), qe(o).then(function() {
    return we(t);
  });
}
const je = (t, o) => t.replace(/\(\?\<(.+?)\>[^)]*\)/g, (e, a) => o[a]), S = (t, o = {}, e = "") => {
  const a = document.createElement(t);
  for (let u in o)
    a.setAttribute(u, o[u]);
  return a.innerHTML = e, a;
}, Re = (t, o) => (document.getElementById(t) || document.getElementsByTagName("head")[0].prepend(S("STYLE", { type: "text/css" }, o)), !0), De = function(t = {}) {
  Re("geocam-argis-map", `
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
  let e, a, u = [], m, h, J, H, D, ee, q, I, O, $, te, j, oe, Y, ne, re, ae, se, ie, ce, Ee, le, Ce, ue = !0, de;
  const { sceneView: s, prevNextPlugin: K, widgets: _e, expands: Ke, src: Q } = t, me = function(n, i, c, r, l) {
    return 1 / Math.sqrt(s.scale / 70), {
      geometry: {
        type: "point",
        latitude: c,
        longitude: i,
        z: r
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
            heading: n,
            material: {
              color: "rgba(0,0,255,0.6)"
            }
          }
        ]
      }
    };
  };
  let x = me(0, 0, 0, 0, 90);
  const z = function(n, i, c, r, l) {
    if (console.log("update fov", n, i, c, r, l), m && (m.removeAll(), e.visible() && n !== null))
      if (I()) {
        const p = s.camera.clone();
        (c || c === 0) && (p.position.latitude = c), (i || i === 0) && (p.position.longitude = i), (r || r === 0) && (p.position.z = r), (n || n === 0) && (p.heading = n), (l || l === 0) && (p.tilt = 90 - l), p.fov = parseInt(e.fov()), console.log("camera fov", p), s.goTo(p, { animate: !1 }), s.camera.fov = e.fov();
      } else
        x = me(
          n || 0,
          i || x.geometry.longitude,
          c || x.geometry.latitude,
          r || x.geometry.z,
          l ? 90 - l : x.symbol.symbolLayers[0].tilt
        ), m.add(x), (c || c === 0) && de([i, c]);
  }, ge = function(n, i, c = {}) {
    const r = new RegExp(i, "i");
    let l = r.test(n.name) || r.test(n.alias);
    return l && c.description && (l = !!n.description), l;
  }, fe = function(n) {
    if (n) {
      var i = document.createElement("textarea");
      return i.innerHTML = n, i.value;
    } else
      return "https://image.geocam.xyz/";
  }, ze = (n, i) => {
    const c = n.base;
    if (n.filenames)
      return JSON.parse(i[n.filenames]).map((r) => Array.isArray(r) ? r.map((l) => /^https?:\/\//i.test(l) ? r : `${c}${l}`) : /^https?:\/\//i.test(r) ? r : `${c}${r}`);
    {
      const r = i[n.capture].split(".")[0], l = r.split("/").pop(), p = JSON.parse(i[n.lengths]), b = JSON.parse(i[n.offsets]);
      return p.map((w, y) => {
        const A = encodeURIComponent(
          `https://s3.us-west-004.backblazeb2.com/gc-raw-surveys-archive/${r}_${y}.tar`
        );
        return `${c}${l}/${y}/${i[n.shot]}.jpg?offset=${b[y]}&length=${w}&container=${A}`;
      });
    }
  }, Ae = function(n) {
    return u.findIndex((i) => i.layer == n.layer);
  }, Ve = function(n) {
    if (e.label) {
      const { capture: i, utc_time: c, shot: r } = n, l = new Date(c);
      e.label(`${l.toLocaleString()}`);
    }
  };
  let he;
  const X = function(n, i) {
    const c = Y();
    console.log("shotclick with viewlock", c);
    const r = u[i], l = n.attributes[r.shot];
    he = l, e.shot(l), K && (K.prev(n.attributes.prev), K.next(n.attributes.next));
    const p = [0, 1, 2].map(
      (A) => je(r.calibrationBase, {
        camera: A,
        rig_id: n.attributes[r.rigId],
        calibration: n.attributes[r.calibration]
      })
    ), b = n.attributes[r.yaw], E = n.attributes[r.rotation], w = $() && r.brightness ? n.attributes[r.brightness] : null;
    te = w;
    const y = ze(r, n.attributes);
    if (c) {
      const A = bearing(n.geometry, c);
      e.facing(A);
    }
    e.show(y, b, p, E, w), z(
      e.facing(),
      n.geometry.longitude,
      n.geometry.latitude,
      n.geometry.z,
      e.horizon()
    ), Ve(n.attributes);
  };
  let pe;
  const ve = function(n, i, c, r) {
    clearTimeout(pe), pe = setTimeout(() => {
      const p = Math.ceil(n / 500), b = s.extent, E = `${b.xmin},${b.ymin},${b.xmax},${b.ymax},${b.spatialReference.wkid}`, w = `mod(id,${p}) = 0 AND extent = ${E}`;
      u.forEach((y) => {
        y.layer.definitionExpression !== w && (y.layer.definitionExpression = w, console.log(
          "definition expression changed for",
          y.layer,
          w
        ));
      }), oe(s.zoom), I() || z(e.facing());
    }, 500);
  }, Ne = function(n, i, c, r) {
    le([s.center.longitude, s.center.latitude]);
  }, Te = function(n, i, c, r) {
    ne(s.camera.position.latitude), re(s.camera.position.longitude), se(s.camera.position.z), ie(s.camera.tilt), ae(s.camera.heading), ce(s.camera.fov);
  };
  this.init = async function(n) {
    e = n, de = e.store("marker"), oe = e.store("zoom"), le = e.store("center"), ne = e.store("camLat"), re = e.store("camLng"), se = e.store("camAlt"), ie = e.store("camTilt"), ae = e.store("camHdg"), ce = e.store("camFov"), Y = e.store("viewlock"), I = e.store("autorotate"), q = S("DIV", { class: "geocam-auto-rotate" });
    const i = S("LABEL", { class: "geocam-auto-rotate-label" }), c = S("INPUT", {
      type: "checkbox",
      class: "geocam-auto-rotate-checkbox"
    }), r = S(
      "SPAN",
      { class: "geocam-auto-rotate-span geocam-viewer-control-button" },
      " Autorotate"
    );
    c.checked = I(), c.addEventListener("change", () => {
      I(c.checked);
    }), i.appendChild(c), i.appendChild(r), q.appendChild(i), e.addControl(q, "left-top"), H = I((d) => {
      q.setAttribute(
        "title",
        d ? "turn auto-rotate off" : "turn auto-rotate on"
      ), z(
        e.facing(),
        x.geometry.longitude,
        x.geometry.latitude,
        x.geometry.z,
        e.horizon()
      );
    }), $ = e.store("autobrightness"), O = S("DIV", { class: "geocam-auto-brightness" });
    const l = S("LABEL", { class: "geocam-auto-brightness-label" });
    j = S("INPUT", {
      type: "checkbox",
      class: "geocam-auto-brightness-checkbox"
    });
    const p = S(
      "SPAN",
      { class: "geocam-auto-brightness-span geocam-viewer-control-button" },
      " Autobrightness"
    );
    j.checked = $(), j.addEventListener("change", () => {
      $(j.checked);
    }), l.appendChild(j), l.appendChild(p), O.appendChild(l), e.addControl(O, "left-top"), D = $((d) => {
      O.setAttribute(
        "title",
        d ? "turn auto-brightness off" : "turn auto-brightness on"
      ), e.reload($() ? te : "[1,1,1]");
    }), ee = e.visible((d) => z(e.facing()));
    const [b, E, w] = await Oe(
      [
        "esri/layers/GraphicsLayer",
        "esri/core/reactiveUtils",
        "esri/layers/FeatureLayer"
      ],
      {
        version: "4.26"
      }
    );
    if (s.when(async () => {
      s.on("clickable", (g) => {
        ue = g;
      }), s.on("immediate-click", (g) => {
        if (!ue)
          return;
        const f = {
          x: g.x,
          y: g.y
        };
        if (console.log("immediate-click", g, f), a) {
          console.log("space wqas down");
          const v = s.toMap(f);
          if (Y(v), lockG && s.graphics.removeAll(), lockG = lockGraphic(v), s.graphics.add(lockG), e.visible()) {
            const T = bearing(x.geometry, v);
            e.facing(T);
          }
        } else
          s.hitTest(f).then((v) => {
            if (v.results && v.results.length > 0)
              for (var T = 0; T < v.results.length; T++) {
                const L = v.results[T].graphic, M = Ae(L);
                if (M >= 0) {
                  Object.entries(L.attributes).length < 2 ? L.layer.queryFeatures({
                    objectIds: [L.attributes.id],
                    returnGeometry: !0,
                    outFields: "*",
                    where: L.layer.definitionExpression
                  }).then((_) => {
                    _.features.length > 0 && X(_.features[0], M);
                  }) : X(L, M);
                  break;
                }
              }
          });
      }), h = e.facing((g) => {
        z(g, null, null, null, e.horizon());
      }), J = e.horizon((g) => {
        z(e.facing(), null, null, null, g);
      });
      const d = new URLSearchParams(window.location.hash.substr(1)), V = d.get("center");
      V && V !== "null" && (s.center = JSON.parse(V));
      const G = d.get("zoom");
      G && G !== "null" && (s.zoom = JSON.parse(G));
      const k = s.camera.clone(), B = d.get("camLat");
      B && B !== "null" && (k.position.latitude = JSON.parse(B));
      const P = d.get("camLng");
      P && P !== "null" && (k.position.longitude = JSON.parse(P));
      const F = d.get("camAlt");
      F && F !== "null" && (k.position.z = JSON.parse(F));
      const R = d.get("camHdg");
      R && R !== "null" && (k.heading = JSON.parse(R));
      const C = d.get("camTilt");
      C && C !== "null" && (k.tilt = JSON.parse(C));
      const U = d.get("camFov");
      U && U !== "null" && (k.fov = JSON.parse(U)), s.goTo(k, { animate: !1 });
      const N = d.get("marker");
      if (N) {
        const g = JSON.parse(N);
        if (g) {
          const [f, v] = g;
          z(e.facing(), f, v);
        }
      }
      E.watch(() => s.scale, ve), ve(s.scale), E.watch(() => s.center, Ne), E.watch(() => s.camera.position, Te), e.shot((g) => {
        const f = parseInt(
          typeof g == "object" && g !== null ? g.id : g
        );
        f && f !== he ? (console.log("Got shot", g, "layers", u.length), u.forEach((v, T) => {
          const L = v.layer;
          e.resetProgress(), console.log("Querying layer for shot", L, f), L.queryFeatures({
            objectIds: [f],
            returnGeometry: !0,
            outFields: "*",
            where: L.definitionExpression
          }).then((M) => {
            if (console.log("Got results for layer", L, M), M.features.length > 0) {
              const _ = M.features[0];
              X(_, T);
            }
          });
        })) : g || e.hide();
      });
    }), Q) {
      const d = `${Q}/0`;
      console.log("shots url is", d);
      const V = new w({
        url: d,
        definitionExpression: "mod(id,100) = 0"
        // start with agressive simplifaction - view should get scale change early on to override this
      });
      s.map.add(V), V.when((B) => {
        const P = B.fields, F = P.find((f) => ge(f, "filenames")), R = P.find((f) => ge(f, "calibration"));
        u.push({
          layer: V,
          shot: "id",
          filenames: "filenames",
          yaw: "yaw",
          rotation: "rotation_matrix",
          datetime: "utc_time",
          brightness: null,
          base: fe(F && F.description),
          calibration: "calibration",
          rigId: null,
          calibrationBase: fe(R.description),
          capture: "capture"
        });
        const C = 3e-4, U = {
          xmin: -C,
          ymin: -C,
          xmax: C,
          ymax: C
        }, N = Object.keys(U), g = {};
        for (let f = 0; f < N.length; f++)
          g[N[f]] = parseFloat(B.fullExtent[N[f]]) + U[N[f]];
        s.extent = g;
      });
      const G = `${Q}/1`;
      console.log("points features url is", G);
      const k = new w({
        url: G,
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
    m = new b({
      title: "GeoCam Field of View",
      geometryType: "point",
      spatialReference: {
        wkid: 4326
      }
    }), s.map.layers.add(m);
    var y = function(d) {
      switch (d.key, d.key) {
        case "Escape": {
          Y(null), mapView.graphics.removeAll();
          break;
        }
        case " ":
          a = !0;
      }
    }, A = function(d) {
      switch (d.key, d.key) {
        case " ":
          a = !1;
      }
    };
    document.addEventListener("keydown", y), document.addEventListener("keyup", A);
  }, this.destroy = function() {
    h(), J(), H(), D(), Ee(), Ce(), ee(), s.map.removeLayer(m), e.wrapper.removeChild(q), e.wrapper.removeChild(O);
  };
};
class Ye extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("GeocamViewerArcgisScene init");
  }
  connectedCallback() {
    this.link = function(o) {
      console.log("linking to ", o);
      const e = this.getAttribute("src");
      e || console.warn("No src attribute on geocam-viewer-arcgis-scene");
      const a = this.parentNode;
      if (this.viewer = a.viewer, this.sceneView = o, this.viewer && this.viewer.plugin) {
        const u = document.getElementsByTagName(
          "geocam-viewer-prev-next-control"
        )[0], m = u && u.plugin;
        this.plugin = new De({ sceneView: o, prevNextPlugin: m, src: e }), a.viewer.plugin(this.plugin);
        const h = a.getElementsByTagName(
          "geocam-viewer-screen-shot"
        )[0];
        h && h.plugin && h.plugin.arcgisView(o);
      } else
        console.error("GeocamViewerArcgisScene must be a child of GeocamViewer");
    }, console.log("GeocamViewerArcgisScene connected");
  }
  disconnectedCallback() {
    this.plugin = null, this.viewer = null, this.sceneView = null, console.log("GeocamViewerArcgisScene disconnected");
  }
}
window.customElements.define("geocam-viewer-arcgis-scene", Ye);
export {
  Ye as GeocamViewerArcgisScene
};
