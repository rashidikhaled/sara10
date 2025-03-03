<template>
  <fit>
    <safa-status :result="result" />
    <safa-status :result="resultSave" />

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
        name="address"
        title="آدرس"
      >
        <TabAddress
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="registerPlaque"
        title="مشخصات سند و پلاک ثبتی"
      >
        <TabRegisterPlaque
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="baseOwner"
        title="مالکین و جهات اربعه"
        :padding="false"
      >
        <TabBaseOwner
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="houseInfo"
        title="مشخصات فنی"
      >
        <TabBaseHouseInfo
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="other"
        title="سایر مشخصات"
      >
        <TabOther1
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="other2"
        title="سایر"
        :padding="false"
      >
        <TabOther2
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="archive"
        title="سوابق و اشتراکات"
      >
        <TabArchive
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <!-- <tab-content
        name="croquis"
        title="کروکی"
      >
        <TabCroque
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content> -->
      <tab-content
        name="plans"
        title="طرح تفضیلی و توضیحات"
      >
        <TabPlans
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
          label="گزارش"
          @click="print"
      />
      </template>
    </form-actions>
  </fit>
</template>

<script>
import requestModel from './config/requestModel'
import TabAddress from './partials/TabAddress'
import TabRegisterPlaque from './partials/TabRegisterPlaque'
import TabBaseOwner from './partials/TabBaseOwner'
import TabBaseHouseInfo from './partials/TabBaseHouseInfo'
import TabOther1 from './partials/TabOther1'
import TabOther2 from './partials/TabOther2'
import TabArchive from './partials/TabArchive'
// import TabCroque from './partials/TabCroque'
import TabPlans from './partials/TabPlans'
import baseFormMixin from 'src/mixins/baseFormMixin'
//
export default {
  name: 'BaseHouseInfoParvandeh',
  mixins: [baseFormMixin],
  components: {
    TabAddress,
    TabRegisterPlaque,
    TabBaseOwner,
    TabBaseHouseInfo,
    TabOther1,
    TabOther2,
    TabArchive,
    // TabCroque,
    TabPlans
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
    parentNosaziCode: Object,
    mainNosaziCodeInfo: Object
  },

  data () {
    return {
      result: null,
      resultSave: null,
      currentTab: 'address',
      isView: false,
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'address',
          title: ' آدرس'
        },
        {
          name: 'registerPlaque',
          title: ' مشخصات سند و پلاک ثبتی'
        },
        {
          name: 'baseOwner',
          title: ' مالکین و جهات اربعه'
        },
        {
          name: 'houseInfo',
          title: ' مشخصات فنی'
        },
        {
          name: 'other',
          title: ' سایر مشخصات'
        },
        {
          name: 'other2',
          title: ' سایر'
        },
        {
          name: 'archive',
          title: ' سوابق و اشتراکات'
        },
        // {
        //   name: 'croquis',
        //   title: 'کروکی'
        // },
        {
          name: 'plans',
          title: 'طرح تفصیلی و توضیحات'
        }
      ]
    }
  },

  computed: {
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    async print () {
      const reportPath =
        '/Sara8Reports/RptHouseInfo'
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        RptDomain: '1@2@3@4@5@6@7@8@9@10@11@12@80',
        District: this.parentNosaziCode.District,
        NidNosaziCode: this.mainNosaziCodeInfo.MainObj.NidNosaziCode
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: 'RptHouseInfo',
        bizCodeTitle: 'گزارش',
        nosaziCode: this.value.key
      })
    },
    normalizeBaseNeighbor () {
      return this.currentData.Base_Neighbor.map(m => {
        return {
          ...m,
          CI_Neighbor_Specifications: m.CI_Neighbor_Specifications || null
        }
      })
    },
    // normalizeBaseOwner () {
    //   return this.currentData.Base_Owner.map(m => {
    //     return {
    //       ...m,
    //       NidOwnerBank: m.NidOwnerBank || null,
    //       AyanSir: m.AyanSir || 0,
    //       ToftSir: m.ToftSir || 0,
    //       ToftHabeh: m.ToftHabeh || null,
    //       NationalCode: m.NationalCode || null,
    //       IDCardNo: m.IDCardNo || null,
    //       EmissionPlace: m.EmissionPlace || null,
    //       EconomicID: m.EconomicID || null,
    //       DocNo: m.ToftHabeh || null,
    //       BuildingNo: m.BuildingNo || null,
    //       AyanHabeh: m.AyanHabeh || null
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
    normalizeBaseBezel () {
      return this.currentData.Base_Bezel.map(m => {
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
    normalizeBaseOtherEquipment () {
      return this.currentData.Base_OtherEquipment.map(m => {
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
    normalizeBaseShahrsaziArchive () {
      return this.currentData.Base_ShahrsaziArchive.map(m => {
        return {
          ...m,
          NidProc: m.NidProc || null,
          BuildingNo: m.BuildingNo || null,
          SerialNo: m.SerialNo || null,
          CertificateNo: m.CertificateNo || null,
          NidWorkItem: m.NidWorkItem || null
        }
      })
    },
    normalizeBaseCommissionHistory () {
      return this.currentData.Base_CommissionHistory.map(m => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          SendDate: m.SendDate || null,
          SendNo: m.SendNo || null,
          SignalDate: m.SignalDate || null,
          VoteDate: m.VoteDate || null,
          VoteNo: m.VoteNo || null
        }
      })
    },
    normalizeBaseRenovationPaymentHistory () {
      return this.currentData.Base_RenovationPaymentHistory.map(m => {
        return {
          ...m,
          Credit: m.Credit || 0,
          FicheNo: m.FicheNo || 0,
          IsInImpart: m.IsInImpart || null,
          IsInTotal: m.IsInTotal || null
        }
      })
    },
    normalizeBaseSubScription () {
      return this.currentData.Base_SubScription.map(m => {
        return {
          ...m,
          Area: m.Area || null,
          BillID: m.BillID || null,
          InstallationDate: m.InstallationDate || null,
          SubScriptionVal: m.SubScriptionVal || null,
          CounterSerial: m.CounterSerial || null,
          ElectricityType: m.ElectricityType || null,
          FileNumber: m.FileNumber || null,
          BuildingNo: m.BuildingNo || null
        }
      })
    },
    normalizeBasePlanMosavab () {
      return this.currentData.Base_PlanMosavab.map(m => {
        return {
          ...m,
          Area: m.Area || null,
          CI_BuildingPattern: m.CI_BuildingPattern || null
        }
      })
    },
    normalizeBasePlanMojaz () {
      return this.currentData.Base_PlanMojaz.map(m => {
        return {
          ...m,
          Area: m.Area || null,
          CI_BuildingPattern: m.CI_BuildingPattern || null
        }
      })
    },
    normalizeBaseCommission77History () {
      return this.currentData.Base_Commission77History.map(m => {
        return {
          ...m,
          CI_Commission: m.CI_Commission || null,
          CI_RequestType: m.CI_RequestType || null,
          CI_VoteType: m.CI_VoteType || null,
          IsStatusRunVote: m.IsStatusRunVote || null,
          NidProc: m.NidProc || null,
          ProclamationDate: m.ProclamationDate || null,
          SendNo: m.SendNo || null,
          VoteNo: m.VoteNo || null
        }
      })
    },
    newGuid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    handleSaveAction () {
      this.showLoading()
      for (let i = 0; i < this.currentData.Base_Owner.length; i++) {
        for (let j = 0; j < this.currentData.Base_Owner.length; j++) {
          const x = this.currentData.Base_Owner[i]
          const y = this.currentData.Base_Owner[j]
          if ((x.NidOwner === y.NidOwner || '00000000-0000-0000-0000-000000000000') && i !== j) {
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
          'ActDate': x.ActDate || null,
          'Address': '',
          'AyanDang': x.AyanDang || 0,
          'AyanHabeh': x.AyanHabeh || 0,
          'AyanImpart': x.AyanImpart || 0,
          'AyanSir': x.AyanSir || 0,
          'AyanTotalImpart': x.AyanTotalImpart || 0,
          'BirthDate': x.BirthDate || '',
          'BuildingNo': x.BuildingNo || 0,
          'NidOwnerBank': x.NidOwnerBank || null,
          'ToftDang': x.ToftDang || 0,
          'ToftHabeh': x.ToftHabeh || 0,
          'ToftImpart': x.ToftImpart || 0,
          'ToftSir': x.ToftSir || 0,
          DateCheckSabt: x.DateCheckSabt || null,
          EconomicID: x.EconomicID || null,
          'ToftTotalImpart': x.ToftTotalImpart || 0
        }
      })
      const houseInfo = this.currentData.Base_HouseInfo
      houseInfo.CurrentArea = houseInfo.CurrentArea || 0
      houseInfo.AreaAfterEdit = houseInfo.AreaAfterEdit || 0
      // صادقی
      // houseInfo.RemainArea = houseInfo.CurrentArea || 0
      //
      houseInfo.DocArea = houseInfo.DocArea || 0
      houseInfo.DeepShaftCount = houseInfo.DeepShaftCount || 0
      houseInfo.PoolArea = houseInfo.PoolArea || 0
      houseInfo.DeepShaftCount = houseInfo.DeepShaftCount || 0
      houseInfo.GlasshouseArea = houseInfo.GlasshouseArea || 0
      houseInfo.PoolCubature = houseInfo.PoolCubature || 0
      houseInfo.MamarArea = houseInfo.MamarArea || 0
      houseInfo.AyanDocNo = houseInfo.AyanDocNo || null
      houseInfo.PieceNo = houseInfo.PieceNo || null
      houseInfo.MotherDocArea = houseInfo.MotherDocArea || 0

      const commonEstate = this.currentData.Base_CommonEstate
      commonEstate.RegisterSection = commonEstate.RegisterSection || null
      this.currentData.Base_Edge = this.normalizeBaseEdge()
      // this.currentData.Base_Owner = this.normalizeBaseOwner()
      this.currentData.Base_Door = this.normalizeBaseDoor()
      this.currentData.Base_Bezel = this.normalizeBaseBezel()
      this.currentData.Base_Neighbor = this.normalizeBaseNeighbor()
      this.currentData.Base_GreenSpace = this.normalizeBaseGreenSpace()
      this.currentData.Base_OtherEquipment = this.normalizeBaseOtherEquipment()
      this.currentData.Base_ShahrsaziArchive = this.normalizeBaseShahrsaziArchive()
      this.currentData.Base_CommissionHistory = this.normalizeBaseCommissionHistory()
      this.currentData.Base_RenovationPaymentHistory = this.normalizeBaseRenovationPaymentHistory()
      this.currentData.Base_SubScription = this.normalizeBaseSubScription()
      this.currentData.Base_PlanMosavab = this.normalizeBasePlanMosavab()
      this.currentData.Base_PlanMojaz = this.normalizeBasePlanMojaz()
      // this.currentData.Base_Edge = this.normalizeBaseEdge().cleanRows()
      // this.currentData.Base_Owner = this.normalizeBaseOwner().cleanRows()
      // this.currentData.Base_Neighbor = this.normalizeBaseNeighbor().cleanRows()
      this.currentData.Base_Commission77History = this.normalizeBaseCommission77History()
      this.$services.SC.saveParvandehHouse(
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
            this.showSuccess('ذخیره با موفقیت انجام شد')
            await this.log({
              action: this.logActions.save,
              bizCode: this.currentData._nidBase,
              bizCodeTitle: 'NidBase',
              nosaziCode: this.value.key
            })
            this.load()
          }
        })
        .catch(response => {
          console.error('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handleCopyToMojazPayankar () {
      this.showConfirm(
        'آیا از کپی اطلاعات به مجاز پایانکار اطمینان دارید؟'
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
            }
          })
          .catch(response => {
            console.error('error', response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },

    load () {
      this.isEditable = false
      this.showLoading()

      return this.$services.SC.getParvandehHouse(
        {
          PNidBase: this.value.NidBase,
          PLoadFun:
            'Base_NosaziCode,Base_Owner,Base_AddressInfo,Base_Edge,Base_Wall,Base_RegisterPlack,Base_GreenSpace,Base_Neighbor,Base_OtherEquipment,Base_Scuttle,Base_SubScription,Base_HouseInfo,Base_CommonEstate,Base_PreCodeInfo,Base_ShahrsaziArchive,Base_Attachment,Base_PlanMosavab,Base_PlanMojaz,Base_Door,MapImage,Base_CommissionHistory,Base_Bezel,Base_File,Base_ResourceInfo,Base_RenovationPaymentHistory,Base_AddressPostCode,Base_BlockInfo,Base_Commission77History,Base_MultiBuilding'
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
        .catch(response => {
          console.error('error', response)
          this.serverError()
        })
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
