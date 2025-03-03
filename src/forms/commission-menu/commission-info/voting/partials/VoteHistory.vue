<template>
  <fit>
    <safa-status :result="getHistoryVotesRes" />
    <safa-grid
      pagination
      :masterDetail="true"
      v-model="rowData"
      cdcName="voteIssued"
      :detailCellRendererParams="detailCellRendererParams"
      :columns="voteIssuedColumn"
      :rowGroupPanelShow="'always'" />
    <!--    <div id="vote-grid" class="full-height" >
          <div class="vote-header-clipper" style="padding: 0 5px">
            <div
              class="vote-header q-pa-sm flex no-wrap"
              :style="{ minWidth: `${viewportWidth + 10}px` }"
            >
              <div
                v-for="(col, colIndex) in voteIssuedColumn"
                :key="`${col.field}_${colIndex}`"
                class="vot__col"
                :style="{ minWidth: parseInt(`${col.width || 70}`) + 'px' }"
              >
              {{ col.title }}</template>
              </div>
            </div>
          </div>
          <div class="vote-body">
            &lt;!&ndash; value.Commission_VoteList &ndash;&gt;
            <q-intersection
              v-for="row in GroupVoteTrepass"
              :key="row.NidCommission"
              transition="fade"
              class="ckrow_wrap"
              once
            >
              &lt;!&ndash; row &ndash;&gt;
                &lt;!&ndash; @update:expandable="updateExpandable({ row, status: $event })"
                @editVote="issuedVoteHandler(row)" &ndash;&gt;
              <HistoryVoteGridTemplate
                :Comm_Trepass="row.Comm_Trepass"
                :row="row.Comm_Vote"
                :style="{ minWidth: `${viewportWidth}px` }"
              />
            </q-intersection>
          </div>
        </div>-->
    <!-- <safa-datatable
      title="سوابق رای"
      helper="voteHistoryColumns"
      v-model="votesHistory"
      m="r"
      min-height="200px"
      max-height="100%"
      height="100%"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      paginate
    /> -->
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

