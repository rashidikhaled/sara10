<template>
  <div class="nosazicode-wrapper flex no-wrap items-center"
       :class="(loading?'loading':'') + (showActions?' show-actions':'')">
    <div class="col-auto" v-if="hasSlot('before')">
      <slot name="before"></slot>
    </div>
    <div class="col-auto" v-if="hasSlot('label') || label">
      <slot name="label">
        <div :style="{width: labelWidth || 'auto'}"><label>{{ label }}</label></div>
      </slot>
    </div>
    <div class="nosazicode-box relative-position items-center" dir="ltr">
      <div v-if="!isEditable" class="nosazi-disabled flex no-wrap items-center" style="cursor: not-allowed">
          <span
            class="nosazi-disabled-input"
            :key="part"
            :title="getPartName(i)"
            v-for="(part, i) in sections">
          {{ code[part] }}
          </span>
      </div>
      <template v-else>
        <auto-width-input
          v-for="(part,i) in sections"
          :key="part"
          :min="0"
          :readonly="!isEnable(i)"
          :title="getPartName(i)"
          type="number"
          :data-index="i"
          @keyup.enter="processKey"
          onclick="this.select()"
          v-model="code[part]"
          @invalidRange="($event)=>{}"
          @input="onCalculateMaxLength(i,part)"
          @keydown.ctrl.86.prevent="ctrlVPressed"
          :class=" `${invalidRange===false ? (invalidDistrict === false ? (`${code[part]}`==='0'?'is-empty':'is-valid') :(`${code[part]}`==='0'?'is-empty':'is-invalid')) :'is-invalid'}` "
          :ref="`nosaziInputRef_${i}`"
        />
      </template>
      <div v-if="loading" class="loading-overlay text-center absolute-full">
        <q-spinner-dots
          color="primary"
          size="sm"
        />
      </div>
    </div>
    <div v-if="actions && isEditable" class="nosazi-actions">
      <div class="n-action-wrap">
        <span key="s3" class="q-mx-xs"><q-icon @click="runAction('codeFromMap')" class="cursor-pointer"
                                               title="انتخاب کد نقشه" color="primary" name="place"
                                               size="20px"/></span>
        <span class="n-action-handler" @click="showActions=!showActions">
          <q-icon :name="showActions ? 'close' : 'more_horiz'" size="sm"/>
        </span>
        <div class="n-action-items bg-white" v-if="showActions">
            <span key="s1" class="q-mx-xs"><q-icon @click="runAction('search')" class="cursor-pointer"
                                                   title="جستجوی ملک" color="green" name="search"
                                                   size="21px"/>

    <q-popup-proxy>
      <div class="nosazi_search_popup" style="width: 1400px;height: 800px; max-width: 80vw; max-height: 80vh;">
        <fit>
          <UNosaziCodeSearch
            @onCloseModal="showSearch = false"
            :selectable="true"
            @selectNosaziCode="selectNosaziCode"
            :NosaziCode="value"
          />
        </fit>
      </div>
    </q-popup-proxy>
            </span>
          <span key="s2" class="n-gap text-grey-4 q-px-xs">|</span>
          <!--          <span key="s3" class="q-mx-xs"><q-icon @click="runAction('codeFromMap')" class="cursor-pointer"
                                                           title="انتخاب کد نقشه" color="red" name="place"
                                                           size="20px"/></span>-->
          <!--          <span key="s4" class="n-gap text-grey-4 q-px-xs">|</span>-->
          <span key="s5" class="q-mx-xs"><q-icon @click="runAction('kartable')" class="cursor-pointer"
                                                 title="انتخاب کد از درخواست انتخاب شده"
                                                 color="primary"
                                                 size="18px">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <g id="kartabl" transform="translate(0)">
    <rect id="Rectangle_1685" width="20" height="20" transform="translate(0)" fill="none"/>
    <path id="Icon_awesome-list-alt"
          d="M18.125,19.75H1.875A1.875,1.875,0,0,1,0,17.875V4.125A1.875,1.875,0,0,1,1.875,2.25h16.25A1.875,1.875,0,0,1,20,4.125v13.75A1.875,1.875,0,0,1,18.125,19.75ZM5,5.687A1.562,1.562,0,1,0,6.562,7.25,1.563,1.563,0,0,0,5,5.687Zm0,3.75A1.562,1.562,0,1,0,6.562,11,1.563,1.563,0,0,0,5,9.437Zm0,3.75A1.562,1.562,0,1,0,6.562,14.75,1.563,1.563,0,0,0,5,13.187ZM16.25,7.875V6.625a.469.469,0,0,0-.469-.469H7.969a.469.469,0,0,0-.469.469v1.25a.469.469,0,0,0,.469.469h7.812A.469.469,0,0,0,16.25,7.875Zm0,3.75v-1.25a.469.469,0,0,0-.469-.469H7.969a.469.469,0,0,0-.469.469v1.25a.469.469,0,0,0,.469.469h7.812A.469.469,0,0,0,16.25,11.625Zm0,3.75v-1.25a.469.469,0,0,0-.469-.469H7.969a.469.469,0,0,0-.469.469v1.25a.469.469,0,0,0,.469.469h7.812A.469.469,0,0,0,16.25,15.375Z"
          transform="translate(0 -1)"/>
  </g>
