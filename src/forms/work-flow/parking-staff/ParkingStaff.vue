<template>
  <safa-form :id="formKey" :caption="title" appId="ace63a06-e835-457d-a1ea-3b477dd9e69b">
    <form-wrapper vertical title="هیأت پارکینگ" :padding="false">
      <safa-status :result="result"></safa-status>
      <safa-status :result="saveResult"></safa-status>
      <safa-status :result="checkIsConfirmOutputResult"></safa-status>

      <safa-tabs v-model="activeTab" class="fit" ref="MainTab">
        <template v-slot:tabs>
          <tab-menu name="showParkingStaffTab" label="هیأت پارکینگ"/>

          <tab-menu
            v-if="parkingStaffDetailsTab"
            name="showParkingStaffDetailTab"
            label="جزئیات هیأت پارکینگ"
            closable
            @close="closeDetailsTab"
          />
        </template>
        <tab-content
          name="showParkingStaffTab"
          title="هیأت پارکینگ"
          :padding="false"
        >
          <!-- :results="results" -->
          <ParkingStaffTab
            :title="title"
            :formKey="formKey"
            :name="name"
            v-model="results"
            ref="ParkingStaffTab"
            @dbclick="dbclick"
            :isNew="isNew"
            :m="mode"
            @disableButton="onShowButton($event)"
            @getSelectedParkingStaff="getSelectedParkingStaff"
            @reloadMainForm="load()"
          />
        </tab-content>
        <tab-content
          name="showParkingStaffDetailTab"
          title="جزئیات هیأت پارکینگ"
          :padding="false"
          v-if="parkingStaffDetailsTab"
        >
          <parking-staff-details
            :title="title"
            :formKey="formKey"
            :name="name"
            :selectRow="selectRow"
            :isNew="isNew"
            :results="results"
            :m="mode"
            ref="showParkingStaffDetailTab"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          :disabled="disableEditBtn"
          @save="SaveParkingStaff"
          @cancel="isEditable = false"
        >
          <template v-slot:after>
            <btn-new
              @click="NewRow"
              label="ردیف جدید"
              :disabled="disableNewBtn"
            />

            <btn-delete
              @click="deleteRowBTN"
              label=" حذف ردیف"
            />

            <btn-default
              @click="confirmParkingStaff1BTN"
              label=" تأیید 1"
              :disabled="disableBtn"
            />

            <btn-default
              @click="unConfirmParkingStaff1BTN"
              label=" عدم تأیید1 "
              :disabled="disableBtn"
            />

            <btn-default
              @click="confirmParkingStaff2BTN"
              label=" تأیید 2"
              :disabled="disableBtn"
            />
            <btn-default
              @click="unConfirmParkingStaff2BTN"
              label=" عدم تأیید2 "
              :disabled="disableBtn"
            />

            <btn-default
              @click="confirmParkingStaff3BTN"
              label="تأیید 3"
              :disabled="disableBtn"
            />

            <btn-default
              @click="unConfirmParkingStaff3BTN"
              label=" عدم تأیید3 "
              :disabled="disableBtn"
            />

            <btn-default :disabled="disableLicenceBtn" label=" صدور گواهی"/>
            <btn-default :disabled="disableLicenceBtn" label=" ابطال گواهی"/>
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import ParkingStaffTab from './partials/ParkingStaffTab.vue'
import ParkingStaffDetails from './partials/ParkingStaffDetails.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'
import BtnDefault from '../../../components/common/buttons/BtnDefault.vue'

