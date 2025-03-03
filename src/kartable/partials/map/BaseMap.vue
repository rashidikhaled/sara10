<template>
  <div :id="mapID" :title="hoveredFeature.tooltip"></div>
</template>

<script>
import Map from 'ol/Map'
import WKT from 'ol/format/WKT'
import Draw from 'ol/interaction/Draw'
import { OSM, Vector as VectorSource, TileImage } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { defaults as defaultControls } from 'ol/control'
import { transform } from 'ol/proj'
import {
  Style, Fill, Stroke, Circle
} from 'ol/style'
import { uid } from 'quasar'
import CC1 from './cc1'

export default {
  name: 'BaseMap',

  props: {
    wktList: Array,
    selectedCoords: Array,
    updateView: Boolean,
    drawType: String,
    center: Array,
    zoom: {
      type: Number,
      default: 13
    }
  },

  watch: {
    wktList () {
      this.showWKT(this.wktList)
    },
    center () {
      this.setCenter()
    }
  },

  data () {
    return {
      mapID: uid(),
      wktListCache: [],
      vectorSource: null,
      vectorLayer: null,
      tileLayer: null,
      map: null,
      draw: null,
      hoveredFeature: {
        id: null,
        tooltip: null,
        pixels: [0, 0]
      }
    }
  },

  methods: {
    showWKT (wktShapes = this.wktListCache, { updateView = this.updateView } = {}) {
      if (!Array.isArray(wktShapes)) {
        return
      }
      this.wktListCache = [...wktShapes]
      if (!this.map) {
        // Map is not init yet
        return
      }
      this.vectorSource.clear()

      // Draw WKTs
      let viewFeature
      wktShapes.forEach(wkt => {
        const formatWKT = new WKT()
        const wktFeature = formatWKT.readFeature(wkt.location || wkt, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        })
        wktFeature.set('tooltip', wkt.tooltip)
        if (wkt.style) {
          wktFeature.setStyle(wkt.style)
        }
        this.vectorSource.addFeature(wktFeature)
        viewFeature = wktFeature
      })

      // Set zoom and position
      if (updateView && viewFeature) {
        const extend = viewFeature.getGeometry().getExtent().slice(0)
        this.map.getView().fit(extend, {
          size: this.map.getSize(),
          maxZoom: this.zoom
          // padding: [20, 20, 20, 20],
        })
      }
    },

    setCenter ({ center = this.center, zoom = this.zoom } = {}) {
      if (Array.isArray(center)) {
        this.map.getView().setCenter(transform(center, 'EPSG:4326', 'EPSG:3857'))
        this.map.getView().setZoom(zoom || 15)
      }
    },
    updateSize () {
      this.map.updateSize()
    },
    mapClicked (evt) {
      const [lon, lat] = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
      this.$emit('update:selectedCoords', [lon, lat])
      this.$emit('mapClicked', [lon, lat])
      if (this.selectedCoords) {
        this.$nextTick(() => {
          this.showWKT(undefined, { updateView: false })
        })
      }
    },
    pointerMove (evt) {
      const pixel = this.map.getEventPixel(evt.originalEvent)
      const feature = this.map.forEachFeatureAtPixel(pixel, (f) => f)
      if (feature) {
        const ID = feature.get('id')
        if (ID !== this.hoveredFeature.id) {
          this.hoveredFeature = {
            id: ID,
            tooltip: feature.get('tooltip'),
            pixels: pixel
          }
        }
      } else {
        this.hoveredFeature = {
          id: null,
          tooltip: null,
          pixels: [0, 0]
        }
      }
    },

    /** Capture current map's state image
     *  Return a base64 sting
     * @returns {Promise<String>}
     */
    captureImage () {
      const handler = done => {
        const mapCanvas = document.createElement('canvas');
        [mapCanvas.width, mapCanvas.height] = this.map.getSize()

        const mapContext = mapCanvas.getContext('2d')
        const allCanvas = document.querySelectorAll('.ol-layer canvas')
        Array.prototype.forEach.call(allCanvas, canvas => {
          if (canvas.width > 0) {
            const { opacity } = canvas.parentNode.style
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity)

            // Get the transform parameters from the style's transform matrix
            const matrix = canvas.style.transform.match(/^matrix\(([^(]*)\)$/)[1].split(',').map(Number)

            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix)
            mapContext.drawImage(canvas, 0, 0)
          }
        })
        done(mapCanvas.toDataURL())
      }
      return new Promise((resolve, reject) => {
        this.map.once('rendercomplete', handler(resolve, reject))
        this.map.renderSync()
      })
    },
    initMap () {
      const fill = new Fill({
        color: 'rgba(255,0,0,0.4)'
      })
      const stroke = new Stroke({
        color: '#fa0202',
        width: 1.25
      })

      const style = new Style({
        fill,
        stroke,
        image: new Circle({
          fill,
          stroke,
          radius: 5
        })
      })

      this.vectorSource = new VectorSource()
      this.vectorLayer = new VectorLayer({
        source: this.vectorSource,
        style
      })

      this.tileLayer = new TileLayer({
        source: new OSM(),
        opacity: 0.9
      })

      const tilLayer = new TileLayer({
        source: new TileImage({
          tileUrlFunction (tileCoord) {
            if (!tileCoord) {
              return undefined
            }

            const serverUrl = 'http://sdi.mashhad.ir:8040/SafaMapTileEngine/MapTile.ashx?x={x}&y={y}&z={z}&Key={layerid}'
            const layerID = 10078
            // const az = tileCoord[0];
            // const ax = tileCoord[1];
            // const ay = tileCoord[2];
            const [az, ax, ay] = tileCoord
            // const ay = -tileCoord[2] - 1;
            const c = new CC1()
            let tmpc = serverUrl.replace(' ', '') // .toLowerCase();
            tmpc = tmpc
              .replace('{x}', ax)
              .replace('{y}', ay)
              .replace('{z}', az)
              .replace('{layerid}', layerID)
            const tmp1 = `${tmpc}&r=${c.calcTile(c.kk(az, ax, ay))}`

            return tmp1
          },
          crossOrigin: 'Anonymous'
        })
      })
      this.map = new Map({
        layers: [this.tileLayer, tilLayer, this.vectorLayer],
        target: this.mapID,
        pixelRatio: 1,
        controls: defaultControls({
          attribution: false,
          zoom: true,
          rotate: true
        })
      })
      if (this.drawType) {
        this.draw = new Draw({
          source: this.vectorSource,
          type: this.drawType
        })
        this.draw.on('drawstart', () => {
          this.vectorSource.clear()
        })
        this.draw.on('drawend', ({ feature }) => {
          const coords = feature.getGeometry().getCoordinates()
          this.$emit('drawn', coords[0])
        })
        this.map.addInteraction(this.draw)
      }
      this.map.on('click', this.mapClicked)
      this.map.on('pointermove', this.pointerMove)
    }
  },

  mounted () {
    this.initMap()
    this.$nextTick(() => {
      this.showWKT(this.wktList, { updateView: true })
      if (this.center) {
        this.setCenter()
      }
    })
  },

  destroyed () {
    if (this.map) {
      this.map.setTarget(null)
      this.map = null
    }
  }
}
</script>
