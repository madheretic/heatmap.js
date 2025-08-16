/*
 * heatmap.js CesiumJS Overlay
 *
 * Provides a simple way to display heatmap.js data inside a CesiumJS globe
 * by converting the canvas output to a single tile imagery layer.
 */
;(function (name, context, factory) {
  // Supports UMD. AMD, CommonJS/Node.js and browser context
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(
      require('heatmap.js'),
      require('cesium')
    );
  } else if (typeof define === 'function' && define.amd) {
    define(['heatmap.js', 'cesium'], factory);
  } else {
    // browser globals
    if (typeof window.h337 === 'undefined') {
      throw new Error('heatmap.js must be loaded before the Cesium heatmap plugin');
    }
    if (typeof window.Cesium === 'undefined') {
      throw new Error('CesiumJS must be loaded before the Cesium heatmap plugin');
    }
    context[name] = factory(window.h337, window.Cesium);
  }
})("CesiumHeatmap", this, function(h337, Cesium) {
  'use strict';

  function CesiumHeatmap(viewer, rectangle, options) {
    this.viewer = viewer;
    this.rectangle = rectangle; // Cesium.Rectangle in radians
    this.options = options || {};

    // off-screen container for heatmap.js renderer
    var size = this.options.size || 1000;
    var container = document.createElement('div');
    container.style.width = size + 'px';
    container.style.height = size + 'px';
    this._container = container;

    var heatmapOptions = Object.assign({ container: container }, this.options.heatmap || {});
    this._heatmap = h337.create(heatmapOptions);
    this._layer = null;
  }

  CesiumHeatmap.prototype._updateLayer = function() {
    var dataURL = this._heatmap.getDataURL();
    if (this._layer) {
      this.viewer.imageryLayers.remove(this._layer, true);
    }
    this._layer = this.viewer.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
      url: dataURL,
      rectangle: this.rectangle
    }));
  };

  CesiumHeatmap.prototype.addData = function(points) {
    this._heatmap.addData(points);
    this._updateLayer();
  };

  CesiumHeatmap.prototype.setData = function(data) {
    this._heatmap.setData(data);
    this._updateLayer();
  };

  CesiumHeatmap.prototype.repaint = function() {
    this._heatmap.repaint();
    this._updateLayer();
  };

  return CesiumHeatmap;
});