// import HistoryVoteGridTemplate from './HistoryVoteGridTemplate.vue'
// import fakeData from '../fakeData/historyVote.json'

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  // components: { HistoryVoteGridTemplate },
  props: {
    formKey: String
  },
  data () {
    return {
      title: "سوابق رای",
      name: "VoteHistory",
      // GroupVoteTrepass: [],
      detailCellRendererParams: {
        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          columnDefs: [
            {
              field: "Id",
              title: "كد تخلف",
              width: "180px"
            },
            {
              field: "Title",
              title: "تخلف",
              width: "140px"
            },
            {
              field: "CI_Years",
              title: "سال تخلف",
              width: "180px"
            },
            {
              field: "TrepassValue",
              title: "مقدار تخلف",
              width: "180px",
              calculateFunc: ({ column, rows }) => {
                if (!rows) return ""
                const result = rows.reduce(function (a, b) {
                  return a + parseFloat(b[column.field])
                }, 0)
                return `جمع کل : ${result}`
              }
            },
            {
              field: "MinPenalty",
              title: "حداقل جریمه",
              width: "180px",
              editor: 'money'
            },
            {
              field: "MaxPenalty",
              title: "حداکثر جریمه",
              width: "180px",
              editor: 'money'
            },
            {
              field: "Floor",
              title: "طبقه",
              width: "180px"
            },
            {
              field: "UsingGroupTitle",
              title: "گروه کاربری اصلی موجود",
              width: "180px"
            },
            {
              field: "K",
              title: "ارزش معاملاتی طبق تبصره 11 ماده صد(k)",
              width: "220px"
            },

            {
              field: "KCoeffiecient",
              title: "ضریب ارزش معاملاتی طبق تبصره 11 ماده صد(k)",
              width: "220px"
            },
            {
              field: "CI_SazeType",
              title: "نوع اسکلت",
              editor: "combo",
              domain: "Commission100",
              width: "180px"
            },
            {
              field: "BuildingStep", title: "مرحله ساختمانی"
            },
            {
              field: "DescriptionOfSystem", title: "شرح مقدار سیستمی"
            },
            {
              field: "TrepassValueAmar", title: "متراژ کسر از آمار"
            },
            {
              field: "CI_TrepassStatus",
              title: "وضعیت تخلف",
              editor: "combo",
              domain: "Commission100",
              width: "180px"
            },
            {
              field: "CalculationPrice",
              title: "قیمت محاسباتی",
              width: "180px"
            }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: (params) => {
          setTimeout(function () {
            params.successCallback(params.data.Comm_Trepass)
          }, 1000)
        }
      },
      rowData: [],
      voteIssuedColumn: [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          field: "VotePriority",
          title: "ترتیب صدور",
          width: "180px",
          cellRenderer: "agGroupCellRenderer"
        },
        {
          field: "CI_VoteType",
          title: "نوع رای",
          editor: "combo",
          domain: "Commission100",
          width: "150px"
        },
        { field: "VoteValue", title: "مقدار رای", width: "200px" },
        { field: "UrbanNidKartablItem", title: "شماره ارجاع", width: "150px" },
        { field: "VoteNo", title: "شماره رای", width: "150px" },
        // { field: "CommissionText", title: "شماره کمیسیون", width: "150px" },
        {
          field: "CI_Commission",
          title: "شماره کمیسیون",
          width: "160px",
          domain: "Commission100",
          editor: "combo"
        },
        { field: "CI_CommissionType", title: "نوع کمیسیون", width: "150px" },
        { field: "VoteDate", title: "تاریخ رای", width: "180px" },
        { field: "CommissionDate", title: "تاریخ کمیسیون", width: "180px" },
        { field: "Vote_Comments", title: "شرح رای", width: "400px" }
      ].map((c) => ({ ...c, enableRowGroup: true })),

      getHistoryVotesRes: null
    }
  },
  created () {
    this.getHistoryVotes()
  },
  computed: {
    // viewportWidth () {
    //   return (
    //     20 +
    //     this.voteIssuedColumn
    //       .map((x) => parseInt(`${x.width || 160}`))
    //       .reduce((total, one) => total + one, 0)
    //   )
    // },
  },
  methods: {
    // eslint-disable-next-line camelcase
    getGroupVoteTrepass (Commission_VoteTrepasses) {
      if (
        // eslint-disable-next-line camelcase
        Commission_VoteTrepasses !== null &&
        Commission_VoteTrepasses.length > 0
      ) {
        let tmpList = Commission_VoteTrepasses.groupJoin(
          Commission_VoteTrepasses,
          function (i) {
            return i.NidVote
          },
          function (j) {
            return j.NidVote
          },
          function (i, j) {
            return {
              ...i,
              Comm_Vote: i, // صدور رای
              Comm_Trepass: j // گرید تخلفات زیر صدور رای
            }
          }
        )
          .groupBy((i) => i.Comm_Vote.NidVote)
          .select((i) => i.first())
        // .orderBy((i) => i.Comm_Vote.VoteDate);
        this.rowData = tmpList
      } else {
        this.rowData = []
      }
    },
    getHistoryVotes () {
      const payload = {
        PRequest: {
          NosaziCode: this.selectedCommission.BizCode,
          NIDCommission: this.selectedNidCommission
        }
      }
      this.showLoading()
      this.$services.commissions
        .getHistoryVotes(payload)
        .then(async ({ data }) => {
          this.getHistoryVotesRes = this.getResponse(data)
          this.getGroupVoteTrepass(this.getHistoryVotesRes.data.GetHistoryVotesResult.Commission_VoteTrepasses)
          this.log({
            action: this.logActions.view,
            bizCode: this.selectedNidCommission ?? '',
            bizCodeTitle: "NosaziCode",
            nosaziCode: this.selectedCommission?.BizCode ?? '',
            saveDesc: `بارگذاری اطلاعات تاریخچه آرا ${this.title} انجام گردید.`
          })
        })
        .catch(error => {
          console.error(error)
        }).finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
