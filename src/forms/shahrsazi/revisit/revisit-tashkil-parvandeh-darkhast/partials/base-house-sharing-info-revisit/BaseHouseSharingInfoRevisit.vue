<template>
  <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="شهرسازی- تشکیل پرونده درخواست دستگاه"
  >
    <safa-status :result="result"/>
    <safa-status :result="resultSave"/>
    <fit>
      <safa-tabs
        v-model="currentTab"
        :bordered="false"
        class="fit"
        height="100%"
      >
        <template v-slot:tabs>
          <tab-menu
            v-for="{ name, title } in tabs"
            :key="name"
            :label="title"
            :name="name"
          />
        </template>
        <tab-content
          name="address"
          title=" آدرس و پلاک ثبتی"
        >
          <TabAddressAndRegisterPlaque
            v-model="currentData"
            v-bind="passedProps"
          />

        </tab-content>
        <tab-content
          name="doc"
          title="مشخصات سند"
        >
          <TabDocumentInfo
            v-model="currentData"
            v-bind="passedProps"
          />

        </tab-content>
        <tab-content
          name="baseOwner"
          title="مالکین و جهات اربعه"
        >
          <TabBaseOwnerAndBaseEdge
            v-model="currentData"
            v-bind="passedProps"
          />

        </tab-content>
        <tab-content
          name="baseInfo"
          title="مشخصات فنی"
        >
          <TabBaseHouse
            v-model="currentData"
            v-bind="passedProps"
          />

        </tab-content>
        <tab-content
          name="houseSharingInfo"
          title="مشخصات دستگاه"
        >
          <TabHouseSharingInfo
            v-model="currentData"
            v-bind="passedProps"
          />

        </tab-content>
        <tab-content
          name="other"
          title="سایر مشخصات"
        >
          <TabOther
            v-model="currentData"
            v-bind="passedProps"
          />

        </tab-content>
        <tab-content
          :padding="false"
          name="baseUsing"
          title="کاربریها"
        >
          <TabBaseUsing
            v-model="currentData"
            v-bind="passedProps"
          />

        </tab-content>
        <tab-content
          :padding="false"
          name="baseFront"
          title="پیشامدگیها"
        >
          <TabBaseFront
            v-model="currentData"
            v-bind="passedProps"
          />

        </tab-content>
        <tab-content
          name="baseParking"
          title="پارکینگ"
        >
          <TabParking
            v-model="currentData"
            v-bind="passedProps"
          />

        </tab-content>
        <tab-content
          name="baseArchive"
          title="سوابق"
        >
          <TabArchive
            v-model="currentData"
            v-bind="passedProps"
          />

        </tab-content>
        <tab-content
          name="comment"
          title="توضیحات"
        >
          <TabComment
            v-model="currentData"
            v-bind="passedProps"
          />

        </tab-content>

      </safa-tabs>

      <form-actions
        v-if="!readOnly"
        :m="mode"
        class='q-py-sm q-pl-sm'
        editSPId="87842f6e-112a-4a3d-9ae7-7562b7ca6e36"
        @cancel="load"
        @edit="isEditable = true"
        @save="save"
      >
        <template #after>
          <btn-default
            label="کپی از مجاز پروانه"
            spCaption="کپی از مجاز پروانه"
            spId="61664aff-a301-495f-87a8-377b80e96105"
            @click="handleCopyFromMojazParvaaneh"
          />
          <btn-default
            label="کپی از مجاز پایانکار"
            spCaption="کپی از مجاز پایانکار"
            spId="7cbfd55c-a713-4180-910e-a71eb703041b"
            @click="handleCopyFromMojazPayankar"
          />
        </template>
      </form-actions>
    </fit>
  </safa-form>
</template>

