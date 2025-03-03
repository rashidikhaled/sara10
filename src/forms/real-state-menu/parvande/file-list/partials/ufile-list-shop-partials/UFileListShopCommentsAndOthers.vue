<template>
  <fit>
    <safa-splitter v-model="splitterValueHorizontalOuter" horizontal>
      <template v-slot:before>
        <fit>
          <safa-splitter v-model="splitterValueHorizontalInner" horizontal>
            <template v-slot:before>
              <safa-splitter v-model="splitterValueVerticalR" vertical>
                <template v-slot:before>
                  <fit>
                    <safa-datatable
                      title="گواهی های شهرداری"
                      fit
                      min-height="100px"
                      height="100%"
                      max-height="100%"
                      v-model="value.Base_ShahrsaziArchive"
                      :columns="Base_ShahrsaziArchiveColumns"
                      :m="m"
                      :showRowNumber="false"
                      :show-selected-checkbox="false"
                      :allowMultipleSelection="false"
                    />
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <safa-datatable
                      title="نوع تاسیسات"
                      fit
                      min-height="100px"
                      height="100%"
                      max-height="100%"
                      v-model="value.Base_Installation"
                      :columns="Base_InstallationColumns"
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
                <safa-splitter v-model="splitterValueVerticalL" vertical>
                  <template v-slot:before>
                    <fit>
                      <safa-datatable
                        title="سند های ملک"
                        fit
                        min-height="100px"
                        height="100%"
                        max-height="100%"
                        v-model="value.Base_HouseDoc"
                        :columns="Base_HouseDocColumns"
                        :m="m"
                        :showRowNumber="false"
                        :show-selected-checkbox="false"
                        :allowMultipleSelection="false"
                      />
                    </fit>
                  </template>
                  <template v-slot:after>
                    <fit>
                      <safa-datatable
                        title="سایر امکانات"
                        fit
                        min-height="100px"
                        height="100%"
                        max-height="100%"
                        v-model="value.Base_OtherEquipment"
                        :columns="Base_OtherEquipmentColumns"
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
      <template v-slot:after>
        <fit>
          <text-template
            v-model="value.Base_CommonEstate.Comments"
            label="توضیحات"
            label-width="73px"
            fit
            :m="m"
            :rows="3"
          />
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
      // splitter
      splitterValueHorizontalOuter: 70,
      splitterValueHorizontalInner: 50,
      splitterValueVerticalR: 50,
      splitterValueVerticalL: 50,

      // columns:
      Base_ShahrsaziArchiveColumns: [
        {
          title: "نوع سوابق شهرسازی",
          field: "CI_ShahrsaziArchiveKind",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "مرجع صدور مجوز",
          field: "CI_LicenceExportationRefrence",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "شماره گواهی",
          field: "CertificateNo",
          width: "80px"
        },
        {
          title: "تاریخ گواهی",
          field: "CertificateDate"
        },
        {
          title: "آیا معتبر است؟",
          field: "IsValid",
          editor: "checkbox"
        },
        {
          title: "تاریخ اعتبار",
          field: "CreditDate"
        },
        {
          title: "توضیحات",
          field: "Comments"
        }
      ],

      Base_InstallationColumns: [
        {
          title: "تاریخ اعتبار",
          field: "CreditDate"
        },
        {
          title: "توضیحات",
          field: "Comments"
        }
      ],

      Base_HouseDocColumns: [
        {
          title: "تاریخ اعتبار",
          field: "CreditDate"
        },
        {
          title: "توضیحات",
          field: "Comments"
        }
      ],

      Base_OtherEquipmentColumns: [
        {
          title: "تاریخ اعتبار",
          field: "CreditDate"
        },
        {
          title: "توضیحات",
          field: "Comments"
        }
      ]
    }
  }
}
</script>
