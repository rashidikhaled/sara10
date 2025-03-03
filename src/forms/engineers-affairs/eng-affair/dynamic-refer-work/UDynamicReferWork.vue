<template>
  <form-wrapper
    :title="title"
    vertical
  >
  <safa-status :result="fetchResult" />
  <safa-status :result="requestResults" />
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
    >
      <template v-slot:before>
        <safa-datatable
          title="پارامتر"
          class="col-md-12"
          :m="mode"
          @row-click="rowClick"
          v-model="assignTaskDynamicParameters"
          ref="grid2"
          helper="referParameter"
        /> <!-- @itemchange="itemChange" -->
      </template>
      <template v-slot:after>
        <safa-datatable
          title="ارجاعات"
          class="col-md-12"
          :m="mode"
          @row-click="rowClick"
          ref="grid2"
          helper="referOfficesInfo"
        /> <!-- @itemchange="itemChange" -->
        <!-- v-model="getData" -->
      </template>
    </safa-splitter>
    <template v-slot:footer>
      <form-actions :showEditButton="false">
        <template v-slot:after>
          <!-- <btn-new
              @click="newEngInformation"
            />
            <btn-default
              label="چاپ اطلاعات"
              class="btn-default"
            /> -->
          <btn-default
            label="محاسبه"
            class="btn-default"
            @click="calculateAssignTaskDynamicList"
          />
          <btn-default
            label="ارجاع"
            class="btn-default"
            @click="dynamicReferWork"
          /> <!-- کاربرد این باتن در سرا هشت مشخص نیست و صرفا جهت نمایش درج شده است  -->
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import messageMixin from 'src/mixins/messageMixin'