export default {
  route: '/ParkingStaff',

  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'هیأت پارکینگ',
      formKey: '0e688936-249b-4b8f-8c98-4a3383bef2a4',
      name: 'ParkingStaff',
      main: true,
      workflowCompatible: true,
      activeTab: 'showParkingStaffTab',
      results: { Sh_ParkingStaffList: [], Sh_ParkingStaff_Detailes: [] },
      result: null,
      parkingStaffDetailsTab: false,
      disableBtn: true,
      disableEditBtn: true,
      disableDeleteBtn: true,
      disableLicenceBtn: true,
      disableNewBtn: false,
      isNew: false,
      saveResult: null,
      selectedParkingStaff: null,
      isNewItem: null,
      checkIsConfirmOutputResult: null,
      hasSodor: false,
      selectRow: {},
      archiveBizCode: ''
    }
  },
  components: { ParkingStaffTab, ParkingStaffDetails, BtnDefault },
  created () {
    this.load()
  },
  methods: {
    getSelectedParkingStaff (value) {
      this.selectedParkingStaff = value.dataItem
      console.log(value.dataItem, '@@@@')
    },
    onShowButton (val) {
      this.disableBtn = val
    },
    load () {
      this.showLoading()
      let data = {
        pNidProc: this.selectedRequest.NidProc,
        pParkingStaff: {
          NidParkingStaff: '00000000-0000-0000-0000-000000000000',
          NidProc: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.SC.getParkingStaff(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    NewRow () {
      if (
        this.results.Sh_ParkingStaffList.length > 0 &&
        (this.results.Sh_ParkingStaffList[0].NidConfirmUser1 === null ||
          this.results.Sh_ParkingStaffList[0].NidConfirmUser2 === null ||
          this.results.Sh_ParkingStaffList[0].NidConfirmUser3 === null)
      ) {
        this.showError('لطفا ابتدا تایید/عدم تایید ردیف قبلی را مشخص کنید')
        return
      }
      this.showLoading()
      let data = {
        pParkingStaff: {
          ErrorResult: {
            BizErrors: [],
            Requirements: []
          },
          NidParkingStaff: '00000000-0000-0000-0000-000000000000',
          NidProc: this.selectedRequest.NidProc,
          Sh_ParkingStaffList: this.results.Sh_ParkingStaffList,
          pUser: this.currentUser
        },
        pNidProc: this.selectedRequest.NidProc,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: 'baea57df-4bb2-4ba2-956b-1617ba73a85d',
          WorkflowGuid: '5ca8477d-2a3a-4962-9c63-a8690ff8975c'
        }
      }
      // data.pParkingStaff.pUser = this.currentUser
      // if (!this.isNewItem) {
      //   this.showError('dddd')
      //   data.pParkingStaff.Sh_ParkingStaffList = this.selectRow
      // }
      this.$services.SC.saveParkingStaff(data)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess('عملیات با موفقیت انجام شد.')
            this.load()
            this.isNewItem = true
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
          }
        })
        .catch((response) => {
          this.serverError()
          console.error(response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    confirmParkingStaff1BTN () {
      this.$refs.ParkingStaffTab.confirmParkingStaff1()
    },
    unConfirmParkingStaff1BTN () {
      this.$refs.ParkingStaffTab.unConfirmParkingStaff1()
    },
    confirmParkingStaff2BTN () {
      this.$refs.ParkingStaffTab.confirmParkingStaff2()
    },
    unConfirmParkingStaff2BTN () {
      this.$refs.ParkingStaffTab.unConfirmParkingStaff2()
    },
    confirmParkingStaff3BTN () {
      this.$refs.ParkingStaffTab.confirmParkingStaff3()
    },
    unConfirmParkingStaff3BTN () {
      this.$refs.ParkingStaffTab.unConfirmParkingStaff3()
    },
    deleteRowBTN () {
      this.$refs.ParkingStaffTab.deleteRow()
    },

    dbclick (row) {
      this.selectRow = row
      this.parkingStaffDetailsTab = true
      this.activeTab = 'showParkingStaffDetailTab'
      // this.isNew = true
      this.$refs.showParkingStaffDetailTab.reLoad()
    },
    SaveParkingStaff () {
      this.showLoading()
      //  this.Sh_ParkingStaff = this.normalizeSaveData()
      this.results.Sh_ParkingStaff = this.results.Sh_ParkingStaffList.find(
        (x) => x.uniqueID === this.selectedParkingStaff.uniqueID
      )
      this.results.pUser = this.currentUser
      let data = {
        pParkingStaff: this.results,
        pNidProc: this.selectedRequest.NidProc,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: 'baea57df-4bb2-4ba2-956b-1617ba73a85d',
          WorkflowGuid: '5ca8477d-2a3a-4962-9c63-a8690ff8975c'
        }
      }
      // if (!this.isNewItem) {
      //   data.pParkingStaff.Sh_ParkingStaffList = this.selectRow
      // }
      this.$services.SC.saveParkingStaff(data)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess('عملیات با موفقیت انجام شد.')
            this.load()
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
          }
        })
        .catch((response) => {
          this.serverError()
          console.error(response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeSaveData () {
      return this.Sh_ParkingStaff.map((m) => {
        return {
          ...m,
          CI_ParkingStaff: m.CI_ParkingStaff
          // NidCreatetUserName:
          //   m.NidCreatetUserName || '00000000-0000-0000-0000-000000000000',
          // NidLastEditUserName:
          //   m.NidLastEditUserName || '00000000-0000-0000-0000-000000000000',
          // NidParkingStaff:
          //   m.NidParkingStaff || this.selectRow.NidParkingStaff
        }
      })
    },
    closeDetailsTab () {
      if (this.isEditable) {
        this.showWarning('در حالت ویرایش امکان بستن این پنجره وجود ندارد.')
        return
      }
      this.parkingStaffDetailsTab = false
      this.activeTab = 'showParkingStaffTab'
      this.isNew = false
    },
    checkIsConfirmOutput () {
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pOutputEngTitle: 'Output_ParkingStaff'
      }
      this.$services.SC.checkIsConfirmOutput(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.checkIsConfirmOutputResult = res.data
            if (this.checkIsConfirmOutputResult.Sh_Output) {
              this.hasSodor = true
              this.updateArchiveBizCode(
                this.checkIsConfirmOutputResult.Sh_Output.ArchiveBizCode
              )
            } else {
              this.hasSodor = false
              this.loadData()
            }
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    }
  }
}
</script>
