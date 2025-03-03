<template>
  <form-wrapper
    :padding="false"
    :title="formTitle"
    @close="removeForm('USearchUParvandeh')"
  >
    <template #header>
      <safa-status :result="getNosaziCodeChildrenInNosaziCodeRes" />
      <safa-status :result="setRequiredRevisitOrNotExtendedRes" />
      <safa-status :result="updateEumRequiredRevisitRes" />
      <safa-status :result="deleteNosaziCodeSurveyRes" />
      <safa-status :result="doSecondConfirmationRes" />
      <safa-status :result="doFirstConfirmationRes" />
      <safa-status :result="loadHousesFromBlockRes" />
      <safa-status :result="RevisitAgainHandler" />
    </template>
    <fit>
      <safa-splitter
        v-model="dynamicWidth"
        vertical
        margin="0"
        :limits="[dynamicWidth, dynamicWidth]"
      >
        <template v-slot:before>
          <div
            class="flex justify-between column full-height q-pb-sm"
            v-if="visibility.showReTree"
          >
            <div class="q-mb-sm" style="flex-grow: 1">
              <fit>
                <q-scroll-area class="full-height">
                  <q-tree
                    ref="treeView"
                    class="fit bordered q-pa-none"
                    default-expand-all
                    selected-color="primary"
                    :nodes="treeView"
                    dense
                    node-key="NodeId"
                    label-key="Header"
                    children-key="Childs"
                    :selected.sync="selectedContractId"
                    :no-selection-unset="true"
                  >
                    <template v-slot:default-header="{ node }">
                      <div
                        class="flex items-center full-width"
                        @dblclick="nodeDblClick(node)"
                      >
                        <safa-label class="flex items-center cursor-pointer">
                          <q-icon
                            :name="node.icon"
                            :color="node.iconColor"
                            class="q-mr-xs"
                            size="18px"
                            style="flex-grow-1"
                          />
                          {{ node.Header }}
                        </safa-label>
                      </div>
                    </template>
                  </q-tree>
                </q-scroll-area>
              </fit>
            </div>

            <q-separator class="q-mb-sm" />
            <div class="flex items-center q-mx-xs justify-center">
              <btn-default
                style="flex-grow: 1"
                class="q-mr-sm"
                label="ملک قبلی"
                @click="doBtnPrev"
                v-if="visibility.showBtnPrev"
              />
              <btn-default
                style="flex-grow: 1"
                label="ملک بعدی"
                @click="doBtnNext"
                v-if="visibility.showBtnNext"
              />
            </div>
          </div>
        </template>

        <template v-slot:after>
          <fit>
            <fit class="flex justify-between">
              <transition name="fade">
                <component
                  :is="activeComponent.name"
                  v-bind="activeComponent.props"
                  :m="mode"
                  :title="title"
                  :formKey="formKey"
                  :name="name"
                  @setSurveyor="($event) => (labels.surveyor = $event)"
                  @updateIsEditable="updateIsEditable"
                  ref="innerChild"
                />
              </transition>

              <div class="q-mt-auto">
                <q-separator
                  v-if="
                    visibility.showChbPanorama ||
                    visibility.showSpRevisit ||
                    visibility.showSpRevisit ||
                    !!labels.surveyor
                  "
                />
                <div
                  class="flex items-center justify-between q-pa-sm"
                  v-if="
                    visibility.showChbPanorama ||
                    visibility.showSpRevisit ||
                    !!labels.surveyor
                  "
                >
                  <div class="flex items-center q-gutter-x-sm">
                    <safa-checkbox
                      label="نمایش تصویر"
                      v-model="dataContext.main.chbPanorama"
                      class="q-mr-sm"
                      v-if="visibility.showChbPanorama"
                      @input="callPanorama"
                    />
                    <q-separator vertical v-if="visibility.showSpRevisit" />
                    <div
                      class="flex items-center q-gutter-x-sm"
                      v-if="visibility.showSpRevisit"
                    >
                      <safa-label>نیاز به بازدید :</safa-label>
                      <safa-radio
                        label="دارد"
                        :val="true"
                        v-model="dataContext.main.rbRevisit"
                      />
                      <safa-radio
                        label="ندارد"
                        :val="false"
                        v-model="dataContext.main.rbRevisit"
                      />
                      <btn-default
                        label="بررسی شد"
                        @click="btnNeedToRevisitClick"
                      />
                      <q-separator vertical v-if="labels.surveyor" />
                    </div>
                  </div>

                  <safa-label class="text-primary" v-if="!!labels.surveyor">
                    ممیز:&nbsp;{{ labels.surveyor }}
                  </safa-label>
                </div>
              </div>
            </fit>
          </fit>
        </template>
      </safa-splitter>
    </fit>

    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @cancel="cancelAction"
        @save="saveAction"
        :showEditButton="visibility.showEditButton"
      >
        <template v-slot:after>
          <btn-default
            v-if="visibility.showBtnArchive"
            label="آرشیو"
            @click="btnArchiveClick"
          />
          <btn-default
            v-if="visibility.showBtnReport"
            label="گزارش"
            @click="btnReportClick"
          />
          <btn-default
            v-if="visibility.showBtnAssignWithChildren"
            label="ارجاع با تمام زیرمجموعه به ممیز"
            @click="btnAssignWithChildrenClick"
          />
          <btn-default
            v-if="visibility.showBtnAssignNoChildren"
            label="ارجاع بدون زیرمجموعه به ممیز"
            @click="btnAssignNoChildrenClick"
          />

          <btn-default
            v-if="
              visibility.showSpWorkflowBtn && visibility.showBtnRevisitAgain
            "
            label="بازدید مجدد"
            @click="btnOnWorkflowClick"
          />
          <btn-default
            v-if="
              visibility.showSpWorkflowBtn && visibility.showBtnFirstConfirm
            "
            label="تایید اول"
            @click="btnFirstConfirm"
          />
          <btn-default
            v-if="
              visibility.showSpWorkflowBtn && visibility.showBtnSecondConfirm
            "
            label="تایید دوم"
            @click="btnSecondConfirm"
          />

          <btn-default
            v-if="
              visibility.dontNeedToRevisit &&
              visibility.showBtnDontNeedToRevisit
            "
            label="عدم بررسی"
            @click="btnDontNeedToRevisitClick"
          />
          <!-- spId="FF83B2BA-2769-44D2-81CA-86DF8D02CFF5"
              spCaption="ممیزی-عدم بررسی" -->

          <btn-default
            v-if="visibility.dontNeedToRevisit && visibility.showBtnDelete"
            label="حذف ملک"
            @click="btnDeleteClick"
          />
          <!-- spId="ea674757-9344-4e51-a791-0f07837fc9da"
              spCaption="حذف ملک" -->
        </template>
      </form-actions>
    </template>

    <safa-popup
      title="ارجاع به ممیز"
      v-model="showAssignToSurveyor"
      width="900px"
      height="600px"
    >
      <fit>
        <USearchUAssignToSurveyor
          ref="USearchUAssignToSurveyor"
          :formKey="formKey"
          :title="title"
          :name="name"
          @done="done"
        />
      </fit>
    </safa-popup>
    <safa-popup
      title="آرشیو"
      v-model="showArchivePopup"
      width="900px"
      height="600px"
    >
      <fit>
        <USearchUTreeInfoUArchive ref="USearchUTreeInfoUArchive" />
      </fit>
    </safa-popup>
  </form-wrapper>
