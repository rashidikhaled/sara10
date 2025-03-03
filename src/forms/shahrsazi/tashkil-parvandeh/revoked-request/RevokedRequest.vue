<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      :hasFooter="false"
      title="درخواست های ابطال شده"
      vertical
    >
      <safa-status :result="result"/>
      <fit>
      <div class="row q-col-gutter-sm">
        <div class="col-auto">
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            label="کد نوسازی"
              label-width="70px"
          />
        </div>
        <div class="col-12 col-md-3 col-sm-3">
          <safa-text
            v-model="nidWorkItem"
             cdcName="nidWorkItem"
             dir="ltr"
            label="کد ارجاع"
            label-width="70px"
          ></safa-text>
        </div>
        <div class="col-12 col-md-3 col-sm-3">
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
        <div class="col-auto">
          <btn-search
            label="جستجو"
            @click="search"
          />
        </div>
        <div class="col-auto">
          <btn-default
            label="بازآوری"
            @click="reload"
          />
        </div>
      </div>
      <safa-splitter
        v-model="gridSplitter"
        class="fit"
        horizontal
        margin="0"
      >
        <template v-slot:before>
            <safa-datatable
              v-model="results.GarbageKartabl"
              ref="grid2"
             :columns="columns2"
              class="fit q-pt-sm"
              margin="0"
              height="100%"
              min-height="100px"
              title="درخواست های ابطال شده"
              :allowMultipleSelection="false"
              :customFilter="false"
              :filterable="true"
              :selectable="true"
              cdcName="temporaryArchive"
              fit
              max-height="100%"
              paginate
              @row-click="selectedChange"
            />
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
                    v-if="showRevokedRequestDetails"
                    ref="grid2"
                    v-model="taskResults.Task"
                    :filterable="true"
                    cdcName="revokedRequestParvande"
                    fit
                    height="100%"
                    :columns="columns"
                    max-height="100%"
                    title=" گردش پرونده"
                    @row-click="selectedChange"
                    class="fit"
                    margin="0"
                   min-height="100px"
                  />
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

    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'لیست درخواست های ابطال شده',
      formKey: '059f143c-d5b2-4d58-8da7-d7f2a854eeec',
      name: 'RevokedRequest',
      main: true,
      columns: [
        {
          field: "TaskTitel",
          title: "نام فعالیت ",
          width: 71
        },
        {
          field: "CreatedByName",
          title: "انجام دهنده ",
          width: 100
        },
        {
          field: "TaskStartDate",
          title: "تاریخ شروع ",
          editor: "date",
          width: 110
        },
        {
          field: "TaskStartTime",
          title: " ساعت شروع ",
          width: 110
        },
        {
          field: "TaskCloseDate",
          title: "تاریخ پایان ",
          editor: "date",
          width: 110
        },
        {
          field: "TaskCloseTime",
          title: "ساعت پایان",
          width: "auto"
        }
      ],
      columns2: [

        {
          field: "NosaziCode",
          title: "کد نوسازی",
          width: 100
        },
        {
          field: "RequesterName",
          title: "نام متقاضی",
          width: 100
        },
        {
          field: "NidWorkItem",
          title: "شماره درخواست",
          width: 100
        },
        {
          field: "WorkflowTitel",
          title: "نوع درخواست",
          width: 156
        },
        {
          field: "RequestDate",
          title: "تاریخ درخواست",
          editor: "date",
          width: 85
        },
        { field: "UserNameGarbageKartabl",
          title: "کاربر ابطال کننده",
          width: 150
        },
        {
          field: "GarbageKartablDate",
          title: "تاریخ ابطال",
          editor: "date",
          width: 64
        },
        {
          field: "CommentsGarbageKartabl",
          title: "توضیحات",
          width: "auto"
        }
      ],
      sidebarCompatible: true,
      gridSplitter: 50,
      activeTab: 'Actions',
      result: null,
      showRevokedRequestDetails: true,
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
      isView: false,
      revokedRequestDetails: true,
      results: { GarbageKartabl: [] }

    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },
  mounted () {
    // if (this.selectedRequest) {
    //   this.baseNosaziCode = { ...this.baseNosaziCode, ...this.selectedNosaziCode }
    this.garbageKartabl()
    // } else {
    //   this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید.')
    // }
  },
  methods: {
    handleShowDetail (row) {
      this.showRevokedRequestDetails = false
      this.exactTasklogNidTask = row.dataItem.NidTask
      this.detailResult = this.taskResults.TaskLog.filter(item => item.NidTask === this.exactTasklogNidTask)
    },
    handleHideDetail () {
      this.showRevokedRequestDetails = true
    },
    garbageKartabl () {
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
        conditionStr += ' AND ' + ' NidWorkItem = ' + this.nidWorkItem
      } else if (this.nidWorkItem !== '') {
        conditionStr = 'where' + ' NidWorkItem = ' + this.nidWorkItem
      }

      let data = {
        pFromRow: 0,
        pToRow: 100,
        pWhere: conditionStr
      }
      this.$services.SC.getGarbageKartabl(data, this.config)
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
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    search () {
      this.taskResults.Task = []
      this.selectedRegion = this.baseNosaziCode.District
      this.garbageKartabl()
    },
    selectedChange (row) {
      this.taskResults.Task = []
      this.showRevokedRequestDetails = true
      this.selectedRow = row
      this.selectedRow.BizCode = this.selectedRow.NosaziCode
      this.selectedRow.TaskTitel = ''
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
      this.garbageKartabl()
    }
  },
  watch: {
    selectedRegion () {
      this.baseNosaziCode.District = this.selectedRegion
      this.garbageKartabl()
    }
  }

}
</script>
