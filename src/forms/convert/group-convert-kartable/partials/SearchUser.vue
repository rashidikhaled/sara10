<template>
  <form-wrapper :padding="false" title="جستجوی کاربر">
    <fit>
      <FormRow class="q-pa-sm">
        <FormControl>
          <safa-text
            v-model="username"
            cdcName="toUser"
            label="نام کاربری"
            @keyup.enter="loadObj"
          >
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                color="primary"
                name="search"
                size="xs"
                style="position: relative; right: 5px"
                title="جستجوی کاربر"
                @click="loadObj"
              />
            </template>
          </safa-text>
        </FormControl>
      </FormRow>
      <safa-grid
        title="لیست کاربران"
        v-model="usersList"
        :columns="usersListColumns"
        fit
        m="r"
        :suppressRowClickSelection="false"
        @row:click="selectedChange"
        :getRowStyle="getRowStyle"
        paginate
        :pageSize="20"
      />
    </fit>
    <template #footer>
      <btn-default label="انتخاب" @click="selectCurrentUser" />
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    title: String,
    formKey: String,
    name: String,
    checkBlackList: {
      type: Boolean,
      default: true
    },
    isSameJobLocationWithCurrentUser: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      username: "",
      user: null,
      users: [],
      usersList: [],
      userBlackList: [],
      searchShUserBlackListRes: null,
      usersListColumns: [
        { field: "username", title: "نام کاربری", width: "200px" },
        { field: "firstName", title: "نام", width: "150px" },
        { field: "lastName", title: "نام نام خانوادگی", width: "150px" },
        { field: "enabled", title: "فعال", editor: "checkbox", width: "auto" }
      ]
    }
  },
  async mounted () {
    await this.getShUserBlackList()
    this.loadObj()
  },
  methods: {
    async getShUserBlackList () {
      try {
        this.showLoading()
        const { data } = await this.$services.SA.getShUserBlackList(
          { pBlackUserName: null }
          // this.config
        )
        const blackRes = this.getResponse(data)
        if (blackRes.success) {
          this.userBlackList =
            blackRes.data.UserBlackList.filter(
              (f) => f.EumBlackListStatus === 0
            ).map((m) => {
              return {
                BlackNiduser: m.BlackNiduser,
                BlackUserName: m.BlackUserName
              }
            }) ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    checkUsersInBlackList (users) {
      const blackList = this.userBlackList
      for (let obj1 of blackList) {
        let blackNid = obj1.BlackNiduser
        let obj2 = users.find(
          (obj2) => obj2.NidUser.toUpperCase() === blackNid.toUpperCase()
        )
        if (obj2) {
          Object.assign(obj2, { IsInBlackList: true })
        }
      }
      return users
    },
    async loadObj () {
      try {
        const payload = {
          from: 1,
          to: 100,
          search: this.username,
          filter: []
        }
        if (this.isSameJobLocationWithCurrentUser) {
          payload.filter.push([
            "jobLocation.NidJobLocation",
            this.currentUser.JobLocationGuid
          ])
        }
        this.showLoading()
        const { data } = await this.$services.security.userList(payload)
        const res = this.getResponse(data)
        if (res.success) {
          this.users = (res.data?.data?.list || res.data?.list) ?? []
          if (this.checkBlackList === true) {
            this.usersList = this.checkUsersInBlackList(this.users)
          } else this.usersList = this.users
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getRowStyle (params) {
      if (params.data.IsInBlackList) return { background: "#fdc9c9ad" }
      return { background: "transparent" }
    },
    selectedChange ({ data }) {
      this.user = data
    },
    selectCurrentUser () {
      if (this.user) {
        this.$emit("getUser", {
          ...this.user,
          IsInBlackList: this.user.IsInBlackList ?? false
        })
      } else {
        this.showError("لطفا یک کاربر از جدول انتخاب نمایید.")
      }
    }
  }
}
</script>
