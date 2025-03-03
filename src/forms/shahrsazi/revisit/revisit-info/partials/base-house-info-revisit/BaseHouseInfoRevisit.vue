<template>
  <safa-form
    :id="formKey"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    caption="شهرسازی- بازدید عرصه"
    class="row"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
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
        <tab-content name="address" title=" آدرس و پلاک ثبتی">
          <tab-address :isMamoorBazdid="isMamoorBazdid" v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="docInfo" title="مشخصات سند">
          <tab-doc-info v-model="currentData" :isMamoorBazdid="isMamoorBazdid" v-bind="passedProps" />
        </tab-content>
        <tab-content
          :padding="false"
          name="baseOwner"
          title="مالکین و جهات اربعه"
        >
          <TabBaseOwner :isMamoorBazdid="isMamoorBazdid" v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="houseInfo" title="مشخصات فنی">
          <TabBaseHouseInfo :isMamoorBazdid="isMamoorBazdid" v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="other" title="سایر مشخصات">
          <TabOther1 v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="other2" title="سایر">
          <TabOther2 v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content :padding="false" name="archive" title="سوابق و اشتراکات">
          <TabArchive v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="croquis" title="کروکی">
          <TabCroque
            v-model="currentData"
            v-bind="passedProps"
            v-if="currentData.NidBase_Parvandeh_HouseOrDastgah"
          />
        </tab-content>
        <tab-content name="comments" title="توضیحات">
          <TabPlans v-model="currentData" v-bind="passedProps" />
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
      </tab-content> -->
      </safa-tabs>
      <form-actions
        v-if="!forceReadonly"
        :m="mode"
        class="q-my-sm q-px-sm"
        :showEditButton="false"
        @cancel="load"
        @save="save"
      >
        <template #before>
          <safa-securityPanel
            id="1ef64f61-afbe-452c-9d07-49db4e594d3a"
            caption="ویرایش"
          >
          <btn-edit
            label="ویرایش"
            @click="isEditable = true"
            v-if="showEditButton && !isEditable"
          />
          </safa-securityPanel>
        </template>
        <!--
        editSPCaption="ویرایش"
          editSPId="872b60cc-f823-42da-a51b-deaad0871456" -->
        <btn-default
          :label="
            currentTab === 'croquis' && !isEditable
              ? 'مشاهده کروکی'
              : 'رسم کروکی'
          "
          @click="showCroquie = true"
          @load="load"
        />
        <btn-default
          label="کپی از مجاز پروانه"
          @click="handleCopyFromMojazParvaaneh"
          spId="9188ac12-5375-410c-80af-43e65e9d9c2c"
          spCaption="کپی از مجاز پروانه"
        />
        <btn-default
          label="کپی از مجاز پایانکار"
          @click="handleCopyFromMojazPayankar"
          spId="4b570234-c78c-4ab5-abdc-39f820b1d5d5"
          spCaption="کپی از مجاز پایانکار"
        />
        <btn-default
          label="کپی از مهندسین ناظر"
          @click="handleCopyFromEngineer"
          spId="377b4138-fe4e-4937-beac-cffa321e427e"
          spCaption="کپی از مهندسین ناظر"
        />
        <!-- <btn-default
          label="استعلام اداره برق"
          @click="handleGetBarghInquiryData"
          spId="c7277327-9624-499f-aa9e-a02245b3739d"
          spCaption="استعلام اداره برق"
        /> -->
      </form-actions>
    </fit>
    <safa-popup
      v-model="showCroquie"
      height="730px"
      :title="
        currentTab === 'croquis' && !isEditable ? 'مشاهده کروکی' : 'رسم کروکی'
      "
      width="980px"
    >
      <UDrawCroque
        v-model="currentData"
        :m="isEditable"
        @cancel="showCroquie = false"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import requestModel from "./config/requestModel"
