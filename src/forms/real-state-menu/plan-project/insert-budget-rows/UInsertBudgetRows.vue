<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getCIBudgetRowRes" />
        <safa-status :result="saveCIBudgetRowRes" />
      </template>
      <fit>
        <safa-grid
          v-model="CI_BudgetRow"
          cdcName="CI_BudgetRow"
          :columns="budgetColumns"
          :suppressRowClickSelection="true"
          :allowMultipleSelection="true"
          height="100%"
          max-height="100%"
          min-height="200px"
          fit
          :m="mode"
          paginate
        />
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
        >
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "وارد کردن ردیف بودجه",
      formKey: "6A37C8DA-A5FB-4020-885C-39634EFBEF1C",
      name: "UInsertBudgetRows",
      main: true,

      // grid
      budgetColumns: [
        {
          field: 'isSelectedNode',
          title: '',
          width: 45,
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          title: "کد ردیف بودجه",
          field: "ID"
        },
        {
          title: "عنوان ردیف بودجه",
          field: "Title"
        }
      ],
      CI_BudgetRow: [],

      // services
      getCIBudgetRowRes: null,
      saveCIBudgetRowRes: null
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {}
      this.$services.ES.getCIBudgetRow(payload)
        .then(({ data }) => {
          this.getCIBudgetRowRes = this.getResponse(data)
          if (this.getCIBudgetRowRes.success) {
            this.CI_BudgetRow =
              this.getCIBudgetRowRes.data.GetCI_BudgetRowResult.CI_BudgetRow.map(e => ({ ...e, isSelectedNode: false }))
            // this.log({
            //   action: this.logActions.view,
            //   bizCode: "",
            //   bizCodeTitle: ""
            // })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      this.showLoading()
      const payload = {
        PObj: {
          CI_BudgetRow: this.CI_BudgetRow
        }
      }
      this.$services.ES.saveCIBudgetRow(payload)
        .then(({ data }) => {
          this.saveCIBudgetRowRes = this.getResponse(data)
          if (this.saveCIBudgetRowRes.success) {
            this.isEditable = false
            this.loadObj()
            // this.log({
            //   action: this.logActions.save,
            //   bizCode: "",
            //   bizCodeTitle: ""
            // })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
