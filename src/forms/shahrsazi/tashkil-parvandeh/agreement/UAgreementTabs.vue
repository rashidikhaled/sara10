<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      vertical
      :title="title"
      :padding="false"
      @load="$emit('load')"
    >
      <safa-status :result="results"/>
      <safa-tabs ref="safaTabs" v-model="activeTab" :bordered="false">
        <template v-slot:tabs>
          <tab-menu name="list" label=" لیست" @click="handleClickList"/>
          <tab-menu name="history" label=" تاریخچه توافقنامه"/>
          <tab-menu name="buildingStatus" label="وضعیت املاک محدوده بلوک"/>
          <tab-menu
            closable
            @close="closeDetailsTab"
            v-show="isShowNewTab"
            name="details"
            label=" جزئیات توافقنامه"
          />
        </template>

        <tab-content name="list" title=" لیست">
          <UList
            v-model="results"
            @onEmitopenNewTab="openNewTab"
            @dbclick="dbclick"
            :isNew="isNew"
            :formModel="formModel"
            :formKey="formKey"
            :title="title"
            :name="name"
            :forceReadonly="forceReadonly"
          />
        </tab-content>
        <tab-content name="history" title=" تاریخچه توافقنامه" :padding="false">
          <UHistory
            v-model="results"
            :isNew="isNew"
            :formModel="formModel"
            @dbclick="dbclick"
          />
        </tab-content>
        <tab-content
          name="buildingStatus"
          title="وضعیت املاک محدوده بلوک"
          v-if="activeTab === 'buildingStatus'"
        >
          <BuildingStatus
            ref="buildingStatus"
            :m="mode"
            @saveBlockAreaDone="saveBlockAreaDone"
            :formKey="formKey"
            :title="title"
            :name="name"
            :selectedRequest="selectedRequest"
          />
        </tab-content>
        <tab-content
          name="details"
          v-if="isShowNewTab"
          title=" جزئیات توافقنامه "
          :padding="false"
        >
          <UDetailsTabs
            :m="mode"
            @changeEditable="changeEditable"
            :nidBase="nidBase"
            @afterSaveDetails="afterSaveDetails"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="detailsTab"
            :selectedNidBase="selectedNidBase"
            :copyLastRow="copyLastRow"
            :isNewDetails="isNewDetails"
            :taskInfo="taskInfo"
          />
        </tab-content>
      </safa-tabs>
      <template v-if="activeTab !== 'history'" v-slot:footer>
        <form-actions
          height="30px"
          :buttons="tabActions"
          :value="activeTab"
          :showEditButton="
            activeTab === 'details' || activeTab === 'buildingStatus'
          "
          editSPId="86407905-ea12-46a4-be93-bc0e5bd9aeb1"
          editSPCaption="ویرایش"
          editFormId="4bce7044-b4ae-471f-b422-64b509051141"
          :m="mode"
          @edit="edit"
          @save="save"
          @cancel="cancel"
        >
          <template v-slot:after v-if="activeTab === 'buildingStatus'">
            <btn-default label="بازیابی" @click="recoveryBlcok"/>
            <btn-default label="محاسبه"/>
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import UList from './partials/UList.vue'
import UHistory from './partials/UHistory.vue'
import UDetailsTabs from './partials/UDetailsTabs.vue'
import BuildingStatus from './partials/BuildingStatus'
import BaseFormMixin from 'src/mixins/BaseFormMixin.js'

