<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="false">
      <safa-status :result="getAllOperationListRes" />
      <safa-status :result="getWarrantOrderListRes" />
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="entryVerdictOrders" label="دستورات حکم ورود" />
          <tab-menu
            name="entryVerdictOrdersDetails"
            label="جزئیات دستور حکم ورود"
          />
          <tab-menu name="ExecuttingVerdict" label="اجرای حکم" />
        </template>
        <tab-content name="entryVerdictOrders">
          <entry-verdict-orders
            :formKey="formKey"
            :title="title"
            :name="name"
            @selectHokmDetails="onSelectHokmDetails"
            @search="loadObj"
            @selectedRow="($event) => (selectedverdictOrders = $event)"
            v-model="entryVerdictOrdersModel"
            :entryVerdictOrdersList="entryVerdictOrdersList"
          />
        </tab-content>
        <tab-content name="entryVerdictOrdersDetails">
          <entry-verdict-orders-details
            :name="name"
            :title="title"
            :formKey="formKey"
            :entryVerdictOrdersDetailsList="entryVerdictOrdersDetailsList"
            @submitMinutes="activeTabHandler"
          />
        </tab-content>
        <tab-content name="ExecuttingVerdict">
          <executting-verdict
            :NidOper="
              selectedverdictOrders?.NidOper ||
              '00000000-0000-0000-0000-000000000000'
            "
            :allOperationListRes="getAllOperationListRes.data"
            :name="name"
            :title="title"
            :formKey="formKey"
            :loadHandler="startLoading"
          />
        </tab-content>
      </safa-tabs>
    </form-wrapper>
  </safa-form>
</template>

