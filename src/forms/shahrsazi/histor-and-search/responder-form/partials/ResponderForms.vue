<template>
  <fit>
    <div class="fit relative-position" id="responder-forms">
      <fit>
        <div class="responder-header q-pa-sm">
          <div class="search-wrapper q-mb-sm">
            <div class="searchbox flex items-center">
              <input placeholder="جستجو ..." type="text" v-model="searchTerm" />
              <transition name="fade">
                <q-icon
                  @click="searchTerm = ''"
                  class="s-close cursor-pointer"
                  v-show="searchTerm.trim().length > 0"
                  name="close"
                  size="22px"
                />
              </transition>
              <q-icon class="s-search" name="search" size="22px" />
            </div>
          </div>
          <button-group height="60px">
            <template>
              <ribbon-button
                :key="index"
                :label="form.title"
                @click="selectForm(form)"
                class="form-button"
                v-for="(form, index) in formList"
              >
                <template #icon>
                  <q-icon
                    color="primary"
                    size="20px"
                    style="transform: scaleX(-1); -ms-transform: scaleX(-1)"
                  >
                    <svg
                      height="300px"
                      viewBox="0 0 64 64"
                      width="300px"
                      x="0px"
                      xmlns="http://www.w3.org/2000/svg"
                      y="0px"
                    >
                      <g data-name="Page Layout">
                        <path
                          d="M57,7H7a5,5,0,0,0-5,5V52a5,5,0,0,0,5,5H57a5,5,0,0,0,5-5V12A5,5,0,0,0,57,7ZM29,12a2,2,0,1,1-2,2A2,2,0,0,1,29,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,20,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,11,12ZM60,52a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V20H60Z"
                        />
                        <rect
                          height="14"
                          rx="1"
                          ry="1"
                          width="14"
                          x="8"
                          y="37"
                        />
                        <rect
                          height="10"
                          rx="1"
                          ry="1"
                          width="48"
                          x="8"
                          y="25"
                        />
                        <rect
                          height="14"
                          rx="1"
                          ry="1"
                          width="32"
                          x="24"
                          y="37"
                        />
                      </g>
                    </svg>
                  </q-icon>
                </template>
              </ribbon-button>
            </template>
          </button-group>
        </div>
        <div class="responder-form fit" v-if="selectedForm">
          <component
            :isSelectFromWorkflow="false"
            :isSelectFromMenu="false"
            :isSelectFromResponder="true"
            :force-readonly="readonlyMode"
            :actionButtons="getBtn"
            :showInnerBtn="innerBtn"
            :is="formName"
            :taskInfo="selectedTaskInfo"
            @load="fixFormWrapper"
            v-if="formName"
          />
        </div>
        <div class="responder-report fit" v-else-if="selectedReport">
          <!-- <component
         v-if="reportName"
         :taskInfo="taskInfo"
         :is="reportName"
       />-->
        </div>
        <div
          :class="[
            'fit flex items-center justify-center',
            $q.dark.isActive ? 'bg-dark text-light' : 'bg-grey-2 text-grey',
          ]"
          v-else
        >
          <q-icon color="blue" name="warning" size="md" />&nbsp; هنوز فرمی
          انتخاب نشده است.
        </div>
      </fit>
      <!--<pre dir="ltr">
    {{formList}}
  </pre>-->
    </div>
    <!-- <div class="row full-height">
     <div class="col-12 col-md-auto">
       <div style="width: 200px;">
         <q-toolbar class="bg-blue-9 text-white">
           <q-toolbar-title style="font-size:14px">لیست فرم ها</q-toolbar-title>
           <q-icon name="redo" style="font-size: 1.8em;cursor:pointer" @click="back" />
         </q-toolbar>
         <q-scroll-area style="height: calc(100vh - 200px); width: 100%;">
           <q-list
             bordered
             separator
             v-if="formList && formList.length > 0"
           >
             <q-intersection
               v-for="form in formList"
               :key="form.NidForm"
               transition="fade"
               class="example-item"
               once
             >
               <q-item
                 @click="formsClick(form)"
                 class="q-my-sm"
                 clickable
                 v-ripple
               >
                 <q-item-section>
                   <q-item-label>{{ form.Caption }}</q-item-label>
                 </q-item-section>

                 <q-item-section side>
                   <q-icon
                     name="text_snippet"
                     color="green"
                   />
                 </q-item-section>
               </q-item>
             </q-intersection>
           </q-list>
           <q-list
             bordered
             separator
             v-else
           >
             <q-intersection
               v-for="(item, index) in Array(20).fill('')"
               :key="index"
               transition="scale"
               class="example-item"
               once
             >
               <q-item>
                 <q-item-section class="q-my-sm">
                   <q-item-label>
                     <q-skeleton type="text" />
                   </q-item-label>
                   <q-item-label caption>
                     <q-skeleton
                       type="text"
                       width="65%"
                     />
                   </q-item-label>
                 </q-item-section>
               </q-item>
             </q-intersection>
           </q-list>
         </q-scroll-area>
       </div>
     </div>
     <div class="col-12 col-md">
       <div class="form-view">
         <component
           v-if="formName"
           :taskInfo="task"
           :is="formName"
         />
         <div
           v-else
           class="flex items-top justify-center"
         >
           <span class="text-h5 text-grey-5">محل نمایش جزئیات فرم ها</span>
         </div>
       </div>
     </div>
   </div>-->

    <!-- <safa-datatable
    :selectable="false"
    :columns="formListColumns.columns"
    v-model="formList"
    :bordered="false"
    @formsClick="formsClick"
  >
  </safa-datatable>
  <ShowModal
    v-model="showForm"
    vertical
  >
    <div
      class="fit overflow-hidden"
      id="forms__container"
    >
      <component
        :hideNosaziCodeHeader="true"
        :is="formName"
        @load="fixFormWrapper"
        :taskInfo="task"
      />
    </div>
  </ShowModal> -->
  </fit>
