<template>
  <fit>
    <form-row class="q-mb-sm">
      <form-control>
        <safa-combo
          v-model="ciRegion"
          ciName="CI_Region"
          domainName="Estate"
          label="منطقه"
          :m="m"
          label-width="100px"
          cdcName="CI_Region"
        />
      </form-control>
      <form-control>
        <safa-combo
          :options="melkOpt"
          v-model="searchCombo"
          source-type="local"
          :m="m"
          label-width="100px"
          cdcName="searchCombo"
          ref="melkRef"
        />
      </form-control>
      <nosazi-code-input
        :m="m"
        label="کد نوسازی"
        label-width="100px"
        v-model="baseNosaziCode"
        cdcName="baseNosaziCode"
      />
    </form-row>
    <div class="q-gutter-x-sm q-ml-auto">
      <q-btn
        round
        color="primary"
        size="sm"
        icon="add"
        title="اضافه کردن"
        class="q-my-sm"
        :disable="m === 'e' ? false : true"
        :class="m === 'e' ? '' : 'readOnly'"
        @click="addHandler"
      />
      <q-btn
        round
        color="primary"
        size="sm"
        icon="edit"
        title="ویرایش کردن"
        class="q-my-sm"
        :disable="m === 'e' ? false : true"
        :class="m === 'e' ? '' : 'readOnly'"
        @click="editHandler"
      />
      <q-btn
        round
        color="primary"
        size="sm"
        icon="delete"
        title="حذف کردن"
        class="q-my-sm"
        :class="m === 'e' ? '' : 'readOnly'"
        @click="deleteHandler"
      />
    </div>
    <safa-grid
      v-model="value.ContractBuy_Replacement"
      cdcName="ContractBuy_Replacement"
      title=""
      :m="m"
      fit
      :suppressRowClickSelection="false"
      paginate
      max-height="100%"
      minHeight="200px"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="true"
      :columns="columnsGrid"
      :pinnedBottomRowData="[{}]"
      @row:click="rowClick"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      name: "PropertyTransferred",
      ciRegion: 1,
      searchCombo: "",
      getReplacementResultRes: null,
      getBaseCodeRes: null,
      Nidbase: '',
      melkOpt: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      columnsGrid: [
        { field: "CodeString", title: "کدنوسازی", width: "100px" },
        {
          field: "CessionArea",
          title: "مساحت واگذارشده",
          width: "150px",
          cellRendererSelector: (params) =>
            this.ChequePriceCellRenderer(params),
          cellClass: "custom-pinned-row"
        },
        {
          field: "CessionPrice",
          title: "مبلغ واگذاری(ریال)",
          width: "100px",
          cellRendererSelector: (params) =>
            this.ChequePriceCellRenderer(params),
          cellClass: "custom-pinned-row"
        },
        {
          field: "CI_AssignmentType",
          title: "نوع واگذاری",
          editor: "combo",
          domain: "Estate",
          width: "100px"
        },
        {
          field: "CessionDate",
          title: "تاریخ واگذاری",
          editor: "date",
          width: "100px"
        },
        { field: "RegisterPlack", title: "پلاک ثبتی", width: "100px" },
        { field: "PartCode", title: "شماره قطعه", width: "100px" },
        {
          field: "BureauLetterNo",
          title: "شماره نامه دفترخانه",
          width: "100px"
        },
        {
          field: "BureauLetterDate",
          title: "تاریخ نامه دفترخانه",
          editor: "date",
          width: "100px"
        },
        { field: "MbayhNo", title: "شماره مبایعه نامه", width: "100px" },
        {
          field: "MbayhDate",
          title: "تاریخ مبایعه نامه",
          editor: "date",
          width: "100px"
        },
        { field: "Description", title: "توضیحات واگذاری", width: "100px" }
      ],
      textModel: {
        txtDesc: ""
      },
      selectedRow: [],
      requestListOptions: []
    }
  },
  // computed: {
  //   valueGrid () {
  //     return this.value.ContractBuy_Replacement
  //   }
  // },
  mounted () {
    this.getReplacement()
  },
  methods: {
    async getReplacement () {
      this.showLoading()
      try {
        const { data } = await this.$services.ES.getReplacementResult({
          pDistrict: this.ciRegion,
          pTotalPrice: this.value.Total_Price ?? 0,
          PNIdRequest: this.value.ContractBuy_Info.NidRequest
        })
        this.getReplacementResultRes = this.getResponse(data)
        if (this.getReplacementResultRes.success) {
          const tmp =
            this.getReplacementResultRes.data.GetReplacement_ResultResult ?? []
          this.melkOpt = tmp.map((m) => {
            return {
              ID: m.NIdLegal,
              Title: `${m.CodeString} | ${m.BeneficCurent} | ${m.CessionOwner} | ${m.TotalPrice}`
            }
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    ChequePriceCellRenderer (params) {
      if (params.node.rowPinned === "bottom") {
        return {
          component: "agAggregateFotterTemplate",
          params: {
            totalValue: () => {
              let colId = params.column.colId.toString()
              let total = 0
              try {
                total = this.value.ContractBuy_Replacement.reduce(
                  (a, { [colId]: b }) => a + parseFloat(b),
                  0
                ).toFixed(2)
              } catch (ex) {
                total = 0
              }
              return `جمع کل : ${Number(total)?.toNumberWithCommas() ?? 0}`
            }
          }
        }
      }
      return undefined
    },
    addHandler () {
      if (!this.searchCombo) {
        this.showError("ملک انتخاب نشده است")
        return
      }
      this.getBaseCode()
    },
    async getBaseCode () {
      this.showLoading()
      const addingItem = this.getReplacementResultRes.data.GetReplacement_ResultResult.find(
        (f) => f.NIdLegal === this.searchCombo
      )
      try {
        const payload = {
          PDistrict: addingItem.District.toString(),
          PRegion: addingItem.Region.toString(),
          PBlock: addingItem.Block.toString(),
          PHouse: addingItem.House.toString(),
          PBuilding: addingItem.Building.toString(),
          PApartment: addingItem.Apartment.toString(),
          PShop: addingItem.Shop.toString()
        }
        const { data } = await this.$services.ES.getBaseCode(payload)
        this.getBaseCodeRes = this.getResponse(data)
        if (this.getBaseCodeRes.success) {
          this.Nidbase = this.getBaseCodeRes.data.GetBaseCodeResult ?? "00000000-0000-0000-0000-000000000000"
          //   const selectedItem =
          // this.getReplacementResultRes.data.GetReplacement_ResultResult.find(
          //   (f) => f.NIdLegal === this.searchCombo
          // )
          const defaultNewRow = {
            BureauLetterDate: null,
            BureauLetterNo: null,
            CI_AssignmentType: "0",
            CessionArea: null,
            CessionDate: null,
            CessionPrice: null,
            CodeString: addingItem.CodeString,
            Description: null,
            EvaluationDate: null,
            EvaluationNum: null,
            EvaluationPrice: null,
            MbayhDate: null,
            MbayhNo: null,
            NIdBaseCode: this.Nidbase,
            NIdContractBuy: "00000000-0000-0000-0000-000000000000",
            NIdReplacement: "00000000-0000-0000-0000-000000000000",
            NIdReplacement_tmp: "0",
            PartCode: null,
            NidLegal: addingItem.NIdLegal,
            RegisterPlack: !addingItem.RegisterPlack ? null : addingItem.RegisterPlack
          }
          if (!this.value.ContractBuy_Replacement) {
            this.value.ContractBuy_Replacement = []
          }
          this.value.ContractBuy_Replacement = this.value.ContractBuy_Replacement.concat([defaultNewRow])
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    editHandler () {
      // const rowId = this.selectedRow[0].uniqueId

      // this.value.ContractBuy_Replacement.map((e) => {
      //   if (e.uniqueId === rowId) {
      //     e.CodeString = this.searchCombo
      //   }
      // })
    },
    deleteHandler () {
      const rowId = this.selectedRow[0].uniqueId
      const filterdRow = this.value.ContractBuy_Replacement.filter(
        (e) => e.uniqueId !== rowId
      )
      this.value.ContractBuy_Replacement = filterdRow
    },
    rowClick (e) {
      this.selectedRow = []
      this.selectedRow.push(e.api.getSelectedRows()?.[0])
    },
    comboHandler () {
      this.requestListOptions = this.comboResult.map((m) => {
        return {
          ID: m.NIdLegal,
          Title: `${m.TotalPrice},${m.CodeString},${m.BeneficCurent},${m.CessionOwner}`
        }
      })
    }
  },
  watch: {
    ciRegion: {
      handler () {
        this.getReplacement()
      },
      deep: true
    },
    searchCombo () {
      const tmp =
        this.getReplacementResultRes.data.GetReplacement_ResultResult.find(
          (f) => f.NIdLegal === this.searchCombo
        )
      this.baseNosaziCode = convertStringToNosaziCodeObject(tmp.CodeString)
    }
  }
}
</script>
