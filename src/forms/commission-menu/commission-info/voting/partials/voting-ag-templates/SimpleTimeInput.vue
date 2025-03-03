<template>
    <div class="q-pa-sm">
        <safa-text
          v-model="value"
          v-bind="$attrs"
        >
          <template v-slot:append>
            <q-btn icon="access_time" round color="primary" label=""
              size="xs"
              dense>
                <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
                <q-time v-model="proxyTime">
                    <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
                    </div>
                </q-time>
                </q-popup-proxy>
            </q-btn>
          </template>
        </safa-text>
    </div>
  </template>

<script>

export default {
  props: {
    value: {
      type: [String]
    }
  },
  mounted () {
    let timePattern = /\d+:\d+/
    let extractedTime = this.value.match(timePattern)[0]
    debugger
    console.log(extractedTime)
    this.time = extractedTime
    this.proxyTime = extractedTime
  },
  data () {
    return {
      proxyTime: '',
      time: ''
    }
  },
  methods: {
    updateProxy () {
      this.proxyTime = this.time
      this.value = this.time
    },

    save () {
      this.time = this.proxyTime
      this.value = this.time
      this.$emit('input', this.value)
    }
  }

}
</script>
