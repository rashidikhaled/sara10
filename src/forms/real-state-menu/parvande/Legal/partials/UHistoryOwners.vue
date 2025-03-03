<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      class="fit"
      horizontal
      margin="0"
      style="min-height: 150px"
    >
      <template v-slot:before>
        <safa-grid
          v-model="value.Legal_Owner"
          fit
          max-height="100%"
          height="100%"
          minHeight="100%"
          paginate
          :addRow="true"
          :deleteRow="false"
          :allowCopy="false"
          :suppressRowClickSelection="false"
          :columns="LegalOwnercolumn"
          :m="m"
        />
        <safa-popup
          v-model="BtnShowForms"
          title="ثبت اطلاعات وکیل/ وکلا"
          width="900px"
          height="500px"
        >
          <UShowFormsOwner
            @selectedRow="selectedRow"
            @closePopUp="closePopUp"
            :selectedRow="selectedRow"
            v-model="value"
            :title="title"
            :formKey="formKey"
            :name="name"
          />
        </safa-popup>
      </template>
      <template v-slot:after>
        <safa-grid
          v-model="GrdOwnerAttorney"
          title="مشخصات وکیل/وکلا"
          ID="319B89D6-1C75-4265-B1D1-497223A1998F"
          fit
          paginate
          max-height="100%"
          height="400px"
          minHeight="200px"
          :suppressRowClickSelection="false"
          :addRow="true"
          :deleteRow="false"
          :allowCopy="false"
          :columns="OwnerAttorneycolumn"
          :m="m"
        />
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import UShowFormsOwner from "./UShowFormsOwner"
export default {
  mixins: [baseFormMixin],
  props: {
    formKey: String,
    title: String,
    GrdOwnerAttorney: Array,
    m: String,
    value: Object
  },
  components: {
    UShowFormsOwner
  },
  computed: {
    LegalOwnercolumn () {
      return [
        {
          field: "",
          title: "مشخصات وکیل/وکلا",
          btnTitle: "مشخصات وکیل/وکلا",
          editor: "action",
          width: "150px",
          hide: this.m !== "r",
          filterable: false,
          resizable: false,
          pinned: "right",
          lockPosition: true,
          btnColor: "primary",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.showPopUp(params)
        },
        {
          field: "CI_OwnerCharacter",
          title: "شخصیت",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "OwnerLastName",
          title: "نام خانوادگی/شخصیت حقوقی"
        },
        {
          field: "OwnerName",
          title: "نام مالک"
        },
        {
          field: "OwnerFatherName",
          title: "نام پدر/کدسازمانی"
        },
        {
          field: "IdCardNo",
          title: "شماره شناسنامه/شماره ثبت"
        },
        {
          field: "EmissionPlace",
          title: "محل صدور"
        },
        {
          field: "NationalCode",
          title: "کد ملی"
        },
        {
          field: "CI_CessionOwner",
          title: "مالکیت واگذاری",
          domain: "Estate",
          editor: "combo"
        },
        {
          field: "ShareAreas",
          title: "سهم عرصه"
        },
        {
          field: "DongAreas",
          title: "دانگ عرصه"
        },
        {
          field: "BeanAreas",
          title: "حبه عرصه"
        },
        {
          field: "ShareBuilding",
          title: "سهم اعیان"
        },
        {
          field: "DongBuilding",
          title: "دانگ اعیان"
        },
        {
          field: "BeanBuilding",
          title: "حبه اعیان"
        },
        {
          field: "TelNo",
          title: "تلفن"
        },
        {
          field: "MobileNo",
          title: "شماره موبایل"
        },
        {
          field: "Address",
          title: "آدرس"
        },
        {
          field: "TransferDang",
          title: "دانگ مورد توافق"
        },
        {
          field: "PostCode",
          title: "کد پستی"
        }
      ]
    }
  },
  data () {
    return {
      name: "UHistoryOwners",
      Title: "تاریخچه مالکین",
      splitterModel: 50,
      BtnShowForms: false,
      selectedRow: null,
      OwnerAttorneyList: [],
      OwnerAttorneycolumn: [
        {
          field: "AttorneyLetterNo",
          title: "شماره وکالت"
        },
        {
          field: "AttorneyLetterDate",
          title: "تاریخ وکالت",
          editor: 'date'
        },
        {
          field: "AttorneyBureauNo",
          title: "شماره دفترخانه تنظیم وکالت"
        },
        {
          field: "AttorneyName",
          title: "نام و نام خانوادگی"
        },
        {
          field: "NationalCode",
          title: "کد ملی"
        },
        {
          field: "IDCardNo",
          title: "شماره شناسنامه",
          editor: "numeric"
        },
        {
          field: "AttorneyFatherName",
          title: "نام پدر"
        },
        {
          field: "Telephone",
          title: "تلفن"
        },
        {
          field: "MobileNo",
          title: "شماره موبایل",
          width: "150px"
        },
        {
          field: "Address",
          title: "آدرس",
          width: "150px"
        },
        {
          field: "PostCode",
          title: "کدپستی",
          width: "150px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "150px"
        }
      ]
    }
  },
  methods: {
    showPopUp (params) {
      this.selectedRow = params
      this.BtnShowForms = true
    },
    closePopUp () {
      this.BtnShowForms = false
      this.$emit("reLoad")
    }
  }
}
</script>
