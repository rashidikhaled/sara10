<template>
  <fit>
    <div
      class="fit relative-position"
      id="responder-forms"
    >
      <fit>
        <div class="responder-header q-pa-sm">
          <div class="search-wrapper q-mb-sm">
            <div class="searchbox flex items-center">
              <input
                placeholder="جستجو ..."
                type="text"
                v-model="searchTerm"
              />
              <transition name="fade">
                <q-icon
                  @click="searchTerm=''"
                  class="s-close cursor-pointer"
                  v-show="searchTerm.trim().length>0"
                  name="close"
                  size="22px"
                />
              </transition>
              <q-icon
                class="s-search"
                name="search"
                size="22px"
              />
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
                          d="M57,7H7a5,5,0,0,0-5,5V52a5,5,0,0,0,5,5H57a5,5,0,0,0,5-5V12A5,5,0,0,0,57,7ZM29,12a2,2,0,1,1-2,2A2,2,0,0,1,29,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,20,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,11,12ZM60,52a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V20H60Z"/>
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
        <div
          class="responder-form fit"
          v-if="selectedForm"
        >
          <component
            :isSelectFromWorkflow="false"
            :isSelectFromMenu="false"
            :isSelectFromResponder="true"
            :force-readonly="readonlyMode"
            :actionButtons="getBtn"
            :showInnerBtn="innerBtn"
            :is="formName"
            :taskInfo="taskInfo"
            @load="fixFormWrapper"
            v-if="formName"
          />
        </div>
        <div
          class="responder-report fit"
          v-else-if="selectedReport"
        >
          <!-- <component
         v-if="reportName"
         :taskInfo="taskInfo"
         :is="reportName"
       />-->
        </div>
        <div
          :class="['fit flex items-center justify-center text-body1', $q.dark.isActive?'bg-dark text-light' : 'bg-grey-2 text-grey']"
          v-else
        >
          <q-icon
            color="blue"
            name="warning"
            size="md"
          />&nbsp; هنوز فرمی انتخاب نشده
          است.
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
import baseFormMixin from 'src/mixins/baseFormMixin'

const responderForms = [
  {
    title: 'ابلاغیه کمیسیون',
    formKey: 'UEblaghyeComision'
  },
  {
    title: 'ارجاع پرونده به مهندس',
    formKey: 'UReferFileToEngineer'
  },

  {
    title: 'اطلاعات بازدید',
    formKey: 'URevisitInfo'
  },
  {
    title: 'اعلام ضابطه',
    formKey: 'UElameZabete'
  },
  {
    title: 'اعلام مامور بازدید',
    formKey: 'URevisitAgentAssign'
  },
  {
    title: 'پاسخ استعلام',
    formKey: 'InquiryAnswer'
  },
  {
    title: 'پایانکار',
    formKey: 'Payankar'
  },
  {
    title: 'پروانه',
    formKey: 'Parvaneh'
  },
  {
    title: 'پیش نویس کمیسیون',
    formKey: 'CommissionDraft'
  },
  {
    title: 'تاریخچه مالکین',
    formKey: ''
  },
  {
    title: 'تایید مدیران',
    formKey: 'ApprovalManager'
  },
  {
    title: 'تایید مکاتبات',
    formKey: 'UMokatebatConfirm'
  },
  {
    title: 'آرشیو تبلت',
    formKey: 'ArchiveTablet'
  },
  {
    title: 'تحلیل پروانه ساختمان',
    formKey: 'UAnalysisParvaneh'
  },
  {
    title: 'تحلیل تعیین خلاف ساختمان',
    formKey: 'UAnalysisMissFoul'
  },
  {
    title: 'تحلیل موافقت اصولی ساختمان',
    formKey: 'UAnalysisMovafeghatOsooli'
  },
  {
    title: 'تعیین کدهای عوارضی',
    formKey: 'DutyCodes'
  },
  {
    title: 'توافقنامه',
    formKey: 'UAgreementTabs'
  },
  {
    title: 'توضیحات درخواست',
    formKey: 'UTaskDescription'
  },
  {
    title: 'جریمه / لایحه کمیسیون',
    formKey: 'CommissionFine'
  },
  {
    title: 'دبیرخانه مهندسین',
    formKey: 'UDabirkhaneEngineer'
  },
  {
    title: 'درآمد',
    formKey: 'UIncome'
  },
  {
    title: 'شناسنامه فنی ساختمان',
    formKey: ''
  },
  {
    title: 'صلحنامه',
    formKey: 'UPeace'
  },
  {
    title: 'طرح ها',
    formKey: 'Patterns'
  },
  {
    title: 'کنترل نقشه',
    formKey: 'UMapControlTabs'
  },
  {
    title: 'گزارش بازدید عرصه',
    formKey: ''
  },
  {
    title: 'گزارش بازدید آپارتمان',
    formKey: ''
  },
  {
    title: 'گزارش بازدید ساختمان',
    formKey: ''
  },
  {
    title: 'گزارش تحلیل پروانه',
    formKey: ''
  },
  {
    title: 'گزارش تحلیل تعیین خلاف',
    formKey: ''
  },
  {
    title: 'گزارش تحلیل موافقت اصولی',
    formKey: ''
  },
  {
    title: 'گزارش توضیحات درخواست',
    formKey: ''
  },
  {
    title: 'گزارش جریمه لایحه',
    formKey: ''
  },
  {
    title: 'گزارش دستور کمیسیون ماده صد',
    formKey: ''
  },
  {
    title: 'گزارش دستور نقشه',
    formKey: ''
  },
  {
    title: 'گزارش کنترل نقشه',
    formKey: ''
  },
  {
    title: 'گزارش مامور بازدید',
    formKey: ''
  },
  {
    title: 'گزارش موافقت اصولی',
    formKey: ''
  },
  {
    title: 'گواهی عدم خلاف',
    formKey: 'CertificateOfContrary'
  },
  {
    title: 'لیست موافقت اصولی',
    formKey: 'UMovafeghatOsooliListTabs'
  },
  {
    title: 'مشخصات کمیسیون',
    formKey: 'UMoshakhasatCommission'
  },
  {
    title: 'موافقت اصولی',
    formKey: 'PrincipalAgreement'
  },
  {
    title: 'نحوه تفکیک عرصه',
    formKey: 'UHowToSeperateArse'
  },
  {
    title: 'نقشه برداری',
    formKey: 'UServey'
  },
  {
    title: 'ویرایش اطلاعات درخواست',
    formKey: 'EditRequestInfo'
  },
  {
    title: 'هیات پارکینگ',
    formKey: 'ParkingStaff'
  }
]

