<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="getRequesterRes" />
        <safa-status :result="checkBlackListRes" />
        <safa-status :result="saveRequestInfoRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          :m="inAdd == 'e' && mode == 'e' ? 'e' : 'r'"
        />
      </template>
      <fit>
        <FormRow class="q-pa-sm">
          <FormControl>
            <safa-text
              label="شماره درخواست"
              label-width="100px"
              v-model="model.requsetEstate.Request_Info.RequestNo"
              cdcName="RequestNo"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ درخواست"
              label-width="100px"
              v-model="model.requsetEstate.Request_Info.RequestDate"
              cdcName="RequestDate"
              :m="inAdd == 'e' && mode == 'e' ? 'e' : 'r'"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد ارجاع"
              label-width="100px"
              v-model="model.requsetEstate.Request_Info.NIdWorkItem"
              cdcName="NIdWorkItem"
              m="r"
            />
          </FormControl>
        </FormRow>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="requestInfo" label="اطلاعات درخواست" />
            <tab-menu name="otherRequest" label="سایر درخواست ها" />
          </template>
          <tab-content name="requestInfo">
            <fit>
              <request-info
                v-model="model.requsetEstate"
                :inAdd="inAdd"
                :m="mode"
              />
            </fit>
          </tab-content>
          <tab-content name="otherRequest" :padding="false">
            <other-requests :otherReq="otherReq" />
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <form-actions
          showNewButton
          @edit="isEditable = true"
          @cancel="cancel"
          @save="saveObj"
          @newInfo="newObj"
          :m="mode"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import RequestInfo from "./partials/RequestInfo.vue"
import OtherRequests from "./partials/OtherRequests.vue"
const defaultModel = {
  Request_Attorney: [],
  Request_Info: {
    RequestNo: 0,
    RequestDate: currentDate(),
    NIdWorkItem: 0,
    CI_RequestType: 0,
    CI_OwnerType: 0,
    RequesterName: "",
    BirthDate: "",
    PostCode: "",
    TelNo: "",
    CellphoneNo: "",
    RequesterNationalCode: "",
    RequesterAddress: "",
    RequesterFatherName: "",
    RequesterIDCardNo: "",
    RequesterEmissionPlace: "",
    UrbanCI_RequestType: 0
  }
}

