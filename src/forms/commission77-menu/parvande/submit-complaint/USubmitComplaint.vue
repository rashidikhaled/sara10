<template>
  <safa-form :id="formKey" :caption="title" appId="1863ff32-46d4-412f-8175-6fd0cdc37797">
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getCodeInfoRes" />
        <safa-status :result="getBaseLibInNidWorkItemRes" />
        <safa-status :result="getDutyFichesPayCountRes" />
        <safa-status :result="getAllFicheRes" />
        <safa-status :result="getIncomeFicheSubRes" />
        <safa-status :result="result" />
        <safa-status :result="saveComplaintRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text label="شماره درخواست" label-width="90px" v-model="nidWorkItem" cdcName="nidWorkItem" />
            <!-- :validations="['required', 'string']" -->
          </FormControl>
          <nosazi-code-input label="کد نوسازی" label-width="90px" v-model="baseNosaziCode" cdcName="baseNosaziCode" />
          <div>
            <btn-search @click="searchObj" />
          </div>
        </FormRow>
        <!-- <expantion-section
          v-model="expantionState1"
          default-open
          title="مشخصات موعدی"
        > -->
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo label="شخصیت" label-width="90px" :m="mode" domainName="Commission77" ciName="CI_Character"
              v-model="model.CI_Character" cdcName="CI_Character" />
          </FormControl>
          <FormControl>
            <safa-text label="نام " label-width="90px" :m="mode" v-model="model.Base_Owner.OwnerName" cdcName="FirstName" />
          </FormControl>
          <FormControl>
            <safa-text label="نام خانوادگی" label-width="90px" :m="mode" v-model="model.Base_Owner.OwnerLastName" cdcName="LastName" />
          </FormControl>
          <FormControl>
            <safa-combo label="جنسیت" label-width="90px" :m="mode" domainName="Commission77" ciName="CI_Gender"
              v-model="model.CI_Gender" cdcName="CI_Gender" />
          </FormControl>
          <FormControl>
            <safa-text label="نام پدر" label-width="90px" :m="mode" v-model="model.Base_Owner.OwnerFatherName" cdcName="FatherName" />
          </FormControl>
          <FormControl>
            <safa-text label="کد ملی" label-width="90px" :m="mode" v-model="model.Base_Owner.NationalCode"
              cdcName="NationalCode" />
          </FormControl>
          <FormControl>
            <safa-text label="شماره تماس" label-width="90px" :m="mode" v-model="model.Base_Owner.CellPhone"
              cdcName="PhoneNumber" />
          </FormControl>
          <FormControl>
            <safa-text label="خوانده متشاکی" label-width="90px" :m="mode" v-model="model.Wicked" cdcName="Wicked" />
          </FormControl>
          <FormControl>
            <safa-text label="آدرس" label-width="90px" :m="mode" v-model="model.Address" cdcName="Address" />
          </FormControl>
          <FormControl>
            <safa-combo label="نوع شکایت" label-width="90px" :m="mode" domainName="Commission77"
              ciName="CI_ComplaintType" v-model="model.CI_ComplaintType" cdcName="CI_ComplaintType" />
          </FormControl>
          <text-template label="توضیحات" v-model="model.Description" cdcName="Description" label-width="90px" :rows="1"
            class="col-12" :m="mode" />
        </FormRow>
        <!-- </expantion-section> -->

        <safa-splitter v-model="splitterModel">
          <template #before>
            <safa-tabs v-model="activeTab" :padding="false">
              <template v-slot:tabs>
                <tab-menu name="nosazi" label="نوسازی" />
                <tab-menu name="senfi" label="صنفی" />
                <tab-menu name="pasmand" label="پسماند" />
                <tab-menu name="income" label="درآمد" />
              </template>
              <tab-content name="nosazi" title="نوسازی">
                <safa-grid height="100%" max-height="100%" fit :columns="allFichesColumns" m="r" paginate
                  :allowMultipleSelection="true" title="نمایش فیش ها" v-model="DutyFichesPayCount"
                  cdcName="DutyFichesPayCount" @row:click="selectNosaziRow" ref="DutyFichesPayCountref"
                  :suppressRowClickSelection="false" />
              </tab-content>
              <tab-content name="senfi" title="صنفی">
                <safa-grid height="100%" max-height="100%" fit :columns="allFichesColumns" m="r"
                  :allowMultipleSelection="true" title="نمایش فیش ها" paginate v-model="DutyFicheSubForJob"
                  cdcName="DutyFicheSubForJob" @row:click="selectJobRow" ref="DutyFicheSubForJobref"
                  :suppressRowClickSelection="false" />
              </tab-content>
              <tab-content name="pasmand" title="پسماند">
                <safa-grid height="100%" max-height="100%" fit :columns="allFichesColumns" m="r"
                  :allowMultipleSelection="true" title="نمایش فیش ها" cdcName="DutyFicheGarbage"
                  v-model="DutyFicheGarbage" @row:click="selectGarbageRow" paginate ref="DutyFicheGarbageref"
                  :suppressRowClickSelection="false" />
              </tab-content>
              <tab-content name="income" title="درآمد">
                <safa-grid height="100%" max-height="100%" fit :columns="IncomeColumns" m="r" title="نمایش فیش ها"
                  paginate v-model="allFiches" cdcName="allFiches" @row:click="selectIncomeRow" ref="allFichesref"
                  :suppressRowClickSelection="false" />
              </tab-content>
            </safa-tabs>
          </template>

          <template #after>
            <safa-grid v-show="activeTab === 'income'" height="100%" max-height="100%" fit
              :columns="ficheDetailsIncomeCol" cdcName="ficheDetailsIncome" m="r" paginate title="جزئیات فیش"
              v-model="FicheDetailsIncome" ref="ficheDetailsIncomeref" :suppressRowClickSelection="false" />
            <safa-grid v-show="activeTab !== 'income'" height="100%" max-height="100%" fit :columns="ficheDetailsCol"
              m="r" :allowMultipleSelection="false" title="جزئیات فیش" v-model="FicheDetails" cdcName="FicheDetails"
              :suppressRowClickSelection="false" />
          </template>
        </safa-splitter>
      </fit>
      <template v-slot:footer>
        <form-actions :m="mode" @edit="onEditMode" editButtonTitle="جدید" @save="saveObj" :disable="lockBTN"
          @cancel="onCancelMode">
          <template v-slot:after>
            <btn-default label="چاپ" @click="print" :disable="lockBTN" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"
