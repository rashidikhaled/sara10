<template>
  <fit>
    <safa-splitter v-model="splitterValue" class="fit" margin="0">
      <template v-slot:before>
        <safa-datatable
          title="لیست تمام فیش ها"
          v-model="value"
          cdcName="allFiches"
          helper="incomeFiche"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          @selectedChange="getIncomeFiche"
          paginate
          m="r"
          height="100%"
          max-height="100%"
          min-height="200px"
          fit
          addSPId="c14ce082-6f9a-4936-be2e-e60ec2f00cfb"
          copySPId="9c859995-fbd4-4c67-a780-ac69601e5db7"
          deleteSPId="ad2d7d7f-846f-443e-8807-f14abd9a25ee"
          :customButtons="customButtons"
        />
      </template>
      <template v-slot:after>
        <safa-datatable
          :hideHeader="false"
          fit
          height="100%"
          :columns="columns"
          max-height="100%"
          name="grid"
          ref="grid"
          v-model="incomeFicheSubResults.IncomeFicheSub"
          cdcName="IncomeFicheSub"
          title="جزئیات فیش ها"
        />
        <!-- helper="fichDetail" -->
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  name: "UFishList",
  mixins: [baseFormMixin],
  data () {
    return {
      splitterValue: 60,
      incomeFicheSubResults: { IncomeFicheSub: [] },
      customButtons: [
        {
          icon: "refresh",
          onClick: this.reload,
          text: "بازآوری"
        }
      ],
      columns: [
        {
          field: "CI_IncomeCalculation",
          title: "نوع عوارض درآمد",
          editor: "combo",
          domain: "CI_SaraM1"
        },
        { field: "Price", title: "مبلغ", cell: "grid-money-format" },
        {
          field: "CI_IncomeFormulaFiche",
          title: "فرمول",
          editor: "combo",
          domain: "CI_SaraM1"
        },
        { field: "comment", title: "توضیحات" }
      ]
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    formKey: String,
    title: String,
    name: String
  },
  methods: {
    reload () {
      this.$emit("reload")
    },
    getIncomeFiche (e) {
      this.showLoading()
      let data = {
        pNidFiche: e.dataItem.NidFiche
      }
      this.$services.SD.getIncomeFicheSub(data, this.config)
        .then(async ({ data }) => {
          this.incomeFicheSubResult = this.getResponse(data)
          if (this.incomeFicheSubResult.success) {
            this.incomeFicheSubResults = this.incomeFicheSubResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: e.dataItem.NidFiche,
              bizCodeTitle: "NidFiche"
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
