<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20c96248-c0c2-4da0-bb07-9480b0c95dce"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadResult" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab" :padding="false" class="fit">
          <template v-slot:tabs>
            <tab-menu name="forms" label="فرم ها" />
            <tab-menu name="reports" label="گزارشات" />
          </template>
          <tab-content name="forms">
            <safa-datatable
              v-model="model.CI_ExecLevel"
              :columns="reviewEngineersAffairsFormsColumns"
              fit
              paginate
              hideHeader
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              :selectable="false"
              @ShowFormClick="showCurrentForm"
              :take="20"
              :bordered="false"
              cdcName="CI_ExecLevel"
            />
          </tab-content>
          <tab-content name="reports">
            <safa-datatable
            v-model="model.reviewEngineers"
              :columns="reviewEngineersAffairsReportsColumns"
              fit
              paginate
              hideHeader
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              :selectable="false"
              :take="20"
              :bordered="false"
              cdcName="reviewEngineers"
            />
          </tab-content>
        </safa-tabs>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UReviewEngineersAffairs",
      title: "بازبینی امور مهندسین",
      formKey: "9c83fb3c-a233-436d-b5c3-3184af41ca90",
      main: true,
      activeTab: "forms",
      reviewEngineersAffairsFormsColumns: [
        { field: "ShowForm", title: "نمایش", width: "70px", editor: "action" },
        { field: "TaskTitel", title: "عنوان", width: "100px", editor: "date" },
        {
          field: "AssingToUserName",
          title: "آخرین کاربری که روی فرم کار کرده",
          width: "200px"
        },
        { field: "TaskStartDate", title: "تاریخ", width: "100px", editor: "date" },
        { field: "TaskStartTime", title: "ساعت", width: "100px" }
      ],
      reviewEngineersAffairsReportsColumns: [
        { field: "ExecLevel", title: "وضعیت", width: "100px" },
        { field: "IdentityCode", title: "کد مهندس", width: "100px" },
        { field: "NidWorkItem", title: "کد ارجاع", width: "100px" },
        {
          field: "RevisitExecDate",
          title: "تاریخ بازدید",
          width: "100px",
          editor: "date"
        },
        { field: "IsAcceptCaption", title: "عنوان گزارش", width: "100px" },
        {
          field: "SecretariatDate",
          title: "تاریخ دبیرخانه",
          width: "100px",
          editor: "date"
        },
        {
          field: "SecretariatNo",
          title: "شماره دبیرخانه",
          width: "100px"
        },
        {
          field: "AcceptDate",
          title: "تاریخ تایید",
          width: "100px",
          editor: "date"
        },
        {
          field: "AcceptTime",
          title: "ساعت تایید",
          width: "100px"
        },
        {
          field: "AcceptDescription",
          title: "شرح تایید",
          width: "200px"
        },
        {
          field: "RevokeDate",
          title: "تاریخ عدم تایید",
          width: "100px",
          editor: "date"
        },
        {
          field: "RevokeTime",
          title: "ساعت عدم تایید",
          width: "100px"
        },
        {
          field: "RevokeDescription",
          title: "شرح عدم تایید",
          width: "200px"
        }
      ],
      loadResult: null,
      model: {
        CI_ExecLevel: [],
        reviewEngineers: []
      }
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.loadObj()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar("UFireVisitingAgents")
    }
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payLoad = {
        pCI_Year: new PersianDate().toCalendar("persian").year().toString(),
        pNidEngineer: "00000000-0000-0000-0000-000000000000",
        pNidWorkItem: this.selectedRequest.NidWorkItem, //  "321459"
        pDistricts: 1,
        pCI_ExecLevels: null,
        IsSara10: true,
        pStatus: "1,2,3,4",
        From: 1,
        To: 200
      }
      this.$services.engineers
        .GetBuildingExecRepInfoMainList(payLoad)
        .then(async ({ data }) => {
          this.loadResult = this.getResponse(data)
          if (this.loadResult.success) {
            // this.model =
            //   this.loadResult.data.GetBuildingExecRep_Info_MainListResult;
            debugger
            this.model.CI_ExecLevel = this.selectedRequest.Task
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.bizCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })
        .catch((err) => {
          console.error("err :>> ", err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    showCurrentForm (row) {
      console.log(row.dataItem)
      // debugger;
    }
  }
}
</script>
