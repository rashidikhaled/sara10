<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      :title="currentTitle"
      :padding="false"
    >
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          :enabled="enabled"
        />

        <safa-status :result="result"/>
        <!-- <q-btn
          flat
          @click="changePlaceholder('default')"
          v-if="placeholder != 'default'"
        >
          بازگشت&nbsp;
          <q-icon name="keyboard_arrow_left" />
        </q-btn> -->

      </template>
      <div class="backButton">
        <q-btn
          flat
          @click="changePlaceholder('default')"
          v-if="placeholder != 'default'"
        >
          بازگشت&nbsp;
          <q-icon name="keyboard_arrow_left"/>
        </q-btn>
      </div>
      <fit v-if="placeholder === 'default'">
        <safa-splitter
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
                class="q-py-sm q-pl-sm"
              >
              </safa-combo>
              <safa-datatable
                @selectedChange="selectedChange"
                v-model="results.TajmiHistoryList"
                ref="grid2"
                helper="tajmi"
                height="100%"
                min-height="100px"
                max-height="100%"
                title="لیست کد های مبدأ"
                @click="click"
                fit
                class="q-pl-sm"
              >
              </safa-datatable>
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-tabs v-model="currentTab">
                <template v-slot:tabs>
                  <tab-menu
                    v-for="{ name, label, persist } in tabs"
                    :key="name"
                    :name="name"
                    :label="label"
                  >
                    <btn-default
                      v-if="!persist"
                      flat
                      round
                      icon="close"
                      size="sm"
                      @click="handleNosaziCodeTabClosed(name)"
                    />
                  </tab-menu>
                </template>
                <tab-content name="tree">
                  <q-tree
                    ref="tree"
                    default-expand-all
                    selected-color="primary"
                    node-key="nosaziCodeString"
                    :nodes="nosaziCodeTrees"
                    :selected.sync="selectedNosaziCode"
                    @update:selected="handleNosaziCodeSelected"
                    height="100px"
                    min-height="100px"
                    max-height="100%"
                    fit
                  >
                  </q-tree>
                </tab-content>

                <tab-content
                  v-for="tab in tabs"
                  :name="tab.name"
                  :key="tab.name"
                  :padding="false"
                >
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
                    vertical
                  />
                  <USTBaseApartmentInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 4"
                    v-model="tab.nosaziCodeObject"
                    :formKey="formKey"
                    :title="title"
                    :name="name"
                    vertical
                  />
                  <USTBaseHouseSharingInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 5"
                    v-model="tab.nosaziCodeObject"
                    :formKey="formKey"
                    :title="title"
                    :name="name"
                    vertical
                  />
                  <USTBaseShopInfoParvandeh
                    v-if="tab.EumNosaziCodeObjType === 6"
                    v-model="tab.nosaziCodeObject"
                    :formKey="formKey"
                    :title="title"
                    :name="name"
                    vertical
                  />
                </tab-content>
              </safa-tabs>
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <div v-else-if="placeholder === 'archive'">
        <ArchiveForm
          fit
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </div>
      <fit v-else-if="placeholder === 'responsible_form'">
        <ResposibleForm
          :baseNosaziCode="selectedNosaiCode"
          :formKey="formKey"
          :title="title"
          :name="name"
          min-height="100px"
          height="100%"
          max-height="100%"
        />
      </fit>
      <template
        v-slot:footer
        v-if="placeholder === 'default'"
      >
        <button-group>
          <btn-default
            class="btn-default"
            label="آرشیو"
            @click="placeholder = 'archive'"
          ></btn-default>
          <btn-default
            class="btn-default"
            label=" فرم پاسخگو "
            @click="placeholder = 'responsible_form'"
          ></btn-default>
          <btn-default
            class="btn-default"
            @click="getDeletedCodeInfo"
            label="نوسازی"
          ></btn-default>
          <btn-default
            class="btn-default"
            @click="senfi"
            label="صنفی"
          ></btn-default>
          <btn-default
            class="btn-search"
            @click="searchNosaziCode"
            label="جستجوی کد نوسازی تجمیع شده"
          ></btn-default>
          <btn-default
            class="btn-cancel"
            @click="revoke"
            label="انصراف از تجمیع"
            spId="02c7451f-e73c-4fd0-92c8-8cfbd338f73e"
            spCaption="انصراف از تجمیع"
          />
        </button-group>
      </template>
    </form-wrapper>
    <ShowModal
      v-model="revokeTajmi"
      title="فرم انصراف از تجمیع"
      vertical
    >
      <TajmiBasedOnRequestRevoke
        @showmTajmiContainer="showmTajmiContainer"
        :formKey="formKey"
        :title="title"
        :name="name"
        ref="revokeTajmi"
      />
      <template v-slot:footer>
        <btn-default
          label="انصراف از تجمیع"
          @click="cancel"
        />
      </template>
    </ShowModal>
    <ShowModal
      v-model="searchTajmiNosaziCode"
      title="جستجوی کد نوسازی تجمیع شده"
      vertical
    >
      <TajmiBasedOnRequestNosaziCodeSearch
        @showmTajmiContainer="showmTajmiContainer"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </ShowModal>
    <ShowModal
      :padding="false"
      v-model="nosaziForm"
      title="عوارض نوسازی"
      vertical
    >
      <TajmiBasedOnRequestNosazi
        :nosaziResult="nosaziResults"
        :selectedNosaziCode="selectedNosaziCode"
        :nosaziResults="results"
        :codeInfoResults="codeInfoResults"
        @showmTajmiContainer="showmTajmiContainer"
        :selectedNosaiCode="selectedNosaiCode"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </ShowModal>
    <ShowModal
      :padding="false"
      v-model="senfiForm"
      title="عوارض صنفی"
      vertical
    >
      <TajmiBasedOnRequestSenfi
        @showmTajmiContainer="showmTajmiContainer"
        :senfiResult="senfiResult"
        :selectedNosaiCode="selectedNosaiCode"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </ShowModal>
  </safa-form>
