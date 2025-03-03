<template>
  <fit>
    <div class="row q-col-gutter-sm q-mb-sm">
      <safa-combo
        label=" عنوان شغلی"
        class="col-md-3"
        sourceType="local"
        :options="nosaziCode"
        v-model="code"
        label-width="65px"
      >
      </safa-combo>
      <safa-text
        class="col-md-3"
        label="سال تسویه "
        domainName="CI_SaraM1"
        ciName="CI_DutyYear"
        label-width="65px"
      >
      </safa-text>
      <safa-combo
        class="col-md-3"
        label="سال تسویه ملک"
        domainName="CI_SaraM1"
        ciName="CI_DutyYear"
        label-width="65px"
      >
      </safa-combo>
      <safa-combo
      class="col-md-3"
        label="علت تسویه "
        domainName="CI_SaraM1"
        ciName="CI_DutyPayoffCause"
        label-width="65px"
      >
      </safa-combo>
      <safa-checkbox
        class="col-md-3"
        label="عدم نمایش حساب های باطله"
        v-model="loadCancelOddment"
        @click="reloadOddmentDuty">
      </safa-checkbox>
    </div>
    <safa-datatable
      helper="nosaziOtherAccount"
      v-model="oddmentResults"
      height="100%"
      min-height="65px"
      max-height="100%"
      fit
    />
    <!-- oddmentResults.DutyOddmentAccount -->

    <template>
      <div class="q-gutter-sm q-mt-sm">
        <btn-new @click="accept"></btn-new>
        <btn-cancel @click="cancle" label=" ابطال"></btn-cancel>
        <btn-default
          @click="searchNosaziCode"
          label="تاریخچه ی سال تسویه"
        ></btn-default>
        <btn-default @click="nosazi" label="تأیید سال تسویه"></btn-default>
        <btn-delete class="btn-delete" @click="senfi" label="حذف سال تسویه"></btn-delete>
      </div>
    </template>
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  data: function () {
    return {
      nosaziCode: [{ ID: 0, Title: '' }],
      code: 0
    }
  },
  mixins: [baseFormMixin],
  props: {
    results: Array,
    selectedNosaziCode: String,
    oddmentResults: Object,
    loadCancelOddment: Boolean,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  mounted () {
    // this.nosaziCode[0].Title = this.selectedNosaziCode.CodeFrom
  },
  methods: {
    reloadOddmentDuty () {
      this.showLoading()
      let data = {
        pNid: this.selectedNosaziCode.NidFrom,
        pSysCiDutyType: 1,
        pUnLoadCancelOddment: this.loadCancelOddment

      }

      this.$services.SB.getDutyOddmentAccount(data)
        .then(async ({ data }) => {
          this.oddmentResult = this.getResponse(data)

          if (this.oddmentResult.success) {
            this.oddmentResults = this.oddmentResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          } else {
            this.showError('خطایی رخ داده است')
          }
        })
        .catch(response => {
          this.oddmentResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  watch: {
    loadCancelOddment () {
      //
      this.reloadOddmentDuty()
    }
  }
}
</script>
