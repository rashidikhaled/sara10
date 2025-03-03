<template>
   <fit>
      <FormRow class="q-my-sm">
        <FormControl>
          <safa-combo
            v-model="model2.Delivery.Request_Info.CI_RequestType"
            cdcName="CI_RequestType"
            ciName="CI_RequestType"
            domain-name="Dig"
            label="نوع درخواست"
            label-width="80px"
            m="r"
            ref="ciRequesterType"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="model2.Delivery.Request_Info.CI_RequesterType"
            cdcName="CI_RequesterType"
            ciName="CI_RequesterType"
            domain-name="Dig"
            label="شرکت خدماتی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="model2.Delivery.Request_Info.CI_RedirectName"
            cdcName="CI_RedirectName"
            label="نام تابعه"
            source-type="local"
            :options="redirectNameOptions"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model2.Delivery.Request_Info.NIdWorkItem"
            cdcName="NIdWorkItem"
            label="کد رهگیری"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="model2.Delivery.Request_Info.CI_Region"
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
            v-model="model2.Delivery.Request_Info.RequesterRegion"
            cdcName="RequesterRegion"
            label="ناحیه"
            label-width="80px"
            m="r"
          />
        </FormControl>
      </FormRow>
      <FormRow class="q-my-sm">
        <FormControl>
          <safa-text
            v-model="model2.Delivery.Request_Info.RequesterNationalCode"
            cdcName="RequesterNationalCode"
            label="کد ملی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model2.Delivery.Request_Info.RequesterName"
            cdcName="RequesterName"
            label="نام متقاضی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model2.Delivery.Request_Info.CellphoneNo"
            cdcName="CellphoneNo"
            label="تلفن همراه متقاضی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model2.Delivery.Request_Info.PostCode"
            cdcName="PostCode"
            label="کد پستی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model2.Delivery.Request_Info.TelNo"
            cdcName="TelNo"
            label="تلفن متقاضی"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model2.Delivery.Request_Info.RequesterAddress"
            cdcName="RequesterAddress"
            label="آدرس متقاضی"
            label-width="80px"
            m="r"
          />
        </FormControl>
      </FormRow>
      <FormRow>
        <text-template
          v-model="model2.Delivery.Request_Info.Description"
          cdcName="Description"
          label="توضیحات درخواست"
          label-width="80px"
          class="col-12"
          :rows="9"
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
    m: String,
    model2: Object,
    value: Object
  },
  data () {
    return {
      redirectNameOptions: []

    }
  },
  mounted () {
    this.getRedirectNameList()
  },
  computed: {
    ciRequesterTypeTitle () {
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  },
  methods: {
    async getRedirectNameList () {
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.getClsCIRedirectName({ CI_RequesterType: this.model2.Delivery?.Request_Info?.CI_RequesterType ?? 0 })
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
    "model2.Delivery.Request_Info.CI_RequesterType": {
      handler () {
        this.getRedirectNameList()
      },
      immediate: true
    }
  }
}
</script>
