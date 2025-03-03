<template>
  <div>
    <safa-status :result="result" class="col-12"/>
    <safa-status :result="resultSave" class="col-12"/>

    <q-tabs
      v-model="currentTab"
      active-bg-color="primary"
      active-color="white"
      align="left"
      class="p-mb-lg"
      dense
    >
      <q-tab
        v-for="({name, title}) in tabs" :key="name"
        :label="title"
        :name="name"
      />
    </q-tabs>

    <q-tab-panels
      v-model="currentTab"
      animated
    >
      <q-tab-panel name="blockInfo">
        <tab-block-info v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="comments">
        <tab-comment v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

    </q-tab-panels>

    <form-actions
      v-if="!readOnly"
      :m="mode"
      class="col-12"
      @cancel="load"
      @edit="isEditable = true"
      @save="save"
    >
    </form-actions>
  </div>
</template>

<script>
import requestModel from './models/requestModel'
import TabBlockInfo from './partials/TabBlockInfo'
import TabComment from './partials/TabComment'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseBlockParvandeh',
  mixins: [baseFormMixin],
  components: {
    TabBlockInfo,
    TabComment
  },

  props: {
    title: String,
    formKey: String,
    name: String,

    value: Object,
    readOnly: Boolean
  },

  data () {
    return {
      result: null,
      resultSave: null,
      currentTab: 'blockInfo',
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'blockInfo',
          title: 'مشخصات بلوک'
        },
        {
          name: 'comments',
          title: 'توضیحات'
        }
      ]
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.value.District
        }
      }
    },
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    async save () {
      try {
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehBlock({
          PObj: this.currentData,
          PUser: this.currentUser,
          PDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          }
        }, this.config)
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: this.currentUser,
            bizCodeTitle: 'currentUser'
          })
          this.success('ذخیره با موفقیت انجام شد')
          this.load()
        } else {
          this.error('انجام نشد')
        }

        // end
      } catch (e) {
        this.error('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false

      try {
        this.showLoading()

        const { data } = await this.$services.SC.getParvandehBlock({
          PNidBase: this.value.NidBase,
          PLoadFun: 'Base_NosaziCode,Base_BlockInfo,Base_BlockOrganize,Base_BlockPath,Base_BlockPathConstant,Base_GreenSpace,MapImage'
        }, this.config)
        this.result = this.getResponse(data)
        if (this.result.success) {
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: 'NidBase'
          })
          this.currentData = this.value.NidBase
        } else {
          this.error('انجام نشد')
        }

        // end
      } catch (e) {
        this.error('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    }
  },

  created () {
    this.currentData = { ...requestModel }
  },

  mounted () {
    this.load()
  }
}
</script>
