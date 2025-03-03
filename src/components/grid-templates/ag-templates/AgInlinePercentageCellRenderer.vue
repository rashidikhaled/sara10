<template>
  <div class="full-height flex items-center q-gutter-x-sm">
    <AgCKDotAgentColor :row="params.data" />
    <div class="inline-percentage" dir="ltr">
      <span
        :style="{
          width: `${internalPercentage}%`,
          background: percentageColor,
        }"
      >
        <template> %{{ internalPercentage }} </template>
      </span>
    </div>
  </div>
</template>

<script>
import AgCKDotAgentColor from './AgCKDotAgentColor.vue'

export default {
  name: "AgInlinePercentageCellRenderer",
  data () {
    return {
      internalPercentage: 0
    }
  },
  computed: {
    percentageColor () {
      if (this.internalPercentage > 85) return "#4caf50"
      else if (this.internalPercentage > 50) return "#fdd835"
      else if (this.internalPercentage > 25) return "#f79300"
      return "#ff5722"
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
      this.setValue(this.params.data.CompeletPrecent)
    })
  },
  watch: {
    "params.data.CompeletPrecent": {
      handler () {
        this.setValue(this.params.data.CompeletPrecent)
      },
      deep: true
    }
  },
  components: { AgCKDotAgentColor }
}
</script>

<style lang="scss" scoped>
.inline-percentage {
  background-color: #f3f4f5;
  border: 0.003125rem solid #dbdee2;
  border-radius: 4px;
  overflow: hidden;
  // flex-grow: 1;
  height: 18px;
  max-width: 115px;
  min-width: 115px;
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
    text-shadow: 0px 0px 1px rgba(255, 255, 255, 45%);
    box-shadow: inset 0 4px 4px rgba(255, 255, 255, 40%);
    font-size: 10px;
    border-radius: 4px;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 50%;
    height: 100%;
    transform: translateY(-50%);
    transition: 1s width ease-in;

    body.body--dark & {
      color: var(--dark-text-color);
    }
  }
}
</style>
