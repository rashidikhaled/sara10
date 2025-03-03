<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714c366c-1705-433d-970c-e04f6d62bd7d"

  >
    <form-wrapper :padding="false" title="درآمد" vertical @load="$emit('load')">
      <safa-status :result="deleteResult"></safa-status>
      <safa-status :result="saveResult"></safa-status>
      <safa-status :result="incomeResult"></safa-status>
      <safa-status :result="copyResult"></safa-status>
      <safa-status :result="incomeDetailsResult"></safa-status>
      <safa-status :result="updateResult"></safa-status>
      <safa-status :result="allFichseResult"></safa-status>

      <safa-tabs
        v-model="activeTab"
        :bordered="false"
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
        <tab-content :padding="false" name="calculateRow">
          <UCalculateRow
            ref="calculateRowTab"
            :formKey="formKey"
            :incomeResults="incomeResults"
            :name="name"
            :taskInfo="taskInfo"
            :title="title"
            @clickRow="clickRow"
            @showDetailIncomeTab="showDetailIncomeTab"
          />
        </tab-content>
        <tab-content name="fishList">
          <UFishList
            :allFiches="allFiches"
            :allFichseResults="allFichseResults"
            :formKey="formKey"
            :name="name"
            :taskInfo="taskInfo"
            :title="title"
            @reloadAllFishes="reloadAllFishes"
          />
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
            :selectedCalculationRow="selectedCalculationRow"
            :taskInfo="taskInfo"
            :title="title"
            @saveSuccess="saveSuccess"
            :loadFromMenu="isSelectFromMenu"
            :config="config"
          />
        </tab-content>
      </safa-tabs>

      <template v-if="activeTab !== 'fishList'" v-slot:footer>
        <form-actions
          :buttons="tabActions"
          :m="mode"
          :showEditButton="
            showButton('edit') &&
            activeTab !== 'fishList' &&
            activeTab !== 'calculateRow'
          "
          :value="activeTab"
          editFormId="1a900b2d-8f38-4ff9-bc79-49ee8247580d"
          editSPId="ce06f68b-39b3-49d1-af86-822bd6afea50"
          height="40px"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @save="$refs[activeTab + '-details'][0].save()"
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
                isClickedRow &&
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
                isClickedRow &&
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
              :disable="$refs[activeTab + '-details'][0].disableConfirmBtn"
              formId="1a900b2d-8f38-4ff9-bc79-49ee8247580d"
              label="تایید"
              spCaption="تایید"
              spId="d3f653dd-d790-42c3-b164-16b677a4ba7a"
              @click="$refs[activeTab + '-details'][0].confirmInfo()"
            />
            <btn-default
              v-if="
                activeTab !== 'fishList' &&
                activeTab !== 'calculateRow' &&
                showButton('regret')
              "
              :disable="$refs[activeTab + '-details'][0].disableUnconfirmedBtn"
              spId="D519F60D-BE8C-4007-8671-9F6668EC5C99"
              spCaption="عدم تایید"
              @click="$refs[activeTab + '-details'][0].unConfirmedInfo()"
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
              @click="
                $refs[activeTab + '-details'][0].isShowIncomeMjazMadal = true
              "
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
import { convertStringToNosaziCodeObject } from "../../../../utils/nosaziCodeOperation"

