<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="5FB05A4F-DA31-4202-83D1-D7558D5E965A"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getRevisitInfoResult" />
        <safa-status :result="saveRevisitInfoRes" />
      </template>
      <fit>
        <safa-tabs
          v-model="activeTab"
          :bordered="false"
          class="fit"
          height="100%"
          ref="discountTab"
          :padding="false"
        >
          <template v-slot:tabs>
            <tab-menu label="بازدیدها" name="revisit" />
            <tab-menu
              label="اطلاعات بازدید"
              name="infoRevisit"
              v-if="isShowNewTab"
            />
          </template>

          <tab-content name="revisit">
            <Urevisit
              v-model="getRevisitListModel"
              @selectRevisit="selectRevisit"
            />
          </tab-content>

          <tab-content
            name="infoRevisit"
            title="اطلاعات بازدید"
            v-if="isShowNewTab"
          >
            <safa-tabs
              v-model="activeTab2"
              :bordered="false"
              class="fit"
              height="100%"
              :padding="false"
            >
              <template v-slot:tabs>
                <tab-menu name="Using" label="کاربری" />
                <tab-menu name="ResultsRevisit" label="نتایج بازدید" />
                  <tab-menu
                  v-if="showTabPattern"
                   name="Pattern"
                    label="طرح"
                    />
                <tab-menu
                  name="DescriptionVisitor"
                  label="توضیحات کارشناس بازدید کننده"
                />
                <!-- <tab-menu name="Croquis" label="کروکی" /> -->
              </template>

              <tab-content name="Using" title="کاربری">
                <UUsing v-model="model.Shop_Revisit" :m="mode" />
              </tab-content>
              <tab-content name="ResultsRevisit" title="نتایج بازدید">
                <UResultsRevisit
                  v-model="model"
                  :ciPlanList="ciPlanList"
                  :m="mode"
                />
              </tab-content>
              <tab-content
              v-if="showTabPattern"
              name="Pattern"
               title="طرح" >
                <UPattern
                :m="mode"
                 v-model="model"
                  :ciPlanList="ciPlanList"
                   />
              </tab-content>
              <tab-content
                name="DescriptionVisitor"
                title="توضیحات کارشناس بازدید کننده"
              >
                <div class="q-pa-sm">
                  <text-template
                    label="توضیحات"
                    :m="mode"
                    v-model="model.Revisit_Info.Comments"
                  />
                </div>
              </tab-content>
              <tab-content name="Croquis" title="کروکی">
                <!-- <UCroquis :m="mode" v-model="model" /> -->
              </tab-content>
            </safa-tabs>
          </tab-content>
        </safa-tabs>
      </fit>

      <template v-slot:footer>
        <!-- :showEditButton="activeTab !== 'revisit'" -->
        <FormActions
          :m="mode"
          :showNewButton="activeTab === 'revisit'"
          @newInfo="newRevisitHandler"
          @edit="isEditable = true"
          editSPId="caa8b54a-eb5e-4134-8ae2-a3946a428ec7"
          editFormId="5f425c44-5005-4ef4-96cd-ade4543ef49e"
          editSPCaption="ویرایش"
          :force="true"
          @cancel="isEditable = false"
          @save="saveData"
        >
          <template v-slot:after>
            <btn-default
              v-show="activeTab === 'revisit'"
              label="چاپ"
              :disable="lockRevokeAndConfirmBtn"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Urevisit from "./partials/Urevisit.vue"
import UUsing from "./partials/UUsing.vue"
import UResultsRevisit from "./partials/UResultsRevisit.vue"
import UPattern from "./partials/UPattern.vue"
import { uid } from "quasar"

