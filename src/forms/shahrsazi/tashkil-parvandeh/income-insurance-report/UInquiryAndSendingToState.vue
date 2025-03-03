<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="7EDDCC78-5BF6-412A-8C2C-8B13CC51F975"
  >
    <form-wrapper :title="title" :padding="false" :loading="innerLoading">
      <template #header>
        <safa-status :result="getLogAmlakRes" />
        <safa-status :result="saveLogAmlakRes" />
      </template>
      <fit>
        <safa-tabs :padding="false" v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="SaveRequest" label="ارسال درخواست" />
          </template>
          <tab-content name="SaveRequest">
            <fit>
              <form-row :xs="1" :sm="2" :md="2" :lg="2" class="q-pa-sm">
                <form-control>
                  <nosazi-code-input
                    v-model="dataContext.baseNosaziCode"
                    label="کدنوسازی ملک :"
                    label-width="95px"
                    :enabled="mode === 'e' ? '1-1-1-1-1-1-1' : '0-0-0-0-0-0-0'"
                    m="e"
                    :actions="false"
                    cdcName="District"
                  />
                </form-control>
                <form-control>
                  <safa-text
                    v-model="dataContext.nidWorkItem"
                    label="کد ارجاع سامانه شهرسازی :"
                    label-width="135px"
                    :m="mode"
                    cdcName="nidWorkItem"
                  />
                </form-control>
              </form-row>
              <q-separator />
              <div class="fit q-pa-sm">
                <safa-grid
                  :columns="stateHistoryColumns"
                  :m="m"
                  v-model="stateHistory"
                  cdcName="StateHistory"
                  title="تاریخچه استعلام املاک"
                  height="100%"
                  max-height="100%"
                  ref="stateHistory"
                />
              </div>
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <btn-default label="ارسال" @click="saveObj" :disable="innerLoading" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "استعلام و ارسال به املاک",
      formKey: "2438F07C-F3D0-45BA-9226-EAE97BC3CC24",
      name: "UInquiryAndSendingToState",
      main: true,

      sidebarCompatible: true,
      workflowCompatible: false,

      // Context
      dataContext: {
        nidProc: "",
        district: null,
        nidWorkItem: 0,

        baseNosaziCode: {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
      },
      stateHistory: [],
      stateHistoryColumns: [
        {
          field: "Density",
          title: "تراکم قابل اعطا",
          width: 130
        },
        {
          field: "ExistArea",
          title: "مساحت موجود",
          width: 120
        },
        {
          field: "DocArea",
          title: "مساحت سند",
          width: 120
        },
        {
          field: "WayArea",
          title: "مساحت در مسیر",
          width: 130
        },
        {
          field: "CreateDate",
          title: "تاریخ ایجاد",
          width: 130
        },
        {
          field: "CreateTime",
          title: "ساعت ایجاد",
          width: 130
        },
        {
          field: "RahgiriCode",
          title: "کد رهگیری",
          width: 180
        }
      ],

      // Responses
      getLogAmlakRes: null,
      saveLogAmlakRes: null,

      // Loadings
      innerLoading: false,

      // Tabs
      activeTab: "SaveRequest"
    }
  },

  methods: {
    loadObj () {
      this.serviceHandler({
        pServiceName: "getLogAmlak",
        pPayload: {
          pNidproc: this.dataContext.nidProc
        },
        pConfig: {
          config: { District: this.dataContext.district }
        },
        pLogType: {
          action: this.logActions.view,
          bizCode: this.dataContext.nidProc,
          bizCodeTitle: "Nidproc"
        },
        pResultContainer: "getLogAmlakRes"
      })
        .then((res) => {
          this.stateHistory = res?.Log_Amlak || []
        })
        .catch((ex) => {
          console.error(ex)
        })
    },
    saveObj () {
      this.serviceHandler({
        pServiceName: "saveLogAmlak",
        pPayload: {
          pNidProc: this.dataContext.nidProc,
          pUser: {
            UserGuid: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        },
        pConfig: {
          config: { District: this.dataContext.district }
        },
        pLogType: {
          action: this.logActions.save,
          bizCode: this.dataContext.nidProc,
          bizCodeTitle: "NidProc"
        },
        pResultContainer: "saveLogAmlakRes"
      })
        .then(() => {
          this.showSuccess("عملیات با موفقیت انجام شد!")
        })
        .catch((ex) => {
          console.error(ex)
        })
    },
    async serviceHandler ({
      pServiceName,
      pPayload,
      pConfig = {},
      pLogType = undefined,
      pResultContainer
    }) {
      return new Promise(async (resolve, reject) => {
        if (!pServiceName) {
          return reject("آدرس سرویس بدرستی تنظیم نشده است!")
        }
        if (!pResultContainer) {
          return reject("pResultContainer بدستی تنظیم نشده است!")
        }

        try {
          this.innerLoading = true

          if (this.dataContext.district && !Object.keys(pConfig).length) {
            Object.assign(pConfig, {
              config: { District: this.dataContext.district }
            })
          }

          const { data } = await this.$services.SC[pServiceName].call(
            this,
            pPayload,
            pConfig
          )

          this[pResultContainer] = this.getResponse(data)
          if (this[pResultContainer].success) {
            if (pLogType) {
              await this.log(pLogType)
            }

            return resolve(this[pResultContainer].data)
          } else {
            return reject(new Error(this[pResultContainer].errors || ""))
          }
        } catch (ex) {
          return reject(ex)
        } finally {
          this.innerLoading = false
        }
      })
    }
  },

  mounted () {
    this.loadObj()
  },

  created () {
    if (!this.selectedRequest) {
      this.hideSidebar(this.name)
      return this.showError("لطفا ابتدا یک سطر از کارتابل انتخاب نمایید!")
    }

    if (this.selectedRequest) {
      const { NidProc, BizCode, NidWorkItem } = this.selectedRequest

      this.dataContext.nidProc = NidProc
      this.dataContext.district = this.selectedDistrict
      this.dataContext.nidWorkItem = NidWorkItem
      this.dataContext.baseNosaziCode = convertStringToNosaziCodeObject(BizCode)
    }
  }
}
</script>
