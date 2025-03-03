<template>
  <safa-form :id="formKey" :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
    <safa-status :result="result" />

    <fit>
      <div class="fit">
        <fit>
          <div class="q-pa-sm">
            <div class="row q-col-gutter-sm">
              <safa-combo
                v-if="!selection"
                v-model="selectedDist"
                cdcName="selectedDist"
                :options="districts"
                :use-input="false"
                class="col-md-3 col-sm-4 col-xs-12"
                label="منطقه"
                label-width="70px"
                source-type="local"
                @input="load"
              />
              <!-- <safa-combo
                  class="col-sm-4 col-12"
                  use-input
                  label="11111نام مامور بازدید"
                  source-type="local"
                  :options="revisitAgentList"
                  v-model="selectedRevisitAgent"
                  cdcName="selectedRevisitAgent"
                  @filter="filterFn"
              />-->
              <safa-combo
                ref="revisitAgentRef"
                v-model="selectedRevisitAgent"
                cdcName="selectedRevisitAgent"
                :options="revisitAgentList"
                behavior="dialog"
                class="col-md-3 col-sm-4 col-xs-12"
                input-debounce="0"
                label="مامور بازدید"
                source-type="local"
                use-input
                @filter="filterFn"
                @input="loadVacation"
              />
              <div>
                <btn-default
                  class="col-auto"
                  label="..."
                  @click="isShowModal = true"
                />
              </div>
              <safa-datepicker
                v-model="revisitDateFrom"
                cdcName="revisitDateFrom"
                class="col-md-3 col-sm-4 col-xs-12"
                label="از تاریخ"
                label-width="70px"
                @input="loadVacation"
              />
              <safa-datepicker
                v-model="revisitDateTo"
                cdcName="revisitDateTo"
                class="col-md-3 col-sm-4 col-xs-12"
                label="تا تاریخ"
                label-width="70px"
                @input="loadVacation"
              />
            </div>
          </div>

          <safa-splitter v-model="horizaontalSplitter" class="fit" horizontal>
            <template v-slot:before>
              <fit>
                <safa-datatable2
                  v-model="revisitList"
                  cdcName="revisitList"
                  :defaultNewRow="defaultRevisitList"
                  fit
                  :selectable="false"
                  :actions="[]"
                  :allowMultipleSelection="false"
                  height="100%"
                  helper="newRevisitVacation"
                  minHeight="150px"
                  title="لیست بازدیدها"
                >
                  <!-- @selectedChange="handleRevisitGridSelectedChanged" -->
                <template
                  #cell-IsSelected="{ row, col, onChangeCellValue }"
                        >
                          <safa-checkbox
                            :value="row[col.field]"
                            @input="
                              handleRevisitGridSelectedChanged(
                                row,
                                col,
                                onChangeCellValue,
                                $event
                              )
                            "
                            :m="row.m"
                          />
                        </template>
                </safa-datatable2>
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-splitter
                  v-model="verticalSplitter"
                  class="fit"
                  margin="0"
                  vertical
                >
                  <template v-slot:before>
                    <fit>
                      <safa-datatable
                        v-model="
                          revisitAgentAssignInOneDay.RevisitAgentAssign_InOneDay
                        "
                        cdcName="RevisitAgentAssign_InOneDay"
                        :hideHeader="true"
                        fit
                        height="100%"
                        helper="revisitVacationInOneDay"
                        minHeight="150px"
                        title="زمانبندی بازدیدها "
                      />
                    </fit>
                  </template>
                  <template v-slot:after>
                    <fit>
                      <!-- :hideHeader="true"
                        :selectable="true" -->
                      <!-- helper="revisitVacationTimesInOneDay" -->
                      <safa-datatable2
                        :defaultNewRow="defaultRevisitNewRow"
                        v-model="revisitAddressesArray"
                        cdcName="revisitAddressesArray"
                        fit
                        :selectable="false"
                        :columns="revisitVacationTimesInOneDay"
                        height="100%"
                        minHeight="150px"
                        title="زمانبندی بازدیدها"
                        :actions="[]"
                        :allowMultipleSelection="false"
                      > <!-- تاریخ ندارد  -->
                        <template
                          #cell-IsSelected="{ row, col, onChangeCellValue }"
                        >
                          <safa-checkbox
                            :value="row[col.field]"
                            @input="
                              handleRevisitTimeGridSelectedChanged(
                                row,
                                col,
                                onChangeCellValue,
                                $event
                              )
                            "
                            :m="row.m"
                          />
                        </template>
                      </safa-datatable2>
                      <div
                        v-if="showEmptyRevisitAddressesAlert"
                        class="q-mt-sm"
                      >
                        <SafaNotice
                          message="برای نمایش زمانبندی بازدیدها ابتدا بازه زمانی را در فرم تنظیمات شهرسازی تعیین و ذخیره نمایید."
                        />
                      </div>
                    </fit>
                  </template>
                </safa-splitter>
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </div>
      <div class="row q-gutter-sm q-pa-sm">
        <btn-default
          :disable="!revisitAgent"
          label="مرخصی"
          spCaption="مرخصی مامور بازدید"
          spId="8bc361b0-cffd-49de-b958-2c63fef96eb5"
          @click="vacationDialogState = true"
        />
        <btn-default
          v-if="selection"
          label="انتخاب"
          @click="handleCalendarSelection"
        />
        <btn-cancel
          v-if="selection"
          v-close-popup
          label="انصراف"
          @click="closePopup"
        />
        <btn-default label="بازآوری تنظیمات" @click="loadFormSetting" />
      </div>
    </fit>

    <!-- Vacation -->
    <safa-popup v-model="vacationDialogState" vertical>
      <URevisitAgentVacation
        :district="selectedDist"
        :revisit-agent="revisitAgent"
        @reloadAgentCalender="reloadAgentCalender"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
    </safa-popup>
    <safa-popup v-model="isShowModal" title="تعطیلات مامورین بازدید" width="400px" height="500px">
      <URevisitAgentList
        ref="agentList"
        :agentArray="shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList"
        @selectRow="rowSelect"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import shRevisitAgentListFormAssignRequestModel from "./models/shRevisitAgentListFormAssignRequest"
