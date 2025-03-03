<template>
  <fit>
    <expantion-section v-model="expantionState1" default-open title="اطلاعات درخواست" class="q-mt-sm">
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="شماره درخواست"
          label-width="90px"
          m="r"
          v-model="value.ClsRequest_Info.Request_Info.NidWorkItem"
          cdcName="NidWorkItem"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع درخواست"
          label-width="90px"
          v-model="value.ClsRequest_Info.Request_Info.CI_RequestType"
          cdcName="CI_RequestType"
          m="r"
          domainName="Commission77"
          ref="requestTypeRef"
          ciName="CI_RequestType"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ ایجاد"
          label-width="90px"
          m="r"
          v-model="value.ClsRequest_Info.Request_Info.CreateDate"
          cdcName="CreateDate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد پستی"
          label-width="90px"
          m="r"
          v-model="value.ClsRequest_Info.Request_Info.PostCode"
          cdcName="PostCode"
        />
      </FormControl>
        <!-- <FormControl>
          <safa-text
            label="مبلغ"
            label-width="90px"
            m="r"
            v-model="value.ClsRequest_Info.Request_Info.Price"
            cdcName="Price"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="از تاریخ"
            label-width="90px"
            m="r"
            v-model="value.ClsRequest_Info.Request_Info.FromDate"
            cdcName="FromDate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تا تاریخ"
            label-width="90px"
            m="r"
            v-model="value.ClsRequest_Info.Request_Info.ToDate"
            cdcName="ToDate"
          />
        </FormControl> -->
      </FormRow>
    </expantion-section>
    <!-- </expantion-section>
    <expantion-section default-open title="اخطاریه"> -->

      <expantion-section v-model="expantionState2" default-open title="اطلاعات اخطاریه" class="q-mt-sm">
      <FormRow>
        <FormControl>
          <safa-text
            label="شماره پیش آگهی "
            label-width="90px"
            m="r"
            v-model="value.ClsRequest_Notice.Request_Notice.NoticeNo"
            cdcName="NoticeNo"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مهلت اخطار (روز)"
            label-width="90px"
            :m="m"
            v-model="value.ClsRequest_Notice.Request_Notice.DeadlineDate"
            cdcName="DeadlineDate"
            :validations="['required', 'number']"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            :m="m"
            label="نوع اخطاریه"
            label-width="90px"
            ciName="CI_NoticeType"
            v-model="value.ClsRequest_Notice.Request_Notice.CI_NoticeType"
            domainName="Commission77"
            validations="required"
          />
        </FormControl>
        <text-template
          label="توضیحات اخطاریه"
          v-model="value.ClsRequest_Notice.Request_Notice.DescNotice"
          formKey="FEBFD969-F640-41C7-A83A-2E572742AECB"
          cdcName="DescNotice"
          label-width="90px"
          :rows="1"
          class="col-12"
          :m="m"
        />
      </FormRow>
      </expantion-section>
      <expantion-section v-model="expantionState3" default-open title="اطلاعات پرونده" class="q-mt-sm">
        <FormRow>
        <FormControl>
          <safa-text
            label="مبلغ"
            label-width="90px"
            m="r"
            v-model="value.ClsRequest_Info.Request_Info.Price"
            cdcName="Price"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="از تاریخ"
            label-width="90px"
            m="r"
            v-model="value.ClsRequest_Info.Request_Info.FromDate"
            cdcName="FromDate"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تا تاریخ"
            label-width="90px"
            m="r"
            v-model="value.ClsRequest_Info.Request_Info.ToDate"
            cdcName="ToDate"
          />
        </FormControl>
        </FormRow>
      </expantion-section>
      <!-- <q-separator class="q-my-sm" />
      <safa-grid
      v-model="value.ClsRequest_Notice.Request_Notice.Result_Request_Notice"
          title="لیست شروع عملیات"
          :columns="ShowTypeAlertGrid"
          m="r"
          sortable
          paginate
          :paginationPageSize="50"
          :allowMultipleSelection="false"
        /> -->
    <!-- </expantion-section> -->
    <div class="fit" />
    <safa-notice v-if="canceled === true">وضعیت پیش آگاهی: ابطال شده</safa-notice>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: {
      type: String,
      default: "r"
    },
    canceled: {
      type: Boolean,
      default: false
    },
    payload: Object
  },
  data () {
    return {
      name: "Alerts",
      expantionState1: true,
      expantionState2: true,
      expantionState3: true
      // ShowTypeAlertGrid: [
      //   {
      //     field: "NoticeNo",
      //     title: "شماره پیش آگاهی",
      //     width: "150px"
      //   },
      //   {
      //     field: "DeadlineDate",
      //     title: "مهلت اخطار (روز)",
      //     width: "150px"
      //   },
      //   {
      //     field: "CI_NoticeType",
      //     title: "نوع اخطاریه",
      //     width: "150px",
      //     domain: "Commission77"
      //   },
      //   {
      //     field: "DescNotice",
      //     title: "توضیحات اخطاریه",
      //     width: "920px"
      //   }
      // ]
    }
  }
}
</script>
