<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl v-if="showRegionPrice" >
        <safa-text
          label="قیمت منطقه ای"
          label-width="80px"
          v-model="RegionPrice"
          cdcName="RegionPrice"
          type="number"
          :m="m"
        >
        </safa-text>
      </FormControl>
    </FormRow>
    <safa-grid
      title="مشخصات عملیات حفاری"
      min-height="250px"
      height="100%"
      paginate
      m="r"
      fit
      :defaultNewRow="{
        CI_Phase: 0,
        CI_Section: 0,
        CI_DigType: 0,
        CI_MaterialsType: 0,
        CI_Diggings: 0,
        CI_PathType: 0,
        Width: 0,
        Length: 0,
        Depth: 0,
        Description: '',
      }"
      :columns="requestServiceOperationsColumns"
      v-model="value.RequestService_Operations"
      cdcName="RequestService_Operations"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String,
    name: String,
    title: String,
    formKey: String
  },
  watch: {
    RegionPrice (e) {
      this.value.RequestService_Operations[0].RegionPrice = e
    }
  },
  data () {
    return {
      RegionPrice: "",
      requestServiceOperationsColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CI_Section",
          title: "مقطع",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CI_DigType",
          title: "نوع حفاری",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CI_MaterialsType",
          title: "جنس روسازی معبر",
          editor: "combo",
          domain: "Dig",
          width: "200px"
        },
        {
          field: "CI_PathType",
          title: "محل حفاری",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CI_Diggings",
          title: "خاک برداری",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "Length",
          title: "طول",
          width: "80px"
        },
        {
          field: "Width",
          title: "عرض",
          width: "80px"
        },
        {
          field: "Depth",
          title: "عمق",
          width: "80px"
        },
        {
          field: "AsphaltLife",
          title: "عمر آسفالت",
          width: "120px"
        },
        {
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت روکش",
          width: "180px"
        },
        {
          field: "CI_CrossType",
          editor: "combo",
          domain: "Dig",
          title: "نوع معبر",
          width: "120px"
        },
        {
          field: "CrossLength",
          title: "طول معبر",
          width: "120px"
        },
        {
          field: "DigLenghtExcess",
          title: "طول مازاد حفاری",
          width: "180px"
        },
        {
          field: "TrenchesWidthExcess",
          title: "عرض مازاد ترانشه",
          width: "180px"
        },
        {
          field: "CI_DigRepeat",
          title: "ضریب تکرار حفاری",
          editor: "combo",
          domain: "Dig",
          width: "180px"
        },
        {
          field: "CavalryWidth",
          title: "عرض محل حفاری ",
          width: "180px"
        },
        { field: "Description", title: "توضیحات", width: "300px" }
      ],
      showRegionPrice: true

    }
  }
}
</script>
