<template>
  <div class="internal-section-wrap q-pa-sm">
    <div
      class="internal-section"
      v-bind="$attrs"
    >
      <div
        class="custom-title"
        v-if="title || $scopedSlots.title"
      >
        <span><slot name="title">{{ title }}</slot></span>
      </div>
      <div class="custom-body full-height q-pa-sm">
        <slot></slot>
      </div>
      <div class="int-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'internal-section',
  props: {
    title: {
      type: String,
      default: ''
    }
    /*    className: {
          type: String,
          default: () => window.getKaisOpt('section_class', '')
        },
        margin: {
          type: Boolean,
          default: true
        } */
  }
}
</script>
<style lang="scss">
.internal-section {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 4px;
  //box-shadow: -1px -2px 3px rgba(0, 0, 0, .05);
  width: auto;
  border-radius: 4px;
  margin-left: -8px;
  margin-right: -8px;

  .custom-title {
    margin-bottom: 8px;
    border-bottom: 1px solid #eee;
    padding-bottom: 4px;

    span {
      font-size: 12px;
      font-weight: bold;
      background-color: transparent;
      padding: 0 10px;
      color: #474747;
      z-index: 11;
    }

    body.body--dark &{
      border-bottom-color: var(--dark-border);

      span {
        color: var(--dark-text-color);
      }
    }
  }

  .custom-body {
    display: inline-block;
    width: 100%;
  }

  body.body--dark &{
    border-color: var(--dark-border);
  }
}
</style>