<script>
import requestModel from './models/houseSharingRequest'
import TabAddressAndRegisterPlaque from './partials/TabAddressAndRegisterPlaque'
import TabDocumentInfo from './partials/TabDocumentInfo'
import TabBaseOwnerAndBaseEdge from './partials/TabBaseOwnerAndBaseEdge'
import TabBaseHouse from './partials/TabBaseHouse'
import TabHouseSharingInfo from './partials/TabHouseSharingInfo'
import TabOther from './partials/TabOther'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabParking from './partials/TabParking'
import TabArchive from './partials/TabArchive'
// import TabCroquie from './partials/TabCroquie'
// import TabEngineer from './partials/TabEngineer'
import TabComment from './partials/TabComment'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseHouseSharingInfoRevisit',
  mixins: [baseFormMixin],
  components: {
    TabAddressAndRegisterPlaque,
    TabDocumentInfo,
    TabBaseOwnerAndBaseEdge,
    TabBaseHouse,
    TabHouseSharingInfo,
    TabOther,
    TabBaseUsing,
    TabBaseFront,
    TabParking,
    TabArchive,
    // TabCroquie,
    // TabEngineer,
    TabComment
  },

  props: {
    value: Object,
    formKey: String,
    title: String,
    readOnly: Boolean
  },

  data () {
    return {
      name: 'BaseHouseSharingInfoRevisit',
      result: null,
      resultSave: null,
      currentTab: 'address',
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'address',
          title: ' آدرس و پلاک ثبتی'
        },
        {
          name: 'doc',
          title: 'مشخصات سند'
        },
        {
          name: 'baseOwner',
          title: 'مالکین و جهات اربعه'
        },
        {
          name: 'baseInfo',
          title: 'مشخصات فنی'
        },
        {
          name: 'houseSharingInfo',
          title: 'مشخصات دستگاه'
        },
        {
          name: 'other',
          title: 'سایر مشخصات'
        },
        {
          name: 'baseUsing',
          title: ' کاربریها'
        },
        {
          name: 'baseFront',
          title: 'پیشامدگیها'
        },
        {
          name: 'baseParking',
          title: 'پارکینگ'
        },
        {
          name: 'baseArchive',
          title: 'سوابق'
        },
        // {
        //   name: 'engineer',
        //   title: 'مهندسین'
        // },
        // {
        //   name: 'croquie',
        //   title: 'کروکی'
        // },
        {
          name: 'comment',
          title: 'توضیحات'
        }
      ]
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
      return { m: this.mode }
    }
  },

  methods: {
    handleCopyFromMojazParvaaneh () {
      const handler = async () => {
        try {
          this.showLoading()

          const {
            data
          } = await this.$services.SC.copyFromMojazParvanehToRevisit(
            {
              pNidBase_Revisit: this.value.NidBase
            },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success !== true) {
            return this.showError('عملیات ناموفق بود')
          }
          this.showSuccess('اطلاعات از مجاز پروانه با موفقیت کپی شد')
          await this.log({
            action: this.logActions.copyToMojazParvaneh,
            bizCode: this.value.NidProc,
            bizCodeTitle: 'NidProc',
            saveReason: 'کپی اطلاعات پرونده به بازدید'
          })
          // end
        } catch (e) {
          console.error(e)
          this.showError('خطایی در سرویس رخ دارد')
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm('آیا از کپی اطلاعات مجاز پروانه اطمینان دارید؟').onOk(
        handler
      )
    },
    handleCopyFromMojazPayankar () {
      const handler = async () => {
        try {
          this.showLoading()

          const {
            data
          } = await this.$services.SC.copyFromMojazPayankarToRevisit(
            {
              pNidBase_Revisit: this.value.NidBase
            },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success !== true) {
            return this.showError('عملیات ناموفق بود')
          }
          await this.log({
            action: this.logActions.copyFromMojazPayankar,
            bizCode: this.value.NidProc,
            bizCodeTitle: 'NidProc',
            saveReason: 'اطلاعات از مجاز پایانکار'
          })
          this.showSuccess('اطلاعات از مجاز پایانکار با موفقیت کپی شد')

          // end
        } catch (e) {
          console.error(e)
          this.showError('خطایی در سرویس رخ دارد')
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm('آیا از کپی اطلاعات مجاز پایانکار اطمینان دارید؟').onOk(
        handler
      )
    },
    // normalizeBaseOwner () {
    //   return this.currentData.Base_Owner.map(m => {
    //     return {
    //       ...m,
    //       ActDate: m.ActDate || null,
    //       Address: m.Address || null,
    //       AyanSir: m.AyanSir || null,
    //       BirthDate: m.BirthDate || null,
    //       BuildingNo: m.BuildingNo || null,
    //       CellPhone: m.CellPhone || null,
    //       Comments: m.Comments || null,
    //       DocNo: m.DocNo || null,
    //       EmissionPlace: m.EmissionPlace || null,
    //       NationalCode: m.NationalCode || null,
    //       NidOwnerBank: m.NidOwnerBank || null,
    //       PostCode: m.PostCode || null,
    //       ToftSir: m.ToftSir || null,
    //       AyanHabeh: m.AyanHabeh || 0,
    //       AyanImpart: m.AyanImpart || 0,
    //       IDCardNo: m.IDCardNo || 0,
    //       ToftHabeh: m.ToftHabeh || 0,
    //       ToftImpart: m.ToftImpart || 0
    //     }
    //   })
    // },
    normalizeBaseEdge () {
      return this.currentData.Base_Edge.map(m => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          AddLen: m.AddLen || 0,
          AfterEditBarLen: m.AfterEditBarLen || null,
          AfterEditSideLen: m.AfterEditSideLen || null,
          AfterEditWidth: m.AfterEditWidth || 0,
          BackwardLen: m.BackwardLen || null,
          BarLenEffective: m.BarLenEffective || null,
          CI_Moshrefiat: m.CI_Moshrefiat || null,
          CI_Privacy: m.CI_Privacy || null,
          CI_ValBlockFord: m.CI_ValBlockFord || null,
          CI_ViewCode: m.CI_ViewCode || null,
          Comments: m.Comments || null,
          Depth1: m.Depth1 || 0,
          Depth2: m.Depth2 || 0,
          Depth3: m.Depth3 || 0,
          DesignLen: m.DesignLen || 0,
          EdgeAndSideCurrent: m.EdgeAndSideCurrent || null,
          EdgeAndSideDoc: m.EdgeAndSideDoc || null,
          EdgeBarCurrent: m.EdgeBarCurrent || null,
          EdgeBarDoc: m.EdgeBarDoc || null,
          EdgeLenCurrent: m.EdgeLenCurrent || null,
          EntranceWith: m.EntranceWith || null,
          GoFrontLen: m.GoFrontLen || 0,
          GoFrontLenAllow: m.GoFrontLenAllow || 0,
          GoFrontLenOther: m.GoFrontLenOther || 0,
          GoFrontLenOtherAllow: m.GoFrontLenOtherAllow || 0,
          PathKaf: m.PathKaf || 0,
          PathName: m.PathName || null,
          PathWidth: m.PathWidth || 0,
          RegisterPlack: m.RegisterPlack || null,
          Remain: m.Remain || null,
          RemainBarLen: m.RemainBarLen || null,
          RemainSideLen: m.RemainSideLen || null,
          SideWalkWidth: m.SideWalkWidth || null,
          ValBlockRowNo: m.ValBlockRowNo || null,
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidEdge: m.NidEdge || '00000000-0000-0000-0000-000000000000'
        }
      })
    },
    normalizeBaseOtherEquipment () {
      return this.currentData.Base_OtherEquipment.map(m => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null,
          CI_Suggest: m.CI_Suggest || null,
          Comments: m.Comments || null,
          CreateDate: m.CreateDate || null,
          OtherEquipmentValue: m.OtherEquipmentValue || 0
        }
      })
    },
    normalizeBaseSubScription () {
      return this.currentData.Base_SubScription.map(m => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          InstallationDate: m.InstallationDate || null,
          SubScriptionVal: m.SubScriptionVal || null
        }
      })
    },
    normalizeBaseGreenSpace () {
      return this.currentData.Base_GreenSpace.map(m => {
        return {
          ...m,
          CI_GreenSpaceType: m.CI_GreenSpaceType || 0,
          Comments: m.Comments || null,
          GreenSpaceCount: m.GreenSpaceCount || null,
          NeighborValue: m.NeighborValue || null,
          GreenSpaceValue: m.GreenSpaceValue || 0,
          NidGreenSpace:
            m.NidGreenSpace || '00000000-0000-0000-0000-000000000000',
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000'
        }
      })
    },
    normalizeBaseNeighbor () {
      return this.currentData.Base_Neighbor.map(m => {
        return {
          ...m,
          CI_NeighborType: m.CI_NeighborType || 0,
          CI_Neighbor_Specifications: m.CI_Neighbor_Specifications || null,
          CI_SideCode: m.CI_SideCode || 0,
          NeighborValue: m.NeighborValue || null,
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidNeighbor: m.NidNeighbor || '00000000-0000-0000-0000-000000000000'
        }
      })
    },
    normalizeBaseDoor () {
      return this.currentData.Base_Door.map(m => {
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
    normalizeBaseUsing () {
      return this.currentData.Base_Using.map(m => {
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
    normalizeBase_Front () {
      return this.currentData.Base_Front.map(m => {
        return {
          ...m,
          CI_FrontStatus: m.CI_FrontStatus || null,
          CI_RoofType: m.CI_RoofType || null,
          ConversionDate: m.ConversionDate || null,
          DWGObjectID: m.DWGObjectID || null,
          DWGObjectName: m.DWGObjectName || null,
          GenerateDate: m.GenerateDate || null
        }
      })
    },
    normalizeBaseParking () {
      return this.currentData.Base_Parking.map(m => {
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
    normalizeBaseShahrsaziArchive () {
      return this.currentData.Base_ShahrsaziArchive.map(m => {
        return {
          ...m,
          Comments: m.Comments || null,
          CertificateDate: m.CertificateDate || null,
          CertificateNo: m.CertificateNo || null,
          CreditDate: m.CreditDate || null,
          NidProc: m.NidProc || null,
          BuildingNo: m.BuildingNo || null,
          NidWorkItem: m.NidWorkItem || null
        }
      })
    },
    normalizeBaseCommissionHistory () {
      return this.currentData.Base_CommissionHistory.map(m => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          SendNo: m.SendNo || null,
          CI_RequestType: m.CI_RequestType || null,
          NidProc: m.NidProc || null,
          VoteNo: m.VoteNo || null
        }
      })
    },
    newGuid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
    async save () {
      for (let i = 0; i < this.currentData.Base_Owner.length; i++) {
        for (let j = 0; j < this.currentData.Base_Owner.length; j++) {
          const x = this.currentData.Base_Owner[i]
          const y = this.currentData.Base_Owner[j]
          if (
            (x.NidOwner === y.NidOwner ||
              '00000000-0000-0000-0000-000000000000') &&
            i !== j
          ) {
            // return this.showError('تکراری NidOwner')
            y.NidOwner = this.newGuid()
          }
        }
      }
      this.currentData.Base_Owner = this.currentData.Base_Owner.map(x => {
        return {
          ...x,
          NidBase: x.isNew ? undefined : x.NidBase,
          NidOwner: x.isNew ? undefined : x.NidOwner,
          ActDate: x.ActDate || null,
          Address: '',
          AyanDang: x.AyanDang || 0,
          AyanHabeh: x.AyanHabeh || 0,
          AyanImpart: x.AyanImpart || 0,
          AyanSir: x.AyanSir || 0,
          AyanTotalImpart: x.AyanTotalImpart || 0,
          BirthDate: x.BirthDate || '',
          BuildingNo: x.BuildingNo || 0,
          NidOwnerBank: x.NidOwnerBank || null,
          ToftDang: x.ToftDang || 0,
          ToftHabeh: x.ToftHabeh || 0,
          ToftImpart: x.ToftImpart || 0,
          ToftSir: x.ToftSir || 0,
          DateCheckSabt: x.DateCheckSabt || null,
          EconomicID: x.EconomicID || null,
          ToftTotalImpart: x.ToftTotalImpart || 0
        }
      })
      try {
        this.showSending()
        const houseInfo = this.currentData.Base_HouseInfo
        houseInfo.CurrentArea = houseInfo.CurrentArea || 0
        houseInfo.AreaAfterEdit = houseInfo.AreaAfterEdit || 0
        houseInfo.RemainArea = houseInfo.RemainArea || 0
        houseInfo.DocArea = houseInfo.DocArea || 0
        houseInfo.CI_IncloseType = houseInfo.CI_IncloseType || 0
        houseInfo.DeepShaftCount = houseInfo.DeepShaftCount || 0
        houseInfo.PoolArea = houseInfo.PoolArea || 0
        houseInfo.PoolCubature = houseInfo.PoolCubature || 0
        houseInfo.MamarArea = houseInfo.MamarArea || 0
        houseInfo.GlasshouseArea = houseInfo.GlasshouseArea || 0

        const buildingInfo = this.currentData.Base_BuildingInfo
        buildingInfo.InfrastructureArea = buildingInfo.InfrastructureArea || 0
        buildingInfo.AllowableDensityLicence =
          buildingInfo.AllowableDensityLicence || 0
        buildingInfo.LightfastArea = buildingInfo.LightfastArea || 0
        buildingInfo.UpperHeight = buildingInfo.UpperHeight || 0
        buildingInfo.BusyArea = buildingInfo.BusyArea || 0
        buildingInfo.DownerHeight = buildingInfo.DownerHeight || 0
        buildingInfo.RampArea = buildingInfo.RampArea || 0
        buildingInfo.Height = buildingInfo.Height || 0
        buildingInfo.Defilade = buildingInfo.Defilade || 0
        buildingInfo.CommercialGapDepth = buildingInfo.CommercialGapDepth || 0
        buildingInfo.HeightKorsi = buildingInfo.HeightKorsi || 0
        buildingInfo.MultiBuildingToftImpartArea =
          buildingInfo.MultiBuildingToftImpartArea || 0
        buildingInfo.CreateYearTo = buildingInfo.CreateYearTo || 0
        buildingInfo.CreateYearFrom = buildingInfo.CreateYearFrom || 0
        buildingInfo.ParkingNeedCount = buildingInfo.ParkingNeedCount || 0
        buildingInfo.ParkingSupplyCount = buildingInfo.ParkingSupplyCount || 0
        buildingInfo.ParkingGet = buildingInfo.ParkingGet || 0

        const commonEstate = this.currentData.Base_CommonEstate
        commonEstate.ViewArea = commonEstate.ViewArea || 0
        commonEstate.CommercialGapWidth = commonEstate.CommercialGapWidth || 0

        // this.currentData.Base_Owner = this.normalizeBaseOwner()
        this.currentData.Base_Edge = this.normalizeBaseEdge()
        this.currentData.Base_OtherEquipment = this.normalizeBaseOtherEquipment()
        this.currentData.Base_SubScription = this.normalizeBaseSubScription()
        this.currentData.Base_GreenSpace = this.normalizeBaseGreenSpace()
        this.currentData.Base_Neighbor = this.normalizeBaseNeighbor()
        this.currentData.Base_Door = this.normalizeBaseDoor()
        this.currentData.Base_Using = this.normalizeBaseUsing()
        this.currentData.Base_Front = this.normalizeBase_Front()
        this.currentData.Base_Parking = this.normalizeBaseParking()
        this.currentData.Base_ShahrsaziArchive = this.normalizeBaseShahrsaziArchive()
        this.currentData.Base_CommissionHistory = this.normalizeBaseCommissionHistory()
        const {
          data
        } = await this.$services.SC.saveRevisitHouseSharingParvandeh(
          {
            pObj: this.currentData,
            pUser: this.currentUser,
            pNidProc: this.value.NidProc,
            PNidRevisit: this.value.NidRevisit,
            pDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: '00000000-0000-0000-0000-000000000000'
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: this.value.NidProc,
            bizCodeTitle: 'NidProc'
          })
          this.showSuccess('ذخیره با موفقیت انجام شد')
          this.load()
        }
      } catch (e) {
        this.serverError()
        console.log('error', e)
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      // Reset State
      this.isEditable = false

      try {
        this.showLoading()

        // Fetch
        const { data } = await this.$services.SC.getRevisitHouseSharing(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              'Base_NosaziCode,Base_AddressInfo,Base_Edge,Base_BuildingInfo,Base_HouseInfo,Base_CommonEstate,Base_GreenSpace,Base_RegisterPlack,Base_Owner,Base_SubScription,Base_ShahrsaziArchive,Base_Door,Base_Scuttle,Base_Neighbor,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_Parking,Base_OtherEquipment,Base_Attachment,MapImage,Base_AddressPostCode,Base_Wall,Base_CommissionHistory,Base_PreCodeInfo',
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )

        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('اطلاعات بازدید بارگذاری نشد')
        }
        await this.log({
          action: this.logActions.view,
          bizCode: this.value.NidProc,
          bizCodeTitle: 'NidProc'
        })
        this.currentData = this.result.data

        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ دارد')
      } finally {
        this.hideLoading()
      }
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
