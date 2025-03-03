<template>
  <fit>
    <!-- <safa-status :result="result" /> -->
    <fit>
      <safa-splitter class="fit" horizontal v-model="gridSplitter">
        <template v-slot:before>
          <fit>
            <safa-grid
              :columns="Owners_Fire"
              title="مالکین"
              fit
              height="100%"
              min-height="200px"
              max-height="100%"
              :m="m"
              :bordered="false"
              v-model="value.Base_Owner"
              cdcName="Base_Owner"
              :suppressRowClickSelection="false"
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-grid
              helper="ShahrdariHistory"
              title="سوابق شهرداری"
              fit
              height="100%"
              min-height="200px"
              max-height="100%"
              :m="m"
              v-model="value.Base_ShahrsaziArchive"
              cdcName="Base_ShahrsaziArchive"
              :suppressRowClickSelection="false"
            />
          </fit>
        </template>
      </safa-splitter>
    </fit>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  name: "OwnersAndHistory",
  mixins: [baseFormMixin],

  data () {
    return {
      gridSplitter: 50,
      // helper="Owners_Fire"
      Owners_Fire: [
        {
          field: "CI_OwnerCharacter",
          title: "شخصیت",
          width: 110,
          editor: "combo",
          domain: "Estate"
        },
        {
          field: "OwnerLastName",
          title: "نام خانوادگی",
          width: 120
        },
        {
          field: "OwnerName",
          title: "نام مالک",
          width: 100
        },
        {
          field: "OwnerFatherName",
          title: "نام پدر/کد سازمانی",
          width: 140
        },
        {
          field: "IDCardNo",
          title: "شماره شناسنامه/شماره ثبت",
          width: 180
        },
        {
          field: "EmissionPlace",
          title: "محل صدور",
          width: 100
        },
        {
          field: "NationalCode",
          title: "کد ملی",
          width: 100
        },
        {
          field: "Telephone",
          title: "تلفن",
          width: 100,
          params: {
            pattern: ["[0-9]", "فقط عدد قابل قبول میباشد"],
            type: "numeric"
          }
        },
        {
          field: "CellPhone",
          title: "شماره تلفن همراه",
          width: 140,
          params: {
            patterns: [
              ["^09/d{9}", "با 09 شروع شود"],
              ["/d{11}", "فقط عدد قابل قبول میباشد"]
            ],
            type: "numeric"
          }
        },
        {
          field: "DocNo",
          title: "شماره سند",
          width: 100
        },
        {
          field: "ToftImpart",
          title: "سهم عرصه",
          width: 100,
          editor: "decimal"
        },
        {
          field: "ToftDang",
          title: "دانگ عرصه",
          width: 100,
          editor: "decimal"
        },
        {
          field: "ToftHabeh",
          title: "حبه عرصه",
          width: 100,
          editor: "decimal"
        },
        {
          field: "AyanImpart",
          title: "سهم اعیان",
          width: 100,
          editor: "decimal"
        },
        {
          field: "AyanDang",
          title: "دانگ اعیان",
          width: 100,
          editor: "decimal"
        },
        {
          field: "AyanHabeh",
          title: "حبه اعیان",
          width: 100,
          editor: "decimal"
        },
        {
          field: "Address",
          title: "آدرس",
          width: 100
        },
        {
          field: "ToftTotalImpart",
          title: "سهم کل از عرصه",
          width: 140,
          editor: "decimal"
        },
        {
          field: "AyanTotalImpart",
          title: "سهم کل از اعیان",
          width: 140,
          editor: "decimal"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: 100
        }
      ]
    }
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