</template>

<script>
// import formUrls from '../models/formUrls'
import baseFormMixin from "src/mixins/baseFormMixin"

const responderForms = [
  {
    title: "ابلاغیه کمیسیون",
    formKey: "UEblaghyeComision"
  },
  {
    title: "ارجاع پرونده به مهندس",
    formKey: "UReferFileToEngineer"
  },
  {
    title: "استعلام اداره برق", // هنوز پیاده نشده است
    formKey: ""
  },
  {
    title: "اصلاحیه توافق نامه",
    formKey: ""
  },
  {
    title: "اطلاعات بازدید",
    formKey: "URevisitInfo"
  },
  {
    title: "اعلام ضابطه",
    formKey: "UElameZabete"
  },
  {
    title: "اعلام مامور بازدید",
    formKey: "URevisitAgentAssign"
  },
  {
    title: "بروکف",
    formKey: "UBaroKafTabs"
  },
  {
    title: "پاسخ استعلام",
    formKey: "InquiryAnswer"
  },
  {
    title: "پایانکار",
    formKey: "Payankar"
  },
  {
    title: "پیش نویس پروانه",
    formKey: ""
  },
  {
    title: " پیش نویس عدم خلاف ",
    formKey: ""
  },
  {
    title: "پروانه",
    formKey: "Parvaneh"
  },
  {
    title: "پیش نویس کمیسیون",
    formKey: "CommissionDraft"
  },
  {
    title: "تاریخچه مالکین", // پیاده نشده
    formKey: "TabOwnerHistory"
  },
  {
    title: "تایید مدیران",
    formKey: "ApprovalManager"
  },
  {
    title: "تایید مکاتبات",
    formKey: "UMokatebatConfirm"
  },
  {
    title: "آرشیو تبلت",
    formKey: "ArchiveTablet"
  },
  {
    title: "تحلیل پروانه ساختمان",
    formKey: "UAnalysisParvaneh"
  },
  {
    title: "تحلیل تعیین خلاف ساختمان",
    formKey: "UAnalysisMissFoul"
  },
  {
    title: "تحلیل موافقت اصولی ساختمان",
    formKey: "UAnalysisMovafeghatOsooli"
  },
  {
    title: "تعیین کدهای عوارضی",
    formKey: "DutyCodes"
  },
  {
    title: "تغییر شناسنامه وضع موجود", // هنوز پیاده نشده
    formKey: ""
  },
  {
    title: "تغییر ضابطه", // هنوز پیاده نشده
    formKey: ""
  },
  {
    title: "تمدید توافق نامه",
    formKey: ""
  },
  {
    title: "توافقنامه",
    formKey: "UAgreementTabs"
  },
  {
    title: "توافقنامه تراکم تشویقی",
    formKey: ""
  },
  {
    title: "دستور نقشه",
    formKey: "UMapCommandTabs"
  },
  // #851
  // {
  //   title: 'توضیحات درخواست',
  //   formKey: 'UTaskDescription'
  // },
  {
    title: "جریمه / لایحه کمیسیون",
    formKey: "CommissionFine"
  },
  {
    title: "چک لیست ادارات", // هنوز پیاده نشده
    formKey: ""
  },
  {
    title: "دبیرخانه مهندسین",
    formKey: "UDabirkhaneEngineer"
  },
  {
    title: "درآمد",
    formKey: "UIncome"
  },
  {
    title: "تقسیط درآمد",
    formKey: "UIncomeInstallment"
  },
  {
    title: "گزارش تقسیط",
    formKey: ""
  },
  {
    title: "شناسنامه فنی ساختمان",
    formKey: ""
  },
  {
    title: "صلحنامه",
    formKey: "UPeace"
  },
  {
    title: "طرح ها",
    formKey: "Patterns"
  },
  {
    title: "کنترل املاک",
    formKey: ""
  },
  {
    title: "فضای سبز",
    formKey: "GreenSpace"
  },
  {
    title: "کنترل نقشه",
    formKey: "UMapControlTabs"
  },
  {
    title: "گزارش بازدید عرصه",
    formKey: ""
  },
  {
    title: "گزارش بازدید ساختمان",
    formKey: ""
  },
  {
    title: "گزارش بازدید آپارتمان",
    formKey: ""
  },
  {
    title: "گزارش بازدید صنفی",
    formKey: ""
  },
  {
    title: "گزارش تاییدات ناظرین",
    formKey: ""
  },
  {
    title: "گزارش تحلیل پروانه",
    formKey: ""
  },
  {
    title: "گزارش تحلیل تعیین خلاف",
    formKey: ""
  },
  {
    title: "گزارش تحلیل موافقت اصولی",
    formKey: ""
  },
  {
    title: "گزارش توضیحات درخواست",
    formKey: ""
  },
  {
    title: "گزارش توافقنامه",
    formKey: ""
  },
  {
    title: "گزارش جریمه لایحه",
    formKey: ""
  },
  {
    title: "گزارش دستور کمیسیون ماده صد",
    formKey: ""
  },
  {
    title: "گزارش دستور نقشه",
    formKey: ""
  },
  {
    title: "گزارش شناسنامه فنی ساختمان",
    formKey: ""
  },
  {
    title: "گزارش کنترل نقشه",
    formKey: ""
  },
  {
    title: "گزارش مامور بازدید",
    formKey: ""
  },
  {
    title: "گزارش موافقت اصولی",
    formKey: ""
  },
  {
    title: "گزارش مفاصا",
    formKey: ""
  },
  {
    title: "گواهی عدم خلاف",
    formKey: "CertificateOfContrary"
  },
  {
    title: "لیست موافقت اصولی",
    formKey: "UMovafeghatOsooliListTabs"
  },
  {
    title: "محاسبات توافق نامه",
    formKey: ""
  },
  {
    title: "مشخصات کمیسیون",
    formKey: "UMoshakhasatCommission"
  },
  {
    title: "نحوه تفکیک عرصه",
    formKey: "UHowToSeperateArse"
  },
  {
    title: "موافقت اصولی",
    formKey: "PrincipalAgreement"
  },
  {
    title: "گزارش بازدید دستگاه",
    formKey: ""
  },
  {
    title: "گزارش آرشیو بازدید تبلت",
    formKey: ""
  },
  {
    title: "گزارش فاکتور خدمات بازدید",
    formKey: ""
  },
  {
    title: "گزارش ثبت درخواست",
    formKey: ""
  },
  {
    title: "گزارش فاکتور خدمات فنی-اداری",
    formKey: ""
  },
  {
    title: "گزارش فاکتور بروکف",
    formKey: ""
  },

  {
    title: "هیات پارکینگ",
    formKey: "ParkingStaff"
  },

  {
    title: "نقشه برداری",
    formKey: "UServey"
  },
  {
    title: "ویرایش اطلاعات درخواست",
    formKey: "EditRequestInfo"
  }
]

