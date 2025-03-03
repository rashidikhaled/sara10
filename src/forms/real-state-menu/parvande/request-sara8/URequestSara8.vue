<template>
  <safa-form
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
    caption="تشکیل پرونده سرا8"
    :id="formKey"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetched"
        />
        <safa-status :result="allRequestListRes" />
        <safa-status :result="getRequestAttorneyRes" />
        <safa-status :result="getCIRequestTypeRes" />
        <safa-status :result="checkDuplicatedRequestRes" />
        <safa-status :result="creInsRes" />
        <safa-status :result="saveObjRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="infoTab" label="درخواست جدید" />
            <tab-menu name="oldTab" label="درخواست های قبلی" />
          </template>

          <tab-content name="infoTab">
            <fit>
              <FormRow class="q-mb-sm">
                <FormControl>
                  <safa-combo
                    label="نوع درخواست"
                    label-width="100px"
                    v-model="model.Request_Info.CI_RequestType"
                    cdcName="CI_RequestType"
                    required
                    :m="m"
                    source-type="local"
                    :options="requestTypeOptions"
                    ref="ciRequestTypeRef"
                  />
                </FormControl>
                <FormControl>
                  <safa-combo
                    label="نوع متقاضی"
                    label-width="100px"
                    v-model="requesterType"
                    cdcName="requesterType"
                    required
                    :validations="['required','number', validations.CI_RequesterType]"
                    ciName="CI_Requester"
                    domainName="Estate"
                    :m="m"
                  />
                </FormControl>
                <FormControl>
                  <safa-combo
                    label="نام متقاضی"
                    label-width="100px"
                    v-model="selectedOwner"
                    cdcName="requesterName"
                    sourceType="local"
                    :options="requesterNamesOptions"
                    :emitValue="false"
                    :m="m"
                    required
                    validations="required"
                    ref="reqNameRef"
                    v-if="requesterType === 1"
                  />
                  <safa-text
                    v-else
                    label="نام متقاضی"
                    v-model="requesterName"
                    cdcName="requesterName"
                    :m="m"
                    label-width="100px"
                    required
                    validations="required"
                  />
                </FormControl>
                <FormControl v-if="requesterType !== 1">
                  <safa-text
                    label="نام خانوادگی"
                    v-model="requesterLastName"
                    cdcName="requesterLastName"
                    :m="m"
                    label-width="100px"
                    required
                    validations="required"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="کد ملی متقاضی"
                    label-width="100px"
                    v-model="model.Request_Info.RequesterNationalCode"
                    cdcName="RequesterNationalCode"
                    type="number"
                    required
                    :validations="[
                      'required',
                      'number',
                      validations.nationalCode,
                    ]"
                    :m="m"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ تولد"
                    label-width="100px"
                    v-model="model.Request_Info.BirthDate"
                    cdcName="BirthDate"
                    :m="m"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="کد ارجاع شهرسازی"
                    label-width="100px"
                    v-model="model.Request_Info.UrbanNIdKartablItem"
                    cdcName="UrbanNIdKartablItem"
                    type="number"
                    :m="m"
                    required
                    validations="required"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="کد پستی"
                    label-width="100px"
                    v-model="model.Request_Info.PostCode"
                    cdcName="PostCode"
                    type="number"
                    required
                    :validations="['required','string', validations.PostCode]"
                    :m="m"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="شماره تلفن"
                    label-width="100px"
                    v-model="model.Request_Info.Telephone"
                    cdcName="Telephone"
                    type="number"
                    required
                    :validations="['required','number', validations.Telephone]"
                    :m="m"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="شماره همراه"
                    label-width="100px"
                    v-model="model.Request_Info.CellPhone"
                    cdcName="CellPhone"
                    type="number"
                    required
                    :validations="['required',,'number', validations.CellphoneNo]"
                    :m="m"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="شماره نامه"
                    label-width="100px"
                    v-model="model.Request_Info.LetterNo"
                    cdcName="LetterNo"
                    :m="m"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ نامه"
                    label-width="100px"
                    v-model="model.Request_Info.LetterDate"
                    cdcName="LetterDate"
                    :m="m"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="دانگ مورد توافق"
                    label-width="100px"
                    v-model="model.Request_Info.AgreementDang"
                    cdcName="AgreementDang"
                    :m="m"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="شماره دبیرخانه"
                    label-width="100px"
                    v-model="model.Request_Info.SecretariatNo"
                    cdcName="SecretariatNo"
                    :m="m"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ دبیرخانه"
                    label-width="100px"
                    v-model="model.Request_Info.SecretariatDate"
                    cdcName="SecretariatDate"
                    :m="m"
                  />
                </FormControl>
                <FormControl>
                  <safa-combo
                    label="نوع توافق"
                    label-width="100px"
                    ciName="CI_PeaceType"
                    domainName="CI_SaraM1"
                    v-model="model.Request_Info.CI_PeaceType"
                    cdcName="CI_PeaceType"
                    :m="m"
                  />
                </FormControl>
                <text-template
                  label="آدرس"
                  label-width="100px"
                  class="col-12"
                  v-model="model.Request_Info.RequesterAddress"
                  cdcName="RequesterAddress"
                  required
                  validations="required"
                  :m="m"
                  :rows="1"
                />
              </FormRow>
              <safa-grid
                title="مشخصات وکیل/وکلا"
                fit
                min-height="100px"
                height="100%"
                max-height="100%"
                v-model="model.Request_Attorney"
                cdcName="Request_Attorney"
                :m="m"
                :columns="requestColumns"
              />
            </fit>
            <!-- <RequestInfo v-model="model" :m="baseLibResults ? 'e' : 'r'" ref="requestInfo" /> -->
          </tab-content>
          <tab-content name="oldTab" :padding="false">
            <safa-grid
              title="درخواست های قبلی"
              fit
              min-height="100px"
              height="100%"
              max-height="100%"
              v-model="allRequestList"
              :columns="allRequestListColumns"
              m="r"
            />
          </tab-content>
        </safa-tabs>
      </fit>

      <template #footer v-if="baseLibResults">
        <btn-save :label="title" @click="saveObj" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