</template>

<!-- eslint-disable eqeqeq -->
<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"

// Components
import USearchUTreeInfoUHouse from "./u-search-u-tree-info-partials/USearchUTreeInfoUHouse"
import USearchUTreeInfoUBuilding from "./u-search-u-tree-info-partials/USearchUTreeInfoUBuilding"
import USearchUTreeInfoUApartment from "./u-search-u-tree-info-partials/USearchUTreeInfoUApartment"
import USearchUTreeInfoUJob from "./u-search-u-tree-info-partials/USearchUTreeInfoUJob"
import USearchUTreeInfoUArchive from "./u-search-u-tree-info-partials/USearchUTreeInfoUArchive"
import USearchUAssignToSurveyor from "./UAssignToSurveyor"

// Utils
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { uid } from "quasar"

// Helpers
import {
  ClsEnumEumRequiredRevisit,
  ClsEnumEumNosaziCodeObjType,
  EumConfirmState
} from "src/forms/audit/config/enums"

// Constants
const EMPTY_GUID = "00000000-0000-0000-0000-000000000000"

export default {
  name: "USearchUTreeInfo",

  mixins: [baseFormMixin, mapMixin],

  components: {
    USearchUTreeInfoUHouse,
    USearchUTreeInfoUBuilding,
    USearchUTreeInfoUApartment,
    USearchUTreeInfoUJob,
    USearchUTreeInfoUArchive,
    USearchUAssignToSurveyor
  },

  props: {
    params: Object,
    houseTreeContainer: Object
  },

  computed: {
    dynamicWidth () {
      // if (!this.params.IsLoadedFromMenu) return 0

      const layoutWidth = this.$store.getters["ui/layoutSplitterWidth"]
      const width = window.innerWidth / (100 / layoutWidth) / 100 + 15
      if (layoutWidth < 40) return 50
      return width > 23 ? 23 : width
    }
  },

  data () {
    return {
      title: "جستجو",
      formKey: "37EA1BC4-F5ED-8739-B6B1-E2B57C014E8E",
      name: "USearchUTreeInfo",

      // Context
      dataContext: {
        context: {},
        main: {
          rbRevisit: true,
          chbPanorama: false
        }
      },
      pagination: {
        current: 1,
        max: 0,
        maxPages: 4,
        pageSize: 20
      },
      treeView: [],
      blockNosaziCode: "",
      nidNosaziCode: EMPTY_GUID,
      confirmState: 0,
      isReviewed: false,
      centreX: 0,
      centreY: 0,
      getNext: false,
      doFirstConfirmationRes: null,
      doSecondConfirmationRes: null,
      formTitle: "",

      // Visibility
      visibility: {
        showReTree: true,

        showSpWorkflowBtn: true,
        showSpRevisit: true,
        dontNeedToRevisit: false,

        showBtnArchive: true,
        showBtnReport: true,
        showBtnAssignWithChildren: true,
        showBtnAssignNoChildren: true,
        showBtnRevisitAgain: true,
        showBtnFirstConfirm: true,
        showBtnSecondConfirm: true,
        showBtnDontNeedToRevisit: true,
        showBtnDelete: true,

        showBtnPrev: true,
        showBtnNext: true,

        showChbPanorama: true,

        showEditButton: true
      },
      activeComponent: {},

      // Labels
      labels: {
        totalCount: "",
        surveyor: ""
      },

      // Tree
      selectedContractId: "",
      expandedContractId: "",

      // Popups
      showAssignToSurveyor: false,
      showArchivePopup: false,

      // Responses
      getNosaziCodeChildrenInNosaziCodeRes: null,
      getNosaziCodeChildrenInNidProcRes: null,
      setRequiredRevisitOrNotExtendedRes: null,
      updateEumRequiredRevisitRes: null,
      deleteNosaziCodeSurveyRes: null,
      loadHousesFromBlockRes: null,
      RevisitAgainHandler: null
    }
  },

  methods: {
    loadObj () {
      this.setPermission()
      this.createTree()
    },

    loadObjWorkflow () {
      this.showLoading()

      this.$services.SO.GetNosaziCodeChildrenInNidProc({
        pNidProc: this.params.taskInfo.NidProc
      })
        .then(({ data }) => {
          this.getNosaziCodeChildrenInNidProcRes = this.getResponse(data)
          if (this.getNosaziCodeChildrenInNidProcRes.success) {
            if (
              this.getNosaziCodeChildrenInNidProcRes.data.NosaziCodeChildren
            ) {
              const tmpData = this.getNosaziCodeChildrenInNidProcRes.data

              const tmpTreeItems = tmpData.NosaziCodeChildren.sort((a, b) => {
                return a.EumNosaziCodeObjType - b.EumNosaziCodeObjType
              })
                .sort((a, b) => {
                  return a.Building - b.Building
                })
                .sort((a, b) => {
                  return a.Apartment - b.Apartment
                })
                .sort((a, b) => {
                  return a.Shop - b.Shop
                })

              const tmpNosaziCode = `${tmpData.NosaziCodeChildren[0].District}-${tmpData.NosaziCodeChildren[0].Region}-${tmpData.NosaziCodeChildren[0].Block}-${tmpData.NosaziCodeChildren[0].House}-${tmpData.NosaziCodeChildren[0].Building}-${tmpData.NosaziCodeChildren[0].Apartment}-${tmpData.NosaziCodeChildren[0].Shop}`

              const tmpHouse = tmpData.NosaziCodeChildren.find(
                (e) => e.NosaziCodestr === tmpNosaziCode
              )

              const tmpHouseNode = {
                Header: `${tmpHouse.District_Survey}-${tmpHouse.Region_Survey}-${tmpHouse.Block_Survey}-${tmpHouse.House_Survey}-${tmpHouse.Building_Survey}-${tmpHouse.Apartment_Survey}-${tmpHouse.Shop_Survey}`,
                ...this.createTreeIcon(
                  tmpHouse.EumNosaziCodeObjType,
                  tmpHouse.DeletedID
                ),
                Tag: tmpHouse,
                Childs: [],
                IsLoadOnDemandEnabled: false,
                IsExpanded: true
              }
              this.treeView = [tmpHouseNode]
              this.createTreeNode(tmpHouseNode, tmpTreeItems)
            }
            this.visibility.showChbPanorama = false
          }
        })
        .catch((ex) => {
          console.error(ex)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    setPermission () {
      if (this.params.IsLoadedFromMenu) {
        this.visibility.showSpWorkflowBtn = false
        this.visibility.dontNeedToRevisit = true
      } else {
        this.visibility.showSpRevisit = false
        this.visibility.showBtnAssignWithChildren = false
        this.visibility.showBtnAssignNoChildren = false
        this.visibility.showSpWorkflowBtn = true
        // this.visibility.showReTree = false

        if (
          this.params.EumRevisit ==
            ClsEnumEumRequiredRevisit.UploadWithSurveyor.value &&
          this.confirmState == EumConfirmState.FisrtConfirmState
        ) {
          this.visibility.showBtnFirstConfirm = true
          this.visibility.showBtnSecondConfirm = false
        } else if (
          this.params.EumRevisit ==
            ClsEnumEumRequiredRevisit.FirstConfirm.value &&
          this.confirmState == EumConfirmState.SecondConfirmState
        ) {
          this.visibility.showBtnSecondConfirm = true
          this.visibility.showBtnFirstConfirm = false
        } else {
          this.visibility.showBtnFirstConfirm = false
          this.visibility.showBtnSecondConfirm = false
        }
      }

      if (
        this.params.ObjType == ClsEnumEumNosaziCodeObjType.House.value ||
        this.params.ObjType == ClsEnumEumNosaziCodeObjType.Building.value ||
        this.params.ObjType == ClsEnumEumNosaziCodeObjType.HouseSharing.value ||
        this.params.ObjType == ClsEnumEumNosaziCodeObjType.Apartment.value ||
        this.params.ObjType == ClsEnumEumNosaziCodeObjType.Shop.value
      ) {
        this.visibility.showBtnReport = true
        this.visibility.showBtnArchive = true
      } else {
        this.visibility.showBtnReport = false
        this.visibility.showBtnArchive = false
      }

      if (this.params.ObjType != ClsEnumEumNosaziCodeObjType.House.value) {
        this.visibility.showSpRevisit = false
        this.visibility.showBtnAssignWithChildren =
          this.params.EumRevisit ==
          ClsEnumEumRequiredRevisit.RequiredRevisit.value
        this.visibility.showBtnAssignNoChildren =
          this.params.EumRevisit ==
          ClsEnumEumRequiredRevisit.RequiredRevisit.value

        this.visibility.showChbPanorama = false
        this.visibility.showBtnFirstConfirm = false
        this.visibility.showBtnSecondConfirm = false
        this.visibility.showBtnRevisitAgain = false
      } else {
        if (this.params.IsLoadedFromMenu) {
          if (
            this.params.EumRevisit == ClsEnumEumRequiredRevisit.None.value ||
            this.params.EumRevisit ==
              ClsEnumEumRequiredRevisit.RequiredRevisit.value ||
            this.params.EumRevisit ==
              ClsEnumEumRequiredRevisit.NotRequiredRevisit.value
          ) {
            this.visibility.showSpRevisit = true
          } else this.visibility.showSpRevisit = false

          this.visibility.showBtnAssignWithChildren =
            this.params.EumRevisit ==
            ClsEnumEumRequiredRevisit.RequiredRevisit.value

          this.visibility.showBtnAssignNoChildren =
            this.params.EumRevisit ==
            ClsEnumEumRequiredRevisit.RequiredRevisit.value

          this.visibility.showChbPanorama = true
        } else {
          this.visibility.showChbPanorama = false
        }
      }

      const { District, Region, Block, House, Building, Apartment, Shop } =
        convertStringToNosaziCodeObject(this.params.NosaziCode)

      if (
        this.params.taskInfo &&
        District &&
        Region &&
        Block &&
        House &&
        Building == 0 &&
        Apartment == 0 &&
        Shop == 0
      ) {
        this.visibility.showSpWorkflowBtn =
          this.visibility.showBtnRevisitAgain = true
        this.visibility.showEditButton = true //  بنا به درخواست ممیزی رشت این کار انجام شده است
      } else {
        this.visibility.showSpWorkflowBtn =
          this.visibility.showBtnRevisitAgain = false
        this.visibility.showEditButton = true
      }
    },

    createTree () {
      const codeObj = convertStringToNosaziCodeObject(
        this.params.NosaziCode_House
      )

      this.showLoading()

      this.$services.SO.getNosaziCodeChildrenInNosaziCode({
        pDistrict: codeObj.District,
        pRegion: codeObj.Region,
        pBlock: codeObj.Block,
        pHouse: codeObj.House,
        pBuilding: codeObj.Building,
        pApartment: codeObj.Apartment,
        pShop: codeObj.Shop
      })
        .then(async ({ data }) => {
          this.getNosaziCodeChildrenInNosaziCodeRes = this.getResponse(data)

          if (this.getNosaziCodeChildrenInNosaziCodeRes.success) {
            let tmpHouse =
              this.getNosaziCodeChildrenInNosaziCodeRes.data.NosaziCodeChildren.find(
                (a) => a.NosaziCodestr == this.params.NosaziCode_House
              )

            if (this.params.NidBase == EMPTY_GUID) {
              let tmpSelected =
                this.getNosaziCodeChildrenInNosaziCodeRes.data.NosaziCodeChildren.find(
                  (a) => a.NosaziCodestr == this.params.NosaziCode
                )
              if (tmpSelected) {
                this.params.NidBase = tmpSelected.NidBase
                this.nidNosaziCode = tmpSelected.NidNosaziCode
                this.params.NosaziCode = tmpSelected.NosaziCodestr
                this.params.ObjType = tmpSelected.EumNosaziCodeObjType
                this.params.EumRevisit = tmpSelected.EumRequiredRevisit
              }
            }
            if (
              this.params.ObjType == ClsEnumEumNosaziCodeObjType.House.value
            ) {
              this.visibility.showChbPanorama = true
              if (this.dataContext.main.chbPanorama) {
                this.callPanorama()
              }
            } else this.visibility.showChbPanorama = false

            if (
              this.params.EumRevisit ==
                ClsEnumEumRequiredRevisit.RequiredRevisit.value &&
              this.params.ObjType == 2
            ) {
              this.visibility.showBtnAssignWithChildren = true
              this.visibility.showBtnAssignNoChildren = true
            }

            // SafaMapViewer2.ClsCommon._Map.ClearAllDrawing();
            if (tmpHouse != null) {
              this.centreX = tmpHouse.CenterX
              this.centreY = tmpHouse.CenterY
              if (tmpHouse.WKT) {
                // SafaMapViewer2.ClsCommon._Map.LoadWkt(new Collection<WktItem>
                // {
                //     new WktItem {Geometry = tmpHouse.WKT}
                // });
              } else {
                this.showCodeOnMap(tmpHouse.NosaziCodestr, true)
              }
            }

            if (!this.isReviewed) await this.loadUserControl()
            else {
              this.hideLoading()
            }

            this.isReviewed = false

            this.treeView = []

            this.blockNosaziCode = `${codeObj.District}-${codeObj.Region}-${codeObj.Block}-0-0-0-0`

            this.selectedContractId = uid()
            this.expandedContractId = this.selectedContractId

            const tmpBlock = [
              {
                Header: this.blockNosaziCode,
                Tag: this.blockNosaziCode,
                Childs: [],
                IsLoadOnDemandEnabled: true,
                IsExpanded: true,
                icon: "apartment",
                iconColor: "primary",
                NodeId: uid()
              }
            ]

            const sortTree = (tree) => {
              return tree
                .sort((a, b) => {
                  if (a.House < b.House) {
                    return -1
                  }
                  if (a.House > b.House) {
                    return 1
                  }
                })
                .sort((a, b) => {
                  if (a.Building < b.Building) {
                    return -1
                  }
                  if (a.Building > b.Building) {
                    return 1
                  }
                })
                .sort((a, b) => {
                  if (a.Apartment < b.Apartment) {
                    return -1
                  }
                  if (a.Apartment > b.Apartment) {
                    return 1
                  }
                })
                .sort((a, b) => {
                  if (a.Shop < b.Shop) {
                    return -1
                  }
                  if (a.Shop > b.Shop) {
                    return 1
                  }
                })
            }

            let tmpTreeItems = sortTree(
              this.getNosaziCodeChildrenInNosaziCodeRes.data.NosaziCodeChildren
            )

            let tmpHouseNode = {
              Header: tmpHouse.NosaziCodestr,
              Tag: tmpHouse,
              Childs: [],
              ...this.createTreeIcon(
                tmpHouse.EumNosaziCodeObjType,
                tmpHouse.EumRequiredRevisit
              ),
              IsLoadOnDemandEnabled: true,
              IsExpanded: true,
              NodeId: this.selectedContractId
            }
            tmpBlock[0].Childs.push(tmpHouseNode)
            this.createTreeNode(tmpHouseNode, tmpTreeItems)

            setTimeout(() => {
              this.treeView = tmpBlock

              this.$nextTick(() => {
                if (this.params.IsLoadedFromMenu) {
                  this.$refs.treeView.expandAll()
                }
              })
            }, 500)
          } else {
            this.hideLoading()
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
          this.hideLoading()
        })
        .finally(() => {
          // this.hideLoading()
        })
    },

    createTreeIcon (pNosaziCodeObjType, pEumRevisit) {
      let nodeIcon = {}
      switch (pNosaziCodeObjType) {
        case 1:
          nodeIcon = {
            icon: "domain",
            iconColor:
              pEumRevisit == ClsEnumEumRequiredRevisit.None.value
                ? "red-10"
                : "green-8"
          }
          break
        case 2:
          nodeIcon = {
            icon: "home",
            iconColor:
              pEumRevisit == ClsEnumEumRequiredRevisit.None.value
                ? "red-10"
                : "green-8"
          }
          break
        case 3:
          nodeIcon = {
            icon: "maps_home_work",
            iconColor:
              pEumRevisit == ClsEnumEumRequiredRevisit.None.value
                ? "red-10"
                : "green-8"
          }
          break
        case 4:
          nodeIcon = {
            icon: "apartment",
            iconColor:
              pEumRevisit == ClsEnumEumRequiredRevisit.None.value
                ? "red-10"
                : "green-8"
          }
          break
        case 5:
          nodeIcon = {
            icon: "location_city",
            iconColor:
              pEumRevisit == ClsEnumEumRequiredRevisit.None.value
                ? "red-10"
                : "green-8"
          }
          break
        case 6:
          nodeIcon = {
            icon: "shopping_cart",
            iconColor:
              pEumRevisit == ClsEnumEumRequiredRevisit.None.value
                ? "red-10"
                : "green-8"
          }
          break
      }

      return nodeIcon
    },

    async loadUserControl () {
      this.setPermission()
      if (
        this.houseTreeContainer != null &&
        this.houseTreeContainer?.list?.length > 0
      ) {
        if (this.houseTreeContainer.current > 0) {
          this.visibility.showBtnPrev = true
        } else {
          this.visibility.showBtnPrev =
            this.params.NosaziCode_House !=
            this.houseTreeContainer.list[0].NosaziCodestr
        }
        if (
          this.houseTreeContainer.treeSize / this.houseTreeContainer.pageSize > this.houseTreeContainer.current
        ) {
          this.showBtnNext = true
        } else {
          this.showBtnNext =
            this.params.NosaziCode_House !=
            this.houseTreeContainer.list[this.houseTreeContainer.list.length - 1].NosaziCodestr
        }
      }

      switch (this.params.ObjType) {
        case ClsEnumEumNosaziCodeObjType.House.value:
          this.activeComponent.name = "USearchUTreeInfoUHouse"

          this.activeComponent.props = {
            params: {
              NidBase: this.params.NidBase,
              CanEdit: true,
              IsLoadedFromMenu: this.params.IsLoadedFromMenu,
              EvReloadTree: this.tmpHouseEvReloadTree
            }
          }
          // chbPanorama.editable = "editable"; // # todo

          break
        case ClsEnumEumNosaziCodeObjType.Building.value:
          this.activeComponent.name = "USearchUTreeInfoUBuilding"

          this.activeComponent.props = {
            params: {
              NidBase: this.params.NidBase,
              CanEdit: true,
              IsLoadedFromMenu: this.params.IsLoadedFromMenu
            }
          }

          break
        case ClsEnumEumNosaziCodeObjType.Apartment.value:
          this.activeComponent.name = "USearchUTreeInfoUApartment"

          this.activeComponent.props = {
            params: {
              NidBase: this.params.NidBase,
              CanEdit: true,
              IsLoadedFromMenu: this.params.IsLoadedFromMenu
            }
          }

          break

        case ClsEnumEumNosaziCodeObjType.Shop.value:
          this.activeComponent.name = "USearchUTreeInfoUJob"

          this.activeComponent.props = {
            params: {
              NidBase: this.params.NidBase,
              CanEdit: true,
              IsLoadedFromMenu: this.params.IsLoadedFromMenu
            }
          }

          break
        case ClsEnumEumNosaziCodeObjType.HouseSharing.value:
          break
        default:
          this.showWarning("اطلاعات کد نوسازی معتبر نمی باشد !", {
            title: "خطا"
          })
          break
      }

      if (this.activeComponent.name) {
        const self = this
        this.$forceUpdate()

        this.$nextTick(async () => {
          await self.$refs.innerChild.loadObj()
        })
      }

      this.updateFormtitle()
    },

    createTreeNode (currentNode, allTreeNodes) {
      // const treeResult = []
      let tmpChildren
      let tmpNosaziCodeType = currentNode.Tag

      switch (tmpNosaziCodeType.EumNosaziCodeObjType) {
        // ملک
        case 2:
          tmpChildren = allTreeNodes.filter(
            (a) =>
              (a.House == tmpNosaziCodeType.House &&
                a.Building > 0 &&
                a.Apartment == 0 &&
                a.Shop == 0) ||
              (a.House == tmpNosaziCodeType.House &&
                a.Building == 0 &&
                a.Apartment == 0 &&
                a.Shop > 0)
          )
          break
        // ساختمان
        case 3:
          tmpChildren = allTreeNodes.filter(
            (a) =>
              (a.House == tmpNosaziCodeType.House &&
                a.Building == tmpNosaziCodeType.Building &&
                a.Apartment > 0 &&
                a.Shop == 0) ||
              (a.House == tmpNosaziCodeType.House &&
                a.Building == tmpNosaziCodeType.Building &&
                a.Apartment == 0 &&
                a.Shop > 0)
          )

          break
        // آپارتمان
        case 4:
          tmpChildren = allTreeNodes.filter(
            (a) =>
              a.House == tmpNosaziCodeType.House &&
              a.Building == tmpNosaziCodeType.Building &&
              a.Apartment == tmpNosaziCodeType.Apartment &&
              a.Shop > 0
          )

          break
        // دستگاه
        case 5:
          tmpChildren = allTreeNodes.filter(
            (a) =>
              (a.House == tmpNosaziCodeType.House &&
                a.Building == tmpNosaziCodeType.Building &&
                a.Apartment > 0 &&
                a.Shop == 0) ||
              (a.House == tmpNosaziCodeType.House &&
                a.Building == tmpNosaziCodeType.Building &&
                a.Apartment == 0 &&
                a.Shop > 0)
          )

          break

        default:
          tmpChildren = null
          break
      }

      if (tmpChildren && tmpChildren.length > 0) {
        tmpChildren.forEach((item) => {
          const tmpCodeInfo = {
            Header: item.NosaziCodestr,
            Tag: item,
            Childs: [],
            ...this.createTreeIcon(
              item.EumNosaziCodeObjType,
              item.EumRequiredRevisitc
            ),
            IsLoadOnDemandEnabled: true,
            IsExpanded: true,
            NodeId: uid()
          }

          currentNode.Childs.push(tmpCodeInfo)
          this.createTreeNode(tmpCodeInfo, allTreeNodes)
        })
      }
    },

    doBtnPrev () {
      let tmpPrev = {}
      let isCurrent = false
      this.houseTreeContainer.list.forEach((item) => {
        if (!isCurrent) {
          if (item.NosaziCodestr != this.params.NosaziCode_House) {
            tmpPrev = item
          } else isCurrent = true
        }
      })

      if (tmpPrev.NidBase != EMPTY_GUID) {
        this.params.NosaziCode_House = tmpPrev.NosaziCodestr
        this.params.ObjType = ClsEnumEumNosaziCodeObjType.House.value
        this.params.EumRevisit = tmpPrev.EumRequiredRevisit
        this.params.NidBase = tmpPrev.NidBase
        this.nidNosaziCode = tmpPrev.NidNosaziCode
        this.params.NosaziCode = tmpPrev.NosaziCodestr

        this.loadObj()
      }
    },

    doBtnNext () {
      let tmpNext = {}
      for (let i = 0; i < this.houseTreeContainer.list.length - 1; i++) {
        if (
          this.params.NosaziCode_House ==
          this.houseTreeContainer.list[i].NosaziCodestr
        ) {
          tmpNext = this.houseTreeContainer.list[i + 1]
          break
        }
      }

      if (tmpNext.NidBase != EMPTY_GUID) {
        this.getNext = false
        this.params.NosaziCode_House = tmpNext.NosaziCodestr
        this.params.ObjType = ClsEnumEumNosaziCodeObjType.House.value
        this.params.EumRevisit = tmpNext.EumRequiredRevisit

        this.params.NidBase = tmpNext.NidBase
        this.nidNosaziCode = tmpNext.NidNosaziCode
        this.params.NosaziCode = tmpNext.NosaziCodestr

        this.loadObj()
      } else {
        this.getNext = true
        this.getHousesTreeByPage()
      }
    },

    getHousesTreeByPage () {
      this.showLoading()

      this.houseTreeContainer.current++
      let from =
        this.houseTreeContainer.current * this.houseTreeContainer.pageSize
      let to = from + this.houseTreeContainer.pageSize
      if (from > 0) from += 1

      const tmpNosaziCode = convertStringToNosaziCodeObject(
        this.params.NosaziCode_House
      )

      this.$services.SO.loadHousesFromBlock({
        pDistrict: tmpNosaziCode.District,
        pRegion: tmpNosaziCode.Region,
        pBlock: tmpNosaziCode.Block,
        pFromRow: from,
        pToRow: to
      })
        .then(({ data }) => {
          this.loadHousesFromBlockRes = this.getResponse(data)

          if (this.loadHousesFromBlockRes.success) {
            const tmpTree = this.loadHousesFromBlockRes.data.HousesList.sort(
              (a, b) => a.House - b.House
            )

            if (tmpTree && tmpTree.length > 0) {
              tmpTree.forEach((item) => {
                this.houseTreeContainer.list.push(item)
              })
            }

            if (this.getNext == true) this.doBtnNext()
            else {
              this.params.NosaziCode_House = tmpTree[0].NosaziCodestr
              this.params.ObjType = ClsEnumEumNosaziCodeObjType.House.value
              this.params.NidBase = tmpTree[0].NidBase
              this.nidNosaziCode = tmpTree[0].NidNosaziCode
              this.params.NosaziCode = tmpTree[0].NosaziCodestr
              this.loadObj()
            }
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.showError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    nodeDblClick (node) {
      if (this.isEditable) {
        return this.showWarning("فرم در حالت ویرایش میباشد !", {
          title: "خطا"
        })
      }

      if (node.Tag == this.blockNosaziCode) {
        const nosaziCode = convertStringToNosaziCodeObject(
          this.blockNosaziCode
        )
        this.$emit("treeInfoNodeDblClick", {
          District: nosaziCode.District,
          Region: nosaziCode.Region,
          Block: nosaziCode.Block,
          IsLoadedFromMenu: this.params.IsLoadedFromMenu
        })
      } else {
        if (node.Tag.NidBase == this.params.NidBase) return

        this.showLoading()

        setTimeout(() => {
          this.params.NidBase = node.Tag.NidBase
          this.nidNosaziCode = node.Tag.NidNosaziCode
          this.params.NosaziCode = node.Tag.NosaziCodestr
          this.params.EumRevisit = node.Tag.EumRequiredRevisit
          this.params.ObjType = node.Tag.EumNosaziCodeObjType
          this.updateFormtitle()
          this.loadUserControl()
        }, 10)
      }
    },

    callPanorama () {
      if (this.centreX == 0.0 || this.centreY == 0.0) {
        this.showError("نقاط ملک موجود نمی باشد !", { title: "خطا" })
      } else {
        this.$nextTick(() => {
          setTimeout(() => {
            document
              .querySelector('#map-layout .q-btn[title="پاناروما"]')
              ?.click()
          }, 1000)
        })
      }
    },

    btnNeedToRevisitClick () {
      this.showLoading()

      let tmpRequiredRevisit = ClsEnumEumRequiredRevisit.None.value
      let tmpXml = {}

      if (this.dataContext.main.rbRevisit) {
        if (
          // eslint-disable-next-line eqeqeq
          tmpRequiredRevisit != ClsEnumEumRequiredRevisit.RequiredRevisit.value
        ) {
          tmpXml.RevisitProps = {
            ClsDtoExtendedProp: {
              FieldName: "",
              FieldTitle: "All",
              TableName: "All",
              TableTitle: ""
            }
          }
        }
        tmpRequiredRevisit = ClsEnumEumRequiredRevisit.RequiredRevisit.value
      } else {
        tmpRequiredRevisit = ClsEnumEumRequiredRevisit.NotRequiredRevisit.value
      }
      this.params.EumRevisit = tmpRequiredRevisit

      this.$services.SO.setRequiredRevisitOrNotExtended({
        pNidBase: this.params.NidBase,
        pEumRequiredRevisit: tmpRequiredRevisit,
        pPropList: tmpXml.RevisitProps,
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        pDoOnChildren: true
      })
        .then(({ data }) => {
          this.setRequiredRevisitOrNotExtendedRes = this.getResponse(data)

          if (this.setRequiredRevisitOrNotExtendedRes.success) {
            this.showSuccess("بررسی با موفقیت انجام شد !")
            this.isReviewed = true
            this.createTree()
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
          this.hideLoading()
        })
        .finally(() => {
          // this.hideLoading()
        })
    },
    btnArchiveClick () {
      const self = this
      let payload = {}
      if (this.nidNosaziCode != null) {
        payload.NidNosaziCode = this.nidNosaziCode
      }

      this.showArchivePopup = true

      this.$forceUpdate()

      this.$nextTick(() => {
        self.$refs.USearchUTreeInfoUArchive.loadObj(payload)
      })
    },

    btnReportClick () {
      let reportPath = ""
      switch (this.params.ObjType) {
        case ClsEnumEumNosaziCodeObjType.Apartment.value:
          reportPath = "/Surveyor/RptApartment"
          break
        case ClsEnumEumNosaziCodeObjType.House.value:
          reportPath = "/Surveyor/RptHouse"
          break
        case ClsEnumEumNosaziCodeObjType.Shop.value:
          reportPath = "/Surveyor/RptJob"
          break
        case ClsEnumEumNosaziCodeObjType.Building.value:
          reportPath = "/Surveyor/RptBuilding"
          break
        default:
          this.showError("گزارش مورد نظر یافت نشد !")
          reportPath = ""
          break
      }
      if (reportPath) {
        const queryParams = {
          NidBase: this.params.NidBase
        }
        this.showReport(`${reportPath}`, queryParams)
      }
    },

    btnAssignWithChildrenClick () {
      this.assign(true)
    },

    btnAssignNoChildrenClick () {
      this.assign(false)
    },

    assign (whiteChildren) {
      const self = this
      this.showAssignToSurveyor = true
      this.$nextTick(() => {
        self.$refs.USearchUAssignToSurveyor.loadObj({
          NidBase: this.params.NidBase,
          IsBlock: false,
          WithChildren: whiteChildren
        })
      })
    },
    btnSecondConfirm () {
      this.showConfirm(
        `آیا از تایید دوم کد ${this.params.NosaziCode} اطمینان دارید؟`
      ).onOk(async () => {
        try {
          this.showLoading()
          const { data } = await this.$services.SO.doSecondConfirmation({
            pNidProc: this.taskInfo?.NidProc || this.selectedNidProc,
            pNidUser: this.getNidUser(),
            pUserName: this.currentUser.username
          })
          this.doSecondConfirmationRes = this.getResponse(data)
          if (this.doSecondConfirmationRes.success) {
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.params.NosaziCode,
              bizCodeTitle: "NosaziCode",
              nosaziCode: this.params.NosaziCode,
              saveDesc: `تایید دوم برای کدنوسازی ${this.params.NosaziCode} انجام گردید.`
            })
            await this.loadObj()
          }
        } catch (e) {
          console.error(e)
        } finally {
          this.hideLoading()
        }
      })
    },
    btnFirstConfirm () {
      this.showConfirm(
        `آیا از تایید اول کد ${this.params.NosaziCode} اطمینان دارید؟`
      ).onOk(async () => {
        try {
          this.showLoading()
          const { data } = await this.$services.SO.doFirstConfirmation({
            pNidProc: this.taskInfo?.NidProc || this.selectedNidProc,
            pNidUser: this.getNidUser(),
            pUserName: this.currentUser.username
          })
          this.doFirstConfirmationRes = this.getResponse(data)
          if (this.doFirstConfirmationRes.success) {
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.taskInfo?.NidProc || this.selectedNidProc,
              bizCodeTitle: "NosaziCode",
              nosaziCode: this.taskInfo?.NidProc || this.selectedNidProc,
              saveDesc: `تایید اول برای کدنوسازی ${this.params.NosaziCode} انجام گردید.`
            })
          }
        } catch (e) {
          console.error(e)
        } finally {
          this.hideLoading()
        }
      })
    },
    btnOnWorkflowClick () {
      this.showConfirm("آیا از بازدید مجدد اطمینان دارید").onOk(async () => {
        this.showLoading()
        const payload = {
          pNidBase: this.params.NidBase,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          pNidComplain: this.params.NidComplain,
          pComments: this.Comments
        }
        try {
          const { data } = await this.$services.SO.setNeedAgainRevisit(payload)
          this.RevisitAgainHandler = this.getResponse(data)
          if (this.RevisitAgainHandler.success) {
            await this.onRevok()
          }
          await this.log({
            action: this.logActions.confirm,
            bizCode: this.params.NidComplain,
            bizCodeTitle: "NidComplain",
            saveDesc: `بازدید مجدد در فرم ${this.title} انجام گردید.`
          })
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      })
    },
    async onRevok () {
      this.showLoading()
      try {
        let payLoad = {
          pNidProc: this.taskInfo?.NidProc || this.selectedNidProc,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          pComments: "",
          pCI_GarbageArchiveCause: 0
        }
        const { data } = await this.$services.SC.sendToGarbageKartablNew(
          payLoad,
          { config: { District: this.selectedDistrict } }
        )
        this.requstResult = this.getResponse(data)
        if (this.requstResult.success) {
          this.showSuccess("درخواست موردنظر در لیست بازدیدهای مجدد میباشد")
          this.refreshKartable()
        }
      } catch (e) {
        this.serverError()
        console.error("error", e)
      } finally {
        this.hideLoading()
      }
    },
    btnDontNeedToRevisitClick () {
      this.showLoading()

      let tmpRequiredRevisit = ClsEnumEumRequiredRevisit.None.value
      let tmpXml = {}

      if (this.dataContext.main.rbRevisit) {
        if (
          // eslint-disable-next-line eqeqeq
          tmpRequiredRevisit != ClsEnumEumRequiredRevisit.RequiredRevisit.value
        ) {
          tmpXml.RevisitProps = {
            ClsDtoExtendedProp: {
              FieldName: "",
              FieldTitle: "All",
              TableName: "All",
              TableTitle: ""
            }
          }
        }
        tmpRequiredRevisit = ClsEnumEumRequiredRevisit.RequiredRevisit.value
      } else {
        tmpRequiredRevisit = ClsEnumEumRequiredRevisit.NotRequiredRevisit.value
      }
      this.params.EumRevisit = tmpRequiredRevisit

      this.$services.SO.updateEumRequiredRevisit({
        pNidBase: this.params.NidBase,
        pEumRequiredRevisit: ClsEnumEumRequiredRevisit.None.value,
        pPropList: tmpXml.RevisitProps,
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName()
      })
        .then(({ data }) => {
          this.updateEumRequiredRevisitRes = this.getResponse(data)

          if (this.updateEumRequiredRevisitRes.success) {
            this.showSuccess("عدم بررسی با موفقیت انجام شد !")
            this.isReviewed = true
            this.createTree()
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
          this.hideLoading()
        })
        .finally(() => {
          // this.hideLoading()
        })
    },

    btnDeleteClick () {
      this.showLoading()

      this.$services.SO.deleteNosaziCodeSurvey({
        pNidBase: this.params.NidBase
      })
        .then(async ({ data }) => {
          this.deleteNosaziCodeSurveyRes = this.getResponse(data)

          if (this.deleteNosaziCodeSurveyRes.success) {
            await this.log({
              action: this.logActions.delete,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `حذف اطلاعات در فرم ${this.title} انجام گردید.`
            })
            this.showSuccess("حذف با موفقیت انجام شد !")
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    updateFormtitle () {
      const codeObj = convertStringToNosaziCodeObject(
        this.params.NosaziCode || this.params.NosaziCode_House
      )

      let scope = [],
        title = ""

      switch (this.params.ObjType) {
        case 2:
          scope = ["House", "Block", "Region", "District"]
          title = "اطلاعات عرصه"
          break
        case 3:
          scope = ["Building", "House", "Block", "Region", "District"]
          title = "اطلاعات ساختمان"
          break
        case 4:
          scope = [
            "Apartment",
            "Building",
            "House",
            "Block",
            "Region",
            "District"
          ]
          title = "اطلاعات آپارتمان"
          break
        case 6:
          scope = [
            "Shop",
            "Apartment",
            "Building",
            "House",
            "Block",
            "Region",
            "District"
          ]
          title = "اطلاعات صنفی"
          break

        default:
          scope = ["House", "Block", "Region", "District"]
          title = "اطلاعات عرصه"
          break
      }

      this.formTitle = `${title} (${scope
        .reduce((e, a) => {
          e.push(codeObj[a])
          return e
        }, [])
        .join("-")})`
    },

    done ({ msg }) {
      this.showAssignToSurveyor = false

      if (msg) {
        this.showSuccess(msg)
      }
    },

    updateIsEditable (isEditable) {
      this.isEditable = isEditable
    },

    saveAction () {
      if (this.activeComponent.name) {
        this.$refs.innerChild.saveAction()
      }
    },

    cancelAction () {
      this.isEditable = false
      if (this.activeComponent.name) {
        this.$refs.innerChild.loadObj()
      }
    }
  },

  mounted () {
    if (this.params.taskInfo) {
      Object.keys(this.visibility).forEach((e) => {
        this.visibility[e] = false
      });

      ["showReTree"].forEach((e) => {
        this.visibility[e] = true
      })

      this.loadObjWorkflow()
    }
  }
}
</script>
