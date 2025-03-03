<template>
  <section>
    <div class="row q-col-gutter-md">
      <div class="col-4">
        <safa-text
          v-model="loadDataPrequest.pUser.FirstName"
          label="نام کاربری"
          @keyup.enter="loadData"
        />
      </div>

      <div class="col-4">
        <safa-text
          v-model="loadDataPrequest.pUser.LastName"
          label="نام خانوادگی"
          @keyup.enter="loadData"
        />
      </div>

      <div class="col-4">
        <q-btn class="btn-search" icon="search" @click="loadData"/>
      </div>

      <div class="col-12">
        <safa-datatable
          v-model="formModel.UserList"
          :allowMultipleSelection="false"
          :loadingAnimation="false"
          :selectable="true"
          helper="nosazi.userList"
          m="r"
          title="لیست کاربران"
          @dbclick="dbclick"
        />
      </div>
    </div>
  </section>
</template>

<script>
import baseFormmixin from 'src/mixins/baseFormmixin.js'

export default {
  data: function () {
    return {
      loadDataPrequest: {
        'pUser': {
          'DeviceID': null,
          'Enabled': null,
          'FirstName': null,
          'GUID': '00000000-0000-0000-0000-000000000000',
          'IdNumber': null,
          'IsAdmin': null,
          'JobLocationName': null,
          'LastName': null,
          'Mobile': null,
          'NationalCode': null,
          'Post': null,
          'Sex': null,
          'UserCodeSara7': null,
          'UserName': null,
          '_HaveImage': 'false',
          '_LoadFullData': 'false'
        },
        'PageIndex': '0',
        'PageSize': '20'
      },
      requestResult: {},
      formModel: {
        UserList: []
      }
    }
  },
  mixins: [baseFormmixin],
  methods: {
    loadData () {
      this.showLoading()
      this.$services.security.searchUsersPaging(this.loadDataPrequest, {
        config: {
          District: 1
        }
      }).then(response => {
        this.hideLoading()

        this.requestResult = this.getResponse(response.data)

        if (!this.requestResult.hasError) {
          this.formModel = this.requestResult.data

          // console.log('///////////this.formModel', this.formModel)
        }
      }).catch(error => {
        this.hideLoading()

        this.showError(error.message)
      })
    },
    dbclick (row) {
      this.$emit('dbclick', row)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
