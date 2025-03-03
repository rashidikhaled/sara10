<template>
  <safa-form
    :id="formKey"
    :caption="title"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <fit>
      <safa-tabs
        v-model="currentTab"
        class="fit"
        height="100%"
        type="fixed"
        :bordered="false"
      >
        <template v-slot:tabs>
          <tab-menu
            name="address"
            label="آدرس"
          />
          <tab-menu
            name="registerPlaque"
            label="مشخصات سند و پلاک ثبتی"
          />
          <tab-menu
            name="baseOwner"
            label="مالکین و جهات اربعه"
          />
          <tab-menu
            name="houseInfo"
            label=" مشخصات فنی"
          />
          <tab-menu
            name="engineer"
            label="مهندسین"
          />
          <tab-menu
            name="other"
            label=" سایر مشخصات"
          />
          <!-- <tab-menu
          name="other2"
          label="سایر"
        /> -->
          <tab-menu
            name="archive"
            label="سوابق و اشتراکات"
          />
          <!-- <tab-menu
            name="croquis"
            label="کروکی"
          /> -->
          <tab-menu
            name="plans"
            label="طرح تفصیلی و توضیحات"
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
          title=" مالکین و جهات اربعه"
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
          name="engineer"
          title="مهندسین"
          :padding="false"
        >
          <TabEngineer
            v-model="currentData"
            v-bind="passedProps"
            :name="name"
            :title="title"
            :formKey="formKey"
          />
        </tab-content>
        <tab-content
          name="other"
          title=" سایر مشخصات"
        >
          <TabOther1
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <!-- <tab-content
        name="other2"
        title="سایر"
      >
        <TabOther2
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content> -->
        <tab-content
          name="archive"
          title=" سوابق و اشتراکات"
          :padding="false"
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
          title="طرح تفصیلی و توضیحات"
        >
          <TabPlans
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
      </safa-tabs>

      <form-actions
        v-if="!readOnly"
        :m="mode"
        @edit="isEditable = true"
        @save="save"
        @cancel="load"
        editSPId="00dc95d4-1f84-4adb-b749-e2109d2528a0"
        class="q-pb-sm q-pl-sm"
      >
      </form-actions>
    </fit>
  </safa-form>
</template>

