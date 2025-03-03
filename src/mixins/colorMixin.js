import { colors } from 'quasar'
import { colord } from 'colord'

const { getPaletteColor } = colors

export default {
  computed: {
    primaryColor () {
      return this.$stKartable.getters['formSettings/primaryColor']
    },
    textColor () {
      return this.$stKartable.getters['formSettings/textColor']
    },
    primaryGradientColor () {
      return this.$stKartable.getters['formSettings/primaryGradientColor']
    },
    primaryColorLighten () {
      return this.$stKartable.getters['formSettings/primaryColorLighten']
    },
    primaryColorDarken () {
      return this.$stKartable.getters['formSettings/primaryColorDarken']
    },
    selectedPrimaryColor () {
      return this.selectedColor.baseColor
    }
  },
  data () {
    return {
      paletteColors: [{
        baseColor: '#005be2', gradient: 'linear-gradient(to right, #005be2, #005fed)', textColor: 'white'
      }, {
        baseColor: '#0d0d8c',
        gradient: 'linear-gradient(-45deg, hsl(240deg 83% 30%) 0%, hsl(289deg 79% 40%) 11%,hsl(252deg 82% 32%) 100%)',
        textColor: 'white'
      }, {
        baseColor: '#152ae6',
        gradient: 'linear-gradient(90deg, rgba(79,140,236,1) 0%, rgba(21,42,230,1) 100%)',
        textColor: 'white'
      }, {
        baseColor: '#6358ee',
        gradient: 'linear-gradient( 83.2deg, rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% )',
        textColor: 'white'
      }, {
        baseColor: '#dee7f1', gradient: 'linear-gradient(to top, #cfd9df, #e2ebf0)', textColor: '#585858'
      }, {
        baseColor: '#f37335', gradient: 'linear-gradient(to right, #ffbd00, #f37335)', textColor: 'white'
      }, {
        baseColor: '#cb356b', gradient: 'linear-gradient(to left, #cb356b, #bd3f32)', textColor: 'white'
      }, {
        baseColor: '#f85032', gradient: 'linear-gradient(to right, #f85032, #e73827)', textColor: 'white'
      }, {
        baseColor: '#004e92', gradient: 'linear-gradient(to right, #000428, #004e92)', textColor: 'white'
      }, {
        baseColor: '#00adff', gradient: 'linear-gradient(to right, #0ad3ca,#33d1ff, #00adff)', textColor: 'white'
      }, {
        baseColor: '#17c4db',
        gradient: 'linear-gradient( 68.4deg, rgb(2 193 148) -0.4%, rgb(23 196 219) 100.2% )',
        textColor: 'white'
      }, {
        baseColor: '#5093c3', gradient: 'linear-gradient( 135deg, #759dbb 10%, #5093c3 100%)', textColor: 'white'
      }, {
        baseColor: '#50c39d',
        gradient: 'linear-gradient( 135deg, #9dbb75 10%, #c2c350 , #50c39d 100%)',
        textColor: 'white'
      }, {
        baseColor: '#8c50c3',
        gradient: 'linear-gradient( 135deg, #bb75af 10%, #669cd1 , #8c50c3 100%)',
        textColor: 'white'
      }, {
        baseColor: '#123597', gradient: 'linear-gradient( 135deg, #6477c7 10%, #123597 100%)', textColor: 'white'
      }, {
        baseColor: '#45ad4a', gradient: 'linear-gradient(90deg, #4caf50 0%, #45ad4a 100%)', textColor: 'white'
      }],

      selectedColor: {}
    }
  },
  methods: {
    setDarkMode (value) {
      this.$q.dark.set(value)
      // localStorage.darkMode = value
    },
    setPrimaryColor (color) {
      this.selectedColor =
        typeof color === "string"
          ? {
            baseColor: color,
            gradient: "",
            textColor: this.checkIsLight(color) ? "white" : "#585858"
          }
          : {
            baseColor: color.baseColor,
            gradient: color.gradient,
            textColor: color.textColor || "white"
          }

      this.$nextTick(() => {
        document.documentElement.style.setProperty('--q-color-primary', this.selectedColor.baseColor)
        document.documentElement.style.setProperty('--text-theme-color', this.selectedColor.textColor)
        document.documentElement.style.setProperty('--q-color-primary-gradient', this.selectedColor.gradient || this.selectedColor.baseColor)
        document.documentElement.style.setProperty('--q-color-primary-lighten', colord(this.selectedColor.baseColor).lighten(0.1).toHex())
        document.documentElement.style.setProperty('--q-color-primary-darken', colord(this.selectedColor.baseColor).darken(0.05).toHex())
      })

      // let gradient = ''
      // let baseColor = ''
      // let textColor = 'white'
      // if (typeof color === 'string') {
      //   baseColor = color
      //   gradient = ''
      //   textColor = this.checkIsLight(color) ? 'white' : "#585858"
      // } else {
      //   console.log('setPrimaryColor', color)
      //   baseColor = color.baseColor
      //   gradient = color.gradient
      //   textColor = color.textColor || 'white'
      // }

      /*
            this.$nextTick(() => {
              document.documentElement.style.setProperty('--q-color-primary', color)
              document.documentElement.style.setProperty('--q-color-primary-lighten', lighten)
              document.documentElement.style.setProperty('--q-color-primary-darken', darken)
            }) */
    },
    async fetchPrimaryColor () {
      await this.$stKartable.dispatch('formSettings/getSettings', {
        key: 'primaryColor',
        defaultValue: {
          baseColor: getPaletteColor('primary'), gradient: '', textColor: 'white'
        }
      })
    },
    async savePrimaryColor () {
      const { baseColor, gradient, textColor } = this.selectedColor
      await this.$stKartable.dispatch('formSettings/saveSettings', {
        key: 'primaryColor',
        value: {
          baseColor, gradient, textColor
        }
      })
    },
    resetPrimaryColor () {
      this.updateCssPrimaryColor()
    },
    updateCssPrimaryColor () {
      if (!this.primaryColor) return
      this.$nextTick(() => {
        document.documentElement.style.setProperty('--q-color-primary', this.primaryColor)
        document.documentElement.style.setProperty('--text-theme-color', this.textColor)
        document.documentElement.style.setProperty('--q-color-primary-gradient', this.primaryGradientColor)
        document.documentElement.style.setProperty('--q-color-primary-lighten', this.primaryColorLighten)
        document.documentElement.style.setProperty('--q-color-primary-darken', this.primaryColorDarken)

        this.selectedColor = {
          baseColor: this.primaryColor,
          gradient: this.primaryGradientColor,
          textColor: this.textColor

        }
      })
    },
    setThemePreference () {
      const d = new Date()
      /*
      * The getHours() method returns the hour (from 0 to 23) of the specified date and time.
      * Early mornig = 0 - 6
      * Morning = 6 - 12
      * Evening = 12 - 18
      * Night = 18 - 23
      */
      const currentHour = d.getHours()
      this.setDarkMode(currentHour >= 19 || currentHour <= 6)
    },
    checkIsLight (color, percentage = 155) {
      color = color.substring(1)
      let rgb = parseInt(color, 16)
      let r = (rgb >> 16) & 0xff
      let g = (rgb >> 8) & 0xff
      let b = (rgb >> 0) & 0xff

      return (0.2126 * r + 0.7152 * g + 0.0722 * b) < percentage
    }
  },
  watch: {
    primaryColor () {
      this.updateCssPrimaryColor()
    }
  },
  mounted () {
    /* if (localStorage.darkMode) {
      this.setDarkMode(JSON.parse(localStorage.darkMode))
    } else {
      this.setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    } */
    this.setThemePreference()
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.setDarkMode(event.matches)
    })
  }
}
