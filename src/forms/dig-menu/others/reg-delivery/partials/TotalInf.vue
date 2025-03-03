<template>
  <fit>
    <FormRow>
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
    </FormRow>
    <q-separator class="q-my-sm" />
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="شرکت خدماتی"
          ciName="CI_RequesterType"
          label-width="80px"
          v-model="value.CI_RequesterType"
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
          :options="redirectNameOptions"
          source-type="local"
          v-model="value.RequestService_Info.CI_RedirectName"
          cdcName="CI_RedirectName"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="منطقه"
          label-width="80px"
          v-model="value.RequestService_Info.CI_Region"
          cdcName="CI_Region"
          source-type="local"
          :options="districts"
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
      <safa-text
        label="آدرس"
        label-width="80px"
        v-model="value.RequestService_Info.RequesterAddress"
        cdcName="RequesterAddress"
        fit
        m="r"
        class="col-12"
      />
    </FormRow>
    <safa-notice>
      "باتوجه به اتمام مرمت پروژه حفاری با مشخصات فوق توسط عوامل اجرائی و آمادگی
      این شرکت برای تحویل معبر به شهرداری، خواهشمند است در اجرای ماده 14
      دستورالعمل نحوه هماهنگی و صدور مجوز حفاری در سطح شهرهای کشور ( مصوب سال
      1367 کمیسیون عالی هماهنگی امور اجرائی کشور ) دستور فرمایید نسبت به بازدید
      از پروژه مذکور و تنظیم صورتمجلس تحویل موقت اقدام لازم بعمل آید ."
    </safa-notice>
    <FormRow>
      <FormControl>
        <safa-datepicker
          label="تاریخ پیشنهادی تحویل موقت"
          label-width="80px"
          v-model="value.Delivery.DeliveryDate"
          cdcName="DeliveryDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام نماینده"
          label-width="80px"
          v-model="value.Delivery.AgentName"
          cdcName="AgentName"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره تلفن نماینده"
          label-width="80px"
          v-model="value.Delivery.AgentTellNo"
          cdcName="AgentTellNo"
          :m="m"
        />
      </FormControl>
      <text-template
        label="توضیحات"
        label-width="80px"
        v-model="value.Delivery.Description"
        cdcName="Description"
        :m="m"
      />
    </FormRow>
    <!-- <safa-grid
      title="زمان پیشنهادی تحویل موقت"
      v-model="value.Delivery"
      cdcName="Delivery"
      :columns="deliveryCol"
      :m="m"
      min-height="200px"
      fit
      paginate
    /> -->
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
      redirectNameOptions: [],
      deliveryCol: [
        {
          title: "تاریخ",
          field: "DeliveryDate",
          width: "80px"
        },
        {
          title: "نام نماینده",
          field: "AgentName",
          width: "150px"
        },
        {
          title: "شماره تلفن نماینده",
          field: "AgentTellNo",
          width: "150px"
        },
        {
          title: "توضیحات",
          field: "Description",
          width: "150px"
        }
      ]
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    ciRequesterTypeTitle () {
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  },
  created () {
    this.getRedirectNameList()
  },
  methods: {
    async getRedirectNameList () {
      //  {CI_RequesterType: this.value.CI_RequesterType ?? 0 }
      const payload = {}
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.getClsCIRedirectName(payload)
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
  }
  // watch: {
  //   "value.CI_RequesterType": {
  //     handler () {
  //       this.getRedirectNameList()
  //     },
  //     immediate: true
  //   }
  // }
}
</script>
