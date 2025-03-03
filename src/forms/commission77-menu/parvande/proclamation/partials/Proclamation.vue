<template>
  <fit>
    <expantion-section
      v-model="expantionState1"
      default-open
      title="اطلاعات درخواست"
    >
      <form-row class="q-mb-sm">
        <form-control>
          <safa-datepicker
            label="تاریخ درخواست"
            label-width="90px"
            m="r"
            v-model="dataModel.ClsRequest_Info.Request_Info.CreateDate"
            cdcName="CreateDate"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره درخواست"
            label-width="90px"
            m="r"
            v-model="dataModel.ClsRequest_Info.Request_Info.NidWorkItem"
            cdcName="NidWorkItem"
          />
        </form-control>
        <form-control>
          <safa-text
            label="نام مالک"
            label-width="90px"
            m="r"
            v-model="dataModel.ClsRequest_Info.Request_Info.OwnerName"
          />
        </form-control>
        <form-control>
          <nosazi-code-input
            m="r"
            label="کد نوسازی"
            v-model="dataModel.ClsRequest_Info.Request_Info.NosaziCode"
          />
        </form-control>
      </form-row>
      <form-row :xl="4" :lg="3" :md="3">
        <text-template
          label="آدرس"
          label-width="90px"
          :rows="1"
          class="col-12"
          m="r"
          v-model="dataModel.ClsRequest_Info.Request_Info.Address"
        />
      </form-row>
    </expantion-section>
    <!-- <expantion-section v-model="expantionState3" default-open title="اخطاریه(پیش آگهی)"> -->
    <safa-grid
      min-height="150px"
      height="100%"
      max-height="100%"
      fit
      :columns="columns"
      m="r"
      :allowMultipleSelection="false"
      title="پیش آگهی"
      class="q-mb-sm"
      v-model="dataModel.ClsRequest_Notice.Result_Request_Notice"
      cdcName="Request_Notice"
      :suppressRowClickSelection="false"
      ref="RequestNotice"
    />
    <!-- <form-row :xl="4" :lg="3" :md="3">
        <form-control>
          <safa-text
            label="شماره پیش آگهی"
            label-width="90px"
            m="r"
            v-model="dataModel.ClsRequest_Notice.Request_Notice.NoticeNo"
            cdcName="NoticeNo"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ پیش آگهی"
            label-width="90px"
            m="r"
            v-model="dataModel.ClsRequest_Notice.Request_Notice.NoticeDate"
            cdcName="NoticeDate"
          />
        </form-control>
      </form-row> -->
    <!-- </expantion-section> -->
    <expantion-section
      v-model="expantionState4"
      title="ثبت ابلاغیه"
      default-open
    >
      <form-row class="q-mb-sm">
        <form-control>
          <!--  v-model="dataModel.ClsRequest_Info.Request_Info.AnnouncementDate" -->
          <safa-datepicker
            label="تاریخ ابلاغیه"
            label-width="90px"
            :m="m"
            v-model="dataModel.ClsProclamation.ProclamationDate"
            cdcName="AnnouncementDate"
            required
            validations="required"
          />
        </form-control>
        <!-- v-model="dataModel.ClsRequest_Info.Request_Info.AnnouncementNo" -->
        <form-control>
          <safa-text
            label="شماره ابلاغیه"
            label-width="90px"
            :m="m"
            v-model="dataModel.ClsProclamation.ProclamationNo"
            cdcName="AnnouncementNo"
            required
            validations="required"
          />
        </form-control>
        <FormControl>
          <safa-combo
            label="نوع ابلاغیه"
            label-width="90px"
            v-model="dataModel.ClsProclamation.CI_ProclamationType"
            ciName="CI_ProclamationType"
            domainName="Commission77"
            :m="m"
            cdcName="CI_ProclamationType"
            required
            validations="required"
          />
        </FormControl>
      </form-row>
      <form-row class="q-mb-sm">
        <form-control>
          <!-- v-model="dataModel.ClsRequest_Info.Request_Info.HoldingDate" -->
          <safa-datepicker
            label="تاریخ برگزاری کمیسیون"
            label-width="90px"
            :m="m"
            v-model="dataModel.ClsProclamation.HoldingDate"
            cdcName="HoldingDate"
          />
        </form-control>
        <form-control>
          <!-- v-model="dataModel.ClsRequest_Info.Request_Info.HoldingTime" -->
          <safa-text
            label="زمان برگزاری"
            label-width="90px"
            :m="m"
            v-model="dataModel.ClsProclamation.HoldingTime"
            cdcName="HoldingTime"
          />
        </form-control>
        <FormControl>
          <safa-combo
            label="نحوه تحویل"
            label-width="90px"
            v-model="dataModel.ClsProclamation.CI_DeliveryType"
            ciName="CI_DeliveryType"
            domainName="Commission77"
            :m="m"
            cdcName="CI_DeliveryType"
            required
            validations="required"
          />
        </FormControl>
        <div class="row q-mb-sm">
          <safa-checkbox
            label="تحویل گرفته است"
            :m="m"
            v-model="dataModel.IsReceive"
            cdcName="IsReceive"
          />
        </div>
      </form-row>
      <form-row class="q-mb-sm">
        <form-control>
          <safa-datepicker
            label="تاریخ دریافت"
            label-width="90px"
            :m="m"
            v-model="dataModel.ClsProclamation.ReceiveDate"
            cdcName="ReceiveDate"
            :required="!customValidations"
            :validations="customValidations ? '' : 'required'"
          />
        </form-control>
        <form-control>
          <safa-text
            label="زمان دریافت"
            label-width="90px"
            :m="m"
            v-model="dataModel.ClsProclamation.ReceiveTime"
            cdcName="ReceiveTime"
            :required="!customValidations"
            :validations="customValidations ? '' : 'required'"
          />
        </form-control>
        <FormControl>
          <safa-combo
            label="دریافت کننده"
            label-width="90px"
            v-model="dataModel.ClsProclamation.CI_Destination"
            ciName="CI_Destination"
            domainName="Commission77"
            :m="m"
            cdcName="CI_Destination"
            :required="!customValidations"
            :validations="customValidations ? '' : 'required'"
          />
        </FormControl>
      </form-row>
      <form-row class="q-mb-sm">
        <form-control>
          <safa-text
            label="نام مامور ابلاغ"
            label-width="90px"
            :m="m"
            v-model="dataModel.ClsProclamation.AgentName"
            cdcName="AgentName"
            :required="!customValidations"
            :validations="customValidations ? '' : 'required'"
          />
        </form-control>
        <form-control>
          <safa-text
            label="کد ملی مامور ابلاغ"
            label-width="90px"
            :m="m"
            v-model="dataModel.ClsProclamation.AgentNationalCode"
            cdcName="AgentNationalCode"
            :required="!customValidations"
            :validations="customValidations ? '' : 'required'"
          />
        </form-control>
        <FormControl>
          <safa-combo
            label="مامور ابلاغ"
            label-width="90px"
            v-model="dataModel.ClsProclamation.CI_ProclamationAgent"
            ciName="CI_ProclamationAgent"
            domainName="Commission77"
            :m="m"
            cdcName="CI_ProclamationAgent"
            :required="!customValidations"
            :validations="customValidations ? '' : 'required'"
          />
        </FormControl>
      </form-row>
      <form-row class="q-mb-sm">
        <form-control>
          <safa-text
            label="نام دریافت کننده ابلاغ"
            label-width="90px"
            :m="m"
            v-model="dataModel.ClsProclamation.DestinationName"
            cdcName="DestinationName"
            :required="!customValidations"
            :validations="customValidations ? '' : 'required'"
          />
        </form-control>
        <form-control>
          <safa-text
            label="کد ملی دریافت کننده ابلاغ"
            label-width="90px"
            :m="m"
            v-model="dataModel.ClsProclamation.DestinationNationalCode"
            cdcName="DestinationNationalCode"
            :required="!customValidations"
            :validations="customValidations ? '' : ['required', validations.nationalCode]"
          />
        </form-control>
        <FormControl>
          <safa-text
            label="شماره همراه دریافت کننده ابلاغ"
            label-width="90px"
            v-model="dataModel.ClsProclamation.DestinationMobile"
            :m="m"
            cdcName="DestinationMobile"
            :required="!customValidations"
            :validations="customValidations ? '' : ['required', validations.DestinationMobile]"
          />
        </FormControl>
      </form-row>
      <form-control class="col-12">
        <!-- v-model="dataModel.ClsRequest_Info.Request_Info.DescAnnouncemen" -->
        <text-template
          label="توضیحات ابلاغیه"
          formKey="266C2A5A-ADAD-4EE8-A6BE-F622D3B1F125"
          label-width="90px"
          :rows="2"
          :m="m"
          v-model="dataModel.ClsProclamation.Description"
          cdcName="Description"
          required
          validations="required"
        />
      </form-control>
    </expantion-section>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import customValidation from "src/utils/customValidation"
