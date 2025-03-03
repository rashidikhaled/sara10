<template>
  <safa-form
    app-id="714c366c-1705-433d-970c-e04f6d62bd7d"
    :id="formKey"
    :caption="title"
    ref="form"
  >
    <!-- <template #header> -->
    <safa-status :result="saveIncomeRes" />
    <safa-status :result="getIncomeFicheRes" />
    <safa-status :result="updateLastRequestStateRes" />
    <safa-status :result="getIncomeDetailsRes" />
    <!-- </template> -->
    <safa-tabs v-model="activeTab" height="100%" class="fit">
      <template v-slot:tabs>
        <tab-menu name="calculates" label="محاسبات" />
        <tab-menu name="calculateMethods" label="روشهای محاسبه" />
        <tab-menu name="bestankari" label="بستانکاری" />
        <tab-menu name="discount" label="تخفیف" />
        <tab-menu name="fish" label="فیش" />
        <tab-menu name="description" label="توضیحات" />
      </template>
      <tab-content name="calculates" :padding="false">
        <UCalculates
          v-model="value"
          :incomeDetailResults="incomeDetailResults"
          :selectedCalculationRow="selectedCalculationRow"
          :m="m"
          :formKey="formKey"
          :title="title"
          :name="name"
          :totalUserAmount="totalUserAmount"
          :totalSysAmount="totalSysAmount"
          :activeTab="activeTab"
          :mainTab="mainTab"
          :taskInfo="taskInfo"
          :showInnerBtn="showInnerBtn"
          :loadFromMenu="loadFromMenu"
          :config="config"
          :buildingSettings="buildingSettings"
          :incomeCalculationUserSettings="incomeCalculationUserSettings"
          @reloadMainForm="reloadMainForm"
          @loaded="loadCalculationGrid"
          ref="ucalculates"
        />
      </tab-content>
      <tab-content name="calculateMethods" :padding="false">
        <UCalculateMethods
          v-model="value"
          :incomeDetailResults="incomeDetailResults"
          :formKey="formKey"
          :title="title"
          :name="name"
          :taskInfo="taskInfo"
        />
      </tab-content>
      <tab-content name="bestankari" :padding="false">
        <UBestankari
          v-model="value"
          :incomeDetailResults="incomeDetailResults"
          :m="m"
          :disableConfirmBtn="lockConfirm"
          :disableUnconfirmedBtn="lockUnconfirm"
          :taskInfo="taskInfo"
          :formKey="formKey"
          :title="title"
          :name="name"
          :addNewRow="addNewRow"
          @changeDisableStatus="changeDisableStatus"
        />
      </tab-content>
      <tab-content name="discount">
        <UDiscount
          v-model="value"
          :incomeDetailResults="incomeDetailResults"
          :incomeCiIncomeCalcList="incomeCiIncomeCalcList"
          :m="m"
          @copySimilarRowCount="copySimilarRowCount"
          :formKey="formKey"
          :title="title"
          :name="name"
          :taskInfo="taskInfo"
          :config="config"
        />
      </tab-content>
      <tab-content name="fish" :padding="false">
        <fit>
          <safa-checkbox
            class="q-my-sm q-ml-sm"
            label="عدم نمایش فیش های ابطال شده"
            v-model="isShowRevokeFiche"
            cdcName="isShowRevokeFiche"
          />
          <q-separator />
          <UFish
            fit
            :fiches="fiches"
            :selectedCalculationRow="selectedCalculationRow"
            :incomeDetailResults="incomeDetailResults"
            :formKey="formKey"
            :title="title"
            :name="name"
            :m="m"
            :isOpenFromResponder="isOpenFromResponder"
            :showInnerBtn="showInnerBtn"
            :loadFromMenu="loadFromMenu"
            :config="config"
            @reloadMainForm="reloadMainForm"
          />
        </fit>
      </tab-content>

      <tab-content name="description" :padding="true">
        <UDescription
          :m="m"
          :incomeDetailResults="incomeDetailResults"
          :taskInfo="taskInfo"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </tab-content>
    </safa-tabs>

    <safa-popup v-model="isShowIncomeMjazMadal" title="مجاز درآمد" vertical>
      <UIncomemojaz
        :incomeDetailResults="incomeDetailResults"
        :formKey="formKey"
        :title="title"
        :name="name"
        ref="incomeMojaz"
      />
      <!-- <template v-slot:footer>

      </template> -->
    </safa-popup>
  </safa-form>
