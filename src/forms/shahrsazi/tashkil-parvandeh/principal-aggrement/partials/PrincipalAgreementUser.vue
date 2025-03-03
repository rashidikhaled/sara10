<template>
  <fit>
    <!-- برای صدرا -->
    <safa-securityPanel
      caption="کاربری ها"
      style="height: 100%"
      id="98B5C4DA-995E-4E12-94FA-96920E690036"
    >
      <safa-grid
        title="کاربری ها"
        :columns="columnsUsing"
        ref="grid2"
        v-model="value.Base_Using"
        cdcName="Base_Using"
        height="100%"
        max-height="100%"
        :m="m"
        :filterable="true"
        @row-click="click"
        fit
      />
    </safa-securityPanel>
    <!-- برای شهرهای دیگه  -->
    <safa-securityPanel
      caption="کاربری ها"
      style="height: 100%"
      v-sp-else
      id="98B5C4DA-995E-4E12-94FA-96920E690036"
    >
      <safa-grid
        title="کاربری ها"
        :columns="columns"
        ref="grid2"
        v-model="value.Base_Using"
        cdcName="Base_Using"
        height="100%"
        max-height="100%"
        :m="m"
        :filterable="true"
        :add-row="false"
        :allow-copy="true"
        @row-click="click"
        fit
      />
    </safa-securityPanel>
  </fit>
</template>

