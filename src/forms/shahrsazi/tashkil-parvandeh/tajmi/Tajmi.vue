<template>
  <safa-form
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    :id="formKey"
    caption="شهرسازی- تاریخچه تجمیع"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getTajmiHistoryListRes"/>
        <safa-status :result="getDeletedNosaziCodeTreeChildRes"/>
        <form-header-by-nosazi-code
          v-if="placeholder === 'default'"
          actions
          v-model="baseNosaziCode"
          @fetched="fetched"
        />
        <form-header-by-nosazi-code
          v-if="placeholder !== 'default'"
          :actions="false"
          v-model="choosedNosaziCodeObj"
          m="r"
        />
      </template>
      <template #before-close v-if="placeholder !== 'default'">
        <btn-back
          class="q-mx-sm"
          label="بازگشت به تاریخچه تجمیع"
          @click="changePlaceholder('default')"
        />
      </template>

      <fit>
        <safa-splitter
          v-if="placeholder === 'default'"
          v-model="splitterModel"
          :horizontal="$q.screen.lt.md"
        >
          <template v-slot:before>
            <fit>
              <safa-combo
                label="دسته اطلاعاتی"
                sourceType="local"
                :options="infoGroupOptions"
                v-model="selectedCategoryInfo"
                v-if="isShowBaseInfoGroupCombo"
                class="q-mb-sm"
              />
              <safa-datatable
                title="لیست کد های مبدأ"
                helper="tajmi"
                v-model="tajmiHistoryListResult.TajmiHistoryList"
                :show-selected-checkbox="true"
                :allowMultipleSelection="true"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                height="100%"
                min-height="100px"
                max-height="100%"
                m="r"
                fit
                @click="rowClick"
                @selectedChange="selectedChange"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-tabs v-model="activeTab" ref="mainTab">
                <template v-slot:tabs>
                  <tab-menu name="tree" label="ساختار درختی"/>
                  <tab-menu
                    v-for="{ name, label, persist } in tabs"
                    :key="name"
                    :name="name"
                    :label="label"
                    @close="handleNosaziCodeTabClosed(name)"
                    :closable="!persist"
                  />
                </template>
                <tab-content name="tree" :padding="false">
                  <fit>
                    <div class="q-pa-sm">
                      <q-toolbar
                        :class="[
                          'items-center q-px-sm q-py-xs',
                          $q.dark.isActive ? 'bg-dark' : 'bg-grey-3',
                        ]"
                        style="min-height: 34px; border-radius: 3px"
                      >
                        <q-toolbar-title class="text-body2"
                        >ساختار درختی
                        </q-toolbar-title
                        >
                        <div class="flex q-gutter-x-sm items-center">
                          <safa-text
                            v-model="treeFilter"
                            dir="ltr"
                            class="text-right"
                            label="فیلتر"
                          ></safa-text>
                          <btn-default @click="$refs.tree.collapseAll()"
                          >جمع کردن گره ها
                          </btn-default
                          >
                          <btn-default @click="$refs.tree.expandAll()"
                          >باز کردن گره ها
                          </btn-default
                          >
                        </div>
                      </q-toolbar>
                    </div>
                    <div class="custom-scroll fit">
                      <q-tree
                        :filter="treeFilter"
                        ref="tree"
                        default-expand-all
                        selected-color="primary"
                        node-key="nosaziCodeString"
                        :nodes="nosaziCodeTrees"
                        :selected.sync="choosedNosaziCode"
                        @update:selected="selectNodeOnTree"
                        height="100px"
                        min-height="100px"
                        max-height="100%"
                        fit
                      >
                        <template v-slot:default-header="{ node }">
                          <div
                            @dblclick.stop="handleTreeDblClick(node)"
                            @click="
                              $refs.tree.setExpanded(
                                node.key,
                                !$refs.tree.isExpanded(node.key)
                              )
                            "
                            class="flex items-center tree-item"
                          >
                            <q-icon
                              :name="node.icon"
                              size="21px"
                              class="q-ml-sm"
                            />
                            <div class="q-mx-sm">{{ node.label }}</div>
                            <q-btn
                              icon="pageview"
                              class="show-when-hover"
                              size="sm"
                              color="primary"
                              dense
                              round
                              flat
                              title="مشاهده جزئیات"
                              @click="handleTreeDblClick(node)"
                            ></q-btn>
                          </div>
                        </template>
                      </q-tree>
                    </div>
                  </fit>
                </tab-content>

                <tab-content
                  v-for="tab in tabs"
                  :name="tab.name"
                  :key="tab.name"
                  :padding="false"
                >
                  <BaseBlockParvandeh
                    v-if="tab.EumNosaziCodeObjType === 1"
                    v-model="tab.nosaziCodeObject"
                    :parentBaseNosaziCode="baseNosaziCode"
                    :formKey="formKey"
                    :name="name"
                    :title="title"
                  />
                  <USTBaseHouseInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 2"
                    v-model="tab.nosaziCodeObject"
                    :baseNosaziCode="choosedNosaziCodeObj"
                    :mainNosaziCodeInfo="mainNosaziCodeInfo"
                    :formKey="formKey"
                    :name="name"
                    :title="title"
                    :parentBaseNosaziCode="baseNosaziCode"
                    @changeEditMode="changeEditMode"
                  />
                  <BaseBuildingInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 3"
                    v-model="tab.nosaziCodeObject"
                    :baseNosaziCode="choosedNosaziCodeObj"
                    :mainNosaziCodeInfo="mainNosaziCodeInfo"
                    :formKey="formKey"
                    :name="name"
                    :title="title"
                    @changeEditMode="changeEditMode"
                  />
                  <BaseApartmentInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 4"
                    v-model="tab.nosaziCodeObject"
                    :baseNosaziCode="choosedNosaziCodeObj"
                    :mainNosaziCodeInfo="mainNosaziCodeInfo"
                    :formKey="formKey"
                    :name="name"
                    :title="title"
                    :parentBaseNosaziCode="baseNosaziCode"
                    @changeEditMode="changeEditMode"
                  />
                  <BaseHouseSharingInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 5"
                    v-model="tab.nosaziCodeObject"
                    :baseNosaziCode="choosedNosaziCodeObj"
                    :mainNosaziCodeInfo="mainNosaziCodeInfo"
                    :formKey="formKey"
                    :name="name"
                    :title="title"
                    @changeEditMode="changeEditMode"
                  />
                  <BaseShopInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 6"
                    v-model="tab.nosaziCodeObject"
                    :mainNosaziCodeInfo="mainNosaziCodeInfo"
                    :formKey="formKey"
                    :name="name"
                    :title="title"
                    :parentBaseNosaziCode="choosedNosaziCodeObj"
                    @changeEditMode="changeEditMode"
                  />

                  <!--
                  <USTBaseHouseInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 2"
                    v-model="tab.nosaziCodeObject"
                    :formKey="formKey"
                    :title="title"
                    :name="name"
                    vertical
                  />
                  <USTBaseBuildingInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 3"
                    v-model="tab.nosaziCodeObject"
                    :formKey="formKey"
                    :title="title"
                    :name="name"
                  />
                  <USTBaseApartmentInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 4"
                    v-model="tab.nosaziCodeObject"
                    :formKey="formKey"
                    :title="title"
                    :name="name"
                  />
                  <USTBaseHouseSharingInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 5"
                    v-model="tab.nosaziCodeObject"
                    :formKey="formKey"
                    :title="title"
                    :name="name"
                  />
                  <USTBaseShopInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 6"
                    v-model="tab.nosaziCodeObject"
                    :formKey="formKey"
                    :title="title"
                    :name="name"
                  /> -->
                </tab-content>
              </safa-tabs>
            </fit>
          </template>
        </safa-splitter>
        <ArchiveForm
          v-else-if="placeholder === 'archive'"
          v-model="choosedNosaziCodeObj"
          :name="name"
          :title="title"
          :formKey="formKey"
        />
        <Nosazi
          v-else-if="placeholder === 'nosazi'"
          v-model="choosedNosaziCode"
        />
        <USenfiMoreditajmi
          v-else-if="placeholder === 'senfi-tajmi'"
          @showmTajmiContainer="showmTajmiContainer"
          :selectedNosaziCode="choosedNosaziCode"
          :senfiResult="senfiResult"
        />
        <!-- <USenfiMoreditajmi
          v-else-if="placeholder === 'senfi-tajmi'"
          :baseNosaziCode="choosedNosaziCodeObj"
          :formKey="formKey"
          :title="title"
          :name="name"
        /> -->
        <ResposibleForm
          v-else-if="placeholder === 'responsible_form'"
          :baseNosaziCode="choosedNosaziCodeObj"
          :name="name"
          :formKey="formKey"
          :title="title"
        />
        <!-- <ResposibleForm
          v-else-if="placeholder === 'responsible_form'"
          :baseNosaziCode="choosedNosaziCodeObj"
          :formKey="formKey"
          :title="title"
          :name="name"
        /> -->
      </fit>

      <template v-slot:footer v-if="placeholder === 'default'">
        <button-group>
          <btn-default label="آرشیو" @click="archiveHandler"/>
          <btn-default label=" فرم پاسخگو " @click="responsibleHandler"/>
          <btn-default label="نوسازی" @click="nosaziHandler"/>
          <btn-default label="صنفی" @click="senfiHandler"/>
          <btn-default
            label="جستجوی کد نوسازی تجمیع شده"
            @click="showSearchTajmiHistory = true"
          />
          <btn-default
            label="انصراف از تجمیع"
            spId="02c7451f-e73c-4fd0-92c8-8cfbd338f73e"
            spCaption="انصراف از تجمیع"
            @click="showRevokeFromTajmi = true"
          />
        </button-group>
      </template>
    </form-wrapper>

    <safa-popup
      title="انصراف از تجمیع"
      v-model="showRevokeFromTajmi"
      width="500px"
      height="400px"
    >
      <RevokeTajmi
        :name="name"
        :title="title"
        :formKey="formKey"
        @hide="showRevokeFromTajmi = false"
      />
    </safa-popup>

    <safa-popup
      title="جستجوی کد نوسازی تجمیع شده"
      v-model="showSearchTajmiHistory"
      width="500px"
      height="400px"
    >
      <NosaziCodeSearch :name="name" :title="title" :formKey="formKey"/>
    </safa-popup>
  </safa-form>
