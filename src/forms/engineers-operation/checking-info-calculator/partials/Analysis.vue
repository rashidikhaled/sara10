<template>
  <FormRow :lg="3" :md="3" :sm="3" :xl="3">
    <FormControl>
      <safa-combo
        label="روش استفاده شده در ترکیب آثار مدها"
        label-width="207px"
        v-model="model.Ref_CheckingInfo_Calculator.CI_CheckerUsingMethodInMode"
        ciName="CI_CheckerUsingMethodInMode"
        domainName="engineer"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-combo
        label="طیف استفاده شده در تحلیل طیفی"
        label-width="207px"
        v-model="model.Ref_CheckingInfo_Calculator.CI_CheckerUsingSpectrum"
        :m="m"
        ciName="CI_CheckerUsingSpectrum"
        domainName="engineer"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="تعداد مدهای نوسان در نظر گرفته شده"
        label-width="207px"
        v-model="model.Ref_CheckingInfo_Calculator.ConsideredModeCount"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="نسبت برش پایه استاتیکی به طیفی"
        label-width="207px"
        v-model="model.Ref_CheckingInfo_Calculator.CuttingScale"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="مقدار پریود مد اول نوسان"
        label-width="207px"
        v-model="model.Ref_CheckingInfo_Calculator.Period1"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="مقدار پریود مد دوم نوسان"
        label-width="207px"
        v-model="model.Ref_CheckingInfo_Calculator.Period2"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="مقدار پریود مد سوم نوسان"
        label-width="207px"
        v-model="model.Ref_CheckingInfo_Calculator.Period3"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="درصد تجمعی جرمهای موثر در آخرین مد نوسان"
        label-width="207px"
        :m="m"
        v-model="model.Ref_CheckingInfo_Calculator.PluralPercent"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="پریود ارتعاش سازه در آخرین مد نوسان"
        label-width="207px"
        v-model="model.Ref_CheckingInfo_Calculator.StructuresPeriod"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="ضریب مقیاس در جهت شمالی- جنوبی"
        label-width="207px"
        v-model="model.Ref_CheckingInfo_Calculator.ScaleCoefNS"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="ضریب مقیاس در جهت شرقی- غربی"
        label-width="207px"
        v-model="model.Ref_CheckingInfo_Calculator.ScaleCoefEW"
        :m="m"
      />
    </FormControl>
  </FormRow>
</template>
<script>
export default {
  props: { model: Object, m: String },
  data () {
    return {}
  }
}
</script>
