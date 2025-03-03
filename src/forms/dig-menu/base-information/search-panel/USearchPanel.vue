<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getSerachRes" />
        <q-btn
          v-if="placeholder === 'forms'"
          flat
          dense
          size="12px"
          color="primary"
          icon-right="arrow_back"
          @click="backToMainForm"
          label="بازگشت به فرم اصلی"
        />
      </template>
      <fit v-if="placeholder === 'kartable'">
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="کد رهگیری"
              v-model="filter.NidWorkItem"
              cdcName="NidWorkItem"
              label-width="75px"
              @keyup.enter="searchObj"
            />
          </FormControl>
          <FormControl>
            <!-- label="نوع درخواست" -->
            <safa-combo
              label="نوع"
              label-width="75px"
              v-model="filter.AllRequestTypeSelected"
              cdcName="allRequestTypeSelected"
              :options="allRequestTypeOptions"
              required
              source-type="local"
              ref="ciAllRequestType"
            />
          </FormControl>
          <FormControl>
            <safa-combo2
              label="شرکت خدماتی متقاضی"
              label-width="75px"
              v-model="filter.RequesterTypeSelected"
              cdcName="requesterTypeSelected"
              :options="requesterTypeOptions"
              source-type="local"
              type="multiple"
              ref="ciRequesterType"
            />
          </FormControl>
          <FormControl>
            <safa-combo2
              label="نام تابعه"
              label-width="75px"
              v-model="filter.RedirectNameSelected"
              :options="redirectNameOptions"
              source-type="local"
              type="multiple"
              ref="ciRedirectName"
            />
          </FormControl>
          <FormControl>
            <safa-combo2
              label="منطقه"
              label-width="75px"
              v-model="filter.RegionSelected"
              cdcName="regionSelected"
              :options="regionOptions"
              source-type="local"
              type="multiple"
              ref="ciRegion"
            />
          </FormControl>
          <FormControl>
            <safa-combo2
              label="نوع درخواست"
              label-width="75px"
              v-model="filter.RequestTypeSelected"
              cdcName="requestTypeSelected"
              :options="requestTypeOptions"
              source-type="local"
              type="multiple"
              ref="ciRequestType"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="آدرس"
              v-model="filter.Address"
              cdcName="address"
              label-width="75px"
              @keyup.enter="searchObj"
            />
          </FormControl>
          <nosazi-code-input
            label="کد نوسازی"
            v-model="filter.BaseNosaziCode"
            @enter="searchObj"
            cdcName="nosaziCode"
            label-width="75px"
          />
          <div class="q-gutter-sm">
            <btn-search @click="searchObj" />
            <btn-default @click="clearFilter" label="حذف فیلتر" />
          </div>
        </FormRow>
        <safa-datatable2
          v-model="requestsList"
          cdcName="requestsList"
          :columns="requestGridColumns"
          m="r"
          fit
          min-height="300px"
          height="100%"
          max-height="100%"
          paginate
          :pageSize="20"
          :addRow="false"
          :allowCopy="false"
          :deleteRow="false"
          :suppressRowClickSelection="false"
          :getRowStyle="getRowStyle"
          :masterDetail="true"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          ref="requestsListGrid"
        >
        <template #cell-MenuDropDown="{ row }">
              <safa-combo2
                source-type="local"
                :options="comboOptions"
                :useInput="false"
                @input="menuDropDownChanged(row, $event)"
                ref="menuDropDown"
              />
            </template>
          </safa-datatable2>
      </fit>
      <fit v-if="placeholder === 'forms'">
        <responder-forms
          :formKey="formKey"
          :title="title"
          :name="name"
          :task-info="selectedResponse"
          :filter="filter"
          :loadObjResponse="loadObjResponse"
        />
      </fit>
    </form-wrapper>
    <safa-popup
      v-model="showmenuDropDownSelect"
      width="950px"
      height="700px"
      :title="menuDropDownSelectTitle"
    >
      <component
        :is="menuDropDownSelect"
        ref="menuDropDownSelect"
        :rowSelectData="rowSelectData"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
