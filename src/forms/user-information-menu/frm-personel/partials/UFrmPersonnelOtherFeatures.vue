<template>
  <FormRow :md="3" :lg="3" :xl="3">
    <FormControl>
      <safa-text label="نام پدر :" label-width="125px" />
    </FormControl>
    <FormControl>
      <safa-text label="حوزه فعالیت :" label-width="125px" />
    </FormControl>
    <FormControl>
      <safa-combo
        v-model="education"
        :options="educationOptions"
        sourceType="local"
        label="میزان تحصیلات :"
        label-width="125px"
      >
      </safa-combo>
    </FormControl>
    <FormControl>
      <safa-text label="رشته تحصیلی :" label-width="125px" />
    </FormControl>
    <FormControl>
      <safa-text label="آدرس محل کار :" label-width="125px" />
    </FormControl>
    <FormControl>
      <safa-text label="معرف به شهرداری مشهد :" label-width="125px" />
    </FormControl>
    <FormControl>
      <safa-text label="نام بستگان شاغل در شهرداری :" label-width="125px" />
    </FormControl>
  </FormRow>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      name: "UFrmPersonnelOtherFeatures",

      education: 0,
      educationOptions: [
        {
          Title: "دیپلم",
          ID: "item1"
        },
        {
          Title: "فوق دیپلم",
          ID: "item2"
        },
        {
          Title: "لیسانس",
          ID: "item3"
        },
        {
          Title: "فوق لیسانس",
          ID: "item4"
        },
        {
          Title: "دکترا",
          ID: "item5"
        },
        {
          Title: "سایر",
          ID: "item6"
        }
      ]
    }
  }
}
</script>
