<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <FormWrapper :title="title" :padding="false">
    <fit>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="settings_tab" label="تنظیمات" />
          <tab-menu
            name="gridInfractionsSettings_tab"
            label="تنظیمات گرید تخلفات رای"
          />
          <tab-menu name="printTypeSettings_tab" label="تنظیمات نوع چاپ" />
        </template>

        <tab-content name="settings_tab">
          <Settings v-model="model" :m="mode" />
        </tab-content>
        <tab-content name="gridInfractionsSettings_tab">
          <GridInfractionsSettings
            v-model="model.CommissionGridSetting"
            :m="mode"
          />
        </tab-content>
        <tab-content name="printTypeSettings_tab">
          <PrintTypeSettings
            :title="title"
            :name="name"
            :formKey="formKey"
            v-model="model.CommissionComboPrint"
            @commissionComboPrintUpdate="onCommissionComboPrintUpdate"
            :m="mode"
            ref="printtabRef"
          />
        </tab-content>
      </safa-tabs>
    </fit>
    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="saveData"
      />
    </template>
  </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Settings from "./partials/Settings.vue"
import GridInfractionsSettings from "./partials/GridInfractionsSettings.vue"
import PrintTypeSettings from "./partials/PrintTypeSettings.vue"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  mixins: [baseFormMixin],
  components: {
    Settings,
    GridInfractionsSettings,
    PrintTypeSettings
  },

  data () {
    return {
      title: "تنظیمات کمیسیون",
      name: "UCommissionSettings",
      formKey: "1382a3f3-cf71-4797-bc14-3751cd899f60",
      main: true,

      activeTab: "settings_tab",
      model: {
        IsAcceptTajdidnazar: false,
        IsShowMainKartabl: false,
        IsShowBadviParameter: false,
        HasAutomateCommissionDate: false,
        CmbCommissionDay: 0,
        ChangeMeetingName: false,
        VoteNoFormat: "0",
        InputValueForGhal: false,
        ErrorSelectHoliday: false,
        ReadOnlyExpertFormInVote: false,
        CheckDuplicateTrepassVote: false,
        ScrollTrepassPanel: false,
        IsCheckEmptyVoteTypeDetail: false,
        NotAccessToArchiveInSearchPanel: false,
        NoAgainCalcForEditVote: false,
        ActiveAgentInMultiCommission: false,
        DisableGroupSend: false,
        Coding: false,
        ShowDefaultShahrsaziArchive: false,
        SetCommissionPrintTypeGharar: false,
        CheckCommentsExperts: false,
        Instruction: false,
        IsAddTabArchiveSharsazi: false,
        IsNote: false,
        IsNotEditableVoteValue: false,
        HideIscomplainant: false,
        HideAgnetComments: false,
        IsShowMessegeMeetinginVote: false,
        MessegeMeetinginVote: "مالک/ذینفع درخواست حضور در جلسه را دارد؟",
        HideElamConfirm: false,
        ShowMesasgeOnEditVote: false,
        LockVoteDate: false,
        HideEditMessage: false,
        IsEnableEditCommissionVoteOfAgent: false,
        UpdateCommissionDate: false,
        IsOrderByVoteHistory: false,
        IsEnableEditeVoteNo: false,
        ShowDefaultCommissionArchive: false,
        HideOldCommission: false,
        ActivePrintVotesWhileThreeAgentsApproved: false,
        AddVoteToArchiveThenPrintPreview: false,
        AllKCoeffiecientHasValidation: true,
        AllKCoeffiecientHasValidationMessage: "مقدار ضریب نمیتواند خالی باشد!",
        CommissionGridSetting: {
          Id: true, // کد تخلف
          CI_Years: true, // سال تخلف
          TrepassValue: true, // مقدار تخلف
          CommissionSarghofliValue: true, // ارزش سرقفلي
          MinPenalty: true, // حداقل جريمه
          MaxPenalty: true, // حداکثر جريمه
          TrepassGroupType: true, // گروه تخلف/نوع تخلف
          K: true, // K
          Floor: true, // طبقه
          UsingID: true, // کد گروه کاربري فرعي
          UsingTitle: true, // گروه کاربري فرعي
          UsingGroupTitle: true, // گروه کاربري اصلي موجود
          TrespassDateInMunicipality: true, // تاريخ وقوع تخلف از نظر شهرداري
          TrespassDateInEngineer: true, // تاريخ وقوع تخلف از نظر مهندس ناظر
          TrespassDateHappendNotMelak: true, // تاريخ وقوع خلاف ملاک عمل
          CI_UsingTypeGroupMojaz: true, // گروه کاربري اصلي مجاز
          UrbanIdia: true, // تقاضاي شهردار
          VahedCountMosavab: true, // تعداد واحد موجود
          VahedCountMojaz: true, // تعداد واحد مجاز
          KC: true, // ضريب K
          AreaMojod: true, // متراژ موجود
          AreaMojaz: true, // متراژ مجاز
          Trepass_Comments: true, // توضيحات
          Note: true, // تبصره
          IsComplainant: true, // شاکي دارد/ندارد
          IsRightsBystanders: true, // رعايت حقوق مجاورين
          K_S: true, // K (سوابق)
          TrepassValueAmar: true, // متراژ کسر از آمار
          TrepassStatus: true, // وضعيت تخلف
          KC_S: true, // ضريب K (سوابق)
          VoteType_S: true, // نوع راي (سوابق)
          CI_Commission_S: true, // نوع کميسيون (سوابق)
          CI_CommissionType_S: true, // شماره کمیسیون (سوابق)
          VoteNo_S: true, // شماره راي (سوابق)
          VoteValue_S: true // مبلغ راي (سوابق)
        },
        CommissionComboPrint: []
      }
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    async loadData () {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "commissionSettings",
            defaultValue: this.model,
            nidProc: GLOBAL_SETTINGS_GUID
          }
        )
        this.model = require("src/utils/mergeSettings").default(
          this.model,
          settings
        )
        await this.log({
          action: this.logActions.view,
          bizCode: '',
          bizCodeTitle: "",
          saveDesc: `بارگذاری اطلاعات  ${this.title} انجام گردید.`
        })
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    },
    onCommissionComboPrintUpdate (val) {
      this.model.CommissionComboPrint = val
    },
    async saveData () {
      if (!this.isValidForm()) return
      this.loading = true
      if (this.$refs?.printtabRef) {
        await this.$refs.printtabRef.saveObj()
      }
      try {
        this.$stKartable
          .dispatch("formSettings/saveSettings", {
            key: "commissionSettings",
            value: this.model,
            nidProc: GLOBAL_SETTINGS_GUID
          })
          .then(async (value) => {
            this.showSuccess("تنظیمات با موفقیت ذخیره شد.")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: '',
              bizCodeTitle: "",
              saveDesc: `ذخیره اطلاعات  ${this.title} انجام گردید.`
            })
          })
          .catch((_) => {
            this.showError("خطا در سرویس توضیحات رخ داده است.")
          })
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
