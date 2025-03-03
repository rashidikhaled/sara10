<template>
 <fit>
      <FormRow class="q-my-sm">
        <FormControl>
          <safa-combo
            v-model="value.ClsRenewal_Request.Request_Info.CI_RequestType"
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
            v-model="value.ClsRenewal_Request.Request_Info.CI_RequesterType"
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
            v-model="value.ClsRenewal_Request.Request_Info.CI_RedirectName"
            cdcName="CI_RedirectName"
            :options="redirectNameOptions"
            source-type="local"
            label="نام تابعه"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRenewal_Request.Request_Info.NIdWorkItem"
            cdcName="NIdWorkItem"
            label="کد رهگیری"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="value.ClsRenewal_Request.Request_Info.CI_Region"
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
            v-model="value.ClsRenewal_Request.Request_Info.RequesterRegion"
            cdcName="RequesterRegion"
            label="ناحیه"
            label-width="80px"
            m="r"
          />
        </FormControl>
      <!-- </FormRow>
      <FormRow class="q-mb-sm"> -->
        <FormControl>
          <safa-text
            v-model="value.ClsRenewal_Request.Request_Info.RequesterNationalCode"
            cdcName="RequesterNationalCode"
            label="کد ملی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRenewal_Request.Request_Info.RequesterName"
            cdcName="RequesterName"
            label="نام متقاضی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRenewal_Request.Request_Info.CellphoneNo"
            cdcName="CellphoneNo"
            label="تلفن همراه متقاضی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRenewal_Request.Request_Info.PostCode"
            cdcName="PostCode"
            label="کد پستی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRenewal_Request.Request_Info.TelNo"
            cdcName="TelNo"
            label="تلفن متقاضی"
            label-width="80px"
            m="r"
          />
        </FormControl>
      </FormRow>
          <safa-text
            label="آدرس متقاضی"
            v-model="value.ClsRenewal_Request.Request_Info.RequesterAddress"
            cdcName="RequesterAddress"
            label-width="80px"
            m="r"
          />
        <FormControl class="q-mt-sm">
          <text-template
            v-model="value.ClsRenewal_Request.Request_Info.Description"
            cdcName="Description"
            label="توضیحات درخواست"
            label-width="80px"
            class="col-12"
            :rows="9"
            m="r"
          />
        </FormControl>
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
      redirectNameOptions: []
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
        const { data } = await this.$services.excavation.getClsCIRedirectName({ CI_RequesterType: this.value.ClsRenewal_Request?.Request_Info?.CI_RequesterType ?? 0 })
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
    "value.ClsRenewal_Request.Request_Info.CI_RequesterType": {
      handler () {
        this.getRedirectNameList()
      },
      immediate: true
    }
  }
}
</script>
