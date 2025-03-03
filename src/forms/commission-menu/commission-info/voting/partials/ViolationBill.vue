<template>
  <fit>
    <!-- <safa-datatable
      v-model="model.UserState"
      :columns="userStatesColumns"
      :m="mode"
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      paginate
    /> -->
    لایحه تخلف درحال پیاده سازی می باشد
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "لایحه تخلف",
      name: "ViolationBill",
      formKey: "29002c50-4eeb-4195-a7df-9171147fa3b2",
      main: true,

      model: {
        UserState: []
      },
      userStatesColumns: [
        {
          field: "CI_Region",
          title: "منطقه",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "200px",
          validations: "required,number"
        },
        {
          field: "CI_CommissionType",
          title: "نوع پرونده",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "200px",
          validations: "required,number"
        },
        {
          field: "CommissionState",
          title: "دریافت پرونده",
          editor: "checkbox",
          width: "100px"
        }
      ]
    }
  },

  mounted () {},

  methods: {
    async getUserInfo () {
      this.showLoading()
      this.$services.commissions
        .getAllState()
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            const list = []
            list.push(
              ...res.data.GetUserInfoResult.UserInfo.map((item) => {
                let r = {}
                r.ID = item.NidUser
                r.Title = item.Name
                return r
              })
            )
            this.allUsers = list
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
