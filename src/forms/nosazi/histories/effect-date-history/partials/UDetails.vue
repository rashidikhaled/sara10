<template>
  <fit>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <safa-tabs
          v-model="activeTab"
          class="fit"
        >
          <template v-slot:tabs>
            <tab-menu
              v-if="isShowNewTab"
              label="جزئیات"
              name="details"
            />
          </template>
          <tab-content name="effectDate">
            <UEffectDate
              v-model="results"
              :isNew="isNew"
              :m="m"
              @dbclick="dbclick"
              @onEmitopenNewTab="openNewTab"
            />
          </tab-content>

          <tab-content name="details">
            <USpecifications
              v-model="results"
              :engineerInfo="engineerInfo"
              :isNew="isNew"
              :m="m"
            />
          </tab-content>
        </safa-tabs>
      </div>
    </div>
  </fit>
</template>

<script>
import USpecifications from './partials/USpecifications.vue'

export default {
  components: {
    USpecifications
  },
  data () {
    return {
      activeTab: 'details',
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
    m: String
  },
  mounted () {
    // // console.log('this.selectedRequest', this.selectedRequest)
    // this.loadZabetehChideman()
  },
  methods: {
    openNewTab () {
      this.isShowNewTab = true

      this.activeTab = 'details'

      this.isNew = true
    },
    dbclick (row) {
      this.engineerInfo = row

      this.isShowNewTab = true

      this.activeTab = 'details'

      this.isNew = false
    }
  }
}
</script>
