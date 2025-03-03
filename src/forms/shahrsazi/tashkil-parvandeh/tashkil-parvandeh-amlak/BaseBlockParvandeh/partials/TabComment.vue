<template>
  <section class="row wrap">
    <q-card
      flat
      class="col-12 col-sm-6"
    >
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">تقسیمات شهری ادارات و سازمانها :</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseBlockOrganize"
          :m="m"
          v-model="value.Base_BlockOrganize"
        />
      </q-card-section>
    </q-card>

    <q-card
      flat
      class="col-12 col-sm-6"
    >
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">فضای سبز :</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseGreenSpace"
          :m="m"
          v-model="value.Base_GreenSpace"
        />
      </q-card-section>
    </q-card>

    <q-card
      flat
      class="col-12"
    >
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">توضیحات پرونده بلوک :</div>
        <text-template
          class="col-12"
          style="height: 15rem"
          identifier="9e7dc71a-4ed0-475e-b0f2-a3a8ecd4965f"
          :m="m"
          v-model="value.Base_BlockInfo.Comments"
          formKey="f2a0b472-046f-4f40-a6f3-2d7ce66edd52"
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
