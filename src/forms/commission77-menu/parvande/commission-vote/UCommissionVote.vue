<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
  >
      <!-- <safa-status :result="getRequestVoteRes" /> -->
      <safa-status :result="getDutyFicheByFicheNoRes" />
      <safa-status :result="getAllOtherVote2Res" />
      <safa-status :result="saveRequestVoteRes" />
      <safa-status :result="saveOtherVote1Res" />
      <safa-status :result="saveOtherVote2Res" />
      <safa-status :result="saveOtherVote1DelRes" />
      <safa-status :result="saveOtherVote2DelRes" />
      <safa-status :result="getAllOtherVote1Res" />
      <safa-status :result="getListVoteFicheRes" />
    <form-wrapper hide-title :padding="false">
      <fit>
        <safa-tabs v-model="activeTab">
          <template #tabs>
            <tab-menu name="commissionVoteTab" label="صدور رای" />
            <tab-menu name="listComisionVoteTab" label=" سوابق صدور رای" />
            <tab-menu name="detailTab" label="جزییات عوارض"   @click="showUCommissionVoteDetail=true"/>
            <!--  https://trello.com/c/MEXWBRJ5 این مورد با آقای صالحی چک شد کلا این تب باید حذف بشه  -->
            <!-- <tab-menu
              name="jobTab"
              label="تخفیف در بدهی عوارض صنفی"
              v-if="tabJobShow"
            /> -->
            <tab-menu name="other1Tab" label="سایر 1" />
            <tab-menu name="other2Tab" label="سایر 2" />
          </template>

          <tab-content name="commissionVoteTab">
            <fit>
              <UCommissionVoteCommissionVote
                ref="UCommissionVoteCommissionVote"
                v-model="dataContext"
                :formKey="formKey"
                :name="name"
                :title="title"
                :mode="mode"
              />
            </fit>
          </tab-content>

          <tab-content name="listComisionVoteTab" :padding="false">
            <fit>
              <UCommissionVoteListComisionVote
                ref="UCommissionVoteListComisionVote"
                v-model="dataContext"
                :formKey="formKey"
                :name="name"
                :title="title"
                :mode="mode"
                :gridContext="gridContext"
                @grdCommissionVoteSelectionChanged="
                  grdCommissionVoteSelectionChanged
                "
                @btnEditvoteClick="btnEditvoteClick"
                :saveVoteRes="saveVoteRes"
              />
            </fit>
          </tab-content>

          <tab-content name="detailTab">
            <fit>
              <UCommissionVoteDetail
                v-if="showUCommissionVoteDetail"
                ref="UCommissionVoteDetail"
                v-model="dataContext"
                :formKey="formKey"
                :name="name"
                :title="title"
                :mode="mode"
                :gridContext="gridContext"
              />
            </fit>
          </tab-content>
          <!-- https://trello.com/c/MEXWBRJ5 این مورد با آقای صالحی چک شد کلا این تب باید حذف بشه  -->
          <!-- <tab-content v-if="tabJobShow" name="jobTab" >

            <fit>
              <UCommissionVoteJob
                ref="UCommissionVoteJob"
                v-model="dataContext"
                :formKey="formKey"
                :name="name"
                :title="title"
                :mode="mode"
              />
            </fit>
          </tab-content> -->
          <tab-content name="other1Tab">
            <fit>
              <UCommissionVoteOther1
                ref="UCommissionVoteOther1"
                v-model="dataContext"
                :formKey="formKey"
                :name="name"
                :title="title"
                :mode="mode"
                :gridContext="gridContext"
              />
            </fit>
          </tab-content>

          <tab-content name="other2Tab">
            <fit>
              <UCommissionVoteOther2
                ref="UCommissionVoteOther2"
                v-model="dataContext"
                :formKey="formKey"
                :name="name"
                :title="title"
                :mode="mode"
                :gridContext="gridContext"
              />
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>

      <template #footer>
        <form-actions
          @edit="btnEditClick"
          @cancel="btnCancelClick"
          @save="btnSaveClick"
          :m="mode"
          :showEditButton="
            activeTab === 'commissionVoteTab' ||
            activeTab === 'other1Tab' ||
            activeTab === 'other2Tab'
          "
        >
          <template #before> </template>
          <template #after>
            <btn-default
              v-if="
                !isEditable &&
                (activeTab === 'commissionVoteTab' ||
                  activeTab === 'other1Tab' ||
                  activeTab === 'other2Tab')
              "
              label="جدید"
              @click="btnNewClick"
            />
            <btn-delete
              v-if="
                !isEditable &&
                (activeTab === 'other1Tab' || activeTab === 'other2Tab')
              "
              @click="btnDeleteClick"
            />
            <!-- # region commissionVote Tab -->
            <template v-if="activeTab === 'commissionVoteTab'">
              <btn-default
                label="پیش نویس رای"
                @click="btnDraftVoteCancelClick"
              />
              <btn-default label="چاپ رای" @click="btnPrintvoteClick" />
            </template>
            <!-- #endregion -->

            <!-- # region listComisionVote Tab -->
            <template v-if="activeTab === 'listComisionVoteTab'">
              <btn-default
                v-if="activeTab === 'listComisionVoteTab'"
                label="ابطال رای"
                @click="
                  $refs.UCommissionVoteListComisionVote.voteCancelingHandler
                "
              />
            </template>
            <!-- #endregion -->
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
import commission77Mixin from "src/forms/commission77-menu/mixins/commission77Mixin.js"

