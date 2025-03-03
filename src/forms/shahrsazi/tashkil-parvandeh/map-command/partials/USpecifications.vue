<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          :m="m"
          sourceType="local"
          v-model="infoDabirItemsModal"
          cdcName="infoDabirItemsModal"
          input-debounce="0"
          label="اطلاعات دبیرخانه"
          label-width="90px"
        >
        </safa-combo>
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت وضع موجود"
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          :m="m"
          label-width="90px"
          type="decimal"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تراکم"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          cdcName="AllowableDensityLicence"
          :m="m"
          label-width="90px"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره دستور نقشه"
          v-model="value.Sh_PlanOrder.PlanOrderNo"
          cdcName="PlanOrderNo"
          :m="m"
          label-width="90px"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت طبق سند"
          v-model="value.Base_HouseInfo.DocArea"
          cdcName="DocArea"
          :m="m"
          label-width="90px"
          type="decimal"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          input-debounce="0"
          label="استقرار بنا"
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
          cdcName="CI_BuildingPosition"
          :m="m"
          label-width="90px"
        >
        </safa-combo>
      </FormControl>
      <FormControl>
        <safa-datepicker
          locale="fa"
          placeholder="تاریخ دستور نقشه"
          label="تاریخ دستور نقشه"
          v-model="value.Sh_PlanOrder.PlanOrderDate"
          cdcName="PlanOrderDate"
          :m="m"
          label-width="90px"
        >
        </safa-datepicker>
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت باقیمانده"
          v-model="value.Base_HouseInfo.RemainArea"
          cdcName="RemainArea"
          m="r"
          label-width="90px"
          type="decimal"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد واحد پارکینگ مورد نیاز"
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
          cdcName="ParkingNeedCount"
          :m="m"
          label-width="90px"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مجموع ارتفاع کل"
          v-model="value.Base_BuildingInfo.Height"
          cdcName="Height"
          :m="m"
          label-width="90px"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ارتفاع جان پناه"
          v-model="value.Base_BuildingInfo.Defilade"
          cdcName="Defilade"
          :m="m"
          label-width="90px"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعهد نما"
          v-model="value.Base_CommonEstate.ViewCommitment"
          cdcName="ViewCommitment"
          m="r"
          label-width="90px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ تعهد نما"
          v-model="value.Base_CommonEstate.ViewCommitmentDate"
          cdcName="ViewCommitmentDate"
          :m="m"
          label-width="90px"
        >
        </safa-datepicker>
      </FormControl>
      <FormControl>
        <safa-combo
          label="الگوی ساخت"
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
          cdcName="CI_CreateDesign"
          label-width="90px"
        />
      </FormControl>
    </FormRow>
    <safa-splitter
      v-model="gridSplitter"
      cdcName="gridSplitter"
      horizontal
      :min-height="$q.screen.gt.md ? '150px' : '350px'"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            ref="grid"
            name="grid"
            helper="shahrsazi.jahateArbaeMapCommand"
            title="جهات اربعه"
            :paginate="false"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.Base_OtherEquipment"
            cdcName="Base_OtherEquipment"
            helper="otherEquipmentSpecifications"
            :m="m"
            :loadingAnimation="false"
            :paginate="false"
            title="سایر امکانات"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  data () {
    return {
      jahateArbaeItems: [],
      otherItems: [],
      infoDabirItemsModal: null,
      gridSplitter: 50
    }
  },
  props: {
    value: Object,
    m: {
      type: String,
      default: "r"
    }
  }
}
</script>
