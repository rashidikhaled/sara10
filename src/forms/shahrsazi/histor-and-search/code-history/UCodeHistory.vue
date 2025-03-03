<template>
  <!-- <section id="main-form"> -->
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :has-footer="false" :title="title" :padding="false">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetched"
          cdcName="baseNosaziCode"
          ref="nosaziCode"
        />
        <safa-status :result="allFichseResult" />
        <!-- <safa-status :result="incomeDetailsResult"/> -->
      </template>
      <fit>
        <!-- <FormRow class="q-pa-sm">
          <FormControl>
            <safa-checkbox
              v-model="isLoadDeletedNosaziCode"
              label="نمایش کدهای حذف شده"
              cdcName="isLoadDeletedNosaziCode"
            />
          </FormControl>
        </FormRow> -->

        <button-group height="60px" class="q-pa-sm">
          <template>
            <ribbon-button
              :key="index"
              :label="tab.label"
              @click="activeTab = tab.name"
              class="form-button"
              v-for="(tab, index) in tabsDef"
            >
              <template #icon>
                <q-icon
                  color="primary"
                  size="20px"
                  style="transform: scaleX(-1); -ms-transform: scaleX(-1)"
                >
                  <svg
                    height="300px"
                    viewBox="0 0 64 64"
                    width="300px"
                    x="0px"
                    xmlns="http://www.w3.org/2000/svg"
                    y="0px"
                  >
                    <g data-name="Page Layout">
                      <path
                        d="M57,7H7a5,5,0,0,0-5,5V52a5,5,0,0,0,5,5H57a5,5,0,0,0,5-5V12A5,5,0,0,0,57,7ZM29,12a2,2,0,1,1-2,2A2,2,0,0,1,29,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,20,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,11,12ZM60,52a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V20H60Z"
                      />
                      <rect height="14" rx="1" ry="1" width="14" x="8" y="37" />
                      <rect height="10" rx="1" ry="1" width="48" x="8" y="25" />
                      <rect
                        height="14"
                        rx="1"
                        ry="1"
                        width="32"
                        x="24"
                        y="37"
                      />
                    </g>
                  </svg>
                </q-icon>
              </template>
            </ribbon-button>
          </template>
        </button-group>

        <q-separator class="q-mb-sm" />

        <section class="row full-height">
          <div class="col-auto full-height" style="min-width: 30px">
            <btn-verticals>
              <btn-vertical
                label="ساختار درختی"
                :active="activeTab === 'tree_tab'"
                @click="activeTab = 'tree_tab'"
              />
              <div style="min-width: 30px">
                <q-separator class="q-mx-sm" />
              </div>
              <btn-vertical
                v-for="tab in tabs"
                :key="tab.name"
                :label="tab.label"
                :active="activeTab === tab.name"
                @click="activeTab = tab.name"
                v-show="tab.name === activeTab"
              />
            </btn-verticals>
          </div>
          <div style="min-width: 1px">
            <q-separator class="full-height" vertical />
          </div>
          <div class="col custom-scroll q-px-sm q-pb-sm" style="min-height: 0">
            <fit v-show="activeTab === 'tree_tab'">
              <div>
                <q-toolbar
                  :class="[
                    'items-center q-px-sm q-py-xs',
                    $q.dark.isActive ? 'bg-dark' : 'bg-grey-3',
                  ]"
                  style="min-height: 34px; border-radius: 3px"
                >
                  <q-toolbar-title class="text-body2"
                    >ساختار درختی
                  </q-toolbar-title>
                  <div class="flex q-gutter-x-sm items-center">
                    <safa-text
                      v-model="treeFilter"
                      dir="ltr"
                      class="text-right"
                      label="فیلتر"
                      autocomplete="off"
                    />
                    <btn-default
                      label="جمع کردن گره ها"
                      @click="$refs.tree.collapseAll()"
                    />
                    <btn-default
                      label="باز کردن گره ها"
                      @click="$refs.tree.expandAll()"
                    />
                  </div>
                </q-toolbar>
              </div>
              <q-tree
                :filter="treeFilter"
                :nodes="nosaziCodeTrees"
                class="bordered"
                default-expand-all
                label-key="label"
                accordion
                node-key="nosaziCodeString"
                :duration="0"
                ref="tree"
                selected-color="primary"
                fit
              >
                <template v-slot:default-header="{ node }">
                  <div class="flex items-center tree-item">
                    <q-icon :name="node.icon" size="21px" class="q-ml-sm" />
                    <div
                      class="q-mx-sm cursor-pointer"
                      @click="selectedNosaziCodeChanged(node)"
                    >
                      {{ node.label }}
                    </div>
                    <q-btn
                      icon="pageview"
                      class="show-when-hover"
                      size="sm"
                      color="primary"
                      dense
                      round
                      flat
                      title="مشاهده جزئیات"
                      @click="showDetailOfNosazoCodeOnTree(node)"
                    ></q-btn>
                  </div>
                </template>
              </q-tree>
            </fit>
            <fit v-show="activeTab === 'requestsList'" :bordered="false">
              <RequestsList
                fit
                v-model="responserKartable"
                :baseNosaziCode="baseNosaziCode"
                :selectNosaziCode="selectNosaziCode"
                :formKey="formKey"
                :name="name"
                :title="title"
                @afterLoadResponserKartabl="afterLoadResponserKartabl"
                @selectRequestFromRequestList="selectRequestFromRequestList"
                ref="requestsList"
              />
            </fit>
            <fit v-show="activeTab === 'outputList'">
              <OutputList v-model="outputResult" ref="outputList" />
            </fit>
            <fit v-show="activeTab === 'commissionList'">
              <CommissionList
                fit
                v-model="commissionListInNosaziCode"
                :baseNosaziCode="baseNosaziCode"
                :formKey="formKey"
                :name="name"
                :title="title"
                ref="commissionList"
              />
            </fit>
            <fit v-show="activeTab === 'archives'">
              <div class="fit">
                <ArchiveWrap
                  :name="archiveConfig.username"
                  :pass="archiveConfig.password"
                  :options="archiveOptions"
                  :biz-code="archiveBizCode"
                />
              </div>
            </fit>
            <fit v-show="activeTab === 'dutyFicheNosazi'">
              <DutyFichesNosazi
                fit
                v-model="baseLibInNosaziCode.MainObj"
                :baseNosaziCode="baseNosaziCode"
                :formKey="formKey"
                :title="title"
                ref="dutyFicheNosazi"
                @changeTreeTab="activeTab = 'tree_tab'"
              />
            </fit>
            <fit v-show="activeTab === 'dutyFicheSenfi'">
              <DutyFichesSenfi
                fit
                v-model="baseLibInNosaziCode.MainObj"
                :baseNosaziCode="baseNosaziCode"
                :formKey="formKey"
                :name="name"
                :title="title"
                ref="dutyFicheSenfi"
                @changeTreeTab="activeTab = 'tree_tab'"
              />
            </fit>
            <fit v-show="activeTab === 'fishList'">
              <UFishList
                fit
                v-model="allFiches"
                @reload="reloadAllFiches"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </div>
        </section>
      </fit>

      <safa-popup
        v-model="showParvandehInfo"
        title="جزئیات فرم"
        width="900px"
        height="700px"
        :padding="false"
      >
        <component
          :is="formName"
          v-model="selectNosaziCode"
          :name="name"
          :baseNosaziCode="baseNosaziCode"
          :parentBaseNosaziCode="baseNosaziCode"
          :forceReadonly="true"
          :isSelectFromResponder="true"
          :showEditButton="false"
          :isSelectFromGardeshParvandeh="true"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseLibInNosaziCodeModel from "./models/baseLibInNosaziCode"

