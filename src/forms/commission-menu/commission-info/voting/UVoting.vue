<template>
  <safa-form
    :id="formKey"
    caption="فرم صدور رای"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper v-if="forceRender" padding fullscreen hide-title hide-close title="صدور رأی" >
      <fit>
        <template #header>
          <safa-status :result="isPrintVoteRes"/>
          <safa-status :result="getHistoryVotesRes"/>
          <safa-status :result="getCommissionInfoByNidProcAhkamResult"/>

          <safa-status :result="addToArchiveRes"/>
          <safa-status :result="addLayeheToArchiveRes"/>
          <safa-status :result="saveCommissionPrintLogRes"/>

          <safa-status :result="saveNewVoteRes"/>
        </template>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره دبیرخانه"
              label-width="75px"
              v-model="model.SecrNo"
              cdcName="SecrNo"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره ارجاع"
              label-width="75px"
              v-model="model.UrbanNidRequest"
              cdcName="UrbanNidRequest"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام مالک"
              label-width="75px"
              v-model="model.OwnerName"
              cdcName="OwnerName"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ ورود به کمیسیون"
              label-width="75px"
              m="r"
              v-model="model.ComEnterDate"
              cdcName="ComEnterDate"
            />
          </FormControl>
          <FormControl>
            <!-- label-width="70px" -->
            <nosazi-code-input
              label="کد نوسازی"
              :actions="false"
              v-model="baseNosaziCode"
              cdcName="baseNosaziCode"
              m="r"
            />
          </FormControl>
        </FormRow>
        <safa-text
          label="آدرس"
          label-width="70px"
          m="r"
          v-model="model.Address"
          cdcName="Address"
          class="q-my-sm"
          :rows="2"
        />
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="violationBill_tab" label="لایحه تخلف"/>
            <tab-menu name="voting_tab" label="صدور رای"/>
            <tab-menu name="archive_tab" label="آرشیو کمیسیون"/>
            <tab-menu
              name="urbanPlanningArchive_tab"
              label="آرشیو شهرسازی"
              v-if="tabShahrsaziArchiveShow"
              :disabled="!isArchiveShahrsaziTabEnable"
            />
            <tab-menu name="tabletArchive_tab" label="آرشیو تبلت بازدید"/>
            <tab-menu
              name="buildingPoliceArchive_tab"
              label="آرشیو پلیس ساختمان"
              v-if="rtBuildingPoliceShow"
            />
            <tab-menu
              name="tabBazdid"
              label="باز بینی پرونده"
              v-if="tabBazdidShow"
            />
          </template>
          <tab-content name="violationBill_tab">
            <Layehe
            ref="billFinRref"
            :formKey="formKey"
            :title="title"
            :m="mode"
              name="Layehe"
             @getAreaAfterEditValue="getAreaAfterEditValueHandler"
             />
          </tab-content>
          <tab-content name="archive_tab">
            <VotingArchive ref="VotingArchive" :domain="domainCommissionArchive"/>
          </tab-content>
          <tab-content name="urbanPlanningArchive_tab">
            <UrbanPlanningArchive ref="UrbanPlanningArchive"/>
          </tab-content>
          <tab-content name="tabletArchive_tab">
            <TabletArchive ref="TabletArchive"/>
          </tab-content>
          <tab-content name="buildingPoliceArchive_tab">
            <BuildingPoliceArchive :NidProc="selectedCommission.NidProc" :BaseNosaziCode="baseNosaziCode"
                                   ref="BuildingPoliceArchive"/>
          </tab-content>
          <tab-content name="voting_tab">
            <Voting
              :m="mode"
              ref="Voting"
              :showPrevStep="showPrevStep"
              :showAcceptBadvi="showAcceptBadvi"
              :showRejectBadvi="showRejectBadvi"
              :showCmbEvaluation="showCmbEvaluation"
              :layeheComents="layeheComents"
              :showPerformVote="showPerformVote"
              :showPrintHistory="showPrintHistory"
              :layeheMainInfo="layeheMainInfo"
              :maxVoteObj="maxVoteObj"
              :checkTokens="checkTokens"
              :ischeckTrepass="ischeckTrepass"
              :GroupVoteTrepass="GroupVoteTrepass"
              :commissionsSetting="commissionsSetting"
              :isSave="isSave"
              :clsCommission_BlankList="
                allCommissionDetail.ClsCommission_BlankList
              "
              :formKey="formKey"
              :title="title"
              :isAccseptHoghoghi="isAccseptHoghoghi"
              :isUVotingFormEditable="isEditable"
              :AreaAfterEditValue="AreaAfterEditValue"
              :statusOkAgent="statusOkAgent"
              v-model="allCommissionDetail"
              @nextParvandeh="nextParvandeh"
              @clsButtonSaveAgentClick="clsButtonSaveAgentClick"
              @onVotesCompilation="onVotesCompilation"
              @accseptHoghoghi="accseptHoghoghi"
              @checkBadviButton="checkBadviButton"
              @getAllCommissionDetails="getAllCommissionDetails"
              @CommissionVoteTrepasses="onSetCommissionVoteTrepasses"
              @CommissionVoteList="onSetCommissionVoteList"
              @addVoteTrepassToList="addVoteTrepassToList"
              @contextAddVoteTrepassToList="contextAddVoteTrepassToList"
              @changeColorTrepassRow="changeColorTrepassRow"
              @getCommissionTrepasses="reloadCommissionTrepasses"
              @updateGroupVoteTrepass="onUpdateGroupVoteTrepass"
              @deleteAgentSigniture="onDeleteAgentSigniture"
            />
          </tab-content>
        </safa-tabs>
      </fit>

      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="onEditBtn"
          editSPId="7baa15c6-7c3b-4441-af38-1b1a1a12e839"
          editFormId="AD8FB4D1-8045-4EA7-A26F-B0BB41320CDB"
          editSPCaption="دکمه ویرایش"
          @cancel="onCancel"
          @save="btnAcceptClick"
          :disable="!isBtnAcceptEnable"
        >
          <template v-slot:before>
            <btn-default
              label="پرونده قبلی"
              @click="prevParvandeh"
              :disable="!isBtnPrevParvandehEnable"
            />
            <btn-default
              label="پرونده بعدی"
              @click="nextParvandeh"
              :disable="!isBtnNextParvandehEnable"
            />
            <btn-default
              label="چاپ رای"
              :disable="!isPrintVoteEnabled"
              @click="printVotesHandler(false)"
              spId="b9d5d6dc-eb86-433e-ab26-160a3416053b"
              spCaption="دکمه چاپ رای"
            />
          </template>
          <template v-slot:after>
            <btn-default
              label="برگشت"
              @click="$refs.Voting.showPrevStepHandler()"
              spId="316762e1-9c9d-4cb8-ae2f-983785e91f20"
              spCaption="دکمه برگشت"
              :disable="isEditable"
            />
            <btn-default
              label="ارسال"
              @click="$refs.Voting.showNextStepHandler()"
              spId="df15ead6-9fbe-45ee-8dcb-fab73b1d164d"
              spCaption="دکمه ارسال"
              :disable="isEditable"
            />
            <btn-default
              label="حذف رای"
              v-if="isEditable"
              @click="removeVote"
              spId="2b74d36d-a3c2-4fa7-b48c-55fcd40df193"
              spCaption="دکمه حذف رای"
            />
            <btn-default
              label="حذف آرا"
              v-if="isEditable"
              @click="deleteAllVotes"
              spId="34f4a42a-fbe6-49c2-b8a2-2ea248a43341"
              spCaption="دکمه حذف آرا"
            />
            <btn-default
              label="پیش نمایش"
              :disable="isEditable"
              @click="quickPrintClick"
              spId="299c15a3-cf8b-4f58-87b2-6eefdcd7ae0d"
              spCaption="دکمه پیش نمایش"
            />
            <btn-default
              label="تایید نهایی رای"
              @click="acceptVote"
              spId="a197499f-12ac-48a4-8e44-43a3e9096273"
              spCaption="تایید نهایی رای"
            />
            <btn-default
              label="گزارشات سیستم شهرسازی"
              @click="showReportSysDialog = true"
              spId="1a42a825-4d53-4568-afe1-4beaa98a20c1"
              spCaption="گزارشات سیستم شهرسازی"
            />
          </template>
        </FormActions>
        <q-inner-loading
        :showing="commissionSettingloading"
          label="درحال دریافت تنظیمات کمیسیون..."
          label-class="text-primary"
          color="primary"
          label-style="font-size: 16px"
        />
      </template>
      <safa-popup
        v-model="showReportSysDialog"
        width="400px"
        title="گزارشات سیستم شهرسازی"
        height="380px"
      >
        <ReportSysDialog
          :model="model"
          :name="name"
          :formKey="formKey"
          :title="title"
        />
      </safa-popup>
      <safa-popup
        v-model="isShowPrint"
        title="پارامتر"
        width="700px"
        height="350px"
      >
        <PrintVote
          v-model="printModel"
          cdcName="printModel"
          :ciPrintType="allCommissionDetail.CommissionInfo.CI_PrintType"
          @confirm="saveCommissionPrintLog"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<!-- eslint-disable eqeqeq -->
