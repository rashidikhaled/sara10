<template>
  <div class="fit" id="task-default-tabs">
    <safa-tabs fit height="100%" type="fixed" v-model="activeTab">
      <template #after>
        <span style="top: 3px;position: relative;margin-left: 8px;">
          <q-btn @click="ShowWkt" color="amber-7" size="sm" v-if="taskInfo && taskInfo.WKT">
            <q-icon size="16px" color="white">
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="16px"
                   viewBox="0 0 24 24" width="16px"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path
                d="M12,2c-4.2,0-8,3.22-8,8.2c0,3.32,2.67,7.25,8,11.8c5.33-4.55,8-8.48,8-11.8C20,5.22,16.2,2,12,2z M12,12c-1.1,0-2-0.9-2-2 c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C14,11.1,13.1,12,12,12z"/></g></svg>
            </q-icon>&nbsp;
            <label>جانمایی ملک</label>
          </q-btn>
        </span>
      </template>
      <template #tabs>
        <tab-menu name="tabChecklist">چک لیست</tab-menu>
        <tab-menu name="tabComments">توضیحات</tab-menu>
        <tab-menu name="tabDetails">تاریخچه تغییرات</tab-menu>
        <tab-menu name="tabForms" v-if="showFormsPanel">فرم ها</tab-menu>
        <tab-menu name="tabReports" v-if="showReportsPanel">گزارش ها</tab-menu>
      </template>
      <tab-content :padding="false" name="tabChecklist">
        <fit>
          <!--<safa-splitter fit reverse :limits="[0,Infinity]" v-model="checklistSplitter" :separator-class="layoutMode !== 'full' ? 'hide' : ''">
            <template #before>
              <fit>
                <WorkflowCheckList
                  :nidProc="taskInfo.NidProc"
                  :nidTask="taskInfo.NidTask"
                  :task-info="taskInfo"
                  v-if="taskInfo!==null"/>
              </fit>
            </template>
            <template #after>
              <fit>
                <umap :taskInfo="taskInfo" v-if="taskInfo"/>
                &lt;!&ndash;<base-map
                  style="height: 500px;"
                  update-view
                  :zoom="zoom"
                  :center="center"
                  :wkt-list="wktList"
                  @update:selectedCoords="locationSelected"
                />&ndash;&gt;
                &lt;!&ndash;              <SafaKeyValues v-if="taskInfo!==null" :list="taskExtraInfo"/>&ndash;&gt;
              </fit>
            </template>
          </safa-splitter>-->
          <WorkflowCheckList
            :nidProc="taskInfo.NidProc"
            :nidTask="taskInfo.NidTask"
            :task-info="taskInfo"
            v-if="taskInfo!==null"
            ref="tabChecklist"
          />
        </fit>
      </tab-content>
      <tab-content name="tabComments" :style="{'background-color: #edf2f8': !$q.dark.isActive}">
        <TaskComments
          :nidProc="taskInfo.NidProc"
          v-if="taskInfo!==null"
          ref="tabComments"
        />
      </tab-content>
      <tab-content name="tabDetails">
        <TaskHistory :nidProc="taskInfo.NidProc" v-if="taskInfo!==null" ref="tabDetails"/>
      </tab-content>
      <tab-content name="tabForms" :style="{'background-color: #edf2f8': !$q.dark.isActive}" v-if="showFormsPanel">
        <show-thumbnails :items="forms"
                         :searchFunc="(items,term)=> items.filter(x=> x.Caption.normalizeText().includes(term))"
                         @select="selectForm"
                         title-field-name="Caption"
                         ref="tabForms">
          <template v-slot:icon>
            <q-icon color="primary" size="20px" style="transform: scaleX(-1); -ms-transform: scaleX(-1);">
              <svg height="300px" viewBox="0 0 64 64" width="300px" x="0px" xmlns="http://www.w3.org/2000/svg"
                   y="0px">
                <g data-name="Page Layout">
                  <path
                    d="M57,7H7a5,5,0,0,0-5,5V52a5,5,0,0,0,5,5H57a5,5,0,0,0,5-5V12A5,5,0,0,0,57,7ZM29,12a2,2,0,1,1-2,2A2,2,0,0,1,29,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,20,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,11,12ZM60,52a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V20H60Z"/>
                  <rect height="14" rx="1" ry="1" width="14" x="8" y="37"/>
                  <rect height="10" rx="1" ry="1" width="48" x="8" y="25"/>
                  <rect height="14" rx="1" ry="1" width="32" x="24" y="37"/>
                </g>
              </svg>
            </q-icon>
          </template>
        </show-thumbnails>
      </tab-content>
      <tab-content name="tabReports" :style="{'background-color: #edf2f8': !$q.dark.isActive}" v-if="showReportsPanel">
        <show-thumbnails :items="reports"
                         :searchFunc="(items,term)=> items.filter(x=> x.Caption.normalizeText().includes(term))"
                         @select="selectReport"
                         title-field-name="Caption"
                         ref="tabReports">
          <template v-slot:icon>
            <q-icon color="primary" size="20px" style="transform: scaleX(-1); -ms-transform: scaleX(-1);">
              <svg height="300px" viewBox="0 0 64 64" width="300px" x="0px" xmlns="http://www.w3.org/2000/svg"
                   y="0px">
                <g data-name="Report Page">
                  <path
                    d="M57,7H7a5,5,0,0,0-5,5V52a5,5,0,0,0,5,5H57a5,5,0,0,0,5-5V12A5,5,0,0,0,57,7ZM29,12a2,2,0,1,1-2,2A2,2,0,0,1,29,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,20,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,11,12ZM60,52a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V20H60Z"/>
                  <path d="M49,27H39a1,1,0,0,1,0-2H49a1,1,0,0,1,0,2Z"/>
                  <path d="M55,33H33a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                  <path d="M55,39H33a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                  <path d="M55,45H33a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                  <path d="M55,51H8a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                  <path d="M19,34h8.95A10,10,0,0,0,19,25.05Z"/>
                  <path d="M18,36a1,1,0,0,1-1-1V25.05A10,10,0,1,0,27.95,36Z"/>
                </g>
              </svg>
            </q-icon>
          </template>
        </show-thumbnails>
      </tab-content>
    </safa-tabs>
  </div>
