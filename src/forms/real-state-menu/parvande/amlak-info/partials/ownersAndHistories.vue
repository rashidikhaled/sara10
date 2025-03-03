<template>
  <fit>
    <safa-splitter v-model="splitterValueHorizontal" horizontal>
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="مالکین"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
            v-model="Owners"
            helper="OwnersColumns"
            :m="mode"
            :take="20"
            :addRow="false"
            :allowCopy="false"
            :deleteRow="false"
            :isEditable="true"
            class="q-mb-sm"
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
                    <safa-datatable
                      title="اشتراکات"
                      fit
                      min-height="100px"
                      height="100%"
                      max-height="100%"
                      v-model="Shareds"
                      helper="SharedsColumns"
                      :m="mode"
                      :take="20"
                      :addRow="false"
                      :allowCopy="false"
                      :deleteRow="false"
                      :isEditable="true"
                      class="q-mb-sm"
                    />
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <safa-datatable
                      title="سوابق شهرسازی"
                      fit
                      min-height="100px"
                      height="100%"
                      max-height="100%"
                      v-model="shahrSaziHistory"
                      helper="shahrSaziHistoryColumns"
                      :m="mode"
                      :take="20"
                      :addRow="false"
                      :allowCopy="false"
                      :deleteRow="false"
                      :isEditable="true"
                      class="q-mb-sm"
                    />
                  </fit>
                </template>
              </safa-splitter>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="سوابق کمیسیون ها"
                  fit
                  min-height="100px"
                  height="100%"
                  max-height="100%"
                  v-model="commissionHistory"
                  helper="commissionHistoryColumns"
                  :m="mode"
                  :take="20"
                  :addRow="false"
                  :allowCopy="false"
                  :deleteRow="false"
                  :isEditable="true"
                  class="q-mb-sm"
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
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "ownersAndHistories",
      horizontalSplitterModel: 50,
      VerticalSplitterModel: 50,
      splitterValueHorizontal: 50,
      splitterValueVerticalR: 50,
      splitterValueVerticalL: 50,
      Owners: [],
      OwnersColumns: [
        {
          field: "CI_OwnerCharacter",
          title: "شخصیت",
          editor: "combo",
          domain: "Estate",
          cell: "grid-combo"
        },
        { field: "OwnerName", title: "نام مالک" },
        { field: "OwnerLastName", title: "نام خانوادگی/شخصیت حقوقی" },
        { field: "OwnerFatherName", title: "نام پدر/کد سازمانی" },
        { field: "IDCardNo", title: "شماره شناسنامه/شماره ثبت" },
        { field: "OwnerBirthDate", title: "تاریخ تولد" },
        { field: "Telephone", title: "تلفن" },
        { field: "PostCode", title: "کد پستی" },
        { field: "EconomicCode", title: "کد اقتصادی" },
        { field: "ToftImpart", title: "سهم عرصه" },
        { field: "ToftDang", title: "دانگ عرصه" },
        { field: "ToftHabeh", title: "حبه عرصه" },
        { field: "AyanImpart", title: "سهم اعیان" },
        { field: "AyanDang", title: "دانگ اعیان" },
        { field: "AyanHabeh", title: "حبه اعیان" },
        { field: "NationalCode", title: "کد ملی" },
        { field: "AccountNo", title: "شماره حساب" },
        { field: "BranchCode", title: "کد شعبه" },
        { field: "ShabaCode", title: "شماره شبا" },
        {
          field: "CI_BankName",
          title: "نام بانک",
          editor: "combo",
          domain: "estate",
          cell: "grid-combo"
        },
        { field: "Address", title: "آدرس" },
        { field: "EmissionPlace", title: "محل صدور" },
        { field: "ToftTotalImpart", title: "سهم کل از عرصه" },
        { field: "AyanTotalImpart", title: "سهم کل از اعیان" },
        { field: "CellPhone", title: "تلفن همراه" },
        { field: "DocNo", title: "شماره سند" },
        { field: "Comments", title: "توضیحات" }
      ],

      Shareds: [],
      // SharedsColumns: [
      //   {
      //     field: "CI_SubScriptionType",
      //     title: "نوع اشتراک",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },

      //   {
      //     field: "CI_SubScriptionStatus",
      //     title: "وضعیت اشتراک",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_SubScriptionUsingType",
      //     title: "نحوه برخورداری",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   { field: "SubScriptionVal", title: "شماره اشتراک" },
      //   { field: "Ampere", title: "آمپر" },
      //   { field: "Phase", title: "فاز" },
      // ],

      shahrSaziHistory: [],
      // shahrSaziHistoryColumns: [
      //   {
      //     field: "CI_ShahrsaziArchiveKind",
      //     title: "نوع سوابق شهرسازی",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_LicenceExportationRefrence",
      //     title: "مرجع صدور مجوز",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   { field: "CertificateNo", title: "شماره گواهی" },
      //   { field: "CertificateDate", title: " تاریخ گواهی" },
      //   { field: "IsValid", title: "آیا معتبر است؟" },
      //   { field: "CreditDate", title: "تاریخ اعتبار" },
      //   { field: "Comments", title: "توضیحات", width: "100px" },
      // ],

      commissionHistory: []
      // commissionHistoryColumns: [
      //   {
      //     field: "CI_Commission",
      //     title: "نوع کمیسیون",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_VoteType",
      //     title: " نوع رای",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_VoteStatus",
      //     title: " وضعیت رای",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   { field: "VoteNo", title: "  شماره رای" },
      //   { field: "VoteDate", title: " تاریخ رای" },
      //   { field: "SendNo", title: "شماره ارسال" },
      //   { field: "SendDate", title: "تاریخ ارسال", width: "100px" },
      // ],
    }
  }
}
</script>
