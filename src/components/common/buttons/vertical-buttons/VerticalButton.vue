<template>
  <div class="ver-button" role="presentation" :class="{'ver-btn-active': active}">
    <button type="button" v-bind="$attrs" v-on="$listeners" tabindex="-1" role="tab" class="ver-side-button-button">
      <slot>
        <div ref="eIconWrapper" class="ver-button-icon-wrapper" aria-hidden="true">
          <slot name="icon">
            <q-icon v-if="icon" v-bind="iconProps" :color="active?'primary': ''" :name="icon"/>
          </slot>
        </div>
        <span class="ver-button-label"><slot name="label">{{ label }}</slot></span>
      </slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'VerticalButton',
  props: {
    label: String,
    icon: String,
    iconProps: {
      type: Object,
      default: () => ({ size: 'sm' })
    },
    active: Boolean
  }
}
</script>