export default {
  name: 'ResponderFormsRevisit',
  mixins: [baseFormMixin],
  data () {
    return {
      formList: responderForms,
      selectedForm: null,
      selectedReport: null,
      searchTerm: ''
    }
  },

  computed: {
    innerBtn () {
      if (this.formName === 'UIncome') {
        return false
      }
      return null
    },
    readonlyMode () {
      return this.formName !== 'UIncome'
    },
    getBtn () {
      if (this.formName === 'UIncome') {
        return ['rizMohasebe', 'mojazDararmd']
      }
      return ['']
    },
    formName () {
      if (!this.selectedForm || !this.selectedForm.formKey) return ''
      return this.selectedForm.formKey
    },
    reportName () {
      if (!this.selectedReport || !this.selectedReport.formKey) return ''
      return this.selectedReport.formKey
    }
  },

  methods: {
    selectForm (form) {
      this.selectedForm = form

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
      if (form.title === 'گزارش بازدید عرصه') {
        const reportPath =
          '/Sara8Reports/RptRevisitHouse'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش تحلیل پروانه') {
        const reportPath =
          '/Sara8Reports/RptTaiinKhalaf_Parvaneh'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش بازدید آپارتمان') {
        const reportPath =
          '/Sara8Reports/RptRevisitApartment'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش بازدید دستگاه') {
        const reportPath =
          '/Sara8Reports/RptRevisitHouseSharing'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش بازدید ساختمان') {
        const reportPath =
          '/Sara8Reports/RptRevisitBuilding'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش تحلیل تعیین خلاف') {
        const reportPath =
          '/Sara8Reports/RptTaiinKhalaf_Khalaf'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش تحلیل موافقت اصولی') {
        const reportPath =
          '/Sara8Reports/RptTaiinKhalaf_MovafeghatOsoli'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش توضیحات درخواست') {
        const reportPath =
          '/Sara8Reports/rptRequestComments'
        const params = {
          NidProc: this.taskInfo.NidProc,
          IsResponderForm: 1,
          District: this.taskInfo.District,
          RptDomain: '1@2@3@4@5@6@7@8@9@10@11@12@80',
          NIdUser: this.getNidUser()
        }
        this.showReport(reportPath, params)
      } else if (form.title === 'گزارش جریمه لایحه') {
        const reportPath =
          '/Sara8Reports/RptCommission'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش دستور کمیسیون ماده صد') {
        const reportPath =
          '/Sara8Reports/OrderCommission'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش دستور نقشه') {
        const reportPath =
          '/Sara8Reports/RptPlanOrder'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش کنترل نقشه') {
        const reportPath =
          '/Sara8Reports/RptPlanControl'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش مامور بازدید') {
        const reportPath =
          '/Sara8Reports/RptRevisit'
        this.showReport(reportPath, queryParams)
      } else if (form.title === 'گزارش موافقت اصولی') {
        const reportPath =
          '/Sara8Reports/RptMovafeghatOsooli'
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
      this.$emit('backToMainForm')
    },
    fixFormWrapper () {
      try {
        const formWrapper = document.querySelector(
          '.responder-form .form-wrapper'
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
          '.form-header-by-nosazi-code-wrapper'
        )
        if (nosaziInputs.length > 0) {
          nosaziInputs.forEach(item => {
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
      if (this.searchTerm === '') {
        this.formList = { ...responderForms }
      } else {
        this.formList = responderForms.filter(x =>
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
</style>
