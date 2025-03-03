
<template>
    <fit>
      <safa-status :result="getSurveyorListRes" />
      <safa-status :result="changeSurveyorActivationRes" />
      <safa-status :result="getSurveyorTasksInBlockGroupRes" />
      <form-row class="q-my-sm">
        <form-control>
          <safa-text
            label="شماره دستگاه "
            label-width="80px"
            v-model="txtDeviceCode"
            cdcName="txtDeviceCode"
            class="q-ml-sm"
          />
        </form-control>
        <form-control>
          <safa-text
            label="نام "
            label-width="80px"
            v-model="txtName"
            cdcName="txtName"
          />
        </form-control>
        <form-control>
          <btn-search label="جستجو" @click="searchObj" />
        </form-control>
      </form-row>
      <safa-datatable
        v-model="SurveyorList"
        title="لیست"
        helper="SurveyorColumns"
        :hideHeader="true"
        :allowNewRow="false"
        :allowRemoveRow="false"
        :allowCopy="false"
        :allowMultipleSelection="false"
        height="100%"
        maxHeight="100%"
        class="fit"
        margin="0"
        fit
        @row-click="rowClick"
        @changeSituationClick="changeSituationDone"
        paginate
        @dbclick="dbclick"
      />
      <!-- helper="deeps" -->
      <div v-if="showBtn" class="q-my-sm q-mx-sm">
        <btn-search label="انتخاب" @click="sendDataToParent" />
      </div>
    </fit>
  </template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    showBtn: Boolean
  },
  data () {
    return {
      title: "لیست",
      name: "UList",
      getSurveyorListRes: null,
      changeSurveyorActivationRes: null,
      getSurveyorTasksInBlockGroupRes: null,
      txtDeviceCode: "",
      txtName: "",
      rowData: {},
      SurveyorList: [],
      deeps: [
        {
          field: "SImage",
          title: "عکس",
          width: "40px",
          cell: "picture-template"
        },
        { field: "DeviceCode", title: "شماره دستگاه", width: "100px" },
        { field: "SName", title: "نام", width: "100px" },
        { field: "SFamily", title: "نام خانوادگی", width: "100px" },
        {
          field: "SNationalCode",
          title: "کد ملی",
          width: "100px",
          cell: "NationalCodeTemplate"
        },
        { field: "STelephone", title: "تلفن", width: "100px" },
        { field: "SCellPhone", title: "تلفن همراه", width: "100px" },
        { field: "SAddress", title: "آدرس", width: "100px" },
        { field: "RegistDate", title: "تاریخ ثبت", width: "100px" },
        { field: "RegistTime", title: "ساعت ثبت", width: "100px" },
        {
          field: "IsActive",
          title: "وضعیت",
          width: "100px",
          editor: "checkbox"
        },
        {
          field: "changeSituation",
          title: "تغییر وضعیت",
          width: "100px",
          editor: "action"
        }
      ]
    }
  },
  mounted () {
    this.searchObj()
  },
  methods: {
    searchObj () {
      const payload = {
        pGetActive: -1,
        pFullName: this.txtName,
        pDeviceCode: this.txtDeviceCode,
        pFromRow: 0,
        pToRow: 100
      }
      //  {
      //   pNidSurveyor: "e2f0da1b-03bd-47a1-bfd5-93d923844df0"
      // }

      this.showLoading()
      this.$services.SO.getSurveyorList(payload)
        .then(({ data }) => {
          this.getSurveyorListRes = this.getResponse(data)
          if (this.getSurveyorListRes.success) {
            this.SurveyorList = this.getSurveyorListRes.data.SurveyorList.map(
              (m) => {
                return {
                  ...m,
                  SImage: m.SImage ? m.SImage.Bytes : null
                }
              }
            )
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    changeSituationDone () {
      const payload = {
        pGetActive: -1,
        pFullName: this.txtName,
        pDeviceCode: this.txtDeviceCode,
        pFromRow: 0,
        pToRow: 20
      }

      this.showLoading()
      this.$services.SO.getSurveyorList(payload)
        .then(({ data }) => {
          this.changeSurveyorActivationRes = this.getResponse(data)
          if (this.changeSurveyorActivationRes.success) {
            this.SurveyorList =
                this.changeSurveyorActivationRes.data.CanAssignToSurveyor_List
            this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: ``
            })
            this.searchObj()
            this.showSuccess("تغییر وضعیت با موفقیت انجام شد")
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    dbclick ({ event, target, row }) {
      this.selectedRow = row
      this.$emit("showSurveyorDetailsTab", this.selectedRow)
      this.getSurveyorTasksInBlockGroup()
    },
    getSurveyorTasksInBlockGroup () {
      const payload = {
        pDeviceCode: this.txtDeviceCode,
        pFromRow: 0,
        pToRow: 50
      }

      this.showLoading()
      this.$services.SO.getSurveyorTasksInBlockGroup(payload)
        .then(async ({ data }) => {
          this.getSurveyorTasksInBlockGroupRes = this.getResponse(data)
          if (this.getSurveyorTasksInBlockGroupRes.success) {
            this.SurveyorList =
                this.getSurveyorTasksInBlockGroupRes.data.AssignedObjectToSurveyor_InBlock
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `نمایش اطلاعات در فرم ${this.title} انجام گردید.`
            })
            this.searchObj()
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    rowClick (row) {
      this.rowData = row
    },
    sendDataToParent () {
      this.$emit("getDataFromUList", this.rowData)
    }
  }
}
</script>
