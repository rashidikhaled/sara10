<template>
  <div class="form-action">
    <button-group :buttons="currentButtons" height="30px" ref="bgroups">
      <slot name="before"></slot>
      <btn-default
        v-if="!hideEngineerInfo"
        title="اطلاعات مهندس"
        label=""
        icon="engineering"
        @click="engineerInfo"
        :disable="disable"
      />
      <btn-default
        v-if="!hideEngineerSystemInfo"
        title="اطلاعات مهندس - نظام مهندسی"
        label=""
        icon="engineering"
        @click="engineerSystemInfo"
        :disable="disable"
      />
      <btn-default
        v-if="!hideCardboardCapacity"
        title="کارتابل ظرفیت"
        label=""
        icon="rule_folder"
        @click="cardboardCapacity"
        :disable="disable"
      />
      <btn-default
        v-if="!hideBlackList"
        title="لیست سیاه"
        label=""
        icon="receipt_long"
        @click="blackList"
        :disable="disable"
      />
      <btn-default
        v-if="!hideArchive"
        title="آرشیو"
        label=""
        icon="attach_email"
        @click="archive"
        :disable="disable"
      />
      <btn-default
        v-if="!hidePerformanceReport"
        title="گزارش کارکرد"
        label=""
        icon="analytics"
        @click="performanceReport"
        :disable="disable"
      />
      <btn-default
        v-if="!hideEngineerMembership"
        title="سابقه عضویت مهندس در دفتر"
        label=""
        icon="contact_page"
        @click="engineerMembership"
        :disable="disable"
      />
      <btn-default
        v-if="!hideReceiptsReceived"
        title="فیش های وصول شده"
        label=""
        icon="exit_to_app"
        @click="receiptsReceived"
        :disable="disable"
      />
      <btn-default
        v-if="!hideIncomeDocument"
        title="سند درآمد"
        label=""
        icon="receipt"
        @click="incomeDocument"
        :disable="disable"
      />
      <btn-default
        v-if="!hideReportFomplications"
        title="گزارش عوارض پرونده"
        label=""
        icon="calculate"
        @click="reportFomplications"
        :disable="disable"
      />
      <btn-default
        v-if="!hideEngineerComplications"
        title="عوارض مهندس"
        label=""
        icon="history_edu"
        @click="engineerComplications"
        :disable="disable"
      />
      <btn-default
        v-if="!hideConfirmationBankingService"
        title="تایید فیش از طریق وب سرویس بانک"
        label=""
        icon="history_edu"
        @click="confirmationBankingService"
        :disable="disable"
      />
      <btn-default
        v-if="!hideShowOnMap"
        title="نمایش بر روی نقشه"
        label=""
        icon="map"
        @click="showOnMap"
        :disable="disable"
      />

      <slot name="after"></slot>
      <slot></slot>
      <template v-for="(btn,index) in internalButtons">
        <component
          :is="normalizeName(btn.type)"
          :key="'BTN_'+index"
          :label="btn.label"
          :icon="btn.icon"
          :data-id="index"
          :spId="btn.spId"
          :spCaption="btn.spCaption"
          v-bind="cleanProps(btn)"
          @click="btn.click($event, btn)"
        />
      </template>
    </button-group>
  </div>
</template>

<script>
export default {
  name: 'MemberOfficeAction',
  inheritAttrs: false,
  props: {
    buttons: [Array, Object],
    value: String,
    m: {
      type: String,
      default: 'r'
    },
    disable: {
      type: Boolean,
      default: true
    },
    size: String,
    hideEngineerInfo: { type: Boolean, default: false },
    hideEngineerSystemInfo: { type: Boolean, default: false },
    hideCardboardCapacity: { type: Boolean, default: false },
    hideBlackList: { type: Boolean, default: false },
    hideArchive: { type: Boolean, default: false },
    hidePerformanceReport: { type: Boolean, default: false },
    hideEngineerMembership: { type: Boolean, default: false },
    hideReceiptsReceived: { type: Boolean, default: false },
    hideIncomeDocument: { type: Boolean, default: false },
    hideReportFomplications: { type: Boolean, default: false },
    hideEngineerComplications: { type: Boolean, default: false },
    hideConfirmationBankingService: { type: Boolean, default: false },
    hideShowOnMap: { type: Boolean, default: false }

  },
  data () {
    return {
      internalButtons: []
    }
  },
  computed: {
    currentButtons () {
      if (!this.buttons) return []
      if (!this.value) return this.buttons
      return this.buttons[this.value] || []
    },
    isFormEditable () {
      return this.m === 'e'
    }
  },
  beforeMount () {
    this.internalButtons = []
    const self = this
    this.$root.$on('setButtons', function (key, buttons) {
      // console.log('emit buttons', buttons, typeof buttons)
      self.appendButtons(key, buttons)
    })
    this.$root.$on('removeButtons', function (key) {
      // console.log('removeButtons', key)
      self.removeButtons(key)
    })
  },
  methods: {
    normalizeName (baseName = 'default') {
      baseName = baseName.toLowerCase().replace(/btn-/g, '')
      return `btn-${baseName}`
    },
    cleanProps (props) {
      return Object.keys(props)
        .filter((key) => !['label', 'click', 'type', 'icon', 'spId', 'spCaption'].includes(key))
        .reduce((obj, key) => {
          obj[key] = props[key]
          return obj
        }, {})
    },
    removeButtons (key) {
      if (key) { this.internalButtons = this.internalButtons.filter(x => x.k !== key) }
    },
    appendButtons (key, buttons) {
      if (buttons && Array.isArray(buttons)) {
        this.removeButtons(key)
        this.internalButtons = [...this.internalButtons, ...buttons.map(x => ({ ...x, k: key }))]
      }
    },
    engineerInfo () { this.$emit('engineerInfo') },
    engineerSystemInfo () { this.$emit('engineerSystemInfo') },
    cardboardCapacity () { this.$emit('cardboardCapacity') },
    blackList () { this.$emit('blackList') },
    archive () { this.$emit('archive') },
    performanceReport () { this.$emit('performanceReport') },
    engineerMembership () { this.$emit('engineerMembership') },
    receiptsReceived () { this.$emit('receiptsReceived') },
    incomeDocument () { this.$emit('incomeDocument') },
    reportFomplications () { this.$emit('reportFomplications') },
    engineerComplications () { this.$emit('engineerComplications') },
    confirmationBankingService () { this.$emit('confirmationBankingService') },
    showOnMap () { this.$emit('showOnMap') }
  },
  watch: {
    internalButtons () {
      this.$refs.bgroups.onResize()
    }
  }
}
</script>
