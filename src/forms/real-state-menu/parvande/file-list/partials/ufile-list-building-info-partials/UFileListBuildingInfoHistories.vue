<template>
  <fit>
    <safa-splitter v-model="splitterValueHorizontal" horizontal>
      <template v-slot:before>
        <fit>
          <safa-grid
            title="شماره سند ملک"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
            v-model="value.Base_HouseDoc"
            helper="melkDocumentNumberColumns"
            :m="m"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter v-model="splitterValueVerticalR" vertical>
            <template v-slot:before>
              <safa-splitter v-model="splitterValueVerticalL" vertical>
                <template v-slot:before>
                  <fit>
                    <safa-grid
                      title="اشتراکات"
                      fit
                      min-height="100px"
                      height="100%"
                      max-height="100%"
                      v-model="value.Base_SubScription"
                      helper="SharedsColumns"
                      :m="m"
                      :showRowNumber="false"
                      :show-selected-checkbox="false"
                      :allowMultipleSelection="false"
                    />
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <safa-grid
                      title="سوابق شهرسازی"
                      fit
                      min-height="100px"
                      height="100%"
                      max-height="100%"
                      v-model="value.Base_ShahrsaziArchive"
                      :columns="shahrSaziHistoryColumns"
                      :m="m"
                      :showRowNumber="false"
                      :show-selected-checkbox="false"
                      :allowMultipleSelection="false"
                    />
                  </fit>
                </template>
              </safa-splitter>
            </template>
            <template v-slot:after>
              <fit>
                <safa-grid
                  title="سوابق کمیسیون ها"
                  fit
                  min-height="100px"
                  height="100%"
                  max-height="100%"
                  v-model="value.Base_CommissionHistory"
                  helper="commissionHistoryColumns"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  },

  data () {
    return {
      name: "Histories",

      shahrSaziHistoryColumns: [
        {
          field: "CI_ShahrsaziArchiveKind",
          title: "نوع سوابق شهرسازی",
          cell: "grid-combo",
          editor: "combo",
          width: 180,
          sortable: true,
          domain: "Estate"
        },
        {
          field: "CI_LicenceExportationRefrence",
          title: "مرجع صدور مجوز",
          cell: "grid-combo",
          editor: "combo",
          width: 180,
          domain: "Estate"
        },
        {
          field: "CI_LicenceExportationRefrence",
          title: "مرجع صدور مجوز",
          cell: "grid-combo",
          editor: "combo",
          width: 180,
          domain: "Estate"
        },
        {
          field: "CertificateNo",
          title: "شماره گواهی",
          width: 130
        },
        {
          field: "CertificateDate",
          editor: "date",
          width: 130,
          title: "تاریخ گواهی"
        },
        { field: 'IsValid', title: "آیا معتبر است؟", editor: 'checkbox', width: '100px' },
        {
          field: "CreditDate",
          editor: "date",
          width: 130,
          title: "تاریخ اعتبار"
        },
        { field: "Comments", title: "توضیحات", width: 180 }
      ],
      // splitter
      horizontalSplitterModel: 50,
      VerticalSplitterModel: 50,
      splitterValueHorizontal: 40,
      splitterValueVerticalR: 67,
      splitterValueVerticalL: 50
    }
  }
}
</script>
