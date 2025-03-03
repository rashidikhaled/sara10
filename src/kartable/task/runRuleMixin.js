import { sendByNidTask, createTask, closeSimpleTask } from '../services/task'

export default {
  data () {
    return {
      questionAnswer: null,
      disableAcceptAndSend: false,
      showCreateTask: false,
      createTaskOptions: null,
      showChooseAnotherTask: false
      // loading: false
    }
  },
  methods: {
    showQuestion (response) {
      this.$q.dialog({
        message: `<div class="question-title">${response.Q}</div>`,
        html: true,
        options: {
          type: 'radio',
          model: this.questionAnswer,
          items: response.A.map(x => ({ value: x.Id, label: x.C })),
          isValid: val => val !== null
        },
        ok: {
          color: 'primary',
          label: 'ارسال'
        },
        cancel: true,
        persistent: true
      }).onOk(answer => {
        console.log('>>>> OK, received', answer)
        this.questionAnswer = answer
        this.acceptAndSend()
      }).onCancel(() => {
        this.questionAnswer = 0
        console.log('>>>> Cancel')
      }).onDismiss(() => {
        this.questionAnswer = 0
        console.log('I am triggered on both OK and Cancel')
      })
    },
    acceptAndSend () {
      debugger// send default and send when answer is selected by user
      /// service
      this.loading = true
      this.$q.loading.show()
      sendByNidTask({
        NidTask: this.selectedNidTask,
        NidAnswer: parseInt(this.questionAnswer || 0),
        FullUserName: this.getUserDisplayName()
      }).then(({ data }) => {
        if (data.success) {
          this.checkRunRuleResponse(data.data)
          this.questionAnswer = null
        } else {
          this.handleMsg(data)
        }
        const blRes = this.blacklistState
        if (blRes.exists === true || blRes.stop === true) {
          setTimeout(() => {
            if (blRes.exists && blRes.errors.length > 0) {
              let htmlMsg = ''
              blRes.errors.forEach(errors => {
                htmlMsg += `<li>${errors.EnterComments}</li>`
              })
              debugger
              this.showSuccess(`<ul>${htmlMsg}</ul>`, {
                title: `<div class="text-body2 text-bold">کد مورد نظر به دلایل زیر در لیست سیاه قرار دارد:</div>`,
                message: `<ul>${htmlMsg}</ul>`,
                html: true,
                persistent: true
              })
            }
          }, 1000)
        }
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        this.loading = false
        this.$q.loading.hide()
      })
    },
    doneSimpleTask () {
      closeSimpleTask({
        NidTask: this.selectedNidTask
      }).then(({ data }) => {
        this.handleMsg(data)
        if (data.success) {
          this.redirectToKartable()
        }
      }).catch(err => {
        console.error(err)
      })
    },
    createTask (selectedUserGroup) { // send when ruleType is AssignTask
      // console.log(this.currentUser)
      this.checkBlacklist().then(() => {
        const blacklistResult = this.blacklistState
        const createTaskFunc = () => {
          createTask({
            ...this.createTaskOptions,
            AssingTo: selectedUserGroup.NidUserGroup,
            AssingToUserName: selectedUserGroup.UserGroupTitle,
            EumAssingType: selectedUserGroup.UserGroupType,
            NidUser: this.$stSecurity.getters['authorize/userId'],
            UserName: this.$stSecurity.getters['authorize/fullname']
            // UserGroups: [{ 'NidTaskTypeUserGroup': '1', 'NidTaskType': '1CA53940-BB29-4880-AF22-F4F5C53EA844', 'UserGroupTitle': 'حسن علی منضور', 'UserGroupType': 'User', 'NidUserGroup': '37e5f7ef-4d07-4715-89fc-2b63b6019750' }, { 'NidTaskTypeUserGroup': '2', 'NidTaskType': '1CA53940-BB29-4880-AF22-F4F5C53EA844', 'UserGroupTitle': 'علی اکبری', 'UserGroupType': 'User', 'NidUserGroup': '37e5f7ef-4d07-4715-89fc-2b63b6019750' }, { 'NidTaskTypeUserGroup': '3', 'NidTaskType': '1CA53940-BB29-4880-AF22-F4F5C53EA844', 'UserGroupTitle': 'پشتیبانی ستاد', 'UserGroupType': 'Group', 'NidUserGroup': '37e5f7ef-4d07-4715-89fc-2b63b6019750' }],
          }).then(({ data }) => {
            this.handleMsg(data)
            if (data.success) {
              // this.redirectToKartable()
              this.$root.$emit('setCommand', 'form')
              this.$store.dispatch('formLauncher/removeForm', 'task')
              this.$store.dispatch('formLauncher/setForm', {
                formKey: 'system',
                formName: 'kartable',
                title: 'کارتابل'
              })
              this.$root.$emit('refresh:kartable')
            }
          })
        }
        if (blacklistResult.exists && blacklistResult.stop) {

        } else if (blacklistResult.exists && blacklistResult.errors.length > 0) {
          let htmlMsg = ''
          blacklistResult.errors.forEach(error => {
            htmlMsg += `<li>${error.EnterComments}</li>`
          })
          // string msg = "کد مورد نظر در لیست سیاه قرار دارد." + Environment.NewLine + string.Format("علت ورود به لیست سیاه : {0}", e.Result.InBlackList.First().EnterComments);
          // pMessages += string.Format("کد مورد نظر در {0} به دلیل {1} ({2}) در وضعیت هشدار می باشد.", tmpSys, tmpCause, item.EnterComments);
          this.showSuccess(`<ul>${htmlMsg}</ul>`, {
            title: `<div class="text-body2 text-bold">کد مورد نظر به دلایل زیر در لیست سیاه قرار دارد:</div>`,
            // message: `<ul>${htmlMsg}</ul>`,
            html: true,
            persistent: true,
            ok: {
              label: 'تایید و ادامه',
              outline: false
            },
            cancel: {
              label: 'انصراف از ادامه',
              outline: true
            }
          }).onOk(() => {
            createTaskFunc()
          })
        } else {
          createTaskFunc()
        }
      })
    },
    checkRunRuleResponse (response) {
      const ruleType = response.RuleType
      if (ruleType === 'AskQuestion') {
        this.showQuestion(response.data)
      } else if (ruleType === 'AssignTask') {
        if (!response.data || response.data.length === 0) {
          this.handleMsg(response, 'انجام عملیات مقدور نمی باشد.')
        } else {
          debugger
          this.showCreateTask = true
          this.createTaskOptions = response.data[0]
        }
      } else {
        this.handleMsg(response)
        // this.showSuccess(response.msg) // 'مرحله ای برای ارسال یافت نشد.'
        // this.disableAcceptAndSend = true
        this.createTaskOptions = null
        this.showCreateTask = false
      }
    }
  }
}
