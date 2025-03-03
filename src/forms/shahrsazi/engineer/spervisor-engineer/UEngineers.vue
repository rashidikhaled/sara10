<template>
<safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <form-wrapper :padding="false" :title="title" vertical>
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu label="لیست" name="engList"/>

        <tab-menu v-if="activeTab === 'engInfo'" label="اطلاعات مهندس" name="engInfo"/>
      </template>
      <tab-content name="engList" vertical>
        <UEngList
          v-model="results"
          :formKey="formKey"
          :name="name"
          :passParam="parameters"
          :title="title"
          @searchData="loadData"
          @selectedRow="editExistingEng"
        />
      </tab-content>
      <tab-content name="engInfo">
        <UEngInfo  :m="mode" :model="savePrequest"/>
      </tab-content>
    </safa-tabs>

    <template v-slot:footer>
      <form-actions
        :m="mode"
        :showEditButton="activeTab === 'engInfo' ? true : false"
        :showNewButton="activeTab === 'engList' ? true : false"
        @cancel="isEditable = false"
        @edit="isEditable = true"
        @newInfo="createNewEng"
        @save="saveEngineerInfo"
      />
    </template>
  </form-wrapper>
</safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import UEngList from './partials/UEngList'
import UEngInfo from './partials/UEngInfo'

export default {
  mixins: [baseFormMixin],
  components: { UEngList, UEngInfo },
  data () {
    return {
      title: 'مهندسین ناظر',
      formKey: '7721D24C-FC87-4A8B-B03D-C0A7A66289EF',
      name: 'UEngineers',
      main: true,
      sidebarCompatible: true,
      activeTab: 'engList',
      requestResult: null,
      results: [],
      isNew: false,
      savePrequest: {
        pEng: {
          EngineerInfo_List: null,
          ErrorResult: {
            BizErrors: [],
            Requirements: null
          },
          NidEng: '00000000-0000-0000-0000-000000000000',
          Sh_EngineerInfo: {
            CI_Ability: 0,
            CI_EngStudyField: 0,
            CommitmentNo: '',
            CommitmentSupervisionDate: '',
            CommitmentSupervisionNo: '',
            ControllerCode: '',
            ControllerFamily: '',
            ControllerName: '',
            EngBase: '',
            JobAgreement: '',
            MembershipNo: '',
            NidEng: '00000000-0000-0000-0000-000000000000',
            UrbanityCode: '',
            MobileNo: ''
          }
        }
      },
      parameters: {
        pName: '',
        pFamilly: '',
        pUrbanityCode: ''
      }
    }
  },
  methods: {
    loadData () {
      this.showLoading()
      // const from = (page - 1) * take;
      let data = {
        pName: this.parameters.pName,
        pFamilly: this.parameters.pFamilly,
        pUrbanityCode: this.parameters.pUrbanityCode,
        pFromRow: 0,
        pToRow: 200
        // pFromRow: from || 0,
        // pToRow: from + take || 10
      }

      this.$services.SC.getEngineerInfoList(data)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)

          if (this.requestResult.success) {
            this.results = this.requestResult.data.EngineerInfo_List
          }
        })
        .catch(response => {
          this.serverError()
          console.log('load error ---', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    createNewEng () {
      this.isNew = true
      this.savePrequest = {
        pEng: {
          EngineerInfo_List: null,
          ErrorResult: {
            BizErrors: [],
            Requirements: null
          },
          NidEng: '00000000-0000-0000-0000-000000000000',
          Sh_EngineerInfo: {
            CI_Ability: 0,
            CI_EngStudyField: 0,
            CommitmentNo: '',
            CommitmentSupervisionDate: '',
            CommitmentSupervisionNo: '',
            ControllerCode: '',
            ControllerFamily: '',
            ControllerName: '',
            EngBase: '',
            JobAgreement: '',
            MembershipNo: '',
            NidEng: '00000000-0000-0000-0000-000000000000',
            UrbanityCode: '',
            MobileNo: ''
          }
        }
      }
      this.activeTab = 'engInfo'
    },
    editExistingEng (value) {
      this.activeTab = 'engInfo'
      this.savePrequest.pEng.NidEng = value.row.NidEng
      this.savePrequest.pEng.Sh_EngineerInfo = {
        ...this.savePrequest.pEng.Sh_EngineerInfo,
        ...value.row
      }
    },
    saveEngineerInfo () {
      this.showLoading()
      this.$services.SC.saveEngineerInfo(this.savePrequest, {
        config: {
          District: 1
        }
      })
        .then(response => {
          this.$q.loading.hide()

          if (response.data.BizErrors.length === 0) {
            this.showSuccess('عملیات با موفقیت انجام شد')
            this.loadData(1, 10)
            this.activeTab = 'engList'
            this.isEditable = false
          }
        })
        .catch(ex => {
          this.serverError()
        })
        .finally(this.hideLoading())
    }
  },
  created () {
    this.loadData(1, 10)
  }
}
</script>
