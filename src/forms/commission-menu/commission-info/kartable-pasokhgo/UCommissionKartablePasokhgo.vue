<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title" padding fullscreen hide-title hide-close>
    <template #header>
      <safa-status :result="getKartablPasokhgoRes" />
      <safa-status :result="getRegionRes" />
    </template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="شماره دبیرخانه"
            label-width="85px"
            v-model="dataContext.CommissionInfo.NidWorkItem"
            cdcName="NidWorkItem"
            type="number"
            @keydown.enter="loadObj(0, 50)"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام مالک"
            label-width="85px"
            v-model="dataContext.CommissionInfo.OwnerName"
            cdcName="OwnerName"
            @keydown.enter="loadObj(0, 50)"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ارجاع منطقه"
            label-width="85px"
            type="number"
            v-model="dataContext.CommissionInfo.RequestUrban"
            cdcName="RequestUrban"
            @keydown.enter="loadObj(0, 50)"
          />
        </FormControl>
        <FormControl>
          <safa-combo2
            label="مرحله"
            label-width="85px"
            :options="stateOptions"
            source-type="local"
            cdcName="TaskStates"
            v-model="dataContext.ComboState"
            type="multiple"
            ref="taskStateRef"
          />
        </FormControl>
        <FormControl>
          <safa-combo2
            label="منطقه"
            label-width="85px"
            :options="regionOptions"
            source-type="local"
            cdcName="CI_Region"
            v-model="dataContext.CI_Region"
            type="multiple"
            ref="regionRef"
            @keydown.enter="loadObj(0, 50)"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="تاریخ"
            label-width="85px"
            source-type="local"
            :options="datesOptions"
            v-model="dataContext.SelectedDate"
            cdcName="SelectedDate"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="از تاریخ"
            label-width="85px"
            clearable
            v-model="dataContext.FromDate"
            cdcName="FromDate"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تا تاریخ"
            label-width="85px"
            clearable
            v-model="dataContext.ToDate"
            cdcName="ToDate"
          />
        </FormControl>
        <FormControl>
          <safa-combo2
            label="نوع کمیسیون"
            label-width="85px"
            :options="commissionTypeOptions"
            source-type="local"
            v-model="dataContext.CI_CommissionType"
            cdcName="CI_CommissionType"
            ref="commissionTypeRef"
            type="multiple"
          />
        </FormControl>
        <FormControl>
          <safa-combo2
            label="شماره کمیسیون"
            label-width="85px"
            :options="commissionOptions"
            source-type="local"
            v-model="dataContext.CI_Commission"
            cdcName="CI_Commission"
            ref="commissionRef"
            type="multiple"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="متقاضی"
            label-width="85px"
            v-model="dataContext.Requester"
            cdcName="Requester"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="همراه متقاضی"
            label-width="85px"
            v-model="dataContext.OwnerCellNo"
            cdcName="OwnerCellNo"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تلفن متقاضی"
            label-width="85px"
            v-model="dataContext.OwnerTelNo"
            cdcName="OwnerTelNo"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کارشناس انجام دهنده"
            label-width="85px"
            v-model="dataContext.ExpertName"
            cdcName="ExpertName"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره رای"
            label-width="85px"
            v-model="dataContext.VoteNo"
            cdcName="VoteNo"
          />
        </FormControl>

        <FormControl>
          <safa-text
            label="کد ملی مالک"
            label-width="85px"
            v-model="dataContext.OwnerNationalCode"
            cdcName="OwnerNationalCode"
            @keydown.enter="loadObj(0, 50)"
          />
        </FormControl>
      </FormRow>
      <div
        :class="[
          'q-pa-xs q-mb-sm',
          $q.dark.isActive ? 'bg-lighten2' : 'bg-grey-2',
        ]"
        style="border-radius: 4px"
      >
        <div class="row items-center q-gutter-x-md">
          <div class="col-auto">
            <nosazi-code-input
             v-model="baseNosaziCode"
             @enter="btnSearchClick"
             />
          </div>
          <div class="col-auto">
            <q-separator vertical style="height: 12px" />
          </div>
          <div class="col">
            <button-group>
              <btn-default
                label="تاریخچه گردش پرونده"
                @click="btnHistoryClick"
              />
              <btn-delete label="پاک کردن" @click="btnResetClick" />
              <btn-search label="جستجو" @click="btnSearchClick" />
              <!-- <btn-search
                label="انتخاب از نقشه"
                @click="openMapInfo"
              /> -->
            </button-group>
          </div>
        </div>
      </div>

      <div class="tab-kartable fit">
        <safa-splitter
          :limits="splitterLimit"
          class="fit"
          horizontal
          margin="0"
          v-model="splitterValue"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable2
                title="کارتابل پاسخگو کمیسیون"
                v-model="grdKartabl"
                cdcName="grdKartabl"
                :columns="kartableColumns"
                searchable
                min-height="200px"
                height="100%"
                max-height="100%"
                class="kartable-pasokhgo"
                m="r"
                fit
                ref="kartable"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                :allowMultipleSelection="false"
                :filterable="false"
                :serverServe="true"
                :paginate="false"
                :show-row-number="false"
                @row-click="grdKartablSelectionChanged"
              > <!-- تاریخ قابل ویرایش نیست -->
                <template #cell-MenuDropDown="{ row }">
                  <safa-combo2
                    source-type="local"
                    :options="[
                      { ID: 0, Title: 'آرشیو' },
                      { ID: 1, Title: 'آرشیو شهرسازی' },
                      { ID: 2, Title: 'بازبینی پرونده' },
                      { ID: 3, Title: 'گردش پرونده شهرسازی' },
                    ]"
                    :useInput="false"
                    @input="menuDropDownChanged(row, $event)"
                    ref="menuDropDown"
                  />
                </template>
                <template #cell-IsRelapse="{ row, col, onChangeCellValue }">
                  <safa-checkbox
                    :value="row[col.field]"
                    @input="
                      onChangeCellValue({
                        field: col.field,
                        dataItem: row,
                        value: $event,
                      })
                    "
                    m="r"
                  />
                </template>
                <template #cell-IsPast="{ row, col, onChangeCellValue }">
                  <safa-checkbox
                    :value="row[col.field]"
                    @input="
                      onChangeCellValue({
                        field: col.field,
                        dataItem: row,
                        value: $event,
                      })
                    "
                    m="r"
                  />
                </template>
                <template #cell-IsKarbari="{ row, col, onChangeCellValue }">
                  <safa-checkbox
                    :value="row[col.field]"
                    @input="
                      onChangeCellValue({
                        field: col.field,
                        dataItem: row,
                        value: $event,
                      })
                    "
                    m="r"
                  />
                </template>
                <template v-slot:bottom>
                  <div
                    class="grid-status-bar flex no-wrap q-pa-xs bg-grey-12"
                    style="flex-grow: 1"
                  >
                    <div
                      style="flex-grow: 1"
                      class="
                        flex
                        items-center
                        status-info
                        justify-start
                        q-gutter-x-sm
                        no-wrap
                        ellipsis
                      "
                    >
                      <span class="ellipsis"
                        >تعداد سطرها: {{ dataContext.TotalFiles }}</span
                      >
                    </div>

                    <div class="items-center">
                      <q-btn
                        icon="last_page"
                        flat
                        dense
                        title="صفحه آخر"
                        size="sm"
                        @click.prevent="goToPage(maxPage)"
                        :disabled="isDisabledNextPage"
                      />
                      <q-btn
                        icon="chevron_right"
                        :color="isDisabledNextPage ? 'grey' : 'black'"
                        round
                        flat
                        @click="goToPage(currentPage + 1)"
                        :disabled="isDisabledNextPage"
                        dense
                        size="sm"
                      />
                      <span class="q-px-sm">
                        <span dir="ltr">
                          <input
                            type="number"
                            :value="currentPage"
                            :min="1"
                            :max="maxPage"
                            @keypress.enter="goToPage($event.target.value)"
                          />
                          / {{ maxPage }}
                        </span>
                      </span>
                      <q-btn
                        flat
                        icon="chevron_left"
                        :color="isDisabledPrevPage ? 'grey' : 'black'"
                        round
                        @click="goToPage(currentPage - 1)"
                        :disabled="isDisabledPrevPage"
                        dense
                        size="sm"
                      />
                      <q-btn
                        icon="first_page"
                        flat
                        dense
                        title="صفحه اول"
                        size="sm"
                        @click.prevent="goToPage(1)"
                        :disabled="isDisabledPrevPage"
                      />
                    </div>
                  </div>
                </template>
              </safa-datatable2>
            </fit>
          </template>
          <template v-slot:after>
            <keep-alive>
              <UGardeshParvandehDetails
                :NidCommission="NidCommission"
                @close="toggleGardeshParvandehVisible"
                ref="UGardeshParvandehDetails"
              />
            </keep-alive>
          </template>
        </safa-splitter>
      </div>
    </fit>

    <safa-popup
      v-model="showMenuDropDownTarget"
      width="950px"
      height="600px"
      :title="menuDropDownTargetTitle"
    >
      <component :is="menuDropDownTarget" :ref="menuDropDownTarget" />
    </safa-popup>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import UGardeshParvandehDetails from "../gardesh-parvandeh-details/UGardeshParvandehDetails.vue"
