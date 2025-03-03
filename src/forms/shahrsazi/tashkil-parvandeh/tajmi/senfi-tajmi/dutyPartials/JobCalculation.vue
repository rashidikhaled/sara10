<template>
  <fit>
    <safa-combo
      label="شغل"
      domainName="CI_SaraM1"
      ciName="CI_DutyYear"
      v-model="dutyYear"
      :labelWidth="$q.screen.gt.sm ? 'auto' : '135px'"
      :sortFunc="sortCombo"
    />
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      dutyYear: 1400,
      isMomayezi: false
    }
  },
  props: {},
  mounted () {},
  methods: {
    async getSettingData () {
      try {
        const getSettingDataResult = await this.loadFormSetting("Sharsazi-PersonalSetting")
        if (getSettingDataResult.PersonalSettingNosazi.ChkCalculateNosazi) {
          this.isMomayezi = true
        } else {
          this.isMomayezi = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    calculate () {
      this.isShowCalculate = true
      this.calcResult = null
      this.showLoading()
      let data = {
        pNidProc: '00000000-0000-0000-0000-000000000000',
        pNidList: this.results.NidJobList,
        pFromYear: 1380,
        pUser: this.currentUser,
        pSysCiDutyType: 2,
        pInfoGroup: 0,
        pIsMomayezi: this.isMomayezi,
        pRevisit: '00000000-0000-0000-0000-000000000000',
        pNidWorkItem: 0,
        pDoFinal: false,
        pSelectedNidJob: []
      }

      this.$services.SB.calculateDuty(data)
        .then(({ data }) => {
          this.calcResult = this.getResponse(data)

          if (this.calcResult.success) {
            this.showSuccess('محاسبه با موفقیت انجام پذیرفت.')
          }
        })
        .catch(response => {
          this.calcResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    load () {}
  }
}
</script>
