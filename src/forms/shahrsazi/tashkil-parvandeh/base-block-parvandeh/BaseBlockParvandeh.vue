<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <!-- add dir props #487 -->

    <safa-tabs
      v-model="currentTab"
      :padding="false"
    >
      <template v-slot:tabs>
        <tab-menu
          v-for="({name, title}) in tabs"
          :key="name"
          :name="name"
          :label="title"
        />
      </template>
      <tab-content
        name="blockInfo"
        title="مشخصات بلوک"
      >
        <tab-block-info
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="comments"
        title="توضیحات"
      >
        <tab-comment
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
    </safa-tabs>

    <form-actions
      v-if="!readOnly"
      :m="mode"
      @edit="isEditable = true"
      @save="save"
      @cancel="load"
      editSPId="2c2e9f85-2dd8-4a63-a574-510c78a86ed0"
    >
      <safa-securityPanel
        id="b7ec4e98-d647-49df-8f63-d929aa04f29d"
        caption="ویرایش_جستجوی ملک"
      >
        <q-btn
          outline
          color="primary"
          label="ویرایش_جستجوی ملک"
        ></q-btn>
      </safa-securityPanel>
    </form-actions>
  </safa-form>
</template>

<script>
import requestModel from './models/requestModel'
import TabBlockInfo from './partials/TabBlockInfo'
import TabComment from './partials/TabComment'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'BaseBlockParvandeh',
  mixins: [baseFormMixin],
  components: {
    TabBlockInfo,
    TabComment
  },

  props: {
    value: Object,
    parentBaseNosaziCode: Object,
    readOnly: Boolean,
    // formKey: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    // title: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    name: {
      type: String,
      default: '',
      required: true
    }
  },

  data () {
    return {
      title: 'شهرسازی- تشکیل پرونده بلوک',
      formKey: '51470368-c5b5-45b1-995d-ec26f858ad26',
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

        const { data } = await this.$services.SC.saveParvandehBlock(
          {
            PObj: this.currentData,
            pUser: this.currentUser,
            PDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: '00000000-0000-0000-0000-000000000000'
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess('ذخیره با موفقیت انجام شد')
          this.load()
          await this.log({
            action: this.logActions.save,
            bizCode: this.currentData._nidBase,
            bizCodeTitle: 'NidBase',
            nosaziCode: convertNosaziCodeObjectToString(
              this.parentBaseNosaziCode
            )
          })
        } else {
          this.showError('انجام نشد')
        }

        // end
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      try {
        this.showLoading()

        const { data } = await this.$services.SC.getParvandehBlock(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              'Base_NosaziCode,Base_BlockInfo,Base_BlockOrganize,Base_BlockPath,Base_BlockPathConstant,Base_GreenSpace,MapImage'
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.NidBase,
            bizCodeTitle: 'NidBase',
            nosaziCode: convertNosaziCodeObjectToString(
              this.parentBaseNosaziCode
            )
          })
        }
      } catch (e) {
        this.serverError()
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
