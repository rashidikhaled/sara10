<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="true" :hideTitle="hideTitle">
      <template #header>
        <safa-status :result="getContractRentInfoRequestListRes" />
        <safa-status :result="getContractRentInfoRes" />
        <safa-status :result="saveManagerConfirmRes" />
        <safa-status :result="delContractRentInfoRes" />
      </template>
      <safa-splitter v-model="spliterModel" class="fit">
        <template v-slot:before>
          <div class="flex column justify-between full-height">
            <fit>
              <q-list bordered>
                <q-item
                  clickable
                  v-ripple
                  v-for="(item, index) in treeView"
                  :key="index"
                  @click="selectItem(item)"
                >
                  <q-item-section avatar>
                    <q-avatar color="primary" icon="mark_chat_read" />
                  </q-item-section>
                  <q-item-section>
                    {{ getName(item) }}
                  </q-item-section>
                </q-item>
              </q-list>
            </fit>
          </div>
        </template>
        <template v-slot:after>
          <safa-tabs v-model="activeTab">
            <template v-slot:tabs>
              <tab-menu
                name="RentalAgreementDetails"
                label="مشخصات قرارداد اجاره/استیجاره"
              />
              <tab-menu name="ContractParties" label="طرفین قرارداد" />
              <tab-menu name="LeaseSpecification" label="مشخصات اجاره نامه" />
              <tab-menu name="OtheInfo" label="سایر اطلاعات" />
              <tab-menu name="Certificates" label="تاییدات" />
              <tab-menu name="PrintHistory" label="تاریخچه چاپ" />
            </template>
            <tab-content name="RentalAgreementDetails">
              <fit>
                <RentalAgreementDetails
                  :formKey="formKey"
                  :title="title"
                  :name="name"
                  v-model="model"
                  :m="mode"
                />
              </fit>
            </tab-content>
            <tab-content name="ContractParties">
              <fit>
                <ContractParties
                  :formKey="formKey"
                  :title="title"
                  :name="name"
                  v-model="model"
                  :m="mode"
                />
              </fit>
            </tab-content>
            <tab-content name="LeaseSpecification">
              <fit>
                <LeaseSpecification
                  :formKey="formKey"
                  :title="title"
                  :name="name"
                  v-model="model"
                  :m="mode"
                />
              </fit>
            </tab-content>
            <tab-content name="OtheInfo">
              <fit>
                <OtheInfo
                  :formKey="formKey"
                  :title="title"
                  :name="name"
                  v-model="model"
                  :m="mode"
                />
              </fit>
            </tab-content>
            <tab-content name="Certificates">
              <fit>
                <Certificates
                  :formKey="formKey"
                  :title="title"
                  :name="name"
                  v-model="model"
                  :m="mode"
                />
              </fit>
            </tab-content>
            <tab-content name="PrintHistory">
              <fit>
                <PrintHistory
                  :formKey="formKey"
                  :title="title"
                  :name="name"
                  v-model="model"
                  :m="mode"
                />
              </fit>
            </tab-content>
          </safa-tabs>
        </template>
      </safa-splitter>

      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <btn-default @click="deleteHandler" label="حذف" />
          <btn-default @click="ficheHandler" label="صدور قبض" />
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import RentalAgreementDetails from "./partials/RentalAgreementDetails.vue"
import ContractParties from "./partials/ContractParties.vue"
import LeaseSpecification from "./partials/LeaseSpecification.vue"
import OtheInfo from "./partials/OtheInfo.vue"
import Certificates from "./partials/Certificates.vue"
import PrintHistory from "./partials/PrintHistory.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    RentalAgreementDetails,
    ContractParties,
    LeaseSpecification,
    OtheInfo,
    Certificates,
    PrintHistory
  },
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: "UContractRentList",
      title: "قرارداد اجاره استیجاره",
      formKey: "BE1B12B1-5612-4ED7-8D09-797C860BC2A9",
      main: true,

      // variables
      activeTab: "RentalAgreementDetails",
      model: {
        ApprovalTask_Info: [],
        ContractRent_ContractParties: [],
        ContractRent_ContractTerms: [],
        ContractRent_Info: {
          AccountsBetweenDate: "",
          AccountsBetweenNo: "",
          AccountsBetweenPrice: "",
          AddedTheLocks: "",
          BureauNo: "",
          CI_ContractCancelReason: 0,
          CI_ContractRentSubject: 0,
          CI_ContractRentType: 0,
          CI_GiveLenType: 0,
          CalcRenterDebDate: "",
          CalcRenterDebPrice: "",
          CancelDate: "",
          CancelDesc: "",
          CancelNo: "",
          ConfirmDate: "",
          ContractEndDate: "",
          ContractRentDate: "",
          ContractRentNo: "",
          ContractStartDate: "",
          Description: "",
          DocDate: "",
          DocNo: "",
          IncPercent: "",
          IsArchived: false,
          IsDocumentContract: false,
          IsDraftContract: false,
          LastPonyDate: "",
          LastPreviousYearlyRent: "",
          NIdContractRent: "00000000-0000-0000-0000-000000000000",
          NIdContractRent_tmp: "",
          NidRequest: "00000000-0000-0000-0000-000000000000",
          PaymentPer: "",
          RentCalcBasedPriceBA: false,
          TheRightTransfer: "",
          YearlyFeeBA: ""
        },
        ContractRent_LetterEarning: [],
        ContractRent_Other: [],
        ContractRent_UseFundRegister: [],
        DebitCredit_Info_2: [],
        IsConfirmContractBuy: false,
        PrintLog_Info: [],
        Total_Price: "",
        _NIdContractRent: "00000000-0000-0000-0000-000000000000",
        _NIdProcess: "00000000-0000-0000-0000-000000000000"
      },
      NIdContractRent: "00000000-0000-0000-0000-000000000000",
      spliterModel: 15,
      treeView: [],
      selelectedItemTree: {},
      ContractRentDate: "",
      NidRequest: "00000000-0000-0000-0000-000000000000",
      NidProc: "00000000-0000-0000-0000-000000000000",

      // services
      getContractRentInfoRequestListRes: null,
      getContractRentInfoRes: null,
      saveManagerConfirmRes: null,
      delContractRentInfoRes: null
    }
  },
  mounted () {
    this.getContractRentInfoRequestList()
  },
  watch: {
    selelectedItemTree () {
      this.getContractRentInfo()
    }
  },
  methods: {
    selectItem (item) {
      this.selelectedItemTree = { ...item }
    },
    getName (item) {
      // this.ContractRentDate = item.ContractRentDate
      return `قرارداد اجاره - ${item.ContractRentDate}`
    },
    async getContractRentInfoRequestList () {
      this.showLoading()
      const payload = {
        pNIdProc:
          this.selectedRequest.NidProc ||
          "00000000-0000-0000-0000-000000000000"
      }
      try {
        const { data } = await this.$services.ES.getContractRentInfoRequestList(
          payload
        )
        this.getContractRentInfoRequestListRes = this.getResponse(data)
        if (this.getContractRentInfoRequestListRes.success) {
          this.treeView =
            this.getContractRentInfoRequestListRes?.data?.GetContractRent_Info_RequestListResult
          if (this.treeView.length > 0) {
            this.selelectedItemTree = {
              ...this.treeView[this.treeView.length - 1]
            }
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async getContractRentInfo () {
      const payLoad = {
        PNIdContractRent: this.selelectedItemTree.NIdContractRent
      }
      try {
        const { data } = await this.$services.ES.getContractRentInfo(payLoad)
        this.getContractRentInfoRes = this.getResponse(data)
        if (this.getContractRentInfoRes.success) {
          this.model =
            this.getContractRentInfoRes?.data?.GetContractRent_InfoResult
          if (this.model.ContractRent_Info.ContractRentNo === null) {
            this.model.ContractRent_Info.ContractRentNo = ""
          }
          if (this.model.ContractRent_Info.ContractRentDat === null) {
            this.model.ContractRent_Info.ContractRentDat = ""
          }

          await this.log({
            action: this.logActions.view,
            bizCode: this.selelectedItemTree,
            bizCodeTitle: "",
            saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      this.showLoading()
      const payload = {
        PObj: {
          ...this.model,
          ContractRent_Info: {
            ...this.model.ContractRent_Info,
            ContractRentNo:
              this.model.ContractRent_Info.ContractRentNo === ""
                ? null
                : this.model.ContractRent_Info.ContractRentNo,
            NidRequest: this.selelectedItemTree.NidRequest
          }
        }
      }
      try {
        const { data } = await this.$services.ES.saveContractRentInfo(payload)
        this.saveManagerConfirmRes = this.getResponse(data)
        if (this.saveManagerConfirmRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد.")
          this.isEditable = false
          this.getContractRentInfoRequestList()
          await this.log({
            action: this.logActions.save,
            bizCode: this.model._NIdContractRent,
            bizCodeTitle: "_NIdContractRent",
            nosaziCode: "",
            nidWorkItem: "",
            saveDesc: `ذخیره اطلاعات فرم قرارداد اجاره/استیجاره برای شماره درخواست ${this.model._NIdContractRent} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    deleteHandler () {
      if (this.treeView.length === 0 || this.ContractRentDate === "جدید") {
        this.showError("خطا در حذف اطلاعات")
        return
      }
      this.showConfirm("آیا اطلاعات مورد نظر  حذف شود؟").onOk(async () => {
        this.showLoading()
        const payLoad = {
          PNIdContractRent: this.selelectedItemTree.NIdContractRent
        }
        this.$services.ES.delContractRentInfo(payLoad)
          .then(async ({ data }) => {
            this.delContractRentInfoRes = this.getResponse(data)
            if (this.delContractRentInfoRes.success) {
              this.showSuccess("حذف اطلاعات باموفقیت انجام شد.")

              this.getContractRentInfoRequestList()
              await this.log({
                action: this.logActions.delete,
                bizCode: this.NidRequest,
                bizCodeTitle: "NidRequest",
                nosaziCode: "",
                nidWorkItem: "",
                saveDesc: ""
              })
            }
          })
          .catch((e) => {
            this.showError(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    ficheHandler () {
      const reportPath = "/Estate/Rpt_Contract_Rent_Fiche"
      const queryParams = {
        NidProc: this.selectedRequest.NidProc ||
          "00000000-0000-0000-0000-000000000000"
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.NidRequest,
        bizCodeTitle: "NidRequest",
        nosaziCode: "",
        nidWorkItem: "",
        saveDesc: ""
      })
    }
  }
}
</script>
