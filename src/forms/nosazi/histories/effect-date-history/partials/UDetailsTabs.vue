<template>
  <fit>
    <safa-tabs
      v-model="activeTab"
      :bordered="false"
    >
      <template v-slot:tabs>
        <tab-menu
          label="مشخصات"
          name="specifications"
        />
        <tab-menu
          label="جهات اربعه"
          name="baseEdge"
        />
        <tab-menu
          label="کاربری و پیش آمدگی"
          name="karbariVaPishamadegi"
        />
      </template>

      <tab-content name="specifications">
        <USpecifications
          v-model="results"
          :engineerInfo="engineerInfo"
          :isNew="isNew"
          :m="mode"
        />
      </tab-content>

      <tab-content :padding="false" name="baseEdge">
        <UBaseEdge
          v-model="results"
          :engineerInfo="engineerInfo"
          :isNew="isNew"
          :m="mode"
        />
      </tab-content>

      <tab-content :padding="false" name="karbariVaPishamadegi">
        <UKarbariVaPishamadegi
          v-model="results"
          :engineerInfo="engineerInfo"
          :isNew="isNew"
          :m="mode"
        />
      </tab-content>
    </safa-tabs>
    <div class="q-mb-sm q-ml-sm">
      <FormActions
        :m="mode"
        @cancel="isEditable = false"
        @edit="isEditable = true"
        @save="saveData"
      />
    </div>
  </fit>
</template>

<script>
import USpecifications from './partials/USpecifications.vue'
import UBaseEdge from './partials/UBaseEdge.vue'
import UKarbariVaPishamadegi from './partials/UKarbariVaPishamadegi.vue'
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  components: {
    USpecifications,
    UBaseEdge,
    UKarbariVaPishamadegi
  },
  data () {
    return {
      activeTab: 'specifications',
      items: [],
      ShowModal: false,
      loadPrequest: {
        pNidProc: '269df9f0-5348-4466-903f-2cb17025ab8f',
        // 'pNidProc': '00000000-0000-0000-0000-000000000000',
        pIsLoadDeletedNosaziCode: 'false'
      },
      results: {},
      isShowNewTab: false,
      calculateAndSaveResult: {},
      copyResult: {},
      saveResult: {},
      isReadOnly: false,
      engineerInfo: {
        CI_Ability: 0,
        CI_EngStudyField: 0,
        CommitmentNo: null,
        CommitmentSupervisionDate: null,
        CommitmentSupervisionNo: null,
        ControllerCode: null,
        ControllerFamily: null,
        ControllerName: null,
        EngBase: null,
        JobAgreement: null,
        MembershipNo: null,
        NidEng: '',
        TotalCount: 0,
        UrbanityCode: null
      },
      isNew: false
    }
  },
  props: {
    m: String,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
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
  mixins: [baseFormMixin],
  mounted () {
    // // console.log('this.selectedRequest', this.selectedRequest)
    // this.loadZabetehChideman()
  },
  methods: {
    saveData () {
      this.showLoading()
      setTimeout(async () => {
        this.hideLoading()

        const strNosaziCode = convertNosaziCodeObjectToString(
          this.baseNosaziCode
        )
        await this.log({
          action: this.logActions.save,
          bizCode: strNosaziCode,
          bizCodeTitle: 'کد نوسازی',
          nosaziCode: strNosaziCode
        })

        this.showSuccess('اطلاعات با موفقیت ذخیره شد')
      }, 2000)

      this.isEditable = false
    }
  }
}
</script>
