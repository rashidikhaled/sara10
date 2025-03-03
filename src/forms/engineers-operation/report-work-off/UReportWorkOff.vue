<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="getOffice_InfoRes" />
        <safa-status :result="getWorkAllowedRes" />
      </template>
      <fit>
        <div class="flex q-gutter-x-sm q-mb-sm">
          <safa-combo2
            ciName="CI_Years"
            domainName="engineer"
            input-debounce="0"
            label="سال"
            v-model="CI_Years"
            cdcName="CI_Years"
            m="e"
            label-width="30px"
          />
          <btn-search @click="loadObj" />
          <btn-default :disabled="disablePrintBtn" label="چاپ" />
        </div>

        <expantion-section
          default-opened
          v-model="expantion1"
          title="اطلاعات مهندس"
        >
          <FormRow :sm="4" :md="4" :lg="4" :xl="4">
            <FormControl>
              <safa-text
                label="سال"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.CI_Years"
                cdcName="CI_Years"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="رشته تحصیلی"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.StudyField"
                cdcName="StudyField"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="ضریب طراحی دفتر"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.MultiplyValueTarahi"
                cdcName="MultiplyValueTarahi"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تعداد کار"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.WorkAllowed"
                cdcName="WorkAllowed"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="کد عضویت"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.IdentityCode"
                cdcName="IdentityCode"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="دفتر جاری"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.OfficeCode"
                cdcName="OfficeCode"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="پایه"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.Base"
                cdcName="Base"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تعدا کار مجاز"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.MaxAllowWork"
                cdcName="MaxAllowWork"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="نام"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.EngName"
                cdcName="EngName"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="نام خانوادگی"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.EngFamily"
                cdcName="EngFamily"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="متراژ باقی مانده کل"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.QtaRemain"
                cdcName="QtaRemain"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="مدیر مسئول"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.OffPresidentName"
                cdcName="OffPresidentName"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="ضریب نظارت دفتر"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.MultiplyValueNezarat"
                cdcName="MultiplyValueNezarat"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="سهمیه باقیمانده 20 درصد"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.Qta20Remain"
                cdcName="Qta20Remain"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="ظرفیت پایه"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.QuotaValue"
                cdcName="QuotaValue"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="صلاحیت"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.AbilityAll"
                cdcName="AbilityAll"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تعداد کار مجاز طراحی"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.MaxDesigningWork"
                cdcName="MaxDesigningWork"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="درصد محدودکننده سهمیه"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.PrecentLimitation"
                cdcName="PrecentLimitation"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تعداد کار مجاز نظارت"
                label-width="125px"
                v-model="rptStatistics_WorkAllowed_Result.MaxSupervisionWork"
                cdcName="MaxSupervisionWork"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تاریخ پایان پروانه اشتغال"
                label-width="125px"
                v-model="
                  rptStatistics_WorkAllowed_Result.JobAgreementExpireDate
                "
                m="r"
              />
            </FormControl>
          </FormRow>
        </expantion-section>

        <safa-grid
          v-model="gridWork"
          cdcName="gridWork"
          :columns="workReportWorkOff"
          m="r"
          fit
          min-height="150px"
          height="100%"
          max-height="100%"
          :showRowNumber="false"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          class="q-mb-sm"
          :suppressRowClickSelection="false"
        />

        <!-- <expantion-section
          default-opened
          v-model="expantion2"
          title="اطلاعات کسر سهمیه"
        > -->
        <safa-grid
          v-model="gvAbility"
          cdcName="gvAbility"
          :columns="gvAbilityReportWorkOff"
          m="r"
          fit
          min-height="150px"
          height="100%"
          max-height="100%"
          :showRowNumber="false"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :suppressRowClickSelection="false"
        />
        <!-- </expantion-section> -->
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: ["value"],
  data () {
    return {
      title: "گزارش کارکرد دفتر",
      formKey: "c4a3d360-7b7e-4a81-bf63-e27fe0c9b6ba",
      name: "UReportWorkOff",
      main: true,

      // Models
      rptStatistics_WorkAllowed_Result: {
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
      expantion1: true,
      // expantion2: true,
      engineerCode: null,
      CI_Years: "1400",

      // Grids
      gvAbility: [],
      gridWork: [],

      disablePrintBtn: true,

      // Response
      getOffice_InfoRes: null,
      getWorkAllowedRes: null,

      workReportWorkOff: [
        {
          field: "NidWorkItem",
          title: "کد ارجاع",
          width: "100px"
        },
        {
          field: "CodeString",
          title: "کد نوسازی",
          width: "100px"
        },
        {
          field: "IsRelease",
          title: "آزاد",
          width: "100px"
        },
        {
          field: "FilesType",
          title: "نوع پرونده",
          width: "100px"
        },
        {
          field: "IsEngExecuter",
          title: "ناظر مجری",
          width: "100px"
        },
        {
          field: "StrNoTownDabir",
          title: "دبیرخانه شهرداری",
          width: "140px"
        },
        {
          field: "CI_Years",
          title: "سال",
          width: "100px"
        },
        {
          field: "RequestType",
          title: "نوع درخواست",
          width: "110px"
        },
        {
          field: "GreenCachetDate",
          title: "تاریخ مهر سبز",
          width: "120px"
        },
        {
          field: "OwnerName",
          title: "نام ونام خانوادگی مالک",
          width: "170px"
        },
        {
          field: "Address",
          title: "آدرس",
          width: "100px"
        },
        {
          field: "Floor",
          title: "سقف",
          width: "100px"
        },
        {
          field: "Infrastructure",
          title: "زیربنا",
          width: "100px"
        },
        {
          field: "DateOfRefrence",
          title: "خروج ازظرفیت",
          width: "120px"
        },
        {
          field: "StudyField",
          title: "فعالیت",
          width: "100px"
        },
        {
          field: "Base",
          title: "پایه",
          width: "100px"
        },
        {
          field: "Ability",
          title: "صلاحیت",
          width: "100px"
        },
        {
          field: "Mete",
          title: "ظرفیت استفاده",
          width: "120px"
        }
      ],
      gvAbilityReportWorkOff: [
        {
          field: "Ability",
          title: "صلاحیت",
          width: "100px"
        },
        {
          field: "ReleaseArea",
          title: "متراژ آزاد شده",
          width: "140px"
        },
        {
          field: "USageArea",
          title: "متراژ استفاده شده",
          width: "140x"
        },
        {
          field: "BaseQta",
          title: "ظرفیت پایه",
          width: "100px"
        }
      ]
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    async loadObj () {
      this.showLoading()
      let payload = {
        pRequest: {
          NidOffice: this.getNidUser()
        }
      }

      await this.$services.eng
        .getOfficeInfo(payload)
        .then(async ({ data }) => {
          this.getOffice_InfoRes = this.getResponse(data)
          if (this.getOffice_InfoRes.success) {
            if (
              this.getOffice_InfoRes.data.GetOffice_InfoResult.ClsOffice !=
                null &&
              this.getOffice_InfoRes.data.GetOffice_InfoResult.ClsOffice
                .Off_Info !== null
            ) {
              this.engineerCode = (
                this.getOffice_InfoRes.data.GetOffice_InfoResult.ClsOffice
                  .Off_Info.OfficeCode || ""
              ).toString()

              this.getWorkInfo()
            }

            await this.log({
              action: this.logActions.view,
              bizCode: this.engineerCode,
              bizCodeTitle: "کد عضویت"
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async getWorkInfo () {
      if (this.engineerCode) {
        this.showLoading()
        let payload = {
          RequestCode: this.engineerCode,
          CI_Years: this.CI_Years,
          TypeRequest: 0
        }
        await this.$services.engineers
          .getWorkAllowed(payload)
          .then(async (response) => {
            this.getWorkAllowedRes = this.getResponse(response.data)
            if (this.getWorkAllowedRes.success) {
              if (
                this.getWorkAllowedRes.data.GetWorkAllowedResult.WorkAllowed !=
                  null &&
                this.getWorkAllowedRes.data.GetWorkAllowedResult.WorkAllowed
                  .ptStatistics_WorkAllowed !== null &&
                this.getWorkAllowedRes.data.GetWorkAllowedResult.WorkAllowed
                  .ptStatistics_WorkAllowed.Count > 0
              ) {
                this.gvAbility =
                  this.getWorkAllowedRes.data.GetWorkAllowedResult.WorkAllowed.EngineerInfo_Ability
                this.disablePrintBtn = false
                this.gridWork.ItemsSource =
                  this.getWorkAllowedRes.data.GetWorkAllowedResult.WorkAllowed.ptStatistics_WorkAllowed

                let tmpitem =
                  this.getWorkAllowedRes.data.GetWorkAllowedResult.WorkAllowed.ptStatistics_WorkAllowed.find(
                    (e) => e
                  )
                this.rptStatistics_WorkAllowed_Result = tmpitem
              } else {
                this.disablePrintBtn = true
                this.showError("اطلاعاتی با این کد یافت نشد.")
              }

              await this.log({
                action: this.logActions.view,
                bizCode: this.engineerCode,
                bizCodeTitle: "کد عضویت"
              })
            }
          })
          .catch((error) => {
            console.error(error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else this.showError("لطفا کد مورد نظر را وارد نمایید.")
    }
  }
}
</script>
