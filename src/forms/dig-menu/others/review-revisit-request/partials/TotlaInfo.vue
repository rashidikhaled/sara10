<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl v-if="false">
        <safa-combo
          v-model="value.ClsRevisit_Request.Request_Info.CI_RequestType"
          cdcName="CI_RequestType"
          label="نوع درخواست"
          label-width="80px"
          m="r"
          ciName="CI_RequestType"
          domain-name="Dig"
          @input="requestTypeSelectionChanged"
        />
      </FormControl>
      <FormControl v-if="LicenseDate">
        <safa-datepicker
          v-model="value.ClsRevisit_Request.Request_Info.OriginalLicenseDate"
          cdcName="OriginalLicenseDate"
          label="تاریخ مجوز"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl v-if="LicenseDate">
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.OriginalLicenseNo"
          cdcName="OriginalLicenseNo"
          label="شماره مجوز اصلی"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.ClsRevisit_Request.Request_Info.CI_RequesterType"
          cdcName="CI_RequesterType"
          label="شرکت خدماتی"
          label-width="80px"
          ciName="CI_RequesterType"
          domain-name="Dig"
          m="r"
          ref="ciRequesterType"
          />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نام تابعه"
          label-width="80px"
          v-model="value.ClsRevisit_Request.Request_Info.CI_RedirectName"
          cdcName="CI_RedirectName"
          source-type="local"
          :options="redirectNameOptions"
          m="r"
          :validations="['required']"
          required
          />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.NIdWorkItem"
          cdcName="NIdWorkItem"
          label="کد رهگیری"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.ClsRevisit_Request.Request_Info.CI_Region"
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
          v-model="value.ClsRevisit_Request.Request_Info.RequesterRegion"
          cdcName="RequesterRegion"
          label="ناحیه"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-map-measure
          v-model="value.ClsRevisit_Request.Request_Info.DigPathLength"
          cdcName="DigPathLength"
          label="طول ترسیم"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl v-if="LicenseDate">
        <safa-text
          v-model="
            value.ClsRevisit_Request.Request_Info.OriginalLicenseComments
          "
          cdcName="OriginalLicenseComments"
          label="علت تمدید مجوز"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.RequesterNationalCode"
          cdcName="RequesterNationalCode"
          label="کد ملی"
          label-width="80px"
          type="number"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.RequesterName"
          cdcName="RequesterName"
          label="نام متقاضی"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.CellphoneNo"
          cdcName="CellphoneNo"
          label="تلفن همراه متقاضی"
          label-width="80px"
          type="number"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.PostCode"
          cdcName="PostCode"
          label="کد پستی"
          label-width="80px"
          type="number"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.TelNo"
          cdcName="TelNo"
          label="تلفن متقاضی"
          type="number"
          label-width="80px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm">
      <safa-text
        label="آدرس متقاضی"
        v-model="value.ClsRevisit_Request.Request_Info.RequesterAddress"
        cdcName="RequesterAddress"
        class="col-12"
        label-width="80px"
        m="r"
      />
      <text-template
        fit
        v-model="value.ClsRevisit_Request.Request_Info.Description"
        cdcName="Description"
        label="توضیحات درخواست"
        label-width="80px"
        m="r"
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
    m: String,
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      LicenseDate: false,
      redirectNameOptions: []
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
    requestTypeSelectionChanged () {
      if (this.value.ClsRevisit_Request.Request_Info.CI_RequestType === 1) {
        this.LicenseDate = true
      } else {
        this.LicenseDate = false
      }
    },
    async getRedirectNameList () {
      try {
        this.showLoading()
        const payload = {
          CI_RequesterType:
            this.value.ClsRevisit_Request?.Request_Info?.CI_RequesterType ?? 0
        }
        const { data } = await this.$services.excavation.getClsCIRedirectName(payload)
        const res = this.getResponse(data)
        if (res.success) {
          this.redirectNameOptions =
            res.data.GetClsCI_RedirectNameResult?.CI_RedirectName ?? []
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
    "value.ClsRevisit_Request.Request_Info.DigPathLength": {
      handler () {
        if (
          this.value.ClsRevisit_Request.Request_Info.DigPathLength === "" ||
          this.value.ClsRevisit_Request.Request_Info.DigPathLength === null
        ) {
          this.value.ClsRevisit_Request.Request_Info.DigPathLength = 0
        }
      }
    },
    "value.ClsRevisit_Request.Request_Info.CI_RequesterType" () {
      this.getRedirectNameList()
    }
  }
}
</script>
