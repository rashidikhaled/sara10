<template>
  <div class="flex q-gutter-x-sm">
    <span style="width: 18px; color: var(--q-color-primary)">
      <q-icon
        size="18px"
        name="comment"
        v-if="params.data.HasComments"
        @click="noteDialog = true"
      />
    </span>

    <span
      :style="`color: ${params.data.IsLaterDate ? '#de2209' : '#777'}`"
      :class="`ckg_later_title`"
    >
      <span style="width: 18px">
        <q-icon
          size="18px"
          name="report_problem"
          v-if="params.data.IsLaterDate"
        />
        <q-icon size="18px" name="hourglass_top" v-else />
      </span>
      <q-tooltip anchor="top middle" self="top middle">
        {{ params.data.LaterTime }} روز
      </q-tooltip>
    </span>

    <safa-popup
      v-model="noteDialog"
      width="600px"
      height="500px"
      title="یادداشت"
    >
      <Note />
    </safa-popup>
  </div>
</template>

<script>
import Note from '../../../forms/commission-menu/commission-info/kartable-commission/partials/Note.vue'

export default {
  name: "AgNoteAndLaterTimeCellRenderer",

  components: {
    Note
  },

  data () {
    return {
      noteDialog: false
    }
  }
}
</script>

<style scoped lang="scss">
.ckg_later_title {
  font-size: 11px;
}
</style>
