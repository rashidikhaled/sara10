
<template>
  <safa-form
    appId="c254f209-304e-41f0-a95a-174cf1279618"
    caption="صدور فیش - گردش کار"
    :id="formKey"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="incomeResult" />
        <safa-status :result="incomeFichesResult" />
        <safa-status :result="incomeCalculationResult" />
        <safa-status :result="exportGeneralIncomeFicheResult" />
      </template>
      <fit>
        <FormRow>
          <FormControl class="flex items-center">
            <div class="q-gutter-x-lg">
              <safa-radio
                label="کد ملی"
                v-model="selectType"
                cdcName="selectType"
                :val="1"
              />
              <safa-radio
                label="کد نوسازی"
                v-model="selectType"
                cdcName="selectType"
                :val="2"
              />
            </div>
          </FormControl>
          <nosazi-code-input
            label="کد نوسازی"
            label-width="70px"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            v-if="selectType === 2"
            @enter="loadObj"
          />
          <FormControl v-show="selectType === 1">
            <safa-text
              label="کد ملی"
              label-width="70px"
              v-model="filtering.IdentificationNo"
              cdcName="IdentificationNo"
              type="number"
              dir="ltr"
              :required="selectType === 1 ? true : false"
              :validations="
                selectType === 1
                  ? ['required', 'number', validations.NationalCode]
                  : ''
              "
            />
          </FormControl>
        </FormRow>
        <q-separator class="q-my-sm" />
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="نام متقاضی"
              label-width="70px"
              v-model="filtering.RequesterName"
              cdcName="RequesterName"
              @keypress.enter="loadObj"
            >
              <template v-slot:append>
                <q-icon
                  v-if="filtering.RequesterName"
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="filtering.RequesterName = null"
                  color="primary"
                  name="clear"
                  class="cursor-pointer"
                />
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره همراه"
              label-width="70px"
              v-model="filtering.CellPhone"
              cdcName="cellPhone"
              @keypress.enter="loadObj"
            >
              <template v-slot:append>
                <q-icon
                  v-if="filtering.CellPhone"
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="filtering.CellPhone = null"
                  color="primary"
                  name="clear"
                  class="cursor-pointer"
                />
              </template>
            </safa-text>
          </FormControl>
          <FormControl v-if="selectType === 1">
            <safa-combo
              source-type="local"
              :options="districts"
              label="منطقه"
              @input="districtChanged"
              :use-input="false"
              label-width="70px"
              v-model="filtering.District"
              cdcName="District"
              :m="selectType === 1 ? 'e' : 'r'"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="آدرس"
              label-width="70px"
              v-model="filtering.Address"
              cdcName="address"
              @keypress.enter="loadObj"
            >
              <template v-slot:append>
                <q-icon
                  v-if="filtering.Address"
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="filtering.Address = null"
                  color="primary"
                  name="clear"
                  class="cursor-pointer"
                />
              </template>
            </safa-text>
          </FormControl>
          <div class="q-gutter-sm">
            <btn-search label="جستجو" @click="loadObj" />
            <btn-cancel label="حذف" @click="reset" />
          </div>
        </FormRow>

        <safa-splitter
          v-model="splitterModel"
          :limits="splitterLimit"
          class="fit q-mb-sm"
          vertical
          margin="0"
          style="min-height: 200px"
        >
        <!-- helper="generalIncomeColumns" -->

          <template v-slot:before>
            <safa-grid
              title="لیست درخواست ها"
              :columns="columns"

              v-model="generalIncomeList"
              cdcName="generalIncomeList"
              m="e"
              fit
              selectable
              @row:click="selectGeneralIncomeRow"
              paginate
            />
          </template>
          <template v-slot:after>
            <safa-tabs v-model="activeTab" class="fit" :padding="false">
              <template v-slot:tabs>
                <tab-menu name="calculate" label="محاسبات" />
                <tab-menu name="fish" label="فیش" />
              </template>
              <tab-content name="calculate">
                <fit>
                  <safa-grid
                    title="عوارض"
                    v-model="ciGeneralIncomeCalculationList"
                    :columns="generalIncomeCalculationColumns"
                    cdcName="ciGeneralIncomeCalculationList"
                    m="e"
                    :filterable="true"
                    sortable
                    selectable
                    @row:click="selectClac"
                    :pinnedBottomRowData="[{}]"
                    paginate
                  />
                </fit>
              </tab-content>
              <tab-content name="fish">
                <fit>
                  <div class="flex items-center q-pa-sm">
                    <safa-checkbox
                      label="عدم نمایش فیش های باطله"
                      v-model="showCancelFiches"
                      cdcName="showCancelFiches"
                    />
                  </div>
                  <safa-grid
                    v-model="generalIncomeFicheList"
                    cdcName="generalIncomeFicheList"
                    :columns="generalIncomeFicheColumns"
                    title="فیش"
                    m="r"
                    fit
                    height="100%"
                    max-height="100%"
                    min-height="150px"
                    :show-selected-checkbox="false"
                    :allowMultipleSelection="false"
                    @selection:changed="selectFiche"
                    @DetailClick="ficheDetailHandler"
                    :addRow="false"
                    :deleteRow="false"
                    :allowCopy="false"
                    paginate
                  />
                </fit>
              </tab-content>
            </safa-tabs>
          </template>
        </safa-splitter>
      </fit>
      <form-actions :m="mode" :showEditButton="false">
        <template v-slot:before v-if="activeTab === 'calculate'">
          <btn-default
            label="صدور فیش"
            :disable="generalIncomeList.length === 0"
            @click="showReceiptIssuanceHanldler"
          />

        </template>
        <template v-slot:after v-else>
          <btn-default
            label="تایید"
            :disable="lockConfirm"
            @click="confirmFicheHandler"
          />
          <btn-default
            label="ابطال"
            :disable="lockRevoke"
            @click="revokeFicheHandler"
          />
          <btn-default label="چاپ فیش" @click="printFiche" />
          <btn-default
            label="چاپ فیش پرفراژ"
            @click="printPerforageFiche"
          />
          <btn-default label="تقسیط" @click="showInstallment = true" />
          <btn-default
            label="تایید با Pose"
            @click="showConfirmByPoseHandler"
          />
          <btn-default label="گزارش مفاسا حساب" @click="printMafasa" />
        </template>
      </form-actions>
    </form-wrapper>

    <safa-popup
      title="جزئیات فیش"
      v-model="showFicheDetail"
      width="500px"
      height="460px"
    >
      <safa-grid
        title="جزئیات فیش"
        helper="generalIncomeFicheDetailColumns"
        hideHeader
        v-model="generalIncomeFicheDetail"
        m="r"
        fit
        height="100%"
        max-height="100%"
        min-height="150px"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        paginate
        cdcName="generalIncomeFicheDetail"
      />
    </safa-popup>
    <safa-popup
      title="تخفیف"
      v-model="showReceiptIssuance"
      width="400px"
      height="300px"
    >
      <ReceiptIssuance
        @confirm="exportGeneralIncomeFiche"
        @hide="showReceiptIssuance = false"
      />
    </safa-popup>
    <safa-popup
      title="مشخصات فیش پرداختی"
      v-model="showConfirmFiche"
      width="600px"
      height="300px"
    >
      <ConfirmFiche
        v-model="selectedFiche"
        :formKey="formKey"
        :title="title"
        @confirm="reload"
        @hide="showConfirmFiche = false"
      />
    </safa-popup>
    <safa-popup
      v-model="showConfirmByPose"
      title="انتخاب پوز"
      width="300px"
      height="300px"
    >
      <ConfirmByPose
        :selectedRegion="selectedRegion"
        v-model="selectedFiche"
        :formKey="formKey"
        @reload="reload"
        @hide="showConfirmByPose = false"
      />
    </safa-popup>
    <safa-popup
      v-model="showInstallment"
      title="تقسیط فیش"
      width="900px"
      height="750px"
    >
      <installment-fiche
        :selectedFiche="selectedFiche"
        :config="config"
        :isSelectFromMenu="isSelectFromMenu"
        :selectedCalculationRow="selectedCalculationRow"
        :formKey="formKey"
        :title="title"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import { EumFicheConfirmMethode } from 'src/forms/general-income/config/enums.js'
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"
import customValidation from "src/utils/customValidation"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import converter from "xml-js"
import ConfirmByPose from "./partials/ConfirmByPose.vue"
import ConfirmFiche from "./partials/ConfirmFiche.vue"
import InstallmentFiche from "./partials/InstallmentFiche.vue"
import ReceiptIssuance from "./partials/ReceiptIssuance.vue"

