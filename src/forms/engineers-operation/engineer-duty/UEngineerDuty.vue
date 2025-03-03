<template>
  <safa-form :id="formKey" :caption="title" appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1">
    <form-wrapper :title="title" vertical>
      <fit>
        <div class="q-mb-sm">
          <label> کد عضویت : </label>
          <span>{{ this.currentUser.username }}</span>
        </div>
        <safa-tabs v-model="currentTab" type="fixed" fit>
          <template v-slot:tabs>
            <tab-menu name="calculate_tab" label="محاسبات" />
            <tab-menu name="fish_tab" label="فیش" />
            <tab-menu name="otherAccount_tab" label="حسابهای متفرقه" />
          </template>
          <tab-content name="calculate_tab">
            <Calculation
              v-model="model"
              :m="mode"
              @startCalculationYear="changeStartCalculationYear"
              @selectedChange="selectDutyCalculates"
            />
          </tab-content>
          <tab-content name="fish_tab">
            <Fish
              v-model="model"
              @selectDutyFiche="selectDutyFiche"
              :title="title"
              :formKey="formKey"
              ref="fiche"
            />
          </tab-content>
          <tab-content name="otherAccount_tab">
            <Other
              v-model="model"
              :m="mode"
              @changePayoffYear="changePayoffYear"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          :showEditButton="currentTab === 'otherAccount_tab' ? true : false"
          :showSaveButton="currentTab === 'otherAccount_tab' ? true : false"
          :showCancelButton="currentTab === 'otherAccount_tab' ? true : false"
          editSPId="7cb45317-ef93-46b6-9d29-01b79f663adc"
          editFormId="99ae4ba0-88aa-498b-94d5-43f0aa47605f"
          spCaption="ویرایش حسابهای متفرقه"
          @save="saveData"
          @edit="isEditable = true"
          @cancel="isEditable = false"
        >
          <template v-slot:after>
            <btn-default
              v-if="currentTab === 'calculate_tab'"
              label="محاسبه"
              @click="calculateEngineer"
            />
            <btn-default
              v-if="currentTab === 'calculate_tab'"
              label="صدور فیش"
              @click="exportEngineerFiche"
            />
            <btn-default
              v-if="currentTab === 'fish_tab'"
              label="تایید"
              @click="showConfirmEngineerFiche = true"
              :disable="lockFishAction"
              spId="6dd771ff-1a68-4905-a699-c182f5c027ef"
              spCaption="تایید فیش"
            />

            <btn-default
              v-if="currentTab === 'fish_tab'"
              label="ابطال"
              :disable="lockFishAction"
              @click="revokeFiche"
              spId="08b32969-92c7-4ef0-900e-863ca75f1f05"
              spCaption="ابطال فیش"
            />

            <btn-default
              v-if="currentTab === 'fish_tab'"
              label="چاپ فیش"
              :disable="lockFishAction"
              @click="printEngineerDutyFiche"
              spId="395b6dd5-3cc2-4e44-ac5b-3b28a6cce165"
              spCaption="چاپ فیش"
            />
            <btn-default
              v-if="currentTab === 'fish_tab'"
              label="پرداخت الکترونیکی"
              @click="electronicPayment"
            />
          </template>
        </form-actions>
      </template>
      <safa-notice v-if="currentTab === 'fish_tab'"
        >**** مهندس گرامی ، جهت تایید پرداخت صرفا از طریق درگاه الکترونیکی '
        دکمه پرداخت الکترونیکی ' اقدام نمایید.****"</safa-notice
      >
      <!-- <safa-popup
        title="تایید فیش"
        v-model="showConfirmEngineerFiche"
        width="350px"
        height="150px"
      >
        <fit>
          <div class="fit">
            <safa-datepicker
              label="تاریخ پرداخت"
              v-model="paymentDate"
              required
              validations="required"
              class="q-ma-sm"
            />
          </div>
          <div class="q-gutter-sm q-pa-sm">
            <btn-save label="تایید" @click="confirmEngineerFiche" />
            <btn-cancel
              label="انصراف"
              @click="showConfirmEngineerFiche = false"
            />
          </div>
        </fit>
      </safa-popup> -->
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Calculation from "./partials/Calculation"
import Fish from "./partials/Fish"
import Other from "./partials/Other"