</template>
<script>
import TajmiBasedOnRequestNosazi from '../tajmi-based-request/nosazi/TajmiBasedOnRequestNosazi.vue'
import TajmiBasedOnRequestNosaziCodeSearch from './search-nosazi-code/TajmiBasedOnRequestNosaziCodeSearch.vue'
import TajmiBasedOnRequestRevoke from '../tajmi-based-request/cancel-tajmi/TajmiBasedOnRequestRevoke.vue'

import USTBaseHouseInfoParvandeh from './base-house-info-parvandeh/USTBaseHouseInfoParvandeh.vue'
import USTBaseBuildingInfoParvandeh from './base-building-info-parvandeh/USTBaseBuildingInfoParvandeh.vue'
import USTBaseApartmentInfoParvandeh from './base-apartment-info-parvandeh/USTBaseApartmentInfoParvandeh.vue'
import USTBaseHouseSharingInfoParvandeh from './base-house-sharing-info-parvandeh/USTBaseHouseSharingInfoParvandeh.vue'
import USTBaseShopInfoParvandeh from './base-shop-info-parvandeh/USTBaseShopInfoParvandeh.vue'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import TajmiBasedOnRequestSenfi from './senfi/TajmiBasedOnRequestSenfi.vue'
import ResposibleForm from './responsible-form/ResposibleForm.vue'
import ArchiveForm from './archive/ArchiveForm.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/tajmi-request',
  mixins: [baseFormMixin],
  components: {
    TajmiBasedOnRequestSenfi,
    TajmiBasedOnRequestNosazi,
    TajmiBasedOnRequestRevoke,
    TajmiBasedOnRequestNosaziCodeSearch,
    USTBaseHouseInfoParvandeh,
    USTBaseBuildingInfoParvandeh,
    USTBaseApartmentInfoParvandeh,
    USTBaseHouseSharingInfoParvandeh,
    USTBaseShopInfoParvandeh,
    ResposibleForm,
    ArchiveForm
  },
  data: function () {
    return {
      title: 'شهرسازی- تاریخچه تجمیع',
      formKey: '8fa614de-816b-4e88-aa04-bf3dbaf9a6e0',
      name: 'TajmiBasedOnRequest',
      main: true,
      splitterModel: 30,
      nosaziCodeStr: '',
      result: null,
      nosaziForm: false,
      senfiForm: false,
      senfiResult: null,
      revokeTajmi: false,
      tmpCodeGroup: 0,
      senfiResults: {},
      searchTajmiNosaziCode: false,
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
      results: {
        TajmiHistoryList: []
      },
      categoryInfo: [
        {
          ID: '0',
          Title: 'اطلاعات پرونده'
        },
        {
          ID: '1',
          Title: 'نوسازی'
        }
      ],
      selectedCategoryInfo: 'اطلاعات پرونده',
      selectedNosaziCode: '',
      selectedNosaziCodeObject: {},
      selectedNosaiCode: {},
      nosaziResults: {
        DutySessionHeaders: []
      },
      nosaziResult: null,
      nosaziCodeTrees: [],
      treeChildResult: null,
      treeChildResults: {},

      tabs: [
        {
          name: 'tree',
          label: 'ساختار درختی',
          persist: true
        }
      ],
      currentTab: 'tree',
      codeInfoResults: { NidList: [] },
      selectedRow: null,
      showResponsibleForm: false,
      showArchiveForm: false,
      placeholder: 'default'
    }
  },
  computed: {
    isShowBaseInfoGroupCombo () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo')
        .isShowBaseInfoGroupComboForTajmiBasedOnRequest
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').infoGroupOptions
    },
    mode: function () {
      return this.isEditable ? 'e' : 'r'
    },
    currentTitle () {
      switch (this.placeholder) {
        case 'archive':
          return 'آرشیو الکترونیکی'
        case 'responsible_form':
          return 'فرم پاسخگو'
        default:
          return 'تاریخچه تجمیع بر اساس درخواست'
      }
    }
  },
  props: {
    enabled: {
      type: String,
      default: '0-0-0-0-0-0-0'
    }
  },
  methods: {
    async getSettingData () {
      try {
        const getSettingDataResult = await this.loadFormSetting("Sharsazi-PersonalSetting")
        if (getSettingDataResult.PersonalSettingNosazi.ChkCalculateNosazi) {
          this.tmpCodeGroup = 1 // Momayezi
        } else {
          this.tmpCodeGroup = 0 // Parvande
        }
      } catch (error) {
        console.log(error)
      }
    },
    changePlaceholder (state) {
      this.placeholder = state
      this.$emit('load')
    },
    selectedChange (e) {
      this.selectedNosaziCode = e.dataItem
      let data = {
        pNosaziCode: convertStringToNosaziCodeObject(
          this.selectedNosaziCode.CodeFrom
        )
      }

      this.$services.SA.getDeletedNosaziCodeTreeChild(data)
        .then(({ data }) => {
          this.treeChildResult = this.getResponse(data)

          if (this.treeChildResult.success) {
            this.treeChildResults = this.treeChildResult.data
            this.nosaziCodeTrees = this.createNosaziCodeTree(
              this.treeChildResults.ChildTree
            )
            // this.$refs.tree.expandAll()
          }
        })
        .catch((response) => {
          this.treeChildResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
          this.$refs.tree.expandAll()
        })
    },
    handleBaseNosaziCodeMounted () {
      let data = {
        NosaziCodeTo:
          this.baseNosaziCode.District +
          '-' +
          this.baseNosaziCode.Region +
          '-' +
          this.baseNosaziCode.Block +
          '-' +
          this.baseNosaziCode.House +
          '-' +
          this.baseNosaziCode.Building +
          '-' +
          this.baseNosaziCode.Apartment +
          '-' +
          this.baseNosaziCode.Shop
      }
      this.showLoading()
      this.$services.SC.getTajmiHistoryList(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
        .catch((response) => {
          this.result = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getDutyCalculateHeaders () {
      this.showLoading()
      this.nosaziForm = true
      this.tajmiForm = false
      let data = {
        pNidList: this.codeInfoResults.NidList,
        pSysCiDutyType: 1
      }
      this.$services.SB.getDutyCalculateHeaders(data)
        .then(async ({ data }) => {
          this.nosaziResult = this.getResponse(data)

          if (this.nosaziResult.success) {
            this.nosaziResults = this.nosaziResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
        .catch((response) => {
          this.nosaziResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getDeletedCodeInfo () {
      if (this.selectedRow !== null) {
        this.showLoading()
        this.nosaziForm = true
        this.tajmiForm = false
        let nosaziCode = convertStringToNosaziCodeObject(
          this.results.TajmiHistoryList[0].CodeFrom
        )
        let data = {
          pDistrict: nosaziCode.District,
          pRegion: nosaziCode.Region,
          pBlock: nosaziCode.Block,
          pHouse: nosaziCode.House,
          pBuilding: nosaziCode.Building,
          pApartment: nosaziCode.Apartment,
          pShop: nosaziCode.Shop,
          pDutyType: 1,
          pEumNosaziCodeGroup: this.tmpCodeGroup,
          pEumBaseInfoGroup: 0
        }
        this.$services.SB.getDeletedCodeInfo(data)
          .then(async ({ data }) => {
            this.codeInfoResult = this.getResponse(data)

            if (this.codeInfoResult.success) {
              this.codeInfoResults = this.codeInfoResult.data
              this.getDutyCalculateHeaders()

              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.BizCode,
                bizCodeTitle: 'کد نوسازی'
              })
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showError('لطفا یک ردیف از گرید انتخاب نمایید.')
      }
    },
    senfi () {
      if (this.selectedRow !== null) {
        this.senfiForm = true
        this.tajmiForm = false
        this.nosaziForm = false
        let data = {
          pDistrict: this.selectedNosaiCode.District,
          pRegion: this.selectedNosaiCode.Region,
          pBlock: this.selectedNosaiCode.Block,
          pHouse: this.selectedNosaiCode.House,
          pBuilding: this.selectedNosaiCode.Building,
          pApartment: this.selectedNosaiCode.Apartment,
          pShop: this.selectedNosaiCode.Shop
        }
        //  pDutyType: 'Job',
        //  pEumNosaziCodeGroup: 'Parvande',
        //   pEumBaseInfoGroup: 'Parvande',
        //   pLoadAllJobs: false,
        //   pIsLoadDeletedNosaziCode: false
        this.$services.SB.getShopCodeInfo(data)
          .then(async ({ data }) => {
            this.senfiResult = this.getResponse(data)

            if (this.senfiResult.success) {
              this.senfiResults = this.senfiResult.data

              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.BizCode,
                bizCodeTitle: 'کد نوسازی'
              })
            }
          })
          .catch((response) => {
            this.senfiResult = this.getResponse(response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showError('لطفا یک ردیف از گرید انتخاب نمایید.')
      }
    },
    searchNosaziCode () {
      this.searchTajmiNosaziCode = true
      this.tajmiForm = false
    },
    handleNosaziCodeSelected () {
      // console.log('selectedNosaziCode', this.selectedNosaziCode)
      this.selectedNosaziCodeObject = this.getNodeByKey(
        this.selectedNosaziCode
      )

      if (!this.tabs.some((x) => x.name === this.selectedNosaziCode)) {
        this.tabs.push({
          name: this.selectedNosaziCode,
          label:
            this.selectedNosaziCodeObject.name +
            ' ' +
            this.selectedNosaziCode.split('').reverse().join(''),
          EumNosaziCodeObjType:
          this.selectedNosaziCodeObject.EumNosaziCodeObjType,
          nosaziCodeObject: this.selectedNosaziCodeObject
        })
      }
      this.currentTab = this.selectedNosaziCode
    },

    handleNosaziCodeTabClosed (tabName) {
      this.tabs = this.tabs.filter((x) => x.name !== tabName)
    },
    getNodeByKey (key) {
      return this.$refs.tree && this.$refs.tree.getNodeByKey(key)
    },
    showmTajmiContainer (val) {
      if (!val) {
        this.tajmiForm = true
        this.nosaziForm = false
        this.searchTajmiNosaziCode = false
        this.revokeTajmi = false
        this.senfiForm = false
      }
    },
    revoke () {
      this.revokeTajmi = true
      this.tajmiForm = false
    },
    click (event, dataItem, target) {
      this.selectedNosaiCode = convertStringToNosaziCodeObject(
        dataItem.CodeFrom
      )
      this.selectedRow = dataItem
    },
    cancel () {
      this.$refs.revokeTajmi.revoke()
    }
  },
  created () {
    this.getSettingData()
  },
  mounted () {
    if (this.selectedRequest === null) {
      this.showError('لطفا ابتدا یک رکورد از کارتابل انتخاب نمایید.')
    }
    this.baseNosaziCode = convertStringToNosaziCodeObject(
      this.selectedRequest.BizCode
    )
    this.handleBaseNosaziCodeMounted()
  }
}
</script>
<style scoped>
.backButton {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