export default {
  components: {
    ReceiptIssuance,
    ConfirmFiche,
    ConfirmByPose,
    InstallmentFiche
  },
  mixins: [baseFormMixin, mapMixin],
  data () {
    return {
      name: "UGeneralIncomeFiches",
      title: "صدور فیش",
      formKey: "edb247a0-4352-403c-bf08-ce1fc2bd0a1e",
      main: true,
      sidebarCompatible: true,
      selectType: 1,
      splitterModel: 47,
      splitterLimit: [40, 100],
      activeTab: "calculate",
      validations: {
        NationalCode: customValidation.nationalCode
      },
      filtering: {
        District: null,
        CellPhone: null,
        RequesterName: null,
        Address: null,
        IdentificationNo: null
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      selectedRegion: 1,

      incomeResult: null,
      incomeFichesResult: null,
      incomeCalculationResult: null,
      exportGeneralIncomeFicheResult: null,
      generalIncomeList: [],
      generalIncomeFicheList: [],
      generalIncomeFicheDetail: [],
      ciGeneralIncomeCalculationList: [],

      showCancelFiches: false,
      selectedIncome: null,
      selectedFiche: null,
      selectedClac: null,
      selectedCalculationRow: null,

      showFicheDetail: false,
      showReceiptIssuance: false,
      showConfirmFiche: false,
      showConfirmByPose: false,
      showInstallment: false,
      generalIncomeFicheColumns: [
        {
          field: "isSelected",
          width: 40,
          headerCheckboxSelection: false,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          sortable: false,
          filter: false,
          filterable: false
        },
        {
          field: "RowId",
          title: "ردیف",
          width: "82px",
          filter: "agMultiColumnFilter"
        },
        {
          field: "",
          title: "جزئیات",
          editor: "action",
          width: "100px",
          btnColor: "",
          btnIcon: "",
          cellRenderer: "agCallbackBtn",
          cellClass: "custom-pinned-row",
          callback: (params) => this.ficheDetailHandler(params)
        },
        {
          field: "FicheNo",
          title: "شماره فیش",
          filter: "agMultiColumnFilter",
          width: 120
        },
        {
          field: "FicheAmount",
          title: "مبلغ فیش",
          editor: "money",
          width: 100
        },
        {
          field: "EumFicheStatus",
          title: "وضعیت فیش",
          editor: "combo",
          source: [
            { ID: 0, Title: "صدور موقتی" },
            { ID: 1, Title: "صدور قطعی" },
            { ID: 2, Title: "چاپ فیش" },
            { ID: 3, Title: "تأیید" },
            { ID: 4, Title: "ابطال" },
            { ID: 7, Title: "تأیید انتقال" }
          ],
          width: 100
          // domain: "Survey"
        },
        {
          field: "N0",
          title: "مبلغ تخفیف",
          editor: "money",
          width: 100
        },
        {
          field: "CI_RequesterType",
          title: "درخواست دهنده",
          editor: "combo",
          width: 130,
          domain: "Commission5"
        },
        { field: "BillID", title: "شناسه قبض", width: 100 },
        { field: "Comments", title: "توضیحات", width: 150 },

        { field: "PaymentID", title: "شناسه پرداخت", width: 100 },
        {
          field: "Payable",
          title: "قابل پرداخت",
          editor: "money",
          width: 100
        },
        {
          field: "InsatllmentValue",
          title: "مبلغ تقسيط",
          editor: "money",
          width: 100
        },
        {
          field: "FromDate",
          title: "از تاریخ",
          width: 100,
          editor: "date"
        },
        {
          field: "ExportDate",
          title: "تاریخ صدور",
          width: 100,
          editor: "date"
        },
        {
          field: "ExportTime",
          width: 100,
          title: "زمان صدور"
        },
        {
          field: "UserNameExporter",
          width: 120,
          title: "کاربر صادر کننده"
        },
        {
          field: "PaymentBreakDate",
          editor: "date",
          width: 100,
          title: "مهلت پرداخت"
        },
        {
          field: "PaymentBank",
          width: 100,
          title: "بانک"
        },
        {
          field: "PaymentBranch",
          width: 100,
          title: "شعبه"
        },
        {
          field: "PaymentDate",
          editor: "date",
          width: 100,
          title: "تاریخ پرداخت"
        },
        {
          field: "PaymentTime",
          width: 100,
          title: "زمان پرداخت"
        },
        {
          field: "UserNamePayment",
          width: 120,
          title: "کاربر پرداخت کننده"
        },
        {
          field: "EumFicheConfirmMethode",
          width: 100,
          cellRenderer: (params) => `<span >${this.getEumFicheConfirmMethode(params.value)}</span>`,
          title: "نوع پرداخت فیش"
        },
        {
          field: "ConfirmDate",
          editor: "date",
          width: 100,
          title: "تاریخ تایید"
        },
        {
          field: "ConfirmTime",
          width: 100,
          title: "زمان تایید"
        },
        {
          field: "UserNameConfirm",
          width: 100,
          title: "کاربر تایید کننده"
        },
        {
          field: "EumIncomePaymentType",
          title: "روش تایید فیش",
          editor: "combo",
          source: [
            { ID: 1, Title: "دستی" },
            { ID: 2, Title: "پی سی پوز" },
            { ID: 3, Title: "فایل بانک" },
            { ID: 4, Title: "تایید آنی بانک" },
            { ID: 5, Title: "وب سرویس بانک" },
            { ID: 6, Title: "خدمات شهروندان" },
            { ID: 7, Title: "شهروند سپاری" }
          ],
          width: 100
          // domain: "Survey"
        }
      ],
      generalIncomeCalculationColumns: [
        {
          field: "isSelectedNode",
          title: "",
          width: "44px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          editor: "selection"
        },
        {
          field: "RowId",
          title: "ردیف",
          width: "70px",
          editable: false,
          filter: "agMultiColumnFilter"
        },
        {
          field: "IncomeCode",
          title: "کد درآمد",
          width: "110px",
          editable: false
        },
        {
          field: "Title",
          title: "عنوان",
          width: "130px",
          editable: false
        },
        {
          field: "SysValue",
          title: "مبلغ سیستم",
          width: "120px",
          editor: "money",
          type: "numeric",
          cellRendererSelector: (params) => this.sysValueCellRenderer(params),
          cellClass: "custom-pinned-row",
          editable: false
        },
        {
          field: "UserValue",
          title: "مبلغ کاربر",
          width: "180px",
          editor: "money",
          type: "numeric",
          cellRendererSelector: (params) => this.userValueCellRenderer(params),
          cellClass: "custom-pinned-row"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "180px"
        },
        {
          field: "BankAccountNo",
          title: "شماره حساب بانکی",
          width: "150px"
        }
      ],
      columns: [
        {
          field: "RowId",
          title: "ردیف",
          width: "82px",
          filter: "agMultiColumnFilter"
        },
        {
          field: "IdentificationNo",
          title: "کد 222زی/کد ملی",
          width: "100px"
        },
        {
          field: "RequesterName",
          title: "نام",
          width: "120px"
        },
        {
          field: "CellPhone",
          title: "شماره همراه",
          width: "80px"
        },
        {
          field: "Address",
          title: "آدرس",
          width: "200px"
        },
        {
          field: "RequesterName",
          title: "نام",
          width: "120px"
        },
        {
          field: "CreateDate",
          title: "تاریخ درخواست",
          width: "100px"
        },
        {
          field: "District",
          title: "منطقه",
          width: "100px"
        }
      ]
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    getEumFicheConfirmMethode (value) {
      if (isNaN(value)) {
        return value
      }
      for (const key in EumFicheConfirmMethode) {
        if (EumFicheConfirmMethode[key].value === value) {
          return EumFicheConfirmMethode[key].title
        }
      }
      return ""
    },
    showReceiptIssuanceHanldler () {
      const tmp = this.ciGeneralIncomeCalculationList.some(
        ({ isSelectedNode }) => isSelectedNode === !0
      )
      tmp
        ? (this.showReceiptIssuance = !0)
        : this.showError("لطفا حداقل یک سطر از جدول عوارض را انتخاب نمایید.")
    },
    reset () {
      this.filtering = {
        District: null,
        CellPhone: null,
        RequesterName: null,
        Address: null,
        IdentificationNo: null
      }
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.loadObj()
    },
    checkNationalCodeIsValid () {
      const result = customValidation.nationalCode.validate(
        this.model.IdentificationNo
      )
      return !result.error
    },
    sysValueCellRenderer (params) {
      if (params.node.rowPinned === "bottom") {
        return {
          component: "agAggregateFotterTemplate",
          params: {
            totalValue: () => {
              let total = 0
              try {
                total = this.ciGeneralIncomeCalculationList
                  .filter((x) => x.SysValue !== null)
                  .reduce((a, { SysValue: b }) => a + parseFloat(b), 0)
              } catch (ex) {
                total = 0
              }
              console.log(`جمع کل : ${total.toNumberWithCommas()}`)
              return `جمع کل : ${total.toNumberWithCommas()}`
            }
          }
        }
      }
      return undefined
    },
    userValueCellRenderer (params) {
      if (params.node.rowPinned === "bottom") {
        return {
          component: "agAggregateFotterTemplate",
          params: {
            totalValue: () => {
              let total = 0
              try {
                total = this.ciGeneralIncomeCalculationList
                  .filter((x) => x.UserValue !== null)
                  .reduce((a, { UserValue: b }) => a + parseFloat(b), 0)
              } catch (ex) {
                total = 0
              }
              console.log(`جمع کل : ${total.toNumberWithCommas()}`)
              if (isNaN(total)) {
                return `جمع کل : 0`
              } else {
                return `جمع کل : ${total.toNumberWithCommas()}`
              }
            }
          }
        }
      }
      return undefined
    },
    async loadObj () {
      try {
        const tmp =
          this.selectType === 1
            ? this.filtering.District
            : this.baseNosaziCode.District
        const dist = tmp === 0 || tmp === null || tmp === "" ? 1 : tmp
        this.showLoading()
        const payload = {
          pFromRow: 0,
          pToRow: 1000,
          pWhere: this.query
        }
        const { data } = await this.$services.generalIncome.getGeneralIncome(
          payload,
          { config: { District: dist } }
        )
        this.incomeResult = this.getResponse(data)
        if (this.incomeResult.success) {
          this.generalIncomeList = this.incomeResult.data.GeneralIncome.map(
            (x, i) => {
              return {
                ...x,
                RowId: i + 1
              }
            }
          )
          await this.log({
            action: this.logActions.view,
            bizCode: payload.NosaziCode,
            bizCodeTitle: "NosaziCode"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    districtChanged (District) {
      // console.log('district changed from AgentCalendar: ' + District)
      this.baseNosaziCode = { ...this.baseNosaziCode, District }
    },
    getFiches () {
      this.showLoading()
      this.$services.generalIncome
        .getGeneralIncomeFiches({
          pNidGeneralIncome: this.selectedIncome.NidGeneralIncome
        })
        .then(async ({ data }) => {
          this.incomeFichesResult = this.getResponse(data)
          if (this.incomeFichesResult.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedIncome.NidGeneralIncome,
              bizCodeTitle: "NidGeneralIncome"
            })
            let list = []
            if (this.showCancelFiches) {
              list = this.incomeFichesResult.data.GeneralIncomeFicheList.filter(
                (item) => item.EumFicheStatus !== 4
              )
            } else {
              list = this.incomeFichesResult.data.GeneralIncomeFicheList
            }

            this.generalIncomeFicheList = list.map((m) => {
              if (m.EumFicheStatus === 0) {
                m.class = "dutyFichePermanent"
              } else if (m.EumFicheStatus === 1) {
                m.class = "dutyFicheConfirm"
              } else if (m.EumFicheStatus === 2) {
                m.class = "dutyFichePrint"
              } else if (m.EumFicheStatus === 7) {
                m.class = "dutyFicheTempExport"
              } else if (m.EumFicheStatus === 3) {
                m.class = "dutyFicheConfirmBank"
              } else if (m.EumFicheStatus === 4) {
                m.class = "dutyFicheRevoke"
              }
              return m
            })
            this.generalIncomeFicheList =
              this.generalIncomeFicheList.map((x, i) => {
                return {
                  ...x,
                  RowId: i + 1
                }
              }) || []
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
    getCIGeneralIncomeCalculation () {
      this.showLoading()
      this.$services.generalIncome
        .getCIGeneralIncomeCalculationList()
        .then(({ data }) => {
          this.incomeCalculationResult = this.getResponse(data)
          if (this.incomeCalculationResult.success) {
            this.ciGeneralIncomeCalculationList =
              this.incomeCalculationResult.data.CI_GeneralIncomeCalculationList.map(
                (m, i) => {
                  return {
                    ...m,
                    isSelectedNode: false,
                    RowId: i + 1
                  }
                }
              )
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
    selectGeneralIncomeRow ({ data }) {
      let isNosaziCodeValid = data.IdentificationNo.split("-").length > 1
      if (isNosaziCodeValid) {
        this.showCodeOnMap(data.IdentificationNo)
      }
      this.selectedIncome = data
      this.selectedClac = null
      this.selectedFiche = null
      this.getFiches()
      this.getCIGeneralIncomeCalculation()
    },
    selectFiche (e) {
      console.log("this.selectedFiche :>> ", this.selectedFiche)
      this.selectedFiche = e.api.getSelectedRows()[0]
    },
    confirmFicheHandler () {
      if (this.selectedFiche) {
        this.showConfirm("آیا از تایید فیش انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.showConfirmFiche = true
          }
        )
      }
    },
    revokeFicheHandler () {
      if (this.selectedFiche) {
        this.showConfirm("آیا از ابطال فیش انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.revokeFicheFiche()
          }
        )
      }
    },
    showConfirmByPoseHandler () {
      if (this.selectedFiche) {
        this.showConfirm(
          "آیا از تایید فیش انتخاب شده از POS اطمینان دارید؟"
        ).onOk(() => {
          this.showConfirmByPose = true
        })
      } else {
        this.showError("لطفا فیش مورد نظر را انتخاب نمایید.")
      }
    },
    revokeFicheFiche () {
      this.showLoading()
      this.$services.generalIncome
        .changeStatusOfFiche({
          pNidFiche: this.selectedFiche.NidFiche,
          pFicheStatus: 4, // this.value.EumFicheStatus,
          pUser: this.currentUser,
          pPaymentBank: null,
          pPaymentDate: null,
          pFicheConfirmMethode: this.selectedFiche.EumFicheConfirmMethode
        })
        .then(async ({ data }) => {
          this.changeStatusOfFicheResult = this.getResponse(data)
          if (this.changeStatusOfFicheResult.success) {
            this.showSuccess("ابطال فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.selectedFiche.NidFiche,
              bizCodeTitle: "NidFiche"
            })
            this.reload()
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
    selectClac ({ data }) {
      // this.selectedClac = e.selectedItems;
      this.selectedCalculationRow = data
    },
    reload () {
      this.showReceiptIssuance = false
      this.showConfirmFiche = false
      this.showConfirmByPose = false
      this.showInstallment = false
      this.getFiches()
      this.getCIGeneralIncomeCalculation()
    },
    async printFiche () {
      // http://192.168.100.170:7000/ReportService/RptViewer14/Viewer/RptViewer.aspx
      // /Sara8Reports/RptGeneralIncomeFicheNidFiche;b6a12218-580d-4d23-ba9f-4a7dc49e3de9,District;1
      if (!this.selectedFiche) {
        return this.showError("لطفا فیش مورد نظر را انتخاب نمایید.")
      }
      const reportPath =
        "/Sara8Reports/RptGeneralIncomeFiche"
      const queryParams = {
        NidFiche: this.selectedFiche.NidFiche,
        District: this.selectedRegion
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedFiche.NidFiche,
        bizCodeTitle: "NidFiche"
      })
    },
    // async printPerforageFiche2 () {
    //   // http://192.168.100.170:7000/ReportService/RptViewer14/Viewer/RptViewer.aspx
    //   // /Sara8Reports/RptGeneralIncomeFicheNidFiche;b6a12218-580d-4d23-ba9f-4a7dc49e3de9,District;1
    //   if (!this.selectedFiche) {
    //     return this.showError("لطفا فیش مورد نظر را انتخاب نمایید.")
    //   }
    //   const reportPath =
    //     "/Sara8Reports/RptGeneralIncomeFiche"
    //   const queryParams = {
    //     NidFiche: this.selectedFiche.NidFiche,
    //     District: this.selectedRegion
    //   }
    //   this.showReport(reportPath, queryParams)
    //   await this.log({
    //     action: this.logActions.printReport,
    //     bizCode: this.selectedFiche.NidFiche,
    //     bizCodeTitle: "NidFiche"
    //   })
    // },
    async printPerforageFiche () {
      if (!this.selectedFiche) {
        return this.showError("لطفا فیش مورد نظر را انتخاب نمایید.")
      }
      const reportPath =
        "/Sara8Reports/RptGeneralIncomeFichePose"
      const queryParams = {
        NidFiche: this.selectedFiche.NidFiche,
        NidUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedFiche.NidFiche,
        bizCodeTitle: "NidFiche"
      })
    },
    async printMafasa () {
      //   http://192.168.100.170:7000/ReportService/RptViewer14/Viewer/RptViewer.aspx
      // /Sara8Reports/RptGeneralIncomeMafasaNidFiche;b6a12218-580d-4d23-ba9f-4a7dc49e3de9
      if (!this.selectedFiche) {
        return this.showError("لطفا فیش مورد نظر را انتخاب نمایید.")
      }
      const reportPath =
        "/Sara8Reports/RptGeneralIncomeMafasa"
      const queryParams = {
        NidFiche: this.selectedFiche.NidFiche
        // District: this.selectedRegion,
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedFiche.NidFiche,
        bizCodeTitle: "NidFiche"
      })
    },

    exportGeneralIncomeFiche ({ discountType, discountValue, comment, discountDate }) {
      this.showLoading()
      this.$services.generalIncome
        .exportGeneralIncomeFiche({
          pNidGeneralIncome: this.selectedIncome.NidGeneralIncome,
          pGeneralIncomeCalcCodes: this.ciGeneralIncomeCalculationList.filter(
            (item) => item.isSelectedNode === true
          ),
          pUser: this.currentUser,
          pDiscountType: discountType,
          pDiscountValue: discountValue,
          pComments: comment,
          pDiscountDate: discountDate
        })
        .then(async ({ data }) => {
          this.exportGeneralIncomeFicheResult = this.getResponse(data)
          if (this.exportGeneralIncomeFicheResult.success) {
            this.showSuccess("صدور فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.confirmOutput,
              bizCode: this.selectedIncome.NidGeneralIncome,
              bizCodeTitle: "NidGeneralIncome"
            })
            this.reload()
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
    ficheDetailHandler (params) {
      let list = []
      // eslint-disable-next-line no-unused-vars
      const flat = (arr) => {
        if (Array.isArray(arr)) {
          list = [...list, ...arr]
        } else if (arr.hasOwnProperty("elements")) {
          // eslint-disable-next-line no-unused-vars
          list.push(...flat(arr.elements))
        }
      }
      const convertResult = JSON.parse(
        converter.xml2json(params.OtherFields, { compact: false })
      )
      this.generalIncomeFicheDetail = []
      let listInfo = convertResult.elements[0].elements
      const getValue = (elem) => {
        if (elem.hasOwnProperty("elements") && elem.elements.length > 0) {
          return elem.elements[0].text
        }
        return ""
      }
      listInfo.forEach((item) => {
        this.generalIncomeFicheDetail.push({
          Title: getValue(item.elements[0]),
          IncomeCode: getValue(item.elements[1]),
          Comments: getValue(item.elements[2])
        })
      })

      this.generalIncomeFicheDetail = this.generalIncomeFicheDetail.map(
        (x, i) => {
          return {
            ...x,
            RowId: i + 1
          }
        }
      )
      this.showFicheDetail = true
    }
  },
  beforeMount () {
    this.$root.$on("update:district", this.districtChanged)
  },
  beforeDestroy () {
    this.$root.$off("update:district", this.districtChanged)
  },
  computed: {
    config () {
      return { config: { District: this.selectedRegion } }
    },
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    lockConfirm () {
      if (!this.selectedFiche) return true
      return this.selectedFiche && this.selectedFiche.EumFicheStatus === 3
    },
    lockRevoke () {
      if (!this.selectedFiche) return true
      return this.selectedFiche && this.selectedFiche.EumFicheStatus === 4
    },
    query () {
      const tmpObj =
        this.selectType === 1 ? this.filtering : this.baseNosaziCode
      const sql = []
      // NosaziCode fields
      if (this.selectType === 2) {
        ["IdentificationNo"]
          .filter((field) => this.baseNosaziCode.District !== 0)
          .forEach((field) => {
            sql.push(
              `(${field} LIKE N'%${convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )}%')`
            )
          })
      } else {
        if (
          this.filtering.IdentificationNo !== null ||
          this.filtering.IdentificationNo !== ""
        ) {
          ["IdentificationNo"]
            .filter((field) => this.filtering[field])
            .forEach((field) => {
              sql.push(`(${field} LIKE N'%${this.filtering[field]}%')`)
            })
        }
      }

      // Equal Op fields
      ["Address"]
        .filter(
          (field) =>
            this.filtering[field] !== null && this.filtering[field] !== ""
        )
        .forEach((field) => {
          sql.push(`(${field} = N'${this.filtering[field]}')`)
        })
      if (tmpObj.District !== null && tmpObj.District !== 0) {
        ["District"]
          .filter((field) => tmpObj[field] !== 0 || tmpObj[field] !== null)
          .forEach((field) => {
            sql.push(`(${field} = N'${tmpObj[field]}')`)
          })
      }
      // Like Op fields
      ["CellPhone", "RequesterName"]
        .filter((field) => this.filtering[field] !== null)
        .forEach((field) => {
          sql.push(`(${field} LIKE N'%${this.filtering[field]}%')`)
        })
      if (!sql.length) {
        return ""
      }
      // sql.push('**')
      return " WHERE " + sql.join(" AND ")
    }
  },
  watch: {
    showCancelFiches () {
      this.getFiches()
    },
    selectType: {
      handler () {
        if (this.selectType === 2) {
          this.filtering.IdentificationNo = null
        } else {
          this.baseNosaziCode = {
            District: 0,
            Region: 0,
            Block: 0,
            House: 0,
            Building: 0,
            Apartment: 0,
            Shop: 0
          }
        }
      },
      deep: true
    }
  }
}
</script>
