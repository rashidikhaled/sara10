<template>
  <fit>
    <safa-status :result="requstResultHistory" />
    <safa-status :result="getAllCommissionDetailsRes" />
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="NazaratKarshenasTab" label="نظرات کارشناس" />
        <tab-menu name="MohasebatJarimeLayeheTab" label="محاسبات جریمه لایحه" />
        <tab-menu name="HistoryTab" label="تاریخچه عودت" />
      </template>

      <tab-content name="NazaratKarshenasTab">
        <NazaratKarshenas
          ref="nazaratKarshenasRef"
          :controlMode="controlMode"
          v-model="model.CommissionInfo"
          :GroupVoteTrepass="GroupVoteTrepass"
          :AreaAfterEditValue="AreaAfterEditValue"
          :layeheComents="layeheComents"
        />
      </tab-content>
      <tab-content name="MohasebatJarimeLayeheTab" :padding="false">
        <MohasebatJarimeLayehe v-model="allCommissionDetails" />
      </tab-content>
      <tab-content name="HistoryTab" :padding="false">
        <History
          :Commission_Relapse="allCommissionDetails.Commission_Relapse"
          :CommissionTrepass_HistoryRelapse="
            allCommissionDetails.CommissionTrepass_HistoryRelapse
          "
        />
      </tab-content>
    </safa-tabs>
  </fit>
