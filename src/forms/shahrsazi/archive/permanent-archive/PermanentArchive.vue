<template>
  <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b707dd9e69b"
    caption="بایگانی دائم"
  >
    <form-wrapper :padding="false" title="بایگانی دائم" vertical>
      <template #header>
        <safa-status :result="result" />
        <safa-status :result="taskResult" />
      </template>
      <fit>
        <expantion-section
          v-model="expansionState"
          default-opened
          title="جستجو"
        >
          <FormRow :lg="4" :xl="5" :md="3" class="q-mb-sm">
            <FormControl>
              <safa-text
                v-model="nidWorkItem"
                cdcName="nidWorkItem"
                dir="ltr"
                label="کد ارجاع"
                label-width="70px"
                @keyup.enter="search"
              ></safa-text>
            </FormControl>
            <FormControl>
              <safa-text
                v-model="userName"
                cdcName="userName"
                label=" نام کاربر"
                label-width="70px"
                @keyup.enter="search"
              ></safa-text>
            </FormControl>

            <FormControl>
              <safa-text
                label="نوع درخواست"
                label-width="70px"
                v-model="WorkflowTitel"
                @keyup.enter="search"
              ></safa-text>
            </FormControl>
            <div class="flex col-lg-3 col-md-4">
              <safa-label class="q-pt-sm q-mr-md">کد نوسازی</safa-label>
              <nosazi-code-input
                v-model="baseNosaziCode"
                cdcName="baseNosaziCode"
              />
            </div>
          </FormRow>
          <FormRow :lg="4" :xl="5" :md="3">
            <FormControl>
              <safa-text
                label="نام متقاضی"
                label-width="70px"
                v-model="requesterName"
                @keyup.enter="search"
              ></safa-text>
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ بایگانی"
                label-width="70px"
                v-model="permanentKartablDate"
                @keyup.enter="search"
              ></safa-datepicker>
            </FormControl>
            <div class="col-auto q-gutter-x-sm" style="margin-right: 65px">
              <btn-search @click="search" />
              <btn-default label="پاک کردن" @click="deleteClick" />
            </div>
          </FormRow>
        </expantion-section>
        <div class="q-mb-sm">
          <div class="row q-gutter-md q-px-sm">
            <!-- <div class="row col"> -->
            <!-- <safa-label class="q-mt-sm q-mr-sm">منطقه</safa-label> -->
            <safa-combo
              v-model="selectedRegion"
              :options="districts"
              cdcName="Region"
              class="col-12 col-md-2 col-sm-3"
              label="منطقه"
              label-width="70px"
              sourceType="local"
            ></safa-combo>

            <!-- </div> -->
            <div class="col-auto">
              <btn-default label="بازآوری" @click="reload" />
            </div>
          </div>
        </div>
        <!-- <safa-splitter
        v-model="gridSplitter"
        class="fit"
        horizontal
        margin="0"
        style="min-height:300px"
      > -->
        <!-- <template v-slot:before> -->
        <fit>
          <safa-datatable
            ref="grid2"
            v-model="results.PermanentKartabl"
            :allowMultipleSelection="false"
            :filterable="true"
            :margin="false"
            :selectable="true"
            cdcName="permanentArchive"
            fit
            height="100%"
            helper="permanentArchive"
            max-height="100%"
            paginate
            title="بایگانی دائم"
            @row-click="selectedChange"
          ></safa-datatable>
        </fit>
        <!-- </template> -->
        <safa-tabs v-model="activeTab" :padding="false" class="fit">
          <template v-slot:tabs>
            <tab-menu label="اقدامات" name="Actions" />
            <tab-menu label="توضیحات" name="Comments" />
          </template>
          <tab-content name="Actions" title="اقدامات">
            <fit>
              <safa-datatable
                v-if="showPermanentArchiveDetails"
                ref="grid2"
                v-model="taskResults.Task"
                :bordered="false"
                :filterable="true"
                :margin="false"
                cdcName="temporaryArchiveParvande"
                fit
                height="100%"
                helper="temporaryArchiveParvande"
                max-height="100%"
                title="گردش پرونده "
                @row-click="selectedChange"
              ></safa-datatable>
              <!-- @itemDetailClick="handleShowDetail" -->
              <div v-if="!showPermanentArchiveDetails">
                <btn-back
                  class="q-ma-sm"
                  label="بازگشت به گردش پرونده"
                  @click="handleHideDetail"
                />
              </div>
              <safa-datatable
                v-if="!showPermanentArchiveDetails"
                ref="grid2"
                v-model="detailResult"
                :filterable="true"
                :margin="false"
                cdcName="temporaryArchiveParvandeDetail"
                fit
                height="100%"
                helper="temporaryArchiveParvandeDetail"
                max-height="100%"
                min-height="200px"
                title="جزییات گردش پرونده"
              ></safa-datatable>
            </fit>
            <!-- </template> -->
            <!-- </safa-splitter> -->
          </tab-content>
          <tab-content name="Comments" title="توضیحات">
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
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"