// import { appendUrls } from "src/utils"
// import axios from "axios"
import Joi from "joi"
// import { currentDate } from "src/utils/index"
import customValidation from "src/utils/customValidation"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "URequestSara8",
      title: "ثبت درخواست در شهرسازی",
      formKey: "A3FF3C0E-76AD-4FB3-9966-125728C34828",
      main: true,

      // #region services
      allRequestListRes: null,
      getRequestAttorneyRes: null,
      getCIRequestTypeRes: null,
      checkDuplicatedRequestRes: null,
      creInsRes: null,
      saveObjRes: null,
      // endregion

      reqName: "",
      requesterName: "",
      requesterLastName: "",

      requestColumns: [
        { title: "شماره وکالت", field: "AttorneyLetterNo", width: "100px" },
        {
          title: "تاریخ وکالت",
          field: "AttorneyLetterDate",
          editor: "date",
          width: "100px"
        },
        { title: "نام مالک", field: "ownerName", width: "100px" },
        {
          title: "شماره دفترخانه تنظیم وکالت",
          field: "AttorneyBureauNo",
          width: "180px"
        },
        { title: "نام و نام خانوادگی", field: "Family", width: "150px" },
        { title: "کد ملی", field: "NationalCode", width: "100px" },
        { title: "شماره شناسنامه", field: "IDCardNo", width: "100px" },
        { title: "نام پدر", field: "AttorneyFatherName", width: "150px" },
        { title: "تلفن", field: "Telephone", width: "120px" },
        { title: "آدرس", field: "Address", width: "120px" },
        { title: "توضیحات", field: "Description", width: "auto" }
      ],
      requesterNamesOptions: [],
      requestTypeOptions: [],

      validations: {
        nationalCode: customValidation.nationalCode,
        PostCode: Joi.string().length(10).required().messages({
          "string.base": `کد پستی میبایست به صورت عدد باشد.`,
          "string.length": `کد پستی میبایست 10 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        }),
        CellphoneNo: Joi.string().length(11).required().messages({
          "string.base": `تلفن همراه میبایست به صورت عدد باشد.`,
          "string.length": `تلفن همراه میبایست 11 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        }),
        Telephone: Joi.string().length(11).required().messages({
          "string.base": `شماره تلفن میبایست به صورت عدد باشد.`,
          "string.length": `شماره تلفن میبایست 11 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        }),
        CI_RequestType: Joi.custom(
          function (value, helper) {
            if (this.model.Request_Info.CI_RequestType === 0) {
              return helper.message(
                "مقدار نامشخص برای نوع درخواست ، مجاز نمی باشد."
              )
            }
            return true
          }.bind(this)
        ),
        requesterType: Joi.custom(
          function (value, helper) {
            if (this.requesterType === 0 || isNaN(this.requesterType)) {
              return helper.message(
                "مقدار وارد شده برای نوع متقاضی ، مجاز نمی باشد."
              )
            }
            return true
          }.bind(this)
        )
      },
      activeTab: "infoTab",
      baseLibResults: null,
      procInfo: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      model: {
        Request_Attorney: [],
        Request_Info: {
          CI_RequestType: 0,
          CI_RequesterType: 0,
          RequesterName: "",
          RequesterNationalCode: "",
          UrbanNIdKartablItem: "",
          BirthDate: "",
          Telephone: "",
          CellPhone: "",
          LetterDate: "",
          LetterNo: "",
          AgreementDang: "",
          SecretariatNo: "",
          SecretariatDate: "",
          CI_PeaceType: "",
          PostCode: "",
          RequesterAddress: "",
          Description: ""
        }
      },
      nidProc: "00000000-0000-0000-0000-000000000000",

      requesterType: 0,
      allRequestList: [],
      allRequestListColumns: [
        {
          field: "isSelected",
          width: "80px",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false
        },
        {
          title: "نوع متقاضی",
          field: "CI_Requester",
          editor: "combo",
          domain: "Estate"
        },
        { title: "نام متقاضی", field: "RequesterName" },
        { title: " شماره ارجاع", field: "NidWorkItem" },
        { title: "نوع درخواست", field: "WorkflowTitel" },
        {
          title: "وضعیت درخواست",
          field: "CI_RequesterOwnerType",
          editor: "combo",
          domain: "Estate"
        },
        { title: "تاریخ درخواست", field: "RequestDate" },
        { title: "تاریخ بازدید", field: "RevisitDate" },
        { title: "مامور بازدید", field: "RevisitAgent_Name" },
        { title: "نام صاحب نامه", field: "BuyerName" },
        { title: "تاریخ نامه", field: "letterDate" },
        { title: "شماره موبایل", field: "Cellphone" }
      ]
    }
  },

  computed: {
    m () {
      return this.baseLibResults ? "e" : "r"
    }
  },

  methods: {
    getRequesterFullName () {
      if (this.requesterType === 1) {
        return this.selectedOwner?.Title ?? "مالک انتخاب نشده"
      }

      return `${this.requesterName} ${this.requesterLastName}`
    },
    fetched (val) {
      this.baseLibResults = val
      if (!this.baseLibResults || !this.baseLibResults.MainObj) return
      this.getCIRequestType()
      this.getAllRequestList(this.baseLibResults.MainObj.NidNosaziCode)
      // this.getRequestAttorney(this.baseNosaziCode)
    },
    async getAllRequestList (pNidNosaziCode) {
      try {
        const { data } = await this.$services.SC.getAllRequestList(
          { pNidNosaziCode },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.allRequestListRes = this.getResponse(data)
        if (this.allRequestListRes.success) {
          this.allRequestList =
            this.allRequestListRes?.data?.GetAllRequestListResult
              ?.AllRequestList ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async getCIRequestType () {
      try {
        const { data } = await this.$services.ES.getCIRequestType()
        this.getCIRequestTypeRes = this.getResponse(data)
        if (this.getCIRequestTypeRes.success) {
          this.requestTypeOptions =
            this.getCIRequestTypeRes.data.GetCI_RequestTypeResult.map((m) => {
              return { ID: m.ID || "", Title: m.Title || "", ...m }
            }) ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async getRequestAttorney (pNIdProc) {
      // nidProcc باید دریافت گردد
      try {
        this.showLoading()
        const { data } = await this.$services.ES.getRequestAttorney({
          pNIdProc
        })
        this.getRequestAttorneyRes = this.getResponse(data)
        if (this.getRequestAttorneyRes.success) {
          this.model = {
            ...this.model,
            Request_Attorney:
              this.getRequestAttorneyRes?.data?.Request_Attorney ?? []
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    // async checkBlackList (pNidNosaziCode) {
    //   try {
    //     const { data } = await this.$services.SC.checkValidationForBlackListBeforSaveRequest({ pNidNosaziCode }, { District: this.baseNosaziCode.District })
    //     this.checkBlackListRes = this.getResponse(data)
    //     if (this.checkBlackListRes.success) {
    //       this.model.Request_Info.AllRequestList = this.checkBlackListRes?.data?.GetAllRequestListResult?.AllRequestList ?? []
    //     }
    //   } catch (e) {
    //     console.error(e)
    //     this.serverError()
    //   } finally {}
    // },
    async saveObj () {
      if (!this.isValidForm()) return
      if (this.$refs.ciRequestTypeRef.selectedItem.GUID10 === null) {
        this.showError(".مقدار برگشتی GUID10 برابر با Null می باشد.")
        return
      }
      const b = this.baseNosaziCode
      const pCiRequestType = this.$refs.ciRequestTypeRef.selectedItem.ID
      // const pCiRequestType =
      //   this.getCIRequestTypeRes.data.GetCI_RequestTypeResult.find(
      //     (f) => f.GUID10 === this.model.Request_Info.CI_RequestType
      //   ).ID
      const payload = {
        pIsCheckDuplicated: false,
        pDistrict: b.District,
        pRegion: b.Region,
        pBlock: b.Block,
        pHouse: b.House,
        pBuilding: b.Building,
        pApartment: b.Apartment,
        pShop: b.Shop,
        pCi_RequestType: pCiRequestType
      }
      try {
        const { data } = await this.$services.ES.checkDuplicatedRequest(payload)
        this.checkDuplicatedRequestRes = this.getResponse(data)
        if (this.checkDuplicatedRequestRes.success) {
          const isDuplicatedRequest =
            this.checkDuplicatedRequestRes?.data?.CheckDuplicatedRequestResult
              ?.IsDuplicatedRequest ?? false

          if (!isDuplicatedRequest) {
            await this.saveProccess()
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },

    async saveProccess () {
      try {
        this.showLoading()
        await this.addWorkItem()
        await this.saveRequest()
        await this.log({
          action: this.logActions.save,
          bizCode: this.procInfo.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.procInfo.BizCode,
          nidWorkItem: this.procInfo.NidWorkItem,
          saveDesc: `ثبت درخواست املاک و مستغلات با شماره ارجاع ${this.procInfo.NidWorkItem} با موفقیت ثبت شد`
        })

        this.showSuccess(
          `ثبت درخواست املاک و مستغلات با شماره ارجاع ${this.procInfo.NidWorkItem} انجام گردید.`
        ).onDismiss(() => {
          this.hideLoading()
          this.redirectToKartable()
        })
      } catch (e) {
        console.error(e)
        await this.deleteRequest()
        await this.deleteProc()
        this.showError("متاسفانه عملیات ثبت درخواست املاک و مستغلات متوقف شد.")
      } finally {
        this.hideLoading()
      }
    },
    async addWorkItem () {
      return new Promise(async (resolve, reject) => {
        try {
          this.procInfo = null
          // const WKT = await this.getWKT()
          let nidWorkflowDeff = this.$refs.ciRequestTypeRef.selectedItem.GUID10

          const payload = {
            BizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
            EumOwnerType: 0,
            NidWorkflowDeff: nidWorkflowDeff,
            ProcInitiator: this.getNidUser(),
            ProcRequester: this.getRequesterFullName(),
            ProcInitiatorName: this.getUserDisplayName(),
            ProcArea: "سرا10",
            GroupName: "Estate",
            GroupTitel: "املاک و مستغلات",
            Domain: this.selectedDistrict,
            IsSara10Request: true
            // WKT
          }
          // console.log("createInstance payload :>> ", payload)
          const res = await this.$srvWorkflow.createInstance(payload)
          this.creInsRes = this.getResponse(res.data)
          if (this.creInsRes.success) {
            const res = this.creInsRes.data
            if (res.status === 200 && res.success) {
              this.procInfo = res.data.ProcInfo
              return resolve()
            } else {
              return reject(this.creInsRes.errors[0].text)
            }
          }
        } catch (e) {
          console.error(e)
          return reject(e)
        }
      })
    },
    async saveRequest () {
      return new Promise(async (resolve, reject) => {
        // console.log("this.procInfo :>> ", this.procInfo)
        this.normalizedRequestAttorney()
        const pCiRequestType = this.$refs.ciRequestTypeRef.selectedItem.ID
        const pCiRequestTypeTitle =
          this.$refs.ciRequestTypeRef.selectedItem.Title
        let nidWorkflowDeff = this.$refs.ciRequestTypeRef.selectedItem.GUID10
        // const pCiRequestType =
        //   this.getCIRequestTypeRes.data.GetCI_RequestTypeResult.find(
        //     (f) => f.GUID10 === this.model.Request_Info.CI_RequestType
        //   ).ID
        // const pCiRequestTypeTitle =
        //   this.getCIRequestTypeRes.data.GetCI_RequestTypeResult.find(
        //     (f) => f.GUID10 === this.model.Request_Info.CI_RequestType
        //   ).Title.trim(" ")
        const RequesterName = this.getRequesterFullName()
        // TODO: این بخش خطا دارد . و ثبت درذخوایت انجام نمیشود . لطفا هر کسی تونست پیلود این سرویس رو اوکی کنه همه چیز حله. فقط پیلود
        const payload = {
          PObj: {
            Apartment: this.baseNosaziCode.Apartment,
            Block: this.baseNosaziCode.Block,
            Building: this.baseNosaziCode.Building,
            CI_Region: 0,
            CI_RequestType: null,
            District: this.baseNosaziCode.District,
            ErrorResult: null,
            House: this.baseNosaziCode.House,
            IsBindingToSara: false,
            IsBuildingRequest: false,
            IsConfirmContractBuy: false,
            IsDuplicate: false,
            IsNotExistCodeFromSara: false,
            IsOtherKartable: false,
            IsRepaireRequest: false,
            IsRequestSys: false,
            IsSara10Request: true,
            NId: 0,
            NIdCopy: 0,
            NidWorkflowDeff: "00000000-0000-0000-0000-000000000000",
            Region: this.baseNosaziCode.Region,
            Request_Attorney: this.model.Request_Attorney,
            Request_Info: {
              ...this.model.Request_Info,
              CI_RequestType: pCiRequestType,
              CI_RequesterType: this.requesterType,
              RequesterName,
              TelNo: this.model.Request_Info.Telephone,
              AutomationNo: null,
              BirthDate: null,
              CI_AttachType: 0,
              CI_ContractBuySubject: 1,
              CI_ContractPriorityType: 0,
              CI_OwnerType: 0,
              CI_Region: this.baseNosaziCode.District,
              CellphoneNo: this.model.Request_Info.CellPhone,
              CommentGarbageKartable: null,
              GarbageKartableDate: null,
              GarbageKartableTime: null,
              IsSara10Request: null,
              NIdBaseCode: this.baseLibResults.MainObj.NidBase,
              NIdNosaziCode: null,
              NIdProcess: this.procInfo.NidProc,
              NIdRequest: "00000000-0000-0000-0000-000000000000",
              NIdRevisit: null,
              NIdWorkItem: this.procInfo.NidWorkItem,
              NidUserGarbageKartable: null,
              RequestDate: null,
              RequestNo: 0,
              RequesterEmissionPlace: null,
              RequesterFatherName: null,
              RequesterIDCardNo: null,
              SaraNidWorkItem: null,
              SysCI_RequestStatus: 0,
              TransferDang: null,
              UrbanArchiveCode: null,
              UrbanCI_RequestType: 0,
              UrbanNIdRequest: 0,
              UrbanRequestType: null,
              UserNameGarbageKartable: null
            },
            RequesterName: null,
            SendToGarbageKartabl: false,
            Shop: this.baseNosaziCode.Shop,
            UserInfo_GUID: this.getNidUser(),
            UserName: this.getUserDisplayName(),
            Wkt: null,
            _ArchiveCode: null,
            _BlackListFirstEntryReason: 0,
            _IsNew: false,
            _JobLocationGuid: this.currentUser.JobLocationGuid,
            _JobLocationName: this.currentUser.JobLocationName,
            _NIdBaseCode: "00000000-0000-0000-0000-000000000000",
            _NIdRequest: "00000000-0000-0000-0000-000000000000",
            _RequestNo: 0,
            _Sh_RequestInfo: {
              AbsoluteUnit: null,
              ActiveNidAnalysisBuilding_Khalaf: null,
              ActiveNidAnalysisBuilding_MovafeghatOsooli: null,
              ActiveNidAnalysisBuilding_Parvaneh: null,
              ActiveNidIncome: null,
              ActiveNidZabeteh: null,
              AutomationNid: null,
              AutomationNo: null,
              IsSara10Request: true,
              BuyerCellphone: null,
              BuyerName: null,
              BuyerNationalCode: null,
              CI_GarbageArchiveCause: 0,
              CI_Requester: this.requesterType,
              CI_RequesterOwnerType: 0,
              Cellphone: this.model.Request_Info.CellPhone,
              Comment: null,
              CommentsGarbageKartabl: null,
              CommentsPermanentKartabl: null,
              EMail: null,
              EumRequestStatus: 0,
              GarbageKartablDate: null,
              GarbageKartablTime: null,
              IsOthersReqAttached: null,
              IsParallel: null,
              IsRegisterFromUGP: null,
              LastRequestState: null,
              MainRequesterDate: null,
              MainRequesterName: null,
              MainRequesterNo: null,
              MandateDate: null,
              MandateNo: null,
              NidNosaziCode: this.baseLibResults.MainObj.NidNosaziCode,
              NidProc: this.procInfo.NidProc,
              NidProc_Attached: null,
              NidRevisit: null,
              NidTemporaryKartabl_Last: null,
              NidUserGarbageKartabl: null,
              NidUserPermanentKartabl: null,
              NidWorkItem: this.procInfo.NidWorkItem,
              NidWorkItemOld: null,
              NidWorkflowDeff: nidWorkflowDeff,
              PermanentKartablDate: null,
              PermanentKartablTime: null,
              PostCode: this.model.Request_Info.PostCode,
              RequestDate: null,
              RequestTime: null,
              RequesterAddress: this.model.Request_Info.RequesterAddress,
              RequesterName,
              RequesterNationalCode:
                this.model.Request_Info.RequesterNationalCode,
              SecretariatComments: null,
              SecretariatDate: null,
              SecretariatNo: null,
              TelephoneNo: this.model.Request_Info.Telephone,
              TransferDang: null,
              UserNameGarbageKartabl: null,
              UserNamePermanentKartabl: null,
              WorkflowTitel: pCiRequestTypeTitle
            }
          }
        }
        try {
          const { data } = await this.$services.ES.saveRequestInEstate(payload)
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            // const res = this.saveObjRes.data.SaveRequestInEstateResult
            // console.log("res :>> ", res)
            return resolve()
          } else {
            return reject(this.saveObjRes?.errors[0]?.text ?? '')
          }
        } catch (e) {
          console.error(e)
          return reject(e)
        }
      })
    },
    titleWorkFlowMethod () {
      this.requestTypeOptions.map((i) => {
        if (i.ID === this.model.Request_Info.CI_RequestType) {
          return i.Title
        }
      })
    },

    async deleteRequest () {
      try {
        const { data } = await this.$services.SC.deleteRequest(
          { pNidProc: this.procInfo.NidProc },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.deleteRes = this.getResponse(data)
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async deleteProc () {
      try {
        const { data } = await this.$srvWorkflow.deleteProc(
          { NidProc: this.procInfo.NidProc },
          { config: { District: this.baseNosaziCode.District } }
        )
        if (!data.success) {
          this.showError(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async getWKT () {
      if (!this.baseNosaziCode) return ""
      try {
        const code = convertNosaziCodeObjectToString(this.baseNosaziCode)
          .split("-")
          .slice(0, 4)
          .join("-")
        // eslint-disable-next-line no-undef
        // const url = appendUrls([window.getConfigValue("srvMapUrl"), "MapFind2"])
        const { data } = await this.$services.srvMap.MapFind2({
          PWKt: "",
          PBuffer: 1,
          // eslint-disable-next-line no-undef
          NidLayer: window.getConfigValue("mapConfig").DefaultSelectLayer,
          // eslint-disable-next-line no-useless-escape
          PWhere: ` and Code=\'${code}-0-0-0\'`,
          Pfrom: 1,
          Pto: 2
        })

        // console.log("@@@@@@@@@@@ WKT", data)
        const res = Array.isArray(data) ? data : data.data
        if (res && res.length > 0) return res[0].WKT || ""
      } catch (e) {
        return ""
      }
    },
    normalizedRequestAttorney () {
      this.model.Request_Attorney =
        this.model?.Request_Attorney?.map((m) => {
          return {
            AccountNo: m.AccountNo ?? null,
            Address: m.Address ?? null,
            AttorneyBureauNo: m.AttorneyBureauNo ?? null,
            AttorneyFatherName: m.AttorneyFatherName ?? null,
            AttorneyLetterDate: m.AttorneyLetterDate ?? null,
            AttorneyLetterNo: m.AttorneyLetterNo ?? null,
            AttorneyName: m.AttorneyName ?? null,
            BranchCode: m.BranchCode ?? null,
            CI_BankName: m.CI_BankName ?? 0,
            Description: m.Description ?? null,
            IDCardNo: m.IDCardNo ?? null,
            NIdAttorney:
              m.NIdAttorney ?? "00000000-0000-0000-0000-000000000000",
            NIdProcess: m.NIdProcess ?? null,
            NIdRequest: m.NIdRequest ?? "00000000-0000-0000-0000-000000000000",
            NationalCode: m.NationalCode ?? null,
            OwnerName: m.OwnerName ?? null,
            ShabaCode: m.ShabaCode ?? null,
            Telephone: m.Telephone ?? null
          }
        }) ?? []
    }
  },

  watch: {
    reqName () {
      if (this.requesterType === 1) {
        let tmp =
          this.baseLibResults.Base_Owner.find(
            (f) => f.NidOwner === this.reqName
          ) ?? {}
        if (!tmp) return
        this.requesterName = tmp.OwnerName
        this.requesterLastName = tmp.OwnerLastName
        this.model.Request_Info.Telephone = tmp.Telephone
        this.model.Request_Info.RequesterNationalCode = tmp.NationalCode
        this.model.Request_Info.CellPhone = tmp.CellPhone
      } else {
        this.requesterName = ""
        this.requesterLastName = ""
        this.model.Request_Info.Telephone = ""
        this.model.Request_Info.RequesterNationalCode = ""
        this.model.Request_Info.CellPhone = ""
      }
    },
    requesterType () {
      if (this.requesterType === 1) {
        this.requesterName = ""
        this.requesterLastName = ""
        this.model.Request_Info.RequesterNationalCode = ""

        if (this.baseLibResults.Base_Owner.length !== 0) {
          this.requesterNamesOptions = this.baseLibResults.Base_Owner.map(
            (m) => {
              return {
                ID: m.NidOwner || "",
                Title:
                  `${m.OwnerName ?? ""}` + " " + `${m.OwnerLastName ?? ""}` ||
                  ""
              }
            }
          )
        }
        this.model.Request_Info.RequesterAddress =
          this.baseLibResults.Base_AddressInfo.MainAddress
        this.model.Request_Info.RequesterNationalCode = this.baseLibResults.Base_Owner[0].NationalCode
        this.model.Request_Info.BirthDate = this.baseLibResults.Base_Owner[0].BirthDate
        this.model.Request_Info.Telephone = this.baseLibResults.Base_Owner[0].Telephone
        this.model.Request_Info.CellPhone = this.baseLibResults.Base_Owner[0].CellPhone
        this.model.Request_Info.PostCode =
          this.baseLibResults.Base_AddressPostCode.length > 0
            ? this.baseLibResults.Base_AddressPostCode[0].PostCode
            : null
      } else {
        this.requesterName = ""
        this.requesterLastName = ""
        this.model.Request_Info.Telephone = ""
        this.model.Request_Info.RequesterNationalCode = ""
        this.model.Request_Info.CellPhone = ""
        this.model.Request_Info.RequesterAddress = ""
      }
    }
  }
}
</script>
