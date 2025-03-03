<template>
  <form-wrapper
    :padding="false"
    :title="getFormTitle"
    @close="removeForm('USearchUParvandeh')"
  >
    <template #header>
      <safa-status :result="loadHousesFromBlockRes" />
      <safa-status :result="loadBlockRes" />
    </template>
    <fit>
      <safa-splitter
        v-model="dynamicWidth"
        vertical
        margin="0"
        :limits="[dynamicWidth, dynamicWidth]"
      >
        <template v-slot:before>
          <div class="flex justify-between column full-height q-pb-sm">
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
                    @lazy-load="onLazyLoad"
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
            <div class="flex column items-center justify-between">
              <safa-label class="q-mb-sm">{{ labels.totalCount }}</safa-label>
              <q-pagination
                size="12px"
                v-model="pagination.current"
                ref="pagination"
                :max="pagination.max"
                :max-pages="pagination.maxPages"
                boundary-links
                :boundary-numbers="false"
                @input="paginationUpdated"
              />
            </div>
          </div>
        </template>

        <template v-slot:after>
          <fit>
            <safa-tabs :padding="false" fit class="fit" v-model="activeTab">
              <template v-slot:tabs>
                <tab-menu
                  :padding="false"
                  name="BlockInfo"
                  label="مشخصات بلوک"
                />
                <tab-menu name="Description" label="توضیحات" />
                <tab-menu name="AuditInfo" label="اطلاعات ممیزی" />
              </template>
              <tab-content name="BlockInfo">
                <USearchUBlockBlockInfo
                  ref="USearchUBlockBlockInfo"
                  :dataContext="dataContext"
                  :isLoadedFromMenu="params.IsLoadedFromMenu"
                />
              </tab-content>
              <tab-content name="Description">
                <USearchUBlockDescription
                  ref="USearchUBlockDescription"
                  :dataContext="dataContext"
                  :isLoadedFromMenu="params.IsLoadedFromMenu"
                />
              </tab-content>
              <tab-content :padding="false" name="AuditInfo">
                <USearchUBlockAuditInfo
                  ref="USearchUBlockAuditInfo"
                  :dataContext="dataContext"
                  :tmpNosaziCode="tmpNosaziCode"
                  :isLoadedFromMenu="params.IsLoadedFromMenu"
                  @auditInfoHouseDblClick="
                    $emit('auditInfoHouseDblClick', $event)
                  "
                />
              </tab-content>
            </safa-tabs>
          </fit>
        </template>
      </safa-splitter>
    </fit>

    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        :showEditButton="false"
      >
        <template v-slot:before>
          <div class="flex items-center justify-between full-width">
            <div class="q-gutter-x-xs">
              <btn-default label="گزارش" @click="btnReportClick" />
              <btn-default label="گزارش املاک" @click="btnReportAmlakClick" />
              <btn-default label="ارجاع به ممیز" @click="btnAssignClick" />
            </div>

            <safa-label>{{ labels.surveyor }}</safa-label>
          </div>
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
  </form-wrapper>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"

// Components
import USearchUBlockBlockInfo from "./u-search-u-block-partials/USearchUBlockBlockInfo"
import USearchUBlockDescription from "./u-search-u-block-partials/USearchUBlockDescription"
import USearchUBlockAuditInfo from "./u-search-u-block-partials/USearchUBlockAuditInfo"
import USearchUAssignToSurveyor from "./UAssignToSurveyor"

// Utils
import { uid } from "quasar"