<script>
import ExecuttingVerdict from "./partials/ExecuttingVerdict"
import EntryVerdictOrdersDetails from "./partials/EntryVerdictOrdersDetails"
import EntryVerdictOrders from "./partials/EntryVerdictOrders"
import baseFormMixin from "src/mixins/baseFormMixin"
// import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  components: {
    ExecuttingVerdict,
    EntryVerdictOrdersDetails,
    EntryVerdictOrders
  },
  data () {
    return {
      name: "UEntryPermission",
      title: "لیست حکم ورود",
      formKey: "5C1090F0-3964-44C6-B52E-F4109B88F918",
      main: true,
      selectedverdictOrders: null,
      activeTab: "entryVerdictOrders",
      startLoading: "",
      entryVerdictOrdersDetailsList: [],
      getAllOperationListRes: {
        AllSealedList: [],
        AllSealedNotComList: null,
        AllSealedOrderConfirmedList: null,
        ClsProphecy: {
          ErrorResult: {
            BizErrors: [],
            Requirements: []
          },
          NidProphecy: "00000000-0000-0000-0000-000000000000",
          Prophecy: {
            CI_Article: null,
            Comment: null,
            NidOper: null,
            NidProphecy: "00000000-0000-0000-0000-000000000000",
            NidWarning: null,
            NotificationOfficer: null,
            Post: null,
            RecipientName: null
          }
        },
        ErrorResult: {
          BizErrors: [],
          Requirements: []
        },
        IsConfirmLastSealedOrder: false,
        License: null,
        NidOper: "00000000-0000-0000-0000-000000000000",
        NidProc: "00000000-0000-0000-0000-000000000000",
        NidWorkflowDeff: "00000000-0000-0000-0000-000000000000",
        NosaziCode: null,
        RequestInfo: null,
        SealedOperation: null,
        SealedOperationCIList: null,
        SealedOperationList: null,
        SealedOperationListNotOrder: null,
        SealedOperationListWarrant: null,
        SealedOperationOrder: null,
        SealedRemoveOrder: null,
        SrvSealedDetachNotOrderResult: null,
        Warrant: {
          ClsProphecy: {
            ErrorResult: {
              BizErrors: [],
              Requirements: []
            },
            NidProphecy: "00000000-0000-0000-0000-000000000000",
            Prophecy: {
              CI_Article: null,
              Comment: null,
              NidOper: null,
              NidProphecy: "00000000-0000-0000-0000-000000000000",
              NidWarning: null,
              NotificationOfficer: null,
              Post: null,
              RecipientName: null
            }
          },
          ErrorResult: {
            BizErrors: [],
            Requirements: []
          },
          NidNosaziCode_Sara: "00000000-0000-0000-0000-000000000000",
          NidOper: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidWarning: "00000000-0000-0000-0000-000000000000",
          NidWarrant: "00000000-0000-0000-0000-000000000000",
          NidWarrantOrder: "00000000-0000-0000-0000-000000000000",
          SealedOperation: null,
          SortByValidityDate: false,
          WarningListWarrant: null,
          WarrantList: null,
          WarrantOrderList: null,
          WarrantOrderResultList: null
        }
      },
      entryVerdictOrdersList: [],
      getWarrantOrderListRes: [],
      entryVerdictOrdersModel: {
        haveWarrantResult: false,
        limitWarrantResult: false,
        fromDate: "",
        toDate: "",
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
    }
  },

  methods: {
    activeTabHandler (tab) {
      this.activeTab = tab
      this.startLoading = tab
    },
    onSelectHokmDetails (item) {
      this.$nextTick(async () => {
        await this.LoadWarrantOfOrder(item.NidOper)
        this.activeTab = "entryVerdictOrdersDetails"
      })
    },
    LoadWarrantOfOrder (nidOper, pSortByValidityDate = false) {
      this.showLoading()
      const payload = {
        pClsWarrant: {
          NidOper: nidOper,
          SortByValidityDate: pSortByValidityDate
        }
      }
      this.$services.SH.getWarrantOrderList(payload)
        .then(async ({ data }) => {
          this.getWarrantOrderListRes = this.getResponse(data)
          if (this.getWarrantOrderListRes.success) {
            this.entryVerdictOrdersDetailsList =
              this.getWarrantOrderListRes.data.WarrantOrderList
            await this.log({
              action: this.logActions.view,
              bizCode: nidOper ?? "",
              bizCodeTitle: "nidOper"
            })
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    loadObj () {
      // این شرط به درخواست مشهد کامنت شد ضمن اینکه در سرا8 نیز این پیغام صادر نمی شود.

      // if (!this.entryVerdictOrdersModel.haveWarrantResult && !this.entryVerdictOrdersModel.limitWarrantResult) {
      //   return this.showError(
      //     'انتخاب حداقل یکی از موارد "نمایش احکام منقضی شده" و یا "نمایش احکام منقضی شده" الزامی می باشد.'
      //   )
      // }
      this.showLoading()
      const payload = {
        pFromDate: this.entryVerdictOrdersModel.fromDate,
        pToDate: this.entryVerdictOrdersModel.toDate,
        pDistrict: this.entryVerdictOrdersModel.baseNosaziCode.District,
        pRegion: this.entryVerdictOrdersModel.baseNosaziCode.Region,
        pHouse: this.entryVerdictOrdersModel.baseNosaziCode.House,
        pBuilding: this.entryVerdictOrdersModel.baseNosaziCode.Building,
        pApartment: this.entryVerdictOrdersModel.baseNosaziCode.Apartment,
        pShop: this.entryVerdictOrdersModel.baseNosaziCode.Shop,
        pFromRow: 0,
        pToRow: 100,
        EumSealedOperationType: 8,
        HaveWarrant: true,
        haveWarrantResult: this.entryVerdictOrdersModel.haveWarrantResult,
        LimitWarrantResult: this.entryVerdictOrdersModel.limitWarrantResult
        // pNidWorkitem: this.selectedRequest?.NidWorkitem || 0,
        // pNosaziCode: convertNosaziCodeObjectToString(
        //   this.entryVerdictOrdersModel.baseNosaziCode
        // )
      }
      this.$services.SH.getAllOperationList(payload)
        .then(async ({ data }) => {
          this.getAllOperationListRes = this.getResponse(data)
          if (this.getAllOperationListRes.success) {
            this.entryVerdictOrdersList =
              this.getAllOperationListRes.data.AllSealedList
            await this.log({
              action: this.logActions.view,
              bizCode: payload.pNosaziCode ?? "",
              bizCodeTitle: "کدنوسازی",
              nosaziCode: payload.pNosaziCode ?? "",
              nidWorkItem: payload.pNidWorkitem ?? "",
              saveDesc: `نمایش لیست حکم ورود برای شماره ${payload.pNosaziCode} انجام گردید.`
            })
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  mounted () {
    this.loadObj()
  }
}
</script>
