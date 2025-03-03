<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="شماره دفترچه محاسباتی"
          label-width="100px"
          v-model="value.ClsFil_Info.Fil_Info.ComputationalInstructionNo"
          cdcName="ComputationalInstructionNo"
          :labelShrink="true"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره نقشه معماری"
          label-width="100px"
          v-model="value.ClsFil_Info.Fil_Info.MapNo"
          cdcName="MapNo"
          :labelShrink="true"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد کامپیوتری"
          label-width="100px"
          v-model="value.ClsFil_Info.Fil_Info.ComputerCode"
          cdcName="ComputerCode"
          :labelShrink="true"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ارتفاع ساختمان"
          label-width="100px"
          v-model="value.ClsFil_Info.Fil_Info.Height"
          cdcName="Height"
          :labelShrink="true"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نوع ضابطه"
          label-width="100px"
          v-model="value.ClsFil_Info.Fil_Info.ZabeteType"
          cdcName="ZabeteType"
          :labelShrink="true"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="زیربنای ما به التفاوت"
          label-width="100px"
          v-model="value.ClsFil_Info.Fil_Info.infrastructureDiff"
          cdcName="infrastructureDiff"
          :labelShrink="true"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد سقف  ما به التفاوت"
          label-width="100px"
          v-model="value.ClsFil_Info.Fil_Info.FloorDiff"
          cdcName="FloorDiff"
          :labelShrink="true"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="متراژ موجود"
          label-width="100px"
          v-model="value.ClsFil_Info.Fil_Info.MetrajMojod"
          cdcName="MetrajMojod"
          :labelShrink="true"
          :m="m === 'e' ? metrajMojodMode : 'r'"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="متراژ مجاز"
          label-width="100px"
          v-model="value.ClsFil_Info.Fil_Info.MetrajMojaz"
          cdcName="MetrajMojaz"
          :labelShrink="true"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد واحد"
          label-width="100px"
          v-model="value.ClsFil_Info.Fil_Info.UnitNo"
          cdcName="UnitNo"
          :labelShrink="true"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="تایید نظر آتشنشانی دارد"
          v-model="value.ClsFil_Info.Fil_Info.IsFirefightingConfirmed"
          cdcName="IsFirefightingConfirmed"
          :labelShrink="true"
          :m="m"
          class="q-mt-md"
        />
      </FormControl>
    </FormRow>
    <safa-grid
      helper="Floors"
      v-model="value.ClsFil_Info.Fil_Floors"
      cdcName="Fil_Floors"
      :labelShrink="true"
      title="طبقات"
      :m="m === 'e' ? grdFloorsMode : 'r'"
      fit
      min-height="200px"
      height="100%"
      max-height="100%"
    />
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
      metrajMojodMode: "e",
      grdFloorsMode: "r"
    }
  }
}
</script>