// import { compare } from 'src/utils/dateTimeOperations'
import URevisitAgentVacation from "./partials/URevisitAgentVacation"
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"
import URevisitAgentList from "./partials/URevisitAgentList"
import { generateTimeSeries } from "../../../../../utils/timeHelper"

export default {
  mixins: [baseFormMixin],
  components: {
    URevisitAgentVacation,
    URevisitAgentList
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
      vacationDialogState: false,
      selectedRevisitDate: null,
      selectedRevisitTime: null,
      selectedRevisitAgent: null,
      selectedDist: 1,
      revisitDateFrom: "", // e.g. 1398/12/19
      revisitDateTo: "",
      filterText: "",
      defaultRevisitNewRow: () => ({
        IsSelected: false
      }),
      defaultRevisitList: () => ({
        IsSelected: false
      }),
      revisitVacationTimesInOneDay: [
        {
          field: "IsSelected",
          title: "انتخاب",
          width: "100px",
          editor: "checkbox"
        },
        {
          field: "RevisitTime",
          title: "ساعت بازدید",
          width: "111px",
          editable: false
        },
        {
          field: "Address",
          title: "آدرس محل بازدید",
          width: "100px",
          editable: false
        }
      ],
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
      shRevisitAgentListFormAssign: {
        ...shRevisitAgentListFormAssignRequestModel
      },
      shRevisitAgentVacation: { Sh_RevisitAgentVacation: [] },
      revisitAgentAssignGroup: {},
      revisitAgentAssignInOneDay: {
        ...shRevisitAgentListFormAssignRequestModel
      },
      result: null,
      revisitList: [],
      horizaontalSplitter: 50,
      verticalSplitter: 70,
      revisitAddressesArray: [],
      holidaysAndEventsList: [],
      selectedRow: null,
      showEmptyRevisitAddressesAlert: false
    }
  },

  computed: {
    IsMashhadConfigSet () {
      return (
        // eslint-disable-next-line no-undef
        window.getConfigValue("IsMashhad") ||
        (this.getApplicationParam.hasOwnProperty("IsMashhad") &&
          this.getApplicationParam.IsMashhad)
      )
    },
    config () {
      return {
        config: {
          District: this.selectedDist
        }
      }
    },
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    revisitAgentList () {
      if (
        !this.shRevisitAgentListFormAssign ||
        !this.shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList ||
        !this.shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList.length
      ) {
        return null
      }
      const list =
        this.shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList.map((x) => {
          return {
            ...x,
            Id: x.NidRevisitAgent,
            // Title: x.UserName + ' [' + (x.Phone || '') + ']',
            Title: x.Name + " " + x.LastName + " [" + (x.Phone || "") + "]", // 3017
            DeviceCode: x.DeviceCode
          }
        })
      if (this.filterText) {
        return list.filter(
          (v) =>
            v.Title.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1
        )
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties

      if (!this.IsMashhadConfigSet) {
        return list.filter((x) => parseInt(x.JobLocation) === this.selectedDist)
      } else {
        return list
      }
    },
    revisitAgent () {
      if (
        !this.shRevisitAgentListFormAssign ||
        !this.shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList ||
        !this.shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList.length
      ) {
        return null
      }
      return this.shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList.filter(
        ({ NidRevisitAgent }) =>
          NidRevisitAgent &&
          this.selectedRevisitAgent &&
          NidRevisitAgent.toString().toLowerCase() ===
            this.selectedRevisitAgent.toLowerCase()
      )[0]
    },
    ShahrsaziSettings () {
      return this.BuildingSettings && this.BuildingSettings.ShahrsaziSettings
    }
  },

  methods: {
    closePopup () {
      this.$emit("closePopup", false)
    },
    revisitAddresses () {
      this.revisitAddressesArray = []
      const revisitsInOneDay =
        this.revisitAgentAssignInOneDay.RevisitAgentAssign_InOneDay || []
      let fromTime = "08:00"
      let toTime = "22:00"
      let timeDuration = 30
      if (this.ShahrsaziSettings) {
        fromTime = this.ShahrsaziSettings.RevisitTimeFrom
        toTime = this.ShahrsaziSettings.RevisitTimeTo
        timeDuration = parseInt(this.ShahrsaziSettings.RevisitDuration)
      }

      try {
        this.revisitAddressesArray = generateTimeSeries(
          fromTime,
          toTime,
          timeDuration
        ).map((x) => ({
          RevisitTime: x,
          Address: "",
          IsSelected: false
        }))
      } catch (ex) {
        this.revisitAddressesArray = generateTimeSeries(
          "08:00",
          "22:00",
          30
        ).map((x) => ({
          RevisitTime: x,
          Address: "",
          IsSelected: false
        }))
      }
      if (revisitsInOneDay.length > 0) {
        revisitsInOneDay.forEach((x) => {
          this.revisitAddressesArray.map((y) => {
            if (
              x.RevisitTimeFrom === y.RevisitTime ||
              x.RevisitTimeFrom === y.RevisitTime.concat(":00")
            ) {
              y.IsSelected = true
              y.m = "r"
            }

            return y
          })
          return this.revisitAddressesArray
        })
      }

      return this.revisitAddressesArray
    },
    async loadFormSetting () {
      try {
        this.BuildingSettings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "BuildingSettings",
            defaultValue: this.BuildingSettings,
            nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
          }
        )
        this.revisitAddresses()
      } catch (e) {
        this.showError("خطا در دریافت تنظیمات شهرسازی.")
      }
    },

    getTime (time) {
      if (!time || time.trim() === "") return
      let hourToMilSec = time.split(":")[0] * 3600000
      let minToMilSec = time.slice(0, 5).split(":")[1] * 60000
      const timeMilSec = hourToMilSec + minToMilSec - 12600000
      let t = new Date(timeMilSec)
      let h = t.getHours()
      let m = t.getMinutes()
      let s = t.getSeconds()
      h = h < 10 ? "0" + h : h
      m = m < 10 ? "0" + m : m
      s = s < 10 ? "0" + s : s
      return h.toString() + ":" + m.toString() + ":" + s.toString()
    },
    timeToNumber (time) {
      if (!time || time.trim() === "") return
      const t = time.replace(":", "")
      return parseInt(t.replace(":", ""))
    },

    formatTime (time, duration) {
      debugger
      let hourToMilSec = time.split(":")[0] * 3600000
      let minToMilSec = time.slice(0, 5).split(":")[1] * 60000
      // let hourDurationToMilSec = (duration.split(":")[0]*3600000)
      // let minDurationToMilSec = (duration.slice(0,5).split(":")[1]*60000)
      // const timeMilSec = (hourToMilSec + minToMilSec + hourDurationToMilSec + minDurationToMilSec) - 12600000
      const timeMilSec =
        hourToMilSec + minToMilSec + duration * 60000 - 12600000
      let t = new Date(timeMilSec)
      let h = t.getHours()
      let m = t.getMinutes()
      let s = t.getSeconds()
      h = h < 10 ? "0" + h : h
      m = m < 10 ? "0" + m : m
      s = s < 10 ? "0" + s : s
      return h.toString() + ":" + m.toString() + ":" + s.toString()
    },

    currentTime () {
      let today = new Date()
      let h = today.getHours()
      let m = today.getMinutes()
      let s = today.getSeconds()
      h = h < 10 ? "0" + h : h
      m = m < 10 ? "0" + m : m
      s = s < 10 ? "0" + s : s
      let time = h.toString() + m.toString() + s.toString()
      return parseInt(time)
    },
    getToday () {
      PersianDate.toCalendar("persian")
      return new PersianDate().toLocale("en").format("L")
    },
    async reloadAgentCalender () {
      await this.loadVacation()
      this.vacationDialogState = false
    },
    getRevisitList () {
      let list = []
      if (
        !this.revisitAgentAssignGroup ||
        !this.revisitAgentAssignGroup["Sh_RevisitAgent"]
      ) {
        return list
      }
      const nidRevisitAgent =
        this.revisitAgentAssignGroup["Sh_RevisitAgent"]["NidRevisitAgent"] // number
      const maxVisit =
        this.revisitAgentAssignGroup["Sh_RevisitAgent"]["MaxVisit"] // number
      const revisitGroups =
        this.revisitAgentAssignGroup.RevisitAgentAssign_Group || []
      // const tmpDates = this.revisitAgentAssignGroup.RevisitAgentAssign_Group.map(x => x.RevisitDate)
      const revisitDateFromArray = this.revisitDateFrom.split("/")
      let yearFrom = parseInt(revisitDateFromArray[0])
      let monthFrom = parseInt(revisitDateFromArray[1])
      let dayFrom = parseInt(revisitDateFromArray[2])
      const revisitDateToArray = this.revisitDateTo.split("/")
      let yearTo = parseInt(revisitDateToArray[0])
      let monthTo = parseInt(revisitDateToArray[1])
      let dayTo = parseInt(revisitDateToArray[2])
      let dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom])
      let dateTo = new PersianDate([yearTo, monthTo, dayTo])
      let diffCount = Math.abs(dateTo.diff(dateFrom, "days"))

      for (var i = 0; i <= diffCount; i++) {
        let groupOfDay = []
        revisitGroups.forEach((x) => {
          let revisitDateArray = new PersianDate(x.RevisitDate.split("/"))
          let year = parseInt(revisitDateArray[0])
          let month = parseInt(revisitDateArray[1])
          let day = parseInt(revisitDateArray[2])
          let revisitDate = new PersianDate([year, month, day])
          if (dateFrom.diff(revisitDate, "days") === 0) {
            groupOfDay.push(x)
          }
        })

        dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom + i])

        list.push({
          RevisitDate: dateFrom.toLocale("en").format("L"),
          RevisitDay: "Day Of Week",
          CountInDay: 0,
          MaxVisit: maxVisit,
          NidRevisitAgent: nidRevisitAgent
        })

        for (let i = 0; i < list.length; i++) {
          if (revisitGroups.length > 0 && revisitGroups[0].CountInDay) {
            if (list[i].RevisitDate === revisitGroups[0].RevisitDate) {
              list[i].CountInDay = revisitGroups[0].CountInDay
            }
          }
        }

        // let groupOfDayItem = groupOfDay[0]
        // if (groupOfDayItem) {
        //   list.push({
        //     RevisitDate: dateFrom.toLocale('en').format('L'),
        //     RevisitDay: 'Day Of Week',
        //     CountInDay: groupOfDayItem.CountInDay,
        //     MaxVisit: maxVisit,
        //     NidRevisitAgent: nidRevisitAgent
        //   })
        // } else {
        //   list.push({
        //     RevisitDate: dateFrom.toLocale('en').format('L'),
        //     RevisitDay: 'Day Of Week',
        //     CountInDay: 0,
        //     MaxVisit: maxVisit,
        //     NidRevisitAgent: nidRevisitAgent
        //   })
        // }
        // dateFrom = dateFrom.add('days', 1)
      }
      this.revisitList = list.map(x => { return {
        ...x,
        IsSelected: false
      } })
      this.revisitList = this.revisitList.map((x) => {
        this.shRevisitAgentVacation.Sh_RevisitAgentVacation.forEach((item) => {
          if (
            x.NidRevisitAgent === item.NidRevisitAgent &&
            x.RevisitDate === item.VacationDate
          ) {
            x.IsVacation = true
            x.IsWholeDay = item.IsWholeDay || null
            x.FromTime = item.FromTime || null
            x.ToTime = item.ToTime || null
          }
        })
        return x
      })
      if (this.holidaysAndEventsList.length > 0) {
        this.revisitList = this.revisitList.map((x) => {
          this.holidaysAndEventsList.forEach((item) => {
            if (x.RevisitDate === item.HDate) {
              x.isEvent = true
            }
          })
          return x
        })
      }
    },
    rowSelect (e) {
      this.isShowModal = false
      this.shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList.forEach(
        (x) => {
          if (x.LastName === e.LastName && x.Name === e.Name) {
            this.selectedRevisitAgent = x.NidRevisitAgent
          }
        }
      )
    },
    isHoliday (date) {
      const normalizeDate = date.split("/").map((x) => Number(x))

      const result = new PersianDate(normalizeDate).format("dddd") === "جمعه"

      return result
    },
    async handleRevisitGridSelectedChanged (row, col, onChangeCellValue, $event) {
      let oldSelectedObj =
        this.revisitList.find((x) => x.IsSelected) || null
      if (oldSelectedObj) {
        onChangeCellValue({
          field: col.field,
          dataItem: oldSelectedObj,
          value: false
        })
      }
      onChangeCellValue({ field: col.field, dataItem: row, value: $event })
      this.revisitAddressesArray = []
      if (row.isEvent) {
        this.showError(
          "لطفا تاریخ مورد نظر را از بین روزهای کاری مامور انتخاب نمایید."
        )
        return
      } else if (row.IsVacation && row.IsWholeDay) {
        this.showError("مأمور بازدید در این تاریخ مرخصی می باشد")
        return
      } else if (
        row.IsVacation &&
        row.FromTime &&
        row.ToTime
      ) {
        this.showError(
          `${" مأمور بازدید از ساعت "}` +
            `${row.FromTime}` +
            `${" تا "}` +
            `${row.ToTime}` +
            `${"مرخصی می باشد.لطفا در انتخاب ساعت بازدید دقت نمایید."}`
        )
      }
      const { RevisitDate } = row || {}
      this.selectedRow = row
      this.selectedRevisitDate = RevisitDate
      this.selectedRevisitTime = null
      await this.loadAssignInOneDay()
      this.revisitAddresses()
    },
    handleRevisitTimeGridSelectedChanged (row, col, onChangeCellValue, $event) {
      let oldSelectedObj =
        this.revisitAddressesArray.find((x) => x.IsSelected) || null
      if (oldSelectedObj) {
        onChangeCellValue({
          field: col.field,
          dataItem: oldSelectedObj,
          value: false
        })
      }
      onChangeCellValue({ field: col.field, dataItem: row, value: $event })
      const { RevisitTime } = row || {}
      if (
        RevisitTime > this.selectedRow?.FromTime &&
        RevisitTime < this.selectedRow?.ToTime
      ) {
        this.showError("مأمور بازدید در این ساعت مرخصی می باشد.")
        return
      }
      this.selectedRevisitTime = RevisitTime
    },
    handleCalendarSelection () {
      if (!this.revisitAgent) {
        return this.showError("مامور بازدید انتخاب نشده است")
      }
      if (!this.selectedRevisitDate) {
        return this.showError("تاریخ بازدید انتخاب نشده است")
      }
      let checkTimeFillConfig = window.getConfigValue("RevisitAgent.disableTimeCheckForSelection", false)
      if (!this.selectedRevisitTime && !checkTimeFillConfig) { //  https://trello.com/c/DtSpSwkv  به درخواست مشهد این ولیدیشن برداشته میشه و طبق مشورتی که داشتم شهر های دیگه به مشکل نمیخورند اما چنان چه تسک زده شد باید کانفیگی بشه
        return this.showError("ساعت بازدید انتخاب نشده است")
      }
      if (
        this.revisitAgentAssignInOneDay?.RevisitAgentAssign_InOneDay?.length > 0
      ) {
        let sameTime =
          this.revisitAgentAssignInOneDay.RevisitAgentAssign_InOneDay.some(
            (x) =>
              x.RevisitTimeFrom.substring(5, ":") === this.selectedRevisitTime
          )
        if (sameTime) {
          return this.showError("ساعت بازدید انتخاب شده تکراری می باشد.")
        }
      }
      this.$emit("input", {
        agent: this.revisitAgent,
        date: this.selectedRevisitDate,
        time: this.selectedRevisitTime
      })
    },
    filterFn (val, update) {
      this.filterText = val
      update()
    },
    // Log what to do
    async load () {
      if (this.selection) {
        // Selection mode
        this.selectedDist = this.district
      }
      // this.selectedRevisitAgent = null;
      this.shRevisitAgentListFormAssign = {
        ...shRevisitAgentListFormAssignRequestModel
      }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getShRevisitAgentListForAssign(
          {
            pJobLocation: this.selectedDist,
            pNidProc: this.selectedRequest.NidProc || "00000000-0000-0000-0000-000000000000",
            pUser: this.currentUser,
            pIsLoadFromMenu: this.isSelectFromMenu
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success === true) {
          this.shRevisitAgentListFormAssign = this.result.data

          if (this.selectedRevisitAgent !== null) {
            await this.loadVacation()
          }
        } else {
          return this.showError("لیست مامورین بازدید بارگذاری نشد")
        }

        // end
      } catch (e) {
        console.error("load error", e)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.hideLoading()
      }
    },
    async loadVacation () {
      this.$nextTick(async () => {
        if (this.selectedRevisitAgent === null) {
          return
        }
        const o = this.$refs.revisitAgentRef.selectedItem
        this.$emit("revisitAgentActivity", o.IsActive)
        this.shRevisitAgentVacation = {}
        try {
          this.showLoading()
          const { data } = await this.$services.SC.getRevisitAgentVacation(
            { pNidRevisitAgent: o.NidRevisitAgent },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success !== true) {
            return this.showError("لیست تعطیلات کارشناس بازدید بارگذاری نشد")
          }
          this.shRevisitAgentVacation = this.result.data
          await this.loadAssignGroup()
          await this.log({
            action: this.logActions.view,
            bizCode: this.revisitAgent.NidRevisitAgent,
            bizCodeTitle: "NidRevisitAgent",
            saveDesc: `بارگذاری لیست تعطیلات کارشناس بازدید ${o?.UserName ?? ''} انجام گردید.`
          })
          // end
        } catch (e) {
          console.error(e)
          this.showError("خطایی در سرویس رخ دارد")
        } finally {
          this.hideLoading()
        }
      })
    },
    async loadAssignGroup () {
      if (this.selectedRevisitAgent === null) {
        return
      }
      const revisitDateFromArray = this.revisitDateFrom.split("/")
      let yearFrom = parseInt(revisitDateFromArray[0])
      let monthFrom = parseInt(revisitDateFromArray[1])
      let dayFrom = parseInt(revisitDateFromArray[2])
      const revisitDateToArray = this.revisitDateTo.split("/")
      let yearTo = parseInt(revisitDateToArray[0])
      let monthTo = parseInt(revisitDateToArray[1])
      let dayTo = parseInt(revisitDateToArray[2])

      let dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom])
      let dateTo = new PersianDate([yearTo, monthTo, dayTo])
      let diffCount = Math.abs(dateTo.diff(dateFrom, "days"))
      if (diffCount < 0) {
        this.showError("بازه تاریخی بدرستی تعیین نشده است")
        return
      }
      this.revisitAgentAssignGroup = {}
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getRevisitAgentAssignGroup(
          {
            pNidRevisitAgent:
              this.$refs.revisitAgentRef.selectedItem.NidRevisitAgent,
            pFromRevisitDate: this.revisitDateFrom,
            pToRevisitDate: this.revisitDateTo
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError("لیست تعطیلات کارشناس بازدید بارگذاری نشد")
        }
        this.revisitAgentAssignGroup = this.result.data
        this.getRevisitList()

        // end
      } catch (e) {
        console.error(e)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.hideLoading()
      }
    },
    async loadAssignInOneDay () {
      this.revisitAgentAssignInOneDay = {
        ...shRevisitAgentListFormAssignRequestModel
      }
      if (!this.selectedRevisitDate || this.selectedRevisitAgent === null) {
        return
      }

      try {
        this.showLoading()
        const { data } = await this.$services.SC.getRevisitAgentAssignInOneDay(
          {
            pNidRevisitAgent:
              this.$refs.revisitAgentRef.selectedItem.NidRevisitAgent,
            pRevisitDate: this.selectedRevisitDate
          },
          this.config
        )
        this.result = this.getResponse(data)

        if (this.result.success !== true) {
          return this.showError("لیست بازدیدهای در یک روز، بارگذاری نشد")
        }
        this.revisitAgentAssignInOneDay = this.result.data

        // end
      } catch (e) {
        console.error(e)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.hideLoading()
      }
    },
    async getHolidaysAndEvents () {
      try {
        this.showLoading()
        const { data } = await this.$srvWorkflow.getHolidaysAndEvents()
        this.holidaysResult = this.getResponse(data)

        if (this.holidaysResult.success) {
          this.holidaysAndEventsList = this.holidaysResult.data.data
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },
  async created () {
    await this.loadFormSetting()
  },
  async mounted () {
    this.revisitDateFrom = new PersianDate().toLocale("en").format("L")
    this.revisitDateTo = new PersianDate()
      .add("days", 21)
      .toLocale("en")
      .format("L")
    await this.load()
    await this.getHolidaysAndEvents()
  },
  watch: {
    revisitDateFrom () {
      if (
        this.revisitDateFrom !== new PersianDate().toLocale("en").format("L")
      ) {
        const revisitDateFromArray =
          this.revisitDateFrom && this.revisitDateFrom.split("/")
        let yearFrom = parseInt(revisitDateFromArray[0])
        let monthFrom = parseInt(revisitDateFromArray[1])
        let dayFrom = parseInt(revisitDateFromArray[2])
        let dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom])
        this.revisitDateTo = dateFrom.add("days", 21).toLocale("en").format("L")
      }
    },
    async selectedRevisitAgent () {
      await this.loadVacation()
    }
  }
}
</script>

<style>
.is-holiday-color {
  background-color: indianred;
}
</style>
