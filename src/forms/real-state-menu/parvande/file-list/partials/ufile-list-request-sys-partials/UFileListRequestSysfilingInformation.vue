<template>
  <fit>
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-combo
          label="نوع درخواست"
          label-width="90px"
          v-model="value.Request_Info.CI_RequestType"
          :options="list"
          source-type="local"
          :m="m"
          required
          :validations="['required']"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع متقاضی"
          label-width="90px"
          v-model="value.Request_Info.CI_RequesterType"
          :m="m"
          domainName="Estate"
          ciName="CI_RequesterType"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نوع مالکیت متقاضی"
          label-width="90px"
          v-model="value.Request_Info.CI_OwnerType"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام متقاضی"
          label-width="90px"
          v-model="value.Request_Info.RequesterName"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد ملی متقاضی"
          label-width="90px"
          v-model="value.Request_Info.RequesterNationalCode"
          :m="m"
          required
          :validations="['required', 'number', validations.nationalCode]"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد پستی"
          label-width="90px"
          v-model="value.Request_Info.PostCode"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن متقاضی"
          label-width="90px"
          v-model="value.Request_Info.TelNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن همراه متقاضی"
          label-width="90px"
          v-model="value.Request_Info.CellphoneNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="آدرس متقاضی"
          label-width="90px"
          v-model="value.Request_Info.RequesterAddress"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="توضیحات"
          label-width="90px"
          v-model="value.Request_Info.Description"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <safa-grid
      v-model="value.Request_Attorney"
      :columns="requestAttorneyColumns"
      fit
      title="مشخصات وکیل/وکلا"
      min-height="150px"
      height="100%"
      max-height="100%"
      :m="m"
      :showRowNumber="false"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Joi from "joi"
import customValidation from "src/utils/customValidation"

export default {
  mixins: [baseFormMixin],

  props: {
    formKey: String,
    value: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    },
    NidProc: String
  },

  data () {
    return {
      cIRequestType: 0,
      cIRequestTypeOptions: [],

      requestAttorneyColumns: [
        {
          field: "AttorneyLetterNo",
          title: "شماره وکالت"
        },
        {
          field: "AttorneyLetterDate",
          title: "تاریخ وکالت",
          editor: "date"
        },
        {
          field: "AttorneyBureauNo",
          title: "شماره دفترخانه تنظیم وکالت"
        },
        {
          field: "AttorneyName",
          title: "نام وکیل"
        },
        {
          field: "Address",
          title: "آدرس"
        },
        {
          field: "Description",
          title: "توضیحات"
        }
      ],
      list: [],
      validations: {
        nationalCode: customValidation.nationalCode,
        mobile: Joi.string().length(11).required().messages({
          "string.base": `تلفن همراه میبایست به صورت عدد باشد.`,
          "string.length": `تلفن همراه میبایست 11 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        })
      }
    }
  },
  mounted () {
    this.loadCombo()
  },
  methods: {
    async loadCombo () {
      this.showLoading()
      const payload = { NidProc: this.NidProc }
      try {
        const { data } = await this.$services.ES.getRequestInfo(payload)
        this.getRequestInfoRes = this.getResponse(data)
        if (this.getRequestInfoRes.success) {
          this.list =
              this.getRequestInfoRes?.data?.GetRequest_InfoResult?.CI_RequestType.map(
                (e) => {
                  return {
                    ...e,
                    ID: e.ID,
                    Title: e.Title
                  }
                }
              )

          // await this.log({
          //   action: this.logActions.view,
          //   bizCode: this.NidProc,
          //   bizCodeTitle: "NidProc",
          //   nosaziCode: "",
          //   nidWorkItem: "",
          //   saveDesc: ``
          // })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
