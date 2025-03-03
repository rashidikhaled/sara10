<template>
  <safa-form :id="formKey" :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
>
    <form-wrapper vertical title="نقشه برداری" :padding="false">
     <template v-slot:header>
        <form-header-by-nosazi-code
          actions
          v-model="baseNosaziCode"
          from-request
          @fetched="fetched"
        />
         <safa-status :result="requestResult" />

      </template>

      <safa-tabs v-model="activeTab" class="fit" :bordered="false">
        <template v-slot:tabs>
          <tab-menu name="baroKafInfo" label="اطلاعات برو کف" />
          <tab-menu name="tafsil" label="طرح تفصیلی" />
          <tab-menu name="mapBarokaf" label="نقشه بر و کف عرصه" />
          <tab-menu name="documentSpec" label="مشخصات سند" />
          <tab-menu name="owners" label="مالکین" />
          <!-- <tab-menu
            name="analyze"
            label="آنالیز وضعیت قبلی نقشه"
          /> -->
        </template>

        <tab-content name="baroKafInfo" title="اطلاعات برو کف">
          <UBaroKafInfo
            :results="results"
            :m="mode"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>

        <tab-content name="mapBarokaf" title="نقشه بر و کف عرصه" :padding="false">
          <UKroki :results="results" @isShowBackBtn="isShowBackBtn" ref="map" />
        </tab-content>
        <tab-content
          name="documentSpec"
          title="مشخصات سند"
          v-if="activeTab === 'documentSpec'"
        >
          <UDocumentSpec :results="results" :m="mode" />
        </tab-content>
        <tab-content name="owners" title="مالکین">
          <UOwnersAndOther :results="results" :m="mode" />
        </tab-content>
        <tab-content name="tafsil" title="طرح تفصیلی و نظرات برو کف" :padding="false">
          <UTafsil :results="results" :m="mode" />
        </tab-content>

        <!-- <tab-content
          name="analyze"
          title="آنالیز وضعیت قبلی نقشه"
          :padding="false"
        >
          <ULastStatusMapAnalyze :results="results" />
        </tab-content> -->
      </safa-tabs>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="cancel"
          @save="saveBarokaf"
          editSPId="88d574a1-4a08-4600-ae5e-93a7ab8e5177"
          editFormId="96922143-53ef-4252-9620-bcfec0bb87b8"
        >
          <template v-slot:after>
            <btn-default
              spId="a692bb84-fb0f-43c1-afc5-7ee9945e101c"
              spCaption="تاریخچه برو کف"
              label="تاریخچه برو کف"
              @click="isShowModal = true"
            />
            <btn-default label="آرشیو DWG" @click="handelArchiveClick"  v-if="showArchiveDWG" />
            <!-- v-if="activeTab === 'mapBarokaf'" -->

            <btn-cancel
              label="بازگشت"
              @click="back"
              v-show="activeTab === 'mapBarokaf' && showBackBtn === true"
            />
          </template>
        </FormActions>
      </template>

      <safa-popup
        v-model="isShowModal"
        width="800px"
        height="600px"
        title="تاریخچه بروکف"
        vertical
      >
        <UHistory
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
import UBaroKafInfo from "./partials/UBaroKafInfo"
import UOwnersAndOther from "./partials/UOwnersAndOther"
import UDocumentSpec from "./partials/UDocumentSpec"
import UKroki from "./partials/UKroki"
import UTafsil from "./partials/UTafsil"
// import ULastStatusMapAnalyze from './partials/ULastStatusMapAnalyze'
import loadbaroKafLoadPrequestModel from "./models/loadbaroKafLoadPrequestModel"
import UHistory from "./partials/history/UHistory"
import baseFormMixin from "src/mixins/baseFormMixin"
import FormActions from "src/components/FormActions"

