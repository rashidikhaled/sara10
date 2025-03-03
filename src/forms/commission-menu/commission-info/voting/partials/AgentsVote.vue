<template>
  <form-wrapper :title="title">
    <template #header>
      <safa-status :result="getCommissionVoteTrepassesRes" />
    </template>
    <fit>
      <div id="agent-grid" style="height: 100% !important">
        <div class="agent-header-clipper" style="padding: 0 5px">
          <div
            class="agent-header q-pa-sm flex no-wrap"
            :style="{ minWidth: `${viewportWidth + 10}px` }"
          >
            <div
              v-for="(col, colIndex) in voteIssuedColumns"
              :key="`${col.field}_${colIndex}`"
              class="agent__col"
              :style="{ minWidth: parseInt(`${col.width || 70}`) + 'px' }"
            >
              {{ col.title }}
            </div>
          </div>
        </div>
        <div class="agent-body">
          <!-- value.Commission_VoteList -->
          <q-intersection
            v-for="row in GroupVoteTrepass"
            :key="row.NidCommission"
            transition="fade"
            class="ckrow_wrap"
            once
          >
            <!-- row -->
            <VoteStatusTemplate
              @update:expandable="updateExpandable({ row, status: $event })"
              @update:selected="updateSelected({ row, value: $event })"
              :Comm_Trepass="row.Comm_Trepass"
              :row="row.Comm_Vote"
              selectable
              :isSelected="row.IsSelected"
              :style="{ minWidth: `${viewportWidth}px` }"
            />
          </q-intersection>
        </div>
      </div>
    </fit>
    <template v-slot:footer>
      <btn-default label="انتخاب" @click="addToParentVoteTrePassList" />
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  components: {},

  data () {
    return {
      title: "رای نماینده ها",
      name: "AgentsVote",
      formKey: "41CA1DA7-9FD5-4479-9466-6BB462B261C4",
      GroupVoteTrepass: [],
      voteIssuedColumns: [
        {
          field: "VotePriority",
          title: "ترتیب صدور",
          width: "100px"
        },
        {
          field: "CI_VoteType",
          title: "نوع رای",
          width: "150px",
          editor: "combo",
          domain: "Commission100"
        },
        { field: "VoteValue", title: "مقدار رای", width: "200px" },
        { field: "VoteNo", title: "شماره رای", width: "150px" },
        { field: "VoteDate", title: "تاریخ رای", width: "100px" },
        { field: "Vote_Comments", title: "شرح رای", width: "400px" },
        {
          field: "CI_Evaluation",
          title: "ارزیابی دفاتر",
          width: "150px",
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "IsNote7Action",
          title: "اعمال تبصره 7",
          width: "100px",
          editor: "checkbox"
        }
      ],
      getCommissionVoteTrepassesRes: null
    }
  },
  computed: {
    viewportWidth () {
      return (
        20 +
        this.voteIssuedColumns
          .map((x) => parseInt(`${x.width || 160}`))
          .reduce((total, one) => total + one, 0)
      )
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    updateExpandable ({ row, status }) {
      /// implement
      row.isExpanded = status
    },
    updateSelected ({ row, value }) {
      const index = this.GroupVoteTrepass.findIndex(
        (x) => x.Comm_Vote.NidVote === row.Comm_Vote.NidVote
      )
      this.GroupVoteTrepass.splice(
        index,
        1,
        Object.freeze({
          ...this.GroupVoteTrepass[index],
          IsSelected: value
        })
      )
    },
    getGroupVoteTrepass (CommissionVoteTrepasses) {
      // this function is lookalike getGroupVoteTrepass in Uvoting but possibly diffrent
      if (
        CommissionVoteTrepasses !== null &&
        CommissionVoteTrepasses.length > 0
      ) {
        let tmpList = CommissionVoteTrepasses.groupJoin(
          CommissionVoteTrepasses,
          function (i) {
            return i.NidVote
          },
          function (j) {
            return j.NidVote
          },
          function (i, j) {
            return {
              Comm_Vote: i, // صدور رای
              Comm_Trepass: j // گرید تخلفات زیر صدور رای
            }
          }
        )
          .groupBy((i) => i.Comm_Vote.NidVote)
          .select((i) => i.first())
        // .orderBy((i) => i.Comm_Vote.VoteDate);
        this.GroupVoteTrepass = tmpList.map((x) => {
          return { ...x, IsSelected: false }
        })
      } else {
        this.GroupVoteTrepass = []
      }
    },
    loadData () {
      this.showLoading()
      const payload = {
        PRequest: {
          NIDCommission: this.selectedNidCommission
          // NIDVote: "00000000-0000-0000-0000-000000000000",
          // NidProc: "00000000-0000-0000-0000-000000000000",
          // NidAgent: "00000000-0000-0000-0000-000000000000",
          // NidTaskState: "00000000-0000-0000-0000-000000000000",
          // NidUser: "00000000-0000-0000-0000-000000000000",
          // SelectedDate: 0,
          // CheckExistVoteToArchiveByNidCommission: false,
          // CheckExistVoteToArchiveByReportName: false,
          // IsActive: false,
          // IsSara10: false,
          // ISRelapse: false,
          // IsRegion: false,
          // IsdeleteArchive: false,
        }
      }
      this.$services.commissions
        .getCommissionVoteTrepasses(payload)
        .then(async ({ data }) => {
          this.getCommissionVoteTrepassesRes = this.getResponse(data)

          if (this.getCommissionVoteTrepassesRes.success) {
            this.log({
              action: this.logActions.view,
              bizCode: this.selectedNidCommission,
              bizCodeTitle: "NidCommission",
              nosaziCode: this.selectedCommission?.BizCode ?? '',
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
            })
            this.getGroupVoteTrepass(
              this.getCommissionVoteTrepassesRes.data
                .GetCommissionVoteTrepassesResult.Commission_VoteTrepasses
            )
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    addToParentVoteTrePassList () {
      let selectedGroupVoteTrepass =
        this.GroupVoteTrepass.filter((f) => f.IsSelected) || []

      if (selectedGroupVoteTrepass.length > 0) {
        this.$emit("onAddVoteTrepassToList", selectedGroupVoteTrepass)
      }
    }
  }
}
</script>
<style lang="scss">
#agent-grid {
  margin: 10px;
  border-radius: 10px;
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);

  .agent-header-clipper {
    height: calc(48px - 8px);
    overflow: hidden;
    border-bottom: 1px solid #eee;

    .agent-header {
      white-space: nowrap;
      height: 40px;
      align-items: center;

      .vot__col {
        display: inline-block;
        white-space: nowrap;
        font-size: 10px;
        padding: 0 8px;
        color: #202020;
        cursor: default;
        position: relative;
        text-align: center;

        &:after {
          content: "";
          width: 1px;
          height: 12px;
          background-color: rgba(0, 0, 0, 0.1);
          align-self: stretch;
          display: inline-block;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          margin: 0;
          padding: 0;
        }
      }
    }
  }

  .agent-body {
    min-height: 0;
    height: 0;
    flex-grow: 1;
    overflow: auto;
    scroll-behavior: smooth;
    will-change: scroll-position;

    .ckrow_wrap {
      min-height: 36px;

      &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      }
    }
  }

  .agent-footer {
    height: 34px;
  }
}
</style>
