<template>
  <fit>
    <FormRow :xl="5" :lg="4" :md="4" :sm="2">
      <FormControl>
        <safa-combo
          label="نوع مصالح اسکلت"
          label-width="100px"
          :m="m"
          v-model="model.Ref_CheckingInfo_Calculator.CI_FrameBuildingType"
          ciName="CI_FrameBuildingType"
          domainName="engineer"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع سقف"
          label-width="100px"
          :m="m"
          v-model="model.Ref_CheckingInfo_Calculator.CI_FloorType"
          ciName="CI_FloorType"
          domainName="engineer"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع دیوارهای داخلی"
          label-width="100px"
          :m="m"
          v-model="model.Ref_CheckingInfo_Calculator.CI_WallType_Internal"
          ciName="CI_WallType_Internal"
          domainName="engineer"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع دیوارهای خارجی"
          label-width="100px"
          :m="m"
          v-model="model.Ref_CheckingInfo_Calculator.CI_WallType_External"
          ciName="CI_WallType_External"
          domainName="engineer"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع و جنس نما"
          label-width="100px"
          :m="m"
          v-model="model.Ref_CheckingInfo_Calculator.CI_ViewMaterialType"
          ciName="CI_ViewMaterialType"
          domainName="engineer"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع فونداسیون"
          label-width="100px"
          :m="m"
          v-model="model.Ref_CheckingInfo_Calculator.CI_FoundationType"
          ciName="CI_FoundationType"
          domainName="engineer"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ضخامت فونداسیون"
          label-width="100px"
          :m="m"
          v-model="model.Ref_CheckingInfo_Calculator.FondationThickness"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="عمق گودبرداری"
          label-width="100px"
          :m="m"
          v-model="model.Ref_CheckingInfo_Calculator.ExcavationDepth"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تنش مجاز خاک"
          label-width="100px"
          :m="m"
          v-model="model.Ref_CheckingInfo_Calculator.TensionSoil"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ضریب ارتجاعی بستر"
          label-width="100px"
          :m="m"
          v-model="model.Ref_CheckingInfo_Calculator.BedReactionaryCoef"
        />
      </FormControl>
    </FormRow>
    <hr />
    <div class="q-my-md">
      <div class="row q-col-gutter-sm items-center">
        <div class="col-12 col-md-2">تنش تسلیم فولاد (kg/cm2)</div>
        <safa-text
          label="ورقها و پروفیلهای فولادی"
          :m="m"
          label-width="120px"
          class="col-12 col-md"
          v-model="model.Ref_CheckingInfo_Calculator.SteelSheet"
        />
        <safa-text
          label="میلگردهای طولی"
          class="col-12 col-md"
          :m="m"
          label-width="120px"
          v-model="model.Ref_CheckingInfo_Calculator.FittingsLongitudinal"
        />
        <safa-text
          label="میلگردهای عرضی"
          class="col-12 col-md"
          :m="m"
          label-width="120px"
          v-model="model.Ref_CheckingInfo_Calculator.FittingsLatitudinal"
        />
      </div>
    </div>
    <div class="q-mb-md">
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-2">مقاومت فشاری نمونه استوانه ای 28 روزه بتن (kg/cm2)</div>
        <safa-text
          label="بتن سقف"
          class="col-12 col-md"
          :m="m"
          label-width="120px"
          v-model="model.Ref_CheckingInfo_Calculator.RoofConcrete"
        ></safa-text>
        <safa-text
          label="بتن تیر، ستون و دیوار"
          class="col-12 col-md"
          :m="m"
          label-width="120px"
          v-model="model.Ref_CheckingInfo_Calculator.WallConcrete"
        ></safa-text>
        <safa-text
          label="بتن فونداسیون"
          class="col-12 col-md"
          :m="m"
          label-width="120px"
          v-model="model.Ref_CheckingInfo_Calculator.FondationConcrete"
        ></safa-text>
      </div>
    </div>
    <safa-datatable
      fit
      height="100%"
      max-height="100%"
      title="خلاصه بارگذاری ثقلی"
      :columns="columns"
      v-model="model.Ref_CheckingInfo_CalculatorBriefLoad"
      :m="m"
    />
  </fit>
</template>
<script>
export default {
  props: {
    model: Object,
    m: String
  },
  data () {
    return {
      columns: [
        { field: "FloorNo", title: "سقف" },
        { field: "UsefulHeight", title: "ارتفاع طبقه" },
        { field: "UsingArea", title: "مساحت" },
        { field: "CI_UsingType", title: "نوع کاربری" },
        { field: "DeadLoad", title: "بار مرده" },
        { field: "LiveLoad", title: "بار زنده" },
        {
          field: "LiveLoadPercent",
          title: "درصد مشارکت بار زنده در محاسبه برش پایه"
        },
        { field: "Comments", title: "توضیحات" }
      ]
    }
  }
}
</script>
