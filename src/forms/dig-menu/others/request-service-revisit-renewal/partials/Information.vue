<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="نوع درخواست"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.CI_RequestType
          "
          cdcName="CI_RequestType"
          ciName="CI_RequestType"
          domain-name="Dig"
          label-width="100px"
          m="r"
          @input="requestTypeSelectionChanged"
        />
      </FormControl>
      <FormControl v-if="LicenseDate">
        <safa-datepicker
          label="تاریخ مجوز"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info
              .ExportLicenseDate
          "
          cdcName="ExportLicenseDate"
          label-width="100px"
        />
      </FormControl>
      <FormControl v-if="LicenseDate">
        <safa-text
          label="شماره مجوز "
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.ExportLicenseNo
          "
          cdcName="ExportLicenseNo"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="شرکت خدماتی"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.CI_RequesterType
          "
          cdcName="CI_RequesterType"
          ciName="CI_RequesterType"
          domain-name="Dig"
          label-width="100px"
          ref="ciRequesterType"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نام تابعه"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.CI_RedirectName
          "
          cdcName="CI_RedirectName"
          label-width="100px"
          :options="redirectNameOptions"
          source-type="local"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="عنوان پروژه"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.CI_Project
          "
          cdcName="CI_Project"
          ciName="CI_Project"
          domain-name="Dig"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد رهگیری"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.NIdWorkItem
          "
          cdcName="NIdWorkItem"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="منطقه"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.CI_Region
          "
          cdcName="CI_Region"
          ciName="CI_Region"
          domain-name="Dig"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ناحیه"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.RequesterRegion
          "
          cdcName="RequesterRegion"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label=" آدرس مسیر حفاری بلوار"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.Boulevard
          "
          cdcName="Boulevard"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان اصلی"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.MainStreet
          "
          cdcName="MainStreet"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان فرعی"
          v-model="value.RevisitRenewal_RequestService.RequestService_Info.ByStreet"
          cdcName="ByStreet"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کوچه اصلی"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.MainAlley
          "
          cdcName="MainAlley"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کوچه فرعی"
          v-model="value.RevisitRenewal_RequestService.RequestService_Info.ByAlley"
          cdcName="ByAlley"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-map-measure
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.DigPathLength
          "
          cdcName="DigPathLength"
          label="طول ترسیم"
          label-width="80px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="splitterVerticalModel" vertical>
      <template v-slot:before>
        <fit>
          <safa-grid
            title="مدت و زمان اجرای عملیات حفاری (مجوز)"
            v-model="value.RevisitRenewal_RequestService.RequestServiceMojavez_Time"
            :columns="requestServiceMojavezTimeColumns"
            :suppressRowClickSelection="false"
            fit
            paginate
            cdcName="RequestServiceMojavez_Time"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="مدت و زمان اجرای عملیات حفاری (تمدید)"
            v-model="value.RevisitRenewal_RequestService.RequestService_Time"
            :columns="requestServiceTimeColumns"
            :suppressRowClickSelection="false"
            fit
            paginate
            cdcName="RequestService_Time"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },
  mixins: [baseFormMixin],

  data () {
    return {
      redirectNameOptions: [],
      requestServiceMojavezTimeColumns: [
        { field: "CI_Phase", title: "فاز", domain: "Dig", editor: "combo" },
        { field: "StartDateExtension", title: "تاریخ شروع" },
        { field: "EndDateExtension", title: "تاریخ اتمام" },
        { field: "Duration", title: "مدت (روز)" },
        { field: "Description", title: "توضیحات" }
      ],
      requestServiceTimeColumns: [
        { field: "", title: "نوبت تمدید" },
        { field: "StartDateExtension", title: "تاریخ شروع" },
        {
          field: "EndDateExtension",
          title: "تاریخ اتمام",
          validations: "required"
        },
        {
          field: "CI_CauseRenewal",
          title: "علت تمدید",
          domain: "Dig",
          editor: "combo"
        },
        { field: "Delay", title: "تاخیرات مجاز(روز)" },
        { field: "Duration", title: "مدت (روز)" },
        { field: "Description", title: "توضیحات" }
      ],
      LicenseDate: true,
      splitterVerticalModel: 50,
      SelectedItem: null
    }
  },
  created () {
    this.getRedirectNameList()
  },
  methods: {
    requestTypeSelectionChanged () {
      if (
        this.value.RevisitRenewal_RequestService.RequestService_Info
          .CI_RequestType != null &&
        this.value.RevisitRenewal_RequestService != null
      ) {
        if (
          this.value.RevisitRenewal_RequestService.RequestService_Info
            .CI_RequestType === 1
        ) {
          this.LicenseDate = true
        } else {
          this.LicenseDate = false
        }
      }
    },
    async getRedirectNameList () {
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.getClsCIRedirectName({ CI_RequesterType: this.value.RevisitRenewal_RequestService?.RequestService_Info?.CI_RequesterType ?? 0 })
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
    "value.RevisitRenewal_RequestService.RequestService_Info.DigPathLength": {
      handler () {
        if (
          this.value.RevisitRenewal_RequestService.RequestService_Info
            .DigPathLength === null ||
          this.value.RevisitRenewal_RequestService.RequestService_Info
            .DigPathLength === ""
        ) {
          this.value.RevisitRenewal_RequestService.RequestService_Info.DigPathLength = 0
        }
      },
      deep: true
    },
    "value.RevisitRenewal_RequestService.RequestService_Info.CI_RequesterType": {
      handler () {
        this.getRedirectNameList()
      },
      immediate: true
    }
  },
  computed: {
    ciRequesterTypeTitle () {
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  }
}
</script>
