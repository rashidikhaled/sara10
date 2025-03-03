<template>
  <fit>
    <safa-status :result="getWorkFlowListRes" />
    <safa-status :result="createInstanceRes" />
    <safa-status :result="saveRequestRes" />
    <safa-status :result="getSMSNumberRes" />

    <!--
    <safa-status :result="getAllWarningListRes" />
    <safa-status :result="deleteResult" /> -->
    <div class="fit">
      <FormRow>
        <FormControl>
          <safa-combo
            label="نوع درخواست"
            label-width="100px"
            v-model="requestType"
            cdcName="requestType"
            :m="m"
            :options="requestTypeOptions"
            sourceType="local"
            :validations="['required', 'string']"
            ref="RequestTypeRef"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره اخطار"
            m="r"
            label-width="100px"
            v-model="model.Warning.WarningNo"
            cdcName="WarningNo"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="سازمان متقاضی"
            domainName="BuildingPolice"
            ciName="CI_RequesterType"
            label-width="100px"
            v-model="model.Request.CI_RequesterType"
            cdcName="CI_RequesterType"
            :m="m"
            required
            validations="required"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام متقاضی"
            label-width="100px"
            v-model="model.Request.RequesterName"
            cdcName="RequesterName"
            :m="m"
            required
            :validations="['required', 'string']"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره تلفن"
            label-width="100px"
            v-model="model.Request.RequesterTelephone"
            cdcName="RequesterTelephone"
            :m="m"
            type="number"
            required
            :validations="['required', 'number', validations.requesterTelephone]"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره تلفن همراه"
            label-width="100px"
            v-model="model.Request.RequesterCellphone"
            cdcName="RequesterCellphone"
            :m="m"
            type="number"
            :validations="
              model.Request.RequesterCellphone !== ''
                ? validations.requesterCellphone
                : ''
            "
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره نامه"
            label-width="100px"
            v-model="model.Request.LetterNo"
            cdcName="LetterNo"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ نامه"
            label-width="100px"
            v-model="model.Request.LetterDate"
            cdcName="LetterDate"
            :m="m"
          />
        </FormControl>
        <safa-text
          label="آدرس"
          class="col-12"
          label-width="100px"
          v-model="model.Request.RequesterAddress"
          cdcName="RequesterAddress"
          :m="m"
          :validations="['required', 'string']"
        />
        <text-template
          label="توضیحات"
          label-width="100px"
          class="col-12"
          v-model="model.Request.Comments"
          cdcName="Comments"
          :m="m"
        />
      </FormRow>
    </div>
    <form-actions :showEditButton="false" m="r">
      <btn-save label="ثبت" @click="saveObj" :disable="lockBTN" />
      <btn-cancel label="انصراف" @click="cancel" :disable="lockBTN" />
    </form-actions>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import { appendUrls } from "src/utils"
// import axios from "axios"
import PersianDate from "persian-date"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"
import Joi from "joi"