export default {
  mixins: [baseFormMixin, messageMixin],
  data: function () {
    return {
      name: 'UDynamicReferWork',
      formKey: '502a2f77-dbb4-4731-ba15-2f19e2022539',
      title: 'ارجاع کار پویا',
      main: true,
      assignTaskDynamicParameters: [
        // {
        //   Caption: "عنوان",
        //   Status: "وضعیت",
        //   Value: "مقدار",
        // },
      ],
      horizontalSplitter: 50,
      engCode: '',
      engType: {},
      saveResult: null,
      studyFieldList: [],
      fetchResult: null,
      fullname: '',
      OrginalResults: [],
      CiOffice: null,
      CodeInfo: null,
      OfficeName: null,
      RegisterDate: null,
      JobAgreementType: null,
      object: null,
      officeTypeResults: [],
      jobAgreementTypeResults: [],
      abilityResults: [],
      quotaTypeResults: [],
      baseResults: [],
      capacityOfficeResults: [],
      activeTab: 'showPersonalInfoTab',
      showSearchEngineer: false,
      isElementDisabled: true,
      pRequest: {
        CI_RequestType: '0',
        CI_Years: '0',
        EngineerCode: '',
        NidCheckerGroup: '00000000-0000-0000-0000-000000000000',
        NidEng: '00000000-0000-0000-0000-000000000000',
        NidFil: '00000000-0000-0000-0000-000000000000',
        NidWorkitem: '0',
        CI_CancelType: '0',
        CI_ExecFloor: '0',
        CI_ExecLevel: '0',
        CI_SazeType: '0',
        CI_Year: '0',
        Floor: '0',
        Height: '0',
        Infrastructure: '0',
        IsConfirm: 'false',
        IsRefreshOnly: 'false',
        IsSendToSaraRequest: 'false',
        NIdBuildingGroup: '00000000-0000-0000-0000-000000000000',
        NIdDetail: '00000000-0000-0000-0000-000000000000',
        NIdRealPerson: '00000000-0000-0000-0000-000000000000',
        NidBlackList: '00000000-0000-0000-0000-000000000000',
        NidProc: '00000000-0000-0000-0000-000000000000',
        NidRefer: '00000000-0000-0000-0000-000000000000',
        NidTask: '00000000-0000-0000-0000-000000000000',
        NidWorkFlowDeff: '00000000-0000-0000-0000-000000000000',
        OtherFileType: '0',
        Sara_WorkflowID: '0',
        SecretariatNo: '0',
        Skip: '0',
        StudyFiled: '0',
        SysCI_RequestStatus: '0',
        Take: '0',
        UserGUID: '00000000-0000-0000-0000-000000000000'
      },
      requestResults: null,
      results: {
        GetEng_InfoWithEngineerCodeResult: {
          AllStudyFields: [],
          ClsEngineer: {
            ClsEngineerCapacity: {
              Eng_Info: {},
              ErrorResult: {}
            },
            EngOrgan_OfficeInfo: {},
            Eng_Card: [],
            Eng_Competence: [],
            Eng_Holidays: [],
            Eng_Info: {},
            Eng_JobAgreement: [],
            Eng_OrganOffCity: [],
            Eng_OtherData: [],
            Eng_OtherData_Temp: [],
            Eng_Picture: {},
            Eng_Picture_Change: [],
            ErrorResult: {}
          },
          EngineerLastOffice: {},
          ErrorResult: {},
          Settings: {}
        }
      },
      memberCode: '',
      isChangeResult: null,
      countOfAbility: [],
      selectedRow: null
    }
  },
  mounted () {
    this.loadData()
    // this.getADPStudyFieldRel();
    // this.getNewTask()
  },
  methods: {
    // fetching studing field
    getADPStudyFieldRel () {
      this.showLoading()
      let payLoad = {}

      this.$services.engineers
        .GetADPStudyFieldRel(payLoad)
        .then(({ data }) => {
          this.fetchResult = this.getResponse(data)
          if (this.fetchResult.success) {
            this.studyFieldList =
              this.fetchResult.data.GetADP_StudyFieldRelResult.ADP_StudyFieldRel.map(
                (x) => ({
                  ID: x.StudyField,
                  Title: x.StudyFieldRel
                })
              ).sort(({ Title: xID }, { Title: yID }) => {
                if (xID < yID) {
                  return -1
                }
                if (xID > yID) {
                  return 1
                }
                return 0
              })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    calculateAssignTaskDynamicList () {
      if (this.selectedRequest) {
        this.showLoading()
        let data = { pNidFil: '00000000-0000-0000-0000-000000000000' }
        this.$services.engineers
          .calculateAssignTaskDynamicList(data)
          .then(({ data }) => {
            this.requestResults = this.getResponse(data)
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showError('از کارتابل موردی را انتخاب کنید')
      }
    },
    // loading data
    loadData (searchValue) {
      console.log(this.selectedRequest, 'this.selectedRequest')
      if (!this.selectedRequest) {
        this.showConfirm('لطفا ابتدا یک ردیف از کارتابل انتخاب نمایید')
      } else {
        this.showLoading()
      }

      let data = { pNidProc: this.selectedRequest.NidProc }
      this.$services.engineers
        .loadAssignTaskDynamicForm(data)
        .then(({ data }) => {
          this.requestResults = this.getResponse(data)
          // this.assignTaskDynamicParameters = this.requestResults.data.LoadAssignTaskDynamicFormResult.AssignTaskDynamicParameters
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
      // } else {
      //   this.showError("از کارتابل موردی را انتخاب کنید");
    },

    //  getNewTask data //
    // getNewTask () {
    //   if (this.selectedRequest) {
    //     this.showLoading()
    //     let data = { PAssingUser: this.getNidUser(), PFrom: 0, PStrWhere: '', PtaskState: 0, PTo: 200 }
    //     this.$services.task
    //       .getNewTask(data)
    //       .then(({ data }) => {
    //         this.requestResults = this.getResponse(data)
    //       })
    //       .catch((response) => {
    //         this.serverError()
    //       })
    //       .finally(() => {
    //         this.hideLoading()
    //       })
    //   } else {
    //     this.showError('از کارتابل موردی را انتخاب کنید')
    //   }
    // },

    // save engineer info
    saveData () {
      let list = this.results.GetEng_InfoWithEngineerCodeResult.ClsEngineer

      if (list.Eng_Info.ADPstudyFieldRel === '') {
        this.showError('لطفا رشته تحصیلی را وارد نمایید')
      }

      if (
        list.Eng_Info.NationalCode !== null &&
        list.Eng_Info.NationalCode.Length > 10
      ) {
        this.showError('کد ملی نباید بیشتر از 10 رقم باشد')
      }

      // TODO this section should uncomment and test after implementing uploader pic component

      // if (
      //   list
      //     .Eng_Picture === null
      // ) {
      //   // eslint-disable-next-line no-undef
      //   if (window.getConfigValue('baseUrls').CiCity === '2') {
      //     this.showError('لطفا عکس،نمونه امضاء و مهر وارد شود')
      //   }
      // }

      // const groupObj = this.$_.groupBy(list.Eng_Competence, 'CI_Ability')
      // Object.keys(groupObj).forEach(key => {
      //   this.countOfAbility.push(groupObj[key].length)
      // })

      // if (this.countOfAbility.some((x) => x > 2)) {
      //   this.showError('تعداد صلاحیت های فعال نباید بیشتر از 2 باشد')
      // }

      // // eslint-disable-next-line no-undef
      // if (window.getConfigValue('baseUrls').CiCity === '2') {
      //   if (
      //     list
      //       .Eng_Picture !== null &&
      //     (list
      //       .Eng_Picture.PicMohr === null ||
      //       list
      //         .Eng_Picture.PicSignature === null)
      //   ) {
      //     this.showError('لطفا نمونه امضاء و مهر وارد شود')
      //     // return false
      //   }
      // } else {
      //   if (
      //     list
      //       .Eng_Picture !== null &&
      //     (list
      //       .Eng_Picture.Picture === null ||
      //       list
      //         .Eng_Picture.PicMohr === null ||
      //       list
      //         .Eng_Picture.PicSignature === null)
      //   ) {
      //     this.showError('لطفا عکس،نمونه امضاء و مهر وارد شود')
      //     // return false
      //   }
      // }

      if (
        !this.engType === 1 ||
        list.Eng_Info.IdentityCodethis === '' ||
        list.Eng_Info.IdentityCodethis === null
      ) {
        list.Eng_Info.IdentityCode = this.pRequest.EngineerCode
      }
      if (
        list.Eng_Info.IdentityCodethis === '' ||
        list.Eng_Info.IdentityCodethis === null
      ) {
        list.Eng_Info.IdentityCode = ''
      }

      list.Eng_Info.MunicipalityCode = list.Eng_Info.MunicipalityCode || '0'

      list.SecurityUserName = this.getUserDisplayName()
      list.SecurityPass = 'z0cFVN9XyZKGVcDa3zU60A=='
      list.SecurityRequestID = 'c9c9582d-65e6-48f9-9d07-24c248bf5743'
      list.UserName = this.getUserDisplayName()
      list.NidUser = this.getNidUser()

      // list.Eng_Picture_Change = null
      if (list.Eng_Picture.PicSignature === null) {
        list.Eng_Picture.PicSignature = []
      }
      if (list.Eng_Picture.PicVoucher === null) {
        list.Eng_Picture.PicVoucher = []
      }
      if (list.Eng_Picture.Picture === null) {
        list.Eng_Picture.Picture = []
      }

      if (list.Eng_Picture.PicShenasname === null) {
        list.Eng_Picture.PicShenasname = []
      }
      if (list.Eng_Picture.PicNationalCode === null) {
        list.Eng_Picture.PicNationalCode = []
      }
      if (list.Eng_Picture.PicMohrWith === null) {
        list.Eng_Picture.PicMohrWith = []
      }
      if (list.Eng_Picture.PicMohr2 === null) {
        list.Eng_Picture.PicMohr2 = []
      }
      if (list.Eng_Picture.PicMohr === null) {
        list.Eng_Picture.PicMohr = []
      }
      if (list.Eng_Picture.PicJobAgreementBack === null) {
        list.Eng_Picture.PicJobAgreementBack = []
      }
      if (list.Eng_Picture.PicJobAgreement === null) {
        list.Eng_Picture.PicJobAgreement = []
      }
      if (list.Eng_Picture.Picture === null) {
        list.Eng_Picture.Picture = []
      }
      list.Eng_Picture.PicMohr2 = list.Eng_Picture.PicMohr

      list.Eng_Picture_Change.forEach((x) => {
        if (x.PicShenasname === null) {
          x.PicShenasname = []
        }
        if (x.PicNationalCode === null) {
          x.PicNationalCode = []
        }
        if (x.PicMohrWith === null) {
          x.PicMohrWith = []
        }
        if (x.PicMohr2 === null) {
          x.PicMohr2 = []
        }
        if (x.PicVoucher === null) {
          x.PicVoucher = []
        }
        if (x.PicJobAgreement === null) {
          x.PicJobAgreement = []
        }
        if (x.PicJobAgreementBack === null) {
          x.PicJobAgreementBack = []
        }
        if (x.Picture === null) {
          x.Picture = []
        }
        if (x.PicSignature === null) {
          x.PicSignature = []
        }
        if (x.PicMohr === null) {
          x.PicMohr = []
        }
      })
      this.results.GetEng_InfoWithEngineerCodeResult.EngineerPicture = []

      if (
        this.results.GetEng_InfoWithEngineerCodeResult.ClsEngineer.Eng_Info
          .EngFamily === '' ||
        this.results.GetEng_InfoWithEngineerCodeResult.ClsEngineer.Eng_Info
          .EngFamily === null
      ) {
        this.showError('لطفا نام خانوادگی کاربر را وارد کنید.')
      } else {
        this.showLoading()
        let payLoad = {
          pRequest: {
            ClsEngineer:
            this.results.GetEng_InfoWithEngineerCodeResult.ClsEngineer
          }
        }
        this.$services.engineers
          .SaveEngInfo(payLoad)
          .then(({ data }) => {
            this.saveResult = this.getResponse(data)

            if (this.saveResult.success) {
              this.loadData()
              this.isEditable = false
              this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
            }
          })
          .catch((response) => {
            // console.log('save error ......', response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    ChangePersonalInfoTabFormData (formData) {
      // this.ENG_INFO_PREQUEST.pRequest.ClsEngineer.Eng_Info = formData
      // // console.log('ChangePersonalInfoTabFormData', formData)
    },
    closeSearchEngineerModal (e) {
      this.showSearchEngineer = e
    },
    // handle create new engineer info
    newEngInformation () {
      this.results = {
        GetEng_InfoWithEngineerCodeResult: {
          AllStudyFields: [],
          ClsEngineer: {
            ClsEngineerCapacity: {
              Eng_Info: {},
              ErrorResult: {}
            },
            EngOrgan_OfficeInfo: {},
            Eng_Card: [],
            Eng_Competence: [],
            Eng_Holidays: [],
            Eng_Info: {},
            Eng_JobAgreement: [],
            Eng_OrganOffCity: [],
            Eng_OtherData: [],
            Eng_OtherData_Temp: [],
            Eng_Picture: {},
            Eng_Picture_Change: [],
            ErrorResult: {}
          },
          EngineerLastOffice: {},
          ErrorResult: {},
          Settings: {}
        }
      }
      this.isEditable = true
      this.pRequest.EngineerCode = ''
    },
    rowClick (row) {
      this.selectedRow = row
    },
    dynamicReferWork () {
      if (this.selectedRow !== null) {
      } else {
        this.showError('لطفا ابتدا یک مورد از ارجاعات را انتخاب کنید.')
      }
    }
  }
}
// components: {
// UEngineerPersonalInfo,
// ShowModal,
// SearchEngineer,
// UJobAndQualification,
// UStudyFieldAndOther,
// UContactDetails,
// UScanPictures,
// UScanPictureChanges
// Search,
// formActions
//   },
//   computed: {},
// };
</script>
