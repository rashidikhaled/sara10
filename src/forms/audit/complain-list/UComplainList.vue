<template>
  <safa-form
   :id="formKey"
   :caption="title"
   appId="7EDDCC78-5BF6-412A-8C2C-8B13CC51F975">
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="ConfirmHandler" />
        <safa-status :result="NotConfirmHandler" />
        <safa-status :result="RevisitAgainHandler" />
      </template>
      <fit>
        <!-- helper="Complain_List" -->
        <safa-grid
          :columns="Complain_List"
          cdcName="Complain_List"
          v-model="Row1"
          fit
          height="100px"
          max-height="100%"
          min-height="300px"
          paginate
        />
        <FormRow class="q-my-sm">
          <text-template
            label="توضیحات"
            label-width="60px"
            v-model="Comments"
            cdcName="Comments"
            :rows="3"
            validations="required"
          />
        </FormRow>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "اعتراضات",
      formKey: "F6111462-C9AE-4E41-BAE5-22D273DAE0E4",
      name: "UComplainList",
      main: true,

      loadObjRes: null,
      ConfirmHandler: null,
      NotConfirmHandler: null,
      RevisitAgainHandler: null,
      // #region variables
      Row1: [],
      Comments: "",
      // #endregion
      Complain_List: [
        {
          field: "agCallbackBtn",
          title: "تایید",
          btnTitle: "تایید",
          callback: (params) => this.HlConfirmHandler(params)
        },
        {
          field: "agCallbackBtn",
          title: "عدم تایید",
          btnTitle: "عدم تایید",
          callback: (params) => this.hlNotConfirmHandler(params)
        },
        {
          field: "agCallbackBtn",
          title: "بازدید مجدد",
          btnTitle: "بازدید مجدد",
          callback: (params) => this.HlRevisitAgainHandler(params)
        },
        {
          field: "NosaziCodestr",
          title: "کد نوسازی",
          width: "130px"
        },
        {
          field: "ComplaintDate",
          title: "تاریخ اعتراض",
          width: "100px"
        },
        {
          field: "ComplaintTime",
          title: "ساعت اعتراض",
          width: "100px"
        },
        {
          field: "RecognitionCode",
          title: "کد تشخیص",
          width: "200px"
        },
        {
          field: "TrackingCode",
          title: "کد پیگیری",
          width: "100px"
        },
        {
          field: "ComplaintBody",
          title: "متن اعتراض",
          width: "350px"
        },
        {
          field: "EumComplainStatus",
          title: "وضعیت شکایت",
          domain: "Survey",
          editor: "combo",
          width: "150px"
        },
        {
          field: "EumRequiredRevisit",
          title: "وضعیت بازدید",
          domain: "Survey",
          editor: "combo",
          width: "150px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "200px"
        }
      ]
    }
  },
  created () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      this.showLoading()
      try {
        const { data } = await this.$services.SO.getAllComplain()
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.Row1 = this.loadObjRes.data.AllComplain
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async HlConfirmHandler (val) {
      this.selectedRow = val
      if (!this.isValidForm()) return
      const payload = {
        pNidComplain: this.selectedRow.NidComplain,
        pComments: this.Comments
      }
      this.showLoading()
      try {
        const { data } = await this.$services.SO.confirmComplain(payload)
        this.ConfirmHandler = this.getResponse(data)
        if (this.ConfirmHandler.success) {
          this.showSuccess("اعتراض مورد نظر با موفقیت تایید شد.")
          await this.loadObj()
          await this.log({
            action: this.logActions.confirm,
            bizCode: this.selectedRow.NidComplain,
            bizCodeTitle: "NidComplain",
            saveDesc: `تایید اعتراض در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async hlNotConfirmHandler (val) {
      this.selectedRow = val
      if (!this.isValidForm()) return
      const payload = {
        pNidComplain: this.selectedRow.NidComplain,
        pComments: this.Comments
      }
      this.showLoading()
      try {
        const { data } = await this.$services.SO.notConfirmComplain(payload)
        this.NotConfirmHandler = this.getResponse(data)
        if (this.NotConfirmHandler.success) {
          this.showSuccess("اعتراض مورد نظر تایید نشد.")
          this.loadObj()
          await this.log({
            action: this.logActions.confirm,
            bizCode: this.selectedRow.NidComplain,
            bizCodeTitle: "NidComplain"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async HlRevisitAgainHandler (val) {
      this.selectedRow = val
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        pNidBase: this.selectedRow.NidBase,
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        pNidComplain: this.selectedRow.NidComplain,
        pComments: this.Comments
      }
      try {
        const { data } = await this.$services.SO.setNeedAgainRevisit(payload)
        this.RevisitAgainHandler = this.getResponse(data)
        if (this.RevisitAgainHandler.success) {
          this.showSuccess("بازدید مجدد با موفقیت ثبت شد.")
          this.loadObj()
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRow.NidComplain,
            bizCodeTitle: "NidComplain",
            saveDesc: `بازدید مجدد در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
