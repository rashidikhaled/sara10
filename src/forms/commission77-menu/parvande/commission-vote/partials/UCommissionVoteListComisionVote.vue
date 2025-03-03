<template>
  <fit>
    <safa-grid
      pagination
      v-model="grdCommissionVote"
      cdcName="grdCommissionVote"
      :columns="VoteHistoryColumn"
      :suppressRowClickSelection="false"
      :allow-multiple-selection="false"
      fit
      m="r"
      height="100%"
      min-height="200px"
      max-height="100%"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      ref="voteHistoryListRef"
      @selection:changed="grdCommissionVoteSelectionChanged"
      :getRowStyle="getRowStyle"
    />
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      VoteHistoryColumn: [
        {
          field: "isSelectedNode",
          title: "",
          width: 45,
          filterable: false,
          lockPosition: false,
          pinned: "right",
          editor: "selection",
          headerCheckboxSelection: false
        },
        {
          field: "editVote",
          btnTitle: "ویرایش رای",
          cellRenderer: "agCallbackBtn",
          editor: "action",
          width: 150,
          callback: (data) => this.$emit("btnEditvoteClick", data),
          cellStyle: {
            padding: "0"
          }
        },
        { field: "CI_Commission", editor: "combo", domain: "Commission77" },
        { field: "NidWorkItem" },
        { field: "NosaziCode" },
        { field: "OwnerName", title: "نام مالک" },
        {
          field: "CI_IncomeAccountGroup",
          editor: "combo",
          domain: "Commission77"
        },
        { field: "FicheNo" },
        { field: "PriceFiche" },
        { field: "IncomeStatusFiche" },
        { field: "CI_VoteType", editor: "combo", domain: "Commission77" },
        { field: "VoteNoe" },
        { field: "VoteDate" },
        { field: "VoteValue" },
        { field: "VoteDescryption" },
        { field: "UserName", title: "کاربر صادر کننده" },
        { field: "NumberOfInstallments" },
        { field: "DutyPrice" },
        { field: "Cash" },
        { field: "Discount" }
      ],
      grdCommissionVote: [],
      cancelResult: null
    }
  },
  props: {
    formKey: String,
    name: String,
    title: String,
    value: Object,
    mode: String,
    gridContext: Object,
    saveVoteRes: Array
  },
  // grdCommissionVote: {
  //   get () {
  //     return this.gridContext.grdCommissionVote.map((m) => {
  //       debugger
  //       return {
  //         ...m,
  //         CI_Commission: this.saveVoteRes.RequestInfo.CI_Commission,
  //         NidWorkItem: this.saveVoteRes.RequestInfo.NidWorkItem,
  //         NosaziCode: this.saveVoteRes.RequestInfo.NosaziCode,
  //         SecretariatNo: this.saveVoteRes.RequestInfo.OwnerName,
  //         CI_IncomeAccountGroup: this.saveVoteRes.ListRequest_Vote[0].CI_IncomeAccountGroup,
  //         FicheNo: this.saveVoteRes.ListRequest_Vote[0].FicheNo,
  //         CI_VoteType: this.saveVoteRes.ListRequest_Vote[0].CI_VoteType
  //       }
  //     })
  //   },
  //   set () {

  //   }
  // }
  methods: {
    voteCancelingHandler () {
      const selectedRows =
        this.$refs.voteHistoryListRef.gridApi.getSelectedRows()
      if (selectedRows.length === 0) {
        this.showError("لطفا رای مورد نظر را از سوابق رای انتخاب نمایید.")
        return
      }
      const payload = {
        pRequest: {
          NidVote: selectedRows[0].NidVote
        }
      }
      this.$services.commission77
        .cancelVoteInRequest(payload)
        .then(async ({ data }) => {
          this.cancelResult = this.getResponse(data)
          if (this.cancelResult.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.value.ClsRequest_Info?.Request_Info?.NosaziCode,
              bizCodeTitle: "کد نوسازی",
              saveDesc: `عملیات ابطال در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getRowStyle ({ data }) {
      if (!data) return
      if (data.IsCancel) {
        return {
          backgroundColor: "#f69697"
        }
      }
    },
    grdCommissionVoteSelectionChanged (params) {
      if (params.api.getSelectedRows().length > 0) {
        this.$emit(
          "grdCommissionVoteSelectionChanged",
          params.api.getSelectedRows()[0]
        )
      }
    }
  }
}
</script>
