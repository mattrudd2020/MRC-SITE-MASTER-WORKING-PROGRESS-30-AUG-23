require.config({
  paths: {
    'myModule': 'path/to/myModule'
  }
});

// Define a module named 'myModule'
define('myModule', ['text!https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports,min/optimized/three.js', 'text!https://cdn.skypack.dev/three@0.136.0/examples/jsm/renderers/SVGRenderer.js', 'text!https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/OBJLoader.js'], function (threeText, SVGRendererText, OBJLoaderText) {

  // Use the Function constructor to evaluate the text and create the required objects
  var THREE = (new Function(threeText))();
  var SVGRenderer = (new Function(SVGRendererText))().SVGRenderer;
  var OBJLoader = (new Function(OBJLoaderText))().OBJLoader;

  // Export the dependencies as an object
  return {
    THREE: THREE,
    SVGRenderer: SVGRenderer,
    OBJLoader: OBJLoader
  };
});