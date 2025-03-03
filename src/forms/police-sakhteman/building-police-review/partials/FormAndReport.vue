<template>
  <safa-grid
    v-model="FormAndReportList"
    cdcName="FormAndReportList"
    :columns="formAndReportColumn"
    fit
    height="100%"
    max-height="100%"
    min-height="200px"
    :show-selected-checkbox="true"
    :allowMultipleSelection="false"
    :addRow="false"
    :deleteRow="false"
    :allowCopy="false"
  />
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    request: Object,
    title: String,
    formKey: String,
    name: String
  },

  data () {
    return {
      FormAndReportList: [],
      formAndReportColumn: [
        {
          field: "",
          title: "نمایش",
          editor: "action",
          btnStyle: {
            color: "primary"
          },
          width: "90px"
        },
        { field: "Caption", title: "عنوان", width: "150px" }
      ]
    }
  },
  mounted () {
    if (this.request) {
      this.loadData()
    }
  },
  methods: {

    loadData () {
      this.showLoading()
      const userInfo = this.$stSecurity.getters["authorize/user"]
      const payload = {
        NidProc:
          this.request.NidProc === ""
            ? "00000000-0000-0000-0000-000000000000"
            : this.request.NidProc,
        UserInfo: {
          UserName: this.getUserDisplayName(),
          IsSysAdmin: userInfo.isSysAdmin,
          Domain: userInfo.domains,
          DomainNames: userInfo.domainNames,
          NidUser: this.getNidUser(),
          GUID: this.getNidUser()
        }
      }
      this.$srvWorkflow
        .getAllTaskByNidProc(payload, {
          config: { District: this.selectedDistrict }
        })
        .then(async ({ data }) => {
          this.FormAndReportList = data.data
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  computed: {
    gridTitle () {
      if (!this.request) return ""
      return " لیست اقدامات درخواست " + this.request.NidWorkItem
    }
  }
}
</script>
