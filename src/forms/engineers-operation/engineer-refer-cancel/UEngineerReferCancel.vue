<template>
  <safa-form :id="formKey" :caption="title" appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1">
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="loadRefEngineerCancelRes" />
        <safa-status :result="doRefEngineerCancelRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm" :sm="2" :md="2" :lg="2" :xl="2">
          <FormControl>
            <safa-text
              v-model="dataContext.Eng_Info.EngName"
              label="نام:"
              label-width="75px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Eng_Info.IdentityCode"
              label="کد عضویت:"
              label-width="75px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Eng_Info.EngFamily"
              label="نام خانوادگی:"
              label-width="75px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              v-model="dataContext.Eng_Info.CI_Ability"
              label="نوع صلاحیت:"
              label-width="75px"
              domainName="engineer"
              ciName="CI_Ability"
              m="r"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-sm">
          <FormControl>
            <nosazi-code-input
              v-model="baseNosaziCode"
              label="کد نوسازی:"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Fil_Info.NidWorkItem"
              label="کد ارجاع:"
              label-width="75px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              v-model="dataContext.Fil_Info.CI_RequestType"
              label="نوع درخواست:"
              label-width="75px"
              domainName="engineer"
              ciName="CI_RequestType"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              v-model="dataContext.Fil_Info.CI_UsingType"
              label="کاربری:"
              label-width="75px"
              domainName="engineer"
              ciName="CI_UsingType"
              m="r"
            />
          </FormControl>
          <FormControl class="col-8">
            <safa-text
              v-model="dataContext.Fil_Info.RegisterPlack"
              label="پلاک ثبتی:"
              label-width="75px"
              m="r"
            />
          </FormControl>
        </FormRow>
        <FormRow :sm="1" :md="1" :lg="1" :xl="1">
          <FormControl>
            <safa-combo
              v-model="dataContext.Ref_EngineerCancel.CI_RefDelete"
              label="علت انصراف:"
              label-width="75px"
              domainName="engineer"
              ciName="CI_RefDelete"
              m="e"
            />
          </FormControl>
          <FormControl>
            <text-template
              v-model="dataContext.Ref_EngineerCancel.CancelComments"
              label="توضیحات"
              label-width="75px"
              :rows="9"
              m="e"
            />
          </FormControl>
        </FormRow>
      </fit>
      <template #footer>
        <form-actions :m="mode" :showEditButton="false">
          <btn-default label="انصراف از ارجاع" @click="btnReferCancelClick" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

// import { uid } from "quasar"
// import pick from "just-pick"

// import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

// import { currentDate, currentTime } from "src/utils/index"

// import PersianDate from "persian-date"

export default {
  name: "UEngineerReferCancel",

  mixins: [baseFormMixin, kartableReferencesMixin],

  data () {
    return {
      title: "انصراف از ارجاع کار",
      formKey: "BE4435F5-E6BB-4667-90A6-F94B42C39F72",
      name: "UEngineerReferCancel",
      main: true,

      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // Context
      dataContext: {
        Eng_Info: {},
        Fil_Info: {},
        Ref_EngineerCancel: {}
      },

      // Responses
      loadRefEngineerCancelRes: null,
      doRefEngineerCancelRes: null
    }
  },

  methods: {
    loadObj () {
      if (this.selectedNidRef === "00000000-0000-0000-0000-000000000000") {
        this.showError("لطفا ابتدا یک مورد از کارتابل ارجاعات انتخاب کنید")
        this.hideSidebar(this.name)
      }

      this.showLoading()

      const payload = {
        pNidRef: this.selectedNidRef
      }

      this.$services.engineers
        .loadRefEngineerCancel(payload)
        .then(({ data }) => {
          this.loadRefEngineerCancelRes = this.getResponse(data)

          if (this.loadRefEngineerCancelRes.success) {
            this.loadRefEngineerCancelRes.data.LoadRefEngineerCancelResult.Ref_EngineerCancel.NIdRef =
              this.loadRefEngineerCancelRes.data.LoadRefEngineerCancelResult.NidRef
            this.dataContext =
              this.loadRefEngineerCancelRes.data.LoadRefEngineerCancelResult
            if (
              this.loadRefEngineerCancelRes.data.LoadRefEngineerCancelResult
                .Fil_Info != null
            ) {
              this.baseNosaziCode.District =
                this.loadRefEngineerCancelRes.data.LoadRefEngineerCancelResult.Fil_Info.District.toString()
              this.baseNosaziCode.Region =
                this.loadRefEngineerCancelRes.data.LoadRefEngineerCancelResult.Fil_Info.Region.toString()
              this.baseNosaziCode.Block =
                this.loadRefEngineerCancelRes.data.LoadRefEngineerCancelResult.Fil_Info.Block.toString()
              this.baseNosaziCode.House =
                this.loadRefEngineerCancelRes.data.LoadRefEngineerCancelResult.Fil_Info.House.toString()
              this.baseNosaziCode.Building =
                this.loadRefEngineerCancelRes.data.LoadRefEngineerCancelResult.Fil_Info.Building.toString()
              this.baseNosaziCode.Apartment =
                this.loadRefEngineerCancelRes.data.LoadRefEngineerCancelResult.Fil_Info.Apartment.toString()
              this.baseNosaziCode.Shop =
                this.loadRefEngineerCancelRes.data.LoadRefEngineerCancelResult.Fil_Info.Shop.toString()
            }
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    btnReferCancelClick () {
      this.showConfirm("آیا از انصراف ارجاع کار اطمینان داید؟").onOk(
        this.doReferCancel
      )
    },

    doReferCancel () {
      this.showLoading()
      const payload = {
        pDto: {
          ...this.dataContext.Ref_EngineerCancel,
          CancelUserName: this.getUserDisplayName(),
          CancelUserNid: this.getNidUser()
        }
      }

      this.$services.engineers
        .doRefEngineerCancel(payload)
        .then(({ data }) => {
          this.doRefEngineerCancelRes = this.getResponse(data)

          if (this.doRefEngineerCancelRes.success) {
            this.showSuccess("انصراف از ارجاع کار با موفقیت انجام شد.")
            this.hideSidebar(this.name)
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  async created () {
    if (await this.canOpenWindow()) this.loadObj()
  }
}
</script>
