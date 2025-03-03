<template>
    <div>
      <safa-text
              cdcName="userName"
              label="جستجوی کاربر"
              label-width="80px"
              v-model="userName"
              @keypress.enter="searchHandler"
              style="width: 350px;"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  color="primary"
                  name="search"
                  size="xs"
                  style="position: relative; right: 5px"
                  title="جستجوی کاربر"
                  @click="searchHandler"
                />
              </template>
            </safa-text>
      <div class="row q-mt-sm q-pa-md">
        <safa-grid
          v-model="UserList"
          cdcName="UserList"
          class="col-10"
          height="160px"
          :columns="usercolumns"
                        :addRow="false"
                        :allowCopy="false"
                        :deleteRow="false"
                        :paginate="false"
                        m="r"
                        :animateRows="true"
                        :filterable="true"
                        :suppressRowClickSelection="false"
                        :allowMultipleSelection="false"
                        @row:click="dbclick"
        />
      </div>
    </div>
  </template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"
export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      userName: "",
      UserList: [],
      selectedUser: null,
      usercolumns: [
        {
          field: "username",
          title: " نام کاربری",
          width: 180
        },
        {
          field: "firstName",
          title: " نام",
          width: 160
        },
        {
          field: "lastName",
          title: " نام خانوادگی",
          width: 160
        }
      ]
    }
  },
  methods: {
    async searchHandler () {
      try {
        this.showLoading()
        const { data } = await this.$services.security.userList({
          search: this.userName,
          filter: [["enabled", true]]
        })
        console.log("data", data)
        if (data.success) {
          const res = this.getResponse(data).data
          console.log("res", res)
          if (res.success) {
            console.log("res.data.list", res.data)
            this.UserList = res.data.list
              ? res.data.list
              : []
          }
        } else this.showError(data.msg)
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    dbclick (e) {
      this.selectedUser = e.data
      console.log("sdsdsdsd")
      this.$emit('returnToMainform', this.selectedUser.NidUser)
    }
  }
}
</script>
