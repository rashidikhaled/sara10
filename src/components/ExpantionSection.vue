<template>
  <section class="expantion-section">
    <div
      :class="className"
      class="exp--inner"
    >
      <q-expansion-item
        :label="title"
        dense
        :default-opened="defaultOpen"
        v-model="value"
      >
        <div class="q-pa-sm">
          <slot />
        </div>
      </q-expansion-item>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: 'q-mb-sm'
    },
    value: Boolean,
    defaultOpen: Boolean
  }
}
</script>
<style lang="scss">
  .expantion-section .exp--inner {
    //border: 1px solid #dedede;

    > .q-expansion-item {
      //background-color: #fff;

      .q-item {
        min-height: 10px;
        //background-color: #dfe8ed;
        /*border-bottom: 1px solid #ccc;*/
      }

    }
  }
</style>
