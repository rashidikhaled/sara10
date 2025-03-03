<template>
  <fit>
    <form-row class="q-mb-sm">
      <form-control v-if="accessBuyOrSale">
        <safa-combo
          v-model="CIRegion"
          ciName="CI_Region"
          domainName="Estate"
          label="منطقه"
          :m="m"
          label-width="100px"
          cdcName="CI_Region"
        />
      </form-control>
      <form-control v-if="accessBuyOrSale">
        <safa-combo
          :options="list"
          v-model="searchpanel"
          source-type="local"
          :m="m"
          label-width="100px"
          cdcName="searchpanel"
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
    <safa-grid
      v-model="value.ContractBuy_Replacement"
      cdcName="value"
      title=""
      fit
      :suppressRowClickSelection="false"
      paginate
      max-height="100%"
      height="400px"
      minHeight="200px"
      :addRow="true"
      :deleteRow="true"
      :allowCopy="true"
      :columns="columns"
      @row:click="rowClick"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject, convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String,
    // accessBuyOrSale: Boolean,
    // formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      CIRegion: 1,
      searchpanel: "",
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
      columns: [
        { field: "CodeString", title: "کدنوسازی", width: "100px" },
        { field: "CessionArea", title: "مساحت واگذارشده", width: "150px" },
        { field: "CessionPrice", title: "مبلغ واگذاری(ریال)", width: "100px" },
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
      requestListOptions: [],
      accessBuyOrSale: true,
      list: [],
      getReplacementResultResponseRes: null
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
  mounted () {
    this.getReplacementResult()
  },
  methods: {
    addHandler () {
      const tmp = this.list.find(
        (f) => f.NIdLegal === this.searchpanel
      )
      this.value.ContractBuy_Replacement = [...this.value.ContractBuy_Replacement, { ...tmp }]
    },
    editHandler () {
      const rowId = this.selectedRow[0].uniqueId
      let nosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
      this.value.ContractBuy_Replacement.map((e) => { if (e.uniqueId === rowId) { e.CodeString = nosaziCode } })
    },
    deleteHandler () {
      const rowId = this.selectedRow[0].uniqueId
      const filterdRow = this.value.ContractBuy_Replacement.filter((e) => e.uniqueId !== rowId)
      this.value.ContractBuy_Replacement = filterdRow
    },
    rowClick (e) {
      this.selectedRow = []
      this.selectedRow.push(e.api.getSelectedRows()?.[0])
    },
    // changeComboHandler () {
    //   const tmp = this.list.find(
    //     (f) => f.NIdLegal === this.searchpanel
    //   )
    //   this.baseNosaziCode = convertStringToNosaziCodeObject(tmp.CodeString)
    // },
    getReplacementResult () {
      this.showLoading()
      const payload = {
        pDistrict: this.CIRegion,
        pTotalPrice: 0,
        PNidRequest: this.value.ContractBuy_Info.NidRequest
      }
      this.$services.ES.getReplacementResult(payload)
        .then(async ({ data }) => {
          this.getReplacementResultResponseRes = this.getResponse(data)
          if (this.getReplacementResultResponseRes.success) {
            const res =
              this.getReplacementResultResponseRes.data
                .GetReplacement_ResultResult
            this.list.push(
              ...res.map((item) => {
                let r = {}
                r.ID = item.NIdLegal
                r.Title =
                  item.CodeString +
                  " || " +
                  item?.BeneficCurent +
                  " || " +
                  item?.CessionOwner +
                  " || " +
                  item?.TotalPrice
                r.Apartment = item.Apartment
                r.BeneficCurent = item.BeneficCurent
                r.Block = item.Block
                r.Building = item.Building
                r.CessionOwner = item.CessionOwner
                r.CodeString = item.CodeString
                r.District = item.District
                r.House = item.House
                r.NIdLegal = item.NIdLegal
                r.Region = item.Region
                r.RegisterPlack = item.RegisterPlack
                r.Shop = item.Shop
                r.TotalPrice = item.TotalPrice

                return r
              })
            )
            // await this.log({
            //   action: this.logActions.view,
            //   bizCode: this.NIdRequest,
            //   bizCodeTitle: "NidRequest",
            //   nosaziCode: "",
            //   nidWorkItem: "",
            //   saveDesc: ""
            // })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  watch: {
    searchpanel () {
      const tmp = this.list.find(
        (f) => f.NIdLegal === this.searchpanel
      )
      this.baseNosaziCode = convertStringToNosaziCodeObject(tmp.CodeString)
    },
    CIRegion () {
      this.getReplacementResult()
    }
  }
}
</script>
