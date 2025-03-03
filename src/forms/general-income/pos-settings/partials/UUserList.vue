<template>
  <div>
    <safa-status :result="result"></safa-status>
    <div class="row full-width q-col-gutter-md items-center">
      <safa-text
        label="نام کاربری/نام خانوادگی"
        class="col-12 col-sm-4"
        v-model="userNameOrLastname"
        @keyup.enter="search"
      ></safa-text>
      <div class="col-md-1">
        <q-btn label="جستجو" class="btn-search" icon="search" @click="search" />
      </div>
    </div>
    <safa-datatable
      v-model="results.UserList"
      helper="userList"
      :m="mode"
      class="q-mt-md q-pa-md"
      @dbclick="dbclick"
      :loadingAnimation="false"
      title="کاربران"
    ></safa-datatable>
  </div>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"

export default {
  mixins: [baseFormMixin],
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
      }
      this.$services.security
        .searchUsersPaging(data)
        .then(({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
          }

          this.hideLoading()
        })
        .catch(response => {
          this.hideLoading()

          this.serverError()
        })
    },
    dbclick (e) {
      this.selectedUser = e.row
      this.$emit("returnToMainform", this.selectedUser)
    }
  }
}
</script>
