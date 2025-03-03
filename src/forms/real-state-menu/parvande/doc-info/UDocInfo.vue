<template>
  <safa-form
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
    caption="اطلاعات اسنادی و پتانسیل های املاک"
    :id="formKey"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getDocInfoRes" />
        <safa-status :result="saveDocInfoRes" />
        <safa-status :result="getDocInfoBackRes" />
        <safa-status :result="getDocInfoNextRes" />
        <safa-status :result="copyDocInfoRes" />
      </template>
      <fit>
        <FormRow class="q-pa-sm">
          <FormControl>
            <safa-text
              label="کد رهگیری"
              label-width="110px"
              v-model="model.docInfo.Doc_Info.NIdWorkItem"
              cdcName="NIdWorkItem"
              type="number"
              @keypress.enter="searchByNidWorkItem"
              :m="isEditable ? 'r' : 'e'"
            >
              <template v-slot:append>
                <q-icon
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="searchByNidWorkItem"
                  color="primary"
                  name="search"
                  :class="isEditable ? 'not-allowed' : 'cursor-pointer'"
                  title="جستجو"
                />
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-combo
              label="منطقه"
              label-width="110px"
              v-model="model.docInfo.Doc_Info.CI_Region"
              cdcName="CI_Region"
              domainName="Estate"
              ciName="CI_Region"
              :m="mode"
            />
            <!-- v-model="this.model.docInfo.Doc_Info.NIdWorkItem" -->
          </FormControl>
          <FormControl>
            <safa-combo
              label="کد ارجاع"
              label-width="110px"
              v-model="erjaCode"
              cdcName="erjaCode"
              source-type="local"
              :options="erjaCodeOptions"
              :m="mode"
            />
          </FormControl>
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            label="کد نوسازی"
            label-width="110px"
            @enter="searchByNosazi"
            :actions="false"
          />
          <div>
            <btn-default
              label="جستجو براساس کد نوسازی"
              title="جستجو براساس کد نوسازی"
              @click="searchByNosazi"
              :m="isEditable ? 'r' : 'e'"
            />
          </div>
        </FormRow>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="infoDetails" label="مشخصات ملک" />
            <tab-menu name="infoOther" label="سایر مشخصات" />
            <tab-menu name="infoRealEstate" label="مستغلات" />
            <tab-menu name="infoDocument" label="مستندات" v-if="showArchive" />
          </template>
          <tab-content name="infoDetails">
            <InfoDetails v-model="model.docInfo.Doc_Info" :m="mode" />
          </tab-content>
          <tab-content name="infoOther">
            <InfoOther v-model="model.docInfo.Doc_Info" :m="mode" />
          </tab-content>
          <tab-content name="infoRealEstate">
            <InfoRealEstate v-model="model.docInfo.Doc_Info" :m="mode" />
          </tab-content>
          <tab-content name="infoDocument" v-if="showArchive">
            <InfoDocument
              v-model="model.docInfo.Doc_Info.NIdDoc"
              ref="infoDocument"
            />
          </tab-content>
        </safa-tabs>
      </fit>

      <template #footer>
        <form-actions
          :m="mode"
          showNewButton
          @edit="isEditable = true"
          @cancel="loadObj"
          @save="saveObj"
          @newInfo="newObj"
          editSPId="93b50b1c-23ae-422c-be27-e09463761b0d"
          editFormId="93b50b1c-23ae-422c-be27-e09463761b0d"
          editSPCaption="دکمه ویرایش"
          newSPId="a0b0b871-18c7-4c49-afba-109ce9dfffbf"
          newFormId="2037A570-A3AC-48EE-848A-613DDED25C88"
          newSPCaption="دکمه جدید"
        >
          <template v-slot:after>
            <btn-default
              label="دریافت اطلاعات از کارتابل"
              @click="btnGetKartableClick"
              spId="04c81894-c427-47b0-bacf-4649fea3e98b"
              spCaption="دریافت اطلاعات از کارتابل"
            />
            <btn-default label="قبلی" @click="backHandler" />
            <btn-default label="بعدی" @click="nextHandler" />
            <btn-default
              label="کپی"
              @click="copyHandler"
              spId="580df2ef-5a5a-471d-aa19-6998c70d0bd3"
              spCaption="کپی"
            />
            <!-- <btn-default
              label="ترسیم"
              @click="houseReport"
              spId="5b12a827-d8a2-4b27-8fff-4c2ae1b167be"
              spCaption="ترسیم"
            /> -->
            <btn-default
              label="گزارش ملک"
              @click="houseReport"
              spId="36887b4e-87d8-4a5b-a60b-eb12e1f3f966"
              spCaption="گزارش ملک"
            />
            <btn-default
              label="گزارش صورتجلسه تحویل"
              @click="proceedingReport"
              spId="97911223-4cdd-46ab-acc1-968779088483"
              spCaption="گزارش صورتجلسه تحویل"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"
