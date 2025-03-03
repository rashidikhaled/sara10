<template>
  <div class="row">
    <safa-label
      v-if="label"
      class="col-12 items-center"
      :class="{ 'col-sm-auto': !this.labelShrink }"
      style="max-height: 40px; display: inline-flex;"
    >
      {{ label }}
    </safa-label>
    <q-input
      v-on="$listeners"
      v-bind="$attrs"
      :disable="m === 'r'"
      filled
      :value="value"
      mask="time"
      :rules="['time']"
      @input="handleSelectTime"
      :dense="dense"
      :m="m"
      class="q-pb-none"
    >
      <template v-slot:append>
        <q-icon
          name="access_time"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time
              v-model="time"
              v-bind="$attrs"
              :hour-options="hourOptions"
              mask="hh[h and ]mm[ minutes (]A)"
              class="q-pb-none"
            >
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  label="Close"
                  color="primary"
                  flat
                />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  name: 'SafaTimePicker',
  props: {
    hourOptions: Array,
    value: String,
    label: String,
    dense: Boolean,
    m: String,
    labelShrink: Boolean
  },
  data () {
    return {
      time: String
    }
  },
  methods: {
    handleSelectTime () {
      this.$emit('input', this.time)
    }
  }
}
</script>
