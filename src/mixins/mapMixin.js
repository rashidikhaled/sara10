/* eslint-disable no-undef */

import { Fill, Stroke, Style, Circle, Text } from "ol/style"
import { fromLonLat } from "ol/proj.js"

export default {
  computed: {
    mapNosaziCodeDigits () {
      return window.getConfigValue("mapConfig")?.MapNosaziCodeDigits || 4
    }
  },
  methods: {
    showCodeOnMap (code, usingEqualOperator = false) {
      if (!code) return

      code = code.split("-")
      if (usingEqualOperator) {
        for (let i = 0; i < 7 - code.length; i++) {
          code.push("0")
        }
      } else {
        code = code.slice(0, this.mapNosaziCodeDigits)
      }
      const expression = usingEqualOperator
        ? ` and (Code = '${code.join("-")}')`
        : `and (Code Like '${code.join("-")}-%')`
      this.$KaisMap.MapFind2(
        window.getConfigValue("mapConfig").DefaultSelectLayer,
        "",
        expression,
        1,
        true
      )
    }, // obj=> {WKT, ...}
    showWKT (
      obj,
      zoom = true,
      style = null,
      hideTooltip = false,
      layerName = ""
    ) {
      if (layerName) this.$KaisMap.ClearLayer(layerName, style)
      if (`${obj.WKT}`.toUpperCase().indexOf("LINESTRING") > -1) {
        this.showLineOnMap(obj, {
          ...(style ? { ...style } : {}),
          name: layerName,
          fit: true
        })
      } else {
        this.$KaisMap.ShowWkt(obj, false, style, hideTooltip, layerName)
        if (zoom) {
          this.mapZoom(12)
        }
      }
    },
    mapClear () {
      this.$KaisMap.ClearAllThings()
    },
    showOnMapByExpression (expression) {
      this.$KaisMap.MapFind2(
        window.getConfigValue("mapConfig").DefaultSelectLayer,
        "",
        expression,
        1,
        false
      )
    },
    mapZoom (zoom, duration = 2000) {
      this.$KaisMap.CMap.getView().animate({
        // center: vectorSource.getExtent(),
        zoom,
        duration
      })
    },
    getCenter () {
      let center = window.getConfigValue("mapConfig.center", [])
      const lat = window.getConfigValue("mapConfig.lat", "")
      const lon = window.getConfigValue("mapConfig.lon", "")

      if (lat && lon) center = [lon, lat]

      return center
    },
    setMapDefault () {
      this.$KaisMap.ClearAllThings()

      this.$KaisMap.CMap.getView().animate({
        center: fromLonLat(this.getCenter()),
        zoom: window.getConfigValue(
          "mapConfig.Zoom",
          window.getConfigValue("mapConfig.zoom", 12)
        ),
        duration: 700
      })
    },
    showLineOnMap (obj, opt = {}) {
      const mergedOption = Object.entries(opt).reduce(
        (acc, [key, optValue]) => (
          (acc[key] =
            optValue instanceof Object
              ? { ...acc[key], ...optValue }
              // eslint-disable-next-line no-sequences
              : optValue),
          acc
        ),
        {
          line: {
            fillColor: "#ffb300",
            strokeColor: "#ffb300",
            width: 3,
            radius: 4,
            dashed: false
          },
          tooltip: {
            show: false,
            text: "label",
            color: "#ffffff",
            font: "14px sans-serif",
            offsetY: 12,
            offsetX: 12,
            overflow: true,
            placement: "Line"
          },
          Name: "DefaultLayer"
        }
      )

      const style = new Style({
        fill: new Fill({
          color: mergedOption.line.fillColor
        }),
        stroke: new Stroke({
          color: mergedOption.line.strokeColor,
          width: mergedOption.line.width,
          lineDash: mergedOption.line.dashed ? [3, 5] : [0, 0]
        }),
        image: new Circle({
          radius: mergedOption.line.radius,
          fill: new Fill({
            color: mergedOption.line.fillColor
          }),
          stroke: new Stroke({
            color: mergedOption.line.strokeColor,
            width: mergedOption.line.width
          })
        }),
        ...(mergedOption.tooltip.show
          ? {
            text: new Text({
              text: mergedOption.tooltip.text,
              fill: new Fill({ color: mergedOption.tooltip.color }),
              offsetY: mergedOption.tooltip.offsetY,
              offsetX: mergedOption.tooltip.offsetX,
              stroke: new Stroke({
                color: "#000000",
                width: 2
              }),

              font: mergedOption.tooltip.font,
              overflow: mergedOption.tooltip.overflow,
              placement: mergedOption.tooltip.placement
            })
          }
          : {})
      })

      this.$KaisMap.ShowWkt(
        { WKT: obj.WKT, Name: mergedOption.Name },
        true,
        style,
        true
      )
    },
    selectLayer ({ id, name }) {
      alert(`لایه پیش فرض به لایه  ${name} تغییر یافت `)
      this.$KaisMap.DefaultSelectLayer = id
      this.$KaisMap.DefaultSelectLayerName = name
    }
  }
}
