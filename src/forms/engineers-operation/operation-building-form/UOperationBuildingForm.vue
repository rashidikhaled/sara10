<template>
  <safa-form :id="formKey" :caption="title" appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1">
    <form-wrapper :title="title" vertical>
    <template #header>
      <safa-status :result="sendResult" />
      <safa-status :result="confirmResult" />
    </template>
      <fit>
        <FormRow>
          <FormControl>
            <!-- <safa-securityPanel
              id="43f1445c-526d-4a47-9d34-bf2556983a22"
              caption="جهت صدور"
            > -->
            <safa-combo
              label="جهت صدور"
              label-width="80px"
              ciName="CI_BuildingExecRep_FormOperation_Cause"
              domainName="engineer"
              v-model="
                model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                  .CI_BuildingExecRep_FormOperation_Cause
              "
            />
            <!-- </safa-securityPanel> -->
          </FormControl>
          <FormControl>
            <safa-combo
              label="وضعیت ارسال"
              label-width="80px"
              ciName="CI_ExecStatus"
              domainName="engineer"
              v-model="model.ClsBuildingExeReport.CI_ExecStatus"
            />
          </FormControl>
        </FormRow>
        <fit>
          <safa-datatable
            v-model="
              model.ClsBuildingExeReport
                .BuildingExecRep_FormOperation_Floors_Main
            "
            :columns="columns"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            class="q-my-sm"
            m="e"
          />
        </fit>
        <!-- <div class="q-my-sm">
            <q-markup-table :dark="$q.dark.isActive" bordered dense flat separator="cell" square>
              <thead>
              <tr>
                <th></th>
                <th colspan="3">مساحت</th>
                <th colspan="2">کاربری</th>
                <th colspan="2">ارتفاع</th>
                <th colspan="2">تعداد واحد</th>
              </tr>
              <tr>
                <th> طبقات</th>
                <th>مجاز (متر مربع)</th>
                <th>اجرا شده (مترمربع)</th>
                <th>اختلاف (مترمربع)</th>
                <th>مجاز</th>
                <th>اجرا شده</th>
                <th>مجاز</th>
                <th>اجرا شده</th>
                <th>مجاز</th>
                <th>اجرا شده</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <template v-for="(col,i) in model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Floors_Main">
                <td class="text-center">{{ row[col].FloorNo }}</td>
                <td class="text-center">{{ row[col].AllowedArea }}</td>
                <td class="text-center">{{ row[col].ExecutedArea }}</td>
                <td class="text-center">{{ row[col].DiffArea }}</td>
                <td class="text-center">{{ row[col].CI_UsingType_Allowed }}</td>
                <td class="text-center">{{ row[col].CI_UsingType_Executed }}</td>
                <td class="text-center">{{ row[col].Height_Allowed }}</td>
                <td class="text-center">{{ row[col].Height_Executed }}</td>
                <td class="text-center">{{ row[col].UnitCount_Allowed }}</td>
                <td class="text-center">{{ row[col].UnitCount_Executed }}</td>
              </template>
              </tr>
              </tbody>
            </q-markup-table>
        </div> -->
        <FormRow :lg="3" :xl="3" :md="3" :sm="2">
          <FormControl>
            <safa-text
              label="تعداد واحد پارکینگ مورد نیاز :"
              label-width="150px"
              v-model="
                model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                  .RequiredParkingCount
              "
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تعداد واحد پارکینگ تامین شده :"
              label-width="150px"
              v-model="
                model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                  .SuppliedParkingCount
              "
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="محل تامین پارکینگ :"
              label-width="150px"
              v-model="
                model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                  .SuppliedParkingLocation
              "
            />
          </FormControl>
          <FormControl>
            <div class="q-gutter-md flex">
              <div>آیا درصد طول مجاز رعایت شده است؟</div>
              <safa-radio
                label="بلی"
                :val="true"
                v-model="
                  model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                    .IsObservedAllowedLength
                "
              />
              <safa-radio
                label="خیر"
                :val="false"
                v-model="
                  model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                    .IsObservedAllowedLength
                "
              />
            </div>
          </FormControl>
          <FormControl>
            <div class="q-gutter-md flex">
              <div>آیا نماهای جانبی انجام شده است؟</div>
              <safa-radio
                label="بلی"
                :val="true"
                v-model="
                  model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                    .IsObservedNeighbourView
                "
              />
              <safa-radio
                label="خیر"
                :val="false"
                v-model="
                  model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                    .IsObservedNeighbourView
                "
              />
            </div>
          </FormControl>
        </FormRow>
        <div class="row q-mt-sm">
          <div class="q-gutter-md flex">
            <div>
              آیین نامه 2800 زلزله و مقررات ملی ساختمان در حیطه وظایف اینجانب در
              احداث این بنا رعایت
            </div>
            <safa-radio
              label="گردیده است"
              :val="true"
              v-model="
                model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                  .IsObservedRule
              "
            />
            <safa-radio
              label="نگردیده است"
              :val="false"
              v-model="
                model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                  .IsObservedRule
              "
            />
          </div>
        </div>
        <div class="q-mt-sm">
          <text-template
            label="متن گزارش"
            :rows="3"
            label-width="80px"
            v-model="
              model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main
                .Comments
            "
          />
        </div>
      </fit>
      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-default label="ثبت تغییرات" @click="saveData" />
          <btn-default label="گزارش" @click="Report" />
          <btn-default
            label="تایید گزارش"
            spId="38d07d6f-13f6-418b-97d2-337a2b2a88ed"
            spCaption="تایید گزارش"
          />
          <btn-default
            label="ارسال گزارش"
            @click="sendReport"
            spId="3fba9fb3-4a05-4096-b3bb-455f171061f4"
            spCaption="ارسال گزارش"
          />
          <btn-default
            label="تایید ناظر هماهنگ کننده"
            @click="supervisorConfirm"
            spId="02acb61c-288a-41c2-b25e-e2e9ce1209d0"
            spCaption="تایید ناظر هماهنگ کننده"
          />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],
  components: {},
  data () {
    return {
      title: "گزارشات جدولی",
      formKey: "7cfea8ad-9da1-4ef9-9d80-225e3cabfee1",
      name: "UOperationBuildingForm",
      main: true,
      model: {
        ClsBuildingExeReport: {
          BuildingExecRep_FormOperation_Floors_Main: [],
          BuildingExecRep_FormOperation_Main: {
            CI_BuildingExecRep_FormOperation_Cause: 0,
            RequiredParkingCount: 0,
            SuppliedParkingCount: 0,
            SuppliedParkingLocation: 0,
            IsObservedAllowedLength: false,
            IsObservedNeighbourView: false,
            IsObservedRule: false,
            Comments: ""
          },
          CI_ExecStatus: 0
        }
      },
      columns: [
        // editor: "combo",
        //     domain: "engineer",
        //     ciName: "CI_ExecFloor",
        {
          field: "FloorNo",
          title: "طبقات",
          width: "150px"
        },
        {
          field: "AllowedArea",
          title: "مجاز (متر مربع)",
          width: "150px",
          editable: false
        },
        {
          field: "ExecutedArea",
          title: "اجرا شده (مترمربع)",
          width: "150px"
        },
        {
          field: "DiffArea",
          title: "اختلاف (مترمربع)",
          width: "150px"
        },
        {
          field: "CI_UsingType_Allowed",
          title: "مجاز",
          width: "150px",
          editor: "combo",
          ciName: "CI_UsingType",
          domain: "engineer",
          editable: false
        },
        {
          field: "CI_UsingType_Executed",
          title: "اجرا شده",
          width: "150px",
          editor: "combo",
          ciName: "CI_UsingType",
          domain: "engineer"
        },
        {
          field: "Height_Allowed",
          title: "مجاز",
          width: "150px",
          editable: false
        },
        {
          field: "Height_Executed",
          title: "اجرا شده",
          width: "150px"
        },
        {
          field: "UnitCount_Allowed",
          title: "مجاز",
          width: "150px",
          editable: false
        },
        {
          field: "UnitCount_Executed",
          title: "اجرا شده",
          width: "150px"
        }
      ],
      nidBuildingExecRep: "00000000-0000-0000-0000-000000000000",
      sendResult: null,
      confirmResult: null
    }
  },

  created () {
    if (!this.selectedExecRep) {
      this.showError("لطفا ابتدا یک مورد از کارتابل ارجاعات انتخاب کنید")
      this.hideSidebar(this.name)
    } else {
      this.loadData()
    }
  },

  methods: {
    async loadData () {
      this.showLoading()
      let payLoad = {
        pNidFil: this.selectedExecRep.NIdFil,
        pNidEngineer: "00000000-0000-0000-0000-000000000000",
        pExecFloor: 0,
        pExecLevel: 254,
        pUser: this.getNidUser(),
        SaveViolation: false
      }
      await this.$services.eng
        .getBuldingExeReport(payLoad)
        .then((response) => {
          const res = this.getResponse(response.data)
          if (res.success) {
            this.model.ClsBuildingExeReport =
              res.data.GetBuldingExeReportResult.ClsBuildingExeReport
            this.nidBuildingExecRep =
              res.data.GetBuldingExeReportResult.ClsBuildingExeReport._NIdBuildingExecRep
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
    async saveData () {
      this.showLoading()
      this.model.ClsBuildingExeReport.BuildingExecRep_FormOperation_Floors_Main =
        this.normalizeGrid()
      let payLoad = {
        pRequest: { ...this.model }
      }
      await this.$services.eng
        .saveBuldingExeReport(payLoad)
        .then((response) => {
          const res = this.getResponse(response.data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            this.loadData()
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
      // طبق فیدلر ست شد
      const reportPath = `${window.getConfigValue('engineersConfig.reportPath')}/RptOperationBuildingForm`
      const queryParams = {
        NIdBuildingExecRep: this.nidBuildingExecRep,
        UserName: this.getUserDisplayName()
      }
      this.showReport(reportPath, queryParams)
    },
    async sendReport () {
      this.showLoading()
      let payLoad = {
        pNIdBuildingExecRep: this.nidBuildingExecRep,
        pNidBuildingReportFormFloors: "00000000-0000-0000-0000-000000000000",
        pNidEng2: this.getNidUser()
      }
      await this.$services.eng
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
    async supervisorConfirm () {
      this.showLoading()
      let payLoad = {
        pNidFil: this.selectedExecRep.NIdFil
      }
      await this.$services.eng
        .setCompleteAndConfirmBuildingExecRep(payLoad)
        .then((response) => {
          this.confirmResult = this.getResponse(response.data)
          if (this.confirmResult.success) {
            this.showSuccess("گزارش مورد نظر با موفقیت تایید شد.")
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
