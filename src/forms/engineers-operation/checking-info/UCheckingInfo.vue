<template>
  <safa-form :id="formKey" :caption="title" appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1">
    <form-wrapper :title="title" vertical>
    <template #header>
      <safa-status :result="sendResult" />
    </template>
      <fit>
        <safa-tabs v-model="currentTab" type="fixed" fit>
          <template v-slot:tabs>
            <tab-menu name="checkingInfo" label="اطلاعات بازبین" />
            <tab-menu name="descriptions" label="توضیحات" />
          </template>
          <tab-content name="checkingInfo">
            <checking-info :dataModel="model" />
          </tab-content>
          <tab-content name="descriptions">
            <fit>
              <safa-datatable
                v-model="model.AllReferToEngineer"
                :columns="columns"
                fit
                height="100%"
                max-height="100%"
                min-height="150px"
                title="ارجاعات"
              />
            </fit>
            <div>
              <text-template
                label="توضیحات"
                :rows="3"
                class="q-mt-sm"
                v-model="model.Ref_CheckingInfo.Comments"
              />
            </div>
          </tab-content>
        </safa-tabs>
      </fit>
      <!-- editSPId="7e8ec046-217c-4910-9c4c-a817cb881879" spCaption="ویرایش" -->
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @save="saveData"
          @edit="getIsBlockChekingInfoForEngineer"
          @cancel="isEditable = false"
        >
          <template v-slot:after>
            <btn-default
              label="ارسال به لیست انتظار"
              @click="sendToStayForRefChecker"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import checkingInfo from "./partials/checkingInfo"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],
  components: { checkingInfo },
  data () {
    return {
      title: "عملکرد مهندسین ناظر- اطلاعات بازبین",
      formKey: "44aaee1b-9893-468c-ad76-4e30a3568eeb",
      name: "UCheckingInfo",
      main: true,
      currentTab: "checkingInfo",
      model: {
        Fil_Info: {
          NidWorkItem: 0,
          RegisterPlack: "",
          infrastructure: "",
          Floor: 0
        },
        TitleList: [],
        AllReferToEngineer: [],
        Ref_CheckingInfo: {
          Comments: ""
        }
      },
      columns: [
        {
          field: "IsFree",
          title: "ارجاع آزاد",
          editor: "checkbox",
          width: "100px"
        },
        {
          field: "IsDynamic",
          title: "ارجاع پویا",
          editor: "checkbox",
          width: "100px"
        },
        {
          field: "IsCanceled",
          title: "تایید شده/نشده",
          editor: "checkbox",
          width: "200px"
        },
        {
          field: "IsSwitchEngineer",
          title: "تعویض مهندس",
          width: "100px",
          editor: "checkbox"
        },
        {
          field: "IsCoordinator",
          title: "هماهنگ کننده",
          width: "200px",
          editor: "checkbox"
        },

        { field: "IdentityCode", title: "کدعضویت", width: "100px" },
        { field: "OfficeCode", title: "کد دفتر", width: "100px" },
        { field: "EngName", title: "نام", width: "200px" },
        { field: "EngFamily", title: "نام خانوادگی", width: "100px" },
        { field: "MobileNo", title: "شماره همراه", width: "100px" },
        { field: "Base", title: "پایه مهندس", width: "100px" },
        { field: "StudyField", title: "فعالیت", width: "100px" },
        { field: "Ability", title: "صلاحیت", width: "100px" },
        { field: "WorkAllowed", title: "تعداد کار", width: "100px" },
        { field: "QtaRemain", title: "سهمیه باقیمانده", width: "200px" },
        { field: "Qta20", title: "سهمیه 20 درصد", width: "120px" },
        {
          field: "Qta20Remain",
          title: "سهمیه باقیمانده 20 درصد",
          width: "200px"
        },
        { field: "ApplyPercent", title: "درصد", width: "100px" },
        { field: "Metraj", title: "متراژ", width: "100px" },
        { field: "DateOfRefrence", title: "تاریخ ارجاع", width: "100px" },

        {
          field: "JobAgreementExpireDate",
          title: "تاریخ پایان پروانه اشتغال",
          width: "200px"
        },
        {
          field: "CI_Years",
          title: "سال",
          width: "100px",
          editor: "combo",
          domain: ""
        },
        { field: "ReferType", title: "نحوه کسر سهمیه", width: "100px" },
        {
          field: "SwitchEngineerDate",
          title: "تاریخ تعویض مهندس",
          width: "200px"
        }
      ],
      sendResult: null
    }
  },

  created () {
    if (!this.selectedNidRef) {
      this.showError("لطفا ابتدا یک مورد از کارتابل ارجاعات انتخاب کنید")
      this.hideSidebar(this.name)
    } else {
      this.loadData()
    }
  },

  methods: {
    async loadData () {
      let payLoad = {
        pNidRef: this.selectedNidRef
      }
      await this.$services.eng
        .loadCheckingInfo(payLoad)
        .then((response) => {
          const res = this.getResponse(response.data)
          if (res.success) {
            this.model = res.data.LoadCheckingInfoResult
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveData () {
      if (!this.isValidForm()) return
      this.showLoading()
      let payLoad = {
        pObj: {
          ...this.model
        }
      }
      this.$services.eng
        .saveCheckingInfo(payLoad)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            this.loadData()
          } else {
            this.showError(res.errors[0].text)
          }
        })
        .catch((response) => {
          console.error(response)
          this.serverError()
        })
        .finally(() => {
          this.showConfirmEngineerFiche = false
          this.hideLoading()
        })
    },
    async getIsBlockChekingInfoForEngineer () {
      let payLoad = {
        pNidRef: this.selectedNidRef
      }
      await this.$services.eng
        .getIsBlockChekingInfoForEngineer(payLoad)
        .then((response) => {
          const res = this.getResponse(response.data)
          if (
            res.data.GetIsBlockChekingInfoForEngineerResult
              .IsBlockChekingInfoForEngineer === true
          ) {
            this.showError(
              "در حال حاضر مهندس نمی تواند اطلاعات این فرم را تغییر دهد."
            )
            this.isEditable = false
          } else {
            this.isEditable = true
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async sendToStayForRefChecker () {
      let payLoad = {
        pNidRef: this.selectedNidRef,
        pNidUser: this.getNidUser(),
        pUserName: this.currentUser.username
      }
      await this.$services.eng
        .sendToStayForRefChecker(payLoad)
        .then((response) => {
          this.sendResult = this.getResponse(response.data)
          if (this.sendResult.success) {
            this.showSuccess("ارسال به لیست انتظار بازبین با موفقیت انجام شد.")
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
