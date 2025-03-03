<template>
  <form-wrapper title="یادداشت">
    <fit>
      <safa-grid
        helper="noteColumns"
        title="یادداشت"
        :addRow="false"
        :allowCopy="false"
        :isRowSelectable="() => true"
        :checkboxSelection="true"
        :suppressRowClickSelection="false"
        v-model="logList.Commission_Comments"
        class="q-mb-sm"
        cdcName="Commission_Comments"
        ref="commissionCommentsRef"
      >
       <template #header>
          <q-btn @click="deleteRow" v-if="canDelete"
            padding="3px"
            size="sm"
            flat
            title="حذف سطرهای انتخاب شده"
            >
          <q-icon>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18"
                 viewBox="0 0 24 24"
                 style=" fill:currentColor;">
              <path
                d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
            </svg>
          </q-icon>
        </q-btn>
        </template>
      </safa-grid>
      <text-template
        formKey="b00f4ffd-08b3-43d9-b68a-c82977071425"
        v-model="comments"
        cdcName="comments"
        :rows="3"
      />
    </fit>
    <template v-slot:footer>
      <btn-save @click="saveComment" />
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import build from "../../../../../../build"

import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  data () {
    return {
      name: "Note",
      title: "یادداشت",
      logList: { Commission_Comments: [] },
      canDelete: false,
      comments: ""
    }
  },
  props: {
    formKey: {
      // UVoting
      type: String,
      default: "AD8FB4D1-8045-4EA7-A26F-B0BB41320CDB"
    }
  },
  async created () {
    await this.addResource()
    this.checkAccess()
  },
  mounted () {
    this.loadData()
  },

  methods: {
    checkAccess () {
      if (!this.formKey) return false
      const resources =
        this.$stSecurity.getters["security/allResources"][this.formKey.toUpperCase()]
      let hasAccess = resources.find(
        (x) => x === "FC980D1A-26A1-4CA2-9402-EA988C475A91"
      )
      if (hasAccess) {
        this.canDelete = true
      } else {
        this.canDelete = false
      }
    },
    async addResource () {
      try {
        this.showLoading()
        const token = this.$stSecurity.getters["authorize/token"]
        const { data } = await this.$services.security.addResource({
          NidResource: "FC980D1A-26A1-4CA2-9402-EA988C475A91",
          NidWorkspace: build.workspaceId, // workSpaceID
          NidParent: this.formKey.toUpperCase(),
          name: "FC980D1A26A14CA29402EA988C475A91",
          title: "دکمه دسترسی حذف گرید یادداشت",
          type: "sp",
          force: false,
          token: token
        })
        const res = this.getResponse(data)
        if (res.success) {
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.hideLoading()
      }
    },
    async loadData () {
      try {
        this.showLoading()
        // console.log("getClsCommissionCommentsPayload:", {
        //   pNidCommission: this.selectedNidCommission
        // })
        const { data } =
          await this.$services.commissions.getClsCommissionComments({
            pNidCommission: this.selectedNidCommission
          })
        const res = this.getResponse(data)
        if (res.success) {
          this.logList = res.data.GetClsCommission_CommentsResult
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedNidCommission,
            bizCodeTitle: "NidCommission",
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    deleteRow () {
      this.showConfirm("آیا از حذف تصمیم مورد نظر اطمینان دارید؟").onOk(() => {
        this.deleteClsCommissionComments()
      })
    },
    async deleteClsCommissionComments () {
      try {
        let tmp =
          this.$refs?.commissionCommentsRef?.gridApi.getSelectedRows() || []
        let payLoad = {
          pClsCommission_Comments: {
            Commission_Comment: tmp[0], //  سمت سرویس اعلام شده فعلا فقط یدونه ای حذف انجام میشه
            Commission_Comments: tmp
          }
        }
        // console.log("deleteClsCommissionCommentsPayload:", payLoad)
        this.showLoading()
        const { data } =
          await this.$services.commissions.deleteClsCommissionComments(payLoad)
        const res = this.getResponse(data)
        if (res.success) {
          await this.log({
            action: this.logActions.delete,
            bizCode: this.selectedNidCommission,
            bizCodeTitle: "NidCommission",
            saveDesc: `حذف اطلاعات در فرم ${this.title} انجام گردید.`
          })
          await this.loadData()
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async saveComment () {
      try {
        let payLoad = {
          pClsCommission_Comments: {
            Commission_Comment: {
              Comments: this.comments,
              CreateDate: "",
              CreateTime: "",
              NidCommission: this.selectedNidCommission,
              NidCommissionComment: "00000000-0000-0000-0000-000000000000",
              NidUser: this.getNidUser(),
              UserName: this.getUserDisplayName()
            },
            Commission_Comments: ""
          }
        }
        this.showLoading()
        const { data } =
          await this.$services.commissions.saveClsCommissionComments(payLoad)
        const res = this.getResponse(data)
        if (res.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedNidCommission,
            bizCodeTitle: "NidCommission",
            saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
          })
          await this.loadData()
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
