<template>
  <fit>
    <div class="q-pa-sm">
      <internal-section class="q-mb-md" title="فیش پرداختی">
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <safa-text
              v-model="dataContext.mainContext.Base_Info.LastFiche_FicheNo"
              label="شماره آخرین فیش پرداختی نوسازی :"
              label-width="175px"
              :m="m"
            />
          </div>
          <div class="col-12 col-md-6">
            <safa-datepicker
              v-model="dataContext.mainContext.Base_Info.LastFiche_PaymentDate"
              label="تاریخ پرداخت :"
              label-width="80px"
              :m="m"
            />
          </div>
          <div class="col-12 col-md-6">
            <safa-text
              v-model="dataContext.mainContext.Base_Info.LastFiche_Credit"
              label="مبلغ پرداختی :"
              label-width="80px"
              :m="m"
            />
          </div>
        </div>
      </internal-section>

      <internal-section class="q-mb-md" title="مفاصا حساب">
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <safa-text
              v-model="dataContext.mainContext.Base_Info.LastMafasa"
              label="آخرین مفاصا حساب نوسازی :"
              label-width="145px"
              :m="m"
            />
          </div>
          <div class="col-12 col-md-6">
            <safa-datepicker
              v-model="dataContext.mainContext.Base_Info.LastMafasa_Date"
              label="تاریخ صدور :"
              label-width="80px"
              :m="m"
            />
          </div>
          <div class="col-12 col-md-6">
            <safa-text
              v-model="dataContext.mainContext.Base_Info.LastMafasa_Value"
              label="مبلغ :"
              label-width="80px"
              :m="m"
            />
          </div>
        </div>
      </internal-section>

      <internal-section class="q-mb-md" title="فیش اصناف">
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <safa-text
              v-model="dataContext.mainContext.Base_Info.LastFiche_FicheNoSenfi"
              label="شماره آخرین فیش پرداختی اصناف :"
              label-width="145px"
              :m="m"
            />
          </div>
          <div class="col-12 col-md-6">
            <safa-datepicker
              v-model="
                dataContext.mainContext.Base_Info.LastFiche_PaymentDateSenfi
              "
              label="تاریخ پرداخت :"
              label-width="80px"
              :m="m"
            />
          </div>
          <div class="col-12 col-md-6">
            <safa-text
              v-model="dataContext.mainContext.Base_Info.LastFiche_CreditSenfi"
              label="مبلغ پرداختی :"
              label-width="80px"
              :m="m"
            />
          </div>
        </div>
      </internal-section>

      <internal-section class="q-mb-md" title="اطلاعات تکمیلی">
        <form-row :xs="1" :sm="2" :md="2" :lg="3" :xl="3">
          <form-control>
            <safa-datepicker
              v-model="dataContext.mainContext.Base_Info.JobOwnerBirthDate"
              label="تاریخ تولد یا سال تاسیس :"
              label-width="130px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.JobOwnerName"
              label="نام :"
              label-width="130px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_JobBeneficiaryType"
              label="نوع بهره بردار :"
              label-width="130px"
              ciName="CI_JobBeneficiaryType"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_JobOwnerType"
              label="نوع مالکیت :"
              label-width="130px"
              ciName="CI_JobOwnerType"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.JobOwnerLastName"
              label="نام خانوادگی :"
              label-width="130px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.JobNationalCode"
              label="کد ملی یا ثبت شرکت :"
              label-width="130px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.JobOwnerFatherName"
              label="نام پدر :"
              label-width="130px"
              :m="m"
            />
          </form-control>
        </form-row>
      </internal-section>

      <internal-section style="margin-bottom: 0 !important" title="پرسشنامه">
        <form-row :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_QuestionnaireType"
              label="وضعیت پرسش نامه :"
              label-width="110px"
              ciName="CI_QuestionnaireType"
              domainName="Survey"
              :m="m"
            />
          </form-control>
          <form-control>
            <text-template
              label="توضیحات :"
              v-model="dataContext.mainContext.Base_Info.Comments"
              :rows="4"
              cdcName="Comments"
              label-width="110px"
              :m="m"
            />
          </form-control>
        </form-row>
      </internal-section>
    </div>
  </fit>
</template>

<script>
export default {
  name: "USearchUTreeInfoUJobOtherInfo",

  props: {
    m: {
      type: String,
      default: "r"
    },
    dataContext: {
      type: Object,
      required: true
    },
    isLoadedFromMenu: Boolean
  },

  data () {
    return {}
  }
}
</script>
