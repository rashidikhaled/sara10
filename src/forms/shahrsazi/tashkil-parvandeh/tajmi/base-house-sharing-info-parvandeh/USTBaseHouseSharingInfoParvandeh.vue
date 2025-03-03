<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <fit>
      <safa-status :result="result" />
      <safa-status :result="resultSave" />
      <!-- add dir props #487 -->
      <safa-tabs
        v-model="currentTab"
        class="fit"
        height="100%"
      >
        <template v-slot:tabs>
          <tab-menu
            v-for="{ name, title } in tabs"
            :key="name"
            :name="name"
            :label="title"
          />
        </template>
        <tab-content
          name="address"
          title=' آدرس و پلاک ثبتی'
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
          :padding="false"
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
          name="baseUsing"
          title="کاربریها"
          :padding="false"
        >
          <TabBaseUsing
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="baseFront"
          title="پیش آمدگیها"
          :padding="false"
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
          name="engineer"
          title="مهندسین"
          :padding="false"
        >
          <TabEngineer
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <!-- <tab-content
          name="croquie"
          title="کروکی"
        >
          <TabCroquie
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content> -->
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
        class="q-pl-sm q-py-sm"
        @edit="handleEdit"
        @save="save"
        @cancel="handleCancel"
        editSPId="febd75da-4d0f-423c-b7f3-98721b09e1bf"
      >
        <template #after>
          <!-- <safa-securityPanel
          id="250b1bde-d8ab-4be0-a8ad-eb1a10dcf6c9"
          caption="ویرایش_جستجوی ملک"
        >
          <q-btn
            color="primary"
            label="ویرایش_جستجوی ملک"
          ></q-btn>
        </safa-securityPanel> -->

          <btn-default
            label="کپی به مجاز پروانه"
            @click="handleCopyBuildingToMojazParvaneh"
            spId="308dc2d1-23cd-4aa0-8fc0-8be5f4c5668e"
            spCaption="کپی به مجاز پروانه"
          />

          <btn-default
            label="کپی از مجاز پروانه"
            @click="handleCopyFromMojazParvanehToBuildingParvandeh"
            spId="f8a9259b-19f0-41e7-94b5-a28e652b9aac"
            spCaption="کپی از مجاز پروانه"
          />

          <btn-default
            label="کپی به مجاز پایانکار"
            @click="handleCopyToMojazPayankar"
            spId="cea1194e-6b03-4c98-866c-fcabf9313025"
            spCaption="کپی به مجاز پایانکار"
          />
          <!-- <safa-securityPanel
          id="717382ab-33db-40a1-ad7b-f02b0a8643d9"
          caption="ویرایش سوابق شهرسازی"
        >
          <q-btn
            color="primary"
            label="ویرایش سوابق شهرسازی"
          ></q-btn>
        </safa-securityPanel> -->
          <btn-default label="گزارش" />
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
import TabEngineer from './partials/TabEngineer'
import TabComment from './partials/TabComment'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseHouseSharingInfoParvandeh',
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
    TabEngineer,
    TabComment
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
    name: {
      type: String,
      default: '',
      required: true
    }
  },

  data () {
    return {
      title: 'شهرسازی- تشکیل پرونده دستگاه',
      formKey: '2777b104-1e26-4d72-8163-b919ca465544',
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
          title: 'پیش آمدگیها'
        },
        {
          name: 'baseParking',
          title: 'پارکینگ'
        },
        {
          name: 'baseArchive',
          title: 'سوابق'
        },
        {
          name: 'engineer',
          title: 'مهندسین'
        },
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
    handleEdit () {
      this.isEditable = true
      this.$emit('changeEditMode', this.isEditable)
    },
    handleCancel () {
      this.load()
      this.isEditable = false
      this.$emit('changeEditMode', this.isEditable)
    },
    handleCopyBuildingToMojazParvaneh () {
      const handler = async () => {
        try {
          this.showSending()

          const {
            data
          } = await this.$services.SC.copyHouseSharingToMojazParvaneh(
            {
              pFromNidBase: this.value.NidBase
            },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('کپی به مجاز پروانه با موفقیت انجام شد')
            await this.log({
              action: this.logActions.copy,
              bizCode: this.value.NidBase,
              bizCodeTitle: 'NidBase'
            })
          } else {
            this.showError('کپی به مجاز پروانه انجام نشد')
          }

          // end
        } catch (e) {
          this.showError('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm('آیا از کپی اطلاعات به مجاز پروانه اطمینان دارید؟').onOk(
        handler
      )
    },
    handleCopyFromMojazParvanehToBuildingParvandeh () {
      const handler = async () => {
        try {
          this.showSending()
          const {
            data
          } = await this.$services.SC.copyFromMojazParvanehToBuildingParvandeh(
            {
              pNidNosaziCode_Building: this.value.NidNosaziCode
            },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('کپی با موفقیت انجام شد')
            await this.log({
              action: this.logActions.copyFromMojazParvaneh,
              bizCode: this.value.NidNosaziCode,
              bizCodeTitle: 'NidBase'
            })
          } else {
            this.showError('کپی انجام نشد')
          }

          // end
        } catch (e) {
          this.showError('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        'آیا از کپی اطلاعات از مجاز پروانه به تشکیل پرونده دستگاه اطمینان دارید؟'
      ).onOk(handler)
    },
    handleCopyToMojazPayankar () {
      const handler = async () => {
        try {
          this.showSending()
          const { data } = await this.$services.SC.copyToMojazPayankar(
            {
              pFromNidBase: this.value.NidBase
            },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('کپی با موفقیت انجام شد')
            await this.log({
              action: this.logActions.copyToMojazPayankar,
              bizCode: this.value.NidBase,
              bizCodeTitle: 'NidBase',
              saveDesc: `کپی به مجاز پایانکار با موفقیت انجام گردید`
            })
          } else {
            this.showError('کپی انجام نشد')
          }

          // end
        } catch (e) {
          this.showError('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        'آیا از کپی اطلاعات به مجاز پایانکار دستگاه اطمینان دارید؟'
      ).onOk(handler)
    },
    findDuplicateInBaseOwnerArray (arra1) {
      var object = {}
      var DuplicateResult = []

      arra1.forEach(function (item) {
        if (!object[item]) {
          object[item] = 0
        }
        object[item] += 1
      })

      for (var prop in object) {
        if (object[prop] >= 2) {
          DuplicateResult.push(prop)
        }
      }

      return DuplicateResult
    },
    normalizeBaseOwner () {
      return this.currentData.Base_Owner.map(m => {
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
          ToftSir: m.ToftSir || null,
          AyanHabeh: m.AyanHabeh || 0,
          AyanImpart: m.AyanImpart || 0,
          IDCardNo: m.IDCardNo || 0,
          ToftHabeh: m.ToftHabeh || 0,
          ToftImpart: m.ToftImpart || 0
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
          BillID: m.BillID || null,
          ElectricityType: m.ElectricityType || null,
          FileNumber: m.FileNumber || null,
          InstallationDate: m.InstallationDate || null,
          CounterSerial: m.CounterSerial || null,
          BuildingNo: m.BuildingNo || null,
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
    normalizeBase_Commission77History () {
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
    normalizeBaseInstallationBuilding () {
      return this.currentData.Base_Installation.map(m => {
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
    async save () {
      try {
        let list = []
        this.currentData.Base_Owner.forEach(x => {
          list.push(x.NationalCode)
        })
        let duplicateNationalCode = this.findDuplicateInBaseOwnerArray(list)
        if (duplicateNationalCode.length > 0) {
          this.showError('شماره ملی مالکین تکراری می باشد.')
        } else {
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
          buildingInfo.InfrastructureArea =
            buildingInfo.InfrastructureArea || 0
          buildingInfo.AllowableDensityLicence =
            buildingInfo.AllowableDensityLicence || 0
          buildingInfo.LightfastArea = buildingInfo.LightfastArea || 0
          buildingInfo.UpperHeight = buildingInfo.UpperHeight || 0
          buildingInfo.BusyArea = buildingInfo.BusyArea || 0
          buildingInfo.DownerHeight = buildingInfo.DownerHeight || 0
          buildingInfo.RampArea = buildingInfo.RampArea || 0
          buildingInfo.Height = buildingInfo.Height || 0
          buildingInfo.Defilade = buildingInfo.Defilade || 0
          buildingInfo.CommercialGapDepth =
            buildingInfo.CommercialGapDepth || 0
          buildingInfo.HeightKorsi = buildingInfo.HeightKorsi || 0
          buildingInfo.MultiBuildingToftImpartArea =
            buildingInfo.MultiBuildingToftImpartArea || 0
          buildingInfo.CreateYearTo = buildingInfo.CreateYearTo || 0
          buildingInfo.CreateYearFrom = buildingInfo.CreateYearFrom || 0
          buildingInfo.ParkingNeedCount = buildingInfo.ParkingNeedCount || 0
          buildingInfo.ParkingSupplyCount =
            buildingInfo.ParkingSupplyCount || 0
          buildingInfo.ParkingGet = buildingInfo.ParkingGet || 0

          const commonEstate = this.currentData.Base_CommonEstate
          commonEstate.ViewArea = commonEstate.ViewArea || 0
          commonEstate.CommercialGapWidth =
            commonEstate.CommercialGapWidth || 0

          this.currentData.Base_Owner = this.normalizeBaseOwner()
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
          this.currentData.Base_Commission77History = this.normalizeBase_Commission77History()
          this.currentData.Base_Installation = this.normalizeBaseInstallationBuilding()
          const { data } = await this.$services.SC.saveParvandehHouseSharing(
            {
              PObj: this.currentData,
              pUser: this.currentUser,
              PDtoWorkflowData: {
                StateName: null,
                WorkflowGuid: '00000000-0000-0000-0000-000000000000'
              }
            },
            this.config
          )
          this.resultSave = this.getResponse(data)
          if (this.resultSave.success) {
            this.showSuccess('ذخیره با موفقیت انجام شد')
            await this.log({
              action: this.logActions.save,
              bizCode: this.currentData._nidBase,
              bizCodeTitle: 'NidBase'
            })

            this.load()
          }
        }
      } catch (e) {
        this.serverError()
        console.log('error save ...', e)
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      try {
        this.showLoading()

        const { data } = await this.$services.SC.getParvandehHouseSharing(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              'Base_NosaziCode,Base_AddressInfo,Base_PreCodeInfo,Base_Edge,Base_BuildingInfo,Base_HouseInfo,Base_CommonEstate,Base_GreenSpace,Base_RegisterPlack,Base_Owner,Base_SubScription,Base_ShahrsaziArchive,Base_Door,Base_Scuttle,Base_Neighbor,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_OtherEquipment,Base_Attachment,Base_ControllerInfo,MapImage,Base_CommissionHistory,Base_AddressPostCode,Base_Parking,Base_SupplyParking,Base_Wall,Base_Commission77History'
          },
          this.config
        )

        data.Base_File = data.Base_File || []

        data.Base_Owner = data.Base_Owner || []

        data.Base_RenovationPaymentHistory =
          data.Base_RenovationPaymentHistory || []

        data.Base_ResourceInfo = data.Base_ResourceInfo || []

        data.Base_Dig = data.Base_Dig || []

        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.NidBase,
            bizCodeTitle: 'NidBase'
          })
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