</template>

<!-- eslint-disable eqeqeq -->
<script>
import USenfiMoreditajmi from './senfi-tajmi/USenfiMoreditajmi.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString, convertStringToNosaziCodeObject, bindNosaziItem } from 'src/utils/nosaziCodeOperation'

import Nosazi from './nosazi/Nosazi.vue'
import NosaziCodeSearch from '../tajmi/search-nosazi-code/NosaziCodeSearch.vue'
import RevokeTajmi from './cancel-tajmi/RevokeTajmi.vue'
import ResposibleForm from './responsible-form/ResposibleForm.vue'
import ArchiveForm from './archive/ArchiveForm.vue'
import USTBaseHouseInfoParvandeh from "./base-house-info-parvandeh/USTBaseHouseInfoParvandeh.vue"
// import USTBaseBuildingInfoParvandeh from "./base-building-info-parvandeh/USTBaseBuildingInfoParvandeh.vue"
// import USTBaseApartmentInfoParvandeh from "./base-apartment-info-parvandeh/USTBaseApartmentInfoParvandeh.vue"
// import USTBaseHouseSharingInfoParvandeh from "./base-house-sharing-info-parvandeh/USTBaseHouseSharingInfoParvandeh.vue"
// import USTBaseShopInfoParvandeh from "./base-shop-info-parvandeh/USTBaseShopInfoParvandeh.vue"
import BaseBlockParvandeh from '../base-block-parvandeh/BaseBlockParvandeh'
// import BaseHouseInfoParvandeh from '../base-house-info-parvandeh/BaseHouseInfoParvandeh.vue'
import BaseBuildingInfoParvandeh from '../base-building-info-parvandeh/BaseBuildingInfoParvandeh.vue'
import BaseApartmentInfoParvandeh from '../base-apartment-info-parvandeh/BaseApartmentInfoParvandeh.vue'
import BaseHouseSharingInfoParvandeh from '../base-house-sharing-info-parvandeh/BaseHouseSharingInfoParvandeh.vue'
import BaseShopInfoParvandeh from '../base-shop-info-parvandeh/BaseShopInfoParvandeh.vue'

