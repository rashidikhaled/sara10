<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper
      :hasFooter="false"
      :padding="false"
      title="تاریخچه تاریخ اثر"
      vertical
    >
      <fit>
        <safa-tabs
          v-model="activeTab"
          :bordered="false"
          class="fit"
        >
          <template v-slot:tabs>
            <tab-menu
              label="تاریخ اثر"
              name="effectDate"
            />
            <tab-menu
              v-if="isShowNewTab"
              label="جزئیات"
              name="details"
            />
          </template>
          <tab-content name="effectDate">
            <UEffectDate
              ref="effectDate"
              :formKey="formKey"
              :isNew="isNew"
              :m="mode"
              :name="name"
              :results="results"
              :title="title"
              @getRow="dbclick"
              @onEmitopenNewTab="openNewTab"
            />
          </tab-content>
          <tab-content
            :bordered="false"
            :padding="false"
            name="details"
          >
            <UDetailsTabs
              ref="detailsTabs"
              v-model="results"
              :baseNosaziCode="baseNosaziCode"
              :engineerInfo="engineerInfo"
              :formKey="formKey"
              :isNew="isNew"
              :m="mode"
              :name="name"
              :title="title"
            />
          </tab-content>
        </safa-tabs>
        <template v-slot:footer>
          <form-actions :showEditButton="false">
            <template v-slot:after>
              <tab-actions :buttons="tabActions[activeTab]"/>
            </template>
          </form-actions>
        </template>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UDetailsTabs from './partials/UDetailsTabs.vue'
import UEffectDate from './partials/UEffectDate.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/nosdazi-history/effect-date-history-tabs',

  components: {
    UDetailsTabs,
    UEffectDate
  },
  mixins: [baseFormMixin],
  data () {
    return {
      baseNosaziCode: {},
      title: 'تاریخچه تاریخ اثر',
      formKey: 'cfc1f487-f594-4547-9ed0-ef6fcaee73c2',
      name: 'UEffectDateHistoryTabs',
      main: true,
      activeTab: 'effectDate',
      items: [],
      ShowModal: false,
      loadPrequest: {
        pNidProc: this.selectedRequest,
        // 'pNidProc': '00000000-0000-0000-0000-000000000000',
        pIsLoadDeletedNosaziCode: 'false'
      },
      results: { Duty_ActDateHistoryList: [] },
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
      isNew: false,
      loadDataPrequest: {
        pNidBase: '00000000-0000-0000-0000-000000000000'
      },
      nidBaseResult: null,
      loadResult: null,
      nidActDateHistory: '00000000-0000-0000-0000-000000000000',
      dateHistoryRequestResults: null,
      dateHistoryResults: { Duty_ActDateHistory: {} },
      tabActions: {
        effectDate: [
          {
            label: 'جدید',
            type: 'new', // cancel || save || new || add || default || edit || delete
            click: (e, btn) => {
              this.$refs.effectDate.showPopupInsertTime = true
            }
          },
          {
            label: 'صدور فیش',
            type: 'default', // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.fiche()
          }
        ],
        details: []
      }
    }
  },
  mounted () {
    // // console.log('this.selectedRequest', this.selectedRequest)
    // this.loadZabetehChideman()
  },
  methods: {
    openNewTab () {
      this.isShowNewTab = true

      this.activeTab = 'detailsTabs'

      this.isNew = true
    },
    dbclick (e) {
      // console.log('////////////////e', e)

      this.nidActDateHistory = e.NidActDateHistory
      this.getActDateHistory()

      this.engineerInfo = e.row

      this.isShowNewTab = true

      this.activeTab = 'details'

      this.isNew = false
    },
    getActDateHistory () {
      this.showLoading()
      let payLoad = { pNidActDateHistory: this.nidActDateHistory }
      this.$services.SB.getActDateHistory(payLoad, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async ({ data }) => {
          this.dateHistoryRequestResults = this.getResponse(data)

          if (this.dateHistoryRequestResults.success) {
            this.dateHistoryResults = this.dateHistoryRequestResults.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch((e) => {
          console.log('save error....', e)
          this.serverError()
        })
        .finally((_) => {
          this.hideLoading()
        })
    }
  }
}
</script>
