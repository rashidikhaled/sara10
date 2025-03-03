<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl v-if="showRequestTypeField">
        <safa-combo
          label="نوع درخواست"
          ciName="CI_RequestType"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.CI_RequestType
          "
          cdcName="CI_RequestType"
          domain-name="Dig"
          m="r"
        />
      </FormControl>
      <FormControl v-if="LicenseDate">
        <safa-datepicker
          label="تاریخ مجوز اصلی"
          ciName="OriginalLicenseDate"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info
              .OriginalLicenseDate
          "
          cdcName="OriginalLicenseDate"
          domain-name="Dig"
          m="r"
        />
      </FormControl>
      <FormControl v-if="LicenseDate">
        <safa-combo
          label="شماره مجوز اصلی"
          ciName="OriginalLicenseNo"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info
              .OriginalLicenseNo
          "
          cdcName="OriginalLicenseNo"
          domain-name="Dig"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="شرکت خدماتی"
          ciName="CI_RequesterType"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.CI_RequesterType
          "
          cdcName="CI_RequesterType"
          domain-name="Dig"
          m="r"
          ref="ciRequesterType"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نام تابعه"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.CI_RedirectName
          "
          cdcName="CI_RedirectName"
          :options="redirectNameOptions"
          source-type="local"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="عنوان پروژه"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.CI_Project
          "
          cdcName="CI_Project"
          ciName="CI_Project"
          domain-name="Dig"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد رهگیری"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.NIdWorkItem
          "
          cdcName="NIdWorkItem"
          m="r"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-combo
          label="منطقه"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.CI_Region
          "
          cdcName="CI_Region"
          ciName="CI_Region"
          domain-name="Dig"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ناحیه"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.RequesterRegion
          "
          cdcName="RequesterRegion"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="آدرس مسیر حفاری بلوار"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.Boulevard
          "
          cdcName="Boulevard"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان اصلی"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.MainStreet
          "
          cdcName="MainStreet"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان فرعی"
          label-width="80px"
          v-model="value.ClsRevisit_RequestService.RequestService_Info.ByStreet"
          cdcName="ByStreet"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کوچه اصلی"
          label-width="80px"
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.MainAlley
          "
          cdcName="MainAlley"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کوچه فرعی"
          label-width="80px"
          v-model="value.ClsRevisit_RequestService.RequestService_Info.ByAlley"
          cdcName="ByAlley"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-map-measure
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.DigPathLength
          "
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
        v-model="
          value.ClsRevisit_RequestService.RequestService_Info.Description
        "
        cdcName="Description"
        type="textarea"
        :rows="2"
        :m="m"
      />
    </div>
    <div class="row q-mb-sm" v-if="LicenseDate">
      <text-template
        label="علت تمدید مجوز"
        label-width="80px"
        v-model="
          value.ClsRevisit_RequestService.RequestService_Info
            .OriginalLicenseComments
        "
        cdcName="OriginalLicenseComments"
        type="textarea"
        :rows="2"
        m="r"
      />
    </div>
    <safa-datatable
      title="مدت زمان و اجرای عملیات حفاری (مجوز)"
      v-model="value.ClsRevisit_RequestService.RequestService_Time"
      cdcName="RequestService_Time"
      :columns="requestServiceTimeColumns"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      min-height="350px"
      height="100%"
      max-height="100%"
      fit
      :m="m"
      @update="updateRequestServiceTime"
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
    formKey: String
  },

  data () {
    return {
      showRequestTypeField: false,
      redirectNameOptions: [],
      LicenseDate: false,
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
          field: "StartDateExtension",
          title: "تاریخ شروع",
          editor: "date",
          width: "130px"
        },
        {
          field: "EndDateExtension",
          title: "تاریخ اتمام",
          editor: "date",
          width: "130px"
        },
        {
          field: "Duration",
          title: "مدت (روز)",
          width: "60px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "300px"
        }
      ]
    }
  },
  created () {
    this.getRedirectNameList()
  },
  computed: {
    ciRequesterTypeTitle () {
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  },
  methods: {
    requestTypeSelectionChanged () {
      if (
        this.value.ClsRevisit_RequestService != null &&
        this.value.ClsRevisit_RequestService.RequestService_Info
          .CI_RequestType != null
      ) {
        if (
          this.value.ClsRevisit_RequestService.RequestService_Info
            .ClsRevisit_RequestService.CI_RequestType === 1
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
        const payload = {
          CI_RequesterType:
            this.value.ClsRevisit_RequestService?.RequestService_Info?.CI_RequesterType ?? 0
        }
        const { data } = await this.$services.excavation.getClsCIRedirectName(payload)
        const res = this.getResponse(data)
        if (res.success) {
          this.redirectNameOptions =
            res.data.GetClsCI_RedirectNameResult?.CI_RedirectName ?? []
          this.$emit("getCIRedirectName")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    updateRequestServiceTime () {
      this.$emit("updateRequestServiceTime")
    }
  },
  watch: {
    "value.ClsRevisit_RequestService.RequestService_Info.CI_RequestType": {
      handler () {
        this.requestTypeSelectionChanged()
      }
    },
    "value.ClsRevisit_RequestService.RequestService_Info.DigPathLength": {
      handler () {
        if (
          this.value.ClsRevisit_RequestService.RequestService_Info
            .DigPathLength === "" ||
          this.value.ClsRevisit_RequestService.RequestService_Info
            .DigPathLength === null
        ) {
          this.value.ClsRevisit_RequestService.RequestService_Info.DigPathLength = 0
        }
      }
    },
    "value.ClsRevisit_RequestService.RequestService_Info.CI_RequesterType": {
      handler () {
        this.getRedirectNameList()
      }
    }
  }

}
</script>
