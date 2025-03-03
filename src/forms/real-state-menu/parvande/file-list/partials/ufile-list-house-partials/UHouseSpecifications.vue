<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="مساحت طبق سند"
          v-model="getHouseResult.Base_HouseInfo.DocArea"
          label-width="105px"
          :m="m"
        ></safa-text>
      </FormControl>

      <FormControl>
        <safa-text
          label="مساحت وضع موجود"
          v-model="getHouseResult.Base_HouseInfo.CurrentArea"
          label-width="105px"
          :m="m"
        ></safa-text>
      </FormControl>

      <FormControl>
        <safa-text
          label="مساحت پس از رعایت بر اصلاحی"
          v-model="getHouseResult.Base_HouseInfo.AreaAfterEdit"
          label-width="105px"
          :m="m"
        ></safa-text>
      </FormControl>

      <FormControl>
        <safa-text
          label="مساحت باقیمانده"
          v-model="getHouseResult.Base_HouseInfo.RemainArea"
          label-width="105px"
          :m="m"
        ></safa-text>
      </FormControl>

      <FormControl>
        <safa-text
          label="حق ممر"
          v-model="getHouseResult.Base_HouseInfo.MamarArea"
          label-width="105px"
          :m="m"
        ></safa-text>
      </FormControl>

      <FormControl>
        <safa-text
          label="بخش ثبتی"
          v-model="getHouseResult.Base_CommonEstate.RegisterSection"
          label-width="105px"
          :m="m"
        ></safa-text>
      </FormControl>

      <FormControl>
        <safa-text
          label="طول دیوار"
          v-model="getHouseResult.Base_HouseInfo.WallLen"
          label-width="105px"
          :m="m"
        ></safa-text>
      </FormControl>

      <FormControl>
        <safa-combo
          label="نوع سند"
          label-width="105px"
          ciName="CI_DocType"
          domainName="Estate"
          v-model="getHouseResult.Base_CommonEstate.CI_DocType"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-combo
          label="وضعیت سند"
          label-width="105px"
          ciName="CI_DocStatus"
          domainName="Estate"
          v-model="getHouseResult.Base_CommonEstate.CI_DocStatus"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-combo
          label="وضعیت ملک"
          label-width="105px"
          ciName="CI_HouseStatus"
          domainName="Estate"
          v-model="getHouseResult.Base_HouseInfo.CI_HouseStatus"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-combo
          label="موقعیت زمین"
          label-width="105px"
          ciName="CI_GeoStatus"
          domainName="Estate"
          v-model="getHouseResult.Base_HouseInfo.CI_GeoStatus"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-combo
          label="نوع مالکیت"
          label-width="105px"
          v-model="getHouseResult.Base_CommonEstate.CI_OwnerType"
          :m="m"
          ciName="CI_OwnerType"
          domainName="Estate"
        />
      </FormControl>

      <FormControl>
        <safa-combo
          label="مرحله ساختمانی"
          label-width="105px"
          ciName="CI_BuildingStep"
          domainName="Estate"
          v-model="getHouseResult.Base_CommonEstate.CI_BuildingStep"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-combo
          label="نوع استخر"
          label-width="105px"
          ciName="CI_PoolType"
          domainName="Estate"
          v-model="getHouseResult.Base_HouseInfo.CI_PoolType"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-combo
          label="نوع گلخانه"
          label-width="105px"
          ciName="CI_GlasshouseType"
          domainName="Estate"
          v-model="getHouseResult.Base_HouseInfo.CI_GlasshouseType"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-text
          label="مساحت استخر"
          v-model="getHouseResult.Base_HouseInfo.PoolArea"
          label-width="105px"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-text
          label="حجم استخر"
          v-model="getHouseResult.Base_HouseInfo.PoolCubature"
          label-width="105px"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-text
          label="مساحت گلخانه"
          v-model="getHouseResult.Base_HouseInfo.GlasshouseArea"
          label-width="105px"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-combo
          label="نوع چاه"
          label-width="105px"
          ciName="CI_ShaftType"
          domainName="Estate"
          v-model="getHouseResult.Base_HouseInfo.CI_ShaftType"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-text
          label="تعداد چاه"
          v-model="getHouseResult.Base_HouseInfo.DeepShaftCount"
          label-width="105px"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-text
          label="مساحت اعیان"
          v-model="getHouseResult.Base_HouseInfo.AyanArea"
          label-width="105px"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-combo
          label="نوع کاربری"
          label-width="105px"
          ciName="CI_UsingGroup"
          domainName="Estate"
          v-model="getHouseResult.Base_HouseInfo.CI_UsingGroup"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-combo
          label="نوع اولویت صلح نامه"
          label-width="105px"
          ciName="CI_ContractPriorityType"
          domainName="Estate"
          v-model="getHouseResult.Request_Info.CI_ContractPriorityType"
          :m="CI_ContractPriorityTypeMode"
        />
      </FormControl>
    </FormRow>

    <safa-grid
      v-model="getHouseResult.Base_RegisterPlack"
      helper="registeredPlackColumns"
      :m="m"
      title="پلاک ثبتی"
      fit
      min-height="150px"
      height="100%"
      max-height="100%"
      :showRowNumber="false"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
    />
  </fit>
</template>

<script>
export default {
  data () {
    return {
      CI_ContractPriorityTypeMode: "r"
    }
  },

  props: {
    getHouseResult: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  }
}
</script>
