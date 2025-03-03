/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
import pick from 'just-pick'

export default {
  data () {
    return {
      // backMethod
      nidTaskState: '',
      desc: '',
      backRes: null,

      // chk_BlackList
      isBlackList: false,
      showMessageBalckList: false,

      // Accessto Resource
      isNotAccessSendToShahrsazi: false,
      isCollapsedSendAndBackButton: false,

      nextStateList: [],
      tmpGroupitems: [],

      isExpertSend: false,

      showSendDescription: false,
      showNextStep: false,

      //  CF
      sendCompleted: () => ({}),

      archiveBizCode: ''
    }
  },

  computed: {

    isMainCommissionKartab () {
      console.log(this.$store.getters['commission/IsMainCommissionKartab'])
      return this.$store.getters['commission/IsMainCommissionKartab']
    },
    selectedCommission () {
      return this.$store.getters['commission/selectedCommission'] || null
    },

    selectedNidCommission () {
      return (
        (this.selectedCommission && this.selectedCommission.NidCommission) ||
        null
      )
    },

    selectedCommissionKartableRows () {
      return this.$store.getters['commission/selectedItems'] || null
    }
  },

  methods: {
    async redirectToCommissionKartable (other) {
      await this.setForm({
        formKey: 'UKartableCommission',
        title: 'کارتابل کمیسیون',
        ...other,
        props: {
          q: Date.now()
        }
      })
      // this.$root.$emit('setForm', 'UKartableCommission', { ...(props || {}), q: Date.now() }, event)
    },

    async canOpenWindow (
      formName = this.name,
      options = {
        closeForm: true,
        redirect: true
      }
    ) {
      if (!this.selectedCommission) {
        await this.showError('لطفا یک سطر از کارتابل کمیسیون انتخاب نمایید.')
        if (options.closeForm) await this.hideSidebar(formName)
        if (options.redirect) await this.redirectToCommissionKartable()
        return false
      } else if (this.isMainCommissionKartab == false &&
          (this.selectedCommission.NidTaskState.toUpperCase() !== "B4A97F78-F820-44FE-BBC1-10BECC8224E9" &&
          this.selectedCommission.NidTaskState.toUpperCase() !== "0793E947-E107-41F3-BDA0-AAC41EE6735D" &&
          this.selectedCommission.NidTaskState.toUpperCase() !== "42484CB9-A207-4B40-90A5-170D9106DCE2" &&
          this.selectedCommission.NidTaskState.toUpperCase() !== "8393710A-28D0-45DA-9BFE-95DA0B0049E2"))
      {
        this.showError("امکان مشاهده پرونده در این مرحله وجود ندارد")
        if (options.closeForm) await this.hideSidebar(formName)
        if (options.redirect) await this.redirectToCommissionKartable()
        return false
      }
      return true
    },

    backMethod () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        PRequest: {
          NIDCommission: this.selectedNidCommission,
          NidUser: this.getNidUser(),
          NidTaskState: this.nidTaskState,
          Description: this.desc
        }
      }

      this.$services.commissions
        .back(payload)
        .then(async ({ data }) => {
          this.backRes = this.getResponse(data)
          if (this.backRes.success) {
            // this.$store.dispatch("commission/setCheckedRow", {
            //   id: this.selectedNidCommission,
            //   isChecked: false,
            // });

            // this.$store.dispatch("commission/setExpandedRow", {
            //   id: this.selectedNidCommission,
            //   isExpanded: false,
            // });

            this.$store.dispatch('commission/setSelectedCommission', null)
            await this.$store.dispatch('commission/fetchKartableRows')

            this.$emit('done')
            this.showSuccess('عملیات با موفقیت انجام شد.')
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async sendMethod (isExpertSend = false, pFrom = '') {
      this.isExpertSend = isExpertSend
      try {
        let commissionState = this.selectedCommission?.CommissionState || ''
        let domainName = 'Commission'
        let reportName = ''

        if (commissionState.includes('SentToShahrsazi')) {
          const payload = {
            pRequest: {
              NIDCommission: this.selectedNidCommission,
              DomainName: domainName,
              ReportName: reportName
            }
          }

          // this.showLoading();
          this.$services.commissions
            .getListCommissionVoteOfAgent(payload)
            .then(({ data }) => {
              const getListCommissionVoteOfAgentRes = this.getResponse(data)
              if (getListCommissionVoteOfAgentRes.success) {
                let listCommissionVoteOfAgentIsAcceptCount =
                  getListCommissionVoteOfAgentRes.data.ListCommissionVoteOfAgent.filter(
                    (x) => x.IsAccept == true
                  ).length
                let sendOK = true

                let exportToArchiveByAgentCount =
                  this.getApplicationParam.hasOwnProperty(
                    'ExportToArchiveByAgentCount'
                  ) &&
                  this.getApplicationParam.ExportToArchiveByAgentCount == null
                    ? false
                    : this.getApplicationParam.ExportToArchiveByAgentCount
                let checkSaveToArchive =
                  this.getApplicationParam.hasOwnProperty(
                    'CheckSaveToArchive'
                  ) && this.getApplicationParam.CheckSaveToArchive == null
                    ? false
                    : this.getApplicationParam.CheckSaveToArchive

                if (exportToArchiveByAgentCount) {
                  if (listCommissionVoteOfAgentIsAcceptCount == 3) {
                  } else {
                    this.showError(
                      'به دلیل عدم امضا هر سه نماینده امکان ارسال به شهرسازی وجود ندارد.'
                    )

                    if (this.sendCompleted != null) this.sendCompleted(false)
                    sendOK = false
                    return false
                  }
                }

                if (checkSaveToArchive) {
                  let CheckExistVoteToArchiveByNidCommission =
                    getListCommissionVoteOfAgentRes.data
                      .CheckExistVoteToArchiveByNidCommission || false
                  if (CheckExistVoteToArchiveByNidCommission == false) {
                    this.showError(
                      'رأی در آرشیو درج نشده است و امکان ارسال به شهرسازی وجود ندارد.'
                    )

                    if (this.sendCompleted != null) this.sendCompleted(false)
                    sendOK = false
                    return false
                  }
                }
                if (sendOK) {
                  this.sendMethodAfterCheck(this.isExpertSend, pFrom)
                }
              } else {
                this.handleError(getListCommissionVoteOfAgentRes)
                this.sendMethodAfterCheck(this.isExpertSend, pFrom)
              }
            })
            .catch((error) => {
              console.error(error)
              // // this.serverError() // test serverError
            })
            .finally(() => {
              this.hideLoading()
            })
        } else {
          await this.sendMethodAfterCheck(this.isExpertSend, pFrom)
        }

        // await this.$store.dispatch('commission/fetchKartableRows')
      } catch (ex) {
        console.error(ex)
        await this.sendMethodAfterCheck(this.isExpertSend, pFrom)
      }
    },

    async sendMethodAfterCheck (isExpertSend = false, pFrom = '') {
      // this.showLoading();
      let tmpTaskSelected = [...this.$store.getters['commission/selectedItems']]
      if (tmpTaskSelected.length < 2) {
        if (
          this.selectedCommission.CommissionState.startsWith('Commission') ==
          false ||
          this.selectedCommission.CommissionState.includes(
            'RandomCommission'
          ) == true
        ) {
          if (this.selectedCommission.CommissionDate.length == 10) {
            if (
              this.selectedCommission.CI_CommissionType != null &&
              this.selectedCommission.CI_CommissionType != 0 &&
              this.selectedCommission.CommissionDate != null &&
              this.selectedCommission.CommissionDate != ''
            ) {
              this.send(isExpertSend)
            } else {
              this.showError('پرونده ابتدا باید کارشناسی شود.')
              if (this.sendCompleted != null) this.sendCompleted(false)
              return false
            }
          } else {
            this.showError('پرونده ابتدا باید کارشناسی شود..')
            if (this.sendCompleted != null) this.sendCompleted(false)
            return false
          }
        } else {
          if (
            this.selectedCommission.VoteDate != null &&
            this.selectedCommission.VoteDate != ''
          ) {
            if (this.isNotAccessSendToShahrsazi) {
              this.sendCompleted(false)
              this.hideLoading()
              this.showError('شما اجازه ارسال پرونده به شهرسازی را ندارید.')
              return false
            } else {
              if (
                this.getApplicationParam.hasOwnProperty(
                  'CheckRenderVoteInArchive'
                ) &&
                this.getApplicationParam.CheckRenderVoteInArchive
              ) {
                this.showLoading()
                this.$services.commissions
                  .checkRenderVoteReportInArchive({
                    pNidCommission: this.selectedNidCommission,
                    pDomain: 'Commission'
                  })
                  .then(({ data }) => {
                    const res = this.getResponse(data)

                    if (!res.data) {
                      this.sendCompleted(false)
                      this.hideLoading()
                      this.showError(
                        'به دلیل عدم ثبت رأی در آرشیو امکان ارسال پرونده به شهرسازی وجود ندارد'
                      )
                      return false
                    } else {
                      this.hideLoading()
                      this.showConfirm(
                        'آیا برای ارسال پرونده به شهرسازی اطمینان دارید؟'
                      )
                        .onOk(async () => {
                          this.showLoading()
                          if (
                            this.getApplicationParam.hasOwnProperty(
                              'AddToArchiveAfterSend'
                            ) &&
                            this.getApplicationParam.AddToArchiveAfterSend
                          ) {
                            this.addReportToArchive(async (a) => {
                              if (a) {
                                await this.checkIsSignature(
                                  this.selectedNidCommission,
                                  this.selectedCommission.CI_Region,
                                  this.selectedCommission.NidProc
                                )
                              }
                            })
                          } else {
                            await this.checkIsSignature(
                              this.selectedNidCommission,
                              this.selectedCommission.CI_Region,
                              this.selectedCommission.NidProc
                            )
                          }
                        })
                        .onCancel(() => {
                          this.sendCompleted(false)
                          this.hideLoading()
                        })
                    }
                  })
                  .catch((error) => {
                    console.error(error)
                    // this.serverError() // test serverError
                  })
                  .finally(() => {
                    this.hideLoading()
                  })
              } else {
                this.hideLoading()
                this.showConfirm(
                  'آیا برای ارسال پرونده به شهرسازی اطمینان دارید؟'
                )
                  .onOk(async () => {
                    if (
                      this.getApplicationParam.hasOwnProperty(
                        'AddToArchiveAfterSend'
                      ) &&
                      this.getApplicationParam.AddToArchiveAfterSend
                    ) {
                      this.addReportToArchive(async (a) => {
                        if (a) {
                          await this.checkIsSignature(
                            this.selectedNidCommission,
                            this.selectedCommission.CI_Region,
                            this.selectedCommission.NidProc
                          )
                        }
                      })
                    } else {
                      await this.checkIsSignature(
                        this.selectedNidCommission,
                        this.selectedCommission.CI_Region,
                        this.selectedCommission.NidProc
                      )
                    }
                  })
                  .onCancel(() => {
                    this.sendCompleted(false)
                    this.hideLoading()
                  })
              }
            }
          } else {
            this.sendCompleted(false)
            this.hideLoading()
            this.showError('برای پرونده رای صادر نشده.')
            return false
          }
        }
      } else {
        this.showConfirm('آیا برای ارسال گروهی اطمینان دارید؟')
          .onOk(async () => {
            if (tmpTaskSelected && tmpTaskSelected.length > 0) {
              let selectedCount = tmpTaskSelected.length
              tmpTaskSelected.forEach((itemSelected) => {
                if ((itemSelected?.CommissionDate?.length ?? 0) == 10) {
                  if (
                    itemSelected.CI_CommissionType != null &&
                    itemSelected.CI_CommissionType != 0 &&
                    itemSelected.CommissionDate != ''
                  ) {
                  } else {
                    tmpTaskSelected = tmpTaskSelected.filter(
                      (e) => e.NidCommission != itemSelected.NidCommission
                    )
                  }
                } else {
                  tmpTaskSelected = tmpTaskSelected.filter(
                    (e) => e.NidCommission != itemSelected.NidCommission
                  )
                }
              })
              if (tmpTaskSelected && tmpTaskSelected.length > 0) {
                if (selectedCount != tmpTaskSelected.length) {
                  this.showError(
                    'پرونده ارسالی ابتدا باید کارشناسی شوند ' +
                    selectedCount +
                    ' پرونده از' +
                    tmpTaskSelected.length
                  )
                }
              } else {
                if (selectedCount == 1) {
                  this.showError('پرونده ارسالی ابتدا باید کارشناسی شود ')
                } else {
                  this.showError(
                    'پرونده ارسالی ابتدا باید کارشناسی شوند ' + selectedCount
                  )
                }
              }
            }

            this.tmpGroupitems = [
              ...(tmpTaskSelected.filter(
                (f) =>
                  f.CommissionDate != null &&
                  f.CI_CommissionType != null &&
                  f.CI_CommissionType != 0 &&
                  (f.CommissionState.startsWith('Commission') == false ||
                    f.CommissionState.startsWith('RandomCommission') == true)
              ) || [])
            ]

            let tmpGroupitemsToSara = tmpTaskSelected.filter(
              (f) =>
                f.CommissionDate != null &&
                f.CI_CommissionType != null &&
                f.CI_CommissionType != 0 &&
                f.CommissionState.startsWith('Commission') == true
            )

            if (tmpGroupitemsToSara && tmpGroupitemsToSara.length > 0) {
              for (const item of tmpGroupitemsToSara) {
                // tmpGroupitemsToSara.forEach(async (item) => {
                if (
                  await this.checkIsSignature(
                    item.NidCommission,
                    item.CI_Region,
                    item.NidProc
                  )
                ) {
                  return false
                }
                // });
              }
            }
            if (this.tmpGroupitems && this.tmpGroupitems.length > 0) {
              let payload = {
                pNidCommission:
                  this.selectedCommission != null
                    ? this.selectedNidCommission
                    : this.tmpGroupitems[0].NidCommission
              }

              this.showLoading()
              await this.$services.commissions
                .getNextStateList(payload)
                .then(({ data: ArgsL }) => {
                  const getNextStateListRes = this.getResponse(ArgsL)
                  if (getNextStateListRes.success) {
                    if (
                      getNextStateListRes.data.GetNextStateListResult
                        .NextStateList != null &&
                      getNextStateListRes.data.GetNextStateListResult
                        .NextStateList.length > 1
                    ) {
                      this.$nextTick(() => {
                        this.hideLoading()
                        this.nextStateList = getNextStateListRes.data.GetNextStateListResult.NextStateList
                        this.showNextStepAction = 'sendMethodAfterCheck'
                        this.showNextStep = true
                      })
                    } else {
                      this.sendGroup({
                        PRequest: {
                          SendGroupItems: [...this.tmpGroupitems],
                          NidUser: this.getNidUser()
                        }
                      }).then(() => {
                        if (this.sendCompleted != null) {
                          this.sendCompleted(true)

                          // Common.Common.UKartabl.LoadData(0, 10000, true, "SendMethod1");
                        }
                      }).catch(() => {
                        this.hideLoading()
                      })
                    }
                  } else {
                    this.hideLoading()
                    this.handleError(getNextStateListRes)
                    if (this.sendCompleted != null) this.sendCompleted(false)
                  }
                })
                .catch((error) => {
                  console.error(error)
                  this.hideLoading()
                  // this.serverError() // test serverError
                })
                .finally(() => {
                  // this.hideLoading()
                })
            }
          })
          .onCancel(() => {
            if (this.sendCompleted != null) this.sendCompleted(false)
            this.hideLoading()
          })
      }
    },

    send (isExpertSend) {
      this.hideLoading()
      this.isExpertSend = isExpertSend
      this.showSendDescription = true
    },

    chk_BlackList (pIsSendMethod) {
      // #todo pIsSendMethod
      if (
        this.getApplicationParam.hasOwnProperty('IsCheckBalckList') &&
        this.getApplicationParam.IsCheckBalckList
      ) {
        if (
          this.clsCommission_BlankList &&
          this.clsCommission_BlankList.Commission_BlackList
        ) {
          this.isBlackList = true
          this.showMessageBalckList = true
          return Boolean(
            this.clsCommission_BlankList.Commission_BlackList.IsErrorStop
            // #note
            // result: Boolean(true || false || null)
            // Boolean(null) = false
            // JSON.parse(null) = null
          )
        } else {
          this.isBlackList = false
          return false
        }
      } else {
        this.isBlackList = false
        return false
      }
    },

    nextStephandler (txtDescription = '', selectStates, value, isExpertSend) {
      debugger
      console.log('this.showNextStepAction', this.showNextStepAction)
      let tmpNextNidTask = selectStates.filter(
        (f) => f.id === value
      ).NidTaskState || selectStates[0].NidTaskState

      if (this.showNextStepAction == 'sendMethodAfterCheck') {
        const payload = {
          PRequest: {
            SendGroupItems: [...this.tmpGroupitems],
            NidUser: this.getNidUser(),
            NidTaskState: tmpNextNidTask
          }
        }

        this.sendGroup(payload).then(({ data }) => {
          if (this.sendCompleted != null) this.sendCompleted(true)
        }).catch(() => { this.hideLoading() })
      } else if (this.showNextStepAction == 'send') {
        this.doSend(txtDescription, tmpNextNidTask, isExpertSend)
      }
    },

    doSend (pDiscription, pNextNidTask, isExpertSend) {
      this.showLoading()
      this.$services.commissions
        .sendWithRule({
          pNidCommission: this.selectedNidCommission,
          pDescription: pDiscription,
          pNidUser: this.getNidUser(),
          NidTaskState_SelectedByUser: pNextNidTask,
          IsExpertSend: isExpertSend
        })

        .then(async ({ data }) => {
          const sendWithRuleres = this.getResponse(data)
          if (sendWithRuleres.success) {
            if (this.sendCompleted != null)
            {
              try {
                this.$q.loading.show({ message: "در حال بارگذاری..." })
                await this.sendCompleted(true)
              } catch (error) {
                console.log(error)
              } finally {
                this.$q.loading.hide()
              }
            }

            // #todo
            // let tmpdoc = EsupCommon.ClsCommon.Dock.Panes.ToList().FirstOrDefault(a => a.Header.ToString() == "کارشناسي");
            // if (tmpdoc !== null)
            // {
            //     EsupCommon.ClsCommon.MainGroup.RemovePane(tmpdoc);
            // }
            // var tmpdocVote = EsupCommon.ClsCommon.Dock.Panes.ToList().FirstOrDefault(a => a.Header.ToString() == "صدور راي");
            // if (tmpdocVote !== null)
            // {
            //     EsupCommon.ClsCommon.MainGroup.RemovePane(tmpdocVote);
            // }
          } else {
            if (this.sendCompleted != null) this.sendCompleted(false)
            this.handleError(sendWithRuleres)
          }
        })
        .catch((ex) => {
          console.error(ex)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    onCloseForm () { // طبق خواسته اصفهان و بررسی بک فقط کارشناسی بسته شود
      let formName = this.$store.getters['formLauncher/activeForm']
      if (formName === "Ukarshenasi") {
        this.removeForm('Ukarshenasi')
      }
    },
    sendGroup (payload) {
      return new Promise(async (resolve, reject) => {
        if (!payload) reject(false)

        this.showLoading()
        await this.$services.commissions
          .sendGroup(payload)
          .then(({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {
              resolve(res)
            } else {
              this.handleError(res)
              reject(false)
            }
          })
          .catch((error) => {
            this.showError(error.message)
            reject(false)
          })
          .finally(() => {
            // this.hideLoading()
          })
      })
    },

    async checkIsSignature (pNidCommission, CI_Region, pNidProc) {
      this.showLoading()
      const payload = {
        pRequest: {
          NIDCommission: pNidCommission,
          DomainName: this.getArchiveDomainName(CI_Region),
          NidUser: this.getNidUser(),
          UserName: this.getUserDisplayName()
        }
      }

      await this.$services.commissions
        .checkSendToSara(payload)
        .then(({ data }) => {
          const checkSendToSaraRes = this.getResponse(data)
          if (
            checkSendToSaraRes.success &&
            checkSendToSaraRes.errors.every((a) => a.action == 1)
          ) {
            if (
              this.getApplicationParam.hasOwnProperty('IsConnectToSara8') &&
              this.getApplicationParam.IsConnectToSara8
            ) {
              if (
                checkSendToSaraRes.data.CheckSendToSaraResult.IsSara10 == false
              ) {
                this.sendToSara8(pNidProc, (args) => {
                  if (args) {
                    this.backToSara(pNidCommission)
                  } else if (this.sendCompleted != null) {
                    this.sendCompleted(false)
                  }

                  return args
                })
              } else {
                this.showSuccess('پرونده با موفقیت به شهرسازی ارسال شد.')
                this.hideLoading()
                this.sendCompleted(true)

                // # todo
                // Common.Common.UKartabl.Grd_Kartabl.IsBusy = false;
                // try
                // {
                //     var tmpdoc = EsupCommon.ClsCommon.Dock.Panes.ToList().FirstOrDefault(a => a.Header.ToString() == "کارشناسي");
                //     if (tmpdoc !== null)
                //     {
                //         EsupCommon.ClsCommon.MainGroup.RemovePane(tmpdoc);
                //     }
                //     var tmpdocVote = EsupCommon.ClsCommon.Dock.Panes.ToList().FirstOrDefault(a => a.Header.ToString() == "صدور راي");
                //     if (tmpdocVote !== null)
                //     {
                //         EsupCommon.ClsCommon.MainGroup.RemovePane(tmpdocVote);
                //     }
                // }
                // catch (Exception)
                // {
                // }
              }
            } else {
              this.backToSara(pNidCommission)
            }

            // if (SArgs.Result.ErrorResult !== null && SArgs.Result.ErrorResult.BizErrors !== null &&
            //    SArgs.Result.ErrorResult.BizErrors.Count > 0)
            //    SafaException.ShowBizError(SArgs.Result.ErrorResult.BizErrors);
          } else {
            this.sendCompleted(false)
            this.handleError(checkSendToSaraRes)
            return false
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
          this.sendCompleted(false)
          return false
        })
    },

    backToSara (pNidCommission) {
      let tmpUserGroup =
        this.currentUser?.UserGroups?.map(({ GroupGuid, GroupName }) => {
          return {
            GroupGuid,
            GroupName
          }
        }) || []

      const payload = {
        pNidProc: this.selectedNidCommission,
        pUser: {
          ...pick(
            this.currentUser,
            'JobLocationGuid',
            'JobLocationName',
            'UserGuid',
            'UserName',
            'UserGroups'
          ),
          UserGroups: tmpUserGroup
        },

        pDtoWorkflowData: {}
      }

      this.$services.commissions
        .sendKartabl(payload)
        .then(({ data: args }) => {
          const sendKartablRes = this.getResponse(args)
          if (sendKartablRes.success) {
            // از اجرای متد اعتبارسنجی صرفنظر کند و ادامه دهد
            if (sendKartablRes.data.SendKartablResult.FormulaErrorCode == 1) {
              this.doBackToSara('', pNidCommission)
            } else if (
              sendKartablRes.data.SendKartablResult.ErrorResult.BizErrors?.every(
                (a) => a.ErrorAction != 0
              )
            ) {
              this.doBackToSara(
                sendKartablRes.data.SendKartablResult.SendKartabl_Value,
                pNidCommission
              )
            }
          } else {
            this.handleError(sendKartablRes)
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    doBackToSara (pSendKartablValue, pNidCommission) {
      const payload = {
        PNidCommission: pNidCommission,
        NidUser: this.getNidUser()
      }

      this.$services.commissionsSrv
        .backToSara(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success == false) {
            // Dialog.ClsDialog.ShowMessage(Dialog.ClsDialog.ENMessage.Error);

            if (this.sendCompleted != null) {
              if (pSendKartablValue) {
                await this.$srvWorkflow
                  .getAllTaskByNidProc({
                    NidProc: this.selectedNidCommission
                  })
                  .then(async ({ data }) => {
                    const getProcessInfoRes = this.getResponse(data)

                    let nidTask =
                      getProcessInfoRes.data?.GetProcessInfoResult?.Task?.find(
                        (i) => i.NidSort
                      )?.NidTask || '00000000-0000-0000-0000-000000000000'

                    let q =
                      getProcessInfoRes.data.GetProcessInfoResult.ExtendedProp.PropList.find(
                        (a) => a.PropName == 'SendKartabl_Value_Com100'
                      ) || null
                    if (q != null) {
                      getProcessInfoRes.data.GetProcessInfoResult.ExtendedProp.PropList.find(
                        (c) => c.PropName == 'SendKartabl_Value_Com100'
                      ).PropValue = pSendKartablValue
                    } else {
                      getProcessInfoRes.data.GetProcessInfoResult.ExtendedProp.PropList.push(
                        {
                          PropName: 'SendKartabl_Value_Com100',
                          PropTitle: 'مقدار ارسال به کارتابل کمیسیون 100',
                          PropValue: pSendKartablValue,
                          PropType: 'Hidden'
                        }
                      )
                    }

                    // ChangeTaskExtendedProp نیاز به سرویس جایگزین دارد
                  })
                  .catch((error) => {
                    console.error(error, 'error')
                  })
              }

              this.sendToBackEsup(this.sendCompleted)
            }
          } else if (res.success) {
            this.showSuccess('پرونده با موفقیت به شهرسازی ارسال شد.')

            await this.$srvWorkflow
              .getAllTaskByNidProc({
                NidProc: this.selectedNidCommission
              })
              .then(async ({ data }) => {
                const getProcessInfoRes = this.getResponse(data)

                if (getProcessInfoRes.success) {
                  if (this.sendCompleted != null) this.sendCompleted(true)
                  let nidTask =
                    getProcessInfoRes.data?.GetProcessInfoResult?.Task?.find(
                      (i) => i.NidSort
                    )?.NidTask || '00000000-0000-0000-0000-000000000000'

                  // نیاز به سرویس جایگزین دارد
                  // await this.$srvWorkflow
                  //   .updateTask({
                  //     NidTask: nidTask,
                  //     TaskDesc: "ارسال از کمیسیون به شهرسازی",
                  //   })
                  //   .then(async ({ data }) => {
                  //     const updateTaskRes = this.getResponse(data);

                  //     if (updateTaskRes.success) {
                  //     } else {
                  //       this.handleError(res);
                  //     }
                  //   })
                  //   .catch((error) => {
                  //     console.error(error, "error");
                  //   });
                } else {
                  this.handleError(res)
                }
              })
              .catch((error) => {
                console.error(error, 'error')
              })
          }
        })
        .catch((error) => {
          console.error(error, 'error')
          this.sendCompleted(false)
        })
    },

    async sendToBackEsup (completed) {
      const payload = {
        NidCommission: this.selectedNidCommission,
        NidProc: this.selectedCommission.NidProc,
        DomainName: 'Commission',
        UserName: this.getUserDisplayName(),
        NidUser: this.getNidUser(),
        ProcStatus: 0
      }

      await this.$srvWorkflow
        .setProcStatus(payload, {
          config: {
            District: this.selectedDistrict
          }
        })
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess('پرونده با موفقیت به شهرسازی ارسال شد.')
            completed(true)
            this.onCloseForm()
          } else {
            this.handleError(res)
            completed(false)
          }
        })

        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async sendToSara8 (pNidProc, completed) {
      const payload = {
        NidCommission: this.selectedNidCommission,
        NidProc: pNidProc,
        DomainName: 'Commission',
        UserName: this.getUserDisplayName(),
        NidUser: this.getNidUser(),
        ProcStatus: 0
      }

      await this.$srvWorkflow
        .setProcStatus(payload, {
          config: {
            District: this.selectedDistrict
          }
        })
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            completed(true)
          } else {
            completed(false)
          }
        })

        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handleError (response) {
      this.showError(
        response.errors.reduce(
          (prev, error) => prev + `<li>${error.text}</li>`,
          ''
        )
      )
    },

    addReportToArchive (args) {
      const payload = {
        PRequest: {
          NIDCommission: this.selectedNidCommission
        }
      }
      this.showLoading()
      this.$services.commissions
        .getAllCommissionDetails(payload)
        .then(async ({ data }) => {
          const getAllCommissionDetailsResult = this.getResponse(data)
          if (getAllCommissionDetailsResult.success) {
            // var tmpParam = new Dictionary<string, string>();
            // tmpParam.Add("NidCommission", string.Format("{0}", Common.Common.CurrentKartabl.NidCommission));
            let tmpParam = {
              KeyValueOfstringstring: {
                Key: 'NidCommission',
                Value: this.selectedNidCommission
              }
            }

            let tmpArchiveDomain =
              getAllCommissionDetailsResult.data.GetAllCommissionDetailsResult.Commission_Archive.find(
                (f) => f.CI_ArchiveGroup == 4
              )
            if (tmpArchiveDomain == null) {
              tmpArchiveDomain =
                getAllCommissionDetailsResult.data.GetAllCommissionDetailsResult.Commission_Archive.find(
                  (e) => e
                )
            }

            const payload = {
              pRequest: {
                parameters: tmpParam,
                ReportName: this.getReportPath(
                  getAllCommissionDetailsResult.data
                    .GetAllCommissionDetailsResult.CommissionInfo.CI_PrintType
                ),
                BizCode: tmpArchiveDomain.RootSubject,
                NidCommission: this.selectedNidCommission,
                DomainName: tmpArchiveDomain.Domain,
                pUserName: this.getUserDisplayName(),
                pUserId: this.getNidUser()
              }
            }

            this.showLoading()
            const { data } = await this.$services.commissions.addToArchive(
              payload
            )
            const res = this.getResponse(data)
            if (res.success) {
              args(res.data)
            }
          }
        })

        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
    },

    getReportPath (pCI_PrintType) {
      switch (pCI_PrintType) {
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

    getArchiveDomainName (district)
    {
      try {
        if (this.getApplicationParam.hasOwnProperty('ArchiveDomainNameBasedOnDistrict') && this.getApplicationParam.ArchiveDomainNameBasedOnDistrict)
        { return district.toString() }
        return "Commission"
      } catch (error) {
        console.log(error)
        return "Commission"
      }
    },
    reportToArchive () {
      // #todo
      // try
      // {
      //     Common.Common.MyEsupLog("ReportToArchive");
      //     var srv = ClsProxyHelper.GetCommissionService();
      //     var tmpParam = new Dictionary<string, string>();
      //     Parameters.ToList().ForEach(i =>
      //     {
      //         if (i.Key.ToLower().Contains("isarchive"))
      //             tmpParam.Add(i.Key, "1");
      //         else
      //             tmpParam.Add(i.Key, i.Value);
      //     });
      //     if (!tmpParam.ContainsKey("NidUser"))
      //         tmpParam.Add("NidUser", ApplicationCommon.ClsCommon.UserInfo.GUID.ToString());
      //     srv.AddToArchiveCompleted += (sa, ea) =>
      //     {
      //         srv.CloseAsync();
      //         if (ea.Result == true)
      //         {
      //             Common.Common.MyEsupLog("ReportToArchive-Complete1");
      //             if (!ReferenceEquals(AddArchive, null))
      //                 AddArchive(1);
      //             TxtMessageArchive.Foreground = new SolidColorBrush(Colors.Green);
      //             TxtMessageArchive.Text = "رای باموفقیت در آرشیو درج گردید";
      //         }
      //         else
      //         {
      //             Common.Common.MyEsupLog("ReportToArchive-Complete2");
      //             TxtMessageArchive.Foreground = new SolidColorBrush(Colors.Red);
      //             TxtMessageArchive.Text = "اشکال دردرج رای در آرشیو";
      //         }
      //     };
      //     var tmpArchiveDomain = context.Commission_Archive.FirstOrDefault(f => f.CI_ArchiveGroup == 4);
      //     if (tmpArchiveDomain == null) tmpArchiveDomain = context.Commission_Archive.FirstOrDefault();
      //     if (tmpArchiveDomain !== null)
      //     {
      //         srv.AddToArchiveAsync(tmpParam,
      //             SetReportName(),
      //             tmpArchiveDomain.RootSubject,
      //             context.CommissionInfo.NidCommission,
      //             tmpArchiveDomain.Domain,
      //             ApplicationCommon.ClsCommon.GetFullUserName(),
      //             ApplicationCommon.ClsCommon.UserInfo.GUID.ToString());
      //         AddLayeheToArchive();
      //     }
      //     //context.CommissionInfo.NidCommission, Common.Common.GetArchiveDomainName(context.CommissionInfo.District));
      // }
      // catch (Exception ex)
      // {
      //     Common.Common.MyEsupLog("UCommissionInfo-ReportToArchive" + Environment.NewLine + ex.Message + Environment.NewLine + ex.ToString());
      //     // this.HideProgress();
      //     SafaException.ShowMessage("UCommissionInfo-ReportToArchive" + Environment.NewLine + ex.Message + Environment.NewLine + ex.ToString(), "");
      // }
    },

    async checkAccessSendToShahrsazi () {
      // # not completed yet...
      const userAccesstoResource =
        (await this.$stSecurity.dispatch('security/fetchPermissions', {
          parent: '5ae38ff1-fbb2-4e3a-bc83-b224b1a600dc',
          type: ''
        })) || []

      console.log('userAccesstoResource', userAccesstoResource)
      let tmpUserAccesstoResource = userAccesstoResource.filter(
        (f) => f.IsGranted
      )

      if (tmpUserAccesstoResource) {
        tmpUserAccesstoResource.forEach((permission) => {
          if (permission == '615eac77-cc29-4980-b2bb-34faa448202a') {
            this.isNotAccessSendToShahrsazi = true
          }
          if (permission == 'E1ED5DAF-E0AE-4277-B2C6-8B60C596F845'.ToLower()) {
            this.isCollapsedSendAndBackButton = true
          }
        })
      }
    },
    updateArchiveBizCode (bizCode, domain) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    }
  }

  // # not completed yet...
  // async mounted() {
  //   await this.checkAccessSendToShahrsazi();
  // },
}
