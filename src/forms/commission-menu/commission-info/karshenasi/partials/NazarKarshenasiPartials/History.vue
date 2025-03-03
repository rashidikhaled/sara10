<template>
  <fit>

        <safa-grid
          :addRow="false"
          :allowCopy="false"
          :deleteRow="false"
          :masterDetail="true"
          :detailCellRendererParams="detailCellRendererParams"
          :allowSelectionWhenReadonlyMode="true"
          height="100%"
          max-height="100%"
          min-height="200px"
          title="تاریخچه عودت"
          :allowMultipleSelection="false"
          :checkboxSelection="false"

          :columns="historyKarshenasi"
          v-model="Commission_Relapse"
          cdcName="Commission_Relapse"
        />
  </fit>
</template>
<script>

export default {
  props: {
    Commission_Relapse: Array,
    CommissionTrepass_HistoryRelapse: Array
  },
  data () {
    return {
      detailCellRendererParams: {
        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          // rowSelection: 'multiple',
          // suppressRowClickSelection: true,
          // enableRangeSelection: true,
          pagination: true,
          detailRowAutoHeight: true,
          detailRowHeight: 400,
          // paginationAutoPageSize: true,
          defaultColDef: {
            sortable: true,
            flex: 1
          },
          columnDefs: [
            { field: "TitleOld", title: "تخلف", width: "180px" },
            {
              field: "CI_Years",
              title: "سال تخلف",
              width: "180px"
            },
            {
              field: "TrepassValue",
              title: "مقدار تخلف",
              width: "180px"
            },
            {
              field: "CalculationPrice",
              title: "قیمت محاسباتی",
              width: "180px"
            },
            {
              field: "MinPenalty",
              title: "حداقل جریمه",
              width: "180px",
              cell: "grid-money-format"
            },
            {
              field: "MaxPenalty",
              title: "حداکثر جریمه",
              width: "180px",
              cell: "grid-money-format"
            },
            {
              field: "CI_UsingType",
              title: "کاربری فرعی موجود",
              editor: 'combo',
              width: '150px',
              domain: 'CI_SaraM1'
            },
            {
              field: "Floor",
              title: "طبقه",
              width: "180px"
            },
            {
              field: "UsingTitle",
              title: "گروه کاربری فرعی",
              width: "180px",
              editor: 'combo',
              domain: 'Commission100'
            },
            {
              field: "CI_UsingTypeGroupMojaz",
              title: "گروه کاربری اصلی مجاز",
              width: "180px",
              editor: 'combo',
              domain: 'Commission100'
            },
            {
              field: "CI_UsingGroup",
              title: "گروه کاربری اصلی موجود",
              width: "180px",
              editor: 'combo',
              domain: 'Commission100'
            },
            {
              field: "TrespassDateInMunicipality",
              title: "تاریخ وقوع تخلف از نظر شهرداری",
              width: "220px"
            },
            {
              field: "TrespassDateInEngineer",
              title: "تاریخ وقوع تخلف از نظر مهندس ناظر",
              width: "220px"
            },
            {
              field: "TrespassDateHappendNotMelak",
              title: "تاریخ وقوع خلاف ملاک عمل",
              width: "180px"
            },
            {
              field: "P",
              title: "P",
              width: "180px"
            },
            {
              field: "K",
              title: "ارزش معاملاتی طبق تبصره 11 ماده صد(k)",
              width: "240px"
            },
            {
              field: "KCoeffiecient",
              title: "ضریب ارزش معاملاتی طبق تبصره 11 ماده صد(k)",
              width: "240px"
            },
            {
              field: "UrbanIdia",
              title: "تقاضای شهردار",
              width: "180px"
            }

          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: (params) => {
          setTimeout(() => {
            if (params.data) {
              let logDetail = this.CommissionTrepass_HistoryRelapse.filter(x => x.NidCommission === params.data.NidCommission) || []
              params.successCallback(logDetail)
            }
          }, 1000)
        }
      },
      historyKarshenasi: [
        { field: "CommentsExpert", title: "نظر کارشناس", width: "180px", cellRenderer: "agGroupCellRenderer" },
        { field: "SecretariatNo", title: "شماره دبیرخانه", width: "120px" },
        { field: "CI_RelapseType", title: "نوع عودت", width: "140px", editor: 'combo', domain: 'Commission100' },
        { field: "RelapseDate", title: "تاریخ عودت", width: "100px" },
        { field: "RelapseTime", title: "زمان عودت", width: "100px" },
        { field: "UserNameDone", title: "کاربر انجام دهنده", width: "180px" },
        { field: "RelapseComments", title: "توضیحات", width: "300px" }
      ]
    }
  }
}
</script>