import BaseBlockParvandeh from "./../../tashkil-parvandeh/base-block-parvandeh/BaseBlockParvandeh.vue"
import BaseHouseInfoParvandeh from "./../../tashkil-parvandeh/base-house-info-parvandeh/BaseHouseInfoParvandeh.vue"
import BaseBuildingInfoParvandeh from "./../../tashkil-parvandeh/base-building-info-parvandeh/BaseBuildingInfoParvandeh.vue"
import BaseApartmentInfoParvandeh from "./../../tashkil-parvandeh/base-apartment-info-parvandeh/BaseApartmentInfoParvandeh.vue"
import BaseHouseSharingInfoParvandeh from "./../../tashkil-parvandeh/base-house-sharing-info-parvandeh/BaseHouseSharingInfoParvandeh.vue"
import BaseShopInfoParvandeh from "./../../tashkil-parvandeh/base-shop-info-parvandeh/BaseShopInfoParvandeh.vue"
import UFishList from "./partials/UFishList"
import RequestsList from "./partials/RequestsList"
import OutputList from "./partials/OutputList"
import CommissionList from "./partials/CommissionList"
import DutyFichesNosazi from "./partials/DutyFichesNosazi"
import DutyFichesSenfi from "./partials/DutyFichesSenfi"
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin"
import TabActions from "./partials/TabActions"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"

