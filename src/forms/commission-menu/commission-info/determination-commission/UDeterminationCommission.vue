<template>
  <safa-form
    appId="badbf938-ee27-414f-8df4-6fa440f8fa70"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="تاریخ ارجاع کمیسیون"
              label-width="80px"
              source-type="local"
              :options="commissionDateList"
              v-model="commissionDate"
              cdcName="commissionDate"
              required
              validations="required"
              clearable
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ جدید کمیسیون"
              label-width="80px"
              v-model="commissinNewDate"
              cdcName="commissinNewDate"
            />
          </FormControl>
          <FormControl class="flex items-center">
            <div class="q-gutter-x-md">
              <safa-checkbox
                label="تعیین کمیسیون"
                label-width="80px"
                v-model="determinatCommission"
                cdcName="determinatCommission"
              />
              <safa-checkbox
                label="دعوت به جلسه"
                label-width="80px"
                v-model="invitationToMeeting"
                cdcName="invitationToMeeting"
              />
            </div>
          </FormControl>
          <FormControl>
            <div class="q-gutter-sm">
              <btn-default label="تغییر تاریخ" />
              <btn-default
                label="بازآوری اطلاعات"
                @click="getCommissionRandom"
              />
            </div>
          </FormControl>
        </FormRow>
        <safa-splitter
          v-model="horizontalSplitterModel"
          horizontal
          class="fit"
          margin="0"
          :min-height="$q.screen.lt.lg ? '500px' : '150px'"
        >
          <template v-slot:before>
            <fit>
              <safa-splitter
                v-model="topVerticalSplitterModel"
                :horizontal="$q.screen.lt.lg"
                class="fit"
                margin="0"
              >
                <template v-slot:before>
                  <Areas
                    :commissionDate="commissionDate"
                    v-model="model"
                    @updateSelectedCommissionFilter="
                      updateSelectedCommissionFilter
                    "
                    ref="areas"
                    :title="title"
                    :name="name"
                    :formKey="formKey"
                  />
                </template>
                <template v-slot:after>
                  <fit>
                    <Infractions
                      v-model="model.CI_TreepassType"
                      @selectedItems="selectTreepassType"
                    />
                  </fit>
                </template>
              </safa-splitter>
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-splitter
                v-model="buttomVerticalSplitterModel"
                :horizontal="$q.screen.lt.lg"
                class="fit"
                margin="0"
              >
                <template v-slot:before>
                  <fit>
                    <Type
                      v-model="model.CI_CommissionType"
                      @selectedItems="selectCommissionType"
                    />
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <Capacity
                      v-model="model.CommissionCapacity"
                      @selectedItems="selectCommissionCapacity"
                      ref="capacity"
                    />
                  </fit>
                </template>
              </safa-splitter>
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <form-actions :m="mode" :showEditButton="false">
          <template #after>
            <btn-default
              label="تعیین کمیسیون"
              @click="getAfterCommission"
              :disable="lockGetAfterCommission"
            />
            <btn-default label="حذف" @click="showCommissioningFiles = false" />
          </template>
        </form-actions>
      </template>

      <safa-popup
        title="پرونده های کمیسیون بندی"
        v-model="showCommissioningFiles"
        width="900px"
        height="600px"
      >
        <CommissioningFiles
          v-model="afterCommissionResult"
          @reloadAfterCommission="sentFromCommissioningFiles"
          @isVotable="getIsVotable"
          @getCommissionRandom="getCommissionRandom"
          :selectedCommissionCapacity="selectedCommissionCapacity"
          :commissionDate="commissionDate"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
