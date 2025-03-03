<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
        <!-- <safa-status :result="saveRegRequestInfoRes" /> -->
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="از مبلغ"
              v-model="model.renovation.FromPrice"
              cdcName="FromPrice"
              label-width="65px"
              @keyup.enter="loadObj"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تا مبلغ"
              v-model="model.renovation.ToPrice"
              cdcName="ToPrice"
              label-width="65px"
              @keyup.enter="loadObj"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="از تاریخ"
              v-model="model.renovation.FromDate"
              cdcName="FromDate"
              label-width="65px"
              @keyup.enter="loadObj"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تا تاریخ"
              v-model="model.renovation.ToDate"
              cdcName="ToDate"
              label-width="65px"
              @keyup.enter="loadObj"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="توضیحات"
              label-width="65px"
              v-model="model.renovation.desc"
              cdcName="desc"
              @keyup.enter="loadObj"
            />
          </FormControl>
          <nosazi-code-input
            label="از کد نوسازی"
            v-model="model.renovation.fromBaseNosaziCode"
            cdcName="fromBaseNosaziCode"
            label-width="65px"
          />
          <nosazi-code-input
            label="تا کد نوسازی"
            v-model="model.renovation.toBaseNosaziCode"
            cdcName="toBaseNosaziCode"
            label-width="65px"
          />
          <div class="col" />
          <div class="q-gutter-sm">
            <btn-search @click="loadObj" />
            <btn-default label="پاک کردن" @click="resetObj" />
          </div>
        </FormRow>
        <safa-grid
          title="لیست فیش ها"
          v-model="fiches"
          cdcName="fiches"
          :columns="fichesColumns"
          height="100%"
          max-height="100%"
          paginate
          fit
          :suppressRowClickSelection="false"
          m="r"
          :pageSize="20"
          ref="fichesRef"
        />
      </fit>
      <template v-slot:footer>
        <btn-save :label="title" @click="saveObj" />
      </template>
    </form-wrapper>

    <q-dialog
      v-model="requestSubmitionsStatusModal"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-white text-primary">
        <q-bar class="bg-primary text-white q-mb-md">
          <div style="font-size: 14px">عملیات ثبت درخواست</div>
          <q-space />
          <q-icon v-close-popup name="close" size="17px" color="white" dense class="cursor-pointer" />
        </q-bar>
        <q-card-section
          align="right"
          class="q-pt-none"
          v-for="m in msgs"
          :key="m.FicheNo"
        >
          <span style="min-width: 14px">
            <q-icon
              v-if="m.Status === 'success'"
              name="check"
              size="17px"
              color="positive"
              dense
            />
            <q-icon
              v-if="m.Status === 'error'"
              name="close"
              size="17px"
              color="red"
              dense
            />
            <q-icon
              v-if="m.Status === 'loading'"
              name="hourglass_top"
              size="17px"
              color="grey"
              dense
            />
          </span>
          <span
            class="q-mx-sm"
            v-if="m.Status === 'success'"
            style="color: green"
            >ثبت درخواست با شماره پیگیری ( {{ m.NidWorkItem }} ) برای فیش شماره  {{ m.FicheNo }}  با موفقیت انجام
            گردید.</span
          >
          <span class="q-mx-sm" v-if="m.Status === 'error'" style="color: red"
            >ثبت درخواست برای فیش با شماره ( {{ m.FicheNo }} ) با خطا مواجه
            شد.</span
          >
          <span
            class="q-mx-sm"
            v-if="m.Status === 'loading'"
            style="color: grey"
            >ثبت درخواست برای فیش با شماره ( {{ m.FicheNo }} ) در حال انجام
            است.</span
          >
        </q-card-section>
      </q-card>
    </q-dialog>

    <safa-popup
      v-model="showDetails"
      title="جزئیات"
      width="950px"
      height="600px"
    >
      <fiche-details v-model="selectedItem" />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"
import { currentDate, currentTime } from "src/utils/index"

import { uid } from "quasar"
import FicheDetails from "../request-renovation-duty/partials/FicheDetails.vue"

const defaultModel = {
  fromBaseNosaziCode: {
    District: 0,
    Region: 0,
    Block: 0,
    House: 0,
    Building: 0,
    Apartment: 0,
    Shop: 0
  },
  toBaseNosaziCode: {
    District: 0,
    Region: 0,
    Block: 0,
    House: 0,
    Building: 0,
    Apartment: 0,
    Shop: 0
  },
  requestNumber: null,
  FromPrice: null,
  ToPrice: null,
  FromDate: "",
  ToDate: "",
  desc: ""
}
const nidWorkflowDeffMsg =
  "کلید گردشکار ثبت درخواست طرح های توسعه تعریف نشده است . لطفا به راهبر سیستم اطلاع دهید."
