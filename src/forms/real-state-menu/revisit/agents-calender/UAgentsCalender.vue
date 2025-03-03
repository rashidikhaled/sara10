<!-- eslint-disable eqeqeq -->
<template>
  <safa-form
    :id="formKey"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
    caption="شهرسازی- تقویم مامور بازدید"
  >
    <form-wrapper title="تقویم مامور بازدید" vertical>
      <template #header>
        <safa-status :result="getShRevisitAgentListForAssignRes" />
        <safa-status :result="getRevisitAgentAssignGroupRes" />
        <safa-status :result="getBaseLibInNidProcRes" />
        <safa-status :result="saveRequestResult" />
        <safa-status :result="holidaysResult" />
      </template>
      <!-- <fit> -->
      <div class="row q-gutter-sm q-mb-sm items-center">
        <div class="col-1">
          <safa-combo
            v-model="selectedDistrict"
            cdcName="District"
            :options="districts"
            :use-input="false"
            label="منطقه"
            label-width="45px"
            source-type="local"
            @input="loadObj"
          />
        </div>
        <div class="col-2">
          <safa-combo
            ref="revisitAgentRef"
            v-model="selectedAgent"
            cdcName="selectedAgent"
            :options="cmbRevisitAgent"
            label="مامور بازدید"
            label-width="auto"
            source-type="local"
            use-input
            @filter="filterFn"
            @input="cmbRevisitAgentSelectionChanged"
          />
        </div>
        <safa-datepicker
          v-model="revisitDateFrom"
          cdcName="revisitDateFrom"
          label="از تاریخ"
          label-width="auto"
          @input="loadRevisits"
        />

        <safa-datepicker
          v-model="revisitDateTo"
          cdcName="revisitDateTo"
          label="تا تاریخ"
          label-width="auto"
          @input="loadRevisits"
        />
      </div>
      <!-- </div> -->
      <safa-splitter
        v-model="gridSplitter"
        class="fit"
        horizontal
        margin="0"
        style="min-height: 300px"
      >
        <template v-slot:before>
          <fit>
            <safa-datatable
              v-model="revisitList"
              cdcName="revisitList"
              :allow-multiple-selection="false"
              :show-row-number="false"
              fit
              height="100%"
              helper="revisitVacation"
              ref="revisitList"
              max-height="100%"
              min-height="100px"
              title="لیست بازدیدها"
              @selectedChange="gvWorksSelectionChanged"
            />
          </fit>
        </template>

        <template v-slot:after>
          <fit>
            <safa-splitter
              v-model="splitterModel"
              class="fit"
              margin="0"
              style="min-height: 170px"
            >
              <template v-slot:before>
                <fit>
                  <safa-datatable
                    ref="revisitVacationInOneDayEstate"
                    v-model="gvDetails"
                    cdcName="gvDetails"
                    :allow-multiple-selection="false"
                    :show-row-number="false"
                    :title="revisitVacationInOneDayTitle"
                    fit
                    height="100%"
                    :columns="revisitVacationInOneDayEstate"
                    m="r"
                    max-height="100%"
                    min-height="170px"
                  />
                </fit>
              </template>
              <template v-slot:after>
                <fit>
                  <safa-datatable
                    v-model="gvFreeTimes"
                    cdcName="gvFreeTimes"
                    :allow-multiple-selection="false"
                    :allowMultipleSelection="false"
                    :selectable="true"
                    :show-row-number="false"
                    fit
                    height="100%"
                    helper="revisitVacationTimesInOneDay"
                    m="r"
                    max-height="100%"
                    min-height="170px"
                    title="زمانبندی بازدیدها"
                    @selectedChange="handleRevisitTimeGridSelectedChanged"
                  />
                </fit>
              </template>
            </safa-splitter>
          </fit>
        </template>
      </safa-splitter>
    </form-wrapper>
  </safa-form>
</template>

<script>
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
// eslint-disable-next-line no-unused-vars
import { addToTime } from "src/utils/timeHelper"

// import { currentDate, currentTime } from "src/utils/index"

