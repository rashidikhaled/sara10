<template>
  <fit>
    <fit>
      <safa-grid
        title="لیست مناطق"
        :columns="agRegionColumns"
        v-model="value.CI_Region"
        cdcName="CI_Region"
        fit
        m="e"
        height="100%"
        min-height="200px"
        max-height="100%"
        @row:click="onRegionRow"
        @selection:changed="selectionChanged"
        :exportable="false"
        :suppressRowClickSelection="true"
        :rowMultiSelectWithClick="true"
        :checkboxSelection="true"
        :groupSelectsFiltered="true"
        :showDeletingConfirm="true"
        :allowMultipleSelection="true"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        :pinnedBottomRowData="[{}]"
      >
        <template #header>
          <q-icon
            style="position: relative; right: -5px; font-size: 18px"
            @click="showSelectedRequests = true"
            color="primary"
            name="checklist"
            title="نمایش درخواست های انتخاب شده"
            class="cursor-pointer"
          />
        </template>
      </safa-grid>
    </fit>

    <safa-popup
      title="درخواست های منتخب"
      v-model="showSelectedRequests"
      width="600px"
      height="400px"
    >
      <fit>
        <safa-grid
          title="درخواست های منتخب"
          fit
          helper="requestColumns"
          v-model="allRequests"
          cdcName="allRequests"
          m="e"
          height="100%"
          min-height="200px"
          max-height="100%"
          :allowMultipleSelection="false"
          :exportable="false"
          :addRow="false"
          :deleteRow="true"
          :allowCopy="false"
          paginate
        />
      </fit>
    </safa-popup>

    <safa-popup
      :title="`درخواست های منطقه ${detailTitle}`"
      v-model="showDetails"
      width="500px"
      height="400px"
    >
      <fit>
        <safa-grid
          title="لیست درخواست ها"
          v-model="getComFilterList"
          cdcName="getComFilterList"
          helper="commissionFilterListFromRegionColumns"
          fit
          m="e"
          height="100%"
          min-height="200px"
          max-height="100%"
          :exportable="false"
          @selection:changed="selectionChangedFromRequest"
          :checkboxSelection="true"
          :showDeletingConfirm="true"
          :allowMultipleSelection="true"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
        />
        <div class="q-pa-sm">
          <btn-default
            label="افزودن به لیست درخواست های منتخب ها"
            @click="addToCommissionFilterList"
            :disable="lockAdd"
          />
        </div>
      </fit>
    </safa-popup>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    title: String,
    name: String,
    formKey: String,
    commissionDate: String,
    value: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      allRequests: [],
      selectedChangedFromRequest: [],
      getComFilterList: [],
      showDetails: false,
      showSelectedRequests: false,
      detailTitle: 1,
      agRegionColumns: [
        {
          field: "isSelectedNode",
          title: "",
          width: "74px",
          filterable: false,
          lockPosition: false,
          pinned: "right",
          editor: "selection",
          headerCheckboxSelection: false
        },
        {
          field: "ID",
          title: "کد منطقه",
          width: "200px"
        },
        {
          field: "Title",
          title: "منطقه",
          width: "300px"
        },
        {
          field: "CountParvande",
          title: "تعداد پرونده",
          width: "200px",
          cellRendererSelector: (params) => this.sysValueCellRenderer(params),
          // cellRendererSelector: (params) =>
          //   this.voteTrepassesCellRendererSelector(params),
          cellClass: "custom-pinned-row"
        }
      ]
    }
  },
  methods: {
    sysValueCellRenderer (params) {
      if (params.node.rowPinned === "bottom") {
        return {
          component: "agAggregateFotterTemplate",
          params: {
            totalValue: () => {
              let total = 0
              try {
                total = this.value.CI_Region.reduce(
                  (a, { CountParvande: b }) => {
                    return a + parseFloat(b)
                  },
                  0
                )
              } catch (ex) {
                total = 0
              }
              console.log(`جمع کل : ${total}`)
              return `جمع کل : ${total}`
            }
          }
        }
      }
      return undefined
    },
    onRegionRow ({ data }) {
      this.showLoading()
      this.getComFilter(data.ID)
      // this.getComFilterList = this.getComFilterList.map((m) => {
      //   return {
      //     ...m,
      //     isSelectedNode: false
      //   }
      // })
      // for (let i = 0; i < this.allRequests.length; i++) {
      //   for (let j = 0; j < this.getComFilterList.length; j++) {
      //     if (
      //       this.allRequests[i].NidCommission ===
      //       this.getComFilterList[j].NidCommission
      //     ) {
      //       this.getComFilterList[j].isSelectedNode = true
      //     }
      //   }
      // }
      this.detailTitle = data.ID
      this.hideLoading()
      this.showDetails = true
    },

    async selectionChanged (e) {
      let arr = e.api.getSelectedRows()
      try {
        this.showLoading()
        this.allRequests = []
        for (let i = 0; i < arr.length; i++) {
          await this.getComFilter(arr[i].ID)
          this.allRequests = this.allRequests
            .concat(this.getComFilterList)
            .map((m) => {
              return {
                ...m,
                isSelectedNode: false
              }
            })
          this.removeDup()
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    selectionChangedFromRequest (e) {
      this.selectedChangedFromRequest = e.api.getSelectedRows()
    },

    addToCommissionFilterList () {
      this.allRequests = this.allRequests.concat(
        this.selectedChangedFromRequest
      )
      this.getComFilterList = []
      this.removeDup()
      this.showDetails = false
    },

    reset () {
      this.allRequests = []
      this.getComFilterList = []
      this.showDetails = false
    },
    removeDup () {
      let keys = ["UrbanNidKartablItem"]
      this.allRequests = this.allRequests.filter(
        (
          (s) => (o) =>
            ((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join("|"))
        )(new Set())
      )
    },

    async getComFilter (CIRegion) {
      try {
        const { data } = await this.$services.commissions.getCommissionFilter({
          PRequest: { CIRegion, CommissionDate: this.commissionDate }
        })
        const res = this.getResponse(data)
        if (res.success) {
          let tmp = res.data.GetCommissionFilterResult.CommissionFilter ?? []
          this.getComFilterList = tmp.map((m) => {
            return {
              ...m,
              isSelectedNode: false
            }
          })
          await this.log({
            action: this.logActions.view,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
      }
    }
  },

  watch: {
    allRequests () {
      this.$emit("updateSelectedCommissionFilter", this.allRequests)
    },
    showDetails: {
      handler () {
        if (this.showDetails === true) {
        }
      },
      immediate: true
    }
  },

  computed: {
    lockAdd () {
      return (
        this.getComFilterList.filter((s) => s.isSelectedNode === false)
          .length === this.getComFilterList.length
      )
    }
  }
}
</script>
