<template>
  <FormWrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
    </template>

    <safa-tabs
      v-model="activeTab"
      type="fixed"
      class="fit"
      height="100%"
      ref="discountTab"
    >
      <template v-slot:tabs>
        <tab-menu name="commentsList" label="لیست توضیحات" />
        <tab-menu name="newComment" label="توضیحات جدید" />
      </template>
      <tab-content name="commentsList" title="لیست توضیحات" :padding="false">
        <fit>
          <safa-grid
            title="لیست توضیحات"
            v-model="comList"
            cdcName="commentList"
            :columns="commentListColumns"
            m="r"
            fit
            paginate
            min-height="100px"
            height="100%"
            max-height="100%"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
            :showRowNumber="true"
            :suppressRowClickSelection="false"
          />
        </fit>
      </tab-content>
      <tab-content name="newComment" title="توضیحات جدید">
        <fit>
          <text-template
            label="توضیحات جدید"
            label-width="80px"
            v-model="newComment"
            cdcName="newComment"
            type="textarea"
            :formKey="formKey"
            required
            validations="required"
          />
        </fit>
      </tab-content>
    </safa-tabs>

    <template v-slot:footer v-if="activeTab === 'newComment'">
      <div>
        <btn-save label="ثبت" @click="saveObj" />
      </div>
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate, currentTime } from "src/utils/index"
export default {
  mixins: [baseFormMixin],

  props: {
    name: String,
    formKey: String,
    title: String,
    selectedItem: {
      type: Object,
      default: () => {},
      required: true
    }
  },

  data () {
    return {
      // #services
      loadObjRes: null,
      saveObjRes: null,

      // #variables
      activeTab: "commentsList",
      newComment: "",
      comList: [],
      commentListColumns: [
        { field: "CommentsDate", title: "تاریخ گزارش", width: "100px" },
        { field: "CommentsTime", title: "ساعت گزارش", width: "120px" },
        { field: "CommentsUserName", title: "نام گزارش دهنده", width: "200px" },
        { field: "Comments", title: "متن گزارش", width: "auto" }
      ]
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      const pNIdBuildingExecRep = this.selectedItem.NIdBuildingExecRep
      this.$services.engineers
        .getBuildingExecRepCommentsList({ pNIdBuildingExecRep })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.comList =
              this.loadObjRes.data?.GetBuildingExecRepComments_ListResult
                ?.BuildingExecRepComments_List ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: pNIdBuildingExecRep,
              bizCodeTitle: "NIdBuildingExecRep"
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveObj () {
      if (!this.isValidForm()) return
      const payload = {
        pBuildingExecRepComments: {
          Comments: this.newComment,
          CommentsDate: currentDate(),
          CommentsNidUser: this.getNidUser(),
          CommentsTime: currentTime(),
          CommentsUserName: this.currentUser.UserName,
          NIdBuildingExecRep: this.selectedItem.NIdBuildingExecRep,
          NIdBuildingRepComments: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.showLoading()
      this.$services.engineers
        .saveBuildingExecRepComments(payload)
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("توضیحات با موفقیت ذخیره شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedItem.NIdBuildingExecRep,
              bizCodeTitle: "NIdBuildingExecRep"
            })
            this.newComment = ''
            this.activeTab = 'commentsList'
            this.loadObj()
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
