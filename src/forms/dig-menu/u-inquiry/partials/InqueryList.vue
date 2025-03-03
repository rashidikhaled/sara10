<template>
  <safa-datatable
    v-if="item.expanded"
    :columns="InquiryColumn"
    v-model="inquiryList"
    fit
    height="100%"
    max-height="100%"
    minHeight="100%"
    m="r"
    ref="grid"
    @selectedChange="click"

  ></safa-datatable>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "InqueryList",
  mixins: [baseFormMixin],
  props: {
    item: Object,
    gridValue: Array,
    title: String,
    formKey: String,
    name: String
  },
  data () {
    return {
      InquiryColumn: [
        { field: "RequesterName", title: "شرکت خدماتی" },
        { field: "RedirectName", title: "نام تابعه" }
      ],
      inquiryList: []
      // InquiryListSent: []
    }
  },
  mounted () {
    this.gridValueHandler()
  },
  methods: {
    gridValueHandler () {
      this.gridValue.map((x) =>
        x.RequesterName === this.item.RequesterName
          ? this.inquiryList.push(x)
          : ""
      )
    },
    click (item) {
      this.$emit("selectedRow", item.selectedItems)
    }
  }
}
</script>
