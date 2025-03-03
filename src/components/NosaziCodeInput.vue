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
        <div
          class="row no-wrap reverse"
          ref="nosazi"
          v-if="m==='e'"
        >
          <!-- {{code}} -->
          <span
            :key="part"
            class="nosazi-input-wrap"
            v-for="(part, i) in sections"
          >
          <auto-width-input
            :disabled="false"
            :index="i"
            :min="0"
            :maxlength="inputLengths[i]"
            :readonly="getMode(i)==='r'"
            :ref="'nosaziCodeInputRef' + i"
            :title="getPartName(i)"
            @change="inputValueChanged"
            @focus="onFocus"
            @keyup="inputKeyPressed"
            class="nosazi-input input-number"
            type="number"
            v-model="code[part]"
          />
        </span>

          <!-- <q-tooltip
              content-class="bg-primary text-white"
              transition-show="scale"
              transition-hide="scale"
              :delay="1000"
              >{{ getPartName(i) }}
            </q-tooltip> -->
        </div>
        <div v-else class="nosazi-preview flex no-wrap items-center" style="cursor: not-allowed" dir="ltr">
          <span
            :key="part"
            :title="getPartName(i)"
            v-for="(part, i) in sections">
            {{code[part]}}
          </span>
        </div>
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
      nextPartIndex: 0,
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
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    },
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
    // onBlur () {
    //   if (this.nextPartIndex === 7 && this.liveUpdateOnEnd) {
    //     console.log('testEmitValue')
    //     // this.emitValues()
    //   }

    //   this.focusCount -= 1
    //   if (this.focusCount === 0) {
    //     this.$emit('blur')
    //   }
    // },
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

            if (this.liveUpdate) {
              this.emitValues() // sh ???
            }

            break // done
          }
          ++index
        }
        if (index === 6) {
          this.emitValues()
          this.$emit('search', typeof this.value === 'string' ? this.nosaziCodeString : this.nosaziCodeObject)
        }
      }

      // if (index === 6) {
      //   this.emitValues()
      // }

      if (e.keyCode === 9) {
        while (index < 7) {
          // Move forward to find next input (next editable input)
          const nextPartIndex = index + 1
          if (this.getMode(nextPartIndex) === 'e') {
            // Focus only if is editable
            // const nextPartInput = this.$el.querySelector(
            //   'input[index="' + nextPartIndex + '"]'
            // )

            // if (nextPartInput && typeof nextPartInput.focus === 'function') {
            //   nextPartInput.focus()
            // }

            this.nextPartIndex = nextPartIndex

            break // done
          }
          ++index
        }
      }
    },
    inputValueChanged (e) {
      let index = Number(e.target.getAttribute('index')) || 0
      const nextPartIndex = index + 1

      // if (this.getMode(nextPartIndex) === 'e') { // sh
      // this.emitValues() // sh
      // }
      if (this.liveUpdate || nextPartIndex > 6) {
        this.emitValues()
      }
    },
    emitValues () {
      if (typeof this.value === 'string') {
        this.$emit('input', this.nosaziCodeString)
      } else {
        this.$emit('input', this.nosaziCodeObject)
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
<style lang="scss">
  .nosazi-preview {
    > span {
      height: 24px;
      font-weight: 500;
      font-size: 14px;
      outline: none !important;
      padding: 0;
      margin: 0 2px;
      border-radius: 4px;
      text-align: center;
      min-width: 24px;
      color: #474747;
      border: 2px solid #d0d0d0;
      background-color: #efefef;
    }
  }
</style>
