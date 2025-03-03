<template>
  <form-wrapper hideTitle>
      <safa-status :result="revokeRes" />
    <fit>
      <safa-grid
        title="لیست پیش نویس ها"
        helper="commissionDraft"
        v-model="value.CommissionList_InNidProc"
        cdcName="CommissionList_InNidProc"
        fit
        height="100%"
        max-height="100%"
        min-height="400px"
        :pageSize="20"
        paginate
        :suppressRowClickSelection="false"
        @row:dblclick="handleDbClick"
        ref="grid"
      />
    </fit>
    <template v-slot:footer>
      <!-- spId="e82d44fe-b425-455d-87e5-d695fdeb3634" -->
      <form-actions :showEditButton="false">
        <btn-default
          label="جدید"
          @click="newBtn"
          spCaption="جدید"
          spId="ac5d2fa4-43f7-44f4-ae1a-09206a7fa66a"
        />

        <btn-default
          label="ابطال پیش نویس"
          spCaption="ابطال پیش نویس"
          spId="e82d44fe-b425-455d-87e5-d695fdeb3634"
          @click="revokeBtn"
        />
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    formKey: String,
    title: String,
    name: String,
    type: Object,
    value: {
      default: () => {
        return { CommissionList_InNidProc: [] }
      }
    }
  },
  data () {
    return {
      revokeRes: null
    }
  },
  computed: {
    config () {
      return { config: { District: this.selectedDistrict } }
    }
  },
  methods: {
    newBtn () {
      this.$emit("newBtn")
    },
    handleDbClick ({ data }) {
      this.$emit("selectedComHandler", data)
    },
    revokeBtn () {
      const row = this.$refs.grid.gridApi.getSelectedRows()[0]
      this.showLoading()
      this.$services.SC.cancelCommission(
        {
          pNidCommision: row.GIDCommissionSubSys || "00000000-0000-0000-0000-000000000000",
          pUser: this.currentUser
        },
        this.config
      )
        .then(async ({ data }) => {
          this.revokeRes = this.getResponse(data)
          if (this.revokeRes.success) {
            this.showSuccess("پیش نویس با موفقیت باطل شد.")
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ابطال پیش نویس پرونده ی ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            this.$emit("loadObj")
          }
        })
        .catch((e) => {
          this.serverError()
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