const defaultModel = {
  AllRevisitAgentList: null,
  DtoRevisitAgentAndHoursEmptyList_InCount_List: null,
  ErrorResult: {},
  RevisitAgentAssign_Group: null,
  RevisitAgentAssign_InOneDay: [],
  RevisitInDateForNidRevisitAgentList: null,
  SameRevisitAgentInOneDate: null,
  Sh_ActiveRevisitAgentList: [],
  Sh_RequestInfoList: null,
  Sh_RevisitAgent: null,
  Sh_RevisitAgentList: [],
  Sh_RevisitList: null,
  _NidRevisitAgent: ""
}
export default {
  route: "/revisit-agents/calendar",
  mixins: [baseFormMixin],

  props: {
    isCalculateSize: {
      type: Boolean,
      default: true
    },
    selection: Boolean,
    district: Number
  },

  data () {
    return {
      title: "تقویم مامورین بازدید",
      name: "UAgentsCalender",
      formKey: "74C572DF-8C4B-4E7F-8D2D-F4FE2EFFEB0E",
      main: true,

      // columns
      revisitVacationInOneDayEstate: [
        {
          field: "NidWorkItem",
          title: "شماره درخواست",
          width: "113px"
        },
        {
          field: "RevisitDate",
          title: "تاريخ بازدید",
          editor: "date",
          width: "108px"
        },
        {
          field: "RevisitTimeFrom",
          title: "ساعت شروع بازدید",
          width: "123px"
        },
        {
          field: "RevisitTimeTo",
          title: "ساعت پایان بازدید",
          width: "126px"
        },
        {
          field: "IsDoIt",
          title: "آیا انجام شده است",
          editor: "checkbox",
          width: "125px"
        }
      ],

      selectedDistrict: 1,
      sidebarCompatible: true,
      vacationDialogState: false,
      selectedRevisitDate: null,
      selectedRevisitTime: null,
      selectedAgent: "",
      // selected_District:1,
      revisitDateFrom: "", // e.g. 1398/12/19
      revisitDateTo: "",
      splitterModel: 80,
      gridSplitter: 40,
      filterText: "",
      shRevisitAgentListFormAssign: {
        ...defaultModel
      },
      shRevisitAgentVacation: { Sh_RevisitAgentVacation: [] },
      revisitAgentAssignGroup: {},
      revisitAgentAssignInOneDay: {
        ...defaultModel
      },

      // Responses
      getShRevisitAgentListForAssignRes: null,
      getRevisitAgentAssignGroupRes: null,
      getBaseLibInNidProcRes: null,
      visitCount: null,
      revisitList: [],
      baseNosaziCode: {
        District: 1,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      holidaysResult: null,
      holidaysAndEventsList: [],
      selectedRevisitRow: {},
      saveRequestResult: null,
      BuildingSettings: {
        ShahrsaziSettingsIncome: {
          Chk_CalculateIncomeFromSettings: true,
          Chk_HasDailyDeadlineType: false,
          Chk_DonotShowUserpriceColum: false,
          Chk_MablagheSystemWithDecimal: false,
          Chk_SeparatlyIntallment: false,
          Chk_JustIncomeCalculated: false,
          Dta_DeadlineDate: "",
          DayCount: 0
        },
        ShahrsaziSettings: {
          Chk_SendSMSInBlacklist: false,
          Chk_SendSMSExitFromBlacklist: false,
          Chk_SendSMSInTemporaryArchives: false,
          Chk_SendSMSInPermanentArchives: false,
          Chk_SendSMSRegisterRequest: false,
          SMSSignature: "",
          RevisitTimeFrom: "08:00",
          RevisitTimeTo: "22:00",
          RevisitDuration: 30,
          Chk_PreventRevisitInHolidays: false,
          Chk_CalculateZabeteh: false,
          Chk_SetMaoCode: false,
          Chk_FillUnregisteredCode: false,
          Chk_MissFoulUserChecking: false,
          Chk_RevisitAgentCopyChecking: false,
          Chk_CommissionFine: false,
          Chk_CommisionVoteChecking: false,
          Chk_IsComboRequesterName: false,
          Chk_IsMultipleSendToBlackList: false,
          Chk_IsCopyShArchiveFromParvandeh: false,
          Chk_IsCurrentDateForConfirmLicence: false,
          Chk_IsCheckSabt: false,
          Chk_IsCheckSabtWCF: false,
          Chk_IsCheckSabtJson: false,
          Chk_IsCheckMapInfo: false,
          Chk_IsChecExistBlock: false,
          Chk_IsChecUserInDutyCodes: false,
          Chk_PreventCancelRequest: false,
          LayerIdCommision5: "",
          UsingCount: 1,
          ArchiveParvanehEntityId: 1,
          ArchiveAnswerEstelamEntityId: 1,
          ArchivePayankarEntityId: 1,
          ArchiveMapCommandEntityId: 1,
          ArchiveCertificateOfContraryEntityId: 1,
          ArchivePrincipalAgreementEntityId: 1,
          Chk_IsCheckCommissionInExitTemporary: false,
          Chk_IsShowBaseDig: false,
          Chk_IsChangeNosaziCodeInSubSystems: false,
          Chk_DontCheckCroquisInRevisit: false,
          Chk_DontCheckPreCommissionInfo: false,
          Chk_IsSelectOnObjTypeInRevisit: false,
          Chk_AllowExitFromBlackListWithSameGroups: false,
          Chk_DontCheckRequestInConvertBuildingToHousSharing: false,
          Chk_DontCheckRequestInConvertHousSharingToBuilding: false,
          Chk_DontShowMomayeziGroup: false,
          Chk_DontValidationInBlackList: false,
          Chk_BackToStartInConvert: false,
          Chk_DontShowPenaltyGroup: false,
          Chk_GenerateDateAndConversionDateToYear: false,
          Chk_GenerateDateAndConversionDateToDate: false,
          Chk_GenerateYear: false
        }
      },

      // Models
      isLoaded: false,
      isMaxVisit: false,
      districts: [
        {
          Title: "1",
          ID: 1
        },
        {
          Title: "2",
          ID: 2
        },
        {
          Title: "3",
          ID: 3
        }
      ],

      cmbRevisitAgent: [],
      revisitAgentList: [],
      gvDetails: [],
      gvFreeTimes: [],
      revisitVacationList: [],
      revisitVacationListForSpeceficDate: [],
      selectedFreeDate: "",
      revisitVacationInOneDayTitle: "زمانبندی بازدیدها"
    }
  },

  computed: {
    revisitAgent () {
      if (!this.revisitAgentList || !this.revisitAgentList.length) {
        return null
      }
      return this.revisitAgentList.filter(
        ({ NidRevisitAgent }) =>
          NidRevisitAgent &&
          this.selectedAgent &&
          NidRevisitAgent.toString().toLowerCase() ===
            this.selectedAgent.toLowerCase()
      )[0]
    },
    ShahrsaziSettings () {
      return this.BuildingSettings && this.BuildingSettings.ShahrsaziSettings
    }
  },

  methods: {
    cmbRevisitAgentSelectionChanged () {
      console.log("cmbRevisitAgentSelectionChanged")
      // if (this.selectedAgent === null) {
      //   return false
      // }
      this.loadRevisits()
      this.gvDetails = []
      this.gvFreeTimes = []
      console.log("navid")
    },

    async loadSettings () {
      this.BuildingSettings = await this.loadFormSetting("BuildingSettings", {
        defaultValue: this.BuildingSettings,
        nidProc: GLOBAL_SETTINGS_GUID
      })
    },
    cancel () {
      this.$emit("load")
      this.isEditable = false
    },
    handelSelectedRevisitRow (e) {
      this.selectedRevisitRow = e
    },
    btnVacationClick () {
      if (this.selectedAgent === null) {
        this.showError("لطفا یک مامور بازدید را انتخاب نمایید")
        return false
      }

      this.vacationDialogState = true
    },
    async getHolidaysAndEvents () {
      try {
        this.showLoading()
        const { data } = await this.$srvWorkflow.getHolidaysAndEvents()
        this.holidaysResult = this.getResponse(data)

        if (this.holidaysResult.success) {
          this.holidaysAndEventsList = this.holidaysResult.data.data
        }
      } catch (error) {
        console.error(error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    rowSelect (e) {
      this.revisitAgentList.forEach((x) => {
        if (x.LastName === e.LastName && x.Name === e.Name) {
          this.selectedAgent = x.NidRevisitAgent
        }
      })

      this.cmbRevisitAgentSelectionChanged()
    },
    async gvWorksSelectionChanged ({ dataItem: selectedRow }) {
      // reSchadule.IsExpanded = true;
      let tmpContext = { ...selectedRow }
      // Get Hourly vacation for thid date
      this.revisitVacationListForSpeceficDate =
        tmpContext.AgentVacationList.filter(
          (f) =>
            // eslint-disable-next-line eqeqeq
            f.VacationDate == tmpContext.RevisitDate && f.IsWholeDay == false
        )

      if (
        tmpContext.AgentVacationList.some(
          (f) => f.VacationDate.includes(tmpContext.RevisitDate) && f.IsWholeDay
        )
      ) {
        this.showError(
          `تاریخ ${tmpContext.RevisitDate} برای این مامور بازدید، به علت مرخصی قابل انتخاب نمی باشد`,
          {
            title: "اخطار"
          }
        )
        this.gvDetails = []
        this.gvFreeTimes = []
        return false
      }

      this.selectedFreeDate = tmpContext.RevisitDate
      if (tmpContext.CountInDay !== 0) {
        this.isMaxVisit = tmpContext.CountInDay === tmpContext.MaxVisit
        this.showLoading()
        const payload = {
          pNidRevisitAgent: tmpContext.NidRevisitAgent,
          pRevisitDate: tmpContext.RevisitDate
        }

        this.$services.ES.getRevisitAgentAssignInOneDay(payload)
          .then(({ data }) => {
            this.getRevisitAgentAssignInOneDayRes = this.getResponse(data)
            if (this.getRevisitAgentAssignInOneDayRes.success) {
              let tmpDetails =
                this.getRevisitAgentAssignInOneDayRes.data.GetRevisitAgentAssign_InOneDayResult.RevisitAgentAssign_InOneDay.sort(
                  (a, b) => {
                    if (a.RevisitTimeFrom > b.RevisitTimeFrom) return 1
                    if (a.RevisitTimeFrom < b.RevisitTimeFrom) return -1
                    return 0
                  }
                )
              this.gvDetails = tmpDetails
              this.calculateFreeTimes(
                tmpDetails,
                this.revisitVacationListForSpeceficDate
              )
            }
          })
          .catch((error) => {
            console.error(error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.isMaxVisit = false
        this.calculateFreeTimes(null, this.revisitVacationListForSpeceficDate)
      }

      this.revisitVacationInOneDayTitle = `زمانبندی بازدیدها - تاریخ: ${tmpContext.RevisitDate}`
    },

    calculateFreeTimes (pRevisitInOneDay, pHourlyVacationList) {
      if (!this.isMaxVisit) {
        let tsStart = "8:00"
        let tsEnd = "22:00"
        let tsDuration = 0.5

        if (this.ShahrsaziSettings) {
          if (this.ShahrsaziSettings.RevisitTimeFrom) {
            tsStart = this.ShahrsaziSettings.RevisitTimeFrom
          }

          if (this.ShahrsaziSettings.RevisitTimeTo) {
            tsEnd = this.ShahrsaziSettings.RevisitTimeTo
          }

          if (this.ShahrsaziSettings.RevisitDuration) {
            tsDuration = parseInt(this.ShahrsaziSettings.RevisitDuration)
          }
        }

        var tmpCalender = []

        if (pRevisitInOneDay == null) {
          this.gvDetails = []
          while (tsStart < tsEnd) {
            if (tmpCalender.find((a) => a.RevisitTime === tsStart) == null) {
              tmpCalender.push({
                Address: "",
                IsFreeTime: true,
                RevisitTime: tsStart,
                IsNeighborApartment: false,
                IsHourlyVacation: pHourlyVacationList.some(
                  (f) => tsStart >= f.FromTime && tsStart < f.ToTime
                )
              })
            }

            // allFreeTimes.Add(tsStart);
            tsStart = addToTime(tsStart, tsDuration)
          }
        } else {
          while (tsStart < tsEnd) {
            // if (lastTS == tsStart)
            //    tsStart = tsStart.Add(tsDuration);
            // bool tmpIsValid = false;
            pRevisitInOneDay.forEach((item) => {
              let tFrom = item.RevisitTimeFrom
              var tTo = "00:00:00"
              if (item.RevisitTimeTo) {
                tTo = item.RevisitTimeTo
              }

              if (tFrom < tsStart) {
                if (tTo !== "00:00:00" && tsStart < tTo) {
                  if (
                    tmpCalender.find((a) => a.RevisitTime === tsStart) === null
                  ) {
                    tmpCalender.push({
                      Address: item.RevisitAddress,
                      IsFreeTime: false,
                      RevisitTime: tsStart,
                      IsNeighborApartment:
                        item.IsNeighborApartment !== null
                          ? item.IsNeighborApartment
                          : false,
                      IsHourlyVacation: pHourlyVacationList.some(
                        (f) => tsStart >= f.FromTime && tsStart < f.ToTime
                      )
                    })
                  } else {
                    let clsAgentsCalender = tmpCalender.find(
                      // eslint-disable-next-line eqeqeq
                      (a) => a.RevisitTime == tsStart
                    )
                    if (
                      clsAgentsCalender != null &&
                      clsAgentsCalender.IsFreeTime
                    ) {
                      tmpCalender = tmpCalender.find(
                        (a) => a.RevisitTime === tsStart
                      )
                      tmpCalender.push({
                        Address: item.RevisitAddress,
                        IsFreeTime: false,
                        RevisitTime: tsStart,
                        IsNeighborApartment:
                          item.IsNeighborApartment !== null
                            ? item.IsNeighborApartment
                            : false,
                        IsHourlyVacation: pHourlyVacationList.some(
                          (f) => tsStart >= f.FromTime && tsStart < f.ToTime
                        )
                      })
                    }
                  }
                  // tsStart = tsStart.Add(tsDuration);
                  // tmpIsValid = false;
                } else {
                  if (
                    // eslint-disable-next-line eqeqeq
                    tmpCalender.find((a) => a.RevisitTime == tsStart) == null
                  ) {
                    tmpCalender.push({
                      Address: "",
                      IsFreeTime: true,
                      RevisitTime: tsStart,
                      IsNeighborApartment: false,
                      IsHourlyVacation: pHourlyVacationList.some(
                        (f) => tsStart >= f.FromTime && tsStart < f.ToTime
                      )
                    })
                  }

                  // tmpIsValid = true;
                }
                // eslint-disable-next-line eqeqeq
              } else if (tFrom == tsStart) {
                // eslint-disable-next-line eqeqeq
                if (tmpCalender.find((a) => a.RevisitTime == tsStart) == null) {
                  tmpCalender.push({
                    Address: item.RevisitAddress,
                    IsFreeTime: false,
                    RevisitTime: tsStart,
                    IsNeighborApartment:
                      item.IsNeighborApartment !== null
                        ? item.IsNeighborApartment
                        : false,
                    IsHourlyVacation: pHourlyVacationList.some(
                      (f) => tsStart >= f.FromTime && tsStart < f.ToTime
                    )
                  })
                } else {
                  let clsAgentsCalender = tmpCalender.find(
                    // eslint-disable-next-line eqeqeq
                    (a) => a.RevisitTime == tsStart
                  )
                  if (
                    clsAgentsCalender != null &&
                    clsAgentsCalender.IsFreeTime
                  ) {
                    tmpCalender.Remove(
                      // eslint-disable-next-line eqeqeq
                      tmpCalender.find((a) => a.RevisitTime == tsStart)
                    )
                    tmpCalender.push({
                      Address: item.RevisitAddress,
                      IsFreeTime: false,
                      RevisitTime: tsStart,
                      IsNeighborApartment:
                        item.IsNeighborApartment !== null
                          ? item.IsNeighborApartment
                          : false,
                      IsHourlyVacation: pHourlyVacationList.some(
                        (f) => tsStart >= f.FromTime && tsStart < f.ToTime
                      )
                    })
                  }
                }
                // tsStart = tsStart.Add(tsDuration);
                // tmpIsValid = false;
              } else if (
                tFrom > tsStart &&
                tFrom < addToTime(tsStart, tsDuration)
              ) {
                // eslint-disable-next-line eqeqeq
                if (tmpCalender.find((a) => a.RevisitTime == tsStart) == null) {
                  tmpCalender.push({
                    Address: item.RevisitAddress,
                    IsFreeTime: false,
                    RevisitTime: tsStart,
                    IsNeighborApartment:
                      item.IsNeighborApartment !== null
                        ? item.IsNeighborApartment
                        : false,
                    IsHourlyVacation: pHourlyVacationList.some(
                      (f) => tsStart >= f.FromTime && tsStart < f.ToTime
                    )
                  })
                } else {
                  let clsAgentsCalender = tmpCalender.find(
                    // eslint-disable-next-line eqeqeq
                    (a) => a.RevisitTime == tsStart
                  )
                  if (
                    clsAgentsCalender != null &&
                    clsAgentsCalender.IsFreeTime
                  ) {
                    tmpCalender.Remove(
                      // eslint-disable-next-line eqeqeq
                      tmpCalender.find((a) => a.RevisitTime == tsStart)
                    )
                    tmpCalender.push({
                      Address: item.RevisitAddress,
                      IsFreeTime: false,
                      RevisitTime: tsStart,
                      IsNeighborApartment:
                        item.IsNeighborApartment !== null
                          ? item.IsNeighborApartment
                          : false,
                      IsHourlyVacation: pHourlyVacationList.some(
                        (f) => tsStart >= f.FromTime && tsStart < f.ToTime
                      )
                    })
                  }
                }
                // tsStart = tsStart.Add(tsDuration);
                // tmpIsValid = false;
              } else {
                // eslint-disable-next-line eqeqeq
                if (tmpCalender.find((a) => a.RevisitTime == tsStart) == null) {
                  tmpCalender.push({
                    Address: "",
                    IsFreeTime: true,
                    RevisitTime: tsStart,
                    IsNeighborApartment: false,
                    IsHourlyVacation: pHourlyVacationList.some(
                      (f) => tsStart >= f.FromTime && tsStart < f.ToTime
                    )
                  })
                }

                // tmpIsValid = true;
              }
            })
            // if (tmpIsValid)
            //    allFreeTimes.Add(lastTS.ToString());

            tsStart = addToTime(tsStart, tsDuration)
          }
        }

        this.gvFreeTimes = tmpCalender // allFreeTimes;
      } else {
        // BtnSelect.SetVisibility(System.Windows.Visibility.Collapsed)

        let tmpCalender = pRevisitInOneDay.map((item) => {
          return {
            Address: item.RevisitAddress,
            IsFreeTime: false,
            RevisitTime: item.RevisitTimeFrom,
            IsNeighborApartment:
              item.IsNeighborApartment != null
                ? item.IsNeighborApartment
                : false,
            IsHourlyVacation: pHourlyVacationList.some(
              (f) =>
                item.RevisitTimeFrom >= f.FromTime &&
                item.RevisitTimeFrom < f.ToTime
            )
          }
        })

        this.gvFreeTimes = tmpCalender
      }
    },

    handleRevisitTimeGridSelectedChanged (e) {
      const { RevisitTime } = e.dataItem || {}
      this.selectedRevisitTime = RevisitTime
    },

    filterFn (val, update) {
      this.filterText = val
      update()
    },

    async loadObj () {
      if (this.selectedRequest) {
        this.baseNosaziCode = convertStringToNosaziCodeObject(
          this.selectedRequest.BizCode
        )
      }

      this.loadAgents()
      if (!this.revisitDateFrom) {
        this.revisitDateFrom = new PersianDate().toLocale("en").format("L")
      }

      this.revisitDateTo = new PersianDate()
        .add("days", 14)
        .toLocale("en")
        .format("L")

      this.isLoaded = true
      if (this.selectedAgent) {
        this.loadRevisits()
      }
    },

    async loadAgents () {
      this.selectedAgent = null
      this.shRevisitAgentListFormAssign = {
        ...defaultModel
      }

      this.showLoading()

      let payload = {
        pDistrict: this.selectedDistrict
      }
      this.$services.ES.getActiveRevisitAgentList(payload)
        .then(async ({ data }) => {
          this.getShRevisitAgentListForAssignRes = this.getResponse(data)
          if (this.getShRevisitAgentListForAssignRes.success) {
            if (
              this.getShRevisitAgentListForAssignRes.data
                .GetActiveRevisitAgentListResult.ActiveRevisitAgentList
            ) {
              this.cmbRevisitAgent =
                this.getShRevisitAgentListForAssignRes.data.GetActiveRevisitAgentListResult.ActiveRevisitAgentList.map(
                  (x) => {
                    return {
                      ID: x.NidRevisitAgent,
                      Title: x.UserName
                    }
                  }
                ) ?? []

              if (this.filterText) {
                this.cmbRevisitAgent = this.cmbRevisitAgent.filter(
                  (v) =>
                    v.Title.toLowerCase().indexOf(
                      this.filterText.toLowerCase()
                    ) > -1
                )
              }
            }

            this.revisitAgentList =
              this.getShRevisitAgentListForAssignRes.data.Sh_ActiveRevisitAgentList

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedDistrict.toString(),
              bizCodeTitle: "منطقه انتخاب شده"
            })
          } else {
            return this.showError("لیست مامورین بازدید بارگذاری نشد")
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

    loadRevisits () {
      // if (this.isLoaded) {
      this.getRevisitAgentVacation()
      // }
    },

    async getRevisitAgentVacation () {
      // if (!this.revisitAgent?.NidRevisitAgent) return

      await this.getRevisitAgentAssignGroup()
    },
    async getRevisitAgentAssignGroup () {
      // if (!this?.revisitAgent?.NidRevisitAgent) return false
      this.showLoading()
      let payload = {
        pNidRevisitAgent: this.selectedAgent,
        pFromRevisitDate: this.revisitDateFrom,
        pToRevisitDate: this.revisitDateTo
      }
      this.$services.ES.getRevisitAgentAssignGroup(payload)
        .then(({ data }) => {
          this.getRevisitAgentAssignGroupRes = this.getResponse(data)

          if (this.getRevisitAgentAssignGroupRes.success) {
            let tmpMaxVisit =
              this.getRevisitAgentAssignGroupRes.data
                .GetRevisitAgentAssign_GroupResult.RevisitAgent.MaxVisit
            let tmpNidRevisitAgent =
              this.getRevisitAgentAssignGroupRes.data
                .GetRevisitAgentAssign_GroupResult.RevisitAgent.NidRevisitAgent

            if (
              this.getRevisitAgentAssignGroupRes.data
                .GetRevisitAgentAssign_GroupResult.RevisitAgent.length > 0
            ) {
              tmpMaxVisit =
                this.getRevisitAgentAssignGroupRes.data
                  .GetRevisitAgentAssign_GroupResult.RevisitAgent[0].MaxVisit
            }
            let tmpDates =
              this.getRevisitAgentAssignGroupRes.data.GetRevisitAgentAssign_GroupResult.RevisitAgentAssign_Group.map(
                (item) => item.RevisitDate
              )

            let tmpAllGroup =
              this.getRevisitAgentAssignGroupRes.data.GetRevisitAgentAssign_GroupResult.RevisitAgentAssign_Group.map(
                (item) => {
                  return {
                    ...item,
                    RevisitDay: item.CountInDay,
                    NidRevisitAgent: tmpNidRevisitAgent
                  }
                }
              )

            let tmpCur = {
              selectedDate: this.revisitDateFrom
            }
            // let tmpDates = 0
            // let tmpAllGroup = []
            if (tmpDates.length > 0) {
              while (
                new PersianDate([
                  parseInt(tmpCur.selectedDate.split("/")[0]),
                  parseInt(tmpCur.selectedDate.split("/")[1]),
                  parseInt(tmpCur.selectedDate.split("/")[2])
                ]).diff(
                  new PersianDate([
                    parseInt(this.revisitDateTo.split("/")[0]),
                    parseInt(this.revisitDateTo.split("/")[1]),
                    parseInt(this.revisitDateTo.split("/")[2])
                  ]),
                  "days"
                ) <= 0
              ) {
                if (!tmpDates.includes(tmpCur.selectedDate)) {
                  let tmpNew = {
                    CountInDay: 0,
                    RevisitDate: tmpCur.selectedDate,
                    MaxVisit: tmpMaxVisit,
                    NidRevisitAgent: tmpNidRevisitAgent
                  }
                  tmpAllGroup.push(tmpNew)
                }

                tmpCur.selectedDate = new PersianDate([
                  parseInt(tmpCur.selectedDate.split("/")[0]),
                  parseInt(tmpCur.selectedDate.split("/")[1]),
                  parseInt(tmpCur.selectedDate.split("/")[2])
                ])
                  .add("days", 1)
                  .toLocale("en")
                  .format("L")
              }
            } else {
              while (
                new PersianDate([
                  parseInt(tmpCur.selectedDate.split("/")[0]),
                  parseInt(tmpCur.selectedDate.split("/")[1]),
                  parseInt(tmpCur.selectedDate.split("/")[2])
                ]).diff(
                  new PersianDate([
                    parseInt(this.revisitDateTo.split("/")[0]),
                    parseInt(this.revisitDateTo.split("/")[1]),
                    parseInt(this.revisitDateTo.split("/")[2])
                  ]),
                  "days"
                ) <= 0
              ) {
                let tmpNew = {
                  CountInDay: 0,
                  RevisitDate: tmpCur.selectedDate,
                  MaxVisit: tmpMaxVisit,
                  NidRevisitAgent: tmpNidRevisitAgent
                }
                tmpAllGroup.push(tmpNew)

                tmpCur.selectedDate = new PersianDate([
                  parseInt(tmpCur.selectedDate.split("/")[0]),
                  parseInt(tmpCur.selectedDate.split("/")[1]),
                  parseInt(tmpCur.selectedDate.split("/")[2])
                ])
                  .add("days", 1)
                  .toLocale("en")
                  .format("L")
              }
            }

            tmpAllGroup.forEach((item) => {
              item.RevisitDay = "Day Of Week"
              item.AgentVacationList = this.revisitVacationList
            })

            this.revisitList = tmpAllGroup.sort((a, b) => {
              if (a.RevisitDate > b.RevisitDate) return 1
              if (a.RevisitDate < b.RevisitDate) return -1
              return 0
            })

            this.revisitList.map((x) => {
              this.revisitVacationList.forEach((item) => {
                if (
                  x.NidRevisitAgent === item.NidRevisitAgent &&
                  x.RevisitDate === item.VacationDate
                ) {
                  x.IsVacation = true
                }
              })
              return x
            })
            if (this.holidaysAndEventsList.length > 0) {
              this.revisitList.map((x) => {
                this.holidaysAndEventsList.forEach((item) => {
                  if (x.RevisitDate === item.HDate) {
                    x.isEvent = true
                  }
                })
                return x
              })
            }
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

    onDistrictChanged (District) {
      // console.log('district changed from AgentCalendar: ' + District)
      this.baseNosaziCode.District = District
    },

    getPersianDayOfWeek ({ DayOfWeek }) {
      switch (DayOfWeek) {
        case DayOfWeek.Saturday:
          return "شنبه"

        case DayOfWeek.Sunday:
          return "يکشنبه"

        case DayOfWeek.Monday:
          return "دوشنبه"

        case DayOfWeek.Tuesday:
          return "سه‏ شنبه"

        case DayOfWeek.Wednesday:
          return "چهارشنبه"

        case DayOfWeek.Thursday:
          return "پنجشنبه"

        case DayOfWeek.Friday:
          return "جمعه"

        default:
          return ""
      }
    }
  },
  beforeMount () {
    this.$root.$on("update:district", this.onDistrictChanged)
  },
  beforeDestroy () {
    this.$root.$off("update:district", this.onDistrictChanged)
  },

  async created () {
    await this.loadSettings()
    await this.getHolidaysAndEvents()
    await this.loadObj()
  },
  watch: {
    vacationDialogState: {
      handler (newValue, oldValue) {
        if (oldValue && !newValue) {
          this.loadRevisits()
          this.gvDetails = []
          this.gvFreeTimes = []
        }
      }
    }
    // revisitDateFrom () {
    //   if (
    //     this.revisitDateFrom !== new PersianDate().toLocale("en").format("L")
    //   ) {
    //     const revisitDateFromArray = this.revisitDateFrom.split("/")
    //     let yearFrom = parseInt(revisitDateFromArray[0])
    //     let monthFrom = parseInt(revisitDateFromArray[1])
    //     let dayFrom = parseInt(revisitDateFromArray[2])
    //     let dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom])
    //     this.revisitDateTo = dateFrom.add("days", 21).toLocale("en").format("L")
    //   }
    // }
  }
}
</script>