</svg>

          </q-icon></span>
          <span key="s6" class="n-gap text-grey-4 q-px-xs">|</span>
          <span key="s7" class="q-mx-xs">
            <q-spinner
              v-if="showOnMapLoading" color="amber-7"
              size="xs"
            />
            <q-icon v-else @click="runAction('showOnMap')" class="cursor-pointer"
                    title="نمایش روی نقشه" color="amber-7"
                    name="travel_explore" size="20px"/>
          </span>
        </div>
      </div>
    </div>
    <div class="col-auto" v-if="hasSlot('after')">
      <slot name="after"></slot>
    </div>
    <safa-popup
      v-model="showSearch"
      title="جستجوی ملک"
      height="700px"
    >
      <UNosaziCodeSearchMain
        :selectable="true"
        @selectNosaziCode="selectNosaziCode"
        @onCloseModal="showSearch = false"
        :NosaziCode="value"
        @changeNosaziCode="changeCodeFromUNosaziCodeSearch"
        :isFromComponent="showSearch"
      />
    </safa-popup>
  </div>
</template>

<script>
import AutoWidthInput from '../common/AutoWidthInput'
import UNosaziCodeSearchMain from 'src/forms/shahrsazi/histor-and-search/nosazi-code-search/UNosaziCodeSearchMain'
import mapMixin from 'src/mixins/mapMixin'

const defaultCode = {
  District: 0,
  Region: 0,
  Block: 0,
  House: 0,
  Building: 0,
  Apartment: 0,
  Shop: 0
}
const defaultCodeString = '0-0-0-0-0-0-0'

