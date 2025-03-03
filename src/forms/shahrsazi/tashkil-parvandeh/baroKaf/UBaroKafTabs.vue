<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper vertical title="بروکف" :padding="false">
      <safa-status :result="requestResult"/>
      <template v-slot:header v-if="isShowBtn">
        <form-header-by-nosazi-code
          actions
          v-model="baseNosaziCode"
          from-request
          @fetched="fetched"
        />
      </template>

      <safa-tabs v-model="activeTab" class="fit" :bordered="false">
        <template v-slot:tabs>
          <tab-menu name="baroKafInfo" label="اطلاعات برو کف"/>
          <tab-menu
            name="ownersAndOther"
            label="مالکین و سایر امکانات و پخ ها"
          />

          <tab-menu name="kroki" label="کروکی"/>
          <tab-menu name="tafsil" label="طرح تفصیلی و نظرات برو کف"/>

          <tab-menu name="analyze" label="آنالیز وضعیت قبلی نقشه"/>
        </template>

        <tab-content name="baroKafInfo" title="اطلاعات برو کف">
          <UBaroKafInfo
            :results="results"
            :m="mode"
            :formKey="formKey"
            :title="title"
            :name="name"
            :showCIVergeType="showCIVergeType"
          />
        </tab-content>

        <tab-content
          name="ownersAndOther"
          title="مالکین و سایر امکانات و پخ ها"
          :padding="false"
        >
          <UOwnersAndOther :results="results" :m="mode"/>
        </tab-content>

        <tab-content name="kroki" title="کروکی">
          <UKroki v-model="results" v-if="results.NidBase_Parvandeh_HouseOrDastgah"/>
        </tab-content>

        <tab-content
          name="tafsil"
          title="طرح تفصیلی و نظرات برو کف"
          :padding="false"
        >
          <UTafsil :results="results" :m="mode" :formKey="formKey"/>
        </tab-content>

        <tab-content
          name="analyze"
          title="آنالیز وضعیت قبلی نقشه"
          :padding="false"
        >
          <ULastStatusMapAnalyze :results="results"/>
        </tab-content>
      </safa-tabs>
      <template v-slot:footer v-if="isShowBtn">
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          editSPId="6b7fcbb7-1441-3c17-8580-7fc490f21e59"
          editFormId="1fe00ca0-22a8-4cf1-a0b2-bc31a51ae92f"
          editSPCaption="ویرایش"
          :force="true"
          @cancel="cancel"
          @save="saveBarokaf"
        >
          <template v-slot:after v-if="isShowBtn">
            <btn-default
              spId="a692bb84-fb0f-43c1-afc5-7ee9945e101c"
              spCaption="تاریخچه برو کف"
              label="تاریخچه برو کف"
              @click="isShowModal = true"
            />
            <btn-default
              v-show="activeTab === 'kroki' && !isEditable"
              label="مشاهده کروکی"
              @load="loadData"
              @click="showCroquie = true"
            />
            <btn-default
              label="رسم کروکی"
              v-show="activeTab === 'kroki' && isEditable"
              @load="loadData"
              @click="showCroquie = true"
            />
          </template>
        </FormActions>
      </template>
      <safa-popup
        v-model="showCroquie"
        title="رسم کروکی"
        width="980px"
        height="730px"
      >
        <UDrawCroque
          v-model="results"
          :m="isEditable"
          @cancel="showCroquie = false"
        />
      </safa-popup>

      <safa-popup
        v-model="isShowModal"
        width="800px"
        height="600px"
        title="تاریخچه بروکف"
        vertical
      >
        <UHistory
          :isShowBtn="isShowBtn"
          :nidNosaziCode="results.NidLib.RMain.NidNosaziCode"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UBaroKafInfo from './partials/UBaroKafInfo'
import UOwnersAndOther from './partials/UOwnersAndOther'
import UKroki from './partials/UKroki'
import UDrawCroque from './partials/UDrawCroque'
import UTafsil from './partials/UTafsil'
import ULastStatusMapAnalyze from './partials/ULastStatusMapAnalyze'
import loadbaroKafLoadPrequestModel from './models/loadbaroKafLoadPrequestModel'
import UHistory from './partials/history/UHistory'
import baseFormMixin from 'src/mixins/baseFormMixin'
import FormActions from 'src/components/FormActions'

