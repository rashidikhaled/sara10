<template>
  <safa-form
    :id="formKey"
    :caption="title + '- صنفی'"
    app-id= "4e4c0133-a224-4e34-ab34-a27a464e51dc"
  >
    <!-- prev app-id= "ace63a06-e835-457d-a1ea-3b477dd9e69b" -->
    <form-wrapper title="معافیت های عوارضی" vertical>
      <template #header>
        <form-header-by-nosazi-code
          actions
          v-model="baseNosaziCode"
          @fetched="loadData"
          cdcName="baseNosaziCode"
        />
        <safa-status :result="requestResult"/>
      </template>
      <div class="row q-mb-sm">
        <safa-combo
          v-model="selectedItem"
          source-type="local"
          :options="infoGroupOptions"
          label="دسته اطلاعاتی"
          labelWidth="90px"
          v-if="isShowBaseInfoGroupCombo"
          class="col-md-3"
        />
      </div>
      <fit>
        <safa-datatable
          v-model="formModel.Base_DutyExemption"
          helper="moafiyatAvarezi"
          :m="mode"
          height="100%"
          :addRow="true"
          :deleteRow="true"
          :allowCopy="true"
          fit
          max-height="100%"
          min-height="100%"
          title="معافیت های عوارضی"
          cdcName="moafiyatAvarezi"
          sortable
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveData"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import FormActions from 'src/components/FormActions.vue'
// import loadDataResponse from "./models/loadDataResponse.js";
import loadDataPrequest from './models/loadDataPrequest.js'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: 'nosazi-avarez/moafiyat-avarezy',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'معافیت های عوارضی',
      formKey: '07d623e5-1fb8-41bc-b23f-7bb6c92e9649',
      name: 'UMoafiyatAvareziSenfi',
      main: true,
      sidebarCompatible: true,
      selectedItem: 0,
      isGoToEdit: false,
      formModel: {},
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      requestResult: null,
      isView: false
    }
  },
  components: {
    FormActions
  },
  computed: {
    isShowBaseInfoGroupCombo () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').isShowBaseInfoGroupCombo
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').infoGroupOptions
    }
    // ownersFullName() {
    //   if (!this.formModel.Base_Owner) {
    //     return "";
    //   }

    //   return this.formModel.Base_Owner.map(
    //     m => m.OwnerLastName + " " + m.OwnerName
    //   ).join(" , ");
    // },
    // fullAddress() {
    //   if (
    //     !this.formModel.Base_AddressInfo ||
    //     !this.formModel.Base_CommonEstate
    //   ) {
    //     return "";
    //   }

    //   return this.formModel.Base_AddressInfo.MainAddress; // +
    //   // '' +
    //   // this.formModel.Base_CommonEstate.Plack
    // }
  },
  methods: {
    loadData () {
      this.showLoading()
      loadDataPrequest.pNosaziCode.District = this.baseNosaziCode.District
      loadDataPrequest.pNosaziCode.Region = this.baseNosaziCode.Region
      loadDataPrequest.pNosaziCode.Block = this.baseNosaziCode.Block
      loadDataPrequest.pNosaziCode.House = this.baseNosaziCode.House
      loadDataPrequest.pNosaziCode.Building = this.baseNosaziCode.Building
      loadDataPrequest.pNosaziCode.Apartment =
        this.baseNosaziCode.Apartment
      loadDataPrequest.pNosaziCode.Shop = this.baseNosaziCode.Shop

      this.$services.SB.loadDutyExemption(loadDataPrequest, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)

          this.formModel = this.requestResult.data

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
          this.isView = true
          this.hideLoading()
        })
        .catch((error) => {
          this.hideLoading()
          this.showError(error.message)
        })
    },
    normalizeRows (rows) {
      return (
        rows &&
        rows.map((row) => {
          return {
            ...row,
            CreateDate: row.CreateDate || null,
            CreateTime: row.CreateTime || null,
            DeleteDate: row.DeleteDate || null,
            DeleteTime: row.DeleteTime || null,
            DeletedNidUser: row.DeletedNidUser || null,
            DeletedUserName: row.DeletedUserName || null,
            IsDeleted: row.IsDeleted || true,
            NidBase: row.NidBase || '00000000-0000-0000-0000-000000000000',
            NidDutyExemption:
              row.NidDutyExemption || '00000000-0000-0000-0000-000000000000',
            NidUser: row.NidUser || null,
            UserName: row.UserName || null,
            FromDate: row.FromDate || '',
            ToDate: row.ToDate || ''
          }
        })
      )
    },
    saveData () {
      try {
        if (this.baseNosaziCode.District === 0) {
          this.showError("منطقه صفر برای کدنوسازی وارد شده معتبر نمی باشد.")
          return
        }
        const pDutyExemption = this.formModel
        const saveRequest = {
          pDutyExemption
        }
        saveRequest.pDutyExemption.Base_AddressInfo =
          this.formModel.Base_AddressInfo
        saveRequest.pDutyExemption.Base_CommonEstate =
          this.formModel.Base_CommonEstate
        saveRequest.pDutyExemption.Base_DutyExemption =
          this.formModel.Base_DutyExemption
        saveRequest.pDutyExemption.Base_Owner = this.formModel.Base_Owner
        saveRequest.pDutyExemption.Duty_ExemptionBase =
          this.formModel.Duty_ExemptionBase
        saveRequest.pDutyExemption.Duty_ExemptionBase_DeletedItems =
          this.formModel.Duty_ExemptionBase_DeletedItems
        saveRequest.pDutyExemption.Duty_ExemptionRole =
          this.formModel.Duty_ExemptionRole
        saveRequest.pDutyExemption.Duty_ExemptionRole_DeletedItems =
          this.formModel.Duty_ExemptionRole_DeletedItems
        saveRequest.pDutyExemption.EumBaseInfoGroup =
          this.formModel.EumBaseInfoGroup
        saveRequest.pDutyExemption.NosaziCode = this.formModel.NosaziCode
        saveRequest.pDutyExemption.pUser = this.currentUser
        saveRequest.pDutyExemption.pEumBaseInfoGroup =
          this.formModel.pEumBaseInfoGroup

        saveRequest.pDutyExemption.Base_DutyExemption = this.normalizeRows(
          saveRequest.pDutyExemption.Base_DutyExemption
        )
        this.formModel.pUser = this.currentUser
        let data = {
          pDutyExemption: this.formModel,
          pEumBaseInfoGroup: 0,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          }
        }

        this.showSending()
        this.$services.SB.saveDutyExemption(data, {
          config: {
            District: this.baseNosaziCode.District
          }
        }).then(async (response) => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
            this.showSuccess('ذخیره با موفقیت انجام شد')
            this.loadData()
            this.isEditable = false
          }
        })
      } catch (error) {
        this.hideSending()

        this.showError(error.message)
      } finally {
        this.hideSending()
      }
    }
  }
}
</script>
