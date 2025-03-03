<template>
  <fit>
    <form-row class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="منطقه"
          label-width="45px"
          v-model="ciRegion"
          ciName="CI_Region"
          domainName="Estate"
          :m="m"
          cdcName="CI_Region"
        />
      </FormControl>
      <FormControl v-if="accessBuyOrSale">
        <safa-combo
          :options="melkOpt"
          v-model="searchCombo"
          source-type="local"
          :m="m"
          label-width="100px"
          cdcName="searchCombo"
          ref="melkRef"
        />
      </FormControl>
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
        v-if="accessBuyOrSale"
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
    <!-- helper="agExchangedPropertiesColumns" -->
    <safa-grid
      helper="agExchangedPropertiesColumns"
      title="ملک معوض"
      v-model="value.ContractBuy_Replacement"
      cdcName="ContractBuy_Replacement"
      paginate
      fit
      :suppressRowClickSelection="false"
      max-height="100%"
      height="400px"
      minHeight="200px"
      :m="m"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
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
    accessBuyOrSale: { type: Boolean, default: () => true },
    m: String
  },
  data () {
    return {
      name: "PropertyTransferred",
      title: "ملک معوض",
      ciRegion: null,
      searchCombo: "",
      getReplacementRes: null,
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
      // agAgExchangedPropertiesColumns: [
      //   { field: "CodeString", title: "کدنوسازی", width: "100px" },
      //   { field: "CessionArea", title: "مساحت واگذارشده", width: "150px" },
      //   { field: "CessionPrice", title: "مبلغ واگذاری(ریال)", width: "150px" },
      //   {
      //     field: "CessionDate",
      //     title: "تاریخ واگذاری",
      //     editor: "date",
      //     width: "100px"
      //   },
      //   { field: "RegisterPlack", title: "پلاک ثبتی", width: "100px" },
      //   { field: "PartCode", title: "شماره قطعه", width: "100px" },
      //   {
      //     field: "BureauLetterNo",
      //     title: "شماره نامه دفترخانه",
      //     width: "140px"
      //   },
      //   {
      //     field: "BureauLetterDate",
      //     title: "تاریخ نامه دفترخانه",
      //     editor: "date",
      //     width: "140px"
      //   },
      //   { field: "MbayhNo", title: "شماره مبایعه نامه", width: "140px" },
      //   {
      //     field: "MbayhDate",
      //     title: "تاریخ مبایعه نامه",
      //     editor: "date",
      //     width: "140px"
      //   },
      //   { field: "Description", title: "توضیحات واگذاری", width: "140px" },
      //   { field: "EvaluationPrice", title: "قیمت کارشناسی", width: "140px" },
      //   { field: "EvaluationNum", title: "شماره کارشناسی", width: "140px" },
      //   {
      //     field: "EvaluationDate",
      //     title: "تاریخ کارشناسی",
      //     editor: "date",
      //     width: "140px"
      //   }
      // ],
      textModel: {
        txtDesc: ""
      },
      selectedRow: [],
      requestListOptions: []
    }
  },
  computed: {
    isSaleOrBuy () {
      if (this.accessBuyOrSale) {
        return this.value.ContractBuy_Info.NidRequest
      } else {
        return this.value.ContractSale_Info.NidRequest
      }
    }
  },

  methods: {
    async getReplacement () {
      debugger
      try {
        this.showLoading()
        const { data } = await this.$services.ES.getReplacementResult({
          pDistrict: this.ciRegion,
          pTotalPrice: this.value.Total_Price ?? 0,
          PNIdRequest: this.isSaleOrBuy
        })
        this.getReplacementRes = this.getResponse(data)
        if (this.getReplacementRes.success) {
          const tmp = this.getReplacementRes.data.GetReplacement_ResultResult ?? []
          this.melkOpt = tmp.map((m) => {
            return {
              ID: m.NIdLegal,
              Title: `${m.CodeString} | ${m.BeneficCurent} | ${m.CessionOwner} | ${m.TotalPrice}`
              // Title: `<span style="min-width">${m.CodeString}</span> | <span>${m.BeneficCurent}</span> | <span>${m.CessionOwner}</span> | <span>${m.TotalPrice}</span>`
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
    addHandler () {
      const tmp = this.getReplacementRes.data.GetReplacement_ResultResult.find(
        (f) => f.NIdLegal === this.searchCombo
      )
      this.value.ContractBuy_Replacement = [...this.value.ContractBuy_Replacement, { ...tmp }]
    },
    editHandler () {
      const rowId = this.selectedRow[0]?.uniqueId

      this.value.ContractBuy_Replacement.map((e) => { if (e.uniqueId === rowId) { e.CodeString = this.searchCombo } })
    },
    deleteHandler () {
      const rowId = this.selectedRow[0]?.uniqueId
      const filterdRow = this.value.ContractBuy_Replacement.filter((e) => e.uniqueId !== rowId)
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
    ciRegion () {
      this.getReplacement()
    },
    searchCombo () {
      const tmp = this.getReplacementRes.data.GetReplacement_ResultResult.find(
        (f) => f.NIdLegal === this.searchCombo
      )
      this.baseNosaziCode = convertStringToNosaziCodeObject(tmp.CodeString)
    }
  }
}
</script>
