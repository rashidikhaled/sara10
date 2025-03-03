<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper title="معافیت های عوارضی" vertical>
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          actions
          cdcName="baseNosaziCode"
          @fetched="loadData"
        />
        <safa-status :result="requestResult"/>
      </template>
      <div class="row q-mb-sm">
        <safa-combo
          v-if="isShowBaseInfoGroupCombo"
          v-model="selectedItem"
          :options="infoGroupOptions"
          class="col-md-3"
          label="دسته اطلاعاتی"
          labelWidth="90px"
          source-type="local"
        />
      </div>
      <fit>
        <safa-datatable
          v-model="formModel.Base_DutyExemption"
          :addRow="true"
          :allowCopy="true"
          :deleteRow="true"
          :m="mode"
          cdcName="moafiyatAvarezi"
          fit
          height="100%"
          helper="moafiyatAvarezi"
          max-height="100%"
          min-height="100%"
          sortable
          title="معافیت های عوارضی"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          editSPCaption="ویرایش"
          editSPId="24ca823a-52ef-4cd8-81a6-96278ad520cf"
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
      formKey: '7da582df-0d24-4ff5-998f-3fece88fde0d',
      name: 'UMoafiyatAvarezi',
      main: true,
      sidebarCompatible: true,
      selectedItem: 0,
      // infoGroupItems: [
      //   {
      //     ID: 0,
      //     title: 'اطلاعات پرونده'
      //   },
      //   {
      //     ID: 100,
      //     title: 'نوسازی'
      //   }
      // ],
      isGoToEdit: false,
      // formActionEditMode: "r",
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
      requestResult: {},
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
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          this.formModel = this.requestResult.data
          // this.formModel.Base_DutyExemption.map((x) => {
          //   if (x.IsDeleted === true) {
          //     x.class = "bg-red-2";
          //   }
          //   return x;
          // });

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
          this.isView = true
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
            IsDeleted: row.IsDeleted || null,
            NidBase: row.NidBase || '00000000-0000-0000-0000-000000000000',
            NidDutyExemption:
              row.NidDutyExemption || '00000000-0000-0000-0000-000000000000',
            NidUser: row.NidUser || null,
            UserName: row.UserName || null,
            FromDate: row.FromDate || '',
            ToDate: row.ToDate || '',
            NationalCode: row.NationalCode || null
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
              bizCodeTitle: 'کد نوسازی'
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
    // goToEditMode() {
    //   this.formActionEditMode = "e";
    //   this.isEditable = true;
    // },
    // goToReadonlyMode() {
    //   this.formActionEditMode = "r";
    //   this.isEditable = false;
    // },
  },
  watch: {
    'formModel.Base_DutyExemption' () {
      this.formModel.Base_DutyExemption.forEach((x) => {
        if (x.isNew) {
          x.DeletedNidUser = null
          x.NidUser = null
        } else if (x.IsDeleted === true) {
          x.class = 'bg-red-2'
        } else {
          x.class = 'bg-white'
        }
      })
    }
  }
}
</script>
