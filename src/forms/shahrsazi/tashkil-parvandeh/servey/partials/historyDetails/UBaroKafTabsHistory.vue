<template>
  <safa-tabs
    v-model="activeTab"
    type="fixed"
    fit
    :bordered="false"
  >
    <!-- type="fixed" -->
    <template v-slot:tabs>
      <tab-menu
        name="baroKafInfo"
        label="اطلاعات برو کف"
      />
      <tab-menu
        name="ownersAndOther"
        label="مالکین و سایر امکانات و پخ ها"
      />
      <!-- <tab-menu
        name="kroki"
        label="کروکی"
      /> -->
      <tab-menu
        name="tafsil"
        label="طرح تفصیلی و نظرات برو کف"
      />
      <tab-menu
        name="analyze"
        label="آنالیز وضعیت قبلی نقشه"
      />
    </template>

    <tab-content name="baroKafInfo" title="اطلاعات برو کف">
      <UBaroKafInfo
        :results="results"
        :editMode="mode"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </tab-content>

    <tab-content :padding="false" name="ownersAndOther" title="مالکین و سایر امکانات و پخ ها">
      <UOwnersAndOther
        :results="results"
        :editMode="mode"
      />
    </tab-content>

    <!-- <tab-content name="kroki" title="کروکی">
      <UKroki :results="results" />
    </tab-content> -->

    <tab-content :padding="false" name="tafsil" title="طرح تفصیلی و نظرات برو کف">
      <UTafsil
        :results="results"
        :editMode="mode"
      />
    </tab-content>

    <tab-content :padding="false" name="analyze" title="آنالیز وضعیت قبلی نقشه">
      <ULastStatusMapAnalyze :results="results"/>
    </tab-content>
  </safa-tabs>
</template>

