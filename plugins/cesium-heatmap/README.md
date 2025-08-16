# Cesium Heatmap Plugin

This plugin lets you display [heatmap.js](https://www.patrick-wied.at/static/heatmapjs/) data inside a [CesiumJS](https://cesium.com/platform/cesiumjs/) globe. It converts the heatmap canvas into a `Cesium.SingleTileImageryProvider` so it can be added as an imagery layer.

## Usage

```html
<script src="heatmap.min.js"></script>
<script src="Cesium.js"></script>
<script src="cesium-heatmap.js"></script>
<script>
  var viewer = new Cesium.Viewer('cesiumContainer');
  var rect = Cesium.Rectangle.fromDegrees(-120, 30, -110, 40);
  var ch = new CesiumHeatmap(viewer, rect, { size: 1024 });
  ch.addData({ x: 512, y: 512, value: 10 });
</script>
```

For a complete working example see [`examples/cesium-heatmap`](../../examples/cesium-heatmap).

Data coordinates are in pixel space relative to the off‑screen canvas size (`options.size`). Update the heatmap using `addData`, `setData`, or `repaint`.
