<template>
  <section class="row wrap">
    <q-card class="col-12 col-sm-6" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">تقسیمات شهری ادارات و سازمانها :</div>
        <safa-datagrid
          v-model="value.Base_BlockOrganize"
          :m="m"
          class="col-12"
          helper="baseBlockOrganize"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12 col-sm-6" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">فضای سبز :</div>
        <safa-datagrid
          v-model="value.Base_GreenSpace"
          :m="m"
          class="col-12"
          helper="baseGreenSpace"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">توضیحات پرونده بلوک :</div>
        <text-template
          v-model="value.Base_BlockInfo.Comments"
          :m="m"
          class="col-12"
          identifier="9e7dc71a-4ed0-475e-b0f2-a3a8ecd4965f"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabComment',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
