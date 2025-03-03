<template>
  <safa-form
    :id="formKey"
    caption="عملیات قوانین تخفیف یا معافیت-موارد حذف شده - صنفی"
    app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc"
  >
    <form-wrapper
      title="عملیات قوانین تخفیف یا معافیت"
      vertical
      :padding="false"
    >
      <fit>
        <safa-datatable
          v-model="items"
          :allowNewRow="false"
          :allowRemoveRow="false"
          :allowCopy="false"
          ref="grid"
          name="grid"
          helper="dutyExemptionRoleDeletedItemsMoafyatOrDiscount"
          hide-toolbar="false"
          height="100%"
          max-height="100%"
          fit
          :bordered="false"
          title="قوانین تخفیف یا معافیت"
          :filterable="true"
          cdcName="dutyExemptionRoleDeletedItemsMoafyatOrDiscount"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "عملیات قوانین تخفیف یا معافیت",
      formKey: "7a667c57-5c13-41eb-ab50-d6340534b300",
      name: "UMoafyatOrDiscountSenfi",
      main: true,

      isGoToEdit: false,
      items: [],
      savePrequest: {
        pEng: {
          EngineerInfo_List: null,
          ErrorResult: {
            BizErrors: [],
            Requirements: null
          },
          NidEng: "00000000-0000-0000-0000-000000000000",
          Sh_EngineerInfo: {
            CI_Ability: "6",
            CI_EngStudyField: "2",
            CommitmentNo: "11",
            CommitmentSupervisionDate: "1399/01/07",
            CommitmentSupervisionNo: "12",
            ControllerCode: "456",
            ControllerFamily: "سمیعی",
            ControllerName: "مجید",
            EngBase: "پایه",
            JobAgreement: "789",
            MembershipNo: "10",
            NidEng: "00000000-0000-0000-0000-000000000000",
            UrbanityCode: "123"
          }
        }
      }
    }
  },
  props: {
    value: Object,
    editMode: {
      type: String,
      default: "e"
    },
    engineerInfo: {
      type: Object,
      default: () => ({
        CI_Ability: 0,
        CI_EngStudyField: 0,
        CommitmentNo: null,
        CommitmentSupervisionDate: null,
        CommitmentSupervisionNo: null,
        ControllerCode: null,
        ControllerFamily: null,
        ControllerName: null,
        EngBase: null,
        JobAgreement: null,
        MembershipNo: null,
        NidEng: "",
        TotalCount: 0,
        UrbanityCode: null
      })
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.isNew) {
      this.engineerInfo.CI_Ability = 0
      this.engineerInfo.CI_EngStudyField = 0
      this.engineerInfo.CommitmentNo = null
      this.engineerInfo.CommitmentSupervisionDate = null
      this.engineerInfo.CommitmentSupervisionNo = null
      this.engineerInfo.ControllerCode = null
      this.engineerInfo.ControllerFamily = null
      this.engineerInfo.ControllerName = null
      this.engineerInfo.EngBase = null
      this.engineerInfo.JobAgreement = null
      this.engineerInfo.MembershipNo = null
      this.engineerInfo.NidEng = ""
      this.engineerInfo.TotalCount = 0
      this.engineerInfo.UrbanityCode = null
    }
    this.getDutyExemptionRoleDeletedItems()
  },
  methods: {
    getDutyExemptionRoleDeletedItems () {
      this.showLoadig()
      this.$services.SB.getDutyExemptionRoleDeletedItems(null, this.config)
        .then(async (response) => {
          if (response.data.ErrorResult.BizErrors.length === 0) {
            this.items = response.data.Duty_ExemptionRole_DeletedItems
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((ex) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  computed: {
    config () {
      if (this.selectedRequest) { return { config: { District: this.selectedDistrict } } }
      return undefined
    }
  }
}
</script>