const noChooseNosaziCode = 'لطفا یک کد نوسازی از ساختار درختی انتخاب نمایید.'

export default {
  mixins: [baseFormMixin],
  components: {
    USenfiMoreditajmi,
    Nosazi,
    RevokeTajmi,
    NosaziCodeSearch,
    USTBaseHouseInfoParvandeh,
    // USTBaseBuildingInfoParvandeh,
    // USTBaseApartmentInfoParvandeh,
    // USTBaseHouseSharingInfoParvandeh,
    // USTBaseShopInfoParvandeh,
    ResposibleForm,
    ArchiveForm,

    BaseBlockParvandeh,
    // BaseHouseInfoParvandeh,
    BaseBuildingInfoParvandeh,
    BaseApartmentInfoParvandeh,
    BaseHouseSharingInfoParvandeh,
    BaseShopInfoParvandeh
  },
  data () {
    return {
      name: 'Tajmi',
      title: 'تاریخچه تجمیع',
      formKey: '8fa614de-816b-4e88-aa04-bf3dbaf9a6e0',
      main: true,
      sidebarCompatible: true,

      splitterModel: 20,
      tabs: [],
      activeTab: 'tree',
      placeholder: 'default',
      showSearchTajmiHistory: false,
      showRevokeFromTajmi: false,

      treeFilter: '',
      choosedNosaziCode: '',
      getTajmiHistoryListRes: null,

      nosaziForm: false,
      senfiForm: false,
      senfiResult: null,
      senfiResults: {},

      tajmiForm: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nosaziCodeObj: {},
      tajmiHistoryListResult: {
        TajmiHistoryList: []
      },

      selectedCategoryInfo: 0,
      selectedNosaziCodeObject: {},
      nosaziResults: { DutySessionHeaders: [] },
      nosaziResult: null,
      nosaziCodeTrees: [],
      getDeletedNosaziCodeTreeChildRes: null,
      childTree: [],
      treeChildResults: {},

      codeInfoResults: { NidList: [] },
      selectedRow: null,
      mainNosaziCodeInfo: null
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
    }
  },
  methods: {
    fetched (value) {
      this.mainNosaziCodeInfo = value
      this.loadObj()
    },
    async loadObj () {
      try {
        const strNosaziCode = convertNosaziCodeObjectToString(
          this.baseNosaziCode
        )
        this.showLoading()
        const { data } = await this.$services.SC.getTajmiHistoryList(
          { NosaziCodeFrom: null, NosaziCodeTo: strNosaziCode },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.getTajmiHistoryListRes = this.getResponse(data)
        if (this.getTajmiHistoryListRes.success) {
          this.tajmiHistoryListResult = this.getTajmiHistoryListRes.data
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    changePlaceholder (state) {
      this.placeholder = state
      this.$emit('load')
    },

    selectNodeOnTree (nosaziCode) {
      if (parseInt(nosaziCode)) {
        this.choosedNosaziCode = nosaziCode
      }
    },

    handleTreeDblClick (node) {
      const nosaziCode = node.nosaziCodeString
      if (parseInt(nosaziCode)) {
        this.choosedNosaziCode = nosaziCode
        this.addTab(nosaziCode)
        this.activeTab = nosaziCode
      }
    },

    selectedChange (e) {
      this.getDeletedNosaziCodeTreeChild(e.dataItem.CodeFrom)
    },
    async getDeletedNosaziCodeTreeChild (strNosaziCode) {
      try {
        const nosaziCodeObj = convertStringToNosaziCodeObject(strNosaziCode)
        const payload = {
          pNosaziCode: {
            Apartment: nosaziCodeObj.Apartment,
            Block: nosaziCodeObj.Block,
            Building: nosaziCodeObj.Building,
            CI_City: 0,
            District: nosaziCodeObj.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House: nosaziCodeObj.House,
            IsRoot: false,
            NidBase: '00000000-0000-0000-0000-000000000000',
            NidNosaziCode: '00000000-0000-0000-0000-000000000000',
            NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
            NidRevisit: '00000000-0000-0000-0000-000000000000',
            NidUser: '00000000-0000-0000-0000-000000000000',
            Region: nosaziCodeObj.Region,
            Shop: nosaziCodeObj.Shop
          }
        }
        this.showLoading()
        const { data } = await this.$services.SA.getDeletedNosaziCodeTreeChild(
          payload,
          { config: { District: nosaziCodeObj.District } }
        )
        this.getDeletedNosaziCodeTreeChildRes = this.getResponse(data)
        if (this.getDeletedNosaziCodeTreeChildRes.success) {
          this.childTree =
            this.getDeletedNosaziCodeTreeChildRes.data['ChildTree'].map(bindNosaziItem) || []
          const isValid = !!this.childTree.length
          if (isValid) {
            const sortedChildrenTree = this.sortTree(this.childTree)
            const tmpTree = []

            sortedChildrenTree.forEach(item => {
              const isRoot = item.IsRoot || item.EumNosaziCodeObjType == 5

              if (isRoot) {
                tmpTree.push(item)
              }

              const tmpAllChildren = this.sortTree([...this.childTree])

              this.createTreeNodeStructure(item, tmpAllChildren)
            })

            this.nosaziCodeTrees = tmpTree

            // this.nosaziCodeTrees = this.createNosaziCodeTree(this.childTree)
            this.activeTab = 'tree'
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          } else {
            this.showError('کد نوسازی معتبر نمیباشد')
          }
        }
      } catch (e) {
        console.error('getDeletedNosaziCodeTreeChild :>> ', e)
        this.serverError()
      } finally {
        this.hideLoading()
        this.$refs.tree.expandAll()
      }
    },

    // getDutyCalculateHeaders () {
    //   this.showLoading()
    //   this.nosaziForm = true
    //   this.tajmiForm = false
    //   this.$services.SB.getDutyCalculateHeaders({
    //     pNidList: this.codeInfoResults.NidList,
    //     pSysCiDutyType: 1
    //   })
    //     .then(({ data }) => {
    //       this.nosaziResult = this.getResponse(data)
    //       if (this.nosaziResult.success) {
    //         this.nosaziResults = this.nosaziResult.data
    //         const strNosaziCode = convertNosaziCodeObjectToString(
    //           this.baseNosaziCode
    //         )
    //         await this.log({
    //           action: this.logActions.view,
    //           bizCode: strNosaziCode,
    //           bizCodeTitle: "کد نوسازی",
    //           nosaziCode: strNosaziCode
    //         })
    //       }
    //     })
    //     .catch((err) => {
    //       console.error(err)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },
    // getDeletedCodeInfo () {
    //   if (this.selectedRow !== null) {
    //     this.showLoading()
    //     this.nosaziForm = true
    //     this.tajmiForm = false
    //     let nosaziCode = convertStringToNosaziCodeObject(
    //       this.selectedRow.CodeFrom
    //     )
    //     const payload = {
    //       pDistrict: nosaziCode.District,
    //       pRegion: nosaziCode.Region,
    //       pBlock: nosaziCode.Block,
    //       pHouse: nosaziCode.House,
    //       pBuilding: nosaziCode.Building,
    //       pApartment: nosaziCode.Apartment,
    //       pShop: nosaziCode.Shop,
    //       pDutyType: 1,
    //       pEumNosaziCodeGroup: 0,
    //       pEumBaseInfoGroup: 0
    //     }
    //     this.$services.SB.getDeletedCodeInfo(payload)
    //       .then(({ data }) => {
    //         this.codeInfoResult = this.getResponse(data)
    //         if (this.codeInfoResult.success) {
    //           this.codeInfoResults = this.codeInfoResult.data
    //           const strNosaziCode = convertNosaziCodeObjectToString(
    //             this.baseNosaziCode
    //           )
    //           await this.log({
    //             action: this.logActions.view,
    //             bizCode: strNosaziCode,
    //             bizCodeTitle: "کد نوسازی",
    //             nosaziCode: strNosaziCode
    //           })
    //           this.getDutyCalculateHeaders()
    //         }
    //       })
    //       .catch((err) => {
    //         console.error(err)
    //         this.serverError()
    //       })
    //       .finally(() => {
    //         this.hideLoading()
    //       })
    //   } else {
    //     this.showError("لطفا یک ردیف از گرید انتخاب نمایید.")
    //   }
    // },
    // senfi () {
    //   if (this.selectedRow !== null) {
    //     this.senfiForm = true
    //     const payload = {
    //       pDistrict: this.nosaziCodeObj.District,
    //       pRegion: this.nosaziCodeObj.Region,
    //       pBlock: this.nosaziCodeObj.Block,
    //       pHouse: this.nosaziCodeObj.House,
    //       pBuilding: this.nosaziCodeObj.Building,
    //       pApartment: this.nosaziCodeObj.Apartment,
    //       pShop: this.nosaziCodeObj.Shop
    //     }
    //     //  pDutyType: 'Job',
    //     //  pEumNosaziCodeGroup: 'Parvande',
    //     //   pEumBaseInfoGroup: 'Parvande',
    //     //   pLoadAllJobs: false,
    //     //   pIsLoadDeletedNosaziCode: false
    //     this.$services.SB.getShopCodeInfo(payload)
    //       .then(({ data }) => {
    //         this.senfiResult = this.getResponse(data)
    //         if (this.senfiResult.success) {
    //           this.senfiResults = this.senfiResult.data
    //           const strNosaziCode = convertNosaziCodeObjectToString(
    //             this.baseNosaziCode
    //           )
    //           await this.log({
    //             action: this.logActions.view,
    //             bizCode: strNosaziCode,
    //             bizCodeTitle: "کد نوسازی",
    //             nosaziCode: strNosaziCode
    //           })
    //         }
    //       })
    //       .catch((err) => {
    //         console.error(err)
    //         this.serverError()
    //       })
    //       .finally(() => {
    //         this.hideLoading()
    //       })
    //   } else {
    //     this.showError("لطفا یک ردیف از گرید انتخاب نمایید.")
    //   }
    // },
    changeEditMode (value) {
      this.isEditable = value
    },
    addTab () {
      // handleNosaziCodeSelected
      this.selectedNosaziCodeObject = this.getNodeByKey(this.choosedNosaziCode)
      if (!this.tabs.some((x) => x.name === this.choosedNosaziCode)) {
        this.tabs.push({
          name: this.choosedNosaziCode,
          label: `${this.choosedNosaziCode} - ${this.selectedNosaziCodeObject.name}`,
          EumNosaziCodeObjType:
          this.selectedNosaziCodeObject.EumNosaziCodeObjType,
          nosaziCodeObject: this.selectedNosaziCodeObject
        })
      }
      this.activeTab = this.choosedNosaziCode
    },

    handleNosaziCodeTabClosed (tabName) {
      this.activeTab = 'tree'
      this.tabs = this.tabs.filter((x) => x.name !== tabName)
    },
    getNodeByKey (key) {
      return this.$refs.tree && this.$refs.tree.getNodeByKey(key)
    },
    showmTajmiContainer (val) {
      if (!val) {
        this.senfiForm = false
      }
    },
    rowClick (dataItem) {
      this.nosaziCodeObj = convertStringToNosaziCodeObject(dataItem.CodeFrom)
      this.selectedRow = dataItem
    },

    archiveHandler () {
      if (this.choosedNosaziCodeObj.District === 0) {
        return this.showError(noChooseNosaziCode)
      } else {
        this.placeholder = 'archive'
      }
    },
    responsibleHandler () {
      if (this.choosedNosaziCodeObj.District === 0) {
        return this.showError(noChooseNosaziCode)
      } else {
        this.placeholder = 'responsible_form'
      }
    },
    nosaziHandler () {
      if (this.choosedNosaziCodeObj.District === 0) {
        return this.showError(noChooseNosaziCode)
      } else {
        this.placeholder = 'nosazi'
      }
    },
    senfiHandler () {
      if (this.choosedNosaziCodeObj.District === 0) {
        return this.showError(noChooseNosaziCode)
      } else {
        this.placeholder = 'senfi-tajmi'
      }
    },

    sortTree (tree) {
      return tree.sort((a, b) => {
        if (a.IsRoot === b.IsRoot) {
          if (a.House !== b.House) return a.House - b.House
          if (a.Building !== b.Building) return a.Building - b.Building
          if (a.Apartment !== b.Apartment) return a.Apartment - b.Apartment
          return a.Shop - b.Shop
        }

        return a.IsRoot ? -1 : 1
      })
    },

    createTreeNodeStructure (currentNode, allTreeNodes) {
      try {
        let tmpChildren
        const tmpNosaziCodeType = currentNode
        allTreeNodes = allTreeNodes.filter(a => a.NidBase !== tmpNosaziCodeType.NidBase)

        switch (tmpNosaziCodeType.EumNosaziCodeObjType) {
          case 1:
            tmpChildren = allTreeNodes.filter(a =>
              (a.House > 0 && a.Building == 0 && a.Apartment == 0 && a.Shop == 0) ||
                    (a.House == 0 && a.Building == 0 && a.Apartment == 0 && a.Shop > 0))
            break

          case 2:
            tmpChildren = allTreeNodes.filter(a =>
              (a.House == tmpNosaziCodeType.House && a.Building > 0 && a.Apartment == 0 && a.Shop == 0) ||
                    (a.House == tmpNosaziCodeType.House && a.Building == 0 && a.Apartment == 0 && a.Shop > 0))
            break

          case 3:
            tmpChildren = allTreeNodes.filter(a =>
              (a.House == tmpNosaziCodeType.House && a.Building == tmpNosaziCodeType.Building && a.Apartment > 0 && a.Shop == 0) ||
                    (a.House == tmpNosaziCodeType.House && a.Building == tmpNosaziCodeType.Building && a.Apartment == 0 && a.Shop > 0))
            break

          case 4:
            tmpChildren = allTreeNodes.filter(a =>
              a.House == tmpNosaziCodeType.House && a.Building == tmpNosaziCodeType.Building && a.Apartment == tmpNosaziCodeType.Apartment && a.Shop > 0)
            break

          case 5:
            tmpChildren = allTreeNodes.filter(a =>
              (a.House == tmpNosaziCodeType.House && a.Building == tmpNosaziCodeType.Building && a.Apartment > 0 && a.Shop == 0) ||
                    (a.House == tmpNosaziCodeType.House && a.Building == tmpNosaziCodeType.Building && a.Apartment == 0 && a.Shop > 0))
            break

          default:
            tmpChildren = null
            break
        }

        if (tmpChildren && tmpChildren.length > 0) {
          tmpChildren.forEach(item => {
            const tmpCodeInfo = {
              ...item,
              children: []
            }

            if (!currentNode.children) currentNode.children = []

            currentNode.children.push(tmpCodeInfo)
            this.createTreeNodeStructure(tmpCodeInfo, allTreeNodes)
          })
        }
      } catch (ex) {
        console.error(ex)
      }
    }
  },

  watch: {
    activeTab () {
      if (this.activeTab === 'tree') {
        this.choosedNosaziCode = ''
      } else {
        this.choosedNosaziCode = this.activeTab
      }
    },
    selectedCategoryInfo () {
      this.getTajmiHistoryList()
    }
  },
  computed: {
    choosedNosaziCodeObj () {
      if (this.choosedNosaziCode === '' || this.choosedNosaziCode === null) {
        return convertStringToNosaziCodeObject('0-0-0-0-0-0-0')
      }
      if (this.activeTab !== 'tree') {
        return convertStringToNosaziCodeObject(this.activeTab)
      }
      return convertStringToNosaziCodeObject(this.choosedNosaziCode)
    },
    isShowBaseInfoGroupCombo () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').isShowBaseInfoGroupCombo
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').infoGroupOptions
    },
    currentTitle () {
      switch (this.placeholder) {
        case 'archive':
          return 'آرشیو الکترونیکی'
        case 'responsible_form':
          return 'فرم پاسخگو'
        case 'nosazi':
          return 'نوسازی'
        case 'senfi-tajmi':
          return 'صنفی'
        default:
          return 'تاریخچه تجمیع'
      }
    }
  }
}
</script>
