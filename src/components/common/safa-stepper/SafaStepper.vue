<template>
  <div class="safa-stepper" v-if="steps.length">
    <div
      class="safa-stepper__step"
      v-for="(step, _index) in steps"
      :key="step.ID"
      :class="{ active: isActive(step) }"
    >
      <!-- <q-icon
        :name="isActive(step) ? 'check' : 'content_paste'"
        size="15px"
      /> -->
      <safa-label :id="`stepper-step-${_index}`" :ellipsisTxt="step.Title">{{
        step.Title
      }}</safa-label>
    </div>
  </div>
</template>

<script>
export default {
  name: "SafaStepper",

  props: {
    // content & value
    value: {
      type: Number,
      default: -1
    },
    steps: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    isActive (step) {
      return this.value === step.ID
    }
  }
}
</script>

<style lang="scss">
.safa-stepper {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & &__step {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    background-color: #ddd;
    min-width: 135px;
    color: #415b74;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 20px;
    height: 30px;
    transition: 0.2s;

    &::before,
    &::after {
      position: absolute;
      content: "";
      top: 0;
      height: 0;
      border-style: solid;
      border-width: 15px 0 15px 15px;
      border-color: transparent;
      transition: 0.2s;
    }

    &::before {
      left: -15px;
      width: 1px;
      border-top-color: #ddd;
      border-bottom-color: #ddd;
    }

    &::after {
      right: -15px;
      width: 0;
      border-left-color: #ddd;
    }

    &:first-child {
      margin-left: 0;
      border-radius: 2px 0 0 2px;

      &::before {
        display: none;
      }
    }

    &:last-child {
      padding-right: 1.5rem;
      border-radius: 0 2px 2px 0;

      &::after {
        display: none;
      }
    }

    &.active {
      background: var(--q-color-primary) !important;
      color: #fff;

      &::before {
        border-top: 15px solid var(--q-color-primary) !important;
        border-bottom: 15px solid var(--q-color-primary) !important;
      }

      &::after {
        border-left-color: var(--q-color-primary) !important;
      }
    }
  }
}
</style>
