<template>
<fit>
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-combo
          v-model="value.ClsRevisit_RequestService.RequestService_Info.CI_RequesterType"
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
          v-model="value.ClsRevisit_RequestService.RequestService_Info.CI_RedirectName"
          cdcName="CI_RedirectName"
          :options="redirectNameOptions"
          source-type="local"
          label="نام تابعه"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.ClsRevisit_RequestService.RequestService_Info.CI_Project"
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
          v-model="value.ClsRevisit_RequestService.RequestService_Info.NIdWorkItem"
          cdcName="NIdWorkItem"
          label="کد رهگیری"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.ClsRevisit_RequestService.RequestService_Info.CI_Region"
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
          v-model="value.ClsRevisit_RequestService.RequestService_Info.RequesterRegion"
          cdcName="RequesterRegion"
          label="ناحیه"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_RequestService.RequestService_Info.Boulevard"
          cdcName="Boulevard"
          label="آدرس مسیر حفاری بلوار"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_RequestService.RequestService_Info.MainStreet"
          cdcName="MainStreet"
          label="خیابان اصلی"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_RequestService.RequestService_Info.ByStreet"
          cdcName="ByStreet"
          label="خیابان فرعی"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_RequestService.RequestService_Info.MainAlley"
          cdcName="MainAlley"
          label="کوچه اصلی"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_RequestService.RequestService_Info.ByAlley"
          cdcName="ByAlley"
          label="کوچه فرعی"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-map-measure
          v-model="value.ClsRevisit_RequestService.RequestService_Info.DigPathLength"
          cdcName="DigPathLength"
          label="طول ترسیم"
          label-width="80px"
          required
          :validations="['required', validations.DigPathLength]"
          m="r"
        />
      </FormControl>
    </FormRow>
    <div class="row q-mb-sm">
      <text-template
        label="توضیحات درخواست"
        label-width="80px"
        v-model="value.ClsRevisit_RequestService.RequestService_Info.Description"
        cdcName="Description"
        type="textarea"
        :rows="2"
        m="r"
      />
    </div>
          <safa-grid
            v-model="value.ClsRevisit_RequestService.RequestService_Time"
            cdcName="drillingLicense"
            title="مدت و زمان اجرای عملیات حفاری (مجوز)"
            :columns="requestServiceTimeColumns"
            height="100%"
            max-height="100%"
            min-height="200px"
            fit
            m="r"
            paginate
            :pageSize="20"
          />
  </fit>
</template>

<script>
import Joi from "joi"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      name: "TotlaInfoReviewEve",
      redirectNameOptions: [],
      drawingLengthModal: false,
      validations: {
        DigPathLength: Joi.custom(
          function (value, helper) {
            if (this.value.ClsRevisit_RequestService.RequestService_Info.DigPathLength === 0) {
              return helper.message("مقدار 0 برای طول ترسیم مجاز نمی باشد.")
            }
            return true
          }.bind(this)
        )
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
    "value.ClsRevisit_RequestService.RequestService_Info.CI_RequesterType": {
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
        const { data } = await this.$services.excavation.getClsCIRedirectName({ CI_RequesterType: this.value.ClsRevisit_RequestService?.RequestService_Info?.CI_RequesterType ?? 0 })
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
