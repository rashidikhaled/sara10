<template>
  <div class="row q-col-gutter-x-sm">
    <div class="col full-height">
      <slot name="before"> </slot>
    </div>
    <div class="col-auto" v-show="show">
      <div
        @click="$emit('hide')"
        class="fit cursor-pointer bg-grey-2 flex items-center justify-center"
        style="min-width: 12px; height: 300px;border: 1px solid #ededed;"
      >
        <q-icon name="chevron_left" size="sm" />
      </div>
    </div>
    <div class="col-7 full-height" v-if="show">
      <slot name="after"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBySideGridTemplate",
  inheritAttrs: true,
  props: ["show"]
}
</script>