export default {
  route: "/income/income",

  components: {
    UCalculateRow,
    UFishList,
    UIncomeDetailsTabs
  },
  data: function () {
    return {
      title: "درآمد- درآمد",
      formKey: "274ae866-ab6a-4b66-a1f9-cab9f672c082",
      name: "UIncome22",
      // main: true,
      // sidebarCompatible: true,
      // workflowCompatible: true,
      activeTab: "calculateRow",
      incomeResult: null,
      incomeResults: { IncomeList: [] },
      allFichseResult: null,
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
      allFiches: [],
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
      isClickedRow: false,
      lastRef: "",
      isView: false,
      selectedRow: null
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
  methods: {
    showButton (key) {
      return this.actionButtons.includes(key)
    },
    addTab (calculationRow) {
      if (!calculationRow) {
        return
      }

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
      this.activeTab = tabKey

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
    },
    closeTab (tab) {
      const tabKey = tab.name
      this.tabs = this.tabs.filter((x) => x.name !== tabKey)
      this.tabActions[tabKey] = undefined
      this.activeTab = "calculateRow"
      const detailsPartial = this.$refs[tabKey + "-details"]
      if (detailsPartial && detailsPartial.destroy) {
        console.log(detailsPartial)
        detailsPartial.destroy()
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
      this.isClickedRow = true
    },
    async getIncomeList () {
      try {
        this.showLoading()
        let payLoad = {
          pNidProc: this.selectedRequest.NidProc
        }
        const { data } = await this.$services.SD.getIncomeList(
          payLoad,
          this.config
        )
        this.incomeResult = this.getResponse(data)

        if (this.incomeResult.success) {
          this.incomeResults = this.incomeResult.data
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc"
            })
          }
          this.isView = true
        }
      } catch (response) {
        this.serverError()
        console.error("load income List error", response)
      } finally {
        this.hideLoading()
      }
    },
    getAllFiches () {
      this.showLoading()
      let data = {
        pNidProc: this.selectedRequest.NidProc
      }
      this.$services.SD.getAllFicheByIncomeList(data, this.config)
        .then(async ({ data }) => {
          this.allFichseResult = this.getResponse(data)

          if (this.allFichseResult.success) {
            this.allFichseResults = this.allFichseResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc"
            })
            if (
              this.allFichseResults &&
              this.allFichseResults.All_FicheByIncomeList &&
              this.allFichseResults.All_FicheByIncomeList.length > 0
            ) {
              this.allFichseResults.All_FicheByIncomeList.forEach((x) => {
                this.allFiches.push({
                  ...x.Income_Fiche,
                  IncomeCreateDate: x.IncomeCreateDate,
                  IncomeCreateTime: x.IncomeCreateTime
                })
              })
              this.allFiches.map((x) => {
                if (x.EumFicheStatus === 0) {
                  x.class = "dutyFichePermanent"
                } else if (x.EumFicheStatus === 1) {
                  x.class = "dutyFicheConfirm"
                } else if (x.EumFicheStatus === 2) {
                  x.class = "dutyFichePrint"
                } else if (x.EumFicheStatus === 7) {
                  x.class = "dutyFicheTempExport"
                } else if (x.EumFicheStatus === 3) {
                  x.class = "dutyFicheConfirmBank"
                } else if (x.EumFicheStatus === 4) {
                  x.class = "dutyFicheRevoke"
                }
                return x
              })
            }
          }
        })
        .catch((response) => {
          console.error("load fish list", response)
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
    async saveIncome () {
      try {
        this.incomeDetailsResults.Income.NidProc = this.selectedRequest.NidProc
        this.incomeDetailsResults.Income.NidUser = this.getNidUser()
        this.incomeDetailsResults.Income.UserName = this.getUserDisplayName()
        let payLoad = {
          pIncome: this.incomeDetailsResults,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
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
            bizCodeTitle: "NidProc"
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
          await this.log({
            action: this.logActions.update,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc"
          })
        }
      } catch (response) {
        this.serverError()
      }
    },
    print () {
      const reportPath =
        "/Sara8Reports/RptShahrsaziIncomeFactor"
      const queryParams = {
        NidIncome: this.selectedRow.NidIncome,
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
          .District,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@99@80",
        NIdUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
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
            this.isClickedRow = false
            this.showSuccess("کپی گیری با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.copy,
              bizCode: this.selectedRow.NidIncome,
              bizCodeTitle: "NidIncome"
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
            this.isClickedRow = false
            this.showSuccess("حذف با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.delete,
              bizCode: this.selectedRow.NidIncome,
              bizCodeTitle: "NidIncome"
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
    reloadAllFishes () {
      this.getAllFiches()
    },
    showDetailIncomeTab (selectedRow) {
      this.selectedCalculationRow = selectedRow
      this.isDbClick = true
      this.activeTab = "incomeDetails"
      this.isEditable = false
      if (!this.selectedCalculationRow) {
        this.showError("هیچ ردیفی انتخاب نشده است")
        return
      }
      this.addTab(this.selectedCalculationRow)
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
        "mojazDararmd"
      ]
    },
    showInnerBtn: { type: Boolean, default: true }
  },
  computed: {
    config () {
      return { config: { District: this.selectedDistrict } }
    }
  }
}
</script>
