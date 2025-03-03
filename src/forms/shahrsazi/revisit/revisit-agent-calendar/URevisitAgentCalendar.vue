<!-- eslint-disable eqeqeq -->
<template>
  <safa-form
    :id="formKey"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    caption="شهرسازی- تقویم مامور بازدید"
  >
    <form-wrapper :title="title" vertical>
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
            v-model="currentBaseNosaziCode.District"
            cdcName="District"
            :options="districts"
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
        <div class="col-1 col-sm-auto">
          <btn-default label="..." @click="isShowModal = true"/>
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

        <btn-default
          ref="btnVacation"
          :disabled="btnVacationDisabled"
          label="مرخصی"
          spCaption="مرخصی مامور بازدید"
          spId="8bc361b0-cffd-49de-b958-2c63fef96eb5"
          @click="btnVacationClick"
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
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              fit
              height="100%"
              helper="revisitVacation"
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
                  <safa-datatable2
                    ref="revisitVacationInOneDay"
                    v-model="gvDetails"
                    cdcName="gvDetails"
                    :allow-multiple-selection="false"
                    :show-row-number="false"
                    :title="revisitVacationInOneDayTitle"
                    :addRow="false"
                    :deleteRow="false"
                    :allowCopy="false"
                    fit
                    height="100%"
                    helper="revisitVacationInOneDay"
                    m="r"
                    max-height="100%"
                    min-height="170px"
                  />  <!-- تاریخ قابل ویرایش نیست -->
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
                    :addRow="false"
                    :deleteRow="false"
                    :allowCopy="false"
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
      <!-- <template v-slot:footer>
        <form-actions
          @edit="isEditable = true"
          :m="mode"
          @save="saveData"
          @cancel="cancel"
        />
      </template> -->

      <safa-popup
        v-model="vacationDialogState"
        :padding="false"
        height="600px"
        title="تعطیلات مامور بازدید"
        vertical
        width="800px"
      >
        <URevisitAgentVacation
          :config="config"
          :revisit-agent="revisitAgent"
          :revisitAgentAssignInOneDay="revisitAgentAssignInOneDay"
          :revisitList="revisitList"
        />
      </safa-popup>
      <safa-popup
        v-model="isShowModal"
        height="600px"
        title="لیست مامورین بازدید"
        vertical
        width="800px"
      >
        <URevisitAgentList
          ref="agentList"
          :agentArray="revisitAgentList"
          @selectRow="rowSelect"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import URevisitAgentVacation from "./partials/URevisitAgentVacation"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"
