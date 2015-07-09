<img src="https://rawgit.com/thure/lumine/master/docs/assets/lumine.svg" height="120"/>

Lumine is a content display framework built on WebGL with the help of [three.js](http://threejs.org/). With Lumine, you can present text, media, and anything else you can create in WebGL in ways HTML and CSS alone could never hope to achieve.

### Bear in mind

This is under active early development and, as such, the API will probably change often. If you'd like to use Lumine, make sure to use a specific commit of this repository, otherwise your code might break sometime down the road.

# How it works

Lumine composes Layers into Scenes, and renders Scenes onto Canvases, which can be `<canvas>` elements or any surface hosted by a Layer. With this kind of structure, you're free to create complex and flexible visual effects without heaping code into a single global JavaScript file.

Lumine is written as a series of modules and libraries in CommonJS. Projects using Lumine can be built using Browserify, Webpack, or any other build process that supports CommonJS modules and special dependencies like GLSL files.

# Getting started

First, Lumine needs the layers and scenes you plan on using, a configuration object to tell it what to do, and the `<canvas>` element it should render to.

Call `Lumine.use` to equip Lumine with the Scenes and Layers you'll use:

```js
Lumine.use({
  Scenes: {
    'content': require('lumine-scene')
  },
  Layers: {
    'typeform': require('lumine-layer-typeform'),
  }
});
```

The keys inside `Scenes` and `Layers` need to match the keys and/or types of the Scenes and Layers in the configuration, which will look something like this:

```js
var config = {
  'content': {
    layers: [
      {
        type: 'typeform',
        content: '<h1>Hello, world.</h1>',
        css: 'h1{ font-style: italic; }'
      }
    ]
  }
}
```

The top-level keys of the config is the type of Scene. This is a problematic API and will change shortly.

Inside a scene is at least a `layers` key which is an array of Layers to use. The `type` key is needed for all Layers – the rest depends on the needs of the Layer type.

Once the DOM is ready, start Lumine with `Lumine.init`:

```js
Lumine.init(config, { canvas: document.querySelector('canvas') });
```