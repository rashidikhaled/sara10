<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714c366c-1705-433d-970c-e04f6d62bd7d"
  >
    <form-wrapper
      :padding="false"
      :title="title"
      vertical
      @load="$emit('load')"
    >
      <safa-status :result="deleteResult" />
      <safa-status :result="saveResult" />
      <safa-status :result="incomeResult" />
      <safa-status :result="copyResult" />
      <safa-status :result="incomeDetailsResult" />
      <safa-status :result="updateResult" />
      <safa-status :result="allFichseRes" />

      <safa-tabs
        v-model="activeTab"
        :bordered="false"
        :padding="false"
        class="fit"
        height="100%"
      >
        <template v-slot:tabs>
          <tab-menu label="ردیف محاسبه" name="calculateRow" />
          <tab-menu
            label="لیست تمام فیش ها"
            name="fishList"
            @click="getAllFiches"
          />
          <tab-menu
            v-for="tab in tabs"
            :key="tab.name"
            v-bind="tab"
            :name="tab.name"
            closable
            @close="closeTab(tab)"
          />
        </template>
        <tab-content name="calculateRow">
          <UCalculateRow
            v-model="incomeResults"
            @clickRow="clickRow"
            @showDetailIncomeTab="showDetailIncomeTab"
          />
        </tab-content>
        <tab-content name="fishList">
          <UFishList v-model="allFichseResult" @getAllFiches="getAllFiches"  />
        </tab-content>
        <tab-content
          v-for="tab in tabs"
          :key="tab.name"
          v-bind="tab"
          :name="tab.name"
          :padding="false"
        >
          <UIncomeDetailsTabs
            :ref="tab.name + '-details'"
            v-model="results"
            :showInnerBtn="showInnerBtn"
            :formKey="formKey"
            :m="mode"
            :mainTab="activeTab"
            :name="name"
            :isOpenFromResponder = "isSelectFromResponder"
            :buildingSettings="buildingSettings"
            :incomeSettings="loadIncomeCalcSettingResult.data"
            :selectedCalculationRow="selectedCalculationRow"
            :taskInfo="taskInfo"
            :title="title"
            @saveSuccess="saveSuccess"
            :loadFromMenu="isSelectFromMenu"
            :config="config"
            :incomeCalculationUserSettings="incomeCalculationUserSettings"
          />
        </tab-content>
      </safa-tabs>

      <template v-if="activeTab !== 'fishList'" v-slot:footer>
        <form-actions
          :buttons="tabActions"
          :m="mode"
          :showEditButton="showEditButton"
          :value="activeTab"
          :editFormId="
            showEditButton === true
              ? '1a900b2d-8f38-4ff9-bc79-49ee8247580d'
              : ''
          "
          :editSPId="
            showEditButton === true
              ? 'ce06f68b-39b3-49d1-af86-822bd6afea50'
              : ''
          "
          height="40px"
          @cancel="onCancel"
          @edit="isEditable = true"
          @save="currentDetailsTab && currentDetailsTab.save()"
        >
          <template #after>
            <btn-default
              v-if="activeTab === 'calculateRow' && showButton('newRow')"
              label="ردیف محاسبه جدید"
              spCaption="ردیف محاسبه جدید"
              spId="c14ce082-6f9a-4936-be2e-e60ec2f00cfb"
              @click="newCalculationRow"
            />
            <btn-delete
              v-if="
                activeTab === 'calculateRow' &&
                selectedRow &&
                showButton('deleteRow')
              "
              label="حذف ردیف محاسبه"
              spCaption="حذف ردیف محاسبه"
              spId="ad2d7d7f-846f-443e-8807-f14abd9a25ee"
              @click="deleteIncome"
            />

            <btn-default
              v-if="
                activeTab === 'calculateRow' &&
                selectedRow &&
                showButton('copyRow')
              "
              label="کپی ردیف محاسبه"
              spCaption="کپی آخرین ردیف محاسبه"
              spId="9c859995-fbd4-4c67-a780-ac69601e5db7"
              @click="copyIncome"
            />
            <btn-save
              v-if="
                activeTab !== 'fishList' &&
                activeTab !== 'calculateRow' &&
                showButton('confirm')
              "
              :disable="
                currentDetailsTab && currentDetailsTab.disableConfirmBtn
              "
              formId="1a900b2d-8f38-4ff9-bc79-49ee8247580d"
              label="تایید"
              spCaption="تایید"
              spId="d3f653dd-d790-42c3-b164-16b677a4ba7a"
              @click="currentDetailsTab && currentDetailsTab.confirmInfo()"
            />
            <btn-default
              v-if="
                activeTab !== 'fishList' &&
                activeTab !== 'calculateRow' &&
                showButton('regret')
              "
              :disable="
                currentDetailsTab && currentDetailsTab.disableUnconfirmedBtn
              "
              spId="D519F60D-BE8C-4007-8671-9F6668EC5C99"
              spCaption="عدم تایید"
              @click="currentDetailsTab && currentDetailsTab.unConfirmedInfo()"
              formId="1a900b2d-8f38-4ff9-bc79-49ee8247580d"
              label="عدم تایید"
            />
            <btn-default
              v-if="
                activeTab !== 'fishList' &&
                activeTab !== 'calculateRow' &&
                showButton('rizMohasebe')
              "
              formId="1a900b2d-8f38-4ff9-bc79-49ee8247580d"
              label="ریزمحاسبه"
              spCaption="ریز محاسبه"
              spId="6cb5421b-73dd-486b-9f7c-764a30442eb3"
              @click="print"
            />
            <btn-default
              v-if="
                activeTab !== 'fishList' &&
                activeTab !== 'calculateRow' &&
                showButton('mojazDararmd')
              "
              formId="1a900b2d-8f38-4ff9-bc79-49ee8247580d"
              label="مجاز درآمد"
              spCaption="مجاز درآمد"
              spId="3c3e5252-a590-493d-b179-93c1230e397c"
              @click="showDetailsIncomeMojaz"
            />
            <btn-default
              v-if="showButton('reloadSetting')"
              label="بازآوری تنظیمات"
              @click="fetchBuildingSettings"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UCalculateRow from "./partials/UCalculateRow"
