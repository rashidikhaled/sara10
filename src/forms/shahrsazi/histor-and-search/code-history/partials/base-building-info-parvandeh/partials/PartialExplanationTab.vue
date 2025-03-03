<template>
  <section class="row wrap">
    <q-card flat>
      <q-card-section class="col-12">
        <div class="section-title">ضمائم :</div>
        <safa-datagrid
          :data-items="value.Base_Attachment"
          class="col-12"
          helper="baseAttachment"
          style="height: 12rem"
        />
      </q-card-section>

      <q-card-section class="col-12">
        <div class="section-title">توضیحات پرونده ساختمان :</div>
        <safa-text
          v-model="value.Base_CommonEstate.Comments"
          :m="m"
          class="col-12"
          style="height: 12rem"
        />
      </q-card-section>
    </q-card>
  </section>
</template>

<script>
export default {
  name: 'PartialBaseParkingTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
