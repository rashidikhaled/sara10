<template>
  <div>
    <safa-status
      class="col-12"
      :result="result"
    ></safa-status>
    <div class="row full-width q-col-gutter-md items-center">
      <safa-text
        label="نام کاربری/نام خانوادگی"
        class="col-12 col-sm-4"
        v-model="userNameOrLastname"
        cdcName="userNameOrLastname"
        @keyup.enter="search"
      ></safa-text>
      <div class="col-md-1">
        <q-btn
          label="جستجو"
          class="btn-search"
          icon="search"
          @click="search"
        />
      </div>
    </div>
    <div class="row q-mt-md q-pa-md">
      <safa-datatable
        v-model="results.UserList"
        cdcName="UserList"
        helper="userList"
        :m="mode"
        class="col-12"
        @dbclick="dbclick"
        :loadingAnimation="false"
        title="کاربران"
      ></safa-datatable>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      userNameOrLastname: null,
      result: null,
      results: { UserList: [] },
      selectedUser: null
    }
  },
  methods: {
    search () {
      this.showLoading()
      let data = {
        search: this.userNameOrLastname
        // pUser: {
        // FirstName: this.firstName,
        // LastName: this.lastName,
        // GUID: '00000000-0000-0000-0000-000000000000',
        // UserName: this.firstName,
        // HaveImage: false,
        // _LoadFullData: false
        // },
        // PageIndex: 0,
        // PageSize: 20
      }
      this.$services.security
        .searchUsersPaging(data)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    dbclick (event, dataItem, target) {
      this.selectedUser = dataItem
      this.$emit('returnToMainform', this.selectedUser)
    }
  }
}
</script>