// Utils
import {
  // convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"

import { currentDate, currentTime } from "src/utils/index"
import {
  EMPTY_GUID,
  generateClsRequestVote,
  generateClsRequestVoteParam,
  generateRequestVote,
  generateClsOtherVote,
  generateOtherVote1,
  generateOtherVote2
} from "./utils/uCommissionVoteUtils"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import converter from "xml-js"
import { uid } from "quasar"

// Components
import UCommissionVoteCommissionVote from "./partials/UCommissionVoteCommissionVote"
import UCommissionVoteListComisionVote from "./partials/UCommissionVoteListComisionVote"
import UCommissionVoteDetail from "./partials/UCommissionVoteDetail"
// import UCommissionVoteJob from "./partials/UCommissionVoteJob"
import UCommissionVoteOther1 from "./partials/UCommissionVoteOther1"
import UCommissionVoteOther2 from "./partials/UCommissionVoteOther2"

export default {
  mixins: [baseFormMixin, commission77Mixin],

  components: {
    UCommissionVoteCommissionVote,
    UCommissionVoteListComisionVote,
    UCommissionVoteDetail,
    // UCommissionVoteJob,
    UCommissionVoteOther1,
    UCommissionVoteOther2
  },

  data () {
    return {
      title: "صدور رای",
      formKey: "F9FB44E4-B43F-41AD-980B-99C95342584D",
      name: "UCommissionVote",
      main: true,
      showUCommissionVoteDetail: false,

      // Tabs
      activeTab: "commissionVoteTab",
      // Tabs Visible Status
      tabJobShow: false,

      // Responses
      getRequestVoteRes: null,
      getDutyFicheByFicheNoRes: null,
      saveOtherVote2Res: null,
      getAllOtherVote2Res: null,
      saveRequestVoteRes: null,
      saveOtherVote1Res: null,
      saveOtherVote1DelRes: null,
      saveOtherVote2DelRes: null,
      getAllOtherVote1Res: null,
      getListVoteFicheRes: null,

      // Context
      nidProc: EMPTY_GUID,
      dataContext: {
        ClsRequest_Vote: {
          Request_Vote: {
            ...generateClsRequestVoteParam("Request_Vote")
          },
          // Request_Vote
          ListRequest_Vote: []
        },
        ClsRequest_Info: {
          Request_Info: {
            SecretariatNo: "",
            OwnerName: "",
            Address: "",
            CI_Commission: null,
            CI_RequestType: null,
            NidWorkItem: null,
            HoldingDate: null
          },
          ListFicheInVote: []
        },
        formContext: {
          txtDiscount: "",
          chkIsAbsolution: false,
          baseNosaziCode: {
            District: 0,
            Region: 0,
            Block: 0,
            House: 0,
            Building: 0,
            Apartment: 0,
            Shop: 0
          },
          other1: {
            txtNumber: "",
            txtDate: "",
            txtBankAccountNumber: "",
            txtBranch: "",
            txtDated: "",
            txtInDate: "",
            txtTransferee: "",
            txtOther1: "",
            txtDescriptionOther1: ""
          },
          other2: {
            txtCommission: "",
            txtFile: "",
            txtDemand: "",
            txtBank: "",
            txtAttendanceMeeting: "",
            txtComplaint: "",
            txtAgainst: "",
            txtOnTheLackOf: "",
            txtFileContents: "",
            txtMatter77: "",
            txtPayment: "",
            txtLocatedAt: "",
            txtOther2: "",
            txtDescriptionOther2: ""
          }
        }
      },
      gridContext: {
        grdFicheDetails1: [],
        grdFicheSub: [],
        gridLog: [],
        grdCommissionVote: [],
        grdOtherVote1: [],
        grdOtherVote2: []
      },
      saveVoteRes: [],
      txtStatusFicheText: "وضعیت فیش:پرداخت شده",
      isNewOther1: false,
      isNewOther2: false,
      selectedNidVote: EMPTY_GUID,

      // Default Commission77 Settings
      commission77Settings: {
        IsSingleRequest: false,
        IsEnableVote: true,
        IsMultiAlert: true
      },

      // Permissions
      permissionVoteNo: null,

      // Btn & Sections Visibility
      isBtnEditEnable: true,
      txtStatusFicheVisible: false,
      lblDiscountVisible: false,
      txtDiscountVisible: false

      // Forms & Controls Edit/ReadOnly Modes
      //
    }
  },

  methods: {
    async loadCommission77Settings () {
      this.commission77Settings = await this.loadFormSetting(
        "commission77Settings",
        {
          nidProc: GLOBAL_SETTINGS_GUID,
          defaultValue: this.commission77Settings
        }
      )
    },

    async loadObj () {
      this.showLoading()

      if (
        this.taskInfo?.WorkflowInstance?.NidWorkflowDeff &&
        this.taskInfo.WorkflowInstance.NidWorkflowDeff !== EMPTY_GUID
      ) {
        this.nidProc = this.taskInfo.WorkflowInstance.NidWorkflowDeff
      } else if (this.selectedCommission77) {
        this.nidProc = this.selectedCommission77.NidProc
      } else if (this.selectedNidProc) {
        // this.nidProc = "fb5b27e0-bddf-419f-977a-63c6db7cb329"
        // this.nidProc = "96431e07-ab01-4e13-ada9-9939a30680ba" // دیتا در سرا8 دارد در تب سوابق صدور رای
        this.nidProc = this.selectedNidProc
      } else {
        this.nidProc = this.selectedRequest.NidProc
      }

      // await this.checkSecurityForVoteNo() // not needed

      if (this.nidProc !== EMPTY_GUID) {
        const payload = {
          pRequest: {
            NidProc: this.nidProc
            // NidProc: "66e821f1-0bf3-4e86-b336-03500a59ddf1"
          }
        }
        this.$services.commission77
          .getRequestVote(payload)
          .then(async ({ data }) => {
            this.getRequestVoteRes = await this.getResponse(data)
            if (this.getRequestVoteRes.success) {
              this.$nextTick(function () {
                this.$refs.UCommissionVoteListComisionVote.grdCommissionVote = [...this.getRequestVoteRes.data.GetRequestVoteResult.ClsRequest_Vote.ListRequest_Vote]
              })
              if (
                this.getRequestVoteRes.data.GetRequestVoteResult.ClsRequest_Info
                  .Request_Info.SysCI_RequestStatus !== 99
              ) {
                if (
                  this.getRequestVoteRes.data.GetRequestVoteResult
                    .ClsRequest_Vote.Request_Vote !== null
                ) {
                  this.getRequestVoteRes.data.GetRequestVoteResult.ClsRequest_Vote.Request_Vote.CI_VoteTypeNew =
                    this.getRequestVoteRes.data.GetRequestVoteResult.ClsRequest_Vote.Request_Vote.CI_VoteType
                  this.dataContext.ClsRequest_Vote =
                    this.getRequestVoteRes.data.GetRequestVoteResult.ClsRequest_Vote
                  if (
                    this.dataContext.ClsRequest_Vote.Request_Vote.IsCancel ===
                    true
                  ) {
                    this.dataContext.ClsRequest_Vote.Request_Vote =
                      generateRequestVote()
                  }

                  this.dataContext.ClsRequest_Vote.RequestInfo =
                    this.getRequestVoteRes.data.GetRequestVoteResult.ClsRequest_Info.Request_Info
                  this.dataContext.ClsRequest_Info =
                    this.getRequestVoteRes.data.GetRequestVoteResult.ClsRequest_Info
                  this.dataContext.ClsAgent =
                    this.getRequestVoteRes.data.GetRequestVoteResult.ClsAgent

                  if (this.dataContext.ClsRequest_Info.Request_Info !== null) {
                    if (
                      this.dataContext.ClsRequest_Info.Request_Info.NosaziCode
                    ) {
                      this.dataContext.formContext.baseNosaziCode =
                        convertStringToNosaziCodeObject(
                          this.dataContext.ClsRequest_Info.Request_Info
                            .NosaziCode
                        )
                      if (
                        this.dataContext.ClsRequest_Info.Request_Info
                          .CI_RequestType === 3
                      ) {
                        this.tabJobShow = true
                      } else this.tabJobShow = false

                      try {
                      // ClsEnumEumBaseInfoGroup: {
                      //   Parvandeh:  0,
                      //   Renovation: 1,
                      //   Job:        2,
                      //   Renovation: 3
                      // }
                        if (this.dataContext.ClsRequest_Info.Request_FicheDetail.length === 0) return
                        const { data: args } =
                          await this.$services.SB.getDutyFicheByFicheNo(
                            {
                              pFicheNo:
                                this.dataContext.ClsRequest_Info
                                  .Request_FicheDetail[0].FicheNo,
                              PDutyType:
                                this.dataContext.ClsRequest_Info.Request_Info
                                  .CI_RequestType === 1
                                  ? 1
                                  : this.dataContext.ClsRequest_Info
                                    .Request_Info.CI_RequestType === 2
                                    ? 3
                                    : 2,
                              pEumBaseInfoGroup: 0
                            },
                            {
                              config: {
                                District:
                                  this.dataContext.ClsRequest_Info.Request_Info.Distrcit.toString()
                              }
                            }
                          )

                        this.getDutyFicheByFicheNoRes = this.getResponse(args)

                        if (this.getDutyFicheByFicheNoRes.success) {
                          if (
                            this.getDutyFicheByFicheNoRes.data
                              .Duty_FicheByFicheNo
                          ) {
                            if (
                              this.getDutyFicheByFicheNoRes.data
                                .Duty_FicheByFicheNo.EumDutyFicheStatus === 2 &&
                              !this.getDutyFicheByFicheNoRes.data
                                .Duty_FicheByFicheNo.CanceledDate
                            ) {
                              this.txtStatusFicheVisible = true
                            } else if (
                              this.getDutyFicheByFicheNoRes.data
                                .Duty_FicheByFicheNo.CanceledDate
                            ) {
                              this.txtStatusFicheVisible = true
                              this.txtStatusFicheText = "وضعیت فیش :ابطال شده"
                            // this.txtStatusFicheVisible.Foreground = 'red'; todo
                            }
                          }
                        }
                      } catch (ex) {
                        console.error(ex)
                        this.serverError()
                      } finally {
                        this.hideLoading()
                      }
                    }

                    if (
                      this.dataContext.ClsRequest_Info.ListFicheInVote.every(
                        (i) => i.IsVote === true
                      ) &&
                      this.dataContext.ClsRequest_Vote.ListRequest_Vote.every(
                        (j) => j.IsCancel === false || j.IsCancel === null
                      )
                    ) {
                      if (!this.commission77Settings.IsEnableVote) {
                        this.isBtnEditEnable = false
                      }
                    }
                  }
                }
              } else {
                this.showError("درخواست مورد نظر در وضعیت ابطال قرار دارد!")
              }
            } else {
              this.showError(this.getRequestVoteRes.msg)
            }
          })
          .catch((ex) => {
            console.error(ex)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },

    comboVoteTypeSelectionChanged () {
      if (
        this.dataContext.ClsRequest_Vote.Request_Vote.CI_VoteTypeNew != null
      ) {
        if (
          this.dataContext.ClsRequest_Vote.Request_Vote.CI_VoteTypeNew === 1
        ) {
          this.dataContext.ClsRequest_Vote.Request_Vote.VoteValue =
            this.dataContext.ClsRequest_Info.ListFicheInVote.reduce(
              (a, { PriceFiche: b }) => a + parseFloat(b),
              0
            )

          this.dataContext.ClsRequest_Vote.Request_Vote.VoteDate =
            currentDate()
        } else {
          this.dataContext.ClsRequest_Vote.Request_Vote.VoteValue = 0
          this.dataContext.ClsRequest_Vote.Request_Vote.VoteDate = ""
        }

        if (
          this.dataContext.ClsRequest_Vote.Request_Vote.CI_VoteTypeNew === 2
        ) {
          this.$refs.UCommissionVoteCommissionVote.tavafoghnamehSectionVisible = true
          if (
            this.dataContext.ClsRequest_Info.Request_Info.CI_RequestType === 3
          ) {
            this.lblDiscountVisible = true
            this.txtDiscountVisible = true
          } else {
            this.lblDiscountVisible = false
            this.txtDiscountVisible = false
          }
        } else {
          this.$refs.UCommissionVoteCommissionVote.tavafoghnamehSectionVisible = false
        }
      }
    },

    grdCommissionVoteSelectionChanged (params) {
      this.selectedNidVote = params.NidVote
      this.getOtherVote1(this.selectedNidVote)
      this.getOtherVote2(this.selectedNidVote)
    },

    activeTabSelectionChanged () {
      if (this.activeTab != null) {
        if (this.dataContext.ClsRequest_Info != null) {
          this.gridContext.grdFicheDetails1 =
            this.dataContext.ClsRequest_Info.Request_FicheDetail || []

          if (this.dataContext.ClsRequest_Info?.SubFicheDetail?.length > 0) {
            this.gridContext.grdFicheSub =
              this.dataContext.ClsRequest_Info.SubFicheDetail || []
            let gridLog = converter.xml2js(
              this.dataContext.ClsRequest_Info.SubFicheDetail.find(
                (i) => i.DutyFicheOtherFiled != null
              ).DutyFicheOtherFiled,
              {
                compact: true,
                ignoreDoctype: true,
                ignoreCdata: true
              }
            ).ArrayOfClsLog.ClsLog.map((x) => {
              return {
                ...x,
                Subject: x.Subject._text,
                Value: x.Value._text,
                Comment: x.Comment._text
              }
            })
            this.gridContext.gridLog = gridLog
          }
          // this.gridContext.grdCommissionVote = []
          this.dataContext.ClsRequest_Vote.ListRequest_Vote.forEach(x => {
            if (x.NidVote !== EMPTY_GUID) {
              // this.gridContext.grdCommissionVote.push(x)
            }
          })
        }
      }
    },

    btnNewClick () {
      if (this.activeTab === "commissionVoteTab") {
        // # todo
        // let QueryAgentCount = this.dataContext.ClsAgent.ListAgent.Join(
        //   ClsGetToken.GetSingleTokenSerial(),
        //   (i) => i.SerialNo,
        //   (j) => j,
        //   (i, j) => i
        // ).length();
        // if (QueryAgentCount === this.dataContext.ClsAgent.AgentCount) {
        this.dataContext.ClsRequest_Vote = generateClsRequestVote({
          Request_Vote: generateRequestVote({
            NidRequest:
              this.dataContext.ClsRequest_Info.Request_Info.NidRequest
          }),
          RequestInfo: this.dataContext.ClsRequest_Info.Request_Info
        })
        if (this.permissionVoteNo !== 1) {
          this.dataContext.ClsRequest_Vote.Request_Vote.VoteNoe =
            "77" +
            "/" +
            this.dataContext.ClsRequest_Info.Request_Info.NidWorkItem +
            "/ک"
          this.$refs.UCommissionVoteCommissionVote.txtVoteNoMode = "r"
        } else {
          this.$refs.UCommissionVoteCommissionVote.txtVoteNoMode = "e"
        }
        this.isEditable = true
        this.dataContext.ClsRequest_Vote.NidRequest =
          this.dataContext.ClsRequest_Info.Request_Info.NidRequest
        // } else this.showError("شما مجاز به صدور رای نمی باشید!");
      } else if (this.activeTab === "other1Tab") {
        this.isNewOther1 = true
        this.isEditable = true

        Object.keys(this.dataContext.formContext.other1).forEach((e) => {
          this.dataContext.formContext.other1[e] = ""
        })
      } else if (this.activeTab === "other2Tab") {
        this.isNewOther2 = true
        this.isEditable = true

        Object.keys(this.dataContext.formContext.other2).forEach((e) => {
          this.dataContext.formContext.other2[e] = ""
        })
      }
    },

    btnDeleteClick () {
      if (this.activeTab === "other1Tab") {
        const tmp =
          this.$refs.UCommissionVoteOther1.$refs.grdOtherVote1.gridApi.getSelectedRows()[0]
        if (!tmp) {
          this.showError("ردیفی جهت حذف وجود ندارد!")
          return
        } else {
          // tmp.NidOtherVote1 = tmp.NidOtherVote1;
          tmp.IsRemoved = true
          tmp.RemovalDate = currentDate()
          tmp.RemovalTime = currentTime()
          tmp.RemovalUserName = this.getUserDisplayName()
          tmp.RemovalNidUser = this.getNidUser()
        }

        this.showConfirm("آیا از حذف آیتم مورد نظر اطمینان دارید؟", "توجه")
          .onOk(() => {
            this.showLoading()

            const payload = {
              pRequest: {
                ClsOtherVote: generateClsOtherVote({ OtherVote1: tmp })
              }
            }

            this.$services.commission77
              .saveOtherVote1(payload)
              .then(async ({ data }) => {
                this.saveOtherVote1DelRes = this.getResponse(data)

                if (this.saveOtherVote1DelRes.success) {
                  await this.log({
                    action: this.logActions.save,
                    bizCode: '',
                    bizCodeTitle: '',
                    saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
                  })
                  this.readModeOtherVote1()
                  this.gridContext.grdOtherVote1 = []
                  this.getOtherVote1(this.selectedNidVote)

                  this.isEditable = false
                  this.showSuccess("عملیات با موفقیت انجام شد!")
                }
              })
              .catch((ex) => {
                console.error(ex)
                this.serverError()
              })
              .finally(() => {
                this.hideLoading()
              })
          })
          .onCancel(() => {
            this.readModeOtherVote1()
            this.isEditable = false
          })
      } else if (this.activeTab === "other2Tab") {
        const tmp =
          this.$refs.UCommissionVoteOther2.$refs.grdOtherVote2.gridApi.getSelectedRows()[0]
        if (!tmp) {
          this.showError("ردیفی جهت حذف وجود ندارد!")
          return false
        }

        // tmp.NidOtherVote2 = tmp.NidOtherVote2;
        tmp.IsRemoved = true
        tmp.RemovalDate = currentDate()
        tmp.RemovalTime = currentTime()
        tmp.RemovalUserName = this.getUserDisplayName()
        tmp.RemovalNidUser = this.getNidUser()

        this.showConfirm("آیا از حذف آیتم مورد نظر اطمینان دارید؟")
          .onOk(() => {
            this.showLoading()

            const payload = {
              pRequest: {
                ClsOtherVote: generateClsOtherVote({
                  OtherVote2: tmp
                })
              }
            }

            this.$services.commission77
              .saveOtherVote2(payload)
              .then(async ({ data }) => {
                this.saveOtherVote2DelRes = this.getResponse(data)
                if (this.saveOtherVote2DelRes.success) {
                  await this.log({
                    action: this.logActions.save,
                    bizCode: '',
                    bizCodeTitle: '',
                    saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
                  })
                  this.readModeOtherVote2()
                  this.gridContext.grdOtherVote2 = []
                  this.getOtherVote2(this.selectedNidVote)

                  this.isEditable = false
                  this.showSuccess("عملیات با موفقیت انجام شد!")
                }
              })
              .catch((ex) => {
                console.error(ex)
                this.serverError()
              })
              .finally(() => {
                this.hideLoading()
              })
          })
          .onDismiss(() => {
            this.readModeOtherVote2()
            this.isEditable = false
          })
      }
    },

    btnCancelClick () {
      this.isEditable = false
      if (this.activeTab === "commissionVoteTab") {
      } else if (this.activeTab === "other1Tab") {
        this.readModeOtherVote1()
        this.isNewOther1 = false
      } else if (this.activeTab === "other2Tab") {
        this.readModeOtherVote2()
        this.isNewOther2 = false
      }
    },

    readModeOtherVote1 () {
      Object.keys(this.dataContext.formContext.other1).forEach((e) => {
        this.dataContext.formContext.other1[e] = ""
      })
    },

    editModeOtherVote1 () {
      this.isEditable = true
    },

    readModeOtherVote2 () {
      Object.keys(this.dataContext.formContext.other2).forEach((e) => {
        this.dataContext.formContext.other2[e] = ""
      })
    },

    editModeOtherVote2 () {
      this.isEditable = true
    },

    getOtherVote2 (pNidVote = EMPTY_GUID) {
      this.showLoading()

      const payload = {
        pRequest: {
          NidVote: pNidVote
        }
      }

      this.$services.commission77
        .getAllOtherVote2(payload)
        .then(({ data }) => {
          this.getAllOtherVote2Res = this.getResponse(data)
          if (this.getAllOtherVote2Res.success) {
            if (
              this.getAllOtherVote2Res.data.ClsOtherVote?.OtherVote2List &&
              this.getAllOtherVote2Res.data.ClsOtherVote?.OtherVote2List.length > 0
            ) {
              const tmpList =
                this.getAllOtherVote2Res.data.ClsOtherVote.OtherVote2List.filter(
                  (ff) => ff.IsRemoved === false
                )
                  .sort((x) => x.CreateDate)
                  .sort((f) => f.CreateTime)

              this.gridContext.grdOtherVote2 = tmpList || []
              if (tmpList && tmpList.length > 0) {
                const dto = tmpList.find(Boolean)
                this.$refs.UCommissionVoteOther2.$refs.grdOtherVote2.gridApi.forEachRowNode(
                  (node) => {
                    if (node.NidVote === dto.NidVote) node.setSelected(true)
                  }
                )

                this.dataContext.formContext.other2.txtCommission =
                  dto?.Commission ?? ""
                this.dataContext.formContext.other2.txtFile = dto?.File ?? ""
                this.dataContext.formContext.other2.txtDemand =
                  dto?.Demand ?? ""
                this.dataContext.formContext.other2.txtBank = dto?.Bank ?? ""
                this.dataContext.formContext.other2.txtAttendanceMeeting =
                  dto?.AttendanceMeeting ?? ""
                this.dataContext.formContext.other2.txtComplaint =
                  dto?.Complaint ?? ""
                this.dataContext.formContext.other2.txtAgainst =
                  dto?.Against ?? ""
                this.dataContext.formContext.other2.txtOnTheLackOf =
                  dto?.OnTheLackOf ?? ""
                this.dataContext.formContext.other2.txtFileContents =
                  dto?.FileContents ?? ""
                this.dataContext.formContext.other2.txtMatter77 =
                  dto?.Matter77 ?? ""
                this.dataContext.formContext.other2.txtPayment =
                  dto?.Payment ?? ""
                this.dataContext.formContext.other2.txtLocatedAt =
                  dto?.LocatedAt ?? ""
                this.dataContext.formContext.other2.txtOther2 =
                  dto?.Other ?? ""
                this.dataContext.formContext.other2.txtDescriptionOther2 =
                  dto?.Description ?? ""
              }
            }
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    btnDraftVoteCancelClick () {
      const reportName = `${window.getConfigValue('Commission77ReportPath')}/RptVoteDraft`
      const reportPath = `${reportName}`
      const queryParams = {
        NidRequest: this.dataContext.ClsRequest_Info.Request_Info.NidRequest,
        NidUser: this.getNidUser(),
        District: convertStringToNosaziCodeObject(
          this.dataContext.ClsRequest_Info.Request_Info.NosaziCode
        ).Distrcit
      }
      this.showReport(reportPath, queryParams)
    },

    btnEditClick () {
      // ClsButton_Click
      // let QueryAgentCount = this.dataContext.ClsAgent.ListAgent.Join(
      //   ClsGetToken.GetSingleTokenSerial(),
      //   (i) => i.SerialNo,
      //   (j) => j,
      //   (i, j) => i
      // ).length();
      // if (QueryAgentCount === this.dataContext.ClsAgent.AgentCount) {
      this.dataContext.ClsRequest_Vote = generateClsRequestVote({
        Request_Vote: generateRequestVote({
          NidRequest: this.dataContext.ClsRequest_Info.Request_Info.NidRequest
        }),
        RequestInfo: this.dataContext.ClsRequest_Info.Request_Info
      })
      if (this.permissionVoteNo !== 1) {
        this.txtVoteNoMode = "r"
      } else {
        this.txtVoteNoMode = "e"
      }
      this.isEditable = true
      this.dataContext.ClsRequest_Vote.NidRequest =
        this.dataContext.ClsRequest_Info.Request_Info.NidRequest
      // } else this.showEror("شما مجاز به صدور رای نمی باشید!");
    },

    async btnSaveClick () {
      if (this.activeTab === "commissionVoteTab") {
        if (!this.isValidForm()) return

        this.showLoading()

        this.dataContext.ClsRequest_Vote.Request_Vote.NidUser =
          this.getNidUser()
        this.dataContext.ClsRequest_Vote.Request_Vote.UserName =
          this.getUserDisplayName()
        this.dataContext.ClsRequest_Vote.ListFicheInVote =
          this.dataContext.ClsRequest_Info.ListFicheInVote
          // .filter(
          //   (i) => i.IsSelected
          // )
        let cloneContex = this.dataContext.ClsRequest_Vote
        cloneContex.Request_Vote.CI_VoteType = this.dataContext.ClsRequest_Vote.Request_Vote.CI_VoteTypeNew
        const payload = {
          pRequest: {
            ClsRequest_Vote: cloneContex,
            NidAgent: "00000000-0000-0000-0000-000000000000",
            NidDecision: "00000000-0000-0000-0000-000000000000",
            NidProc: "00000000-0000-0000-0000-000000000000",
            NidRequest: "00000000-0000-0000-0000-000000000000",
            NidUser: "00000000-0000-0000-0000-000000000000",
            NidVote: "00000000-0000-0000-0000-000000000000",
            NidWorkItem: 0,
            From: 0,
            To: 0
            // ListFicheInVote: this.dataContext.ClsRequest_Info.ListFicheInVote
          }
        }
        this.$services.commission77
          .saveRequestVote(payload)
          .then(async ({ data }) => {
            this.saveRequestVoteRes = this.getResponse(data)
            if (this.saveRequestVoteRes.success) {
              if (
                this.saveRequestVoteRes.data.SaveRequest_VoteResult.ClsRequest_Vote
              ) {
                await this.log({
                  action: this.logActions.save,
                  bizCode: '',
                  bizCodeTitle: '',
                  saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
                })
                this.showSuccess("ذخیره با موفقیت انجام شد!")
                this.gridContext.grdCommissionVote = [...this.gridContext.grdCommissionVote, this.saveRequestVoteRes?.data?.ClsRequest_Vote?.Request_Vote]
                this.saveVoteRes = this.saveRequestVoteRes.data?.SaveRequest_VoteResult?.ClsRequest_Vote
                this.dataContext.ClsRequest_Info.ListFicheInVote = [...this.dataContext.ClsRequest_Vote.ListFicheInVote, this.saveRequestVoteRes?.data?.SaveRequest_VoteResult?.ClsRequest_Vote?.ListFicheInVote]
                this.isEditable = false
                // this.$refs.UCommissionVoteListComisionVote.voteCancelingHandler()
                // this.saveCompletd() # todo
                await this.loadObj()
              }
            }
          })
          .catch((ex) => {
            console.error(ex)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else if (this.activeTab === "other1Tab") {
        if (
          this.isNewOther1 &&
          !this.dataContext.formContext.other1.txtDescriptionOther1
        ) {
          this.showError("توضیحات سایر وارد نشده است!")
          return false
        }
        else if (this.selectedNidVote === EMPTY_GUID) {
          this.showError(
            "ابتدا ردیف رأی مورد نظر را از قسمت سوابق رأی انتخاب نمایید!"
          )
          return false
        }
        else {
          const tmp = generateOtherVote1()
          if (this.isNewOther1) {
            tmp.NidOtherVote1 = uid()
            tmp.NidVote = this.selectedNidVote
            tmp.CreateDate = currentDate()
            tmp.CreateTime = currentTime()
            tmp.NidUser = this.getNidUser()
            tmp.UserName = this.getUserDisplayName()
            tmp.IsRemoved = false
            tmp.Number = this.dataContext.formContext.other1.txtNumber
            tmp.Date = this.dataContext.formContext.other1.txtDate
            tmp.BankAccountNumber =
              this.dataContext.formContext.other1.txtBankAccountNumber
            tmp.Branch = this.dataContext.formContext.other1.txtBranch
            tmp.Dated = this.dataContext.formContext.other1.txtDated
            tmp.InDate = this.dataContext.formContext.other1.txtInDate
            tmp.Transferee = this.dataContext.formContext.other1.txtTransferee
            tmp.Other = this.dataContext.formContext.other1.txtOther1
            tmp.Description =
              this.dataContext.formContext.other1.txtDescriptionOther1
          } else {
            const grdOtherVote1SelectedItem =
              this.$refs.UCommissionVoteOther1.$refs.grdOtherVote1.gridApi.getSelectedRows()[0]
            if (!grdOtherVote1SelectedItem) {
              this.showError("ردیفی جهت ویرایش وجود ندارد!")
              return false
            } else {
              tmp.NidOtherVote1 = grdOtherVote1SelectedItem.NidOtherVote1
              tmp.Number = this.dataContext.formContext.other1.txtNumber
              tmp.Date = this.dataContext.formContext.other1.txtDate
              tmp.BankAccountNumber =
                this.dataContext.formContext.other1.txtBankAccountNumber
              tmp.Branch = this.dataContext.formContext.other1.txtBranch
              tmp.Dated = this.dataContext.formContext.other1.txtDated
              tmp.InDate = this.dataContext.formContext.other1.txtInDate
              tmp.Transferee =
                this.dataContext.formContext.other1.txtTransferee
              tmp.Other = this.dataContext.formContext.other1.txtOther1
              tmp.Description =
                this.dataContext.formContext.other1.txtDescriptionOther1
              tmp.EditDate = currentDate()
              tmp.EditTime = currentTime()
              tmp.EditorUserName = this.getUserDisplayName()
              tmp.EditorNidUser = this.getNidUser()
            }
          }

          this.showLoading()

          const payload = {
            pRequest: {
              ClsOtherVote: generateClsOtherVote({ OtherVote1: tmp })
            }
          }

          this.$services.commission77
            .saveOtherVote1(payload)
            .then(({ data }) => {
              this.saveOtherVote1Res = this.getResponse(data)

              if (this.saveOtherVote1Res.success) {
                this.readModeOtherVote1()
                this.gridContext.grdOtherVote1 = []
                this.getOtherVote1(this.selectedNidVote)
                this.isEditable = false
                this.showSuccess("عملیات با موفقیت انجام شد!")
              }
            })
            .catch((ex) => {
              console.error(ex)
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      } else if (this.activeTab === "other2Tab") {
        if (
          this.isNewOther2 &&
          !this.dataContext.formContext.other2.txtDescriptionOther2
        ) {
          this.showError("توضیحات سایر وارد نشده است!")
          return false
        } else if (this.selectedNidVote === EMPTY_GUID) {
          this.showError(
            "ابتدا ردیف رأی مورد نظر را از قسمت سوابق رأی انتخاب نمایید!"
          )
          return false
        } else {
          const tmp = generateOtherVote2()
          if (this.isNewOther2) {
            tmp.NidOtherVote2 = uid()
            tmp.NidVote = this.selectedNidVote
            tmp.CreateDate = currentDate()
            tmp.CreateTime = currentTime()
            tmp.NidUser = this.getNidUser()
            tmp.UserName = this.getUserDisplayName()
            tmp.IsRemoved = false
            tmp.Commission = this.dataContext.formContext.other2.txtCommission
            tmp.File = this.dataContext.formContext.other2.txtFile
            tmp.Demand = this.dataContext.formContext.other2.txtDemand
            tmp.Bank = this.dataContext.formContext.other2.txtBank
            tmp.AttendanceMeeting =
              this.dataContext.formContext.other2.txtAttendanceMeeting
            tmp.Complaint = this.dataContext.formContext.other2.txtComplaint
            tmp.Against = this.dataContext.formContext.other2.txtAgainst
            tmp.OnTheLackOf =
              this.dataContext.formContext.other2.txtOnTheLackOf
            tmp.FileContents =
              this.dataContext.formContext.other2.txtFileContents
            tmp.Matter77 = this.dataContext.formContext.other2.txtMatter77
            tmp.Payment = this.dataContext.formContext.other2.txtPayment
            tmp.LocatedAt = this.dataContext.formContext.other2.txtLocatedAt
            tmp.Other = this.dataContext.formContext.other2.txtOther2
            tmp.Description =
              this.dataContext.formContext.other2.txtDescriptionOther2
          } else {
            const grdOtherVote2SelectedItem =
              this.$refs.UCommissionVoteOther2.$refs.grdOtherVote2.gridApi.getSelectedRows()[0]

            if (!grdOtherVote2SelectedItem) {
              this.showError("ردیفی جهت ویرایش وجود ندارد!")
              return false
            } else {
              tmp.NidOtherVote2 = grdOtherVote2SelectedItem.NidOtherVote2
              tmp.Commission =
                this.dataContext.formContext.other2.txtCommission
              tmp.File = this.dataContext.formContext.other2.txtFile
              tmp.Demand = this.dataContext.formContext.other2.txtDemand
              tmp.Bank = this.dataContext.formContext.other2.txtBank
              tmp.AttendanceMeeting =
                this.dataContext.formContext.other2.txtAttendanceMeeting
              tmp.Complaint = this.dataContext.formContext.other2.txtComplaint
              tmp.Against = this.dataContext.formContext.other2.txtAgainst
              tmp.OnTheLackOf =
                this.dataContext.formContext.other2.txtOnTheLackOf
              tmp.FileContents =
                this.dataContext.formContext.other2.txtFileContents
              tmp.Matter77 = this.dataContext.formContext.other2.txtMatter77
              tmp.Payment = this.dataContext.formContext.other2.txtPayment
              tmp.LocatedAt = this.dataContext.formContext.other2.txtLocatedAt
              tmp.Other = this.dataContext.formContext.other2.txtOther2
              tmp.Description =
                this.dataContext.formContext.other2.txtDescriptionOther2
              tmp.EditDate = currentDate()
              tmp.EditTime = currentTime()
              tmp.EditorUserName = this.getUserDisplayName()
              tmp.EditorNidUser = this.getNidUser()
            }
          }

          this.showLoading()

          const payload = {
            pRequest: {
              ClsOtherVote: generateClsOtherVote({
                OtherVote2: tmp
              })
            }
          }

          this.$services.commission77
            .saveOtherVote2(payload)
            .then(({ data }) => {
              this.saveOtherVote2Res = this.getResponse(data)

              if (this.saveOtherVote2Res.success) {
                this.readModeOtherVote2()
                this.gridContext.grdOtherVote2 = []
                this.getOtherVote2(this.selectedNidVote)
                this.isEditable = false
                this.showSuccess("عملیات با موفقیت انجام شد!")
              }
            })
            .catch((ex) => {
              console.error(ex)
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      }
    },

    getOtherVote1 (pNidVote = EMPTY_GUID) {
      this.showLoading()
      const payload = {
        pRequest: {
          NidVote: pNidVote
          // NidVote: "e9ec4ef7-02fb-4c62-b8fb-4c7c7024815b"
        }
      }

      this.$services.commission77.getAllOtherVote1(payload).then(({ data }) => {
        this.getAllOtherVote1Res = this.getResponse(data)
        // console.log(this.getAllOtherVote1Res)
        if (this.getAllOtherVote1Res.success) {
          if (
            this.getAllOtherVote1Res.data.ClsOtherVote
              .OtherVote1List &&
            this.getAllOtherVote1Res.data.ClsOtherVote.OtherVote1List.length > 0
          ) {
            const tmpList =
              this.getAllOtherVote1Res.data.ClsOtherVote.OtherVote1List.filter(
                (ff) => ff.IsRemoved === false
              )
                .sort((x) => x.CreateDate)
                .sort((f) => f.CreateTime)

            this.gridContext.grdOtherVote1 = tmpList || []
            if (tmpList && tmpList.length > 0) {
              const dto = tmpList.find(Boolean)
              this.$refs.UCommissionVoteOther1.$refs.grdOtherVote1.gridApi.forEachRowNode(
                (node) => {
                  if (node.NidVote === dto.NidVote) node.setSelected(true)
                }
              )
              this.dataContext.formContext.other1.txtNumber = dto?.Number ?? ""
              this.dataContext.formContext.other1.txtDate = dto?.Date ?? ""
              this.dataContext.formContext.other1.txtBankAccountNumber =
                dto?.BankAccountNumber ?? ""
              this.dataContext.formContext.other1.txtBranch = dto?.Branch ?? ""
              this.dataContext.formContext.other1.txtDated = dto?.Dated ?? ""
              this.dataContext.formContext.other1.txtInDate = dto?.InDate ?? ""
              this.dataContext.formContext.other1.txtTransferee =
                dto?.Transferee ?? ""
              this.dataContext.formContext.other1.txtOther1 = dto?.Other ?? ""
              this.dataContext.formContext.other1.txtDescriptionOther1 =
                dto?.Description ?? ""
            }
          }
        }
      })
    },
    async addPrintToArchive () {
      let TmpParameters = new Map()
      TmpParameters.set("NidRequest", this.dataContext.ClsRequest_Info.Request_Info.NidRequest)
      TmpParameters.set("NidUser", this.getNidUser())
      TmpParameters.set("District", this.dataContext.ClsRequest_Info.Request_Info.NosaziCode.split("-")[0])
      let payLoad = {
        NidUser: this.getNidUser(),
        ClsArchive: {
          ReportName: "/Sara8Reports/RptVote",
          DomainName: "Commission77",
          BizCode: this.dataContext.ClsRequest_Info.Request_Info.NidWorkItem,
          FileName: "RptVote_" + this.nidProc,
          Parameters: TmpParameters
        }
      }
      this.loading = true
      try {
        let res = await this.$services.report.exportToArchive(payLoad)
        res = this.getResponse(res)
        if (res.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } finally {
        this.loading = false
      }
    },
    btnPrintvoteClick () {
      const reportName = `${window.getConfigValue('Commission77ReportPath')}/RptVote`
      const reportPath = `${reportName}`
      const queryParams = {
        NidRequest: this.dataContext.ClsRequest_Info.Request_Info.NidRequest,
        NidUser: this.getNidUser(),
        District: convertStringToNosaziCodeObject(
          this.dataContext.ClsRequest_Info.Request_Info.NosaziCode
        ).Distrcit
      }
      this.showReport(reportPath, queryParams)
      this.addPrintToArchive()
    },

    btnCancelVoteClick () {
      // # todo
    },

    editVote (selectedItem) {
      this.showLoading()
      if (selectedItem) {
        var tmpSelected = { ...selectedItem }

        var tmpVote = generateRequestVote({
          CI_VoteType: tmpSelected.CI_VoteType,
          NidRequest: tmpSelected.NidRequest,
          NidVote: tmpSelected.NidVote,
          VoteDate: tmpSelected.VoteDate,
          VoteNoe: tmpSelected.VoteNoe,
          VoteValue: tmpSelected.VoteValue,
          VoteDescryption: tmpSelected.VoteDescryption,
          NumberOfInstallments: tmpSelected.NumberOfInstallments,
          // IsAbsolution: tmpSelected.IsAbsolution,
          DutyPrice: tmpSelected.DutyPrice,
          Discount: tmpSelected.Discount,
          CI_VoteTypeNew: tmpSelected.CI_VoteType,
          Cash: tmpSelected.Cash
        })

        this.dataContext.ClsRequest_Vote.Request_Vote = tmpVote
        const payload = {
          pRequest: {
            NidVote: tmpSelected.NidVote
          }
        }
        this.$services.commission77
          .getListVoteFiche(payload)
          .then(async ({ data }) => {
            this.getListVoteFicheRes = this.getResponse(data)
            if (this.getListVoteFicheRes.data.GetListVoteFicheResult) {
              this.getListVoteFicheRes.data.GetListVoteFicheResult.Request_VoteFiche.forEach(
                (i) => {
                  let TmpFiche =
                    this.dataContext.ClsRequest_Info.ListFicheInVote.find(
                      (j) => j.NidFicheDetail === i.NidFicheDetail
                    )
                  if (TmpFiche) {
                    TmpFiche.IsVote = false
                    TmpFiche.IsSelected = true
                  }
                }
              )
              this.activeTab = "commissionVoteTab"
              await this.log({
                action: this.logActions.view,
                bizCode: '',
                bizCodeTitle: '',
                saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
              })
            }
          })
          .catch((ex) => {
            console.error(ex)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else this.showError("لطفا رای مورد نظر را انتخاب نمایید!")
    },

    btnEditvoteClick (dataItem) {
      this.activeTab = "commissionVoteTab"
      this.isEditable = true
      if (!this.isEditable) return

      this.editVote(dataItem)
    }
  },

  watch: {
    "dataContext.ClsRequest_Vote.Request_Vote.CI_VoteTypeNew": {
      handler () {
        this.comboVoteTypeSelectionChanged()
      },
      deep: true
    },

    activeTab () {
      this.activeTabSelectionChanged()
    }
  },

  async created () {
    if (!this.selectedRequest && !this.selectedCommission77) {
      await this.showError("لطفا یک سطر از کارتابل را انتخاب نمایید!")
      await this.hideSidebar(this.name)
      await this.redirectToKartable()
    } else {
      await this.loadCommission77Settings()
      await this.loadObj()
      this.activeTabSelectionChanged()
    }
  }
}
</script>
