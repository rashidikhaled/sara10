<template>
  <safa-form
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
    :id="formKey"
    :caption="title"
  >
    <FormWrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="isExistCodeRes" />
        <safa-status :result="delBaseCodeInfoRes" />
      </template>
      <fit>
        <div>
          <EstateActions
            @action="handleOpenTab"
            :disable="!selectedContractId"
            :activeTab="activeTab"
          />
        </div>
        <q-separator class="q-my-sm" />
        <FormRow>
          <FormControl>
            <safa-text
              v-model="selectedContract.NIdWorkItem"
              label="کد ارجاع"
              label-width="75px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="selectedContract.RequestType"
              label="نوع درخواست"
              label-width="75px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="selectedContract.RequesterName"
              label="نام متقاضی"
              label-width="75px"
              m="r"
            />
          </FormControl>
          <nosazi-code-input v-model="baseNosaziCode" @enter="nosaziSearch" />
        </FormRow>
        <q-separator class="q-my-sm" />
        <safa-splitter v-model="spModel" vertical margin="0" :limits="[10, 40]">
          <template v-slot:before>
            <div class="flex column full-height">
              <fit>
                <q-tree
                  class="bordered fit"
                  default-expand-all
                  selected-color="primary"
                  :nodes="treeNodes"
                  :selected.sync="selectedContractId"
                  node-key="NodeId"
                  label-key="Header"
                  children-key="Childs"
                  :no-selection-unset="true"
                  ref="tree"
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
                <q-separator class="q-my-sm" />
                <div class="column q-px-sm items-end text-primary">
                  <span dir="ltr">{{
                    `Label Center X : ${selectedContract?.CenterX ?? " --- "}`
                  }}</span>
                  <span dir="ltr">{{
                    `Label Center Y : ${selectedContract?.CenterY ?? " --- "}`
                  }}</span>
                </div>
              </fit>
            </div>
          </template>
          <template v-slot:after>
            <fit>
              <safa-tabs
                v-model="activeTab"
                :padding="false"
                v-if="tabs.length !== 0"
              >
                <template v-slot:tabs>
                  <tab-menu
                    v-for="tab in tabs"
                    :key="tab.name"
                    :name="tab.name"
                    :label="tab.label"
                    closable
                    @close="closeTab(tab)"
                  />
                </template>
                <tab-content v-for="tab in tabs" :key="tab.name" v-bind="tab">
                  <fit>
                    <component
                      :is="tab.name"
                      hideTitle
                      :baseNosaziCode="baseNosaziCode"
                      :currentObj="firstChild"
                      :ref="tab.name"
                      @afterSave="afterSave"
                    />
                    <!-- :request="tab.request" -->
                  </fit>
                </tab-content>
              </safa-tabs>
              <div class="flex items-center justify-center full-height" v-else>
                <safa-notice
                  >فرمی جهت دریافت سوابق اطلاعات انتخاب نشده است.</safa-notice
                >
              </div>
            </fit>
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
          <!-- <btn-edit
            v-if="!isEditable"
            label="ویرایش"
            @click="btnEditClick"
            :disable="!isBtnEditEnable"
            spId="69f56c1e-fea5-4759-948b-e5e0cf40c0c0"
            spCaption="دکمه ویرایش"
          /> -->
          <btn-edit
            v-if="!isEditable"
            label="ویرایش سوابق"
            @click="btnEditClick"
            />
            <!-- :disable="!isBtnEditHistoryEnable" -->
            <!-- spId="69f56c1e-fea5-4759-948b-e5e0cf40c0c0"
            spCaption="دکمه ویرایش سوابق" -->
          <!-- <btn-edit
            label="نمایش ملک روی نقشه"
            @click="btnShowMap_Click"
            :disable="!isBtnEditHistoryEnable"
          /> -->
          <safa-label class="txt-message">{{ txtMessage }}</safa-label>
        </form-actions>
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import { uid } from "quasar"

