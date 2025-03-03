<template>
  <fit>
    <safa-status :result="result"></safa-status>
    <div class="row full-width q-col-gutter-md q-pa-sm">
      <safa-text
        label="نام کاربری/نام خانوادگی"
        class="col-12 col-sm-4"
        v-model="userNameOrLastname"
        cdcName="userNameOrLastname"
        @keyup.enter="search"
      ></safa-text>
      <div>
        <btn-search @click="search" />
      </div>
    </div>
    <div class="fit">
      <safa-datatable
        v-model="results.UserList"
        cdcName="resultsUsersGrid"
        helper="userListPose"
        :m="mode"
        height="100%"
        max-height="100%"
        @dbclick="dbclick"
        @selectedChange="selectedChange"
        :loadingAnimation="false"
        title="کاربران"
      ></safa-datatable>
    </div>
    <div class="flex justify-end q-pa-sm">
      <btn-save
        label="انتخاب"
        :disable="!selectedUser"
        @click="choosenUsersHandler"
      />
    </div>
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    title: String,
    formKey: String,
    name: String
  },
  data: function () {
    return {
      userNameOrLastname: null,
      result: null,
      results: { UserList: [] },
      selectedUser: null
    }
  },
  methods: {
    dbclick (event, dataItem, target) {
      // console.log(event, 'event.row')
      this.selectedUser = event.row
      this.$emit("returnToMainform", this.selectedUser)
    },
    choosenUsersHandler () {
      if (this.selectedUser) {
        this.$emit("returnToMainform", this.selectedUser)
      }
    },
    selectedChange (row) {
      this.selectedUser = row.dataItem
    },
    search () {
      if (this.userName !== "") {
        this.showLoading()
        let data = {
          from: 1,
          to: 20,
          search: this.userNameOrLastname
        }
        this.$services.security
          .userList(data)
          .then(async ({ data }) => {
            this.result = this.getResponse(data)
            if (this.result.success) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.userName,
                bizCodeTitle: "userName",
                saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
              })
              this.results.UserList = this.result.data.data.list
              this.results.UserList.forEach((x) => {
                x.location = "شرکت صفا رایانه"
              })
            }
          })
          .catch((response) => {
            this.showError("  خطا در اتصال")
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.load()
      }
    }
  }
}
</script>
