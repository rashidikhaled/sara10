<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title" :hideTitle="hideTitle" :padding="false">
      <fit>
      <template #header>
        <safa-status :result="loadResult" />
        <safa-status :result="loadComboRes" />
        <safa-status :result="saveObjRes" />
        <safa-status :result="delPriorityInfoRes" />
      </template>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="PriorityInfo" label="مشخصات اولویت" />
          <tab-menu name="Description" label="توضیحات" />
        </template>
        <!-- first tab  -->
        <tab-content name="PriorityInfo">
          <fit>
            <FormRow class="q-mb-sm">
              <FormControl>
                <safa-combo
                  label="کد طرح"
                  :options="planOpt"
                  v-model="planCode"
                  source-type="local"
                  :m="mode"
                  label-width="80px"
                  cdcName="planCode"
                  ref="melkRef"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="عنوان طرح"
                  v-model="model.PlansprojectsName"
                  cdcName="PlansprojectsName"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="تاریخ تصویب"
                  v-model="model.Priority_Info.ConfirmationDate"
                  cdcName="ConfirmationDate"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="تاریخ تملک"
                  v-model="model.Priority_Info.OwnerDate"
                  cdcName="OwnerDate"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="تاریخ پیشنهادی"
                  v-model="model.Priority_Info.SuggestionDate"
                  cdcName="SuggestionDate"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>

              <FormControl>
                <safa-combo
                  label="نوع اولویت"
                  v-model="model.Priority_Info.CI_PriorityType"
                  domain-name="Estate"
                  ciName="CI_PriorityType"
                  cdcName="CI_PriorityType"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  label="علت اولویت"
                  v-model="model.Priority_Info.CI_PriorityReason"
                  domain-name="Estate"
                  ciName="CI_PriorityReason"
                  cdcName="CI_PriorityReason"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  label="جبران"
                  v-model="model.Priority_Info.CI_PriorityRemedy"
                  domain-name="Estate"
                  ciName="CI_PriorityRemedy"
                  cdcName="CI_PriorityRemedy"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="شماره دستور"
                  v-model="model.Priority_Info.LetterRegNo"
                  cdcName="LetterRegNo"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="تاریخ دستور"
                  v-model="model.Priority_Info.LetterRegDate"
                  cdcName="LetterRegDate"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="عنوان پروژه"
                  v-model="model.Priority_Info.ProjectName"
                  cdcName="ProjectName"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
            </FormRow>
            <FormRow class="q-mb-sm">
              <FormControl>
                <safa-combo
                  v-model="model.Priority_Info.CI_Year"
                  label="سال"
                  domain-name="Estate"
                  ciName="CI_Year"
                  cdcName="CI_Year"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  v-model="model.Priority_Info.CI_BudgetRow"
                  label="ردیف بودجه"
                  domain-name="Estate"
                  ciName="CI_BudgetRow"
                  cdcName="CI_BudgetRow"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  v-model="model.Priority_Info.CI_BudgetTitle"
                  label="عنوان بودجه"
                  domain-name="Estate"
                  ciName="CI_BudgetTitle"
                  cdcName="CI_BudgetTitle"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="مبلغ"
                  v-model="model.Priority_Info.Price"
                  cdcName="Price"
                  label-width="80px"
                  :m="mode"
                />
              </FormControl>
              <div class="col-6">
              <text-template
                cdcName="comments"
                v-model="model.Description"
                fit
                :rows="1"
                label="توضیحات"
                label-width="80px"
                :m="mode"
              />
            </div>
           <div class="q-mt-sm"><btn-new  label="اضافه" @click="add"/></div>
              <div class="q-mt-sm">
                <safa-checkbox
                  label="تصویه شده"
                  v-model="model.Priority_Info.IsConfirmed"
                  cdcName="IsConfirmed"
                  label-width="100px"
                />
              </div>
            </FormRow>
            <safa-grid
              title="جزییات بودجه"
              v-model="model.Priority_Budget"
              fit
              paginate
              :addRow="true"
              :deleteRow="true"
              :allowCopy="true"
              :columns="budgetColumns"
              min-height="250px"
              height="100%"
              max-height="100%"
              :m="mode"
            />
          </fit>
        </tab-content>
        <!-- second Tab -->
         <tab-content name="Description">
          <fit>
            <text-template
              v-model="model.Priority_Info.CommandTxt"
              cdcName="comments"
              class="q-mb-sm"
              fit
              label="متن دستورات"
              label-width="80px"
              :m="mode"
            />
            <text-template
              v-model="model.Priority_Info.Description"
              cdcName="comments"
              class="q-mb-sm"
              fit
              label="توضیحات"
              label-width="80px"
              :m="mode"
            />
          </fit>
        </tab-content>
      </safa-tabs>
      </fit>

      <template #footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
        <template v-slot:after>
          <btn-delete label="حذف" @click="delPriorityInfo"/>
        </template>
      </FormActions>
        </template>
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
      name: "UPriority",
      title: "اولویتهای تملک - سوابق",
      formKey: "CA76AD13-20CA-42F8-AD4D-14ADB1BCE170",
      main: true,
      activeTab: "PriorityInfo",

      // #services
      loadResult: null,
      loadComboRes: null,
      saveObjRes: null,
      delPriorityInfoRes: null,

      // #variabels
      budgetColumns: [
        {
          title: "ردیف بودجه ",
          field: "CI_BudgetRow",
          width: "150px",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "عنوان بودجه ",
          field: "CI_BudgetTitle",
          width: "250px",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "مبلغ",
          field: "Price",
          width: "150px"
        },
        {
          title: "توضیحات",
          field: "Description",
          width: "auto"
        }
      ],
      model: {
        Priority_Budget: [],
        // CI_Year: {
        //   CI_Year: [
        //     {
        //       FromDate: "1396/01/01",
        //       ID: 1396,
        //       IsActive: true,
        //       Title: 1396,
        //       ToDate: "1396/11/30"
        //     },
        //     {
        //       FromDate: "1397/01/01",
        //       ID: 1397,
        //       IsActive: true,
        //       Title: 1397,
        //       ToDate: "1397/12/29"
        //     },
        //     {
        //       FromDate: "1398/01/01",
        //       ID: 1398,
        //       IsActive: false,
        //       Title: 1398,
        //       ToDate: "1398/12/29"
        //     },
        //     {
        //       FromDate: "1399/01/01",
        //       ID: 1399,
        //       IsActive: false,
        //       Title: 1399,
        //       ToDate: "1399/01/01"
        //     },
        //     {
        //       FromDate: "1400/01/01",
        //       ID: 1400,
        //       IsActive: false,
        //       Title: 1400,
        //       ToDate: "1400/01/01"
        //     },
        //     {
        //       FromDate: "1401/01/01",
        //       ID: 1401,
        //       IsActive: false,
        //       Title: 1401,
        //       ToDate: "1401/01/01"
        //     },
        //     {
        //       FromDate: "1402/01/22",
        //       ID: 1402,
        //       IsActive: false,
        //       Title: 1402,
        //       ToDate: "1402/01/01"
        //     }
        //   ]
        // },
        IsConfirmContractBuy: false,
        IsPassSibnaConfirm: false,
        IsPassSibnaTakhsis: false,
        Priority_Info: {
          CI_PriorityReason: "",
          CI_PriorityRemedy: "",
          CI_PriorityType: "",
          CI_Year: 0,
          CommandTxt: "",
          ConfirmationDate: "",
          Description: "",
          IsConfirmed: false,
          LetterRegDate: "",
          LetterRegNo: "",
          NIdPlansprojects: "00000000-0000-0000-0000-000000000000",
          NIdPrioritySibna: "00000000-0000-0000-0000-000000000000",
          NIdPriority: "00000000-0000-0000-0000-000000000000",
          NidRequest: "00000000-0000-0000-0000-000000000000",
          OwnerDate: "",
          SuggestionDate: "",
          ProjectName: "",
          Price: '',
          CI_BudgetTitle: "",
          CI_BudgetRow: ""
        },
        SibnaBudgetDetails: [],
        CI_Year: 0,
        Description: ''
      },
      planOpt: [],
      planCode: 0
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
              bizCodeTitle: "NIdProc",
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
    },
    async saveObj () {
      this.showLoading()
      const payload = {
        "PObj": {
          "CI_BudgetRow": this.model.CI_BudgetRow,
          "CI_BudgetTitle": this.model.CI_BudgetTitle,
          "ErrorResult": {
            "BizErrors": "",
            "Requirements": ""
          },
          "IsConfirmContractBuy": this.model.IsConfirmContractBuy,
          "IsPassSibnaConfirm": this.model.IsPassSibnaConfirm,
          "IsPassSibnaTakhsis": this.model.IsPassSibnaTakhsis,
          "Priority_Budget": this.model.Priority_Budget,
          "Priority_Info": {
            "BudjetRow": "",
            "CI_PriorityReason": this.model.Priority_Info.CI_PriorityReason,
            "CI_PriorityRemedy": this.model.Priority_Info.CI_PriorityRemedy,
            "CI_PriorityType": this.model.Priority_Info.CI_PriorityType,
            "CommandTxt": this.model.Priority_Info.CommandTxt,
            "ConfirmationDate": this.model.Priority_Info.ConfirmationDate,
            "Description": this.model.Description,
            "IsConfirmed": this.model.Priority_Info.IsConfirmed,
            "LetterRegDate": this.model.Priority_Info.LetterRegDate,
            "LetterRegNo": this.model.Priority_Info.LetterRegNo,
            "NIdPlansprojects": this.planCode,
            "NIdPriority": this.model.Priority_Info.NIdPriority, // "ac890267-b477-45bb-915e-1de8c2339767",
            "NIdPriority_tmp": 0,
            "NidRequest": "1e279fe9-5010-4efc-b6bf-9f2e834068d9",
            "OwnerDate": this.model.Priority_Info.OwnerDate,
            "ProjectName": this.model.Priority_Info.ProjectName,
            "SibnaBudgetDate": "",
            "SibnaBudgetStatus": "",
            "SibnaBudgetTime": "",
            "SibnaErrorMessage": "",
            "SibnaFinalConfirmDate": "",
            "SibnaNo": "",
            "SibnaTakhsisDate": "",
            "SibnaTakhsisNo": "",
            "SibnaTakhsisTime": "",
            "SuggestionDate": this.model.Priority_Info.SuggestionDate
          },
          "_NIdPriority": "00000000-0000-0000-0000-000000000000" // "ac890267-b477-45bb-915e-1de8c2339767"
        }
      }
      console.log("===========================>", payload)
      try {
        const { data } = await this.$services.ES.savePriorityInfo(payload)
        this.saveObjRes = this.getResponse(data)
        if (this.saveObjRes.success) {
          if (this.saveObjRes.data.SavePriority_InfoResult) {
            this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد")
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: 'ذخیره ی فرم اولویت های تملک با موفقیت انجام شد'
            })
            this.isEditable = false
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async delPriorityInfo () {
      this.showConfirm("آیا اطلاعات مورد نظر حذف شود؟").onOk(() => {
        this.confirmDelete()
      })
    },
    async confirmDelete () {
      try {
        this.showLoading()
        const { data } = await this.$services.ES.delPriorityInfo({
          pNIdProc: this.currentObj?.NIdProcess || "00000000-0000-0000-0000-000000000000" // "a26e46ad-c988-4bdd-9742-bd46dcb00e85" // this.pNIdProc
        })
        this.delPriorityInfoRes = this.getResponse(data)
        if (this.delPriorityInfoRes.success) {
          this.showSuccess("حذف اطلاعات با موفقیت انجام شد.")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    add () {
      this.model.Priority_Budget = [...this.model.Priority_Budget,
        {
          CI_BudgetRow: this.model.Priority_Info.CI_BudgetRow,
          CI_BudgetTitle: this.model.Priority_Info.CI_BudgetTitle,
          Price: this.model.Priority_Info.Price,
          Description: this.model.Priority_Info.Description
        }
      ]
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
