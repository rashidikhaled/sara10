<template>
  <safa-form
    appId="543f8a9b-107f-66fc-3367-7747df03a744"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="resultSave" />
        <safa-status :result="saveConfirmRes" />
        <form-header-by-nosazi-code
          v-model="dmBaseInfo.codeNosaziString"
          cdcName="codeNosaziString"
          m="r"
        />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <!-- <FormControl>
            <nosazi-code-input
              label="کد نوسازی"
              v-model="dmBaseInfo.codeNosaziString"
              cdcName="codeNosaziString"
              m="r"
            />
          </FormControl> -->
          <FormControl>
            <safa-text
              label="مالک"
              label-width="100px"
              v-model="dmBaseInfo.ownerFullName"
              cdcName="ownerFullName"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نوع درخواست"
              label-width="100px"
              v-model="dmBaseInfo.Sh_RequestInfo.WorkflowTitel"
              cdcName="WorkflowTitel"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label-width="100px"
              label="تاریخ درخواست"
              v-model="dmBaseInfo.Sh_RequestInfo.RequestDate"
              cdcName="RequestDate"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد ارجاع"
              label-width="100px"
              v-model="dmSearch.NidWorkItem"
              cdcName="NidWorkItem"
              required
              validations="required"
              ref="theSearchInput"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="منطقه"
              label-width="100px"
              v-model="dmSearch.district"
              cdcName="district"
              source-type="local"
              :options="dmSearch.districtOpt"
              required
              validations="required"
            />
          </FormControl>
          <div>
            <btn-default @click="loadObj" label="جستجو" />
          </div>
        </FormRow>
        <safa-tabs v-model="currentTab" class="fit">
          <template v-slot:tabs>
            <tab-menu name="karbariha" label="کاربری ها" />
            <tab-menu name="pishAmagiha" label="پیش آمدگی ها" />
            <tab-menu name="parking" label="پارکینگ" />
            <tab-menu name="mohandesConfirm" label="تایید مهندس" />
          </template>
          <tab-content name="karbariha" :padding="false">
            <fit>
              <safa-grid
                helper="UAcceptFrameUsing"
                v-model="dmBuilding.Base_Using"
                cdcName="Base_Using"
                :m="mode"
                :paginationPageSize="50"
                :allowMultipleSelection="false"
                paginate
              />
            </fit>
          </tab-content>
          <tab-content name="pishAmagiha" :padding="false">
            <fit>
              <safa-grid
                helper="UAcceptFrameFront"
                v-model="dmBuilding.Base_Front"
                cdcName="Base_Front"
                :m="mode"
                :paginationPageSize="50"
                :allowMultipleSelection="false"
                paginate
              />
            </fit>
          </tab-content>
          <tab-content name="parking" :padding="false">
            <fit>
              <safa-grid
                title="پارکینگ"
                helper="UAcceptFrameParking"
                v-model="dmBuilding.Base_Parking"
                cdcName="Base_Parking"
                :m="mode"
                :paginationPageSize="50"
                :allowMultipleSelection="false"
                paginate
              />
              <safa-grid
                helper="UAcceptFrameParkingSupply"
                title="نحوه تامین پارکینگ"
                v-model="dmBuilding.Base_SupplyParking"
                cdcName="Base_SupplyParking"
                :m="mode"
                :paginationPageSize="50"
                :allowMultipleSelection="false"
                paginate
              />
            </fit>
          </tab-content>
          <tab-content name="mohandesConfirm" :padding="false">
            <fit>
              <safa-grid
                helper="UAcceptFrameEngConfirm"
                v-model="dmEng.list"
                cdcName="list"
                m="r"
                :paginationPageSize="50"
                :allowMultipleSelection="false"
                paginate
              />
              <text-template
                label="توضیحات"
                label-width="100px"
                v-model="dmEng.Comment"
                cdcName="Comment"
                :m="mode"
              />
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="loadObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  name: "UAcceptFrame",

  mixins: [kartableReferencesMixin, baseFormMixin],
  data () {
    return {
    //   title: "تایید سفتکاری/پایانکار",
    //   name: "UAcceptFrame",
    //   formKey: "5DD81B7D-098B-4A04-B650-3DE343E6F417",
    //   main: true,
      internalSectionState: false,
      currentTab: "karbariha",
      resultSave: null,
      saveConfirmRes: null,
      baseLibResult: null,
      isView: false,

      // granted: {
      //   using: this.$resource.isGranted('CADCB13A-3EFE-41C4-9E08-1F096176F7AF'),
      //   front: this.$resource.isGranted('3C8598E4-9A3B-41E3-8D0C-F72E452144A0'),
      //   parking: this.$resource.isGranted('34FA6C0D-EA19-474F-A05D-2FB4234267F5'),
      //   engConfirm: this.$resource.isGranted('4FE0D4C2-1ED3-430B-BA1C-2BD2F3771583')
      // },
      dmSearch: {
        NidWorkItem: "",
        district: 1,
        districtOpt: [],
        hasData: false
      },
      dmBaseInfo: {
        codeNosaziString: "",
        ownerFullName: "",
        ArchiveWrapper: {},
        BuildingObj: {},
        HouseObj: {},
        MainObj: {},
        Sh_RequestInfo: {
          WorkflowTitel: ""
        },
        Sh_Workflow: {}
      },
      dmEng: {
        list: [],
        Comment: ""
      },
      dmHouse: {},
      dmBuilding: {
        Base_Info: {},
        Base_Using: [],
        Base_Front: [],
        Base_Parking: [],
        Base_SupplyParking: []
      }
    }
  },

  methods: {
    getDistricts () {
      const inConfigs =
        window.getConfigValue("districts").map((x) => x.ID) ?? []
      const allowed =
        this.currentUser.JobLocation?.allowDomains?.split(",")?.map(Number) ??
        []
      return allowed.filter((x) => inConfigs.includes(x))
    },
    loadObj () {
      if (!this.dmSearch.district || !this.dmSearch.NidWorkItem) {
        this.showError("کد ارجاع و منطقه تنظیم نشده است")
        return
      }
      this.isEditable = false
      this.showLoading()
      let data = { pNidWorkItem: this.dmSearch.NidWorkItem }
      this.$services.SA.getBaseLibInNidWorkItem(data, {
        config: { District: this.dmSearch.district }
      })
        .then(async ({ data }) => {
          this.baseLibResult = this.getResponse(data)
          if (this.baseLibResult.success) {
            this.dmBaseInfo = this.baseLibResult.data
            this.dmEng.Comment = ""
            await this.getEngineerConfirm()
            await this.getRevisitHouse()
            if (this.dmBaseInfo?.BuildingObj?.NidBase) {
              await this.getRevisitBuilding()
            }
            this.dmBaseInfo.codeNosaziString = convertNosaziCodeObjectToString(
              this.dmBaseInfo.MainObj
            )
            this.dmBaseInfo.ownerFullName = this.dmHouse.Base_Owner.map(
              (x) => `${x.OwnerName} ${x.OwnerLastName} (${x.NationalCode})`
            ).join(", ")
            this.dmSearch.hasData = true
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.dmSearch.NidWorkItem,
                bizCodeTitle: "nidWorkItem"
              })
            }
            this.isView = true
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    async getRevisitHouse () {
      try {
        let payload = {
          PNidBase: this.dmBaseInfo.HouseObj.NidBase,
          // eslint-disable-next-line max-len
          PLoadFun:
            "Base_NosaziCode,Base_Owner,Base_AddressInfo,Base_Edge,Base_Wall,Base_RegisterPlack,Base_GreenSpace,Base_Neighbor,Base_OtherEquipment,Base_Scuttle,Base_SubScription,Base_HouseInfo,Base_CommonEstate,Base_ShahrsaziArchive,Base_Attachment,Base_Door,MapImage,Base_Bezel,Base_File,Base_AddressPostCode,Base_CommissionHistory,Base_PreCodeInfo",
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SC.getRevisitHouse(payload, {
          config: { District: this.dmSearch.district }
        })

        let house = this.getResponse(data)
        if (house.success !== true) {
          return this.showError("اطلاعات بازدید بارگذاری نشد")
        } else {
          this.dmHouse = house.data ?? {}
        }
        await this.log({
          action: this.logActions.view,
          bizCode: this.dmBaseInfo.HouseObj.NidBase,
          bizCodeTitle: "NidBase"
        })

        // end
      } catch (error) {
        console.error(error)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
      }
    },
    async getRevisitBuilding () {
      try {
        const { data } = await this.$services.SC.getRevisitBuilding(
          {
            PNidBase: this.dmBaseInfo.BuildingObj.NidBase,
            // eslint-disable-next-line max-len
            PLoadFun:
              "Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_ParkingLackInPlan,Base_ParkingLackInParkingGroup,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Wall,Base_Bezel,Base_OtherEquipment,Base_Attachment,MapImage,Base_ControllerInfo,Base_Parking,Base_SharingInfrastructure",
            pIsLoadDeletedNosaziCode: false
          },
          {
            config: { District: this.dmSearch.district }
          }
        )
        let building = this.getResponse(data)
        if (this.result.success === true) {
          this.dmBuilding = building?.data ?? {}
        }
        await this.log({
          action: this.logActions.view,
          bizCode: this.dmBaseInfo.BuildingObj.NidBase,
          bizCodeTitle: "NidBase"
        })

        // end
      } catch (e) {
        console.error(e)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.$nextTick(() => {
          this.hideLoading()
          console.log("hide loading building info revisit")
        })
      }
    },
    async getEngineerConfirm () {
      let payload = {
        pNidWorkItem: this.dmSearch.NidWorkItem,
        pType: "1"
      }
      this.$services.engineers
        .getEngineerConfirm(payload, {})
        .then(async ({ data }) => {
          let eng = this.getResponse(data)
          if (eng.success) {
            this.dmEng.list =
              eng.data.GetEngineerConfirmResult?.EngConfirm ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: this.dmSearch.NidWorkItem,
              bizCodeTitle: "NidWorkItem"
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
    async saveObj () {
      try {
        this.showSending()
        const { data } = await this.$services.SC.saveRevisitBuilding(
          {
            pNidProc: this.dmBaseInfo.Sh_RequestInfo.NidProc,
            PNidRevisit: this.dmBuilding.Base_Info.NidRevisit,
            PObj: this.adjustData(this.dmBuilding),
            pIsCallFromEngineer: true,
            pUser: {
              UserGuid: this.getNidUser(),
              UserName: this.getUserDisplayName()
            }
          },
          {
            config: { District: this.dmBaseInfo.MainObj.District }
          }
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.dmBaseInfo.Sh_RequestInfo.NidProc,
            bizCodeTitle: "NidProc"
          })
          await this.loadObj()
        }
      } catch (e) {
        this.serverError()
        console.log("error", e)
      } finally {
        this.hideLoading()
      }
    },
    adjustData (targetObj) {
      if (!targetObj) {
        return targetObj
      }
      if (Array.isArray(targetObj)) {
        return targetObj.map((x) => this.adjustData(x))
      }
      Object.keys(targetObj)
        .filter((x) => !/date/gi.test(x))
        .filter((x) => targetObj[x] === "")
        .forEach((x) => {
          // eslint-disable-next-line no-param-reassign
          targetObj[x] = /^Nid/.test(x) ? null : 0
        })

      Object.keys(targetObj)
        .filter(
          (x) => Array.isArray(targetObj[x]) || typeof targetObj[x] === "object"
        )
        .forEach((x) => this.adjustData(targetObj[x]))
      return targetObj
    },
    async confirmEng () {
      if (!this.dmEng.Comment) {
        this.showError("توضیحات تایید را وارد نمایید.")
        return
      }
      let payload = {
        pDescription: this.dmEng.Comment,
        pDistrict: this.dmBaseInfo.MainObj.District,
        pNidEng: this.getNidUser(),
        pNidWorkItem: this.dmBaseInfo.Sh_RequestInfo.NidWorkItem.toString(),
        pType: "1"
      }
      this.$services.engineers
        .saveConfirm(payload)
        .then(({ data: args }) => {
          this.saveConfirmRes = this.getResponse(args)
          if (this.saveConfirmRes.success) {
            this.showSuccess("مهندس باموفقیت تایید شد")
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  async mounted () {
    let districts = await this.getDistricts()
    this.dmSearch.districtOpt = districts
    if (this.selectedExecRep?.NidWorkItem) {
      this.dmSearch.district = this.selectedExecRep.CodeString.split("-")[0]
      this.dmSearch.NidWorkItem = this.selectedExecRep.NidWorkItem.toString()
    } else {
      this.dmSearch.district = this.dmSearch.districtOpt[0]
    }
    this.$nextTick(() => {
      this.$refs.theSearchInput.setFocus()
    })
  }
}
</script>