</template>

<script>
import UCalculates from "./partials/UCalcualtes"
import UCalculateMethods from "./partials/UCalculateMethods"
import UBestankari from "./partials/UBestankari"
import UDiscount from "./partials/UDiscount"
import UFish from "./partials/UFish"
import UDescription from "./partials/UDescription"
import UIncomemojaz from "../UIncomemojaz.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
// import { sortByPersianDateTime } from 'src/utils/sortHelper'

export default {
  name: "UIncomeDetailsTabs",
  title: "جزئیات درآمد",
  mixins: [baseFormMixin],
  components: {
    UCalculates,
    UCalculateMethods,
    UBestankari,
    UDiscount,
    UFish,
    UDescription,
    UIncomemojaz
  },
  props: {
    selectedCalculationRow: Object,
    config: Object,
    value: Object,
    m: String,
    name: {
      type: String,
      default: "",
      required: true
    },
    mainTab: String,
    showInnerBtn: Boolean,
    loadFromMenu: Boolean,
    isOpenFromResponder: Boolean,
    buildingSettings: Object,
    incomeCalculationUserSettings: Object,
    incomeSettings: Object
  },
  data () {
    return {
      title: "درآمد- جزییات درآمد",
      formKey: "1a900b2d-8f38-4ff9-bc79-49ee8247580d",

      // #region services
      getIncomeFicheRes: null,
      getIncomeDetailsRes: null,
      saveIncomeRes: null,
      updateLastRequestStateRes: null,
      // #endregion

      // #region variables
      isShowRevokeFiche: true,
      activeTab: "calculates",
      addNewRow: false,
      incomeDetailResults: {
        Income: {},
        Income_Calculation_ForChange: [],
        IncomeParameters: [],
        Income_Discount: [],
        Income_LogMethod: [],
        Income_OddmentAccount: [],
        Income_PrePayment: []
      },
      lockConfirm: true,
      lockUnconfirm: true,
      copyCount: 0,
      oddmentID: "00000000-0000-0000-0000-000000000000",
      incomeFicheResults: { Income_Fiche: [] },
      ciIncomeResult: null,
      ciIncomeResults: { CI_IncomeCalculation_JustCalculate: [] },
      incomeCalculation: [],
      isShowIncomeMjazMadal: false,
      selectedItem: [],
      isview: false,
      addNewBestankari: false,
      fiches: []
      // #endregion
    }
  },

  async mounted () {
    await this.getIncomeDetails(false)
    await this.getIncomeFiche()
    this.$nextTick(() => {
      this.updateSettings({
        buildingSettings: this.buildingSettings,
        incomeSettings: this.incomeSettings,
        incomeCalculationUserSettings: this.incomeCalculationUserSettings
      })
    })
  },
  computed: {
    incomeCiIncomeCalcList () {
      return this.incomeDetailResults.Income_Calculation_ForChange.filter(
        (c) => c.selected
      ).map((x) => ({
        ID: x.CI_IncomeCalculation,
        Title: x.IncomeCalculation_Title
      }))
    },
    totalUserAmount () {
      return this.incomeDetailResults.Income_Calculation_ForChange.reduce(
        (sum, one) => {
          if (!sum) sum = 0
          sum += parseInt(one.Value || "0")
          return sum
        },
        0
      )
    },
    totalSysAmount () {
      return this.incomeDetailResults.Income_Calculation_ForChange.reduce(
        (sum, one) => {
          if (!sum) sum = 0
          sum += parseInt(one.SysValue || "0")
          return sum
        },
        0
      )
    }
  },
  methods: {
    applyButtons () {
      this.$root.$emit("setButtons", "UIncomeDetailsTabs", this.buttons)
    },
    saveIncomeMojaz () {
      this.$refs.incomeMojaz.save()
    },
    showModal () {
      this.isShowModal = true
    },
    normalizeIncomeCalculationForChange () {
      this.incomeDetailResults.Income_Calculation_ForChange.forEach((item) => {
        if (item.SysValue === null) {
          item.SysValue = 0
        }
      })
    },
    loadCalculationGrid () {},
    async getIncomeDetails () {
      return new Promise(async (resolve, reject) => {
        try {
          this.showLoading()
          const selectedIds = [
            ...(this.$refs?.ucalculates
              ?.getSelectedRows()
              .map((x) => x.CI_IncomeCalculation) ?? [])
          ]
          console.log("selectedIds", selectedIds)
          const payload = {
            pNidIncome: this.selectedCalculationRow.NidIncome,
            PLoadFun:
              "Income_LogMethod,Income,Income_Calculation_ForChange,Income_PrePayment,Income_OddmentAccount,Income_Discount,NidBase"
          }
          const { data } = await this.$services.SD.getIncomeDetails(
            payload,
            this.config
          )
          this.getIncomeDetailsRes = this.getResponse(data)

          if (this.getIncomeDetailsRes.success) {
            this.getIncomeDetailsRes.data.Income_OddmentAccount.map((x) => {
              if (x.IsConfirm === true) {
                x.class = "confirmBestankari"
              }
              return x
            })
            this.incomeDetailResults = this.getIncomeDetailsRes.data
            this.incomeDetailResults.Income_Calculation_ForChange =
              this.incomeDetailResults.Income_Calculation_ForChange.map(
                (x) => ({
                  ...x,
                  selected: x.hasOwnProperty("selected")
                    ? x.selected
                    : selectedIds.includes(x.CI_IncomeCalculation)
                })
              )
            this.$nextTick(() => {
              if (this.buildingSettings.calculateIncomeBaseOnSettings) {
                this.updateSettings({
                  buildingSettings: this.buildingSettings,
                  incomeSettings: this.incomeSettings,
                  incomeCalculationUserSettings:
                    this.incomeCalculationUserSettings
                })
              } else {
                this.$refs.ucalculates.setSelectedRows(selectedIds)
              }
            })

            let bestankariList =
              this.incomeDetailResults.Income_OddmentAccount.length
            if (bestankariList === 0) {
              this.addNewRow = true
            } else {
              this.addNewRow = false
            }

            // await this.log({
            //   action: this.logActions.view,
            // nosaziCode: this.selectedRequest.BizCode,
            //   nidWorkItem: this.selectedRequest.NidWorkItem,
            //   bizCode: this.selectedCalculationRow.NidIncome,
            //   bizCodeTitle: "NidIncome"
            // })
            await this.getCiIncomeCalculation()
            return resolve()
          }
        } catch (e) {
          console.error(e)
          this.serverError()
          return reject(e)
        } finally {
          this.hideLoading()
        }
      })
    },

    setRowColor (e) {
      if (e === 0) {
        return "dutyFichePermanent"
      } else if (e === 1) {
        return "dutyFicheConfirmBank" // 'dutyFicheConfirm'
      } else if (e === 2) {
        return "dutyFichePrint"
      } else if (e === 7) {
        return "dutyFicheTempExport"
      } else if (e === 3) {
        return "dutyFicheConfirm" // 'dutyFicheConfirmBank'
      } else if (e === 4) {
        return "dutyFicheRevoke"
      } else {
        return ""
      }
    },

    async getIncomeFiche () {
      this.showLoading()
      try {
        const { data } = await this.$services.SD.getIncomeFiche(
          { pNidIncome: this.selectedCalculationRow.NidIncome },
          this.config
        )
        this.getIncomeFicheRes = this.getResponse(data)
        if (this.getIncomeFicheRes.success) {
          this.incomeFicheResults = this.getIncomeFicheRes.data
          this.incomeFicheResults.Income_Fiche =
            this.getIncomeFicheRes.data?.Income_Fiche?.map((m) => {
              return { ...m, class: this.setRowColor(m.EumFicheStatus) }
            }) ?? []

          this.$nextTick(() => {
            if (this.isShowRevokeFiche) {
              this.fiches = this.incomeFicheResults.Income_Fiche.filter(
                (f) => f.EumFicheStatus !== 4
              )
            } else {
              this.fiches = this.incomeFicheResults.Income_Fiche
            }
          })

          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedCalculationRow.NidIncome,
            bizCodeTitle: "NidIncome",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `
              نمایش جزئیات درآمد برای ردیف محاسباتی
               ${this.selectedCalculationRow.UserName}
               که در تاریخ
                ${this.selectedCalculationRow.CreateDate}
                 و ساعت
                  ${this.selectedCalculationRow.CreateTime}
                   ایجاد گردیده است، انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async getCiIncomeCalculation () {
      try {
        const { data } =
          await this.$services.SD.getCIIncomeCalculationJustCalculate(
            { pNidIncome: this.selectedCalculationRow.NidIncome },
            this.config
          )
        this.ciIncomeResult = this.getResponse(data)
        if (this.ciIncomeResult.success) {
          this.ciIncomeResults = this.ciIncomeResult.data
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    updateSettings ({
      buildingSettings,
      incomeSettings,
      incomeCalculationUserSettings
    }) {
      // console.log('%%%%%%%%%%%%%%%%%%%%%% details update settings: ', { buildingSettings, incomeSettings, incomeCalculationUserSettings })
      this.$refs.ucalculates.updateSettings({
        buildingSettings,
        incomeSettings,
        incomeCalculationUserSettings
      })
    },
    normalizeBestankari () {
      this.incomeDetailResults.Income_OddmentAccount =
        this.incomeDetailResults.Income_OddmentAccount.map((m) => {
          return {
            ...m,
            CI_Bank: m.CI_Bank || null,
            BankBranch: m.BankBranch || null,
            FicheNo: m.FicheNo || null,
            IsConfirm: m.IsConfirm || null,
            TmpNidUser: m.TmpNidUser || null,
            NidUser: m.NidUser || this.getNidUser(),
            UserName: m.UserName || this.getUserDisplayName()
          }
        })
    },
    normalizeDiscount () {
      this.incomeDetailResults.Income_Discount =
        this.incomeDetailResults.Income_Discount.map((m) => {
          return {
            ...m,
            CI_IncomeDiscuntType: m.CI_IncomeDiscuntType || 0,
            CI_IncomeCalculation: m.CI_IncomeCalculation || 0,
            CI_IncomeValueType: m.CI_IncomeValueType || 0,
            Value: m.Value || 0,
            OrderNo: m.OrderNo || 0,
            BeforeOddment:
              typeof m.BeforeOddment === "boolean" ? m.BeforeOddment : false,
            CI_IncomeDiscuntStatus: m.CI_IncomeDiscuntStatus || 0,
            TaghsitCount: m.TaghsitCount || 0,
            NidDiscount:
              m.NidDiscount || "00000000-0000-0000-0000-000000000000",
            NidIncome: m.NidIncome || "00000000-0000-0000-0000-000000000000"
          }
        })
    },
    async save () {
      try {
        this.showLoading()
        this.incomeCalculation = []
        this.incomeDetailResults.Income_Calculation_ForChange.forEach((x) => {
          if (x.Value !== null) {
            this.incomeCalculation.push(x)
            x.CalcDate = null
            x.CalcTime = null
            x.NidCalculation = "00000000-0000-0000-0000-000000000000"
            x.NidIncome = "00000000-0000-0000-0000-000000000000"
            x.NidUser = this.getNidUser()
            x.UserName = this.getUserDisplayName()
          }
        })
        this.incomeDetailResults.Income_Calculation = this.incomeCalculation
        this.incomeDetailResults.CI_IncomeCalculation_JustCalculate =
          this.ciIncomeResults.CI_IncomeCalculation_JustCalculate
        this.normalizeIncomeCalculationForChange()
        this.normalizeDiscount()
        this.normalizeBestankari()

        const payload = {
          pIncome: this.incomeDetailResults,
          pUser: {
            UserName: this.getUserDisplayName(),
            UserGuid: this.getNidUser()
          },
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          },
          pIsLoadFromMenu: this.loadFromMenu
        }
        const { data } = await this.$services.SD.saveIncome(
          payload,
          this.config
        )
        this.saveIncomeRes = this.getResponse(data)
        if (this.saveIncomeRes.success) {
          this.showSuccess("ذخیره جزئیات درآمد با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.incomeDetailResults.NidIncome,
            bizCodeTitle: "NidIncome",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره جزئیات درآمد برای ردیف محاسباتی ${this.selectedCalculationRow.UserName} که در تاریخ ${this.selectedCalculationRow.CreateDate} و ساعت ${this.selectedCalculationRow.CreateTime} ایجاد گردیده است، انجام گردید.`
          })

          this.isEditable = false
          this.copyCount = 0
          await this.getIncomeDetails()
          await this.updateLastRreqestUpdate()
          await this.getIncomeFiche()
          this.$emit("saveSuccess")
        }
      } catch (response) {
        this.serverError()
      } finally {
        this.hideSending()
      }
    },

    async updateLastRreqestUpdate () {
      try {
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pLastRequestState: "درآمد ویرایش شد"
        }
        const { data } = await this.$services.SD.updateLastRequestState(
          payload,
          this.config
        )
        this.updateLastRequestStateRes = this.getResponse(data)
        if (this.updateLastRequestStateRes) {
          await this.log({
            action: this.logActions.update,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ویرایش جزئیات درآمد برای ردیف محاسباتی ${this.selectedCalculationRow.UserName} که در تاریخ ${this.selectedCalculationRow.CreateDate} و ساعت ${this.selectedCalculationRow.CreateTime} ایجاد گردیده است، انجام گردید.`
          })
        }
      } catch (response) {
        this.serverError()
      }
    },

    changeDisableStatus ({ confirm, unConfirm, nidOddment }) {
      if (confirm === true && unConfirm === false) {
        this.lockConfirm = true
        this.lockUnconfirm = false
      } else if (confirm === false && unConfirm === true) {
        this.lockConfirm = false
        this.lockUnconfirm = true
      }
      this.oddmentID = nidOddment
    },

    async confirmIncomeOddmentAccount (isConfirm) {
      try {
        this.showLoading()
        const payload = {
          pNidOddment: this.oddmentID,
          pIsConfirm: isConfirm
        }
        const { data } = await this.$services.SD.confirmIncomeOddmentAccount(
          payload,
          this.config
        )
        this.showConfirmResult = this.getResponse(data)
        if (this.showConfirmResult.success) {
          if (isConfirm) {
            this.lockConfirm = true
            this.showSuccess("تأیید با موفقیت انجام شد.")
          } else {
            this.lockUnconfirm = true
            this.showSuccess("عدم تأیید با موفقیت انجام شد.")
          }

          const saveDesc = `
            ${isConfirm ? "تأیید" : "عدم تأیید"}
             برای ردیف محاسباتی ${
  this.selectedCalculationRow.UserName
} که در تاریخ ${this.selectedCalculationRow.CreateDate} و ساعت ${
  this.selectedCalculationRow.CreateTime
} ایجاد گردیده است، انجام گردید. ${this.oddmentID}
             `
          await this.log({
            action: this.logActions.confirm,
            bizCode: this.oddmentID,
            bizCodeTitle: "NidOddment",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc
          })

          await this.getIncomeDetails()
          await this.getIncomeFiche()
        }
      } catch (response) {
        this.serverError()
      } finally {
        this.hideSending()
      }
    },

    confirmInfo () {
      this.showConfirm("آیا از تأیید اطلاعات اطمینان دارید؟").onOk(() => {
        this.confirmIncomeOddmentAccount(true)
      })
    },

    unConfirmedInfo () {
      this.showConfirm("آیا از عدم تأیید اطلاعات اطمینان دارید؟").onOk(() => {
        this.confirmIncomeOddmentAccount(false)
      })
    },

    copySimilarRowCount (val) {
      this.copyCount = val
    },

    async reloadMainForm () {
      await this.getIncomeDetails()
      await this.getIncomeFiche()
    }
  },
  watch: {
    isShowRevokeFiche: {
      handler () {
        this.$nextTick(() => {
          if (this.isShowRevokeFiche) {
            this.fiches = this.incomeFicheResults.Income_Fiche.filter(
              (f) => f.EumFicheStatus !== 4
            )
          } else {
            this.fiches = this.incomeFicheResults.Income_Fiche
          }
        })
      },
      deep: true
    }
  }
}
</script>
