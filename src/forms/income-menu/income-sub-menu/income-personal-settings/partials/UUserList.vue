<template>
  <div>
    <safa-status class="col-12" :result="result"></safa-status>
    <div class="row full-width q-col-gutter-md items-center">
      <safa-text
        label="نام کاربری/نام خانوادگی"
        class="col-12 col-sm-4"
        v-model="userNameOrLastname"
        cdcName="userNameOrLastname"
        @keyup.enter="search"
      ></safa-text>
      <div class="col-md-1">
        <q-btn label="جستجو" class="btn-search" icon="search" @click="search" />
      </div>
    </div>
    <div class="row q-mt-md q-pa-md">
      <safa-datatable
        v-model="results.UserList"
        cdcName="resultsUserList"
        ref="grid"
        name="grid"
        helper="userList"
        :m="mode"
        :addRow="false"
        class="col-12"
        style="height:75vh"
        @dbclick="dbclick"
        title="کاربران"
      ></safa-datatable>
    </div>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import loaderMixin from 'src/mixins/loaderMixin'
// import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
export default {
  mixins: [baseFormMixin, loaderMixin],
  data: function () {
    return {
      userNameOrLastname: null,
      result: null,
      results: { UserList: [] },
      selectedUser: null,
      isView: false
    }
  },
  props: {
    title: String,
    formKey: String,
    main: String
  },
  methods: {
    search () {
      this.showLoading()
      let data = {
        search: this.userNameOrLastname
      }
      this.$services.security
        .searchUsersPaging(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            // const strNosaziCode = convertNosaziCodeObjectToString(
            //   this.baseNosaziCode
            // )
            // if (!this.isView) {
            //   await this.log({
            //     action: this.logActions.view,
            //     bizCode: strNosaziCode,
            //     bizCodeTitle: 'strNosaziCode'
            //   })
            // }
            // this.isView = true
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