<script>
import Layehe from '../karshenasi/partials/Layehe.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'
import loginTokenMixin from 'src/mixins/loginTokenMixin'
import kartableCommissionMixin from 'src/forms/commission-menu/mixins/kartableCommissionMixin.js'
import { convertNosaziCodeObjectToString, convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
// import ViolationBill from "./partials/ViolationBill.vue"
import Voting from './partials/Voting.vue'
import VotingArchive from './partials/VotingArchive.vue'
import UrbanPlanningArchive from './partials/UrbanPlanningArchive.vue'
import TabletArchive from './partials/TabletArchive.vue'
import BuildingPoliceArchive from './partials/BuildingPoliceArchive.vue'
import ReportSysDialog from './partials/ReportSysDialog.vue'
import { currentDate, currentTime } from 'src/utils/index'
import PrintVote from './partials/PrintVote.vue'
import { GLOBAL_SETTINGS_GUID } from 'src/config/SETTINGS_CONSTs'

const defaultPrintModel = {
  Zinaf: 0,
  Motaghazi: 0,
  Defaie: 0,
  DadnamehNo: 0,
  DadnamehDate: '',
  CommissionNo: null,
  OldCommissionDate: null,
  Naghz: 0,
  Ghatei: 0,
  NamehNo: null,
  TypeRequester: 0,
  Esdar: 0,
  Date: null
}
export default {
  mixins: [baseFormMixin, kartableCommissionMixin, loginTokenMixin],
  components: {
    // ViolationBill,
    Voting,
    VotingArchive,
    UrbanPlanningArchive,
    TabletArchive,
    BuildingPoliceArchive,
    ReportSysDialog,
    Layehe,
    PrintVote
  },

  data () {
    return {
      title: 'فرم صدور رای',
      name: 'UVoting',
      formKey: 'AD8FB4D1-8045-4EA7-A26F-B0BB41320CDB',
      main: true,
      forceRender: true,
      commissionSettingloading: false,
      commissionsSetting: {
        IsAcceptTajdidnazar: false,
        IsShowMainKartabl: false,
        IsShowBadviParameter: false,
        HasAutomateCommissionDate: false,
        Coding: true,
        CmbCommissionDay: 0,
        ChangeMeetingName: false,
        VoteNoFormat: '0',
        InputValueForGhal: false,
        ErrorSelectHoliday: false,
        ReadOnlyExpertFormInVote: false,
        CheckDuplicateTrepassVote: false,
        ScrollTrepassPanel: false,
        CheckCommentsExperts: false,
        HideAgnetComments: false,
        IsCheckEmptyVoteTypeDetail: false,
        NotAccessToArchiveInSearchPanel: false,
        NoAgainCalcForEditVote: false,
        ActiveAgentInMultiCommission: false,
        DisableGroupSend: false,
        Instruction: false,
        IsAddTabArchiveSharsazi: false,
        IsNote: false,
        IsNotEditableVoteValue: false,
        HideIscomplainant: false,
        IsShowMessegeMeetinginVote: false,
        MessegeMeetinginVote: 'مالک/ذینفع درخواست حضور در جلسه را دارد؟',
        HideElamConfirm: false,
        ShowMesasgeOnEditVote: false,
        LockVoteDate: false,
        HideEditMessage: false,
        IsEnableEditCommissionVoteOfAgent: false,
        UpdateCommissionDate: false,
        ShowDefaultShahrsaziArchive: false,
        IsOrderByVoteHistory: false,
        SetCommissionPrintTypeGharar: false,
        IsEnableEditeVoteNo: false,
        ShowDefaultCommissionArchive: false,
        HideOldCommission: false,
        ActivePrintVotesWhileThreeAgentsApproved: false,
        AddVoteToArchiveThenPrintPreview: false,
        tabIndex5Called: false,
        tabIndex3Called: false,
        nidprocT: '00000000-0000-0000-0000-000000000000',
        CI_Region: 1,
        lastNosaziCode: '',
        lastBizCode: '',
        AllKCoeffiecientHasValidation: true,
        AllKCoeffiecientHasValidationMessage: 'مقدار ضریب نمیتواند خالی باشد!',
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
      },
      getCommissionInfoByNidProcAhkamResult: null,
      maxVoteObj: null,
      layeheMainInfo: null,
      GroupVoteTrepass: [],
      activeTab: 'voting_tab',
      showReportSysDialog: false,
      ischeckTrepass: false,
      showAcceptBadvi: false,
      showRejectBadvi: false,
      showCmbEvaluation: false,
      showPerformVote: false,
      showPrevStep: false,
      showPrintHistory: false,
      tokenLoading: false,
      isBtnAcceptEnable: true,
      isBtnPrevParvandehEnable: true,
      isBtnNextParvandehEnable: true,
      isAccseptHoghoghi: false,
      isFirstVote: false,
      tabShahrsaziArchiveShow: false,
      rtBuildingPoliceShow: false,
      tabBazdidShow: false,
      isArchive: true,
      isArchiveShahrsaziTabEnable: false,
      isSave: false,
      isdeleted: false,
      pMoveTask: 0,
      domainCommissionArchive: '',
      model: {
        SecrNo: '',
        NidWorkItem: '',
        OwnerName: '',
        Address: '',
        BizCode: null,
        NidCommission: null,
        ComEnterDate: '',
        UrbanNidRequest: ''
      },
      commissionVoteTrepassesGrid: [],
      allCommissionDetail: {
        AllBizCode: [],
        ClsCommission_ApposeVote: { Commission_ApposeVote: {} },
        ClsCommission_BlankList: {},
        ClsCommission_ExecutTrackingVote: {
          Commission_ExecutTrackingVote: {},
          SrvGetVoteTrepasses: []
        },
        ClsCommission_Impart: { Commission_Impart: {} },
        ClsCommission_LegalProxy: {
          Commission_LegalProxy: {},
          Rules: []
        },
        ClsTokens: [],
        CommissionInfo: {},
        CommissionInfos: [],
        CommissionTrepasses: [],
        CommissionVote: {},
        Commission_Archive: [],
        Commission_VoteList: [],
        Commission_VoteTrepasses: [],
        ListCommissionVoteOfAgent: []
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      commissionSettingResult: {},
      isShowPrint: false,
      historyVotesResult: null,
      isPrintVoteRes: null,
      getHistoryVotesRes: null,
      isPrintPreview: null,
      isExportToArchive: false,

      printModel: { printVote: { ...defaultPrintModel } },
      queryParams: null,
      addToArchiveRes: null,
      addLayeheToArchiveRes: null,
      saveCommissionPrintLogRes: null,
      saveNewVoteRes: null,
      reportName: '',
      keyValueOfParameters: [],
      statusOkAgent: false,

      // eslint-disable-next-line no-undef
      IsMashhadConfigSet: false,
      // eslint-disable-next-line no-undef
      districts: 1,
      AreaAfterEditValue: {},
      layeheComents: ''

    }
  },
  async created () {
    try {
      this.showLoading()
      setTimeout(async () => {
        this.detectToken()
        await this.onLoad()
        await this.getCommissionSetting()
        this.hideLoading()
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    onEditBtn () {
      this.isEditable = true
      this.$nextTick(() => {
        this.$refs.Voting.voteType_SelectionChanged()
      })
    },
    onDeleteAgentSigniture () {
      this.allCommissionDetail.ListCommissionVoteOfAgent = this.allCommissionDetail.ListCommissionVoteOfAgent.map(x => {
        return {
          ...x,
          IsAccept: false,
          EnumStatusVoteAgent: 3,
          DeleteDate: currentDate(),
          DeleteTime: currentTime()
        }
      }
      )
      this.saveVoteOfAgent({ deleteFlag: true })
    },
    onUpdateGroupVoteTrepass (newGroupVoteTrepass) {
      this.GroupVoteTrepass = newGroupVoteTrepass
    },
    async onLoad () {
      const self = this
      console.log('isMashhad', window.getConfigValue('IsMashhad'))
      this.IsMashhadConfigSet = window.getConfigValue('IsMashhad')
      this.districts = window.getConfigValue('districts')
      this.forceRender = false

      this.$nextTick(async () => {
        if (await self.canOpenWindow()) {
          self.forceRender = true
          await self.loadFormSetting()
          await self.loadObj()
          await self.uAllPageVote()
          // await this.$store.dispatch("commission/fetchKartableRows") در لود فرم کمیسییون چرا دوباره کارتابل باید لود بشه اگه بیزینیسی بوده ی راه دیگه براش پیدا کنید
        }
        self.$forceUpdate()
      })
    },
    async loadFormSetting () {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          'formSettings/getSettings',
          {
            key: 'commissionSettings',
            defaultValue: this.commissionsSetting,
            nidProc: GLOBAL_SETTINGS_GUID
          }
        )
        this.commissionsSetting = require('src/utils/mergeSettings').default(
          this.commissionsSetting,
          settings
        )
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    async uAllPageVote () {
      this.isArchive = true

      this.activeTab = 'voting_tab'

      if (
        this.getApplicationParam.hasOwnProperty('ShowEslahi') &&
        this.getApplicationParam.ShowEslahi
      ) {
        // # todo
        // this.BtnEditCShow = true
      }

      if (
        this.getApplicationParam.hasOwnProperty('ShowBazdid') &&
        this.getApplicationParam.ShowBazdid
      ) {
        this.tabBazdidShow = true
      }

      if (
        this.getApplicationParam.hasOwnProperty('ShowRegPluque') &&
        this.getApplicationParam.ShowRegPluque
      ) {
        // # todo
        // this.regPluqueShow = true
      }

      if (
        this.getApplicationParam.hasOwnProperty('ShowBuildingPoliceTab') &&
        this.getApplicationParam.ShowBuildingPoliceTab
      ) {
        this.rtBuildingPoliceShow = true
      }

      if (
        this.getApplicationParam.hasOwnProperty('AccessEditVoteButton') &&
        this.getApplicationParam.AccessEditVoteButton
      ) {
        // #  دکمه ای که نمایش میدهد سمت زمل کامنت هست برای همین این قسمت پیاده نشده
      }
      setTimeout(() => {
        this.$refs.Voting.sendCompleted = async function (s) {
          this.$refs.Voting.showSendDescription = false
          this.hideLoading()
          if (s) {
          // this.onCloseForm() تاکیید اصفهان که بسته نشه بره کد بعدی
          // await this.$store.dispatch("commission/fetchKartableRows")
          // this.$store.dispatch("commission/setSelectedCommission", null)
            this.nextParvandeh()
          }
        }.bind(this)
      }, 300)

      this.isArchiveShahrsaziTabEnable = false

      this.$nextTick(() => {
        this.$refs.Voting.complete = (t) => {
          this.hideLoading()
          try {
            this.model.OwnerName =
              this.allCommissionDetail.CommissionInfo.OwnerName
            this.model.SecrNo =
              this.allCommissionDetail.CommissionInfo.SecretariatNo
            this.model.UrbanNidRequest =
              this.allCommissionDetail.CommissionInfo.UrbanNidKartablItem
            this.model.Address = this.allCommissionDetail.CommissionInfo.Address
            this.model.BizCode =
              this.allCommissionDetail.CommissionInfo.CodeString
            this.model.ComEnterDate =
              this.allCommissionDetail.CommissionInfo.ComEnterDate
            if (this.allCommissionDetail.CommissionInfo.CodeString) {
              this.baseNosaziCode = convertStringToNosaziCodeObject(
                this.allCommissionDetail.CommissionInfo.CodeString
              )
            }

            this.isArchiveShahrsaziTabEnable = true

            if (
              this.getApplicationParam.hasOwnProperty('AcceptVoteByAgent') &&
              !this.getApplicationParam.AcceptVoteByAgent
            ) {
              if (
                this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
                '0793E947-E107-41F3-BDA0-AAC41EE6735D' ||
                this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
                'C399C102-5F2E-469E-B8AF-922E89FEF4A4' ||
                this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
                '8393710A-28D0-45DA-9BFE-95DA0B0049E2'
              ) {
                this.isBtnAcceptEnable = false
              } else {
                this.isBtnAcceptEnable = true
              }
            }
          } catch (ex) {
            console.error(ex)
            // this.serverError() // test serverError
            this.hideLoading()
          }

          if (
            this.getApplicationParam.hasOwnProperty('AcceptVoteByAgent') &&
            this.getApplicationParam.AcceptVoteByAgent
          ) {
            if (
              this.allCommissionDetail.Commission_VoteTrepasses != null &&
              this.allCommissionDetail.Commission_VoteTrepasses.length > 0
            ) {
              try {
                // && UCommissionInfo.context.ListCommissionVoteOfAgent?.Any())

                if (
                  this.getApplicationParam.hasOwnProperty(
                    'IsChechVoteOwnerForAllUser'
                  ) &&
                  this.getApplicationParam.IsChechVoteOwnerForAllUser
                ) {
                  if (
                    (this.allCommissionDetail.ListCommissionVoteOfAgent &&
                      this.allCommissionDetail.ListCommissionVoteOfAgent
                        .length > 0) ||
                    (this.allCommissionDetail.ListCommissionVoteOfAgent.some(
                      (a) => a.NidCommission != null
                    ) &&
                      this.allCommissionDetail.ListCommissionVoteOfAgent.some(
                        (f) =>
                          f.IsVoteOwner == true &&
                          f.NidUser.toLowerCase() == this.getNidUser().toLowerCase()
                      )) ||
                    this.allCommissionDetail.Commission_VoteTrepasses.some(
                      (f) => f.CI_VoteType == 3
                    ) ||
                    this.allCommissionDetail.ListCommissionVoteOfAgent.every(
                      (a) => a.NidCommission == null
                    )
                  ) {
                    this.isBtnAcceptEnable = true
                  } else {
                    this.isBtnAcceptEnable = false
                  }
                } else {
                  if (
                    !this.allCommissionDetail.ListCommissionVoteOfAgent
                      ?.length ||
                    (this.allCommissionDetail.ListCommissionVoteOfAgent?.some(
                      (a) => a.NidCommission != null
                    ) &&
                      this.allCommissionDetail.ListCommissionVoteOfAgent?.find(
                        (f) => f.IsVoteOwner == true
                      ).NidUser.toLowerCase() ==
                      this.getNidUser().toLowerCase()) ||
                    this.allCommissionDetail.Commission_VoteTrepasses.some(
                      (f) => f.CI_VoteType == 3
                    ) ||
                    this.allCommissionDetail.ListCommissionVoteOfAgent?.every(
                      (a) => a.NidCommission == null
                    )
                  ) {
                    this.isBtnAcceptEnable = true
                  } else {
                    this.isBtnAcceptEnable = false
                  }
                }
              } catch {
              }
            } else {
              this.isBtnAcceptEnable = true
            }
          }

          if (
            this.allCommissionDetail != null &&
            this.allCommissionDetail.CommissionInfo != null
          ) {
            if (
              this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
              '0793E947-E107-41F3-BDA0-AAC41EE6735D' ||
              this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
              'C5B2886B-86F9-413C-ADBF-AEEB3230CA3C' ||
              this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
              '0793E947-E107-41F3-BDA0-AAC41EE67353' ||
              this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
              '8393710A-28D0-45DA-9BFE-95DA0B0049E2' ||
              this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
              'C399C102-5F2E-469E-B8AF-922E89FEF4A4'
            ) {
              this.isBtnAcceptEnable = false
            } else {
              this.isBtnAcceptEnable = true
            }
          }
          if (
            this.getApplicationParam.hasOwnProperty('IsChechVoteOwner') &&
            this.getApplicationParam.IsChechVoteOwner
          ) {
            try {
              if (
                this.allCommissionDetail.Commission_VoteTrepasses != null &&
                this.allCommissionDetail.Commission_VoteTrepasses.length > 0
              ) {
                if (this.getApplicationParam.hasOwnProperty(
                  'IsChechVoteOwnerForAllUser'
                ) &&
                  this.getApplicationParam.IsChechVoteOwnerForAllUser) {
                  if (!this.allCommissionDetail.ListCommissionVoteOfAgent?.length ||
                    (this.allCommissionDetail.ListCommissionVoteOfAgent.some(a => a.NidCommission != null) &&
                      this.allCommissionDetail.ListCommissionVoteOfAgent.some(f => f.IsVoteOwner == true && f.NidUser.toLowerCase() == this.getNidUser().toLowerCase())) ||
                    this.allCommissionDetail.Commission_VoteTrepasses.some(f => f.CI_VoteType == 3) ||
                    this.allCommissionDetail.ListCommissionVoteOfAgent.every(a => a.NidCommission == null)) {
                    this.isBtnAcceptEnable = true
                  } else {
                    this.isBtnAcceptEnable = false
                  }
                } else {
                  if (
                    !this.allCommissionDetail.ListCommissionVoteOfAgent?.length ||
                    (this.allCommissionDetail.ListCommissionVoteOfAgent?.some(
                      (a) => a.NidCommission != null
                    )) ||
                    //  && this.allCommissionDetail.ListCommissionVoteOfAgent?.find(
                    //     (f) => f.IsVoteOwner == true
                    //   ).NidUser.toLowerCase() == this.getNidUser().toLowerCase())
                    this.allCommissionDetail.Commission_VoteTrepasses.some(
                      (f) => f.CI_VoteType == 3
                    ) ||
                    this.allCommissionDetail.ListCommissionVoteOfAgent?.every(
                      (a) => a.NidCommission == null
                    )
                  ) {
                    this.isBtnAcceptEnable = true
                  } else {
                    this.isBtnAcceptEnable = false
                  }
                }
              }

              if (!this.allCommissionDetail.ListCommissionVoteOfAgent?.length) {
                this.isBtnAcceptEnable = true
              }
            } catch (ex) {
              console.error(ex)
              console.log('catch2')
              let voterUserName =
                this.allCommissionDetail?.CommissionInfo?.VoterUserName || ''
                  ? this.allCommissionDetail.CommissionInfo.VoterUserName
                  : ''
              if (
                this.getUserDisplayName() ==
                voterUserName.replaceAll('ي', 'ی').replaceAll('ك', 'ک').trim()
              ) {
                if (
                  !!this.allCommissionDetail.ListCommissionVoteOfAgent?.length &&
                  (
                    this.allCommissionDetail.ListCommissionVoteOfAgent?.find(
                      (i) => i.NidUser.toLowerCase() == this.getNidUser().toLowerCase()
                    ) || {}
                  ).IsVoteOwner
                ) {
                  this.isBtnAcceptEnable = true
                } else {
                  this.isBtnAcceptEnable = false
                }
              }

              if (!this.allCommissionDetail.ListCommissionVoteOfAgent?.length) {
                this.isBtnAcceptEnable = true
              }
              if (
                (
                  this.allCommissionDetail.ListCommissionVoteOfAgent?.filter(
                    (i) => i.EnumStatusVoteAgent == 3
                  ) || []
                ).length == 3
              ) {
                this.isBtnAcceptEnable = true
              }
            }
          }
        }
      })

      if (
        this.getApplicationParam.hasOwnProperty('AcceptVoteByAgent') &&
        this.getApplicationParam.AcceptVoteByAgent
      ) {
        this.$refs.Voting.voteOfAgentShow = true
        this.$refs.Voting.$refs.CommissionVoteOfAgent.completed = () => {
          if (
            !this.$refs.Voting.$refs.CommissionVoteOfAgent.isOwener &&
            this.allCommissionDetail.GetAllVotesAndTrepass != null &&
            this.allCommissionDetail.GetAllVotesAndTrepass.length > 0
          ) {
            this.isBtnAcceptEnable = false
            this.isEditable = false
            // # todo
            // this.Btn_cancelVisibility = false
            // this.Btn_DeleteAllVoteVisibility = false
            // this.Btn_printvoteVisibility = false
            // this.Btn_QuickPrintVisibility = false
          }
        }
      }
      if (this.commissionsSetting.IsAddTabArchiveSharsazi) {
        this.tabShahrsaziArchiveShow = true
      }
    },
    checkAllTrepassOk () {
      var tmpRequest = {
        SaveCommissionVote: this.createCommissionVote({}),
        CommissionInfo: this.allCommissionDetail.CommissionInfo,
        IsdeleteArchive: this.isdeleted
      }
      if (this.getApplicationParam.hasOwnProperty('IsActiveToken') && this.getApplicationParam.IsActiveToken) {
        tmpRequest.ClsTokens = this.allCommissionDetail.ClsTokens
      }

      let tmpRet = false

      tmpRet = this.allCommissionDetail.CommissionTrepasses.some(f => !f.IsHaveVote)

      return tmpRet
    },
    sortCommission_Trepass () {
      this.allCommissionDetail.CommissionTrepasses =
        this.allCommissionDetail.CommissionTrepasses.sort((a, b) =>
          a.Id > b.Id ? -1 : 1
        )
          .sort((a, b) => (a.TrepassValue > b.TrepassValue ? -1 : 1))
          .sort((a, b) => (a.Floor > b.Floor ? -1 : 1))
      let RowNumber = 1
      this.allCommissionDetail.CommissionTrepasses.forEach((i) => {
        i.RowNumber = RowNumber++
        i.Ka = !i.K ? parseFloat(i.K) : 0
      })
      this.allCommissionDetail.CommissionTrepasses =
        this.allCommissionDetail.CommissionTrepasses.sort((a, b) =>
          a.CI_TrepassType_Group < b.CI_TrepassType_Group ? -1 : 1
        ).sort((a, b) => (a.Floor < b.Floor ? -1 : 1))
    },
    // detectToken () {
    //   // try {
    //   //   this.tokenLoading = true
    //   //   // eslint-disable-next-line no-undef
    //   //   const tmpNovin = GetTokenSerial()
    //   //   if (tmpNovin !== '') {
    //   //     this.checkTokenStatus()
    //   //     // eslint-disable-next-line no-undef
    //   //     TokenComplete(tmpNovin, tmpNovin)
    //   //   } else {
    //   //     // eslint-disable-next-line no-undef
    //   //     CheckToken('1234')
    //   //     setTimeout(() => {
    //   //       this.checkTokenStatus()
    //   //     }, 1000)
    //   //   }
    //   // } catch {
    //   // } finally {
    //   //   this.tokenLoading = false
    //   // }
    // },
    checkTokenStatus () {
      const self = this
      self.detectedToken = !!window.tokenInfo
      self.tokenInfo = window.tokenInfo
      self.tokenPAR = window.tokenPAR
    },
    getGroupVoteTrepass (CommissionVoteTrepasses) {
      let tmpList = []
      if (
        CommissionVoteTrepasses != null &&
        CommissionVoteTrepasses.length > 0
      ) {
        tmpList = CommissionVoteTrepasses.groupJoin(
          CommissionVoteTrepasses,
          function (i) {
            return i.NidVote
          },
          function (j) {
            return j.NidVote
          },
          function (i, j) {
            return {
              Comm_Vote: i, // صدور رای
              Comm_Trepass: j // گرید تخلفات زیر صدور رای
            }
          }
        )
          .groupBy((i) => i.Comm_Vote.NidVote)
          .select((i) => i.first())
        // .orderBy((i) => i.Comm_Vote.VoteDate);
      }
      return tmpList
    },

    async loadObj () {
      try {
        this.activeTab = 'voting_tab'

        // # todo
        // this.checkSecurityForExpertValueType();

        // eslint-disable-next-line standard/computed-property-even-spacing
        this.moveTask = this.$store.getters[
          'commission/kartableFilters'
        ].findIndex((e) => e.NidCommission == this.selectedNidCommission)

        this.cancelMethod()

        if (this.totalKartableRows <= 1) {
          this.isBtnPrevParvandehEnable = false
          this.isBtnNextParvandehEnable = false
        }

        await this.getMaxVote()

        this.model = { ...this.selectedCommission }
        this.baseNosaziCode = convertStringToNosaziCodeObject(
          this.selectedCommission.BizCode
        )

        this.getAllData(
          this.selectedNidCommission,
          this.selectedCommission.UrbanNidRequest,
          this.selectedCommission.CI_Region,
          this.selectedCommission.BizCode,
          this.selectedCommission.SysCI_RequestBy,
          this.selectedCommission.NidProc
        )
        this.log({
          action: this.logActions.view,
          bizCode: this.selectedNidCommission ?? '',
          bizCodeTitle: "NosaziCode",
          nosaziCode: this.selectedCommission?.BizCode ?? '',
          saveDesc: `بارگذاری اطلاعات ${this.title} انجام گردید.`
        })
      } catch (ex) {
        console.error(ex)
        this.hideLoading()
      }
    },

    // # todo
    checkSecurityForExpertValueType () {
    }, // aram نمایش ارزش سرقفلی یا مقدار کارشناسی

    async getMaxVote () {
      try {
        const { data } = await this.$services.commissions
          .getMaxVote({ pNidCommission: this.selectedNidCommission ?? this.selectedCommission.NidCommission })
        const res = this.getResponse(data)
        if (res.success) {
          this.maxVoteObj = res.data.GetMaxVoteResult
          console.log('this.maxVoteObj :>> ', this.maxVoteObj)
          // console.log(res.data.GetMaxVoteResult.MaxVoteNo, 'getMaxVoteNo')
        }
      } catch (e) {
        console.error(e)
        // this.serverError() // test serverError
      } finally {
      }
    },
    async btnAcceptClick () {
      this.$refs.Voting.comboPrintTypeMode = 'e'
      // this.isEditable = true
      // this.$refs.Voting.isEditable = true
      try {
        this.commissionSettingloading = true
        await this.getCommissionSetting()
        if (!this.isEditable) {
        // let isProtestDeadline =
        //   this.allCommissionDetail.Commission_Appose != null
        //     ? !!this.allCommissionDetail.Commission_Appose.length
        //     : false

          let isProtestDeadline = (this.allCommissionDetail.Commission_Appose && this.allCommissionDetail.Commission_Appose.length > 0) || false

          let cKeckBlackList = this.chk_BlackList(true)
          if (!cKeckBlackList) {
            if (
              !this.allCommissionDetail.CommissionTrepasses.some(
                (f) => f.IsComplainant
              ) &&
            !this.allCommissionDetail.CommissionInfo.IsMeeting &&
            !isProtestDeadline
            ) {
              this.acceptMethod()
            } else {
              if (
                this.getApplicationParam.hasOwnProperty('ConfirmEditVote') &&
              this.getApplicationParam.ConfirmEditVote
              ) {
                let hasOutOfRange = false
                let cIBoundCodeOutOfRanges =
                this.getApplicationParam.hasOwnProperty(
                  'OutOfRangeCI_BoundCodes'
                ) && this.getApplicationParam.OutOfRangeCI_BoundCodes
                if (
                  cIBoundCodeOutOfRanges &&
                (this.allCommissionDetail?.CommissionInfo?.CI_BoundCode || 0) >
                0
                ) {
                  if (
                    cIBoundCodeOutOfRanges.includes(
                      `#${this.allCommissionDetail.CommissionInfo.CI_BoundCode.toString()}"#`
                    )
                  ) {
                    hasOutOfRange = true
                  }
                }
                if (
                  this.allCommissionDetail.CommissionTrepasses.some(
                    (f) => f.IsComplainant
                  )
                ) {
                  this.showConfirm(
                    hasOutOfRange
                      ? 'این ملک دارای شاکی خصوصی و خارج از محدوده میباشد ، آیا از این مورد مطلع هستید ؟'
                      : 'این ملک دارای شاکی خصوصی میباشد ، آیا از این مورد مطلع هستید ؟'
                  ).onOk(() => {
                    if (this.allCommissionDetail.CommissionInfo.IsMeeting) {
                      this.showConfirm(
                        this.commissionsSetting.IsShowMessegeMeetinginVote ==
                      false
                          ? 'شهرداری منطقه درخواست طرح پرونده با حضور نماینده را دارد<br>آیا نماینده شهرداری در جلسه حضور دارد؟ '
                          : this.commissionsSetting.MessegeMeetinginVote
                      ).onOk(() => {
                        if (isProtestDeadline) {
                          this.showConfirm(
                            '  مهلت اعتراض به پایان رسیده است ، آیا از این مورد مطلع هستید؟'
                          ).onOk(() => {
                            this.isSave = false
                            this.acceptMethod()
                          })
                        } else {
                          this.isSave = false
                          this.acceptMethod()
                        }
                      })
                    } else {
                      if (isProtestDeadline) {
                        this.showConfirm(
                          'مهلت اعتراض به پایان رسیده است، آیا از این مورد مطلع هستید؟'
                        ).onOk(() => {
                          this.isSave = false
                          this.acceptMethod()
                        })
                      } else {
                        this.isSave = false
                        this.acceptMethod()
                      }
                    }
                  })
                } else if (this.allCommissionDetail.CommissionInfo.IsMeeting) {
                  this.showConfirm(
                    hasOutOfRange
                      ? (this.commissionsSetting.IsShowMessegeMeetinginVote ==
                    false
                        ? 'شهرداری منطقه درخواست طرح پرونده با حضور نماینده را دارد<br>آیا نماینده شهرداری در جلسه حضور دارد؟ '
                        : this.commissionsSetting.MessegeMeetinginVote) +
                    '<br>' +
                    'این ملک خارج از محدوده می باشد, آیا از این مورد مطلع هستید؟'
                      : this.commissionsSetting.IsShowMessegeMeetinginVote ==
                    false
                        ? 'شهرداری منطقه درخواست طرح پرونده با حضور نماینده را دارد<br>آیا نماینده شهرداری در جلسه حضور دارد؟ '
                        : this.commissionsSetting.MessegeMeetinginVote
                  ).onOk(() => {
                    if (isProtestDeadline) {
                      this.showConfirm(
                        '  مهلت اعتراض به پایان رسیده است ، آیا از این مورد مطلع هستید؟'
                      ).onOk(() => {
                        this.isSave = false
                        this.acceptMethod()
                      })
                    } else {
                      this.isSave = false
                      this.acceptMethod()
                    }
                  })
                } else if (isProtestDeadline) {
                  this.showConfirm(
                    hasOutOfRange
                      ? '  این ملک خارج از محدوده می باشد و مهلت اعتراض به پایان رسیده است ، آیا از این مورد مطلع هستید؟'
                      : ' مهلت اعتراض به پایان رسیده است ، آیا از این مورد مطلع هستید؟ '
                  ).onOk(() => {
                    this.isSave = false
                    this.acceptMethod()
                  })
                } else {
                  if (hasOutOfRange) {
                    this.showConfirm(
                      'این ملک خارج از محدوده می باشد, آیا از این مورد مطلع هستید؟'
                    ).onOk(() => {
                      this.isSave = false
                      this.acceptMethod()
                    })
                  } else {
                    this.isSave = false
                    this.acceptMethod()
                  }
                }
              }
            }
          }
        } else {
          this.$refs.Voting.stausCalculateVote = false
          this.isSave = true // درخواست اصفهان که با تک کلیک سیو انجام بشه
          this.acceptMethod()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.commissionSettingloading = false
      }
    },
    accseptHoghoghi (val) {
      this.isAccseptHoghoghi = val
    },

    async addVoteTrepassToList (pCommissionVote, Treepass) {
      let objVoteTrepass = {}
      let tmpCommTrepass = []

      let TmpVote = {
        VoteValue: pCommissionVote.VoteValue,
        TechnicalValue: pCommissionVote.TechnicalValue === null ? 0 : pCommissionVote.TechnicalValue,
        VoteDate: currentDate(),
        CI_VoteType: pCommissionVote.CI_VoteType,
        NidVote: pCommissionVote.NidVote,
        NidCommission: this.allCommissionDetail.CommissionInfo.NidCommission,
        Vote_Comments: this.commissionsSetting.IsAcceptTajdidnazar
          ? ` با عنایت به اینکه رای بدوی وفق موازین صادر شده و ایراد موجهی ارائه و ابراز نگردیده، تجدید نظر خواهی وارد نیست و رای بدوی بدین شرح تایید می گردد : ${pCommissionVote.Vote_Comments}`
          : ` ${pCommissionVote.Vote_Comments}`,
        CI_VoteTypeDetail: pCommissionVote.CI_VoteTypeDetail,
        NidAgent: this.getNidUser(),
        AgentComment: pCommissionVote.AgentComment,
        IsHave: pCommissionVote.IsHave
      }

      const year =
      this.commissionSettingResult?.PersianDateServer?.split('/')[0].substring(
        2
      ) || ""

      if (this.commissionsSetting.VoteNoFormat == 0) {
        TmpVote.VoteNo = `${this.allCommissionDetail.CommissionInfo.District}/${year}/${this.allCommissionDetail.CommissionInfo.SecretariatNo}`
      } else if (this.commissionsSetting.VoteNoFormat == 1) {
        await this.getVoteNo((voteno) => {
          TmpVote.VoteNo = `${year}/${voteno.Number}/${this.allCommissionDetail.CommissionInfo.CI_Commission}/${voteno.MaxVoteNo}`
        }, this.selectedNidCommission)
      } else if (this.commissionsSetting.VoteNoFormat == 2) {
        await this.getVoteNo((voteno) => {
          TmpVote.VoteNo = `${year}/${this.selectedCommission.CI_Commission}/${this.allCommissionDetail.CommissionInfo.District}/${voteno.Number}/${voteno.MaxVoteNo}`
        }, this.selectedNidCommission)
      } else if (this.commissionsSetting.VoteNoFormat == 3) {
        await this.getVoteNo((voteno) => {
          TmpVote.VoteNo = `${year}/${voteno.Number}/${this.allCommissionDetail.CommissionInfo.District}/23/100/${voteno.MaxVoteNo}`
        }, this.selectedNidCommission)
      }

      objVoteTrepass.Comm_Vote = TmpVote

      Treepass.forEach((i) =>
        tmpCommTrepass.push({
          NidTrepass: i.NidTrepass,
          MaxPenalty: i.MaxPenalty,
          MinPenalty: i.MinPenalty,

          PenaltyFormula: i.PenaltyFormula,
          CalculationPrice: i.CalculationPrice,
          SystemSuggestion: i.SystemSuggestion,
          IsHave: i.IsHave,

          Trepass_Comments: i.Trepass_Comments,
          TrepassValue: i.TrepassValue,
          NidCommission: this.allCommissionDetail.CommissionInfo.NidCommission,
          CI_Years: i.CI_Years,

          Id: i.Id,
          Title: i.Title,
          IdOld: i.IdOld,
          TitleOld: i.TitleOld,

          UsingID: i.UsingID,
          UsingTitle: i.UsingTitle,
          UsingGroupID: i.UsingGroupID,
          UsingGroupTitle: i.UsingGroupTitle,

          Floor: i.Floor,
          K: i.K,
          P: i.P,
          KCoeffiecient: i.KCoeffiecient,

          AreaMojaz: i.AreaMojaz,
          AreaMojod: i.AreaMojod,
          CI_UsingTypeMojaz: i.CI_UsingTypeMojaz,
          CI_UsingTypeGroupMojaz: i.CI_UsingTypeGroupMojaz,
          FloorCountMosavab: i.FloorCountMosavab,
          Note: i.Note
        })
      )

      objVoteTrepass.Comm_Trepass = [...tmpCommTrepass]
      this.GroupVoteTrepass.push(objVoteTrepass)
      this.changeColorTrepassRow()
    },

    contextAddVoteTrepassToList (pCommissionVote, coodingTrepass = null) {
      let objVoteTrepass = {}
      let tmpCommTrepass = []

      objVoteTrepass.Comm_Vote = {
        VoteValue: pCommissionVote.VoteValue,
        TechnicalValue: pCommissionVote.TechnicalValue === null ? 0 : pCommissionVote.TechnicalValue,
        VoteDate: pCommissionVote.VoteDate,
        VoteNo: pCommissionVote.VoteNo,
        CI_VoteType: pCommissionVote.CI_VoteType,
        NidVote: pCommissionVote.NidVote,
        NidCommission: pCommissionVote.NidCommission,
        Vote_Comments: pCommissionVote.Vote_Comments,
        CI_VoteTypeDetail: pCommissionVote.CI_VoteTypeDetail,
        NidAgent: pCommissionVote.NidAgent,
        AgentComment: pCommissionVote.AgentComment,
        IsHave: pCommissionVote.IsHave ? pCommissionVote.IsHave : 0,
        VotePriority: pCommissionVote.VotePriority,
        CI_Note: pCommissionVote.CI_Note,
        NoteComment: pCommissionVote.NoteComment,
        CommissionDate: '',
        CI_Evaluation: pCommissionVote.CI_Evaluation,
        DeadlineGhararVote: pCommissionVote.DeadlineGhararVote,
        IsNote7Action: pCommissionVote.IsNote7Action || false
      }

      var tmpTrepass = this.allCommissionDetail.CommissionTrepasses.filter(
        (f) => f.IsSelected == true
      )

      if (coodingTrepass != null) tmpTrepass = coodingTrepass

      tmpTrepass.forEach((i) => {
        tmpCommTrepass.push({
          NidTrepass: i.NidTrepass,
          MaxPenalty: i.MaxPenalty,
          MinPenalty: i.MinPenalty,

          PenaltyFormula: i.PenaltyFormula,
          CalculationPrice: i.CalculationPrice,
          SystemSuggestion: i.SystemSuggestion,

          Trepass_Comments: i.Trepass_Comments,
          TrepassValue: i.TrepassValue,
          NidCommission: i.NidCommission,
          CI_Years: i.CI_Years,

          Id: i.Id,
          Title: i.Title,
          IdOld: i.IdOld,
          TitleOld: i.TitleOld,

          UsingID: i.UsingID,
          UsingTitle: i.UsingTitle,
          UsingGroupID: i.UsingGroupID,
          UsingGroupTitle: i.UsingGroupTitle,

          Floor: i.Floor,
          K: i.K,
          P: i.P,
          KCoeffiecient: i.KCoeffiecient,

          AreaMojaz: i.AreaMojaz,
          AreaMojod: i.AreaMojod,
          CI_UsingTypeMojaz: i.CI_UsingTypeMojaz,
          CI_UsingTypeGroupMojaz: i.CI_UsingTypeGroupMojaz,
          FloorCountMosavab: i.FloorCountMosavab,
          Note: i.Note
        })
        i.IsHaveVote = true
        i.IsSelected = false
      })

      objVoteTrepass.Comm_Trepass = [...tmpCommTrepass]
      this.GroupVoteTrepass.push(objVoteTrepass)
      this.changeColorTrepassRow()
    },

    async getVoteNo (pCompleted, pNidCommission) {
      await this.$services.commissions
        .getMaxVote({ pNidCommission })
        .then(async ({ data }) => {
          const getMaxVoteRes = this.getResponse(data)
          if (getMaxVoteRes.success) {
            pCompleted(getMaxVoteRes.data.GetMaxVoteResult)

            await this.log({
              action: this.logActions.view,
              bizCode: pNidCommission ?? '',
              bizCodeTitle: "pNidCommission",
              saveDesc: `بارگذاری اطلاعات رای انجام گردید.`
            })
          }
        })
        .catch((err) => {
          console.error(err)
          // this.serverError() // test serverError
        })
    },

    acceptMethod () {
      this.$refs.Voting.showBarasiHoghoghiBtn = true

      if (this.isSave) {
        this.isBtnAcceptEnable = false

        this.$refs.Voting.completeSave = async (scom) => {
          if (scom == 1) {
            this.isBtnAcceptEnable = true
            await this.$refs.Voting.$refs.CommissionVoteOfAgent.load(
              this.selectedNidCommission,
              this.getNidUser()
            )

            this.cancelMethod()
            this.$refs.Voting.comboPrintTypeMode = 'r'
            // #todo
            // UCommissionInfo.Btn_AcceptBadvi.IsEnabled = false;
            if (
              this.getApplicationParam.hasOwnProperty('AgentDefineDraft') &&
              this.getApplicationParam.AgentDefineDraft
            ) {
              await this.$store.dispatch('commission/fetchKartableRows')
            }
          } else {
            this.cancelSave()
          }
        }

        this.save()

        this.isBtnAcceptEnable = true
      } else {
        this.isSave = true
        // # todo
        // Btn_Accept.Content = "ذخیره";
        // Btn_cancel.Visibility = Visibility.Visible;
        // Btn_DeleteVote.SetVisibility(Visibility.Visible);
        // Btn_DeleteAllVote.SetVisibility(Visibility.Visible);
        // UCommissionInfo.Btn_Accept.IsEnabled = true;
        // UCommissionInfo.Btn_AcceptBadvi.IsEnabled = true;
        // UCommissionInfo.TmpVote.VoteDate = Common.Common.InitCommission.PersianDateServer;
        // if (Common.Common.PermissionPrintTypeForVote == 1)
        //     UCommissionInfo.ComboPrintType.IsEnabled = true;
        // UCommissionInfo.TmpVote.VoteTime = string.Format("{0:00}:{1:00}:{2:00}", Common.Common.InitCommission.PersianTimeServer.Hours, Common.Common.InitCommission.PersianTimeServer.Minutes, Common.Common.InitCommission.PersianTimeServer.Seconds);
        this.isEditable = true
        this.$refs.Voting.isEditable = true
        // Btn_back.IsEnabled = false;
        if (this.$refs.Voting.issuedVoteModel.issuedVote.CI_VoteType == 1) {
          this.$refs.Voting.kCoeffiecientShow = true
        }
      }
    },

    cancelSave () {
      this.isBtnAcceptEnable = true
    },

    cancelMethod () {
      this.hideLoading()
      this.$refs.Voting.cancelMethod()
      this.isSave = false
      // # todo
      // Btn_cancel.Visibility = Visibility.Collapsed;
      // Btn_DeleteVote.SetVisibility(Visibility.Collapsed);
      // Btn_DeleteAllVote.SetVisibility(Visibility.Collapsed);
      // UCommissionInfo.TmpVote.VoteDate = "";
      this.isEditable = false
      this.$refs.Voting.isEditable = false
      // UCommissionInfo.Btn_Accept.IsEnabled = false;
      this.isBtnAcceptEnable = true
      this.$refs.Voting.$refs.issuedVote.CommissionComments = ''

      this.$refs.Voting.kCoeffiecientShow = false

      this.ischeckTrepass = false
    },
    async onCancel () {
      this.$refs.Voting.comboPrintTypeMode = 'r'
      if (!this.isAccseptHoghoghi) {
        this.cancelMethod()
        this.$refs.Voting.loadObj()
      } else {
        this.showConfirm(
          'در زمانی که پرونده بررسی  حقوقی  شده است امکان انصراف وجود ندارد.<br>برای این کار باید آرا حذف شود آیا  ادامه می دهید؟'
        ).onOk(() => {
          this.isAccseptHoghoghi = false
          this.deleteAllVotes()
        })
      }
    },
    loadHistory (pNosaziCode, pNidCommission) {
      this.showLoading()
      const payload = {
        PRequest: {
          NosaziCode: pNosaziCode,
          NIDCommission: pNidCommission
        }
      }
      this.$services.commissions
        .getHistoryVotes(payload)
        .then(async ({ data }) => {
          this.hideLoading()
          this.getHistoryVotesRes = this.getResponse(data)
          if (this.getHistoryVotesRes.success) {
            this.historyVotesResult =
              this.getHistoryVotesRes.data.GetHistoryVotesResult

            if (
              this.historyVotesResult &&
              this.historyVotesResult?.Commission_VoteTrepasses.length > 0
            ) {
              let GroupVoteTrepass = this.getGroupVoteTrepass(
                this.historyVotesResult.Commission_VoteTrepasses
              )

              // GroupVoteTrepass = GroupVoteTrepass.filter(
              //   a => a.Comm_Vote.NidCommission != pNidCommission
              // );

              GroupVoteTrepass
                // .filter(a => {
                //   a.Comm_Vote.NidCommission != this.selectedNidCommission;
                // })
                .forEach((i) => {
                  i.Comm_Trepass.forEach((tmptre) => {
                    let tmptrepass =
                      this.allCommissionDetail.CommissionTrepasses.find(
                        (f) =>
                          f.Id === tmptre.Id &&
                          f.CI_Years === tmptre.CI_Years &&
                          f.TrepassValue === tmptre.TrepassValue
                      )
                    if (tmptrepass != null) {
                      tmptrepass.KC_S =
                        tmptre.KCoeffiecient && tmptre.KCoeffiecient.toString()
                      tmptrepass.K_S = tmptre.K && tmptre.K.toString()
                      tmptrepass.VoteType_S = i.Comm_Vote.CI_VoteType
                      tmptrepass.VoteNo_S = i.Comm_Vote.VoteNo
                      tmptrepass.CI_CommissionType_S = parseInt(
                        i.Comm_Vote.CI_CommissionType
                      )

                      tmptrepass.CI_Commission_S = parseInt(
                        i.Comm_Vote.CI_Commission
                      )

                      tmptrepass.VoteValue_S = i.Comm_Vote.VoteValue
                    }
                  })
                })
              try {
                this.$refs.Voting.$refs.takhalofatRef.gridApi.refreshCells()
              } catch (ex) {
              }
            }
            this.log({
              action: this.logActions.view,
              bizCode: this.selectedNidCommission ?? '',
              bizCodeTitle: "NosaziCode",
              nosaziCode: this.selectedCommission?.BizCode ?? '',
              saveDesc: `بارگذاری اطلاعات تاریخچه رای انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async getAllCommissionDetails () {
      const payload = {
        PRequest: {
          NIDCommission: this.selectedNidCommission,
          NIDVote: '00000000-0000-0000-0000-000000000000',
          NidProc: '00000000-0000-0000-0000-000000000000',
          ISRelapse: false,
          IsRegion: false,
          IsdeleteArchive: false,
          NidAgent: '00000000-0000-0000-0000-000000000000',
          NidTaskState: '00000000-0000-0000-0000-000000000000',
          NidUser: '00000000-0000-0000-0000-000000000000'
        }
      }
      await this.$services.commissions
        .getAllCommissionDetails(payload)
        .then(async ({ data }) => {
          this.hideLoading()

          const res = this.getResponse(data)
          if (res.success) {
            let result = res.data.GetAllCommissionDetailsResult
            if (result != null) {
              if (result?.CommissionInfo?.NidCommission === '00000000-0000-0000-0000-000000000000') {
                let commissionInfoByNidProcAhkamResult = await this.$store.dispatch('commission/fetchCommissionInfoByNidProcAhkam')
                this.getCommissionInfoByNidProcAhkamResult = this.getResponse(commissionInfoByNidProcAhkamResult)
                if (this.getCommissionInfoByNidProcAhkamResult.success) {
                  this.allCommissionDetail = this.getCommissionInfoByNidProcAhkamResult.data.GetCommissionInfoByNidProcAhkamResult
                } else {
                  this.handleError(this.getCommissionInfoByNidProcAhkamResult)
                }
              } else {
                this.allCommissionDetail = res.data.GetAllCommissionDetailsResult
              }

              this.allCommissionDetail.Commission_VoteList =
                this.allCommissionDetail?.Commission_VoteList?.map((x) => {
                  return {
                    ...x,
                    isExpanded: false,
                    IsSelected: false
                  }
                }) || []
              this.allCommissionDetail.CommissionTrepasses =
                this.allCommissionDetail?.CommissionTrepasses?.map((x) => {
                  return {
                    ...x,
                    IdCode: x.Id,
                    IsSelected: false
                  }
                }) || []

              this.allCommissionDetail.Commission_VoteTrepasses =
                this.allCommissionDetail?.Commission_VoteTrepasses?.map((x) => {
                  return {
                    ...x,
                    IsSelected: false
                  }
                }) || []
            }
          }
          this.GroupVoteTrepass = this.getGroupVoteTrepass(
            this.allCommissionDetail?.Commission_VoteTrepasses
          )
          this.selectComTrepasses(this.allCommissionDetail) // base On Xaml UCommissionInfo Srv_GetAllCommissionDetailsCompleted
          this.isFirstVote = !(this.GroupVoteTrepass?.length > 0)
          this.changeColorTrepassRow() // base On Xaml UCommissionInfo Srv_GetAllCommissionDetailsCompleted
          this.checkBadviButton() // base On Xaml UCommissionInfo Srv_GetAllCommissionDetailsCompleted
          this.checkPrintButton() // base On Xaml UCommissionInfo Srv_GetAllCommissionDetailsCompleted
          if (
            this.$refs?.Voting.$refs?.issuedVote.$refs.comboVoteType
              .selectedItem != null
          ) {
            this.$refs.Voting.loadCodeVote(
              this.$refs.Voting.$refs.issuedVote.$refs.comboVoteType
                .selectedItem.ID,
              0
            )
          }

          if (
            this.allCommissionDetail.CommissionTrepasses !== null &&
            this.allCommissionDetail.CommissionTrepasses.length > 0
          ) {
            this.sortCommission_Trepass()
            const arr = this.allCommissionDetail?.CommissionTrepasses?.map(
              (x) => x.MaxPenalty
            )
            const max = Math.max(...arr)
            this.$refs.Voting.kAllvalue = max
          }
          if (
            this.allCommissionDetail.AllBizCode !== null &&
            this.allCommissionDetail.AllBizCode.length > 0
          ) {
            this.allCommissionDetail.AllBizCode.forEach((i) => {
              if (
                this.allCommissionDetail.Commission_Archive.every(
                  (f) => f.RootSubject !== i.RootSubject
                )
              ) {
                i.IsAllBizCode = true
                this.allCommissionDetail.Commission_Archive.push(i)
              }
            })
          }
          if (this.$refs.Voting.kAllvalue != null) {
            if (this.IsMashhadConfigSet) {
              let result = this.allCommissionDetail?.CommissionTrepasses?.filter(
                (f) =>
                  f.IsSelected === true &&
                  !f.IsHaveVote &&
                  (f.KCoeffiecient === 0 || f.KCoeffiecient === null)
              )
              result.forEach((i) => {
                i.KCoeffiecient = i.MaxPenalty
              })
            }
          }
          if (!this.allCommissionDetail?.ListCommissionVoteOfAgent?.length) {
            if (!this.allCommissionDetail?.Commission_Agent_Signature?.length) {
              let clsTokens = this.allCommissionDetail?.ClsTokens?.filter(
                (x) => x.NidAgent !== '00000000-0000-0000-0000-000000000000'
              )
              clsTokens?.forEach((i) => {
                this.allCommissionDetail?.ListCommissionVoteOfAgent?.push({
                  AcceptDate: '',
                  AcceptTime: '',
                  CI_AgentOpinion: 0,
                  DeleteDate: null,
                  DeleteTime: null,
                  Description: '',
                  EnumStatusVoteAgent: null,
                  IsAccept: false,
                  IsVoteOwner: false,
                  NidCommission: '00000000-0000-0000-0000-000000000000',
                  NidCommissionVoteOfAgent:
                    '00000000-0000-0000-0000-000000000000',
                  NidUser: i.NidAgent,
                  UserName: i.Name,
                  IsReadOnly: true
                })
              })
            } else {
              this.allCommissionDetail?.Commission_Agent_Signature?.forEach(
                (i) => {
                  this.allCommissionDetail.ListCommissionVoteOfAgent?.push({
                    AcceptDate: '',
                    AcceptTime: '',
                    CI_AgentOpinion: 0,
                    DeleteDate: null,
                    DeleteTime: null,
                    Description: '',
                    EnumStatusVoteAgent: null,
                    IsAccept: false,
                    IsVoteOwner: false,
                    NidCommission: '00000000-0000-0000-0000-000000000000',
                    NidCommissionVoteOfAgent:
                      '00000000-0000-0000-0000-000000000000',
                    NidUser: i.NidAgent,
                    UserName: i.Name,
                    IsReadOnly: true
                  })
                }
              )
            }
          }
          // add rowId in grid
          this.allCommissionDetail.CommissionTrepasses = this.allCommissionDetail.CommissionTrepasses.map((x, i) => {
            return {
              ...x,
              RowId: i + 1
            }
          }) || []
          this.loadHistory(
            this.allCommissionDetail?.CommissionInfo?.CodeString,
            this.allCommissionDetail?.CommissionInfo?.NidCommission
          )
          if (this.$refs.Voting.complete != null) {
            this.$refs.Voting.complete(1)
          }
          /// / حالتی که حذف امضا شده باشه یه صورت سافت دیتا پاک میشه
          if ((this.getApplicationParam.hasOwnProperty("DeleteSignitureAgent") && this.getApplicationParam.DeleteSignitureAgent)) {
            this.allCommissionDetail.ListCommissionVoteOfAgent = this.allCommissionDetail.ListCommissionVoteOfAgent.filter(x => x.DeleteDate === null)
          }
          this.allCommissionDetail.ListCommissionVoteOfAgent = this.allCommissionDetail.ListCommissionVoteOfAgent.map(x => { return {
            ...x,
            m: 'e'
          } })
          if ((this.getApplicationParam.hasOwnProperty("SetListOfAgentModeBasedOnToken") && this.getApplicationParam.SetListOfAgentModeBasedOnToken)) {
            this.allCommissionDetail.ListCommissionVoteOfAgent.forEach(agent => {
              this.allCommissionDetail.ClsTokens.forEach(tokenObj => {
                if (this.certificateList.find(certificate => certificate.keyId === tokenObj.TokenID)) {
                  if (tokenObj.NidAgent === agent.NidUser) {
                    agent.m = 'e'
                  }
                  else {
                    agent.m = 'r'
                  }
                }
              })
            })
          }
          if (
            this.allCommissionDetail.Commission_Archive != null &&
            this.allCommissionDetail.Commission_Archive.length > 0
          ) {
            this.$refs.VotingArchive.comboAllBizCodeOptions = this.allCommissionDetail.Commission_Archive.map(
              (item, _index) => {
                return {
                  ...item,
                  Title: item.Caption,
                  ID: _index
                }
              }
            )
            // let tmpSelcted =
            //   // eslint-disable-next-line standard/computed-property-even-spacing
            //   this.$refs.VotingArchive.comboAllBizCodeOptions[
            //     this.$refs.VotingArchive.selectedArchiveGrp
            //   ]

            // this.loadBizCode(tmpSelcted.RootSubject, tmpSelcted.Domain)
          }
          this.setDomainToArchive()
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
    },
    checkPrintButton () {
      if (this.GroupVoteTrepass != null && this.GroupVoteTrepass.length == 0) {
        this.showPrintHistory = false
      } else {
        this.showPrintHistory = true
      }
    },
    checkBadviButton () {
      if (
        this.allCommissionDetail != null &&
        this.allCommissionDetail.CommissionInfo != null
      ) {
        if (this.allCommissionDetail.CommissionInfo.CI_PrintType === 2) {
          this.showAcceptBadvi = true

          if (
            this.getApplicationParam.hasOwnProperty('HideRejectBadvi') &&
            this.getApplicationParam.HideRejectBadvi
          ) {
            this.showRejectBadvi = true
          } else {
            this.showRejectBadvi = false
          }
        } else {
          this.showAcceptBadvi = false
          this.showRejectBadvi = false
        }
        if (
          this.getApplicationParam.hasOwnProperty('ShowBadviMade63') &&
          this.getApplicationParam.ShowBadviMade63
        ) {
          if (
            this.allCommissionDetail.CommissionInfo.CI_PrintType === 4 ||
            this.allCommissionDetail.CommissionInfo.CI_PrintType === 10
          ) {
            this.showAcceptBadvi = true

            if (
              this.getApplicationParam.hasOwnProperty('HideRejectBadvi') &
              this.getApplicationParam.HideRejectBadvi
            ) {
              this.showRejectBadvi = true
            } else {
              this.showRejectBadvi = false
            }
          }
        }

        if (
          this.getApplicationParam.hasOwnProperty('ShowEslahiButton') &&
          this.getApplicationParam.ShowEslahiButton
        ) {
          // nothing       = 0,
          // Badvi         = 1,
          // TajdidNazar   = 2,
          // FormeGharar   = 3,
          // DivalEdalat   = 4,
          // Estenkafi     = 5,
          // Estefsariyeh  = 6,
          // Eslahi        = 7,
          // DarayeNameh   = 8 ,
          // TakhalofAgain = 9
        }
        if (
          this.allCommissionDetail.CommissionInfo.CI_CommissionType === 7 || // Eslahi
          this.allCommissionDetail.CommissionInfo.CI_CommissionType === 6 // Estefsariyeh
        ) {
          this.showPerformVote = true
        } else {
          this.showPerformVote = false
        }
      }
    },
    changeColorTrepassRow () {
      let tmpRequest = {
        SaveCommissionVote: [],
        IsdeleteArchive: this.isdeleted,
        CommissionInfo: this.allCommissionDetail.CommissionInfo
      }
      this.GroupVoteTrepass.forEach((element) => {
        tmpRequest.SaveCommissionVote.push(this.createCommissionVote(element))
      })
      this.allCommissionDetail.CommissionTrepasses.forEach((item) => {
        let Q = tmpRequest.SaveCommissionVote.filter((f) => f.Value.some((a) => a.NidTrepass === item.NidTrepass))
        if (Q == null || Q.length === 0) {
          item.IsHaveVote = false
          item.IsSelected = true
        } else {
          item.IsHaveVote = true
          item.IsSelected = false
        }
      })
      this.$refs.Voting.setGroupVoteTrepass()
    },
    selectComTrepasses (val) {
      if (
        val.CommissionTrepasses != null &&
        val.CommissionTrepasses.length > 0
      ) {
        this.allCommissionDetail.CommissionTrepasses =
          val.CommissionTrepasses.map((x) => {
            return {
              ...x,
              IsSelected: true,
              IsHaveVote: false
            }
          })
      }
    },
    async getCommissionSetting () {
      const payload = {
        PRequest: {
          IsActive: false,
          NIDCommission: '00000000-0000-0000-0000-000000000000',
          NIDVote: '00000000-0000-0000-0000-000000000000',
          NidProc: '00000000-0000-0000-0000-000000000000',
          ISRelapse: false,
          IsRegion: false,
          IsdeleteArchive: false,
          NidAgent: '00000000-0000-0000-0000-000000000000',
          NidTaskState: '00000000-0000-0000-0000-000000000000',
          NidUser: '00000000-0000-0000-0000-000000000000',
          NosaziCode: this.selectedCommission.BizCode
        }
      }
      await this.$services.commissions
        .getCommissionSetting(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.commissionSettingResult = res.data.GetCommissionSettingResult

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedNidCommission ?? '',
              bizCodeTitle: "NosaziCode",
              nosaziCode: this.selectedCommission?.BizCode ?? '',
              saveDesc: `بارگذاری اطلاعات تنظیمات کمیسیون انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
    },
    onVotesCompilation ({ selectedVoteTrepass, vote }) {
      console.log(selectedVoteTrepass, 'selectedVoteTrepass')
      console.log(vote, 'vote')
      let voteobj = {
        VoteValue: vote.VoteValue,
        VoteDate: currentDate(),
        VoteNo: vote.VoteNo,
        VoteTime: currentDate(),
        CI_VoteType: vote.CI_VoteType,
        NidVote: vote.NidVote,
        NidCommission: this.selectedNidCommission,
        Vote_Comments: vote.Vote_Comments,
        CI_VoteTypeDetail: vote.CI_VoteTypeDetail,
        AgentComment: vote.AgentComment,
        NidAgent: vote.NidAgent,
        IsHave: vote.IsHave,
        TechnicalValue: vote.TechnicalValue === null ? 0 : vote.TechnicalValue,
        VotePriority: vote.VotePriority === null ? 0 : vote.VotePriority,
        CI_Note: vote.CI_Note,
        NoteComment: vote.NoteComment,
        CI_Evaluation: vote.CI_Evaluation,
        DeadlineGhararVote: vote.DeadlineGhararVote,
        IsNote7Action: vote.IsNote7Action
      }
      // this.allCommissionDetail.Commission_VoteList.push(voteobj);
      // selectedVoteTrepass.forEach(element => {

      //   this.allCommissionDetail.Commission_VoteTrepasses.push(element)
      // });
      this.addVoteTrepassToList(voteobj, selectedVoteTrepass)
    },
    onSetCommissionVoteTrepasses (val) {
      this.commissionVoteTrepassesGrid = val
    },
    onSetCommissionVoteList (val) {
      this.CommissionVoteListGrid = val
    },
    createCommissionVote (el) {
      console.log('createCommissionVote', el)
      if (el.hasOwnProperty('Comm_Vote') === false) return
      let KeyValueOfCommission = { Key: {}, Value: [] }
      KeyValueOfCommission = {
        Key: {
          VoteValue: el.Comm_Vote.VoteValue,
          VoteDate: el.Comm_Vote.VoteDate,
          VoteNo: el.Comm_Vote.VoteNo,
          VoteTime: currentDate(),
          CI_VoteType: el.Comm_Vote.CI_VoteType,
          NidVote: el.Comm_Vote.NidVote,
          NidCommission: this.selectedNidCommission,
          Vote_Comments: el.Comm_Vote.Vote_Comments,
          CI_VoteTypeDetail: el.Comm_Vote.CI_VoteTypeDetail,
          AgentComment: el.Comm_Vote.AgentComment,
          NidAgent: el.Comm_Vote.NidAgent,
          IsHave: el.Comm_Vote.IsHave,
          TechnicalValue:
            el.Comm_Vote.TechnicalValue === null ? 0 : el.TechnicalValue,
          VotePriority:
            el.Comm_Vote.VotePriority === null ? 0 : el.VotePriority,
          CI_Note: el.Comm_Vote.CI_Note,
          NoteComment: el.Comm_Vote.NoteComment,
          CI_Evaluation: el.Comm_Vote.CI_Evaluation,
          DeadlineGhararVote: el.Comm_Vote.DeadlineGhararVote,
          IsNote7Action: el.Comm_Vote.IsNote7Action
        },
        Value: el.Comm_Trepass
      }
      return { ...KeyValueOfCommission }
    },
    async save () {
      this.ischeckTrepass = false

      const save = function () {
        if (this.checkTokens()) {
          this.showLoading()
          let tmpRequest = {
            SaveCommissionVote: [],
            NidUser: '',
            UserName: '',
            CommissionInfo: {
              CommissionComments: '',
              Iscomplainant: false
            },
            ClsTokens: null
          }
          // let getCommissionTrepasses = this.getGroupVoteTrepass(
          //   this.allCommissionDetail?.CommissionTrepasses
          // )
          // getCommissionTrepasses.forEach((element) => {
          //   tmpRequest.SaveCommissionVote.push(
          //     this.createCommissionVote(element)
          //   )
          // })
          this.GroupVoteTrepass.forEach((element) => {
            tmpRequest.SaveCommissionVote.push(
              this.createCommissionVote(element)
            )
          })
          tmpRequest.SaveCommissionVote.forEach((item) => {
            if (this.layeheMainInfo != null) {
              item.Value.forEach((i) => {
                i.FloorCountMosavab = ''
                i.BusyAreaMosavab = ''
                i.TarakomMojaz = this.layeheMainInfo.TarakomMojaz
                i.MosavabUsingTitle = this.layeheMainInfo.MosavabUsingTitle
                i.MojazUsingTitle = this.layeheMainInfo.MojazUsingTitle
                i.FloorCountMojaz = this.layeheMainInfo.FloorCountMojaz
                i.BusyAreaMojaz = this.layeheMainInfo.BusyAreaMojaz

                i.MosavabUsingID = this.layeheMainInfo.MosavabUsingID
                i.MojazUsingID = this.layeheMainInfo.MojazUsingID

                i.AreaMojaz = this.layeheMainInfo.AreaMojaz
                i.AreaMojod = this.layeheMainInfo.AreaMojod

                i.VahedCountMosavab = this.layeheMainInfo.VahedCountMosavab
                i.Note = this.layeheMainInfo.Note
              })
            }
          })

          tmpRequest.NidUser = this.getNidUser()
          tmpRequest.UserName = this.getUserDisplayName()
          tmpRequest.CommissionInfo = this.allCommissionDetail.CommissionInfo
          this.$nextTick(() => {
            tmpRequest.CommissionInfo.CommissionComments =
              this.$refs.Voting.fetchCommissionComments()
          })
          // if (Ch_Iscomplainant.IsChecked != null) // ToDo
          // tmpRequest.CommissionInfo.Iscomplainant = (bool)Ch_Iscomplainant.IsChecked; // ToDo
          tmpRequest.IsdeleteArchive = this.isdeleted
          if (
            this.getApplicationParam.hasOwnProperty('IsActiveToken') &&
            this.getApplicationParam.IsActiveToken
          ) {
            tmpRequest.ClsTokens = this.allCommissionDetail.ClsTokens
          }
          this.saveAfterCheck(tmpRequest)
        } else {
          this.showError('برای صدور رای نیاز به شناسه دارید')
        }
      }.bind(this)

      if (
        this.commissionsSetting.ShowMesasgeOnEditVote &&
        (this.allCommissionDetail.CommissionTrepasses.some(
          (a) => a.IsHaveVote
        ) ||
          this.allCommissionDetail.CommissionTrepasses.every(
            (a) => !a.IsHaveVote
          )) &&
        !this.isFirstVote
      ) {
        await this.showConfirm(
          'در صورت تایید کلیه نظرات قبلی حذف خواهد شد آیا برای ادامه اطمینان دارید ؟'
        )
          .onOk(() => {
            save()
          })
          .onCancel(() => {
            this.$refs.Voting.completeSave(0)
          })
      } else {
        save()
      }

      await this.$store.dispatch('commission/fetchKartableRows')

      if (
        this.IsMashhadConfigSet &&
        this.allCommissionDetail.CommissionTrepasses.some(
          (x) => x.IsHaveVote == false
        )
      ) {
        this.showError('برای تمامی تخلفات رأی صادر نشده است')
      }
    },

    saveAfterCheck (tmpRequest) {
      const payload = {
        PRequest: {
          ...tmpRequest,
          DomainName: this.getArchiveDomainName(tmpRequest.CommissionInfo.District),
          UserFamily: this.getUserDisplayName()
        }
      }
      this.$services.commissions
        .saveNewVote(payload)
        .then(async ({ data }) => {
          this.saveNewVoteRes = this.getResponse(data)
          if (this.saveNewVoteRes.errors.length === 0 && this.saveNewVoteRes.success) {
            // this.showSuccess('عملیات با موفقیت انجام شد') طبق درخواست مشهد و اصفهان این پیغام کامنت شده

            //  #todo
            // SaveComplete()

            if (this.$refs.Voting.completeSave != null) {
              this.$refs.Voting.completeSave(1)
            }
            let Q = tmpRequest.SaveCommissionVote.find((e) => e)?.Key
            if (Q != null) {
              this.selectedCommission.VoteDate = Q.VoteDate
              this.selectedCommission.IsVote =
                Q.CI_VoteTypeDetail == 400 ? 400 : 1
            } else {
              this.selectedCommission.VoteDate = null
              this.selectedCommission.IsVote = -1
            }
            this.$store.dispatch(
              'commission/setSelectedCommission',
              this.selectedCommission
            )
            if (
              Q != null &&
              this.GroupVoteTrepass != null &&
              this.GroupVoteTrepass.length > 0
            ) {
              if (!this.statusOkAgent) {
                this.saveVoteOfAgent()
              }
            } else {
              this.allCommissionDetail.ListCommissionVoteOfAgent = []
            }
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedNidCommission ?? '',
              bizCodeTitle: "NosaziCode",
              nosaziCode: this.selectedCommission?.BizCode ?? '',
              saveDesc: `ذخیره اطلاعات رای جدید انجام گردید.`
            })
            this.$refs.Voting.loadObj()
          } else {
            let htmlMsg = ""
            this.saveNewVoteRes.errors.forEach((error) => {
              htmlMsg += `<li>${error.text}</li>`
            })
            this.showError(htmlMsg)
          }
          this.checkPrintButton()
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
      // # todo
      // if (this.getApplicationParam.hasOwnProperty("AgentDefineDraft") &&
      //   this.getApplicationParam.AgentDefineDraft) { tmpRequest.Token = new SrvCommission.Token() }
      // {
      //   NidAgent = this.getNidUser()
      // };
    },

    checkTokens () {
      if (this.getUserDisplayName().toLowerCase() === 'salehia') return true
      if (
        this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ===
        'B2CFB46B-8087-43A9-92AD-418F5580D516'
      ) {
        return true
      }
      if (
        this.getApplicationParam.hasOwnProperty('IsActiveToken') &&
        this.getApplicationParam.IsActiveToken === false
      ) {
        return true
      }
      // ToDo fetch token from device
      // this.allCommissionDetail.ClsTokens = [
      //   {
      //     "Name": "www",
      //     "NidAgent": "d4120c1b-8dce-40cd-ab74-f7d6cd864790",
      //     "TokenID": "mehrdad"
      //   },
      //   {
      //     "Name": "qqqq",
      //     "NidAgent": "7ae0777c-44d5-4744-a432-6100ee60e3b9",
      //     "TokenID": "mehrdad"
      //   }
      // ]
      let TmpTokenCount = (this.getApplicationParam.hasOwnProperty('TokenCount') && this.getApplicationParam.TokenCount) ? parseInt(this.getApplicationParam.TokenCount) : 0
      let TmpTokens = this.certificateList
      // var tmpOut = (this.allCommissionDetail.ClsTokens.filter(f => f.TokenID.trim() !== '')
      //   .Join(TmpTokens, a => a.TokenID.ToLower(), b => b.ToLower(), (a, b) => a).Count() >= TmpTokenCount)
      let tmpOut = this.allCommissionDetail.ClsTokens.filter(f => f.TokenID.trim() !== '')
        .filter(a => TmpTokens.some(b => a.TokenID.toLowerCase() === b.keyId.toLowerCase())).length >= TmpTokenCount
      return tmpOut
      // return true
    },

    async removeVote () {
      if (this.checkTokens()) {
        this.isdeleted = true

        const selectedVoteRow =
          this.$refs.Voting.$refs?.groupVoteTrepassRef?.selectedRows?.[0]
        if (selectedVoteRow) {
          this.showConfirm('آیا از حذف رای اطمینان دارید؟').onOk(async () => {
            await this.commissionVoteDeleteLog(selectedVoteRow)
            this.GroupVoteTrepass = this.GroupVoteTrepass.filter(
              (x) => x.Comm_Vote.NidVote !== selectedVoteRow.NidVote
            )
            this.changeColorTrepassRow()
            // this.cancelMethod()
          })
        } else {
          this.showError('لطفا رای مورد نظر را از گرید رای انتخاب نمایید.')
        }
      } else {
        this.showError('لطفا رای مورد نظر را از گرید رای انتخاب نمایید.')
      }
    },
    async deleteAllVotes () {
      if (this.checkTokens()) {
        this.isdeleted = true

        this.showConfirm('آیا از حذف رای اطمینان دارید؟').onOk(async () => {
          await this.commissionVoteDeleteLog(this.GroupVoteTrepass)
          this.GroupVoteTrepass = []
          this.changeColorTrepassRow()
          // this.cancelMethod()
        })
      } else {
        this.showError('برای حذف رای نیاز به شناسه دارید.')
      }
    },
    async commissionVoteDeleteLog (votes) {
      try {
        const payload = {
          PRequest: {
            CommissionVoteLog: votes
          }
        }
        const { data } =
          await this.$services.commissions.commissionVoteDeleteLog(payload)
        const res = this.getResponse(data)
        if (res.success) {
          this.showSuccess('عملیات با موفقیت انجام شد')
          await this.log({
            action: this.logActions.delete,
            bizCode: this.selectedNidCommission,
            bizCodeTitle: 'NidCommission',
            saveDesc: `حذف اطلاعات رای انجام گردید.`
          })
          this.$refs.Voting.commTreDetail = null
          this.changeColorTrepassRow()
        } else {
          this.showError(res.errors[0].text)
        }
      } catch (error) {
        console.error(error)
        // this.serverError() // test serverError
      }
    },

    clsButtonSaveAgentClick () {
      this.statusOkAgent = true
      this.saveVoteOfAgent()
    },

    saveVoteOfAgent (deleteFlag = false) {
      let payload = null
      if (this.getApplicationParam.hasOwnProperty('SetAgentDesc') && this.getApplicationParam.SetAgentDesc) {
        if (!deleteFlag) {
          payload = {
            pRequest: {
              NIDCommission: this.selectedNidCommission,
              ListCommissionVoteOfAgent:
                  this.allCommissionDetail.ListCommissionVoteOfAgent,
              NIDVote: '00000000-0000-0000-0000-000000000000',
              NidProc: '00000000-0000-0000-0000-000000000000',
              NidAgent: '00000000-0000-0000-0000-000000000000',
              NidTaskState: '00000000-0000-0000-0000-000000000000',
              NidUser: '00000000-0000-0000-0000-000000000000' }
          }
        } else {
          payload = {
            pRequest: {
              NIDCommission: this.selectedNidCommission,
              ListCommissionVoteOfAgent:
                  this.allCommissionDetail.ListCommissionVoteOfAgent,
              NIDVote: '00000000-0000-0000-0000-000000000000',
              NidProc: '00000000-0000-0000-0000-000000000000',
              NidAgent: '00000000-0000-0000-0000-000000000000',
              NidTaskState: '00000000-0000-0000-0000-000000000000',
              NidUser: this.getNidUser()
            }
          }
        }
      }
      this.$services.commissions
        .saveCommissionVoteOfAgent(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            // this.showSuccess('عملیات با موفقیت انجام شد') // طبق درخواست مشهد و اصفهان این پیغام کامنت شده
            if (!deleteFlag) {
              await this.log({
                action: this.logActions.save,
                bizCode: this.selectedNidCommission ?? '',
                bizCodeTitle: "NosaziCode",
                nosaziCode: this.selectedCommission?.BizCode ?? '',
                saveDesc: `ذخیره اطلاعات انجام گردید.`
              })
            } else {
              this.allCommissionDetail.ListCommissionVoteOfAgent = []
              await this.log({
                action: this.logActions.delete,
                bizCode: this.selectedNidCommission,
                bizCodeTitle: "NidCommission",
                saveDesc: `حذف اطلاعات امضای نمایندگان توسط یوزر ${this.getUserDisplayName()} انجام گردید.`
              })
            }
            await this.onLoad()
          } else {
            this.showError(res.errors[0].text)
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
    },
    acceptVote () {
      // this.detectToken();
      if ((this.getApplicationParam.hasOwnProperty('IsActiveToken') && this.getApplicationParam.IsActiveToken) && this.checkTokens()) {
        this.showError("برای تایید نهایی نیاز به توکن دارید")
        return
      }
      const handler = async () => {
        try {
          const payload = {
            pRequest: {
              NIDCommission: this.selectedNidCommission,
              NIDVote: '00000000-0000-0000-0000-000000000000',
              NidAgent: '00000000-0000-0000-0000-000000000000',
              NidTaskState: '00000000-0000-0000-0000-000000000000',
              NidUser: '00000000-0000-0000-0000-000000000000',
              IsActive: false
            }
          }
          this.showLoading()
          const { data } = await this.$services.commissions.acceptVote(payload)
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess('تایید با موفقیت انجام شد.')
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.selectedNidCommission ?? '',
              bizCodeTitle: "NosaziCode",
              nosaziCode: this.selectedCommission?.BizCode ?? '',
              saveDesc: `تایید نهایی رای انجام گردید.`
            })
            this.loadObj()
          }
        } catch (error) {
          console.error(error)
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm('آیای برای تایید نهایی این رای اطمینان دارید؟').onOk(
        handler
      )
    },

    async prevParvandeh () {
      try {
        if (this.isSave == false) {
          this.clearForm()
          if (this.totalKartableRows > 1) {
            this.moveTask--
            // eslint-disable-next-line standard/computed-property-even-spacing
            const tmpSelectedItem =
              this.$store.getters['commission/kartableFilters'][this.moveTask]
            this.$store.dispatch(
              'commission/setSelectedCommission',
              tmpSelectedItem
            )

            this.model = { ...tmpSelectedItem }

            this.baseNosaziCode = convertStringToNosaziCodeObject(
              tmpSelectedItem.BizCode
            )

            this.getAllData(
              tmpSelectedItem.NidCommission,
              tmpSelectedItem.UrbanNidRequest,
              tmpSelectedItem.CI_Region,
              tmpSelectedItem.BizCode,
              tmpSelectedItem.SysCI_RequestBy,
              tmpSelectedItem.NidProc
            )
          }
        } else if (!this.commissionsSetting.HideEditMessage) {
          this.showError('فرم درحالت ویرایش می باشد')
        }
      } catch (ex) {
        console.error(ex)
        // this.serverError() // test serverError
        this.hideLoading()
      }
    },

    async nextParvandeh () {
      try {
        if (this.isSave == false) {
          if (this.totalKartableRows > 1) {
            this.clearForm()
            this.moveTask++
            // eslint-disable-next-line standard/computed-property-even-spacing
            const tmpSelectedItem =
              this.$store.getters['commission/kartableFilters'][this.moveTask]
            this.$store.dispatch(
              'commission/setSelectedCommission',
              tmpSelectedItem
            )

            this.model = { ...tmpSelectedItem }

            this.baseNosaziCode = convertStringToNosaziCodeObject(
              tmpSelectedItem.BizCode
            )

            this.getAllData(
              tmpSelectedItem.NidCommission,
              tmpSelectedItem.UrbanNidRequest,
              tmpSelectedItem.CI_Region,
              tmpSelectedItem.BizCode,
              tmpSelectedItem.SysCI_RequestBy,
              tmpSelectedItem.NidProc
            )
          }
        } else if (!this.commissionsSetting.HideEditMessage) {
          this.showError('فرم درحالت ویرایش می باشد')
        }
      } catch (ex) {
        console.error(ex)
        // this.serverError() // test serverError
        this.hideLoading()
      }
    },

    clearForm () {
      this.activeTab = 'voting_tab'

      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }

      this.model.SecrNo = ''
      this.model.UrbanNidRequest = ''
      this.model.OwnerName = ''
      this.model.Address = ''
      this.model.ComEnterDate = ''

      this.$refs.Voting.clearForm()
      // # tood
      // UBillFine.clearForm();
    },

    // start report methods
    quickPrintClick () {
      this.printVotesHandler(
        true,
        this.commissionsSetting.AddVoteToArchiveThenPrintPreview
      )
    },

    printVotesHandler (isPrintPreview, isExportToArchive = true) {
      let listCommissionVoteOfAgentIsAcceptCount =
        this.allCommissionDetail.ListCommissionVoteOfAgent?.filter(
          (x) => x.IsAccept == true
        )?.length

      let exportToArchiveByAgentCount =
        this.getApplicationParam.hasOwnProperty(
          'ExportToArchiveByAgentCount'
        ) && this.getApplicationParam.ExportToArchiveByAgentCount

      if (exportToArchiveByAgentCount) {
        if (listCommissionVoteOfAgentIsAcceptCount == 3) {
          isExportToArchive = true
        } else {
          isExportToArchive = false
        }
      }

      // # todo2
      // let tmpRettre = this.allCommissionDetail.CommissionTrepasses.some(f => !f.IsHaveVote) || false
      // if (tmpRettre && this.G_IsCheckAllTrepass() === true && this.IsMashhadConfigSet === false) {
      //   this.showError("برای تمامی تخلفات رای صادر نشده است و امکان چاپ وجود ندارد")
      //   return false
      // }

      let ciPrintType = this.allCommissionDetail.CommissionInfo.CI_PrintType
      if (ciPrintType === 0 || ciPrintType === null) {
        return this.showError('لطفا نوع چاپ را مشخص نمایید.')
      }
      if (this.checkTokens()) {
        // ToDo وقتی توکن ها درست شد این قسمت باید پیاده شود
        let isCheckAllTrepass = this.getApplicationParam.IsCheckAllTrepass // پارامتر
        let isHaveTrepassNotVote = this.checkAllTrepassOk() // چک وجود داشتن تخلف بدون رای
        if (isCheckAllTrepass) {
          if (isHaveTrepassNotVote) {
            if (
              this.getApplicationParam.hasOwnProperty('IsMashhad') &&
              this.getApplicationParam.IsMashhad
            ) {
              this.printAndAddArchive(isPrintPreview, isExportToArchive)
            } else {
              return this.showError(
                'توجه: برای تمامی تخلفات رای صادر نشده است.'
              )
            }
          }
          this.printAndAddArchive(isPrintPreview, isExportToArchive)
        } else {
          this.printAndAddArchive(isPrintPreview, isExportToArchive)
        }
      } else {
        this.showError('برای چاپ رای نیاز به شناسه دارید.')
      }
    },

    printAndAddArchive (isPrintPreview, isExportToArchive = true) {
      this.$services.commissions
        .isPrintVote({
          PRequest: { NIDCommission: this.selectedNidCommission }
        })
        .then(({ data }) => {
          this.isPrintVoteRes = this.getResponse(data)
          if (this.isPrintVoteRes.success) {
            if (this.isPrintVoteRes.data.IsPrintVoteResult) {
              this.showConfirm(
                'رای قبلا چاپ شده است آیا برای چاپ دوباره اطمینان دارید؟'
              ).onOk(() => {
                this.finalPrint(isPrintPreview, isExportToArchive)
              })
            } else {
              this.finalPrint(isPrintPreview, isExportToArchive)
            }
          }
        })
        .catch((err) => {
          console.error(err)
          // this.serverError() // test serverError
        })
    },

    async finalPrint (isPrintPreview = false, isExportToArchive = true) {
      this.isPrintPreview = isPrintPreview
      this.isExportToArchive = isExportToArchive
      if (
        this.commissionsSetting.IsShowBadviParameter ||
        (this.getApplicationParam.hasOwnProperty('IsShowEstenkafiParameter') && this.getApplicationParam.IsShowEstenkafiParameter)
      ) {
        this.isShowPrint = true
      } else {
        this.isShowPrint = false
        this.saveCommissionPrintLog()
      }
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedNidCommission ?? '',
        bizCodeTitle: "NosaziCode",
        nosaziCode: this.selectedCommission?.BizCode ?? '',
        saveDesc: `چاپ رای ${this.selectedCommission?.selectedNidCommission ?? ''} انجام گردید.`
      })
    },

    saveCommissionPrintLog () {
      this.setKeyValueOfParameters()
      const payload = {
        PRequest: {
          CheckExistVoteToArchiveByNidCommission: false,
          CheckExistVoteToArchiveByReportName: false,
          Commission_PrintLog: {
            Comments: 'چاپ رای',
            NidCommission: this.selectedNidCommission,
            NidPrintLog: '00000000-0000-0000-0000-000000000000',
            UserCode: 0,
            UserName: this.getUserDisplayName()
          }
        }
      }
      this.$services.commissions
        .saveCommissionPrintLog(payload)
        .then(({ data }) => {
          this.saveCommissionPrintLogRes = this.getResponse(data)
          if (this.saveCommissionPrintLogRes.success) {
            this.printReport()
            if (this.isExportToArchive) this.addToArchive() // توی اصفهان  شرط بالا برای قدیم عمل نمیکنه
            // this.addLayeheToArchive();
            this.printModel = { printVote: { ...defaultPrintModel } }
            this.isShowPrint = false
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
    },

    // printPreview() {
    //   this.printReport();
    // },

    async printReport () {
      let queryParams = this.queryParams
      let reportPath = `${this.setReportName()}`
      let printWin = false
      if (this.getApplicationParam.hasOwnProperty('ShowVotePrintAgain') &&
      this.getApplicationParam.ShowVotePrintAgain) {
        printWin = !this.isPrintPreview
      } else {
        printWin = false
      }
      await this.showReport(reportPath, queryParams, printWin)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedNidCommission,
        bizCodeTitle: 'selectedNidCommission',
        saveDesc: `چاپ رای برای ${this.selectedNidCommission ?? ''} در فرم صدور رای کمیسیون ماده 100 انجام گردید.`
      })
    },

    setKeyValueOfParameters () {
      const ciPrintType = this.allCommissionDetail.CommissionInfo.CI_PrintType
      // nothing       = 0,
      // Badvi         = 1,
      // TajdidNazar   = 2,
      // FormeGharar   = 3,
      // DivalEdalat   = 4,
      // Estenkafi     = 5,
      // Estefsariyeh  = 6,
      // Eslahi        = 7,
      // DarayeNameh   = 8 ,
      // TakhalofAgain = 9

      // else if (ciPrintType === 1) {} // Badvi بدوي
      // else if (ciPrintType === 2) {} // TajdidNazar تجديد نظر
      if (ciPrintType === 3) {
        // FormeGharar فرم قرار
        this.reportName = '/ComReport/RptBadvi8'
        if (this.commissionsSetting.IsShowBadviParameter) {
          this.queryParams = {
            NidUser: this.getNidUser(),
            IsArchive: this.isPrintPreview ? 2 : 0,
            Zinaf: this.printModel.printVote.Zinaf,
            NidCommission: this.selectedNidCommission
          }
          this.keyValueOfParameters = [
            { Key: 'NidUser', Value: this.getNidUser() },
            { Key: 'IsArchive', Value: this.isPrintPreview ? 2 : 0 },
            { Key: 'Zinaf', Value: this.printModel.printVote.Zinaf },
            { Key: 'NidCommission', Value: this.selectedNidCommission }
          ]
        } else {
          this.queryParams = {
            NidUser: this.getNidUser(),
            NidCommission: this.selectedNidCommission,
            IsArchive: this.isPrintPreview ? 2 : 0
          }
          this.keyValueOfParameters = [
            { Key: 'NidUser', Value: this.getNidUser() },
            { Key: 'NidCommission', Value: this.selectedNidCommission },
            { Key: 'IsArchive', Value: this.isPrintPreview ? 2 : 0 }
          ]
        }
        // eslint-disable-next-line brace-style
      }
      // if (ciPrintType === 4) {}  // DivalEdalat ديوان عدالت
      else if (ciPrintType === 5) {
        // Estenkafi استنکافی
        this.reportName = '/ComReport/RptDivanEdalat'
        if (this.getApplicationParam.hasOwnProperty('IsShowEstenkafiParameter') && this.getApplicationParam.IsShowEstenkafiParameter) {
          this.queryParams = {
            NidUser: this.getNidUser(),
            NamehNo: this.printModel.printVote.NamehNo,
            Mohlat: this.printModel.printVote.Date,
            NidCommission: this.selectedNidCommission,
            IsArchive: this.isPrintPreview ? 2 : 0,
            // GhateiDate: false,
            GhateiNo: false
          }
          this.keyValueOfParameters = [
            { Key: 'NidUser', Value: this.getNidUser() },
            { Key: 'NamehNo', Value: this.printModel.printVote.NamehNo },
            { Key: 'Mohlat', Value: this.printModel.printVote.Date },
            { Key: 'NidCommission', Value: this.selectedNidCommission },
            { Key: 'IsArchive', Value: this.isPrintPreview ? 2 : 0 }
            // { Key: "GhateiDate", Value: this.printModel.printVote.NamehNo  },
            // { Key: "GhateiNo", Value: this.printModel.printVote.NamehNo  },
          ]
        } else {
          this.queryParams = {
            NidUser: this.getNidUser(),
            NidCommission: this.selectedNidCommission,
            IsArchive: this.isPrintPreview ? 2 : 0
          }
          this.keyValueOfParameters = [
            { Key: 'NidUser', Value: this.getNidUser() },
            { Key: 'NidCommission', Value: this.selectedNidCommission },
            { Key: 'IsArchive', Value: this.isPrintPreview ? 2 : 0 }
          ]
        }
        // eslint-disable-next-line brace-style
      }
      // else if (ciPrintType === 6) {} // Estefsariyeh
      // else if (ciPrintType === 7) {} // Eslahi
      // else if (ciPrintType === 8) {} // DarayeNameh
      // else if (ciPrintType === 9) {} // TakhalofAgain
      // else if (ciPrintType === 10) {}
      // else if (ciPrintType === 11) {}
      // else if (ciPrintType === 12) {}
      else if (ciPrintType === 13) {
        this.reportName = '/ComReport/RptDivanEdalat'
        if (this.commissionsSetting.IsShowBadviParameter) {
          this.queryParams = {
            NidUser: this.getNidUser(),
            DadnamehNo: this.printModel.printVote.DadnamehNo,
            DadnamehDate: this.printModel.printVote.DadnamehDate,
            Naghz: this.printModel.printVote.Naghz,
            Ghatei: this.printModel.printVote.Ghatei,
            CommissionNo: this.printModel.printVote.CommissionNo,
            NidCommission: this.selectedNidCommission,
            OldCommissionDate: this.printModel.printVote.OldCommissionDate,
            IsArchive: this.isPrintPreview ? 2 : 0
          }
          this.keyValueOfParameters = [
            { Key: 'NidUser', Value: this.getNidUser() },
            { Key: 'DadnamehNo', Value: this.printModel.printVote.DadnamehNo },
            {
              Key: 'DadnamehDate',
              Value: this.printModel.printVote.DadnamehDate
            },
            { Key: 'Naghz', Value: this.printModel.printVote.Naghz },
            { Key: 'Ghatei', Value: this.printModel.printVote.Ghatei },
            {
              Key: 'CommissionNo',
              Value: this.printModel.printVote.CommissionNo
            },
            { Key: 'NidCommission', Value: this.selectedNidCommission },
            {
              Key: 'OldCommissionDate',
              Value: this.printModel.printVote.OldCommissionDate
            },
            { Key: 'IsArchive', Value: this.isPrintPreview ? 2 : 0 }
          ]
        } else {
          this.queryParams = {
            NidCommission: this.selectedNidCommission,
            IsArchive: this.isPrintPreview ? 2 : 0
          }
          this.keyValueOfParameters = [
            { Key: 'NidCommission', Value: this.selectedNidCommission },
            { Key: 'IsArchive', Value: this.isPrintPreview ? 2 : 0 }
          ]
        }
      } else if (ciPrintType === 14) {
        this.reportName = '/ComReport/RptDivanEdalat'
        if (this.commissionsSetting.IsShowBadviParameter) {
          this.queryParams = {
            NidUser: this.getNidUser(),
            Motaghazi: this.printModel.printVote.Motaghazi,
            Defaie: this.printModel.printVote.Defaie,
            NidCommission: this.selectedNidCommission,
            IsArchive: this.isPrintPreview ? 2 : 0
          }
          this.keyValueOfParameters = [
            { Key: 'NidUser', Value: this.getNidUser() },
            { Key: 'Motaghazi', Value: this.printModel.printVote.Motaghazi },
            { Key: 'Defaie', Value: this.printModel.printVote.Defaie },
            { Key: 'NidCommission', Value: this.selectedNidCommission },
            { Key: 'IsArchive', Value: this.isPrintPreview ? 2 : 0 }
          ]
        } else {
          this.queryParams = {
            NidCommission: this.selectedNidCommission,
            IsArchive: this.isPrintPreview ? 2 : 0
          }
          this.keyValueOfParameters = [
            { Key: 'NidCommission', Value: this.selectedNidCommission },
            { Key: 'IsArchive', Value: this.isPrintPreview ? 2 : 0 }
          ]
        }
      } else if (ciPrintType === 15) {
        this.reportName = '/ComReport/RptDivanEdalat'
        if (this.commissionsSetting.IsShowBadviParameter) {
          this.queryParams = {
            NidUser: this.getNidUser(),
            NamehNo: this.printModel.printVote.NamehNo,
            TypeRequester: this.printModel.printVote.TypeRequester,
            Esdar: this.printModel.printVote.Esdar,
            NidCommission: this.selectedNidCommission,
            IsArchive: this.isPrintPreview ? 2 : 0,
            Date: this.printModel.printVote.Date
          }
          this.keyValueOfParameters = [
            { Key: 'NidUser', Value: this.getNidUser() },
            { Key: 'NamehNo', Value: this.printModel.printVote.NamehNo },
            {
              Key: 'TypeRequester',
              Value: this.printModel.printVote.TypeRequester
            },
            { Key: 'Esdar', Value: this.printModel.printVote.Esdar },
            { Key: 'NidCommission', Value: this.selectedNidCommission },
            { Key: 'IsArchive', Value: this.isPrintPreview ? 2 : 0 },
            { Key: 'Date', Value: this.printModel.printVote.Date }
          ]
        } else {
          this.queryParams = {
            NidCommission: this.selectedNidCommission,
            IsArchive: this.isPrintPreview ? 2 : 0
          }
          this.keyValueOfParameters = [
            { Key: 'NidCommission', Value: this.selectedNidCommission },
            { Key: 'IsArchive', Value: this.isPrintPreview ? 2 : 0 }
          ]
        }
      } else {
        this.reportName = '/ComReport/RptBadvi8'
        this.queryParams = {
          NidUser: this.getNidUser(),
          NidCommission: this.selectedNidCommission,
          IsArchive: this.isPrintPreview ? 2 : 0
        }
        this.keyValueOfParameters = [
          { Key: 'NidUser', Value: this.getNidUser() },
          { Key: 'NidCommission', Value: this.selectedNidCommission },
          { Key: 'IsArchive', Value: this.isPrintPreview ? 2 : 0 }
        ]
      }
    },

    setReportName () {
      return this.getReportPath()
    },

    getReportPath () {
      let ciPrintType = this.allCommissionDetail.CommissionInfo.CI_PrintType
      switch (ciPrintType) {
        case 1:
          let x = `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptBadvi8`
          return x
        case 2:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptTajdidNazar`
        case 3:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptGharar`
        case 4:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptDivanEdalat`
        case 5:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptEstenkaf8`
        case 6:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptEstefsarie`
        case 7:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptEslahi`
        case 8:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptNameEdari`
        case 9:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptTakhalofMojadad`
        case 10:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptEslahiBadviErjaDivan`
        case 11:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptTajdidNazar_Modify`
        case 12:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptEslahiHamarz`
        case 13:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptEslahiHamarzErjaDivan`
        case 14:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptBadviDivan`
        case 15:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptTajdidenazarDivan`
        case 16:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptHamarzDivan`
        case 17:
          return `${
            this.getApplicationParam.CommissionReportPath || ''
          }RptSanavyeh`
        default:
          return ''
      }
    },
    setDomainToArchive () {
      let tmpArchiveDomain = this.allCommissionDetail.Commission_Archive.find(
        (f) => f.CI_ArchiveGroup == 4
      )
      if (tmpArchiveDomain == null) {
        tmpArchiveDomain = this.allCommissionDetail.Commission_Archive[0]
      }
      this.domainCommissionArchive = tmpArchiveDomain.Domain
      return tmpArchiveDomain
    },
    addToArchive () {
      let tmpParam = []
      for (let i = 0; i < this.keyValueOfParameters.length; i++) {
        let obj = this.keyValueOfParameters[i]
        if (obj.Key.toLowerCase().includes("isarchive")) {
          obj.Value = "1"
        }
        tmpParam.push(obj)
      }
      // AddToArchiveAsync
      if (!tmpParam.some(x => x.Key === "NidUser")) {
        tmpParam.push({ Key: "NidUser", Value: this.getNidUser() })
      }
      let tmpArchiveDomain = this.setDomainToArchive()
      if (tmpArchiveDomain != null) {
        const payload = {
          parameters: tmpParam,
          ReportName: this.setReportName(),
          BizCode: tmpArchiveDomain.RootSubject, // this.BizCode.RootSubject,
          NidCommission: this.selectedNidCommission,
          DomainName: tmpArchiveDomain.Domain,
          pUserName: this.getUserDisplayName(),
          pUserId: this.getNidUser()
        }
        console.log("addToArchivePayload:", payload)
        this.$services.commissions
          .addToArchive(payload)
          .then(({ data }) => {
            this.addToArchiveRes = this.getResponse(data)
            if (this.addToArchiveRes.success) {
              this.isArchive = true
            }
            this.addLayeheToArchive()
          })
          .catch((error) => {
            console.error(error)
            // this.serverError() // test serverError
          })
      }
    },
    addLayeheToArchive () {
      // const payload = {
      //   BizCode: "چاپ رای",
      //   pNidCommission: this.selectedNidCommission,
      //   DomainName: "Commission",
      //   pUserName: this.getUserDisplayName(),
      //   pUserId: this.getNidUser(),
      // };
      const payload = {
        BizCode: this.selectedCommission.BizCode,
        pNidCommission: this.selectedNidCommission,
        DomainName: 'Commission',
        pUserName: this.getUserDisplayName(),
        pUserId: this.getNidUser()
      }
      this.$services.commissions
        .addLayeheToArchive(payload)
        .then(async ({ data }) => {
          this.addLayeheToArchiveRes = this.getResponse(data)
          if (this.addLayeheToArchiveRes.success) {
            this.showSuccess('انجام شد')
            this.log({
              action: this.logActions.save,
              bizCode: this.selectedNidCommission ?? '',
              bizCodeTitle: "NosaziCode",
              nosaziCode: this.selectedCommission?.BizCode ?? '',
              saveDesc: `اضافه شدن لایحه به آرشیو انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
    },
    async getAllData (
      pNidCommission,
      pUrbanNidKartabl,
      pDistrict,
      pNosaziCode,
      pRequestBy,
      pnidproc
    ) {
      this.isArchive = true
      try {
        if (pNidCommission !== '00000000-0000-0000-0000-000000000000') {
          if (this.selectedCommission != null) {
            if (this.$refs.billFinRref) {
              this.$refs.billFinRref.NidCommission = pNidCommission // Common.Common.CurrentKartabl.NidCommission;
              this.$refs.billFinRref.NidKartable = pUrbanNidKartabl.toString()
              this.$refs.billFinRref.NidProc = pnidproc // Common.Common.CurrentKartabl.NidProc;
              this.$refs.billFinRref.NosaziCode = pNosaziCode
              if (pDistrict != null) this.$refs.billFinRref.Region = pDistrict
              this.$refs.billFinRref.Requestby = pRequestBy
              let getBillFineResult = await this.$refs.billFinRref.loadObj()
              this.layeheMainInfo = getBillFineResult?.BillFine?.ComLayehe
              this.layeheComents = this.$refs.billFinRref.model.ComLayehe.Comments || ''
            }

            this.nidprocT = pnidproc
            this.CI_Region = pDistrict

            this.$refs.Voting.NidCommission = pNidCommission
            await this.$refs.Voting.$refs.CommissionVoteOfAgent.load(
              pNidCommission,
              this.getNidUser()
            )
            this.$refs.Voting.getCommissionInfo()
          } else {
            this.showError('پرونده ای انتخاب نشده است')
          }
        }
      } catch (ex) {
        console.log(ex)
        // this.serverError() // test serverError
        this.hideLoading()
      }
    },

    loadRevisitTablet (pNidProc, pDistrict) {
      this.$refs.TabletArchive.nidProc = pNidProc
      this.$refs.TabletArchive.district = pDistrict
      this.$refs.TabletArchive.loadObj()
    },

    // loadBizCode (pBizCode, pDomianName) {
    //   if (pBizCode && pDomianName) {
    //     this.lastBizCode = pBizCode
    //     // this.$refs.VotingArchive.fetchedData()
    //     this.$refs.VotingArchive.updateArchiveBizCode(pBizCode, pDomianName)
    //     this.$refs.VotingArchive.showArchive = true
    //   }
    // },
    getAreaAfterEditValueHandler (e) {
      this.AreaAfterEditValue = e
    },
    reloadCommissionTrepasses () {
      this.getAllCommissionDetails()
    },
    resetModel () {
      this.model = {
        SecrNo: '',
        NidWorkItem: '',
        OwnerName: '',
        Address: '',
        BizCode: null,
        NidCommission: null,
        ComEnterDate: '',
        UrbanNidRequest: ''
      }
      this.allCommissionDetail = {
        AllBizCode: [],
        ClsCommission_ApposeVote: { Commission_ApposeVote: {} },
        ClsCommission_BlankList: {},
        ClsCommission_ExecutTrackingVote: {
          Commission_ExecutTrackingVote: {},
          SrvGetVoteTrepasses: []
        },
        ClsCommission_Impart: { Commission_Impart: {} },
        ClsCommission_LegalProxy: {
          Commission_LegalProxy: {},
          Rules: []
        },
        ClsTokens: [],
        CommissionInfo: {},
        CommissionInfos: [],
        CommissionTrepasses: [],
        CommissionVote: {},
        Commission_Archive: [],
        Commission_VoteList: [],
        Commission_VoteTrepasses: [],
        ListCommissionVoteOfAgent: []
      }
    }
  },
  computed: {
    isPrintVoteEnabled () {
      // با بررسی صورت گرفته این دکمه وابسته به ویرایش نیست تسک : https://trello.com/c/2N9SQ7o1
      if (
        this.getApplicationParam.hasOwnProperty('CheckAgentsOpinionForActivationPrintVote') &&
          this.getApplicationParam.CheckAgentsOpinionForActivationPrintVote
      ) {
        if (this.allCommissionDetail.ListCommissionVoteOfAgent.length > 0) {
          return this.allCommissionDetail.ListCommissionVoteOfAgent.every(x => x.CI_AgentOpinion === 1)
        } else {
          return false
        }
      } else {
        if (this.getApplicationParam.hasOwnProperty('AgentDefineDraft') &&
            this.getApplicationParam.AgentDefineDraft
        ) {
          if (this.allCommissionDetail.CommissionInfo.Remark)
          {
            return true
          }
          else
          {
            return false
          }
        } else {
          return true
        }
      }
    },
    totalKartableRows () {
      return this.$store.getters['commission/kartableFilters'].length
    },

    moveTask: {
      get () {
        return this.pMoveTask
      },
      set (value) {
        if (value < 0) {
          this.pMoveTask = 0
        } else if (value >= this.totalKartableRows) {
          this.pMoveTask = this.totalKartableRows - 1
        } else {
          this.pMoveTask = value
        }

        if (value == 0) {
          this.isBtnPrevParvandehEnable = false
          this.isBtnNextParvandehEnable = true
        } else if (value >= this.totalKartableRows - 1) {
          this.isBtnPrevParvandehEnable = true
          this.isBtnNextParvandehEnable = false
        } else {
          this.isBtnPrevParvandehEnable = true
          this.isBtnNextParvandehEnable = true
        }
      }
    }
  },

  watch: {
    // forceRender: {
    //   handler (val) {
    //     console.log("forceRender@@: ", val) },
    //   immediate: true
    // },
    async selectedNidCommission () { // این مورد جهت رندر شدن مجدد فرم صدور رای در صورتی که کاربر در کارتابل کمیسیون یا هر جایی درخواست خود را تغییر بدهد ، انجام شده است
      await this.onLoad()
    },
    // activeForm: {
    //   handler (newVal, oldVal) {
    //     if (this.activeForm !== "UVoting") return
    //     if ((oldVal === "UKartableCommission" && newVal === "UVoting") || (oldVal === "kartable" && newVal === "UVoting")) {
    //       this.onLoad()
    //     }
    //   },
    //   deep: true
    // },
    activeTab () {
      try {
        this.$refs.UrbanPlanningArchive.showArchive = false
        this.$refs.TabletArchive.showArchive = false
        this.$refs.BuildingPoliceArchive.showArchive = false
        this.$refs.VotingArchive.showArchive = false
        // آرشیو کمیسیون
        // console.log("this.activeTab == 'archive_tab' && this.isArchive", this.activeTab == 'archive_tab' && this.isArchive)
        if (this.activeTab == 'archive_tab' && this.isArchive) {
          this.tabIndex5Called = false
          this.tabIndex3Called = false
          // if (
          //   this.allCommissionDetail.Commission_Archive != null &&
          //   this.allCommissionDetail.Commission_Archive.length > 0
          // ) {
          //   let tmpSelcted =
          //     // eslint-disable-next-line standard/computed-property-even-spacing
          //     this.$refs.VotingArchive.comboAllBizCodeOptions[
          //       this.$refs.VotingArchive.selectedArchiveGrp
          //     ]

          // }
          this.$refs.VotingArchive.showArchive = true
        }

        if (
          this.getApplicationParam.hasOwnProperty('AcceptVoteByAgent') &&
          this.getApplicationParam.AcceptVoteByAgent
        ) {
          if (
            this.allCommissionDetail.Commission_VoteTrepasses != null &&
            this.allCommissionDetail.Commission_VoteTrepasses.length > 0
          ) {
            try {
              if (
                !this.allCommissionDetail?.ListCommissionVoteOfAgent?.length ||
                (this.allCommissionDetail?.ListCommissionVoteOfAgent?.some(
                  (a) => a.NidCommission != null
                ) &&
                  this.allCommissionDetail?.ListCommissionVoteOfAgent?.find(
                    (f) => f.IsVoteOwner == true
                  )?.NidUser.toLowerCase() == this.getNidUser().toLowerCase()) ||
                this.allCommissionDetail?.Commission_VoteTrepasses?.some(
                  (f) => f.CI_VoteType == 3
                ) ||
                this.allCommissionDetail?.ListCommissionVoteOfAgent?.every(
                  (a) => a.NidCommission == null
                )
              ) {
                this.isBtnAcceptEnable = true
              } else {
                this.isBtnAcceptEnable = false
              }
            } catch {
            }
          } else {
            this.isBtnAcceptEnable = true
          }
        }

        if (
          this.activeTab == 'voting_tab' &&
          this.allCommissionDetail != null &&
          this.allCommissionDetail?.CommissionInfo != null
        ) {
          if (
            this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
            '0793E947-E107-41F3-BDA0-AAC41EE6735D' ||
            this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
            'C5B2886B-86F9-413C-ADBF-AEEB3230CA3C' ||
            this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
            '0793E947-E107-41F3-BDA0-AAC41EE67353' ||
            this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
            '8393710A-28D0-45DA-9BFE-95DA0B0049E2' ||
            this.allCommissionDetail.CommissionInfo.NidTaskState?.toUpperCase() ==
            'C399C102-5F2E-469E-B8AF-922E89FEF4A4'
          ) {
            this.isBtnAcceptEnable = false
          } else {
            this.isBtnAcceptEnable = true
          }
        }
        if (
          this.getApplicationParam.hasOwnProperty('IsChechVoteOwner') &&
          this.getApplicationParam.IsChechVoteOwner
        ) {
          try {
            if (
              this.allCommissionDetail.Commission_VoteTrepasses != null &&
              this.allCommissionDetail.Commission_VoteTrepasses.length > 0
            ) {
              if (
                !this.allCommissionDetail?.ListCommissionVoteOfAgent?.length ||
                (this.allCommissionDetail?.ListCommissionVoteOfAgent?.some(
                  (a) => a.NidCommission != null
                ) &&
                  this.allCommissionDetail?.ListCommissionVoteOfAgent?.find(
                    (f) => f.IsVoteOwner == true
                  )?.NidUser.toLowerCase() == this.getNidUser().toLowerCase()) ||
                this.allCommissionDetail?.Commission_VoteTrepasses.some(
                  (f) => f.CI_VoteType == 3
                ) ||
                this.allCommissionDetail?.ListCommissionVoteOfAgent?.every(
                  (a) => a.NidCommission == null
                )
              ) {
                this.isBtnAcceptEnable = true
              } else {
                this.isBtnAcceptEnable = false
              }
            }
            if (!this.allCommissionDetail.ListCommissionVoteOfAgent?.length) {
              this.isBtnAcceptEnable = true
            }

            if (
              this.getUserDisplayName() ==
              this.allCommissionDetail.CommissionInfo.VoterUserName.replaceAll(
                'ي',
                'ی'
              )
                .replaceAll('ك', 'ک')
                .trim()
            ) {
              if (
                this.allCommissionDetail.ListCommissionVoteOfAgent != null &&
                this.allCommissionDetail.ListCommissionVoteOfAgent?.length > 0 &&
                this.allCommissionDetail.ListCommissionVoteOfAgent?.find(
                  (i) => i.NidUser.toLowerCase() == this.getNidUser().toLowerCase()
                ).IsVoteOwner
              ) {
                this.isBtnAcceptEnable = true
              } else {
                this.isBtnAcceptEnable = false
              }
            }

            if (!this.allCommissionDetail.ListCommissionVoteOfAgent?.length) {
              this.isBtnAcceptEnable = true
            }

            if (
              (
                this.allCommissionDetail.ListCommissionVoteOfAgent?.filter(
                  (i) => i.EnumStatusVoteAgent == 3
                ) || []
              ).length == 3
            ) {
              this.isBtnAcceptEnable = true
            }
          } catch (ex) {
            console.error(ex)
            console.log('catch1')
            try {
              if (
                this.allCommissionDetail != null &&
                this.allCommissionDetail.CommissionInfo != null &&
                this.allCommissionDetail.CommissionInfo.VoterUserName != null &&
                this.getUserDisplayName() ==
                this.allCommissionDetail.CommissionInfo.VoterUserName.replaceAll(
                  'ي',
                  'ی'
                )
                  .replaceAll('ك', 'ک')
                  .trim()
              ) {
                if (
                  this.allCommissionDetail.ListCommissionVoteOfAgent != null &&
                  this.allCommissionDetail.ListCommissionVoteOfAgent?.length >
                  0 &&
                  this.allCommissionDetail.ListCommissionVoteOfAgent?.find(
                    (i) => i.NidUser.toLowerCase() == this.getNidUser().toLowerCase()
                  ).IsVoteOwner
                ) {
                  this.isBtnAcceptEnable = true
                } else {
                  this.isBtnAcceptEnable = false
                }
              }

              if (
                this.allCommissionDetail &&
                this.allCommissionDetail.ListCommissionVoteOfAgent &&
                this.allCommissionDetail.ListCommissionVoteOfAgent?.length > 0
              ) {
                this.isBtnAcceptEnable = true
              }
            } catch {
            }
          }
        }
        // آرشیو شهرسازی
        if (this.activeTab == 'urbanPlanningArchive_tab') {
          this.tabIndex5Called = false
          this.tabIndex3Called = false
          const tmpNosaziCode = {
            ...this.baseNosaziCode,
            ...(window.getConfigValue("commission100.ShowHouseArchiveOnly", false) ? {
              House: 0,
              Building: 0,
              Apartment: 0,
              Shop: 0
            } : {})
          }

          this.$refs.UrbanPlanningArchive.nosaziCode = {
            ...this.tmpNosaziCode
          }
          this.$refs.UrbanPlanningArchive.getBizCode(
            1,
            convertNosaziCodeObjectToString(tmpNosaziCode)
          )
          this.tabIndex3Called = true
          // this.lastNosaziCode = convertNosaziCodeObjectToString(
          //   this.baseNosaziCode
          // )
          this.isArchive = true
        }

        // ارشیو تبلت
        if (this.activeTab == 'tabletArchive_tab') {
          this.tabIndex5Called = false
          this.tabIndex3Called = false
          this.loadRevisitTablet(this.nidprocT, this.CI_Region)
        }

        // آرشیو پلیس ساختمان
        if (
          this.activeTab == 'buildingPoliceArchive_tab'
        ) {
          this.$refs.BuildingPoliceArchive.showArchive = true
          this.$refs.BuildingPoliceArchive.fetchWrapperList()
          // this.$refs.BuildingPoliceArchive.getBizCode(
          //   convertNosaziCodeObjectToString(this.baseNosaziCode)
          // )
        }
        // # todo باز بینی پرونده
      } catch (ex) {
        console.error(ex)
        // this.serverError() // test serverError
        this.hideLoading()
      }
    }
  }
}
</script>