export default {
  name: "UParvandeh",

  mixins: [baseFormMixin, mapMixin],

  components: {
    USearchUBlockBlockInfo,
    USearchUBlockDescription,
    USearchUAssignToSurveyor,
    USearchUBlockAuditInfo
  },

  props: {
    params: Object,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      // Context
      dataContext: {
        Base_BlockInfo: {},
        Base_BlockOrganize: [],
        Base_BlockPath: [],
        Base_BlockPathConstant: [],
        Base_Info: {},
        Base_NosaziCode: {},
        Base_PreCodeInfo: [],
        Base_AddressPostCode: []
      },
      tmpNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      pagination: {
        current: 1,
        max: 0,
        maxPages: 4,
        pageSize: 20
      },
      activeComponent: {},
      labels: {
        totalCount: "",
        surveyor: ""
      },
      treeView: [],
      houseTreeContainer: {
        list: [],
        treeSize: 0,
        current: 1,
        pageSize: 20
      },
      isLoading: false,
      activeTab: "BlockInfo",

      // Tree
      selectedContractId: "",
      expandedContractId: "",

      // Popups
      showAssignToSurveyor: false,

      // Responses
      loadHousesFromBlockRes: null,
      loadBlockRes: null
    }
  },

  computed: {
    getFormTitle () {
      return `اطلاعات بلوک (${this.tmpNosaziCode.Block}-${this.tmpNosaziCode.Region}-${this.tmpNosaziCode.District})`
    },
    dynamicWidth () {
      const layoutWidth = this.$store.getters["ui/layoutSplitterWidth"]
      const width = window.innerWidth / (100 / layoutWidth) / 100 + 15
      if (layoutWidth < 40) return 50
      return width > 23 ? 23 : width
    }
  },

  methods: {
    loadObj () {
      this.createTree()
      this.showBlockOnMap()
    },

    createTree () {
      if (this.pagination.current < 0) {
        this.houseTreeContainer.list = []
        this.houseTreeContainer.treeSize = 0
      }
      this.houseTreeContainer.current = this.pagination.current
      this.houseTreeContainer.pageSize = this.pagination.pageSize

      this.showLoading()

      const from =
        (this.pagination.current === 1 ? 0 : this.pagination.current - 1) *
        this.pagination.pageSize
      const to = from + this.pagination.pageSize

      this.$services.SO.loadHousesFromBlock({
        pDistrict: this.tmpNosaziCode.District,
        pRegion: this.tmpNosaziCode.Region,
        pBlock: this.tmpNosaziCode.Block,
        pFromRow: from,
        pToRow: to
      })
        .then(({ data }) => {
          const self = this

          this.loadHousesFromBlockRes = this.getResponse(data)

          if (this.loadHousesFromBlockRes.success) {
            this.treeView = []
            const tmpTreeView = []

            this.$refs.USearchUBlockAuditInfo.loadSurveyInfo()
            // this.loadSurveyInfo()
            this.loadBlockInfo()

            // dpHouseList.ItemCount = this.loadHousesFromBlockRes.data.HousesCount
            this.labels.totalCount = `تعداد ملکها : ${this.loadHousesFromBlockRes.data.HousesCount}`

            if (this.loadHousesFromBlockRes.data.BlockSurveyor) {
              this.labels.surveyor = `ارجاع شده به ممیز : ${this.loadHousesFromBlockRes.data.BlockSurveyor.SName} ${this.loadHousesFromBlockRes.data.BlockSurveyor.SFamily}`
            }

            this.selectedContractId = uid()
            this.expandedContractId = this.selectedContractId

            tmpTreeView.push({
              Header: `${this.tmpNosaziCode.District}-${this.tmpNosaziCode.Region}-${this.tmpNosaziCode.Block}-0-0-0-0`,
              Tag: `${this.tmpNosaziCode.District}-${this.tmpNosaziCode.Region}-${this.tmpNosaziCode.Block}-0-0-0-0`,
              Childs: [],
              IsLoadOnDemandEnabled: true,
              IsExpanded: true,
              icon: "domain",
              iconColor: "primary",
              NodeId: this.selectedContractId
            })

            const tmpTree = this.loadHousesFromBlockRes.data.HousesList.sort(
              (a, b) => a.House - b.House
            )

            if (tmpTree && tmpTree.length > 0) {
              if (this.pagination.current > 0) {
                tmpTree.forEach((item) => {
                  this.houseTreeContainer.list.push(item)
                })
              } else this.treeView = tmpTree

              this.houseTreeContainer.treeSize =
                this.loadHousesFromBlockRes.data.HousesCount
              this.houseTreeContainer.current = this.pagination.current
              this.houseTreeContainer.pageSize = this.pagination.pageSize

              this.pagination.max = Math.ceil(
                this.loadHousesFromBlockRes.data.HousesCount /
                  this.pagination.pageSize
              )
              this.isLoading = true

              tmpTree.forEach((item) => {
                const tmpCodeInfo = {
                  Header: item.NosaziCodestr,
                  Tag: item,
                  Childs: [],
                  IsLoadOnDemandEnabled: true,
                  IsExpanded: true,
                  icon: "home",
                  iconColor:
                    item.EumRequiredRevisit === 0 ? "red-10" : "green-8",
                  lazy: true,
                  NodeId: uid()
                }
                tmpTreeView[0].Childs.push(tmpCodeInfo)
              })

              this.treeView = tmpTreeView
              this.$nextTick(() => {
                self.$refs.treeView.expandAll()
                self.isLoading = true
              })
            }
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

    loadBlockInfo () {
      this.showLoading()

      this.$services.SO.loadBlock({
        pDistrict: this.tmpNosaziCode.District,
        pRegion: this.tmpNosaziCode.Region,
        pBlock: this.tmpNosaziCode.Block
      })
        .then(async ({ data }) => {
          this.loadBlockRes = this.getResponse(data)

          if (this.loadBlockRes.success) {
            this.dataContext = this.loadBlockRes.data
            if (!this.dataContext.Base_AddressPostCode) {
              this.dataContext.Base_AddressPostCode = []
            }
            if (!this.dataContext.Base_BlockPath) {
              this.dataContext.Base_BlockPath = []
            }

            await this.log({
              action: this.logActions.view,
              bizCode: this.loadBlockRes.data.Base_BlockInfo.NidBase,
              bizCodeTitle: "NidBase",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
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

    nodeDblClick (node) {
      this.$emit("blockNodeDblClick", {
        node,
        houseTreeContainer: this.houseTreeContainer
      })
    },

    showBlockOnMap () {
      this.setLayoutSplitterWidth(65)
      const code = `${this.tmpNosaziCode.District}-${this.tmpNosaziCode.Region}-${this.tmpNosaziCode.Block}-`
      this.showOnMapByExpression(`and (Code Like '${code}%')`)
      // this.showCodeOnMap(code, true)
    },

    paginationUpdated () {
      if (this.isLoading) return
      this.createTree()
    },

    btnAssignClick () {
      const self = this
      this.showAssignToSurveyor = true
      this.$nextTick(() => {
        self.$refs.USearchUAssignToSurveyor.loadObj({
          District: this.tmpNosaziCode.District,
          Region: this.tmpNosaziCode.Region,
          Block: this.tmpNosaziCode.Block,
          IsBlock: true
        })
      })
    },

    btnReportClick () {
      const reportPath = "/Surveyor/RptBlock"
      const queryParams = {
        NidBase: this.dataContext.Base_BlockInfo.NidBase
      }
      this.showReport(reportPath, queryParams)
    },

    btnReportAmlakClick () {
      const reportPath = "/Surveyor/RptBlockAmlak"
      const queryParams = {
        NidBase: this.dataContext.Base_BlockInfo.NidBase
      }
      this.showReport(reportPath, queryParams)
    },

    done ({ msg }) {
      this.showAssignToSurveyor = false

      if (msg) {
        this.showSuccess(msg)
      }
    },

    onLazyLoad ({ node, key, done, fail }) {
      setTimeout(() => {
        done([])
      }, 500)
    }
  },

  created () {
    Object.assign(this.tmpNosaziCode, {
      District: this.params.District,
      Region: this.params.Region,
      Block: this.params.Block
    })
  }
}
</script>
