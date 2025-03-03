<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="شرکت خدماتی"
          ciName="CI_RequesterType"
          label-width="120px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.CI_RequesterType
          "
          cdcName="CI_RequesterType"
          m="r"
          domain-name="Dig"
          ref="ciRequesterType"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نام تابعه"
          label-width="120px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.CI_RedirectName
          "
          m="r"
          cdcName="CI_RedirectName"
          source-type="local"
          :options="redirectNameOptions"
          :validations="['required']"
          required
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="عنوان پروژه"
          label-width="120px"
          v-model="value.ClsRequestService_Info.RequestService_Info.CI_Project"
          cdcName="CI_Project"
          m="r"
          ciName="CI_Project"
          domain-name="Dig"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد رهگیری"
          label-width="120px"
          v-model="value.ClsRequestService_Info.RequestService_Info.NIdWorkItem"
          cdcName="NIdWorkItem"
          m="r"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-combo
          label="منطقه"
          label-width="120px"
          v-model="value.ClsRequestService_Info.RequestService_Info.CI_Region"
          cdcName="CI_Region"
          ciName="CI_Region"
          domain-name="Dig"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ناحیه"
          label-width="120px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.RequesterRegion
          "
          cdcName="RequesterRegion"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="آدرس مسیر حفاری بلوار"
          label-width="120px"
          v-model="value.ClsRequestService_Info.RequestService_Info.Boulevard"
          cdcName="Boulevard"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان اصلی"
          label-width="120px"
          v-model="value.ClsRequestService_Info.RequestService_Info.MainStreet"
          cdcName="MainStreet"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان فرعی"
          label-width="120px"
          v-model="value.ClsRequestService_Info.RequestService_Info.ByStreet"
          cdcName="ByStreet"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کوچه اصلی"
          label-width="120px"
          v-model="value.ClsRequestService_Info.RequestService_Info.MainAlley"
          cdcName="MainAlley"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کوچه فرعی"
          label-width="120px"
          v-model="value.ClsRequestService_Info.RequestService_Info.ByAlley"
          cdcName="ByAlley"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="طول ترسیم"
          label-width="120px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.DigPathLength
          "
          cdcName="DigPathLength"
          m="r"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن همراه پیگیری کننده"
          label-width="120px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.FollowerCellphoneNo
          "
          cdcName="FollowerCellphoneNo"
          type="number"
          dir="ltr"
          m="r"
        />
      </FormControl>
      <FormControl class="col-12">
        <text-template
          label="توضیحات درخواست"
          label-width="120px"
          v-model="value.ClsRequestService_Info.RequestService_Info.Description"
          cdcName="Description"
          type="textarea"
          :rows="2"
          m="r"
        />
      </FormControl>
    </FormRow>
    <q-separator class="q-mb-sm" />
      <safa-grid
        title="مدت زمان و اجرای عملیات حفاری (پیشنهادی درخواست)"
        v-model="value.ClsRequestService_Info.RequestService_Time"
        cdcName="RequestService_Time"
        :columns="requestServiceTimeColumns"
        m="r"
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
    m: String,
    value: Object
  },
  data () {
    return {
      redirectNameOptions: [],
      requestServiceTimeColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          width: 130,
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "StartDate",
          title: "تاریخ شروع",
          width: "110px",
          editor: "date"
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          width: "110px",
          editor: "date"
        },
        {
          field: "Duration",
          title: "مدت(روز)",
          width: "110px"
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
    "value.ClsRequestService_Info.RequestService_Info.CI_RequesterType": {
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
        const { data } = await this.$services.excavation.getClsCIRedirectName({ CI_RequesterType: this.value.ClsRequestService_Info?.RequestService_Info?.CI_RequesterType ?? 0 })
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