export default {
  components: {
    Urevisit,
    UUsing,
    UResultsRevisit,
    UPattern
    // UCroquis,
  },
  mixins: [baseFormMixin],

  data () {
    return {
      title: "بازدید",
      name: "UFireRevisit",
      // formKey: "92BEA5E5-CBF1-4734-B2B3-DD48539A7365",
      formKey: "5f425c44-5005-4ef4-96cd-ade4543ef49e",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      // security
      showTabPattern: false,
      shallSetNewNIdRevisit: false,
      isView: false,
      ciPlanList: [],
      getRevisitListModel: { Revisit_List: [] },
      activeTab: "revisit",
      activeTab2: "Using",
      selectedRevisit: null,
      getRevisitInfoResult: null,
      saveRevisitInfoRes: null,
      model: {
        Shop_Revisit: {
          Base_Using: [],
          Base_SubScription: [],
          Base_SharingInfrastructure: []
        },
        CI_Plan: [],
        CI_VisitCause: [],
        Job: {},
        Revisit_Info: {
          Comments: "",
          NIdRevisit: "00000000-0000-0000-0000-000000000000"
        },
        Revisit_List: [],
        Revisit_Plan: [],
        Revisit_Details: [],
        Plan_Details: []
      },
      loadDiscountByNidDPrequest: {
        pNidD: null
      },
      isShowNewTab: false,
      discountDetail: null,
      loadResult: null,
      lockRevokeAndConfirmBtn: true
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.loadData()
    } else {
      this.showError("لطفا یک سطر از کارتابل انتخاب نمایید.")
      this.hideSidebar("UFireRevisit")
    }
    this.addResources()
  },

  methods: {
    async loadData () {
      try {
        this.showLoading()
        const { data } = await this.$services.FireService.getRevisitList({
          pNIdProc: this.selectedRequest.NidProc // "5ea20353-884f-45d0-b130-fd88337180f8",
        })
        const res = this.getResponse(data)
        if (res.success) {
          this.getRevisitListModel = res.data ?? { Revisit_List: [] }
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async getRevisitInfo () {
      this.isEditable = false
      this.isShowNewTab = true
      this.discountDetail = null
      this.$refs.discountTab.changeTab("infoRevisit")
      try {
        const payload = {
          pNIdProc: this.selectedRequest.NidProc,
          pNIdRevisit:
            this.selectedRevisit === null
              ? uid()
              : this.selectedRevisit.NIdRevisit,
          pNosaziCode: this.selectedRequest.BizCode,
          pShopLoadFunc:
            "Base_JobInfo,Base_JobOwner,Base_Using,Base_SharingInfrastructure,Base_SubScription,Base_JobLicence,Base_JobTablo,Base_JobVacation,Base_JobOtherEquipment",
          pIsNewRevisit: this.selectedRevisit === null
        }
        this.showLoading()
        const { data } = await this.$services.FireService.getRevisitInfo(
          payload
        )
        this.getRevisitInfoResult = this.getResponse(data)
        const res = this.getResponse(data)
        if (res.data && res.data.CI_Plan) this.ciPlanList = res.data.CI_Plan
        this.model = res.data
        if (res.data.Plan_Details && res.data.Plan_Details.length > 0) {
          this.model.Plan_Details = res.data.Plan_Details.map((m) => {
            return {
              ...m,
              CI_Plan: (m.Revisit_Plan && m.Revisit_Plan.CI_Plan) || null,
              Comments: (m.Revisit_Plan && m.Revisit_Plan.Comments) || "",
              NIdPlan:
                (m.Revisit_Plan && m.Revisit_Plan.NIdPlan) ||
                "00000000-0000-0000-0000-000000000000",
              NIdRevisit:
                (m.Revisit_Plan && m.Revisit_Plan.NIdRevisit) ||
                this.model.Revisit_Info.NIdRevisit,
              Comments2:
                (m.Revisit_Details && m.Revisit_Details.Comments) || "",
              IncompleteValue:
                (m.Revisit_Details && m.Revisit_Details.IncompleteValue) || "",
              ShortageValue:
                (m.Revisit_Details && m.Revisit_Details.ShortageValue) || ""
            }
          })
        }
        if (this.selectedRevisit !== null) {
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            saveDesc: `بارگذاری اطلاعات بازدید آتشنشانی برای کاربر ${this.selectedRevisit.UserName} انجام گردید `
          })
        }
        this.$refs.discountTab.changeTab("infoRevisit")
        if (!this.model.Shop_Revisit) {
          this.model.Shop_Revisit = {
            Base_Using: [],
            Base_SharingInfrastructure: []
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async addResources () {
      const appId = this.$stSecurity.getters["config/appId"] // NidWorkspace
      const appTitle = this.$stSecurity.getters["config/appTitle"] // workspace title
      const appName = this.$stSecurity.getters["config/appName"] // workspace name

      let resources = []
      resources.push({
        NidResource: "72c50658-2535-43a6-9a4d-07b8ea3030a7".toUpperCase(),
        NidParent: this.formKey,
        name: "Pattern",
        title: "طرح",
        type: "sp"
      })

      const payload = {
        NidWorkspace: appId,
        workspaceName: appName,
        workspaceTitle: appTitle,
        newAdd: true,
        resources
      }
      const result = await this.$services.security.resourceAddFetch(payload)
      // const result = await post('/v2/permission-forms/resource-add-fetch', payload, {})
      if (result.data.success) {
        this.allAccessSecurity = result.data.data
        this.showTabPattern = this.checkSecurity(
          "72c50658-2535-43a6-9a4d-07b8ea3030a7"
        ) // تب طرح
      }
    },
    checkSecurity (e) {
      let help = this.allAccessSecurity.filter(
        (i) => i.NidResource.toUpperCase() === e.toUpperCase()
      )
      return help[0].allowed
    },
    async saveData () {
      if (!this.isValidForm()) return
      if (this.model.Plan_Details && this.model.Plan_Details.length > 0) {
        this.model.Revisit_Plan = this.model.Revisit_Plan.map((m) => {
          return {
            CI_Plan: m.CI_Plan || "",
            Comments: m.Comments || "",
            NIdPlan: m.NIdPlan,
            NIdRevisit: this.model.Revisit_Info.NIdRevisit,
            uniqueID: m.uniqueID || ""
          }
        })
      }
      if (this.model.Plan_Details && this.model.Plan_Details.length > 0) {
        this.model.Plan_Details = this.model.Plan_Details.map((m) => {
          return {
            Revisit_Plan: {
              CI_Plan: m.CI_Plan || "",
              Comments: m.Comments || "",
              NIdPlan: m.NIdPlan,
              NIdRevisit: this.model.Revisit_Info.NIdRevisit
            },
            Revisit_Details: {
              CI_Visit: m.Revisit_Details.CI_Visit || 0,
              CI_VisitCause: m.Revisit_Details.CI_VisitCause || 0,
              NIdDetails: m.NIdPlan,
              NIdRevisit: this.model.Revisit_Info.NIdRevisit,
              Comments: m.Comments2 || "",
              IncompleteValue: m.IncompleteValue || "",
              ShortageValue: m.ShortageValue || "",
              Value: m.Revisit_Details.Value || null,
              VisitSafetyItemCode:
                m.Revisit_Details.VisitSafetyItemCode || null,
              VisitSafetyItemName:
                m.Revisit_Details.VisitSafetyItemName || null
            }
          }
        })
      }
      if (this.model.Revisit_Info) {
        this.model.Revisit_Info.NIdUser = this.getNidUser()
        this.model.Revisit_Info.UserName = this.getUserDisplayName()
      }
      this.model.Revisit_List =
        this.model &&
        this.model.Revisit_List &&
        this.model.Revisit_List.map((x) => {
          return {
            ...x,
            NIdUser: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        })
      let obj = this.model
      delete obj.CI_Plan
      if (this.shallSetNewNIdRevisit) {
        obj._NIdRevisit = "00000000-0000-0000-0000-000000000000"
        obj._IsNewRevisit = true
      } else {
        obj._NIdRevisit = this.model._NIdRevisit
        obj._IsNewRevisit = false
      }
      try {
        this.showLoading()
        const { data } = await this.$services.FireService.saveRevisitInfo({
          pNosaziCode: this.selectedRequest.BizCode,
          PObj: obj
        })
        this.saveRevisitInfoRes = this.getResponse(data)
        if (this.saveRevisitInfoRes.success) {
          this.showSuccess("اطلاعات با موفقیت ذخیره شد")
          this.isEditable = false
          this.isShowNewTab = false
          this.selectedRevisit = null
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            saveDesc: `ذخیره اطلاعات بازدید آتشنشانی انجام گردید `
          })
          this.loadData()
          this.activeTab = "revisit"
        }
      } catch (e) {
        this.showError("خطایی در سرویس رخ داد")
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    selectRevisit (row) {
      this.shallSetNewNIdRevisit = false
      this.selectedRevisit = row
      this.getRevisitInfo()
      this.activeTab2 = "Using"
    },
    newRevisitHandler () {
      this.shallSetNewNIdRevisit = true
      this.selectedRevisit = null
      this.getRevisitInfo()
      this.activeTab2 = "Using"
    }
  },
  watch: {
    activeTab () {
      if (this.activeTab === "revisit") this.isEditable = false
    }
  }
}
</script>
