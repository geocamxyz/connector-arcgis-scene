# Arcgis Scene
A connector for the [geocamxyz/geocam-viewer](https://github.com/geocamxyz/geocam-viewer) defined as a web component which ties the viewer to a shots feature layer displayed on an arcgis webscene

### NPM Installation:
```
npm install 'https://gitpkg.now.sh/geocamxyz/connector-arcgis-scene/src?v2.0.3'
```
or for a particual commit version:
```
npm install 'https://gitpkg.now.sh/geocamxyz/connector-arcgis-scene/src?ecade5a'
```
### Import Scene (External Loading):
```
https://cdn.jsdelivr.net/gh/geocamxyz/connector-arcgis-scene@v2.0.3/dist/arcgis-scene.js
```
or for a particual commit version:
```
https://cdn.jsdelivr.net/gh/geocamxyz/connector-arcgis-scene@ecade5a/dist/arcgis-scene.js
```
### Usage:
The .js file can be imported into your .html file using the below code (This can be ignored if your using the NPM package).
```
 <script type="module" src="https://cdn.jsdelivr.net/gh/geocamxyz/connector-arcgis-scene@2.0.3/dist/arcgis-scene.js"></script>
 ```

 Or with an importscene
 ```
<script type="importscene">
  {
    "imports": {
      "arcgis-scene": "https://cdn.jsdelivr.net/gh/geocamxyz/connector-arcgis-scene@2.0.3/dist/arcgis-scene.js"
    }
  }
</script>
```
The viewer can then be imported via a module script or using the npm package and using the below import statement.
```
import "arcgis-scene"
```
### Setup:
The connector can be setup using the below code. It requires the [geocamxyz/geocam-viewer](https://github.com/geocamxyz/geocam-viewer) custom tag as the parent element.  There also needs to be a arcgis scene created which calls the connectors link method with the sceneview to correctly complete initialization.
```
<geocam-viewer>
  <geocam-viewer-arcgis-scene src="/arcgis/rest/services/0wlsvpg_3/FeatureServer"></geocam-viewer-arcgis-scene>
</geocam-viewer>
<div id="scene"></div>
```
At some point in the javascript which generates the scene...
```
  const sceneElement = document.getElementById("scene");
  const scene = new EsriScene({basescene: "satellite"});
  view = new SceneView({
    container: sceneElement,
    scene: scene,
   });
  const connector = document.getElementsByTagName("geocam-viewer-arcgis-scene")[0];
  connector.link(view);

```
The arcgis-scene connector has a single attibute:
- src *the geocam manager feature layer for the shots and features which can be copie from the relevant cell/workflow in manager*

The src attribute is readonly.  Once instantiated changing the src attribute will not change the shots associatd with the scene.