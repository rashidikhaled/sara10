<template>
  <fit>
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu label="نامه مفاصا حساب" name="MafasaLetter"/>
        <tab-menu label="برگ پرداخت" name="PaymentFich"/>
        <tab-menu v-if="isSodorModal" label="پرداخت قسطی" name="Installment"/>
      </template>
      <tab-content name="MafasaLetter" title="نامه مفاصا حساب">
        <fit>
          <div class="row q-col-gutter-sm">
            <safa-datepicker
              v-model="model.MafasaLetterData"
              :m="m"
              class="col-12"
              label="تاریخ نامه مفاصا حساب"
              label-width="120px"
            />
            <safa-text
              v-model="model.MafasaLeterNo"
              :m="m"
              class="col-12"
              label="شماره نامه مفاصا حساب"
              label-width="120px"
            />
            <safa-text
              v-model="model.HologramNo"
              :m="m"
              class="col-12"
              label="شماره هولوگرام"
              label-width="120px"
            />
          </div>
        </fit>
      </tab-content>
      <tab-content name="PaymentFich" title="برگ پرداخت">
        <fit>
          <div class="row q-col-gutter-sm">
            <safa-datepicker
              v-model="model.PaymentPageVosolDate"
              :m="m"
              class="col-12"
              label="تاریخ وصول برگه پرداخت"
              label-width="120px"
            />
            <safa-text
              v-model="model.PaymentPageNo"
              :m="m"
              class="col-12"
              label="شماره برگه پراخت"
              label-width="120px"
            />
          </div>
        </fit>
      </tab-content>
      <tab-content name="Installment" title="پرداخت قسطی">
        <div>
          <btn-default label="فرم اقساط" @click="aghsatClickHandler"/>
        </div>
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      activeTab: 'MafasaLetter',
      name: 'FirstConfirmePayment'
    }
  },
  props: {
    model: Object,
    isSodorModal: Boolean,
    m: String
  },
  methods: {
    aghsatClickHandler () {
      this.$emit('hide')
    }
  }
}
</script>