// eslint-disable-next-line import/named
import { defaultModel } from "./model.js"
import ResponderForms from './ResponderForms.vue'
import RequestForBranchesURequest from "../../register-request/request/URequest.vue"
import RequestForBranchesURequestEvents from "../../register-request/request-events/URequestEvents.vue"
import RequestForBranchesURequestDevelopmentPlans from "../../register-request/request-development-plans/URequestDevelopmentPlans.vue"
import RequestExtension from "./requestExtension/RequestExtension"
import RenewalRequest from "../../others/renewal-request/URenewalRequest.vue"
import RenewalRequestService from '../../register-request/export-renewal-reportR-request/partials/RenewalRequest.vue'
import URequestVisit from "../../base-information/search-panel/requestVisit/URequestVisit.vue"
import RevisitRequestService from "../../others/revisit-request-service/URevisitRequestService.vue"
import RevisitRequestEvents from "../../others/revisit-request-events/URevisitRequestEvents.vue"
import ExtensionOfVisit from "./extensionOfVisit/ExtensionOfVisit"
import UIssuingPermit from "./issuingPermit/UIssuingPermit"
import RequestExportLicense from "../../others/export-license/UExportLicense.vue"
import RequestEventsExportLicense from "../../others/request-events-export-license/URequestEventsExportLicense.vue"

