<template>
  <section class="row wrap">
    <q-card flat>
      <q-card-section class="col-12">
        <div class="section-title">ضمائم :</div>
        <safa-datagrid
          v-model="value.Base_Attachment"
          :m="m"
          class="col-12"
          helper="baseAttachment"
          style="height: 12rem"
        />
      </q-card-section>

      <q-card-section class="col-12">
        <div class="section-title">توضیحات پرونده ساختمان :</div>
        <text-template
          v-model="value.Base_CommonEstate.Comments"
          :m="m"
          identifier="2b2fda13-012d-46e6-96ea-54bc86ad4ab9"
        />
      </q-card-section>
    </q-card>
  </section>
</template>

<script>
export default {
  name: 'TabExplanation',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
