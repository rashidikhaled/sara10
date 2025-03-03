<template>
  <fit>
    <safa-splitter
      v-model="splitterValue"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="incomeDetailResults.Income_OddmentAccount"
            cdcName="Income_OddmentAccount"
            ref="grid"
            name="grid"
            helper="bestankariInBestankariTab"
            :m="m"
            @row-click="click"
            title="بستانکاری"
            fit
            height="100%"
            max-height="100%"
            :allowNewRow='true'
            :allowRemoveRow='true'
            :allowCopy='true'
            :allowSelect="true"
          ></safa-datatable>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="incomeDetailResults.Income_PrePayment"
            cdcName="Income_PrePayment"
            ref="grid"
            name="grid"
            helper="prepayedInBestankaritab"
            :m="m"
            title="پرداخت های قبلی"
            fit
            height="100%"
            max-height="100%"
          ></safa-datatable>
        </fit>
      </template>
    </safa-splitter>
  </fit>
  <!-- <div class="row q-col-gutter-x-lg">
    <div class="col-md-6">
      <internal-section title="بستانکاری">
        <safa-datatable
          v-model="incomeDetailResults.Income_OddmentAccount"
          ref="grid"
          name="grid"
          helper="bestankariInBestankariTab"
          :m="m"
          @row-click="click"
        ></safa-datatable>
      </internal-section>
    </div>
    <div class="col-md-6">
      <internal-section title="پرداخت های قبلی">
        <safa-datatable
          v-model="incomeDetailResults.Income_PrePayment"
          ref="grid"
          name="grid"
          helper="prepayedInBestankaritab"
          :m="m"
        ></safa-datatable>
      </internal-section>
    </div>
  </div> -->
</template>

<script>
export default {
  data () {
    return {
      items: [],
      bestankari: [],
      prepayed: [],
      splitterValue: 50
    }
  },
  props: {
    value: Object,
    incomeDetailResults: Object,
    m: String,
    disableConfirmBtn: Boolean,
    disableUnconfirmedBtn: Boolean,
    addNewRow: Boolean
  },
  mounted () {
    this.bestankari = this.value.details.Income_OddmentAccount

    this.prepayed = this.value.details.Income_PrePayment
  },
  watch: {
    value () {
      this.bestankari = this.value.Income_OddmentAccount

      this.prepayed = this.value.Income_PrePayment
    },
    bestankari () {
      this.value.Income_OddmentAccount = this.bestankari
    },
    prepayed () {
      this.value.Income_PrePayment = this.prepayed
    }
  },
  components: {},
  methods: {
    click (row) {
      if (row.IsConfirm) {
        this.disableUnconfirmedBtn = false
        this.disableConfirmBtn = true
      } else {
        this.disableUnconfirmedBtn = true
        this.disableConfirmBtn = false
      }
      this.$emit("changeDisableStatus", {
        confirm: this.disableConfirmBtn,
        unConfirm: this.disableUnconfirmedBtn,
        nidOddment: row.NidOddment
      })
    }
  }
}
</script>
