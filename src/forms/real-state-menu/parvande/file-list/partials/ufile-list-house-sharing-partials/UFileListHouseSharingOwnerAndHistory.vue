<template>
  <fit>
    <safa-splitter v-model="splitterValueHorizontal" horizontal>
      <template v-slot:before>
          <safa-grid
            title="مالکین"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            :columns="ownersColumn"
            fit
            min-height="150px"
            height="100%"
            max-height="100%"
            :m="m"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter v-model="splitterValueVerticalRight" vertical>
            <template v-slot:before>
                <safa-grid
                  title="اشتراکات"
                  v-model="value.Base_SubScription"
                  cdcName="Base_SubScription"
                  :columns="sharingColumn"
                  fit
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
            </template>
            <template v-slot-after>
              <fit>
                <safa-splitter v-model="splitterValueVerticalMiddle" vertical>
                  <template v-slot:before>
                      <safa-grid
                        title="سوابق شهرسازی"
                        v-model="value.Base_ShahrsaziArchive"
                        cdcName="Base_ShahrsaziArchive"
                        :columns="shahrsaziRecordsColumn"
                        fit
                        min-height="150px"
                        height="100%"
                        max-height="100%"
                        :m="m"
                        :showRowNumber="false"
                        :show-selected-checkbox="false"
                        :allowMultipleSelection="false"
                      />
                  </template>
                  <template v-slot:after>
                      <safa-grid
                        title="سوابق کمیسیون ها"
                        v-model="value.Base_CommissionHistory"
                        cdcName="Base_CommissionHistory"
                        :columns="commisionsRecordsColumn"
                        fit
                        min-height="150px"
                        height="100%"
                        max-height="100%"
                        :m="m"
                        :showRowNumber="false"
                        :show-selected-checkbox="false"
                        :allowMultipleSelection="false"
                      />
                  </template>
                </safa-splitter>
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
      splitterValueHorizontal: 50,
      splitterValueVerticalRight: 50,
      splitterValueVerticalMiddle: 50,
      ownersColumn: [
        { field: "", title: "شخصیت", width: "" },
        { field: "OwnerName", title: "نام مالک", width: "" },
        {
          field: "OwnerLastName",
          title: "نام خانوادگی/شخصیت حقوقی",
          width: ""
        },
        { field: "OwnerFatherName", title: "نام پدر/کد سازمانی", width: "" },
        { field: "IDCardNo", title: "شماره شناسنامه/شماره ثبت", width: "" },
        { field: "OwnerBirthDate", title: "تاریخ تولد", width: "", editor: "date" },
        { field: "Telephone", title: "تلفن", width: "" },
        { field: "PostCode", title: "ک پستی", width: "" },
        { field: "EconomicCode", title: "کد اقتصادی", width: "" },
        { field: "ToftImpart", title: "سهم عرصه", width: "" },
        { field: "ToftDang", title: "دانگ عرصه", width: "" },
        { field: "ToftHabeh", title: "حبه عرصه", width: "" },
        { field: "AyanImpart", title: "سهم اعیان", width: "" },
        { field: "AyanDang", title: "دانگ اعیان", width: "" },
        { field: "AyanHabeh", title: "حبه اعیان", width: "" },
        { field: "NationalCode", title: "کد ملی", width: "" },
        { field: "AccountNo", title: "شماره حساب", width: "" },
        { field: "BranchCode", title: "کد شعبه", width: "" },
        { field: "ShabaCode", title: "شماره شبا", width: "" },
        {
          field: "CI_BankName",
          editor: "combo",
          domain: "Estate",
          title: "نام بانک",
          width: ""
        },
        { field: "Address", title: "آدرس", width: "" },
        { field: "EmissionPlace", title: "محل صدور", width: "" },
        { field: "ToftTotalImpart", title: "سهم کل از عرصه", width: "" },
        { field: "AyanTotalImpart", title: "سهم کل از اعیان", width: "" },
        { field: "CellPhone", title: "تلفن همراه", width: "" },
        { field: "DocNo", title: "شماره سند", width: "" },
        { field: "Comments", title: "توضیحات", width: "" }
      ],
      sharingColumn: [
        {
          field: "CI_SubScriptionType",
          editor: "combo",
          domain: "Estate",
          title: "نوع اشتراک",
          width: ""
        },
        {
          field: "CI_SubScriptionStatus",
          editor: "combo",
          domain: "Estate",
          title: "وضعیت اشتراک",
          width: ""
        },
        {
          field: "CI_SubScriptionUsingType",
          editor: "combo",
          domain: "Estate",
          title: "نحوه برخورداری",
          width: ""
        },
        { field: "SubScriptionVal", title: "شماره اشتراک", width: "" },
        { field: "Ampere", title: "آمپر", width: "" },
        { field: "Phase", title: "فاز", width: "" }
      ],
      shahrsaziRecordsColumn: [
        {
          field: "CI_ShahrsaziArchiveKind",
          editor: "combo",
          domain: "Estate",
          title: "نوع سوابق شهرسازی",
          width: ""
        },
        {
          field: "CI_LicenceExportationRefrence",
          editor: "combo",
          domain: "Estate",
          title: "مرجع صدور مجوز",
          width: ""
        },
        { field: "CertificateNo", title: "شماره گواهی", width: "" },
        { field: "CertificateDate", title: "تاریخ گواهی", width: "", editor: "date" },
        {
          field: "IsValid",
          title: "آیا معتبر است؟",
          editor: "checkbox",
          width: ""
        },
        { field: "CreditDate", title: "تاریخ اعتبار", width: "", editor: "date" },
        { field: "Comments", title: "توضیحات", width: "" }
      ],
      commisionsRecordsColumn: [
        {
          field: "CI_Commission",
          editor: "combo",
          domain: "Estate",
          title: "نوع کمیسیون",
          width: ""
        },
        {
          field: "CI_VoteType",
          editor: "combo",
          domain: "Estate",
          title: "نوع رای",
          width: ""
        },
        {
          field: "CI_VoteStatus",
          editor: "combo",
          domain: "Estate",
          title: "وضعیت رای",
          width: ""
        },
        { field: "VoteNo", title: "شماره رای", width: "" },
        { field: "VoteDate", title: "تاریخ رای", width: "", editor: "date" },
        { field: "SendNo", title: "شماره ارسال", width: "" },
        { field: "SendDate", title: "تاریخ ارسال", width: "", editor: "date" }
      ]
    }
  }
}
</script>
