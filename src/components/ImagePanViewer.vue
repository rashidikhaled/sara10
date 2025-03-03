<template>
  <div class="image-pan-wrapper">
    <div class="imagePanViewer" ref="imagePanViewer">
      <div class="thumbBox" ref="thumbBox"></div>
    </div>
    <div class="spinner" ref="spinner" style="display: none">Loading...</div>
    <div class="pan-toolbar">
      <span @click="zoomIn" class="zoomIn"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.881px" height="122.88px" viewBox="0 0 122.881 122.88" enable-background="new 0 0 122.881 122.88" xml:space="preserve"><g><path d="M56.573,4.868c0-0.655,0.132-1.283,0.37-1.859c0.249-0.6,0.61-1.137,1.056-1.583C58.879,0.545,60.097,0,61.44,0 c0.658,0,1.287,0.132,1.863,0.371c0.012,0.005,0.023,0.011,0.037,0.017c0.584,0.248,1.107,0.603,1.543,1.039 c0.881,0.88,1.426,2.098,1.426,3.442c0,0.03-0.002,0.06-0.006,0.089v51.62l51.619,0c0.029-0.003,0.061-0.006,0.09-0.006 c0.656,0,1.285,0.132,1.861,0.371c0.014,0.005,0.025,0.011,0.037,0.017c0.584,0.248,1.107,0.603,1.543,1.039 c0.881,0.88,1.428,2.098,1.428,3.441c0,0.654-0.133,1.283-0.371,1.859c-0.248,0.6-0.609,1.137-1.057,1.583 c-0.445,0.445-0.98,0.806-1.58,1.055v0.001c-0.576,0.238-1.205,0.37-1.861,0.37c-0.029,0-0.061-0.002-0.09-0.006l-51.619,0.001 v51.619c0.004,0.029,0.006,0.06,0.006,0.09c0,0.656-0.133,1.286-0.371,1.861c-0.006,0.014-0.012,0.025-0.018,0.037 c-0.248,0.584-0.602,1.107-1.037,1.543c-0.883,0.882-2.1,1.427-3.443,1.427c-0.654,0-1.283-0.132-1.859-0.371 c-0.6-0.248-1.137-0.609-1.583-1.056c-0.445-0.444-0.806-0.98-1.055-1.58h-0.001c-0.239-0.575-0.371-1.205-0.371-1.861 c0-0.03,0.002-0.061,0.006-0.09V66.303H4.958c-0.029,0.004-0.059,0.006-0.09,0.006c-0.654,0-1.283-0.132-1.859-0.371 c-0.6-0.248-1.137-0.609-1.583-1.056c-0.445-0.445-0.806-0.98-1.055-1.58H0.371C0.132,62.726,0,62.097,0,61.44 c0-0.655,0.132-1.283,0.371-1.859c0.249-0.6,0.61-1.137,1.056-1.583c0.881-0.881,2.098-1.426,3.442-1.426 c0.031,0,0.061,0.002,0.09,0.006l51.62,0l0-51.62C56.575,4.928,56.573,4.898,56.573,4.868L56.573,4.868z"/></g></svg></span>
      <span @click="zoomOut" class="zoomOut"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.881px" height="9.737px" viewBox="0 0 122.881 9.737" enable-background="new 0 0 122.881 9.737" xml:space="preserve"><g><path d="M117.922,0.006C117.951,0.002,117.982,0,118.012,0c0.656,0,1.285,0.132,1.861,0.371c0.014,0.005,0.025,0.011,0.037,0.017 c0.584,0.248,1.107,0.603,1.543,1.039c0.881,0.88,1.428,2.098,1.428,3.441c0,0.654-0.133,1.283-0.371,1.859 c-0.248,0.6-0.609,1.137-1.057,1.583c-0.445,0.445-0.98,0.806-1.58,1.055v0.001c-0.576,0.238-1.205,0.37-1.861,0.37 c-0.029,0-0.061-0.002-0.09-0.006c-37.654,0-75.309,0.001-112.964,0.001c-0.029,0.004-0.059,0.006-0.09,0.006 c-0.654,0-1.283-0.132-1.859-0.371c-0.6-0.248-1.137-0.609-1.583-1.056C0.981,7.865,0.621,7.33,0.372,6.73H0.371 C0.132,6.154,0,5.525,0,4.869C0,4.215,0.132,3.586,0.371,3.01c0.249-0.6,0.61-1.137,1.056-1.583 c0.881-0.881,2.098-1.426,3.442-1.426c0.031,0,0.061,0.002,0.09,0.006C42.613,0.006,80.268,0.006,117.922,0.006L117.922,0.006z"/></g></svg></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePanViewer',
  props: {
    imageSrc: {
      type: String,
      default: 'https://andrewprokos.com/wp-content/uploads/CENTRAL-PARK-LAWN-PANO-1200PX-PROKOS-1.jpg'
    },
    viewport: {
      type: Object,
      default: () => ({
        width: 400,
        height: 300
      })
    },
    maxZoom: {
      type: Number,
      default: 2.5
    }
  },
  data () {
    return {
      image: new Image(),
      state: {},
      ratio: 1
    }
  },
  computed: {
    imgWidth () {
      if (this.image) return parseInt(this.image.width) * this.ratio
      return 0
    },
    imgHeight () {
      if (this.image) return parseInt(this.image.height) * this.ratio
      return 0
    }
  },
  methods: {
    getDataURL: function () {
      const thumbBox = this.$refs.thumbBox
      const el = this.$refs.imagePanViewer
      let width = thumbBox.clientWidth,
        height = thumbBox.clientHeight,
        canvas = document.createElement('canvas'),
        dim = el.style.backgroundPosition.split(' '),
        size = el.style.backgroundSize.split(' '),
        dx = parseInt(dim[0]) - el.clientWidth / 2 + width / 2,
        dy = parseInt(dim[1]) - el.clientHeight / 2 + height / 2,
        dw = parseInt(size[0]),
        dh = parseInt(size[1]),
        sh = parseInt(this.image.height),
        sw = parseInt(this.image.width)

      canvas.width = width
      canvas.height = height
      let context = canvas.getContext('2d')
      context.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh)
      let imageData = canvas.toDataURL('image/png')
      return imageData
    },
    getBlob: function () {
      let imageData = this.getDataURL()
      let b64 = imageData.replace('data:image/png;base64,', '')
      let binary = atob(b64)
      let array = []
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      return new Blob([new Uint8Array(array)], { type: 'image/png' })
    },
    zoomIn: function () {
      this.setRatio(this.ratio * 1.1)
      this.setBackground()
    },
    zoomOut: function () {
      this.setRatio(this.ratio * 0.9)
      this.setBackground()
    },
    attachEvent (node, event, cb) {
      if (node.attachEvent) {
        node.attachEvent('on' + event, cb)
      } else if (node.addEventListener) {
        node.addEventListener(event, cb)
      }
    },
    detachEvent (node, event, cb) {
      if (node.detachEvent) {
        node.detachEvent('on' + event, cb)
      } else if (node.removeEventListener) {
        node.removeEventListener(event, this.render)
      }
    },
    stopEvent (e) {
      if (window.event) {
        e.cancelBubble = true
      } else {
        e.stopImmediatePropagation()
      }
    },
    setRatio (value) {
      // console.log('this.ratio', this.ratio)
      // console.log('new width', parseInt(this.image.width) * value)
      // console.log(parseInt(this.image.width) * value < this.viewport.width)
      if (parseInt(this.image.width) * value < this.viewport.width) return
      if (parseInt(this.image.height) * value < this.viewport.height) return
      if (value > this.maxZoom) return
      // console.log('set ratio')
      this.ratio = value
    },
    setBackground () {
      let w = this.imgWidth
      let h = this.imgHeight

      let pw = (this.$refs.imagePanViewer.clientWidth - w) / 2
      let ph = (this.$refs.imagePanViewer.clientHeight - h) / 2

      this.$refs.imagePanViewer.setAttribute('style',
        'background-image: url(' + this.image.src + '); ' +
          'background-size: ' + w + 'px ' + h + 'px; ' +
          'background-position: ' + pw + 'px ' + ph + 'px; ' +
          'background-repeat: no-repeat;' +
          `width: ${this.viewport.width}px; height: ${this.viewport.height}px`)
    },
    imgMouseDown (e) {
      this.stopEvent(e)

      this.state.dragable = true
      this.state.mouseX = e.clientX
      this.state.mouseY = e.clientY
    },
    imgMouseMove (e) {
      this.stopEvent(e)

      if (this.state.dragable) {
        let x = e.clientX - this.state.mouseX
        let y = e.clientY - this.state.mouseY

        let bg = this.$refs.imagePanViewer.style.backgroundPosition.split(' ')

        let bgX = x + parseInt(bg[0])
        let bgY = y + parseInt(bg[1])

        console.log('info', {
          'imageW': this.imgWidth,
          'viewport': parseInt(this.viewport.width),
          'bgX': Math.abs(bgX)
        })

        // this code for prevent user pan out of image size
        const offsetX = this.imgWidth - (Math.abs(bgX) + parseInt(this.viewport.width))
        if (offsetX < 0) { // handle user pan to left
          bgX = -(this.imgWidth - parseInt(this.viewport.width))
        } else if (bgX > 0) {
          bgX = 0
        }
        const offsetY = this.imgHeight - (Math.abs(bgY) + parseInt(this.viewport.height))
        if (offsetY < 0) { // handle user pan to left
          bgY = -(this.imgHeight - parseInt(this.viewport.height))
        } else if (bgY > 0) {
          bgY = 0
        }
        console.log('bgY', bgY)
        console.log('offsetY', offsetY)
        // if (bgY > 0) bgY = 0

        // TODO: implement above code for height

        this.$refs.imagePanViewer.style.backgroundPosition = bgX + 'px ' + bgY + 'px'

        this.state.mouseX = e.clientX
        this.state.mouseY = e.clientY
      }
    },
    imgMouseUp (e) {
      this.stopEvent(e)
      this.state.dragable = false
    },
    zoomImage (e) {
      let evt = window.event || e
      let delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta
      delta > -120 ? this.setRatio(this.ratio * 1.1) : this.setRatio(this.ratio * 0.9)
      this.setBackground()
    },
    initPlugin () {
      this.$refs.spinner.style.display = 'block'
      const self = this
      this.image.onload = function () {
        self.$refs.spinner.style.display = 'none'
        self.setBackground()

        self.attachEvent(self.$el, 'mousedown', self.imgMouseDown)
        self.attachEvent(self.$el, 'mousemove', self.imgMouseMove)
        self.attachEvent(document.body, 'mouseup', self.imgMouseUp)
        let mousewheel = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel'
        self.attachEvent(self.$el, mousewheel, self.zoomImage)
      }
      self.image.src = self.imageSrc
      self.attachEvent(self.$el, 'DOMNodeRemoved', function () {
        self.detachEvent(document.body, 'DOMNodeRemoved', self.imgMouseUp)
      })
    },
    destroyPlugin () {
      this.detachEvent(document.body, 'DOMNodeRemoved', this.imgMouseUp)
    }
  },
  mounted () {
    this.initPlugin()
  },
  beforeDestroy () {
    this.destroyPlugin()
  },
  watch: {
    imageSrc () {

    }
  }
}
</script>

