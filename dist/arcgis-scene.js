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
    var s = e.minor <= 10 ? "js/" : "";
    return "".concat(o).concat(s, "esri/css/esri.css");
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
  var e = Be(t), s = Ge(e);
  return s || (s = Ie(e), $e(s, o)), s;
}
var Fe = {};
function Ue(t) {
  var o = document.createElement("script");
  return o.type = "text/javascript", o.src = t, o.setAttribute("data-esri-loader", "loading"), o;
}
function be(t, o, e) {
  var s;
  e && (s = Je(t, e));
  var d = function() {
    o(t), t.removeEventListener("load", d, !1), s && t.removeEventListener("error", s, !1);
  };
  t.addEventListener("load", d, !1);
}
function Je(t, o) {
  var e = function(s) {
    o(s.error || new Error("There was an error attempting to load ".concat(t.src))), t.removeEventListener("error", e, !1);
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
  [Fe, t].forEach(function(d) {
    for (var g in d)
      Object.prototype.hasOwnProperty.call(d, g) && (o[g] = d[g]);
  });
  var e = o.version, s = o.url || ke(e);
  return new ye.Promise(function(d, g) {
    var h = Se();
    if (h) {
      var J = h.getAttribute("src");
      J !== s ? g(new Error("The ArcGIS API for JavaScript is already loaded (".concat(J, ")."))) : W() ? d(h) : be(h, d, g);
    } else if (W())
      g(new Error("The ArcGIS API for JavaScript is already loaded."));
    else {
      var M = o.css;
      if (M) {
        var D = M === !0;
        Pe(D ? e : M, o.insertCssBefore);
      }
      h = Ue(s), be(h, function() {
        h.setAttribute("data-esri-loader", "loaded"), d(h);
      }, g), document.body.appendChild(h);
    }
  });
}
function we(t) {
  return new ye.Promise(function(o, e) {
    var s = window.require.on("error", e);
    window.require(t, function() {
      for (var d = [], g = 0; g < arguments.length; g++)
        d[g] = arguments[g];
      s.remove(), o(d);
    });
  });
}
function Oe(t, o) {
  if (o === void 0 && (o = {}), W())
    return we(t);
  var e = Se(), s = e && e.getAttribute("src");
  return !o.url && s && (o.url = s), qe(o).then(function() {
    return we(t);
  });
}
const je = (t, o) => t.replace(/\(\?\<(.+?)\>[^)]*\)/g, (e, s) => o[s]), S = (t, o = {}, e = "") => {
  const s = document.createElement(t);
  for (let d in o)
    s.setAttribute(d, o[d]);
  return s.innerHTML = e, s;
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
  let e, s, d = [], g, h, J, M, D, ee, q, H, O, I, te, $, oe, Y, ne, re, ae, se, ie, ce, Ee, le, Ce, ue = !0, de;
  const { sceneView: a, prevNextPlugin: K, widgets: _e, expands: Ke, src: Q } = t, me = function(n, i, c, r, u) {
    return 1 / Math.sqrt(a.scale / 70), {
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
            tilt: u,
            heading: n,
            material: {
              color: "rgba(0,0,255,0.6)"
            }
          }
        ]
      }
    };
  };
  let L = me(0, 0, 0, 0, 90);
  const z = function(n, i, c, r, u) {
    if (console.log("update fov", n, i, c, r, u), g && (g.removeAll(), e.visible() && n !== null))
      if (H()) {
        const f = a.camera.clone();
        (c || c === 0) && (f.position.latitude = c), (i || i === 0) && (f.position.longitude = i), (r || r === 0) && (f.position.z = r), (n || n === 0) && (f.heading = n), (u || u === 0) && (f.tilt = 90 - u), f.fov = parseInt(e.fov()), console.log("camera fov", f), a.goTo(f, { animate: !1 }), a.camera.fov = e.fov();
      } else
        L = me(
          n || 0,
          i || L.geometry.longitude,
          c || L.geometry.latitude,
          r || L.geometry.z,
          u ? 90 - u : L.symbol.symbolLayers[0].tilt
        ), g.add(L), (c || c === 0) && de([i, c]);
  }, ge = function(n, i, c = {}) {
    const r = new RegExp(i, "i");
    let u = r.test(n.name) || r.test(n.alias);
    return u && c.description && (u = !!n.description), u;
  }, fe = function(n) {
    if (n) {
      var i = document.createElement("textarea");
      return i.innerHTML = n, i.value;
    } else
      return "https://image.geocam.xyz/";
  }, ze = (n, i) => {
    const c = n.base;
    if (n.filenames)
      return JSON.parse(i[n.filenames]).map((r) => Array.isArray(r) ? r.map((u) => /^https?:\/\//i.test(u) ? r : `${c}${u}`) : /^https?:\/\//i.test(r) ? r : `${c}${r}`);
    {
      const r = i[n.capture].split(".")[0], u = r.split("/").pop(), f = JSON.parse(i[n.lengths]), v = JSON.parse(i[n.offsets]);
      return f.map((b, w) => {
        const A = encodeURIComponent(
          `https://s3.us-west-004.backblazeb2.com/gc-raw-surveys-archive/${r}_${w}.tar`
        );
        return `${c}${u}/${w}/${i[n.shot]}.jpg?offset=${v[w]}&length=${b}&container=${A}`;
      });
    }
  }, Ae = function(n) {
    return d.findIndex((i) => i.layer == n.layer);
  }, Ve = function(n) {
    if (e.label) {
      const { capture: i, utc_time: c, shot: r } = n, u = new Date(c);
      e.label(`${u.toLocaleString()}`);
    }
  };
  let he;
  const X = function(n, i) {
    const c = Y();
    console.log("shotclick with viewlock", c);
    const r = d[i], u = n.attributes[r.shot];
    he = u, e.shot(u), K && (K.prev(n.attributes.prev), K.next(n.attributes.next));
    const f = [0, 1, 2].map(
      (A) => je(r.calibrationBase, {
        camera: A,
        rig_id: n.attributes[r.rigId],
        calibration: n.attributes[r.calibration]
      })
    ), v = n.attributes[r.yaw], E = n.attributes[r.rotation], b = I() && r.brightness ? n.attributes[r.brightness] : null;
    te = b;
    const w = ze(r, n.attributes);
    if (c) {
      const A = bearing(n.geometry, c);
      e.facing(A);
    }
    e.show(w, v, f, E, b), z(
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
      const f = Math.ceil(n / 500), v = a.extent, E = `${v.xmin},${v.ymin},${v.xmax},${v.ymax},${v.spatialReference.wkid}`, b = `mod(id,${f}) = 0 AND extent = ${E}`;
      d.forEach((w) => {
        w.layer.definitionExpression !== b && (w.layer.definitionExpression = b, console.log(
          "definition expression changed for",
          w.layer,
          b
        ));
      }), oe(a.zoom), H() || z(e.facing());
    }, 500);
  }, Ne = function(n, i, c, r) {
    le([a.center.longitude, a.center.latitude]);
  }, Te = function(n, i, c, r) {
    ne(a.camera.position.latitude), re(a.camera.position.longitude), se(a.camera.position.z), ie(a.camera.tilt), ae(a.camera.heading), ce(a.camera.fov);
  };
  this.init = async function(n) {
    e = n, de = e.store("marker"), oe = e.store("zoom"), le = e.store("center"), ne = e.store("camLat"), re = e.store("camLng"), se = e.store("camAlt"), ie = e.store("camTilt"), ae = e.store("camHdg"), ce = e.store("camFov"), Y = e.store("viewlock"), H = e.store("autorotate"), q = S("DIV", { class: "geocam-auto-rotate" });
    const i = S("LABEL", { class: "geocam-auto-rotate-label" }), c = S("INPUT", {
      type: "checkbox",
      class: "geocam-auto-rotate-checkbox"
    }), r = S(
      "SPAN",
      { class: "geocam-auto-rotate-span geocam-viewer-control-button" },
      " Autorotate"
    );
    c.checked = H(), c.addEventListener("change", () => {
      H(c.checked);
    }), i.appendChild(c), i.appendChild(r), q.appendChild(i), e.addControl(q, "left-top"), M = H((m) => {
      q.setAttribute(
        "title",
        m ? "turn auto-rotate off" : "turn auto-rotate on"
      ), z(
        e.facing(),
        L.geometry.longitude,
        L.geometry.latitude,
        L.geometry.z,
        e.horizon()
      );
    }), I = e.store("autobrightness"), O = S("DIV", { class: "geocam-auto-brightness" });
    const u = S("LABEL", { class: "geocam-auto-brightness-label" });
    $ = S("INPUT", {
      type: "checkbox",
      class: "geocam-auto-brightness-checkbox"
    });
    const f = S(
      "SPAN",
      { class: "geocam-auto-brightness-span geocam-viewer-control-button" },
      " Autobrightness"
    );
    $.disabled = !0, $.checked = I(), $.addEventListener("change", () => {
      I($.checked);
    }), u.appendChild($), u.appendChild(f), O.appendChild(u), e.addControl(O, "left-top"), D = I((m) => {
      O.setAttribute(
        "title",
        m ? "turn auto-brightness off" : "turn auto-brightness on"
      ), e.reload(I() ? te : "[1,1,1]");
    }), ee = e.visible((m) => z(e.facing()));
    const [v, E, b] = await Oe(
      [
        "esri/layers/GraphicsLayer",
        "esri/core/reactiveUtils",
        "esri/layers/FeatureLayer"
      ],
      {
        version: "4.26"
      }
    );
    if (a.when(async () => {
      a.on("clickable", (l) => {
        ue = l;
      }), a.on("immediate-click", (l) => {
        if (!ue)
          return;
        const x = {
          x: l.x,
          y: l.y
        };
        if (console.log("immediate-click", l, x), s) {
          console.log("space wqas down");
          const p = a.toMap(x);
          if (Y(p), lockG && a.graphics.removeAll(), lockG = lockGraphic(p), a.graphics.add(lockG), e.visible()) {
            const N = bearing(L.geometry, p);
            e.facing(N);
          }
        } else
          a.hitTest(x).then((p) => {
            if (p.results && p.results.length > 0)
              for (var N = 0; N < p.results.length; N++) {
                const y = p.results[N].graphic, T = Ae(y);
                if (T >= 0) {
                  Object.entries(y.attributes).length < 2 ? y.layer.queryFeatures({
                    objectIds: [y.attributes.id],
                    returnGeometry: !0,
                    outFields: "*",
                    where: y.layer.definitionExpression
                  }).then((_) => {
                    _.features.length > 0 && X(_.features[0], T);
                  }) : X(y, T);
                  break;
                }
              }
          });
      }), h = e.facing((l) => {
        z(l, null, null, null, e.horizon());
      }), J = e.horizon((l) => {
        z(e.facing(), null, null, null, l);
      });
      const m = new URLSearchParams(window.location.hash.substr(1)), V = m.get("center");
      V && V !== "null" && (a.center = JSON.parse(V));
      const G = m.get("zoom");
      G && G !== "null" && (a.zoom = JSON.parse(G));
      const k = a.camera.clone(), B = m.get("camLat");
      B && B !== "null" && (k.position.latitude = JSON.parse(B));
      const P = m.get("camLng");
      P && P !== "null" && (k.position.longitude = JSON.parse(P));
      const F = m.get("camAlt");
      F && F !== "null" && (k.position.z = JSON.parse(F));
      const j = m.get("camHdg");
      j && j !== "null" && (k.heading = JSON.parse(j));
      const U = m.get("camTilt");
      U && U !== "null" && (k.tilt = JSON.parse(U));
      const C = m.get("camFov");
      C && C !== "null" && (k.fov = JSON.parse(C)), a.goTo(k, { animate: !1 });
      const R = m.get("marker");
      if (R) {
        const l = JSON.parse(R);
        if (l) {
          const [x, p] = l;
          z(e.facing(), x, p);
        }
      }
      E.watch(() => a.scale, ve), ve(a.scale), E.watch(() => a.center, Ne), E.watch(() => a.camera.position, Te), e.shot((l) => {
        const x = parseInt(
          typeof l == "object" && l !== null ? l.id : l
        );
        x && x !== he ? (console.log("Got shot", l, "layers", d.length), d.forEach((p, N) => {
          const y = p.layer;
          e.resetProgress(), console.log("Querying layer for shot", y, x), y.queryFeatures({
            objectIds: [x],
            returnGeometry: !0,
            outFields: "*",
            where: y.definitionExpression
          }).then((T) => {
            if (console.log("Got results for layer", y, T), T.features.length > 0) {
              const _ = T.features[0];
              X(_, N);
            }
          });
        })) : l || e.hide();
      });
    }), Q) {
      const m = `${Q}/0`;
      console.log("shots url is", m);
      const V = new b({
        url: m,
        definitionExpression: "mod(id,100) = 0"
        // start with agressive simplifaction - view should get scale change early on to override this
      });
      a.map.add(V), V.when((B) => {
        const P = B.fields, F = P.find((l) => ge(l, "filenames")), j = P.find((l) => ge(l, "calibration"));
        d.push({
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
          calibrationBase: fe(j.description),
          capture: "capture"
        });
        const U = {
          xmin: -5e-3,
          ymin: -5e-3,
          xmax: 5e-3,
          ymax: 5e-3
        }, C = Object.keys(U), R = {};
        for (let l = 0; l < C.length; l++)
          R[C[l]] = parseFloat(B.fullExtent[C[l]]) + U[C[l]];
        a.extent = R;
      });
      const G = `${Q}/1`;
      console.log("points features url is", G);
      const k = new b({
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
      a.map.add(k);
    }
    g = new v({
      title: "GeoCam Field of View",
      geometryType: "point",
      spatialReference: {
        wkid: 4326
      }
    }), a.map.layers.add(g);
    var w = function(m) {
      switch (m.key, m.key) {
        case "Escape": {
          Y(null), mapView.graphics.removeAll();
          break;
        }
        case " ":
          s = !0;
      }
    }, A = function(m) {
      switch (m.key, m.key) {
        case " ":
          s = !1;
      }
    };
    document.addEventListener("keydown", w), document.addEventListener("keyup", A);
  }, this.destroy = function() {
    h(), J(), M(), D(), Ee(), Ce(), ee(), a.map.removeLayer(g), e.wrapper.removeChild(q), e.wrapper.removeChild(O);
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
      const s = this.parentNode;
      if (this.viewer = s.viewer, this.sceneView = o, this.viewer && this.viewer.plugin) {
        const d = document.getElementsByTagName(
          "geocam-viewer-prev-next-control"
        )[0], g = d && d.plugin;
        this.plugin = new De({ sceneView: o, prevNextPlugin: g, src: e }), s.viewer.plugin(this.plugin);
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
