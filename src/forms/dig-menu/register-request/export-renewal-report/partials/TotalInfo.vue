<template>
  <fit>
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-text
          v-model="value.RequestService_Info.ExportLicenseNo"
          cdcName="ExportLicenseNo"
          label="شماره مجوز"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="value.RequestService_Info.ExportLicenseDate"
          cdcName="ExportLicenseDate"
          label="تاریخ مجوز"
          label-width="80px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-combo
          v-model="value.RequestService_Info.CI_RequesterType"
          cdcName="CI_RequesterType"
          ciName="CI_RequesterType"
          domainName="Dig"
          label="شرکت خدماتی"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.RequestService_Info.CI_RedirectName"
          cdcName="CI_RedirectName"
          ciName="CI_RedirectName"
          domainName="Dig"
          label="نام تابعه"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.RequestService_Info.CI_Region"
          cdcName="CI_Region"
          ciName="CI_Region"
          domainName="Dig"
          label="منطقه"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.RequestService_Info.RequesterRegion"
          cdcName="RequesterRegion"
          label="ناحیه"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Consultant"
          cdcName="Consultant"
          label="دستگاه نظارت"
          label-width="80px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <div class="q-my-sm">
      <safa-text
        v-model="value.CompanyName"
        cdcName="CompanyName"
        label="پیمانکار"
        label-width="80px"
        m="r"
      />
    </div>
    <div class="q-my-sm">
      <safa-text
        v-model="model[0].RequesterAddress"
        cdcName="RequesterAddress"
        label="آدرس"
        label-width="80px"
        m="r"
      />
    </div>
    <div class="q-my-sm">
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
          v-model="value.Delivery.DeliveryDate"
          cdcName="DeliveryDate"
          label="تاریخ"
          label-width="80px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Delivery.AgentName"
          cdcName="AgentName"
          label="نام نماینده"
          label-width="80px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Delivery.AgentTellNo"
          cdcName="AgentTellNo"
          label="شماره تلفن نماینده"
          label-width="80px"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <div>
      <text-template
        v-model="value.RequestService_Info.Description"
        cdcName="Description"
        label="توضیحات"
        label-width="80px"
        :m="m"
        class="col-12"
        :rows="1"
      />
    </div>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    formKey: String,
    title: String,
    name: String,
    value: Object,
    m: String
  },
  data () {
    return {
      model: []
    }
  },
  methods: {
    normalizedModel () {
      this.model = [this.value.RequestService_Info].map((data) => {
        return {
          ...data,
          RequesterAddress:
            `${data.Boulevard}` +
            `${data.MainStreet}` +
            `${data.ByAlley}` +
            `${data.MainAlley}` +
            `${data.ByStreet}`
        }
      })
    }
  },
  mounted () {
    this.normalizedModel()
  }
}
</script>
