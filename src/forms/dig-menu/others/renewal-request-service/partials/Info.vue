<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          v-model="value.RequestService_Info.CI_RequestType"
          cdcName="CI_RequestType"
          label="نوع درخواست"
          label-width="80px"
          m="r"
          ciName="CI_RequestType"
          domain-name="Dig"
        />
      </FormControl>
      <FormControl v-if="value.RequestService_Info.CI_RequestType === 1">
        <safa-datepicker
          v-model="value.RequestService_Info.OriginalLicenseDate"
          cdcName="OriginalLicenseDate"
          label="تاریخ مجوز"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl v-if="value.RequestService_Info.CI_RequestType === 1">
        <safa-text
          v-model="value.RequestService_Info.OriginalLicenseNo"
          cdcName="OriginalLicenseNo"
          label="شماره مجوز"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.RequestService_Info.CI_RequesterType"
          cdcName="CI_RequesterType"
          label="شرکت خدماتی"
          label-width="80px"
          m="r"
          ciName="CI_RequesterType"
          domain-name="Dig"
          ref="ciRequesterType"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.RequestService_Info.CI_RedirectName"
          cdcName="CI_RedirectName"
          label="نام تابعه"
          label-width="80px"
          m="r"
          :options="redirectNameOptions"
          source-type="local"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.RequestService_Info.CI_Project"
          cdcName="CI_Project"
          ciName="CI_Project"
          domain-name="Dig"
          label="عنوان پروژه"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.RequestService_Info.NIdWorkItem"
          cdcName="NIdWorkItem"
          label="کد رهگیری"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.RequestService_Info.CI_Region"
          cdcName="CI_Region"
          domainName="Dig"
          label="منطقه"
          label-width="80px"
          ciName="CI_Region"
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
          v-model="value.RequestService_Info.Boulevard"
          cdcName="Boulevard"
          label="آدرس مسیر حفاری بلوار"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.RequestService_Info.MainStreet"
          cdcName="MainStreet"
          label="خیابان اصلی"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.RequestService_Info.ByStreet"
          cdcName="ByStreet"
          label="خیابان فرعی"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.RequestService_Info.MainAlley"
          cdcName="MainAlley"
          label="کوچه اصلی"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.RequestService_Info.ByAlley"
          cdcName="ByAlley"
          label="کوچه فرعی"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.RequestService_Info.DigPathLength"
          cdcName="DigPathLength"
          label="ناحیه"
          label-width="80px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="spliterModel" fit>
      <template #before>
        <fit>
          <safa-grid
            v-model="value.RequestServiceMojavez_Time"
            cdcName="RequestServiceMojavez_Time"
            title="مدت و زمان اجرای عملیات حفاری (مجوز)"
            :columns="RequestServiceMojavezTimeColumns"
            height="100%"
            max-height="100%"
            min-height="200px"
            fit
            m="r"
            paginate
            :pageSize="20"
            :suppressRowClickSelection="false"
          />
        </fit>
      </template>
      <template #after>
        <fit>
          <safa-grid
            v-model="value.RequestService_Time"
            cdcName="RequestService_Time"
            title="مدت و زمان اجرای عملیات حفاری (تمدید)"
            :columns="RequestServiceTimeColumns"
            height="100%"
            max-height="100%"
            min-height="200px"
            fit
            m="r"
            paginate
            :pageSize="20"
            :suppressRowClickSelection="false"
          />
        </fit>
      </template>
    </safa-splitter>
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
      spliterModel: 50,
      RequestServiceMojavezTimeColumns: [
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
          editor: "date",
          validations: "required"
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
      ],
      RequestServiceTimeColumns: [
        {
          field: "TimeRenew",
          title: "نوبت تمدید",
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
          editor: "date",
          validations: 'required'
        },
        {
          field: "CI_CauseRenewal",
          title: "علت تمدید",
          width: "100px",
          editor: "combo",
          domain: "Dig"
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
  computed: {
    ciRequesterTypeTitle () {
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  },
  created () {
    this.getRedirectNameList()
  },
  methods: {
    async getRedirectNameList () {
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.getClsCIRedirectName({ CI_RequesterType: this.value.RequestService_Info?.CI_RequesterType ?? 0 })
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
  watch: {
    "value.RequestService_Info.CI_RequesterType": {
      handler () {
        this.getRedirectNameList()
      },
      immediate: true
    }
  }
}
</script>
