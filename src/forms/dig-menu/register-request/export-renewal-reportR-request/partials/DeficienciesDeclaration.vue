<template>
  <fit>
    <div class="q-ma-sm">
      <safa-notice type="warning"
        >در پروژه حفاری، نواقص زیر وجود دارد. پس از رفع نقص ، نسبت به تکمیل جدول
        اقدام و سپس ارسال نمایید</safa-notice
      >
    </div>
    <safa-grid
      v-model="value.Delivery.DeliveryDefectList"
      :columns="DeliveryDefectListColumns"
      fit
      paginate
      cdcName="DeliveryDefectList"
      m="r"
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
      DeliveryDefectListColumns: [
        {
          field: "IsDeficiencies",
          title: "رفع نقص",
          domain: "Dig"
        },
        {
          field: "CI_DefectsSubject",
          title: "عنوان",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "Description",
          title: "توضیحات کارشناسی",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "DescCompany",
          title: "توضیحات شرکت خدماتی",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "Place",
          title: "مکان نقص",
          domain: "Dig",
          editor: "combo"
        }
      ]
    }
  },
  methods: {}
}
</script>