export default {
  components: { RequestInfo, OtherRequests },
  mixins: [baseFormMixin],
  data () {
    return {
      title: "ثبت درخواست",
      formKey: "DE7014AD-A72A-49A1-862F-1712DD44C166",
      name: "USubmitRequest",
      main: true,

      // #region services
      loadObjRes: null,
      getRequesterRes: null,
      checkBlackListRes: null,
      saveRequestInfoRes: null,
      // #endregion

      // #region variables
      isView: false,
      activeTab: "requestInfo",
      model: { requsetEstate: { ...defaultModel } },
      otherReq: {},
      inAdd: "r",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      // #endregion
    }
  },

  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      const payload = {
        PNIdProc:
          this.selectedRequest !== null
            ? this.selectedRequest.NidProc
            : "00000000-0000-0000-0000-000000000000"
      }
      this.showLoading()
      this.$services.ES.getRequestInfoWithNIdProc(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            const res = this.loadObjRes.data.GetRequest_InfoWithNIdProcResult
            this.model.requsetEstate = this.normalizedModel(res)
            this.setBaseNosaziCode()
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest
                  ? this.selectedRequest.BizCode
                  : "",
                bizCodeTitle: "کد نوسازی"
              })
            }
            this.isView = true
          }
          this.getRequester()
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getRequester () {
      const payload = {
        PNidUser:
          this.selectedRequest !== null
            ? this.selectedRequest.NidProc
            : "00000000-0000-0000-0000-000000000000",
        PDistrict: this.baseNosaziCode.District,
        PRegion: this.baseNosaziCode.Region,
        PBlock: this.baseNosaziCode.Block,
        PHouse: this.baseNosaziCode.House,
        PBuilding: this.baseNosaziCode.Building,
        PApartment: this.baseNosaziCode.Apartment,
        PShop: this.baseNosaziCode.Shop,
        pRequestNo: this.model.requsetEstate.Request_Info.RequestNo,
        pCI_RequestType: this.model.requsetEstate.Request_Info.CI_RequestType,
        pNIdWorkItem: this.model.requsetEstate.Request_Info.NIdWorkItem,
        pUrbanNIdRequest: this.model.requsetEstate.Request_Info.UrbanNIdRequest,
        pUrbanCI_RequestType:
          this.model.requsetEstate.Request_Info.UrbanCI_RequestType,
        pUrbanNIdKartablItem:
          this.model.requsetEstate.Request_Info.UrbanNIdKartablItem,
        pSysCI_RequestStatus:
          this.model.requsetEstate.Request_Info.SysCI_RequestStatus,
        pRequesterName: this.model.requsetEstate.Request_Info.RequesterName,
        pFrom: 0,
        pTo: 100
      }
      this.showLoading()
      this.$services.ES.getRequester(payload)
        .then(async ({ data }) => {
          this.getRequesterRes = this.getResponse(data)
          if (this.getRequesterRes.success) {
            this.otherReq = this.getRequesterRes.data?.GetRequesterResult
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
    cancel () {
      this.isEditable = false
      this.inAdd = "r"
    },
    normalizedModel (e) {
      const obj = e
      obj.Request_Info.NIdBaseCode =
        this.model.requsetEstate.Request_Info.NIdBaseCode
      obj._NIdRequest = this.model.requsetEstate.Request_Info.NIdRequest
      obj._RequestNo = this.model.requsetEstate.Request_Info.RequestNo
      // obj.NidWorkflowDeff = Guid.Parse(tmpTypeObj.OtherField.toString());
      obj.UserInfo_GUID = this.getNidUser()
      obj.UserName = this.getUserDisplayName()
      obj.RequesterName = this.model.requsetEstate.Request_Info.RequesterName
        ? this.model.requsetEstate.Request_Info.RequesterName.toString()
        : ""
      obj.District = this.baseNosaziCode.District // Distrik
      obj.Region = this.baseNosaziCode.Region
      obj.Block = this.baseNosaziCode.Block
      obj.House = this.baseNosaziCode.House
      obj.Building = this.baseNosaziCode.Building
      obj.Apartment = this.baseNosaziCode.Apartment
      obj.Shop = this.baseNosaziCode.Shop
      obj._IsNew = obj._IsNew ? obj._IsNew : this.inAdd === "e"
      return obj
    },
    normalizedRequestAttorney (arr) {
      this.model.requsetEstate.Request_Attorney =
        arr?.map((m) => {
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
    },
    async saveObj () {
      // سرویس ثبت درخواست سرا 10 با آقای صفری واحد بک اند بررسی شد . این فرم کامل نیست . میبایست بخش ثبت درخواست از سمت بک اند تکمیل گردد
      const tmp = this.baseNosaziCode
      if (
        tmp.District === 0 ||
        tmp.Region === 0 ||
        tmp.Block === 0 ||
        tmp.House === 0
      ) {
        return this.showError("کد نوسازی وارد شده مجاز نمی باشد.", {
          title: "توجه"
        })
      }
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        const { data } = await this.$services.ES.checkBlackList({
          pDistrict: this.baseNosaziCode.District,
          pRegion: this.baseNosaziCode.Region,
          pBlock: this.baseNosaziCode.Block,
          pHouse: this.baseNosaziCode.House,
          pBuilding: this.baseNosaziCode.Building,
          pApartment: this.baseNosaziCode.Apartment,
          pShop: this.baseNosaziCode.Shop,
          pRequesterNationalCode:
            this.model.requsetEstate.Request_Info.RequesterNationalCode,
          pCI_RequestType: this.model.requsetEstate.Request_Info.CI_RequestType
        })
        this.checkBlackListRes = this.getResponse(data)
        if (this.checkBlackListRes.success) {
          await this.saveRequestInfo()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveRequestInfo () {
      try {
        const obj = this.model.requsetEstate
        const payload = {
          PObj: {
            ...obj,
            UserInfo_GUID: this.getNidUser(),
            UserName: this.getUserDisplayName(),
            IsSara10Request: true,
            Request_Attorney:
              this.normalizedRequestAttorney(obj.Request_Attorney) ?? [],
            Apartment: this.baseNosaziCode.Apartment,
            Block: this.baseNosaziCode.Block,
            Building: this.baseNosaziCode.Building,
            District: this.baseNosaziCode.District,
            House: this.baseNosaziCode.House,
            Region: this.baseNosaziCode.Region,
            Shop: this.baseNosaziCode.Shop
          }
        }
        this.showLoading()
        const { data } = await this.$services.ES.saveRequestInfo(payload)
        this.saveRequestInfoRes = this.getResponse(data)
        if (this.saveRequestInfoRes.success) {
          this.showSuccess("عملیات با موفقیت انجام گردید.")
          this.model.requsetEstate =
            this.saveRequestInfoRes.data.SaveRequest_InfoResult
          this.setBaseNosaziCode()
          this.isEditable = false
          this.inAdd = "r"
          await this.log({
            action: this.logActions.save,
            bizCode: this.model.requsetEstate.Request_Info.NIdWorkItem.toString(),
            bizCodeTitle: "NIdWorkItem",
            saveDesc: `ثبت اطلاعات درخواست ${this.model.requsetEstate.Request_Info.NIdWorkItem} در فرم ثبت درخواست املاک و مستغلات انجام گردید.`
          })
          this.redirectToKartable()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    newObj () {
      this.model = { requsetEstate: { ...defaultModel } }
      this.isEditable = true
      this.inEdit = false
      this.inAdd = "e"
    },
    setBaseNosaziCode () {
      const b = this.model.requsetEstate
      this.baseNosaziCode = {
        District: b.District,
        Region: b.Region,
        Block: b.Block,
        House: b.House,
        Building: b.Building,
        Apartment: b.Apartment,
        Shop: b.Shop
      }
    }
  }
}
</script>
