<template>
  <safa-form
    id="00fd0ab8-f601-44e0-bd5a-a8b54e1fb130"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      vertical
      title=" چک لیست"
      :padding="false"
    >
      <safa-status :result="saveResult" />
      <safa-status :result="fetchData" />
      <fit>
        <safa-datatable
          helper="commitmentCheckList"
          v-model="results.Sh_CheckList"
          :m="mode"
          @row-click="click"
          fit
          :bordered="false"
          max-height="100%"
          height="100%"
          :deleteRow="false"
          :selectable="true"
          title="چک لیست"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="edit"
          @cancel="cancel"
          @save="SaveData"
        >
          <template
            v-show="clickRow"
            v-slot:after
          >
            <btn-default
              spId="d73afad2-2f59-4ce6-a15c-fae2fc653a80"
              spCaption="تایید"
              label="تأیید"
              @click="accept"
              label-width="75px"
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
  route: '/check-list/UCommitmentsCheckList',
  mixins: [baseFormMixin],
  data: function () {
    return {
      name: 'UCommitmentsCheckList',
      title: '  چک لیست',
      formKey: '00fd0ab8-f601-44e0-bd5a-a8b54e1fb130',
      main: true,
      results: { Sh_CheckList: [] },
      fetchData: null,
      clickRow: true,
      selectedRow: null,
      saveResult: null
    }
  },
  methods: {
    // Fetch data ...
    loadData () {
      this.showLoading()
      let payload = {
        pNidProc: this.selectedRequest.NidProc
      }
      this.$services.SC.loadShcheckList(payload)
        .then(async ({ data }) => {
          this.fetchData = this.getResponse(data)
          if (this.fetchData.success) {
            this.results = this.fetchData.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })
            if (this.results.Sh_CheckList.length > 0) {
              this.results.Sh_CheckList.map(x => {
                if (x.IsFromFormul === true) {
                  x.readonly = true
                  x.class = 'is-from-formul'
                }
              })
            } else {
              this.results.Sh_CheckList = []
            }
          }
        })
        .catch(response => {
          console.log('load data', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // Save data ...
    SaveData () {
      if (this.results.Sh_CheckList) {
        this.results.Sh_CheckList.map(x => {
          if (
            x.IsConfirmByUrbanPlanner === null &&
            x.IsConfirmByUrbanPlanner === ''
          ) {
            x.IsConfirmByUrbanPlanner = false
          }
        })
      } else {
        this.showError('موردی جهت ذخیره وجود ندارد')
        return
      }
      if (this.results.Sh_CheckList && this.results.Sh_CheckList.length > 0) {
        this.results.Sh_CheckList.forEach((itm, index) => {
          if (!itm.CI_CheckList) {
            // this.showError('چک لیست خالی است')
            this.results.Sh_CheckList.splice(index, 1)
          }
          if (itm.IsConfirmByUrbanPlanner === '') {
            itm.IsConfirmByUrbanPlanner = null
          }
          if (itm.IsFromFormul === '') itm.IsFromFormul = null
          if (itm.NidUserUrbanPlanner === '') itm.NidUserUrbanPlanner = null
        })
      }
      this.showLoading()
      let payload = {
        pCheckList: this.results
      }
      this.$services.SC.saveShcheckList(payload)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.isEditable = false
            this.clickRow = true
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })
            this.loadData()
            this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
          }
        })
        .catch(response => {
          console.log('save error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // Handle onClick rows of grid
    click (row) {
      this.selectedRow = row
    },
    // handle edit..
    edit () {
      this.isEditable = true
      this.clickRow = false
    },
    // cancel edit mode
    cancel () {
      this.isEditable = false
      this.clickRow = true
      this.loadData()
    },
    // confirm list ...
    accept () {
      if (this.selectedRow) {
        this.showConfirm('آیا از تأیید ردیف مطمئن هستید؟').onOk(() => {
          this.showLoading()
          let payload = {
            pNidCheckList: this.selectedRow.NidCheckList,
            pUser: this.currentUser
          }
          this.$services.SC.confirmShCheckList(payload)
            .then(async ({ data }) => {
              this.saveResult = this.getResponse(data)
              if (this.saveResult.success) {
                await this.log({
                  action: this.logActions.save,
                  bizCode: this.selectedRow.NidCheckList,
                  bizCodeTitle: 'NidCheckList',
                  nosaziCode: this.selectedRequest.BizCode
                })
                this.loadData()
                this.showSuccess('تأیید موفقیت انجام شد.')
              }
            })
            .catch(response => {
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
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