import PersianDate from "persian-date"
import Areas from "./partials/Areas.vue"
import Infractions from "./partials/Infractions.vue"
import Type from "./partials/Type.vue"
import Capacity from "./partials/Capacity.vue"
import CommissioningFiles from "./partials/CommissioningFiles.vue"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  components: { Areas, Infractions, Type, Capacity, CommissioningFiles },

  data () {
    return {
      title: "تعیین کمیسیون",
      name: "UDeterminationCommission",
      formKey: "0768ef23-aceb-4034-a50e-fab72f409f32",
      main: true,

      horizontalSplitterModel: 50,
      topVerticalSplitterModel: 50,
      buttomVerticalSplitterModel: 50,

      commissionDate: null,
      commissionDateList: [],
      // commissionDateList: [{ ID: "1402/01/14", Title: "1402/01/14" }],
      commissinNewDate: new PersianDate().toLocale("en").format("L"),
      determinatCommission: true,
      invitationToMeeting: false,
      showCommissioningFiles: false,
      model: {
        CI_Commission: [],
        CI_Region: [],
        CI_TreepassType: [],
        CI_CommissionType: [],
        CommissionCapacity: []
      },
      selectedRegion: null,
      selectedTreepassType: null,
      selectedCommissionType: null,
      selectedCommissionCapacity: null,
      selectedFormula: null,
      showDetails: false,
      isRelapse: false,
      isVotable: false,
      lockGetAfterCommission: true,
      commissionFilterResult: [],
      selectedCommissionFilter: [],
      detailColumns: [
        { field: "CommissionTypeTitle", title: "نوع کمیسیون", width: "150px" },
        { field: "OwnerName", title: "نام مالک", width: "200px" },
        {
          field: "UrbanNidKartablItem",
          title: "شماره درخواست",
          width: "100px"
        }
      ],
      afterCommissionResult: null
    }
  },

  mounted () {
    this.getCommissionsDate()
    // if (this.selectedCommission) {
    //   this.getCommissionsDate();
    // }
  },

  methods: {
    sentFromCommissioningFiles () {
      for (let i = 0; i < this.selectedCommissionFilter.length; i++) {
        this.selectedCommissionFilter[i].isVotable = this.isVotable
      }
      this.getAfterCommission()
    },

    getCommissionsDate () {
      this.showLoading()
      this.$services.commissions
        .getCommissionsDate()
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            const reqResult = res.data.GetCommissionsDateResult
            if (reqResult) {
              const list = []
              list.push(
                ...reqResult.map((item) => {
                  let r = {}
                  r.ID = item.CommissionDate
                  r.Title = item.CommissionDate
                  return r
                })
              )
              this.commissionDateList = list
            }
          }
        })
        .catch((e) => {
          console.error(e)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    normalizeCommissions (e) {
      if (e) {
        return (
          e.map((m) => {
            return {
              ...m,
              selected: true,
              Capacity: m.Capacity ?? 0,
              KarbariCapacity: m.KarbariCapacity ?? 0,
              TajdidNazarCapacity: m.TajdidNazarCapacity ?? 0,
              Count: m.Count ?? 0
            }
          }) ?? []
        )
      } else return []
    },
    getCommissionRandom () {
      this.$refs.areas.reset()
      const payload = {
        PRequest: { CommissionDate: this.commissionDate }
      }
      this.showLoading()
      this.$services.commissions
        .getCommissionRandom(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} در تاریخ ${this.commissionDate} انجام گردید.`
            })
            this.$refs.capacity.selectedChange()
            this.model = res.data.GetCommissionRandomResult
            // this.getCICommissionCapacity()
            this.model.CI_Region.forEach((i) => {
              i.CommissionDate = this.commissionDate
              i.isSelectedNode = false
            })
            const ciCommission = this.normalizeCommissions(
              this.model.CI_Commission
            )
            const comCapacity = this.normalizeCommissions(
              this.model.CommissionCapacity
            )
            const tmp = this.mergeArraysByKey(ciCommission, comCapacity, "ID")
            this.model.CommissionCapacity = tmp.filter((f) => f.ID !== 0)
          }
        })
        .catch((e) => {
          console.error(e)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    mergeArraysByKey (arr1, arr2, key) {
      let map = new Map()
      for (let obj of arr1) {
        map.set(obj[key], obj)
      }
      for (let obj of arr2) {
        if (map.has(obj[key])) {
          let mergedObj = Object.assign(map.get(obj[key]), obj)
          map.set(obj[key], mergedObj)
        } else {
          map.set(obj[key], obj)
        }
      }
      return Array.from(map.values())
    },
    getAfterCommission () {
      this.$refs.capacity.selectedChange()
      if (this.commissionDate === null || this.commissionDate === "") {
        return this.showError("پرونده ای برای کمیسیون بندی انتخاب نشده است.")
      }
      if (!this.isValidForm()) return
      if (
        this.selectedCommissionCapacity &&
        this.selectedCommissionCapacity.length > 0
      ) {
        this.selectedFormula = this.selectedCommissionCapacity.filter(
          (item) =>
            item.Capacity !== 0 ||
            item.KarbariCapacity !== 0 ||
            item.TajdidNazarCapacity !== 0
        )
        for (let i = 0; i < this.selectedCommissionCapacity.length; i++) {
          this.selectedCommissionCapacity[i].CI_Commission =
            this.selectedCommissionCapacity[i].ID
        }
      }
      if (this.selectedFormula && this.selectedFormula.length > 0) {
        for (let i = 0; i < this.selectedFormula.length; i++) {
          this.selectedFormula[i].CI_Commission = this.selectedFormula[i].ID
          this.selectedFormula[i].Capacity = parseInt(
            this.selectedFormula[i].Capacity
          )
          this.selectedFormula[i].KarbariCapacity = parseInt(
            this.selectedFormula[i].KarbariCapacity
          )
          this.selectedFormula[i].TajdidNazarCapacity = parseInt(
            this.selectedFormula[i].TajdidNazarCapacity
          )
        }
      }
      const payload = {
        PRequest: {
          CI_CommissionType: this.selectedCommissionType ?? [],
          CI_TreepassType: this.selectedTreepassType ?? [],
          CheckExistVoteToArchiveByNidCommission: false,
          CheckExistVoteToArchiveByReportName: false,
          CommissionFilter:
            this.selectedCommissionFilter.length > 0
              ? this.selectedCommissionFilter
              : [],
          IsActive: false,
          IsSara10: true,
          NIDCommission: "00000000-0000-0000-0000-000000000000",
          NIDVote: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          CommissionDate: this.commissionDate,
          Commission_Capacity: this.selectedCommissionCapacity,
          Commission_CapacityFormula: this.selectedFormula,
          ISRelapse: false,
          IsRegion: false,
          IsdeleteArchive: false,
          NidAgent: "00000000-0000-0000-0000-000000000000",
          NidTaskState: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.showLoading()
      this.$services.commissions
        .getAfterCommission(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
            })
            this.afterCommissionResult = res.data.GetAfterCommissionResult // context
            if (
              this.afterCommissionResult &&
              this.afterCommissionResult.CommissionAfter
            ) {
              this.afterCommissionResult.CommissionAfter.forEach((m) => {
                m.isSelectedNode = true
              })
            }
            this.showCommissioningFiles = true
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    updateSelectedCommissionFilter (e) {
      this.selectedCommissionFilter = e
    },

    selectTreepassType (val) {
      this.selectedTreepassType = val
    },
    selectCommissionType (val) {
      this.selectedCommissionType = val
    },
    selectCommissionCapacity (val) {
      this.selectedCommissionCapacity = val
    },
    getRelapse (val) {
      this.isRelapse = val
    },
    getIsVotable (val) {
      this.isVotable = val
    }
  },

  watch: {
    "model.CI_Region": {
      handler () {
        if (this.model.CI_Region.length > 0) {
          this.lockGetAfterCommission = false
        } else {
          this.lockGetAfterCommission = true
        }
      },
      deep: true
    }
  }
}
</script>
