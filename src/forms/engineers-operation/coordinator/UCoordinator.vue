<template>
  <safa-form
    appId="543f8a9b-107f-66fc-3367-7747df03a744"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <form-header-by-nosazi-code
          class="col"
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          m="r"
          actions
        />
      </template>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            label="صلاحیت"
            label-width="90px"
            v-model="model.CI_Ability"
            domainName="engineer"
            ciName="CI_Ability"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="سال"
            label-width="90px"
            v-model="model.CI_Years"
            domainName="engineer"
            ciName="CI_Years"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="درصد اعمال شده در سهمیه"
            label-width="90px"
            v-model="model.ApplyPercent"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="پایه"
            label-width="90px"
            v-model="model.CI_Base"
            domainName="engineer"
            ciName="CI_Base"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ ارجاع"
            label-width="90px"
            v-model="model.DateOfRefrence"
            m="r"
          />
        </FormControl>
      </FormRow>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-checkbox
            label="ارجاع آزاد"
            label-width="90px"
            v-model="model.IsFree"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            label="ناظر و مالک یک نفر هستند"
            label-width="90px"
            v-model="model.IsEngOwner"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            label="آیا ناظر، مجری است"
            label-width="90px"
            v-model="model.IsEngExecuter"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            label="تعویض مهندس"
            label-width="90px"
            v-model="model.IsSwitchEngineer"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            label="هماهنگ کننده"
            label-width="90px"
            v-model="model.IsCoordinator"
            m="r"
          />
        </FormControl>
      </FormRow>
      <FormRow class="q-mb-sm">
        <text-template
          label="توضیحات ارجاع"
          label-width="90px"
          class="col-12"
          :rows="9"
          v-model="model.RefComments"
          m="r"
        />
      </FormRow>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="شماره ارجاع"
            label-width="90px"
            v-model="model.NidWorkItem"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع درخواست"
            label-width="90px"
            v-model="model.CI_RequestType"
            domainName="engineer"
            ciName="CI_RequestType"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ درخواست"
            label-width="90px"
            v-model="model.EnterDate"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="کاربری ملک"
            label-width="90px"
            v-model="model.CI_UsingType"
            domainName="engineer"
            ciName="CI_UsingType"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع سازه"
            label-width="90px"
            v-model="model.CI_SazehType"
            domainName="engineer"
            ciName="CI_SazehType"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="مرحله ساختمانی"
            label-width="90px"
            v-model="model.CI_ConstructionStage"
            domainName="engineer"
            ciName="CI_ConstructionStage"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="زیر بنا"
            label-width="90px"
            v-model="model.infrastructure"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تعدا سقف"
            label-width="90px"
            v-model="model.Floor"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="زیر زمین"
            label-width="90px"
            v-model="model.Underground"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد پرونده مادر"
            label-width="90px"
            v-model="model.MotherCode"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد رهگیری شهرداری"
            label-width="90px"
            v-model="model.UrbanNidKartablItem"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="پلاک ثبتی"
            label-width="90px"
            v-model="model.RegisterPlack"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره مجوز"
            label-width="90px"
            v-model="model.ExportLicenseNo"
            m="r"
          />
        </FormControl>

        <FormControl>
          <safa-datepicker
            label="تاریخ مجوز"
            label-width="90px"
            v-model="model.ExportLicenseDate"
            m="r"
          />
        </FormControl>
      </FormRow>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],
  data () {
    return {
      name: "UCoordinator",
      title: "اعلام ناظر هماهنگ کننده",
      formKey: "8EF0363A-D0D9-4A99-A0F7-3DD771675A52",
      main: true,
      model: {
        CI_Ability: "",
        CI_Years: "",
        ApplyPercent: "",
        CI_Base: "",
        DateOfRefrence: "",
        IsFree: "",
        IsEngOwner: "",
        IsEngExecuter: "",
        IsSwitchEngineer: "",
        IsCoordinator: "",
        RefComments: "",
        NidWorkItem: "",
        CI_RequestType: "",
        EnterDate: "",
        CI_UsingType: "",
        CI_SazehType: "",
        CI_ConstructionStage: "",
        infrastructure: "",
        Floor: "",
        Underground: "",
        MotherCode: "",
        UrbanNidKartablItem: "",
        RegisterPlack: "",
        ExportLicenseNo: "",
        ExportLicenseDate: ""
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  created () {
    if (this.selectedExecRep) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedExecRep.CodeString
      )
      this.loadObj()
    } else {
      this.showError("لطفا یک سطر از کارتابل ارجاعات انتخاب نمایید.")
      this.hideSidebar("UCoordinator")
      this.redirectToKartableReferences()
    }
  },
  methods: {
    loadObj () {
      let payload = { pNidRef: this.selectedNidRef }
      this.showLoading()
      this.$services.engineers
        .loadCoordinator(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.model = res.data.LoadCoordinatorResult.FilClassData.Fil_Info
            await this.log({
              action: "",
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