export default {
  route: "/parvandeh/barokaf",

  mixins: [baseFormMixin],
  components: {
    UBaroKafInfo,
    UOwnersAndOther,
    UKroki,
    UTafsil,
    // ULastStatusMapAnalyze,
    UHistory,
    FormActions,
    UDocumentSpec
  },
  computed: {
    showArchiveDWG () {
      return window.getConfigValue("security.showArchiveDWG", true)
    }
  },
  data () {
    return {
      title: "نقشه برداری",
      formKey: "96922143-53ef-4252-9620-bcfec0bb87b8",
      name: "UServey",
      isView: false,
      main: true,
      sidebarCompatible: true,
      activeTab: "baroKafInfo",
      items: [],
      isShowModal: false,
      results: loadbaroKafLoadPrequestModel,
      loadDataPrequest: {
        pNidProc: "fd65b45c-ba39-49b0-83f0-1c011a59778b",
        pIsLoadDeletedNosaziCode: "false"
      },
      saveBarokafResult: {},
      requestResult: {},
      showBackBtn: false
      // selectedHoughogheErtefaghi: null
    }
  },
  mounted () {
    if (!this.selectedRequest) {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید")
    } else {
      this.loadData()
    }
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
              // if (this.results.Base_HouseInfo_Revisit) {
              //   if (this.results.Base_HouseInfo_Revisit.HoughogheErtefaghi) {
              //     this.selectedHoughogheErtefaghi = 0
              //   } else if (this.results.Base_HouseInfo_Revisit.HoughogheErtefaghi === false) {
              //     this.selectedHoughogheErtefaghi = 1
              //   } else {
              //     this.selectedHoughogheErtefaghi = null
              //   }
              // }
              if (!this.isView) {
                await this.log({
                  action: this.logActions.view,
                  bizCode: this.selectedRequest.BizCode,
                  bizCodeTitle: "کد نوسازی",
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
            if (typeof doneCallback === "function") {
              doneCallback()
            }
            // await this.log({
            //   action: this.logActions.view,
            //   bizCode: this.selectedRequest.BizCode,
            //   bizCodeTitle: 'کد نوسازی',
            //   nosaziCode: this.selectedRequest.BizCode
            // })
          } else {
            if (typeof failedCallback === "function") {
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
          Comments: m.Comments || "",
          CreateDate: m.CreateDate || "",
          // NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          // NidOther: m.NidOther || '00000000-0000-0000-0000-000000000000',
          OtherEquipmentValue: m.OtherEquipmentValue || null
        }
      })
    },
    // normalizeOtherEquipment () {
    //   return this.results.Base_OtherEquipment.map(m => {
    //     return {
    //       ...m,
    //       CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null,
    //       CI_Suggest: m.CI_Suggest || null,
    //       OtherEquipmentValue: m.OtherEquipmentValue || null
    //     }
    //   })
    // },
    normalizeBaseEdgeRows () {
      return this.results.Base_Edge.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || "",
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
          Comments: m.Comments || "",
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
          PathName: m.PathName || "",
          PathWidth: m.PathWidth || 0,
          RegisterPlack: m.RegisterPlack || null,
          Remain: m.Remain || 0,
          PathWidthDoc: m.PathWidthDoc === "" ? 0 : parseFloat(m.PathWidthDoc),
          RemainBarLen: m.RemainBarLen || 0,
          RemainSideLen: m.RemainSideLen || 0,
          SideWalkWidth: m.SideWalkWidth || 0,
          ValBlockRowNo: m.ValBlockRowNo || null,
          // GoFrontLen: m.GoFrontLen || 0,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidEdge: m.NidOther || "00000000-0000-0000-0000-000000000000"
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
          IsObserve: m.IsObserve || null
        }
      })
    },
    normalizeBaseOwner () {
      return this.results.Base_Owner.map((m) => {
        return {
          ...m,
          NidOwnerBank: m.NidOwnerBank || null,
          AyanSir: m.AyanSir || 0,
          ToftSir: m.ToftSir || 0,
          ToftHabeh: m.ToftHabeh || null,
          NationalCode: m.NationalCode || null,
          IDCardNo: m.IDCardNo || null,
          EmissionPlace: m.EmissionPlace || null,
          EconomicID: m.EconomicID || null,
          DocNo: m.ToftHabeh || null,
          BuildingNo: m.BuildingNo || null,
          AyanHabeh: m.AyanHabeh || null
        }
      })
    },
    saveBarokaf () {
      this.results.Base_OtherEquipment = this.normalizeBaseOtherEquipmentRows()

      this.results.Base_Edge = this.normalizeBaseEdgeRows()
      this.results.Base_Bezel = this.normalizeBase_Bezel()
      this.results.Base_Owner = this.normalizeBaseOwner()
      // this.results.Base_OtherEquipment = this.normalizeOtherEquipment()

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
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
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
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: this.selectedRequest.BizCode
            })
            this.showSuccess("عملیات با موفقیت انجام شد")
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
    },
    handelArchiveClick () {
      this.activeTab = "mapBarokaf"
      this.$refs.map.showArchive = !this.$refs.map.showArchive
    },
    isShowBackBtn () {
      this.showBackBtn = true
    },
    back () {
      this.showBackBtn = false
      this.$refs.map.hideArchive()
    }
  }
}
</script>
