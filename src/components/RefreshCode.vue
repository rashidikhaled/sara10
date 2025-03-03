<template>
  <div class="row q-col-gutter-x-sm nosazi-code-input align-center">
    <div class="col-auto">
      <slot name="before"></slot>
    </div>
    <div
      class="col-auto"
      v-if="label"
    >
      <slot name="label">
        <label :style="labelStyle">{{ label }}</label>
      </slot>
    </div>
    <div class="col-auto">
      <div
        ref="nosazi"
        class="row no-wrap reverse"
        style="border: 2px solid #385dff;"
      >
        <!-- {{code}} -->
        <span
          :key="part"
          v-for="(part, i) in sections"
          class="nosazi-input-wrap"
        >
          <auto-width-input
            class="nosazi-input"
            type="string"
            :index="i"
            :disabled="getMode(i)==='r'"
            :maxlength="inputLengths[i]"
            :ref="'nosaziCodeInputRef' + i"
            @focus="onFocus"
            @blur="onBlur"
            @keyup="inputKeyPressed"
            @change="inputValueChanged"
            v-model="code[part]"
          >
            <q-tooltip
              content-class="bg-primary text-white"
              transition-show="scale"
              transition-hide="scale"
              :delay="1000"
            >{{ getPartName(i) }}
            </q-tooltip>
          </auto-width-input>
        </span>

        <!-- <q-tooltip
            content-class="bg-primary text-white"
            transition-show="scale"
            transition-hide="scale"
            :delay="1000"
            >{{ getPartName(i) }}
          </q-tooltip> -->
      </div>
    </div>
    <div
      class="col-md-auto no-wrap"
      v-show="actions"
    >
      <slot name="after">
        <q-btn
          dense
          flat
          size="13px"
          icon="search"
          :disable="m === 'r'"
          @click="showNosaziCodeSearch = true"
          round
        >
          <q-tooltip>
            جستجوی ملک
          </q-tooltip>
        </q-btn>
        <q-btn-dropdown
          dense
          round
          flat
          size="13px"
          :disable="m === 'r'"
        >
          <q-tooltip>
            بیشتر
          </q-tooltip>
          <q-list
            dense
            separator
          >
            <q-item
              dense
              clickable
              v-close-popup
              :disable="m === 'r'"
              @click="$router.push('/?activeTab=map')"
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
              dense
              clickable
              v-close-popup
              :disable="m === 'r'"
              @click="loadSelectedRequestInKartable"
            >
              <q-item-section avatar>
                <q-icon
                  name="check_box"
                  color="primary"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>کد انتخاب شده در کارتابل</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              dense
              clickable
              v-close-popup
              :disable="m === 'r'"
              @click="$router.push('/?activeTab=map')"
            >
              <q-item-section avatar>
                <q-icon
                  name="location_on"
                  color="primary"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>نمایش روی نقشه</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <!--  <div class="row no-wrap q-gutter-sm">
          <q-btn
            class="q-ml-sm"
            size="10px"
            :icon="'img:' + require('icons/search.svg')"
            :disable="m === 'r'"
            @click="showNosaziCodeSearch = true"
          >
            <q-tooltip>
              جستجوی ملک
            </q-tooltip>
          </q-btn> -->
        <!-- <q-btn
            size="10px"
            :icon="'img:' + require('icons/select-on-map.svg')"
            :disable="m === 'r'"
            @click="$router.push('/?activeTab=map')"
          >
            <q-tooltip>
              انتخاب کد از روی نقشه
            </q-tooltip>
          </q-btn>
          <q-btn
            size="10px"
            :icon="'img:' + require('icons/arrow-right-circle.svg')"
            :disable="m === 'r'"
            @click="loadSelectedRequestInKartable"
          >
            <q-tooltip>
              کد انتخاب شده در کارتابل
            </q-tooltip>
          </q-btn>
          <q-btn
            size="10px"
            :icon="'img:' + require('icons/show-on-map.svg')"
            :disable="m === 'r'"
            @click="$router.push('/?activeTab=map')"
          >
            <q-img :src="'img:' + require('icons/show-on-map.svg')" />
            <q-tooltip>
              نمایش روی نقشه
            </q-tooltip>
          </q-btn>
        </div>-->
      </slot>
    </div>
    <ShowModal
      :show="showNosaziCodeSearch"
      title="جستجوی ملک"
      @onCloseModal="showNosaziCodeSearch=false"
    >
      <UNosaziCodeSearch
        :selectable="true"
        @selectNosaziCode="selectNosaziCode"
      />
    </ShowModal>
  </div>
</template>