<script>
import requestModel from './model/mojaazPayankarHouseRequest'
import TabAddress from './partials/TabAddress'
import TabRegisterPlaque from './partials/TabRegisterPlaque'
import TabBaseOwner from './partials/TabBaseOwner'
import TabBaseHouseInfo from './partials/TabBaseHouseInfo'
import TabOther1 from './partials/TabOther1'
// import TabOther2 from './partials/TabOther2'
import TabArchive from './partials/TabArchive'
// import TabCroque from './partials/TabCroque'
import TabPlans from './partials/TabPlans'
import TabEngineer from './partials/TabEngineer'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'MojaazPayankarHouse',
  mixins: [baseFormMixin],
  components: {
    TabAddress,
    TabRegisterPlaque,
    TabBaseOwner,
    TabBaseHouseInfo,
    TabOther1,
    // TabOther2,
    TabArchive,
    // TabCroque,
    TabPlans,
    TabEngineer
  },

  props: {
    value: Object,
    readOnly: Boolean,
    // formKey: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    // title: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    // name: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    baseNosaziCode: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      formKey: '6551ec60-82f9-4ef3-bfae-c108b131957a',
      title: 'شهرسازی- مجاز پروانه عرصه',
      name: 'MojaazPayankarHouse',
      isView: false,
      result: null,
      resultSave: null,
      currentTab: 'address',
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
          name: 'engineer',
          title: 'مهندسین'
        },
        {
          name: 'other',
          title: ' سایر مشخصات'
        },
        // {
        //   name: 'other2',
        //   title: ' سایر'
        // },
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
    normalizeBaseSubScription () {
      return this.currentData.Base_SubScription.map(m => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          InstallationDate: m.InstallationDate || null,
          SubScriptionVal: m.SubScriptionVal || null,
          BillID: m.BillID || null,
          ElectricityType: m.ElectricityType || null,
          FileNumber: m.FileNumber || null
        }
      })
    },
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
    normalizeBaseShahrsaziArchive () {
      return this.currentData.Base_ShahrsaziArchive.map(m => {
        return {
          ...m,
          NidProc: m.NidProc || null,
          BuildingNo: m.BuildingNo || null,
          SerialNo: m.SerialNo || null,
          CertificateNo: m.CertificateNo || null,
          NidWorkItem: m.NidWorkItem || null,
          CertificateDate: m.CertificateDate || null,
          CreditDate: m.CreditDate || null
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
    async save () {
      try {
        this.resultSave = null
        this.showLoading()
        const houseInfo = this.currentData.Base_HouseInfo
        houseInfo.CurrentArea = houseInfo.CurrentArea || 0
        houseInfo.AreaAfterEdit = houseInfo.AreaAfterEdit || 0
        houseInfo.GlasshouseArea = houseInfo.GlasshouseArea || 0
        houseInfo.DeepShaftCount = houseInfo.DeepShaftCount || 0
        houseInfo.PoolArea = houseInfo.PoolArea || 0
        houseInfo.PoolCubature = houseInfo.PoolCubature || 0
        houseInfo.MamarArea = houseInfo.MamarArea || 0
        houseInfo.CadastreCode = houseInfo.CadastreCode || 0

        houseInfo.DocArea = houseInfo.DocArea || 0
        houseInfo.AyanDocNo = houseInfo.AyanDocNo || 0
        houseInfo.PieceNo = houseInfo.PieceNo || 0
        houseInfo.ArsehDocNo = houseInfo.ArsehDocNo || 0
        houseInfo.MotherDocArea = houseInfo.MotherDocArea || 0

        const commonEstate = this.currentData.Base_CommonEstate
        commonEstate.RegisterSection = commonEstate.RegisterSection || 0
        this.currentData.Base_SubScription = this.normalizeBaseSubScription()
        this.currentData.Base_Edge = this.normalizeBaseEdge()
        this.currentData.Base_Door = this.normalizeBaseDoor()
        this.currentData.Base_Bezel = this.normalizeBaseBezel()
        this.currentData.Base_Neighbor = this.normalizeBaseNeighbor()
        this.currentData.Base_GreenSpace = this.normalizeBaseGreenSpace()
        this.currentData.Base_ShahrsaziArchive = this.normalizeBaseShahrsaziArchive()
        this.currentData.Base_PlanMosavab = this.normalizeBasePlanMosavab()
        this.currentData.Base_PlanMojaz = this.normalizeBasePlanMojaz()
        const { data } = await this.$services.SC.saveMojazPayankarHouse(
          {
            pObj: this.currentData,
            pUser: this.currentUser,
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
            bizCode: this.currentData._nidBase,
            bizCodeTitle: 'NidBase',
            nosaziCode: this.value.key
          })

          this.showSuccess('ذخیره با موفقیت انجام شد')
          this.load()
        }
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getMojazPayankarHouse(
          {
            PNidNosaziCode: this.value.NidNosaziCode,
            PLoadFun:
              'Base_NosaziCode,Base_Owner,Base_AddressInfo,Base_Edge,Base_Wall,Base_GreenSpace,Base_Neighbor,Base_OtherEquipment,Base_Scuttle,Base_SubScription,Base_HouseInfo,Base_CommonEstate,Base_ShahrsaziArchive,Base_Attachment,Base_PlanMosavab,Base_PlanMojaz,Base_Door,MapImage,Base_Bezel,Base_AddressPostCode,Base_RegisterPlack,Base_ControllerInfo'
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.value.NidNosaziCode,
              bizCodeTitle: 'NidNosaziCode',
              nosaziCode: this.value.key
            })
          }
          this.isView = true
        }
      } catch (e) {
        this.serverError()
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