</template>

<script>
import WorkflowCheckList from './WorkflowCheckList'
import TaskComments from './TaskComments'
import ShowThumbnails from './ShowThumbnails'
import TaskHistory from './TaskHistory'
// import BaseMap from '../partials/map/BaseMap'

export default {
  name: 'DefaultTabs',
  components: {
    TaskHistory,
    TaskComments,
    WorkflowCheckList,
    ShowThumbnails
    // BaseMap
  },
  props: {
    layoutMode: String,
    taskInfo: Object,
    forms: [Object, Array],
    reports: [Object, Array],
    defaultActiveTab: String,
    nidTask: String,
    showFormsPanel: Boolean,
    showReportsPanel: Boolean
  },
  data () {
    return {
      activeTab: 'tabChecklist',
      checklistSplitter: 50,
      isSelectingFromMap: false
    }
  },
  computed: {
    splitterLimit () {
      if (this.layoutMode !== 'full') {
        return [0, 0]
      }
      return [0, 50]
    },
    zoom () { // ok
      return this.WKT ? 18 : 12
    },
    center () {
      if (this.WKT) {
        // eslint-disable-next-line no-undef
        return window.getConfigValue('mapConfig').lonLat
      }
      // eslint-disable-next-line no-undef
      return window.getConfigValue('mapConfig').lonLat
    }, // ok
    WKT () {
      return this.taskInfo?.WKT || null
    },
    wktList () {
      if (!this.WKT) {
        return []
      }
      return [{ location: this.WKT }]
    } // ok
  },
  methods: {
    ShowWkt () {
      this.$emit('show:wkt')
      this.$store.dispatch('ui/setLayoutMode', 'half')
    },
    selectForm (form) {
      this.$emit('select:form', form)
    },
    selectReport (form) {
      this.$emit('select:report', form)
    },

    async locationSelected ([lon, lat]) {
      // console.log('locationSelected', lon, lat)
      /* if (!this.isSelectingFromMap || !lon || !lat) {
            return
          }
          this.isSelectingFromMap = false
          try {
            this.loading = true
            const { data } = await this.$services.call({
              service: 'map',
              path: 'MapFind',
              payload: {
                PWKt: '',
                PBuffer: 0,
                PWhere: ` and layerid in(${webconfig.mapConfig?.mojoodLayerIDs}) and Geometry::STGeomFromText('Point(${lon} ${lat})', 4326).MakeValid().STIntersects(Geom.MakeValid()) = 1`,
                Pfrom: 1,
                Pto: 2
              }
            })
            const [{ Code }] = data || []
            if (Code) {
              this.dataModel.nosaziCode = Code
              await this.load()
            }
          } catch (e) {
            this.$logger.catchError(e)
          } finally {
            this.loading = false
          } */
    }
  },
  mounted () {
    if (this.defaultActiveTab) {
      this.activeTab = this.defaultActiveTab
    }
  },
  watch: {
    layoutMode (newVal) {
      if (newVal === 'full') {
        this.checklistSplitter = 50
      } else {
        this.checklistSplitter = 100
      }
    },
    defaultActiveTab () {
      if (this.defaultActiveTab) {
        this.activeTab = this.defaultActiveTab
      }
    }

    /* activeTab () {
      try {
        setTimeout(() => {
          this.$refs[this.activeTab].$refs.input.focus()
          this.$refs[this.activeTab].$refs.input.select()
        }, 10)
      } catch (ex) {}
    } */
  }

}
</script>
<!--
<style lang="scss">
  #task-default-tabs nav.chrome-tabs {
    background: #edf2f8;

    .chrome-tabs-bottom-bar {
      display: none;
    }
  }
</style>-->
