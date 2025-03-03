<template>
  <safa-form :id="formKey" :caption="title">
    <form-wrapper :title="title" :padding="false">
      <fit>
        <safa-grid
          fit
          :columns="managerListColumn"
          v-model="managerList"
          m="r"
          height="100%"
          max-height="100%"
          min-height="100%"
          @selection:changed="selectedChange"
          :show-selected-checkbox="true"
          :allowMultipleSelection="true"
          :suppressRowClickSelection="false"
          :bordered="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
        />
      </fit>
      <template #footer>
        <btn-default label="انتخاب" @click="selectedManager" />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: ["formKey", "name"],
  data () {
    return {
      title: "اضافه کردن گروه",
      managerListColumn: [
        { field: "username", title: "نام کاربری", width: "120px" },
        { field: "firstName", title: "نام", width: "100px" },
        { field: "lastName", title: "نام خانوادگی", width: "120px" },
        { field: "email", title: "ایمیل", width: "100px" },
        { field: "IDNumber", title: "کدملی", width: "100px" },
        { field: "tel", title: "تلفن", width: "100px" },
        { field: "mobile", title: "تلفن همراه", width: "100px" },
        { field: "fatherName", title: "نام پدر", width: "100px" },
        { field: "description", title: "توضیحات", width: "100px" }
      ],
      managerList: [],
      rowResult: null,
      selectedManagerItems: null
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$services.security
        .userList()
        .then(async ({ data }) => {
          this.rowResult = this.getResponse(data)
          if (this.rowResult.success) {
            this.managerList = this.rowResult.data.data.list
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    selectedChange (params) {
      this.selectedManagerItems = params.api.getSelectedRows()?.[0]
      // this.selectedManagerItems = e.dataItem
    },
    selectedManager () {
      if (this.selectedManager) {
        this.$emit("selectedManager", this.selectedManagerItems)
      } else this.showError("لطفا یک کاربر را انتخاب نمایید.")
    }
  }
}
</script>
