<template>
  <fit>
      <FormRow class="q-my-sm">
        <FormControl>
          <safa-combo
            v-model="model.cIRequestType"
            cdcName="CI_RequestType"
            ciName="CI_RequestType"
            domain-name="Dig"
            label="نوع درخواست"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="model.cIRequesterType"
            cdcName="CI_RequesterType"
            ciName="CI_RequesterType"
            domain-name="Dig"
            label="شرکت خدماتی"
            label-width="80px"
            m="r"
            ref="ciRequesterType"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="model.cIRedirectName"
            cdcName="CI_RedirectName"
            label="نام تابعه"
            label-width="80px"
          source-type="local"
          ciName="CI_RedirectName"
          domain-name="Dig"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.nIdWorkItem"
            cdcName="NIdWorkItem"
            label="کد رهگیری"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="model.cIRegion"
            cdcName="CI_Region"
            ciName="CI_Region"
            domain-name="Dig"
            label="منطقه"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.areaCode"
            cdcName="RequesterRegion"
            label="ناحیه"
            label-width="80px"
            m="r"
          />
        </FormControl>
      </FormRow>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            v-model="model.requesterNationalCode"
            cdcName="RequesterNationalCode"
            label="کد ملی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.requesterName"
            cdcName="RequesterName"
            label="نام متقاضی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.cellphoneNo"
            cdcName="CellphoneNo"
            label="تلفن همراه متقاضی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.postCode"
            cdcName="PostCode"
            label="کد پستی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.telNo"
            cdcName="TelNo"
            label="تلفن متقاضی"
            label-width="80px"
            m="r"
          />
        </FormControl>
          <safa-text
            label="آدرس متقاضی"
            v-model="model.requesterAddress"
            cdcName="requesterAddress"
            class="col-12"
            label-width="80px"
          />
      </FormRow>
        <FormControl>
          <text-template
            v-model="model.description"
            cdcName="Description"
            label="توضیحات درخواست"
            label-width="80px"
            class="col-12"
            :rows="20"
            m="r"
          />
        </FormControl>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    rowSelectData: Object
  },
  data () {
    return {
      model: {
        cIRequestType: this.value?.RevisitRenewal_Request?.Request_Info?.CI_RequestType || "",
        cIRequesterType: this.value?.RevisitRenewal_Request?.Request_Info?.CI_RequesterType || "",
        cIRedirectName: this.value?.RevisitRenewal_Request?.Request_Info?.CI_RedirectName || "",
        nIdWorkItem: this.value?.RevisitRenewal_Request?.Request_Info?.NIdWorkItem || "",
        cIRegion: this.value?.RevisitRenewal_Request?.Request_Info?.CI_Region || "",
        areaCode: this.value?.RevisitRenewal_Request?.Request_Info?.AreaCode || "",
        requesterNationalCode: this.value?.RevisitRenewal_Request?.RequesterNationalCode || "",
        requesterName: this.value?.RevisitRenewal_Request?.Request_Info?.RequesterName || "",
        cellphoneNo: this.value?.RevisitRenewal_Request?.Request_Info?.CellphoneNo || "",
        postCode: this.value?.RevisitRenewal_Request?.Request_Info?.PostCode || "",
        telNo: this.value?.RevisitRenewal_Request?.Request_Info?.TelNo || "",
        requesterAddress: this.value?.RevisitRenewal_Request?.Request_Info?.RequesterAddress || "",
        description: this.value?.RevisitRenewal_Request?.Request_Info?.Description || ""

      }
    }
  },
  methods: {}
}
</script>
