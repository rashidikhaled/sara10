<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="5FB05A4F-DA31-4202-83D1-D7558D5E965A"
  >
    <form-wrapper vertical title="اطلاعات پرونده" :padding="false">
      <template #header>
        <safa-status :result="result" />
        <form-header-by-nosazi-code v-model="baseNosaziCode" @fetched="load" />
      </template>
      <!-- <FormRow class="q-pa-sm">
          <FormControl>
            <nosazi-code-input
              v-model="baseNosaziCode"
              label="کد نوسازی"
              label-width="70px"
              :actions="false"
              @fetched="load"
            />
          </FormControl>
        </FormRow> -->
      <safa-tabs v-model="activeTab" :padding="false">
        <template v-slot:tabs>
          <tab-menu name="Ayan" label="اعیان" />
          <tab-menu name="Job" label="شغلی" />
        </template>
        <tab-content name="Ayan" title="اعیان">
          <safa-tabs v-model="currentTab" class="fit" :padding="false">
            <template v-slot:tabs>
              <tab-menu name="jobInfo" label="مشخصات" />
              <tab-menu name="OwnersAndHistory" label="مالکین و سوابق" />
              <tab-menu name="Using" label="کاربری" />
              <tab-menu name="Others" label="سایر امکانات" />
              <tab-menu name="Description" label="توضیحات" />
            </template>

            <tab-content name="jobInfo" title="مشخصات">
              <JobInfo :m="mode" v-model="model.Shop" />
            </tab-content>

            <tab-content name="OwnersAndHistory" title="مالکین و سوابق">
              <OwnersAndHistory :m="mode" v-model="model.Shop" />
            </tab-content>
            <tab-content name="Using" title="کاربری">
              <Using :m="mode" v-model="model.Shop" />
            </tab-content>
            <tab-content name="Others" title="سایر امکانات">
              <Others :m="mode" v-model="model.Shop" />
            </tab-content>
            <tab-content name="Description" title="توضیحات">
              <Description :m="mode" v-model="model.Shop" />
            </tab-content>
          </safa-tabs>
        </tab-content>
        <tab-content name="Job" title="شغلی">
          <safa-grid
            m="r"
            fit
            :bordered="false"
            paginate
            max-height="100%"
            height="100%"
            title="لیست شغل های این واحد"
            helper="Jobcolumns"
            v-model="model.Shop.Base_JobInfo"
            :suppressRowClickSelection="false"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer >
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="save"
        >
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import JobInfo from "./partials/JobInfo"
import OwnersAndHistory from "./partials/OwnersAndHistory"
import Using from "./partials/Using"
import Others from "./partials/Others"
import Description from "./partials/Description"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { convertNosaziCodeObjectToString } from "../../../../kartable/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  main: true,
  components: {
    JobInfo,
    OwnersAndHistory,
    Using,
    Others,
    Description
  },
  data () {
    return {
      title: "اطلاعات پرونده",
      formKey: "6067e218-f53a-4f25-9da6-572aafb28e48",
      name: "UFireParvandehInfo",
      main: true,
      result: null,
      activeTab: "Ayan",
      currentTab: "jobInfo",
      baseNosaziCode: "0-0-0-0-0-0-0",
      model: {
        Shop: {
          Base_AddressInfo: {
            Sector: "",
            MainAddress: "",
            SubAddress: "",
            Alley: ""
          },
          Base_CommonEstate: {
            Plack: "",
            PostCode: "",
            Telephone: "",
            Comments: ""
          },
          Base_PreCodeInfo: [],
          Base_File: [],
          Base_ShopInfo: {
            TotalArea: 0,
            CreateUnitDate: "",
            CI_JobStateStatus: 0,
            ToftImpart: 0,
            CI_TradingStatus: 0,
            DarbandCount: 0,
            FreeSpaceNoTradingArea: 0,
            CI_GeoStatus: 0,
            Hight: 0
          },
          Base_Owner: [],
          Base_ShahrsaziArchive: [],
          Base_SupplyParking: [],
          Base_Installation: [],
          Base_Gap: [],
          Base_OtherEquipment: [],
          Sh_Letter: [],
          Base_Attachment: [],
          Base_JobInfo: [],
          Base_Using: [],
          Base_SharingInfrastructure: [],
          Base_SubScription: []
        }
      }
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.load()
    } else {
      this.hideSidebar("UFireParvandehInfo")
    }
  },

  methods: {
    async load () {
      this.isEditable = false
      try {
        this.showLoading()
        let payload = {
          pNosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
        }
        let response = await this.$services.FireService.getShopParvandeh(
          payload,
          {
            config: {
              District: this.selectedDistrict
            }
          }
        )
        this.result = this.getResponse(response.data)
        if (this.result.success) {
          this.model = this.result.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            saveDesc: `نمایش اطلاعات پرونده برای کد ${this.selectedRequest.BizCode} انجام گردید.`
          })
        }
      } catch (e) {
        this.showError("خطایی در سرویس رخ داد")
      } finally {
        this.hideLoading()
      }
    },
    normalizeBase_ShahrsaziArchive () {
      return this.model.Shop.Base_ShahrsaziArchive.map((m) => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          NidProc: m.NidProc || null
        }
      })
    },
    normalizeBaseUsing () {
      return this.model.Shop.Base_Using.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          BusyArea: m.BusyArea || null,
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
          GarbageUnit: m.GarbageUnit || null,
          CI_BuildingType: m.CI_BuildingType || null
        }
      })
    },
    normalizeBase_owner () {
      return this.model.Shop.Base_Owner.map((m) => {
        return {
          ...m,
          NidOwnerBank: m.NidOwnerBank || null
        }
      })
    },
    normalizeBase_Gap () {
      return this.model.Shop.Base_Gap.map((m) => {
        return {
          ...m,
          PathWidth: m.PathWidth || null
        }
      })
    },
    normalizeBase_OtherEquipment () {
      return this.model.Shop.Base_OtherEquipment.map((m) => {
        return {
          ...m,
          CI_Suggest: m.CI_Suggest || null,
          OtherEquipmentValue: m.OtherEquipmentValue || null
        }
      })
    },
    async save () {
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        this.model.Shop.Base_ShahrsaziArchive =
          this.normalizeBase_ShahrsaziArchive()
        this.model.Shop.Base_Owner = this.normalizeBase_owner()
        this.model.Shop.Base_Using = this.normalizeBaseUsing()
        this.model.Shop.Base_Gap = this.normalizeBase_Gap()
        this.model.Shop.Base_OtherEquipment =
          this.normalizeBase_OtherEquipment()
        let payload = {
          pNosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
          pObj: { ...this.model }
        }
        let response = await this.$services.FireService.saveShopParvandeh(
          payload,
          {
            config: {
              District: this.selectedDistrict
            }
          }
        )
        this.result = this.getResponse(response.data)
        if (!this.result.success) {
          this.showError("اطلاعات ذخیره نشد")
          return
        }
        this.showSuccess("اطلاعات باموفقیت ذخیره شد")
        await this.log({
          action: this.logActions.save,
          bizCode: this.selectedRequest.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.selectedRequest.BizCode,
          saveDesc: `ذخیره اطلاعات پرونده برای کد ${this.selectedRequest.BizCode} انجام گردید.`
        })
        this.load()
      } catch (e) {
        this.showError("خطایی در سرویس رخ داد")
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
