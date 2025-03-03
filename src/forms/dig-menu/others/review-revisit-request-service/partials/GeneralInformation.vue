<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl v-if="showRequestTypeField">
        <safa-combo
          label="نوع درخواست"
          ciName="CI_RequestType"
          label-width="80px"
          v-model="value.RequestService_Info.CI_RequestType"
          cdcName="CI_RequestType"
          m="r"
          domain-name="Dig"
          @input="requestTypeSelectionChanged"
        />
      </FormControl>
      <FormControl v-if="LicenseDate">
        <safa-datepicker
          label="تاریخ مجوز اصلی"
          ciName="OriginalLicenseDate"
          label-width="80px"
          v-model="value.RequestService_Info.OriginalLicenseDate"
          cdcName="OriginalLicenseDate"
          m="r"
          domain-name="Dig"
        />
      </FormControl>
      <FormControl v-if="LicenseDate">
        <safa-combo
          label="شماره مجوز اصلی"
          ciName="OriginalLicenseNo"
          label-width="80px"
          v-model="value.RequestService_Info.OriginalLicenseNo"
          cdcName="OriginalLicenseNo"
          m="r"
          domain-name="Dig"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="شرکت خدماتی"
          ciName="CI_RequesterType"
          label-width="80px"
          v-model="value.RequestService_Info.CI_RequesterType"
          cdcName="CI_RequesterType"
          m="r"
          domain-name="Dig"
          ref="ciRequesterType"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نام تابعه"
          label-width="80px"
          v-model="value.RequestService_Info.CI_RedirectName"
          cdcName="CI_RedirectName"
          source-type="local"
          :options="redirectNameOptions"
          m="r"
          :validations="['required']"
          required
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="عنوان پروژه"
          label-width="80px"
          v-model="value.RequestService_Info.CI_Project"
          cdcName="CI_Project"
          m="r"
          ciName="CI_Project"
          domain-name="Dig"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد رهگیری"
          label-width="80px"
          v-model="value.RequestService_Info.NIdWorkItem"
          cdcName="NIdWorkItem"
          m="r"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-combo
          label="منطقه"
          label-width="80px"
          v-model="value.RequestService_Info.CI_Region"
          source-type="local"
          :options="districts"
          validations="required"
          cdcName="CI_Region"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ناحیه"
          label-width="80px"
          v-model="value.RequestService_Info.RequesterRegion"
          cdcName="RequesterRegion"
          validations="required"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="آدرس مسیر حفاری بلوار"
          label-width="80px"
          v-model="value.RequestService_Info.Boulevard"
          cdcName="Boulevard"
          validations="required"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان اصلی"
          label-width="80px"
          v-model="value.RequestService_Info.MainStreet"
          cdcName="MainStreet"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان فرعی"
          label-width="80px"
          v-model="value.RequestService_Info.ByStreet"
          cdcName="ByStreet"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کوچه اصلی"
          label-width="80px"
          v-model="value.RequestService_Info.MainAlley"
          cdcName="MainAlley"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کوچه فرعی"
          label-width="80px"
          v-model="value.RequestService_Info.ByAlley"
          cdcName="ByAlley"
          m="r"
        />
      </FormControl>
      <FormControl>
      <safa-map-measure
          v-model="value.RequestService_Info.DigPathLength"
          cdcName="DigPathLength"
          label="طول ترسیم"
          label-width="80px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <div class="row q-mb-sm">
      <text-template
        label="توضیحات درخواست"
        label-width="80px"
        v-model="value.RequestService_Info.Description"
        cdcName="Description"
        type="textarea"
        :rows="2"
        m="r"
      />
    </div>
    <div class="row q-mb-sm" v-if="LicenseDate">
      <text-template
        label="علت تمدید مجوز"
        label-width="80px"
        v-model="value.RequestService_Info.OriginalLicenseComments"
        cdcName="OriginalLicenseComments"
        type="textarea"
        :rows="2"
        m="r"
      />
    </div>
    <safa-grid
      title="مدت زمان و اجرای عملیات حفاری (مجوز)"
      v-model="value.RequestService_Time"
      cdcName="RequestService_Time"
      :columns="requestServiceTimeColumns"
      :m="m"
      paginate
      min-height="350px"
      height="100%"
      max-height="100%"
      fit
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String,
    name: String,
    title: String,
    formKey: String,
    isView: Boolean
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    },
    ciRequesterTypeTitle () {
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  },
  data () {
    return {
      showRequestTypeField: false,
      redirectNameOptions: [],
      LicenseDate: false,
      defaultNewRow: {
        CI_Phase: 0,
        StartDateExtension: '',
        EndDateExtension: '',
        Duration: '',
        Description: ''
      },
      requestServiceTimeColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          editor: "combo",
          domain: "Dig",
          validations: "required",
          width: "130px"
        },
        {
          field: "StartDate",
          title: "تاریخ شروع",
          editor: "date",
          width: "130px"
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          editor: "date",
          width: "130px"
        },
        {
          field: "Duration",
          title: "مدت (روز)",
          width: "130px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "300px"
        }
      ]
    }
  },
  mounted () {
    this.getRedirectNameList()
  },
  methods: {
    requestTypeSelectionChanged () {
      if (
        this.value.RequestService_Info.CI_RequestType != null &&
        this.value.ClsRevisit_RequestService != null
      ) {
        if (
          this.value.RequestService_Info
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
    "value.RequestService_Info.DigPathLength": {
      handler () {
        if (
          this.value.RequestService_Info.DigPathLength === "" ||
          this.value.RequestService_Info.DigPathLength === null
        ) {
          this.value.RequestService_Info.DigPathLength = 0
        }
      }
    },
    "value.RequestService_Info.CI_RequesterType": {
      handler () {
        if (this.isView === true) {
          this.value.RequestService_Info.CI_RedirectName = null
        }
        this.getRedirectNameList()
      },
      immediate: true
    }
  }
}
</script>