import Joi from "joi"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "ابلاغیه کمیسیون(دعوت به کمیسیون)",
      name: "Proclamation",
      expantionState1: false,
      expantionState2: false,
      expantionState3: false,
      expantionState4: true,
      columns: [
        {
          field: "NoticeNo",
          title: "شماره پیش آگهی"
        },
        {
          field: "NoticeDate",
          title: "تاریخ پیش آگهی"
        },
        {
          field: "DeadlineDate",
          title: "مهلت اخطار به روز"
        },
        {
          field: "CI_NoticeType",
          title: "نوع اخطاریه",
          domain: "Commission77",
          editor: "combo"
        },
        {
          field: "DescNotice",
          title: "توضیحات",
          width: "auto"
        }
      ],
      validations: {
        nationalCode: customValidation.nationalCode,
        DestinationMobile: Joi.string().length(11).required().messages({
          "string.base": `تلفن همراه میبایست به صورت عدد باشد.`,
          "string.length": `تلفن همراه میبایست 11 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        })
      }
    }
  },
  props: {
    dataModel: Object,
    m: String,
    showFormActions: Boolean
  },
  computed: {
    customValidations () {
      return window.getConfigValue(
        "commission77Config.Proclamation.CustomValidations",
        false
      ) // این پارامتر از کانفیگ دریافت میگردد و روی نمایش لود لیست مهندسین ناظر تاثیر میگذارد
    }
  }
}
</script>
