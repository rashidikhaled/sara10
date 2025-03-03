<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-combo
          v-model="value.ClsRevisit_Request.Request_Info.CI_RequesterType"
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
          v-model="value.ClsRevisit_Request.Request_Info.CI_RedirectName"
          cdcName="CI_RedirectName"
          source-type="local"
          :options="redirectNameOptions"
          label="نام تابعه"
          label-width="80px"
          m="r"
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
          ciName="CI_Region"
          domain-name="Dig"
          label="منطقه"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.AreaCode"
          cdcName="RequesterRegion"
          label="ناحیه"
          label-width="80px"
         :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.RequesterNationalCode"
          cdcName="RequesterNationalCode"
          label="کد ملی"
          label-width="80px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.RequesterName"
          cdcName="RequesterName"
          label="نام متقاضی"
          label-width="80px"
          :m="m"
        />
      </FormControl>
      <FormControl >
          <safa-text
            label="شماره وکالت نامه"
            v-model="value.ClsRevisit_Request.Request_Info.MandateNo"
            cdcName="MandateNo"
            :m="m"
            label-width="80px"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ وکالت نامه"
            format="jYYYY/jMM/jDD"
            display-format="dddd jDD jMMMM jYYYY"
            v-model="value.ClsRevisit_Request.Request_Info.MandateDate"
            cdcName="MandateDate"
            :m="m"
            label-width="80px"
          />
        </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.CellphoneNo"
          cdcName="CellphoneNo"
          label="تلفن همراه متقاضی"
          label-width="80px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.PostCode"
          cdcName="PostCode"
          label="کد پستی"
          label-width="80px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.TelNo"
          cdcName="TelNo"
          label="تلفن متقاضی"
          label-width="80px"
          :m="m"
        />
      </FormControl>
      <FormControl>
          <safa-map-measure
            v-model="value.ClsRevisit_Request.Request_Info.DigPathLength"
            cdcName="DigPathLength"
            label="طول ترسیم"
            label-width="80px"
            required
            :m="m"
            @getMapInfo="updateMapMeasure"
          />
        </FormControl>
      <safa-text
        label="آدرس متقاضی"
        v-model="value.ClsRevisit_Request.Request_Info.RequesterAddress"
        cdcName="requesterAddress"
        class="col-12"
        label-width="80px"
        :m="m"
      />
      <text-template
        fit
        v-model="value.ClsRevisit_Request.Request_Info.Description"
        cdcName="Description"
        label="توضیحات درخواست"
        label-width="80px"
        :m="m"
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
    m: String
  },
  data () {
    return {
      name: "TotalInformation",
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
    },
    updateMapMeasure ({ WKT }) {
      if (this.value.ClsRevisit_Request.Request_Line?.[0]?.Line)
      { this.value.ClsRevisit_Request.Request_Line[0].Line = WKT }
    }
  },
  watch: {
    "value.ClsRevisit_Request.Request_Info.DigPathLength": {
      handler () {
        if (
          this.value.ClsRevisit_Request.Request_Info
            .DigPathLength === null ||
          this.value.ClsRevisit_Request.Request_Info
            .DigPathLength === ""
        ) {
          this.value.ClsRevisit_Request.Request_Info.DigPathLength = 0
        }
      },
      deep: true
    },
    "value.ClsRevisit_Request.Request_Info.CI_RequesterType" () {
      this.getRedirectNameList()
    }
  }
}
</script>
