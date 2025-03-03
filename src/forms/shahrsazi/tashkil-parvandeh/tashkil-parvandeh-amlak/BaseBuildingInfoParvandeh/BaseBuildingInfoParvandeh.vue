<template>
  <fit>
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <safa-status :result="requestResult" />
    <safa-status :result="copyRequestResult" />
    <safa-tabs
      v-model="currentTab"
      class="fit"
      height="100%"
      :bordered="false"
    >
      <template v-slot:tabs>
        <tab-menu
          v-for="({name, title}) in tabs"
          :key="name"
          :name="name"
          :label="title"
        />
      </template>
      <tab-content
        name="buildingInfo"
        title="مشخصات ساختمان"
      >
        <partial-base-building-info-tab
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="other"
        title="سایر مشخصات"
      >
        <partial-other-info-tab
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="baseUsing"
        title="نوع استفاده"
        :padding="false"
      >
        <partial-base-using-tab
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="baseFront"
        title="پیشامدگی ها"
        :padding="false"
      >
        <partial-base-front-tab
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="sharingInfrastructure"
        title="مشترکات"
        :padding="false"
      >
        <partial-base-sharing-infrastructure-tab
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="otherEquipment"
        title="سایر"
        :padding="false"
      >
        <partial-base-other-equipment-tab
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="controllerInfo"
        title="مهندسین ناظر"
        :padding="false"
      >
        <partial-base-controller-info-tab
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="parking"
        title="پارکینگ"
      >
        <partial-base-parking-tab
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="explanation"
        title="توضیحات"
      >
        <partial-explanation-tab
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
    </safa-tabs>

    <form-actions
      :m="mode"
      @edit="isEditable = true"
      @save="handleSaveAction"
      @cancel="load"
      class="q-pb-sm q-pl-sm"
    >
      <template #after>
        <btn-default
          label="کپی به مجاز پروانه"
          @click="handleCopyBuildingToMojazParvaneh"
        />
        <btn-default
          label="کپی از مجاز پروانه"
          @click="handleCopyFromMojazParvanehToBuildingParvandeh"
        />
        <btn-default
          label="کپی به مجاز پایانکار"
          @click="handleCopyToMojazPayankar"
        />
        <btn-default
          label="کپی اطلاعات"
          @click="isShowCopyDataModal = true"
        />
        <btn-default label="گزارش" @click="print"/>
      </template>
    </form-actions>
    <ShowModal
      title="کپی اطلاعات تشکیل پرونده"
      v-model="isShowCopyDataModal"
      width="200px"
      height="180px"
    >
      <div class="row  justify-center">
        <div class="col-auto">
          <nosazi-code-input
            v-model="baseNosaziCode"
            label="کد نوسازی مقصد"
            @input="handleBaseNosaziCodeChanged"
          />
        </div>
      </div>
      <template v-slot:footer>
        <div class="row q-gutter-x-sm">
          <btn-default
            @click="handleCopyAction"
            label="کپی"
            :disabled="disableCopyBtn"
             />

        </div>
      </template>
    </ShowModal>

  </fit>
</template>

