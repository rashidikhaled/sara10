<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="نوع درخواست"
          label-width="95px"
          v-model="requestType"
          cdcName="requestType"
          source-type="local"
          :options="workflowOptions"
          required
          validations="required"
          :m="lockFields ? 'r' : m"
          ref="requestType"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک ثبتی"
          label-width="95px"
          v-model="value.RegistrationPlate"
          cdcName="RegistrationPlate"
          :m="m"
        />
        <!-- required
          validations="required" -->
      </FormControl>
      <FormControl>
        <safa-combo
          label="منطقه"
          label-width="95px"
          v-model="value.District"
          cdcName="District"
          source-type="local"
          :options="districts"
          required
          validations="required"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام متقاضی"
          label-width="95px"
          v-model="value.RequesterName"
          cdcName="RequesterName"
          required
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد پستی"
          label-width="95px"
          v-model="value.PostalCode"
          cdcName="PostalCode"
          type="number"
          :m="m"
        />
        <!-- required
          :validations="['required', validations.PostalCode]" -->
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره ملی متقاضی"
          label-width="95px"
          v-model="value.NationalCode"
          cdcName="NationalCode"
          type="number"
          required
          :validations="['required', validations.NationalCode]"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره همراه"
          label-width="95px"
          v-model="value.CellPhone"
          cdcName="Cellphone"
          :m="m"
          type="number"
          required
          :validations="['required', validations.CellPhone]"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="مکاتبات قبلی"
          label-width="95px"
          v-model="value.PreMokatebat"
          cdcName="PreMokatebat"
          source-type="local"
          :options="commentOptions"
          required
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="کاربری مصوب"
          label-width="95px"
          v-model="value.CI_PlanUsingtype"
          cdcName="CI_PlanUsingtype"
          ciName="CI_PlanUsingType"
          domainName="CI_SaraM1"
          required
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="اولویت اجرایی کاربری مصوب"
          label-width="95px"
          v-model="value.KarbariMosavabPriority"
          cdcName="KarbariMosavabPriority"
          source-type="local"
          :options="commentOptions"
          required
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع اقدام"
          label-width="95px"
          v-model="value.CI_ActionType"
          cdcName="CI_ActionType"
          ciName="CI_ActionType"
          domainName="Analysis"
          required
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شرح اقدام"
          label-width="95px"
          v-model="value.ActionDetailes"
          cdcName="ActionDetailes"
          :m="m"
        />
        <!-- required
          validations="required" -->
      </FormControl>
      <div class="flex wrap">
        <safa-label
          style="min-width: 95px"
          class="flex items-center"
          required
          showRequiredSymbol
        >
          کد نوسازی
        </safa-label>
        <nosazi-code-input
          v-model="value.NosaziCodeStr"
          cdcName="NosaziCodeStr"
          :m="lockFields ? 'r' : m"
          @enter="onEnterNosaziCode"
        />
      </div>
      <text-template
        label="آدرس"
        label-width="95px"
        v-model="value.Address"
        cdcName="Address"
        :m="m"
        class="col-12"
        :rows="3"
      />
    </FormRow>
    <div style="border: 1px solid #ddd">
      <q-scroll-area style="height: 240px">
        <EditPoint ref="ePoint" :allowEdit="m === 'e'" v-if="WKTLoaded" />
      </q-scroll-area>
      <q-separator class="q-gutter-sm q-mt-sm" />
      <div class="q-gutter-sm q-pa-sm">
        <btn-default
          label="بارگزاری مجدد"
          @click="loadWKT"
        />
        <btn-default
          :disabled="m !== 'e'"
          label="اعمال ترسیم محل حفاری"
          @click="getDrawingData"
        />
        <btn-cancel
          :disabled="m !== 'e'"
          label="حذف مسیرهای انتخاب شده"
          @click="cancelGetDrawingData"
        />
      </div>
    </div>
  </fit>
</template>

<script>
import Joi from "joi"
import customValidation from "src/utils/customValidation"
import EditPoint from "kais-map/src/lib-components/dialogs/EditPoint.vue"
export default {
  components: { EditPoint },
  props: {
    lockFields: {
      // when form go to edit mode. like when open UEditCrossRequest form
      type: Boolean,
      default: false
    },
    m: {
      type: String,
      default: "r"
    },
    value: {
      type: Object,
      default: () => {}
    },
    WKTLoaded: Boolean
  },
  data () {
    return {
      requestType: null,
      workflowOptions: [],
      commentOptions: [
        { ID: 0, Title: "دارد" },
        { ID: 1, Title: "ندارد" }
      ],
      validations: {
        NationalCode: customValidation.nationalCode,
        PostalCode: Joi.string().length(10).required().messages({
          "string.base": `کد پستی میبایست به صورت عدد باشد.`,
          "string.length": `کد پستی میبایست 10 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        }),
        CellPhone: Joi.custom(
          function (value, helper) {
            if (this.value.Cellphone && this.value.Cellphone.length !== 11) {
              return helper.message("شماره موبایل می بایست 11 رقم باشد.")
            }
            return true
          }.bind(this)
        )
      }
    }
  },
  mounted () {
    this.getWorkflowOptions()
  },
  methods: {
    loadWKT () {
      if (!this.$KaisMap.SelectedLayer.Layer) return this.showInfo('لایه ی مورد نظر روی نقشه انتخاب نشده است.')

      this.$KaisMap.StrEDITWKT = this.value.WKT
      this.$refs.ePoint.LoadInfo(this.m === "e")
      this.$nextTick(() => {
        this.$KaisMap.ShowWkt(this.value, true)
        this.$KaisMap.CMap.getView().setZoom(17)
      })
      this.$emit("getDrawingData")
    },
    getWorkflowOptions () {
      const nidWfdList =
        window.getConfigValue("esupParams")?.MabarNidWorkflowDeff ?? null
      if (nidWfdList) {
        this.workflowOptions = nidWfdList ?? []
        this.requestType = this.workflowOptions[0].ID
        this.setType()
      } else this.workflowOptions = []
    },
    onEnterNosaziCode () {
      this.$emit("onEnterNosaziCode")
    },
    getDrawingData () {
      this.$emit("getDrawingData")
    },
    cancelGetDrawingData () {
      this.$KaisMap.StrEDITWKT = ""
      this.$refs.ePoint.Points = []
      this.$emit("cancelGetDrawingData")
      this.$emit("getDrawingData")
    },
    setType () {
      this.$emit("getSelectedRequestType", {
        ID: this.requestType,
        Title:
          this.workflowOptions.find((f) => f.ID === this.requestType).Title ??
          ""
      })
    }
  },
  watch: {
    WKTLoaded () {
      if (this.WKTLoaded) {
        this.$nextTick(() => {
          this.loadWKT()
        })
      }
    },
    requestType: {
      handler () {
        this.setType()
      },
      deep: true
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    }
  }
}
</script>
