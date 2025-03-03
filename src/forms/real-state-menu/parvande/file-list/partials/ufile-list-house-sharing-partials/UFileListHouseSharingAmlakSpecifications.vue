<template>
    <fit>
      <FormRow class="q-my-sm">
        <FormControl>
          <safa-text
            label="مساحت طبق سند"
            label-width="90px"
            v-model="value.Base_HouseInfo.DocArea"
            cdcName="DocArea"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مساحت وضع موجود"
            label-width="90px"
            v-model="value.Base_HouseInfo.CurrentArea"
            cdcName="CurrentArea"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مساحت پس از رعایت بر اصلاحی"
            label-width="90px"
            v-model="value.Base_HouseInfo.CurrentArea"
            cdcName="CurrentArea"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مساحت باقیمانده"
            label-width="90px"
            v-model="value.Base_HouseInfo.RemainArea"
            cdcName="RemainArea"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="حق ممر"
            label-width="90px"
            v-model="value.Base_HouseInfo.MamarArea"
            cdcName="MamarArea"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="بخش ثبتی"
            label-width="90px"
            v-model="value.Base_HouseInfo.RegisterSection"
            cdcName="RegisterSection"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="طول دیوار"
            label-width="90px"
            v-model="value.Base_HouseInfo.WallLen"
            cdcName="WallLen"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع سند"
            label-width="90px"
            v-model="value.Base_HouseInfo.CI_DocType"
            cdcName="CI_DocType"
            :m="m"
            ciName="CI_DocType"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="وضعیت سند"
            label-width="90px"
            v-model="value.Base_HouseInfo.CI_DocStatus"
            cdcName="CI_DocStatus"
            :m="m"
            ciName="CI_DocStatus"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="وضعیت ملک"
            label-width="90px"
            v-model="value.Base_HouseInfo.CI_HouseStatus"
            cdcName="CI_HouseStatus"
            :m="m"
            ciName="CI_HouseStatus"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="موقعیت زمین"
            label-width="90px"
            v-model="value.Base_HouseInfo.CI_GeoStatus"
            cdcName="CI_GeoStatus"
            :m="m"
            ciName="CI_GeoStatus"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع مالکیت"
            label-width="90px"
            v-model="value.Base_HouseInfo.CI_OwnerType"
            cdcName="CI_OwnerType"
            :m="m"
            ciName="CI_OwnerType"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="مرحله ساختمانی"
            label-width="90px"
            v-model="value.Base_HouseInfo.CI_BuildingStep"
            cdcName="CI_BuildingStep"
            :m="m"
            ciName="CI_BuildingStep"
            domainName="Estate"
          />
        </FormControl>

        <FormControl>
          <safa-combo
            label="نوع استخر"
            label-width="90px"
            v-model="value.Base_HouseInfo.CI_PoolType"
            cdcName="CI_PoolType"
            :m="m"
            ciName="CI_PoolType"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع گلخانه"
            label-width="90px"
            v-model="value.Base_HouseInfo.CI_GlasshouseType"
            cdcName="CI_GlasshouseType"
            :m="m"
            ciName="CI_GlasshouseType"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مساحت استخر"
            label-width="90px"
            v-model="value.Base_HouseInfo.PoolArea"
            cdcName="PoolArea"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="حجم استخر"
            label-width="90px"
            v-model="value.Base_HouseInfo.PoolCubature"
            cdcName="PoolCubature"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مساحت گلخانه"
            label-width="90px"
            v-model="value.Base_HouseInfo.GlasshouseArea"
            cdcName="GlasshouseArea"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع چاه"
            label-width="90px"
            v-model="value.Base_HouseInfo.CI_ShaftType"
            cdcName="CI_ShaftType"
            :m="m"
            ciName="CI_ShaftType"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تعداد چاه"
            label-width="90px"
            v-model="value.Base_HouseInfo.DeepShaftCount"
            cdcName="DeepShaftCount"
            :m="m"
          />
        </FormControl>
      </FormRow>
      <safa-grid
        v-model="value.Base_RegisterPlack"
        cdcName="Base_RegisterPlack"
        :columns="registeredplackColumn"
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
      registeredplackColumn: [
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
        { field: "RegisterPlackTypeValue", title: "مقدار", width: "" }
      ]
    }
  }
}
</script>
