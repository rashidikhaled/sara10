<template>
<safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >    <form-wrapper
      vertical
      :title="title"
      :padding="false"
    >
      <template #header>
        <safa-status :result="fetchData" />
      </template>
      <fit>
        <safa-datatable
          helper="OfficeLetterList"
          v-model="results.OfficeLetterList"
          :m="mode"
          @row-click="click"
          fit
          :bordered="false"
          max-height="100%"
          height="100%"
          :selectable="true"
          :show-selected-checkbox="false"
          :addRow="false"
          :hideHeader="true"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="cancel"
          @save="SaveData"
        >
          <template v-slot:after>
            <btn-default
              label="تأیید"
              spCaption="تأیید"
              spId="d73afad2-2f59-4ce6-a15c-fae2fc653a80"
              @click="accept"
              :disabled="acceptDisabled"
            />
            <btn-default
              label="عدم تأیید"
              @click="notAccept"
              :disabled="notAcceptDisabled"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  route: '/office-check-list/OfficeCheckList',
  mixins: [baseFormMixin],
  data: function () {
    return {
      name: 'OfficeCheckList',
      title: 'چک لیست ادارات',
      formKey: '00fd0ab8-f601-44e0-bd5a-a8b54e1fb130',
      main: true,
      acceptDisabled: false,
      notAcceptDisabled: false,
      results: {
        OfficeLetterList: [
          // {
          //   IsSelected: false,
          //   Title: 'نامه', //
          //   EumOfficeLetterType: 'نوع', //
          //   NidWorkItem: '5654', //
          //   EumConfirm: null, //
          //   Comments: 'توضیحات شهرساز', //
          //   EumConfirmOrganization: 'عدم تأیید سازمان',
          //   CommentsOrganization: 'توضیحات سازمان', //
          //   OfficeAddress: 'آدرس سازمان', //
          //   OfficeTel: '2452452', //
          //   ArchiveCol: 'آرشیو'
          // }
        ]
      },
      fetchData: null,
      selectedRow: null,
      saveResult: null
    }
  },
  methods: {
    // Fetch Data
    loadData () {
      this.showLoading()
      let payload = {
        pNidProc: this.selectedRequest.NidProc
      }
      this.$services.SC.getShOfficeLetter(payload)
        .then(async ({ data }) => {
          console.log(data, 'data')
          this.fetchData = this.getResponse(data)
          if (this.fetchData.success) {
            this.results = this.fetchData.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })
          }
        })
        .catch((response) => {
          console.log('load_data_response', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // Save Data
    SaveData () {
      // SaveSh_OfficeLetter
      this.showLoading()
      let data = {
        OfficeLetterList: this.OfficeLetterList
      }
      this.$services.SC.saveShOfficeLetter(data)
        .then(async ({ data }) => {
          this.saveShOfficeLetter = this.getResponse(data)
          if (this.saveShOfficeLetter.success) {
            this.results = this.fetchData.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })
          }
          this.loadData()
        })
        .catch((response) => {
          console.log('saveShOfficeLetter_response', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // Handle onClick rows of grid
    click (row) {
      this.selectedRow = row
      console.log(this.selectedRow, 'this.selectedRow')
      this.disabledHandler()
    },
    // Handler disable action buttons
    disabledHandler () {
      if (this.selectedRow.EumConfirm !== null) {
        if (this.selectedRow.EumConfirm === 'تأیید شهرساز') {
          this.acceptDisabled = false
          this.notAcceptDisabled = true
        } else {
          this.acceptDisabled = true
          this.notAcceptDisabled = false
        }
      } else {
        this.acceptDisabled = false
        this.notAcceptDisabled = false
      }
    },
    // cancel edit mode
    cancel () {
      this.isEditable = false
      this.loadData()
    },
    // confirm list
    accept () {
      if (this.selectedRow) {
        this.showConfirm('آیا از تأیید ردیف انتخاب شده مطمئن هستید؟').onOk(() => {
          // this.showLoading()
          // let payload = {
          //   pNidCheckList: this.selectedRow.NidCheckList,
          //   pUser: {
          //     JobLocationGuid: '00000000-0000-0000-0000-000000000000',
          //     UserGuid: this.getNidUser(),
          //     UserName: this.getUserDisplayName()
          //   }
          // }
          // this.$services.SC.confirmShCheckList(payload)
          //   .then(({ data }) => {
          //     this.saveResult = this.getResponse(data)
          //     if (this.saveResult.success) {
          //       await this.log({
          //         action: this.logActions.save,
          //         bizCode: this.selectedRow.NidCheckList,
          //         bizCodeTitle: 'NidCheckList'
          //       })
          //       this.loadData()
          //       this.showSuccess('تأیید موفقیت انجام شد.')
          //     }
          //   })
          //   .catch(response => {
          //     this.serverError()
          //   })
          //   .finally(() => {
          //     this.hideLoading()
          //   })
        })
      } else {
        this.showError('لطفا یک ردیف انتخاب نمایید.')
      }
    },
    // not confirm list
    notAccept () {
      if (this.selectedRow) {
        this.showConfirm('آیا از عدم تأیید ردیف انتخاب شده مطمئن هستید؟').onOk(() => {

        })
      } else {
        this.showError('لطفا یک ردیف انتخاب نمایید.')
      }
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.loadData()
    } else {
      this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید.')
    }
  }
}
</script>