</template>
<script>
import NazaratKarshenas from './NazarKarshenasiPartials/NazaratKarshenas'
import History from './NazarKarshenasiPartials/History'
import MohasebatJarimeLayehe from './NazarKarshenasiPartials/MohasebatJarimeLayehe'
import baseFormMixin from 'src/mixins/baseFormMixin'
import kartableCommissionMixin from 'src/forms/commission-menu/mixins/kartableCommissionMixin.js'

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  components: {
    NazaratKarshenas,
    MohasebatJarimeLayehe,
    History
  },
  props: {
    commissionsSetting: Object,
    AreaAfterEditValue: Object,
    layeheComents: String,

    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      activeTab: 'NazaratKarshenasTab',
      comboAllBizCode: [], // ToDo جای این کمبو رو درست نمیدونم
      GroupVoteTrepass: [],
      allCommissionDetails: {
        CommissionTrepasses: [],
        CommissionTrepass_HistoryRelapse: [],
        Commission_Relapse: []
      },
      billFine: {
        ComLayehe: {
          ComLayehe_Usings: []
        }
      },
      historyData: {},
      NidCommission: '',
      controlMode: 'r',
      GetBillFineResult: null,
      requstResultHistory: null,
      getAllCommissionDetailsRes: null,
      // context: null,
      model: {
        /// act like contex in sara8
        CommissionInfo: {
          Address: '',
          Apartment: 0,
          BackStateTitle: '',
          BillNo: null,
          Block: 0,
          Building: 0,
          CI_BoundCode: 0,
          CI_Commission: 0,
          CI_CommissionBroken: 0,
          CI_CommissionOld: 0,
          CI_CommissionPriority: 0,
          CI_CommissionType: 0,
          CI_PrintType: 0,
          CI_Region: 0,
          CI_RelapseType: 0,
          CI_VoteCorrection: 0,
          CodeString: '',
          ColorInKartabl: null,
          ComEnterDate: '',
          Comments: '',
          CommissionComments: null,
          CommissionDate: '',
          CommissionDateExpert: '',
          CommissionState: null,
          CurrentArea: null,
          DateLicence: null,
          Density: null,
          District: 0,
          DocArea: null,
          DocTypeTitle: null,
          ExpertName: '',
          HasComments: false,
          HasLegalExpert: false,
          House: 0,
          IsManagementMustBehold: false,
          IsMeeting: false,
          IsRandomCom: false,
          IsRun: false,
          IsSara10: false,
          IsVotable: false,
          Iscomplainant: false,
          LegalExpertComments: null,
          NidCommission: '00000000-0000-0000-0000-000000000000',
          NidProc: '00000000-0000-0000-0000-000000000000',
          NidTaskState: '00000000-0000-0000-0000-000000000000',
          NoLicence: null,
          NoTownDabir: null,
          OwnerCellNo: '',
          OwnerName: '',
          OwnerNationalCode: null,
          OwnerTelNo: '',
          PenaltyValue: null,
          Pieces: null,
          PostCode: null,
          PreCode: null,
          RandomCommissionDate: '',
          Region: 0,
          Regplaque: '',
          RelapseComments: '',
          RelapseDate: '',
          RelapseTime: '',
          Remark: null,
          Requester: '',
          RootSubject: null,
          Run_Comments: null,
          SecretariatNo: 0,
          Shop: 0,
          SubNo: null,
          SysCI_City: 0,
          SysCI_RequestBy: 0,
          TmpNidFilKernel: null,
          TreeLevel: 0,
          UrbanComments: '',
          UrbanNidKartablItem: 0,
          UrbanNidRequest: null,
          UrbanRequestDate: null,
          UsingGroup_Mojood: null,
          UsingTypeTitle: null,
          VoterUserName: '',
          WorkflowTitel: ''
        }
      }
      // soderRay: [
      //   { field: "", title: "ترتیب صدور" },
      //   { field: "", title: "نوع رای" },
      //   { field: "", title: "مقدار رأی" },
      //   { field: "", title: "شماره ارجاع" },
      //   { field: "", title: "شماره رأی" },
      //   { field: "", title: "شماره کمیسیون" },
      //   { field: "", title: "نوع کمیسیون" },
      //   { field: "", title: "تاریخ رأی" },
      //   { field: "", title: "تاریخ کمیسیون" }
      // ]
    }
  },
  methods: {
    uExpertChangeControlMode () {
      if (this.controlMode === 'e') {
        if (this.selectedCommission.CommissionState === 'RandomCommission') {
          this.$refs.nazaratKarshenasRef.rdRelapseMode = 'r'
          this.$refs.nazaratKarshenasRef.rdCommissionMode = 'r'
          this.$refs.nazaratKarshenasRef.commissionTypeEnabled = false
          this.$refs.nazaratKarshenasRef.comboPrintTypeEnabled = false
          this.$refs.nazaratKarshenasRef.comboRelapseTypeEnabled = false
          this.$refs.nazaratKarshenasRef.comboCICommissionCurrentEnabled = true
        } else if (this.selectedCommission.CommissionState === 'Send') {
          this.$refs.nazaratKarshenasRef.rdRelapseMode = 'e'
          this.$refs.nazaratKarshenasRef.rdCommissionMode = 'e'
          this.$refs.nazaratKarshenasRef.commissionTypeEnabled = true
          this.$refs.nazaratKarshenasRef.comboPrintTypeEnabled = true
          this.$refs.nazaratKarshenasRef.comboRelapseTypeEnabled = true
          this.$refs.nazaratKarshenasRef.comboCICommissionCurrentEnabled = true
        } else {
          this.$refs.nazaratKarshenasRef.rdRelapseMode = 'r'
          this.$refs.nazaratKarshenasRef.rdCommissionMode = 'r'
          this.$refs.nazaratKarshenasRef.commissionTypeEnabled = false
          this.$refs.nazaratKarshenasRef.comboPrintTypeEnabled = false
          this.$refs.nazaratKarshenasRef.comboRelapseTypeEnabled = false
          this.$refs.nazaratKarshenasRef.comboCICommissionCurrentEnabled = false
        }
        this.$refs.nazaratKarshenasRef.comboCodeOldCommissionEnabled = true

        let tmpc =
          this.getApplicationParam.hasOwnProperty('ReadOnlyCommissionDate') &&
          this.getApplicationParam.ReadOnlyCommissionDate // boolean
        if (tmpc) {
          this.$refs.nazaratKarshenasRef.commissionDateEnabled = false
        } else {
          if (
            this.model.CommissionInfo.IsVotable === true &&
            this.commissionsSetting !== null &&
            this.commissionsSetting.HasAutomateCommissionDate &&
            this.commissionsSetting.CmbCommissionDay !== ''
          ) {
            this.$refs.nazaratKarshenasRef.commissionDateEnabled = false
          } else {
            this.$refs.nazaratKarshenasRef.commissionDateEnabled = true
          }

          if (
            this.commissionsSetting !== null &&
            this.commissionsSetting.ReadOnlyExpertFormInVote &&
            this.selectedCommission.CommissionState !== 'Send' &&
            this.selectedCommission.CommissionState !== 'RandomCommission'
          ) {
            this.$refs.nazaratKarshenasRef.commissionDateEnabled = false
            this.$refs.nazaratKarshenasRef.comboCodeOldCommissionEnabled = false
          }
        }
      }
    },
    getGroupVoteTrepass (CommissionVoteTrepasses) {
      if (
        CommissionVoteTrepasses !== null &&
        CommissionVoteTrepasses.length > 0
      ) {
        let tmpList = CommissionVoteTrepasses.groupJoin(
          CommissionVoteTrepasses,
          function (i) {
            return i.NidVote
          },
          function (j) {
            return j.NidVote
          },
          function (i, j) {
            return {
              ...i, // صدور رای
              Comm_Trepass: j // گرید تخلفات زیر صدور رای
            }
          }
        )
          .groupBy((i) => i.NidVote)
          .select((i) => i.first())
        // .orderBy((i) => i.VoteDate);
        this.GroupVoteTrepass = tmpList
      } else {
        this.GroupVoteTrepass = []
      }
    },
    async getHistoryVotes () {
      try {
        let payLoad = {
          PRequest: {
            NIDCommission: this.selectedNidCommission,
            NosaziCode: this.selectedCommission.BizCode
          }
        }
        const { data } = await this.$services.commissions.getHistoryVotes(
          payLoad
        )
        this.requstResultHistory = this.getResponse(data)
        if (this.requstResultHistory.success) {
          this.historyData = this.requstResultHistory.data
          if (this.historyData.GetHistoryVotesResult !== null) {
            this.getGroupVoteTrepass(
              this.historyData.GetHistoryVotesResult.Commission_VoteTrepasses
            )
          }
        }
      } catch (e) {
        console.error('error', e)
      }
    },

    async getCommissionHistory () {
      try {
        let payLoad = {
          pClsCommissionHistory: {
            NidCommission: this.selectedNidCommission
          }
        }
        const { data } = await this.$services.commissions.getCommissionHistory(
          payLoad
        )
        this.requstResultHistory = this.getResponse(data)
        if (this.requstResultHistory.success) {
          this.historyData = this.requstResultHistory.data

          this.log({
            action: this.logActions.view,
            bizCode: this.selectedCommission.NidProc,
            bizCodeTitle: 'NidProc',
            nosaziCode: this.selectedCommission.BizCode,
            saveDesc: `بارگذاری اطلاعات فرم ${this.title ?? ''} انجام گردید.`
          })
        }
      } catch (e) {
        console.error('error', e)
      }
    },
    async getAllCommissionDetails () {
      try {
        let payLoad = {
          PRequest: {
            IsActive: false,
            NIDCommission: this.selectedNidCommission,
            NIDVote: '00000000-0000-0000-0000-000000000000',
            NidProc: '00000000-0000-0000-0000-000000000000'
          }
        }
        const { data } =
          await this.$services.commissions.getAllCommissionDetails(payLoad)
        this.getAllCommissionDetailsRes = this.getResponse(data)
        if (this.getAllCommissionDetailsRes.success) {
          const res = this.getAllCommissionDetailsRes
          if (res.data && res.data.GetAllCommissionDetailsResult) {
            this.allCommissionDetails = res.data.GetAllCommissionDetailsResult
            this.$emit('updateArchiveDomain', this.allCommissionDetails)
            this.$refs.nazaratKarshenasRef.comboPrintOptions =
              this.commissionsSetting &&
              this.commissionsSetting.CommissionComboPrint &&
              this.commissionsSetting.CommissionComboPrint.length > 0
                ? this.commissionsSetting.CommissionComboPrint.filter(
                  (x) =>
                    x.IDParent ===
                      (this.allCommissionDetails.CommissionInfo
                        .CI_CommissionType && x.IsSelect === true)
                )
                : []
            if (
              this.allCommissionDetails &&
              this.allCommissionDetails.ClsCommission_BlankList &&
              this.allCommissionDetails.ClsCommission_BlankList !== null &&
              this.allCommissionDetails.ClsCommission_BlankList
                .Commission_BlackList !== null
            ) {
              this.$refs.nazaratKarshenasRef.showbackListLabel = true
            } else {
              this.$refs.nazaratKarshenasRef.showbackListLabel = false
            }
            this.model = { ...this.allCommissionDetails }
            if (
              (this.model.CommissionInfo &&
                this.model.CommissionInfo.CI_RelapseType &&
                this.model.CommissionInfo.CI_RelapseType !== null &&
                this.model.CommissionInfo.CI_RelapseType !== 0) ||
              (this.model.CommissionInfo &&
                this.model.CommissionInfo.RelapseTime !== null &&
                this.model.CommissionInfo.RelapseTime !== '')
              // eslint-disable-next-line brace-style
            ) {
              this.$refs.nazaratKarshenasRef.isVotable = false
              // eslint-disable-next-line brace-style
            }
            // معادل IsRelapse=true
            else if (
              this.model.CommissionInfo &&
              this.model.CommissionInfo.IsVotable &&
              this.model.CommissionInfo.IsVotable === false
            ) {
              this.$refs.nazaratKarshenasRef.isVotable = null
            } else {
              this.$refs.nazaratKarshenasRef.isVotable = true
            }
            if (
              this.allCommissionDetails &&
              this.allCommissionDetails.AllBizCode &&
              this.allCommissionDetails.AllBizCode !== null &&
              this.allCommissionDetails.AllBizCode.length > 0
            ) {
              this.allCommissionDetails.AllBizCode.forEach((i) => {
                if (
                  this.model.Commission_Archive.every(
                    (f) => f.RootSubject !== i.RootSubject
                  )
                ) {
                  i.IsAllBizCode = true
                  this.model.Commission_Archive.push(i)
                }
              })
            }
            if (
              this.model.CommissionInfo &&
              this.model.CommissionInfo.CommissionDate &&
              this.model.CommissionInfo.CommissionDate.trim() === ''
            ) {
              this.model.CommissionInfo.UrbanComments = ''
            }
            if (
              this.model.Commission_Relapse &&
              this.model.Commission_Relapse !== null &&
              this.model.Commission_Relapse.length > 0
            ) {
              // ToDo:  تغییر رنگ تاریخچه عودت
              // RelapseTab.Background = new SolidColorBrush(
              //   Color.FromArgb(255, 172, 252, 48)
              // );
            } else {
              // RelapseTab.Background = new SolidColorBrush(Colors.Transparent);
            }
            if (
              this.allCommissionDetails &&
              this.allCommissionDetails.CommissionInfo &&
              this.allCommissionDetails.CommissionInfo !== null &&
              this.allCommissionDetails.CommissionInfo.IsVotable === true
            ) {
              if (
                this.commissionsSetting &&
                this.commissionsSetting !== null &&
                this.commissionsSetting.HasAutomateCommissionDate
              ) {
                //   let t = Common.Common.GetFirstSpecialDayFromToday( ViewModels.ClsSetting.Settings.DayOfCommission); // ToDo این بخش رو متوجه نشدم
                //   model.CommissionInfo.CommissionDate =
                //     ClsDateUtility.GetPersianDate(t);
              }
            }
            // if (Convert.ToBoolean(Common.Common.GetApplicationParam("IsShowHistoryVoteInExpert"))) { // ToDo این بخش هم از ایساپ میاد که فعلا ترو هست
            //   GroupHistoryVotes.Visibility = Visibility.Visible;
            //   UHistoryVote.Grd_vote.BorderBrush = new SolidColorBrush(Colors.Red);
            //   UHistoryVote.BorderThickness = new Thickness(1, 1, 1, 1);
            //   UHistoryVote.Grd_vote.Columns["CommissionType"].IsVisible = false;
            //   UHistoryVote.LoadObj(
            //     model.CommissionInfo.CodeString,
            //     model.CommissionInfo.NidCommission,
            //     true
            //   );
            // }
            if (
              this.model.CommissionInfo &&
              this.model.CommissionInfo.CI_Commission === null
            )
            { this.model.CommissionInfo.CI_Commission = 0 }
            if (
              this.model.CommissionInfo &&
              this.model.CommissionInfo.CI_CommissionOld === null
            )
            { this.model.CommissionInfo.CI_CommissionOld = 0 }
          }
        }
      } catch (e) {
        console.error('error', e)
        // this.serverError() // test serverError
      }
    },
    async loadObj () {
      // called in parent base on xaml
      try {
        this.showLoading()
        // if(this.getApplicationParam.hasOwnProperty("ViewLegalExpert") && this.getApplicationParam.ViewLegalExpert){
        //     txtHasLegalExpert.Visibility = Visibility.Collapsed;
        //     ChkHasLegalExpert.Visibility = Visibility.Collapsed;
        //     gridLegalExpert.Visibility = Visibility.Collapsed;
        // }
        // ChkIsMeeting.Content = Common.Common.GetApplicationParam("TitleMeetinginExpert"); // از esup
        this.$refs.nazaratKarshenasRef.titleMeetinginExpert =
          (typeof (
            this.getApplicationParam.hasOwnProperty('TitleMeetinginExpert') &&
            this.getApplicationParam.TitleMeetinginExpert
          ) ===
            'string') ===
          true
            ? this.getApplicationParam.hasOwnProperty('TitleMeetinginExpert') &&
              this.getApplicationParam.TitleMeetinginExpert
            : 'با حضور نماینده'
        this.$refs.nazaratKarshenasRef.showbackListLabel = false
        await this.getAllCommissionDetails()

        if (!this.commissionsSetting.ShowDefaultCommissionArchive) {
          let tmpBaygani = this.model.Commission_Archive.find((f) =>
            f.Caption.includes('بايگاني')
          )
          if (tmpBaygani != null) {
            this.model.Commission_Archive =
              this.model.Commission_Archive.filter((x) => x !== tmpBaygani)
            this.model.Commission_Archive.unshift(tmpBaygani)
          }
        }
        this.comboAllBizCode = this.model.Commission_Archive
        if (this.commissionsSetting.ShowDefaultShahrsaziArchive) {
          // ToDo این بخش مربوط به کمبوی آرشیو هست طبق زمل جای این کد همین کامپوننت هست بنابراین میتوان از رف استفاده کرد.
          // eslint-disable-next-line no-unused-vars
          let tmpf = this.model.Commission_Archive.find((f) =>
            f.Caption.includes('بايگاني')
          )
          // if (tmpf != null)
          //     // ComboAllBizCode.SelectedItem = tmpf;
          // else
          //     ComboAllBizCode.SelectedItem = this.model.Commission_Archive[0];
        } else {
          // eslint-disable-next-line no-unused-vars
          let tmpf = this.model.Commission_Archive.find((f) =>
            f.Caption.includes('کمیسیون')
          )
          // if (tmpf != null)
          //       ComboAllBizCode.SelectedItem = tmpf;
          //   else
          //       ComboAllBizCode.SelectedItem = this.model.Commission_Archive[0];
        }

        // }
        // اگر به ساختار سرا8 وفاداریم اینا باید بره توی پارشیال خودش
        await this.getHistoryVotes()
        // await this.getBillFine();
        await this.getCommissionHistory()
      } catch (error) {
        console.log(error)
      } finally {
        this.hideLoading()
      }
    }
  },
  // mounted() {
  //   this.loadObj()

  // }
  watch: {
    activeTab: {
      handler () {
        if (this.activeTab === 'HistoryTab') {
          this.loadObj()
        }
      },
      deep: true
    }
  }
}

</script>