<script>
import messageMixin from "src/mixins/messageMixin"
export default {
  mixins: [messageMixin],
  props: {
    value: Object,
    m: String
  },
  data: function () {
    return {
      // disableBtn: true,
      selectedUser: null,
      copyCount: 0
    }
  },
  computed: {
    columns () {
      return [
        {
          field: "isSelectedNode",
          title: "",
          width: "74px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          editor: "selection"
        },
        {
          field: "BuildingNo",
          title: "شماره ساختمان",
          editor: "numeric",
          width: "100px",
          editable: false
        },
        {
          field: "FloorNo",
          editor: "numeric",
          title: "طبقه",
          width: "100px",
          editable: false
        },
        // {
        //     "field": "CI_UsingGroup",
        //     "title": "کاربری اصلی / نوع استفاده فرعی",
        //     "label": "کاربری اصلی / نوع استفاده فرعی",
        //     "cell": "UsingGroupTemplate",
        //     "width": "550px",
        //     "options": {
        //         "serviceUrl": "GetCI_UsingType_FromCI_UsingGroup",
        //         "responseKey": "CI_UsingType_FromCI_UsingGroup",
        //         "paramName": "pCI_UsingGroup",
        //         "from": {
        //             "domainName": "CI_SaraM1",
        //             "ciName": "CI_UsingGroup",
        //             "field": "CI_UsingGroup"
        //         },
        //         "to": {
        //             "field": "CI_UsingType"
        //         }
        //     },
        //     "editable": false
        // },
        {
          field: "CI_UsingGroup",
          domain: "CI_SaraM1",
          title: "کاربری اصلی",
          width: 140,
          triggerCells: [["CI_UsingType"]]
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
          }
        },
        {
          field: "UsingArea",
          title: "مساحت کاربری",
          width: "120px",
          editor: "decimal",
          editable: false
        },
        {
          field: "CI_UsingStatus",
          title: "وضعیت کاربری",
          domain: "CI_SaraM1",
          width: "140px",
          editable: false
        },
        {
          field: "UnitCount",
          editor: "numeric",
          title: "تعداد واحد",
          width: "150px",
          editable: false
        },
        {
          field: "CI_BuildingKind",
          title: "نوع ساختمان",
          domain: "CI_SaraM1",
          width: "140px",
          editable: false
        },
        {
          field: "CI_RoofType",
          title: "نوع سقف",
          domain: "CI_SaraM1",
          width: "150px",
          editable: false
        },
        {
          field: "CI_SazehType",
          title: "نوع سازه",
          domain: "CI_SaraM1",
          width: "150px",
          editable: false
        },
        {
          field: "CI_WallType",
          title: "جنس ديوار",
          domain: "CI_SaraM1",
          width: "150px",
          editable: false
        },
        {
          field: "CI_ViewCode",
          title: "نوع نما",
          domain: "CI_SaraM1",
          width: "150px",
          editable: false
        },
        {
          field: "CI_BuildingStep",
          title: "مرحله ساختماني",
          domain: "CI_SaraM1",
          width: "150px",
          editable: false
        },
        {
          field: "CI_BuildingType",
          title: "گروه ساختماني",
          domain: "CI_SaraM1",
          width: "150px",
          editable: false
        },
        {
          field: "CI_DutyYear",
          title: "تاریخ احداث کاربری",
          domain: "CI_SaraM1",
          editor: "date",
          width: "130px",
          editable: false
        },
        {
          field: "GenerateDate",
          title: "تاریخ احداث کاربری",
          width: "130px",
          editor: "date",
          editable: false
        },
        {
          field: "OverOnLengthNear",
          editor: "numeric",
          title: "احداث مازاد بر طول مجاورين",
          width: "200px",
          editable: false
        },
        {
          field: "UsefulHeight",
          title: "ارتفاع مفيد",
          editor: "numeric",
          width: "110px",
          editable: false
        },

        {
          field: "UnUsefulHeight",
          title: "ارتفاع کف تا کف",
          editor: "numeric",
          width: "110px",
          editable: false
        },
        {
          field: "CreateYearFrom",
          title: "قدمت ساختمان از",
          editor: "numeric",
          width: 110,
          editable: false
        },
        {
          field: "CreateYearTo",
          title: "قدمت ساختمان تا",
          editor: "numeric",
          width: "110px",
          editable: false
        },
        {
          field: "RoofThickness",
          title: "ضخامت سقف",
          editor: "numeric",
          width: "100px",
          editable: false
        },
        {
          field: "Dahaneh",
          title: "دهنه متوسط",
          editor: "numeric",
          width: "110px",
          editable: false
        },
        {
          field: "ProgressPercent",
          title: "درصد پيشرفت",
          editor: "percentage",
          width: "120px",
          editable: false
        },
        {
          field: "EditUsingArea",
          title: "مساحت تغيير کاربري",
          cell: "grid-area-format",
          width: 120,
          editable: false
        },
        {
          field: "UnitNo",
          title: "شماره واحد",
          editor: "numeric",
          width: "100px",
          editable: false
        },
        {
          field: "UsingDepth",
          title: "عمق کاربری",
          editor: "numeric",
          width: "100px",
          editable: false
        },
        {
          field: "Depth1No",
          title: "تعداد عمق اول",
          editor: "numeric",
          width: "110px",
          editable: false
        },
        {
          field: "Depth2No",
          editor: "numeric",
          title: "تعداد عمق دوم",
          width: "110px",
          editable: false
        },
        {
          field: "Depth3No",
          editor: "numeric",
          title: "تعداد عمق سوم",
          editable: false,
          width: "110px"
        },
        {
          field: "Depth1Area",
          cell: "grid-area-format",
          title: "مساحت عمق اول",
          editable: false,
          width: "110px"
        },
        {
          field: "Depth2Area",
          cell: "grid-area-format",
          title: "مساحت عمق دوم",
          editable: false,
          width: "110px"
        },
        {
          field: "Depth3Area",
          cell: "grid-area-format",
          title: "مساحت عمق سوم",
          editable: false,
          width: "110px"
        },
        {
          field: "CI_HowChangeBuilding",
          title: "وضعیت زیربنا",
          domain: "CI_SaraM1",
          editable: false,
          width: "110px"
        },
        {
          field: "OverOnArea",
          editor: "numeric",
          title: "احداث مازاد بر سطح",
          width: "120px",
          editable: false
        },
        {
          field: "BusyArea",
          editor: "numeric",
          title: "سطح اشغال",
          editable: false,
          width: "100px"
        },
        {
          field: "OverOnTarakom",
          editor: "numeric",
          title: "احداث مازاد بر تراکم",
          editable: false,
          width: "120px"
        },
        {
          field: "OverOnLengthNear",
          editor: "numeric",
          title: "احداث مازاد بر طول مجاورین",
          width: "200px",
          editable: false
        },
        {
          field: "OverOrNoParvaneh",
          editor: "numeric",
          title: "احداث مازاد يا بدون پروانه",
          width: "200px",
          editable: false
        },
        {
          field: "IllegalInfrastructure",
          editor: "numeric",
          title: "زیربنای غیر مجاز در معبر",
          width: "200px",
          editable: false
        },
        {
          field: "MassDistance_Main",
          editor: "numeric",
          title: "فاصله جرم گذاری اصلی",
          width: "200px",
          editable: false
        },
        {
          field: "MassDistance_Sub",
          editor: "numeric",
          title: "فاصله جرم گذاری فرعی",
          width: "200px",
          editable: false
        },
        {
          field: "ConversionDate",
          editor: "numeric",
          title: "سال تبدیل",
          editable: false,
          width: "90px"
        },
        {
          field: "ConversionDate",
          title: "تاریخ تبدیل",
          editor: "date",
          editable: false,
          width: "90px"
        },
        {
          field: "CI_UsingPlace",
          title: "محل وقوع",
          domain: "CI_SaraM1",
          editable: false,
          width: "90px"
        },
        {
          field: "CI_Repair",
          title: "نوع تعمیرات",
          domain: "CI_SaraM1",
          editable: false,
          width: "90px"
        },
        {
          field: "RepairArea",
          cell: "grid-area-format",
          title: "مساحت تعمیرات",
          editable: false,
          width: "90px"
        }
      ]
    },
    columnsUsing () {
      return [
        {
          field: "isSelectedNode",
          title: "",
          width: "74px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          editor: "selection"
        },
        {
          field: "BuildingNo",
          title: "شماره ساختمان",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "FloorNo",
          editor: "numeric",
          title: "طبقه",
          width: "100px"
        },
        // {
        //     "field": "CI_UsingGroup",
        //     "title": "کاربری اصلی / نوع استفاده فرعی",
        //     "label": "کاربری اصلی / نوع استفاده فرعی",
        //     "cell": "UsingGroupTemplate",
        //     "width": "550px",
        //     "options": {
        //         "serviceUrl": "GetCI_UsingType_FromCI_UsingGroup",
        //         "responseKey": "CI_UsingType_FromCI_UsingGroup",
        //         "paramName": "pCI_UsingGroup",
        //         "from": {
        //             "domainName": "CI_SaraM1",
        //             "ciName": "CI_UsingGroup",
        //             "field": "CI_UsingGroup"
        //         },
        //         "to": {
        //             "field": "CI_UsingType"
        //         }
        //     },
        //
        // },
        {
          field: "CI_UsingGroup",
          domain: "CI_SaraM1",
          title: "کاربری اصلی",
          width: 140,
          triggerCells: [["CI_UsingType"]]
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
          }
        },
        {
          field: "UsingArea",
          title: "مساحت کاربری",
          width: "120px",
          editor: "decimal"
        },
        {
          field: "CI_UsingStatus",
          title: "وضعیت کاربری",
          domain: "CI_SaraM1",
          width: "140px"
        },
        {
          field: "UnitCount",
          editor: "numeric",
          title: "تعداد واحد",
          width: "150px"
        },
        {
          field: "CI_BuildingKind",
          title: "نوع ساختمان",
          domain: "CI_SaraM1",
          width: "140px"
        },
        {
          field: "CI_RoofType",
          title: "نوع سقف",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "CI_SazehType",
          title: "نوع سازه",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "CI_WallType",
          title: "جنس ديوار",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "CI_ViewCode",
          title: "نوع نما",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "CI_BuildingStep",
          title: "مرحله ساختماني",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "CI_BuildingType",
          title: "گروه ساختماني",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "CI_DutyYear",
          title: "تاریخ احداث کاربری",
          domain: "CI_SaraM1",
          editor: "date",
          width: "130px"
        },
        {
          field: "GenerateDate",
          title: "تاریخ احداث کاربری",
          width: "130px",
          editor: "date"
        },
        {
          field: "OverOnLengthNear",
          editor: "numeric",
          title: "احداث مازاد بر طول مجاورين",
          width: "200px"
        },
        {
          field: "UsefulHeight",
          title: "ارتفاع مفيد",
          editor: "numeric",
          width: "110px"
        },

        {
          field: "UnUsefulHeight",
          title: "ارتفاع کف تا کف",
          editor: "numeric",
          width: "110px"
        },
        {
          field: "CreateYearFrom",
          title: "قدمت ساختمان از",
          editor: "numeric",
          width: 110
        },
        {
          field: "CreateYearTo",
          title: "قدمت ساختمان تا",
          editor: "numeric",
          width: "110px"
        },
        {
          field: "RoofThickness",
          title: "ضخامت سقف",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "Dahaneh",
          title: "دهنه متوسط",
          editor: "numeric",
          width: "110px"
        },
        {
          field: "ProgressPercent",
          title: "درصد پيشرفت",
          editor: "percentage",
          width: "120px"
        },
        {
          field: "EditUsingArea",
          title: "مساحت تغيير کاربري",
          cell: "grid-area-format",
          width: 120
        },
        {
          field: "UnitNo",
          title: "شماره واحد",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "UsingDepth",
          title: "عمق کاربری",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "Depth1No",
          title: "تعداد عمق اول",
          editor: "numeric",
          width: "110px"
        },
        {
          field: "Depth2No",
          editor: "numeric",
          title: "تعداد عمق دوم",
          width: "110px"
        },
        {
          field: "Depth3No",
          editor: "numeric",
          title: "تعداد عمق سوم",
          width: "110px"
        },
        {
          field: "Depth1Area",
          cell: "grid-area-format",
          title: "مساحت عمق اول",
          width: "110px"
        },
        {
          field: "Depth2Area",
          cell: "grid-area-format",
          title: "مساحت عمق دوم",
          width: "110px"
        },
        {
          field: "Depth3Area",
          cell: "grid-area-format",
          title: "مساحت عمق سوم",
          width: "110px"
        },
        {
          field: "CI_HowChangeBuilding",
          title: "وضعیت زیربنا",
          domain: "CI_SaraM1",
          width: "110px"
        },
        {
          field: "OverOnArea",
          editor: "numeric",
          title: "احداث مازاد بر سطح",
          width: "120px"
        },
        {
          field: "BusyArea",
          editor: "numeric",
          title: "سطح اشغال",
          width: "100px"
        },
        {
          field: "OverOnTarakom",
          editor: "numeric",
          title: "احداث مازاد بر تراکم",
          width: "120px"
        },
        {
          field: "OverOnLengthNear",
          editor: "numeric",
          title: "احداث مازاد بر طول مجاورین",
          width: "200px"
        },
        {
          field: "OverOrNoParvaneh",
          editor: "numeric",
          title: "احداث مازاد يا بدون پروانه",
          width: "200px"
        },
        {
          field: "IllegalInfrastructure",
          editor: "numeric",
          title: "زیربنای غیر مجاز در معبر",
          width: "200px"
        },
        {
          field: "MassDistance_Main",
          editor: "numeric",
          title: "فاصله جرم گذاری اصلی",
          width: "200px"
        },
        {
          field: "MassDistance_Sub",
          editor: "numeric",
          title: "فاصله جرم گذاری فرعی",
          width: "200px"
        },
        {
          field: "ConversionDate",
          editor: "numeric",
          title: "سال تبدیل",
          width: "90px"
        },
        {
          field: "ConversionDate",
          title: "تاریخ تبدیل",
          editor: "date",
          width: "90px"
        },
        {
          field: "CI_UsingPlace",
          title: "محل وقوع",
          domain: "CI_SaraM1",
          width: "90px"
        },
        {
          field: "CI_Repair",
          title: "نوع تعمیرات",
          domain: "CI_SaraM1",
          width: "90px"
        },
        {
          field: "RepairArea",
          cell: "grid-area-format",
          title: "مساحت تعمیرات",
          width: "90px"
        }
      ]
    }
  },
  // mounted () {
  //   if (this.m === 'e') {
  //     this.disableBtn = false
  //   } else {
  //     this.disableBtn = true
  //   }
  // },
  // watch: {
  //   m () {
  //     if (this.m === 'e') {
  //       this.disableBtn = false
  //     } else {
  //       this.disableBtn = true
  //     }
  //   }
  // },
  methods: {
    click (dataItem) {
      // debugger
      this.selectedUser = dataItem
    },
    copyRow () {
      // debugger
      if (this.selectedUser === null) {
        this.showError("لطفا یک ردیف از کاربری انتخاب نمایید")
      } else if (this.selectedUser !== null && this.copyCount === 0) {
        this.showError("لطفا تعداد ایجاد ردیف های مشابه را وارد نمایید.")
      } else {
        for (let i = 0; i < this.copyCount; i++) {
          this.value.Base_Using.push(this.selectedUser)
        }
      }
    }
  }
}
</script>
