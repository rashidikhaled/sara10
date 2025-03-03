<template>
  <div>
    <safa-status
      :result="result"
      class="col-12"
    />
    <div class="row full-width q-col-gutter-md items-center">
      <safa-text
        v-model="userNameOrLastname"
        class="col-12 col-sm-4"
        label="نام کاربری/نام خانوادگی"
        @keyup.enter="search"
      />
      <div class="col-md-1">
        <q-btn
          class="btn-search"
          icon="search"
          label="جستجو"
          @click="search"
        />
      </div>
    </div>
    <div class="row q-mt-md q-pa-md">
      <safa-datatable
        v-model="results.UserList"
        :loadingAnimation="false"
        :m="mode"
        class="col-12"
        helper="userList"
        title="کاربران"
        @dbclick="dbclick"
      />
    </div>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'

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
        // pUser: {
        //   FirstName: this.firstName,
        //   LastName: this.lastName,
        //   GUID: '00000000-0000-0000-0000-000000000000',
        //   UserName: this.firstName,
        //   HaveImage: false,
        //   _LoadFullData: false
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

          this.hideLoading()
        })
        .catch(response => {
          this.hideLoading()

          this.serverError()
        })
    },
    dbclick (e) {
      this.selectedUser = e.row

      // console.log('/////e', e)
      this.$emit('returnToMainform', this.selectedUser)
    }
  }
}
</script>
