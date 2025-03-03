<template>
  <fit>
    <safa-status :result="result" />
    <div class="row q-pa-sm">
      <safa-text
        label="نام کاربری / نام خانوادگی"
        v-model="userNameOrLastname"
        cdcName="userNameOrLastname"
        @keypress.enter="search"
      >
        <template v-slot:append>
          <q-icon
            style="position: relative; right: 5px; font-size: 18px"
            @click="search"
            color="primary"
            name="search"
            class="cursor-pointer"
          />
        </template>
      </safa-text>
    </div>
    <safa-grid
      title="کاربران"
      v-model="results.UserList"
      cdcName="resultsUsersGrid"
      helper="userListPose"
      m="r"
      height="100%"
      max-height="100%"
      fit
      :suppressRowClickSelection="false"
      @row:click="selectedChange"
      class="q-mx-sm"
    />
    <div class=" q-pa-sm">
      <btn-save
        label="انتخاب کاربر"
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
  data () {
    return {
      userNameOrLastname: null,
      result: null,
      results: { UserList: [] },
      selectedUser: null
    }
  },
  methods: {
    choosenUsersHandler () {
      if (this.selectedUser) {
        this.$emit("returnToMainform", this.selectedUser)
      }
    },
    selectedChange ({ data }) {
      this.selectedUser = data
    },
    search () {
      if (this.userName !== "") {
        this.showLoading()
        this.$services.security
          .userList({
            from: 1,
            to: 20,
            search: this.userNameOrLastname
          })
          .then(async ({ data }) => {
            this.result = this.getResponse(data)
            if (this.result.success) {
              this.results.UserList = this.result.data.data.list
              this.results.UserList.forEach((x) => {
                x.location = "شرکت صفا رایانه"
              })
            }
          })
          .catch((e) => {
            console.error(e)
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    }
  }
}
</script>
