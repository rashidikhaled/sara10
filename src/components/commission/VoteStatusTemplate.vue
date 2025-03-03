
<template>

  <div>
    <div
      class="ck__summary no-wrap cursor-pointer q-pa-sm flex items-center"
      @click="rowClickHandler"
    >
    <span style="min-width: 14px;" v-if="selectable">
        <q-checkbox
          dense
          size="xs"
          @input="changeSelectedValue"
          :value="isSelected"
        />
      </span>
      <span style="min-width: 14px;">
        <q-icon
          size="17px"
          :color="isExpanded?'positive':'grey'"
          dense
          :name="isExpanded?'check':'expand_more'"
        />
      </span>
      <div
        style="min-width: 80px;max-width: 80px;"
        class="ckrow__cell flex justify-center items-center"
        dir="ltr"
            @click.prevent.stop="onEditVote"
      >
          <q-btn
            icon="edit"
            size="xs"
            :disabled="m==='r' ? true:false"
            style="white-space: nowrap;"
          />
      </div>
      <div
        style="min-width: 100px;max-width: 100px"
        :title="row.VotePriority"
        class="code-number ellipsis text-center ckrow__cell"
      >{{ row.VotePriority }}
      </div>
      <div
        style="min-width: 138px;"
        class="ckrow__cell text-center"
      >
        <safa-combo
          domainName="Commission100"
          ciName="CI_VoteType"
          m="r"
          v-model="row.CI_VoteType"
          class="col-12 col-sm-3 col-md-2"
          cdcName="CI_VoteType"
        />
      </div>
      <div
        style="min-width: 190px;max-width: 200px;"
        class="code-number ckrow__cell text-center q-ml-sm"
        dir="ltr"
        :title="row.VoteValue"
      >
        <safa-custom-text
            m="r"
            type='money'
            v-model="row.VoteValue"
            cdcName="VoteValue"/>
      </div>
      <div
        style="min-width: 150px;max-width: 150px;"
        class="ckrow__cell text-center ellipsis"
        :title="row.VoteNo"
      >
        {{ row.VoteNo }}
      </div>
      <div
        style="min-width: 100px;max-width: 100px;"
        class="ckrow__cell text-center ellipsis"
        :title="row.VoteDate"
      >
        {{ row.VoteDate }}
      </div>
      <div
        style="min-width: 150px;max-width: 150px;"
        class="ckrow__cell ellipsis"
      >
        <safa-combo
          domainName="Commission100"
          ciName="CI_Evaluation"
          m='r'
          v-model="row.CI_Evaluation"
          class="col-12 col-sm-3 col-md-2"
          cdcName="CI_Evaluation"
        />
      </div>
      <div
        style="min-width: 100px;max-width: 100px;"
        class="ckrow__cell ellipsis items-center justify-center flex"
        :title="row.IsNote7Action"
      >
        <safa-checkbox
          m="r"
          v-model="row.IsNote7Action"
          cdcName="IsNote7Action"
        />
      </div>
      <div
        dir="ltr"
        style="min-width: 400px;max-width: 400px;"
        class="ckrow__cell text-center ellipsis"
      >
        {{ row.Vote_Comments }}
      </div>
    </div>
    <div v-if="isExpanded">
      <q-slide-transition :duration="250">
        <safa-datatable2
          title="تخلفات"
          v-model="Comm_Trepass"
          height="250px"
          width="250px"
          min-height="100px"
          max-height="100%"
          paginate
          m="r"
          :showSelectedCheckbox="false"
          :allowMultipleSelection="false"
          :disableSelectionOnClick="false"
          :checkboxSelection="true"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          helper="Comm_TrepassColumns"
        >
        <!-- تاریخ ندارد  -->
        </safa-datatable2>
      </q-slide-transition>

    </div>
  </div>
</template>

<script>
export default {
  name: "VoteStatusTemplate",
  data () {
    return {
      isExpanded: false
    }
  },
  props: {
    Comm_Trepass: Array,
    row: Object,
    m: String,
    selectable: Boolean,
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.isExpanded = this.row.isExpanded
  },
  methods: {
    onEditVote () {
      this.$emit("editVote", this.row)
    },
    changeSelectedValue (value) {
      this.$emit("update:selected", value)
    },
    rowClickHandler () {
      this.isExpanded = !this.isExpanded
      this.$emit("row:click", this.row)
      this.$emit("update:expandable", !this.isExpanded)
      // this.onEditVote()
    }
  },
  watch: {
    "row.isExpanded": {
      handler () {
        this.isExpanded = this.row.isExpanded
      },
      deep: true
    }
  }
}
</script>