export default {
  data () {
    return {
      title: 'توافقنامه',
      formKey: '63eb63c4-0dda-4be8-a966-a2fc48f7cae2',
      name: 'UAgreementTabs',
      main: true,
      workflowCompatible: true,
      activeTab: 'list',
      isView: false,
      isShowNewTab: false,
      isNew: false,
      results: {},
      engineerInfo: [],
      requestResult: {},
      loadDataPrequest: {
        pNidProc: '00000000-0000-0000-0000-000000000000'
      },
      formModel: {
        Sh_Agreement_List: []
      },
      nidBase: '',
      tabActions: {
        list: [
          {
            label: 'جدید',
            type: 'new',
            click: (e, btn) => this.openNewTab(),
            spId: '741bc635-50d8-4072-8e49-d7ed8cdfc278',
            spCaption: 'جدید'
          }
        ],
        details: [
          {
            label: 'محاسبه',
            type: 'default',
            click: (e, btn) => this.$refs.detailsTab.calculate(),
            spId: '5847dddd-f237-466f-baeb-ed1e9c779d23',
            spCaption: 'محاسبه',
            formId: '4bce7044-b4ae-471f-b422-64b509051141'
          },
          {
            label: 'کپی به چیدمان مجاز',
            type: 'default',
            click: (e, btn) => this.$refs.detailsTab.copyToMovafeghatOsooli(),
            spId: 'b0068e6a-ff93-4bfa-b2ab-b2d80d518101',
            spCaption: 'کپی به موافقت اصولی',
            formId: '4bce7044-b4ae-471f-b422-64b509051141'
          },
          {
            label: 'گزارش',
            type: 'default',
            click: (e, btn) => this.$refs.detailsTab.report()
          }
        ]
      },
      copyLastRow: false,
      isNewDetails: false,
      selectedNidBase: '00000000-0000-0000-0000-000000000000'
    }
  },
  mixins: [BaseFormMixin],
  components: {
    UList,
    UHistory,
    UDetailsTabs,
    BuildingStatus
  },
  mounted () {
    debugger
    if (this.selectedRequest) {
      this.loadData()
    } else {
      this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید.')
    }
  },
  methods: {
    openNewTab () {
      if (!this.formModel.Sh_Agreement_List) {
        this.formModel.Sh_Agreement_List = []
      }
      if (this.formModel.Sh_Agreement_List.length > 0) {
        this.showConfirm(
          'آیا میخواهید اطلاعات کاربری و پیش آمدگی را از ردیف آخر کپی نمایید؟'
        )
          .onOk(() => {
            this.copyLastRow = true
            this.isNewDetails = true
            this.selectedNidBase = this.formModel.Sh_Agreement_List[0].NidBase
            this.showPeaceDetails()
          })
          .onCancel(() => {
            this.selectedNidBase = '00000000-0000-0000-0000-000000000000'
            this.isNewDetails = true
            this.showPeaceDetails()
          })
      } else {
        this.selectedNidBase = '00000000-0000-0000-0000-000000000000'
        this.showPeaceDetails()
      }
    },
    showPeaceDetails () {
      this.$refs.safaTabs.changeTab('details')
      this.isShowNewTab = true
      this.$nextTick(async () => {
        await this.$refs.detailsTab.loadData(this.selectedNidBase)
      })
    },
    dbclick (dataItem) {
      this.selectedNidBase = dataItem.NidBase
      this.showPeaceDetails()
    },
    closeDetailsTab () {
      if (this.isEditable) {
        this.showWarning('در حالت ویرایش امکان بستن این پنجره وجود ندارد.')
        return
      }
      this.isShowNewTab = false
      this.activeTab = 'list'
      this.isNew = false
    },
    afterSaveDetails () {
      this.isEditable = false
      this.isNewDetails = false
      this.loadData()
    },
    handleClickList () {
      this.loadData()
    },
    loadData () {
      debugger
      this.showLoading()
      this.loadDataPrequest.pNidProc = this.selectedRequest.NidProc

      this.$services.SC.getShAgreementListWithHistory(this.loadDataPrequest, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)
          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data
            if (
              this.formModel.Sh_Agreement_List &&
              this.formModel.Sh_Agreement_List.length > 0
            ) {
              this.nidBase = this.formModel.Sh_Agreement_List[0].NidBase
            }
            console.log('load', this.loadDataPrequest)
            console.log('load', this.nidBase)

            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.NidWorkItem,
                bizCodeTitle: 'شماره درخواست',
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `بارگذاری اطلاعات توافقنامه انجام گردید.`
              })
            }
            this.isView = true
          }
        })
        .catch((error) => {
          console.error('load error', error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // loadDataFromparent () {
    //   this.loadData()
    // },
    save () {
      debugger
      if (this.activeTab === 'details') {
        this.$refs.detailsTab.saveData()
      }
      if (this.activeTab === 'buildingStatus') {
        this.$refs.buildingStatus.saveBlockAreaStatus()
      }
    },
    saveBlockAreaDone () {
      this.isEditable = false
    },
    edit () {
      if (this.activeTab === 'buildingStatus') {
        this.$refs.buildingStatus.handleEdit()
      }
      this.isEditable = true
    },
    cancel () {
      if (this.activeTab === 'buildingStatus') {
        this.$refs.buildingStatus.handleCancel()
      }
      this.isEditable = false
    },
    recoveryBlcok () {
      this.$refs.buildingStatus.recoveryBlockAreaStatus()
    }
  }
}
</script>
<style lang="scss" scoped></style>
