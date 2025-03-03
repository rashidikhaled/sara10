<template>
  <table class="clog--table">
    <thead>
      <tr>
        <th
          v-for="(col,index) in log.columnSchemaInfos"
          :key="index"
        >{{(col.columnCaption || col.columnName) == ("selected" || "isSelectedNode") ? 'انتخاب' : col.columnCaption || col.columnName }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        :class="`log-status-${row.key}`"
        v-for="(row,rowIndex) in log.oldValues"
        :key="rowIndex"
        style="border-bottom:1px solid #ddd"
      >
        <td
          v-for="(td,tdIndex) in row.value"
          :key="tdIndex"
          class="clog--td"
        >
          <div
            class="log--value grid-td"
            v-if="td.columnValue !== log.newValues[rowIndex].value[tdIndex].columnValue && log.newValues[rowIndex].value[tdIndex].columnValue !== ''"
          >
            <span
              class="log--value-old"
              :title="`مقدار قبلی:  ${td.columnValue === '' ? 'خالی' : td.columnValue}`"
            >
              <div style="display:flex;justify-content: space-around;text-align:center;">
                <!-- <q-checkbox v-if="td.columnValue === 'true' || td.columnValue === 'false' || td.columnValue === 'null'" size="xs" m="r" v-model="td.columnValue" />
                <span v-else>
                  {{`${td.columnValue === '' ? '- - -' : td.columnValue}`}}
                </span> -->
                <span>
                  {{`${td.columnValue === '' ? '- - -' : td.columnValue}`}}
                </span>
              </div>
            </span>
            <span
              class="log--value-new"
              :title="`مقدار جدید:  ${log.newValues[rowIndex].value[tdIndex].columnValue}`"
            >
              <div style="display:flex;justify-content: space-around;">
                <!-- <q-checkbox v-if="log.newValues[rowIndex].value[tdIndex].columnValue === 'true' || log.newValues[rowIndex].value[tdIndex].columnValue === 'false' || log.newValues[rowIndex].value[tdIndex].columnValue === 'null'" size="xs" m="r" v-model="log.newValues[rowIndex].value[tdIndex].columnValue" />
                <span v-else> -->
                <span>
                  {{log.newValues[rowIndex].value[tdIndex].columnValue}}
                </span>
              </div>
            </span>
          </div>
          <div v-else>
            <span :title="`مقدار قبلی:  ${td.columnValue === '' && log.newValues[rowIndex].value[tdIndex].columnValue == '' ? 'خالی' : td.columnValue}`">
              <div style="display:flex;justify-content: space-around;text-align:center; min-width:50px">
                <!-- <q-checkbox v-if="td.columnValue === 'false'" size="xs" m="r" v-model="td.columnValue" />
                <span style="color: gray; line-height:30px" v-else> -->
                <span style="color: gray; line-height:30px">
                  {{td.columnValue === '' && log.newValues[rowIndex].value[tdIndex].columnValue == '' ? '- - -' : td.columnValue}}
                </span>
              </div>
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'CustomTable',
  props: {
    log: Object,
    logType: String
  }
}
</script>
