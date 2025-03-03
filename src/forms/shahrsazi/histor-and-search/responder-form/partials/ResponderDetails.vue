<template>
  <fit>
    <safa-tabs v-model="activeTab" height="100%" :bordered="false">
      <template v-slot:tabs>
        <tab-menu
          name="performedActivityList"
          label="لیست فعالیت های صورت گرفته"
        />
        <tab-menu name="description" label="گزارشات" />
        <tab-menu name="CheckList" label="چک لیست" />
        <tab-menu name="fishList" label="فیش های درآمدی" />
      </template>
      <template #after>
        <div class="flex items-center" style="margin-top: -6px">
          <q-btn
            size="sm"
            flat
            round
            color="primary"
            dense
            @click="$emit('close')"
          >
            <q-icon size="20px">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                />
                <path
                  d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                  fill="none"
                />
                <path
                  d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41z"
                />
              </svg>
            </q-icon>
          </q-btn>
        </div>
      </template>
      <tab-content name="performedActivityList" :padding="false">
        <safa-grid
          :columns="performedActivityColumns"
          v-model="performedActivityResult"
          :filterable="true"
          fit
          m="r"
          height="600px"
          maxHeight="100%"
          minHeight="0"
          cdcName="performedActivityResult"
        />
        <!-- v-if="showDetails" @itemDetailClick="handleShowDetail" -->
        <!-- <div v-else>
          <btn-back
            class="q-ma-sm"
            @click="handleHideDetail"
            label="بازگشت به لیست"
          />
          <safa-datatable
            title="جزییات فعالیت صورت گرفته"
            :columns="performedFormsAndReaportList"
            v-model="getTaskLogFormResult"
            :filterable="true"
            class="fit"
            m="r"
            margin="0"
            height="100%"
            maxHeight="100%"
            minHeight="0"
          />
        </div> -->
      </tab-content>
      <tab-content name="description">
        <safa-datatable
          :columns="columns"
          fit
          :bordered="false"
          v-model="reportList"
          @showClick="report"
        />
      </tab-content>
      <tab-content
        name="CheckList"
        title="چک لیست"
        v-if="activeTab === 'CheckList'"
      >
        <task-check-list
          :nidProc="selectedResponse.NidProc"
          :nidTask="currentNidTask"
          :readonly="true"
        ></task-check-list>
      </tab-content>
      <tab-content name="fishList">
        <UFishList
          v-model="allFiches"
          :title="title"
          :name="name"
          :formKey="formKey"
          @reload="reloadAllFiches"
        />
      </tab-content>
    </safa-tabs>
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import TaskCheckList from "./TaskCheckList"
import UFishList from "./UFishList.vue"

export default {
  name: "ResponderDetails",
  components: { UFishList, TaskCheckList },
  mixins: [baseFormMixin],
  data: function () {
    return {
      activeTab: "performedActivityList",
      performedActivityColumns: [
        // {
        //   field: 'itemDetail',
        //   title: 'نمایش جزییات',
        //   width: '90px',
        //   editor: 'action'
        // },
        { field: "TaskTitel", title: "نام فعالیت", width: "100px" },
        { field: "CreatedByName", title: "درخواست کننده کار", width: "160px" },
        { field: "AssingToUserName", title: "ارجاع شده به", width: "140px" },
        { field: "TaskClosedUserName", title: "انجام دهنده", width: "130px" },
        {
          field: "TaskStartDate",
          title: "تاریخ شروع",
          editor: "date",
          width: "120px"
        },
        { field: "TaskStartTime", title: "ساعت شروع", width: "120px" },
        {
          field: "TaskCloseDate",
          title: "تاریخ پایان",
          editor: "date",
          width: "140px"
        },
        { field: "TaskCloseTime", title: "ساعت پایان", width: "130px" },
        { field: "TaskDesc", title: "توضیحات", width: "110px" }
      ],
      allFiches: [],
      columns: [
        { field: "show", title: "نمایش", width: "70px", editor: "action" },
        {
          field: "ReportTitle",
          title: "عنوان",
          width: "auto"
        }
        // { field: 'ReportName', title: 'عنوان لاتین', width: 200 }
      ],
      reportList: [{ ReportTitle: "توضیحات درخواست" }]
    }
  },

  props: {
    performedActivityResult: Array,
    selectedResponse: Object,
    currentNidTask: String,
    formKey: String,
    title: String,
    name: String
  },
  methods: {
    reloadAllFiches () {
      this.getAllFiches()
    },
    getAllFiches () {
      const nidProc = this.selectedResponse
        ? this.selectedResponse.NidProc
        : "00000000-0000-0000-0000-000000000000"
      this.showLoading()
      this.$services.SD.getAllFicheByIncomeList(
        { pNidProc: nidProc },
        this.config
      )
        .then(async ({ data }) => {
          let allFichseResult = this.getResponse(data)
          if (allFichseResult.success) {
            let allFichseResults = allFichseResult.data
            this.allFiches = []
            if (
              allFichseResults &&
              allFichseResults.All_FicheByIncomeList &&
              allFichseResults.All_FicheByIncomeList.length > 0
            ) {
              allFichseResults.All_FicheByIncomeList.forEach((x) => {
                this.allFiches.push({
                  ...x.Income_Fiche,
                  IncomeCreateDate: x.IncomeCreateDate,
                  IncomeCreateTime: x.IncomeCreateTime
                })
              })
              this.allFiches.map((x) => {
                if (x.EumFicheStatus === 0) {
                  x.class = "dutyFichePermanent"
                } else if (x.EumFicheStatus === 1) {
                  x.class = "dutyFicheConfirm"
                } else if (x.EumFicheStatus === 2) {
                  x.class = "dutyFichePrint"
                } else if (x.EumFicheStatus === 7) {
                  x.class = "dutyFicheTempExport"
                } else if (x.EumFicheStatus === 3) {
                  x.class = "dutyFicheConfirmBank"
                } else if (x.EumFicheStatus === 4) {
                  x.class = "dutyFicheRevoke"
                }
                return x
              })
              await this.log({
                action: this.logActions.view,
                bizCode: nidProc,
                bizCodeTitle: "NidProc"
              })
            }
          }
        })
        .catch((response) => {
          console.error("load fish list", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    report () {
      const reportPath = "/Sara8Reports/rptRequestComments"
      const queryParams = {
        District: this.selectedResponse.District,
        NidProc: this.selectedResponse.NidProc,
        NidNosaziCode: this.selectedResponse.NidNosaziCode,
        NIdUser: this.getNidUser(),
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@80"
      }
      this.showReport(reportPath, queryParams)
    }
  },
  mounted () {
    // this.loadPerformedActivity()
    // if (this.currentNidTask === null) {
    //   this.currentNidTask = '00000000-0000-0000-0000-000000000000'
    // }
    // console.log(this.currentNidTask, 'ggg')
  },
  watch: {
    NidProc () {
      this.loadPerformedActivity()
    }
  }
}
</script>
