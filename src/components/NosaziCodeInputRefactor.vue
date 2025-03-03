<template>
  <div class="nosazi-code-input">
    <div class="row q-col-gutter-x-sm align-center no-wrap items-center">
      <div class="col-auto" v-if="hasSlot('before')">
        <slot name="before"></slot>
      </div>
      <div class="col-auto" v-if="hasSlot('label') || label">
        <slot name="label">
          <div :style="labelWidth"><label>{{ label }}</label></div>
        </slot>
      </div>
      <div class="col-auto nosazicode-box">
          <NosazicodeBoxInput
          :m="m"
          :value="value"
          :sections="sections"
          :lengths="lengths"
          :enabled="enabled"
          :loadSelectedRequestOnMount="loadSelectedRequestOnMount"
          :code="code"
          @focus="onFocus"
          @input="onEmitValues($event)"
          @search="onSearch($event)"
          v-bind="$attrs"
          v-on="$listeners"
          />
          <!-- <MapNosaziSearchBox/> -->
      </div>
      <div
        class="col-md-auto no-wrap"
        v-if="actions && m==='e'"
        style="min-width: 50px;"
      >
        <slot name="after">
          <q-btn
            :disable="m === 'r'"
            @click="showNosaziCodeSearch = true"
            dense
            flat
            icon="search"
            round
            size="sm"
          >
            <q-tooltip>
              جستجوی ملک
            </q-tooltip>
          </q-btn>
          <q-btn-dropdown
            :disable="m === 'r'"
            dense
            flat
            round
            size="sm"
          >
            <q-tooltip>
              بیشتر
            </q-tooltip>
            <q-list
              dense
              separator
            >
              <q-item
                :disable="m === 'r'"
                @click="redirectToMap"
                clickable
                dense
                v-close-popup
              >
                <q-item-section avatar>
                  <q-icon
                    color="primary"
                    name="map"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>انتخاب کد از روی نقشه</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                :disable="m === 'r'"
                @click="loadSelectedRequestInKartable"
                clickable
                dense
                v-close-popup
              >
                <q-item-section avatar style="width: 32px;">
                  <q-icon
                    color="primary"
                    name="check_box"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>کد انتخاب شده در کارتابل</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                :disable="m === 'r'"
                @click="redirectToMap"
                clickable
                dense
                v-close-popup
              >
                <q-item-section avatar>
                  <q-icon
                    color="primary"
                    name="location_on"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>نمایش روی نقشه</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <!-- <dropdown-with-icon
          :values="dropdownValues"
          :mode="m"
          @selectedValue="onSelectedValue($event)"
          /> -->
        </slot>
      </div>
    </div>
    <ShowModal
      v-model="showNosaziCodeSearch"
      title="جستجوی ملک"
      height="700px"
    >
      <UNosaziCodeSearch
        :selectable="true"
        @selectNosaziCode="selectNosaziCode"
        :NosaziCode="NosaziCode"
      />
    </ShowModal>
    <!-- <ShowModal
      :show="showNosaziCodeSearch"
      @onCloseModal="showNosaziCodeSearch=false"
      title="جستجوی ملک"
    >
      <UNosaziCodeSearch
        :selectable="true"
        @selectNosaziCode="selectNosaziCode"
      />
    </ShowModal> -->
  </div>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import UNosaziCodeSearch from '../forms/shahrsazi/histor-and-search/nosazi-code-search/UNosaziCodeSearch'
// import MapNosaziSearchBox from './MapNosaziSearchBox'
import NosazicodeBoxInput from './NosazicodeBoxInput'

