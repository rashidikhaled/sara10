<template>
<safa-form :id="formKey" caption="نما و منظر شهری" app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b">
    <safa-status :result="requestResult"></safa-status>
  <form-wrapper
    :title="title"
  >
  <fit>
    <FormRow class="q-mb-sm">
        <FormControl>
            <safa-combo
            label="چک لیست"
            v-model="model.CI_UrbanView"
            label-width="90px"
            ciName="CI_UrbanView"
            domainName="CI_SaraM1"
            @input="loadObj"
            />
        </FormControl>
    </FormRow>
    <fit>
        <safa-grid
          height="100%"
          maxHeight="100%"
          minHeight="300px"
          filterable
          title="جزییات چک لیست"
          sortable
          :m="mode"
          paginate
          :showRowNumber="true"
          :paginationPageSize="50"
          :allowMultipleSelection="false"
          v-model="ShUrbanViewList"
          helper="UrbanViewPerspectiveHelper"
          cdcName="pShUrbanViewList"
          :add-row="false"
          :allow-copy="false"
          :delete-row="false"
        >
        </safa-grid>
      </fit>
   </fit>
    <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="loadObj"
        >
        </form-actions>
      </template>
   </form-wrapper>
  </safa-form>
</template>

<script>
// import { convertStringToNosaziCodeObject, convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "نما و منظر شهری",
      name: "UrbanViewPerspective",
      formKey: "C62D919B-71AD-428A-B884-E24621AF124D",
      main: true,
      requestResult: null,
      ShUrbanViewList: [],
      model: {
        CI_UrbanView: 0,
        District: null,
        Sh_UrbanViewList: [],
        NidProc: '00000000-0000-0000-0000-000000000000'
      },
      checkListOptions: []
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      let payload = {
        pNidProc: this.selectedNidProc,
        // "pNidProc": "B6022666-AABC-4D49-A26A-AC55A84F8C8C",
        pCI_UrbanView: this.model.CI_UrbanView
      }
      this.$services.SC.getUrbanView(payload,
        {
          config: {
            District: this.selectedDistrict
          }
        })
        .then(async (response) => {
          this.requestResult = this.getResponse(response)
          if (this.requestResult.success) {
            this.model = { ...this.requestResult.data.data }
            this.ShUrbanViewList = this.model.Sh_UrbanViewList?.map(x => {
              return {
                ...x,
                EumDefectRectification1: x.EumDefectRectification1 !== null ? (x.EumDefectRectification1 === 1) : null,
                EumDefectRectification2: x.EumDefectRectification2 !== null ? (x.EumDefectRectification2 === 1) : null,
                EumConfirm: x.EumConfirm !== null ? (x.EumConfirm === 1) : null
              }
            })
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.bizCode
            })
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
    saveObj () {
      this.showLoading()
      this.model.Sh_UrbanViewList = this.ShUrbanViewList?.map(x => {
        return {
          ...x,
          EumDefectRectification1: x.EumDefectRectification1 !== null ? (x.EumDefectRectification1 === true ? 1 : 0) : null,
          EumDefectRectification2: x.EumDefectRectification2 !== null ? (x.EumDefectRectification2 === true ? 1 : 0) : null,
          EumConfirm: x.EumConfirm !== null ? (x.EumConfirm === true ? 1 : 0) : null
        }
      })
      let payload = {
        pNidProc: this.model.NidProc,
        pUrbanView: {
          CI_UrbanView: this.model.CI_UrbanView,
          District: this.model.District,
          ErrorResult: {
            BizErrors: [],
            Requirements: []
          },
          Sh_UrbanViewList: this.model.Sh_UrbanViewList
        }

        // pUrbanView: { ...this.model },

      }
      this.$services.SC.SaveUrbanView(payload, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response)
          if (this.requestResult.success) {
            this.showSuccess('ذخیره با موفقیت انجام شد.')
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.bizCode
            })
          }
          this.loadObj()
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    }

  },
  async created () {
    if (!this.selectedRequest) {
      this.showError('هیچ درخواستی از کارتابل انتخاب نشده است')
      this.hideSidebar("UrbanViewPerspective")
      this.redirectToKartable()
    }
  }
}
</script>
