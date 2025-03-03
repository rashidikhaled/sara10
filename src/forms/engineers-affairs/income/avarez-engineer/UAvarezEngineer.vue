<template>
  <safa-form
    :id="formKey"
    :caption="title"
  >
    <form-wrapper
      :title="title"
      vertical
    >
      <fit>
        <div class="q-mb-sm">
          <EngineerInfoBox
            v-model="identityCode"
            label-width="70px"
            @fetched="fetched"
            ref="engineerInfo"
          />
        </div>
        <safa-tabs
          v-model="currentTab"
          type="fixed"
          fit
        >
          <template v-slot:tabs>
            <tab-menu
              name="calculate_tab"
              label="محاسبات"
            />
            <tab-menu
              name="fish_tab"
              label="فیش"
            />
            <tab-menu
              name="otherAccount_tab"
              label="حسابهای متفرقه"
            />
          </template>
          <tab-content name="calculate_tab">
            <Calculation
              v-model="model"
              :m="m"
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
            />
            <btn-default
              v-if="currentTab === 'fish_tab'"
              label="ابطال"
              :disable="lockFishAction"
              @click="revokeFiche"
            />
            <btn-default
              v-if="currentTab === 'fish_tab'"
              label="چاپ فیش"
              :disable="lockFishAction"
              @click="printEngineerDutyFiche"
            />
          </template>
        </form-actions>
      </template>
      <safa-popup
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
            <btn-save
              label="تایید"
              @click="confirmEngineerFiche"
            />
            <btn-cancel
              label="انصراف"
              @click="showConfirmEngineerFiche = false"
            />
          </div>
        </fit>
      </safa-popup>
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
      title: "عوارض مهندس",
      formKey: "9feb1921-aac5-4359-8e97-947548a9c3b4",
      name: "UAvarezEngineer",
      main: true,
      currentTab: "calculate_tab",
      identityCode: null,
      nIdEng: null,
      hasIdentityCode: false,
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
    if (this.value) {
      this.identityCode = this.value
    }
  },

  mounted () {
    if (this.identityCode) {
      this.$refs.engineerInfo.getEngineer()
    }
  },

  methods: {
    fetched (val) {
      this.identityCode = val.IdentityCode
      this.nIdEng = val.NIdEng
      this.loadData()
    },
    async loadData () {
      let payLoad = {
        pEngineerCode: this.identityCode
      }
      await this.$services.engineers
        .loadEngineerDuty(payLoad)
        .then(async response => {
          const res = this.getResponse(response.data)
          if (res.success) {
            this.model = res.data.LoadEngineerDutyResult
            this.hasIdentityCode = true
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: "کد عضویت"
            })
          }
        })
        .catch(res => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async calculateEngineer () {
      if (this.identityCode == null) {
        this.showError("لطفا کد عضویت را وارد نمایید.")
        return
      }
      try {
        this.showLoading()
        let payLoad = {
          pEngineerCode: this.identityCode,
          pNidEng: this.nIdEng,
          pStartCalculationYear: this.startCalculationYear,
          pUser: this.currentUser
        }
        const { data } = await this.$services.engineers.calculateEngineerDuty(
          payLoad
        )
        const res = this.getResponse(data)
        if (res.success) {
          await this.log({
            action: this.logActions.calculate,
            bizCode: this.identityCode,
            bizCodeTitle: "کد عضویت"
          })
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
      await this.$services.engineers
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
        .catch(response => {
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
        const { data } = await this.$services.engineers.exportEngineerDutyFiche(
          payLoad
        )
        const res = this.getResponse(data)
        if (res.success) {
          this.showSuccess("صدور فیش با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.exportFiche,
            bizCode: this.nIdEng,
            bizCodeTitle: "NIdEng",
            saveDesc: `صدور فیش برای ${this.identityCode}  انجام گردید`
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
    async confirmEngineerFiche () {
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        let payLoad = {
          pNidFiche: this.selectedDutyFiche.NidDutyFiche,
          pPaymentDate: this.paymentDate,
          pEumEngDutyPaymentType: this.selectedDutyFiche.EumEngDutyPaymentType,
          pUser: this.currentUser
        }
        const {
          data
        } = await this.$services.engineers.confirmEngineerDutyFiche(payLoad)
        const res = this.getResponse(data)
        if (res.success) {
          this.showSuccess("تایید فیش با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.confirmFiche,
            bizCode: this.selectedDutyFiche.NidDutyFiche,
            bizCodeTitle: "NidDutyFiche"
          })
        } else {
          this.showError(res.errors[0].text)
        }
      } catch (response) {
        console.error(response)
        this.serverError()
      } finally {
        this.showConfirmEngineerFiche = false
        this.hideLoading()
      }
    },
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
      await this.$services.engineers
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
        .catch(response => {
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
      await this.$services.engineers
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
        .catch(response => {
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
      this.$services.engineers
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
        .catch(response => {
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
      this.$services.engineers
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
        .catch(response => {
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
      this.$services.engineers
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
        .catch(response => {
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
    selectDutyCalculate (selectedItem) {
      this.selectedDutyCalculate = selectedItem
    },
    selectDutyCalculates (e) {
      this.selectedDutyCalculate = e.selectedItems
    }
  },

  computed: {
    m () {
      if (this.hasIdentityCode) return "e"
      return "r"
    }
  }
}
</script>
