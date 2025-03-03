<template>
  <div class="Croque" style="border: 1px dashed grey">
    <div style="height: 10rem; width: 10rem" v-if="isPreview">View mode</div>
    <div style="height: 10rem; width: 10rem" v-else>Edit mode</div>

    <q-btn v-if="!isPreview" icon="edit" label="ترسیم کروکی" />
    <q-btn v-else icon="pageview" label="مشاهده کروکی" />
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  name: "UCroquis",
  mixins: [baseFormMixin],

  data () {
    return {}
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
