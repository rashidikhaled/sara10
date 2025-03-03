<template>
  <safa-form
    :id="formKey"
    :caption="title"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />

    <safa-tabs
      v-model="currentTab"
    >
      <template v-slot:tabs>
        <tab-menu
          v-for="({name, title}) in tabs"
          :key="name"
          :name="name"
          :label="title"
        />
      </template>
      <tab-content name="blockInfo">
        <tab-block-info
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content name="comments">
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
      @save="handleSaveAction"
      @cancel="load"
      editSPId="3c31914b-302b-4845-aefd-4378836317b2"
    >
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
  name: 'BaseBlockAudit',
  mixins: [baseFormMixin],
  components: {
    TabBlockInfo,
    TabComment
  },

  props: {
    value: Object,
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
    },
    baseNosaziCode: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      formKey: 'fe466cc5-0a01-459e-9adc-073a8322d024',
      title: 'شهرسازی- اطلاعات ممیزی بلوک',
      result: null,
      main: true, // این فرم به صورت فرم اصلی هم در گردش کار استفاده شده برای همین این فید باید اضافه بشه
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
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    handleSaveAction () {
      this.showSending()
      this.$services.SC.saveParvandehBlock(
        {
          PObj: this.currentData,
          pUser: this.currentUser,
          PDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          }
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.resultSave = this.getResponse(data)
          if (this.resultSave.success) {
            this.showSuccess('ذخیره با موفقیت انجام شد')

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })

            this.load()
          } else {
            this.showError('انجام نشد')
          }
        })
        .catch((response) => {
          this.resultSave = this.getResponse(response)
          this.showError('ذخیره انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    load () {
      this.isEditable = false
      this.showLoading()

      return this.$services.SC.getParvandehBlock(
        {
          PNidBase: this.value.NidBase,
          PLoadFun:
            'Base_NosaziCode,Base_BlockInfo,Base_BlockOrganize,Base_BlockPath,Base_BlockPathConstant,Base_GreenSpace,MapImage'
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.currentData = this.result.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })
          } else {
            this.showError('انجام نشد')
          }
        })
        .catch((data) => {
          this.getResponse(data)
        })
        .finally(() => {
          this.hideLoading()
        })
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
