<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1"
  >
    <form-wrapper :title="title">
    <template #header>
     <safa-status :result="res" />
     <safa-status :result="resLoadCoordinator" />
     <safa-status :result="sendResult" />
    </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="وضعیت ارسال"
              label-width="80px"
              m="r"
              v-model="model.ClsBuildingExeReport.ExecSendStatus"
            />
          </FormControl>
        </FormRow>
        <fit>
          <safa-datatable
            v-model="
              model.ClsBuildingExeReport
                .BuildingExecRep_FormOperation_Floors_Main
            "
            :columns="RoofAreaListColumn"
            :addRow="true"
            height="100"
            min-height="100px"
            max-height="100"
            fit
            m="e"
          />
        </fit>
        <FormRow class="q-my-sm">
          <div>ابعاد ستون ها و سقف مطابق نقشه های معماری تایید شده شهرداری</div>
          <safa-radio
            label="می باشد"
            class="col-12 col-sm-auto"
            :val="true"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedAllowedLength
            "
          />
          <safa-radio
            label="نمی باشد"
            class="col-12 col-sm-auto"
            :val="false"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedAllowedLength
            "
          />
        </FormRow>
        <FormRow class="q-my-sm">
          <div>
            اجرای عقب نشینی ها، پیش روی ها و پخی ها مطابق نقشه های معماری تایید
            شده شهرداری
          </div>
          <safa-radio
            label="می باشد"
            class="col-12 col-sm-auto"
            :val="true"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedAllowedLengthAheadNeighbour
            "
          />
          <safa-radio
            label="نمی باشد"
            class="col-12 col-sm-auto"
            :val="false"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedAllowedLengthAheadNeighbour
            "
          />
        </FormRow>
        <FormRow class="q-my-sm">
          <div>
            اجرای پیش آمدگی های مجاور معابر مطابق نقشه های معماری تایید شده در
            شهرداری
          </div>
          <safa-radio
            label="می باشد"
            class="col-12 col-sm-auto"
            :val="true"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedNeighbourView
            "
          />
          <safa-radio
            label="نمی باشد"
            class="col-12 col-sm-auto"
            :val="false"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedNeighbourView
            "
          />
        </FormRow>
        <FormRow class="q-my-sm">
          <div>
            ترازهای ارتفاعی اجرا شده براساس نقشه های تایید شده در شهرداری
          </div>
          <safa-radio
            label="می باشد"
            class="col-12 col-sm-auto"
            :val="true"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedRule
            "
          />
          <safa-radio
            label="نمی باشد"
            class="col-12 col-sm-auto"
            :val="false"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedRule
            "
          />
        </FormRow>
        <FormRow class="q-my-sm">
          <div>نورگیر ها مطابق نقشه های تایید شده شهرداری</div>
          <safa-radio
            label="می باشد"
            class="col-12 col-sm-auto"
            :val="true"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedBright
            "
          />
          <safa-radio
            label="نمی باشد"
            class="col-12 col-sm-auto"
            :val="false"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedBright
            "
          />
        </FormRow>
        <FormRow class="q-my-sm">
          <div>بنای اجرا شده نست به نقشه های مصوب شهرداری خلاف زیربنایی</div>
          <safa-radio
            label="دارد"
            class="col-12 col-sm-auto"
            :val="true"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedBuilding
            "
          />
          <safa-radio
            label="ندارد"
            class="col-12 col-sm-auto"
            :val="false"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .IsObservedBuilding
            "
          />
        </FormRow>
        <FormRow>
          <text-template
            label="متن گزارش"
            label-width="110px"
            :rows="1"
            v-model="model.ClsBuildingExeReport.Comments"
            class="q-mb-sm"
          />
        </FormRow>
      </fit>
      <template #footer>
        <div class="row q-gutter-sm">
          <btn-default label="ثبت تغییرات" @click="changeSubmit" />
          <btn-default label="گزارش" @click="Report" />
          <btn-default label="تایید گزارش" />
          <btn-default label="ارسال گزارش" @click="sendReport" />
          <btn-default
            label="تایید ناظر هماهنگ کننده"
            @click="supervisorConfirm"
          />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],
  data () {
    return {
      name: "UBuildingRoofAreaReport",
      title: "گزارش ابعاد و محدوده سقفهای ساختمان",
      formKey: "7BA0789D-CD9E-4CF0-BA11-79500D4ECC3D",
      main: true,
      model: {
        ClsBuildingExeReport: {
          BuildingExecRep_FormOperation_Floors_Main: [],
          BuildingExecRep_FormOperation_Main: {
            IsObservedAllowedLength: 0,
            IsObservedAllowedLengthAheadNeighbour: 0,
            IsObservedNeighbourView: 0,
            IsObservedRule: false,
            IsObservedBright: false,
            IsObservedBuilding: false,
            Comments: ""
          },
          ExecSendStatus: 0
        }
      },

      RoofAreaList: [],
      RoofAreaListColumn: [
        { field: "FloorNo", title: "طبقات", width: "100px", editable: true },
        {
          field: "AllowedArea",
          title: "مساحت مجاز(متر مربع)",
          editor: "combo",
          domain: "engineer",
          ciName: "CI_ExecFloor",
          width: "150px",
          editable: true
        },
        {
          field: "ExecutedArea",
          title: "مساحت اجرا شده( متر مربع)",
          width: "150px",
          editable: true
        },
        {
          field: "DiffArea",
          title: "مساحت اختلاف (متر مربع)",
          width: "150px",
          editable: false
        },
        {
          field: "CI_UsingType_Allowed",
          title: "کاربری مجاز",
          editor: "combo",
          domain: "engineer",
          ciName: "CI_UsingType",
          width: "150px",
          editable: true
        },
        {
          field: "CI_UsingType_Executed",
          title: "کاربری اجرا شده",
          editor: "combo",
          domain: "engineer",
          ciName: "CI_UsingType",

          width: "150px",
          editable: true
        },
        {
          field: "Height_Allowed",
          title: "ارتفاع مجاز",
          width: "100px",
          editable: true
        },
        {
          field: "Height_Executed",
          title: "ارتفاع اجرا شده",
          width: "100px",
          editable: true
        }
      ],
      nidBuildingExecRep: "00000000-0000-0000-0000-000000000000"

    }
  },
  created () {
    if (this.selectedExecRep) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedExecRep.CodeString
      )
      this.loadKartableInf()
    } else {
      this.showError("لطفا یک سطر از کارتابل ارجاعات انتخاب نمایید.")
      this.hideSidebar("UBuildingRoofAreaReport")
      this.redirectToKartableReferences()
    }
  },
  methods: {
    loadKartableInf () {
      this.showLoading()
      const payload = { pNidRef: this.selectedNidRef }
      this.$services.engineers
        .loadCoordinator(payload)
        .then(({ data }) => {
          const resLoadCoordinator = this.getResponse(data)
          if (resLoadCoordinator.success) {
            const inf = resLoadCoordinator.data.LoadCoordinatorResult.Ref_Info
            this.NIdFil = inf.NIdFil
            this.NIdEng = inf.NIdEng
            this.loadObj()
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    loadObj () {
      this.showLoading()
      let payLoad = {
        pNidFil: this.selectedExecRep.NIdFil,
        pNidEngineer: "00000000-0000-0000-0000-000000000000",
        pExecFloor: 0,
        pExecLevel: 254,
        pUser: this.getNidUser(),
        SaveViolation: false
      }
      this.$services.engineers
        .getBuldingExeReport(payLoad)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.model.ClsBuildingExeReport =
              res.data.GetBuldingExeReportResult.ClsBuildingExeReport
            this.nidBuildingExecRep =
              res.data.GetBuldingExeReportResult.ClsBuildingExeReport._NIdBuildingExecRep
            await this.log({
              action: "",
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((response) => {
          this.serverError(response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    changeSubmit () {
      this.showLoading()
      let payLoad = {
        pRequest: { ...this.model }
      }
      this.$services.engineers
        .saveBuldingExeReport(payLoad)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("گزارش مورد نظر با موفقیت تایید شد.")
            this.loadData()
            await this.log({
              action: "",
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((response) => {
          console.error(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeGrid () {
      return this.model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Floors_Main.map(
        (m) => {
          return {
            ...m,
            AcceptDate: m.AcceptDate || null,
            AcceptTime: m.AcceptTime || null,
            AllowedArea: m.AllowedArea || null,
            BuildingExecDate: m.BuildingExecDate || null,
            CI_ExecSendStatus: m.CI_ExecSendStatus || 0,
            CI_UsingType_Allowed: m.CI_UsingType_Allowed || null,
            CI_UsingType_Executed: m.CI_UsingType_Executed || null,
            Comments: m.Comments || "",
            DiffArea: m.DiffArea || 0,
            EumReportStatus: m.EumReportStatus || 0,
            ExecutedArea: m.ExecutedArea || null,
            FloorNo: m.FloorNo || 0,
            Height_Allowed: m.Height_Allowed || 0,
            Height_Executed: m.Height_Executed || 0,
            NIdBuildingExecRep:
              m.NIdBuildingExecRep || "00000000-0000-0000-0000-000000000000",
            NIdEng_Accept: m.NIdEng_Accept || null,
            NIdEng_Revoke: m.NIdEng_Revoke || null,
            NidBuildingReportFormFloors:
              m.NidBuildingReportFormFloors ||
              "00000000-0000-0000-0000-000000000000",
            OkDate: m.OkDate || null,
            OkTime: m.OkTime || null,
            RevisitExecDate: m.RevisitExecDate || null,
            RevokeDate: m.RevokeDate || null,
            RevokeTime: m.RevokeTime || null,
            SecretariatDate: m.SecretariatDate || null,
            SecretariatNo: m.SecretariatNo || 0,
            SendDate: m.SendDate || null,
            SendTime: m.SendTime || null,
            SerialID: m.SerialID || null,
            UnitCount_Allowed: m.UnitCount_Allowed || null,
            UnitCount_Executed: m.UnitCount_Executed || null
          }
        }
      )
    },

    Report () {
      // const reportPath =
      //   "/Engineers/RptBuildingExecRep"
      // const queryParams = {
      //   NIdBuildingExecRep: this.nidBuildingExecRep,
      //   UserName: this.getUserDisplayName()
      // }
      // this.showReport(reportPath, queryParams)
    },
    sendReport () {
      this.showLoading()
      let payLoad = {
        pNIdBuildingExecRep: this.nidBuildingExecRep,
        pNidBuildingReportFormFloors: "00000000-0000-0000-0000-000000000000",
        pNidEng2: this.getNidUser()
      }
      this.$services.eng
        .sendBuildingExecRep(payLoad)
        .then((response) => {
          this.sendResult = this.getResponse(response.data)
          if (this.sendResult.success) {
            this.showSuccess("با موفقیت ارسال شد.")
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    supervisorConfirm () {
      this.showLoading()
      let payload = {
        pNidFil: this.selectedExecRep.NIdFil
      }
      this.$services.engineers
        .setCompleteAndConfirmBuildingExecRep(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("گزارش مورد نظر با موفقیت تایید شد.")
            await this.log({
              action: "",
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((response) => {
          this.serverError()
          console.error(response)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
