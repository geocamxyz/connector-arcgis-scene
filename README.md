# Arcgis Scene
A connector for the geocam-viewer.
### NPM Installation:
```
npm install 'https://gitpkg.now.sh/geocamxyz/plugin-arcgis-scene/src?v1.0.0'
```
or for a particual commit version:
```
npm install 'https://gitpkg.now.sh/geocamxyz/plugin-arcgis-scenesrc?397d152'
```
### Import Map (External Loading):
```
https://cdn.jsdelivr.net/gh/geocamxyz/plugin-arcgis-scene@v1.0.0/dist/arcgis-scene.js
```
or for a particual commit version:
```
https://cdn.jsdelivr.net/gh/geocamxyz/plugin-arcgis-scene@397d152/dist/arcgis-scene.js
```
### Usage:
The .js file can be imported into your .html file using the below code (This can be ignored if your using the NPM package).
```
<script type="importmap">
  {
    "imports": {
      "arcgis-scene": "https://cdn.jsdelivr.net/gh/geocamxyz/plugin-arcgis-scene@v1.0.0/dist/arcgis-scene.js"
    }
  }
</script>
```
The connector can be imported via a module script or using the npm package and using the below import statement.
```
import { arcgisScene } from "arcgis-scene"
```
### Setup:
The connector can be setup using the below code. It requires a scene element which is usually layout such as 
```
<div class="wrapper">
  <div id="scene" class="scene" />
</div>
```
We get that scene element and use it in the archisScene.
```
const sceneElement = document.getElementById("scene");
scenePromise.then((sceneView) => {
      if (sceneView) {
        sceneView.when(() => {
          viewer.plugin(
            new arcgisScene({
              sceneElement,
              // Plugins
            })
          ); //
        });
      }
    });
});
```