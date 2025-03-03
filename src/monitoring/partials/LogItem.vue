<template>
  <div>
    <div class="clog--item">
      <h2>{{log.fieldCaption === "Untitled" ? `${'بدون عنوان (' + log.fieldName + ')'}` : log.fieldCaption}}</h2>
      <div class="clog--details">
        <div
          v-if="logType==='text'"
          class="clog--text"
        >
          <div
            class="clog--old"
            :title="`مقدار قبلی:  ${log.oldValue === '' ? 'خالی' : log.oldValue}`"
          >
            {{`${log.oldValue === "" ? '- - -' : log.oldValue}`}}
          </div>
          <div
            class="clog--new"
            :title="`مقدار جدید:  ${log.newValue === '' ? 'خالی' : log.newValue}`"
          >
            {{log.newValue === '' ? '- - -' : log.newValue}}
          </div>
        </div>
        <div
          v-else-if="logType==='boolean'"
          class="clog--text"
        >
          <div
            class="clog--old"
            :title="`مقدار قبلی:  ${log.oldValue}`"
          >
            <span
              v-if="log.oldValue===`false`"
              class="material-icons"
            >
              close
            </span>
            <span
              v-else-if="log.oldValue===`true`"
              class="material-icons"
            >
              check
            </span>
          </div>
          <div
            class="clog--new"
            :title="`مقدار جدید:  ${log.newValue}`"
          >
            <span
              v-if="log.newValue===`false`"
              class="material-icons"
            >
              close
            </span>
            <span
              v-else-if="log.newValue===`true`"
              class="material-icons"
            >
              check
            </span>
          </div>
        </div>
        <div
          v-else-if="logType==='grid'"
          id="detailgrid"
        >
          <CustomTable
            :logType="logType"
            :log="log"
            :feildCaption="feildCaption"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomTable from './CustomTable.vue'
export default {
  components: { CustomTable },
  name: 'LogItem',
  props: {
    log: Object,
    feildCaption: Array
  },

  computed: {
    logType () {
      const type = this.log.fieldType.toLowerCase()
      if (type === 'grid') {
        return 'grid'
      } else if (type === 'boolean') {
        return 'boolean'
      } else {
        return 'text'
      }
    }
  }
}
</script>
