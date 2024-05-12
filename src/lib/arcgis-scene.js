import { loadModules } from "esri-loader";

const objectUrl = (base, obj) =>
  base.replace(/\(\?\<(.+?)\>[^)]*\)/g, (x, g) => obj[g]);

const node = (name, attrs = {}, content = "") => {
  const node = document.createElement(name);
  for (let i in attrs) {
    node.setAttribute(i, attrs[i]);
  }
  node.innerHTML = content;
  return node;
};

const injectStyle = (id, rules) => {
  if (!document.getElementById(id)) {
    document
      .getElementsByTagName("head")[0]
      .prepend(node("STYLE", { type: "text/css" }, rules));
  }
  return true;
};

const fovPng = `data:image/png;base64,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`;

export const arcgisScene = function (config = {}) {
  const STYLES = `
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

    `;

  injectStyle("geocam-argis-map", STYLES);

  let viewer,
    spaceDown,
    geocamLayers = [],
    fovLayer,
    unsubFacing,
    unsubYaw,
    unsubAutorotate,
    unsubAutobrightness,
    unsubVisible,
    autoRotateElement,
    autoRotate,
    autoBrightnessElement,
    autoBrightness,
    lastBrightness,
    abCheckbox,
    zoomStore,
    viewlock,
    camLatStore,
    camLngStore,
    camHdgStore,
    camAltStore,
    camTiltStore,
    camFovStore,
    unsubZoom,
    centerStore,
    unsubCenter,
    clickable = true,
    fovMarkerStore;

  const { sceneView, prevNextPlugin, widgets, expands, src } = config;

  /*
              var shotSymbolSceneFov = new PointSymbol3D({
                symbolLayers: [new ObjectSymbol3DLayer({
                    width: 8, //width of object in meters
                    height: 4, //height of object in meters
                    depth: 8, //depth in meters
                    anchor: 'top',
                    resource: {
                        primitive: "cone"
                    },
                    roll: 0,
                    tilt: 90,
                    heading: 0,
                    material: {
                        color: "rgba(0,0,255,0.6)"
                    }
                })]
            });
            */

  const fovGraphic = function (ang, lng, lat, alt, tilt) {
    // const proportion = ((1/(sceneView.scale/70)) * 14) / 112;
    const proportion = 1 / Math.sqrt(sceneView.scale / 70); // fov size must be scale based as zoom levels can be set independently
    const width = 112 * proportion;
    const height = 202 * proportion;
    return {
      geometry: {
        type: "point",
        latitude: lat,
        longitude: lng,
        z: alt,
      },
      symbol: {
        type: "point-3d",
        symbolLayers: [
          {
            type: "object",
            width: 8, //width of object in meters
            height: 4, //height of object in meters
            depth: 8, //depth in meters
            anchor: "top",
            resource: {
              primitive: "cone",
            },
            roll: 0,
            tilt: tilt,
            heading: ang,
            material: {
              color: "rgba(0,0,255,0.6)",
            },
          },
        ],
      },
    };
  };

  let fovG = fovGraphic(0, 0, 0, 0, 90);

  const updateFov = function (angle, lng, lat, alt, horizon) {
    console.log("update fov", angle, lng, lat, alt, horizon);
    if (fovLayer) {
      fovLayer.removeAll();
      if (viewer.visible()) {
        if (angle !== null) {
          if (autoRotate()) {
            const cam = sceneView.camera.clone();
            if (lat || lat === 0) {
              cam.position.latitude = lat;
            }
            if (lng || lng === 0) {
              cam.position.longitude = lng;
            }
            if (alt || alt === 0) {
              cam.position.z = alt;
            }
            if (angle || angle === 0) {
              cam.heading = angle; // maybe * -1
            }
            if (horizon || horizon === 0) {
              cam.tilt = 90 - horizon;
            }
            cam.fov = parseInt(viewer.fov());
            console.log("camera fov", cam);
            sceneView.goTo(cam, { animate: false });
            sceneView.camera.fov = viewer.fov();
          } else {
            // do not show graphic in autorotate mode
            fovG = fovGraphic(
              angle || 0,
              lng || fovG.geometry.longitude,
              lat || fovG.geometry.latitude,
              alt || fovG.geometry.z,
              horizon ? 90 - horizon : fovG.symbol.symbolLayers[0].tilt
            );
            fovLayer.add(fovG);
            if (lat || lat === 0) {
              fovMarkerStore([lng, lat]);
            }
          }
        }
      }
    }
  };

  const fieldMatches = function (field, name, options = {}) {
    const reg = new RegExp(name, "i");
    let match = reg.test(field.name) || reg.test(field.alias);
    if (match && options.description) {
      match = field.description ? true : false;
    }
    return match;
  };

  const getBase = function (desc) {
    //We need to convert &lt; and &gt; back to < and > respectively
    if (desc) {
      var txt = document.createElement("textarea");
      txt.innerHTML = desc;
      let result = txt.value;
      return result;
    } else {
      return "https://image.geocam.xyz/";
    }
  };

  const shotUrls = (layer, attributes) => {
    // [["gc2-5988_s-VA_v-Floor3_n-2/0/00002029.jpg?offset=7239526912\u0026length=3502154\u0026id=2029\u0026container=https%3A%2F%2Fs3.us-west-004.backblazeb2.com%2Fgc-raw-surveys-archive%2FVA_Feb_2022%2Fgc2-5988_s-VA_v-Floor3_n-2_0.tar\u0026size=0.25","gc2-5988_s-VA_v-Floor3_n-2/0/00002029.jpg?offset=7239526912\u0026length=3502154\u0026id=2029\u0026container=https%3A%2F%2Fs3.us-west-004.backblazeb2.com%2Fgc-raw-surveys-archive%2FVA_Feb_2022%2Fgc2-5988_s-VA_v-Floor3_n-2_0.tar"],["gc2-5988_s-VA_v-Floor3_n-2/1/00002029.jpg?offset=7249336832\u0026length=3502615\u0026id=2029\u0026container=https%3A%2F%2Fs3.us-west-004.backblazeb2.com%2Fgc-raw-surveys-archive%2FVA_Feb_2022%2Fgc2-5988_s-VA_v-Floor3_n-2_1.tar\u0026size=0.25","gc2-5988_s-VA_v-Floor3_n-2/1/00002029.jpg?offset=7249336832\u0026length=3502615\u0026id=2029\u0026container=https%3A%2F%2Fs3.us-west-004.backblazeb2.com%2Fgc-raw-surveys-archive%2FVA_Feb_2022%2Fgc2-5988_s-VA_v-Floor3_n-2_1.tar"],["gc2-5988_s-VA_v-Floor3_n-2/2/00002029.jpg?offset=7180894208\u0026length=3486585\u0026id=2029\u0026container=https%3A%2F%2Fs3.us-west-004.backblazeb2.com%2Fgc-raw-surveys-archive%2FVA_Feb_2022%2Fgc2-5988_s-VA_v-Floor3_n-2_2.tar\u0026size=0.25","gc2-5988_s-VA_v-Floor3_n-2/2/00002029.jpg?offset=7180894208\u0026length=3486585\u0026id=2029\u0026container=https%3A%2F%2Fs3.us-west-004.backblazeb2.com%2Fgc-raw-surveys-archive%2FVA_Feb_2022%2Fgc2-5988_s-VA_v-Floor3_n-2_2.tar"]]
    const base = layer.base;
    if (layer.filenames) {
      return JSON.parse(attributes[layer.filenames]).map((f) => {
        return Array.isArray(f)
          ? f.map((g) => (/^https?:\/\//i.test(g) ? f : `${base}${g}`))
          : /^https?:\/\//i.test(f)
          ? f
          : `${base}${f}`;
      });
    } else {
      const capturePath = attributes[layer.capture].split(".")[0];
      const captureName = capturePath.split("/").pop();
      const lengths = JSON.parse(attributes[layer.lengths]);
      const offsets = JSON.parse(attributes[layer.offsets]);
      const urls = lengths.map((length, i) => {
        const container = encodeURIComponent(
          `https://s3.us-west-004.backblazeb2.com/gc-raw-surveys-archive/${capturePath}_${i}.tar`
        );
        const url = `${base}${captureName}/${i}/${
          attributes[layer.shot]
        }.jpg?offset=${offsets[i]}&length=${length}&container=${container}`;
        return url;
      });
      return urls;
    }
  };

  const isShot = function (graphic) {
    return geocamLayers.findIndex((obj) => obj.layer == graphic.layer);
  };

  const setLabel = function (attributes) {
    if (viewer.label) {
      const { capture, utc_time, shot } = attributes;
      const dt = new Date(utc_time);
      viewer.label(`${dt.toLocaleString()}`); //  ${capture} ${shot}
    }
  };

    let lastShot, lastLayer;

  const shotClick = function (graphic, shotLayerIndex) {
    const lockedTo = viewlock();
    console.log("shotclick with viewlock", lockedTo);
    const shotLayer = geocamLayers[shotLayerIndex];
    lastLayer = shotLayer;
    const shotIndex = graphic.attributes[shotLayer.shot];
    lastShot = shotIndex;
    viewer.shot(shotIndex);
    if (prevNextPlugin) {
      prevNextPlugin.prev(graphic.attributes.prev);
      prevNextPlugin.next(graphic.attributes.next);
    }
    const hemispheres = [0, 1, 2].map((i) =>
      objectUrl(shotLayer.calibrationBase, {
        camera: i,
        rig_id: graphic.attributes[shotLayer.rigId],
        calibration: graphic.attributes[shotLayer.calibration],
      })
    );
    const yaw = graphic.attributes[shotLayer.yaw];
    const rotation = graphic.attributes[shotLayer.rotation];
    const brightness =
      autoBrightness() && shotLayer.brightness
        ? graphic.attributes[shotLayer.brightness]
        : null;
    lastBrightness = brightness;
    const urls = shotUrls(shotLayer, graphic.attributes);
    if (lockedTo) {
      // get the lat and lng of locked to location
      // work out angle from this shot location to locked to location
      // update rotation accordingly
      const angle = bearing(graphic.geometry, lockedTo);
      viewer.facing(angle);
    }
    viewer.show(urls, yaw, hemispheres, rotation, brightness);
    updateFov(
      viewer.facing(),
      graphic.geometry.longitude,
      graphic.geometry.latitude,
      graphic.geometry.z,
      viewer.horizon()
    );
    setLabel(graphic.attributes);
  };

  let scaleChangeTimeout;

  const scaleChange = function (newValue, oldValue, propertyName, target) {
    clearTimeout(scaleChangeTimeout);
    scaleChangeTimeout = setTimeout(() => {
      const scale = newValue;
      const mod = Math.ceil(scale / 500); // was 1000 - more dense dots
      const extent = sceneView.extent;
      const extStr = `${extent.xmin},${extent.ymin},${extent.xmax},${extent.ymax},${extent.spatialReference.wkid}`;
      const definitionExpression = `mod(id,${mod}) = 0 AND extent = ${extStr}`;
      geocamLayers.forEach((geocamLayer) => {
        if (geocamLayer.layer.definitionExpression !== definitionExpression) {
          geocamLayer.layer.definitionExpression = definitionExpression;
          console.log(
            "definition expression changed for",
            geocamLayer.layer,
            definitionExpression
          );
        }
      });
      zoomStore(sceneView.zoom);
      if (!autoRotate()) updateFov(viewer.facing());
    }, 500);
  };

  const centerChange = function (newValue, oldValue, propertyName, target) {
    centerStore([sceneView.center.longitude, sceneView.center.latitude]);
  };

  const cameraChange = function (newValue, oldValue, propertyName, target) {
    camLatStore(sceneView.camera.position.latitude);
    camLngStore(sceneView.camera.position.longitude);
    camAltStore(sceneView.camera.position.z);
    camTiltStore(sceneView.camera.tilt);
    camHdgStore(sceneView.camera.heading);
    camFovStore(sceneView.camera.fov);
  };

  this.init = async function (geocamViewer) {
    viewer = geocamViewer;
    fovMarkerStore = viewer.store("marker");
    zoomStore = viewer.store("zoom");
    centerStore = viewer.store("center");
    camLatStore = viewer.store("camLat");
    camLngStore = viewer.store("camLng");
    camAltStore = viewer.store("camAlt");
    camTiltStore = viewer.store("camTilt");
    camHdgStore = viewer.store("camHdg");
    camFovStore = viewer.store("camFov");

    viewlock = viewer.store("viewlock");

    autoRotate = viewer.store("autorotate");
    autoRotateElement = node("DIV", { class: "geocam-auto-rotate" });
    const label = node("LABEL", { class: "geocam-auto-rotate-label" });
    const checkbox = node("INPUT", {
      type: "checkbox",
      class: "geocam-auto-rotate-checkbox",
    });
    const span = node(
      "SPAN",
      { class: "geocam-auto-rotate-span geocam-viewer-control-button" },
      " Autorotate"
    );
    checkbox.checked = autoRotate();
    checkbox.addEventListener("change", () => {
      autoRotate(checkbox.checked);
    });
    label.appendChild(checkbox);
    label.appendChild(span);
    autoRotateElement.appendChild(label);
    viewer.addControl(autoRotateElement, "left-top");
    // viewer.wrapper.appendChild(autoRotateElement);
    unsubAutorotate = autoRotate((ar) => {
      autoRotateElement.setAttribute(
        "title",
        ar ? "turn auto-rotate off" : "turn auto-rotate on"
      );
      updateFov(
        viewer.facing(),
        fovG.geometry.longitude,
        fovG.geometry.latitude,
        fovG.geometry.z,
        viewer.horizon()
      );
    });

    autoBrightness = viewer.store("autobrightness");
    autoBrightnessElement = node("DIV", { class: "geocam-auto-brightness" });
    const abLabel = node("LABEL", { class: "geocam-auto-brightness-label" });
    abCheckbox = node("INPUT", {
      type: "checkbox",
      class: "geocam-auto-brightness-checkbox",
    });
    const abSpan = node(
      "SPAN",
      { class: "geocam-auto-brightness-span geocam-viewer-control-button" },
      " Autobrightness"
    );
    abCheckbox.disabled = true;
    abCheckbox.checked = autoBrightness();
    abCheckbox.addEventListener("change", () => {
      autoBrightness(abCheckbox.checked);
    });
    abLabel.appendChild(abCheckbox);
    abLabel.appendChild(abSpan);
    autoBrightnessElement.appendChild(abLabel);
    viewer.addControl(autoBrightnessElement, "left-top");
    // viewer.wrapper.appendChild(autoRotateElement);
    unsubAutobrightness = autoBrightness((ab) => {
      autoBrightnessElement.setAttribute(
        "title",
        ab ? "turn auto-brightness off" : "turn auto-brightness on"
      );
      viewer.reload(autoBrightness() ? lastBrightness : "[1,1,1]");
    });
    unsubVisible = viewer.visible((v) => updateFov(viewer.facing()));

    sceneView.when(async () => {
      sceneView.on("clickable", (e) => {
        clickable = e;
      });

      // attach click to each layer to show image;
      sceneView.on("immediate-click", (evt) => {
        if (!clickable) return;
        const screenPoint = {
          x: evt.x,
          y: evt.y,
        };
        console.log("immediate-click", evt, screenPoint);
        if (spaceDown) {
          console.log("space wqas down");
          const coords = sceneView.toMap(screenPoint);
          viewlock(coords);
          if (lockG) {
            sceneView.graphics.removeAll();
          }
          lockG = lockGraphic(coords);
          sceneView.graphics.add(lockG);
          if (viewer.visible()) {
            const angle = bearing(fovG.geometry, coords);
            viewer.facing(angle);
          }
        } else {
          sceneView.hitTest(screenPoint).then((hit) => {
            if (hit.results && hit.results.length > 0) {
              for (var i = 0; i < hit.results.length; i++) {
                const graphic = hit.results[i].graphic;
                const shotLayerIndex = isShot(graphic);
                if (shotLayerIndex >= 0) {
                  if (Object.entries(graphic.attributes).length < 2) {
                    graphic.layer
                      .queryFeatures({
                        objectIds: [graphic.attributes.id],
                        returnGeometry: true,
                        outFields: "*",
                        where: graphic.layer.definitionExpression,
                      })
                      .then((results) => {
                        if (results.features.length > 0) {
                          shotClick(results.features[0], shotLayerIndex);
                        }
                      });
                  } else {
                    shotClick(graphic, shotLayerIndex);
                  }
                  break;
                }
              }
            }
          });
        }
      });

      unsubFacing = viewer.facing((f) => {
        updateFov(f, null, null, null, viewer.horizon());
      });

      unsubYaw = viewer.horizon((h) => {
        updateFov(viewer.facing(), null, null, null, h);
      });

      // get center and zoom from hash params if there - we're not subscribing to the relevant stores because we only want this to happen once
      const hashParams = new URLSearchParams(window.location.hash.substr(1));

      const center = hashParams.get("center");
      if (center && center !== "null") {
        sceneView.center = JSON.parse(center);
      }
      const zoom = hashParams.get("zoom");
      if (zoom && zoom !== "null") {
        sceneView.zoom = JSON.parse(zoom);
      }

      const cam = sceneView.camera.clone();
      const camLat = hashParams.get("camLat");
      if (camLat && camLat !== "null") {
        cam.position.latitude = JSON.parse(camLat);
      }
      const camLng = hashParams.get("camLng");
      if (camLng && camLng !== "null") {
        cam.position.longitude = JSON.parse(camLng);
      }
      const camAlt = hashParams.get("camAlt");
      if (camAlt && camAlt !== "null") {
        cam.position.z = JSON.parse(camAlt);
      }
      const camHdg = hashParams.get("camHdg");
      if (camHdg && camHdg !== "null") {
        cam.heading = JSON.parse(camHdg);
      }
      const camTilt = hashParams.get("camTilt");
      if (camTilt && camTilt !== "null") {
        cam.tilt = JSON.parse(camTilt);
      }
      const camFov = hashParams.get("camFov");
      if (camFov && camFov !== "null") {
        cam.fov = JSON.parse(camFov);
      }
      sceneView.goTo(cam, { animate: false });
      const marker = hashParams.get("marker");
      if (marker) {
        const loc = JSON.parse(marker);
        if (loc) {
          const [lng, lat] = loc;
          updateFov(viewer.facing(), lng, lat);
        }
      }

      watchUtils.watch(() => sceneView.scale, scaleChange);
      scaleChange(sceneView.scale);
      watchUtils.watch(() => sceneView.center, centerChange);
      watchUtils.watch(() => sceneView.camera.position, cameraChange);


      viewer.shot((shot) => {
        const id = parseInt(
          typeof shot === "object" && shot !== null ? shot.id : shot
        );
        if (id && id !== lastShot) {
          console.log("Got shot", shot, 'layers', geocamLayers.length);
          geocamLayers.forEach((gcl, i) => {
            const layer = gcl.layer;
            viewer.resetProgress();
            console.log("Querying layer for shot", layer, id);
            layer
              .queryFeatures({
                objectIds: [id],
                returnGeometry: true,
                outFields: "*",
                where: layer.definitionExpression,
              })
              .then((results) => {
                // eslint-disable-line no-loop-func
                console.log("Got results for layer", layer, results);
                if (results.features.length > 0) {
                  const graphic = results.features[0];
                  shotClick(graphic, i);
                }
              });
          });
        } else {
          if (!shot) viewer.hide();
        }
      });
      
    });

          // show and rotate FOV graphic on rotation

      const [GraphicsLayer, watchUtils, FeatureLayer] = await loadModules(
        [
          "esri/layers/GraphicsLayer",
          "esri/core/reactiveUtils",
          "esri/layers/FeatureLayer",
        ],
        {
          version: "4.26",
        }
      );

      if (src) {
        // add geocam layers
        const shotsUrl = `${src}/0`;
        console.log("shots url is", shotsUrl);
        const shotsLayer = new FeatureLayer({
          url: shotsUrl,
          definitionExpression: "mod(id,100) = 0", // start with agressive simplifaction - view should get scale change early on to override this
        });
        sceneView.map.add(shotsLayer);
        shotsLayer.when((layer) => {
          const fields = layer.fields;

          const filenames = fields.find((f) => fieldMatches(f, "filenames"));
          const calibration = fields.find((f) =>
            fieldMatches(f, "calibration")
          );
          geocamLayers.push({
            layer: shotsLayer,
            shot: "id",
            filenames: "filenames",
            yaw: "yaw",
            rotation: "rotation_matrix",
            datetime: "utc_time",
            brightness: null,
            base: getBase(filenames && filenames.description),
            calibration: "calibration",
            rigId: null,
            calibrationBase: getBase(calibration.description),
            capture: "capture",
          });

          const buffer = {
            xmin: -0.005,
            ymin: -0.005,
            xmax: 0.005,
            ymax: 0.005,
          };
          const props = Object.keys(buffer);
          const extent = {};
          for (let i = 0; i < props.length; i++) {
            extent[props[i]] =
              parseFloat(layer.fullExtent[props[i]]) + buffer[props[i]];
          }

          sceneView.extent = extent;
        });

        const pointFeaturesUrl = `${src}/1`;
        console.log("points features url is", pointFeaturesUrl);
        const pointsFeaturesLayer = new FeatureLayer({
          url: pointFeaturesUrl,
          popupEnabled: true,
          popupTemplate: {
            title: "{reference}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "embed",
                    label: "content",
                  },
                ],
              },
            ],
          },
        });
        sceneView.map.add(pointsFeaturesLayer);
      }

      fovLayer = new GraphicsLayer({
        title: "GeoCam Field of View",
        geometryType: "point",
        spatialReference: {
          wkid: 4326,
        },
      });
      sceneView.map.layers.add(fovLayer);

      var handleKeyDown = function (evt) {
        const key = evt.key;
        switch (evt.key) {
          case "Escape": {
            viewlock(null);
            mapView.graphics.removeAll();
            break;
          }
          case " ": {
            spaceDown = true;
          }
        }
      };

      var handleKeyUp = function (evt) {
        const key = evt.key;
        switch (evt.key) {
          case " ": {
            spaceDown = false;
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);

  };

  this.destroy = function () {
    unsubFacing();
    unsubYaw();
    unsubAutorotate();
    unsubAutobrightness();
    unsubZoom();
    unsubCenter();
    unsubVisible();
    sceneView.map.removeLayer(fovLayer);
    viewer.wrapper.removeChild(autoRotateElement);
    viewer.wrapper.removeChild(autoBrightnessElement);
  };
};
