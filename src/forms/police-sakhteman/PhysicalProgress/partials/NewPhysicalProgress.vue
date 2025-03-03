<template>
  <form-wrapper title="جزئیات پیشرفت فیزیکی">
    <template #header>
      <formHeaderByNosaziCode v-model="NosaziCode" @fetched="fetchData" />
    </template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-datepicker
            label="تاریخ وقوع"
            v-model="dataModel.PhysicalProggres.DateOcc"
            m="r"
            cdcName="DateOcc"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="متراژ عرصه"
            v-model="dataModel.PhysicalProggres.AreaArena"
            cdcName="AreaArena"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد نوسازی"
            v-model="dataModel.PhysicalProggres.BizCode"
            m="r"
            cdcName="BizCode"
          />
        </FormControl>
      </FormRow>
      <safa-tabs v-model="activeTab" :padding="false">
        <template v-slot:tabs>
          <tab-menu name="FoundationData" label="اطلاعات زیربنایی وضع موجود" />
          <tab-menu
            name="AllPhysicalProgress"
            label="پیشرفت فیزیکی کل هر طبقه"
          />
        </template>
        <tab-content name="FoundationData" title="اطلاعات زیربنایی وضع موجود">
          <safa-grid
            helper="foundationData"
            fit
            paginate
            min-height="150px"
            height="100%"
            max-height="100%"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
            v-model="dataModel.PhysicalProggress_FoundationList"
            m="e"
            cdcName="PhysicalProggress_FoundationList"
          />
        </tab-content>
        <tab-content
          name="AllPhysicalProgress"
          title="پیشرفت فیزیکی کل هر طبقه"
        >
          <safa-datatable
            helper="allPhysicalProgress"
            fit
            paginate
            min-height="150px"
            height="100%"
            max-height="100%"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
            v-model="dataModel.PhysicalProggress_ActivityList"
            m="e"
            cdcName="allPhysicalProgress"
          />
        </tab-content>
      </safa-tabs>
    </fit>
    <template #footer>
      <btn-default label="گزارش" class="q-mr-sm" @click="showReport" />
      <btn-default label="ذخیره" @click="saveObj" />
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      activeTab: "FoundationData",
      NosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  mounted () {
    this.$stKartable.dispatch("setSelectedRequest", null)
  },
  props: {
    dataModel: Object
  },
  methods: {
    fetchData () {
      this.$emit("fetch", this.NosaziCode)
    },
    saveObj () {
      this.$emit("saveObj")
    },
    showReport () {
      this.$emit("showReport")
    }
  }
}
</script>
