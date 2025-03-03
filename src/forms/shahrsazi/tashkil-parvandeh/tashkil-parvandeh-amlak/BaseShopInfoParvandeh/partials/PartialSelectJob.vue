<template>
  <q-dialog persistent class="PartialSelectJob" v-bind="$attrs">
    <q-card class="row">

      <q-card-actions class="col-12">
        <q-btn icon="check" label="تایید" v-close-popup @click="$emit('accept')"/>
        <q-btn icon="close" label="بستن" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'PartialSelectJob',

  methods: {
    load () {
    }
  },

  mounted () {
    this.load()
  }
}
</script>
