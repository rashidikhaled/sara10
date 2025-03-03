<template>
  <fit>
    <safa-notice type="warning">
      "در پروژه حفاری، نواقص زیر وجود دارد. پس از رفع نقص ، نسبت به تکمیل جدول اقدام و سپس ارسال نمایید."
    </safa-notice>
    <safa-grid
      v-model="value.Delivery_Defects"
      :columns="deliveryDefectsColumns"
      m="r"
      min-height="200px"
      fit
      paginate
      cdcName="Delivery_Defects"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      deliveryDefectsColumns: [
        {
          field: "IsDeficiencies",
          title: "رفع نقص",
          width: "150px"
        },
        {
          field: "CI_DefectsSubject",
          title: "عنوان",
          editor: "combo",
          domain: "Dig",
          width: "150px"
        },
        {
          field: "Description",
          title: "توضیحات کارشناس",
          width: "300px"
        },
        {
          field: "DescCompany",
          title: "توضیحات شرکت خدماتی",
          width: "300px"
        },
        {
          field: "Place",
          title: "مکان نقص",
          width: "300px"
        }
      ]
    }
  }
}
</script>
