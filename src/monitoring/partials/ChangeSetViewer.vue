<template>
  <div class="changeset-viewer">
    <div class="changeset-viewer-header q-pb-sm q-mb-sm">
      <div class="text-subtitle2 row q-gutter-sm items-center">
        <div
          color="primary"
          style="
              margin-bottom: 0;
              font-size: 14px;
              color: #181818;
              font-weight: normal;
            "
        >
          نام فرم:
        </div>
        <div style="
              margin-bottom: 0;
              font-size: 14px;
              color: #181818;
              font-weight: normal;
              overflow: hidden;
              white-space: nowrap;
              width: 400px;
              text-overflow: ellipsis;
            ">
          {{ data.action.formCaption }} ({{ data.action.formName }})
        </div>
      </div>
      <div class="text-h6 row q-gutter-sm items-center">
        <span
          class="text-subtitle2 text-grey-6"
          style="font-weight: 400;"
        >
          ({{data.logTime}} - {{ data.logDate }}) &nbsp;<q-badge color="green"> {{ actionTypeCodeToTitle(data.actionType) }} </q-badge>
        </span>
      </div>
    </div>
    <safa-notice v-if="data.saveDesc && data.saveDesc !== ''">
      {{data.saveDesc}}
    </safa-notice>
    <LogItem
      v-for="(log,index) in data.action.formChangeSet"
      :log="log"
      :key="index"
      :feildCaption="data.action.formChangeSet"
    />
    <p
      class="q-ma-sm"
      v-if="data.action.formChangeSet.length === 0 && data.saveDesc !== null"
    >
      <span
        class="material-icons q-mr-sm"
        style="font-size: 17px; color: orange;"
      > warning </span>
      گزارشی از تغییرات برای این سطر وجود ندارد.
    </p>
  </div>
</template>

<script>
import LogItem from './LogItem'
import monitoringMixin from "../mixins/monitoringMixin"
export default {
  mixins: [monitoringMixin],
  name: 'ChangeSetViewer',
  components: { LogItem },
  props: {
    data: Object
  }
}
</script>
