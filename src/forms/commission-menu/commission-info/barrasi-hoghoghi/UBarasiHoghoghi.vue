<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="نام مالک"
            label-width="70px"
            v-model="model.OwnerName"
            cdcName="OwnerName"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ارجاع"
            label-width="70px"
            v-model="model.UrbanNidRequest"
            cdcName="UrbanNidRequest"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="پلاک ثبتی"
            label-width="70px"
            v-model="model.Regplaque"
            cdcName="Regplaque"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="commissionPresent"
            cdcName="commissionPresent"
            :options="commissionPresentOptions"
            source-type="local"
            label="مطرح در کمیسیون"
            label-width="70px"
          />
        </FormControl>
        <FormControl>
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            label="کد نوسازی"
            label-width="60px"
            :actions="false"
            m="r"
          />
        </FormControl>
      </FormRow>
      <safa-datatable
        :columns="barasiHoghoghiColumns"
        v-model="historyVotesItemsSource"
        cdcName="historyVotesItemsSource"
        fit
        m="r"
        height="100%"
        max-height="100%"
        min-height="200px"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        paginate
        ref="historyRef"
      />
    </fit>
    <template v-slot:footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="saveObj"
      >
      </form-actions>
      <!-- @save="saveData" -->
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "بررسی حقوقی",
      name: "UBarasiHoghoghi",
      formKey: "681cc636-7fd9-49a5-a9b1-3dc680635402",
      main: true,
      IsDeleteVote: false,

      model: {
        OwnerName: "",
        UrbanNidRequest: null,
        Regplaque: "",
        BizCode: "0-0-0-0-0-0-0"
      },
      tmpallVoteDate: [],
      tmpallVoteDateCurrentCommission: [],
      tmpmulti: [],
      tmpVoteTrepasses: [],
      context: {
        CommissionTrepasses: [],
        Commission_VoteTrepasses: [],
        CommissionInfo: {
          NidCommission: ""
        },
        GroupVoteTrepass: []
      },
      // CI_FilesType: 0,
      commissionPresent: 0,
      commissionPresentOptions: [
        { ID: 1, Title: "در کمیسیون قبلی مطرح گردد" },
        { ID: 2, Title: "در کمیسیون جدید مطرح گردد" }
      ],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      historyVotesResult: [],
      historyVotesItemsSource: [],
      barasiHoghoghiColumns: [
        { field: "Floor", title: "طبقه" },
        { field: "Title", title: "تخلف" },
        { field: "TrepassValue", title: "مقدار تخلف" },
        {
          field: "CI_VoteType",
          title: "نوع رای",
          editor: "combo",
          domain: "Commission100",
          width: "150px"
        },
        {
          field: "KCoeffiecient",
          title: "ضریب ارزش معاملاتی طبق تبصره 11 ماده صد"
        },
        { field: "K", title: "ارزش معاملاتی" },
        { field: "VoteNo", title: "شماره رای" },
        { field: "VoteValue", title: "مبلغ" },
        { field: "Vote_Comments", title: "شرح رای" }
      ]
    }
  },
  props: {
    commission_Info: Object,
    commissionsSetting: Object
  },
  async created () {
    if (await this.canOpenWindow()) {
      this.model = this.selectedCommission
      this.baseNosaziCode = convertStringToNosaziCodeObject(this.model.BizCode)
      this.getHistoryVotes()
    }
  },

  methods: {
    saveObj () {
      let IsVoteTrepasss = false
      let tmpselected = this.$refs.historyRef.selectedRows
      if (this.tmpVoteTrepasses.length > 0) {
        this.tmpVoteTrepasses.forEach((element) => {
          tmpselected.push(element)
        })
        IsVoteTrepasss = true
      }
      tmpselected.forEach((i) => (i.IsSelected = true))
      let tmpvotes = tmpselected.groupBy((f) => f.NidVote)
      let tmpTrepasses = []
      tmpvotes.forEach((item) => {
        let qVote = item // q.FirstOrDefault(f => f.NidVote === item.Key);
        tmpTrepasses = item.filter((f) => f.IsSelected)
        tmpTrepasses.forEach((tmptre) => {
          var tmptrepass = this.context.CommissionTrepasses.find(
            (f) =>
              f.Id === tmptre.Id &&
              f.TrepassValue === tmptre.TrepassValue &&
              f.CI_Years === tmptre.CI_Years &&
              f.Floor === tmptre.Floor
          )
          if (tmptrepass !== null) {
            tmptrepass.IsHaveVote = true
          }
        })
        if (tmpTrepasses.length > 0) {
          let cc = this.context.GroupVoteTrepass.find(
            (f) => f.Comm_Vote.NidVote === qVote.Key || qVote[0].IsHave === 1
          )
          if (cc === null) {
            qVote[0].IsHave = 1
            this.addVoteTrepassToList(qVote[0], tmpTrepasses)
          } else if (cc !== null && IsVoteTrepasss) {
            qVote[0].IsHave = 1
            this.addVoteTrepassToList(qVote[0], tmpTrepasses)
          }
        }
      })
      this.save()
    },
    addVoteTrepassToList (pCommissionVote, Treepass) {
      try {
        let objVoteTrepass = {}
        let tmpCommTrepass = []

        let TmpVote = {
          VoteValue: pCommissionVote.VoteValue,
          TechnicalValue: pCommissionVote.TechnicalValue,
          VoteDate: currentDate(),
          CI_VoteType: pCommissionVote.CI_VoteType,
          NidVote: pCommissionVote.NidVote,
          NidCommission: this.commission_Info.NidCommission,
          Vote_Comments: this.commissionsSetting.IsAcceptTajdidnazar
            ? " با عنایت به اینکه رای بدوی وفق موازین صادر شده و ایراد موجهی ارائه و ابراز نگردیده، تجدید نظر خواهی وارد نیست و رای بدوی بدین شرح تایید می گردد : "
            : pCommissionVote.Vote_Comments,
          CI_VoteTypeDetail: pCommissionVote.CI_VoteTypeDetail,
          NidAgent: pCommissionVote.NidAgent,
          AgentComment: pCommissionVote.AgentComment,
          IsHave: pCommissionVote.IsHave
        }

        if (this.commissionsSetting.VoteNoFormat === 0) {
          PersianDate.toCalendar("persian")
          let year = new PersianDate().year().toString().substring(2)
          TmpVote.VoteNo = `${this.commissionInfo.District}/${year}/${this.commissionInfo.SecretariatNo}`
        } else if (this.commissionsSetting.VoteNoFormat === 1) {
          // eslint-disable-next-line no-undef
          TmpVote.VoteNo = VoteNo
        }

        objVoteTrepass.Comm_Vote = TmpVote
        Treepass.forEach((i) =>
          tmpCommTrepass.push({
            NidTrepass: i.NidTrepass,
            MaxPenalty: i.MaxPenalty,
            MinPenalty: i.MinPenalty,

            IsHave: i.IsHave,

            Trepass_Comments: i.Trepass_Comments,
            TrepassValue: i.TrepassValue,
            NidCommission: this.commission_Info.NidCommission,
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
            Note: i.Note,
            TarakomMosavab: i.TarakomMosavab
          })
        )

        // objVoteTrepass.Comm_Trepass = new ObservableCollection<SrvGetVoteTrepasses_Result>(tmpComm_Trepass); // ToDo ObservableCollection حالت واچ داره که تغییرات توی یوآی اعمال بشه مطمین نیستم سمت ما چجوری باید پیاده بشه
        this.context.GroupVoteTrepass.push(objVoteTrepass)
      } catch (ex) {
        console.log(ex)
      }
    },
    createCommissionVote (el) {
      console.log("createCommissionVote", el)
      let KeyValueOfCommission = { Key: {}, Value: [] }
      KeyValueOfCommission = {
        Key: {
          VoteValue: el.Comm_Vote.VoteValue,
          VoteDate: el.Comm_Vote.VoteDate,
          VoteNo: el.Comm_Vote.VoteNo,
          VoteTime: this.updateToday(),
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
    save () {
      let tmpRequest = {
        SaveCommissionVote: [],
        CommissionInfo: null
      }
      this.context.GroupVoteTrepass.forEach((element) => {
        tmpRequest.SaveCommissionVote.push(this.createCommissionVote(element))
      })
      if (!this.IsDeleteVote) {
        tmpRequest.SaveCommissionVote.forEach((i) => {
          i.Key.AgentComment = "-100"
        })
      }
      // tmpRequest.CommissionInfo =
      // {
      //     NidCommission : this.commission_Info.NidCommission
      // };
      const payload = {
        PRequest: {
          CommissionInfo: this.commission_Info,
          DomainName: "Commission",
          IsActive: false,
          NIDCommission: "00000000-0000-0000-0000-000000000000",
          NIDVote: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidAgent: "00000000-0000-0000-0000-000000000000",
          NidTaskState: "00000000-0000-0000-0000-000000000000",
          NidUser: this.getNidUser(),
          UserName: this.getUserDisplayName(),
          UserFamily: this.currentUser.LastName,
          ISRelapse: false,
          IsRegion: false,
          IsdeleteArchive: false,
          SelectedDate: 0,
          SaveCommissionVote: tmpRequest.SaveCommissionVote
        }
      }
      this.showLoading()
      this.$services.commissions
        .saveNewVote(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            // res.data.SaveNewVoteResult;
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید.`
            })
            this.IsEditable = false
            this.loadObj()
          } else {
            let htmlMsg = ""
            res.errors.forEach((error) => {
              htmlMsg += `<li>${error.text}</li>`
            })
            this.showError(htmlMsg)
            this.IsEditable = false
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getHistoryVotes () {
      var Invalid = false
      const payload = {
        PRequest: {
          NosaziCode: this.selectedCommission.BizCode,
          NIDCommission: this.selectedCommission.NidCommission
        }
      }
      this.showLoading()
      this.$services.commissions
        .getHistoryVotes(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)

          if (res.success) {
            this.historyVotesResult = res.data.GetHistoryVotesResult
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
            })
            if (
              this.historyVotesResult !== null &&
              this.historyVotesResult.Commission_VoteTrepasses !== null
            ) {
              this.context.CommissionTrepasses =
                this.historyVotesResult.CommissionTrepasses
              this.sortCommission_Trepass()
              this.tmpallVoteDate =
                this.historyVotesResult.Commission_VoteTrepasses.filter(
                  (f) => f.NidCommission !== this.selectedCommission.NidCommission
                )
              this.tmpallVoteDateCurrentCommission =
                this.historyVotesResult.Commission_VoteTrepasses.filter(
                  (f) => f.NidCommission === this.selectedCommission.NidCommission
                )
              let tmpMaxVoteDate = Math.max(
                ...this.tmpallVoteDate
                  .filter(
                    (f) =>
                      f.NidCommission !== this.selectedCommission.NidCommission
                  )
                  .map((f) => f.VoteDate)
              )
              this.tmpallVoteDate = this.tmpallVoteDate.filter(
                (f) => f.VoteDate === tmpMaxVoteDate
              )
              this.context.CommissionInfo = {
                NidCommission: this.selectedCommission.NidCommission
              }
              this.context.GroupVoteTrepass = []
              // eslint-disable-next-line no-unused-vars
              let t = this.tmpallVoteDate
                .groupBy((f) => f.NidTrepass)
                .select((a) => a[0])
                .forEach((element) => {
                  let tmptrepass = this.context.CommissionTrepasses.find(
                    (a) =>
                      a.Id === element.Id &&
                      a.TrepassValue === element.TrepassValue &&
                      a.CI_Years === element.CI_Years &&
                      a.Floor === element.Floor
                  )
                  if (tmptrepass === null) {
                    Invalid = true
                    tmptrepass = {}
                  }
                  var tmpt = {
                    NidTrepass:
                      tmptrepass === null
                        ? "00000000-0000-0000-0000-000000000000"
                        : tmptrepass.NidTrepass,
                    Title: element.Title,
                    IdOld: element.IdOld,
                    TitleOld: element.TitleOld,
                    Id: element.Id,
                    CI_UsingType: element.CI_UsingType,
                    CI_UsingGroup: element.CI_UsingGroup,
                    CI_SazeType: element.CI_SazeType,
                    CI_UsingTypeGroupMojaz: element.CI_UsingTypeGroupMojaz,
                    CI_UsingTypeMojaz: element.CI_UsingTypeMojaz,
                    UsingID: element.UsingID,
                    UsingTitle: element.UsingTitle,
                    UsingGroupTitle: element.UsingGroupTitle,
                    UsingGroupID: element.UsingGroupID,
                    K: element.K,
                    KCoeffiecient:
                      element.KCoeffiecient != null ? element.KCoeffiecient : 0,
                    MinPenalty: element.MinPenalty,
                    MaxPenalty: element.MaxPenalty,
                    Floor: element.Floor,
                    FloorCountMojaz: element.FloorCountMojaz,
                    FloorCountMosavab: element.FloorCountMosavab,
                    BuildingStep: element.BuildingStep,
                    MojazUsingID: element.MojazUsingID,
                    MosavabUsingID: element.MojazUsingID,
                    P: element.P,
                    TrepassValue: element.TrepassValue,
                    PenaltyFormula: element.PenaltyFormula,
                    CI_PrintType: element.CI_PrintType,
                    CI_VoteType: element.CI_VoteType,
                    CI_VoteTypeDetail: element.CI_VoteTypeDetail,
                    CI_Note: element.CI_Note,
                    Vote_Comments: element.Vote_Comments,
                    AreaMojod: tmptrepass.CI_TrepassType_Group,
                    NidVote: element.NidVote
                  }
                  var tmpvote =
                    this.historyVotesResult.Commission_VoteTrepasses.find(
                      (a) =>
                        a.NidCommission !==
                          this.selectedCommission.NidCommission &&
                        a.VoteDate === tmpMaxVoteDate &&
                        a.Id === element.Id &&
                        a.TrepassValue === element.TrepassValue &&
                        a.CI_Years === element.CI_Years &&
                        a.Floor === element.Floor
                    )

                  if (tmpvote !== null) {
                    tmpt.VoteDate = tmpvote.VoteDate
                    tmpt.VoteNo = tmpvote.VoteNo
                    tmpt.Vote_Comments = tmpvote.Vote_Comments
                    tmpt.VoteValue =
                      parseFloat(element.K) *
                      element.TrepassValue *
                      (element.KCoeffiecient !== null
                        ? element.KCoeffiecient
                        : 0) // tmpvote.VoteValue;
                    if (this.tmpallVoteDateCurrentCommission !== null) {
                      if (
                        this.tmpallVoteDateCurrentCommission.some(
                          (a) =>
                            a.NidTrepass ===
                              (tmptrepass === null
                                ? "00000000-0000-0000-0000-000000000000"
                                : tmptrepass.NidTrepass) &&
                            a.AgentComment === "-100"
                        )
                      ) {
                        tmpt.IsReadOnly = true
                        tmpt.IsSelected = true
                      }
                    }
                  }
                  tmpt.RowNumber = element.RowNumber

                  if (this.tmpallVoteDateCurrentCommission != null) {
                    if (
                      !this.tmpallVoteDateCurrentCommission.some(
                        (a) =>
                          a.NidTrepass ===
                          (tmptrepass === null
                            ? "00000000-0000-0000-0000-000000000000"
                            : tmptrepass.NidTrepass)
                      )
                    ) {
                      this.tmpmulti.push(tmpt)
                    } else {
                      this.tmpVoteTrepasses.push(
                        this.tmpallVoteDateCurrentCommission.find(
                          (a) =>
                            a.NidTrepass ===
                            (tmptrepass === null
                              ? "00000000-0000-0000-0000-000000000000"
                              : tmptrepass.NidTrepass)
                        )
                      )
                    }
                  } else this.tmpmulti.push(tmpt)
                })
              // fruits.sort();
              // fruits.reverse();
              this.tmpmulti = this.tmpmulti
                .sort((a) => a.Id)
                .sort((a) => a.TrepassValue)
                .sort((a) => a.Floor)
                .reverse()

              let RowNumber = 1
              this.tmpmulti.forEach((i) => {
                i.RowNumber = RowNumber++
              })

              this.tmpmulti = this.tmpmulti
                .sort((f) => f.AreaMojod)
                .sort((f) => f.Floor)
              this.historyVotesItemsSource = this.tmpmulti
              // UCommissionInfo.GetVoteNo(voteno => //ToDo how to implement this?!
              // {
              //     Busy.IsBusy = false;
              //     VoteNo =
              //     DateTime.Now.GetPersianDate().Split(new char[] { '/' })[0].Substring(2) + "/" + voteno.Number.ToString() + "/" +
              //        this.selectedCommission.CI_Commission.ToString() + "/" + voteno.MaxVoteNo.ToString();
              //     //context.CommissionInfo.SecretariatNo.ToString();
              // }, this.selectedCommission.NidCommission);
            }
          }
        })
        .catch((error) => {
          if (Invalid) {
            this.showError("به علت تغییر تخلف امکان تایید رای نمی باشد ")
          }
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    sortCommission_Trepass () {
      this.context.CommissionTrepasses = this.context.CommissionTrepasses.sort(
        (a, b) => (a.Id > b.Id ? -1 : 1)
      )
        .sort((a, b) => (a.TrepassValue > b.TrepassValue ? -1 : 1))
        .sort((a, b) => (a.Floor > b.Floor ? -1 : 1))
      let RowNumber = 1
      this.context.CommissionTrepasses.forEach((i) => {
        i.RowNumber = RowNumber++
        i.Ka = !i.K ? parseFloat(i.K) : 0
      })
      this.context.CommissionTrepasses = this.context.CommissionTrepasses.sort(
        (a, b) => (a.CI_TrepassType_Group < b.CI_TrepassType_Group ? -1 : 1)
      ).sort((a, b) => (a.Floor < b.Floor ? -1 : 1))
    }
    // saveData() {
    //   const payload = {
    //     PRequest: {
    //       CommissionInfo: this.selectedCommission,
    //       // DomainName: "Commission",
    //       // IsActive: false,
    //       // NIDCommission: "00000000-0000-0000-0000-000000000000",
    //       // NIDVote: "00000000-0000-0000-0000-000000000000",
    //       // NidProc: "00000000-0000-0000-0000-000000000000",
    //       // ISRelapse: false,
    //       // IsRegion: false,
    //       // IsRun: false,
    //       // IsdeleteArchive: false,
    //       // NidAgent: "00000000-0000-0000-0000-000000000000",
    //       // NidTaskState: "00000000-0000-0000-0000-000000000000",
    //       // NidUser: "00000000-0000-0000-0000-000000000000",
    //       // SaveCommissionVote: null,
    //       // SelectedDate: 0,
    //     },
    //   };
    //   this.showLoading();
    //   this.$services.commissions
    //     .saveNewVote(payload)
    //     .then(({ data }) => {
    //       const res = this.getResponse(data);
    //       if (res.success) {
    //         // res.data.SaveNewVoteResult;
    //         this.$emit("accseptHoghoghi", true);
    //         this.showSuccess("ذخیره با موفقیت انجام شد.");
    //         this.IsEditable = false;
    //       } else {
    //         this.$emit("accseptHoghoghi", false);
    //         this.showError(res.errors[0].text);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       // this.serverError() // test serverError;
    //     })
    //     .finally(() => {
    //       this.hideLoading();
    //     });
    // },
  }
}
</script>
