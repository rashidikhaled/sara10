<template>
  <safa-form :id="formKey" :caption="title" app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
    <form-wrapper title="اعلام ضابطه بر اساس درخواست" vertical :padding="false">
      <safa-status :result="baseLibResult"/>
      <safa-tabs
        v-model="activeTab"
        height="100%"
        type="fixed"
        class="fit"
        ref="zabeteRef"
      >
        <template v-slot:tabs>
          <tab-menu name="showZabeteTab" label="ضابطه"/>
          <tab-menu
            name="showZabeteDetailesTab"
            label="جزئیات"
            v-if="isShowZabeteDetailesTab"
          />
        </template>
        <tab-content name="showZabeteTab" :padding="false">
          <ZabeteBasedOnRequest
            :results="results"
            @reload="load"
            :nidNosaziCode="nidNosaziCode"
            @showZabeteDetailes="showZabeteDetailes"
            :formKey="formKey"
            :title="title"
            :name="name"
            @clickZabeteh="clickZabeteh"
            ref="zabetetabRef"
            :taskInfo="taskInfo"
          />
        </tab-content>
        <tab-content name="showZabeteDetailesTab">
          <ZabeteDetailsBasedOnRequest
            :results="results"
            v-if="isShowZabeteDetailesTab"
            :nidNosaziCode="nidNosaziCode"
            :selectedItem="selectedItem"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="detailsRef"
            :m="mode"
            @saveDone="saveDone"
            :taskInfo="taskInfo"
          />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <div
          v-show="!isShowDetailsButtons && activeTab === 'showZabeteTab'"
          class="q-gutter-sm"
        >
          <btn-default @click="createNewRecord" label="ایجاد ردیف محاسبه"/>
          <btn-delete
            v-show="showDeleteBtn"
            @click="deleteRecord"
            label="حذف ضابطه"
          />
        </div>
        <div
        v-show="isShowDetailsButtons && activeTab === 'showZabeteDetailesTab'"
        >
          <form-actions
            :m="mode"
            @cancel="isEditable = false"
            @edit="isEditable = true"
            @save="save"
            class="q-gutter-sm"
          >
            <template #after>
              <btn-default
                label="کپی به چیدمان مجاز"
                @click="copyToPrincipleAgreement"
              />
              <btn-default
                label="اعلام ضابطه و ذخیره"
                @click="calculateZabetehAndSave"
              />
              <btn-default label="اعلام ضابطه" @click="calculateZabete"/>
              <btn-default
                label="محاسبه چیدمان در طبقات و ذخیره"
                @click="calculateZabetehChidemanAndSave"
              />
              <btn-default label="گزارش" @click="print"/>
            </template>
          </form-actions>
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import ZabeteDetailsBasedOnRequest from './partials/ZabeteDetailsBasedOnRequest.vue'
import ZabeteBasedOnRequest from './partials/ZabeteBasedOnRequest.vue'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      isShowDetailsButtons: false,
      showDeleteBtn: false,
      title: 'اعلام ضابطه بر اساس درخواست',
      formKey: '0DF43924-6063-4663-BD30-87167642F8D0',
      name: 'UElameZabeteBasedOnRequest',
      main: true,
      sidebarCompatible: true,
      activeTab: 'showZabeteTab',
      gridData: [],
      editID: null,
      result: null,
      results: { ZabetehList: [] },
      nidNosaziCode: null,
      showZabeteDetails: false,
      isShowZabeteDetailesTab: false,
      selectedItem: null,
      baseLibResult: null,
      headerResult: {}
    }
  },
  components: {
    ZabeteDetailsBasedOnRequest,
    ZabeteBasedOnRequest
  },
  mounted () {
    if (this.isSelectedRequest()) {
      this.loadRequestHeader()
    } else {
      this.hideSidebar(this.name)
    }
  },
  methods: {
    save () {
      this.$refs.detailsRef.save()
    },
    saveDone () {
      this.isEditable = false
    },
    print () {
      this.$refs.detailsRef.print()
    },
    copyToPrincipleAgreement () {
      this.$refs.detailsRef.copyToPrincipleAgreement()
    },
    calculateZabetehAndSave () {
      this.$refs.detailsRef.calculateZabetehAndSave()
    },
    calculateZabete () {
      this.$refs.detailsRef.calculateZabete()
    },
    calculateZabetehChidemanAndSave () {
      this.$refs.detailsRef.calculateZabetehChidemanAndSave()
    },
    createNewRecord () {
      this.$refs.zabetetabRef.createNewRecord()
    },
    deleteRecord () {
      this.$refs.zabetetabRef.deleteRecord()
    },
    load () {
      this.showLoading()
      let data = {
        pNidNosaziCode: this.nidNosaziCode,
        pNidProc: '00000000-0000-0000-0000-000000000000',
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: this.selectedRequest.WorkflowTitel,
          WorkflowGuid: this.selectedRequest.NidWorkflowDeff
        },
        pIsLoadDeletedNosaziCode: false
      }
      this.$services.SC.loadZabetehListWithHistory(data, { District: this.selectedDistrict })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidNosaziCode,
              bizCodeTitle: 'NidNosaziCode',
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات در فرم اعلام ضابطه بر اساس درخواست انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handleBaseNosaziCodeChanged2 () {
      this.showLoading()
      let self = this
      let baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      let data = {
        pNosaziCode: {
          Apartment: baseNosaziCode.Apartment,
          Block: baseNosaziCode.Block,
          Building: baseNosaziCode.Building,
          CI_City: 0,
          District: baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: baseNosaziCode.House,
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: baseNosaziCode.Region,
          Shop: baseNosaziCode.Shop
        },
        pLoadFunc: 'Base_Owner,Base_AddressInfo',
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(async ({ data }) => {
          self.baseLibResult = self.getResponse(data)
          if (self.baseLibResult.success) {
            self.headerResult = self.baseLibResult.data
            this.nidNosaziCode = self.headerResult._NidNosaziCode
            this.load()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    loadRequestHeader () {
      this.ownerName = ''
      let self = this
      let nidProc = '00000000-0000-0000-0000-000000000000'
      if (this.selectedRequest) {
        nidProc = this.selectedRequest.NidProc
      } else if (this.passedRequest !== null) {
        nidProc = this.passedRequest.NidProc
      }
      let data = {
        pNidProc: nidProc,
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.loadRequestHeader(data, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          self.baseLibResult = this.getResponse(data)
          if (self.baseLibResult.success) {
            self.headerResult = self.baseLibResult.data
            this.nidNosaziCode = self.headerResult._NidNosaziCode
            this.load()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    showZabeteDetailes (value) {
      this.$refs.zabeteRef.changeTab('showZabeteDetailesTab')
      this.selectedItem = value
      this.isShowZabeteDetailesTab = true
      this.isShowDetailsButtons = true
    },
    clickZabeteh () {
      this.showDeleteBtn = true
    }
  }
}
</script>
