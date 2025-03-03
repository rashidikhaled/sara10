<template>
  <div class="row fit">
    <q-tabs
        class="col-12"
        align="left"
        v-model="currentTab"
    >
      <q-tab name="actions" label="لیست فعالیت های صورت گرفته"/>
      <q-tab name="formList" label="لیست فرم ها و گزارشات انجام شده از ابتدا"/>
      <q-tab name="more" label="اطلاعات بیشتر"/>
      <q-tab name="comments" label="توضیحات"/>
      <q-tab name="acceptances" label="لیست تاییدات"/>
    </q-tabs>
    <q-tab-panels
        class="col-12"
        style="min-height: 200px"
        v-model="currentTab"
    >
      <q-tab-panel name="actions">
        <safa-datagrid
            hide-toolbar
            :allow-remove-row="false"
            :add-record-icon="false"
            :allow-copy="false"
            :allow-new-row="false"
            :allow-reload="false"
            :columns="actionsColumn"
            :value="currentData.Task"
        />
      </q-tab-panel>
      <q-tab-panel name="formList">
        <safa-datagrid
            hide-toolbar
            :allow-remove-row="false"
            :add-record-icon="false"
            :allow-copy="false"
            :allow-new-row="false"
            :allow-reload="false"
            :columns="formListColumns"
            :value="currentData.WorkflowInstanceLog"
        />
      </q-tab-panel>
      <q-tab-panel name="more">
        <q-list class="full-width">
          <template
              v-for="(prop, i) in currentData.ExtendedProp.PropList.filter(x=> x.PropType !=='Hidden')"
          >
            <q-item :key="i + 'p'">
              <q-item-section>
                {{ prop.PropTitle }}
              </q-item-section>
              <q-item-section side>
                {{ prop.PropValue }}
              </q-item-section>
            </q-item>
            <q-separator :key="i + 'sep'" inset/>
          </template>
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="comments">
        <q-timeline>
          <q-timeline-entry
              v-for="(comment, i) in currentData.Comments" :key="i"
              class="q-mx-sm"
              :avatar="`http://dev.safarayaneh.com:7010/img/ProfilePics/${(i % 9) + 1}.png`"
              :title="comment.UserName"
              :subtitle="comment.CommentsDate + ' ساعت ' + comment.CommentsTime"
              :body="comment.Comments"
              :sent="comment.NidUser !== currentUser.UserGuid"
              :color22="comment.NidUser === currentUser.UserGuid ? 'grey-1' : 'blue-2'"
          >
          </q-timeline-entry>
        </q-timeline>

      </q-tab-panel>
      <q-tab-panel name="acceptances"></q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'gardesh-parvandeh',
  mixins: [baseFormMixin],

  props: {
    value: Object
  },

  data () {
    return {
      result: null,
      loading: false,
      currentTab: 'actions',
      currentData: {},

      actionsColumn: [
        { field: 'NidSort', title: 'ردیف' },
        { field: 'TaskTitel', title: 'نام فعالیت' },
        { field: 'CreatedByName', title: 'درخواست کننده کار' },
        { field: 'AssingToUserName', title: 'ارجاع شده به' },
        { field: 'TransformUserName', title: 'انجام دهنده' },
        { field: 'TaskStartDate', title: 'تاریخ شروع' },
        { field: 'TaskStartTime', title: 'ساعت شروع' },
        { field: 'TaskCloseDate', title: 'تاریخ پایان' },
        { field: 'TaskCloseTime', title: 'ساعت پایان' }
      ],
      formListColumns: [
        { field: 'name', title: 'نام فرم یا گزارش' },
        { field: 'name1', title: 'انجام دهنده' },
        { field: 'name2', title: 'تاریخ' },
        { field: 'name3', title: 'ساعت' },
        { field: 'name4', title: 'نوع فعالیت' }
      ]
    }
  },

  methods: {
    async load () {
      if (!this.value || !this.value.NidProc) {
        return this.showError('No task has been selected')
      }

      try {
        this.loading = true
        const { data } = await this.$srvWorkflow.getProcessInfo({
          PNidProc: this.value.NidProc
        })
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('Data has not been fetched')
        }
        this.currentData = this.result.data

        // end
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.load()
  }
}
</script>
