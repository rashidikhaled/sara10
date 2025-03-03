<template>
<fit>
  <safa-form :id="formKey" :caption="title" appId="">
    <form-wrapper :title="title" :padding="true">
        <form-row>
            <form-control>
              <safa-combo
                ciName="CI_Years"
                domainName="engineer"
                label="سال کاری"
                v-model="CI_Years"
                label-width="80px"
                class="col-md-2 col-sm-3"
              />
            </form-control>
          <form-control
            ><btn-default label="بازآوری" @click="loadObj"
          /></form-control>
        </form-row>
        <internal-section title="داشبورد عملکرد">
          <FormRow>
            <FormControl>
              <safa-text label="نام" label-width="100px" v-model="model.Name" />
            </FormControl>
            <FormControl>
              <safa-text
                label="نام خانوادگی"
                label-width="100px"
                v-model="model.Family"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="رشته تحصیلی"
                label-width="100px"
                v-model="model.studyField"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="کد عضویت"
                v-model="model.IdentityCode"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="سال"
                v-model="model.years"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="دفتر جاری"
                v-model="model.OffCode"
                label-width="100px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="مدیر مسئول"
                label-width="100px"
                v-model="model.Manager"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="پایه"
                label-width="100px"
                v-model="model.Base"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="ظرفیت پایه"
                label-width="100px"
                v-model="model.baseCap"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="فعالیت"
                label-width="100px"
                v-model="model.Ability"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تعداد کار"
                label-width="100px"
                v-model="model.jobCount"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تعداد کار مجاز"
                label-width="100px"
                v-model="model.mojazCount"
              />
            </FormControl>
            <form-row>
              <FormControl>
                <safa-text
                  label="تاریخ پایان پروانه اشتغال"
                  label-width="100px"
                  v-model="model.JobAgreementExpireDate"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="درصد محدودکننده سهمیه"
                  label-width="100px"
                  v-model="model.percentLimitation"
                />
              </FormControl>
            </form-row>
          </FormRow>
        </internal-section>

        <internal-section title="عملکرد در 10سال گذشته"> </internal-section>
        <internal-section title="متراژ">
            <div>
              <div class="q-pa-md">
                <form-row id="firstRow">
                  <div class="col col-md-2">نامشخص</div>
                  <div class="col-6 col-md-2">نظارت</div>
                  <div class="col-6 col-md-2">طراحی/محاسبه</div>
                  <div class="col-6 col-md-2">اجرا</div>
                  <div class="col-6 col-md-2">طراح تاسیسات</div>
                </form-row>
                <form-row id="secondRow">
                  <div class="col col-md-2">متراژ آزاد شده</div>
                  <div class="col col-md-2">متراژ آزاد شده</div>
                  <div class="col col-md-2">متراژ آزاد شده</div>
                  <div class="col col-md-2">متراژ آزاد شده</div>
                  <div class="col-6 col-md-2">متراژ آزاد شده</div>
                </form-row>
                <form-row id="thirdRow">
                  <div class="col col-md-2">متراژ استفاده شده</div>
                  <div class="col col-md-2">متراژ استفاده شده</div>
                  <div class="col col-md-2">متراژ استفاده شده</div>
                  <div class="col col-md-2">متراژ استفاده شده</div>
                  <div class="col-6 col-md-2">متراژ استفاده شده</div>
                </form-row>
              </div>
            </div>
        </internal-section>

    </form-wrapper>

  </safa-form>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "داشبورد عملکرد",
      formKey: "b7b54f39-3d69-4a55-905b-0a3db15f174a",
      name: "UDashboardEengineerReference",
      main: true,
      sidebarCompatible: true,
      CI_Years: "",
      getEngineersReportsRes: [],
      JobAgreementExpireDate: "",
      model: {
        Name: "",
        Family: "",
        studyField: "",
        IdentityCode: "",
        years: "",
        OffCode: "",
        Manager: "",
        Base: "",
        baseCap: "",
        Ability: "",
        jobCount: "",
        mojazCount: "",
        JobAgreementExpireDate: "",
        percentLimitation: ""
      }
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()

      this.$services.eng
        .getEngineersReports()
        .then(({ data }) => {
          this.getEngineersReportsRes = this.getResponse(data)
          debugger
          if (this.getEngineersReportsRes.success) {
            this.model =
              this.getEngineersReportsRes.data.GetEngineersReportsResult
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
<style>
#secondRow {
  color: green;
}

#thirdRow {
  color: blue;
}
</style>