export default {
  route: "/history-and-search/nosazi-code",
  mixins: [baseFormMixin, messageMixin, loaderMixin],
  components: {
    DutyFichesSenfi,
    DutyFichesNosazi,
    CommissionList,
    OutputList,
    RequestsList,
    TabActions,
    UFishList,
    BaseBlockParvandeh,
    BaseHouseInfoParvandeh,
    BaseBuildingInfoParvandeh,
    BaseApartmentInfoParvandeh,
    BaseHouseSharingInfoParvandeh,
    BaseShopInfoParvandeh
  },

  data () {
    return {
      title: "بازبینی پرونده",
      formKey: "ef0d6a09-ea68-40b2-b3d0-9036ef543e3e",
      name: "UCodeHistory",
      main: true,
      sidebarCompatible: true,
      selectedRow: null,
      nidNosaziCode: "00000000-0000-0000-0000-000000000000",

      formName: "BaseBlockParvandeh",
      skip: 0,
      take: 10,
      perPage: 10,
      page: 1,
      showParvandehInfo: false,
      activeTab: "tree_tab",
      treeFilter: "",
      tabsDef: [
        // {
        //   name: "tree_tab",
        //   label: "ساختار درختی"
        // },
        {
          name: "requestsList",
          label: "لیست درخواست ها"
        },
        {
          name: "outputList",
          label: "لیست گواهی ها"
        },
        {
          name: "commissionList",
          label: "لیست کمیسیون ها"
        },
        {
          name: "archives",
          label: "آرشیو الکترونیکی"
        },
        {
          name: "dutyFicheNosazi",
          label: "فیش های نوسازی"
        },
        {
          name: "dutyFicheSenfi",
          label: "فیش های صنفی"
        },
        {
          name: "fishList",
          label: "فیش های درآمدی"
        }
      ],

      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      selectNosaziCode: null,
      isLoadDeletedNosaziCode: false,
      baseLibInNosaziCode: { ...baseLibInNosaziCodeModel },
      nosaziCodeTrees: [],
      responserKartable: [],
      allFiches: [],
      allFichseResult: null,
      allFichseResults: { All_Fiche: [], All_FicheByIncomeList: [] },
      selectedRequestFromRequestList: null,
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      archiveBizCode: "",
      archiveOptions: {
        showToolbar: false
      },

      // #region response
      outputResult: {
        // outputList response
        OutputList: []
      },
      commissionListInNosaziCode: {
        CommissionList_InNidNosaziCode: []
      }
    }
  },

  methods: {
    fetched (val) {
      this.activeTab = "tree_tab"
      this.baseLibInNosaziCode = val
      this.loadObj()
    },

    async loadObj () {
      this.activeTab = "tree_tab"
      this.nosaziCodeTrees = []
      this.childTree = null
      if (!this.baseNosaziCode.District) {
        return this.showError("کد نوسازی به درستی تعیین نشده است.")
      }

      this.showLoading()
      await this.$services.SA.getNosaziCodeTreeChild(
        {
          pNosaziCode: {
            ...this.baseNosaziCode,
            ...this.options,
            NidUser: "00000000-0000-0000-0000-000000000000",
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
            NidRevisit: "00000000-0000-0000-0000-000000000000"
          }
        },
        this.config
      )
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (!res.data.Base_Front) res.data.Base_Front = []
          if (res.success !== true) {
            return this.showError("اطلاعات کد نوسازی بارگذاری نشد")
          }
          this.getArchiveWrapper()
          this.childTree = res.data["ChildTree"] || []
          const isValid = !!this.childTree.length
          if (isValid) {
            this.nosaziCodeTrees = this.createNosaziCodeTree(this.childTree)
          } else {
            this.showError("کد نوسازی معتبر نمیباشد")
          }
        })
        .catch((e) => {
          this.serverError()
          console.error("getNosaziCodeTreeChild error", e)
        })
        .finally(() => {
          this.hideLoading()
          this.$nextTick(() => {
            if (this.$refs.tree) {
              this.$refs.tree.expandAll()
            }
          })
        })
    },
    selectedNosaziCodeChanged (e) {
      if (e) {
        this.selectNosaziCode = e
        this.baseNosaziCode = convertStringToNosaziCodeObject(
          e.nosaziCodeString
        )
        this.$refs.requestsList.getResponserKartabl()
        this.activeTab = "requestsList"
      }
    },

    afterLoadResponserKartabl () {
      this.selectedRequestFromRequestList = null
      this.getAllFiches()
      this.getOutputList()
      this.getCommissionListInNidNosaziCode()
      this.getArchiveWrapper()
      this.$nextTick(() => {
        if (this.$refs.tree) {
          this.$refs.tree.expandAll()
        }
      })
    },

    // getResponserKartabl () {
    //   this.showLoading()
    //   const from = (this.page - 1) * this.take
    //   this.$services.SC.getResponserKartabl(
    //     {
    //       pFromRow: from,
    //       pToRow: (this.page === 1 ? from : from - 1) + this.perPage,
    //       // pWhere: this.query
    //       pWhere: `Where bn.NidNosaziCode = '${this.selectNosaziCode?.NidNosaziCode?.toString() ?? ''}'`
    //       // Where bn.NidNosaziCode = '3e139211-6cb3-4d71-8387-2a2b50784e42'
    //     },
    //     this.config
    //   )
    //     .then(({ data }) => {
    //       const res = this.getResponse(data)
    //       if (res.success) {
    //         if (!res.data.ResponserKartabl) return
    //         this.responserKartable = res.data.ResponserKartabl
    //         for (let i = 0; i < this.responserKartable.length; i++) {
    //           if (this.responserKartable[i].NidProc === "") {
    //             this.responserKartable[i].NidProc =
    //               "00000000-0000-0000-0000-000000000000"
    //           }
    //         }
    //         this.selectedRequestFromRequestList = null

    //         this.getAllFiches()
    //         this.getOutputList()
    //         this.getCommissionListInNidNosaziCode()
    //         this.getArchiveWrapper()

    //         this.$nextTick(() => {
    //           if (this.$refs.tree) {
    //             this.$refs.tree.expandAll()
    //           }
    //         })
    //       } else {
    //         return this.showError("لیست درخواست ها بارگذاری نشد")
    //       }
    //     })
    //     .catch((e) => {
    //       console.error(e)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },
    async getCommissionListInNidNosaziCode () {
      this.commissionListInNosaziCode = {
        CommissionList_InNidNosaziCode: []
      }
      try {
        this.showLoading()
        const response =
          await this.$services.SC.getCommissionListInNidNosaziCode(
            { pNidNosaziCode: this.baseLibInNosaziCode._NidNosaziCode },
            this.config
          )
        const res = this.getResponse(response.data)
        if (res.success) {
          this.commissionListInNosaziCode = res.data ?? {
            CommissionList_InNidNosaziCode: []
          }
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "NosaziCode",
            nosaziCode: strNosaziCode,
            saveDesc: `بارگذاری لیست کمیسیون برای کد نوسازی ${strNosaziCode
              .split("-")
              .reverse()
              .join("-")} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async getOutputList () {
      try {
        this.showLoading()
        const outputNo = this.$refs.outputList.filterOutputNo
        const pWhere =
          outputNo === ""
            ? `OutputStatusPer = 'صدور'`
            : `O.OutputNo = '${outputNo}' and OutputStatusPer = 'صدور'`
        this.outputList = []
        const { data } = await this.$services.SC.getOutputList(
          {
            pCI_City: this.baseNosaziCode.CI_City,
            pDistrict: this.baseNosaziCode.District,
            pRegion: this.baseNosaziCode.Region,
            pBlock: this.baseNosaziCode.Block,
            pHouse: this.baseNosaziCode.House,
            pBuilding: this.baseNosaziCode.Building,
            pApartment: this.baseNosaziCode.Apartment,
            pShop: this.baseNosaziCode.Shop,
            pWhere
          },
          this.config
        )
        this.getOutputListRes = this.getResponse(data)
        if (this.getOutputListRes.success) {
          this.outputResult = this.getOutputListRes?.data ?? {
            OutputList: []
          }
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "NosaziCode",
            nosaziCode: strNosaziCode,
            saveDesc: `بارگذاری لیست گواهی برای کد نوسازی ${strNosaziCode
              .split("-")
              .reverse()
              .join("-")} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    showDetailOfNosazoCodeOnTree (e) {
      this.selectNosaziCode = e
      switch (e.EumNosaziCodeObjType) {
        case 1:
          this.formName = "BaseBlockParvandeh"
          return
        case 2:
          this.formName = "BaseHouseInfoParvandeh"
          return
        case 3:
          this.formName = "BaseBuildingInfoParvandeh"
          return
        case 4:
          this.formName = "BaseApartmentInfoParvandeh"
          return
        case 5:
          this.formName = "BaseHouseSharingInfoParvandeh"
          return
        case 6:
          this.formName = "BaseShopInfoParvandeh"
          return
        case 9:
          this.formName = "TabActions"
      }
      this.showParvandehInfo = true
    },

    getNodeByKey (key) {
      return this.$refs.tree && this.$refs.tree.getNodeByKey(key)
    },

    getArchiveWrapper () {
      const payload = {
        pNidNosaziCode: this.baseLibInNosaziCode._NidNosaziCode,
        pCI_ArchiveGroup: 1
      }
      this.$services.SA.getArchiveWrapper(payload, this.config)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            if (res.data.ArchiveWrapper) {
              this.updateArchiveBizCode(res.data.ArchiveWrapper.BizCode)
              const str = convertNosaziCodeObjectToString(
                this.baseLibInNosaziCode._NidNosaziCode
              )
                .split("-")
                .reverse()
                .join("-")
              this.log({
                action: this.logActions.view,
                bizCode: res.data.ArchiveWrapper.BizCode,
                bizCodeArchive: res.data.ArchiveWrapper.BizCode,
                bizCodeTitle: "BizCodeArchive",
                nosaziCode: this.baseLibInNosaziCode._NidNosaziCode,
                saveDesc: `بارگذاری آرشیو اطلاعات برای کد نوسازی ${str} انجام گردید.`
              })
            }
          }
        })
        .catch((e) => {
          console.error(e)
          this.showError("اسناد این شماره پرونده موجود نمی باشد.")
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      this.archiveBizCode = bizCode
    },
    selectRequestFromRequestList (val) {
      this.selectedRequestFromRequestList = val
      this.getAllFiches()
    },
    reloadAllFiches () {
      this.selectedRequestFromRequestList =
        "00000000-0000-0000-0000-000000000000"
      this.getAllFiches()
    },
    getAllFiches () {
      const nidProc = this.selectedRequestFromRequestList
        ? this.selectedRequestFromRequestList?.NidProc
        : "00000000-0000-0000-0000-000000000000"
      this.showLoading()
      this.$services.SD.getAllFicheByIncomeList(
        { pNidProc: nidProc },
        this.config
      )
        .then(({ data }) => {
          this.allFichseResult = this.getResponse(data)
          if (this.allFichseResult.success) {
            this.allFichseResults = this.allFichseResult.data
            this.allFiches = []
            if (
              this.allFichseResults &&
              this.allFichseResults.All_FicheByIncomeList &&
              this.allFichseResults.All_FicheByIncomeList.length > 0
            ) {
              this.allFichseResults.All_FicheByIncomeList.forEach((x) => {
                this.allFiches.push({
                  ...x.Income_Fiche,
                  IncomeCreateDate: x.IncomeCreateDate,
                  IncomeCreateTime: x.IncomeCreateTime
                })
              })
              this.allFiches.map((x) => {
                if (x.EumFicheStatus === 0) {
                  x.class = "dutyFichePermanent"
                } else if (x.EumFicheStatus === 1) {
                  x.class = "dutyFicheConfirm"
                } else if (x.EumFicheStatus === 2) {
                  x.class = "dutyFichePrint"
                } else if (x.EumFicheStatus === 7) {
                  x.class = "dutyFicheTempExport"
                } else if (x.EumFicheStatus === 3) {
                  x.class = "dutyFicheConfirmBank"
                } else if (x.EumFicheStatus === 4) {
                  x.class = "dutyFicheRevoke"
                }
                return x
              })
              //   const str = convertNosaziCodeObjectToString(
              //     this.baseLibInNosaziCode._NidNosaziCode
              //   )
              //     .split("-")
              //     .reverse()
              //     .join("-")
              //   this.log({
              //     action: this.logActions.view,
              //     bizCode: res.data.ArchiveWrapper.BizCode,
              //     bizCodeArchive: res.data.ArchiveWrapper.BizCode,
              //     bizCodeTitle: "BizCodeArchive",
              //     nosaziCode: this.baseLibInNosaziCode._NidNosaziCode,
              //     saveDesc: `بارگذاری اطلاعات فیش های درآمدی برای کد نوسازی ${str} انجام گردید.`
              //   })
              //   this.log({
              //     action: this.logActions.view,
              //     bizCode: nidProc,
              //     bizCodeTitle: "NidProc"
              //   })
            }
          }
        })
        .catch((e) => {
          console.error("getAllFicheByIncomeList error : >> ", e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  watch: {
    activeTab () {
      if (
        (this.activeTab === "requestsList" ||
          this.activeTab === "outputList") &&
        this.selectNosaziCode === null
      ) {
        this.activeTab = "tree_tab"
        this.showError("لطفا کد نوسازی را انتخاب نمایید.")
      }
      if (this.activeTab === "dutyFicheNosazi") {
        this.$refs.dutyFicheNosazi.loadData()
        this.$nextTick(() => {
          if (this.$refs.tree) {
            this.$refs.tree.expandAll()
          }
        })
      }
      if (this.activeTab === "dutyFicheSenfi") {
        this.$refs.dutyFicheSenfi.loadData()
        this.$nextTick(() => {
          if (this.$refs.tree) {
            this.$refs.tree.expandAll()
          }
        })
      }
    }
  },

  computed: {
    query () {
      const sql = [];
      // NosaziCode fields
      ["District", "Region", "Block", "House", "Building", "Apartment", "Shop"]
        .filter((field) => this.baseNosaziCode[field] !== 0)
        .forEach((field) => {
          sql.push(`BN.${field} = ${this.baseNosaziCode[field]}`)
        })
      sql.push("**")
      return " WHERE " + sql.join(" AND ")
    },

    archiveConfig () {
      // eslint-disable-next-line standard/computed-property-even-spacing
      return window.getConfig("archiveCore").district[
        (this.baseNosaziCode && this.baseNosaziCode.District) || 1
      ]
    },

    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    },

    selectedNosaziCodeObject () {
      return this.selectNosaziCode || this.baseLibInNosaziCode.MainObj
    },

    isValidNosaziCode () {
      return !!(
        this.baseNosaziCode &&
        this.baseNosaziCode.District &&
        this.baseNosaziCode.Region &&
        this.baseNosaziCode.Block
      )
    },

    tabs () {
      if (this.isValidNosaziCode && this.nosaziCodeTrees.length) {
        return this.tabsDef
      }
      return [this.tabsDef[0]]
    }
  }
}
</script>
