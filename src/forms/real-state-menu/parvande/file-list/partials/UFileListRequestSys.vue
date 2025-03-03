<template>
  <fit>
    <safa-status :result="getRequestInfoRes" />
    <safa-status :result="saveRequestInfoRes" />

    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="filingInformation" label="اطلاعات تشکیل پرونده" />
      </template>
      <tab-content name="filingInformation">
        <fit>
          <UFileListRequestSysfilingInformation
            v-model="dataContext"
            :formKey="formKey"
            :m="mode"
            :NidProc="NidProc"
            ref="UFileListRequestSysfilingInformation"
          />
        </fit>
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<!-- eslint-disable vue/no-reserved-keys -->
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

import UFileListRequestSysfilingInformation from "./ufile-list-request-sys-partials/UFileListRequestSysfilingInformation.vue"

import { uid } from "quasar"

export default {
  mixins: [baseFormMixin],

  components: {
    UFileListRequestSysfilingInformation
  },

  props: {
    formKey: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      activeTab: "filingInformation",

      dataContext: {
        Apartment: 0,
        Block: 0,
        Building: 0,
        CI_Region: 0,
        CI_RequestType: [],
        District: 0,
        House: 0,
        IsBindingToSara: false,
        IsBuildingRequest: false,
        IsConfirmContractBuy: false,
        IsDuplicate: false,
        IsNotExistCodeFromSara: false,
        IsOtherKartable: false,
        IsRepaireRequest: false,
        IsRequestSys: false,
        NId: 0,
        NIdCopy: 0,
        NidWorkflowDeff: "00000000-0000-0000-0000-000000000000",
        Region: 0,
        Request_Attorney: [],
        Request_Info: {},
        RequesterName: "",
        SendToGarbageKartabl: false,
        Shop: 0,
        UserInfo_GUID: "00000000-0000-0000-0000-000000000000",
        UserName: "",
        Wkt: "",
        _ArchiveCode: "",
        _BlackListFirstEntryReason: 0,
        _IsNew: false,
        _JobLocationGuid: "00000000-0000-0000-0000-000000000000",
        _JobLocationName: null,
        _NIdBaseCode: "00000000-0000-0000-0000-000000000000",
        _NIdRequest: "00000000-0000-0000-0000-000000000000",
        _RequestNo: 0,
        _Sh_RequestInfo: null
      },

      getRequestInfoRes: null,
      saveRequestInfoRes: null,

      _NIdBaseCode: "00000000-0000-0000-0000-000000000000",
      _NidUser: "00000000-0000-0000-0000-000000000000",

      _CodeString: "",
      _District: 0,
      _Region: 0,
      _Block: 0,
      _House: 0,
      _Building: 0,
      _Apartment: 0,
      _Shop: 0,
      _NIdCopy: 0,

      NidProc: "00000000-0000-0000-0000-000000000000",

      // CF
      loadCompleted: null,
      SaveCompleted: null
    }
  },

  methods: {
    uRequestSys (pNIdProc, pCodeString, pNIdCopy) {
      this._CodeString = pCodeString
      this._NIdCopy = pNIdCopy
      this.NidProc = pNIdProc

      this._District = this._CodeString.District
      this._Region = this._CodeString.Region
      this._Block = this._CodeString.Block
      this._House = this._CodeString.House
      this._Building = this._CodeString.Building
      this._Apartment = this._CodeString.Apartment
      this._Shop = this._CodeString.Shop

      this.loadObj()
    },

    loadObj () {
      this.showLoading()

      // eslint-disable-next-line eqeqeq
      if (
        this.NidProc == null ||
        // eslint-disable-next-line eqeqeq
        this.NidProc == "00000000-0000-0000-0000-000000000000"
      ) {
        this.NidProc = uid()
      }

      const payload = {
        pNIdProc: this.NidProc
      }

      this.$services.ES.getRequestInfo(payload)
        .then(({ data }) => {
          this.getRequestInfoRes = this.getResponse(data)

          if (this.getRequestInfoRes.success) {
            if (this.getRequestInfoRes.data != null) {
              this.dataContext =
                this.getRequestInfoRes.data.GetRequest_InfoResult

              this.$refs.UFileListRequestSysfilingInformation.CIRequestTypeOption =
                this.getRequestInfoRes.data.GetRequest_InfoResult.CI_RequestType

              if (
                this.getRequestInfoRes.data.GetRequest_InfoResult
                  .CI_RequestType != null &&
                this.getRequestInfoRes.data.GetRequest_InfoResult
                  .Request_Info != null
              ) {
                let q =
                  this.getRequestInfoRes.data.GetRequest_InfoResult.CI_RequestType.find(
                    (f) =>
                      // eslint-disable-next-line eqeqeq
                      f.ID ==
                      this.getRequestInfoRes.data.GetRequest_InfoResult
                        .Request_Info.CI_RequestType
                  )
                this.$refs.UFileListRequestSysfilingInformation.CI_RequestType =
                  q?.ID || 0
              }
            }

            this._NIdBaseCode =
              this.getRequestInfoRes.data.GetRequest_InfoResult.NIdBaseCode
            if (this.loadCompleted != null) {
              this.loadCompleted(true)
            }
          }
        })
        .catch((error) => {
          this.showError(error.message)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    save () {
      if (
        // eslint-disable-next-line eqeqeq
        this._District == 0 ||
        // eslint-disable-next-line eqeqeq
        this._Region == 0 ||
        // eslint-disable-next-line eqeqeq
        this._Block == 0 ||
        // eslint-disable-next-line eqeqeq
        this._House == 0
      ) {
        this.txtMessage = "لطفا کدنوسازی وارد شود"
        this.saveCompleted(false)
        return false
      }
      if (this.$refs.UFileListRequestSysfilingInformation.CI_RequestType || this.$refs.UFileListRequestSysfilingInformation.CI_RequestType === 0) {
        let tmpobj = { ...this.dataContext }
        if (tmpobj.IsConfirmContractBuy) {
          this.hideLoading()
          this.showError("پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد")
          return false
        }

        this.showLoading()

        tmpobj.Request_Info.NIdBaseCode = this._NIdBaseCode
        tmpobj._NIdRequest = this.NidProc
        tmpobj.Request_Info.NIdProcess = this.NidProc
        tmpobj.UserInfo_GUID = this.getNidUser()
        tmpobj.UserName = this.getUserDisplayName()
        tmpobj.RequesterName = ""

        tmpobj.District = this._District
        tmpobj.Region = this._Region
        tmpobj.Block = this._Block
        tmpobj.House = this._House
        tmpobj.Building = this._Building
        tmpobj.Apartment = this._Apartment
        tmpobj.Shop = this._Shop

        if (this._NIdCopy <= 0) {
          tmpobj.IsRequestSys = true
          tmpobj.Request_Info.SysCI_RequestStatus = 3
          tmpobj.NIdCopy = this._NIdCopy
        }

        const payload = {
          PObj: { ...tmpobj },
          pIsDuplicatedRequest: false
        }

        this.$services.ES.saveRequestInfo(payload)
          .then(({ data }) => {
            this.saveRequestInfoRes = this.getResponse(data)

            if (this.saveRequestInfoRes.success) {
              this.NidProc =
                this.saveRequestInfoRes.data.SaveRequest_InfoResult.Request_Info.NIdProcess
              this._NIdBaseCode =
                this.saveRequestInfoRes.data.SaveRequest_InfoResult.Request_Info.NIdBaseCode
            }
            if (this.saveCompleted != null) {
              this.saveCompleted(this.saveRequestInfoRes.success)
            }
          })
          .catch((error) => {
            console.error(error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },

    btnDeleteClick () {
      this.showConfirm("آیا اطلاعات موردنظر حذف شود؟").onOk(() => {
        this.showLoading()

        const payload = {
          pNIdProc: this.nidProc
        }

        this.$services.ES.delShaftInfo(payload)
          .then(({ data: args }) => {
            this.delShaftInfoRes = this.getResponse(args)

            if (this.delShaftInfoRes.success) {
              this.showSuccess("حذف اطلاعات باموفقیت انجام شد")
              this.loadObj()
            }
          })
          .catch((error) => {
            console.error(error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>
