<template>
  <fit>
    <safa-status :result="getCodeInfoForNosaziRes" />
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-checkbox
          v-model="loadCancelFiches"
          cdcName="loadCancelFiches"
          label="عدم نمایش فیش های باطله"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="splitterValue" class="fit" margin="0">
      <template v-slot:before>
        <safa-grid
          v-model="dutyFiches.DutyFiches"
          :addRow="false"
          :allowCopy="false"
          :deleteRow="false"
          :detailCellRendererParams="detailCellRendererParams"
          :masterDetail="true"
          :allowSelectionWhenReadonlyMode="true"
          cdcName="dutyFiches"
          fit
          height="100%"
          helper="agDutyFich1"
          m="r"
          max-height="100%"
          min-height="200px"
          paginate
          title="فیش ها"
          :suppressRowClickSelection="false"
          :getRowClass="getRowClass"
          @row:click="selectFiche"
        />
        <!-- <safa-datatable
          helper="dutyFich1"
          v-model="dutyFiches.DutyFiches"
          @selectedChange="selectFiche"
          title="فیش ها"
          fit
          m="r"
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
          cdcName="dutyFich1"
        /> -->
      </template>
      <template v-slot:after>
        <safa-grid
          v-model="dutyFicheSubList"
          cdcName="dutyFicheSubList"
          fit
          height="100%"
          helper="dutyFich2"
          m="r"
          max-height="100%"
          min-height="200px"
          paginate
          title="جزئیات فیش"
        />
      </template>
    </safa-splitter>
    <div>
      <btn-default
        :disable="!selectedDutyFiche"
        label="چاپ فیش"
        @click="printFiche"
      />
    </div>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import codeInfoForNosaziModel from "../models/codeInfoForNosazi"
import dutyFichesModel from "../models/dutyFiches"
import converter from "xml-js"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    title: String,
    formKey: String,
    baseNosaziCode: Object
  },

  data () {
    return {
      name: "DutyFichesNosazi",
      getCodeInfoForNosaziRes: null,

      selectedDutyFiche: null,
      codeInfoForNosazi: { ...codeInfoForNosaziModel },
      dutyFiches: { ...dutyFichesModel },
      dutyFicheSubList: [],
      splitterValue: 50,
      loadCancelFiches: true,
      detailCellRendererParams: {
        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          columnDefs: [
            { field: "title", title: "عنوان", width: "150px" },
            { field: "amount", title: "مقدار", width: "200px" },
            { field: "comment", title: "توضیحات", width: "auto" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: (params) => {
          setTimeout(() => {
            if (params.data.OtherFields) {
              let arrayOfClsLog = converter.xml2json(params.data.OtherFields, {
                compact: true,
                ignoreDoctype: true,
                ignoreCdata: true
              })
              const clsLog = JSON.parse(arrayOfClsLog)
              if (clsLog.ArrayOfClsLog && clsLog.ArrayOfClsLog.ClsLog) {
                const list = clsLog.ArrayOfClsLog.ClsLog
                let logDetail = list.map((m) => {
                  return {
                    title: m.Subject._text || "",
                    amount: m.Value._text || "",
                    comment: m.Comment._text || ""
                  }
                })
                params.successCallback(logDetail)
              }
            }
          }, 1000)
        }
      }
    }
  },

  methods: {
    async loadData () {
      if (!this.value) {
        return this.showError(
          "کد منبع جهت تعیین لیست کمیسیون ها تعیین نشده است"
        )
      }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getCodeInfoForNosazi(
          {
            pDistrict: this.value.District,
            pRegion: this.value.Region,
            pBlock: this.value.Block,
            pHouse: this.value.House,
            pBuilding: this.value.Building,
            pApartment: this.value.Apartment,
            pShop: this.value.Shop,
            pDutyType: 1, // 'Renovation',
            pEumNosaziCodeGroup: this.value.EumNosaziCodeGroup,
            pIncludeShop: false,
            pToCurrentObject: false,
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )
        this.getCodeInfoForNosaziRes = this.getResponse(data)
        if (this.getCodeInfoForNosaziRes.success) {
          this.codeInfoForNosazi = this.getCodeInfoForNosaziRes.data
          await this.log({
            action: this.logActions.view,
            bizCode: convertNosaziCodeObjectToString(this.value),
            bizCodeTitle: "nosaziCode"
          })
          //  const strNosaziCode = convertNosaziCodeObjectToString(
          //   this.baseNosaziCode
          // )
          // this.log({
          //   action: this.logActions.view,
          //   bizCode: strNosaziCode,
          //   bizCodeTitle: "NosaziCode",
          //   nosaziCode: strNosaziCode,
          //   saveDesc: `بارگذاری لیست برای کد نوسازی ${strNosaziCode
          //     .split("-")
          //     .reverse()
          //     .join("-")} انجام گردید.`
          // })
          if (
            !this.codeInfoForNosazi.NidList ||
            !this.codeInfoForNosazi.NidList.length
          ) {
            this.$emit("changeTreeTab")
            return
          } else {
            this.getDutyFiches()
          }
        }
      } catch (err) {
        console.error(err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    getRowClass (params) {
      let row = params.data
      // if (row.EumDutyFicheStatus === 0) return "bg-green-3"
      if (row.EumDutyFicheStatus === 1) return "bg-green-2"
      if (row.EumDutyFicheStatus === 2) return "bg-pink-2"
      if (row.EumDutyFicheStatus === 3) return "bg-grey-1"
      if (row.EumDutyFicheStatus === 4) return "bg-green-3"
      if (row.EumDutyFicheStatus === 5) return "bg-grey-3"
      return { background: "transparent" }
    },

    async getDutyFiches () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getDutyFiches(
          {
            pNidList: this.codeInfoForNosazi.NidList,
            pSysCiDutyType: 1, // 'Renovation',
            pUnLoadCancelFiches: this.loadCancelFiches
          },
          this.config
        )
        const res = this.getResponse(data)
        if (res.success) {
          await this.log({
            action: this.logActions.view,
            bizCode: convertNosaziCodeObjectToString(this.value),
            bizCodeTitle: "nosaziCode"
          })
          let model = res.data
          model.DutyFiches = [...(model.DutyFiches || [])].map((x) => ({
            ...x,
            isSelectedNode: false
          }))
          this.dutyFiches = model
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    selectFiche (e) {
      const rows = e.api.getSelectedRows()
      this.selectedDutyFiche = rows.length > 0 && rows[0]
      if (rows.length > 0) {
        this.loadDutyFicheSub()
      }
    },

    async loadDutyFicheSub () {
      try {
        const payload = { pNidFiche: this.selectedDutyFiche.NidFiche }
        this.showLoading()
        const { data } = await this.$services.SC.getDutyFicheSubs(
          payload,
          this.config
        )
        const res = this.getResponse(data)
        if (res.success) {
          this.dutyFicheSubList = res.data["DutyFicheSub"]
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedDutyFiche.NidFiche,
            bizCodeTitle: "pNidFiche"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async printFiche () {
      const reportPath =
        "/Sara8Reports/RptReconFiche"
      const queryParams = {
        NIdUser: this.currentUser.NidUser,
        NidFiche: this.selectedDutyFiche.NidFiche,
        District: this.baseNosaziCode.District,
        NidNosaziCode: this.value.NidNosaziCode
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedDutyFiche.NidFiche,
        bizCodeTitle: "NidFiche"
      })
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.value.District
        }
      }
    }
  },
  watch: {
    loadCancelFiches () {
      this.getDutyFiches()
    }
  }
}
</script>
