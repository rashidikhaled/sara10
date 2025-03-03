<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
  >
    <form-wrapper title="کارشناسی" :padding="false">
      <safa-status :result="result" />
      <safa-status :result="FicheResult"/>
      <safa-status :result="saveResult" />
      <safa-status :result="loadObjRes" />
      <safa-status :result="getDutyFicheByFicheNoRes" />
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="expert" label="کارشناسی" />
            <tab-menu name="history" label="سوابق" />
            <tab-menu name="details" label="جزییات عوارض"    @click="getDutyFicheByFicheNo" />
          </template>
          <tab-content name="expert" :padding="false">
            <Expert v-model="model" :m="mode" />
          </tab-content>
          <tab-content name="history" :padding="false">
            <History v-model="model" :m="mode" />
          </tab-content>
          <tab-content name="details" :padding="false">
            <Details v-if="showDetails" ref="detailsRef" v-model="model" :m="mode" />
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <form-actions
          v-if="activeTab === 'expert'"
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
        >
          <btn-default label="چاپ" @click="printHandler" />
          <btn-default label="چاپ پیش نویس" @click="printDraftHandler" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import commission77Mixin from "src/forms/commission77-menu/mixins/commission77Mixin.js"

import Expert from "./partials/Expert"
import History from "./partials/History"
import Details from "./partials/Details"
import converter from "xml-js"
import { convertStringToNosaziCodeObject } from "../../../../kartable/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, commission77Mixin],
  data () {
    return {
      title: "کارشناسی",
      formKey: "EE456B47-5C95-45D4-AC03-BEDEBC3F88D0",
      name: "UExpert",
      main: true,

      // activeTab
      activeTab: "expert",

      // res
      result: null,
      loadObjRes: null,
      FicheResult: null,
      saveResult: null,
      getDutyFicheByFicheNoRes: null,
      getDutyFicheByFicheNoResult: null,

      // model
      model: {
        ClsRequest_Info: {
          Request_Info: {
            NosaziCode: "",
            CI_RequestType: "",
            NidWorkItem: "",
            HoldingDate: "",
            SecretariatNo: "",
            CI_Commission: 0,
            UserDescription: "",
            Description: "",
            Price: "",
            FromDate: "",
            ToDate: "",
            HoldingTime: ""
          },
          DutyFicheOtherFiled: [],
          Request_FicheDetail: [],
          SubFicheDetail: [],
          ListRequest_Info: []
        },
        Txt_Requesttype: "",
        ClsExpert: {
          SecretariatNo: "",
          CI_Commission: 0,
          UserDescription: "",
          Description: ""
        }
      },
      // var
      nidRequest: "00000000-0000-0000-0000-000000000000",
      nidProc: "00000000-0000-0000-0000-000000000000",
      FicheNo: "",
      showDetails: false

    }
  },
  components: {
    Expert,
    History,
    Details
  },
  created () {
    if (!this.selectedRequest && !this.selectedCommission77) {
      this.showError("لطفا یک سطر از کارتابل را انتخاب نمایید!")
      this.hideSidebar(this.name)
      this.redirectToKartable()
      return false
    }
    if (
      this.selectedRequest?.NidProc) {
      this.nidProc = this.selectedRequest?.NidProc
    } else if (this.selectedCommission77) {
      this.nidProc = this.selectedCommission77.NidProc
    } else {
      this.nidProc = this.selectedRequest.NidProc
    }
    this.loadObj()
  },
  methods: {
    async loadObj () {
      this.showLoading()
      let payload = {
        pRequest: {
          NidProc: this.nidProc
          // "8a7637ad-d38f-454e-80fa-803a4e9446a9"
          // "311f1dab-1c17-409d-8c57-7d6b22365766"
        }
      }
      // GetRequest_InfoResult // این باعث میشه undefined بشه
      try {
        const { data } = await this.$services.commission77.getRequestInfo(payload)
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.model.ClsRequest_Info =
              this.loadObjRes.data.GetRequest_InfoResult.ClsRequest_Info
          if (
            this.model.ClsRequest_Info &&
              this.model.ClsRequest_Info.Request_Info !== null
          ) {
            this.model.ClsRequest_Info.Request_Info =
                this.loadObjRes.data.GetRequest_InfoResult.ClsRequest_Info.Request_Info

            switch (
              this.model.ClsRequest_Info.Request_Info.CI_RequestType.toString()
            ) {
              case "0": {
                this.model.Txt_Requesttype = "نامشخص"
                break
              }
              case "1": {
                this.model.Txt_Requesttype = "نوسازی"
                break
              }
              case "2": {
                this.model.Txt_Requesttype = "پسماند"
                break
              }
              case "3": {
                this.model.Txt_Requesttype = "صنفي"
                break
              }
              case "4": {
                this.model.Txt_Requesttype = "درامد"
                break
              }
            }
          }
          if (this.model.ClsRequest_Info.SubFicheDetail?.length > 0) {
            let arrayOfClsLog = converter.xml2js(
              this.model.ClsRequest_Info.SubFicheDetail[0]
                .DutyFicheOtherFiled,
              {
                compact: true,
                ignoreDoctype: true,
                ignoreCdata: true
              }
            )
            if (
              arrayOfClsLog.ArrayOfClsLog &&
                arrayOfClsLog.ArrayOfClsLog.ClsLog
            ) {
              this.$nextTick(() => {
                this.model.ClsRequest_Info.DutyFicheOtherFiled =
                    arrayOfClsLog.ArrayOfClsLog.ClsLog.map((x) => {
                      return {
                        ...x,
                        Subject: x.Subject._text,
                        Value: x.Value._text,
                        Comment: x.Comment._text
                      }
                    })
                this.$refs.detailsRef.dutyFicheOtherFiled =
                  this.model.ClsRequest_Info.DutyFicheOtherFiled
              })
            }
          }
          this.FicheNo =
              this.model.ClsRequest_Info.Request_FicheDetail[0]?.FicheNo
          this.nidRequest = this.model.ClsRequest_Info.NidRequest
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            saveDesc: `بارگذاری اطلاعات فیش ${this.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async getDutyFicheByFicheNo () {
      debugger
      this.showDetails = true
      try {
        this.showLoading()
        const payload = {
          pFicheNo: this.FicheNo,
          PDutyType: 1,
          pEumBaseInfoGroup: 0
        }
        const { data } = await this.$services.SB.getDutyFicheByFicheNo(
          payload,
          { config: { District: this.district } }
        )
        this.getDutyFicheByFicheNoRes = this.getResponse(data)
        if (this.getDutyFicheByFicheNoRes.success) {
          this.getDutyFicheByFicheNoResult =
            this.getDutyFicheByFicheNoRes.data.Duty_FicheByFicheNo
          if (this.getDutyFicheByFicheNoResult) {
            let arrayOfClsLog = converter.xml2js(
              this.getDutyFicheByFicheNoResult.OtherFields,
              {
                compact: true,
                ignoreDoctype: true,
                ignoreCdata: true
              }
            )
            if (
              arrayOfClsLog.ArrayOfClsLog &&
              arrayOfClsLog.ArrayOfClsLog.ClsLog
            ) {
              this.$nextTick(() => {
                this.model.ClsRequest_Info.DutyFicheOtherFiled =
                  arrayOfClsLog.ArrayOfClsLog.ClsLog.map((x) => {
                    return {
                      ...x,
                      Subject: x.Subject._text,
                      Value: x.Value._text,
                      Comment: x.Comment._text
                    }
                  })
                this.$refs.detailsRef.dutyFicheOtherFiled =
                  this.model.ClsRequest_Info.DutyFicheOtherFiled
              })
            }
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            saveDesc: `بارگذاری اطلاعات فیش ${this.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    // loadSubFiches () {
    //   this.showLoading()
    //   const payload = {
    //     pFicheNo: this.FicheNo, // this.FicheNo,"11101/6009916"
    //     PDutyType: 1, // Renovation
    //     pEumBaseInfoGroup: 0 // Parvandeh
    //   }
    //   this.$services.SB.getDutyFicheByFicheNo(payload)
    //     .then(({ data }) => {
    //       this.FicheResult = this.getResponse(data)
    //       if (this.FicheResult.success) {
    //         this.getDutyFicheByFicheNoResult =
    //           this.FicheResult.data
    //         // this.model =
    //         //   this.FicheResult.data
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },
    saveObj () {
      this.showLoading()
      let payload = {
        pRequest: {
          ClsExpert: {
            CI_Commission:
              this.model.ClsRequest_Info.Request_Info.CI_Commission,
            Description: this.model.ClsRequest_Info.Request_Info.Description,
            NidRequest: [this.nidRequest],
            SecretariatNo:
              this.model.ClsRequest_Info.Request_Info.CI_Commission,
            UserDescription:
              this.model.ClsRequest_Info.Request_Info.UserDescription
          }
        }
      }
      this.$services.commission77
        .saveExpert(payload)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              saveDesc: `بارگذاری اطلاعات فیش ${this.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
            })
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
    },
    printHandler () {
      const reportPath = `${window.getConfigValue('Commission77ReportPath')}/RptExpert`
      const queryParams = {
        NidRequest: this.nidRequest,
        NidUser: this.getNidUser(),
        District: convertStringToNosaziCodeObject(
          this.model.ClsRequest_Info.Request_Info.NosaziCode
        ).District
      }
      this.showReport(reportPath, queryParams)
    },
    printDraftHandler () {
      const reportPath = `${window.getConfigValue('Commission77ReportPath')}/RptExpertDraft`
      const queryParams = {
        NidRequest: this.nidRequest,
        NidUser: this.getNidUser(),
        District: convertStringToNosaziCodeObject(
          this.model.ClsRequest_Info.Request_Info.NosaziCode
        ).District
      }
      this.showReport(reportPath, queryParams)
    }
  }
}
</script>
