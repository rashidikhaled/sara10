<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <FormWrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getHierarchyCodeRes" />
        <safa-status :result="checkIsExistCodeInSara8Res" />
        <safa-status :result="delBaseCodeInfoRes" />
      </template>
      <fit>
        <safa-ribbon class="q-mb-sm" v-model="activeRibbonTab">
          <ribbon-section name="file" class="items-center">
            <ribbon-column v-for="(tab, _index) in tabs" :key="_index">
              <ribbon-button
                :class="{ select: activeTab == tab.name }"
                :title="tab.title"
                @click="handleOpenTab(tab)"
              >
                <template #icon>
                  <img :src="tab.icon" />
                </template>
              </ribbon-button>
            </ribbon-column>
          </ribbon-section>
        </safa-ribbon>
        <FormRow
          class="q-px-sm q-pb-sm"
          :style="
            $q.dark.isActive
              ? 'border-bottom: 1px solid var(--dark-border)'
              : 'border-bottom: 1px solid #dedede'
          "
        >
          <FormControl class="col-lg-2">
            <safa-text
              v-model="selectedContract.NIdWorkItem"
              label="کد ارجاع"
              label-width="65px"
              m="r"
            />
          </FormControl>
          <FormControl class="col-lg-3">
            <safa-text
              v-model="selectedContract.RequestType"
              label="نوع درخواست"
              label-width="75px"
              m="r"
            />
          </FormControl>
          <FormControl class="col-lg-3">
            <safa-text
              v-model="selectedContract.RequesterName"
              label="نام متقاضی"
              label-width="65px"
              m="r"
            />
          </FormControl>
          <FormControl class="col-lg-4">
            <nosazi-code-input
              v-model="baseNosaziCode"
              @enter="nosaziCodeInputSearch"
              :actions="true"
            />
          </FormControl>
        </FormRow>

        <safa-splitter v-model="splitterModel" vertical margin="0">
          <template v-slot:before>
            <div class="flex column justify-between full-height">
              <safa-splitter v-model="splitterModel2" horizontal margin="0">
                <template v-slot:before>
                  <fit>
                    <q-tree
                      ref="treeView"
                      class="bordered"
                      default-expand-all
                      selected-color="primary"
                      :nodes="treeView"
                      :selected.sync="selectedContractId"
                      node-key="NodeId"
                      label-key="Header"
                      children-key="Childs"
                      :no-selection-unset="true"
                    >
                      <template v-slot:default-header="{ node }">
                        <div
                          class="flex items-center full-width"
                          @click="nodeSelectedChange(node)"
                        >
                          <safa-label class="flex items-center">
                            <q-icon
                              :name="getIcon(node.NidType)"
                              class="q-mr-xs"
                              size="16px"
                              style="flex-grow-1"
                            />
                            {{ node.Header }}
                          </safa-label>
                        </div>
                      </template>
                    </q-tree>
                  </fit>
                </template>
                <template v-slot:after>
                  <div
                    class="flex column justify-center items-start full-height q-gutter-y-sm q-pa-sm"
                    style="direction: ltr"
                  >
                    <safa-label
                      >Center X : {{ selectedContract.CenterX }}</safa-label
                    >
                    <safa-label
                      >Center Y : {{ selectedContract.CenterY }}</safa-label
                    >
                  </div>
                </template>
              </safa-splitter>
            </div>
          </template>
          <template v-slot:after>
            <safa-tabs v-show="activeTab" v-model="activeTab" ref="SafaTabs">
              <template v-slot:tabs>
                <tab-menu
                  v-for="tab in tabs"
                  :key="tab.name"
                  :name="tab.name"
                  :label="tab.label"
                  closable
                  @close="handleCloseTab(tab)"
                  v-show="tab.isVisible"
                />
              </template>

              <tab-content name="URequestSys" :padding="false">
                <UFileListRequestSys :formKey="formKey" ref="URequestSys" />
              </tab-content>

              <tab-content name="UHouse" :padding="false">
                <UFileListHouse :formKey="formKey" ref="UHouse" />
              </tab-content>

              <tab-content name="UBuilding" :padding="false">
                <UFileListBuildingInfo :formKey="formKey" ref="UBuilding" />
              </tab-content>

              <tab-content name="UHouseSharing" :padding="false">
                <UFileListHouseSharing :formKey="formKey" ref="UHouseSharing" />
              </tab-content>

              <tab-content name="UApartment" :padding="false">
                <UFileListApartment :formKey="formKey" ref="UApartment" />
              </tab-content>

              <tab-content name="UShop" :padding="false">
                <UFileListShop :formKey="formKey" ref="UShop" />
              </tab-content>

              <tab-content name="UJob" :padding="false">
                <UFileListJob :formKey="formKey" ref="UJob" />
              </tab-content>

              <tab-content name="UShaft" :padding="false">
                <UFileListShaft :formKey="formKey" ref="UShaft" />
              </tab-content>
            </safa-tabs>
          </template>
        </safa-splitter>
      </fit>

      <template #footer>
        <form-actions
          :m="mode"
          @cancel="btnCancelClick"
          @save="btnSaveClick"
          :showEditButton="false"
        >
          <btn-default
            label="ویرایش"
            @click="btnEditClick"
            :disable="!isBtnEditEnable"
            v-if="!isEditable"
          />
          <btn-default
            label="ویرایش پرونده"
            @click="btnEditClick"
            :disable="!isBtnEditHistoryEnable"
            v-if="!isEditable"
          />
          <btn-default label="حذف" @click="btnDeleteClick" />
          <btn-default label="نمایش ملک روی نقشه" @click="btnShowOnMapClick" />
          <btn-default label="خروج" @click="btnExitClick" v-if="!isEditable" />

          <safa-label class="txt-message">{{ txtMessage }}</safa-label>
        </form-actions>
      </template>
    </FormWrapper>
  </safa-form>
