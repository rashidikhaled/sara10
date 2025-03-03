<template>
  <fit>
    <safa-status :result="result"></safa-status>
    <div class="row q-col-gutter-sm q-pa-sm">
      <safa-text
        v-model="userNameOrLastname"
        cdcName="userNameOrLastname"
        class="col-12 col-md-4"
        label="نام کاربری / نام خانوادگی"
        @keyup.enter="search"
      />
      <div>
        <btn-search @click="search"/>
      </div>
    </div>
    <safa-datatable
      v-model="results.UserList"
      :addRow="false"
      :allowCopy="false"
      :allowMultipleSelection="false"
      :deleteRow="false"
      :show-selected-checkbox="false"
      cdcName="UserList"
      fit
      height="100%"
      helper="userListPose"
      m="r"
      max-height="100%"
      title="کاربران"
      @dbclick="dbclick"
      @selectedChange="selectedChange"
    />
    <div class="q-pa-sm">
      <btn-save
        :disable="!selectedUser"
        label="انتخاب"
        @click="choosenUsersHandler"
      />
    </div>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'

export default {
  mixins: [baseFormMixin],
  data () {
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
    // search() {
    //   this.showLoading();
    //   let data = {
    //     search: this.userNameOrLastname,
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
    //   };
    //   this.$services.security
    //     .searchUsersPaging(data)
    //     .then(({ data }) => {
    //       this.result = this.getResponse(data);

    //       if (this.result.success) {
    //         this.userList = this.result.data.data.list;
    //       }

    //       this.hideLoading();
    //     })
    //     .catch((response) => {
    //       this.hideLoading();

    //       this.serverError();
    //     });
    // },
    search () {
      debugger
      if (this.userName !== '') {
        this.showLoading()
        let data = {
          from: 1,
          to: 100,
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
                bizCodeTitle: 'userName'
              })
              this.results.UserList = this.result.data.data.list
              this.results.UserList.forEach((x) => {
                x.location = 'شرکت صفا رایانه'
              })
            }
          })
          .catch((response) => {
            this.showError('  خطا در اتصال')
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
        this.$emit('returnToMainform', this.selectedUser)
      }
    },
    dbclick ({ event, target, row }) {
      this.selectedUser = row
      this.$emit('returnToMainform', this.selectedUser)
    }
  }
}
</script>
