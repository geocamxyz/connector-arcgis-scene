import { arcgisScene } from "./lib/arcgis-scene.js";

export class GeocamViewerArcgisScene extends HTMLElement {
  constructor() {
    super();
    this.plugin = null;
    console.log("GeocamViewerArcgisScene init");
  }

  connectedCallback() {
    this.link = function (sceneView) {
      console.log("linking to ", sceneView);
      const src = this.getAttribute("src");
      if (!src) console.warn("No src attribute on geocam-viewer-arcgis-scene");
      const parent = this.parentNode;
      this.viewer = parent.viewer;
      this.sceneView = sceneView;
      if (this.viewer && this.viewer.plugin) {
        const prevnext = document.getElementsByTagName(
          "geocam-viewer-prev-next-control"
        )[0];
        const prevNextPlugin = prevnext && prevnext.plugin;
        this.plugin = new arcgisScene({ sceneView, prevNextPlugin, src });
        parent.viewer.plugin(this.plugin);
        const screenShot = parent.getElementsByTagName(
          "geocam-viewer-screen-shot"
        )[0];
        if (screenShot && screenShot.plugin) {
          screenShot.plugin.arcgisView(sceneView);
        }
      } else {
        console.error("GeocamViewerArcgisScene must be a child of GeocamViewer");
      }
    };
    console.log("GeocamViewerArcgisScene connected");
  }

  disconnectedCallback() {
    this.plugin = null;
    this.viewer = null;
    this.sceneView = null;
    console.log("GeocamViewerArcgisScene disconnected");
    // Clean up the viewer
  }
}

window.customElements.define("geocam-viewer-arcgis-scene", GeocamViewerArcgisScene);