</template>

<!-- eslint-disable vue/no-reserved-keys eslint-disable eqeqeq eslint-disable vue/valid-v-model eslint-disable vue/no-unused-components -->
<script>
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import baseFormMixin from "src/mixins/baseFormMixin"
import { uid } from "quasar"

// Partials
import UFileListRequestSys from "./partials/UFileListRequestSys.vue"
import UFileListHouseSharing from "./partials/UFileListHouseSharing.vue"
import UFileListBuildingInfo from "./partials/UFileListBuildingInfo.vue"
import UFileListShaft from "./partials/UFileListShaft.vue"
import UFileListJob from "./partials/UFileListJob.vue"
import UFileListHouse from "./partials/UFileListHouse.vue"
import UFileListShop from "./partials/UFileListShop.vue"
import UFileListApartment from "./partials/UFileListApartment.vue"

export default {
  mixins: [baseFormMixin],

  components: {
    UFileListRequestSys,
    UFileListHouseSharing,
    UFileListBuildingInfo,
    UFileListShaft,
    UFileListJob,
    UFileListHouse,
    UFileListShop,
    UFileListApartment
  },

  data () {
    return {
      title: "اطلاعات پرونده",
      formKey: "3BD8A938-C6EA-4BD2-BADF-D4FD32E84C7C",
      name: "UFileList",
      main: true,

      // Tabs
      activeRibbonTab: "file",
      activeTab: "",

      // Tree Model
      treeView: [],

      // Response
      getHierarchyCodeRes: null,
      checkIsExistCodeInSara8Res: null,
      delBaseCodeInfoRes: null,

      // Splitters
      splitterModel: 20,
      splitterModel2: 87,

      // Selected Node Value
      selectedContractId: "",
      selectedContract: {},

      // Default Nosazi Code Value
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // Privates
      _NIdRequest: "00000000-0000-0000-0000-000000000000",
      _SysCI_RequestStatus: 0,
      _Nid: 0,
      _NidCopy: 0,
      _NidH: 0,
      _NidHCopy: 0,
      _NidB: 0,
      _NidBCopy: 0,
      _NidA: 0,
      _NidACopy: 0,
      _NidJ: 0,
      _NidJCopy: 0,
      _IsKartable: false,
      _NIdWorkItem: 0,
      _NIdProcess: "00000000-0000-0000-0000-000000000000",
      _IsConfirmContractBuy: false,

      FORM_IS_EDITABLE_ERROR: "فرم در حالت ویرایش قرار دارد.",
      txtMessage: "",

      // Buttons Mode
      isBtnEditEnable: false,
      isBtnEditHistoryEnable: false,

      NodeId: "00000000-0000-0000-0000-000000000000"
    }
  },

  computed: {
    tabs () {
      return [
        {
          name: "URequestSys",
          title: "تشکیل پرونده - اطلاعات",
          label: this.selectedContract?.Header
            ? `تشکیل پرونده - ${this.selectedContract.Header}`
            : "تشکیل پرونده",
          icon: "images/estate/تشکیل پرونده.png",
          isVisible: false
        },
        {
          name: "UHouse",
          title: "اطلاعات ملک - اطلاعات",
          label: "اطلاعات ملک",
          icon: "images/estate/اطلاعات ملک.png",
          isVisible: false
        },
        {
          name: "UBuilding",
          title: "اطلاعات ساختمان - اطلاعات",
          label: "اطلاعات ساختمان",
          icon: "images/estate/اطلاعات ساختمان.png",
          isVisible: false
        },
        {
          name: "UHouseSharing",
          title: "اطلاعات دستگاه - اطلاعات",
          label: "اطلاعات دستگاه",
          icon: "images/estate/اطلاعات دستگاه.png",
          isVisible: false
        },
        {
          name: "UApartment",
          title: "اطلاعات آپارتمان - اطلاعات",
          label: "اطلاعات آپارتمان",
          icon: "images/estate/اطلاعات آپارتمان.png",
          isVisible: false
        },
        {
          name: "UShop",
          title: "اطلاعات صنفی - اطلاعات",
          label: "اطلاعات صنفی",
          icon: "images/estate/اطلاعات اصناف.png",
          isVisible: false
        },
        {
          name: "UJob",
          title: "اطلاعات شغلی - اطلاعات",
          label: "اطلاعات شغلي",
          icon: "images/estate/مشاغل.png",
          isVisible: false
        },
        {
          name: "UShaft",
          title: "اطلاعات چاه/جوی - اطلاعات",
          label: "اطلاعات چاه/جوی",
          icon: "images/estate/اطلاعات چاه.png",
          isVisible: false
        }
      ]
    }
  },

  methods: {
    baseFormLoaded () {
      if (this?.selectedNosaziCode) {
        this.baseNosaziCode = this.selectedNosaziCode
      }
    },

    loadObj () {
      this.showLoading()

      this.getHierarchyCode(
        this.baseNosaziCode.District,
        this.baseNosaziCode.Region,
        this.baseNosaziCode.Block,
        this.baseNosaziCode.House,
        this.baseNosaziCode.Building,
        this.baseNosaziCode.Apartment,
        this.baseNosaziCode.Shop
      )
    },

    // Get HierarchyCode ( Node Tree )
    getHierarchyCode (
      PDistrict,
      PRegion,
      PBlock,
      PHouse,
      PBuilding,
      PApartment,
      PShop
    ) {
      this.showLoading()

      const payload = {
        PDistrict,
        PRegion,
        PBlock,
        PHouse,
        PBuilding,
        PApartment,
        PShop
      }

      this.$services.ES.getHierarchyCode(payload)
        .then(({ data }) => {
          this.getHierarchyCodeRes = this.getResponse(data)

          if (this.getHierarchyCodeRes.success) {
            // eslint-disable-next-line no-inner-declarations
            function structureNodes (o) {
              Object.keys(o).forEach((k) => {
                if (o[k] != null && typeof o[k] === "object" && o[k]?.Childs) {
                  structureNodes(o[k].Childs)
                }

                o[k].NodeId = uid()
              })
            }

            structureNodes(this.getHierarchyCodeRes.data.GetHierarchyCodeResult)
            this.treeView = this.getHierarchyCodeRes.data.GetHierarchyCodeResult
            this.$nextTick(() => {
              try {
                let tmpResult = this.treeView.findLast((f) => f)

                this.$refs.treeView.setExpanded(tmpResult.NodeId, true)
                let q = tmpResult.Childs.find(
                  (f) => f.NIdProcess == this._NIdProcess
                )
                if (q != null) {
                  this.selectedContractId = q.NodeId
                  this.nodeSelectedChange(q)
                } else {
                  let lastNode = tmpResult.Childs.findLast((f) => f)
                  this.selectedContractId = lastNode.NodeId
                  this.nodeSelectedChange(lastNode)
                }
              } catch (ex) {
                console.error(ex)
              }
            })
          }
        })
        .catch((error) => {
          this.showError(error.message)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    save () {
      // if (!this.isValidForm()) return
      let tmpResult = true

      if (this.selectedContract != null) {
        let tmpFrm = this.$refs[this.activeTab]
        if (tmpFrm != null) {
          if (this._IsConfirmContractBuy) {
            this.hideLoading()
            this.showError("پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد")
            return false
          }
          this.showLoading()

          tmpFrm.saveCompleted = function (args) {
            this.hideLoading()
            tmpResult = args
            if (tmpResult == true) {
              this.btnVisible(false)
              tmpFrm.isEditable = false
              if (this.activeTab == "URequestSys") this.loadObj()
            }
          }.bind(this)
          tmpFrm.save()
          return tmpResult
        }
      }
    },

    saveCancel () {
      if (this.selectedContract != null && this.activeTab) {
        this.$refs[this.activeTab].isEditable = false
        this.$refs[this.activeTab].loadObj()
      }
    },

    btnVisible (isEditNew) {
      this.isEditable = isEditNew
    },

    nosaziCodeInputSearch () {
      this.showLoading()

      const payload = {
        pNosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
      }

      this.$services.ES.checkIsExistCodeInSara8(payload)
        .then(({ data }) => {
          this.checkIsExistCodeInSara8Res = this.getResponse(data)

          if (this.checkIsExistCodeInSara8Res.success) {
            if (
              !this.checkIsExistCodeInSara8Res.data
                .CheckIsExistCodeInSara8Result.IsExistCodeInSara8
            ) {
              this.showError("کد وارد شده در اطلاعات شهرسازی وجود ندارد")
              return false
            }
            this.loadObj()
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    nodeSelectedChange (node) {
      if (this.isEditable) {
        this.showError(this.FORM_IS_EDITABLE_ERROR)
        return
      }

      this.isEditable = false

      this.activeTab = ""
      this.tabs.forEach((e) => {
        e.isVisible = false
      })
      this.selectedContract = node
    },

    getIcon (value) {
      if (isNaN(value)) return

      switch (value) {
        case -4:
          return "history"

        case -2:
          return "unarchive"

        case 0:
          return "folder"

        default:
          return "border_color"
      }
    },

    handleOpenTab (tab) {
      if (!this.selectedContractId) return

      let tmpNIdProcess = "00000000-0000-0000-0000-000000000000"
      let tmpNIdType = 0
      this.txtMessage = ""

      if (
        this.baseNosaziCode.District == 0 ||
        this.baseNosaziCode.Region == 0 ||
        this.baseNosaziCode.Block == 0 ||
        this.baseNosaziCode.House == 0
      ) {
        this.txtMessage = "لطفا کدنوسازی وارد شود"
        return false
      }

      if (this.isEditable) {
        this.txtMessage = this.FORM_IS_EDITABLE_ERROR
      } else {
        // try
        // {
        this._NIdRequest = "00000000-0000-0000-0000-000000000000"
        var TmpSelectedItemMessage = { ...this.selectedContract }
        if (TmpSelectedItemMessage != null) {
          this._Nid = parseInt(TmpSelectedItemMessage.Nid)
          this._NidCopy = parseInt(TmpSelectedItemMessage.NidCopy)
          this._NidH = parseInt(TmpSelectedItemMessage.NidH)
          this._NidHCopy = parseInt(TmpSelectedItemMessage.NidHCopy)
          this._NidB = parseInt(TmpSelectedItemMessage.NidB)
          this._NidBCopy = parseInt(TmpSelectedItemMessage.NidBCopy)
          this._NidA = parseInt(TmpSelectedItemMessage.NidA)
          this._NidACopy = parseInt(TmpSelectedItemMessage.NidACopy)
          this._NidJ = parseInt(TmpSelectedItemMessage.NidJ)
          this._NidJCopy = parseInt(TmpSelectedItemMessage.NidJCopy)
          this._NIdRequest =
            TmpSelectedItemMessage.NidRequest != null
              ? TmpSelectedItemMessage.NidRequest
              : "00000000-0000-0000-0000-000000000000"
          this._SysCI_RequestStatus = parseInt(
            TmpSelectedItemMessage.SysCI_RequestStatus
          )
          tmpNIdProcess =
            TmpSelectedItemMessage.NIdProcess != null
              ? TmpSelectedItemMessage.NIdProcess
              : "00000000-0000-0000-0000-000000000000"
          tmpNIdType = parseInt(TmpSelectedItemMessage.NidType)
        } else return false
        // }
        // catch
        // {
        //     return false;
        // }

        this.isBtnEditEnable = false
        this.isBtnEditHistoryEnable = false

        this.showLoading()

        switch (tab.name) {
          case "URequestSys":
            tab.isVisible = true
            this.activeTab = "URequestSys"

            this.isBtnEditEnable = !!(
              (this._SysCI_RequestStatus == 0 ||
                this._SysCI_RequestStatus == 4) &&
              tmpNIdType != 1
            )
            this.isBtnEditHistoryEnable = !!(
              (this._SysCI_RequestStatus == 0 ||
                this._SysCI_RequestStatus == 4) &&
              tmpNIdType != 1
            )

            this.$refs.URequestSys.uRequestSys(
              tmpNIdProcess,
              this.baseNosaziCode,
              // convertNosaziCodeObjectToString(this.baseNosaziCode),
              tmpNIdType
            )

            break

          case "UHouse":
            if (this._NidH == 0) {
              this.txtMessage = "اطلاعات ملک ایجاد نشده"
              this.hideLoading()
              return false
            }

            tab.isVisible = true
            this.activeTab = "UHouse"

            this.isBtnEditEnable = !!(
              (this._SysCI_RequestStatus == 0 ||
                this._SysCI_RequestStatus == 4) &&
              this._IsKartable == true &&
              tmpNIdProcess == this._NIdProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UHouse.uHouse2(
              this._NidH,
              this._NidHCopy,
              this._NIdRequest
            )

            break

          case "UBuilding":
            if (this._NidB == 0) {
              this.txtMessage = "اطلاعات ساختمان ایجاد نشده"
              this.hideLoading()
              return
            }

            tab.isVisible = true
            this.activeTab = "UBuilding"

            this.isBtnEditEnable = !!(
              (this._SysCI_RequestStatus == 0 ||
                this._SysCI_RequestStatus == 4) &&
              this._IsKartable == true &&
              tmpNIdProcess == this._NIdProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UBuilding.uBuilding2(this._NidB, this._NidBCopy)

            break

          case "UHouseSharing":
            if (this._NidB == 0) {
              this.txtMessage = "اطلاعات دستگاه ایجاد نشده"
              this.hideLoading()
              return
            }

            tab.isVisible = true
            this.activeTab = "UHouseSharing"

            this.isBtnEditEnable = !!(
              (this._SysCI_RequestStatus == 0 ||
                this._SysCI_RequestStatus == 4) &&
              this._IsKartable == true &&
              tmpNIdProcess == this._NIdProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UHouseSharing.uHouseSharing(
              this._NidB,
              this._NidBCopy,
              this._NIdRequest
            )

            break

          case "UApartment":
            if (this._NidA == 0) {
              this.txtMessage = "اطلاعات آپارتمان ایجاد نشده"
              this.hideLoading()
              return
            }

            tab.isVisible = true
            this.activeTab = "UApartment"

            this.isBtnEditEnable = !!(
              (this._SysCI_RequestStatus == 0 ||
                this._SysCI_RequestStatus == 4) &&
              this._IsKartable == true &&
              tmpNIdProcess == this._NIdProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UApartment.uApartment2(this._NidA, this._NidACopy)

            break

          case "UShop":
            if (this._NidJ == 0) {
              this.txtMessage = "اطلاعات صنفی ایجاد نشده"
              this.hideLoading()
              return
            }

            tab.isVisible = true
            this.activeTab = "UShop"

            this.isBtnEditEnable = !!(
              (this._SysCI_RequestStatus == 0 ||
                this._SysCI_RequestStatus == 4) &&
              this._IsKartable == true &&
              tmpNIdProcess == this._NIdProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UShop.uShop2(this._NidJ, this._NidJCopy)

            break

          case "UJob":
            if (this._NidJ == 0) {
              this.txtMessage = "اطلاعات شغلی ایجاد نشده"
              this.hideLoading()
              return
            }

            tab.isVisible = true
            this.activeTab = "UJob"

            this.isBtnEditEnable = !!(
              (this._SysCI_RequestStatus == 0 ||
                this._SysCI_RequestStatus == 4) &&
              this._IsKartable == true &&
              tmpNIdProcess == this._NIdProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UJob.uJob(this._NidJ, this._NidJCopy)

            break

          case "UShaft":
            tab.isVisible = true
            this.activeTab = "UShaft"

            this.isBtnEditEnable = !!(
              (this._SysCI_RequestStatus == 0 ||
                this._SysCI_RequestStatus == 4) &&
              this._IsKartable == true &&
              tmpNIdProcess == this._NIdProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UShaft.uShaft(tmpNIdProcess)

            break
        }
        this.$refs[tab.name].loadCompleted = function (args) {
          this.hideLoading()
        }

        // # todo
        // this.grd_HeaderShow = true;
        this.btnVisible(false)

        // # todo
        // var tmpItem = UPanGroupForm.Items.FirstOrDefault(f => (f as RadPane).Tag.ToString() == ItemKey.ToString());
        // if (tmpItem == null)
        //     UPanGroupForm.Items.Add(tmpPane);
        // else
        //     (tmpItem as RadPane).IsSelected = true;
      }
    },

    handleCloseTab (tab) {
      if (this.isEditable) {
        this.showError(this.FORM_IS_EDITABLE_ERROR)
        return
      }

      tab.isVisible = false

      // eslint-disable-next-line eqeqeq
      if (this.activeTab == tab.name) {
        let index = this.tabs.findLast((e) => e.isVisible === true)
        this.activeTab = index ? index.name : ""
      }
      this.$forceUpdate()
    },

    async btnSaveClick () {
      if (this.save() == true) {
        // this.IsNew = false;
      }
    },

    btnCancelClick () {
      this.btnVisible(false)
      this.saveCancel()
    },

    btnEditClick () {
      if (this.selectedContract != null) {
        if (this.activeTab) {
          this.btnVisible(true)
          this.$refs[this.activeTab].isEditable = true
          if (this.activeTab == "UHouse") {
            this.$refs.UHouse.$refs.UHouseSpecifications.CI_ContractPriorityTypeMode =
              "r"
          }
        }
      }
    },

    btnDeleteClick () {
      this.showConfirm("آیا از حذف کد انتخاب شده اطمینان دارید؟").onOk(() => {
        this.showLoading()

        const payload = {
          pStrCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
        }

        this.$services.ES.delBaseCodeInfo(payload)
          .then(({ data }) => {
            this.delBaseCodeInfoRes = this.getResponse(data)

            if (this.delBaseCodeInfoRes.success) {
              this.showSuccess("کد مورد نظر با موفقیت حذف شد")
              this.getHierarchyCode()
            }
          })
          .catch((error) => {
            this.showError(error.message)
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },

    btnShowOnMapClick () {
      if (!this.selectedContract) {
        this.showError("لطفا ردیف موردنظر از لیست انتخاب شود")
        return
      }

      if (!this.selectedContract.Wkt) {
        this.showError("کد موردنظر در املاک فاقد نقشه می باشد")
      }
    },

    btnExitClick () {
      this.hideSidebar(this.name)
    }
  },

  created () {
    this.baseFormLoaded()
    this.loadObj()
  }
}
</script>

<style lang="scss" scoped>
.txt-message {
  color: #975625;
  font-size: 13px;
  font-weight: 600;
  margin: 0 auto !important;
  // animation: ripple 1.5s infinite linear;
}

@keyframes ripple {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
