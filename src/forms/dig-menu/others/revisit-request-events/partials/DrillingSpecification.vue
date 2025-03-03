<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          v-model="
            value.ClsRevisit_RequestService.RequestService_Operations[0].RegionPrice
          "
          cdcName="RegionPrice"
          type="money"
          label="قیمت منطقه ای"
          label-width="80px"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <safa-grid
      title="مشخصات عملیات حفاری"
      v-model="value.ClsRevisit_RequestService.RequestService_Operations"
      min-height="250px"
      height="100%"
      paginate
      :pageSize="20"
      :suppressRowClickSelection="false"
      fit
      :columns="requestServiceOperationsColumns"
      cdcName="RequestService_Operations"
      :m="m"
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
      UPriceRegion: null,
      requestServiceOperationsColumns: [
        { field: "CI_Phase", title: "فاز", domain: "Dig", editor: "combo" },
        { field: "CI_Section", title: "مقطع", domain: "Dig", editor: "combo" },
        {
          field: "CI_DigType",
          title: "نوع حفاری",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CI_MaterialsType",
          title: "جنس روسازی معبر",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CI_PathType",
          title: "محل حفاری",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CI_Diggings",
          title: "خاک برداری",
          domain: "Dig",
          editor: "combo"
        },
        { field: "Length", title: "طول" },
        { field: "Width", title: "عرض" },
        { field: "Depth", title: "عمق" },
        { field: "LengthRevisit", title: "طول بازدید" },
        { field: "WidthRevisit", title: "عرض بازدید" },
        { field: "DepthRevisit", title: "عمق بازدید" },
        { field: "AsphaltLife", title: "عمر آسفالت" },
        {
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          domain: "Dig",
          editor: "combo"
        },
        { field: "AsphaltThickness", title: "ضخامت آسفالت روکش" },
        {
          field: "CoverLength",
          title: "طول روکش",
          width: "120px"
        },
        {
          field: "CoverWidth",
          title: "عرض روکش",
          width: "120px"
        },
        {
          field: "CI_CrossType",
          title: "نوع معبر",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CI_RepairPavement",
          title: "نوع ترمیم روسازی",
          domain: "Dig",
          editor: "combo"
        },
        { field: "AmountWaste", title: "مقدار نخاله" },
        { field: "CrossLength", title: "طول معبر" },
        { field: "DigLenghtExcess", title: "طول مازاد حفاری" },
        { field: "TrenchesWidthExcess", title: "عرض مازاد ترانشه" },
        {
          field: "CI_DigRepeat",
          title: "ضریب تکرار حفاری",
          domain: "Dig",
          editor: "combo"
        },
        { field: "CavalryWidth", title: "عرض محل حفاری" },
        { field: "Description", title: "توضیحات" }
      ]
    }
  }
}
</script>