export default {
  route: '/parvandeh/barokaf',

  mixins: [baseFormMixin],
  components: {
    UBaroKafInfo,
    UOwnersAndOther,
    UKroki,
    UDrawCroque,
    UTafsil,
    ULastStatusMapAnalyze,
    UHistory,
    FormActions
  },
  data () {
    return {
      title: 'برو کف',
      formKey: '1fe00ca0-22a8-4cf1-a0b2-bc31a51ae92f',
      name: 'UBaroKafTabs',
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      activeTab: 'baroKafInfo',
      isView: false,
      items: [],
      isShowModal: false,
      showCroquie: false,
      baseNosaziCode: {},
      showCIVergeType: false,
      results: loadbaroKafLoadPrequestModel,
      loadDataPrequest: {
        pNidProc: '00000000-0000-0000-0000-000000000000',
        pIsLoadDeletedNosaziCode: 'false',
        NidBase_Parvandeh_HouseOrDastgah:
          '00000000-0000-0000-0000-000000000000'
      },
      saveBarokafResult: {},
      requestResult: {}
    }
  },
  // چون طبق زمل همین فرم باید در "نمایش تاریخچه" نمایش داده شود
  props: {
    isShowBtn: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    if (!this.selectedRequest) {
      this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید')
    } else {
      this.fetched()
    }
  },
  methods: {
    fetched () {
      this.loadData()
    },
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
              this.showCIVergeType = this.results.Sh_BaroKaf_Apartment !== null
              if (!this.isView) {
                await this.log({
                  action: this.logActions.view,
                  bizCode: this.selectedRequest.NidWorkItem,
                  bizCodeTitle: 'شماره درخواست',
                  nosaziCode: this.selectedRequest.BizCode
                })
              }
              this.isView = true
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
          District: this.selectedDistrict
        }
      })
        .then((response) => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            if (typeof doneCallback === 'function') {
              doneCallback()
            }
          } else {
            if (typeof failedCallback === 'function') {
              failedCallback()
            }
          }
        })
        .catch((_) => {
          this.hideLoading()

          this.showError(_.message)
        })
    },
    normalizeBaseOtherEquipmentRows () {
      return this.results.Base_OtherEquipment.map((m) => {
        return {
          ...m,
          CI_OtherEquipmentGroup: m.CI_OtherEquipmentGroup || 0,
          CI_OtherEquipmentType: m.CI_OtherEquipmentType || 0,
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
          PathWidthDoc: m.PathWidthDoc === '' ? 0 : parseFloat(m.PathWidthDoc),
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
    normalizeBase_Bezel () {
      return this.results.Base_Bezel.map((m) => {
        return {
          ...m,
          CI_BezelType: m.CI_BezelType || 0,
          CI_SideCode: m.CI_SideCode || 0,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || 0,
          Dimension: m.Dimension || null,
          IsObserve: m.IsObserve || null,
          Area: m.Area || null
        }
      })
    },
    normalizeBaseOwner () {
      return this.results.Base_Owner.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          Address: m.Address || null,
          AyanSir: m.AyanSir || null,
          BirthDate: m.BirthDate || null,
          BuildingNo: m.BuildingNo || null,
          CellPhone: m.CellPhone || null,
          Comments: m.Comments || null,
          DocNo: m.DocNo || null,
          EmissionPlace: m.EmissionPlace || null,
          NationalCode: m.NationalCode || null,
          NidOwnerBank: m.NidOwnerBank || null,
          PostCode: m.PostCode || null,
          AyanHabeh: m.AyanHabeh || null,
          ToftSir: m.ToftSir || null,
          EconomicID: m.EconomicID || null,
          IDCardNo: m.IDCardNo || null,
          OwnerFatherName: m.OwnerFatherName || '',
          OwnerLastName: m.OwnerLastName || '',
          OwnerName: m.OwnerName || '',
          Telephone: m.Telephone || null,
          ToftHabeh: m.ToftHabeh || null
        }
      })
    },
    saveBarokaf () {
      debugger
      this.results.Base_OtherEquipment = this.normalizeBaseOtherEquipmentRows()
      this.results.Base_Edge = this.normalizeBaseEdgeRows()
      this.results.Base_Bezel = this.normalizeBase_Bezel()
      this.results.Base_Owner = this.normalizeBaseOwner()
      const barokaf = this.results.Sh_BaroKaf
      barokaf.CI_Criterion = barokaf.CI_Criterion || 0
      barokaf.ToAdjusentArea = barokaf.ToAdjusentArea || 0
      barokaf.KorokiNumber = barokaf.KorokiNumber || 0
      barokaf.ToAdjusentLen = barokaf.ToAdjusentLen || 0
      barokaf.ToGangwayArea = barokaf.ToGangwayArea || 0
      barokaf.PathValue = barokaf.PathValue || 0
      barokaf.PathValueBaseonDeed = barokaf.PathValueBaseonDeed || 0
      barokaf.GreenArea = barokaf.GreenArea || 0
      barokaf.ToGangwayLen = barokaf.ToGangwayLen || 0

      const houseInfo = this.results.Base_HouseInfo_Config
      houseInfo.DocArea = houseInfo.DocArea || 0
      houseInfo.AreaAfterEdit = houseInfo.AreaAfterEdit || 0
      houseInfo.RemainArea = houseInfo.RemainArea || 0

      const houseInfoRvisit = this.results.Base_HouseInfo_Revisit
      houseInfoRvisit.CurrentArea = houseInfoRvisit.CurrentArea || 0
      houseInfoRvisit.BusyAreaWidth = houseInfoRvisit.BusyAreaWidth || 0
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
          if (this.requestResult.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: 'شماره درخواست',
              nosaziCode: this.selectedRequest.BizCode
            })
            this.showSuccess('عملیات با موفقیت انجام شد')
            this.results.NidBase_Parvandeh_HouseOrDastgah = ''
            this.isEditable = false
            this.loadData()
          }
        })
        .catch((ex) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    cancel () {
      this.isEditable = false
      this.loadData()
    }
  }
}
</script>
