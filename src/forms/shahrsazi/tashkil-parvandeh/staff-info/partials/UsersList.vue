<template>
  <fit>
    <div class="row q-gutter-sm q-pa-sm">
      <div class="col-3">
        <safa-text
          label="جستجوی کاربر"
          label-width="80px"
          v-model="username"
          @keypress.enter="loadData"
        />
      </div>
      <div class="col-auto">
        <btn-search @click="loadData" />
      </div>
    </div>
    <safa-datatable
      title="لیست کاربران"
      fit
      max-height="100%"
      height="100%"
      minHeight="100%"
      helper="revisitAgentsUserList"
      v-model="usersList"
      @selectedChange="selectedChange"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      paginate
    />
    <div class="q-ma-sm">
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
  name: "UsersList",
  props: {
    formKey: String,
    title: String,
    name: String,
    selectDistrict: {
      type: Number,
      default: 0,
      required: true
    }
  },

  data () {
    return {
      selectedUser: null,
      usersFromJobLocationResult: [],
      usersList: [],
      username: ""
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    async loadData () {
      let payLoad = {
        NidJobLocation: this.$stSecurity.getters["authorize/user"].JobLocationGuid,
        search: this.username
      }
      try {
        this.showLoading()
        const { data } = await this.$services.security.getUsersFromJobLocation(
          payLoad
        )
        const res = this.getResponse(data)
        if (res.success) {
          this.usersFromJobLocationResult = res.data.data.list
          const list = []
          list.push(
            ...res.data.data.list.map((x) => {
              const r = {}
              r.UserName = x.username
              r.FirstName = x.firstName
              r.LastName = x.lastName
              r.Enabled = x.active
              r.NidUser = x.NidUser
              return r
            })
          )
          this.usersList = list
        } else return this.showError(res.msg)
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    selectedChange (e) {
      const user = this.usersFromJobLocationResult.filter(
        (item) => item.NidUser === e.dataItem.NidUser
      )
      this.selectedUser = user[0]
    },

    choosenUsersHandler () {
      if (this.selectedUser) {
        this.$emit("selected", this.selectedUser)
      }
    }
  }
}
</script>
