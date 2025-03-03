<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">ضمائم:</div>
        <safa-datagrid
          v-model="value.Base_Attachment"
          :m="m"
          class="col-12"
          helper="baseAttachment"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">منبع برداشت اطلاعات:</div>
        <safa-datagrid
          v-model="value.Base_ResourceInfo"
          :m="m"
          class="col-12"
          helper="baseResourceInfo"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <text-template
          v-model="value.Base_CommonEstate.Comments"
          :m="m"
          class="col-12"
          identifier="c5d38bf1-cf9c-4de6-abeb-e059c6d7c3a3"
          label="توضیحات پرونده آپارتمان:"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabBaseComment',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
