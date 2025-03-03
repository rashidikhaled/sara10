<template>
  <form-wrapper title="title" :padding="false">
    <fit>
      <safa-tabs v-model="activeTab" class="fit">
        <template v-slot:tabs>
          <tab-menu name="calculates" label="محاسبات" />
          <tab-menu name="calculateMethods" label="روشهای محاسبه" />
          <tab-menu name="bestankari" label="بستانکاری" />
          <tab-menu name="discount" label="تخفیف" />
          <tab-menu name="fish" label="فیش" />
          <tab-menu name="description" label="توضیحات" />
        </template>
        <tab-content name="calculates" :padding="false">
          <Calculates
            :incomeDetailResults="incomeDetailResults"
            :totalUserAmount="totalUserAmount"
            :totalSysAmount="totalSysAmount"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
        <tab-content name="calculateMethods" :padding="false">
          <CalculateMethods v-model="incomeDetailResults.Income_LogMethod" />
        </tab-content>
        <tab-content name="bestankari" :padding="false">
          <Bestankari v-model="incomeDetailResults" />
        </tab-content>
        <tab-content name="discount" :padding="false">
          <Discount
            :incomeDetailResults="incomeDetailResults"
            :m="mode"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
        <tab-content name="fish" :padding="false">
          <Fish v-model="incomeFiche" />
        </tab-content>
        <tab-content name="description">
          <Description :m="mode" :incomeDetailResults="incomeDetailResults" />
        </tab-content>
      </safa-tabs>
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Calculates from "./Calcualtes"
import CalculateMethods from "./CalculateMethods"
import Bestankari from "./Bestankari"
import Discount from "./Discount"
import Fish from "./Fish"
import Description from "./Description"

export default {
  mixins: [baseFormMixin],
  components: {
    Calculates,
    CalculateMethods,
    Bestankari,
    Discount,
    Fish,
    Description
  },
  props: {
    incomeDetailResults: Object,
    totalUserAmount: Number,
    totalSysAmount: Number,
    incomeFiche: Array,
    m: String,
    formKey: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      name: "IncomeDetailsTabs",
      title: "جزئیات درآمد",
      activeTab: "calculates"

    }
  },
  mounted () {
    console.log('this.value :>> ', this.value)
  }
}
</script>
