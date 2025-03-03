<template>
  <form-wrapper :title="title">
    <template>
      <safa-status :result="loadEngOrganOfficeRes" />
    </template>
    <fit>
      <div class="row items-center q-col-gutter-sm q-mb-sm">
        <engineer-info-box
          class="col-12"
          label="کد عضویت مدیر"
          labelWidth="77px"
          @getEngineerInfo="getEngineerInfo"
        />
      </div>
      <q-separator />
      <FormRow class="q-my-sm">
        <FormControl>
          <safa-text
            label="کد دفتر"
            label-width="100px"
            v-model="pObj.EngOrgan_OfficeInfo.OfficeCode"
            cdcName="OfficeCode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام دفتر"
            label-width="100px"
            v-model="pObj.EngOrgan_OfficeInfo.OfficeName"
            cdcName="OfficeName"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ ثبت"
            label-width="100px"
            v-model="pObj.EngOrgan_OfficeInfo.RegisterDate"
            cdcName="RegisterDate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تلفن"
            label-width="100px"
            v-model="pObj.EngOrgan_OfficeInfo.OfficePhone"
            cdcName="OfficePhone"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="فکس"
            label-width="100px"
            v-model="pObj.EngOrgan_OfficeInfo.OfficeFax"
            cdcName="OfficeFax"
          />
        </FormControl>
        <text-template
          label="آدرس"
          label-width="100px"
          class="col-12"
          :rows="2"
          v-model="pObj.EngOrgan_OfficeInfo.OfficeAddress"
          cdcName="OfficeAddress"
        />
      </FormRow>
      <safa-datatable
        title="شهر"
        helper="cities"
        v-model="pObj.EngOrgan_OfficeCity"
        cdcName="EngOrgan_OfficeCity"
        fit
        height="100%"
        max-height="100%"
        min-height="150px"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        m="e"
      />
      <!-- v-model="results.ClsEngineer.Eng_JobAgreement" -->
    </fit>
    <template v-slot:footer>
      <form-actions :showEditButton="false" :showNewButton="false">
        <btn-save @click="saveObj" />
        <btn-cancel @click="$emit('hide')" />
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    m: String,
    formKey: String
  },
  data () {
    return {
      name: "EngineerOrganOffice",
      title: "دفتر نظام مهندسی",
      pObj: {
        EngOrgan_OfficeCity: [],
        EngOrgan_OfficeCityList: null,
        EngOrgan_OfficeInfo: {
          IdentityCodeCEO: "",
          NidEngCEO: null,
          NidEngOrgOff: "00000000-0000-0000-0000-000000000000",
          OfficeAddress: "",
          OfficeCode: "",
          OfficeFax: "",
          OfficeName: "",
          OfficePhone: "",
          RegisterDate: ""
        },
        EngOrgan_OfficeInfoList: null,
        NidEngOrgOff: "00000000-0000-0000-0000-000000000000"
      }
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.engineers
        .LoadEngOrganOffice({ pNidEngOrgOff: this.pObj.NidEngOrgOff })
        .then(async ({ data }) => {
          this.loadEngOrganOfficeRes = this.getResponse(data)
          if (this.loadEngOrganOfficeRes.success) {
            this.pObj =
              this.loadEngOrganOfficeRes.data.Load_EngOrgan_OfficeResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.pObj.EngOrgan_OfficeInfo.IdentityCodeCEO,
              bizCodeTitle: "IdentityCodeCEO"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      if (
        this.pObj.EngOrgan_OfficeInfo.IdentityCodeCEO === null ||
        this.pObj.EngOrgan_OfficeInfo.IdentityCodeCEO === ""
      ) {
        return this.showError("مدیر دفتر انتخاب نشده است.")
      }
      this.showLoading()
      this.$services.engineers
        .SaveEngOrganOffice({ pObj: this.pObj })
        .then(async ({ data }) => {
          this.saveEngOrganOfficeRes = this.getResponse(data)
          if (this.saveEngOrganOfficeRes.success) {
            // this.results = this.saveEngOrganOfficeRes.data.SaveEngOrgan_OfficeResponse;
            await this.log({
              action: this.logActions.save,
              bizCode: this.pObj.EngOrgan_OfficeInfo.IdentityCodeCEO,
              bizCodeTitle: "IdentityCodeCEO"
            })
            this.showSuccess("عملیات با موفقیت انجام گردید.")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getEngineerInfo (engineerInfo) {
      this.pObj.EngOrgan_OfficeInfo.IdentityCodeCEO =
        engineerInfo.Eng_Info.IdentityCode
    }
  }
}
</script>
