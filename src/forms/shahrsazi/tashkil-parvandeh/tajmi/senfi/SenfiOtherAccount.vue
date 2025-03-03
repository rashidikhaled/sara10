<template>
  <fit>
    <div class="row q-col-gutter-sm q-mb-sm">
      <safa-combo
        label=" عنوان شغلی"
        sourceType="local"
        :options="nosaziCode"
        v-model="code"
        label-width="65px"
        class="col-md-3"
       />
      <safa-text
        label="سال تسویه "
        domainName="CI_SaraM1"
        ciName="CI_DutyYear"
        label-width="65px"
        class="col-md-3"
      />
      <safa-combo
        label="سال تسویه ملک"
        domainName="CI_SaraM1"
        ciName="CI_DutyYear"
        label-width="65px"
        class="col-md-3"
      />
      <safa-combo
        class="col-md-3"
        label="علت تسویه "
        domainName="CI_SaraM1"
        ciName="CI_DutyPayoffCause"
        label-width="65px"
      />
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
      title="لیست حساب ها"
    />
    <template>
      <div class="row q-gutter-md">
        <btn-new @click="accept"/>
        <btn-cancel @click="cancle" label=" ابطال"/>
        <btn-default class="btn-confirm" @click="nosazi" label="تأیید سال تسویه"/>
        <btn-delete class="btn-delete" @click="senfi" label="حذف سال تسویه"/>
        <btn-default @click="searchNosaziCode" label="تاریخچه ی سال تسویه"/>
      </div>
    </template>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      nosaziCode: [{ ID: 0, Title: '' }],
      code: 0
    }
  },
  props: {
    results: Array,
    selectedNosaziCode: String,
    oddmentResults: Object,
    loadCancelOddment: Boolean
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
              bizCode: this.selectedNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: this.selectedNosaziCode
            })
          }
        })
        .catch(response => {
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
