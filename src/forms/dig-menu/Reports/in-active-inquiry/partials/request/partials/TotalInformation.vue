<template>
  <fit>
    <internal-section
      v-model="infoRequest"
      default-open
      title="اطلاعات درخواست"
      class="q-mt-sm"
    >
      <FormRow class="q-my-sm">
        <FormControl>
          <safa-combo
            v-model="value.ClsRequest_Info.Request_Info.CI_RequestType"
            cdcName="CI_RequestType"
            ciName="CI_RequestType"
            domain-name="Dig"
            label="نوع درخواست"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="value.ClsRequest_Info.Request_Info.OriginalLicenseDate"
            cdcName="OriginalLicenseDate"
            label="تاریخ مجوز اصلی"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="value.ClsRequest_Info.Request_Info.OriginalLicenseNo"
            cdcName="OriginalLicenseNo"
            label="شماره مجوز اصلی"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="value.ClsRequest_Info.Request_Info.CI_RequesterType"
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
            v-model="value.ClsRequest_Info.Request_Info.CI_RedirectName"
            cdcName="CI_RedirectName"
            label="نام تابعه"
            label-width="100px"
            :options="redirectNameOptions"
            source-type="local"
            m="r"
            :validations="['required']"
            required
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRequest_Info.Request_Info.NIdWorkItem"
            cdcName="NIdWorkItem"
            label="کد رهگیری"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="value.ClsRequest_Info.Request_Info.CI_Region"
            cdcName="CI_Region"
            ciName="CI_Region"
            domain-name="Dig"
            label="منطقه"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRequest_Info.Request_Info.RequesterRegion"
            cdcName="RequesterRegion"
            label="ناحیه"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl class="col-12">
          <text-template
            v-model="value.ClsRequest_Info.Request_Info.OriginalLicenseComments"
            cdcName="OriginalLicenseComments"
            label="علت تمدید مجوز"
            label-width="100px"
            :rows="2"
            m="r"
          />
        </FormControl>
      </FormRow>
    </internal-section>
    <internal-section
      v-model="propertyDetails"
      default-open
      title="مشخصات ملک"
    >
      <FormRow class="q-my-sm">
        <FormControl>
          <safa-combo
            v-model="value.ClsRequest_Info.Request_Info.CI_TypeApplicant"
            cdcName="CI_TypeApplicant"
            ciName="CI_TypeApplicant"
            domain-name="Dig"
            label="نوع متقاضی"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRequest_Info.Request_Info.RequesterNationalCode"
            cdcName="RequesterNationalCode"
            label="کدملی"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRequest_Info.Request_Info.RequesterName"
            cdcName="RequesterName"
            label="نام متقاضی"
            label-width="100px"
            m="r"
          />
        </FormControl>

        <FormControl>
          <safa-text
            v-model="value.ClsRequest_Info.Request_Info.PostCode"
            cdcName="PostCode"
            label="کد پستی"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRequest_Info.Request_Info.TelNo"
            cdcName="TelNo"
            label="تلفن متقاضی"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRequest_Info.Request_Info.DigPathLength"
            cdcName="DigPathLength"
            label="طول ترسیم"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRequest_Info.Request_Info.CellphoneNo"
            cdcName="CellphoneNo"
            label="تلفن همراه متقاضی"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl class="col-8">
          <safa-text
            v-model="value.ClsRequest_Info.Request_Info.RequesterAddress"
            cdcName="RequesterAddress"
            label="آدرس ملک"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl class="col-12">
          <text-template
            v-model="value.ClsRequest_Info.Request_Info.Description"
            cdcName="Description"
            label="توضیحات درخواست"
            :rows="2"
            label-width="100px"
            m="r"
          />
        </FormControl>
      </FormRow>
    </internal-section>
  </fit>
</template>

<script>

import baseFormMixin from "src/mixins/baseFormMixin"
export default {

  mixins: [baseFormMixin],
  props: {
    m: String,
    model2: Object,
    value: Object
  },
  data () {
    return {
      redirectNameOptions: [],
      CI_RequestType: "",
      OriginalLicenseDate: "",
      Request_Instrument: "",
      CI_RequesterType: "",
      CI_RedirectName: "",
      CI_Project: "",
      NIdWorkItem: "",
      CI_Region: "",
      RequesterRegion: "",
      Boulevard: "",
      MainStreet: "",
      ByStreet: "",
      MainAlley: "",
      ByAlley: "",
      FollowerCellphoneNo: "",
      Description: "",
      OriginalLicenseComments: "",
      RequestService_Time: "",
      propertyDetails: true,
      infoRequest: true, // test

      columns2: [
        {
          field: "CI_Phase",
          title: "فاز",
          width: "130px",
          editor: "combo",
          domain: "Dig"
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
          width: "130px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "130px"
        }
      ]
    }
  },
  computed: {
    ciRequesterTypeTitle () {
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  },
  watch: {
    "value.ClsRequest_Info.Request_Info.CI_RequesterType": {
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
        const { data } = await this.$services.excavation.getClsCIRedirectName({ CI_RequesterType: this.value.ClsRequest_Info?.Request_Info?.CI_RequesterType ?? 0 })
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
