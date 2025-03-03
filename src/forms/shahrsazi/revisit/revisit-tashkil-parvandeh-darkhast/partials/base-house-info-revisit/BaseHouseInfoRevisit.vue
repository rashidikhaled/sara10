<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    class="row"
  >
    <safa-status :result="result"/>
    <safa-status :result="resultSave"/>
    <fit>
      <safa-tabs v-model="currentTab" :bordered="false" class="fit" height="100%">
        <template v-slot:tabs>
          <tab-menu v-for="{ name, title } in tabs" :key="name" :label="title" :name="name"/>
        </template>
        <tab-content name="address" title=" آدرس و پلاک ثبتی">
          <tab-address v-model="currentData" v-bind="passedProps" :m="mode"/>
        </tab-content>
        <tab-content name="docInfo" title="مشخصات سند">
          <tab-doc-info v-model="currentData" v-bind="passedProps" :m="mode"/>
        </tab-content>
        <tab-content :padding="false" name="baseOwner" title="مالکین و جهات اربعه">
          <TabBaseOwner v-model="currentData" v-bind="passedProps" :m="mode"/>
        </tab-content>
        <tab-content name="houseInfo" title="مشخصات فنی">
          <TabBaseHouseInfo v-model="currentData" v-bind="passedProps" :m="mode"/>
        </tab-content>
        <tab-content name="other" title="سایر مشخصات">
          <TabOther1 v-model="currentData" v-bind="passedProps"/>
        </tab-content>
        <tab-content name="other2" title="سایر">
          <TabOther2 v-model="currentData" v-bind="passedProps"/>
        </tab-content>
        <tab-content :padding="false" name="archive" title="سوابق و اشتراکات">
          <TabArchive v-model="currentData" v-bind="passedProps"/>
        </tab-content>
        <!-- <tab-content
          name="croquis"
          title="کروکی"
        >
          <TabCroque
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>-->
        <tab-content name="comments" title="توضیحات">
          <TabPlans v-model="currentData" v-bind="passedProps"/>
        </tab-content>
        <!-- #2668 -->
        <!-- <tab-content
        name="baroKaf"
        title="بروکف"
      >
        <TabBarokaf
          :formKey="formKey"
          :m="mode"
        />
        </tab-content>-->
      </safa-tabs>
      <form-actions
        :m="mode"
        class="q-my-sm q-px-sm"
        editSPCaption="ویرایش"
        editSPId="7921934d-a4fa-4ef9-8ca2-2dc69bfd9559"
        @cancel="load"
        @edit="isEditable = true"
        @save="save"
      ></form-actions>
    </fit>
  </safa-form>
</template>

<script>
import requestModel from './config/requestModel'
import TabAddress from './partials/TabAddress'
import TabDocInfo from './partials/TabDocInfo'
import TabBaseOwner from './partials/TabBaseOwner'
import TabBaseHouseInfo from './partials/TabBaseHouseInfo'
import TabOther1 from './partials/TabOther1'
import TabOther2 from './partials/TabOther2'
import TabArchive from './partials/TabArchive'
// import TabCroque from './partials/TabCroque'
import TabPlans from './partials/TabPlans'
// import TabBarokaf from './partials/TabBarokaf'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseHouseInfoRevisit',
  mixins: [baseFormMixin],
  components: {
    TabAddress,
    // TabBarokaf,
    TabDocInfo,
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
    readOnly: Boolean,

    name: {
      type: String,
      default: '',
      required: true
    }
  },

  data () {
    return {
      formKey: 'b2c51e37-b3a3-43df-b7f9-0dcd411f27bb',
      title: 'شهرسازی- تشکیل پرونده درخواست عرصه',
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
          name: 'docInfo',
          title: 'مشخصات سند'
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
          name: 'comments',
          title: 'توضیحات'
        }
        // {
        //   name: 'baroKaf',
        //   title: 'بروکف'
        // }
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
    //       ToftImpart: m.ToftImpart || 0,
    //       NidBase: m.isNew ? undefined : m.NidBase,
    //       NidOwner: m.isNew ? undefined : m.NidOwner
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
        houseInfo.DocArea = houseInfo.DocArea || 0
        houseInfo.MotherDocArea = houseInfo.MotherDocArea || 0
        houseInfo.CurrentArea = houseInfo.CurrentArea || 0
        houseInfo.CurrentArea = houseInfo.CurrentArea || 0

        // this.currentData.Base_Owner = this.normalizeBaseOwner()
        this.currentData.Base_Edge = this.normalizeBaseEdge()
        this.currentData.Base_Door = this.normalizeBaseDoor()
        this.currentData.Base_Bezel = this.normalizeBaseBezel()
        this.currentData.Base_Neighbor = this.normalizeBaseNeighbor()
        this.currentData.Base_GreenSpace = this.normalizeBaseGreenSpace()
        this.currentData.Base_OtherEquipment = this.normalizeBaseOtherEquipment()
        this.currentData.Base_ShahrsaziArchive = this.normalizeBaseShahrsaziArchive()
        this.currentData.Base_CommissionHistory = this.normalizeBaseCommissionHistory()

        const { data } = await this.$services.SC.saveRevisitHouseParvande(
          {
            PObj: this.currentData,
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
        const { data } = await this.$services.SC.getRevisitHouse(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              'Base_NosaziCode,Base_Owner,Base_AddressInfo,Base_Edge,Base_Wall,Base_RegisterPlack,Base_GreenSpace,Base_Neighbor,Base_OtherEquipment,Base_Scuttle,Base_SubScription,Base_HouseInfo,Base_CommonEstate,Base_ShahrsaziArchive,Base_Attachment,Base_Door,MapImage,Base_Bezel,Base_File,Base_AddressPostCode,Base_CommissionHistory,Base_PreCodeInfo',
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )

        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('اطلاعات بازدید بارگذاری نشد')
        }
        this.currentData = this.result.data

        await this.log({
          action: this.logActions.view,
          bizCode: this.value.NidBase,
          bizCodeTitle: 'NidBase'
        })

        // end
      } catch (error) {
        console.error(error)
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
