<template>
  <form-wrapper :title="title">
    <template #header>
      <safa-status :result="getWorkAllowedRes" />
      <safa-status :result="getEngineerWithNidEngRes" />
    </template>
    <fit>
      <FormRow>
        <FormControl>
          <safa-combo
            ciName="CI_Years"
            domainName="engineer"
            label="سال کاری"
            v-model="ciYears"
            label-width="80px"
            cdcName="CI_Years"
          />
        </FormControl>
        <div class="q-gutter-sm">
          <btn-search @click="getWorkAllowed" />
          <btn-default label="چاپ" @click="print" />
        </div>
      </FormRow>
      <expantion-section
        default-opened
        v-model="exEngInfo"
        title="اطلاعات مهندس"
      >
        <FormRow>
          <FormControl>
            <safa-text
              label="سال"
              label-width="90px"
              v-model="model.CI_Years"
              cdcName="CI_Years"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="رشته تحصیلی"
              label-width="90px"
              v-model="model.StudyField"
              cdcName="StudyField"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="ضریب طراحی دفتر"
              label-width="90px"
              v-model="model.MultiplyValueTarahi"
              cdcName="MultiplyValueTarahi"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تعداد کار"
              label-width="90px"
              v-model="model.WorkAllowed"
              cdcName="WorkAllowed"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد عضویت"
              label-width="90px"
              v-model="model.IdentityCode"
              cdcName="IdentityCode"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="دفتر جاری"
              label-width="90px"
              v-model="model.OfficeCode"
              cdcName="OfficeCode"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="پایه"
              label-width="90px"
              v-model="model.Base"
              cdcName="Base"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تعدا کار مجاز"
              label-width="90px"
              v-model="model.MaxAllowWork"
              cdcName="MaxAllowWork"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام"
              label-width="90px"
              v-model="model.EngName"
              cdcName="EngName"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام خانوادگی"
              label-width="90px"
              v-model="model.EngFamily"
              cdcName="EngFamily"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="متراژ باقی مانده کل"
              label-width="90px"
              v-model="model.QtaRemain"
              cdcName="QtaRemain"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="مدیر مسئول"
              label-width="90px"
              v-model="model.OffPresidentName"
              cdcName="OffPresidentName"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="ضریب نظارت دفتر"
              label-width="90px"
              v-model="model.MultiplyValueNezarat"
              cdcName="MultiplyValueNezarat"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="سهمیه باقیمانده 20 درصد"
              label-width="90px"
              v-model="model.Qta20Remain"
              cdcName="Qta20Remain"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="ظرفیت پایه"
              label-width="90px"
              v-model="model.QuotaValue"
              cdcName="QuotaValue"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="صلاحیت"
              label-width="90px"
              v-model="model.AbilityAll"
              cdcName="AbilityAll"
              m="r"
            />
          </FormControl>
          <!--
          <FormControl>
            <safa-text
            label="تعداد کار مجاز طراحی"
            label-width="90px"
            v-model="model.MaxDesigningWork"
            cdcName="MaxDesigningWork"
            m="r"
          />
          </FormControl>
           -->
          <FormControl>
            <safa-text
              label="درصد محدودکننده سهمیه"
              label-width="90px"
              v-model="model.PrecentLimitation"
              cdcName="PrecentLimitation"
              m="r"
            />
          </FormControl>
          <!--
          <FormControl>
             <safa-text
            label="تعداد کار مجاز نظارت"
            label-width="90px"
            v-model="model.MaxSupervisionWork"
            cdcName="MaxSupervisionWork"
            m="r"
          />
          </FormControl>
          -->
          <FormControl>
            <safa-text
              label="تاریخ پایان پروانه اشتغال"
              label-width="90px"
              v-model="model.JobAgreementExpireDate"
              cdcName="JobAgreementExpireDate"
              m="r"
            />
          </FormControl>
        </FormRow>
      </expantion-section>
      <safa-tabs
        v-model="currentTab"
        type="fixed"
        class="fit"
        :bordered="false"
        :padding="false"
      >
        <template v-slot:tabs>
          <tab-menu name="perfRep_tab" label="گزارش کارکرد" />
          <tab-menu name="workAllowedm_tab" label="لیست کارها" />
        </template>
        <tab-content name="perfRep_tab">
          <fit>
            <safa-splitter
              class="fit"
              vartical
              margin="0"
              v-model="splitterValue"
            >
              <template v-slot:before>
                <fit>
                  <safa-datatable
                    title="گروه بندی"
                    helper="statisticsWorkAllowed"
                    v-model="
                      getWorkAllowedResult.WorkAllowed.ptStatistics_WorkAllowed
                    "
                    m="r"
                    fit
                    height="100%"
                    max-height="100%"
                    min-height="100px"
                    :show-selected-checkbox="true"
                    :allowMultipleSelection="false"
                    :addRow="false"
                    :deleteRow="false"
                    :allowCopy="false"
                    paginate
                  />
                </fit>
              </template>
              <template v-slot:after>
                <fit>
                  <safa-datatable
                    title="اطلاعات کسر سهمیه"
                    v-model="
                      getWorkAllowedResult.WorkAllowed.EngineerInfo_Ability
                    "
                    helper="engineerInfoAbility"
                    fit
                    m="r"
                    height="100%"
                    max-height="100%"
                    min-height="100px"
                    :show-selected-checkbox="true"
                    :allowMultipleSelection="false"
                    :addRow="false"
                    :deleteRow="false"
                    :allowCopy="false"
                    paginate
                  />
                </fit>
              </template>
            </safa-splitter>
          </fit>
        </tab-content>
        <tab-content name="workAllowedm_tab">
          <fit>
            <safa-datatable
              title="لیست کارهای شمارش شده"
              v-model="getWorkAllowedmResult"
              helper="workAllowedm"
              m="r"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :show-selected-checkbox="true"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              paginate
            />
          </fit>
        </tab-content>
      </safa-tabs>
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UOperationReport",
      title: "گزارش عملکرد",
      formKey: "cbc55f04-6f57-40bc-8d5f-6a3c20dea773",
      main: true,

      // #services
      getEngineerWithNidEngRes: null,
      getWorkAllowedRes: null,

      // #variables
      currentTab: "perfRep_tab",
      exEngInfo: true,
      splitterValue: 70,

      model: {
        CI_Years: "",
        StudyField: "",
        MultiplyValueTarahi: "",
        WorkAllowed: "",
        IdentityCode: "",
        OfficeCode: "",
        Base: "",
        MaxAllowWork: "",
        EngName: "",
        EngFamily: "",
        QtaRemain: "",
        OffPresidentName: "",
        MultiplyValueNezarat: "",
        Qta20Remain: "",
        QuotaValue: "",
        AbilityAll: "",
        MaxDesigningWork: "",
        PrecentLimitation: "",
        MaxSupervisionWork: "",
        JobAgreementExpireDate: ""
      },
      getWorkAllowedResult: {
        WorkAllowed: {
          CI_Years: 0,
          EngineerInfo_Ability: [],
          ptStatistics_WorkAllowed: []
        }
      },
      getWorkAllowedmResult: [],
      ciYears: 0
    }
  },
  created () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.engineers.getEngineerWithNidEng({
          pRequest: {
            CI_RequestType: 0,
            CI_Years: this.ciYears,
            NidEngineer: this.currentUser.NidUser
          }
        })
        this.getEngineerWithNidEngRes = this.getResponse(data)
        if (this.getEngineerWithNidEngRes.success) {
          this.model =
            this.getEngineerWithNidEngRes.data.GetEngineerWithNidEngResult.Eng_Info
          if (this.model.IdentityCode) await this.getWorkAllowed()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getWorkAllowed () {
      this.currentTab = "perfRep_tab"
      if (!this.model.IdentityCode) return
      try {
        const { data } = await this.$services.engineers.getWorkAllowed({
          RequestCode: this.model.IdentityCode,
          CI_Years: this.ciYears,
          TypeRequest: 0
        })
        this.getWorkAllowedRes = this.getResponse(data)
        if (this.getWorkAllowedRes.success) {
          this.getWorkAllowedResult =
            this.getWorkAllowedRes.data.GetWorkAllowedResult
          if (
            this.getWorkAllowedResult?.WorkAllowed?.ptStatistics_WorkAllowed &&
            this.getWorkAllowedResult?.WorkAllowed?.ptStatistics_WorkAllowed
              .length > 0
          ) {
            this.model =
              this.getWorkAllowedResult.WorkAllowed.ptStatistics_WorkAllowed[0]
          }
          await this.getWorkAllowedm()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getWorkAllowedm () {
      if (!this.model.IdentityCode) return
      try {
        this.showLoading()
        const { data } = await this.$services.engineers.getWorkAllowedm({
          pIdentityCode: this.model.IdentityCode
        })
        this.getWorkAllowedmRes = this.getResponse(data)
        if (this.getWorkAllowedmRes.success) {
          this.getWorkAllowedmResult =
            this.getWorkAllowedmRes.data.GetWorkAllowedmResult
          await this.log({
            action: this.logActions.view,
            bizCode: this.model.IdentityCode,
            bizCodeTitle: "کد عضویت"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async print () {
      // const reportPath =
      //   "/Engineers/Engineer_Statistics_Rpt/RptStatistics_WorkAllowed"
      const reportPath = `${window.getConfigValue('engineersConfig.reportPath')}/Engineer_Statistics_Rpt/RptStatistics_WorkAllowed`
      const queryParams = {
        Code: this.model.IdentityCode,
        Years: this.ciYears,
        Type: 0
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.model.IdentityCode,
        bizCodeTitle: "کد عضویت"
      })
    }
  }
}
</script>
