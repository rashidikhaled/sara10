<template>
  <fit>
    <safa-datatable
      fit
      helper="randomSendGetAllolumns"
      v-model="value.RandomSendGetAll"
      cdcName="RandomSendGetAll"
      m="e"
      height="100%"
      max-height="100%"
      min-height="200px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :pageSize="20"
      :allowCopy="false"
      paginate
    />
    <form-row class="q-my-sm">
      <FormControl>
        <safa-datepicker
          label="تاریخ کمیسیون"
          label-width="80px"
          v-model="commissionDate"
          cdcName="commissionDate"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="کمیسیون"
          label-width="80px"
          v-model="commissionType"
          cdcName="commissionType"
          :options="taskStates"
          sourceType="local"
          required
          validations="required"
        />
      </FormControl>
      <div>
        <btn-default @click="send" label="ارسال" :disable="lockSendBtn" />
      </div>
    </form-row>
    <safa-datatable
      fit
      v-model="randomSendResult"
      cdcName="randomSendResult"
      :columns="sendingColumns"
      m="r"
      height="100%"
      max-height="100%"
      :pageSize="20"
      min-height="200px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      paginate
    />
  </fit>
</template>

<script>
export default {
  props: ["value", "lockSendBtn", "randomSendResult"],

  data () {
    return {
      sendingColumns: [
        {
          field: "UrbanNidKartablItem",
          title: "کد ارجاع",
          width: "100px"
        },
        {
          field: "CodeString",
          title: "کد نوسازی",
          width: "100px"
        },
        {
          field: "OwnerName",
          title: "نام مالک",
          width: "300px"
        },
        {
          field: "CI_Commission",
          editor: "combo",
          domain: "Commission100",
          title: "مرحله",
          width: "100px"
        },
        {
          field: "CommissionDate",
          title: "تاریخ کمیسیون",
          width: "200px",
          editor: "date"
        }
      ],
      commissionDate: "",
      commissionType: null,
      CI_Commission: 0
    }
  },
  methods: {
    send () {
      this.$emit("send", {
        commissionDate: this.commissionDate,
        commissionType: this.commissionType,
        randomSendGetAll: this.value.RandomSendGetAll,
        ciCommission: this.CI_Commission
      })
    }
  },

  computed: {
    taskStates () {
      if (this.value && this.value.TaskState) {
        const list = []
        list.push(
          ...this.value.TaskState.map((item) => {
            let r = {}
            r.ID = item.NidTaskState
            r.Title = item.TaskTitle
            return r
          })
        )
        return list
      } else {
        return []
      }
    }
  },

  watch: {
    commissionType: {
      handler () {
        const ciCommissionObj = this.value.TaskState.filter(
          (item) => item.NidTaskState === this.commissionType
        )
        this.CI_Commission = ciCommissionObj[0].CI_Commission
      },
      deep: true
    }
  }
}
</script>
