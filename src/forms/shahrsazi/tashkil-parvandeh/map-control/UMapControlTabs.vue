<template>
   <safa-form
    :id="formKey"
    caption="شهرسازی- کنترل نقشه"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      vertical
      title="کنترل نقشه"
      :padding="false"
      @load="$emit('load')"
    >
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          :actions="false"
          m="r"
        />
        <safa-status :result="loadMapControlRes" />
        <safa-status :result="saveResult" />
        <safa-status :result="copyResult" />
        <safa-status :result="copyChidemanToMapControlRes" />
      </template>

      <safa-tabs v-model="activeTab" :bordered="false">
        <template v-slot:tabs>
          <tab-menu label="مشخصات" name="specifications" />
          <tab-menu label="کاربری ها" name="karbariha" />
          <tab-menu label="پیش آمدگیها" name="pishamadegiha" />
          <tab-menu label="مهندسین" name="engineers" />
          <tab-menu label="سایر مشخصات" name="otherSpecification" />
          <tab-menu label="طرح های تفصیلی و سایر امکانات" name="tafsil" />
          <tab-menu label="پارکینگ و کروکی" name="parkingAndKroki" />
          <tab-menu label="توضیحات" name="description" />
        </template>
        <tab-content name="specifications" title="مشخصات">
          <USpecifications :results="results" :m="mode" />
        </tab-content>
        <tab-content name="karbariha" title="کاربری ها" :padding="false">
          <UKarbariha :results="results" :m="mode" />
        </tab-content>
        <tab-content name="pishamadegiha" title="پیش آمدگی ها" :padding="false">
          <UPishamadegiha :results="results" :m="mode" />
        </tab-content>
        <tab-content name="engineers" title="مهندسین" :padding="false">
          <UEngineersTab
            v-model="results"
            :baseNosaziCode="baseNosaziCode"
            :m="mode"
          />
        </tab-content>
        <tab-content name="otherSpecification" title="سایر مشخصات">
          <UOtherSpecifications :results="results" :m="mode" />
        </tab-content>
        <tab-content name="tafsil" title="طرح تفضیلی و سایر امکانات">
          <UTafsil :results="results" :m="mode" />
        </tab-content>
        <tab-content
          name="parkingAndKroki"
          title="پارکینگ و کروکی"
          :padding="false"
        >
          <UParkingAndKroki :results="results" :m="mode" />
        </tab-content>

        <tab-content name="description" title="توضیحات">
          <UDescription :results="results" :m="mode" />
        </tab-content>
      </safa-tabs>

      <safa-popup
        v-model="isShowModal"
        title="تاریخچه کنترل نقشه"
        width="700px"
        height="600px"
      >
        <MapControlHistory
          :nidNosaziCode="nidNosaziCode"
          @hide="hideMapControlHistory"
          :title="title"
          :formKey="formKey"
          :name="name"
        />
      </safa-popup>

      <template v-slot:footer v-if="hasFooter">
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="cancel"
          @save="saveMapControl"
          editSPId="c0f6627f-9bc8-4d04-9d22-71d182d365e1"
          editFormId="60ded07e-9f50-42d4-9201-e0e9d638e839"
        >
          <template v-slot:after>
            <btn-default
              spCaption="کپی از دستور نقشه"
              label="کپی از دستور نقشه"
              @click="copyChidemanToMapControl"
              spId="af4cec72-69d4-48fe-923a-b8c8c19676ed"
            />

            <btn-default
              spCaption="کپی از موافقت اصولی"
              label="کپی از موافقت اصولی"
              @click="copyFromMovafeghatOsooliToMapControl"
              spId="bff91065-a1f5-46ba-a371-b22ccc3c2e8b"
            />

            <btn-default
              spCaption="کپی از بازدید"
              label="کپی از بازدید"
              @click="copyFromRevisit"
              spId="9ad5bb18-35db-4982-a925-71e3a72c9d08"
            />

            <btn-default
              spCaption="کپی از مهندسین ناظر"
              label="کپی از مهندسین ناظر"
              @click="copyMapControlEngineerToOtherGroups"
              spId="8ca160a8-672e-4339-b9c3-26b705ab1096"
            />
            <btn-default
              spCaption="کپی از مجاز پروانه"
              label="کپی از مجاز پروانه"
              @click="copyMojazParvanehToMapControl"
              spId="78a6ed67-cb72-4fe0-ab07-0290f71d73c6"
            />

            <btn-default
              spCaption="تاریخچه کنترل نقشه"
              label="تاریخچه کنترل نقشه"
              @click="isShowModal = true"
            />
            <btn-default
              v-if="activeTab === 'parkingAndKroki' && !isEditable"
              label="مشاهده کروکی"
              @load="loadData"
              @click="showCroquie = true"
            />
            <btn-default
              v-if="activeTab === 'parkingAndKroki' && isEditable"
              label="رسم کروکی"
              @load="loadData"
              @click="showCroquie = true"
            />
            <!-- spId="c107e99a-7b3b-4e68-bc27-727ca50e79a0" -->
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
    </form-wrapper>
  </safa-form>