<script>
import requestModel from './config/requestModel'
import PartialBaseBuildingInfoTab from './partials/PartialBaseBuildingInfoTab'
import PartialOtherInfoTab from './partials/PartialOtherInfoTab'
import PartialBaseUsingTab from './partials/PartialBaseUsingTab'
import PartialBaseFrontTab from './partials/PartialBaseFrontTab'
import PartialBaseSharingInfrastructureTab from './partials/PartialBaseSharingInfrastructureTab'
import PartialBaseOtherEquipmentTab from './partials/PartialBaseOtherEquipmentTab'
import PartialBaseControllerInfoTab from './partials/PartialBaseControllerInfoTab'
import PartialBaseParkingTab from './partials/PartialBaseParkingTab'
import PartialExplanationTab from './partials/PartialExplanationTab'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'BaseBuildingInfoParvandeh',
  mixins: [baseFormMixin],
  components: {
    PartialOtherInfoTab,
    PartialBaseUsingTab,
    PartialBaseFrontTab,
    PartialBaseParkingTab,
    PartialExplanationTab,
    PartialBaseBuildingInfoTab,
    PartialBaseOtherEquipmentTab,
    PartialBaseControllerInfoTab,
    PartialBaseSharingInfrastructureTab
  },

  props: {
    value: Object,
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
    mainNosaziCodeInfo: Object,
    parentNosaziCode: Object
  },

  data () {
    return {
      isShowCopyDataModal: false,
      result: null,
      resultSave: null,
      currentTab: 'buildingInfo',
      isView: false,
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'buildingInfo',
          title: 'مشخصات ساختمان'
        },
        {
          name: 'other',
          title: 'سایر مشخصات'
        },
        {
          name: 'baseUsing',
          title: 'نوع استفاده'
        },
        {
          name: 'baseFront',
          title: 'پیشامدگی ها'
        },
        {
          name: 'sharingInfrastructure',
          title: 'مشترکات'
        },
        {
          name: 'otherEquipment',
          title: 'سایر'
        },
        {
          name: 'controllerInfo',
          title: 'مهندسین ناظر'
        },
        {
          name: 'parking',
          title: 'پارکینگ'
        },
        {
          name: 'explanation',
          title: 'توضیحات'
        }
      ],
      baseLibResults: { MainObj: {} },
      requestResult: null,
      copyRequestResult: null,
      disableCopyBtn: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.value.District
        }
      }
    },
    passedProps () {
      return {
        m: this.mode,
        name: this.name,
        formKey: this.formKey,
        title: this.title
      } // sheikhi add  formKey ,title
    }
  },

  methods: {
    print () {
      const reportPath =
        '/Sara8Reports/RptBuildingInfo'
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        RptDomain: '1@2@3@4@5@6@7@8@9@10@11@12@80',
        District: this.parentNosaziCode.District
      }
      this.showReport(reportPath, queryParams)
    },
    normalizeBaseOtherEquipmentRows () {
      return this.currentData.Base_OtherEquipment.map((m) => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null
        }
      })
    },
    normalizeBaseUsing () {
      return this.currentData.Base_Using.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          BusyArea: m.BusyArea || null,
          CI_BuildingType: m.CI_BuildingType || null,
          CI_HowChangeBuilding: m.CI_HowChangeBuilding || null,
          CI_Repair: m.CI_Repair || null,
          CI_ViewCode: m.CI_ViewCode || null,
          CI_UsingStatus: m.CI_UsingStatus || null,
          DWGObjectID: m.DWGObjectID || null,
          DWGObjectName: m.DWGObjectName || null,
          Depth1Area: m.Depth1Area || null,
          Depth1No: m.Depth1No || null,
          Depth2Area: m.Depth2Area || null,
          Depth2No: m.Depth2No || null,
          Depth3Area: m.Depth3Area || null,
          GenerateDate: m.GenerateDate || null,
          IllegalInfrastructure: m.IllegalInfrastructure || null,
          MassDistance_Main: m.MassDistance_Main || null,
          MassDistance_Sub: m.MassDistance_Sub || null,
          OverOnArea: m.OverOnArea || null,
          OverOnLengthNear: m.OverOnLengthNear || null,
          OverOnTarakom: m.OverOnTarakom || null,
          OverOrNoParvaneh: m.OverOrNoParvaneh || null,
          RepairArea: m.RepairArea || null,
          UnUsefulHeight: m.UnUsefulHeight || null,
          CI_UsingPlace: m.CI_UsingPlace || null,
          ConversionDate: m.ConversionDate || null,
          Depth3No: m.Depth3No || null,
          GarbageUnit: m.GarbageUnit || null
        }
      })
    },
    normalizeBaseFront () {
      return this.currentData.Base_Front.map((m) => {
        return {
          ...m,
          CI_RoofType: m.CI_RoofType || null,
          CI_FrontStatus: m.CI_FrontStatus || null,
          DWGObjectID: m.DWGObjectID || 0,
          DWGObjectName: m.DWGObjectName || null
        }
      })
    },
    normalizeBaseBezel () {
      return this.currentData.Base_Bezel.map((m) => {
        return {
          ...m,
          CI_BezelType: m.CI_BezelType || 0,
          CI_SideCode: m.CI_SideCode || 0,
          Dimension: m.Dimension || null,
          IsObserve: m.IsObserve || null,
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidBezel: m.NidBezel || '00000000-0000-0000-0000-000000000000'
        }
      })
    },
    normalizeBaseParking () {
      return this.currentData.Base_Parking.map((m) => {
        return {
          ...m,
          CI_RequiredParkingType: m.CI_RequiredParkingType || null,
          InspectedNo: m.InspectedNo || null,
          ProductYear: m.ProductYear || null,
          SupplyNo: m.SupplyNo || null,
          TrespassYear: m.TrespassYear || null
        }
      })
    },
    normalizeBaseDoor () {
      return this.currentData.Base_Door.map((m) => {
        return {
          ...m,
          CI_DoorType: m.CI_DoorType || 0,
          CI_SideCode: m.CI_SideCode || 0,
          DoorCount: m.DoorCount || 0,
          DoorDepth: m.DoorDepth || 0,
          DoorWidth: m.DoorWidth || 0,
          UnitNo: m.UnitNo || 0,
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidDoor: m.NidDoor || '00000000-0000-0000-0000-000000000000',
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
    normalizeBaseOtherEquipment () {
      return this.currentData.Base_OtherEquipment.map((m) => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null,
          CI_Suggest: m.CI_Suggest || null,
          Comments: m.Comments || null,
          CreateDate: m.CreateDate || null,
          OtherEquipmentValue: m.OtherEquipmentValue || null
        }
      })
    },
    normalizeBaseInstallationBuilding () {
      return this.currentData.Base_Installation.map((m) => {
        return {
          ...m,
          Area: m.Area || null,
          Length: m.Length || null,
          Volume: m.Volume || null,
          Width: m.Width || null,
          Height: m.Height || null
        }
      })
    },
    handleSaveAction () {
      if (!this.isValidForm()) return
      this.showLoading()
      this.currentData.Base_OtherEquipment = this.normalizeBaseOtherEquipmentRows()
      this.currentData.Base_Bezel = this.normalizeBaseBezel()
      this.currentData.Base_Using = this.normalizeBaseUsing()
      this.currentData.Base_Front = this.normalizeBaseFront()
      this.currentData.Base_Parking = this.normalizeBaseParking()
      this.currentData.Base_Door = this.normalizeBaseDoor()
      this.currentData.Base_OtherEquipment = this.normalizeBaseOtherEquipment()
      this.currentData.Base_Installation = this.normalizeBaseInstallationBuilding()

      const buildingInfo = this.currentData.Base_BuildingInfo
      buildingInfo.InfrastructureArea = buildingInfo.InfrastructureArea || 0
      buildingInfo.AllowableDensityLicence =
        buildingInfo.AllowableDensityLicence || 0
      buildingInfo.RampArea = buildingInfo.RampArea || 0
      buildingInfo.LightfastArea = buildingInfo.LightfastArea || 0
      buildingInfo.BusyArea = buildingInfo.BusyArea || 0
      buildingInfo.UpperHeight = buildingInfo.UpperHeight || 0
      buildingInfo.ViewArea = buildingInfo.ViewArea || 0
      buildingInfo.DownerHeight = buildingInfo.DownerHeight || 0
      buildingInfo.Height = buildingInfo.Height || 0
      buildingInfo.CommercialGapWidt = buildingInfo.CommercialGapWidth || 0
      buildingInfo.Defilade = buildingInfo.Defilade || 0
      buildingInfo.CommercialGapDepth = buildingInfo.CommercialGapDepth || 0
      buildingInfo.HeightKorsi = buildingInfo.HeightKorsi || 0
      buildingInfo.MultiBuildingToftImpartArea =
        buildingInfo.MultiBuildingToftImpartArea || 0
      buildingInfo.ParkingNeedCount = buildingInfo.ParkingNeedCount || 0
      buildingInfo.ParkingSupplyCount = buildingInfo.ParkingSupplyCount || 0
      buildingInfo.ParkingGet = buildingInfo.ParkingGet || 0

      const buildingAddress = this.currentData.Base_CommonEstate
      buildingAddress.CommercialGapWidth =
        buildingAddress.CommercialGapWidth || 0
      buildingAddress.ViewArea = buildingAddress.ViewArea || 0

      const buildingOther = this.currentData.Base_BuildingInfo
      buildingOther.CreateYearFrom = buildingOther.CreateYearFrom || 0
      buildingOther.CreateYearTo = buildingOther.CreateYearTo || 0
      this.$services.SC.saveParvandehBuilding(
        {
          PObj: this.currentData,
          pUser: this.currentUser,
          pDtoWorkflowData: {
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
            await this.log({
              action: this.logActions.save,
              bizCode: this.currentData._nidBase,
              bizCodeTitle: 'NidBase',
              nosaziCode: this.value.key
            })

            this.showSuccess('ذخیره با موفقیت انجام شد')
            this.load()
          }
        })
        .catch((response) => {
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleBaseNosaziCodeChanged () {
      this.getBaseLibInNosaziCode()
    },
    getBaseLibInNosaziCode () {
      this.showLoading()
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            this.disableCopyBtn = false
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleCopyAction () {
      this.transferResult = null
      this.showConfirm('آیااز کپی اطلاعات اطمینان دارید؟').onOk(() => {
        this.copyInfo()
      })
    },
    copyInfo () {
      if (!this.mainNosaziCodeInfo.MainObj || !this.baseLibResults.MainObj) {
        return
      }
      this.showLoading()
      let payLoad = {
        pFromNidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        pToNidBase: this.baseLibResults.MainObj.NidBase,
        pCount: 1,
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        pFillGap: true
      }
      this.$services.SC.copy(payLoad)
        .then(async ({ data }) => {
          this.copyRequestResult = this.getResponse(data)

          if (this.copyRequestResult.success) {
            this.showSuccess('کپی اطلاعات با موفقیت انجام شد.')
            this.isShowCopyDataModal = false
            await this.log({
              action: this.logActions.copy,
              bizCode: this.value.NidBase,
              bizCodeTitle: 'NidBase',
              nosaziCode: this.value.key
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleCopyBuildingToMojazParvaneh () {
      this.showConfirm('آیا از کپی اطلاعات به مجاز پروانه اطمینان دارید؟').onOk(
        () => {
          this.showSending()
          this.$services.SC.copyBuildingToMojazParvaneh(
            {
              pFromNidBase: this.value.NidBase
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
                const nosaziCode = convertNosaziCodeObjectToString(
                  this.baseNosaziCode
                )
                await this.log({
                  action: this.logActions.copyToMojazParvaneh,
                  bizCode: this.value.NidBase,
                  bizCodeTitle: "NidBase",
                  nosaziCode,
                  saveDesc: `کپی به مجاز پروانه با موفقیت برای کدنوسازی ${nosaziCode
                    .split("-")
                    .reverse()
                    .join("-")} انجام گردید`
                })
                this.showSuccess('کپی با موفقیت انجام شد')
              }
            })
            .catch(
              () => {
                this.serverError()
              }
            )
            .finally(() => {
              this.hideLoading()
            })
        }
      )
    },
    handleCopyFromMojazParvanehToBuildingParvandeh () {
      this.showConfirm(
        'آیا از کپی اطلاعات از مجاز پروانه به تشکیل پرونده ساختمان اطمینان دارید؟'
      ).onOk(() => {
        this.showSending()
        this.$services.SC.copyFromMojazParvanehToBuildingParvandeh(
          {
            pNidNosaziCode_Building: this.value.NidNosaziCode
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
              await this.log({
                action: this.logActions.copyFromMojazParvaneh,
                bizCode: this.value.NidBase,
                bizCodeTitle: 'NidBase',
                nosaziCode: this.value.key
              })

              this.showSuccess('کپی با موفقیت انجام شد')
            }
          })
          .catch(() => this.serverError())
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    handleCopyToMojazPayankar () {
      this.showConfirm(
        'آیا از کپی اطلاعات به مجاز پایانکار ساختمان اطمینان دارید؟'
      ).onOk(() => {
        this.showSending()
        this.$services.SC.copyToMojazPayankar(
          {
            pFromNidBase: this.value.NidBase
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
              await this.log({
                action: this.logActions.copyToMojazPayankar,
                bizCode: this.value.NidBase,
                bizCodeTitle: 'NidBase',
                nosaziCode: this.value.key
              })

              this.showSuccess('کپی به مجاز پایانکار با موفقیت انجام شد')
            } else {
              this.showError('انجام نشد')
            }
          })
          .catch((response) => this.getResponse(response))
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    load () {
      this.isEditable = false
      if (!this.value.NidBase) {
        return
      }
      this.showLoading()
      this.$services.SC.getParvandehBuilding(
        {
          PNidBase: this.value.NidBase,
          PLoadFun:
            'Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Wall,Base_Door,Base_Bezel,Base_OtherEquipment,Base_ControllerInfo,Base_Attachment,MapImage,Base_Parking,Base_SharingInfrastructure'
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
            this.disableCopyBtn = false
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.value.NidBase,
                bizCodeTitle: 'NidBase',
                nosaziCode: this.value.key
              })
            }
            this.isView = true
          }
        })
        .catch(() => this.serverError())
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
