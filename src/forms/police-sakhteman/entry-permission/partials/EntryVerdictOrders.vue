<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-datepicker
          label="از تاریخ"
          label-width="70px"
          v-model="value.fromDate"
          cdcName="fromDate"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تا تاریخ"
          label-width="70px"
          v-model="value.toDate"
          cdcName="toDate"
        />
      </FormControl>
      <nosazi-code-input
        label="کد نوسازی"
        label-width="70px"
        v-model="value.baseNosaziCode"
        cdcName="baseNosaziCode"
        @enter="search"
      />
      <div class="flex items-center q-gutter-x-lg">
        <safa-checkbox
          label="دارای اجرای حکم"
          v-model="value.haveWarrantResult"
          cdcName="haveWarrantResult"
        />
        <safa-checkbox
          label="نمایش احکام منقضی شده"
          v-model="value.limitWarrantResult"
          cdcName="limitWarrantResult"
        />
      </div>
      <div>
        <btn-default label="جستجو" @click="search" />
      </div>
    </FormRow>
    <!-- entryVerdictOrders -->
    <safa-grid
      :value="entryVerdictOrdersList"
      :columns="entryVerdictOrdersColumns"
      title="حکم ورود"
      cdcName="entryVerdictOrdersList"
      @row-click="selectedRow"
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  props: {
    formKey: String,
    title: String,
    name: String,
    value: Object,
    entryVerdictOrdersList: Array
  },
  data () {
    return {
      entryVerdictOrdersColumns: [
        {
          field: 'itemDetail',
          title: '',
          btnIcon: 'keyboard_arrow_left',
          width: '120px',
          lockPosition: true,
          pinned: 'right',
          cellStyle: {
            padding: 0,
            margin: 0
          },
          btnTitle: 'انتخاب',
          cellRenderer: 'agCallbackBtn',
          callback: (params) => this.selectDetailsItem(params)
        },
        { field: "NosaziCode", title: "کد نوسازی", width: "150px" },
        { field: "OperationNo", title: "شماره عملیات", width: "100px" },
        {
          field: "OperationDate",
          title: "تاریخ عملیات",
          editor: "date",
          width: "100px"
        },
        { field: "UserName", title: "کاربر", width: "150px" },
        { field: "RequesterName", title: "درخواست کننده", width: "300px" },
        { field: "BreakDate", title: "تاریخ تقاضا", width: "150px" },
        { field: "WarningNo", title: "شماره تقاضا", width: "100px" },
        { field: "Comments", title: "توضیحات", width: "450px" }
      ],
      NidWorkitem: 0

    }
  },

  methods: {
    async selectDetailsItem (e) {
      console.log("selectHokmDetails", e)
      this.$emit('selectHokmDetails', e)
    },
    selectedRow ({ row }) {
      this.$emit("selectedRow", row)
    },
    search () {
      this.$emit('search')
    },
    activeTabHandler (tab) {
      this.activeTab = tab
    }
  }
}
</script>
