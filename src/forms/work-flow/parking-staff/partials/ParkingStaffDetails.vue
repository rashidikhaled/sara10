<template>
  <div class="full-height">
    <safa-status :result="getResult"/>
    <safa-status :result="saveResult"/>
    <fit>
      <safa-datatable
        fit
        height="100%"
        max-height="100%"
        :m="mode"
        v-model="getResults.Sh_ParkingStaff_Detailes"
        :bordered="false"
        helper="parkingStaffDetails"
      />

      <FormActions
        class="q-pa-sm"
        :m="mode"
        @edit="isEditable = true"
        @save="saveDetailesTab"
        @cancel="isEditable = false"
      >
      </FormActions>
    </fit>
  </div>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      saveResult: null,
      getResult: null,
      getResults: { Sh_ParkingStaff_Detailes: [] },
      parkingStaffDetailsTab: false,
      loadDiscountByNidDPrequest: {
        NidParkingStaff: null
      }
    }
  },
  props: {
    m: String,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    selectRow: Object,
    isNew: {
      type: Boolean,
      default: false
    },
    results: Object
  },
  mounted () {
    this.reLoad()
  },
  methods: {
    saveDetailesTab () {
      this.showLoading()
      this.getResults.Sh_ParkingStaff_Detailes = this.normalizeData()
      let data = {
        pParkingStaff: {
          NidParkingStaff: this.selectRow.NidParkingStaff,
          NidProc: "00000000-0000-0000-0000-000000000000",
          Sh_ParkingStaff_Detailes: this.getResults.Sh_ParkingStaff_Detailes,
          pUser: this.currentUser
        }
      }
      this.$services.SC.saveParkingStaffDetailes(data)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "کد نوسازی"
            })
            this.isEditable = false
            this.showSuccess("عملیات با موفقیت انجام شد.")
          }
        })
        .catch((response) => {
          this.saveResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.reLoad()
          this.hideLoading()
        })
    },
    reLoad () {
      this.showLoading()
      // this.getResults.Sh_ParkingStaff_Detailes = []
      // this.results.NidParkingStaff = this.selectRow.NidParkingStaff
      // this.results.NidProc = '00000000-0000-0000-0000-000000000000'
      this.getResults.Sh_ParkingStaff_Detailes = this.normalizeData()

      let data = {
        pParkingStaff: {
          NidParkingStaff: this.selectRow.NidParkingStaff,
          NidProc: "00000000-0000-0000-0000-000000000000",
          Sh_ParkingStaff_Detailes: this.getResults.Sh_ParkingStaff_Detailes,
          pUser: this.currentUser
        }
      }
      this.$services.SC.getParkingStaffDetailes(data)
        .then(async ({ data }) => {
          this.getResult = this.getResponse(data)
          if (this.getResult.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.results.NidParkingStaff,
              bizCodeTitle: "NidParkingStaff"
            })
            this.getResults.Sh_ParkingStaff_Detailes = []
            this.getResults = this.getResult.data
            // this.getResults.Sh_ParkingStaff_Detailes =
            //   this.getResults.Sh_ParkingStaff_Detailes.find(
            //     (x) => x.NidParkingStaff === this.selectRow.NidParkingStaff
            //   );
            this.parkingStaffDetailsTab = true
            // this.$refs.MainTab.changeTab('showParkingStaffDetailTab')
            this.isNew = false
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeData () {
      return this.getResults.Sh_ParkingStaff_Detailes.map((m) => {
        return {
          ...m,
          NidParkingStaffDetailes:
            m.NidParkingStaffDetailes || "00000000-0000-0000-0000-000000000000",
          NidParkingStaff:
            m.NidParkingStaff || this.selectRow.NidParkingStaff
        }
      })
    }
  }
}
</script>
