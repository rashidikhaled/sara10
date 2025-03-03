<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-combo v-model="value.ClsRevisit_RequestService.RequestService_Info.CI_RequesterType"
          cdcName="CI_RequesterType"
          ciName="CI_RequesterType"
          domain-name="Dig"
          label="شرکت خدماتی"
          label-width="80px"
          m="r"
          ref="ciRequesterType"/>
      </FormControl>
      <FormControl>
        <safa-combo v-model="value.ClsRevisit_RequestService.RequestService_Info.CI_RedirectName"
         cdcName="CI_RedirectName"
          source-type="local"
          :options="redirectNameOptions"
          label="نام تابعه"
          label-width="80px"
          m="r" />
      </FormControl>
      <FormControl>
        <safa-combo v-model="value.ClsRevisit_RequestService.RequestService_Info.CI_Project
          " cdcName="CI_Project" ciName="CI_Project" domain-name="Dig" label="عنوان پروژه" label-width="80px"  m="r" />
      </FormControl>
      <!-- <FormControl>
        <safa-combo
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.CI_RequestType
          "
          cdcName="CI_RequestType"
          label="نوع درخواست"
          label-width="80px"
          m="r"
          ciName="CI_RequestType"
          domain-name="Dig"
        />
      </FormControl> -->
      <!-- <FormControl>
        <safa-text v-model="value.ClsRevisit_RequestService.RequestService_Info
            .OriginalLicenseNo
          " cdcName="OriginalLicenseNo" label="شماره مجوز اصلی" label-width="80px" m="r" />
      </FormControl> -->
      <FormControl>
        <safa-text v-if="value.ClsRevisit_RequestService.RequestService_Info.CI_RequestType === 1" v-model="value.ClsRevisit_RequestService.RequestService_Info
            .OriginalLicenseDate
          " cdcName="OriginalLicenseDate" label="تاریخ مجوز اصلی" label-width="80px" m="r" />
      </FormControl>
    </FormRow>
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-text v-model="value.ClsRevisit_RequestService.RequestService_Info.NIdWorkItem
          " cdcName="NIdWorkItem" label="کد رهگیری" label-width="80px" m="r" />
      </FormControl>
      <FormControl>
        <safa-combo v-model="value.ClsRevisit_RequestService.RequestService_Info.CI_Region
          " cdcName="CI_Region" domainName="Dig" label="منطقه" label-width="80px" ciName="CI_Region" m="r" />
      </FormControl>
      <FormControl>
        <safa-text v-model="value.ClsRevisit_RequestService.RequestService_Info.RequesterRegion
          " cdcName="RequesterRegion" label="ناحیه" label-width="80px" m="r" />
      </FormControl>
      <FormControl>
        <safa-text v-model="value.ClsRevisit_RequestService.RequestService_Info.Boulevard
          " cdcName="Boulevard" label="آدرس مسیر حفاری بلوار" label-width="80px" :m="m" required
          validations="required" />
      </FormControl>
      <FormControl>
        <safa-text v-model="value.ClsRevisit_RequestService.RequestService_Info.MainStreet
          " cdcName="MainStreet" label="خیابان اصلی" label-width="80px" :m="m" />
      </FormControl>
      <FormControl>
        <safa-text v-model="value.ClsRevisit_RequestService.RequestService_Info.ByStreet" cdcName="ByStreet"
          label="خیابان فرعی" label-width="80px" :m="m" />
      </FormControl>
      <FormControl>
        <safa-text v-model="value.ClsRevisit_RequestService.RequestService_Info.MainAlley
          " cdcName="MainAlley" label="کوچه اصلی" label-width="80px" :m="m" />
      </FormControl>
      <FormControl>
        <safa-text v-model="value.ClsRevisit_RequestService.RequestService_Info.ByAlley" cdcName="ByAlley"
          label="کوچه فرعی" label-width="80px" :m="m" />
      </FormControl>
      <FormControl>
        <safa-map-measure v-model="value.ClsRevisit_RequestService.RequestService_Info.DigPathLength
          " cdcName="DigPathLength" label="طول ترسیم" label-width="80px" required
          :validations="['required', validations.DigPathLength]" :m="m" />
      </FormControl>
      <text-template v-model="value.ClsRevisit_RequestService.RequestService_Info.Description
        " cdcName="Description" label="توضیحات درخواست" label-width="80px" :m="m" />
    </FormRow>
    <safa-grid v-model="value.ClsRevisit_RequestService.RequestService_Time" cdcName="RequestService_Time"
      title="مدت و زمان اجرای عملیات حفاری (مجوز)" :columns="RequestServiceTimeColumns" height="100%" max-height="100%"
      min-height="200px" fit :m="m" paginate :pageSize="20" />
  </fit>
</template>

<script>
import Joi from "joi"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      drawingLengthModal: false,
      validations: {
        DigPathLength: Joi.custom(
          function (value, helper) {
            if (
              this.value.ClsRevisit_RequestService.RequestService_Info
                .DigPathLength === 0
            ) {
              return helper.message("مقدار 0 برای طول ترسیم مجاز نمی باشد.")
            }
            return true
          }.bind(this)
        )
      },
      redirectNameOptions: [],
      RequestServiceTimeColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          domain: "Dig",
          editor: "combo",
          width: "100px"
        },
        {
          field: "StartDate",
          title: "تاریخ شروع",
          editor: "date",
          width: "100px"
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          width: "100px",
          editor: "date"
        },
        {
          field: "Duration",
          title: "مدت (روز)",
          width: "100px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "auto"
        }
      ]
    }
  },
  mounted () {
    this.getRedirectNameList()
  },
  watch: {
    "value.ClsRevisit_RequestService.RequestService_Info.CI_RequesterType": {
      handler () {
        this.getRedirectNameList()
      },
      immediate: true
    }
  },
  methods: {
    async getRedirectNameList () {
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.getClsCIRedirectName({ CI_RequesterType: this.value.ClsRevisit_RequestService?.RequestService_Info?.CI_RequesterType ?? 0 })
        const res = this.getResponse(data)
        if (res.success) {
          this.redirectNameOptions = res.data.GetClsCI_RedirectNameResult?.CI_RedirectName ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },
  computed: {
    ciRequesterTypeTitle () {
      debugger
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  }
}
</script>
