<template>
  <fit>
    <!-- برای صدرا -->
    <safa-securityPanel
      caption="پیش آمدگی ها"
      style="height: 100%"
      id="ab142de8-fca6-4300-b9a5-b80d883fcb86"
    >
      <safa-grid
        v-model="value.Base_Front"
        :columns="columns"
        cdcName="Base_Front"
        :allow-copy="true"
        :copy-with-count="true"
        :m="m"
        height="100%"
        max-height="100%"
        min-height="100px"
        ref="grid2"
        title="پیش آمدگی ها"
        :filterable="true"
        @row-click="click"
      />
    </safa-securityPanel>
    <!-- برای شهرهای دیگه  -->
    <safa-securityPanel
      caption="پیش آمدگی ها"
      style="height: 100%"
      v-sp-else
      id="ab142de8-fca6-4300-b9a5-b80d883fcb86"
    >
      <safa-grid
        v-model="value.Base_Front"
        helper="principalAgreementEvent"
        cdcName="Base_Front"
        :allow-copy="true"
        :add-row="false"
        :copy-with-count="false"
        :m="m"
        height="100%"
        max-height="100%"
        min-height="100px"
        ref="grid2"
        title="پیش آمدگی ها"
        :filterable="true"
        @row-click="click"
      />
    </safa-securityPanel>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      selectedUser: null,
      copyCount: 0,
      columns: [
        {
          field: "BuildingNo",
          width: "150px",
          editor: "numeric",
          title: "شماره ساختمان "
        },
        {
          field: "FloorNo",
          editor: "numeric",
          title: " شماره طبقه",
          width: "100px"
        },
        {
          field: "FrontArea",
          editor: "numeric",
          cell: "grid-area-format",
          width: "150px",
          title: "مساحت پيش آمدگي"
        },
        {
          field: "FrontHeight",
          editor: "numeric",
          title: "ارتفاع",
          width: "100px"
        },
        {
          field: "FrontWidth",
          editor: "numeric",
          title: "عرض",
          width: "100px"
        },
        {
          field: "FrontLength",
          editor: "numeric",
          title: "طول",
          width: "100px"
        },
        {
          field: "FrontDepth",
          editor: "numeric",
          title: "عمق",
          width: "100px"
        },
        {
          field: "CI_SideCode",
          title: "جهت معبر",
          editor: "combo",
          width: "130px",
          domain: "CI_SaraM1"
        },
        {
          field: "CI_UsingGroup",
          domain: "CI_SaraM1",
          title: "کاربری اصلی",
          width: 140,
          triggerCells: [["CI_UsingType"]],
          filter: "agMultiColumnFilter"
        },
        {
          field: "CI_UsingType",
          title: "نوع استفاده فرعی",
          width: 150,
          ignoreCi: true,
          editor: "ADPGridTemplate",
          params: {
            serviceUrl: "GetCI_UsingType_FromCI_UsingGroup",
            responseKey: "CI_UsingType_FromCI_UsingGroup",
            paramName: "pCI_UsingGroup",
            groupField: "CI_UsingGroup"
          },
          filter: "agMultiColumnFilter"
        },
        {
          field: "CI_FrontIs",
          title: "چگونگي پيش آمدگي",
          width: "160px",
          editor: "combo",
          domain: "CI_SaraM1"
        },
        {
          field: "CI_FrontPlace",
          title: "محل وقوع پيش آمدگي",
          width: "160px",
          editor: "combo",
          domain: "CI_SaraM1"
        },
        {
          field: "CI_RoofType",
          title: "نوع سقف",
          editor: "combo",
          width: "110px",
          domain: "CI_SaraM1"
        },
        {
          field: "CI_FrontRoofStatus",
          title: "وضعيت سقف پيش آمدگي",
          editor: "combo",
          width: "160px",
          domain: "CI_SaraM1"
        },
        {
          field: "CI_FrontType",
          title: "نوع پيش آمدگي",
          editor: "combo",
          width: "110px",
          domain: "CI_SaraM1"
        },
        {
          field: "CI_FrontStatus",
          title: "وضعیت پيش آمدگي",
          editor: "combo",
          domain: "CI_SaraM1"
        },
        {
          field: "CI_BuildingStep",
          title: "مرحله ساختماني",
          width: "160px",
          editor: "combo",
          domain: "CI_SaraM1"
        },
        {
          field: "UnitNo",
          editor: "numeric",
          width: "100px",
          title: "شماره واحد"
        },
        {
          field: "GenerateDate",
          title: "تاریخ احداث کاربری",
          width: "160px",
          editor: "date"
        },
        {
          field: "ConversionDate",
          title: "تاریخ تبدیل",
          width: "160px",
          editor: "date"
        },
        {
          field: "CreateYearFrom",
          title: "قدمت ساختمان از",
          width: "160px",
          editor: "numeric"
        },
        {
          field: "CreateYearTo",
          title: "قدمت ساختمان تا",
          width: "160px",
          editor: "numeric"
        }
      ]
    }
  },
  props: {
    value: Object,
    m: String
  },
  methods: {
    click (dataItem) {
      this.selectedUser = dataItem
    }
  }
}
</script>