export default {
  components: { FicheDetails },
  mixins: [baseFormMixin],

  data () {
    return {
      title: "ثبت درخواست بدهی پسماند",
      formKey: "EAA1D65F-4985-4D23-B25E-8C7FF36D9170",
      name: "URequestGarbageDuty",
      main: true,

      model: { renovation: { ...defaultModel } },
      selectedItem: null,
      fiches: [],
      fichesColumns: [
        {
          field: "isSelectedNode",
          width: "40px",
          headerCheckboxSelection: false,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false,
          resizable: false
        },
        {
          field: "",
          title: "",
          width: "100px",
          btnTitle: "نمایش جزئیات",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.showFicheDetail(params)
        },
        {
          field: "FicheNo",
          title: "شماره فیش",
          width: "120px"
        },
        {
          field: "NosaziCode",
          title: "کد نوسازی",
          width: "120px"
        },
        {
          field: "CI_DutyFicheExportType",
          title: "نوع فیش",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "160px"
        },
        {
          field: "TotalPrice",
          title: "مبلغ",
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
          field: "OwnerName",
          title: "نام مالک",
          width: "160px"
        },
        {
          field: "MainAddress",
          title: "آدرس",
          width: "auto"
        }
      ],
      showDetails: false,

      loadObjRes: null,
      saveRegRequestInfoRes: null,

      nidWorkflowDeff: null,
      procInfo: null,

      requestSubmitionsStatusModal: false,
      msgs: []
    }
  },

  mounted () {
    const obj =
      window.getConfigValue("esupParams")?.Com77NidWorkflowDeff ?? null
    if (obj && obj.NidWorkflowDeff) {
      this.nidWorkflowDeff = obj.NidWorkflowDeff
    } else this.showError(nidWorkflowDeffMsg)
  },

  methods: {
    loadObj () {
      const o = this.model.renovation
      if (
        !window.getConfigValue("SB") ||
        typeof window.getConfigValue("SB") !== "object" ||
        !window
          .getConfigValue("SB")
          .hasOwnProperty(o.fromBaseNosaziCode.District)
      ) {
        this.showError("منطقه مورد نظر در کد نوسازی معتبر نمی باشد!")
        return
      }
      this.showLoading()
      this.$services.SB.getDutyFichesForCommision77(
        {
          pFromRow: 0,
          pToRow: 100,
          pDutyType: 2, // پسماند
          pFromCode: convertNosaziCodeObjectToString(o.fromBaseNosaziCode),
          pToCode: convertNosaziCodeObjectToString(o.toBaseNosaziCode),
          pFromDate: o.FromDate,
          pToDate: o.ToDate,
          pFromPayablePrice: o.FromPrice,
          pToPayablePrice: o.ToPrice,
          pEumDutyFicheStatus: "",
          pWhereCondition: "",
          pIncludeShop: false,
          pIsNosaziIsfaham: false
        },
        { config: { District: o.fromBaseNosaziCode.District } }
      )
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            const res = this.loadObjRes.data
            this.fiches =
              res?.GetFicheForCommision77?.map((e) => {
                return {
                  ...e,
                  isSelectedNode: false
                }
              }) ?? []
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

    async saveObj () {
      if (!this.nidWorkflowDeff) return this.showError(nidWorkflowDeffMsg)
      const list = this.$refs.fichesRef.gridApi.getSelectedRows() ?? []
      if (list.length === 0) {
        this.showError("لطفا یک سطر از لیست فیش ها انتخاب نمایید.")
      } else {
        this.msgs = list.map((m) => {
          return {
            Status: "loading",
            FicheNo: m.FicheNo ?? 0,
            NidWorkItem: 0
          }
        })
        this.requestSubmitionsStatusModal = true
        for (let i = 0; i < list.length; i++) {
          await this.saveProcess(list[i])
        }
      }
    },

    async saveProcess (fiche) {
      try {
        this.showLoading()
        console.log("addWorkItem")
        await this.addWorkItem(fiche)
        console.log("saveRequest")
        await this.saveRequest(fiche)

        await this.log({
          action: this.logActions.save,
          bizCode: this.procInfo.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.procInfo.BizCode,
          nidWorkItem: this.procInfo.NidWorkItem,
          saveDesc: `عملیات ثبت درخواست بدهی پسماند با شماره ${this.procInfo.NidWorkItem} انجام گردید.`
        })
        for (let i = 0; i < this.msgs.length; i++) {
          if (this.msgs[i].FicheNo === fiche.FicheNo) {
            this.msgs[i].Status = "success"
            this.msgs[i].NidWorkItem = this.procInfo.NidWorkItem
          }
        }
        // this.showSuccess(
        //   `درخواست شماره ${this.procInfo.NidWorkItem} جهت بررسی بدهی پسماند با موفقیت ثبت گردید.`
        // ).onDismiss(() => {
        //   this.hideLoading()
        //   // this.redirectToKartable() // با توجه به این که در این فرم به صورت لیست باید ثبت درخواست به ازای هر سطر انجام شود ، این بخش کامنت میشود.
        // })
        this.refreshKartable()
      } catch (e) {
        console.error("@@@@@addRequest Error", e)
        for (let i = 0; i < this.msgs.length; i++) {
          if (this.msgs[i].FicheNo === fiche.FicheNo) {
            this.msgs[i].Status = "error"
          }
        }
        await this.deleteRequest()
        await this.deleteProc()
        // this.showError(
        //   `متاسفانه عملیات ثبت درخواست بدهی پسماند در کمیسیون ماده 77 برای کد نوسازی ${fiche.NosaziCode} متوقف شد.`
        // )
        this.hideLoading()
      } finally {
        this.$forceUpdate()
        this.hideLoading()
      }
    },

    async addWorkItem (fiche) {
      return new Promise(async (resolve, reject) => {
        this.procInfo = null
        const payload = {
          BizCode: fiche.NosaziCode,
          EumOwnerType: 0,
          NidWorkflowDeff: this.nidWorkflowDeff,
          ProcInitiator: this.getNidUser(),
          ProcRequester: fiche.OwnerName ?? this.getUserDisplayName() ?? '', // fiche.OwnerName ?? "", // این مورد باید پر شود.
          ProcInitiatorName: this.getUserDisplayName(),
          ProcArea: "کمیسیون ماده 77",
          GroupName: this.title,
          GroupTitel: this.title,
          Domain: this.model.renovation.toBaseNosaziCode?.District,
          IsSara10Request: true
        }
        const { data } = await this.$srvWorkflow.createInstance(payload)
        this.creInsRes = this.getResponse(data)
        if (this.creInsRes.success) {
          const res = this.creInsRes.data
          if (res.status === 200 && res.success) {
            this.procInfo = res.data.ProcInfo
            return resolve()
          } else {
            return reject(this.creInsRes.msg)
          }
        } else {
          return reject(this.creInsRes.msg)
        }
      })
    },
    async saveRequest (Items) {
      return new Promise(async (resolve, reject) => {
        try {
          const newGuid = uid()
          const payload = {
            pRequest: {
              ClsRequest_Info: {
                Request_Info: {
                  NidProc: this.procInfo.NidProc,
                  NidWorkItem: this.procInfo.NidWorkItem,
                  IsSara10: true
                }
              },
              ListClsRequest_Info: [
                {
                  Request_FicheDetail: [
                    {
                      CI_IncomeAccountGroup: 0,
                      FicheNo: Items.FicheNo,
                      NidFiche: Items.NidFiche,
                      NidFicheDetail: uid(),
                      PriceFiche: Items.TotalPrice,
                      NidRequest: newGuid
                    }
                  ],
                  Request_Info: {
                    Address: Items.MainAddress,
                    NosaziCode: Items.NosaziCode,
                    Distrcit: convertStringToNosaziCodeObject(Items.NosaziCode)
                      .District,
                    FromDate: Items.FromDate,
                    OwnerName: Items.FullOwenName ?? "",
                    Price: Items.TotalPrice,
                    ToDate: Items.ToDate,
                    CI_RequestType: 2, // پسماند
                    CreateDate: currentDate(),
                    CreateTime: currentTime(),
                    CreatorID: this.getNidUser(),
                    CreatorUserName: this.getUserDisplayName(),
                    NidRequest: newGuid,
                    NidFiche: Items.NidFiche,
                    DescRequest: this.model.renovation.desc,
                    NidNosaziCode: Items.NidNosaziCode,
                    NidProc: this.procInfo.NidProc,
                    NidWorkItem: this.procInfo.NidWorkItem,
                    TitleRequest: "فیش پسماند    " + Items.FicheNo,
                    IsSara10: true
                  },
                  SubFicheDetail: null
                }
              ]
            }
          }
          console.log("payload saveRegRequestInfo :>> ", payload)
          this.showLoading()
          const { data } = await this.$services.commission77.saveRegRequestInfo(
            payload
          )
          this.saveRegRequestInfoRes = this.getResponse(data)
          if (this.saveRegRequestInfoRes.success) {
            return resolve()
          } else return reject(data.msg)
        } catch (e) {
          console.error("saveRegRequestInfo Error", e)
          return reject(e)
        }
      })
    },
    async deleteRequest () {
      try {
        const { data } = await this.$services.SC.deleteRequest(
          { pNidProc: this.procInfo.NidProc },
          this.config
        )
        this.deleteResult = this.getResponse(data)
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
          this.config
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

    async showFicheDetail (data) {
      const self = this
      this.$nextTick(() => {
        self.selectedItem = data
        self.showDetails = true
      })
    },

    resetObj () {
      this.model = { renovation: { ...defaultModel } }
    }
  }
}
</script>
