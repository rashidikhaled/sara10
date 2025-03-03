<template>
  <fit>
    <safa-status :result="result"></safa-status>
    <div class="row q-col-gutter-md q-pa-sm">
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
    <div>
      <safa-datatable
        v-model="results.UserList"
        cdcName="resultsUserList"
        helper="userListPose"
        :m="mode"
        @dbclick="dbclick"
        :loadingAnimation="false"
        @selectedChange="selectedChange"
        hide-toolbar
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
        height="100%"
        max-height="100%"
        title="کاربران"
        fit
      ></safa-datatable>
    </div>
    <div class=" flex justify-end q-pa-sm">
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
import loaderMixin from "src/mixins/loaderMixin"
// import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
export default {
  mixins: [baseFormMixin, loaderMixin],
  data: function () {
    return {
      userNameOrLastname: null,
      result: null,
      results: { UserList: [] },
      selectedUser: null
    }
  },
  props: {
    title: String,
    formKey: String,
    name: String
  },
  methods: {
    // search () {
    //   this.showLoading()
    //   let data = {
    //     search: this.userNameOrLastname

    //     // pUser: {
    //     //   FirstName: this.firstName,
    //     //   LastName: this.lastName,
    //     //   GUID: '00000000-0000-0000-0000-000000000000',
    //     //   UserName: this.firstName,
    //     //   HaveImage: false,
    //     //   _LoadFullData: false
    //     // },
    //     // PageIndex: 0,
    //     // PageSize: 20
    //   }
    //   this.$services.security
    //     .searchUsersPaging(data)
    //     .then(async ({ data }) => {
    //       this.result = this.getResponse(data)
    //       if (this.result.success) {
    //         this.results = this.result.data
    //         // const strNosaziCode = convertNosaziCodeObjectToString(
    //         //   this.baseNosaziCode
    //         // )
    //         // if (!this.isView) {
    //         //   await this.log({
    //         //     action: this.logActions.view,
    //         //     bizCode: strNosaziCode,
    //         //     bizCodeTitle: 'strNosaziCode'
    //         //   })
    //         // }
    //         // this.isView = true
    //       }
    //     })
    //     .catch(response => {
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },
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
                bizCodeTitle: "userName"
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
    },
    selectedChange (row) {
      this.selectedUser = row.dataItem
    },

    choosenUsersHandler () {
      if (this.selectedUser) {
        this.$emit("returnToMainform", this.selectedUser)
      }
    },
    dbclick ({ event, target, row }) {
      this.selectedUser = row
      this.$emit("returnToMainform", this.selectedUser)
    }
  }
}
</script>
