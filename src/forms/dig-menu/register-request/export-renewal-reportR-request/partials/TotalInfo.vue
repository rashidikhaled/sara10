<template>
  <fit>
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-text
          v-model="value.Delivery.Request_Info.ExportLicenseNo"
          cdcName="ExportLicenseNo"
          label="شماره مجوز"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="value.Delivery.Request_Info.ExportLicenseDate"
          cdcName="ExportLicenseDate"
          label="تاریخ مجوز"
          label-width="100px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-combo
          v-model="value.Delivery.Request_Info.CI_RequesterType"
          cdcName="CI_RequesterType"
          ciName="CI_RequesterType"
          domain-name="Dig"
          label="شرکت خدماتی"
          label-width="100px"
          m="r"
          ref="ciRequesterType"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Delivery.Request_Info.CI_RedirectName"
          cdcName="CI_RedirectName"
          source-type="local"
          :options="redirectNameOptions"
          label="نام تابعه"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Delivery.Request_Info.CI_Region"
          cdcName="CI_Region"
          ciName="CI_Region"
          domai-name="Dig"
          label="منطقه"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Delivery.Request_Info.RequesterRegion"
          cdcName="RequesterRegion"
          label="ناحیه"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Delivery.Consultant"
          cdcName="Consultant"
          label="دستگاه نظارت"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Delivery.CompanyName"
          cdcName="CompanyName"
          label="پیمانکار"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Delivery.Request_Info.RequesterAddress"
          cdcName="RequesterAddress"
          label="آدرس"
          label-width="100px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <div class="q-ma-sm">
      <safa-notice
        >باتوجه به اتمام مرمت پروژه حفاری با مشخصات فوق توسط عوامل اجرائی و
        آمادگی این شرکت برای تحویل معبر به شهرداری، خواهشمند است در اجرای ماده
        14 دستورالعمل نحوه هماهنگی و صدور مجوز حفاری در سطح شهرهای کشور (مصوب
        سال 1367 کمیسیون عالی هماهنگی امور اجرائی کشور) دستور فرمایید نسبت به
        بازدید از پروژه مذکور و تنظیم صورتمجلس تحویل موقت اقدام لازم بعمل
        اید.</safa-notice
      >
    </div>
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-datepicker
          v-model="value.Delivery.Delivery.DeliveryDate"
          cdcName="DeliveryDate"
          label="تاریخ"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Delivery.Delivery.AgentName"
          cdcName="AgentName"
          label="نام نماینده"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Delivery.Delivery.AgentTellNo"
          cdcName="AgentTellNo"
          label="شماره تلفن نماینده"
          label-width="100px"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <FormRow>
      <text-template
        v-model="value.Delivery.Delivery.Description"
        cdcName="Description"
        label="توضیحات"
        label-width="100px"
        class="col-12"
        :rows="2"
        :m="m"
      />
    </FormRow>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      redirectNameOptions: []
    }
  },
  computed: {
    ciRequesterTypeTitle () {
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  },
  watch: {
    "value.Delivery.Request_Info.CI_RequesterType": {
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
        const { data } = await this.$services.excavation.getClsCIRedirectName({ CI_RequesterType: this.value.Delivery?.Request_Info?.CI_RequesterType ?? 0 })
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
  created () {
    this.getRedirectNameList()
  }
}
</script>