import converter from "xml-js"
import { uid } from "quasar"
import { currentDate, currentTime } from "src/utils/index"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "ثبت شکایت موعدی از شهرداری",
      formKey: "8D6DDC13-30CF-43A1-A4E1-D66AA83FC7DC",
      name: "USubmitComplaint",
      main: true,

      getBaseLibInNidWorkItemRes: null,
      tmpCodeGroup: 0,
      expantionState1: false,
      expantionState2: false,
      expantionState3: false,
      showIncomeTab: false,

      // variables
      activeTab: "nosazi",
      nidWorkItem: "",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      DutyFichesPayCount: [],
      DutyFicheSubForJob: [],
      DutyFicheGarbage: [],
      allFiches: [],
      nidList: [],
      nidJobList: [],
      FicheDetails: [],
      FicheDetailsIncome: [],
      lockBTN: true,
      nidFiche: "00000000-0000-0000-0000-000000000000",
      model: {
        CI_Character: 0,
        CI_Gender: 0,
        Wicked: "",
        Address: "",
        CI_ComplaintType: 0,
        Description: "",
        Base_Owner: {
          OwnerFatherName: '',
          OwnerLastName: '',
          OwnerName: '',
          NationalCode: '',
          EumOwnerCharacter: null,
          CellPhone: ''
        }
      },
      splitterModel: 50,

      // services res
      getCodeInfoRes: null,
      getDutyFichesPayCountRes: null,
      getAllFicheRes: null,
      getIncomeFicheSubRes: null,
      saveComplaintRes: null,
      result: null,

      // columns
      allFichesColumns: [
        // {
        //   field: "Details",
        //   title: "+",
        //   editor: "action",
        //   label: "+",
        //   width: "50px"
        // },
        {
          field: "FicheNo",
          title: "شماره فیش",
          width: "100px"
        },
        {
          field: "PayablePrice",
          title: "مبلغ قابل پرداخت",
          width: "160px"
        },
        {
          field: "CanceledComment",
          title: "دلیل ابطال",
          width: "160px"
        },
        {
          field: "TotalPrice",
          title: "مبلغ کل عوارض",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "FromDate",
          title: "از تاریخ",
          width: "100px"
        },
        {
          field: "ToDate",
          title: "تا تاریخ",
          width: "100px"
        },
        {
          field: "ExportDate",
          title: "تاریخ صدور",
          width: "100px"
        },
        {
          field: "ExportTime",
          title: "زمان صدور",
          width: "100px"
        },
        {
          field: "UserNameExporter",
          title: "کاربر صادر کننده",
          width: "160px"
        },
        {
          field: "PaymentBreakDate",
          title: "مهلت پرداخت",
          width: "100px"
        },
        {
          field: "BillID",
          title: "شناسه قبض",
          width: "100px"
        },
        {
          field: "PaymentID",
          title: "شناسه پرداخت",
          width: "160px"
        },
        {
          field: "DepositID",
          title: "شناسه واریز",
          width: "160px"
        },
        {
          field: "EumDutyFicheStatus",
          title: "وضعیت فیش",
          width: "100px"
        },
        {
          field: "CI_DutyFicheExportType",
          title: "نوع صدور فیش",
          width: "160px",
          domain: "CI_SaraM1",
          editor: "combo"
        },
        {
          field: "PaymentDate",
          title: "تاریخ پرداخت",
          width: "100px"
        },
        {
          field: "BankPaymentDate",
          title: "تاریخ پرداخت بانک",
          width: "100px"
        },
        {
          field: "BankFilePath",
          title: "نام فایل بانکی",
          width: "100px"
        },
        {
          field: "EumDutyPaymentType",
          title: "نوع تایید فیش",
          width: "100px"
        },
        {
          field: "EumFicheConfirmMethode",
          title: "نوع پرداخت فیش",
          width: "160px"
        },
        {
          field: "UserConfirmationDate",
          title: "تاریخ تایید",
          width: "100px"
        },
        {
          field: "UserConfirmationTime",
          title: "زمان تایید",
          width: "100px"
        },
        {
          field: "UserNameConfirmer",
          title: "کاربر تایید کننده",
          width: "160px"
        },
        {
          field: "CanceledDate",
          title: "تاریخ ابطال/استرداد",
          width: "160px"
        },
        {
          field: "CanceledTime",
          title: "زمان ابطال/استرداد",
          width: "160px"
        },
        {
          field: "UserNameCanceler",
          title: "کاربر ابطال/استرداد کننده",
          width: "160px"
        },
        {
          field: "BankConfirmationDate",
          title: "تاریخ تایید بانک",
          width: "100px"
        },
        {
          field: "BankConfirmationTime",
          title: "زمان تایید بانک",
          width: "100px"
        },
        {
          field: "UserNameBankConfirmer",
          title: "کاربر تایید بانک",
          width: "100px"
        },
        {
          field: "BankConfirmPrice",
          title: "مبلغ تایید بانک",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "ConfirmBankCode",
          title: "کد بانک تایید شده",
          width: "100px"
        },
        {
          field: "PaymentRahgiriCode",
          title: "کد رهگیری پرداخت",
          width: "160px"
        },
        {
          field: "PaymentReferenceNo",
          title: "شماره ارجاع پرداخت",
          width: "100px"
        },
        {
          field: "OwnerName",
          title: "نام مالک",
          width: "100px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "100px"
        },
        {
          field: "RefundLetterNo",
          title: "شماره نامه استرداد",
          width: "100px"
        },
        {
          field: "RefundLetterDate",
          title: "تاریخ نامه استرداد",
          width: "100px"
        },
        {
          field: "PrintUserName",
          title: "کاربر چاپ",
          width: "100px"
        },
        {
          field: "PrintDate",
          title: "تاریخ چاپ",
          width: "100px"
        },
        {
          field: "PrintTime",
          title: "زمان چاپ",
          width: "100px"
        }
      ],
      IncomeColumns: [
        {
          field: "FicheNo",
          title: "شماره فیش",
          width: "100px"
        },
        {
          field: "EumDutyFicheStatus",
          title: "وضعیت فیش",
          width: "100px"
        },
        {
          field: "IncomeValue",
          title: "كل عوارض",
          width: "160px"
        },
        {
          field: "DiscountValue",
          title: "جمع تخفيف",
          width: "160px"
        },
        {
          field: "OddmentValue",
          title: "جمع بدهکاری/بستانکاری",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "Payable",
          title: "قابل پرداخت",
          width: "100px"
        },
        {
          field: "CI_IncomeAccountGroup",
          title: "مالكيت حساب",
          width: "100px",
          domain: "CI_SaraM1",
          editor: "combo"
        },
        {
          field: "InsatllmentValue",
          title: "مبلغ تقسيط",
          width: "100px"
        },
        {
          field: "BankChequeValue",
          title: "مبلغ چک بین بانکی",
          width: "100px"
        },
        {
          field: "CheckNo",
          title: "شماره چک بين بانکی",
          width: "160px"
        },
        {
          field: "BankCheckName",
          title: "نام بانک چک بين بانکی",
          width: "100px"
        },
        {
          field: "BankBranchCheckName",
          title: "نام شعبه صادره چک بين بانکی",
          width: "100px"
        },
        {
          field: "PaymentBank",
          title: "بانک پرداخت شده",
          width: "160px"
        },
        {
          field: "PaymentBranch",
          title: "شعبه پرداخت شده",
          width: "160px"
        },
        {
          field: "PaymentDate",
          title: "تاریخ پرداخت",
          width: "100px"
        },
        {
          field: "PaymentDate",
          title: "تاریخ پرداخت",
          width: "100px"
        },
        {
          field: "PaymentTime",
          title: "ساعت پرداخت",
          width: "100px"
        },
        {
          field: "UserNamePayment",
          title: "کاربر پرداخت کننده",
          width: "100px"
        },
        {
          field: "BankPaymentDate",
          title: "تاریخ پرداخت بانک",
          width: "160px"
        },
        {
          field: "BankConfirmDate",
          title: "تاریخ تایید بانک",
          width: "100px"
        },
        {
          field: "BillID",
          title: "شناسه قبض",
          width: "100px"
        },
        {
          field: "PaymentID",
          title: "شناسه پرداخت",
          width: "160px"
        },
        {
          field: "DepositID",
          title: "شناسه واریز",
          width: "160px"
        },
        {
          field: "EumIncomePaymentType",
          title: "نحوه پرداخت",
          width: "160px"
        },
        {
          field: "ExportTemporaryDate",
          title: "تاریخ صدور موقتی",
          width: "160px"
        },
        {
          field: "ExportTemporaryTime",
          title: "ساعت صدور موقتی",
          width: "160px"
        },
        {
          field: "UserNameExportTemporary",
          title: "کاربر صدور موقتی",
          width: "160px"
        },
        {
          field: "ExportPermanentDate",
          title: "تاریخ صدور دائمی",
          width: "100px"
        },
        {
          field: "ExportPermanentTime",
          title: "ساعت صدور دائمی",
          width: "100px"
        },
        {
          field: "UserNameExportPermanent",
          title: "کاربر صدور دائمی",
          width: "100px"
        },
        {
          field: "PrintDate",
          title: "تاریخ چاپ",
          width: "100px"
        },
        {
          field: "PrintTime",
          title: "ساعت چاپ",
          width: "100px"
        },
        {
          field: "UserNamePrint",
          title: "کاربر چاپ",
          width: "100px"
        },

        {
          field: "UserConfirmDate",
          title: "تاریخ تایید کاربر",
          width: "100px"
        },
        {
          field: "UserConfirmTime",
          title: "ساعت تایید کاربر",
          width: "100px"
        },
        {
          field: "UserNameUserConfirm",
          title: "کاربر تایید",
          width: "160px"
        },
        {
          field: "DateRevokeConfirm",
          title: "تاریخ ابطال تایید",
          width: "100px"
        },
        {
          field: "TimeRevokeConfirm",
          title: "ساعت ابطال تایید",
          width: "100px"
        },
        {
          field: "UserNameRevokeConfirm",
          title: "کاربر ابطال تایید",
          width: "100px"
        },
        {
          field: "RevokeDate",
          title: "تاریخ ابطال/استرداد",
          width: "100px"
        },
        {
          field: "RevokeTime",
          title: "ساعت ابطال/استرداد",
          width: "100px"
        },
        {
          field: "UserNameRevoke",
          title: "کاربر ابطال/استرداد",
          width: "100px"
        },
        {
          field: "Comments",
          title: "توضيحات",
          width: "100px"
        },
        {
          field: "PaymentRahgiriCode",
          title: "کد رهگیری پرداخت",
          width: "160px"
        },

        {
          field: "PaymentRahgiriCode",
          title: "کد رهگیری پرداخت",
          width: "160px"
        },
        {
          field: "PaymentReferenceNo",
          title: "شماره ارجاع پرداخت",
          width: "160px"
        },
        {
          field: "Discount",
          title: "تخفيف",
          width: "100px"
        },
        {
          field: "Brokers",
          title: "کارگزاری",
          width: "100px"
        },
        {
          field: "Deposit",
          title: "سپرده",
          width: "100px"
        },
        {
          field: "CreditorPapers",
          title: "اوراق بستانکار",
          width: "160px"
        },
        {
          field: "CI_IncomeFicheConfirmType",
          title: "روش تایید",
          width: "160px",
          domain: "CI_SaraM1",
          editor: "combo"
        },
        {
          field: "ConfirmTypeDetailes",
          title: "توضیحات روش تایید",
          width: "160px"
        }
      ],
      ficheDetailsIncomeCol: [
        {
          field: "CI_IncomeCalculation",
          title: "نوع عوارض درامد",
          width: "160px",
          domain: "CI_SaraM1",
          editor: "combo"
        },
        {
          field: "Price",
          title: "مبلغ",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "CI_IncomeFormulaFiche",
          title: "فرمول ",
          width: "100px",
          domain: "CI_SaraM1",
          editor: "combo"
        },
        {
          field: "Subject",
          title: "توضیحات",
          width: "100px"
        }
      ],
      ficheDetailsCol: [
        {
          field: "Subject",
          title: "عنوان",
          width: "100px"
        },
        {
          field: "Value",
          title: "مقدار",
          width: "100px"
        },
        {
          field: "Comment",
          title: "توضیحات",
          width: "160px"
        }
      ]
    }
  },
  watch: {
    activeTab () {
      this.FicheDetails = []
    }
  },
  computed: {
    config () {
      return { config: { District: this.baseNosaziCode.District } }
    }
  },

  created () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.getSettingData()
      this.loadObj()
    }
  },
  methods: {
    async searchObj () {
      if (this.nidWorkItem === '') return this.showError("لطفا شماره پرونده را وارد نمایید.")
      try {
        this.showLoading()
        const payload = { pNidWorkItem: this.nidWorkItem }
        const { data } = await this.$services.SA.getBaseLibInNidWorkItem(payload, this.config)
        this.getBaseLibInNidWorkItemRes = this.getResponse(data)
        if (this.getBaseLibInNidWorkItemRes.success) {
          this.loadObj(this.getBaseLibInNidWorkItemRes.data)
        }
      } catch (e) {
        this.serverError()
      } finally {
        this.hideSending()
      }
    },
    async getSettingData () {
      try {
        const getSettingDataResult = await this.loadFormSetting(
          "Sharsazi-PersonalSetting"
        )
        if (getSettingDataResult.PersonalSettingNosazi.ChkCalculateNosazi) {
          this.tmpCodeGroup = 1 // Momayezi
        } else {
          this.tmpCodeGroup = 0 // Parvande
        }
      } catch (error) {
        console.log(error)
      }
    },
    onEditMode () {
      this.lockBTN = false
      this.isEditable = true
    },
    onCancelMode () {
      this.isEditable = false
    },
    async loadObj (val) {
      const nidProc = this.getBaseLibInNidWorkItemRes && val.Sh_RequestInfo.NidProc
      this.lockBTN = false
      if (this.baseNosaziCode.District === 0) {
        this.showError("کدنوسازی وارد شده معتبر نیست.")
        return
      }
      if (!this.isValidForm()) return
      this.showLoading()
      await this.getShopCodeInfo()
      await this.getCodeInfo()
      await this.getDutyFichesPayCount(1)
      await this.getDutyFichesPayCount(2)
      await this.getDutyFichesPayCount(3)
      await this.GetAllFiche(nidProc)
      this.hideLoading()
    },
    getFicheStatusClass (status) {
      switch (status) {
        case 0:
          return "dutyFichePermanent"
        case 1:
          return "dutyFicheConfirm"
        case 2:
          return "dutyFicheCancel"
        case 3:
          return "dutyFicheTempExport"
        case 4:
          return "dutyFicheConfirmBank"
        case 5:
          return "dutyFicheRevoke"
        default:
          return ""
      }
    },
    async getCodeInfo () {
      try {
        const obj = this.baseNosaziCode
        const payload = {
          pDistrict: obj.District,
          pRegion: obj.Region,
          pBlock: obj.Block,
          pHouse: obj.House,
          pBuilding: obj.Building,
          pApartment: obj.Apartment,
          pShop: obj.Shop,
          pDutyType: 1,
          pEumNosaziCodeGroup: this.tmpCodeGroup,
          pEumBaseInfoGroup: 0,
          pIncludeHouse: true,
          pIncludeShop: true,
          pToCurrentObject: true,
          pNidRevisit: "00000000-0000-0000-0000-000000000000"
        }
        const { data } = await this.$services.SB.getCodeInfo(
          payload,
          this.config
        )
        this.getCodeInfoRes = this.getResponse(data)
        if (this.getCodeInfoRes.success) {
          this.resetValidation()
          const res = this.getCodeInfoRes.data
          this.nidList = res.NidList
          this.model.Address = res.Base_AddressInfo.MainAddress
          this.model.Base_Owner = res.Base_Owner[0]
            ? res.Base_Owner[0]
            : []
          await this.log({
            action: this.logActions.view,
            bizCode: res.NidBase,
            bizCodeTitle: "NidBase",
            nosaziCode: convertNosaziCodeObjectToString(obj),
            nidWorkItem: this.nidWorkItem
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async getShopCodeInfo () {
      try {
        this.showLoading()
        const obj = this.baseNosaziCode
        this.ownerName = ""
        let payload = {
          pDistrict: obj.District,
          pRegion: obj.Region,
          pBlock: obj.Block,
          pHouse: obj.House,
          pBuilding: obj.Building,
          pApartment: obj.Apartment,
          pShop: obj.Shop,
          pDutyType: 2,
          pEumNosaziCodeGroup: 0,
          pEumBaseInfoGroup: 0,
          pLoadAllJobs: false, //
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SB.getShopCodeInfo(
          payload,
          this.config
        )
        const res = this.getResponse(data)
        if (res.success) {
          this.nidJobList = res.data.NidJobList
        }
      } catch (error) {
        console.error(error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getDutyFichesPayCount (pSysCiDutyType) {
      try {
        const payload = {
          pNidList: pSysCiDutyType === 2 ? this.nidJobList : this.nidList,
          pSysCiDutyType,
          pUnLoadCancelFiches: true
        }
        const { data } = await this.$services.SB.getDutyFichesPayCount(
          payload,
          this.config
        )
        this.getDutyFichesPayCountRes = this.getResponse(data)
        if (this.getDutyFichesPayCountRes.success) {
          await this.log({
            action: this.logActions.view,
            bizCode: this.nidWorkItem,
            bizCodeTitle: "nidWorkItem",
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
            nidWorkItem: this.nidWorkItem
          })
          let res = this.getDutyFichesPayCountRes.data
          if (pSysCiDutyType === 1) {
            res.DutyFichesPayCount = [...(res.DutyFichesPayCount || [])].map(
              (x) => ({
                ...x,
                class: this.getFicheStatusClass(x.EumDutyFicheStatus),
                isSelectedNode: false
              })
            )
            this.DutyFichesPayCount = res.DutyFichesPayCount
          }
          if (pSysCiDutyType === 2) {
            this.DutyFicheSubForJob = res.DutyFichesPayCount
          }
          if (pSysCiDutyType === 3) {
            this.DutyFicheGarbage = res.DutyFichesPayCount
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async GetAllFiche (NidProcByNidWorkItem) {
      try {
        const payload = {
          pNidProc: NidProcByNidWorkItem || (this.selectedRequest
            ? this.selectedRequest.NidProc
            : "00000000-0000-0000-0000-000000000000")
        }
        const { data } = await this.$services.SD.GetAllFiche(
          payload,
          this.config
        )
        this.getAllFicheRes = this.getResponse(data)
        if (this.getAllFicheRes.success) {
          await this.log({
            action: this.logActions.view,
            bizCode: payload.pNidProc,
            bizCodeTitle: "NidProc"
          })
          this.allFiches = this.getAllFicheRes.data.All_Fiche
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async getIncomeFicheSub () {
      this.showLoading()
      await this.$services.SC.getIncomeFicheSub(
        { pNidFiche: this.nidFiche },
        this.config
      )
        .then(async ({ data }) => {
          this.getIncomeFicheSubRes = this.getResponse(data)
          if (this.getIncomeFicheSubRes.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidFiche,
              bizCodeTitle: "NidFiche"
            })
            this.FicheDetailsIncome =
              this.getIncomeFicheSubRes.data.IncomeFicheSub
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
    async print () {
      const reportPath = `${window.getConfigValue('Commission77ReportPath')}/RptComplaint`
      const queryParams = {
        NIdProc: this.selectedRequest.NidProc
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NIdProc,
        bizCodeTitle: 'NIdProc'
      })
    },
    selectNosaziRow ({ data: row }) {
      let OtherFields =
        this.DutyFichesPayCount.find((x) => x.NidFiche === row.NidFiche)
          .OtherFields || ""
      let convertedRes = converter.xml2js(OtherFields, {
        compact: true,
        ignoreDoctype: true,
        ignoreCdata: true
      })
      this.FicheDetails =
        convertedRes.ArrayOfClsLog.ClsLog.map((x) => {
          return {
            ...x,
            Subject: x.Subject._text || "",
            Value: x.Value._text || "",
            Comment: x.Comment._text || ""
          }
        }) || []
    },
    selectJobRow ({ data: row }) {
      let OtherFields =
        this.DutyFicheSubForJob.find((x) => x.NidFiche === row.NidFiche)
          .OtherFields || ""
      let convertedRes = converter.xml2js(OtherFields, {
        compact: true,
        ignoreDoctype: true,
        ignoreCdata: true
      })
      this.FicheDetails =
        convertedRes.ArrayOfClsLog.ClsLog.map((x) => {
          return {
            ...x,
            Subject: x.Subject._text || "",
            Value: x.Value._text || "",
            Comment: x.Comment._text || ""
          }
        }) || []
    },
    selectGarbageRow ({ data: row }) {
      let OtherFields =
        this.DutyFicheGarbage.find((x) => x.NidFiche === row.NidFiche)
          .OtherFields || ""
      let convertedRes = converter.xml2js(OtherFields, {
        compact: true,
        ignoreDoctype: true,
        ignoreCdata: true
      })
      this.FicheDetails =
        convertedRes.ArrayOfClsLog.ClsLog.map((x) => {
          return {
            ...x,
            Subject: x.Subject._text || "",
            Value: x.Value._text || "",
            Comment: x.Comment._text || ""
          }
        }) || []
    },
    async selectIncomeRow ({ data: row }) {
      this.nidFiche = row.NidFiche
      await this.getIncomeFicheSub()
    },
    async saveObj () {
      if (
        this.$refs.DutyFichesPayCountref.gridApi.getSelectedRows().length ===
        0 &&
        this.activeTab === "nosazi"
      ) {
        this.showError("فیش نوسازی انتخاب نشده است")
        return
      } else if (
        this.$refs.DutyFicheSubForJobref.gridApi.getSelectedRows().length ===
        0 &&
        this.activeTab === "senfi"
      ) {
        this.showError("فیش صنفی انتخاب نشده است")
        return
      } else if (
        this.$refs.DutyFicheGarbageref.gridApi.getSelectedRows().length === 0 &&
        this.activeTab === "pasmand"
      ) {
        this.showError("فیش پسماند انتخاب نشده است")
        return
      } else if (
        this.$refs.allFichesref.gridApi.getSelectedRows().length === 0 &&
        this.activeTab === "income"
      ) {
        // this.$refs.ficheDetailsIncomeref.gridApi.getSelectedRows().length
        this.showError("فیش درامد انتخاب نشده است")
        return
      } else if (
        this.$refs.ficheDetailsIncomeref.gridApi.getSelectedRows().length ===
        0 &&
        this.activeTab === "income"
      ) {
        this.showError("نوع عوارض درامد از قسمت جزئیات فیش انتخاب نشده است")
        return
      }
      try {
        this.showLoading()
        const obj = this.baseNosaziCode
        const tmpComplaint = {
          NidComplaint: uid(),
          NidProc: this.selectedRequest.NidProc,
          NidUser: this.getNidUser(),
          UserName: this.currentUser.UserName,
          CreateDate: currentDate(),
          CreateTime: currentTime(),
          NosaziCode: convertNosaziCodeObjectToString(obj),
          District: obj.District,
          Region: obj.Region,
          Block: obj.Block,
          House: obj.House,
          Building: obj.Building,
          Apartment: obj.Apartment,
          Shop: obj.Shop,
          CI_Gender: this.model.CI_Gender,
          CI_Character: this.model.CI_Character,
          FirstName: this.model.Base_Owner.OwnerName,
          LastName: this.model.Base_Owner.OwnerLastName,
          FatherName: this.model.Base_Owner.OwnerFatherName,
          NaturalCode: this.model.Base_Owner.NationalCode,
          PhoneNumber: this.model.Base_Owner.CellPhone,
          Wicked: this.model.Wicked,
          Address: this.model.Address,
          CI_ComplaintType: this.model.CI_ComplaintType,
          Description: this.model.Description
        }
        // const selectedRow = this.$refs.DutyFichesPayCountref.gridApi.getSelectedRows()
        switch (this.activeTab) {
          case "nosazi":
            tmpComplaint.NidFiche =
            this.$refs.DutyFichesPayCountref.gridApi.getSelectedRows()?.[0]
              ?.NidFiche || "00000000-0000-0000-0000-000000000000"
            tmpComplaint.EumFicheType = 1
            tmpComplaint.FichePrice =
            this.$refs.DutyFichesPayCountref.gridApi.getSelectedRows()?.[0]
              ?.PayablePrice || 0
            tmpComplaint.FicheComment =
            this.$refs.DutyFichesPayCountref.gridApi.getSelectedRows()[0].Comments
            break
          case "senfi":
            tmpComplaint.NidFiche =
            this.$refs.DutyFicheSubForJobref.gridApi.getSelectedRows()?.[0]
              ?.NidFiche || "00000000-0000-0000-0000-000000000000"
            tmpComplaint.EumFicheType = 2
            tmpComplaint.FichePrice =
            this.$refs.DutyFicheSubForJobref.gridApi.getSelectedRows()?.[0]
              ?.PayablePrice || 0
            tmpComplaint.FicheComment =
            this.$refs.DutyFicheSubForJobref.gridApi.getSelectedRows()[0].Comments
            break
            // this.$refs.DutyFicheGarbageref.gridApi.getSelectedRows()?.[0]?.PayablePrice ||
          case "pasmand":
            tmpComplaint.NidFiche =
            this.$refs.DutyFicheGarbageref.gridApi.getSelectedRows()?.[0]
              ?.NidFiche || "00000000-0000-0000-0000-000000000000"
            tmpComplaint.EumFicheType = 3
            tmpComplaint.FichePrice =
            this.$refs.DutyFicheGarbageref.gridApi.getSelectedRows()?.[0]
              ?.PayablePrice || 0
            tmpComplaint.FicheComment =
            this.$refs.DutyFicheGarbageref.gridApi.getSelectedRows()[0].Comments
            break
          case "income":
          // this.$refs.allFichesref.gridApi.getSelectedRows()[0].Comments
            tmpComplaint.NidFiche =
            this.$refs.allFichesref.gridApi.getSelectedRows()[0].NidFiche
            tmpComplaint.EumFicheType = 4
            tmpComplaint.FichePrice =
            this.$refs.allFichesref.gridApi.getSelectedRows()[0].Payable
            tmpComplaint.FicheComment =
            this.$refs.allFichesref.gridApi.getSelectedRows()[0].Comments
            tmpComplaint.NidFicheSub =
            this.$refs.allFichesref.gridApi.getSelectedRows()[0].NidFicheSub
            break
        }
        const { data } = await this.$services.commission77
          .saveComplaint({
            pRequest: { ClsComplaint: { Complaint: { ...tmpComplaint } } }
          })
        this.saveComplaintRes = this.getResponse(data)
        if (this.saveComplaintRes.success) {
          console.log(this.pRequest)
          await this.log({
            action: this.logActions.save,
            bizCode: this.nidFiche,
            bizCodeTitle: "NidFiche"
          })
          this.isEditable = false
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          this.resetValidation()
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