export default {
  mixins: [baseFormMixin],
  components: { Calculation, Fish, Other },
  props: ["value"],

  data () {
    return {
      title: "امور مهندسین ناظر - عوارض مهندس",
      formKey: "99ae4ba0-88aa-498b-94d5-43f0aa47605f",
      name: "UEngineerDuty",
      main: true,
      currentTab: "calculate_tab",
      identityCode: null,
      nIdEng: "00000000-0000-0000-0000-000000000000",
      startCalculationYear: 0,
      selectedDutyCalculate: [],
      lockFishAction: true,
      showConfirmEngineerFiche: false,
      paymentDate: "",
      selectedDutyFiche: {
        NidDutyFiche: "00000000-0000-0000-0000-000000000000",
        EumEngDutyPaymentType: null
      },
      model: {
        Eng_DutyCalculate: [],
        Eng_DutyFiche: [],
        Eng_DutyOddmentAccount: []
      }
    }
  },

  created () {
    this.loadData()
  },

  methods: {
    async loadData () {
      let payLoad = {
        pEngineerCode: this.currentUser.username
      }
      await this.$services.eng
        .loadEngineerDuty(payLoad)
        .then((response) => {
          const res = this.getResponse(response.data)
          if (res.success) {
            this.model = res.data.LoadEngineerDutyResult
            this.nIdEng = this.model._NidEng
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
    async calculateEngineer () {
      try {
        this.showLoading()
        let payLoad = {
          pEngineerCode: this.currentUser.username,
          pNidEng: this.nIdEng,
          pStartCalculationYear: this.startCalculationYear,
          pUser: this.currentUser
        }
        const { data } = await this.$services.eng.calculateEngineerDuty(
          payLoad
        )
        const res = this.getResponse(data)
        if (res.success) {
          //   await this.log({
          //     action: this.logActions.calculate,
          //     bizCode: this.identityCode,
          //     bizCodeTitle: "کد عضویت",
          //   });
          this.showSuccess("محاسبات با موفقیت انجام شد.")
          await this.loadData()
          await this.loadEngDutyCalculateList()
        }
      } catch (response) {
        console.error(response)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadEngDutyCalculateList () {
      this.showLoading()
      let payLoad = {
        pNidEng: this.nIdEng
      }
      await this.$services.eng
        .loadEngDutyCalculateList(payLoad)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.nIdEng,
              bizCodeTitle: "NIdEng"
            })
          }
        })
        .catch((response) => {
          console.error(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async exportEngineerFiche () {
      if (this.selectedDutyCalculate.length === 0) { return this.showError("لطفا یک سطر از لیست محاسبات را انتخاب نمایید.") }
      try {
        this.showLoading()
        let payLoad = {
          pSelectedCalculateList: this.selectedDutyCalculate,
          pEngineerCode: this.identityCode,
          pNidEng: this.nIdEng,
          pUser: this.currentUser
        }
        const { data } = await this.$services.eng.exportEngineerDutyFiche(
          payLoad
        )
        const res = this.getResponse(data)
        if (res.success) {
          this.showSuccess("صدور فیش با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.exportFiche,
            bizCode: this.nIdEng,
            bizCodeTitle: "NIdEng",
            saveDesc: `صدور فیش برای ${this.identityCode} انجام گردید.`
          })
          await this.loadEngDutyCalculateList()
          await this.loadData()
        }
      } catch (res) {
        console.error(res)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    // async confirmEngineerFiche() {
    //   if (!this.isValidForm()) return;
    //   try {
    //     this.showLoading();
    //     let payLoad = {
    //       pNidFiche: this.selectedDutyFiche.NidDutyFiche,
    //       pPaymentDate: this.paymentDate,
    //       pEumEngDutyPaymentType: this.selectedDutyFiche.EumEngDutyPaymentType,
    //       pUser: this.currentUser,
    //     };
    //     const { data } =
    //       await this.$services.engineers.confirmEngineerDutyFiche(payLoad);
    //     const res = this.getResponse(data);
    //     if (res.success) {
    //       this.showSuccess("تایید فیش با موفقیت انجام شد.");
    //       await this.log({
    //         action: this.logActions.confirm,
    //         bizCode: this.selectedDutyFiche.NidDutyFiche,
    //         bizCodeTitle: "NidDutyFiche",
    //       });
    //     } else {
    //       this.showError(res.errors[0].text);
    //     }
    //   } catch (response) {
    //     console.error(response);
    //     this.serverError();
    //   } finally {
    //     this.showConfirmEngineerFiche = false;
    //     this.hideLoading();
    //   }
    // },
    revokeFiche () {
      this.showConfirm("آیا از ابطال فیش انتخاب شده اطمینان دارید؟").onOk(
        () => {
          this.revokeEngineerDutyFiche()
        }
      )
    },
    async revokeEngineerDutyFiche () {
      this.showLoading()
      let payLoad = {
        pNidFiche: this.selectedDutyFiche.NidDutyFiche,
        pUser: this.currentUser
      }
      await this.$services.eng
        .revokeEngineerDutyFiche(payLoad)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("ابطال فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.selectedDutyFiche.NidDutyFiche,
              bizCodeTitle: "NidDutyFiche"
            })
            this.loadEngineerDutyFicheList()
          } else {
            this.showError(res.errors[0].text)
          }
        })
        .catch((response) => {
          console.error(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async loadEngineerDutyFicheList () {
      this.showLoading()
      let payLoad = {
        pNidEng: this.nIdEng
      }
      await this.$services.eng
        .loadEngineerDutyFicheList(payLoad)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.identityCode,
              bizCodeTitle: "کد عضویت"
            })
          } else {
            this.showError(res.errors[0].text)
          }
        })
        .catch((response) => {
          console.error(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    printEngineerDutyFiche () {
      if (!this.isValidForm()) return
      this.showLoading()
      let payLoad = {
        pNidFiche: this.selectedDutyFiche.NidDutyFiche,
        pUser: this.currentUser
      }
      this.$services.eng
        .printEngineerDutyFiche(payLoad)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.selectedDutyFiche.NidDutyFiche,
              bizCodeTitle: "NidDutyFiche"
            })
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
    saveData () {
      if (!this.isValidForm()) return
      this.showLoading()
      let payLoad = {
        pObj: {
          Eng_DutyOddmentAccount: this.model.Eng_DutyOddmentAccount,
          NidEng: this.nIdEng
        }
      }
      this.$services.eng
        .saveEngDutyOddmentAccount(payLoad)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.identityCode,
              bizCodeTitle: "کد عضویت"
            })
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

    changePayoffYear (value) {
      this.showLoading()
      let payLoad = {
        pNidEng: this.nIdEng,
        pCI_Years_Payoff: value
      }
      this.$services.eng
        .changeEngineerPayoffYear(payLoad)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.update,
              bizCode: this.nIdEng,
              bizCodeTitle: "nIdEng"
            })
          }
        })
        .catch((response) => {
          console.error(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    changeStartCalculationYear (val) {
      this.startCalculationYear = val
    },
    selectDutyFiche (val) {
      this.lockFishAction = false
      this.selectedDutyFiche = val
    },
    // selectDutyCalculate(selectedItem) {
    //   this.selectedDutyCalculate = selectedItem;
    // },
    selectDutyCalculates (e) {
      this.selectedDutyCalculate = e
    },
    electronicPayment () {
      if (!this.selectedDutyFiche) {
        this.showError("لطفا یک فیش را انتخاب نمائید.")
      } else {
        if (this.selectedDutyFiche.EumEngDutyFicheStatus === 2) {
          this.showError("فیش ابطال شده و امکان پرداخت نمی باشد.")
          this.hideSidebar("UEngineerDuty")
        } else if (this.selectedDutyFiche.EumEngDutyFicheStatus === 1) {
          this.showError("فیش تایید شده و امکان پرداخت نمی باشد.")
          this.hideSidebar("UEngineerDuty")
        }
      }
    }
  }

  // computed: {
  //   m() {
  //     if (this.hasIdentityCode) return "e";
  //     return "r";
  //   },
  // },
}
</script>
