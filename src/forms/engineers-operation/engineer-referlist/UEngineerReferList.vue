<template>
  <safa-form
    appId="90BBA2FE-5569-45B3-9A7B-EB92B3B19CA1"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="getRefWithCodeRes" />
        <safa-status :result="getReferAllRes" />
        <safa-status :result="referFilToEngineerResult" />
        <div class="flex wrap justify-between items-center">
          <span
            :title="`کد عضویت: ${identityCodeInHead || '---'}`"
            class="ellipsis"
            style="max-width: 200px; margin-left: 5px"
          >
            کد عضویت: {{ ` ${identityCodeInHead} , ` || "---" }}
          </span>
          <form-header-by-nosazi-code
            class="col"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            m="r"
            actions
          />
        </div>
      </template>
      <safa-splitter v-model="splitterModel" horizontal>
        <template v-slot:before>
          <fit>
            <FormRow class="q-mb-sm">
              <FormControl>
                <safa-combo
                  :m="mode"
                  label="رشته تحصیلی"
                  label-width="80px"
                  source-type="local"
                  :options="studeyFieldList"
                  v-model="studyField"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  :m="mode"
                  label="صلاحیت"
                  label-width="80px"
                  source-type="local"
                  :options="abilityList"
                  v-model="selectedAbility"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  :m="mode"
                  label="سال"
                  label-width="80px"
                  ciName="CI_Years"
                  domainName="engineer"
                  v-model="filInfo.CI_Years"
                  :sortFunc="sortCombo"
                />
              </FormControl>
              <FormControl>
                <safa-custom-text
                  m="r"
                  label="زیربنا"
                  label-width="80px"
                  v-model="filInfo.infrastructure"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  m="r"
                  label="تعداد سقف"
                  label-width="80px"
                  v-model="filInfo.Floor"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  :m="mode"
                  label="تعداد کار"
                  label-width="80px"
                  dir="ltr"
                />
                <!-- v-model="
                    referEngSave.pRequest.ClsRef_InfoToEngineer.Qta_Info
                      .MaxAllowWork
                  " -->
              </FormControl>
            </FormRow>
            <div class="row q-col-gutter-x-lg">
              <safa-checkbox :m="mode" label="ارجاع آزاد" />
              <!--   v-model="
                  referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.IsFree
                " -->
              <safa-checkbox :m="mode" label="ناظر و مالک یک نفر هستند" />
              <!--     v-model="
                  referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                    .IsEngOwner
                " -->
              <safa-checkbox
                class="col-12 col-md-auto"
                :m="mode"
                label="آیا ناظر مجری است"
              />
              <!--     v-model="
                  referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                    .IsEngExecuter
                " -->
              <safa-checkbox
                class="col-12 col-md-auto"
                :m="mode"
                label="هماهنگ کننده"
              />
              <!--  v-model="
                  referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                    .IsCoordinator
                " -->
              <safa-checkbox
                class="col-12 col-md-auto"
                :m="mode"
                label="تعویض مهندس "
              />
              <!--  v-model="
                  referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                    .IsSwitchEngineer
                " -->
              <!-- <safa-datepicker
                class="col-12 col-md-3"
                :m="mode"
                label="تاریخ تعویض مهندس"
              /> -->
              <!--

 v-show="
                  referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                    .IsSwitchEngineer
                "
                v-model="
                  referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                    .SwitchEngineerDate
                "
               -->
            </div>
            <div class="fit q-my-sm">
              <!--   v-model="
                  referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                    .RefComments
                " -->
              <text-template
                :m="mode"
                :formKey="formKey"
                class="col-12"
                label="توضیحات ارجاع "
                label-width="80px"
                :rows="1"
              />
            </div>
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-datatable
              title="ارجاعات"
              helper="engineerReferListColumns"
              v-model="referAllToEnginee"
              min-height="200px"
              max-height="100%"
              height="100%"
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              @selectedChange="selectReferred"
            />
          </fit>
        </template>
      </safa-splitter>

      <template v-slot:footer>
        <div class="q-gutter-sm">
          <btn-default label="گزارش" @click="reportHandler" />
          <!-- spId="ed6a6ec1-689d-416a-bd0a-e6fd9a97e150" spCaption="گزارش" -->
          <btn-default
            label="تعهد"
            :disable="lockCommitment"
            @click="commitment"
          />
          <!-- spId="10293c7b-feb5-46b1-a075-2ec81120cb88" spCaption="تعهد" -->
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"
// import PersianDate from "persian-date"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],

  data () {
    return {
      name: "UEngineerReferList",
      formKey: "78DAF322-E95E-455F-89CE-1AF92D3115A5",
      title: "ارجاعات پرونده",
      main: true,

      splitterModel: 20,
      getRefWithCodeRes: null,
      getReferAllRes: null,
      filInfo: {
        CI_Ability: 0,
        CI_Base: 0,
        CI_RequestType: 0,
        CI_StudyField: 0,
        CI_Years: 0,
        CodeString: "",
        EngNameFamily: "",
        IdentityCode: null,
        NIdEng: "00000000-0000-0000-0000-000000000000",
        NIdFil: "00000000-0000-0000-0000-000000000000",
        NidProc: "00000000-0000-0000-0000-000000000000",
        NidRef: "00000000-0000-0000-0000-000000000000",
        NidWorkItem: 0,
        OperationStartDate: "",
        OwnerName_Full: "",
        ReferDate: "",
        RegisterPlack: "",
        RequestType: "",
        StrNoTownDabir: null,
        TaskTitle: null,
        infrastructure: 0,
        rowNumber: 0,
        gridKey: "00000000-0000-0000-0000-000000000000"
      },

      studyField: null,
      currentNidFill: null,
      abilityList: [],
      studeyFieldList: [],
      referFilToEngineerResult: null,
      activeTab: "refersTab",
      referAllToEnginee: [],
      allReferToEngineerDel: [],
      selectedReferred: null,
      selectedAbility: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      referFileToEng: [
        {
          field: "IsCommitment",
          title: "تعهد",
          editor: "checkbox",
          width: "40px"
        },
        {
          field: "CommitmentDate",
          title: "تاریخ تعهد",
          editor: "date",
          width: "100px"
        },
        {
          field: "IsFree",
          title: "ارجاع آزاد ",
          editor: "checkbox",
          width: "60px"
        },
        {
          field: "IsDynamic",
          title: "ارجاع پویا",
          editor: "checkbox",
          width: "60px"
        },
        {
          field: "IsCanceled",
          title: "تأیید شده/نشده",
          editor: "checkbox",
          width: "80px"
        },
        {
          field: "IsSwitchEngineer",
          title: "تعویض مهندس",
          editor: "checkbox",
          width: "80px"
        },
        {
          field: "IsCoordinator",
          title: "هماهنگ کننده",
          editor: "checkbox",
          width: "80px"
        },
        {
          field: "IdentityCode",
          title: "کد عضویت",
          width: "100px"
        },
        {
          field: "OfficeCode",
          title: "کد دفتر",
          width: "100px"
        },
        {
          field: "EngName",
          title: "نام",
          width: "120px"
        },
        {
          field: "EngFamily",
          title: "نام خانوادگی",
          width: "150px"
        },
        {
          field: "MobileNo",
          title: "شماره همراه",
          cell: "PhoneNumberTemplate",
          width: "100px"
        },
        {
          field: "CI_Base",
          title: "پایه مهندس",
          editor: "combo",
          domain: "engineer",
          width: "150px"
        },
        {
          field: "StudyField",
          title: "فعالیت",
          width: "150px"
        },
        {
          field: "Ability",
          title: "صلاحیت",
          width: "150px"
        },
        {
          field: "WorkAllowed",
          title: "تعداد کار",
          width: "100px"
        },
        {
          field: "QtaRemain",
          title: "سهمیه باقی مانده",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "Qta20",
          title: "سهمیه 20 درصد ",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "Qta20Remain",
          title: "سهمیه باقیمانده 20 درصد ",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "ApplyPercent",
          title: "درصد",
          width: "80px"
        },
        {
          field: "Metraj",
          title: "متراژ",
          width: "100px"
        },
        {
          field: "DateOfRefrence",
          title: "تاریخ ارجاع",
          editor: "date",
          width: "100px"
        },
        {
          field: "JobAgreementExpireDate",
          title: "تاریخ پایان پروانه اشتغال ",
          editor: "date",
          width: "150px"
        },
        {
          field: "CI_Years",
          title: "سال",
          editor: "combo",
          domain: "engineer",
          width: "100px"
        },
        {
          field: "ReferType",
          title: "نحوه کسر سهمیه",
          width: "100px"
        },
        {
          field: "SwitchEngineerDate",
          title: "تاریخ تعویض مهندس",
          editor: "date",
          width: "100px"
        }
      ],
      lockCommitment: false
    }
  },

  computed: {
    identityCodeInHead () {
      if (this.selectedExecRep) return this.selectedExecRep.IdentityCode
      return "---"
    }
  },

  created () {
    this.loadSettingData()
    if (this.selectedExecRep) {
      console.log("selectedExecRep :>> ", this.selectedExecRep)
      this.getRefWithCode()
    } else {
      this.showError("لطفا یک سطر از کارتابل ارجاعات انتخاب نمایید.")
      this.hideSidebar("UEngineerReferList")
      this.redirectToKartableReferences()
    }
  },

  methods: {
    getRefWithCode () {
      const payload = {
        Prequest: {
          EngineerCode: this.selectedReferred,
          NidFil: this.selectedExecRep.NIdFil
        }
      }
      this.showLoading()
      this.$services.engineers
        .GetRefToEngineerWithEngCode(payload)
        .then(({ data }) => {
          this.getRefWithCodeRes = this.getResponse(data)
          if (this.getRefWithCodeRes.success) {
            const res =
              this.getRefWithCodeRes.data.GetRefToEngineerWithEngCodeResult
            if (res.AllStudyFields.length > 0) {
              this.studeyFieldList = res.AllStudyFields.map((m) => {
                return { ID: m.ID, Title: `${m.Title}` }
              })
              this.studyField = this.studeyFieldList[0].ID
            }
            this.abilityList = res.EngineerAbility
            if (this.abilityList.length > 0) { this.selectedAbility = this.abilityList[0].ID }
            this.getReferAllToEngineer()
          }
        })
        .catch((err) => {
          console.log(err, "err")
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getReferAllToEngineer () {
      const payload = {
        pRequest: {
          EngineerCode: this.selectedExecRep.IdentityCode,
          NidFil: this.selectedExecRep.NIdFil
        }
      }
      this.showLoading()
      this.$services.engineers
        .getReferAllToEngineer(payload)
        .then(({ data }) => {
          this.getReferAllRes = this.getResponse(data)
          if (this.getReferAllRes.success) {
            this.referEng =
              this.getReferAllRes.data.GetReferAllToEngineerResult
            this.filInfo = this.referEng.fil_Info
            this.referAllToEnginee = this.referEng.AllReferToEngineer || []
            this.allReferToEngineerDel =
              this.referEng.AllReferToEngineer_Del || []

            this.baseNosaziCode = convertStringToNosaziCodeObject(
              this.filInfo.CodeString
            )
          }
        })
        .catch((err) => {
          console.log(err, "err")
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    reportHandler () {
      if (this.selectedReferred) {
        this.showError("گزارش پیدا نشد.")
      } else return this.showError("لطفا ردیف مورد نظر را انتخاب نمایید.")
    },

    getReportPath () {
      // try {
      //   let temp = this.selectedReferred;
      //   let tmpReportName = "";
      //   if (temp.CI_StudyField == 3 && temp.CI_Ability == 1)
      //     tmpReportName = ClsCommon.ClsReportSetting.Reports.FirstOrDefault(
      //       (f) => f.ReportName == "RptTaahodNezaratSaze"
      //     ).ReportPath;
      //   else if (temp.CI_StudyField == 3 && temp.CI_Ability == 4)
      //     tmpReportName = ClsCommon.ClsReportSetting.Reports.FirstOrDefault(
      //       (f) => f.ReportName == "RptTaahodMohasebatSaze"
      //     ).ReportPath;
      //   else if (
      //     (temp.CI_StudyField == 4 || temp.CI_StudyField == 5) &&
      //     temp.CI_Ability == 2
      //   )
      //     tmpReportName = ClsCommon.ClsReportSetting.Reports.FirstOrDefault(
      //       (f) => f.ReportName == "RptTaahodTarahiTasisat"
      //     ).ReportPath;
      //   else if (
      //     (temp.CI_StudyField == 4 || temp.CI_StudyField == 5) &&
      //     temp.CI_Ability == 1
      //   )
      //     tmpReportName = ClsCommon.ClsReportSetting.Reports.FirstOrDefault(
      //       (f) => f.ReportName == "RptTaahodNezaratTasisat"
      //     ).ReportPath;
      //   else if (temp.CI_StudyField == 1 && temp.CI_Ability == 2)
      //     tmpReportName = ClsCommon.ClsReportSetting.Reports.FirstOrDefault(
      //       (f) => f.ReportName == "RptTaahodMemari"
      //     ).ReportPath;
      //   else if (temp.CI_StudyField == 1 && temp.CI_Ability == 1)
      //     tmpReportName = ClsCommon.ClsReportSetting.Reports.FirstOrDefault(
      //       (f) => f.ReportName == "RptTaahodNezaratMemari"
      //     ).ReportPath;
      //   else
      //     tmpReportName = ClsCommon.ClsReportSetting.Reports.FirstOrDefault(
      //       (f) => f.ReportName == "RptTaahod"
      //     ).ReportPath;
      //   return tmpReportName;
      // } catch {
      //   Dialog.ClsDialog.ShowMessage("گزارش پیدا نشد");
      //   return "";
      // }
    },

    commitment () {
      if (
        this.selectedReferred.IdentityCode.toLowerCase() !==
        this.selectedReferred.toLowerCase()
      ) {
        return this.showError(
          "ثبت تعهد برای ارجاعات سایرین امکان پذیر نمی باشد"
        )
      }

      this.showConfirm("آیا از ثبت تعهد ردیف مورد نظر اطمینان دارید؟").onOk(
        () => {
          this.showError("گزارش پیدا نشد.")
        }
      )
    },

    selectReferred (e) {
      this.selectedReferred = e.dataItem
    },

    sortCombo (item1, item2) {
      return item2.Title - item1.Title
    },
    async loadSettingData () {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          { key: "EngSetting", defaultValue: { CI_Years_Eng: 1401 } }
        )
        this.filInfo.CI_Years = settings.CI_Years_Eng
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    }
  },

  watch: {
    selectedReferred: {
      handler () {
        this.selectedReferred
          ? (this.lockCommitment = this.selectedReferred.IsCommitment)
          : (this.lockCommitment = true)
      },
      deep: true
    }
  }
}
</script>