export default {
  mixins: [baseFormMixin],
  props: { model: Object, selectedRow: Object },
  data () {
    return {
      title: "ثبت درخواست پلیس ساختمان",
      name: "RegisterRequest",
      formKey: "4149a785-7e8c-41a0-b258-d4251ecf08ae",
      main: true,

      getWorkFlowListRes: null,
      requestTypeOptions: [],

      procInfo: null,

      requestType: 0,
      saveRequestRes: null,
      createInstanceRes: null,
      nidProc: "00000000-0000-0000-0000-000000000000",
      nidWorkItem: 0,
      getSMSNumberRes: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      validations: {
        requesterTelephone: Joi.custom(
          function (value, helper) {
            if (this.model.Request.RequesterTelephone.length !== 11) { return helper.message("شماره تلفن می بایست 11 رقم باشد.") }
            return true
          }.bind(this)
        ),
        requesterCellphone: Joi.custom(
          function (value, helper) {
            if (this.model.Request.RequesterCellphone.length !== 11) {
              return helper.message("شماره موبایل می بایست 11 رقم باشد.")
            }
            return true
          }.bind(this)
        )
      }
    }
  },
  computed: {
    m () {
      return this.selectedRow ? "e" : "r"
    },
    lockBTN () {
      return !this.selectedRow
    }
  },
  methods: {
    setBasenosaziCode () {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRow.NosaziCode
      )
    },
    getWorkFlowList () {
      this.showLoading()
      this.$services.SH.getWorkFlowList({
        pNidProc: "00000000-0000-0000-0000-000000000000"
      })
        .then(({ data }) => {
          this.getWorkFlowListRes = this.getResponse(data)
          if (this.getWorkFlowListRes.success) {
            this.requestTypeOptions = [
              ...this.getWorkFlowListRes.data.WorkflowTypeList.map(
                ({ NidWorkflowDeff: ID, WorkflowTitle: Title }) => {
                  return { Title, ID }
                }
              )
            ]
            if (this.requestTypeOptions?.length > 0) {
              this.requestType = this.requestTypeOptions[0].ID
            }
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
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        await this.createInstance()
        await this.saveRequest()
        await this.log({
          action: this.logActions.save,
          bizCode: this.procInfo.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.procInfo.BizCode,
          nidWorkItem: this.procInfo.NidWorkItem,
          saveDesc: `عملیات ثبت درخواست پلیس ساختمان با شماره ${this.procInfo.NidWorkItem} انجام گردید.`
        })

        // send sms (if mobile is not empty)
        if (this.model.Request.RequesterCellphone) {
          await this.getSMSNumber()
        }

        this.showSuccess("درخواست با موفقیت ثبت گردید.").onDismiss(() => {
          this.hideLoading()
          this.redirectToKartable()
        })
      } catch (e) {
        console.error(e)
        await this.deleteRequest()
        await this.deleteProc()
        this.showError("متاسفانه عملیات ثبت درخواست پلیس ساختمان متوقف شد.")
      } finally {
        this.hideLoading()
      }
    },

    async createInstance () {
      return new Promise(async (resolve, reject) => {
        const WKT = await this.getWKT()
        const payload = {
          BizCode: this.selectedRow.NosaziCode,
          EumOwnerType: 1,
          NidWorkflowDeff: this.requestType,
          ProcInitiator: this.getNidUser(),
          ProcRequester: this.model.Request.RequesterName,
          ProcInitiatorName: this.getUserDisplayName(),
          ProcArea: "سرا10",
          GroupName: "پایش",
          GroupTitel: "پلیس ساختمان",
          Domain: this.baseNosaziCode.District,
          IsSara10Request: true,
          WKT
        }
        const { data } = await this.$srvWorkflow.createInstance(payload)
        this.createInstanceRes = this.getResponse(data)
        if (this.createInstanceRes.success) {
          if (
            this.createInstanceRes.data.status === 200 &&
            this.createInstanceRes.data.success
          ) {
            this.procInfo = this.createInstanceRes.data.data.ProcInfo
            return resolve()
          } else {
            return this.showError(this.createInstanceRes.data.msg)
          }
        }
      })
    },
    async saveRequest () {
      return new Promise(async (resolve, reject) => {
        const req = this.model.Request
        const procInfo = this.procInfo
        const payload = {
          pRequest: {
            // Info: {},
            NidProc: "00000000-0000-0000-0000-000000000000",
            Request: {
              Apartment: this.baseNosaziCode.Apartment,
              Block: this.baseNosaziCode.Block,
              Building: this.baseNosaziCode.Building,
              CI_RequesterType: this.model.Request.CI_RequesterType,
              CodeString: this.selectedRow.NosaziCode,
              Comments: req.Comments,
              District: this.baseNosaziCode.District,
              House: this.baseNosaziCode.House,
              LetterDate: req.LetterDate,
              LetterNo: req.LetterNo,
              // NidNosaziCode_Sara: "00000000-0000-0000-0000-000000000000",
              NidProc: procInfo.NidProc,
              NidUser: this.getNidUser(),
              NidWarning: this.selectedRow.NidWarning,
              NidWorkItem: procInfo.NidWorkItem,
              NidWorkflowDeff: this.requestType,
              Region: this.baseNosaziCode.Region,
              RequestDate: procInfo.StartDate,
              RequestTime: procInfo.StartTime,
              RequesterAddress: req.RequesterAddress,
              RequesterCellphone: req.RequesterCellphone,
              RequesterFamily: req?.RequesterFamily ?? "",
              RequesterName: req.RequesterName,
              RequesterTelephone: req.RequesterTelephone,
              Shop: this.baseNosaziCode.Shop,
              UserName: this.getUserDisplayName()
            },
            // Revisit: {},
            Warning: {
              // Apartment: this.baseNosaziCode.Apartment,
              // Block: this.baseNosaziCode.Block,
              // Building: this.baseNosaziCode.Building,
              // District: this.baseNosaziCode.District,
              // House: this.baseNosaziCode.House,
              NidWarning: this.model.Warning.NidWarning,
              NosaziCode: this.model.Warning.NosaziCode,
              // Region: this.baseNosaziCode.Region,
              // Shop: this.baseNosaziCode.Shop,
              WarningNo: this.model.Warning.WarningNo
            },
            // WorkflowTitle: null,
            WorkflowTypeList:
              this.getWorkFlowListRes.data.WorkflowTypeList ?? []
          },
          pDistrict: this.selectedRow.District,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: this.model.Request.RequestType
          }
        }
        const { data } = await this.$services.SH.saveRequest(payload)
        this.saveRequestRes = this.getResponse(data)
        if (this.saveRequestRes.success) {
          return resolve(this.saveRequestRes)
          // this.redirectToKartable()
        } else {
          return reject(this.saveRequestRes)
        }
      })
    },
    async getSMSNumber () {
      try {
        this.showLoading()
        const { data } = await this.$services.SH.getSMSNumber({
          pDistrict: this.selectedRow.District,
          pNidProc: this.procInfo.NidProc,
          pNidNosaziCode_Sara: this.selectedRow.NidNosaziCode_Sara
        })
        const res = this.getResponse(data)
        if (res.success) await this.sendSMS()
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async sendSMS () {
      try {
        const payLoad = {
          pParameter: {
            AppName: "BuildingPolice",
            BizCode: this.selectedRow.NosaziCode || "",
            Number: this.model.Request.RequesterCellphone,
            SMSType: "ثبت درخواست در سیستم پلیس ساختمان",
            ScheduleSendDate: new PersianDate().toLocale("en").format("L"),
            Text: `درخواست شماره ${this.procInfo.NidWorkItem}روی ملک شما ثبت گردید.`,
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad)
        const res = this.getResponse(data)
        if (res.success) this.showSuccess("پیامک با موفقیت ارسال شد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async deleteRequest () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.deleteRequest(
          { pNidProc: this.procInfo.NidProc },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.deleteResult = this.getResponse(data)
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async deleteProc () {
      try {
        this.showLoading()
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
        this.hideLoading()
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

        console.log("@@@@@@@@@@@ WKT", data)
        const res = Array.isArray(data) ? data : data.data
        if (res && res.length > 0) return res[0].WKT || ""
      } catch (e) {
        return ""
      }
    },
    cancel () {
      this.$emit("reset")
    }
  }
}
</script>
