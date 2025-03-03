<template>
  <fit>
    <div class="row q-gutter-sm q-pa-sm">
      <div class="col-3">
        <safa-text
          v-model="username"
          cdcName="username"
          label="جستجوی کاربر"
          label-width="80px"
          @keypress.enter="search"
        />
      </div>
      <div class="col-auto">
        <btn-search @click="search" />
      </div>
    </div>
    <safa-datatable
      v-model="usersList"
      cdcName="usersList"
      :allowMultipleSelection="false"
      :show-selected-checkbox="false"
      fit
      height="100%"
      helper="revisitAgentsUserList"
      max-height="100%"
      minHeight="100%"
      paginate
      title="لیست کاربران"
      :searchable="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      @selectedChange="selectedChange"
    />
    <div class="q-ma-sm">
      <btn-save
        :disable="!selectedUser"
        label="انتخاب"
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
    this.loadObj()
  },

  methods: {
    async search () {
      try {
        this.showLoading()
        const { data } = await this.$services.security.userList({
          from: 1,
          to: 100,
          search: this.username
          // populate: true
        })
        const res = this.getResponse(data)
        if (res.success) {
          this.usersList = res.data.data.list.map((x) => {
            return {
              UserName: x.username,
              FirstName: x.firstName,
              LastName: x.lastName,
              Enabled: x.active,
              NidUser: x.NidUser
            }
          })
        } else {
          return this.showError(res.msg)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.security.getUsersFromJobLocation({
          NidJobLocation: this.$stSecurity.getters["authorize/user"].JobLocationGuid
        })
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
        } else {
          return this.showError(res.msg)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    selectedChange (e) {
      if (this.usersFromJobLocationResult.length !== 0) {
        const user = this.usersFromJobLocationResult.filter(
          (item) => item.NidUser === e.dataItem.NidUser
        )
        this.selectedUser = user[0]
        if (this.selectedUser === undefined) {
          const user = this.usersList.filter(
            (item) => item.NidUser === e.dataItem.NidUser
          )
          this.selectedUser = user[0]
        }
      } else {
        const user = this.usersList.filter(
          (item) => item.NidUser === e.dataItem.NidUser
        )
        this.selectedUser = user[0]
      }
    },

    choosenUsersHandler () {
      if (this.selectedUser) {
        this.$emit("selected", this.selectedUser)
      }
    }
  }
}
</script>