import UFishList from "./partials/UFishList"
import UIncomeDetailsTabs from "./partials/income/UIncomeDetailsTabs"
import baseFormMixin from "src/mixins/baseFormMixin"
import { sortByPersianDateTime } from "src/utils/sortHelper"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  components: {
    UCalculateRow,
    UFishList,
    UIncomeDetailsTabs
  },
  data: function () {
    return {
      title: "درآمد- درآمد",
      formKey: "274ae866-ab6a-4b66-a1f9-cab9f672c082",
      name: "UIncome",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      activeTab: "calculateRow",
      incomeResult: null,
      incomeResults: { IncomeList: [] },
      allFichseRes: null,
      allFichseResults: { All_Fiche: [], All_FicheByIncomeList: [] },
      incomeDetailsResult: null,
      incomeDetailsResults: { IncomeParameters: [], Income: {} },
      copyResult: null,
      deleteResult: null,
      isCopied: false,
      isDeleted: false,
      isDbClick: false,
      selectedCalculationRow: null,
      updateResult: null,
      saveResult: null,
      saveResults: {},
      allFichseResult: {
        AllFicheByIncomeList: []
      },
      items: [],
      ShowModal: false,
      loadIncomeListPrequest: {
        pNidProc: "d4b57d19-35d6-41a3-8339-4bf16a3f0f93"
      },
      results: {
        calculateRow: {},
        allFichesList: {},
        details: {},
        mode: "r",
        nidProc: "",
        nidIncome: ""
      },
      loadAllFichesPrequest: {
        pNidProc: "ad1878e5-d528-492c-a11b-52cd8f9b1a87"
      },
      loadDetailsPreqsuest: {
        pNidIncome: "8fc98967-7d59-484b-942b-2f1271604875",
        PLoadFun:
          "Income_LogMethod,Income,Income_Calculation_ForChange,Income_PrePayment,Income_OddmentAccount,Income_Discount,NidBase"
      },
      tabs: [],
      tabActions: {
        // calculateRow: [
        //   {
        //     label: 'ردیف محاسبه جدید',
        //     type: 'default',
        //     click: (e, btn) => this.newCalculationRow()
        //   }
        // ]
        // incomeDetails: [
        //   {
        //     label: 'ریز محاسبه',
        //     type: 'default'
        //   },
        //   {
        //     label: 'مجاز درآمد',
        //     type: 'default',
        //     click: (e, btn) => { this.$refs.detailsTab.isShowIncomeMjazMadal = true }
        //   }
        // ]
      },
      lastRef: "",
      isView: false,
      selectedRow: null,
      buildingSettings: {
        calculateIncomeBaseOnSettings: false,
        hideUserPriceColumn: false
      },
      loadIncomeCalcSettingResult: {
        errors: [],
        data: {
          Income_CalculationSettings: []
        }
      },
      incomeCalculationUserSettings: {
        RecentlySelection: null
      }
    }
  },
  mixins: [baseFormMixin],
  mounted () {
    if (this.selectedRequest) {
      this.getIncomeList()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.removeForm("UIncome")
      this.redirectToKartable()
    }
  },
  created () {
    this.fetchBuildingSettings()
  },
  methods: {
    showDetailsIncomeMojaz () {
      if (this.currentDetailsTab) {
        this.currentDetailsTab.isShowIncomeMjazMadal = true
      }
    },
    async fetchBuildingSettings () {
      try {
        this.loading = true
        this.showLoading()
        const result = await this.loadFormSetting("BuildingSettings", {
          nidProc: GLOBAL_SETTINGS_GUID
        })
        if (result && result.ShahrsaziSettingsIncome) {
          this.buildingSettings.calculateIncomeBaseOnSettings =
            result.ShahrsaziSettingsIncome.Chk_CalculateIncomeFromSettings // محاسبه درآمد از تنظیمات
          this.buildingSettings.hideUserPriceColumn =
            result.ShahrsaziSettingsIncome.Chk_DonotShowUserpriceColum // عدم نمایش ستون مبلغ کاربر
        }
        await this.loadIncomeCalculationSetting()
        await this.loadFormUserSelected()

        this.$nextTick(() => {
          this.tabs.forEach((tab) => {
            const refKey = tab.name + "-details"
            // console.log('refKey', refKey)
            if (this.$refs[refKey] && this.$refs[refKey].length > 0) {
              this.$refs[refKey][0].updateSettings({
                buildingSettings: this.buildingSettings,
                incomeSettings: (this.loadIncomeCalcSettingResult &&
                  this.loadIncomeCalcSettingResult.data) || {
                  Income_CalculationSettings: []
                },
                incomeCalculationUserSettings:
                  this.incomeCalculationUserSettings
              })
            }
          })
        })
      } catch (ex) {
        console.error(ex)
        this.showError("خطا در دریافت تنظیمات درآمد")
      } finally {
        this.loading = false
        this.hideLoading()
      }
    },
    async loadIncomeCalculationSetting () {
      try {
        let payload = {
          pNidWorkflowDef: this.selectedRequest.NidWorkflowDeff
        }
        const { data } = await this.$services.SD.loadIncomeCalculationSettings(
          payload,
          this.config
        )
        this.loadIncomeCalcSettingResult = this.getResponse(data)
        if (this.loadIncomeCalcSettingResult.success) {
          // this.loadIncomeCalcSettingResults = this.loadIncomeCalcSettingResult.data
          // this.incomeDetailResults.Income_Calculation_ForChange.forEach(x => {
          //   x.selected = this.loadIncomeCalcSettingResults.Income_CalculationSettings.some(
          //     y => y.CI_IncomeCalculation === x.CI_IncomeCalculation
          //   )
          // })
          /* this.$refs.ucalculates.setSelectedRows(this.loadIncomeCalcSettingResult.data.Income_CalculationSettings.map(x => x.CI_IncomeCalculation))
            // console.log(
              ' this.incomeDetailResults.Income_Calculation_ForChange',
              this.incomeDetailResults.Income_Calculation_ForChange
            ) */
          // await this.log({
          //   action: this.logActions.calculate,
          //   bizCode: payload.pNidWorkflowDef,
          //   bizCodeTitle: "NidIncome",
          //   saveDesc: "محاسبه فیش",
          //   nosaziCode: this.selectedRequest.BizCode,
          //   nidWorkItem: this.selectedRequest.NidWorkItem
          // })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async loadFormUserSelected () {
      const result = await this.loadFormSetting("IncomeCalculation", {
        defaultValue: this.incomeCalculationUserSettings,
        useCache: true
      })
      this.incomeCalculationUserSettings = result
    },
    showButton (key) {
      return this.actionButtons.includes(key)
    },
    async addTab (calculationRow) {
      if (!calculationRow) {
        return
      }

      await this.loadIncomeCalculationSetting()
      await this.loadFormUserSelected()

      const { NidIncome } = calculationRow
      const tabKey = `tab-${NidIncome}`
      const preferName =
        " جزئیات درآمد - تاریخ " +
        calculationRow.CreateDate +
        " - ساعت " +
        calculationRow.CreateTime
      const already = this.tabs.some(
        (x) => x.name.toLowerCase() === tabKey.toLowerCase()
      )

      if (already) {
        return
      }

      this.tabs.push({
        name: tabKey,
        label: preferName
      })
      // this.tabActions[tabKey] = [
      //   {
      //     label: 'ریز محاسبه',
      //     type: 'default',
      //     click: () => {
      //       this.print()
      //     }
      //   },
      //   {
      //     label: 'مجاز درآمد',
      //     type: 'default',
      //     click: (e, btn) => {
      //       this.$refs[tabKey + '-details'][0].isShowIncomeMjazMadal = true
      //     }
      //   }
      // ]
      const tabLength = this.tabs.length
      this.lastRef = this.tabs[tabLength - 1].name + "-details"
      this.activeTab = tabKey
      this.activeTab = "calculateRow"
      setTimeout(() => {
        this.activeTab = tabKey
        this.hideLoading()
      }, 100)
    },
    closeTab (tab) {
      const tabKey = tab.name
      this.tabs = this.tabs.filter((x) => x.name !== tabKey)
      delete this.tabActions[tabKey]
      this.activeTab = "calculateRow"
      const detailsPartial = this.$refs[tabKey + "-details"]
      if (detailsPartial && detailsPartial.length > 0) {
        // console.log(detailsPartial)
        detailsPartial[0].destroy()
      }
    },
    handleGridDblClick (e) {
      if (!this.selectedCalculationRow) {
        this.showError("هیچ ردیفی انتخاب نشده است")
        return
      }
      this.addTab(this.selectedCalculationRow)
    },
    clickRow (value) {
      this.selectedRow = value
    },
    async getIncomeList () {
      try {
        this.showLoading()
        const { data } = await this.$services.SD.getIncomeList(
          { pNidProc: this.selectedRequest.NidProc },
          this.config
        )
        this.incomeResult = this.getResponse(data)

        if (this.incomeResult.success) {
          this.incomeResults = this.incomeResult.data
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              saveDesc: `نمایش اطلاعات درآمدی برای درخواست شماره  ${this.selectedRequest.NidWorkItem} انجام گردید.`,
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem
            })
          }
          this.isView = true
        }
      } catch (e) {
        this.serverError()
        console.error("getIncomeList error", e)
      } finally {
        this.hideLoading()
      }
    },
    getAllFiches () {
      this.showLoading()
      this.$services.SD.getAllFicheByIncomeList(
        { pNidProc: this.selectedRequest.NidProc },
        this.config
      )
        .then(async ({ data }) => {
          this.allFichseRes = this.getResponse(data)
          if (this.allFichseRes.success) {
            this.allFichseResult.AllFicheByIncomeList =
              this.allFichseRes?.data?.All_FicheByIncomeList.map((x) => {
                return {
                  ...x.Income_Fiche,
                  IncomeCreateDate: x.IncomeCreateDate,
                  IncomeCreateTime: x.IncomeCreateTime
                }
              }) ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری لیست تمام فیش های درآمدی برای درخواست شماره  ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    newCalculationRow () {
      this.getIncomeDetails()
    },
    async getIncomeDetails () {
      try {
        this.showLoading()
        let payLoad = {
          pNidIncome: "00000000-0000-0000-0000-000000000000",
          PLoadFun: "Income"
        }
        const { data } = await this.$services.SD.getIncomeDetails(
          payLoad,
          this.config
        )
        this.incomeDetailsResult = this.getResponse(data)

        if (this.incomeDetailsResult.success) {
          this.incomeDetailsResults = this.incomeDetailsResult.data
          await this.saveIncome()
        }
      } catch (response) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    normalizeBestankari () {
      this.incomeDetailsResults.Income_OddmentAccount =
        this.incomeDetailsResults.Income_OddmentAccount.map((m) => {
          return {
            ...m,
            NidUser: m.NidUser || this.getNidUser(),
            UserName: m.UserName || this.getUserDisplayName()
          }
        })
    },
    async saveIncome () {
      if (
        this.incomeDetailsResults.Income_OddmentAccount &&
        Array.isArray(this.incomeDetailsResults.Income_OddmentAccount)
      ) {
        this.normalizeBestankari()
      }
      try {
        this.incomeDetailsResults.Income.NidProc = this.selectedRequest.NidProc
        this.incomeDetailsResults.Income.NidUser = this.getNidUser()
        this.incomeDetailsResults.Income.UserName = this.getUserDisplayName()
        let payLoad = {
          pIncome: this.incomeDetailsResults,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000" // this.selectedRequest?.NidWorkflowDeff
          },
          pIsLoadFromMenu: this.isSelectFromMenu
        }
        const { data } = await this.$services.SD.saveIncome(
          payLoad,
          this.config
        )
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          this.saveResults = this.saveResult.data
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `در درخواست ${this.selectedRequest.NidWorkItem} برای کاربر ${this.saveResults.Income.UserName}  در تاریخ ${this.saveResults.Income.CreateDate} و ساعت ${this.saveResults.Income.CreateTime} ردیف محاسبه جدید ایجاد گردید.`
          })
          await this.getIncomeList()
          await this.updateLastRreqestUpdate()
          // this.getAllFiches()
        }
      } catch (response) {
        this.serverError()
      }
    },
    async updateLastRreqestUpdate () {
      try {
        let lastReqStateStr = ""
        if (this.isCopied) {
          lastReqStateStr = "کپی گیری ردیف درآمد انجام شد"
        } else if (this.isDeleted) {
          lastReqStateStr = "ردیف محاسبه درآمد حذف شد"
        } else {
          lastReqStateStr = "ردیف محاسبه درآمد ایجاد شد"
        }
        let payLoad = {
          pNidProc: this.selectedRequest.NidProc,
          pLastRequestState: lastReqStateStr
        }
        const { data } = await this.$services.SD.updateLastRequestState(
          payLoad,
          this.config
        )
        this.updateResult = this.getResponse(data)
        if (this.updateResult.success) {
          // await this.log({
          //   action: this.logActions.update,
          //   bizCode: this.selectedRequest.NidProc,
          //   bizCodeTitle: "NidProc",
          //   saveDesc: `  ${lastReqStateStr} در NidProc :  ${this.selectedRequest.NidProc} `
          // })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async print () {
      const reportPath =
        "?ReportPath=/Sara8Reports/RptShahrsaziIncomeFactor&ReportParameter="
      const queryParams = {
        NidIncome: this.selectedRow.NidIncome,
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
          .District,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@99@80",
        NIdUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NidIncome,
        bizCodeTitle: "NidIncome",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `ریزمحاسبه برای کاربر ${this.selectedRow.UserName} که در تاریخ ${this.selectedRow.CreateDate} و ساعت ${this.selectedRow.CreateTime} ایجاد گردیده بود، انجام گردید. شماره NidIncome ${this.selectedRow.NidIncome} می باشد.`
      })
    },
    copyIncome () {
      const handler = async () => {
        try {
          this.showLoading()
          let payLoad = {
            pNidIncome: this.selectedRow.NidIncome,
            pUser: this.currentUser
          }
          const { data } = await this.$services.SD.copyIncome(
            payLoad,
            this.config
          )
          this.copyResult = this.getResponse(data)
          if (this.copyResult.success) {
            this.showSuccess("کپی گیری با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.copy,
              bizCode: this.selectedRow.NidIncome,
              bizCodeTitle: "NidIncome",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ردیف محاسبه برای کاربر ${this.selectedRow.UserName} که در تاریخ ${this.selectedRow.CreateDate} و ساعت ${this.selectedRow.CreateTime} ایجاد گردیده بود، کپی گیری انجام گردید. شماره NidIncome ${this.selectedRow.NidIncome} می باشد.`
            })
            await this.getIncomeList()
            await this.updateLastRreqestUpdate()
          }
        } catch (response) {
          this.serverError()
          console.error("copy error...", response)
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از کپی ردیف محاسباتی اطمینان دارید؟").onOk(handler)
    },
    deleteIncome () {
      console.log("this.selectedRow :>> ", this.selectedRow)
      const handler = async () => {
        try {
          this.showLoading()
          let payLoad = {
            pNidIncome: this.selectedRow.NidIncome,
            pNidUser: this.selectedRow.NidUser
          }
          const { data } = await this.$services.SD.deleteIncome(
            payLoad,
            this.config
          )
          this.deleteResult = this.getResponse(data)
          if (this.deleteResult.success) {
            this.showSuccess("حذف با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.delete,
              bizCode: this.selectedRow.NidIncome,
              bizCodeTitle: "NidIncome",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ردیف محاسبه برای کاربر ${this.selectedRow.UserName} که در تاریخ ${this.selectedRow.CreateDate} و ساعت ${this.selectedRow.CreateTime} ایجاد گردیده بود، حذف گردید.`
            })
            await this.getIncomeList()
            await this.updateLastRreqestUpdate()
          }
        } catch (response) {
          this.serverError()
          console.error("delete error...", response)
        } finally {
          this.hideLoading()
        }
      }

      this.showConfirm("آیا از حذف ردیف محاسباتی اطمینان دارید؟").onOk(handler)
    },
    showDetailIncomeTab (selectedRow) {
      this.selectedCalculationRow = selectedRow
      this.isDbClick = true
      // this.activeTab = "incomeDetails"
      this.isEditable = false
      if (!this.selectedCalculationRow) {
        this.showError("هیچ ردیفی انتخاب نشده است")
        return
      }
      this.addTab(this.selectedCalculationRow)
    },
    getCalcLogInfo () {
      if (!this.selectedRow) return
      this.showLoading()
      let data = {
        pNidIncome: this.selectedRow.NidIncome
      }
      this.$services.SD.getCalculateLogInfo(data)
        .then(async ({ data }) => {
          this.logResult = this.getResponse(data)
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRow.NidIncome,
            bizCodeTitle: "NidIncome",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: ` دریافت لاگ محاسبه درآمد برای فیش شماره  ${this.selectedRow.FicheNo ?? ''}  انجام گردید.`
          })

          if (this.logResult.success) {
            this.logResults = this.logResult.data
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    computedficheList (FicheList) {
      // this.fiches = []
      // if (this.isShowRevokeFiche) {
      this.incomeFicheResults.Income_Fiche.forEach((x) => {
        if (x.EumFicheStatus !== 4) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.fiches.push(x)
        }
      })
      // } else {
      //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      //   this.fiches = this.incomeFicheResults.Income_Fiche
      // }
      let sortFicheList = sortByPersianDateTime(
        this.fiche,
        "ExportPermanentDate",
        "ExportPermanentTime",
        "desc"
      )
      return sortFicheList
    },
    async onCancel () {
      const tab = this.tabs.find((x) => x.name === this.activeTab)
      await this.$refs[`${tab.name}-details`][0].reloadMainForm()
      // this.$emit("load");
      this.isEditable = false
    },
    saveSuccess () {
      this.isEditable = false
    }
  },
  props: {
    actionButtons: {
      type: Array,
      default: () => [
        "edit",
        "newRow",
        "deleteRow",
        "copyRow",
        "confirm",
        "regret",
        "rizMohasebe",
        "mojazDararmd",
        "reloadSetting"
      ]
    },
    showInnerBtn: { type: Boolean, default: true }
  },
  watch: {
    // activeTab: {
    //   handler (newVal, oldVal) {
    //     if (oldVal === "calculateRow" && newVal.startsWith("tab-")) {
    //       // this.showLoading()
    //       console.log('activeTab start >>>>> ', this.activeTab)
    //       setTimeout(() => {
    //         // debugger
    //         // this.hideLoading()
    //         console.log('activeTab end >>>>> ', this.activeTab)
    //       }, 1000)
    //     }
    //   },
    //   immediate: true
    // }
  },
  computed: {
    showEditButton () {
      return (
        (this.activeTab !== "calculateRow" &&
          this.activeTab !== "fishList" &&
          this.showButton("edit")) ??
        false
      )
    },
    config () {
      return { config: { District: this.selectedDistrict } }
    },
    currentDetailsTab () {
      const tab = this.$refs && this.$refs[this.activeTab + "-details"]
      if (tab && tab.length > 0) return tab[0]
      return null
    }
  }
}
</script>
