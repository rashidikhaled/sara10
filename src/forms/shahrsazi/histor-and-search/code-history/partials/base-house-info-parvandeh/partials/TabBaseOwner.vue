<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">مالکین:</div>
        <safa-datagrid
          v-model="value.Base_Owner"
          cdcName="Base_Owner"
          :m="m"
          class="col-12"
          helper=shahrsazi.baseOwner
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">جهات اربعه:</div>
        <safa-datagrid
          v-model="value.Base_Edge"
          cdcName="Base_Edge"
          :m="m"
          class="col-12"
          helper="baseEdgeParvandeh"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabBaseOwner',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
