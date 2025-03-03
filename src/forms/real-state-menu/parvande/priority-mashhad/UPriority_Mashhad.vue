<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadResult" />
      </template>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="priorityDetails" label="مشخصات اولویت" />
        </template>
        <tab-content name="priorityDetails">
          <fit>
            <FormRow class="q-mb-sm">
              <FormControl>
                <safa-combo
                  label="کد طرح"
                  :options="planOpt"
                  v-model="planCode"
                  source-type="local"
                  :m="mode"
                  label-width="100px"
                  cdcName="planCode"
                  ref="melkRef"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="عنوان طرح"
                  v-model="model.PlansprojectsName"
                  cdcName="PlansprojectsName"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="تاریخ تصویب"
                  v-model="model.PriorityBudget_Sibna.ConfirmationDate"
                  cdcName="ConfirmationDate"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="تاریخ تملک"
                  v-model="model.PriorityBudget_Sibna.OwnerDate"
                  cdcName="OwnerDate"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="کد ارجاع صلح نامه اصلاحی"
                  v-model="model.PriorityBudget_Sibna.NidWorkItem2"
                  cdcName="NidWorkItem2"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  label="نوع اولویت"
                  v-model="model.PriorityBudget_Sibna.CI_PriorityType"
                  domain-name="Estate"
                  ciName="CI_PriorityType"
                  cdcName="CI_PriorityType"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  label="علت اولویت"
                  v-model="model.PriorityBudget_Sibna.CI_PriorityReason"
                  domain-name="Estate"
                  ciName="CI_PriorityReason"
                  cdcName="CI_PriorityReason"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="جبران"
                  v-model="model.PriorityBudget_Sibna.CI_PriorityRemedy"
                  domain-name="Estate"
                  ciName="CI_PriorityRemedy"
                  cdcName="CI_PriorityRemedy"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="شماره دستور"
                  v-model="model.PriorityBudget_Sibna.LetterRegNo"
                  cdcName="LetterRegNo"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="تاریخ دستور"
                  v-model="model.PriorityBudget_Sibna.LetterRegDate"
                  cdcName="LetterRegDate"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  label="سال مالی"
                  v-model="model.PriorityBudget_Sibna.CI_Year"
                  domain-name="Estate"
                  ciName="CI_Year"
                  cdcName="CI_Year"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="عنوان پروژه"
                  v-model="model.PriorityBudget_Sibna.ProjectName"
                  cdcName="ProjectName"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="مبلغ نقد"
                  v-model="model.CashPrice"
                  cdcName="CashPrice"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="مبلغ غیر نقد"
                  v-model="model.NotCashPrice"
                  cdcName="NotCashPrice"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="مبلغ سرانه خدماتی"
                  v-model="model.ServicePrice"
                  cdcName="ServicePrice"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  v-model="model.PriorityBudget_Sibna.cmBstatus"
                  label="وضعیت"
                  :options="comboList"
                  cdcName="cmBstatus"
                  source-type="local"
                  label-width="100px"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="تاریخ اعتبار"
                  v-model="model.CreditDate"
                  cdcName="CreditDate"
                  label-width="100px"
                />
              </FormControl>
              <FormControl class="q-mt-sm">
                <safa-checkbox
                  label="تصویه شده"
                  v-model="model.PriorityBudget_Sibna.IsConfirmed"
                  cdcName="IsConfirmed"
                  label-width="100px"
                />
              </FormControl>
            </FormRow>
            <fit>
              <safa-grid
                title="اطلاعات بودجه سیبنا"
                v-model="model.SibnaBudgetDetails"
                cdcName="SibnaBudgetDetails"
                helper="SibnaBudgetDetailsColumn"
                :suppressRowClickSelection="false"
                fit
                height="100%"
                max-height="100%"
                min-height="100%"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                paginate
              />
            </fit>
          </fit>
        </tab-content>
      </safa-tabs>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object,
      default: () => {}
    },
    baseNosaziCode: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      name: "UPriority_Mashhad",
      title: "اولویتهای تملک مشهد - سوابق",
      formKey: "A8A7F87C-1539-4777-8784-28CAAC42FECE",
      main: true,

      // #services
      loadResult: null,
      loadComboRes: null,

      // #variabels
      model: {
        CI_Year: {
          CI_Year: [
            {
              FromDate: "1396/01/01",
              ID: 1396,
              IsActive: true,
              Title: 1396,
              ToDate: "1396/11/30"
            },
            {
              FromDate: "1397/01/01",
              ID: 1397,
              IsActive: true,
              Title: 1397,
              ToDate: "1397/12/29"
            },
            {
              FromDate: "1398/01/01",
              ID: 1398,
              IsActive: false,
              Title: 1398,
              ToDate: "1398/12/29"
            },
            {
              FromDate: "1399/01/01",
              ID: 1399,
              IsActive: false,
              Title: 1399,
              ToDate: "1399/01/01"
            },
            {
              FromDate: "1400/01/01",
              ID: 1400,
              IsActive: false,
              Title: 1400,
              ToDate: "1400/01/01"
            },
            {
              FromDate: "1401/01/01",
              ID: 1401,
              IsActive: false,
              Title: 1401,
              ToDate: "1401/01/01"
            },
            {
              FromDate: "1402/01/22",
              ID: 1402,
              IsActive: false,
              Title: 1402,
              ToDate: "1402/01/01"
            }
          ]
        },
        IsConfirmContractBuy: false,
        IsPassSibnaConfirm: false,
        IsPassSibnaTakhsis: false,
        PriorityBudget_Sibna: {
          CI_PriorityReason: "",
          CI_PriorityRemedy: "",
          CI_PriorityType: "",
          CI_Year: 0,
          CommandTxt: "",
          ConfirmationDate: "",
          Description: "",
          IsConfirmed: "",
          LetterRegDate: "",
          LetterRegNo: "",
          NIdPlansprojects: "",
          NIdPrioritySibna: "00000000-0000-0000-0000-000000000000",
          NidRequest: "00000000-0000-0000-0000-000000000000",
          NidWorkItem2: "",
          OwnerDate: "",
          ProjectName: "",
          SuggestionDate: "",
          cmBstatus: 0
        },
        SibnaBudgetDetails: []
      },
      comboList: [
        {
          ID: 0,
          Title: "پیش نویس"
        },
        {
          ID: 1,
          Title: "تایید"
        },
        {
          ID: 2,
          Title: "انصراف"
        },
        {
          ID: 3,
          Title: "اصلاح مبلغ بودجه"
        }
      ],
      planOpt: [],
      planCode: "",
      activeTab: "priorityDetails"
    }
  },
  mounted () {
    this.loadObj()
    this.loadCombo()
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.ES.getPriorityBudgetSibna2({
        PNIdProc:
          this.currentObj?.NIdProcess || "00000000-0000-0000-0000-000000000000"
      })
        .then(({ data }) => {
          this.loadResult = this.getResponse(data)
          if (this.loadResult.success) {
            this.Auction_Request =
              this.loadResult.data.GetPriorityBudget_Sibna2Result
            this.log({
              action: this.logActions.view,
              bizCode: this.NIdProc,
              bizCodeTitle: "NIdProc"
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
    loadCombo () {
      this.showLoading()
      this.$services.ES.getPlansprojectsInfoMessage({
        pNIdProc:
          this.currentObj?.NIdProcess || "00000000-0000-0000-0000-000000000000",
        pCI_Region: 1
      })
        .then(({ data }) => {
          this.loadComboRes = this.getResponse(data)
          if (this.loadComboRes.success) {
            const tmp =
              this.loadComboRes.data.GetPlansprojects_Info_MessageResult ?? []
            this.planOpt = tmp.map((m) => {
              return {
                ID: m.NIdPlansprojects,
                Title: `${m.PlansprojectsName} | ${m.PlansprojectsCode}`
              }
            })
            this.log({
              action: this.logActions.view,
              bizCode: this.NIdProc,
              bizCodeTitle: "NIdProc"
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
    }
  },
  watch: {
    planCode () {
      const tmp =
        this.loadComboRes.data.GetPlansprojects_Info_MessageResult.find(
          (f) => f.NIdPlansprojects === this.planCode
        )
      this.model.PlansprojectsName = tmp.PlansprojectsName
    }
  }
}
</script>
