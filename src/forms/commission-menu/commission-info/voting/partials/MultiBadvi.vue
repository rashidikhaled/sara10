<template>
  <form-wrapper title="تایید رای بدوی">
    <fit>
      <div id="vote-grid" style="height: 100% !important">
        <div class="vote-header-clipper" style="padding: 0 5px">
          <div
            class="vote-header q-pa-sm flex no-wrap"
            :style="{ minWidth: `${viewportWidth + 10}px` }"
          >
            <div
              v-for="(col, colIndex) in multiBadviColumns"
              :key="`${col.field}_${colIndex}`"
              class="vot__col"
              :style="{ minWidth: parseInt(`${col.width || 70}`) + 'px' }"
            >
              <template>{{ col.title }}</template>
            </div>
          </div>
        </div>
        <div class="vote-body">
          <!-- value.Commission_VoteList -->
          <q-intersection
            v-for="row in multiBadviModel.grid_vote"
            :key="row.NidVote"
            transition="fade"
            class="ckrow_wrap"
            once
          >
            <!-- row -->
            <VoteStatusTemplate
              @update:expandable="updateExpandable({ row, status: $event })"
              @update:selected="updateSelected({ row, value: $event })"
              :Comm_Trepass="row.Comm_Trepass"
              m="e"
              :row="row.Comm_Vote"
              selectable
              :isSelected="row.IsSelected"
              :showExpandIcon="false"
              :style="{ minWidth: `${viewportWidth}px` }"
            />
          </q-intersection>
        </div>
      </div>
    </fit>

    <template v-slot:footer>
      <form-actions :m="mode" :showEditButton="false">
        <btn-save label="تایید" @click="onMultiBadvi" />
        <btn-cancel label="انصراف" @click="hide" />
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  props: {
    multiBadviModel: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      multiBadviColumns: [
        { field: "VotePriority", title: "ترتیب صدور", width: "100px" },
        {
          field: "CI_VoteType",
          title: "نوع رای",
          width: "150px",
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "VoteValue",
          title: "مقدار رای",
          width: "200px",
          editor: "checkbox"
        },
        { field: "VoteNo", title: "شماره رای", width: "150px" },

        {
          field: "CI_VoteTypeDetail",
          title: "کد رای",
          width: "150px",
          editor: "combo",
          domain: "Commission100"
        },
        { field: "VoteDate", title: "تاریخ رای", width: "100px" },
        {
          field: "IsNote7Action",
          title: "اعمال تبصره 7",
          width: "100px",
          editor: "checkbox"
        },
        { field: "Vote_Comments", title: "شرح رای", width: "400px" }
      ]
    }
  },

  computed: {
    viewportWidth () {
      return (
        20 +
        this.multiBadviColumns
          .map((x) => parseInt(`${x.width || 160}`))
          .reduce((total, one) => total + one, 0)
      )
    }
  },

  methods: {
    onMultiBadvi () {
      this.$emit("onMultiBadvi")
    },

    hide () {
      this.$emit("hide")
    },

    updateExpandable ({ row, status }) {
      /// implement
      row.isExpanded = status
    },

    updateSelected ({ row, value }) {
      const index = this.multiBadviModel.grid_vote.findIndex(
        (x) => x.Comm_Vote.NidVote === row.Comm_Vote.NidVote
      )
      this.multiBadviModel.grid_vote.splice(
        index,
        1,
        Object.freeze({
          ...this.multiBadviModel.grid_vote[index],
          IsSelected: value
        })
      )
    }
  }
}
</script>
