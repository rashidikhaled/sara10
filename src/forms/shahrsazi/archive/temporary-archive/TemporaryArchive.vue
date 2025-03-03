<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      :hasFooter="false"
      :padding="false"
      title="بایگانی موقت"
      vertical
    >
      <safa-status :result="result"/>
      <fit>
        <div class="row q-pa-sm q-gutter-md">
          <safa-text
            v-model="nidWorkItem"
            cdcName="nidWorkItem"
            class="col-12 col-sm-3 col-md-2"
            dir="ltr"
            label="کد ارجاع"
            label-width="70px"
          />
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            label="کد نوسازی"
            label-width="70px"
          />
          <div class="col-auto q-gutter-x-sm">
            <btn-search @click="search"/>
            <btn-default label="پاک کردن" @click="clearFilter"/>
          </div>
        </div>
        <q-separator/>
        <div class="q-pa-sm">
          <div class="row">
            <safa-combo
              v-model="selectedRegion"
              :options="districts"
              :use-input="false"
              cdcName="Region"
              class="col-12 col-sm-3 col-md-2"
              label="منطقه"
              label-width="70px"
              sourceType="local"
            />
          </div>
        </div>
        <safa-splitter
          v-model="gridSplitter"
          class="fit"
          horizontal
          style="min-height: 350px"
        >
          <template v-slot:before>
            <safa-datatable
              ref="grid2"
              v-model="results.TemporaryKartabl"
              :allowMultipleSelection="false"
              :customFilter="false"
              :filterable="true"
              :selectable="true"
              cdcName="temporaryArchive"
              fit
              height="100%"
              helper="temporaryArchive"
              max-height="100%"
              paginate
              title="بایگانی موقت"
              @row-click="selectedChange"
            />
            <!-- <q-separator /> -->
          </template>
          <template v-slot:after>
            <safa-tabs v-model="activeTab" class="fit">
              <template v-slot:tabs>
                <tab-menu label="اقدامات" name="Actions"/>
                <tab-menu label="توضیحات" name="Comments"/>
              </template>
              <tab-content :padding="false" name="Actions" title="اقدامات">
                <fit>
                  <safa-datatable
                    v-if="showTemporaryArchiveDetails"
                    ref="grid2"
                    v-model="taskResults.Task"
                    :filterable="true"
                    cdcName="temporaryArchiveParvande"
                    fit
                    height="100%"
                    helper="temporaryArchiveParvande"
                    max-height="100%"
                    title=" گردش پرونده"
                    @row-click="selectedChange"
                  />
                  <!-- @itemDetailClick="handleShowDetail" -->
                  <div v-else>
                    <btn-back
                      class="q-ma-sm"
                      label="بازگشت به گردش پرونده"
                      @click="handleHideDetail"
                    />
                    <safa-datatable
                      ref="grid2"
                      v-model="detailResult"
                      :filterable="true"
                      cdcName="temporaryArchiveParvandeDetail"
                      fit
                      height="100%"
                      helper="temporaryArchiveParvandeDetail"
                      max-height="100%"
                      title="جزییات گردش پرونده"
                    />
                  </div>
                </fit>
              </tab-content>
              <tab-content :padding="false" name="Comments" title="توضیحات">
                <fit>
                  <safa-datatable
                    ref="grid2"
                    v-model="comments"
                    cdcName="temporaryArchiveParvandeDescription"
                    fit
                    height="100%"
                    helper="temporaryArchiveParvandeDescription"
                    max-height="100%"
                    title="توضیحات"
                  />
                </fit>
              </tab-content>
            </safa-tabs>
          </template>
        </safa-splitter>
      </fit>
      <safa-popup
        v-model="temporaryArchiveForm"
        height="300px"
        vertical
        width="700px"
      >
        <ExitTemporaryArchive
          ref="exitTempArchive"
          :formKey="formKey"
          :name="name"
          :passedData="selectedRow"
          :taskInfo="selectedRow"
          :title="title"
          @exitDone="exitDone"
        />
        <template v-slot:footer>
          <!-- <btn-default
            label="خروج از بایگانی"
            @click="exit"
          /> -->
        </template>
      </safa-popup>

      <template v-slot:footer>
        <button-group height="30px">
          <btn-default label="بازآوری" @click="reload"/>
          <safa-securityPanel
            id="1dd71880-287d-4106-8030-9b06a99d0a83"
            caption="خروج از بایگانی موقت"
          >
          <btn-cancel
            :disable="exitTemporaryArchiveBtn"
            label="خروج از  بایگانی موقت"
            @click="temporaryArchiveForm = true"
          />
        </safa-securityPanel>
        </button-group>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import ExitTemporaryArchive from './partials/ExitTemporaryArchive.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/archive/temporary-archive',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'شهرسازی- بایگانی موقت',
      formKey: '6c804d1f-3901-48d3-874c-596a368052f3',
      name: 'TemporaryArchive',
      main: true,
      sidebarCompatible: true,
      gridSplitter: 50,
      activeTab: 'Actions',
      result: null,
      showTemporaryArchiveDetails: true,
      temporaryArchiveForm: false,
      results: { TemporaryKartabl: [] },
      tempKartabl: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nidWorkItem: '',
      selectedRegion: 1,
      taskResults: {
        Task: [],
        TaskLog: []
      },
      detailResult: [],
      comments: [],
      exactTasklogNidTask: null,
      exitTemporaryArchiveBtn: true,
      selectedRow: {},
      isView: false
    }
  },
  components: { ExitTemporaryArchive },
  methods: {
    handleShowDetail (row) {
      this.showTemporaryArchiveDetails = false
      this.exactTasklogNidTask = row.dataItem.NidTask
      this.detailResult = this.taskResults.TaskLog.filter(
        (item) => item.NidTask === this.exactTasklogNidTask
      )
    },
    handleHideDetail () {
      this.showTemporaryArchiveDetails = true
    },
    getTemporaryKartabl () {
      if (this.baseNosaziCode.District !== this.selectedRegion) {
        this.taskResults.Task = []
        this.baseNosaziCode = {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
        this.nidWorkItem = ''
      }
      this.showLoading()
      this.results.TemporaryKartabl = []
      let districtStr
      let regionStr
      let blockStr
      let hoseStr
      let buildingStr
      let apartmentStr
      let shopStr
      let conditionStr = ''
      if (this.baseNosaziCode.District !== 0) {
        districtStr = 'District = ' + this.baseNosaziCode.District
        conditionStr = 'where ' + districtStr
      } else {
        districtStr = ''
      }
      if (this.baseNosaziCode.Region !== 0) {
        regionStr = 'Region = ' + this.baseNosaziCode.Region
        conditionStr += ' AND ' + regionStr
      } else {
        regionStr = ''
      }
      if (this.baseNosaziCode.Block !== 0) {
        blockStr = 'Block = ' + this.baseNosaziCode.Block
        conditionStr += '  AND  ' + blockStr
      } else {
        blockStr = ''
      }
      if (this.baseNosaziCode.House !== 0) {
        hoseStr = 'House = ' + this.baseNosaziCode.House
        conditionStr += '  AND  ' + hoseStr
      } else {
        hoseStr = ''
      }
      if (this.baseNosaziCode.Building !== 0) {
        buildingStr = 'Building = ' + this.baseNosaziCode.Building
        conditionStr += '  AND  ' + buildingStr
      } else {
        buildingStr = ''
      }
      if (this.baseNosaziCode.Apartment !== 0) {
        apartmentStr = 'Apartment = ' + this.baseNosaziCode.Apartment
        conditionStr += '  AND ' + apartmentStr
      } else {
        apartmentStr = ''
      }
      if (this.baseNosaziCode.Shop !== 0) {
        shopStr = 'Shop = ' + this.baseNosaziCode.Shop
        conditionStr += ' AND ' + shopStr
      } else {
        shopStr = ''
      }
      if (this.nidWorkItem !== '' && conditionStr !== '') {
        conditionStr +=
          ' AND ' + ' NidWorkItem = N' + '\'' + this.nidWorkItem + '\''
      } else if (this.nidWorkItem !== '') {
        conditionStr =
          'where' + ' NidWorkItem = N' + '\'' + this.nidWorkItem + '\''
      }

      let data = {
        pFromRow: 0,
        pToRow: 100,
        pWhere: conditionStr
      }
      this.$services.SC.getTemporaryKartabl(data, this.config)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: conditionStr,
                bizCodeTitle: 'conditionStr'
              })
            }
            this.isView = true
            this.results = this.result.data
            this.tempKartabl = this.results.TemporaryKartabl.map((x) => {
              if (x.EumRequestStatus === 0) {
                x.class = 'request-Status'
              } else if (x.EumRequestStatus === 1) {
                x.class = 'request-Status-temp'
              } else if (x.EumRequestStatus === 2) {
                x.class = 'request-Status-permanent'
              } else {
                x.class = 'request-Status-deleted'
              }
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

    clearFilter () {
      this.taskResults.Task = []
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.nidWorkItem = ''
      this.getTemporaryKartabl()
    },
    search () {
      this.taskResults.Task = []
      this.selectedRegion = this.baseNosaziCode.District
      this.getTemporaryKartabl()
    },
    selectedChange (row) {
      this.taskResults.Task = []
      this.showTemporaryArchiveDetails = true
      this.selectedRow = row
      this.selectedRow.BizCode = this.selectedRow.NosaziCode
      this.selectedRow.TaskTitel = ''
      if (row.EumRequestStatus === 1) {
        this.exitTemporaryArchiveBtn = false
      } else {
        this.exitTemporaryArchiveBtn = true
      }
      this.$srvWorkflow
        .getAllTaskByNidProc({ NidProc: row.NidProc }) // getProcessInfo
        .then(async ({ data }) => {
          if (data.success) {
            this.taskResults.Task = data.data
            await this.log({
              action: this.logActions.view,
              bizCode: row.NidProc,
              bizCodeTitle: 'NidProc'
            })
            this.getComments(row)
          }
        })
        .catch((response) => {
          console.log(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getComments (row) {
      this.$srvWorkflow
        .getComments({ NidProc: row.NidProc })
        .then(({ data }) => {
          if (data.success) {
            this.comments = data.data
          }
        })
        .catch((response) => {
          console.log(response)
          this.serverError()
        })
    },

    reload () {
      this.taskResults.Task = []
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.nidWorkItem = ''
      this.getTemporaryKartabl()
    },
    exit () {
      this.$refs.exitTempArchive.exit()
    },
    exitDone () {
      this.temporaryArchiveForm = false
      this.getTemporaryKartabl()
      this.redirectToKartable()
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    },
    config () {
      if (this.baseNosaziCode.District === 0) {
        return undefined
      } else {
        return {
          config: { District: this.baseNosaziCode.District }
        }
      }
    }
  },
  watch: {
    selectedRegion () {
      this.baseNosaziCode.District = this.selectedRegion
      this.getTemporaryKartabl()
    }
  },
  mounted () {
    this.getTemporaryKartabl()
  }
}
</script>