import InfoDetails from "./partials/InfoDetails.vue"
import InfoOther from "./partials/InfoOther.vue"
import InfoRealEstate from "./partials/InfoRealEstate.vue"
import InfoDocument from "./partials/InfoDocument.vue"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"
import { uid } from "quasar"
const defaultModel = {
  Doc_Info: {
    Apartment: 0,
    AreaBelongingMunicipality: null,
    AssignmentDate: null,
    AssignmentNo: null,
    Barcode: null,
    Block: 0,
    BuildArea: null,
    Building: 0,
    BureauLetterNo: null,
    CI_CertificateStatus: 0,
    CI_CessionKind: 0,
    CI_ContractRent: 0,
    CI_ContractType: 0,
    CI_DocStatus: 0,
    CI_DocStatus2: 0,
    CI_DocType: 0,
    CI_GettingKind: 0,
    CI_HouseStatus: 0,
    CI_OwnerStatus: 0,
    CI_OwnerType: 0,
    CI_PlanType: null,
    CI_PlanUsingMojaz: null,
    CI_PlanUsingType: null,
    CI_Region: 0,
    CI_UsingGroup: 0,
    CI_UsingGroup2: 0,
    ClassNo: null,
    ContractBuyDate: null,
    ContractBuyDateCommunicated: null,
    ContractBuyNo: null,
    ContractBuyNoCommunicated: null,
    ContractDate: null,
    ContractEndDate: null,
    ContractNo: null,
    ContractRentDate: null,
    ContractStartDate: null,
    CurrentArea: null,
    Description1: null,
    Description2: null,
    District: 0,
    DocArea: null,
    DocNo: null,
    DocNoAyan: null,
    DocType1: false,
    DocType10: false,
    DocType11: false,
    DocType12: false,
    DocType2: false,
    DocType3: false,
    DocType4: false,
    DocType5: false,
    DocType6: false,
    DocType7: false,
    DocType8: false,
    DocType9: false,
    DocTypeDesc: null,
    EndRentDate: null,
    EndowmentName: null,
    EvaluationDate: null,
    House: 0,
    IsAssignable: false,
    IsDocArchiveEstate: false,
    IsDocMunicipality: false,
    IsDocSafe: false,
    IsSeparation: false,
    IsShowSDI: true,
    IsUnion: false,
    LetterDate: null,
    LetterNo: null,
    LetterSubject: null,
    MapWkt: null,
    NIdDoc: "00000000-0000-0000-0000-000000000000",
    NIdWorkItem: 0,
    NidProc: "00000000-0000-0000-0000-000000000000",
    NidRequest: null,
    OldOwnerNameAddress: null,
    PathValue: null,
    Plack: null,
    PlanName: null,
    PostCode: null,
    Region: 0,
    RegisterPlackMain: null,
    RegisterPlackSection: null,
    RegisterPlackSub: null,
    RemainArea: null,
    RemainingAreaBelongingMunicipality: false,
    RentPrice: null,
    RenterAddress: null,
    RenterName: null,
    RenterTel: null,
    Shop: 0,
    TotalPrice: null,
    TransferDate: null,
    TransferDocAgentName: null,
    TransferDocDate: null,
    TransferDocName: null,
    TransferLetterNo: null,
    TransferNo: null,
    TransferRentDate: null,
    TransferRentNo: null,
    TransferYear: null
  }
}
export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    InfoDetails,
    InfoOther,
    InfoRealEstate,
    InfoDocument
  },
  data () {
    return {
      title: "اطلاعات املاک و اسناد",
      name: "UDocInfo",
      formKey: "2037A570-A3AC-48EE-848A-613DDED25C88",
      main: true,

      // #region services
      getDocInfoRes: null,
      saveDocInfoRes: null,
      getDocInfoBackRes: null,
      getDocInfoNextRes: null,
      copyDocInfoRes: null,
      // #endregion

      // #region variables
      NidProc: "00000000-0000-0000-0000-000000000000",
      activeTab: "infoDetails",
      erjaCode: null,
      showArchive: false,
      erjaCodeOptions: [],
      model: {
        docInfo: { ...defaultModel }
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
    // #endregion
  },
  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
    }
    this.loadObj(false)
  },
  methods: {
    loadObj (pIsLoadCode = false) {
      this.isEditable = false
      try {
        this.showLoading()
        const tmp = this.baseNosaziCode
        const payload = {
          PNIdProc: this.NidProc,
          PNIdWorkitem: this.model.docInfo.Doc_Info.NIdWorkItem,
          pDistrict: tmp.District,
          pRegion: tmp.Region,
          pBlock: tmp.Block,
          pHouse: tmp.House,
          pBuilding: tmp.Building,
          pApartment: tmp.Apartment,
          pShop: tmp.Shop
        }
        this.$services.ES.getDocInfo(payload).then(async ({ data }) => {
          this.getDocInfoRes = this.getResponse(data)
          if (this.getDocInfoRes.success) {
            this.model.docInfo = this.getDocInfoRes.data.GetDoc_InfoResult
            if (this.model.docInfo.Doc_Info !== null) {
              this.showArchive = true
              this.$refs.infoDocument.updateArchiveBizCode()
              this.erjaCodeOptions =
                this.model.docInfo?.DocWorkitemMessage?.map((m) => {
                  return {
                    ...m,
                    ID: Number(m.NIdWorkItem),
                    Title: m.NIdWorkItem
                  }
                })
              if (this.model.docInfo.Doc_Info.NIdWorkItem > 0) {
                this.erjaCode = parseFloat(
                  this.model.docInfo.Doc_Info.NIdWorkItem
                )
              }
              if (this.erjaCodeOptions.length > 1 && pIsLoadCode === false) {
                const codes = this.erjaCodeOptions
                  .map(({ ID }) => ID)
                  .toString()
                  .replaceAll(/,/g, " و ")
                this.showSuccess(
                  `این پرونده شامل کدهای رهگیری " ${codes} " می باشد.`,
                  { title: "توجه " }
                )
              }
              const {
                District,
                Region,
                Block,
                House,
                Building,
                Apartment,
                Shop
              } = this.model.docInfo.Doc_Info
              this.baseNosaziCode = {
                District,
                Region,
                Block,
                House,
                Building,
                Apartment,
                Shop
              }
              // let code = convertNosaziCodeObjectToString(this.baseNosaziCode)
              // this.showCodeOnMap(code, true)
            }
          }
        })
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      try {
        if (this.model.docInfo.IsConfirmContractBuy) {
          return this.showError(
            "پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد"
          )
        }
        // this.model.docInfo.Doc_Info.NidProc = this.NidProc
        // this.model.docInfo.Doc_Info.MapWkt = "" // this.selectedRequest.WKT
        const obj = this.model.docInfo.Doc_Info
        const payload = {
          PObj: {
            ...this.model.docInfo,
            Doc_Info: obj,
            IsConfirmContractBuy: false,
            _Apartment: obj.Apartment,
            _Block: obj.Block,
            _Building: obj.Building,
            _District: obj.District,
            _House: obj.House,
            _IsBack: false,
            _IsNext: false,
            _NIdDoc: obj.NIdDoc,
            _NIdProc: obj.NidProc,
            _NIdRequest: "00000000-0000-0000-0000-000000000000",
            _NIdWorkItem: obj.NIdWorkItem,
            _Region: obj.Region,
            _Shop: obj.Shop
          }
        }
        this.showLoading()
        const { data } = await this.$services.ES.saveDocInfo(payload)
        this.saveDocInfoRes = this.getResponse(data)
        if (this.saveDocInfoRes.success) {
          this.isEditable = false
          this.showSuccess("ثبت اطلاعات املاک و اسناد با موفقیت انجام شد", { title: "توجه" })
          await this.log({
            action: this.logActions.save,
            bizCode: obj.NIdWorkItem,
            bizCodeTitle: "NIdWorkItem",
            nidWorkItem: obj.NIdWorkItem,
            saveDesc: `ثبت اطلاعات کد رهگیری ${obj.NIdWorkItem} املاک و اسناد با موفقیت انجام شد.`
          })
          this.loadObj(false)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    newObj () {
      this.reset()
      this.isEditable = true
    },
    reset () {
      this.showArchive = false
      this.erjaCodeOptions = []
      this.model = { docInfo: { ...defaultModel } }
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }

      // New NidProc
      this.model.docInfo.NidProc = uid()

      // New NIdDoc
      let newId = uid()
      this.model.docInfo.Doc_Info.NIdDoc = newId
      this.model.docInfo._NIdDoc = newId
    },
    searchByNidWorkItem () {
      if (this.isEditable) return
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.loadObj(true)
    },
    searchByNosazi () {
      this.model.docInfo.Doc_Info.NIdWorkItem = 0
      this.loadObj(false)
    },

    copyHandler () {
      if (this.model.docInfo._NIdWorkItem > 0) {
        const handler = async () => {
          // این بخش در زمل سرا 8 کامنت شده
          // try {
          //   const payload = {}
          //   this.showLoading()
          //   const { data } = await this.$services.ES.copyDocInfo(payload)
          //   this.copyDocInfoRes = this.getResponse(data)
          //   if (this.copyDocInfoRes.success) {
          //   }
          // } catch (e) {
          //   console.error(e)
          //   this.serverError()
          // } finally {
          //   this.hideLoading()
          // }
        }
        this.showConfirm("آیا اطلاعات مورد نظر کپی شود؟").onOk(handler)
      }
    },
    backHandler () {
      try {
        this.showLoading()
        const payload = {
          PNIdWorkitem: this.model.docInfo.Doc_Info.NIdWorkItem
        }
        this.$services.ES.getDocInfoBack(payload).then(async ({ data }) => {
          this.getDocInfoBackRes = this.getResponse(data)
          if (this.getDocInfoBackRes.success) {
          }
        })
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    nextHandler () {
      try {
        this.showLoading()
        const payload = {
          PNIdWorkitem: this.model.docInfo.Doc_Info.NIdWorkItem
        }
        this.$services.ES.getDocInfoNext(payload).then(async ({ data }) => {
          this.getDocInfoNextRes = this.getResponse(data)
          if (this.getDocInfoNextRes.success) {
          }
        })
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    btnGetKartableClick () {
      if (
        this.selectedRequest !== null &&
        this.selectedRequest.WorkflowInstance != null
      ) {
        this.NidProc = this.TaskInfo.WorkflowInstance.NidProc
        this.baseNosaziCode = convertStringToNosaziCodeObject(
          this.selectedRequest.BizCode
        )
        // txtNIdWorkItem.Value = this.TaskInfo.WorkflowInstance.NidWorkItem.ToString();
      }
      this.loadObj(false)
    },
    async houseReport () {
      const reportPath =
        "/Estate/Rpt_DocInfo_HouseReport"
      const queryParams = {
        NIdDoc: this.model.docInfo.Doc_Info.NIdDoc,
        NIdWorkItem: this.model.docInfo.Doc_Info.NIdWorkItem
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.model.docInfo.Doc_Info.NIdDoc,
        bizCodeTitle: "NIdDoc",
        nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
        saveDesc: `نمایش گزارش ملک برای اطلاعات املاک و اسناد NIdDoc با مقدار:  ${this.model.docInfo.Doc_Info.NIdDoc}`
      })
    },
    async proceedingReport () {
      const reportPath =
        "/Estate/Rpt_DocInfo_ProceedingReport"
      const queryParams = {
        NIdDoc: this.model.docInfo.Doc_Info.NIdDoc,
        NIdWorkItem: this.model.docInfo.Doc_Info.NIdWorkItem
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.model.docInfo.Doc_Info.NIdDoc,
        bizCodeTitle: "NIdDoc",
        nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
        saveDesc: `نمایش گزارش صورتجلسه تحویل برای اطلاعات املاک و اسناد NIdDoc با مقدار:  ${this.model.docInfo.Doc_Info.NIdDoc}`
      })
    }
  },
  watch: {
    "model.docInfo.Doc_Info.NIdWorkItem": {
      handler () {
        const n = this.model.docInfo.Doc_Info.NIdWorkItem
        if (!n || n === "") {
          this.model.docInfo.Doc_Info.NIdWorkItem = 0
        }
      },
      deep: true
    }
  }
}
</script>