export default {
  name: 'NosaziCodeEditable',
  components: { UNosaziCodeSearchMain, AutoWidthInput },
  mixins: [mapMixin],
  data () {
    return {
      sections: [
        'District',
        'Region',
        'Block',
        'House',
        'Building',
        'Apartment',
        'Shop'
      ],
      code: { ...defaultCode },
      showActions: false,
      showSearch: false,
      showOnMapLoading: false,
      invalidRange: false
      // validLength: 7
    }
  },
  computed: {
    isEditable () {
      const readonly = this.m && this.m === 'r'
      return !readonly
    },
    inputLengths () {
      if (!this.lengths) return 7
      if (typeof this.lengths === 'object' && Array.isArray(this.lengths)) return this.lengths
      return this.lengths.split('-').map((x) => Number(x) || 7)
    },
    selectedRequest () {
      return this.$stKartable.getters['selectedRequest']
    },
    currentValue () {
      if (typeof this.value === 'string') {
        return this.convertToNosaziCodeString(this.code)
      } else {
        return this.convertToNosaziCodeObject(this.code)
      }
    }
  },
  props: {
    loading: Boolean,
    label: String,
    labelWidth: String,
    serviceFunc: Function, // undefined  OR  function
    value: [Object, String], // 1-2-3-7-0-0-0  OR  nosazi => OBJECT
    lengths: [String, Array], // 2-4-4-10-10-10-10  OR  [2,4,4,10,10,10,10]
    enabled: [String, Array], // 1-1-1-1-1-0-0  OR  [true,true,true,true,true,false,false]
    actions: {
      type: Boolean,
      default: true
    },
    invalidDistrict: {
      type: Boolean,
      default: false
    },
    m: {
      type: String,
      default: 'e'
    },
    actionIndex: {
      type: Number,
      default: 7 // service call on which input position
    }
  },
  methods: {
    changeCodeFromUNosaziCodeSearch (nosaziCode) {
      this.selectNosaziCode(nosaziCode)
    },
    onCalculateMaxLength (i, part) {
      let nosaziCodePattern = window.getConfigValue('nosaziCodePattern')
      if (nosaziCodePattern) {
        const patterns = nosaziCodePattern.split('-')
        const DistrictRange = patterns[0]
        const RegionRange = patterns[1]
        const BlockRange = patterns[2]
        const HouseRange = patterns[3]
        const BuildingRange = patterns[4]
        const ApartmentRange = patterns[5]
        const ShopRange = patterns[6]
        const fetchLength = (part) => {
          switch (part) {
            case 'District':
              return DistrictRange
            case 'Region':
              return RegionRange
            case 'Block':
              return BlockRange
            case 'House':
              return HouseRange
            case 'Building':
              return BuildingRange
            case 'Apartment':
              return ApartmentRange
            case 'Shop':
              return ShopRange
            default:
              return 7
          }
        }
        this.$refs[`nosaziInputRef_${i}`][0].validLength = parseInt(fetchLength(part)) || 7
      }
    },

    selectNosaziCode (nosaziCode) {
      this.showSearch = false
      if (nosaziCode) {
        this.code = this.convertToNosaziCodeObject(nosaziCode)
        this.callService()
      }
    },

    async ctrlVPressed ($event) {
      const _this = this

      // checking the input is enabled
      if (!_this.isEnable(parseInt($event.target.getAttribute('data-index') || -1))) return

      // just to be sure
      $event.preventDefault()

      await navigator.clipboard.readText().then((data) => {
        const tmpCode = _this.convertToNosaziCodeObject(data),
          codeResult = {}

        _this.sections.forEach((part, i) => {
          if (_this.isEnable(i)) {
            codeResult[part] = tmpCode[part]
          }
        })

        Object.assign(_this.code, codeResult)
      }).catch(ex => {
        console.log(ex.message)
      })
    },
    // helpers
    isEnable (index) {
      if (!this.enabled) return true
      if (typeof this.enabled === 'string') {
        return this.enabled.split('-')[index] === '1'
      } else if (typeof this.enabled === 'object' && Array.isArray(this.enabled)) {
        return this.enabled[index]
      }
      return true
    },

    // check slots
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    },

    // emit values
    emitValue () {
      console.log('emit code: ', this.currentValue)
      this.$emit('input', this.currentValue)
    },

    // bind model
    bindModelValue () {
      this.code = this.convertToNosaziCodeObject(this.value)
    },

    // converter
    convertToNosaziCodeObject (str = '') {
      if (typeof str === 'object') return str
      if (!str) return { ...defaultCode }
      const split = str.split('-')
      const obj = {}
      this.sections.forEach((part, i) => {
        obj[part] = Number(split[i]) || 0
      })
      return obj
    },
    convertToNosaziCodeString (nosaziCode) {
      if (typeof nosaziCode === 'string') return nosaziCode
      if (!nosaziCode) return defaultCodeString
      return `${nosaziCode.District}-${nosaziCode.Region}-${nosaziCode.Block}-${nosaziCode.House}-${nosaziCode.Building}-${nosaziCode.Apartment}-${nosaziCode.Shop}`
    },

    // service call
    callService () {
      if (typeof this.serviceFunc === 'function') {
        this.serviceFunc(this.currentValue)
      }
      this.$emit('enter', this.currentValue)
    },

    // handle keyboard events
    isLastSection (currentIndex) {
      return ((currentIndex) >= this.actionIndex)
    },
    processKey (e) {
      if ((e.key === 'Enter' && e.ctrlKey)) {
        this.callService()
      } else {
        const currentIndex = parseInt(e.target.getAttribute('data-index'))
        this.focusNextInput(currentIndex)
      }
    },
    focusNextInput (currentIndex) {
      let nextIndex = currentIndex + 1
      for (nextIndex; nextIndex <= 7; nextIndex++) {
        if (this.isLastSection(nextIndex)) {
          this.callService()
          break
        }
        const elem = this.$refs[`nosaziInputRef_${nextIndex}`]
        if (elem) {
          if (elem[0].isDisabledInput()) continue
          elem[0].setFocus()
          break
        }
      }
    },

    // helpers
    getPartName (index) {
      return [
        'منطقه',
        'حوزه',
        'بلوک',
        'ملک',
        'ساختمان',
        'آپارتمان',
        'صنفی'
      ][index]
    },
    runAction (actionName) {
      this.showActions = false
      switch (actionName) {
        case 'kartable':
          const bizcode = (this.$stKartable.getters['selectedRequest'] && this.$stKartable.getters['selectedRequest'].BizCode)
          if (bizcode) {
            this.code = this.convertToNosaziCodeObject(bizcode)
            this.callService()
          } else {
            // alert('ابتدا یک درخواست از کارتابل انتخاب نمایید.')
            this.showError('ابتدا یک درخواست از کارتابل انتخاب نمایید')
          }

          break
        case 'codeFromMap':
          const { Code, NidLayer } = this.$store.getters['map/lastLocation']
          if (Code && NidLayer) {
            // eslint-disable-next-line no-undef
            if (NidLayer !== window.getConfigValue('mapConfig').DefaultSelectLayer) {
              this.showError('لایه وضع موجود روی نقشه انتخاب نشده است.')
              return
            }
            this.code = this.convertToNosaziCodeObject(Code)
            this.callService()
          } else {
            // alert('ابتدا روی نقشه کلیک نمایید.')
            this.showError('ابتدا روی نقشه کلیک نمایید.')
            this.$store.dispatch('ui/setLayoutMode', 'half')
            this.$store.dispatch('ui/setLayoutWidth', 50)
          }
          break
        case 'search':
          this.showSearch = true
          break
        case 'showOnMap':
          this.showOnMap()
          break
      }
    },
    showOnMap () {
      const Code = this.convertToNosaziCodeString(this.code)
      this.showCodeOnMap(Code)
      //   const val = this.currentValue
      //   const strNosaziCode = Object.keys(val).reduce((nc, cu) => {
      //     if (val[cu] && val[cu] !== '0') {
      //       nc.push(val[cu])
      //     }
      //     return nc
      //   }, []).join('-') // convert nosazi object to string without trail zero
      //   let pdata = {
      //     // eslint-disable-next-line no-undef
      //     NidLayer: window.getConfigValue('mapConfig').DefaultSelectLayer,
      //     NidGeoSession: '',
      //     StrWhere: `and (Code LIKE N'%${strNosaziCode}%')`,
      //     NidUser: this.$stSecurity.getters['authorize/userId'],
      //     fullname: this.$stSecurity.getters['authorize/fullname']
      //   }
      //   this.showOnMapLoading = true
      //   this.$KaisMap.SrvMap('GetLayerAtt', pdata).then(({ data }) => {
      //     if (data.data.Items.length > 0) {
      //       this.$KaisMap.ShowWkt(data.data.Items[0])
      //     }
      //   })
      //     .catch((ex) => {
      //       console.error(ex)
      //       this.showOnMapLoading = false
      //       this.showError('خطا در دریافت اطلاعات.')
      //     })
      //     .finally(x => {
      //       console.log('finally')
      //       this.showOnMapLoading = false
      //     })
    }
  },
  beforeMount () {
    this.bindModelValue()
  },
  mounted () {
    this.$nextTick(function () {
      this.focusNextInput(-1)
    })
  },
  watch: {
    value () {
      if (this.convertToNosaziCodeString(this.value) !== this.convertToNosaziCodeString(this.code)) {
        this.bindModelValue()
      }
    },
    currentValue () {
      this.emitValue()
    }
  }
}
</script>

