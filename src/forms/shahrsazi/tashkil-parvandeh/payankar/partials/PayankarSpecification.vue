<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="ضابطه ی محل "
          ciName="CI_Criterion"
          domainName="CI_SaraM1"
          v-model="value.Sh_BaroKaf.CI_Criterion"
          cdcName="CI_Criterion"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label=" نوع سقف "
          ciName="CI_RoofType"
          domainName="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_RoofType"
          cdcName="CI_RoofType"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع پروانه "
          ciName="CI_ParvanehType"
          domainName="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_ParvanehType"
          cdcName="CI_ParvanehType"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع نما"
          ciName="CI_ViewCode"
          domainName="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_ViewCode"
          cdcName="CI_ViewCode"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع مالکیت"
          ciName="CI_OwnerType"
          domainName="CI_SaraM1"
          v-model="value.Base_CommonEstate_Optional.CI_OwnerType"
          cdcName="CI_OwnerType"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="موقعیت زمین"
          ciName="CI_GeoStatus"
          domainName="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_GeoStatus"
          cdcName="CI_GeoStatus"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          type="decimal"
          label="مساحت طبق سند"
          v-model="value.Base_HouseInfo.DocArea"
          cdcName="DocArea"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          type="decimal"
          label="مساحت پس از بر اصلاحی"
          v-model="value.Base_HouseInfo.AreaAfterEdit"
          cdcName="AreaAfterEdit"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="میزان در مسیر"
          v-model="value.Sh_BaroKaf.PathValue"
          cdcName="PathValue"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          type="decimal"
          label="مساحت وضع موجود"
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت سند"
          ciName="CI_DocStatus"
          domainName="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          cdcName="CI_DocStatus"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="بخش ثبتی"
          v-model="value.Base_CommonEstate.RegisterSection"
          cdcName="RegisterSection"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت ملک"
          ciName="CI_HouseStatus"
          domainName="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_HouseStatus"
          cdcName="CI_HouseStatus"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="سطح اشغال"
          v-model="value.Base_BuildingInfo.BusyArea"
          cdcName="BusyArea"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تراکم"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          cdcName="AllowableDensityLicence"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          locale="fa"
          label="تاریخ شروع عملیات ساختمانی"
          v-model="value.Base_BuildingInfo.StartDate"
          cdcName="StartDate"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          locale="fa"
          label="تاریخ پایان عملیات ساختمانی"
          v-model="value.Base_BuildingInfo.EndDate"
          cdcName="EndDate"
          label-width="100px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="spModel" vertical>
      <template v-slot:before>
        <fit>
          <safa-grid
            title="پلاک ثبتی"
            :columns="payankarPelak"
            v-model="value.Base_RegisterPlack"
            cdcName="Base_RegisterPlack"
            fit
            m="r"
            min-height="200px"
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="مشخصات درها"
            :columns="payankarSpec"
            v-model="value.Base_Door"
            cdcName="Base_Door"
            fit
            m="r"
            min-height="200px"
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      spModel: 50,
      payankarPelak: [
        {
          field: "CI_RegisterPlackTypeGroup",
          title: "گروه نوع در پلاک ثبتی",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "180px"
        },
        {
          field: "CI_RegisterPlackType",
          title: "نوع در پلاک ثبتی",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "180px"
        },
        {
          field: "RegisterPlackTypeValue",
          title: "مقدار",
          editor: "numeric",
          width: "180px"
        },
        {
          field: "Priority",
          title: "اولویت",
          editor: "numeric",
          width: "180px"
        }
      ],
      payankarSpec: [
        {
          field: "CI_DoorType",
          title: "نوع در ",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "180px"
        },
        {
          field: "DoorCount",
          title: "تعداد",
          width: "180px"
        },
        {
          field: "DoorWidth",
          title: "عرض معبر",
          width: "180px"
        },
        {
          field: "CI_SideCode",
          title: "جهت",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "180px"
        },
        {
          field: "DoorDepth",
          title: "عمق در",
          editor: "numeric",
          width: "180px"
        }
      ]
    }
  }
}
</script>