export default {
  name: "ResponderFormsOffice",
  mixins: [baseFormMixin],
  data () {
    return {
      formList: responderForms,
      searchTerm: "",
      tmpForms: [],
      selectedForm: null,
      selectedReport: null
    }
  },
  props: {
    title: String,
    formKey: String,
    name: String
  },
  computed: {
    innerBtn () {
      if (this.formName === "UIncome") {
        return false
      }
      if (this.formName === "UElameZabete") {
        return false
      }
      return null
    },
    readonlyMode () {
      return (
        this.formName !== "UIncome" &&
        this.formName !== "UElameZabete" &&
        this.formName !== "URevisitInfo"
      )
    },
    getBtn () {
      if (this.formName === "UIncome") {
        return ["rizMohasebe", "mojazDararmd"]
      }
      if (this.formName === "UElameZabete") {
        return ["print"]
      }
      return [""]
    },
    formName () {
      if (!this.selectedForm || !this.selectedForm.formKey) return ""
      return this.selectedForm.formKey
    },
    reportName () {
      if (!this.selectedReport || !this.selectedReport.formKey) return ""
      return this.selectedReport.formKey
    },
    selectedTaskInfo () {
      if (!this.taskInfo) return {}
      return { ...this.taskInfo, BizCode: this.taskInfo.NosaziCode }
    }
  },

  methods: {
    async selectForm (form) {
      this.selectedForm = form
      this.$emit("resetSelectedMainKartable")
      console.log("seleced-form", form)
      this.$nextTick(() => {
        this.fixFormWrapper()
      })
      setTimeout(() => {
        this.fixFormWrapper()
        setTimeout(() => {
          this.fixFormWrapper()
        }, 3000)
        this.$nextTick(() => {
          this.removeNosaziCodeBox()
        })
      }, 50)
      const queryParams = {
        NidProc: this.taskInfo.NidProc,
        IsResponderForm: 1,
        District: this.taskInfo.District
      }
      const parameter = {
        NidProc: this.taskInfo.NidProc,
        District: this.taskInfo.District,
        NIdUser: this.getNidUser()
      }
      if (form.title === "گزارش بازدید عرصه") {
        const reportPath = "/Sara8Reports/RptRevisitHouse"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش بازدید ساختمان") {
        const reportPath = "/Sara8Reports/RptRevisitBuilding"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش تقسیط") {
        const reportPath = "/Sara8Reports/RptInstallment_Income"
        const queryIncomeParams = {
          NidProc: this.taskInfo.NidProc,
          // NidFiche: this.selectedRow.NidFiche,
          District: this.taskInfo.District,
          RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@99@80",
          NIdUser: this.getNidUser()
        }
        this.showReport(reportPath, queryIncomeParams)
        await this.log({
          action: this.logActions.printReport,
          bizCode: this.taskInfo.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.taskInfo.BizCode,
          nidWorkItem: this.taskInfo.NidWorkItem
        })
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش بازدید دستگاه") {
        const reportPath = "/Sara8Reports/RptRevisitHouseSharing"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش بازدید آپارتمان") {
        const reportPath = "/Sara8Reports/RptRevisitApartment"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش بازدید صنفی") {
        const reportPath = "/Sara8Reports/RptRevisitShop"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش تاییدات ناظرین") {
        const reportPath = "/Sara8Reports/RptPayankarSeftkari"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش تحلیل پروانه") {
        const reportPath = "/Sara8Reports/RptTaiinKhalaf_Parvaneh"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش تحلیل تعیین خلاف") {
        const reportPath = "/Sara8Reports/RptTaiinKhalaf_Khalaf"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش تحلیل موافقت اصولی") {
        const reportPath = "/Sara8Reports/RptTaiinKhalaf_MovafeghatOsoli"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش توافقنامه") {
        const reportPath = "/Sara8Reports/RptTavafoghTarakom"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش توضیحات درخواست") {
        const reportPath = "/Sara8Reports/rptRequestComments"
        const params = {
          NidProc: this.taskInfo.NidProc,
          IsResponderForm: 1,
          District: this.taskInfo.District,
          RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@80",
          NIdUser: this.getNidUser()
        }

        this.showReport(reportPath, params)
      } else if (form.title === "گزارش جریمه لایحه") {
        const reportPath = "/Sara8Reports/RptCommission"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش دستور کمیسیون ماده صد") {
        const reportPath = "/Sara8Reports/OrderCommission"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش دستور نقشه") {
        const reportPath = "/Sara8Reports/RptPlanOrder"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش شناسنامه فنی ساختمان") {
        const reportPath = "/Sara8Reports/RptShenasnamehFani"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش کنترل نقشه") {
        const reportPath = "/Sara8Reports/RptPlanControl"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش مامور بازدید") {
        const reportPath = "/Sara8Reports/RptRevisit"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش موافقت اصولی") {
        const reportPath = "/Sara8Reports/RptMovafeghatOsooli"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش آرشیو بازدید تبلت") {
        const reportPath = "/Sara8Reports/RptArchiveTablet"
        const archiveParameter = {
          NidProc: this.taskInfo.NidProc,
          IsResponderForm: 1,
          District: this.taskInfo.District,
          NIdUser: this.getNidUser()
        }
        this.showReport(reportPath, archiveParameter)
      } else if (form.title === "گزارش مفاصا") {
        const reportPath = "/Sara8Reports/RptMafasaHesabIncomeNew"
        this.showReport(reportPath, queryParams)
      } else if (form.title === "گزارش فاکتور خدمات بازدید") {
        const reportPath = "/Sara8Reports/RptFaktor_BazdidSara10"
        this.showReport(reportPath, parameter)
      } else if (form.title === "گزارش ثبت درخواست") {
        const reportPath = "/Sara8Reports/SabteDarkhast_Sara10"
        this.showReport(reportPath, parameter)
      } else if (form.title === "گزارش فاکتور بروکف") {
        const reportPath = "/Sara8Reports/RptFaktor_BarokafSara10"
        this.showReport(reportPath, parameter)
      } else if (form.title === "گزارش فاکتور خدمات فنی-اداری") {
        const reportPath = "/Sara8Reports/RptFaktor_Kargozari10"
        this.showReport(reportPath, parameter)
      } else if (form.title === "اصلاحیه توافق نامه") {
        const reportPath = "/Sara8Reports/RptEslaheiTavfogh"
        this.showReport(reportPath, parameter)
      } else if (form.title === "تمدید توافق نامه") {
        const reportPath = "/Sara8Reports/RptTamdidTavafogh"
        this.showReport(reportPath, parameter)
      } else if (form.title === "توافقنامه تراکم تشویقی") {
        const reportPath = "/Sara8Reports/RptTavafoghTarakomTashvighi"
        this.showReport(reportPath, parameter)
      } else if (form.title === "محاسبات توافق نامه") {
        const reportPath = "/Sara8Reports/RRptMohsebeTavafogh"
        this.showReport(reportPath, parameter)
      } else if (form.title === "پیش نویس پروانه") {
        const reportPath = "/Sara8Reports/RptLicences_Pishnevis"
        this.showReport(reportPath, queryParams)
      } else if (form.title === " پیش نویس عدم خلاف ") {
        const reportPath = "/Sara8Reports/RptFoul_Pishnevis"
        this.showReport(reportPath, queryParams)
      }
    },
    selectReport (report) {
      this.selectedReport = report

      this.$nextTick(() => {
        this.fixFormWrapper()
      })
      setTimeout(() => {
        this.fixFormWrapper()
        setTimeout(() => {
          this.fixFormWrapper()
        }, 3000)
        this.$nextTick(() => {
          this.removeNosaziCodeBox()
        })
      }, 50)
    },
    back () {
      this.$emit("backToMainForm")
    },
    fixFormWrapper () {
      try {
        const formWrapper = document.querySelector(
          ".responder-form .form-wrapper"
        )
        if (!formWrapper) return
        formWrapper.firstElementChild.style.minHeight = `calc(100vh - ${
          formWrapper.getBoundingClientRect().top
        }px)`
      } catch (ex) {
        console.log(ex)
      }
    },
    removeNosaziCodeBox () {
      try {
        const nosaziInputs = document.querySelectorAll(
          ".form-header-by-nosazi-code-wrapper"
        )
        if (nosaziInputs.length > 0) {
          nosaziInputs.forEach((item) => {
            item.remove()
          })
        }
      } catch (ex) {
        console.error(ex)
      }
    },
    // showForm ({ dataItem }) {
    //   // console.log('showForm: ', dataItem)
    //   const { Caption, NidForm = '' } = dataItem || {}
    //   const targetForm = formUrls[NidForm.toUpperCase()]
    //   if (!targetForm) {
    //     this.showWarning(` فرم «${Caption}» تعریف نشده است`)
    //     return
    //   }
    //   if (!targetForm.route) {
    //     this.showWarning(`سیستم برای نمایش فرم «${Caption}» در حال توسعه است`)
    //   }
    //   // const props = targetForm.init(this.task)
    //   // console.log('try to show', { route: targetForm.route, ...props })
    // },
    async load () {
      /* if (
                !this.task.NidProc ||
                this.task.NidProc === '00000000-0000-0000-0000-000000000000'
              ) {
                return
              }
              try {
                this.showLoading()

                this.formList = []
                const { data } = await this.$services.task.getFormList({}, this.config)
                this.result = this.getResponse(data)
                if (this.result.success !== true) {
                  return this.showError('لیست فرمها بارگذاری نشد')
                }
                this.formList = this.result.data
                  .filter(x => x.XapName != null)
                  .filter(x => /UI\.SC\.xap/gi.test(x.XapName)) // Include of "UI.SC.xap"
                  .filter(x => !this.allowedForms.includes(x.FormUrl))

                  // // Join constants and the API fetched
                  .concat(this.formListConstants)

                  // // Order ASC by caption
                  .sort((l, r) =>
                    l.Caption < r.Caption ? -1 : l.Caption > r.Caption ? 1 : 0
                  )

                // end
              } catch (e) {
                console.error(e)
                this.showError('خطایی در سرویس رخ دارد')
              } finally {
                this.hideLoading()
              } */
    }
  },
  watch: {
    searchTerm () {
      if (this.searchTerm === "") {
        this.formList = { ...responderForms }
      } else {
        this.formList = responderForms.filter((x) =>
          x.title.normalizeText().includes(this.searchTerm)
        )
      }
    }
  }
}
</script>
<style lang="scss">
button.ribbon-button.form-button {
  min-width: 78px;

  .rb--label {
    white-space: pre-wrap;
    line-height: 12px;
    display: block;
    width: 100%;
    min-height: 20px;
  }
}

.thumbnail-item {
  padding: 10px 5px 0;
  background-color: rgba(255, 255, 255, 0.8);
  transition: 0.2s all ease;
  width: 90px;
  height: 80px;
  font-size: 11px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  flex-wrap: nowrap;

  &:hover {
    background-color: #fff;
    border-color: var(--q-color-primary);
    transition: 0.2s all ease;
  }

  .th-icon {
    display: block;
    width: 100%;
  }

  .th-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 40px;
    width: 100%;
    margin-top: 5px;
  }
}

.search-wrapper {
  .searchbox {
    position: relative;
    border: 1px solid #bbb;
    border-radius: 3px;
    background: #fff;
    padding: 4px;

    body.body--dark & {
      background: var(--dark);
      border-color: var(--dark-border);
    }

    input {
      flex-grow: 1;
      background-color: transparent;
      border: none;

      body.body--dark & {
        background-color: var(--dark);
        color: var(--dark-text-color);
      }
    }
  }
}
</style>
