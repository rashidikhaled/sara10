<template>
  <fit>
    <safa-status :result="result"></safa-status>
    <safa-status :result="saveResult"></safa-status>
    <fit>
      <safa-datatable
        fit
        :m="m"
        v-model="value.Sh_ParkingStaffList"
        @selectedChange="selectedChange"
        ref="grid2"
        @dbclick="parkinfStaffDetails"
        @row-click="enableBtn"
        :bordered="false"
        helper="parkingStaff"
        :allowMultipleSelection="false"
        @reportClick="handleGridRport"
      />
    </fit>
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      selectedRow: {},
      isNewItem: true,
      parkingStaffDetailsTab: false,
      result: null,
      saveResult: null,
      disableBtn: true,
      disableEditBtn: true,
      disableDeleteBtn: true,
      disableLicenceBtn: true,
      showConfirmParkingStaff: {}
    }
  },
  props: {
    title: String,
    formKey: String,
    name: String,
    m: String,
    // results: Object
    value: Object
  },
  mounted () {},
  methods: {
    async handleGridRport (e) {
      const reportPath =
        '/Sara8Reports/rptParkingStaff'
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
          .District,
        RptDomain: "1@2@3",
        NIdUser: this.getNidUser(),
        NidParkingStaff: e.dataItem.NidParkingStaff
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidWorkItem,
        bizCodeTitle: 'شماره درخواست',
        nosaziCode: this.selectedRequest.BizCode
      })
    },
    selectedChange (e) {
      this.$emit('getSelectedParkingStaff', e)
    },
    // dbclick (e) {

    //   this.$emit('dbclick', e.row)
    // },
    enableBtn (value) {
      this.selectedRow = value
      if (
        value.ConfirmDate1 !== null &&
        value.ConfirmDate2 !== null &&
        value.ConfirmDate3 !== null &&
        value.ConfirmUser1 !== null &&
        value.ConfirmUser2 !== null &&
        value.ConfirmUser3 !== null &&
        value.ConfirmTime1 !== null &&
        value.ConfirmTime2 !== null &&
        value.ConfirmTime3 !== null &&
        value.EumConfirmParkingStaff1 === 1 &&
        value.EumConfirmParkingStaff2 === 1 &&
        value.EumConfirmParkingStaff3 === 1
      ) {
        this.disableBtn = true
        this.$emit('disableButton', this.disableBtn)
      } else {
        this.$emit('disableButton', false)
      }
    },
    deleteRow () {
      this.showConfirm('آیا از حذف اطمینان دارید؟').onOk(() => {
        this.showLoading()
        let data = {
          pParkingStaff: {
            ErrorResult: {
              BizErrors: [],
              Requirements: []
            },
            NidParkingStaff: '00000000-0000-0000-0000-000000000000',
            NidProc: this.selectedRequest.NidProc,
            Sh_ParkingStaff: this.$refs.grid2.selectedRows[0],
            Sh_ParkingStaffList: this.value.Sh_ParkingStaffList,
            pUser: this.currentUser
          }
        }
        this.$services.SC.deleteParkingStaff(data)
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)

            if (this.saveResult.success) {
              await this.log({
                action: this.logActions.save,
                bizCode: this.selectedRequest.BizCode,
                bizCodeTitle: 'کد نوسازی'
              })
              this.showSuccess('عملیات با موفقیت انجام شد.')
              this.$emit('reloadMainForm')
            }
          })
          .catch((response) => {
            this.saveResult = this.getResponse(response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    // confirmParkingStaff (level, confirmStatus) {
    //   this.showLoading()
    //   let data = {
    //     pLevel: level,
    //     pNidParkingStaff: this.selectedRow.NidParkingStaff,
    //     pIsConfirm: confirmStatus,
    //     pUser: this.currentUser
    //   }
    //   this.$services.SC.confirmParkingStaff(data)
    //     .then(({ data }) => {
    //       this.saveResult = this.getResponse(data)

    //       if (this.saveResult.success) {
    //         await this.log({
    //           action: this.logActions.save,
    //           bizCode: this.selectedRequest.BizCode,
    //           bizCodeTitle: 'کد نوسازی'
    //         })
    //         this.showSuccess('عملیات با موفقیت انجام شد.')
    //         this.$emit('reloadMainForm')
    //       }
    //     })
    //     .catch((response) => {
    //       this.saveResult = this.getResponse(response)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },
    confirmParkingStaff1 () {
      this.showLoading()
      let data = {
        pNidParkingStaff: this.selectedRow.NidParkingStaff,
        pEumConfirmationType: 1,
        pEumConfirmParkingStaff: 1,
        pUser: this.currentUser
      }
      this.$services.SC.confirmParkingStaff(data)
        .then(async (data) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('عملیات با موفقیت انجام شد.')
            this.$emit('reloadMainForm')
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
            // this.results = this.result.data
            this.$emit('reloadMainForm')
          }
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    confirmParkingStaff2 () {
      this.showLoading()
      let data = {
        pNidParkingStaff: this.selectedRow.NidParkingStaff,
        pEumConfirmationType: 2,
        pEumConfirmParkingStaff: 1,
        pUser: this.currentUser
      }
      this.$services.SC.confirmParkingStaff(data)
        .then(async (data) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('عملیات با موفقیت انجام شد.')
            this.$emit('reloadMainForm')
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
            // this.results = this.result.data
            this.$emit('reloadMainForm')
          }
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    confirmParkingStaff3 () {
      this.showLoading()
      let data = {
        pNidParkingStaff: this.selectedRow.NidParkingStaff,
        pEumConfirmationType: 3,
        pEumConfirmParkingStaff: 1,
        pUser: this.currentUser
      }
      this.$services.SC.confirmParkingStaff(data)
        .then(async (data) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('عملیات با موفقیت انجام شد.')
            this.$emit('reloadMainForm')
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
            // this.results = this.result.data
            this.$emit('reloadMainForm')
          }
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    unConfirmParkingStaff1 () {
      this.showLoading()
      let data = {
        pNidParkingStaff: this.selectedRow.NidParkingStaff,
        pEumConfirmationType: 1,
        pEumConfirmParkingStaff: 2,
        pUser: this.currentUser
      }
      this.$services.SC.confirmParkingStaff(data)
        .then(async (data) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('عملیات با موفقیت انجام شد.')
            this.$emit('reloadMainForm')
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
            // this.results = this.result.data
            this.$emit('reloadMainForm')
          }
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    unConfirmParkingStaff2 () {
      this.showLoading()
      let data = {
        pNidParkingStaff: this.selectedRow.NidParkingStaff,
        pEumConfirmationType: 2,
        pEumConfirmParkingStaff: 2,
        pUser: this.currentUser
      }
      this.$services.SC.confirmParkingStaff(data)
        .then(async (data) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('عملیات با موفقیت انجام شد.')
            this.$emit('reloadMainForm')
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
            // this.results = this.result.data
            this.$emit('reloadMainForm')
          }
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    unConfirmParkingStaff3 () {
      this.showLoading()
      let data = {
        pNidParkingStaff: this.selectedRow.NidParkingStaff,
        pEumConfirmationType: 3,
        pEumConfirmParkingStaff: 2,
        pUser: this.currentUser
      }
      this.$services.SC.confirmParkingStaff(data)
        .then(async (data) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('عملیات با موفقیت انجام شد.')
            this.$emit('reloadMainForm')
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
            // this.results = this.result.data
            this.$emit('reloadMainForm')
          }
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    parkinfStaffDetails (value) {
      // this.selectedRow = value.row
      let currentRow = value.row
      let constraint2 = currentRow.RevisitDate === null
      let constraint3 = currentRow.CI_ParkingStaff === null
      if (constraint2 && constraint3) {
        this.showError('لطفا تاریخ بازدید و نوع هیئت پارکینگ را وارد نمایید.')
        this.isEditable = true
      } else if (constraint3 && !constraint2) {
        this.showError('لطفا نوع هیئت پارکینگ را وارد نمایید.')
        // this.isEditable = true
      } else if (!constraint3 && constraint2) {
        this.showError('لطفا تاریخ بازدید را وارد نمایید.')
        // this.isEditable = true
      } else {
        this.parkingStaffDetailsTab = true
        this.activeTab = 'showParkingStaffDetailTab'

        this.$emit('dbclick', currentRow)
      }
    }
  }
}
</script>
