
<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <FormWrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="okPlansRes" />
        <safa-status :result="delPlansRes" />
        <safa-status :result="getPlansRes" />
      </template>
      <fit>
        <safa-splitter v-model="splitterModel" vertical margin="0">
          <template v-slot:before>
            <div class="column justify-between full-height">
              <fit>
                <div class="q-pa-sm">
                  <form-row class="q-mb-sm">
                    <safa-combo
                      class="col-6"
                      ciName="CI_Year"
                      domainName="Estate"
                      label="سال"
                      v-model="
                        model._Plansprojects_ProposalYear
                      "
                      label-width="40px"
                      cdcName="CI_Year"
                    />
                    <safa-combo
                      class="col-6"
                      ciName="CI_Region"
                      domainName="Estate"
                      label="منطقه"
                      label-width="40px"
                      cdcName="CI_Region"
                      v-model="model._CI_Region"
                    />
                    <safa-text
                      class="col-12"
                      label="بودجه"
                      label-width="40px"
                      cdcName="Budget"
                      v-model="budget"
                      m="e"
                    />
                  </form-row>
                  <div class="flex justify-center">
                    <btn-search label="جستجو" @click="loadObj" />
                  </div>
                </div>
                <q-list bordered>
                  <q-item
                    clickable
                    v-ripple
                    v-for="(item, index) in sideList"
                    :key="index"
                    @click="selectItem(item)"
                  >
                    <q-item-section avatar>
                      <q-avatar color="primary" icon="mark_chat_read" />
                    </q-item-section>
                    <q-item-section>
                      {{ getName(item) }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </fit>
            </div>
          </template>
          <template v-slot:after>
            <safa-tabs v-show="activeTab" v-model="activeTab" ref="SafaTabs">
              <template v-slot:tabs>
                <tab-menu name="SpecificPlan" label="مشخصات طرح پیشنهادی" />
                <tab-menu
                  name="EstatePlan"
                  label="املاک واقع در طرح پیشنهادی"
                />
              </template>
              <tab-content name="SpecificPlan">
                <USpecificPlan
                  :baseNosaziCode="baseNosaziCode"
                  v-model="model"
                  :m="mode"
                  :formKey="formKey"
                />
              </tab-content>
              <tab-content name="EstatePlan" :padding="false">
                <UEstatePlan
                  :formKey="formKey"
                  :name="name"
                  v-model="model"
                  :m="mode"
                />
              </tab-content>
            </safa-tabs>
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <btn-default label="حذف" @click="btnDeleteClick" />
          <btn-default
            label="تصویب طرح"
            @click="btnOkPlanClick"
            :disable="!lockOkPlan"
          />
          <btn-default label="گزارش" @click="btnReportClick" />
        </form-actions>
      </template>
    </FormWrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import USpecificPlan from "./partials/USpecificPlan.vue"
import UEstatePlan from "./partials/UEstatePlan.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    USpecificPlan,
    UEstatePlan
  },
  data () {
    return {
      title: "طرح و پروژه پیشنهادی",
      formKey: "A2551A1D-DE87-4D1B-B854-A31A57960240",
      name: "UPlansprojectsProposal",
      main: true,

      // #region services
      loadObjRes: null,
      okPlansRes: null,
      delPlansRes: null,
      getPlansRes: null,
      // #endregion

      // #region variables
      lockOkPlan: false,
      activeTab: "SpecificPlan",
      splitterModel: 25,
      budget: 0,
      List: [],
      sideList: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      model: {
        Plansprojects_Proposal_Other: [],
        Plansprojects_Proposal_Budget: {
          CI_Region: 0,
          NIdPlansprojects_Budget: "",
          Plansprojects_ProposalYear: 0,
          Budget: 0
        },
        Plansprojects_Proposal_Info: {
          ActualArea: null,
          CreateUserGuid: null,
          CI_Region: 0,
          Plansprojects_ProposalCode: null,
          Plansprojects_ProposalName: null,
          ContourFromFrom: null,
          ContourFromTo: null,
          CntPlansprojects_ProposalRow: null,
          CI_PlanPriority: 0,
          CI_PlanLicenseType: 0,
          MapNo: null,
          EstimateStartDate: null,
          RunningDate: null,
          AssessmentDate: null,
          WidthOfNewCrossing: null,
          ExecutiveArea: null,
          OrderRunningNo: null,
          OrderRunningDate: null,
          EstimateCost: null,
          Description: null,
          SupplySources_Other: "",
          NIdPlansprojects_Proposal: "00000000-0000-0000-0000-000000000000",
          Plansprojects_ProposalYear: 0
        },
        _NIdPlansprojects_Proposal: "",
        _PNIdPlansprojects_Proposal: "",
        Plansprojects_Proposal_Code: [],
        _CI_Region: 0,
        _Plansprojects_ProposalYear: 0
      }
      // #endregion
    }
  },

  mounted () {
    this.loadObj()
    // this.getPlansprojectsProposalInfo()
  },

  methods: {
    selectItem (item) {
      this.model._NIdPlansprojects_Proposal = item.NIdPlansprojects_Proposal
      this.getPlansprojectsProposalInfo()
    },
    getName (item) {
      return `${item.Plansprojects_ProposalCode} - ${item.Plansprojects_ProposalName}`
    },
    loadObj () {
      this.showLoading()
      const payload = {
        PPlansprojects_ProposalYear:
          this.model._Plansprojects_ProposalYear,
        PCI_Region: this.model._CI_Region
      }
      this.$services.ES.getPlansprojectsProposalInfoList(payload)
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            const res =
              this.loadObjRes.data.GetPlansprojects_Proposal_Info_ListResult
            this.lockOkPlan = false
            if (res && res.length > 0) {
              this.sideList = res.filter(
                (f) =>
                  f.NIdPlansprojects_Proposal !==
                  "00000000-0000-0000-0000-000000000000"
              )
              this.budget = res[0].Budget
            }
            this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
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
    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        PObj: {
          ...this.model,
          Plansprojects_Proposal_Info: {
            ...this.model.Plansprojects_Proposal_Info,
            CI_Region: this.model._CI_Region,
            Plansprojects_ProposalYear: this.model._Plansprojects_ProposalYear
          },
          Plansprojects_Proposal_Budget: {
            ...this.model.Plansprojects_Proposal_Budget,
            CI_Region: this.model._CI_Region,
            Plansprojects_ProposalYear: this.model._Plansprojects_ProposalYear
          }

        }
      }
      this.$services.ES.savePlansprojectsProposalInfo(payload)
        .then(({ data }) => {
          this.SaveObjRes = this.getResponse(data)
          if (this.SaveObjRes.success) {
            this.showSuccess('ذخیره با موفقیت انجام شد')
            this.isEditable = false
            this.loadObj()
            this.getPlansprojectsProposalInfo()
            this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `ذخیره ی اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async getPlansprojectsProposalInfo () {
      try {
        const payload = {
          PNIdPlansprojects_Proposal: this.model._NIdPlansprojects_Proposal,
          PPlansprojects_ProposalYear:
          this.model._Plansprojects_ProposalYear,
          PCI_Region: this.model._CI_Region
        }
        this.showLoading()
        const { data } = await this.$services.ES.getPlansprojectsProposalInfo(payload)
        this.getPlansRes = this.getResponse(data)
        if (this.getPlansRes.success) {
          this.model =
              this.getPlansRes.data.GetPlansprojects_Proposal_InfoResult
          this.lockOkPlan = true
          this.log({
            action: this.logActions.view,
            bizCode: this.model._NIdPlansprojects_Proposal,
            bizCodeTitle: "",
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async btnReportClick () {
      const reportPath = "/Estate/Rpt_Plansprojects_Proposal"
      const queryParams = {
        NIdPlansprojects_Proposal: this.model._NIdPlansprojects_Proposal,
        NidUser: this.getNidUser(),
        UserName: this.getUserDisplayName()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NidFiche,
        bizCodeTitle: "NidFiche",
        saveDesc: `گزارش در فرم ${this.title} انجام گردید.`
      })
    },
    btnOkPlanClick () {
      this.showConfirm("آیا طرح مورد نظر تصویب شود ؟").onOk(() => {
        this.okPlansProjectsProposalInfo()
      })
    },
    okPlansProjectsProposalInfo () {
      this.showLoading()
      this.$services.ES.okPlansProjectsProposalInfo({
        NIdPlansprojects_Proposal: this.model._NIdPlansprojects_Proposal
      })
        .then(({ data }) => {
          this.okPlansRes = this.getResponse(data)
          if (this.okPlansRes.success) {
            this.lockOkPlan = false
            this.showSuccess("تصویب طرح با موفقیت انجام شد")
            this.loadObj()
          } else {
            this.showError("خطا در تصویب طرح")
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
    btnDeleteClick () {
      this.showConfirm("آیا اطلاعات مورد نظر حذف شود؟").onOk(() => {
        this.delPlansProjectsProposalInfo()
      })
    },
    delPlansProjectsProposalInfo () {
      this.showLoading()
      this.$services.ES.delPlansProjectsProposalInfo({
        PNIdPlansprojects_Proposal: this.model._NIdPlansprojects_Proposal
      })
        .then(({ data }) => {
          this.delPlansRes = this.getResponse(data)
          if (this.delPlansRes.success) {
            this.showSuccess("حذف اطلاعات با موفقیت انجام شد.")
            this.loadObj()
            this.getPlansprojectsProposalInfo()
          } else {
            this.showError("خطا در حذف اطلاعات")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
 <style lang="scss" scoped>
.txt-message {
  color: #975625;
  font-size: 13px;
  font-weight: 600;
  margin: 0 auto !important;
  // animation: ripple 1.5s infinite linear;
}
@keyframes ripple {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