<script>
import AutoWidthInput from 'src/components/common/AutoWidthInput'
import baseFormMixin from 'src/mixins/baseFormMixin'
import UNosaziCodeSearch from '../forms/shahrsazi/histor-and-search/nosazi-code-search/UNosaziCodeSearch'
export default {
  name: 'nosazi-code-input',
  components: { UNosaziCodeSearch, AutoWidthInput },

  mixins: [baseFormMixin],

  props: {
    m: String,
    label: String,
    labelStyle: Object,
    value: [String, Object],
    lengths: {
      type: String,
      default: '0-0-0-0-0-0-0'
      // default: '2-4-4-4-3-3-3'
    },
    enabled: {
      type: String,
      default: '1-1-1-1-1-1-1'
    },
    actions: Boolean,
    liveUpdate: Boolean,
    loadSelectedRequestOnMount: Boolean
  },

  watch: {
    value (val) {
      this.code = this.convert(val)
    }
  },

  data () {
    return {
      focusCount: 0,
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

  computed: {
    nosaziCodeObject () {
      const newCodeObj = {}
      this.sections.forEach((part) => {
        newCodeObj[part] = Number(this.code[part]) || 0
      })
      return newCodeObj
    },
    nosaziCodeString () {
      return this.sections.map((part) => this.code[part]).join('-')
    },
    inputLengths () {
      return this.lengths.split('-').map((x) => Number(x) || 1)
    },
    inputWidths () {
      // console.log('therererere')
      const totalUnits = this.inputLengths.reduce(
        (state, x) => state + Math.max(x, 2),
        0
      )
      return this.inputLengths.map((x) => {
        return (100 * Math.max(x, 2)) / totalUnits
      })
    }
  },

  methods: {
    selectNosaziCode (nosaziCode) {
      // // console.log(code)
      this.showNosaziCodeSearch = false
      this.code = nosaziCode
    },
    /**
     * Public method to integrate with frameworks
     */
    focus () {
      const firstPartInput = this.$el.querySelector('input[index="0"]')
      if (firstPartInput && typeof firstPartInput.focus === 'function') {
        firstPartInput.focus()
      }
    },

    onFocus (e) {
      if (e.target && typeof e.target.select === 'function') {
        e.target.select()
      }

      if (this.focusCount === 0) {
        this.$emit('focus')
      }
      this.focusCount += 1
    },
    onBlur () {
      this.focusCount -= 1
      if (this.focusCount === 0) {
        this.$emit('blur')
      }
    },

    inputKeyPressed (e) {
      let index = Number(e.target.getAttribute('index')) || 0
      if (e.keyCode === 13) {
        while (index < 6) {
          // Move forward to find next input (next editable input)
          const nextPartIndex = index + 1
          if (this.getMode(nextPartIndex) === 'e') {
            // Focus only if is editable
            const nextPartInput = this.$el.querySelector(
              'input[index="' + nextPartIndex + '"]'
            )
            if (nextPartInput && typeof nextPartInput.focus === 'function') {
              nextPartInput.focus()
            }
            this.emitValues()// sh
            break // done
          }
          ++index
        }
        if (index === 6) {
          this.emitValues()
        }
      }
    },
    inputValueChanged () {
      if (this.liveUpdate) {
        this.emitValues()
      }
    },
    emitValues () {
      if (typeof this.value === 'string') {
        this.$emit('input', this.nosaziCodeString)
        this.$emit('listForService', this.nosaziCodeString)
      } else {
        this.$emit('input', this.nosaziCodeObject)
        this.$emit('listForService', this.nosaziCodeString)
      }
    },

    /**
     * Check is a valid nosazi code
     * @param code
     * @returns {boolean}
     */
    isValidNosaziCode (code) {
      return !!(code && code.District && code.Region && code.Block)
    },
    convert (val) {
      const codeObj = {}
      if (val && typeof val === 'string') {
        const split = val.split('-').map(Number)
        this.sections.forEach((part, i) => {
          codeObj[part] = split[i] || 0
        })
      } else if (val && typeof val === 'object') {
        this.sections.forEach((part) => {
          codeObj[part] = Number(val[part]) || 0
        })
      } else {
        this.sections.forEach((part) => {
          codeObj[part] = 0
        })
      }
      return codeObj
    },
    getMode (index) {
      const status = Number(this.enabled.split('-')[index])
      return status === 0 || this.m === 'r' ? 'r' : 'e'
    },
    getPartName (index) {
      const arr = [
        'منطقه',
        'حوزه',
        'بلوک',
        'ملک',
        'ساختمان',
        'آپارتمان',
        'صنفی'
      ]
      return arr[index]
    },

    loadSelectedRequestInKartable () {
      const { BizCode, NosaziCode } = this.selectedRequest || {}
      if (BizCode || NosaziCode) {
        this.code = this.convert(BizCode || NosaziCode)
        this.emitValues()
      }
    },
    init () {
      // If provided value is a valid nosazi code then use it
      // Otherwise use the selectedRequest (in Kartable)
      const code = this.convert(this.value)
      if (this.isValidNosaziCode(code)) {
        this.code = this.convert(this.value)
        // Emit init value
        if (this.isValidNosaziCode(this.code)) {
          this.emitValues()
        }
      } else if (this.loadSelectedRequestOnMount) {
        this.loadSelectedRequestInKartable()
      }
    },
    setFocus () {
      // // console.log('////this.$refs["nosaziCodeInputRef0"]', this.$refs.nosaziCodeInputRef0)
      this.$refs['nosaziCodeInputRef0'][0].setFocus()
    },
    closeModal () {
      this.showNosaziCodeSearch = false
    }
  },

  mounted () {
    this.init()
  }
}
</script>
<!--
<style lang="scss">
.nosazi-input-wrap {
  border-right: 1px solid #2c50ee;
  border-left: 1px solid #2c50ee;

  .nosazi-input {
    border: none;
    height: 28px;
    padding: 0;
    color: #2c50ee;
    font-weight: 500;
    font-size: 14px;
    outline: none !important;
    direction: rtl;

    &:focus {
      background-color: #499bef;
      color: #fff;
    }

    &::selection {
      background-color: #2977c5;
      color: #fff;
    }
  }

  &:first-child {
    border-right: none;
  }
  &:last-child {
    border-left: none;
  }
}
</style>
-->
