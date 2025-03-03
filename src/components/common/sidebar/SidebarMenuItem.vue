<template>
  <div
    class="menu-item"
    @click="$emit('menuClick', menuitem)"
  >
    <div
      class="mm-icon"
      v-if="menuitem.icon"
    >
      <q-icon
        :name="menuitem.icon"
        :size="menuitem.size || '20px'"
      />
    </div>
    <div class="mm-title">
      {{ menuitem.title }}
    </div>
    <div
      class="has-child"
      v-if="
              (menuitem.nodes && menuitem.nodes.length > 0) || menuitem.hasChild
            "
    >
      <q-icon name="keyboard_arrow_left" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    menuitem: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
  .mm-icon {
    min-width: 22px;
    text-align: center;
  }
</style>