import CommissionGardeshParvandeh from "./partials/CommissionGardeshParvandeh"
import CommissionArchive from "./partials/CommissionArchive.vue"
import ArchivElectronic from "./partials/ArchivElectronic.vue"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import kartableCommissionMixin from 'src/forms/commission-menu/mixins/kartableCommissionMixin.js'
import UCodeHistory from '../../../shahrsazi/histor-and-search/code-history/UCodeHistory.vue'
const defaultDataContext = {
  CommissionInfo: {
    NidWorkItem: "",
    OwnerName: "",
    RequestUrban: ""
  },
  FromDate: "",
  ToDate: "",
  SelectedDate: 0,
  ComboState: [],
  CI_Region: "",
  CI_CommissionType: [],
  CI_Commission: [],
  Requester: "",
  OwnerCellNo: "",
  OwnerTelNo: "",
  ExpertName: "",
  VoteNo: "",
  OwnerNationalCode: "",
  Search: [],
  TotalFiles: 0
}

export default {
  components: {
    UGardeshParvandehDetails,
    UCodeHistory,
    CommissionGardeshParvandeh,
    CommissionArchive,
    ArchivElectronic
  },

  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "کارتابل پاسخگو کمیسیون",
      name: "UCommissionKartablePasokhgo",
      formKey: "f2c30863-551e-4fb0-924f-2ddfa86353b9",
      main: true,

      commissionsSetting: {
        IsAcceptTajdidnazar: false,
        IsShowMainKartabl: false,
        IsShowBadviParameter: false,
        HasAutomateCommissionDate: false,
        Coding: true,
        CmbCommissionDay: 0,
        ChangeMeetingName: false,
        VoteNoFormat: "0",
        InputValueForGhal: false,
        ErrorSelectHoliday: false,
        ReadOnlyExpertFormInVote: false,
        CheckDuplicateTrepassVote: false,
        ScrollTrepassPanel: false,
        CheckCommentsExperts: false,
        HideAgnetComments: false,
        IsCheckEmptyVoteTypeDetail: false,
        NotAccessToArchiveInSearchPanel: false,
        NoAgainCalcForEditVote: false,
        ActiveAgentInMultiCommission: false,
        DisableGroupSend: false,
        Instruction: false,
        IsAddTabArchiveSharsazi: false,
        IsNote: false,
        IsNotEditableVoteValue: false,
        HideIscomplainant: false,
        IsShowMessegeMeetinginVote: false,
        MessegeMeetinginVote: "مالک/ذینفع درخواست حضور در جلسه را دارد؟",
        HideElamConfirm: false,
        ShowMesasgeOnEditVote: false,
        LockVoteDate: false,
        HideEditMessage: false,
        IsEnableEditCommissionVoteOfAgent: false,
        UpdateCommissionDate: false,
        ShowDefaultShahrsaziArchive: false,
        IsOrderByVoteHistory: false,
        SetCommissionPrintTypeGharar: false,
        IsEnableEditeVoteNo: false,
        ShowDefaultCommissionArchive: false,
        HideOldCommission: false,
        AddVoteToArchiveThenPrintPreview: false,
        tabIndex5Called: false,
        tabIndex3Called: false,
        nidprocT: "00000000-0000-0000-0000-000000000000",
        CI_Region: 1,
        lastNosaziCode: "",
        lastBizCode: "",
        AllKCoeffiecientHasValidation: true,
        AllKCoeffiecientHasValidationMessage: "مقدار ضریب نمیتواند خالی باشد!",
        CommissionGridSetting: {
          Id: true, // کد تخلف
          CI_Years: true, // سال تخلف
          TrepassValue: true, // مقدار تخلف
          CommissionSarghofliValue: true, // ارزش سرقفلي
          MinPenalty: true, // حداقل جريمه
          MaxPenalty: true, // حداکثر جريمه
          TrepassGroupType: true, // گروه تخلف/نوع تخلف
          K: true, // K
          Floor: true, // طبقه
          UsingID: true, // کد گروه کاربري فرعي
          UsingTitle: true, // گروه کاربري فرعي
          UsingGroupTitle: true, // گروه کاربري اصلي موجود
          TrespassDateInMunicipality: true, // تاريخ وقوع تخلف از نظر شهرداري
          TrespassDateInEngineer: true, // تاريخ وقوع تخلف از نظر مهندس ناظر
          TrespassDateHappendNotMelak: true, // تاريخ وقوع خلاف ملاک عمل
          CI_UsingTypeGroupMojaz: true, // گروه کاربري اصلي مجاز
          UrbanIdia: true, // تقاضاي شهردار
          VahedCountMosavab: true, // تعداد واحد موجود
          VahedCountMojaz: true, // تعداد واحد مجاز
          KC: true, // ضريب K
          AreaMojod: true, // متراژ موجود
          AreaMojaz: true, // متراژ مجاز
          Trepass_Comments: true, // توضيحات
          Note: true, // تبصره
          IsComplainant: true, // شاکي دارد/ندارد
          IsRightsBystanders: true, // رعايت حقوق مجاورين
          K_S: true, // K (سوابق)
          TrepassValueAmar: true, // متراژ کسر از آمار
          TrepassStatus: true, // وضعيت تخلف
          KC_S: true, // ضريب K (سوابق)
          VoteType_S: true, // نوع راي (سوابق)
          CI_Commission_S: true, // نوع کميسيون (سوابق)
          CI_CommissionType_S: true, // شماره کمیسیون (سوابق)
          VoteNo_S: true, // شماره راي (سوابق)
          VoteValue_S: true // مبلغ راي (سوابق)
        },
        CommissionComboPrint: {}
      },

      // Context
      dataContext: JSON.parse(JSON.stringify(defaultDataContext)),
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      stateOptions: [],
      regionOptions: [],
      commissionTypeOptions: [],
      commissionOptions: [],
      datesOptions: [
        { ID: 0, Title: "نامشخص" },
        { ID: 1, Title: "تاریخ ورود" },
        { ID: 2, Title: "تاریخ صدور رای" },
        { ID: 3, Title: "تاریخ کمیسیون" }
      ],
      grdKartabl: [],
      currentPage: 1,
      pageSize: 50,
      isChangePageIndex: false,
      showGardeshParvandeh: false,
      showMenuDropDownTarget: false,
      menuDropDownTarget: "",

      // Splitter
      splitterValue: 100,
      splitterLimit: [0, 100],

      // Responses
      getKartablPasokhgoRes: null,
      getRegionRes: null,

      kartableColumns: [
        {
          field: "Row",
          title: "ردیف",
          width: 50,
          align: "center",
          headerAlign: "center",
          resizable: false,
          sortable: false
        },
        {
          field: "MenuDropDown",
          title: "",
          width: "60px"
        },
        {
          field: "IsRelapse",
          title: "عودتی",
          editor: "checkbox",
          width: "60px",
          align: "center",
          headerAlign: "center",
          resizable: false,
          sortable: false
        },
        {
          field: "IsPast",
          title: "سابقه",
          editor: "checkbox",
          width: "60px",
          align: "center",
          headerAlign: "center",
          resizable: false,
          sortable: false
        },
        {
          field: "IsKarbari",
          title: "تغییر کاربری",
          editor: "checkbox",
          width: "60px",
          align: "center",
          headerAlign: "center",
          resizable: false,
          sortable: false
        },
        {
          field: "CI_Region",
          title: "منطقه",
          width: "80px",
          editor: "combo",
          domain: "Commission100"
        },
        { field: "CodeString", title: "کدنوسازی", width: "125px" },
        {
          field: "SecretariatNo",
          title: "شماره دبیرخانه",
          width: "150px"
        },
        {
          field: "UrbanNidKartablItem",
          title: "شماره ارجاع منطقه",
          width: "150px"
        },
        {
          field: "OwnerName",
          title: "نام و نام خانوادگی مالک",
          width: "250px"
        },
        { field: "OwnerNationalCode", title: "کدملی مالک", width: "85px" },
        { field: "Requester", title: "متقاضی", width: "85px" },
        { field: "Status", title: "مرحله", width: "150px" },
        {
          field: "CI_CommissionType",
          title: "نوع کمیسیون",
          width: "150px",
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "CI_Commission",
          title: "شماره کمیسیون",
          width: "150px",
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "CommissionDate",
          title: "تاریخ کمیسیون",
          width: "85px",
          editor: "date"
        },
        {
          field: "ComEnterDate",
          title: "تاریخ ورود",
          width: "85px",
          editor: "date"
        },
        {
          field: "VoteDate",
          title: "تاریخ رای",
          width: "85px",
          editor: "date"
        },
        {
          field: "VoteNo",
          title: "شماره رای",
          width: "85px"
        },
        { field: "Address", title: "آدرس ملک", width: "85px" },
        { field: "OwnerTelNo", title: "تلفن مالک", width: "85px" },
        { field: "OwnerCellNo", title: "همراه مالک", width: "85px" },
        { field: "ExpertName", title: "کارشناس انجام دهنده", width: "150px" },
        {
          field: "AgentName",
          title: "نماینده تایید کننده",
          width: "150px"
        },
        {
          field: "CI_PrintType",
          title: "نوع چاپ",
          width: "150px",
          editor: "combo",
          domain: "Commission100"
        }
      ],
      NidCommission: null
    }
  },

  methods: {
    async loadCommissionSettings () {
      this.commissionsSetting = await this.loadFormSetting(
        "commissionSettings",
        {
          defaultValue: this.commissionsSetting,
          nidProc: GLOBAL_SETTINGS_GUID
        }
      )
    },
    async createMenu () {
      this.showLoading()

      await this.$services.commissions
        .getRegion()
        .then(({ data }) => {
          const getRegionRes = this.getResponse(data)

          if (getRegionRes.success) {
            this.regionOptions = getRegionRes.data.GetRegionResult.CI_Region
            this.commissionOptions =
              getRegionRes.data.GetRegionResult.CI_Commission
            this.commissionTypeOptions =
              getRegionRes.data.GetRegionResult.CI_CommissionType
            this.stateOptions =
              getRegionRes.data.GetRegionResult.TaskStates.map((e, ID) => {
                return {
                  ...e,
                  ID,
                  Title: e.TaskTitle
                }
              })
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    loadObj (from, to) {
      this.showLoading()

      const payload = {
        Prequest: {
          ...this.getRequest()
        },
        From: from,
        To: to
      }

      if (this.isCityQazvin) {
        payload.pCondition = ` and CI_Region = ${window.getConfigValue("CiCity")}`
      }

      this.$services.commissions
        .getKartablPasokhgo(payload)
        .then(async ({ data }) => {
          this.getKartablPasokhgoRes = this.getResponse(data)

          if (this.getKartablPasokhgoRes.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })

            this.grdKartabl = []

            if (
              this.getKartablPasokhgoRes.data?.GeTSearchResult?.Search != null
            ) {
              let searchResult = this.getKartablPasokhgoRes.data.GeTSearchResult.Search || []

              this.dataContext.Search = searchResult
              this.dataContext.TotalFiles = this.getKartablPasokhgoRes.data.GeTSearchResult.TotalFiles

              if (this.dataContext.TotalFiles <= 1) {
                this.dataContext.TotalFiles = 1
              }

              if (this.isChangePageIndex === false) this.currentPage = 1

              this.grdKartabl = this.dataContext.Search.sort((a, b) => {
                if (a.Row > b.Row) return 1
                if (a.Row < b.Row) return -1
                return 0
              }).map((e) => {
                let backgroundColor
                switch (this.getRowStyle(e)) {
                  case "0":
                    backgroundColor = "White"
                    break

                  case "1":
                    backgroundColor = "#D1FBFB"
                    break

                  case "400":
                    backgroundColor = "#FDFDC9"
                    break
                }

                return {
                  ...e,
                  style: `background-color: ${backgroundColor}`
                }
              })
            } else {
              this.showError("موردی یافت نشد")
            }
          }

          this.isChangePageIndex = false
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getRequest () {
      let tmpRequest = {
        CommissionInfo: {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0,
          HasComments: false,
          IsMeeting: false,
          Iscomplainant: false,
          NidCommission: "00000000-0000-0000-0000-000000000000",
          OwnerName: "",
          OwnerNationalCode: "",
          SecretariatNo: 0,
          SysCI_RequestBy: 0,
          UrbanNidKartablItem: 0,
          TreeLevel: 0
        }
      }
      Object.assign(tmpRequest.CommissionInfo, this.baseNosaziCode)

      tmpRequest.CommissionInfo.OwnerName =
        this.dataContext.CommissionInfo.OwnerName

      tmpRequest.CommissionInfo.SecretariatNo = !this.dataContext.CommissionInfo
        .NidWorkItem
        ? 0
        : parseInt(this.dataContext.CommissionInfo.NidWorkItem)

      tmpRequest.CommissionInfo.UrbanNidKartablItem = !this.dataContext
        .CommissionInfo.RequestUrban
        ? 0
        : parseInt(this.dataContext.CommissionInfo.RequestUrban)

      tmpRequest.FromDate = this.dataContext.FromDate
      tmpRequest.ToDate = this.dataContext.ToDate
      tmpRequest.SelectedDate = this.dataContext.SelectedDate

      try {
        if (
          this.getApplicationParam.hasOwnProperty("SetRegionByUserLocation") &&
          this.getApplicationParam.SetRegionByUserLocation
        ) {
          let allowDomains = this.currentUser.JobLocation.allowDomains
          if (!allowDomains) {
            let allowDomainsArray = allowDomains.Split(",")
            if (allowDomainsArray && allowDomainsArray.length > 0) {
              tmpRequest.CI_Region = this.$refs.regionRef.selectedItems
              allowDomainsArray.forEach((item) => {
                tmpRequest.CI_Region.push({
                  IsSelected: true,
                  ID: parseFloat(item),
                  Title: item
                })
              })
            }
          }
        } else {
          tmpRequest.CI_Region = this.$refs.regionRef.selectedItems
        }
      } catch (ex) {
        console.error(ex)
        tmpRequest.CI_Region = this.$refs.regionRef.selectedItems
      }
      tmpRequest.TaskStates = this.$refs.taskStateRef.selectedItems
      tmpRequest.CI_Commission = this.$refs.commissionRef.selectedItems
      tmpRequest.CI_CommissionType = this.$refs.commissionTypeRef.selectedItems

      tmpRequest.Requester = this.dataContext.Requester
      tmpRequest.OwnerCellNo = this.dataContext.OwnerCellNo
      tmpRequest.OwnerTelNo = this.dataContext.OwnerTelNo
      tmpRequest.ExpertName = this.dataContext.ExpertName
      tmpRequest.VoteNo = this.dataContext.VoteNo
      tmpRequest.CommissionInfo.OwnerNationalCode =
        this.dataContext.OwnerNationalCode

      return tmpRequest
    },

    btnHistoryClick () {
      this.toggleGardeshParvandehVisible()
      this.$nextTick(() => {
        this.$refs.UGardeshParvandehDetails.getTaskHistory()
      })
    },
    btnResetClick () {
      this.dataContext = JSON.parse(JSON.stringify(defaultDataContext))

      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    },

    btnSearchClick () {
      this.dataContext.Search = []
      this.loadObj(0, 50)
    },

    menuDropDownChanged (row, $event) {
      // آرشیو  0
      // آرشیو شهرسازی  1
      // بازبینی پرونده  2
      // گردش پرونده شهرسازی  3

      switch ($event) {
        case 0:
          if (!this.commissionsSetting.NotAccessToArchiveInSearchPanel) {
            this.menuDropDownTarget = 'CommissionArchive'
            this.showMenuDropDownTarget = true

            this.$nextTick(() => {
              let bizCode = row.RootSubject
              this.$refs.CommissionArchive.updateBaseBizCode(bizCode)
            })
          } else {
            this.showError("دسترسی به آرشیو وجود ندارد")
          }

          break
        case 1:
          this.menuDropDownTarget = "ArchivElectronic"
          this.showMenuDropDownTarget = true

          this.$nextTick(async () => {
            let nosaziCode = await convertStringToNosaziCodeObject(
              row.CodeString
            )
            this.$refs.ArchivElectronic.baseNosaziCode = nosaziCode
            await this.$refs.ArchivElectronic.$refs.baseNosaziCode.raisedEnter(
              nosaziCode
            )
            // this.$refs.ArchivElectronic.$refs.nosaziCode.showArchive = true
          })
          break
        case 2:
          this.$stKartable.dispatch("clearSelectedRequestPasokhgo")
          this.$stKartable.dispatch("setSelectedRequest", row)
          this.menuDropDownTarget = "UCodeHistory"
          this.showMenuDropDownTarget = true

          this.$nextTick(async () => {
            let nosaziCode = await convertStringToNosaziCodeObject(
              row.CodeString
            )
            this.$refs.UCodeHistory.nosaziCode = nosaziCode
            await this.$refs.UCodeHistory.$refs.nosaziCode.raisedEnter(
              nosaziCode
            )
          })
          break

        case 3:
          this.menuDropDownTarget = "CommissionGardeshParvandeh"
          this.showMenuDropDownTarget = true

          this.$nextTick(async () => {
            debugger
            this.$refs.CommissionGardeshParvandeh.NidProc = row.NidProc
            await this.$refs.CommissionGardeshParvandeh.load()
            await this.$refs.CommissionGardeshParvandeh.getComments()
          })
          break
      }
    },

    toggleGardeshParvandehVisible () {
      this.showGardeshParvandeh = !this.showGardeshParvandeh
    },

    async grdKartablSelectionChanged (row) {
      this.NidCommission = row.NidCommission
      row.UrbanNidRequest = (row.UrbanNidRequest === undefined || row.UrbanNidRequest === null) ? row.UrbanNidKartablItem : row.UrbanNidRequest
      row.SecrNo = row.SecretariatNo
      row.BizCode = row.CodeString
      await this.$store.dispatch("commission/setSelectedCommission", row)
      await this.$store.dispatch("commission/setIsMainCommissionKartab", false)
    },

    getRowStyle (row) {
      if (row.HasLegalExpert) return "9"

      if (window.getConfig("esupParams").UseGhararKartabl) {
        if (row.HasGharar && !row.ResponseGharar) {
          return "2"
          // eslint-disable-next-line eqeqeq
        } else if (row.HasGharar && row.IsVote == -1 && row.ResponseGharar) {
          return "3"
        }
      }

      if (row.IsVote === null) return "-1"

      if (row.HasTasmim === true) return "2"

      switch (row.IsVote) {
        case 400:
          return "400"
        case -1:
          return "0"
        case 418:
          return "2"
        default:
          return "1"
      }

      // تاریخ رأی
      // eslint-disable-next-line eqeqeq, no-unreachable
      if (row.VoteDate != null && row.VoteDate != "") return "1"

      if (row.HasHoghoghi) return "0"

      return null
    },

    goToPage (page) {
      this.currentPage = Math.max(1, Math.min(Number(page), this.maxPage))

      let i = Number(page)
      if (i > this.maxPage - 1) {
        i = this.maxPage - 1
      } else {
        i = page - 1
      }

      let al = 0
      al = this.pageSize * i
      this.isChangePageIndex = true
      this.loadObj(al + 1, (i + 1) * this.pageSize)
    }
  },

  computed: {
    menuDropDownTargetTitle () {
      switch (this.menuDropDownTarget) {
        case "ArchivElectronic":
          return "آرشیو شهرسازی"

        case "UCodeHistory":
          return "بازبینی پرونده"

        case "CommissionGardeshParvandeh":
          return "گردش پرونده شهرسازی"

        default:
          return ""
      }
    },

    isDisabledNextPage () {
      return this.currentPage >= this.maxPage
    },
    isDisabledPrevPage () {
      return this.currentPage === 1
    },

    maxPage () {
      return Math.ceil(this.dataContext.TotalFiles / this.pageSize)
    },

    allowedDistricts () {
      let allowDomains = []
      if (this.currentUser.jobLocation?.allowDomains ?? false) {
        allowDomains = this.currentUser.jobLocation.allowDomains.split(",") || []
      } else if (this.currentUser.domain) {
        allowDomains = this.currentUser.domain || []
      } else {
        allowDomains = []
      }
      if (allowDomains.length > 0) {
        return allowDomains.map(e => Number(e))
      } else {
        return []
      }
    },

    isCityQazvin () {
      // آیدی شهرستان های قزوین
      const qazvinCiCities = ["71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "86", "87", "88", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"]

      return qazvinCiCities.includes(String(window.getConfigValue('CiCity', 0)))
    }
  },

  watch: {
    showGardeshParvandeh () {
      this.splitterLimit = this.showGardeshParvandeh ? [0, Infinity] : [0, 100]
      this.splitterValue = this.showGardeshParvandeh ? 60 : 100
    }
  },

  async created () {
    await this.loadCommissionSettings()
    await this.createMenu()
  }
}
</script>

<style lang="scss">
.kartable-pasokhgo .grid-root-wrapper .grid-row.mark-as-selected {
  background-color: #bcd4e3 !important
}
</style>
