<template>
  <fit>
    <form-row class="q-mb-sm">
      <FormControl>
        <safa-combo
          v-model="value.Base_HouseInfo.CI_HouseStatus"
          ci-name="CI_HouseStatus"
          domain-name="CI_SaraM1"
          label="وضعیت ملک"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_HouseInfo.CI_BoundCode"
          ci-name="CI_BoundCode"
          domain-name="CI_SaraM1"
          label="محدوده"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_HouseInfo.CI_GlasshouseType"
          ci-name="CI_GlasshouseType"
          domain-name="CI_SaraM1"
          label="نوع گلخانه"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_CommonEstate.CI_OwnerType"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          label="نوع مالکیت"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_HouseInfo.CI_IncloseType"
          ci-name="CI_IncloseType"
          domain-name="CI_SaraM1"
          label="نوع حصار"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          v-model="value.Base_HouseInfo.GlasshouseArea"
          label-width="100px"
          m="r"
          label="مساحت گلخانه"
          type="decimal"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_HouseInfo.CI_HouseType"
          ci-name="CI_HouseType"
          domain-name="CI_SaraM1"
          label="نوع ملک"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Base_CommonEstate.Populations"
          label="جمعیت"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_HouseInfo.CI_PoolType"
          ci-name="CI_PoolType"
          domain-name="CI_SaraM1"
          label="نوع استخر"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Base_HouseInfo.DeepShaftCount"
          label="تعداد چاه"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_HouseInfo.CI_GeoStatus"
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          label="موقعیت زمین"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          v-model="value.Base_HouseInfo.PoolArea"
          label-width="100px"
          m="r"
          label="مساحت استخر"
          type="decimal"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_HouseInfo.CI_ShaftType"
          ci-name="CI_ShaftType"
          domain-name="CI_SaraM1"
          label="نوع چاه"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          label="مرحله ساختمانی"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          v-model="value.Base_HouseInfo.PoolCubature"
          label-width="100px"
          m="r"
          label="حجم استخر"
          type="decimal"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Base_HouseInfo.MamarArea"
          label="حق عبور"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
          ci-name="CI_SpecialStatus"
          domain-name="CI_SaraM1"
          label="وضعیت خاص"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="value.Base_HouseInfo.ActDate"
          label="تاریخ اثر"
          label-width="100px"
          m="r"
        />
      </FormControl>
    </form-row>

    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_Door"
              fit
              height="100%"
              helper="baseDoor"
              max-height="100%"
              title="مشخصات درها"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_Wall"
              fit
              height="100%"
              helper="baseWall"
              max-height="100%"
              title="مشخصات دیوارها"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: "TabBaseHouseInfo",

  props: {
    m: String,
    saraDomainName: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