<script>
import UBaroKafInfo from './partials/UBaroKafInfo'
import UOwnersAndOther from './partials/UOwnersAndOther'
// import UKroki from './partials/UKroki'
import UTafsil from './partials/UTafsil'
import ULastStatusMapAnalyze from './partials/ULastStatusMapAnalyze'
import loadbaroKafLoadPrequestModel from 'src/models/loadbaroKafLoadPrequestModel'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  components: {
    UBaroKafInfo,
    UOwnersAndOther,
    // UKroki,
    UTafsil,
    ULastStatusMapAnalyze
  },
  data () {
    return {
      activeTab: 'baroKafInfo',
      items: [],
      isShowModal: false,
      results: loadbaroKafLoadPrequestModel,
      loadDataPrequest: {
        pNidProc: 'fd65b45c-ba39-49b0-83f0-1c011a59778b',
        pIsLoadDeletedNosaziCode: 'false'
      },
      saveBarokafResult: {},
      requestResult: {}
    }
  },
  props: {
    formKey: {
      type: String
    },
    title: {
      type: String
    },
    name: {
      type: String
    }
  },
  mounted () {
  },
  methods: {
    loadData () {
      const checkResult = this.isSelectedRequest()

      if (checkResult) {
        this.loadDataPrequest.pNidProc = this.selectedRequest.NidProc

        this.loadPrequestHeader(() => {
          this.showLoading()
          this.$services.SC.loadBarokaf(this.loadDataPrequest, {
            config: {
              District: this.selectedDistrict
            }
          }).then(async (response) => {
            this.hideLoading()

            this.requestResult = this.getResponse(response.data)

            if (!this.requestResult.hasError) {
              this.results = this.requestResult.data

              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.BizCode,
                bizCodeTitle: 'کد نوسازی'
              })
            }
          })
        })
      }
    },
    loadPrequestHeader (doneCallback, failedCallback) {
      const checkResult = this.isSelectedRequest()

      if (checkResult) {
        this.loadDataPrequest.pNidProc = this.selectedRequest.NidProc
      }

      this.showLoading()
      this.$services.SA.loadRequestHeader(this.loadDataPrequest, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            if (typeof doneCallback === 'function') {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.BizCode,
                bizCodeTitle: 'کد نوسازی'
              })
              doneCallback()
            }
          } else {
            if (typeof failedCallback === 'function') {
              failedCallback()
            }
          }
        })
        .catch((_) => {
          this.serverError()
        }).finally(
          this.hideLoading()
        )
    },
    normalizeBaseOtherEquipmentRows () {
      return this.results.Base_OtherEquipment.map((m) => {
        return {
          ...m,
          CI_OtherEquipmentGroup: m.CI_OtherEquipmentGroup || 1,
          CI_OtherEquipmentType: m.CI_OtherEquipmentType || 2,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null,
          CI_Suggest: m.CI_Suggest || null,
          // CI_OtherEquipmentGroup: '4',
          // CI_OtherEquipmentType: '212',
          // CI_ShahrsazRequestType: 0,
          // CI_Suggest: 0,
          Comments: m.Comments || '',
          CreateDate: m.CreateDate || ''
          // NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          // NidOther: m.NidOther || '00000000-0000-0000-0000-000000000000',
          // OtherEquipmentValue: m.OtherEquipmentValue || ''
        }
      })
    },
    normalizeBaseEdgeRows () {
      return this.results.Base_Edge.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || '',
          AddLen: m.AddLen || 0,
          AfterEditBarLen: m.AfterEditBarLen || 0,
          AfterEditSideLen: m.AfterEditSideLen || 0,
          AfterEditWidth: m.AfterEditWidth || 0,
          BackwardLen: m.BackwardLen || 0,
          BarLenEffective: m.BarLenEffective || 0,
          CI_Moshrefiat: m.CI_Moshrefiat || null,
          CI_PathType: m.CI_PathType || 0,
          CI_Privacy: m.CI_Privacy || null,
          CI_SideCode: m.CI_SideCode || 0,
          CI_ValBlockFord: m.CI_ValBlockFord || 0,
          CI_ViewCode: m.CI_ViewCode || null,
          Comments: m.Comments || '',
          Depth1: m.Depth1 || 0,
          Depth2: m.Depth2 || 0,
          Depth3: m.Depth3 || 0,
          DesignLen: m.DesignLen || 0,
          EdgeAndSideCurrent: m.EdgeAndSideCurrent || 0,
          EdgeAndSideDoc: m.EdgeAndSideDoc || 0,
          EdgeBarCurrent: m.EdgeBarCurrent || 0,
          EdgeBarDoc: m.EdgeBarDoc || 0,
          EdgeLenCurrent: m.EdgeLenCurrent || 0,
          EdgeLenDoc: m.EdgeLenDoc || 0,
          EntranceWith: m.EntranceWith || 0,
          GoFrontLen: m.GoFrontLen || 0,
          GoFrontLenAllow: m.GoFrontLenAllow || 0,
          GoFrontLenOther: m.GoFrontLenOther || 0,
          GoFrontLenOtherAllow: m.GoFrontLenOtherAllow || 0,
          PathKaf: m.PathKaf || 0,
          PathName: m.PathName || '',
          PathWidth: m.PathWidth || 0,
          RegisterPlack: m.RegisterPlack || null,
          Remain: m.Remain || 0,
          RemainBarLen: m.RemainBarLen || 0,
          RemainSideLen: m.RemainSideLen || 0,
          SideWalkWidth: m.SideWalkWidth || 0,
          ValBlockRowNo: m.ValBlockRowNo || null,
          // GoFrontLen: m.GoFrontLen || 0,
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidEdge: m.NidOther || '00000000-0000-0000-0000-000000000000'
        }
      })
    },
    saveBarokaf () {
      this.results.Base_OtherEquipment = this.normalizeBaseOtherEquipmentRows().cleanRows()

      this.results.Base_Edge = this.normalizeBaseEdgeRows().cleanRows()

      // const pRequest = { pBarokaf: this.results }

      // pRequest.pBarokaf.Base_OtherEquipment =
      // pRequest.pBarokaf.Base_OtherEquipment.cleanRows()

      // pRequest.pBarokaf.Base_Edge =
      // pRequest.pBarokaf.Base_Edge.cleanRows()

      this.showSending()

      this.$services.SC.saveBarokaf(
        {
          pBarokaf: this.results,
          pNidProc: this.selectedRequest.NidProc,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          }
        },
        {
          config: {
            District: this.selectedDistrict
          }
        }
      )
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)

          if (response.data.BizErrors.length === 0) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })

            this.showSuccess('عملیات با موفقیت انجام شد')

            this.loadData()
          }

          this.isEditable = false

          this.hideSending()

          // // console.log('this.results', JSON.stringify(this.results))
        })
        .catch((ex) => {
          this.hideSending()

          this.showError('متاسفانه مشکلی در سیستم رخ داده است.')
        })
    },
    cancel () {
      this.isEditable = false

      this.loadData()
    }
  }
}
</script>

<style scoped>
#history-btn {
  margin-top: 10px;
}
</style>