export default {
  name: 'nosazi-code-input',
  components: { UNosaziCodeSearch, NosazicodeBoxInput },
  mixins: [baseFormMixin],
  inheritAttrs: false,
  props: {
    m: {
      type: String,
      default: 'e'
    },
    label: String,
    labelWidth: String,
    value: [String, Object],
    lengths: {
      type: String,
      default: '10-10-10-10-10-10-10'
      // default: '2-4-4-4-3-3-3'
    },
    enabled: {
      type: String,
      default: '1-1-1-1-1-1-1'
    },
    actions: Boolean,
    liveUpdate: Boolean,
    liveUpdateOnEnd: Boolean,
    loadSelectedRequestOnMount: Boolean,
    NosaziCode: Object
  },

  watch: {
    value (val) {
      this.code = this.convert(val)
    }
  },

  data () {
    return {
      showNosaziCodeSearch: false,

      sections: [
        'District',
        'Region',
        'Block',
        'House',
        'Building',
        'Apartment',
        'Shop'
      ],
      dropdownValues: [
        {
          id: '0',
          labelName: 'انتخاب کد از روی نقشه',
          iconName: 'map'
        },
        {
          id: '1',
          labelName: 'کد انتخاب شده در کارتابل',
          iconName: 'check_box'
        },
        {
          id: '2',
          labelName: 'نمایش روی نقشه',
          iconName: 'location_on'
        }
      ],
      code: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      myval: '1'
    }
  },

  methods: {
    // onSelectedValue (id) {
    //   switch (id) {
    //     case '0':
    //       this.redirectToMap()
    //       break
    //     case '1':
    //       this.loadSelectedRequestInKartable()
    //       break
    //     case '2':
    //       this.redirectToMap()
    //       break
    //     default:
    //       break
    //   }
    // },
    redirectToMap () {
      console.log('notImplemented')
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    },
    selectNosaziCode (nosaziCode) {
      this.showNosaziCodeSearch = false
      this.code = nosaziCode
    },
    onFocus (e) {
      this.$emit('focus')
    },
    focus () {
      const firstPartInput = this.$el.querySelector('input[index="0"]')
      if (firstPartInput && typeof firstPartInput.focus === 'function') {
        firstPartInput.focus()
      }
    },
    // onBlur () {
    //   this.$emit('blur')
    // },
    onEmitValues (val) {
      console.log('vallllllllll', val)
      this.$emit('input', val)
    },

    /**
       * Check is a valid nosazi code
       * @param code
       * @returns {boolean}
       */
    // isValidNosaziCode (code) {
    //   return !!(code && code.District && code.Region && code.Block)
    // },
    // convert (val) {
    //   const codeObj = {}
    //   if (val && typeof val === 'string') {
    //     const split = val.split('-').map(Number)
    //     this.sections.forEach((part, i) => {
    //       codeObj[part] = split[i] || 0
    //     })
    //   } else if (val && typeof val === 'object') {
    //     this.sections.forEach((part) => {
    //       codeObj[part] = Number(val[part]) || 0
    //     })
    //   } else {
    //     this.sections.forEach((part) => {
    //       codeObj[part] = 0
    //     })
    //   }
    //   return codeObj
    // },

    // loadSelectedRequestInKartable () {
    //   const { BizCode, NosaziCode } = this.selectedRequest || {}
    //   if (BizCode || NosaziCode) {
    //     this.code = this.convert(BizCode || NosaziCode)
    //     this.onEmitValues()
    //   }
    // },
    // init () {
    //   // If provided value is a valid nosazi code then use it
    //   // Otherwise use the selectedRequest (in Kartable)
    //   const code = this.convert(this.value)
    //   if (this.isValidNosaziCode(code)) {
    //     this.code = this.convert(this.value)
    //     // Emit init value
    //     if (this.isValidNosaziCode(this.code)) {
    //       this.onEmitValues()
    //     }
    //   } else if (this.loadSelectedRequestOnMount) {
    //     this.loadSelectedRequestInKartable()
    //   }
    // },
    closeModal () {
      this.showNosaziCodeSearch = false
    },
    onSearch (val) {
      this.$emit('search', val)
    }
  }

  // mounted () {
  //   this.init()
  // }
}
</script>
<style lang="scss">

</style>
