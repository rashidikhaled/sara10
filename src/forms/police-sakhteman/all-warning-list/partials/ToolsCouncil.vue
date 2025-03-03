<template>
  <form-wrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="result" />
      <safa-status :result="getDetailsResult" />
      <safa-status :result="savePickupStuffCouncilRes" />
    </template>
    <fit>
      <safa-tabs v-model="activeTab" :padding="false">
        <template v-slot:tabs>
          <tab-menu name="list" label="لیست" @click="showDetailsBtn = true" />
          <tab-menu
            name="newConstructionCouncil"
            label="صورتمجلس جدید"
            v-if="isdetails"
            @click="showDetailsBtn = false"
          />
        </template>

        <tab-content name="list">
          <div class="fit">
            <safa-datatable
              fit
              height="100%"
              max-height="100%"
              helper="PickupStuffCouncil"
              :allowMultipleSelection="false"
              :paginate="true"
              v-model="PickupStuffCouncilList"
              cdcName="PickupStuffCouncilList"
              m="r"
              :bordered="false"
              @dbclick="showDetails"
            />
          </div>
        </tab-content>
        <tab-content name="newConstructionCouncil">
          <safa-tabs v-model="activeTab2">
            <template v-slot:tabs>
              <tab-menu name="Council" label="صورتمجلس" />
              <tab-menu name="eblagh" label="ابلاغ" />
            </template>
            <tab-content name="Council">
              <FormRow class="q-mb-sm" :xl="3" :lg="3" :md="3" :xxl="3">
                <FormControl>
                  <safa-text
                    label="شماره صورتمجلس"
                    label-width="100px"
                    v-model="model.PickupStuffCouncil.PickupStuffCouncilNo"
                    cdcName="PickupStuffCouncilNo"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ"
                    label-width="60px"
                    v-model="model.PickupStuffCouncil.PickupStuffCouncilDate"
                    cdcName="PickupStuffCouncilDate"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="شماره تفن مالک/ذی نفع"
                    label-width="120px"
                    v-model="model.PickupStuffCouncil.OwnerMobile"
                    cdcName="OwnerMobile"
                    :m="mode"
                  />
                </FormControl>
              </FormRow>
              <div class="row">
                <text-template
                  label="توضیحات"
                  class="col-12 q-mb-sm"
                  label-width="100px"
                  v-model="model.PickupStuffCouncil.Comments"
                  cdcName="Comments"
                  formKey="59bd5650-016f-484e-8266-c015b430264d"
                  :m="mode"
                />
              </div>
              <safa-datatable
                fit
                height="100%"
                max-height="100%"
                helper="PickupStuffCouncilDetails"
                :allowMultipleSelection="false"
                :paginate="true"
                :m="mode"
                v-model="model.PickupStuffCouncil_Details"
                cdcName="PickupStuffCouncil_Details"
              />
            </tab-content>
            <tab-content name="eblagh">
              <safa-notice>شرایط ابلاغ قانونی</safa-notice>
              <FormRow :xl="2" :lg="2" :md="2" :xxl="2">
                <FormControl>
                  <safa-combo
                    label="عنوان ماده ابلاغ"
                    label-width="100px"
                    v-model="model.ClsProphecy.Prophecy.CI_Article"
                    cdcName="CI_Article"
                    :m="mode"
                    domainName="BuildingPolice"
                    ciName="CI_Article"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="نام و نام خانوادگی تحویل گیرنده"
                    label-width="100px"
                    v-model="model.ClsProphecy.Prophecy.RecipientName"
                    cdcName="RecipientName"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="سمت"
                    label-width="100px"
                    v-model="model.ClsProphecy.Prophecy.Post"
                    cdcName="Post"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="مامور ابلاغ "
                    label-width="100px"
                    v-model="model.ClsProphecy.Prophecy.NotificationOfficer"
                    cdcName="NotificationOfficer"
                    :m="mode"
                  />
                </FormControl>
              </FormRow>
            </tab-content>
          </safa-tabs>
        </tab-content>
      </safa-tabs>
    </fit>
    <template #footer>
      <FormActions
        v-if="!showDetailsBtn"
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="saveObj"
      >
        <btn-default label="گزارش" @click="Report" />
      </FormActions>
      <btn-default
        v-if="showDetailsBtn"
        label="صورتمجلس جدید"
        @click="openDetails"
      />
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "صورتمجلس جمع آوری لوازم و مصالح ساختمانی",
      name: "ToolsCouncil",
      //   columns: [
      //     {
      //       field: "PickupStuffCouncilNo",
      //       title: "شماره صورتمجلس",
      //       width: "100px",
      //     },
      //     {
      //       field: "PickupStuffCouncilDate",
      //       title: "تاریخ صورتمجلس",
      //       width: "100px",
      //     },
      //     {
      //       field: "Comments",
      //       title: "توضیحات",
      //       width: "80px",
      //     },
      //     {
      //       field: "UserName",
      //       title: "کاربر",
      //       width: "200px",
      //     },
      //     {
      //       field: "EnterDate",
      //       title: "تاریخ ثبت",
      //       width: "80px",
      //     },
      //     {
      //       field: "EnterTime",
      //       title: "ساعت ثبت",
      //       width: "80px",
      //     },
      //   ],
      activeTab: "list",
      PickupStuffCouncilList: [],
      isdetails: false,
      showDetailsBtn: true,
      model: {
        PickupStuffCouncil: {
          PickupStuffCouncilNo: 0,
          PickupStuffCouncilDate: "",
          OwnerMobile: "",
          Comments: ""
        },
        ClsProphecy: {
          Prophecy: {
            CI_Article: 0,
            RecipientName: "",
            Post: "",
            NotificationOfficer: ""
          }
        },
        PickupStuffCouncil_Details: []
      },
      activeTab2: "Council",
      result: null,
      savePickupStuffCouncilRes: null,
      getDetailsResult: null,
      nidPickup: "00000000-0000-0000-0000-000000000000"
      // PickupStuffCouncilDetails: [
      //   {
      //     field: "CI_StuffSub",
      //     title: "نوع ابزار-مصالح / مصالح جمع آوری شده-واحد",
      //     editor: "combo",
      //     domain: "BuildingPolice",
      //     width: "300px",
      //   },
      //   {
      //     field: "StuffValue",
      //     title: "تعداد / مقدار",
      //     width: "120px",
      //   },
      //   {
      //     field: "PelakNo",
      //     title: "شماره پلاک",
      //     width: "120px",
      //   },
      //   {
      //     field: "Comments",
      //     title: "توضیحات",
      //     width: "200px",
      //   },
      //   {
      //     field: "",
      //     title: "عکس",
      //     width: "80px",
      //   },
      // ]
    }
  },
  props: {
    selectedRow: Object
  },
  mounted () {},
  methods: {
    openDetails () {
      this.isdetails = true
      this.showDetailsBtn = false
      this.activeTab = "newConstructionCouncil"
      this.getPickupStuffCouncil()
      this.model.PickupStuffCouncil.PickupStuffCouncilDate = currentDate()
    },
    loadObj () {
      this.showLoading()
      this.$services.SH.getPickupStuffCouncilList({
        pNidProc: this.selectedRow.NidWarning
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.PickupStuffCouncilList =
              this.result.data.PickupStuffCouncilList
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRow.NidWarning,
              bizCodeTitle: "NidWarning",
              saveDesc: `بارگذاری اطلاعات صورتمجلس جمع آوری لوازم و مصالح ساختمانی با شماره ${this.selectedRow.WarningNo ?? ''} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getPickupStuffCouncil () {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRow.NidWarning,
        pNidPickup: this.nidPickup
      }
      this.$services.SH.getPickupStuffCouncil(payload)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.model = this.result.data
            this.getDetailsResult = this.result.data
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      let mergedRequest = {
        ...this.getDetailsResult.PickupStuffCouncil,
        ...this.model.PickupStuffCouncil
      }
      mergedRequest.NidProc = this.selectedRow.NidWarning
      mergedRequest.NidUser = this.getNidUser()
      mergedRequest.UserName = this.getUserDisplayName()
      this.getDetailsResult.PickupStuffCouncil = mergedRequest

      this.getDetailsResult.PickupStuffCouncil_Details =
        this.model.PickupStuffCouncil_Details
      this.getDetailsResult.ClsProphecy.Prophecy =
        this.model.ClsProphecy.Prophecy
      const payload = {
        pPickupStuffCouncil: {
          ...this.getDetailsResult,
          NidProc: this.selectedRow.NidWarning
        }
      }
      this.$services.SH.savePickupStuffCouncil(payload)
        .then(async ({ data }) => {
          this.savePickupStuffCouncilRes = this.getResponse(data)
          if (this.savePickupStuffCouncilRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRow.NidWarning,
              bizCodeTitle: "NidWarning",
              saveDesc: `ذخیره اطلاعات صورتمجلس جمع آوری لوازم و مصالح ساختمانی با شماره ${this.selectedRow.WarningNo ?? ''} انجام گردید.`
            })
            this.getPickupStuffCouncil()
            this.loadObj()
            this.activeTab = "list"
            this.isEditable = false
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    showDetails (val) {
      this.nidPickup = val.row.NidPickup
      this.isdetails = true
      this.showDetailsBtn = false
      this.activeTab = "newConstructionCouncil"
      this.getPickupStuffCouncil()
    },
    async Report () {
      const reportPath =
        "/BuildingPolice/RptToolsCouncil"
      const queryParams = {
        NidPickup: this.nidPickup,
        NIdWarning: this.selectedRow.NidWarning
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NidWarning,
        bizCodeTitle: "NidWarning",
        saveDesc: `ذخیره اطلاعات صورتمجلس جمع آوری لوازم و مصالح ساختمانی با شماره ${this.selectedRow.WarningNo ?? ''} انجام گردید.`
      })
    }
  }
}
</script>
