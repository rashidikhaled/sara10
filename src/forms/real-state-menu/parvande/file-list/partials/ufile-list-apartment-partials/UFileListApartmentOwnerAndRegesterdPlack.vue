<template>
  <fit>
    <safa-splitter v-model="splitterValueHorizontal" horizontal>
      <template v-slot:before>
        <fit>
          <safa-splitter v-model="splitterValueVertical" vertical>
            <template v-slot:before>
                <safa-grid
                  v-model="value.Base_RegisterPlack"
                  cdcName="Base_RegisterPlack"
                  :columns="regesterdPlsckColumn"
                  fit
                  title="پلاک ثبتی"
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
                  v-model="value.Base_SupplyParking"
                  cdcName="Base_SupplyParking"
                  :columns="providingParckingSourceColumn"
                  fit
                  title="منبع تامین پارکینگ"
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
      <template v-slot:after>
          <safa-grid
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            :columns="ownersColumn"
            fit
            title="مالکین"
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
      splitterValueVertical: 50,

      regesterdPlsckColumn: [
        {
          field: "CI_RegisterPlackTypeGroup",
          editor: "combo",
          domain: "Estate",
          title: "گروه نوع پلاک ثبتی",
          width: ""
        },
        {
          field: "CI_RegisterPlackType",
          editor: "combo",
          domain: "Estate",
          title: "نوع پلاک ثبتی",
          width: ""
        },
        { field: "Priority", title: "اولویت", width: "" },
        { field: "RegisterPlackTypeValue", title: "مقدار", width: "" }
      ],

      providingParckingSourceColumn: [
        {
          field: "CI_SupplyParkingType",
          editor: "combo",
          domain: "Estate",
          title: "کد نوع تامین پارکینگ",
          width: ""
        },
        {
          field: "CI_SupplyParkingHow",
          editor: "combo",
          domain: "Estate",
          title: "کد نحوه تامین پارکینگ",
          width: ""
        },
        {
          field: "CI_OwnerParkingType",
          editor: "combo",
          domain: "Estate",
          title: "کد نوع مالکیت پارکینگ",
          width: ""
        },
        { field: "FloorNo", title: "شماره طبقه", editor: "numeric", width: "" },
        { field: "DoorCount", title: "تعداد درب", width: "" },
        { field: "Area", title: "مساحت", width: "" }
      ],

      ownersColumn: [
        {
          field: "CI_OwnerCharacter",
          title: "شخصیت",
          editor: "combo",
          domain: "Estate",
          width: ""
        },
        { field: "OwnerName", title: "نام مالک", width: "" },
        {
          field: "OwnerLastName",
          title: "نام خانوادگی/شخصیت حقوقی",
          width: ""
        },
        { field: "OwnerFatherName", title: "نام پدر/کد سازمانی", width: "" },
        { field: "IDCardNo", title: "شماره شناسنامه/شماره ثبت", width: "" },
        {
          field: "OwnerBirthDate",
          title: "تاریخ تولد",
          width: "",
          editor: "date"
        },
        { field: "Telephone", title: "تلفن", width: "" },
        { field: "PostCode", title: "کد پستی", width: "" },
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
      ]
    }
  }
}
</script>
