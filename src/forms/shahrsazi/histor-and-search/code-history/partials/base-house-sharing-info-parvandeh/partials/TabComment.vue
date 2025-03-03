<template>
  <section class="row wrap">
    <q-card flat class="col-12">
      <q-card-section class="row wrap">
        <div class="col-12 section-title">ضمائم:</div>
        <safa-datagrid
          class="col-12"
          style="height: 12rem"
          helper="baseAttachment"
          :m="m"
          v-model="value.Base_Attachment"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12">
      <q-card-section class="row wrap">
        <text-template
          class="col-12"
          label="توضیحات پرونده دستگاه:"
          identifier="30dca8da-c7cd-47cc-97f6-28120f24fa4e"
          :m="m"
          v-model="value.Base_CommonEstate.Comments"
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
