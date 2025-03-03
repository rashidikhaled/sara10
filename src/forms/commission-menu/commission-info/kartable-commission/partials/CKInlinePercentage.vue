<template>
  <div class="inline-percentage" dir="ltr">
    <span :style="{ width: `${internalPercentage}%`, backgroundColor: color }">
      <template v-if="showValue"> %{{ internalPercentage }} </template>
    </span>
  </div>
</template>

<script>
export default {
  name: "CKInlinePercentage",
  props: {
    percent: Number,
    color: String,
    showValue: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      internalPercentage: 0
    }
  },
  methods: {
    setValue (value) {
      this.$nextTick(() => {
        this.internalPercentage = value
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setValue(this.percent)
    })
  },
  watch: {
    percent () {
      this.setValue(this.percent)
    }
  }
}
</script>

<style lang="scss">
.inline-percentage {
  background-color: #f5f5f5;
  border: 1px solid #e9e9e9;
  border-radius: 20px;
  overflow: hidden;
  width: 80px;
  height: 16px;
  max-width: 100%;
  min-width: 0;
  position: relative;
  display: inline-block;
  box-shadow: inset -4px 4px 4px rgba(0, 0, 0, 0.1);

  body.body--dark & {
    background-color: var(--dark);
    border-color: var(--dark-border);
  }

  > span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    min-width: 0;
    color: rgba(255, 255, 255, 0.6);
    font-size: 10px;
    border-radius: 20px;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    transition: 1s width ease-in;

    body.body--dark & {
      color: var(--dark-text-color);
    }
  }
}
</style>
