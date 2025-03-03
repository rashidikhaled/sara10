<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="آدرس"
          label-width="60px"
          v-model="value.Base_AddressInfo.MainAddress"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک آبی"
          label-width="60px"
          v-model="value.Base_AddressInfo.Plack"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="واحد"
          label-width="60px"
          v-model="value.Base_AddressInfo.Vahed"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="طبقه وقوع"
          label-width="60px"
          v-model="value.Base_AddressInfo.FloorDone"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="جهت وقوع"
          label-width="60px"
          v-model="value.Base_AddressInfo.CI_SideCode"
          :m="m"
          ciName="CI_SideCode"
          domainName="Estate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد پستی"
          label-width="60px"
          v-model="value.Base_AddressInfo.PostCode"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد اقتصادی"
          label-width="60px"
          v-model="value.Base_AddressInfo.EconomicCode"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="splitterValue" vertical class="q-mb-sm">
      <template v-slot:before>
          <safa-grid
            title="شماره شناسایی قدیم"
            v-model="value.Base_PreCodeInfo"
            :columns="oldIdentifierColumn"
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
            title="شماره شناسایی پرونده"
            v-model="value.Base_File"
            :columns="fileIdentifierColumn"
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
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="نوع سند"
          label-width="115px"
          v-model="value.Base_AddressInfo.CI_DocType"
          :m="m"
          ciName="CI_DocType"
          domainName="Estate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت سند"
          label-width="115px"
          v-model="value.Base_AddressInfo.CI_DocStatus"
          :m="m"
          ciName="CI_DocStatus"
          domainName="Estate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع مالکیت"
          label-width="115px"
          v-model="value.Base_AddressInfo.CI_OwnerType"
          :m="m"
          ciName="CI_OwnerType"
          domainName="Estate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت زیربنای مشترکات"
          label-width="115px"
          v-model="value.Base_AddressInfo.SharingInfrastructure"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت سهم العرصه"
          label-width="115px"
          v-model="value.Base_AddressInfo.ToftImpart"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره سند اعیان"
          label-width="115px"
          v-model="value.Base_AddressInfo.AyanDocNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت کل زیربنا"
          label-width="115px"
          v-model="value.Base_AddressInfo.TotalArea"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <FormRow>
      <FormControl>
        <safa-text
          label="نام کاربر ایجاد کننده"
          label-width="115px"
          v-model="value.Base_AddressInfo.creatorName"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تاریخ ایجاد"
          label-width="115px"
          v-model="value.Base_AddressInfo.creatorDate"
          :m="m"
        />
      </FormControl>
    </FormRow>
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
      splitterValue: 50,

      oldIdentifierColumn: [
        { field: "PreDistrick", title: "کد منطقه قدیم", width: "" },
        { field: "PreRegion", title: "کد قدیم حوزه", width: "" },
        { field: "PreBlock", title: "کد قدیم بلوک", width: "" },
        { field: "PreHouse", title: "کد قدیم ملک", width: "" },
        { field: "PreSub1", title: "کد قدیم فرعی 1", width: "" },
        { field: "PreSub2", title: "کد قدیم فرعی 2", width: "" }
      ],

      fileIdentifierColumn: [
        { field: "FileIdMother", title: "شماره شناسایی پرونده مادر", width: "" }
      ]
    }
  }
}
</script>