<style scoped lang="scss">
  .image-pan-wrapper {
    position: relative;

    .pan-toolbar {
      position: absolute;
      bottom: 10px;
      right: 10px #{"/* rtl:ignore */"};
      display: flex;
      align-items: center;
      background-color: rgba(255,255,255,.8);
      border-radius: 4px;

       > span {
         display: inline-block;
         width: 24px;
         height: 24px;
         padding: 5px;

         &:first-child {
             border-right: 1px solid #777;
         }
         svg {
           max-width: 100%;
           max-height: 100%;
           height: 100%;
           path{
             fill: #000;
           }
         }
      }
    }
  }
  .imagePanViewer {
    position: relative;
    width: 600px;
    height: 300px;
    border: 1px solid #aaa;
    background: #fff;
    overflow: hidden;
    background-repeat: no-repeat;
    cursor: move;
    transition: all 0.3s ease;
    will-change: background-position;
  }

  .imagePanViewer .thumbBox {
    position: absolute;
    top: 0%;
    left: 0%;
    right: 0%;
    bottom: 0%;
    box-sizing: border-box;
    border: 1px solid rgb(102, 102, 102);
    box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
    background: none repeat scroll 0% 0% transparent;
  }

  .imagePanViewer .spinner {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    line-height: 400px;
    background: rgba(0, 0, 0, 0.7);
  }
</style>