</template>

<script>
import USpecifications from "./partials/USpecifications"
import UKarbariha from "./partials/UKarbariha"
import UPishamadegiha from "./partials/UPishamadegiha"
import UDrawCroque from "./partials/UDrawCroque"
import UEngineersTab from "./partials/UEngineersTab"
import UOtherSpecifications from "./partials/UOtherSpecifications"
import UTafsil from "./partials/UTafsil"
import UParkingAndKroki from "./partials/UParkingAndKroki"
import UDescription from "./partials/UDescription"
import MapControlHistory from "./partials/MapControlHistory"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
// import FormActions from 'src/components/FormActions'
// import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
export default {
  mixins: [baseFormMixin],
  components: {
    USpecifications,
    UKarbariha,
    UPishamadegiha,
    UDrawCroque,
    UOtherSpecifications,
    UTafsil,
    UParkingAndKroki,
    UDescription,
    MapControlHistory,
    UEngineersTab
  },
  props: {
    hasFooter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      title: "کنترل نقشه",
      formKey: "60ded07e-9f50-42d4-9201-e0e9d638e839",
      name: "UMapControlTabs",
      main: true,
      workflowCompatible: true,

      activeTab: "specifications",
      items: [],
      ShowModal: false,
      showCroquie: false,
      isShowModal: false,
      results: {
        Base_Bezel: [],
        Base_BuildingInfo: {},
        Base_CommonEstate: {},
        Base_ControllerInfo: [],
        Base_ControllerInfo_EngineerSubSys: [],
        Base_Door: [],
        Base_Edge: [],
        Base_Front: [],
        Base_Gap: [],
        Base_GreenSpace: [],
        Base_HouseInfo: {},
        Base_Neighbor: [],
        Base_OtherEquipment: [],
        Base_Parking: [],
        Base_PlanForWork: [],
        Base_PlanMojaz: [],
        Base_PlanMosavab: [],
        Base_RegisterPlack: [],
        Base_SupplyParking: [],
        Base_Using: [],
        Base_Using_PlanOrder: [],
        Base_Wall: [],
        Sh_BaroKaf: {},
        Sh_MapControl: {},
        Sh_PlanOrder: {},
        NidLib: { RMapControl: {}, RMainCodeInfo: {} }
      },
      saveResult: null,
      updateLastRequestResult: null,
      isView: false,
      loadMapControlRes: null,
      copyResult: null,
      copyChidemanToMapControlRes: null,
      nidNosaziCode: "00000000-0000-0000-0000-000000000000",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      eumNosaziCode: 0
    }
  },
  mounted () {
    if (this.isSelectedRequest()) {
      this.loadData()
    } else {
      this.hideSidebar(this.name)
    }
  },
  methods: {
    normalizeData () {
      return this.results.Base_Front.map((m) => {
        return {
          ...m,
          CI_DutyYear: m.CI_DutyYear || 0
        }
      })
    },
    // load data
    hideMapControlHistory () {
      this.isShowModal = false
      this.loadData()
    },
    async loadData () {
      try {
        this.results.Base_Front = this.normalizeData()
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pIsLoadDeletedNosaziCode: false
        }
        this.showLoading()
        const { data } = await this.$services.SC.loadMapControl(payload, {
          config: { District: this.selectedDistrict }
        })
        this.loadMapControlRes = this.getResponse(data)
        if (this.loadMapControlRes.success) {
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش اطلاعات فرم کنترل نقشه برای شماره ${
                this.selectedRequest.BizCode ?? ""
              } انجام گردید.`
            })
          }
          this.isView = true
          this.results = this.loadMapControlRes.data
          if (this.results.NidLib) {
            this.nidNosaziCode = this.results.NidLib.RMain.NidNosaziCode
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    copy (e) {
      if (this.selectedNosaziCode === '') {
        this.showError('لطفا یکی از کنترل نقشه های مبدا را انتخاب کنید')
      }
      this.showLoading()
      this.$services.SC.copyHistoryToMapControl(
        {
          config: {
            District: this.baseNosaziCode.District
          }
        }
      )
        .then(async ({ data }) => {
          this.copyHistoryTomapControlResult = this.getResponse(data)
          if (this.copyHistoryTomapControlResult.success) {
            this.showSuccess('عملیات با موفقیت انجام شد')
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // handleBaseNosaziCodeChanged () {
    //   // getBaseLibInNosaziCode method
    //   this.ownerName = ''
    //   this.oldNosaziCode = ''
    //   // this.isEditable = true
    //   let self = this
    //   let data = {
    //     pNosaziCode: {
    //       Apartment: this.baseNosaziCode.Apartment,
    //       Block: this.baseNosaziCode.Block,
    //       Building: this.baseNosaziCode.Building,
    //       CI_City: 0,
    //       District: this.baseNosaziCode.District,
    //       EumBaseInfoGroup: 0,
    //       EumNosaziCodeGroup: 0,
    //       EumNosaziCodeObjType: 0,
    //       EumRevisitGroup: 0,
    //       House: this.baseNosaziCode.House,
    //       IsRoot: 'false',
    //       NidBase: '00000000-0000-0000-0000-000000000000',
    //       NidNosaziCode: '00000000-0000-0000-0000-000000000000',
    //       Region: this.baseNosaziCode.Region,
    //       Shop: this.baseNosaziCode.Shop
    //     },
    //     pLoadFunc:
    //       'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
    //     pIsLoadDeletedNosaziCode: false
    //   }
    //   this.showLoading()
    //   this.$services.SA.getBaseLibInNosaziCode(data)
    //     .then(({ data }) => {
    //       self.baseLibResult = this.getResponse(data)

    //       if (self.baseLibResult.success) {
    //         self.baseLibResults = self.baseLibResult.data
    //         await this.log({
    //           action: this.logActions.view,
    //           bizCode: this.selectedRequest.NidWorkItem,
    //           bizCodeTitle: 'شماره درخواست',
    //           nosaziCode: this.selectedRequest.BizCode,
    //           nidWorkItem: this.selectedRequest.NidWorkItem
    //         })
    //         this.nosaziCode = self.baseLibResults._NidNosaziCode
    //       }
    //     })
    //     .catch((response) => {
    //       self.baseLibResult = this.getResponse(response)
    //       // console.log(this.baseLibResult)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },
    // copy az dastoor naghsheh
    async updateLastRequestData () {
      try {
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pLastRequestState: "کپی از دستور نقشه در کنترل نقشه انجام شد."
        }

        const { data } = await this.$services.SC.updateLastRequestState(
          payload,
          { config: { District: this.selectedDistrict } }
        )
        this.updateLastRequestResult = this.getResponse(data)
        if (this.updateLastRequestResult.success) {
          await this.log({
            action: this.logActions.update,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: "شماره درخواست",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `کپی از دستور نقشه در کنترل نقشه برای شماره ${
              this.selectedRequest.BizCode ?? ""
            } انجام و بروز رسانی گردید.`
          })
        } else this.showError("وضعیت درخواست بروز نشد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    copyChidemanToMapControl () {
      this.showConfirm(
        "آیا از کپی اطلاعات دستور نقشه بر روی اطلاعات کنترل نقشه مطمئن هستید؟"
      ).onOk(() => {
        this.showLoading()
        this.$services.SC.copyChidemanToMapControl(
          { pNidProc: this.selectedRequest.NidProc },
          { config: { District: this.selectedDistrict } }
        )
          .then(async ({ data }) => {
            this.copyChidemanToMapControlRes = this.getResponse(data)
            if (this.copyChidemanToMapControlRes.success) {
              this.showSuccess("کپی از دستور نقشه با موفقیت انجام شد.")
              await this.updateLastRequestData()
              await this.log({
                action: this.logActions.copyFromMapControl,
                bizCode: this.selectedRequest.NidWorkItem,
                bizCodeTitle: "شماره درخواست",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `کپی از دستور نقشه در کنترل نقشه برای شماره ${
                  this.selectedRequest.BizCode ?? ""
                } انجام گردید.`
              })
              await this.loadData()
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },

    // copy az movafeghat osooli
    copyFromMovafeghatOsooliToMapControl () {
      this.showConfirm(
        "آیا از کپی موافقت اصولی بر روی اطلاعات کنترل نقشه مطمئن هستید؟"
      ).onOk(() => {
        this.showLoading()
        const payload = { pNidProc: this.selectedRequest.NidProc }
        this.$services.SC.copyFromMovafeghatOsooliToMapControl(payload, {
          config: {
            District: this.selectedDistrict
          }
        })
          .then(async ({ data }) => {
            this.copyResult = this.getResponse(data)
            if (this.copyResult.success) {
              this.showSuccess("کپی از موافقت اصولی با موفقیت انجام شد.")

              await this.log({
                action: this.logActions.copyFromMovafeghatOsooli,
                bizCode: this.selectedRequest.NidWorkItem,
                bizCodeTitle: "شماره درخواست",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `کپی از موافقت اصولی در کنترل نقشه برای شماره ${
                  this.selectedRequest.BizCode ?? ""
                } انجام گردید.`
              })
              this.loadData()
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    copyFromRevisit () {
      this.showConfirm(
        "آیا از کپی اطلاعات بازدید بر روی اطلاعات کنترل نقشه مطمئن هستید؟"
      ).onOk(() => {
        this.showLoading()
        if (this.results.NidLib && this.results.NidLib.RMainCodeInfo) {
          this.eumNosaziCode =
            this.results.NidLib.RMainCodeInfo.EumNosaziCodeObjType
        }
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          EumNosaziCodeObjType: this.eumNosaziCode
        }
        this.$services.SC.copyRevisitToMapControl(payload, {
          config: { District: this.selectedDistrict }
        })
          .then(async ({ data }) => {
            this.copyResult = this.getResponse(data)
            if (this.copyResult.success) {
              this.showSuccess("کپی از بازدید با موفقیت انجام شد.")
              this.loadData()

              await this.log({
                action: this.logActions.copyFromRevisit,
                bizCode: this.selectedRequest.NidWorkItem,
                bizCodeTitle: "شماره درخواست",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `کپی از بازدید در کنترل نقشه برای شماره ${
                  this.selectedRequest.BizCode ?? ""
                } انجام گردید.`
              })
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },

    // copy az mojaz pavaneh
    copyMojazParvanehToMapControl () {
      this.showConfirm(
        "آیا از کپی اطلاعات مجاز پروانه بر روی اطلاعات کنترل نقشه مطمئن هستید؟"
      ).onOk(() => {
        this.showLoading()
        const payload = { pNidProc: this.selectedRequest.NidProc }
        this.$services.SC.copyMojazParvanehToMapControl(payload, {
          config: {
            District: this.selectedDistrict
          }
        })
          .then(async ({ data }) => {
            this.copyResult = this.getResponse(data)
            if (this.copyResult.success) {
              this.showSuccess("کپی از مجاز پروانه با موفقیت انجام شد.")
              await this.log({
                action: this.logActions.copy,
                bizCode: this.selectedRequest.NidWorkItem,
                bizCodeTitle: "شماره درخواست",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `کپی از مجاز پروانه در کنترل نقشه برای شماره ${
                  this.selectedRequest.BizCode ?? ""
                } انجام گردید.`
              })
              this.loadData()
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    // copy az mohandesin nazer
    copyMapControlEngineerToOtherGroups () {
      this.showConfirm(
        "آیا از کپی اطلاعات مهندسین ناظر بر روی اطلاعات کنترل نقشه مطمئن هستید؟"
      ).onOk(() => {
        this.showLoading()
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pEumRevisitGroupTo: 7
        }
        this.$services.SC.copyMapControlEngineerToOtherGroups(payload, {
          config: {
            District: this.selectedDistrict
          }
        })
          .then(async ({ data }) => {
            this.copyResult = this.getResponse(data)
            if (this.copyResult.success) {
              this.showSuccess("کپی از مهندسین ناظر با موفقیت انجام شد.")

              await this.log({
                action: this.logActions.copyFromEngineers,
                bizCode: this.selectedRequest.NidWorkItem,
                bizCodeTitle: "شماره درخواست",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `کپی از مهندسین ناظر در کنترل نقشه برای شماره ${
                  this.selectedRequest.BizCode ?? ""
                } انجام گردید.`
              })
              this.loadData()
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },

    normalizeBaseBazelRows () {
      return this.results.Base_Bezel.map((m) => {
        return {
          ...m,
          CI_BezelType: m.CI_BezelType || 0,
          CI_SideCode: m.CI_SideCode || 0,
          Dimension: m.Dimension || "",
          IsObserve: m.IsObserve || false,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidBezel: m.NidBezel || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    normalizeBaseEdge () {
      return this.results.Base_Edge.map((m) => {
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
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidEdge: m.NidEdge || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    normalizeBaseUsing () {
      return this.results.Base_Using.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          BuildingNo: m.BuildingNo || 0,
          BusyArea: m.BusyArea || 0,
          CI_BuildingKind: m.CI_BuildingKind || 0,
          CI_BuildingStep: m.CI_BuildingStep || 0,
          CI_BuildingType: m.CI_BuildingType || 0,
          CI_HowChangeBuilding: m.CI_HowChangeBuilding || 0,
          CI_Repair: m.CI_Repair || 0,
          CI_RoofType: m.CI_RoofType || 0,
          CI_SazehType: m.CI_SazehType || 0,
          CI_UsingGroup: m.CI_UsingGroup || 0,
          CI_UsingPlace: m.CI_UsingPlace || 0,
          CI_UsingStatus: m.CI_UsingStatus || 0,
          CI_UsingType: m.CI_UsingType || 0,
          CI_ViewCode: m.CI_ViewCode || 0,
          CI_WallType: m.CI_WallType || 0,
          ConversionDate: m.ConversionDate || null,
          CreateYearFrom: m.CreateYearFrom || 0,
          CreateYearTo: m.CreateYearTo || 0,
          DWGObjectID: m.DWGObjectID || 0,
          DWGObjectName: m.DWGObjectName || 0,
          Dahaneh: m.Dahaneh || 0,
          Depth1Area: m.Depth1Area || 0,
          Depth1No: m.Depth1No || 0,
          Depth2Area: m.Depth2Area || 0,
          Depth2No: m.Depth2No || 0,
          Depth3Area: m.Depth3Area || 0,
          Depth3No: m.Depth3No || 0,
          EditUsingArea: m.EditUsingArea || 0,
          FloorNo: m.FloorNo || 0,
          GarbageUnit: m.GarbageUnit || 0,
          GenerateDate: m.GenerateDate || null,
          IllegalInfrastructure: m.IllegalInfrastructure || 0,
          MassDistance_Main: m.MassDistance_Main || 0,
          MassDistance_Sub: m.MassDistance_Sub || 0,
          OverOnArea: m.OverOnArea || 0,
          OverOnLengthNear: m.OverOnLengthNear || 0,
          OverOnTarakom: m.OverOnTarakom || 0,
          OverOrNoParvaneh: m.OverOrNoParvaneh || 0,
          ProgressPercent: m.ProgressPercent || 0,
          RepairArea: m.RepairArea || 0,
          RoofThickness: m.RoofThickness || 0,
          UnUsefulHeight: m.UnUsefulHeight || 0,
          UnitCount: m.UnitCount || 0,
          UnitNo: m.UnitNo || 0,
          UsefulHeight: m.UsefulHeight || 0,
          UsingArea: m.UsingArea || 0,
          UsingArea_Cur: m.UsingArea_Cur || 0,
          UsingDepth: m.UsingDepth || 0,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidUsing: m.NidUsing || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    normalizeBaseFront () {
      return this.results.Base_Front.map((m) => {
        return {
          ...m,
          CI_RoofType: m.CI_RoofType || null,
          CI_FrontStatus: m.CI_FrontStatus || null,
          ConversionDate: m.ConversionDate || null,
          DWGObjectID: m.DWGObjectID || 0,
          DWGObjectName: m.DWGObjectName || null,
          CI_DutyYear: m.CI_DutyYear || null,
          FrontArea: m.FrontArea || 0
        }
      })
    },
    normalizeBaseGap () {
      return this.results.Base_Gap.map((m) => {
        return {
          ...m,
          PathWidth: m.PathWidth || null
        }
      })
    },
    normalizeBaseDoor () {
      return this.results.Base_Door.map((m) => {
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
    normalizeBaseGreenSpace () {
      return this.results.Base_GreenSpace.map((m) => {
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
    normalizeBaseOtherEquipment () {
      return this.results.Base_OtherEquipment.map((m) => {
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
    normalizeBasePlanMosavab () {
      return this.results.Base_PlanMosavab.map((m) => {
        return {
          ...m,
          Area: m.Area || null,
          CI_BuildingPattern: m.CI_BuildingPattern || null
        }
      })
    },
    normalizeBasePlanMojaz () {
      return this.results.Base_PlanMojaz.map((m) => {
        return {
          ...m,
          Area: m.Area || null,
          CI_BuildingPattern: m.CI_BuildingPattern || null
        }
      })
    },
    normalizeBasePlanForWork () {
      return this.results.Base_PlanForWork.map((m) => {
        return {
          ...m,
          Area: m.Area || null,
          CI_BuildingPattern: m.CI_BuildingPattern || null
        }
      })
    },
    normalizeBaseParking () {
      return this.results.Base_Parking.map((m) => {
        return {
          ...m,
          CI_RequiredParkingType: m.CI_RequiredParkingType || null,
          InspectedNo: m.InspectedNo || null,
          ProductYear: m.ProductYear || null,
          SupplyNo: m.SupplyNo || null,
          TrespassYear: m.TrespassYear || null,
          SharedParkingCount: m.SharedParkingCount || 0,
          Com100ParkingCount: m.Com100ParkingCount || 0
        }
      })
    },
    normalizeBaseNeighbor () {
      return this.results.Base_Neighbor.map((m) => {
        return {
          ...m,
          CI_NeighborType: m.CI_NeighborType || null,
          CI_SideCode: m.CI_SideCode || null,
          NeighborValue: m.NeighborValue || null,
          CI_Neighbor_Specifications: m.CI_Neighbor_Specifications || null,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidNeighbor: m.NidNeighbor || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    normalizeBaseControllerInfo () {
      return this.results.Base_ControllerInfo.map((m) => {
        return {
          ...m,
          CI_Ability: m.CI_Ability || 0,
          CommitmentNo: m.CommitmentNo || null,
          CommitmentSupervisionDate: m.CommitmentSupervisionDate || null,
          CommitmentSupervisionNo: m.CommitmentSupervisionNo || null,
          CI_Base: m.CI_Ability || null,
          CI_EngStudyField: m.CI_EngStudyField || null,
          CI_EngineerType: m.CI_EngineerType || null,
          ConfirmDate: m.ConfirmDate || null,
          ControllerCode: m.ControllerCode || null,
          EngBase: m.EngBase || null,
          FloorNo: m.FloorNo || null,
          JobAgreement: m.JobAgreement || null,
          MembershipNo: m.MembershipNo || null,
          MobileNo: m.MobileNo || null,
          UrbanityCode: m.UrbanityCode || null,
          Years: m.Years || null,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidControllerInfo:
            m.NidControllerInfo || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    saveMapControl () {
      this.showLoading()
      const buildingInfo = this.results.Base_BuildingInfo
      buildingInfo.Height = buildingInfo.Height || 0
      buildingInfo.RampArea = buildingInfo.RampArea || 0
      buildingInfo.Defilade = buildingInfo.Defilade || 0
      buildingInfo.PlackWidth = buildingInfo.PlackWidth || 0
      buildingInfo.AllowableDensityLicence =
        buildingInfo.AllowableDensityLicence || 0
      this.results.Base_Edge = this.normalizeBaseEdge()
      this.results.Base_Using = this.normalizeBaseUsing()
      this.results.Base_Front = this.normalizeBaseFront()
      this.results.Base_Gap = this.normalizeBaseGap()
      this.results.Base_Door = this.normalizeBaseDoor()
      this.results.Base_GreenSpace = this.normalizeBaseGreenSpace()
      this.results.Base_OtherEquipment = this.normalizeBaseOtherEquipment()
      this.results.Base_PlanMosavab = this.normalizeBasePlanMosavab()
      this.results.Base_PlanMojaz = this.normalizeBasePlanMojaz()
      this.results.Base_PlanForWork = this.normalizeBasePlanForWork()
      this.results.Base_Parking = this.normalizeBaseParking()
      this.results.Base_Neighbor = this.normalizeBaseNeighbor()
      this.results.Base_ControllerInfo = this.normalizeBaseControllerInfo()
      // this.results.Base_Front = this.normalizeData()
      const payload = {
        pMapControl: this.results,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.SC.saveMapControl(payload, {
        config: { District: this.selectedDistrict }
      })

        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.showSuccess("ویرایش کنترل نقشه با موفقیت انجام شد")
            this.results.NidBase_Parvandeh_HouseOrDastgah = ""
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ویرایش و ذخیره اطلاعات در کنترل نقشه برای شماره ${
                this.selectedRequest.BizCode ?? ""
              } انجام گردید.`
            })
            this.loadData()
            this.isEditable = false
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.loadData()
      this.isEditable = false
    }
  }
}
</script>
