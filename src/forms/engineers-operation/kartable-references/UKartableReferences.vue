<template>
  <form-wrapper :title="title" :padding="true" fullscreen hide-title hide-close>
    <template #header>
      <safa-status :result="getTaskTitleRes" />
    </template>
    <fit>
      <safa-grid
        title="کارتابل ارجاعات"
        m="r"
        height="100%"
        maxHeight="100%"
        minHeight="300px"
        filterable
        sortable
        :addRow="false"
        paginate
        :allowCopy="false"
        :deleteRow="false"
        :bordered="true"
        :pageSize="20"
        :cacheBlockSize="20"
        :animateRows="true"
        :showRowNumber="true"
        :paginationPageSize="50"
        :allowMultipleSelection="false"
        :value="kartableReferencesResult"
        :columns="kartableReferencesColumns"
        @row:click="selectedChange"
        ref="kartableReferences"
        :suppressRowClickSelection="false"
      >
        <template v-slot:header>
          <div class="flex">
            <div class="flex items-center q-mr-sm q-gutter-x-sm">
              <safa-combo
                label=" سال"
                label-width="30px"
                v-model="cmbYear"
                cdcName="cmbYear"
                domainName="engineer"
                ciName="CI_Years"
                style="min-width: 170px; max-width: 94px; font-size: 13px"
              />
              <safa-text
                label="کد ارجاع"
                label-width="80px"
                v-model="txtWorkitem"
                cdcName="txtWorkitem"
                type="number"
                @keydown.enter="getInfo"
              />
            </div>
            <q-btn
              dense
              color="primary"
              label="بازآوری"
              icon="refresh"
              size="sm"
              @click="getInfo"
              class="q-mr-sm shadow-1"
              padding="0 8px"
            />
            <q-btn
              v-for="(button, i) in customButtons"
              flat
              dense
              color="grey-8"
              :title="button.text"
              :icon="button.icon"
              size="sm"
              @click="button.onClick"
              :key="i"
              class="q-mr-sm"
            />
          </div>
        </template>
        <!-- <template #cell-ArchiveReport="{ row, col }">
            <btn-default
              class="full-width q-mx-sm"
              label="آرشیو گزارشات"
              @click="archiveReportClick(row)"
            />
          </template>
          <template #cell-Report="{ row, col }">
            <btn-default
              class="full-width q-mx-sm"
              label="گزارش"
              @click="reportClick(col)"
            />
          </template>
          <template #cell-DescriptionReport="{ row, col }">
            <btn-default
              class="full-width q-mx-sm"
              label="گزارش توضیحات"
              @click="descriptionReportClick(col)"
            />
          </template> -->
      </safa-grid>
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from 'src/mixins/mapMixin'
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