import UDrawCroque from "./partials/UDrawCroque"
import TabAddress from "./partials/TabAddress"
import TabDocInfo from "./partials/TabDocInfo"
import TabBaseOwner from "./partials/TabBaseOwner"
import TabBaseHouseInfo from "./partials/TabBaseHouseInfo"
import TabOther1 from "./partials/TabOther1"
import TabOther2 from "./partials/TabOther2"
import TabArchive from "./partials/TabArchive"
import TabCroque from "./partials/TabCroque"
import TabPlans from "./partials/TabPlans"
// import TabBarokaf from './partials/TabBarokaf'
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "BaseHouseInfoRevisit",
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
    UDrawCroque,
    TabCroque,
    TabPlans
  },

  props: {
    value: Object,
    readOnly: Boolean,
    showEditButton: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      formKey: "36cafe6a-3dea-4dac-9591-e0a87d28ea53",
      title: "اطلاعات بازدید عرصه",
      name: "BaseHouseInfoRevisit",
      result: null,
      resultSave: null,
      currentTab: "address",
      showCroquie: false,
      isView: false,
      currentData: { ...requestModel },
      tabs: [
        {
          name: "address",
          title: " آدرس و پلاک ثبتی"
        },
        {
          name: "docInfo",
          title: "مشخصات سند"
        },
        {
          name: "baseOwner",
          title: " مالکین و جهات اربعه"
        },
        {
          name: "houseInfo",
          title: " مشخصات فنی"
        },
        {
          name: "other",
          title: " سایر مشخصات"
        },
        {
          name: "other2",
          title: " سایر"
        },
        {
          name: "archive",
          title: " سوابق و اشتراکات"
        },
        {
          name: "croquis",
          title: "کروکی"
        },
        {
          name: "comments",
          title: "توضیحات"
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
          const { data } =
            await this.$services.SC.copyFromMojazParvanehToRevisit(
              { pNidBase_Revisit: this.value.NidBase },
              this.config
            )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("اطلاعات از مجاز پروانه با موفقیت کپی شد")
            await this.log({
              action: this.logActions.copyToMojazParvaneh,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `کپی اطلاعات از مجاز پروانه برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
          } else return this.showError("عملیات ناموفق بود")
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از کپی اطلاعات مجاز پروانه اطمینان دارید؟").onOk(
        handler
      )
    },
    handleCopyFromMojazPayankar () {
      const handler = async () => {
        try {
          this.showLoading()

          const { data } =
            await this.$services.SC.copyFromMojazPayankarToRevisit(
              { pNidBase_Revisit: this.value.NidBase },
              this.config
            )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("اطلاعات از مجاز پایانکار با موفقیت کپی شد")
            await this.log({
              action: this.logActions.copyFromMojazPayankar,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `کپی اطلاعات از مجاز پایانکار برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
          } else this.showError("عملیات ناموفق بود")
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از کپی اطلاعات مجاز پایانکار اطمینان دارید؟").onOk(
        handler
      )
    },
    handleCopyFromEngineer () {
      const handler = async () => {
        try {
          this.showLoading()
          const { data } =
            await this.$services.SC.copyMapControlEngineerToOtherGroups(
              {
                pNidProc: this.value.NidProc,
                pEumRevisitGroupTo: 0
              },
              this.config
            )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess(
              "کپی اطلاعات از مهندسین ناظر بر روی اطلاعات بازدید با موفقیت انجام شد."
            )
            await this.log({
              action: this.logActions.copyFromEngineers,
              bizCode: this.value?.NidProc ?? '',
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest?.BizCode ?? '',
              nidWorkItem: this.selectedRequest?.NidWorkItem ?? '',
              saveDesc: `کپی اطلاعات از مهندسین ناظر برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        "آیا از کپی اطلاعات مهندسین ناظر بر روی اطلاعات بازدید مطمئن هستید؟"
      ).onOk(handler)
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
      return this.currentData.Base_Edge.map((m) => {
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
          ValBlockRowNo: m.ValBlockRowNo || 0,
          // ValBlockRowNo: parseFloat(m.ValBlockRowNo) || 0,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidEdge: m.NidEdge || "00000000-0000-0000-0000-000000000000"
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
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidDoor: m.NidDoor || "00000000-0000-0000-0000-000000000000",
          EmissionPlace: m.EmissionPlace || null,
          NationalCode: m.NationalCode || null,
          NidOwnerBank: m.NidOwnerBank || null,
          PostCode: m.PostCode || null,
          AyanHabeh: m.AyanHabeh || null,
          ToftSir: m.ToftSir || null,
          EconomicID: m.EconomicID || null,
          IDCardNo: m.IDCardNo || null,
          OwnerFatherName: m.OwnerFatherName || "",
          OwnerLastName: m.OwnerLastName || "",
          OwnerName: m.OwnerName || "",
          Telephone: m.Telephone || null,
          ToftHabeh: m.ToftHabeh || null
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
          Area: m.Area || null,
          IsObserve: m.IsObserve || null,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidBezel: m.NidBezel || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    normalizeBaseNeighbor () {
      return this.currentData.Base_Neighbor.map((m) => {
        return {
          ...m,
          CI_NeighborType: m.CI_NeighborType || 0,
          CI_Neighbor_Specifications: m.CI_Neighbor_Specifications || null,
          CI_SideCode: m.CI_SideCode || 0,
          NeighborValue: m.NeighborValue || null,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidNeighbor: m.NidNeighbor || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    normalizeBaseGreenSpace () {
      return this.currentData.Base_GreenSpace.map((m) => {
        return {
          ...m,
          CI_GreenSpaceType: m.CI_GreenSpaceType || 0,
          Comments: m.Comments || null,
          GreenSpaceCount: m.GreenSpaceCount || null,
          NeighborValue: m.NeighborValue || null,
          GreenSpaceValue: m.GreenSpaceValue || 0,
          NidGreenSpace:
            m.NidGreenSpace || "00000000-0000-0000-0000-000000000000",
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    normalizeBaseScuttle () {
      return this.currentData.Base_Scuttle.map((m) => {
        return {
          ...m,
          CI_Scuttle: m.CI_Scuttle || 0,
          CI_SideCode: m.CI_SideCode || 0,
          ScuttleValue: m.ScuttleValue || 0,
          ParkingInPath: m.ParkingInPath || null
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
    normalizeBaseShahrsaziArchive () {
      return this.currentData.Base_ShahrsaziArchive.map((m) => {
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
      return this.currentData.Base_CommissionHistory.map((m) => {
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
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    async save () {
      for (let i = 0; i < this.currentData.Base_Owner.length; i++) {
        for (let j = 0; j < this.currentData.Base_Owner.length; j++) {
          const x = this.currentData.Base_Owner[i]
          const y = this.currentData.Base_Owner[j]
          if (
            (x.NidOwner === y.NidOwner ||
              "00000000-0000-0000-0000-000000000000") &&
            i !== j
          ) {
            // return this.showError('تکراری NidOwner')
            y.NidOwner = this.newGuid()
          }
        }
      }
      // this.currentData.Base_Edge = this.currentData.Base_Edge.map(x => {
      //   return {
      //     ...x,
      //     ValBlockRowNo: parseFloat(x.ValBlockRowNo) || null
      //   }
      // })
      this.currentData.Base_Owner = this.currentData.Base_Owner.map((x) => {
        return {
          ...x,
          NidBase: x.isNew ? undefined : x.NidBase,
          NidOwner: x.isNew ? undefined : x.NidOwner,
          ActDate: x.ActDate || null,
          Address: x.Address || "",
          AyanDang: x.AyanDang || 0,
          AyanHabeh: x.AyanHabeh || 0,
          AyanImpart: x.AyanImpart || 0,
          AyanSir: x.AyanSir || 0,
          AyanTotalImpart: x.AyanTotalImpart || 0,
          BirthDate: x.BirthDate || "",
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
        this.currentData.Base_Scuttle = this.normalizeBaseScuttle()
        this.currentData.Base_OtherEquipment =
          this.normalizeBaseOtherEquipment()
        this.currentData.Base_ShahrsaziArchive =
          this.normalizeBaseShahrsaziArchive()
        this.currentData.Base_CommissionHistory =
          this.normalizeBaseCommissionHistory()

        const { data } = await this.$services.SC.saveRevisitHouse(
          {
            PObj: this.currentData,
            pUser: this.currentUser,
            pNidProc: this.value.NidProc,
            PNidRevisit: this.value.NidRevisit,
            pDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: "00000000-0000-0000-0000-000000000000"
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات بازدید عرصه برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
          })
          this.currentData.NidBase_Parvandeh_HouseOrDastgah = ""
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
      // this.currentData = { ...requestModel }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getRevisitHouse(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              "Base_NosaziCode,Base_Owner,Base_AddressInfo,Base_Edge,Base_Wall,Base_RegisterPlack,Base_GreenSpace,Base_Neighbor,Base_OtherEquipment,Base_Scuttle,Base_SubScription,Base_HouseInfo,Base_CommonEstate,Base_ShahrsaziArchive,Base_Attachment,Base_Door,MapImage,Base_Bezel,Base_File,Base_AddressPostCode,Base_CommissionHistory,Base_PreCodeInfo",
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش اطلاعات بازدید عرصه برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
          }
          this.isView = true
        } else this.showError("اطلاعات بازدید بارگذاری نشد.")
      } catch (error) {
        console.error(error)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.hideLoading()
      }
    }
  },

  mounted () {
    this.load()
  },
  created () {
    this.currentData = { ...requestModel }
  }
}
</script>
