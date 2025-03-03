<template>
  <div class="vertical-buttons" role="tablist">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VerticalButtons'
}
</script>
<style lang="scss">
.vertical-buttons {
  .ver-button {
    .ver-side-button-button {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
      white-space: nowrap;
      outline: none;
      cursor: pointer;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      background-color: transparent;
      padding: 12px 0;
      width: 100%;
      margin: 0;
      min-height: calc(var(--ag-grid-size) * 18);
      background-position-y: center;
      background-position-x: center;
      background-repeat: no-repeat;
      border: none;
      border-right: 3px solid transparent;

      .ver-button-label {
        writing-mode: vertical-rl;
        transform: rotate(-180deg);
      }
    }
    &.ver-btn-active {
      .ver-side-button-button {
        border-right-color: var(--q-color-primary);
        color: var(--q-color-primary);
      }
    }
  }
}
</style>
