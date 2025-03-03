<template>
  <fit>
    <expantion-section
      v-model="infoMojavez"
      default-opened
      title="اطلاعات مجوز"
    >
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="شماره مجوز"
            label-width="80px"
            v-model="value.RequestService_Info.ExportLicenseNo"
            cdcName="ExportLicenseNo"
            m="r"
          >
          </safa-text>
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ مجوز"
            label-width="80px"
            v-model="value.RequestService_Info.ExportLicenseDate"
            cdcName="ExportLicenseDate"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ زمان پیشنهادی"
            label-width="80px"
            v-model="value.Delivery.DeliveryDate"
            cdcName="DeliveryDate"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام نماینده"
            label-width="80px"
            v-model="value.Delivery.AgentName"
            cdcName="AgentName"
            m="r"
          >
          </safa-text>
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره تلفن"
            label-width="80px"
            v-model="value.Delivery.AgentTellNo"
            cdcName="AgentTellNo"
            type="number"
            dir="ltr"
            m="r"
          />
        </FormControl>
      </FormRow>
    </expantion-section>
    <expantion-section v-model="infoRequest" default-opened title="اطلاعات درخواست">
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            label="شرکت خدماتی"
            ciName="CI_RequesterType"
            label-width="80px"
            v-model="value.RequestService_Info.CI_RequesterType"
            cdcName="CI_RequesterType"
            domain-name="Dig"
            ref="ciRequesterType"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نام تابعه"
            label-width="80px"
            ciName="CI_RedirectName"
            v-model="value.RequestService_Info.CI_RedirectName"
            cdcName="CI_RedirectName"
            domain-name="Dig"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="منطقه"
            label-width="80px"
            v-model="value.RequestService_Info.CI_Region"
            source-type="local"
            :options="districts"
            cdcName="districts"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="ناحیه"
            label-width="80px"
            v-model="value.RequestService_Info.RequesterRegion"
            cdcName="RequesterRegion"
            m="r"
          />
        </FormControl>

        <FormControl>
          <safa-text
            label="دستگاه نظارت"
            label-width="80px"
            v-model="value.Consultant"
            cdcName="Consultant"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="پیمانکار"
            label-width="80px"
            v-model="value.CompanyName"
            cdcName="CompanyName"
            m="r"
          />
        </FormControl>
        <text-template
          label="آدرس"
          label-width="80px"
          v-model="value.RequestService_Info.RequesterAddress"
          cdcName="RequesterAddress"
          fit
          m="r"
        />
      </FormRow>
    </expantion-section>
    <expantion-section v-model="note" default-opened title="نکته">
    <safa-notice>
      با توجه به اتمام مرمت پروژه حفاری با مشخصات فوق توسط عوامل اجرائی و آمادگی
      این شرکت برای تحویل معبر به شهرداری، خواهشمند است در اجرای ماده 14
      دستورالعمل نحوه هماهنگی وصدور مجوز حفاری در سطح شهرهای کشور (مصوب سال 1367
      کمیسیون عالی هماهنگی امور اجرائی کشور) .دستور فرمایید نسبت به بازدید از
      پروژه مذکور و تنظیم صورتمجلس تحویل موقت اقدام لازم به عمل آید
    </safa-notice>
    </expantion-section>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data () {
    return {
      infoMojavez: true,
      infoRequest: true,
      note: true
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