<style lang="scss" scoped>
.nosazicode-wrapper {
  .nosazicode-box {
    padding: 2px 0;
    min-width: 190px;
    transition: .2s all ease;

    input[type="number"],
    .nosazi-disabled-input {
      border: 1px solid $primary;
      margin: 0 1px;
      border-radius: 4px;
      background: none;
      font-size: 12px;
      font-weight: bold;
      transition: .4s all ease;
      opacity: 1;
      height: 24px;
      line-height: 24px;
      min-width: 20px;
      text-align: center;
      cursor: default;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, .2);

      .show-actions & {
        box-shadow: none !important;
      }

      &.is-valid {
        background-color: #e9ffeb;
        border-color: $positive;
        color: darken($positive, 4%) !important;
        box-shadow: 1px 1px 4px rgba($positive, .2);
      }

      &.is-invalid {
        background-color: #e9ffeb;
        border-color: $red-4;
        color: darken($red-4, 4%) !important;
        box-shadow: 1px 1px 4px rgba($red-4, .2);
      }

      &.is-empty {
        background-color: #fff;
        border-color: #909890;
        color: dimgrey !important;
      }

      body.body--dark & {
        background-color: var(--dark) !important;
        color: var(--text-color) !important;
        border-color: var(--border-color) !important;
      }
    }

    input:read-only, [read-only],
    .nosazi-disabled-input,
    .disabled, :disabled, [disabled] {
      border-style: dotted !important;
      opacity: .9;
      cursor: not-allowed;
      box-shadow: none;
    }
  }

  .loading-overlay {
    background: rgba(255, 255, 255, 0.3);
    color: $primary;
    border-radius: 4px;
  }

  .nosazi-actions {
    .n-action-wrap {
      position: relative;
      z-index: 501;

      .n-action-handler {
        height: 24px;
        background-color: #e5e6e7;
        border-radius: 4px;
        width: 24px;
        display: inline-block;
        color: #8d9ba8;
        margin-left: 4px;
        cursor: default;
        position: relative;

        body.body--dark & {
          background-color: var(--dark);
          color: var(--dark-text-color)
        }
      }

      .n-action-items {
        position: absolute;
        top: 0;
        right: 30px;
        bottom: 0;
        display: flex;
        align-items: center;
        min-width: 100px;
        direction: rtl;
        transform: translateX(0);
        opacity: 1;
        padding: 0 10px;
        border-radius: 4px;
        box-shadow: 1px 2px 6px rgba(0, 0, 0, .1);
        transition: .2s all ease-in;
        border: 1px solid #c3d1de;
        animation: action-in .3s ease alternate;

        &:before {
          content: '';
          width: 10px;
          height: 10px;
          transform: rotate(45deg);
          background-color: #fff;
          position: absolute;
          right: -5px;
          z-index: -1;
          border: 1px solid #c3d1de;
          border-radius: 2px;
          border-left: none;
          border-bottom: none;
        }

        > span:not(.n-gap) {
          > em {
            display: none;
          }
        }

        body.body--dark & {
          background-color: $dark-page !important;
          border-color: var(--border-color);

          &:before {
            background-color: inherit;
            border: 1px solid var(--border-color) !important;
          }
        }
      }
    }
  }

  &.loading {
    .nosazicode-box input[type="number"] {
      opacity: .5;
      transition: .4s all ease;
      user-select: none;
      pointer-events: none;
    }
  }

  &.show-actions {
    .nosazicode-box {
      opacity: .2;
      transition: .2s all ease;
    }
  }
}

@keyframes action-in {
  0% {
    transform: translateX(10px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
    pointer-events: all;
  }
}

</style>
