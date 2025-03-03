<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <!-- <section> -->
    <form-wrapper
      :title="title"
      vertical
    >
      <safa-status :result="saveResult"/>
      <fit>
        <div class="row q-gutter-md q-mb-sm">
          <safa-text
            v-model="topModel.WorkflowTitel"
            class="col-12 col-sm-5 col-md-3"
            label="عنوان گردش کار"
            label-width="100px"
            m="e"
          />
          <safa-text
            v-model="topModel.NidWorkflowDeff"
            class="col-12 col-sm-5 col-md-3"
            dir="ltr"
            label="شناسه گردش کار"
            m="e"
          />
          <safa-combo-enum
            v-model="topModel.EumShahrsaziArchiveGroup"
            class="col-12 col-sm-5 col-md-3"
            enum-name="EumShahrsaziArchiveGroup"
            label="گروه سوابق شهرسازی"
            m="r"
          />
          <safa-checkbox
            v-model="topModel.IsActive"
            color="primary"
            label="فعال"
            m="r"
            val="primary"
          />
        </div>
        <safa-datatable
          ref="technical-grid"
          v-model="loadResult.data.Sh_WorkflowList"
          :allowMultipleSelection="false"
          :hideHeader="true"
          fit
          helper="requestWorkflow"
          name="grid"
          title="درخواست ها و گردش کار"
          @selectedChange="selectedChange"
        ></safa-datatable>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: 'settings/workflow-settings',

  data () {
    return {
      title: 'درخواستها و گردش کارها',
      formKey: '0a85f163-6b27-4768-ba9b-e55106df06f1',
      name: 'UWorkFlowSettings',
      main: true,
      sidebarCompatible: true,
      loadResult: { data: {} },
      uniqueID: '',
      items: [],
      saveResult: {},
      topModel: {
        EumShahrsaziArchiveGroup: '',
        WorkflowTitel: '',
        NidWorkflowDeff: null,
        IsActive: false,
        CI_ShahrsaziArchiveKind: ''
      },
      changemode: 'r'
    }
  },
  mixins: [baseFormMixin],
  components: {},
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      try {
        this.showLoading()

        this.$services.SA.loadWorkflowListAll(null, {
          config: {
            District: this.selectedDistrict
          }
        }).then(async response => {
          this.loadResult = this.getResponse(response.data)
          await this.log({
            action: this.logActions.view,
            bizCode: 1,
            bizCodeTitle: 'District'
          })
          // if (response.data.ErrorResult.BizErrors.length === 0) {
          //   this.showSuccess('عملیات با موفقیت انجام شد')
          // }
        })
      } catch (error) {
        this.$q.dialog({
          title: 'خطا در سرور',
          // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
          message: error.message
        })
      } finally {
        this.hideLoading()
      }
    },
    selectedChange (e) {
      this.topModel = e.dataItem
    },
    newInfo () {
      this.changemode = 'e'

      const topModel = {
        EumShahrsaziArchiveGroup: '',
        WorkflowTitel: '',
        NidWorkflowDeff: null,
        IsActive: false,
        CI_ShahrsaziArchiveKind: ''
      }

      this.topModel = topModel
    },
    edit () {
      this.changemode = 'e'
    },
    cancel () {
      this.changemode = 'r'
    },
    save () {
      this.changemode = 'r'

      this.showLoading()
      let uniqueID = this.topModel.uniqueID
      delete this.topModel.inEdit
      delete this.topModel.rowNumber
      delete this.topModel.selected
      delete this.topModel.uniqueID

      const pDto = this.topModel

      const savePrequest = { pDto }

      this.$services.SA.saveWorkflow(savePrequest, {
        config: {
          District: 1
        }
      })
        .then(async response => {
          this.hideLoading()

          if (response.data.ErrorResult.BizErrors.length === 0) {
            await this.log({
              action: this.logActions.save,
              bizCode: uniqueID,
              bizCodeTitle: 'uniqueID'
            })
            this.showSuccess('عملیات با موفقیت انجام شد')
            this.loadData()
          }
        })
        .catch(ex => {
          this.$q.dialog({
            title: 'خطا در سرور',
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    }
  }
}
</script>
