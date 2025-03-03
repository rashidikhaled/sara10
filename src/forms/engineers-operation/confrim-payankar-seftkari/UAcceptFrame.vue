<template>
  <safa-form :id="formKey" :caption="title" appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1">
    <form-wrapper :title="title">
      <template>
        <safa-status :result="baseLibRes"/>
        <safa-status :result="getEngineerConfirmRes"/>
        <safa-status :result="getRevisitBuildingRes"/>
        <safa-status :result="saveRevisitBuildingRes"/>
        <safa-status :result="saveConfirmRes"/>
      </template>
      <fit>
        <FormRow>
          <FormControl>
            <safa-text
              ref="theSearchInput"
              required
              label="کد ارجاع"
              label-width="80px"
              v-model="dmSearch.NidWorkItem"
              cdcName="NidWorkItem"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              required
              label="منطقه"
              label-width="80px"
              source-type="local"
              :options="dmSearch.districtOpt"
              v-model="dmSearch.district"
              cdcName="district"
            />
          </FormControl>
          <div>
            <btn-default @click="loadObj" label="جستجو"/>
          </div>
        </FormRow>
        <FormRow class="q-my-sm">
          <FormControl>
            <safa-text
              label-width="80px"
              label="مالک"
              m="r"
              v-model="dmBaseInfo.ownerFullName"
              cdcName="ownerFullName"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label-width="80px"
              label="نوع درخواست"
              m="r"
              v-model="dmBaseInfo.Sh_RequestInfo.WorkflowTitel"
              cdcName="WorkflowTitel"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label-width="80px"
              label="تاریخ درخواست"
              m="r"
              v-model="dmBaseInfo.Sh_RequestInfo.RequestDate"
              cdcName="RequestDate"
            />
          </FormControl>
          <nosazi-code-input
            v-model="dmBaseInfo.codeNosaziString"
            cdcName="codeNosaziString"
            label="کد نوسازی"
            label-width="80px"
            m="r"
          />
        </FormRow>
        <safa-tabs v-model="currentTab" class="fit">
          <template v-slot:tabs>
            <tab-menu name="karbariha" label="کاربری ها"/>
            <tab-menu name="pishAmagiha" label="پیش آمدگی ها"/>
            <tab-menu name="parking" label="پارکینگ"/>
            <tab-menu name="mohandesConfirm" label="تایید مهندس"/>
          </template>
          <tab-content name="karbariha" :padding="false">
            <fit>
              <safa-grid
                height="100%"
                maxHeight="100%"
                minHeight="300px"
                filterable
                sortable
                :m="mode"
                paginate
                :showRowNumber="true"
                :paginationPageSize="50"
                :allowMultipleSelection="false"
                v-model="dmBuilding.Base_Using"
                helper="UAcceptFrameUsing"
                cdcName="Base_Using"
              />
            </fit>
          </tab-content>
          <tab-content name="pishAmagiha" :padding="false">
            <fit>
              <safa-grid
                height="100%"
                maxHeight="100%"
                minHeight="300px"
                filterable
                sortable
                paginate
                :m="mode"
                :showRowNumber="true"
                :paginationPageSize="50"
                :allowMultipleSelection="false"
                v-model="dmBuilding.Base_Front"
                helper="UAcceptFrameFront"
                cdcName="Base_Front"
              />
            </fit>
          </tab-content>
          <tab-content name="parking" :padding="false">
            <fit>
              <safa-splitter
                v-model="splitterValue"
                class="fit"
                horizontal
                margin="0"
                :padding="false"
              >
                <template v-slot:before>
                  <fit>
                    <safa-grid
                      title="پارکینگ"
                      height="100%"
                      maxHeight="100%"
                      minHeight="300px"
                      filterable
                      :m="mode"
                      sortable
                      paginate
                      :showRowNumber="true"
                      :paginationPageSize="50"
                      :allowMultipleSelection="false"
                      v-model="dmBuilding.Base_Parking"
                      helper="UAcceptFrameParking"
                      cdcName="Base_Parking"
                    />
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <safa-grid
                      title="نحوه تامین پارکینگ"
                      height="100%"
                      maxHeight="100%"
                      minHeight="300px"
                      filterable
                      sortable
                      paginate
                      :showRowNumber="true"
                      :m="mode"
                      :paginationPageSize="50"
                      :allowMultipleSelection="false"
                      helper="UAcceptFrameParkingSupply"
                      v-model="dmBuilding.Base_SupplyParking"
                      cdcName="Base_SupplyParking"
                    />
                  </fit>
                </template>
              </safa-splitter>
            </fit>
          </tab-content>
          <tab-content name="mohandesConfirm" :padding="false">
            <fit>
              <safa-grid
                height="100%"
                maxHeight="100%"
                minHeight="300px"
                filterable
                sortable
                paginate
                m="r"
                fit
                :showRowNumber="true"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                :paginationPageSize="50"
                :allowMultipleSelection="false"
                helper="UAcceptFrameEngConfirm"
                v-model="dmEng.list"
              />
              <div class="q-my-sm">
                <btn-default
                  label="تایید"
                  @click="showPopupForSetDec"
                />
              </div>
              <safa-popup
                v-model="showPopup"
                height="255px"
                title="توضیحات تایید را وارد نمایید."
                width="400px"
              >
                <template>
                  <div class="q-mt-sm q-mr-sm q-ml-sm">
                    <text-template
                      v-model="dmEng.Comment"
                      cdcName="comments"
                      label="توضیحات"
                      :rows="10"
                    />
                    <template>
                      <form-actions :showEditButton="false" class="q-mt-sm">
                        <div class="q-my-sm">
                          <btn-save
                            label="تایید"
                            @click="confirmPopupForSetDec"
                          ></btn-save>
                        </div>
                        <div class="q-my-sm">
                          <btn-default
                            label="انصراف"
                            @click="hidePopupForSetDec"
                          ></btn-default>
                        </div>
                      </form-actions>
                    </template>
                  </div>
                </template>
              </safa-popup>
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
        >
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import kartableReferencesMixin from '../mixins/kartableReferencesMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [kartableReferencesMixin, baseFormMixin],
  data () {
    return {
      title: 'تایید سفتکاری / پایانکار',
      name: 'UAcceptFrame',
      formKey: '5DD81B7D-098B-4A04-B650-3DE343E6F417',
      main: true,

      // #services
      getRevisitBuildingRes: null,
      baseLibRes: null,
      saveRevisitBuildingRes: null,
      getEngineerConfirmRes: null,
      saveConfirmRes: null,

      // #variables
      internalSectionState: false,
      currentTab: 'karbariha',
      isView: false,
      splitterValue: 50,
      showPopup: false,

      dmSearch: {
        NidWorkItem: '',
        district: 1,
        districtOpt: [],
        hasData: false
      },
      dmBaseInfo: {
        codeNosaziString: '',
        ownerFullName: '',
        ArchiveWrapper: {},
        BuildingObj: {},
        HouseObj: {},
        MainObj: {},
        Sh_RequestInfo: {
          WorkflowTitel: ''
        },
        Sh_Workflow: {}
      },
      dmEng: {
        list: [],
        Comment: ''
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

  async mounted () {
    let districts = await this.getDistricts()
    this.dmSearch.districtOpt = districts
    if (this.selectedExecRep?.NidWorkItem) {
      this.dmSearch.district = this.selectedExecRep.CodeString.split('-')[0]
      this.dmSearch.NidWorkItem = this.selectedExecRep.NidWorkItem.toString()
    } else {
      this.dmSearch.district = this.dmSearch.districtOpt[0]
    }
    this.$nextTick(() => {
      this.$refs.theSearchInput.setFocus()
    })
  },

  methods: {
    getDistricts () {
      const inConfigs =
        window.getConfigValue('districts').map((x) => x.ID || x.Id) ?? []
      const allowed = this?.currentUser?.jobLocation?.allowDomains?.split(",").map(Number) ?? []
      return allowed.filter((x) => inConfigs.includes(x)) ?? []
    },
    showPopupForSetDec () {
      this.showPopup = true
    },
    hidePopupForSetDec () {
      this.showPopup = false
    },
    loadObj () {
      if (!this.dmSearch.district || !this.dmSearch.NidWorkItem) {
        this.showError('کد ارجاع و منطقه تنظیم نشده است.')
        return
      }
      this.isEditable = false
      this.showLoading()
      this.$services.SA.getBaseLibInNidWorkItem(
        { pNidWorkItem: this.dmSearch.NidWorkItem },
        { config: { District: this.dmSearch.district } }
      )
        .then(async ({ data }) => {
          this.baseLibRes = this.getResponse(data)
          if (this.baseLibRes.success) {
            this.dmBaseInfo = this.baseLibRes.data
            this.dmEng.Comment = ''
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
            ).join(', ')
            this.dmSearch.hasData = true
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.dmSearch.NidWorkItem,
                bizCodeTitle: 'nidWorkItem',
                saveDesc: `بارگذاری پرونده با شماره ارجاع  ${this.dmSearch.NidWorkItem} در فرم ${this.title} انجام گردید.`
              })
            }
            this.isView = true
          }
        })
        .catch((e) => {
          console.error(e)
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
            'Base_NosaziCode,Base_Owner,Base_AddressInfo,Base_Edge,Base_Wall,Base_RegisterPlack,Base_GreenSpace,Base_Neighbor,Base_OtherEquipment,Base_Scuttle,Base_SubScription,Base_HouseInfo,Base_CommonEstate,Base_ShahrsaziArchive,Base_Attachment,Base_Door,MapImage,Base_Bezel,Base_File,Base_AddressPostCode,Base_CommissionHistory,Base_PreCodeInfo',
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SC.getRevisitHouse(payload, {
          config: { District: this.dmSearch.district }
        })
        this.getRevisitHouseRes = this.getResponse(data)
        if (this.getRevisitHouseRes.success) {
          this.dmHouse = this.getRevisitHouseRes.data ?? {}
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async getRevisitBuilding () {
      try {
        const payload = {
          PNidBase: this.dmBaseInfo.BuildingObj.NidBase,
          PLoadFun:
            'Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_ParkingLackInPlan,Base_ParkingLackInParkingGroup,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Wall,Base_Bezel,Base_OtherEquipment,Base_Attachment,MapImage,Base_ControllerInfo,Base_Parking,Base_SharingInfrastructure',
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SC.getRevisitBuilding(payload, {
          config: { District: this.dmSearch.district }
        })
        this.getRevisitBuildingRes = this.getResponse(data)
        if (this.getRevisitBuildingRes.success) {
          this.dmBuilding = this.getRevisitBuildingRes?.data ?? {}
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async getEngineerConfirm () {
      try {
        const payload = {
          pNidWorkItem: this.dmSearch.NidWorkItem,
          pType: '1'
        }
        const { data } = await this.$services.engineers.getEngineerConfirm(
          payload
        )
        this.getEngineerConfirmRes = this.getResponse(data)
        if (this.getEngineerConfirmRes.success) {
          this.dmEng.list =
            this.getEngineerConfirmRes.data?.GetEngineerConfirmResult
              ?.EngConfirm ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async saveObj () {
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        const payload = {
          pNidProc: this.dmBaseInfo.Sh_RequestInfo.NidProc,
          PNidRevisit: this.dmBuilding.Base_Info.NidRevisit,
          PObj: this.adjustData(this.dmBuilding),
          pIsCallFromEngineer: true,
          pUser: {
            UserGuid: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        // console.log('payload saveRevisitBuilding :>> ', payload)
        const { data } = await this.$services.SC.saveRevisitBuilding(payload, {
          config: { District: this.dmBaseInfo.MainObj.District }
        })
        this.saveRevisitBuildingRes = this.getResponse(data)
        if (this.saveRevisitBuildingRes.success) {
          this.showSuccess('عملیات ذخیره با موفقیت انجام شد.')
          await this.log({
            action: this.logActions.save,
            bizCode: this.dmBaseInfo.Sh_RequestInfo.NidProc,
            bizCodeTitle: 'NidProc',
            saveDesc: `ذخیره اطلاعات پرونده با شماره ارجاع  ${this.dmSearch.NidWorkItem} در فرم ${this.title} انجام گردید.`
          })
          this.loadObj()
        }
      } catch (e) {
        console.log(e)
        this.serverError()
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
        .filter((x) => targetObj[x] === '')
        .forEach((x) => {
          // eslint-disable-next-line no-param-reassign
          targetObj[x] = /^Nid/.test(x) ? null : 0
        })

      Object.keys(targetObj)
        .filter(
          (x) => Array.isArray(targetObj[x]) || typeof targetObj[x] === 'object'
        )
        .forEach((x) => this.adjustData(targetObj[x]))
      return targetObj
    },

    async confirmEng () {
      const payload = {
        pNidEng: this.getNidUser(),
        pDescription: this.dmEng.Comment,
        pDistrict: this.dmBaseInfo.MainObj.District ?? 15,
        pNidWorkItem: this.dmSearch.NidWorkItem,
        pType: '1'
      }
      try {
        const { data } = await this.$services.engineers.saveConfirm(payload)
        this.saveConfirmRes = this.getResponse(data)
        if (this.saveConfirmRes.success) {
          this.dmEng.list =
            this.saveConfirmRes.data.SaveConfirmResult.EngConfirm
          await this.log({
            action: this.logActions.confirm,
            bizCode: this.getNidUser(),
            bizCodeTitle: 'NidUser',
            saveDesc: `تایید مهندس در پرونده با شماره ارجاع  ${this.dmSearch.NidWorkItem} در فرم ${this.title} انجام گردید.`
          })
          this.showSuccess('مهندس با موفقیت تایید شد')
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    confirmPopupForSetDec () {
      if (!this.dmEng.Comment) {
        this.showError('توضیحات تایید را وارد نمایید.')
        return
      }
      this.confirmEng()
      this.showPopup = false
    }
  }
}
</script>
