<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20c96248-c0c2-4da0-bb07-9480b0c95dce"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadResult" />
        <safa-status :result="saveResult" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره ارجاع"
              label-width="90px"
              m="r"
              v-model="model.FilClassData.Fil_Info.pNidWorkItem"
              cdcName="pNidWorkItem"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="نوع درخواست"
              label-width="90px"
              m="r"
              ciName="CI_RequestType"
              domainName="engineer"
              v-model="model.FilClassData.Fil_Info.CI_RequestType"
              cdcName="CI_RequestType"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ درخواست"
              label-width="90px"
              m="r"
              v-model="model.FilClassData.Fil_Info.RequestDate"
              cdcName="RequestDate"
            />
          </FormControl>

          <FormControl>
            <safa-combo
              label="کاربری ملک"
              label-width="90px"
              m="r"
              ciName="CI_UsingType"
              domainName="engineer"
              v-model="model.FilClassData.Fil_Info.CI_UsingType"
              cdcName="CI_UsingType"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="نوع سازه"
              label-width="90px"
              m="r"
              ciName="CI_SazehType"
              domainName="engineer"
              v-model="model.FilClassData.Fil_Info.CI_SazehType"
              cdcName="CI_SazehType"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="مرحله ساختمانی"
              label-width="90px"
              m="r"
              ciName="CI_ConstructionStage"
              domainName="engineer"
              v-model="model.FilClassData.Fil_Info.CI_ConstructionStage"
              cdcName="CI_ConstructionStage"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="زیر بنا"
              label-width="90px"
              m="r"
              v-model="model.FilClassData.Fil_Info.infrastructure"
              cdcName="infrastructure"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تعداد سقف"
              label-width="90px"
              m="r"
              v-model="model.FilClassData.Fil_Info.Floor"
              cdcName="Floor"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="زیرزمین"
              label-width="90px"
              m="r"
              v-model="model.FilClassData.Fil_Info.Underground"
              cdcName="Underground"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد پرونده مادر"
              label-width="90px"
              m="r"
              v-model="model.FilClassData.Fil_Info.MotherCode"
              cdcName="MotherCode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد رهگیری شهرداری"
              label-width="90px"
              m="r"
              v-model="model.FilClassData.Fil_Info.IdentityCodeCoordinator"
              cdcName="IdentityCodeCoordinator"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="پلاک ثبتی"
              label-width="90px"
              m="r"
              v-model="model.FilClassData.Fil_Info.RegisterPlack"
              cdcName="RegisterPlack"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره مجوز"
              label-width="90px"
              m="r"
              v-model="model.FilClassData.Fil_Info.ExportLicenseNo"
              cdcName="ExportLicenseNo"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ مجوز"
              label-width="90px"
              m="r"
              v-model="model.FilClassData.Fil_Info.ExportLicenseDate"
              cdcName="ExportLicenseDate"
            />
          </FormControl>
          <nosazi-code-input
            label="کد نوسازی"
            label-width="90px"
            v-model="baseNosaziCode"
            actions
            cdcName="baseNosaziCode"
          />
        </FormRow>

        <safa-splitter class="fit" margin="0" v-model="gridSplitter" vertical>
          <template v-slot:before>
            <safa-datatable
              title="ارجاعات"
              helper="allReferToEngineerColumns"
              v-model="model.AllReferToEngineer"
              m="r"
              fit
              height="100%"
              max-height="100%"
              min-height="200px"
              :show-selected-checkbox="true"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              paginate
            />
          </template>
          <template v-slot:after>
            <safa-datatable
              title="اطلاعات بازبین"
              :columns="calculatedCheckerColumns"
              v-model="model.CalculatedChecker_List"
              m="r"
              fit
              height="100%"
              max-height="100%"
              min-height="200px"
              :show-selected-checkbox="true"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              paginate
            />
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <btn-default label="ارسال" @click="sendToChecker" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      title: "ارسال به بازبین",
      formKey: "bc30c2bf-9b8d-42e8-b24a-51cf489953eb",
      name: "SendToChecker",
      main: true,

      gridSplitter: 50,
      model: {
        AllReferToEngineer: [],
        CalculatedChecker_List: [],
        FilClassData: {
          Fil_Info: {
            CI_ConstructionStage: 0,
            CI_RequestType: 0,
            CI_SazehType: 0,
            CI_UsingType: 0,
            ExportLicenseDate: null,
            ExportLicenseNo: null,
            Floor: null,
            IdentityCodeCoordinator: null,
            MotherCode: 0,
            NidWorkItem: 0,
            RegisterPlack: null,
            RequestDate: null,
            Underground: 0,
            infrastructure: null
          },
          Fil_Owner: [],
          Fil_Text: []
        }
      },
      checkerList: [],
      loadResult: null,
      saveResult: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      calculatedCheckerColumns: [
        {
          field: "",
          title: "تاریخ ارسال به بازبین",
          editor: "date",
          width: "120px"
        },
        {
          field: "",
          title: "ساعت ارسال به بازبین",
          width: "120px"
        },
        {
          field: "",
          title: "نام کاربر",
          width: "120px"
        },
        {
          field: "",
          title: "تاریخ تایید",
          editor: "date",
          width: "80px"
        },
        {
          field: "",
          title: "ساعت تایید",
          width: "80px"
        },
        {
          field: "",
          title: "تاریخ ابطال",
          editor: "date",
          width: "80px"
        },
        {
          field: "",
          title: "ساعت ابطال",
          width: "80px"
        }
      ]
    }
  },

  mounted () {
    if (this.value) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.value.CodeString
      )
      this.loadData()
    }
  },

  methods: {
    loadData () {
      const payLoad = {
        pNidRef: this.value.NIdRef,
        pUser: this.currentUser
      }
      this.showLoading()
      this.$services.engineers
        .loadSendChecker(payLoad)
        .then(async ({ data }) => {
          this.loadResult = this.getResponse(data)
          if (this.loadResult.success) {
            this.model = this.loadResult.data.LoadSendCheckerResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.value.NIdRef,
              bizCodeTitle: "NIdRef"
            })
          }
        })
        .catch((err) => {
          console.error("err :>> ", err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    sendToChecker () {
      const payLoad = {
        pNidRef: this.value.NIdRef,
        pUser: this.currentUser
      }
      this.showLoading()
      this.$services.engineers
        .sendToChecker(payLoad)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.showSuccess("ارسال به بازبین با موفقیت انجام شد.")
            this.loadData()
            await this.log({
              action: this.logActions.save,
              bizCode: this.value.NIdRef,
              bizCodeTitle: "NIdRef"
            })
          }
        })
        .catch((err) => {
          console.error("err :>> ", err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