export default {
  mixins: [baseFormMixin],
  components: { RenewalRequestService, RenewalRequest, ResponderForms, URequestVisit, RevisitRequestService, RevisitRequestEvents, RequestExportLicense, RequestForBranchesURequest, RequestForBranchesURequestEvents, RequestEventsExportLicense, RequestForBranchesURequestDevelopmentPlans, RequestExtension, ExtensionOfVisit, UIssuingPermit },
  data () {
    return {
      title: "کارتابل پاسخگو",
      formKey: "0FE5234E-1F44-49F9-954F-B66D3AEAFF59",
      name: "USearchPanel",
      main: true,

      // #region variables
      getSerachRes: null,
      // #endregion

      // #region variables
      isFillCombos: false,
      placeholder: "kartable",
      comboOptions: [
        { ID: 0, Title: "ثبت درخواست" },
        { ID: 1, Title: "تمدید درخواست" },
        { ID: 2, Title: "بازدید درخواست" },
        { ID: 3, Title: "تمدید بازدید" },
        { ID: 4, Title: "صدور مجوز" }
      ],

      filter: {
        NidWorkItem: null,
        AllRequestTypeSelected: null,
        RequesterTypeSelected: [],
        RegionSelected: [],
        RequestTypeSelected: [],
        RedirectNameSelected: [],
        Address: null,
        BaseNosaziCode: {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
      },
      requestsList: [],
      showmenuDropDownSelect: false,
      menuDropDownSelectTitle: "",
      menuDropDownSelect: "",
      rowSelectData: {},
      loadObjResponse: null,
      // #endregion

      //* ****Options DropDown*****
      allRequestTypeOptions: [],
      requesterTypeOptions: [],
      redirectNameOptions: [],
      regionOptions: [],
      requestTypeOptions: [],

      // #region combos options
      allRequestType: [],
      requesterType: [],
      region: [],
      requestType: [],
      redirectName: [],
      // #endregion

      //* ****Options DropDown*****
      requestGridColumns: [
        {
          field: "Row",
          title: "ردیف",
          width: "70px",
          filterable: false,
          resizeble: false,
          lockPosition: true,
          pinned: "right"
        },
        {
          field: "MenuDropDown",
          title: "",
          width: "60px"
        },
        // {
        //   field: "MenuDropDown",
        //   title: "فرم ها",
        //   editor: "action",
        //   width: "100px",
        //   btnTitle: "فرم ها",
        //   btnIcon: "list",
        //   cellRenderer: "agCallbackBtn",
        //   callback: this.showForms,
        //   filterable: false,
        //   resizeble: false,
        //   lockPosition: true,
        //   pinned: "right",
        //   editable: false
        // },
        {
          field: "NIdWorkItem",
          title: "کد رهگیری",
          editable: false,
          width: "150px"
        },
        {
          field: "RegionTitle",
          title: "منطقه",
          editable: false,
          width: "100px"
        },
        {
          field: "RequestType",
          title: "وضعیت درخواست",
          editable: false,
          width: "150px"
        },
        {
          field: "RequestTypeTitle",
          title: "نوع درخواست",
          editable: false,
          width: "110px"
        },
        {
          field: "RequesterType",
          title: "شرکت خدماتی متقاضی",
          editable: false,
          width: "200px"
        },
        {
          field: "CodString",
          title: "کد نوسازی",
          editable: false,
          width: "180px"
        },
        {
          field: "RedirectName",
          title: "نام تابعه",
          editable: false,
          width: "200px"
        },
        {
          field: "RequestDate",
          title: "تاریخ درخواست",
          editable: false,
          width: "120px"
        },
        {
          field: "Revisit",
          title: "اطلاعات",
          editable: false,
          width: "100px"
        },
        {
          field: "TaskState",
          title: "مرحله",
          editable: false,
          width: "100px"
        },
        {
          field: "UserName",
          title: "کاربر",
          editable: false,
          width: "200px"
        },
        {
          field: "Addres",
          title: "آدرس",
          editable: false,
          width: "400px"
        }
      ],

      selectedResponse: null
    }
  },

  methods: {
    async loadObj (pRequest) {
      console.log("getSearch payload :>> ", pRequest)
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.getSearch({
          pRequest
        })
        this.getSerachRes = this.getResponse(data)
        if (this.getSerachRes.success) {
          if (this.isFillCombos) {
            this.requestsList =
              this.getSerachRes?.data?.GetSerachResult?.ClsSearchEngine
                ?.SearchResult ?? []
            const bizCodeTitle =
              this.$refs.ciAllRequestType.selectedItem.Title ?? ""
            await this.log({
              action: this.logActions.view,
              bizCode: this.filter.AllRequestTypeSelected,
              bizCodeTitle,
              saveDesc: `بارگذاری اطلاعات در کارتابل پاسخگو حفاری برای نوع ${bizCodeTitle} انجام گردید.`
            })
          } else {
            this.loadObjResponse = this.getSerachRes.data.GetSerachResult
            console.log("this.loadObjResponse :>> ", this.loadObjResponse)
            this.setComboOptions(this.loadObjResponse)
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    searchObj () {
      if (this.filter.AllRequestTypeSelected === null) {
        return this.showError("لطفا نوع را مشخص نمایید.")
      }
      const {
        Address,
        AllRequestTypeSelected, // "نوع" - allRequestTypeOptions - ciAllRequestType
        RedirectNameSelected, // "نام تابعه" - redirectNameOptions - ciRedirectName
        RegionSelected, // "منطقه" - regionOptions - ciRegion
        RequestTypeSelected, // "نوع درخواست" - requestTypeOptions - ciRequestType
        RequesterTypeSelected, // "شرکت خدماتی متقاضی" - requesterTypeOptions - ciRequesterType
        NidWorkItem,
        BaseNosaziCode
      } = this.filter
      const codeString = convertNosaziCodeObjectToString(BaseNosaziCode)
      const pRequest = {
        ...this.loadObjResponse,
        ClsSearchEngine: {
          ...this.loadObjResponse.ClsSearchEngine,
          Address: Address === "" ? null : Address,
          AllRequestTypeSelected:
            this.loadObjResponse.ClsSearchEngine.AllRequestType.find(
              (f) => f.Filed === AllRequestTypeSelected
            ),
          CI_RedirectNameSelected: this.getComboItems(
            this.redirectNameOptions,
            RedirectNameSelected
          ),
          CI_RegionSelected: this.getComboItems(
            this.regionOptions,
            RegionSelected
          ),
          CI_RequestTypeSelected: this.getComboItems(
            this.requestTypeOptions,
            RequestTypeSelected
          ),
          CI_RequesterTypeSelected: this.getComboItems(
            this.requesterTypeOptions,
            RequesterTypeSelected
          ),
          From: 0,
          NidWorkItem: NidWorkItem === "" ? null : NidWorkItem,
          NosaziCode: codeString === "0-0-0-0-0-0-0" ? null : codeString,
          SearchResult: null,
          To: 200
        }
      }
      this.loadObj(pRequest)
    },
    getComboItems (list, val) {
      if (!Array.isArray(list)) return null
      if (list.length === 0) return null
      const tmp = list.filter((obj1) =>
        val.some((obj2) => (obj1?.Filed ?? obj1?.ID) === obj2)
      )
      return tmp
    },
    menuDropDownChanged (row, $event) {
      console.log("****row*****/", row)
      switch ($event) {
        case 0:
          // let menuDropDownSelect, menuDropDownSelectTitle;
          switch (this.filter.AllRequestTypeSelected) {
            case "0":
              this.menuDropDownSelect = "RequestForBranchesURequest"
              this.menuDropDownSelectTitle = "درخواست انشعابات"
              break

            case "1":
              this.menuDropDownSelect = "RequestForBranchesURequestDevelopmentPlans"
              this.menuDropDownSelectTitle = "درخواست طرح های توسعه"
              break
            case "2":
              this.menuDropDownSelect = "RequestForBranchesURequestEvents"
              this.menuDropDownSelectTitle = "درخواست اتفاقات"
              break
          }
          this.rowSelectData = row
          this.showmenuDropDownSelect = true

          this.$nextTick(() => {
            this.$refs.menuDropDownSelect.getRequestInfoWithNidProc(row.NIdProc, true)
          })
          break
        case 1:
          switch (this.filter.AllRequestTypeSelected) {
            case "0":
              this.menuDropDownSelect = "RenewalRequest"
              this.menuDropDownSelectTitle = "تمدید انشعابات شخصی"
              break

            case "1":
              this.menuDropDownSelect = "RenewalRequestService"
              this.menuDropDownSelectTitle = "درخواست تمدید طرح های توسعه"
              break
            case "2":
              this.menuDropDownSelect = "RequestExtension"
              this.menuDropDownSelectTitle = "درخواست اتفاقات"
              break
          }
          this.rowSelectData = row
          this.showmenuDropDownSelect = true
          this.$nextTick(() => {
            this.$refs.menuDropDownSelect.getRenewalRequestNidProc(row.NIdProc, true)
          })
          break
        case 2:
          switch (this.filter.AllRequestTypeSelected) {
            case "0":
              this.menuDropDownSelect = "URequestVisit"
              this.menuDropDownSelectTitle = "بررسی و بازدید انشعابات شخصی"
              break

            case "1":
              this.menuDropDownSelect = "RevisitRequestService"
              this.menuDropDownSelectTitle = "بررسی و بازدید طرح های توسعه"
              break
            case "2":
              this.menuDropDownSelect = "RevisitRequestEvents"
              this.menuDropDownSelectTitle = "بررسی و بازدید اتفاقات"
              break
          }
          this.rowSelectData = row
          this.showmenuDropDownSelect = true
          this.$nextTick(() => {
            this.$refs.menuDropDownSelect.getRevisitRequestWithNidProc(row.NIdProc, true)
          })

          break
        case 3:
          switch (this.filter.AllRequestTypeSelected) {
            case "0":
              this.menuDropDownSelect = "ExtensionOfVisit"
              this.menuDropDownSelectTitle = "بررسی و بازدید تمدید انشعابات شخصی"
              break

            case "1":
              this.menuDropDownSelect = "ExtensionOfVisit"
              this.menuDropDownSelectTitle = "بررسی و بازدید تمدید انشعابات شخصی"
              break
            case "2":
              this.menuDropDownSelect = "ExtensionOfVisit"
              this.menuDropDownSelectTitle = "بررسی و بازدید تمدید انشعابات شخصی"
          }
          this.rowSelectData = row
          this.showmenuDropDownSelect = true
          this.$nextTick(() => {
            this.$refs.menuDropDownSelect.getRequestInfoWithNidProc(row.NIdProc, true)
          })

          break
        case 4:
          switch (this.filter.AllRequestTypeSelected) {
            case "0":
              this.menuDropDownSelect = "RequestExportLicense"
              this.menuDropDownSelectTitle = "صدور مجوز حفاری انشعابات شخصی"
              break

            case "1":
              this.menuDropDownSelect = "RequestExportLicense"
              this.menuDropDownSelectTitle = "صدور مجوز حفاری طرح های توسعه"
              break
            case "2":
              this.menuDropDownSelect = "RequestExportLicense"
              this.menuDropDownSelectTitle = "صدور مجوز حفاری اتفاقات"
          }
          this.rowSelectData = row
          this.showmenuDropDownSelect = true
          this.$nextTick(() => {
            this.$refs.menuDropDownSelect.getLicenceExport(row.NIdProc, true, this.filter.AllRequestTypeSelected)
          })

          break
      }
    },
    setComboOptions (val) {
      let _o = val.ClsSearchEngine ?? {
        AllRequestType: [],
        CI_RedirectName: [],
        CI_Region: [],
        CI_RequesterType: [],
        CI_RequestType: []
      }
      this.allRequestTypeOptions = this.normalizeCombos(_o.AllRequestType) // "نوع"
      this.redirectNameOptions = this.normalizeCombos(_o.CI_RedirectName) // "نام تابعه"
      this.regionOptions = this.normalizeCombos(_o.CI_Region) // "منطقه"
      this.requesterTypeOptions = this.normalizeCombos(_o.CI_RequesterType) // "شرکت خدماتی متقاضی"
      this.requestTypeOptions = this.normalizeCombos(_o.CI_RequestType) // "نوع درخواست"

      this.filter.AllRequestTypeSelected =
        this.allRequestTypeOptions.length > 0
          ? this.allRequestTypeOptions[0].ID
          : null
      this.isFillCombos = true
    },
    normalizeCombos (e) {
      if (Array.isArray(e) && e.length > 0) {
        return e.map((m) => {
          return {
            ...m,
            ID: m.Filed || m.ID,
            Title: m.Caption || m.Title
          }
        })
      } else return []
    },
    backToMainForm () {
      this.placeholder = "kartable"
      this.searchObj()
    },
    showForms (selectedItem) {
      this.selectedResponse = { ...selectedItem, NidProc: selectedItem.NIdProc, BizCode: selectedItem.NosaziCode }
      if (
        !this.selectedResponse.NidProc ||
        this.selectedResponse.NidProc === "00000000-0000-0000-0000-000000000000"
      ) return this.showError(`پروسه یافت نشد.\nNidProc Not Found`)
      this.placeholder = "forms"
    },
    clearFilter () {
      this.filter = {
        NidWorkItem: null,
        AllRequestTypeSelected:
          this.allRequestTypeOptions.length > 0
            ? this.allRequestTypeOptions[0].ID
            : null,
        RequesterTypeSelected: [],
        RegionSelected: [],
        RequestTypeSelected: [],
        RedirectNameSelected: [],
        Address: null,
        BaseNosaziCode: {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
      }
      this.searchObj()
    },
    getRowStyle ({ data }) {
      if (!data) return
      if (data.RequestType.includes("ثبت شده")) {
        return { background: "#b3eec2" }
      }
      if (data.RequestType.includes("صدور فيش")) {
        return { background: "#89d1e7" }
      }
      if (data.RequestType.includes("بايگاني دائم")) {
        return { background: "#f1b2b2" }
      }
      return { background: "transparent" }
    }
  },

  created () {
    this.loadObj(defaultModel)
  }
}
</script>