import URevisitAgentList from "./partials/URevisitAgentList"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
// convertNosaziCodeObjectToString
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
  mixins: [baseFormMixin],
  components: {
    URevisitAgentList,
    URevisitAgentVacation
  },

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
      isShowModal: false,
      title: "تقویم مامور بازدید",
      formKey: "5d5fc0bc-9a30-49c2-9cfb-e8a923840296",
      name: "URevisitAgentCalendar",
      main: true,
      sidebarCompatible: true,
      vacationDialogState: false,
      selectedRevisitDate: null,
      selectedRevisitTime: null,
      selectedAgent: null,
      // selected_District:1,
      revisitDateFrom: "", // e.g. 1398/12/19
      revisitDateTo: "",
      splitterModel: 75,
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
      currentBaseNosaziCode: {
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

      cmbRevisitAgent: [],
      revisitAgentList: [],
      gvDetails: [],
      gvFreeTimes: [],
      revisitVacationList: [],
      revisitVacationListForSpeceficDate: [],
      selectedFreeDate: "",
      revisitVacationInOneDayTitle: "زمانبندی بازدیدها",

      // Modes
      btnVacationDisabled: true
    }
  },

  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    config () {
      return { config: { District: this.currentBaseNosaziCode.District } }
    },
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
      if (this.selectedAgent === null) {
        this.btnVacationDisabled = true
        return false
      }
      this.btnVacationDisabled = false
      this.loadRevisits()
      this.gvDetails = []
      this.gvFreeTimes = []
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
      this.isShowModal = false
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
          pNidRevisitAgent: this.revisitAgent.NidRevisitAgent,
          pRevisitDate: tmpContext.RevisitDate,
          pNidNosaziCode_Parent: "00000000-0000-0000-0000-000000000000"
        }
        this.$services.SC.getRevisitAgentAssignInOneDay(payload, this.config)
          .then(({ data }) => {
            this.getRevisitAgentAssignInOneDayRes = this.getResponse(data)
            if (this.getRevisitAgentAssignInOneDayRes.success) {
              let tmpDetails =
                this.getRevisitAgentAssignInOneDayRes.data.RevisitAgentAssign_InOneDay.sort(
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
        this.currentBaseNosaziCode = convertStringToNosaziCodeObject(
          this.selectedRequest.BizCode
        )
      }

      this.loadAgents()
      if (!this.revisitDateFrom) {
        this.revisitDateFrom = new PersianDate().toLocale("en").format("L")
      }

      this.revisitDateTo = new PersianDate()
        .add("days", 21)
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

      let tmpNidProc = "00000000-0000-0000-0000-000000000000"

      let tmpWorkflow = {
        StateName: "",
        WorkflowGuid: "00000000-0000-0000-0000-000000000000"
      }

      let payload = {
        pJobLocation: this.currentBaseNosaziCode.District,
        pNidProc: tmpNidProc,
        pUser: this.currentUser,
        pDtoWorkflowData: tmpWorkflow,
        pIsLoadFromMenu: this.isSelectFromMenu
      }
      this.$services.SC.getShRevisitAgentListForAssign(payload, this.config)
        .then(async ({ data }) => {
          this.getShRevisitAgentListForAssignRes = this.getResponse(data)
          if (this.getShRevisitAgentListForAssignRes.success) {
            if (
              this.getShRevisitAgentListForAssignRes.data
                .Sh_ActiveRevisitAgentList &&
              this.getShRevisitAgentListForAssignRes.data
                .Sh_ActiveRevisitAgentList.length > 0
            ) {
              this.cmbRevisitAgent =
                this.getShRevisitAgentListForAssignRes.data.Sh_ActiveRevisitAgentList.map(
                  (x) => {
                    return {
                      ...x,
                      Id: x.NidRevisitAgent,
                      Title: `${x.Name} ${x.LastName} ${
                        x.Phone && ` - [ ${x.Phone} ]`
                      }`,
                      DeviceCode: x.DeviceCode
                    }
                  }
                )

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
      if (this.isLoaded) {
        this.getRevisitAgentVacation()
      }
    },

    async getRevisitAgentVacation () {
      if (!this.revisitAgent?.NidRevisitAgent) return

      this.showLoading()
      let payload = {
        pNidRevisitAgent: this.revisitAgent.NidRevisitAgent
      }
      this.$services.SC.getRevisitAgentVacation(payload, this.config).then(async ({ data }) => {
        this.getRevisitAgentVacationRes = this.getResponse(data)
        if (!this.getRevisitAgentVacationRes.success) {
          return this.showError("لیست تعطیلات کارشناس بازدید بارگذاری نشد")
        }

        this.revisitVacationList =
          this.getRevisitAgentVacationRes.data.Sh_RevisitAgentVacation

        if (
          this.revisitAgent.NidRevisitAgent !== null &&
          this.revisitDateFrom &&
          this.revisitDateTo
        ) {
          await this.getRevisitAgentAssignGroup()
        }
        // let nosaziCodeStr = convertNosaziCodeObjectToString(this.currentBaseNosaziCode)
        await this.log({
          action: this.logActions.view,
          bizCode: this.revisitAgent.NidRevisitAgent,
          bizCodeTitle: "NidRevisitAgent",
          // nosaziCode: nosaziCodeStr === "1-0-0-0-0-0-0" ? ' ' : nosaziCodeStr,
          saveDesc: `بارگذاری لیست تعطیلات کارشناس بازدید ${this.revisitAgent?.UserName ?? ''} انجام گردید.`
        })
      })
    },
    async getRevisitAgentAssignGroup () {
      if (!this?.revisitAgent?.NidRevisitAgent) return false

      this.showLoading()
      let payload = {
        pNidRevisitAgent: this.revisitAgent.NidRevisitAgent,
        pFromRevisitDate: this.revisitDateFrom,
        pToRevisitDate: this.revisitDateTo
      }
      this.$services.SC.getRevisitAgentAssignGroup(payload, this.config)
        .then(({ data }) => {
          this.getRevisitAgentAssignGroupRes = this.getResponse(data)

          if (this.getRevisitAgentAssignGroupRes.success) {
            let tmpMaxVisit =
              this.getRevisitAgentAssignGroupRes.data.Sh_RevisitAgent.MaxVisit
            let tmpNidRevisitAgent =
              this.getRevisitAgentAssignGroupRes.data.Sh_RevisitAgent
                .NidRevisitAgent

            if (
              this.getRevisitAgentAssignGroupRes.data.RevisitAgentAssign_Group
                .length > 0
            ) {
              tmpMaxVisit =
                this.getRevisitAgentAssignGroupRes.data
                  .RevisitAgentAssign_Group[0].MaxVisit
            }
            let tmpDates =
              this.getRevisitAgentAssignGroupRes.data.RevisitAgentAssign_Group.map(
                (item) => item.RevisitDate
              )

            let tmpAllGroup =
              this.getRevisitAgentAssignGroupRes.data.RevisitAgentAssign_Group.map(
                (item) => {
                  return {
                    ...item,
                    NidRevisitAgent: tmpNidRevisitAgent
                  }
                }
              )

            let tmpCur = {
              selectedDate: this.revisitDateFrom
            }

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
                  x.RevisitDate === item.VacationDate &&
                  item.IsDeleted === false
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
      this.currentBaseNosaziCode.District = District
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