const editableModeErr = "فرم در حالت ویرایش قرار دارد."

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "سوابق اطلاعات",
      formKey: "0FCA7E42-F621-4819-9B1C-05981CE80EF2",
      name: "UFileListHistory",
      main: true,

      // #region variables
      firstChild: {},
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      treeNodes: [],
      selectedContractId: "",
      selectedContract: {},
      tabs: [],
      activeTab: "",

      spModel: 15,

      // #region services
      loadObjRes: null,
      isExistCodeRes: null,
      delBaseCodeInfoRes: null,

      // Privates
      nidRequest: "00000000-0000-0000-0000-000000000000",
      SysCIRequestStatus: 0,
      nid: 0,
      nidCopy: 0,
      nidH: 0,
      nidHCopy: 0,
      nidB: 0,
      nidBCopy: 0,
      nidA: 0,
      nidACopy: 0,
      nidJ: 0,
      nidJCopy: 0,
      isKartable: false,
      nidWorkItem: 0,
      nidProcess: "00000000-0000-0000-0000-000000000000",
      isConfirmContractBuy: false,

      txtMessage: "",

      // Buttons Mode
      isBtnEditEnable: false,
      isBtnEditHistoryEnable: false,

      NodeId: "00000000-0000-0000-0000-000000000000"
    }
  },

  mounted () {
    if (this?.selectedNosaziCode) {
      this.baseNosaziCode = this.selectedNosaziCode
    }
    this.loadObj()
  },
  watch: {
    selectedContractId () {
      this.firstChild = this.selectedContract
    },
    activeTab: {
      // handler (newVal, oldVal) {
      //   this.oldVal =
      // }
    }
  },

  methods: {
    afterSave () {
      this.isEditable = false
    },
    createNodes (o) {
      Object.keys(o).forEach((k) => {
        if (o[k] !== null && typeof o[k] === "object" && o[k]?.Childs) {
          this.createNodes(o[k].Childs)
        }
        o[k].NodeId = uid()
      })
    },
    // Get HierarchyCode ( Node Tree )
    async loadObj () {
      try {
        this.showLoading()
        const payload = {
          PDistrict: this.baseNosaziCode.District,
          PRegion: this.baseNosaziCode.Region,
          PBlock: this.baseNosaziCode.Block,
          PHouse: this.baseNosaziCode.House,
          PBuilding: this.baseNosaziCode.Building,
          PApartment: this.baseNosaziCode.Apartment,
          PShop: this.baseNosaziCode.Shop
        }
        const { data } = await this.$services.ES.getHierarchyCode(payload)
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res = this.loadObjRes.data.GetHierarchyCodeResult
          this.createNodes(res)
          this.treeNodes = res
          this.firstChild = res[res.length - 1]?.Childs[0] ?? {}
          // this.firstChild = res[res.length - 1].Childs.find(i => i.NIdProcess === this.selectedContract.NIdProcess) ?? {}
          this.$nextTick(() => {
            try {
              if (this.treeNodes.length === 0) return
              let tmpResult = this.treeNodes.findLast((f) => f)
              this.$refs.tree.setExpanded(tmpResult.NodeId, true)
              let q = tmpResult.Childs.find(
                (f) => f.NIdProcess === this.nidProcess
              )
              if (q !== null && q !== undefined) {
                this.selectedContractId = q.NodeId
                this.nodeSelectedChange(q)
              } else {
                let lastNode = tmpResult.Childs.findLast((f) => f)
                this.selectedContractId = lastNode.NodeId
                this.nodeSelectedChange(lastNode)
              }
            } catch (e) {
              console.error(e)
            }
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    save () {
      let tmpResult = true
      if (this.selectedContract !== null) {
        let tmpFrm = this.$refs[this.activeTab]
        if (tmpFrm !== null) {
          if (this.isConfirmContractBuy) {
            this.hideLoading()
            this.showError("پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد")
            return false
          }
          // if (this.ContractBuy_Privilege.filter(b => b.PrivilegePrice == null).length > 0)
          // {
          //   this.hideLoading()
          //   this.showError("لطفا اطلاعات ارزش ریالی را وارد نمایید")
          //   return false
          // }
          // if (this.ContractBuy_Info.IsCapitaBelowSeparationCriterion == null)
          // {
          //   this.hideLoading()
          //   this.showError("لطفا اطلاعات -سهم سرانه زیر حد نصاب ضابطه تفکیک می باشد- را وارد نمایید")
          //   return false
          // }
          // if (this.ContractBuy_Info.IsMunicipalityTakenAsLand == null)
          // {
          //   this.hideLoading()
          //   this.showError("لطفا اطلاعات -سهم شهرداری به صورت زمین اخذ می گردد- را وارد نمایید")
          //   return false
          // }

          this.showLoading()
          tmpFrm.saveCompleted = function (args) {
            this.hideLoading()
            tmpResult = args
            if (tmpResult === true) {
              this.btnVisible(false)
              tmpFrm.isEditable = false
              if (this.activeTab === "URequestSys") this.loadObj()
            }
          }.bind(this)
          tmpFrm.save()
          return tmpResult
        }
      }
    },

    saveCancel () {
      if (this.selectedContract !== null && this.activeTab) {
        this.$refs[this.activeTab][0].isEditable = false
        this.$refs[this.activeTab][0].loadObj()
      }
    },

    btnVisible (isEditNew) {
      this.isEditable = isEditNew
    },

    async nosaziSearch () {
      try {
        this.showLoading()
        const { data } = await this.$services.ES.checkIsExistCodeInSara8({
          pNosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
        })
        this.isExistCodeRes = this.getResponse(data)
        if (this.isExistCodeRes.success) {
          if (
            this.isExistCodeRes.data.CheckIsExistCodeInSara8Result
              .IsExistCodeInSara8
          ) {
            await this.loadObj()
          } else {
            this.showError("کد وارد شده در اطلاعات شهرسازی وجود ندارد")
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    nodeSelectedChange (node) {
      if (this.isEditable) {
        this.showError(editableModeErr)
        return
      }
      this.isEditable = false
      this.activeTab = ""
      this.tabs = []
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
      console.log("taaaaaaaab:", tab)
      if (!this.selectedContractId) return

      let tmpNIdProcess = "00000000-0000-0000-0000-000000000000"
      let tmpNIdType = 0
      this.txtMessage = ""

      if (
        this.baseNosaziCode.District === 0 ||
        this.baseNosaziCode.Region === 0 ||
        this.baseNosaziCode.Block === 0 ||
        this.baseNosaziCode.House === 0
      ) {
        this.txtMessage = "لطفا کدنوسازی وارد شود."
        return false
      }

      if (this.isEditable) {
        this.txtMessage = editableModeErr
      } else {
        // try
        // {
        this.nidRequest = "00000000-0000-0000-0000-000000000000"
        var TmpSelectedItemMessage = { ...this.selectedContract }
        if (TmpSelectedItemMessage !== null) {
          this.nid = parseInt(TmpSelectedItemMessage.Nid)
          this.nidCopy = parseInt(TmpSelectedItemMessage.NidCopy)
          this.nidH = parseInt(TmpSelectedItemMessage.NidH)
          this.nidHCopy = parseInt(TmpSelectedItemMessage.NidHCopy)
          this.nidB = parseInt(TmpSelectedItemMessage.NidB)
          this.nidBCopy = parseInt(TmpSelectedItemMessage.NidBCopy)
          this.nidA = parseInt(TmpSelectedItemMessage.NidA)
          this.nidACopy = parseInt(TmpSelectedItemMessage.NidACopy)
          this.nidJ = parseInt(TmpSelectedItemMessage.NidJ)
          this.nidJCopy = parseInt(TmpSelectedItemMessage.NidJCopy)
          this.nidRequest =
            TmpSelectedItemMessage.NidRequest !== null
              ? TmpSelectedItemMessage.NidRequest
              : "00000000-0000-0000-0000-000000000000"
          this.SysCIRequestStatus = parseInt(
            TmpSelectedItemMessage.SysCI_RequestStatus
          )
          tmpNIdProcess =
            TmpSelectedItemMessage.NIdProcess !== null
              ? TmpSelectedItemMessage.NIdProcess
              : "00000000-0000-0000-0000-000000000000"
          // tmpNIdType = parseInt(TmpSelectedItemMessage.NidType)
        } else return false
        // }
        // catch
        // {
        //     return false;
        // }

        this.isBtnEditEnable = false
        this.isBtnEditHistoryEnable = false

        this.addNewTabs(tab.name, tab.title, this.selectedContract)

        // this.showLoading()

        switch (tab.name) {
          case "UMortgageDoc":
            tab.isVisible = true
            this.activeTab = "UMortgageDoc"
            this.isBtnEditHistoryEnable = !!(
              (this.SysCIRequestStatus === 0 ||
                this.SysCIRequestStatus === 4) &&
              tmpNIdType !== 1
            )
            console.log("first : UMortgageDoc")
            break

          case "UContractBuyList":
            tab.isVisible = true
            this.activeTab = "UContractBuyList"

            this.isBtnEditEnable = !!(
              (this.SysCIRequestStatus === 0 ||
                this.SysCIRequestStatus === 4) &&
              tmpNIdType !== 1
            )
            this.isBtnEditHistoryEnable = !!(
              (this.SysCIRequestStatus === 0 ||
                this.SysCIRequestStatus === 4) &&
              tmpNIdType !== 1
            )

            this.hideLoading()
            this.$nextTick(() => {
              this.$refs.UContractBuyList[0].loadObj(tmpNIdProcess)
            })

            break

          case "UHouse":
            if (this.nidH === 0) {
              this.txtMessage = "اطلاعات ملک ایجاد نشده"
              this.hideLoading()
              return false
            }

            tab.isVisible = true
            this.activeTab = "UHouse"

            this.isBtnEditEnable = !!(
              (this.SysCIRequestStatus === 0 ||
                this.SysCIRequestStatus === 4) &&
              this.isKartable === true &&
              tmpNIdProcess === this.nidProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UHouse.uHouse2(
              this.nidH,
              this.nidHCopy,
              this.nidRequest
            )

            break

          case "UBuilding":
            if (this.nidB === 0) {
              this.txtMessage = "اطلاعات ساختمان ایجاد نشده"
              this.hideLoading()
              return
            }

            tab.isVisible = true
            this.activeTab = "UBuilding"

            this.isBtnEditEnable = !!(
              (this.SysCIRequestStatus === 0 ||
                this.SysCIRequestStatus === 4) &&
              this.isKartable === true &&
              tmpNIdProcess === this.nidProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UBuilding.uBuilding2(this.nidB, this.nidBCopy)

            break

          case "UHouseSharing":
            if (this.nidB === 0) {
              this.txtMessage = "اطلاعات دستگاه ایجاد نشده"
              this.hideLoading()
              return
            }

            tab.isVisible = true
            this.activeTab = "UHouseSharing"

            this.isBtnEditEnable = !!(
              (this.SysCIRequestStatus === 0 ||
                this.SysCIRequestStatus === 4) &&
              this.isKartable === true &&
              tmpNIdProcess === this.nidProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UHouseSharing.uHouseSharing(
              this.nidB,
              this.nidBCopy,
              this.nidRequest
            )

            break

          case "UApartment":
            if (this.nidA === 0) {
              this.txtMessage = "اطلاعات آپارتمان ایجاد نشده"
              this.hideLoading()
              return
            }

            tab.isVisible = true
            this.activeTab = "UApartment"

            this.isBtnEditEnable = !!(
              (this.SysCIRequestStatus === 0 ||
                this.SysCIRequestStatus === 4) &&
              this.isKartable === true &&
              tmpNIdProcess === this.nidProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UApartment.uApartment2(this.nidA, this.nidACopy)

            break

          case "UShop":
            if (this.nidJ === 0) {
              this.txtMessage = "اطلاعات صنفی ایجاد نشده"
              this.hideLoading()
              return
            }

            tab.isVisible = true
            this.activeTab = "UShop"

            this.isBtnEditEnable = !!(
              (this.SysCIRequestStatus === 0 ||
                this.SysCIRequestStatus === 4) &&
              this.isKartable === true &&
              tmpNIdProcess === this.nidProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UShop.uShop2(this.nidJ, this.nidJCopy)

            break

          case "UJob":
            if (this.nidJ === 0) {
              this.txtMessage = "اطلاعات شغلی ایجاد نشده"
              this.hideLoading()
              return
            }

            tab.isVisible = true
            this.activeTab = "UJob"

            this.isBtnEditEnable = !!(
              (this.SysCIRequestStatus === 0 ||
                this.SysCIRequestStatus === 4) &&
              this.isKartable === true &&
              tmpNIdProcess === this.nidProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UJob.uJob(this.nidJ, this.nidJCopy)

            break

          case "UShaft":
            tab.isVisible = true
            this.activeTab = "UShaft"

            this.isBtnEditEnable = !!(
              (this.SysCIRequestStatus === 0 ||
                this.SysCIRequestStatus === 4) &&
              this.isKartable === true &&
              tmpNIdProcess === this.nidProcess
            )
            this.isBtnEditHistoryEnable = true

            this.$refs.UShaft.uShaft(tmpNIdProcess)

            break
        }
        this.$refs[tab.name].loadCompleted = function (args) {
          this.hideLoading()
        }

        // # todo
        this.grd_HeaderShow = true
        this.btnVisible(false)

        // # todo
        // var tmpItem = UPanGroupForm.Items.FirstOrDefault(f => (f).Tag.ToString() === ItemKey.ToString());
        // if (tmpItem === null)
        //     UPanGroupForm.Items.Add(tmpPane);
        // else
        //     (tmpItem).IsSelected = true;
      }
    },
    addNewTabs (name, label, request) {
      if (!request) return
      this.request = request
      //   const NidWorkItem = request.NidWorkItem
      const tabKey = `${name}`
      const alreadyTabIndex = this.tabs.findIndex(
        (x) => x.name === tabKey // .startsWith(`${name}-`)
      )
      if (alreadyTabIndex > -1) {
        // const alreadyTab = this.tabs[alreadyTabIndex];
        this.tabs.splice(alreadyTabIndex, 1, {
          name: tabKey,
          label: `${label}`,
          request
        })
      } else {
        this.tabs.push({
          name: tabKey,
          label: `${label}`,
          request
        })
      }
      setTimeout(() => {
        this.activeTab = tabKey
      }, 10)
    },

    closeTab ({ name }) {
      this.tabs = this.tabs.filter((x) => x.name !== name)
      //   this.activeTab = this.tabs.findLast((f) => f.name)
      const lastTab = this.tabs.length - 1
      if (lastTab >= 0) {
        this.activeTab = this.tabs[lastTab].name
      }
      if (this.$refs[name] && this.$refs[name][0]) {
        this.$refs[name][0].$destroy()
      }
    },

    handleCloseTab (tab) {
      if (this.isEditable) {
        this.showError(editableModeErr)
        return
      }

      tab.isVisible = false

      // eslint-disable-next-line eqeqeq
      if (this.activeTab === tab.name) {
        let index = this.tabs.findLast((e) => e.isVisible === true)
        this.activeTab = index ? index.name : ""
      }
      this.$forceUpdate()
    },

    async btnSaveClick () {
      if (this.selectedContract !== null) {
        if (
          this.activeTab &&
          this.$refs[this.activeTab][0].isEditable === true
        ) {
          this.$refs[this.activeTab][0].saveObj()
          this.$nextTick(() => {
            if (
              this.$refs[this.activeTab][0].saveObjRes &&
              this.$refs[this.activeTab][0].saveObjRes.success
            ) {
              this.$refs[this.activeTab][0].isEditable = false
              this.btnCancelClick()
            }
          })
        }
      } else {
        if (this.save() === true) {
          // this.IsNew = false;
        }
      }
    },

    btnCancelClick () {
      this.btnVisible(false)
      this.saveCancel()
    },

    btnEditClick () {
      if (this.selectedContract !== null) {
        if (this.activeTab) {
          this.$refs[this.activeTab][0].isEditable = true
          this.btnVisible(true)
          if (this.activeTab === "UHouse") {
            this.$refs.UHouse.$refs.UHouseSpecifications.CI_ContractPriorityTypeMode =
              "r"
          }
        }
      }
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
  }
}
</script>

<style lang="scss" scoped>
.txt-message {
  color: #ff0000;
  font-size: 13px;
  font-weight: 600;
  margin: 0 auto !important;
  animation: ripple 2s infinite linear;
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