export default {
  name: "UKartableReferences",
  mixins: [baseFormMixin, kartableReferencesMixin, mapMixin],

  data () {
    return {
      title: "کارتابل ارجاعات",
      name: "UKartableReferences",
      formKey: "90bba2fe-5569-45b3-9a7b-eb92b3b19ca1",
      main: true,
      customButtons: [
        {
          icon: "archive",
          onClick: this.printReport,
          text: "چاپ آرشیو"
        },
        {
          icon: "summarize",
          onClick: this.report,
          text: "گزارش"
        }
      ],
      kartableReferencesColumns: [
        // #todo
        {
          field: "ArchiveReport",
          title: "",
          filterable: false,
          lockPosition: true,
          pinned: "right",
          cellRenderer: 'agArchiveCellRenderer',
          width: "100px"
        },
        {
          field: "Report",
          title: "",
          filterable: false,
          lockPosition: true,
          pinned: "right",
          cellRenderer: 'agReportCellRenderer',
          width: "70px"
        },
        {
          field: "DescriptionReport",
          title: "",
          filterable: false,
          lockPosition: true,
          pinned: "right",
          cellRenderer: 'agDescriptionReportCellRenderer',
          width: "110px"
        },
        // {
        //   field: "Report",
        //   title: "",
        //   editor: "action",
        //   width: "70px",
        // },
        // {
        //   field: "DescriptionReport",
        //   title: "",
        //   editor: "action",
        //   width: "110px",
        // },
        // {
        //   field: "isSelectedNode",
        //   title: "",
        //   width: "74px",
        //   filterable: true,
        //   headerCheckboxSelection: true,
        //   lockPosition: true,
        //   pinned: "right",
        //   editor: "selection"
        // },
        {
          field: "CI_Years",
          title: "سال",
          width: "150px",
          editor: "combo",
          domain: "engineer"
        },
        {
          field: "NidWorkItem",
          title: "کد ارجاع",
          width: "100px"
        },
        {
          field: "CodeString",
          title: "کد نوسازی",
          width: "150px"
        },
        {
          field: "RequestType",
          title: "نوع درخواست",
          width: "125px"
        },
        {
          field: "OwnerName_Full",
          title: "مالک",
          width: "180px"
        },
        {
          field: "infrastructure",
          title: "زیربنا",
          width: "85px"
        },
        {
          field: "RegisterPlack",
          title: "پلاک ثبتی",
          ignoreDefaultCol: true,
          width: "260px"
        },
        {
          field: "TaskTitle",
          title: "مرحله درخواست",
          width: "155px"
        },
        {
          field: "ReferDate",
          title: "تاریخ ارجاع",
          width: "115px"
        },
        {
          field: "OperationStartDate",
          title: "تاریخ شروع عملیات ساختمانی",
          width: "200px"
        },
        {
          field: "CI_StudyField",
          title: "فعالیت",
          width: "105px",
          editor: "combo",
          domain: "engineer"
        },
        {
          field: "CI_Ability",
          title: "صلاحیت",
          width: "115px",
          editor: "combo",
          domain: "CI_SaraM1"
        }
      ],

      context: {},

      cmbYear: 0,
      txtWorkitem: 0,
      isShowConfirmed: false,

      getTaskTitleRes: null
    }
  },

  computed: {
    kartableReferencesResult () {
      const list = this.$store.getters["engineerOperation/kartableRows"]
      return list || []
    }
  },

  created () {
    this.getInfo()
  },

  watch: {
    cmbYear () {
      this.getInfo()
    }
  },

  methods: {
    async getInfo () {
      try {
        this.context.CI_Years = this.cmbYear
        if (this.txtWorkitem === null || this.txtWorkitem.toString() === "") {
          this.context.NidWorkitem = 0
        } else this.context.NidWorkitem = Number(this.txtWorkitem)
        this.txtWorkitem = this.context.NidWorkitem.toString()
        this.showLoading()
        await this.$store.dispatch("engineerOperation/fetchKartableRows", {
          CI_Years: this.context.CI_Years,
          NidWorkitem: this.context.NidWorkitem,
          isShowConfirmed: this.isShowConfirmed
        })
      } finally {
        this.hideLoading()
      }
    },
    async selectedChange (e) {
      const { selectedRow = e.data } = e
      const nosaziCode = selectedRow.CodeString
      this.showCodeOnMap(nosaziCode)
      // this.showLoading()
      await this.$store.dispatch(
        "engineerOperation/setSelectedExecRep",
        selectedRow
      )
      e.api.refreshCells()
      // try {
      //   const { data } = await this.$services.eng.getTaskTitle({
      //     NidProc:
      //       selectedRow.NidProc || "00000000-0000-0000-0000-000000000000"
      //   })
      //   this.getTaskTitleRes = this.getResponse(data)
      //   if (this.getTaskTitleRes.success) {
      //     // selectedRow.TaskTitle =
      //     //   this.getTaskTitleRes.data.GetTaskTitleResult.TaskTitle

      //   }
      // } catch (e) {
      //   console.error(e)
      //   this.serverError()
      // } finally {
      //   this.hideLoading()
      // }
    },

    printReport () {},
    report () {}
  },

  beforeDestroy () {
    this.$store.dispatch("engineerOperation/setSelectedExecRep", null)
  }
}
</script>
