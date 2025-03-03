<template>
  <fit>
    <safa-status :result="getCIRes" />
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="مرحله گزارش"
          label-width="90px"
          v-model="selectedComboLevel"
          cdcName="selectedComboLevel"
          :options="CIExecLevelList"
          source-type="local"
          @input="comboLevelSelectionChanged"
          ref="selectedComboLevel"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="طبقه گزارش"
          label-width="90px"
          v-model="selectedCI_ExecFloor"
          cdcName="selectedCI_ExecFloor"
          domainName="engineer"
          ciName="CI_ExecFloor"
          @input="comboFloorSelectionChanged"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره دبیرخانه "
          label-width="90px"
          v-model="
            value.ClsBuildingExeReport.BuildingExecRep_Info_Main.SecretariatNo
          "
          cdcName="SecretariatNo"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تاریخ دبیرخانه"
          label-width="90px"
          v-model="
            value.ClsBuildingExeReport.BuildingExecRep_Info_Main.SecretariatDate
          "
          cdcName="SecretariatDate"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد ارجاع"
          label-width="90px"
          v-model="value.fil_Info.NidWorkItem"
          cdcName="NidWorkItem"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام مالک"
          label-width="90px"
          v-model="FullName"
          cdcName="FullName"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک ثبتی"
          label-width="90px"
          v-model="value.fil_Info.RegisterPlack"
          cdcName="RegisterPlack"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="زیربنای پروانه ساختمانی"
          label-width="90px"
          v-model="value.fil_Info.infrastructure"
          cdcName="infrastructure"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد سقف در پروانه"
          label-width="90px"
          v-model="value.fil_Info.Floor"
          cdcName="Floor"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="آدرس"
          label-width="90px"
          v-model="value.Fil_Owner.Address"
          cdcName="Address"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="وضعیت ارسال"
          label-width="90px"
          v-model="value.ClsBuildingExeReport.ExecSendStatus"
          cdcName="ExecSendStatus"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد نوسازی"
          label-width="90px"
          v-model="value.fil_Info.CodeString "
          cdcName="CodeString"
          m="r"
        />
      </FormControl>
    </FormRow>

    <safa-grid
      title="لیست گزارشات مرحله ای"
      v-model="value.ClsBuildingExeReport.BuildingExecRep_Detail_Main"
      cdcName="BuildingExecRep_Detail_Main"
      :columns="phaseReportsColumns"
      height="100%"
      maxHeight="100%"
      minHeight="300px"
      filterable
      sortable
      paginate
      :pageSize="20"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      :m="m"
    />
    <safa-securityPanel
            caption="آیا ساختمان دارای تخلف است؟"
            id="07abaefa-f068-4d64-a80b-79e3f7533452"
          >
          <FormRow class="q-mt-sm">
            <div class="flex items-center no-wrap" style="min-width: 300px">
              <div>
                <safa-label
                  class="flex items-center"
                  style="min-width: 170px; min-height: 30px"
                  required
                  showRequiredSymbol
                  >آیا ساختمان دارای تخلف است؟</safa-label
                >
              </div>
              <div class="q-gutter-x-md">
                <safa-radio
                  label=" بلی"
                  v-model="
                    value.ClsBuildingExeReport.BuildingExecRep_Info_Main
                      .IsObservedBuilding
                  "
                  cdcName="IsObservedBuilding"
                  :val="true"
                  :m="m"
                  size="xs"
                  required
                />
                <safa-radio
                  label="خیر"
                  v-model="
                    value.ClsBuildingExeReport.BuildingExecRep_Info_Main
                      .IsObservedBuilding
                  "
                  cdcName="IsObservedBuilding"
                  :val="false"
                  :m="m"
                  size="xs"
                  required
                />
              </div>
            </div>
            <FormControl v-if="showType">
              <safa-combo
                label-width="70px"
                label="نوع تخلف"
                v-model="
                  value.ClsBuildingExeReport.BuildingExecRep_Info_Main
                    .CI_InfringementResult
                "
                cdcName="CI_InfringementResult"
                domainName="engineer"
                :m="isEdit ? 'e' : 'r'"
                ciName="CI_InfringementResult"
              />
            </FormControl>
            <text-template
              label="متن گزارش"
              label-width="90px"
              :m="m"
              :rows="5"
              v-model="
                value.ClsBuildingExeReport.BuildingExecRep_FormOperation_Main.Comments
              "
              cdcName="Comments"
              class="col-12 q-mb-sm"
            />
          </FormRow>
      </safa-securityPanel>

  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    NIdFil: String,
    NIdEng: String,
    m: String,
    CIExecLevelList: Array
  },

  data () {
    return {
      selectedComboLevel: 0,
      selectedCI_ExecFloor: 0,
      getCIRes: null,
      ciList: []
    }
  },
  async created () {
    await this.getCiExecStatus()
  },
  methods: {
    comboFloorSelectionChanged () {
      this.$emit("loadData")
    },
    comboLevelSelectionChanged () {
      this.$emit("loadData")
    },
    async getCiExecStatus () {
      try {
        const { data } = await this.$services.CiSrvSara.getCI({
          ciName: "CI_ExecStatus",
          domainName: "engineer"
        })
        this.getCIRes = this.getResponse(data)
        if (this.getCIRes.success) {
          this.ciList = this.getCIRes.data?.list ?? []
        }
      } catch (e) {
        console.error(e)
      }
    }
  },
  computed: {
    showType () {
      const isObservedBuilding =
        this.value?.ClsBuildingExeReport?.BuildingExecRep_Info_Main
          ?.IsObservedBuilding ?? null
      if (isObservedBuilding !== true) return false // بله نیست

      if (this.selectedComboLevel) {
        const obj = this.CIExecLevelList?.find(
          (f) => f.ID === this.selectedComboLevel
        )
        if (obj.Title.convertToPersian().includes("پایانکار")) {
          return false
        } else {
          return true
        }
      }
      return false
    },
    FullName () {
      return (
        this.value?.Fil_Owner.Name + " " + this.value?.Fil_Owner.Family
      )
    },
    isEdit () {
      if (this.showType === true) {
        return false
      } else {
        return true
      }
    },
    phaseReportsColumns () {
      return [
        {
          field: "CI_ExecRep",
          title: "عنوان گزارش",
          domain: "engineer",
          editor: "ci",
          width: "700px",
          isEditable: false,
          triggerCells: [["CI_ExecStatus"]]
        },
        {
          field: "CI_ExecStatus",
          title: "خلاصه وضعیت",
          width: "180px",
          domain: "engineer",
          ignoreCi: true,
          editor: "ADPGridTemplate",
          valueFormatter: (col, { data }) => {
            if (data.CI_ExecStatus === 0) {
              return "نامشخص"
            } else {
              return (
                this.ciList.find((f) => f.ID === data.CI_ExecStatus)?.Title ||
                data.CI_ExecStatus
              )
            }
          },
          // serviceUrl نباید به GetCI_ExecStatus_FromCI_ExecRep تغییر کند.
          // چون خروجی آن قابل استفاده برای کمبوهایی که سمت CI  هست نمیباشد.
          params: {
            serviceKey: "engineers",
            serviceUrl: "GetCI_ExecStatus_FromCI_ExecRep_WrappedRequest",
            responseKey: "CI_ExecStatus_FromCI_ExecRep",
            paramName: "pCI_ExecRep",
            groupField: "CI_ExecRep"
          }
        },
        {
          field: "DetailComments",
          title: "شرح",
          width: "auto"
        }
      ]
    }
  }
}
</script>