export default {
  route: "/archive/permanent-archive",
  mixins: [baseFormMixin],
  data: function () {
    return {
      gridSplitter: 50,
      title: "بایگانی دائم",
      formKey: "6d9cf8c7-7a3f-484f-91b9-1a260b25429e", // از زمل ست شده
      name: "PermanentArchive",
      main: true,
      sidebarCompatible: true,
      result: null,
      expansionState: true,
      userName: "",
      results: { PermanentKartabl: [] },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nidWorkItem: "",
      selectedRegion: 1,
      taskResult: null,
      taskResults: { Task: [], TaskLog: [] },
      selectedRow: {},
      showPermanentArchiveDetails: true,
      exactTasklogNidTask: null,
      detailResult: [],
      activeTab: "Actions",
      comments: [],
      isView: false,
      requesterName: "",
      WorkflowTitel: "",
      permanentKartablDate: ""
    }
  },
  methods: {
    handleShowDetail (row) {
      console.log(row, "row")
      this.showPermanentArchiveDetails = false
      debugger
      this.exactTasklogNidTask = row.dataItem.NidTask
      this.detailResult = this.taskResults.TaskLog.filter(
        (item) => item.NidTask === this.exactTasklogNidTask
      )
    },
    // this.showPermanentArchiveDetails = !this.showPermanentArchiveDetails
    handleHideDetail () {
      this.showPermanentArchiveDetails = true
    },
    getPermanentKartabl () {
      this.showLoading()
      let districtStr
      let regionStr
      let blockStr
      let hoseStr
      let buildingStr
      let apartmentStr
      let shopStr
      let conditionStr = ""
      if (this.baseNosaziCode.District !== 0) {
        districtStr = "BN.District = " + this.baseNosaziCode.District
        conditionStr = "where " + districtStr
      } else {
        districtStr = ""
      }
      if (this.baseNosaziCode.Region !== 0) {
        regionStr = "BN.Region = " + this.baseNosaziCode.Region
        conditionStr += " AND " + regionStr
      } else {
        regionStr = ""
      }
      if (this.baseNosaziCode.Block !== 0) {
        blockStr = "BN.Block = " + this.baseNosaziCode.Block
        conditionStr += "  AND  " + blockStr
      } else {
        blockStr = ""
      }
      if (this.baseNosaziCode.House !== 0) {
        hoseStr = "BN.House = " + this.baseNosaziCode.House
        conditionStr += "  AND  " + hoseStr
      } else {
        hoseStr = ""
      }
      if (this.baseNosaziCode.Building !== 0) {
        buildingStr = "BN.Building = " + this.baseNosaziCode.Building
        conditionStr += "  AND  " + buildingStr
      } else {
        buildingStr = ""
      }
      if (this.baseNosaziCode.Apartment !== 0) {
        apartmentStr = "BN.Apartment = " + this.baseNosaziCode.Apartment
        conditionStr += "  AND " + apartmentStr
      } else {
        apartmentStr = ""
      }
      if (this.baseNosaziCode.Shop !== 0) {
        shopStr = "BN.Shop = " + this.baseNosaziCode.Shop
        conditionStr += " AND " + shopStr
      } else {
        shopStr = ""
      }
      if (this.nidWorkItem !== "" && conditionStr !== "") {
        conditionStr +=
          " AND " + " NidWorkItem = N" + "'" + this.nidWorkItem + "'"
      } else if (this.nidWorkItem !== "") {
        conditionStr =
          "where" + " NidWorkItem = N" + "'" + this.nidWorkItem + "'"
      }
      if (this.userName !== "" && conditionStr !== "") {
        conditionStr +=
          " And UserNamePermanentKartabl Like N'%" + this.userName + "%'"
      } else if (this.userName !== "") {
        conditionStr =
          "where UserNamePermanentKartabl Like N'%" + this.userName + "%'"
      }
      if (this.requesterName !== "" && conditionStr !== "") {
        conditionStr +=
          " And RequesterName Like N'%" + this.requesterName + "%'"
      } else if (this.requesterName !== "") {
        conditionStr =
          "where RequesterName Like N'%" + this.requesterName + "%'"
      }
      if (this.WorkflowTitel !== "" && conditionStr !== "") {
        conditionStr +=
          " And W.WorkflowTitel Like N'%" + this.WorkflowTitel + "%'"
      } else if (this.WorkflowTitel !== "") {
        conditionStr =
          "where W.WorkflowTitel Like N'%" + this.WorkflowTitel + "%'"
      }
      if (this.permanentKartablDate !== "" && conditionStr !== "") {
        conditionStr +=
          " And PermanentKartablDate Like N'%" +
          this.permanentKartablDate +
          "%'"
      } else if (this.permanentKartablDate !== "") {
        conditionStr =
          "where PermanentKartablDate Like N'%" +
          this.permanentKartablDate +
          "%'"
      }
      let data = {
        pFromRow: 0,
        pToRow: 100,
        pWhere: conditionStr
      }
      this.$services.SC.getPermanentKartabl(data, {
        config: { District: this.selectedRegion }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی"
              })
            }
            this.isView = true
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
    search () {
      this.taskResults.Task = []
      this.getPermanentKartabl()
    },
    selectedChange (row) {
      const userInfo = this.$stSecurity.getters["authorize/user"]
      const payload = {
        NidProc: row.NidProc,
        UserInfo: {
          // FullName: `${userInfo.firstName} ${userInfo.lastName} (${userInfo.username})`,
          UserName: this.getUserDisplayName(),
          IsSysAdmin: userInfo.isSysAdmin,
          Domain: userInfo.domains,
          DomainNames: userInfo.domainNames,
          NidUser: userInfo.NidUser,
          GUID: userInfo.NidUser
        }
      }
      this.showPermanentArchiveDetails = true
      this.$srvWorkflow
        .getAllTaskByNidProc(payload, {
          config: { District: this.selectedRegion }
        })
        .then(async ({ data }) => {
          if (data.success) {
            this.taskResults.Task = data.data
            this.getComments(row)
            await this.log({
              action: this.logActions.view,
              bizCode: row.NidProc,
              bizCodeTitle: "NidProc"
            })
          }
        })
        .catch((response) => {
          this.taskResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getComments (row) {
      const userInfo = this.$stSecurity.getters["authorize/user"]
      const payload = {
        NidProc: row.NidProc,
        UserInfo: {
          FullName: `${userInfo.firstName} ${userInfo.lastName} (${userInfo.username})`,
          IsSysAdmin: userInfo.isSysAdmin,
          Domain: userInfo.domains,
          DomainNames: userInfo.domainNames,
          NidUser: userInfo.NidUser,
          GUID: userInfo.NidUser
        }
      }
      this.$srvWorkflow
        .getComments(payload)
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

    deleteClick () {
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.nidWorkItem = ""
      this.userName = ""
      this.requesterName = ""
      this.WorkflowTitel = ""
      this.permanentKartablDate = ""
    },
    reload () {
      this.taskResults.Task = []
      this.deleteClick()
      this.getPermanentKartabl()
    },
    backToMainForm (val) {
      if (val) {
        this.temporaryArchiveForm = true
        this.reload()
      }
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.getPermanentKartabl()
    } else {
      // this.showError("هیچ درخواستی در کارتابل انتخاب نشده است.");
      this.getPermanentKartabl()
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    }
  },
  watch: {
    selectedRegion () {
      this.baseNosaziCode.District = this.selectedRegion
    },
    "baseNosaziCode.District": {
      handler () {
        if (this.baseNosaziCode.District === 0) return
        this.selectedRegion = this.baseNosaziCode.District
      },
      deep: true
    }
  }
}
</script>
