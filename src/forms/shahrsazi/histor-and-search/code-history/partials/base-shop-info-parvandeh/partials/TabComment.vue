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
        <text-template
          v-model="value.Base_CommonEstate.Comments"
          :m="m"
          class="col-12"
          identifier="96d76b80-75ac-48ba-9090-5f499d926dd6"
          label="توضیحات:"
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
