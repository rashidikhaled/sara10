<template>
  <section class="row wrap">
    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">مالکین:</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseOwner"
          :m="m"
          v-model="value.Base_Owner"
          cdcName="Base_Owner"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">جهات اربعه:</div>
        <safa-datagrid
          class="col-12"
          style="height: 15rem"
          helper="baseEdge"
          :m="m"
          v-model="value.Base_Edge"
          cdcName="Base_Edge"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabBaseOwnerAndBaseEdge',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
