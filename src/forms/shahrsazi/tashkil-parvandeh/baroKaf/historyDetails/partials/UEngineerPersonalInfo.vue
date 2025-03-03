<template>
  <section class="UEngineerPersonalInfo">
    <section padding>
      <h1 class="form-title text-h6 q-mb-lg"><span>مشخصات فردی</span></h1>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6 col-md-4">
              <safa-combo
                ciName="CI_EngineerType"
                domainName="engineer"
                :m="mode"
                input-debounce="0"
                label="نوع"
                @input="setIdOfTypeToModel"
                v-model="results.pRequest.ClsEngineer.Eng_Info.CI_EngineerType"
                cdcName="CI_EngineerType"
              ></safa-combo>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-label>وضعیت تاهل</safa-label>

              <q-radio
                v-model="results.pRequest.ClsEngineer.Eng_Info.IsMarried"
                cdcName="IsMarried"
                :disable="isElementDisabled"
                :m="mode"
                val="married"
                label="متاهل"
              ></q-radio>

              <q-radio
                v-model="results.pRequest.ClsEngineer.Eng_Info.IsMarried"
                cdcName="IsMarried"
                :disable="isElementDisabled"
                :m="mode"
                val="single"
                label="مجرد"
              ></q-radio>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-label>جنسیت</safa-label>

              <q-radio
                v-model="results.pRequest.ClsEngineer.Eng_Info.IsMale"
                cdcName="IsMale"
                :m="mode"
                val="male"
                label="مرد"
                :disable="isElementDisabled"
              ></q-radio>

              <q-radio
                v-model="results.pRequest.ClsEngineer.Eng_Info.IsMale"
                cdcName="IsMale"
                :m="mode"
                val="female"
                label="زن"
                :disable="isElementDisabled"
              ></q-radio>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="نام/نام شرکت"
                v-model="results.pRequest.ClsEngineer.Eng_Info.EngName"
                cdcName="EngName"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="نام خانوادگی"
                v-model="results.pRequest.ClsEngineer.Eng_Info.EngFamily"
                cdcName="EngFamily"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="نام پدر"
                v-model="results.pRequest.ClsEngineer.Eng_Info.FatherName"
                cdcName="FatherName"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-datepicker
                :m="mode"
                :disabled="false"
                outlined
                dense="true"
                locale="fa"
                placeholder="تاریخ تولد"
                format="jYYYY/jMM/jDD"
                display-format="dddd jDD jMMMM jYYYY"
                label="تاریخ تولد"
                v-model="results.pRequest.ClsEngineer.Eng_Info.BirthDate"
                cdcName="BirthDate"
              >
              </safa-datepicker>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="محل تولد"
                v-model="results.pRequest.ClsEngineer.Eng_Info.BirthPlace"
                cdcName="BirthPlace"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="محل صدور"
                v-model="results.pRequest.ClsEngineer.Eng_Info.IdExportPlace"
                cdcName="IdExportPlace"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="شماره شناسنامه"
                v-model="results.pRequest.ClsEngineer.Eng_Info.IdNo"
                cdcName="IdNo"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="کد ملی/شماره ثبت"
                v-model="results.pRequest.ClsEngineer.Eng_Info.NationalCode"
                cdcName="NationalCode"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-datepicker
                v-model="results.pRequest.ClsEngineer.Eng_Info.SaveDate"
                cdcName="SaveDate"
                :m="mode"
                :disabled="false"
                outlined
                dense="true"
                locale="fa"
                placeholder="تاریخ ثبت"
                format="jYYYY/jMM/jDD"
                display-formaUset="dddd jDD jMMMM jYYYY"
                label="تاریخ ثبت"
              >
              </safa-datepicker>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="کد دفتر جاری"
                v-model="results.pRequest.ClsEngineer.Eng_Info.OfficeCode"
                cdcName="OfficeCode"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="شماره عضویت نظام مهندسی"
                v-model="results.pRequest.ClsEngineer.Eng_Info.IdentityCode"
                cdcName="IdentityCode"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="کد نظام معماری"
                v-model="results.pRequest.ClsEngineer.Eng_Info.ArchitectureCode"
                cdcName="ArchitectureCode"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                m="r"
                label="دفتر نظام مهندسی"
                v-model="
                  results.pRequest.ClsEngineer.EngOrgan_OfficeInfo.OfficeCode
                "
                cdcName="OfficeCod"
              ></safa-text>
            </div>

            <div class="col-1">
              <q-btn
                :m="mode"
                label="..."
                color="secondary"
                @click="isShowModal = true"
                :disable="isElementDisabled"
              ></q-btn>

              <ShowModal
                :show="isShowModal"
                @hide="isShowModal = false"
                title="لیست دفاتر"
                @onCloseModal="closeModal"
              >
                <SearchOffices @onGetDataFromGrid="getDataFromGrid" />
              </ShowModal>
            </div>

            <div class="col-3">
              <safa-combo
                domainName="engineer"
                ciName="CI_City"
                dense="true"
                outlined
                use-input
                :m="mode"
                input-debounce="0"
                label="شهر"
                v-model="results.pRequest.ClsEngineer.Eng_Info.Eng_OrganOffCity"
                cdcName="Eng_OrganOffCity"
              ></safa-combo>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="کلمه عبور"
                v-model="results.pRequest.ClsEngineer.Eng_Info.Password"
                cdcName="Password"
              ></safa-text>
            </div>

            <div class="col-11">
              <text-template
                :m="mode"
                formKey="4ec65d9f-8d39-44f6-a528-cf4868dd8e68"
                label="توضیحات"
                type="textarea"
                v-model="results.pRequest.ClsEngineer.Eng_Info.EngComments"
                cdcName="EngComments"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// import CiItems from '../../../../components/json/items'
// import ShowModal from '../../../../components/ShowModal'
// import SearchOffices from '../../../../components/SearchOffices'
// import baseFormMixin from '../../../../mixins/baseFormMixin'

export default {
  name: "u-engineer-personal-info"
  // props: {
  //   isEditable: Boolean,
  //   results: {},
  //   birthDate: null,
  //   regDate: null,
  //   isElementDisabled: Boolean
  // },
  // data: function () {
  //   return {
  //     ciCities: null,
  //     isShowModal: false,
  //     pRequest: {
  //       CI_RequestType: '0',
  //       CI_Years: '0',
  //       ClsEngineer: {
  //         CI_City: '6',
  //         CityName: 'قزوین',
  //         ClsEngineerCapacity: {
  //           CI_Year: '0',
  //           Eng_CapacityReq: null,
  //           Eng_CapacityReqList: null,
  //           Eng_Competence: {
  //             Eng_Competence: [
  //               {
  //                 CI_Ability: '2',
  //                 CI_Base: '2',
  //                 IsActive: 'true',
  //                 NIdCompetence: '3280a54f-b3a1-459a-beae-1c907235c1ab',
  //                 NIdEng: '16ec368c-0118-473c-973b-1cb8a73718b8',
  //                 PrecentLimitation: '100',
  //                 RegDate: '1397/09/12'
  //               },
  //               {
  //                 CI_Ability: '1',
  //                 CI_Base: '2',
  //                 IsActive: 'true',
  //                 NIdCompetence: '0cf338bf-9266-4544-ac65-9efe990b7230',
  //                 NIdEng: '16ec368c-0118-473c-973b-1cb8a73718b8',
  //                 PrecentLimitation: '100',
  //                 RegDate: '1397/09/12'
  //               }
  //             ]
  //           },
  //           Eng_Info: {
  //             ADPstudyFieldRel: '100',
  //             ArchitectureCode: null,
  //             BirthDate: '1397/09/12',
  //             BirthPlace: 'jk',
  //             CI_Ability: '0',
  //             CI_Degree: '1',
  //             CI_EngineerType: '2',
  //             CI_MilitaryService: '0',
  //             CI_Region: '0',
  //             CI_Score: '0',
  //             CI_University: '1',
  //             CreatedDate: '1397/09/12',
  //             Email: null,
  //             EngFamily: 'guj',
  //             EngName: 'jh',
  //             FatherName: 'hbj',
  //             IdExportPlace: null,
  //             IdNo: '3610700289',
  //             IdentityCode: '6016',
  //             IsCommitment: 'false',
  //             IsMale: 'false',
  //             IsMarried: 'false',
  //             IsOk: 'false',
  //             MobileNo: '09155805570',
  //             MunicipalityCode: '0',
  //             NIdEng: '16ec368c-0118-473c-973b-1cb8a73718b8',
  //             NIdEng_tmp: '0',
  //             NationalCode: '3610700289',
  //             Password: '49964060',
  //             PercentRestriction: '0',
  //             SaveDate: '1397/09/12'
  //           },
  //           ErrorResult: {
  //             BizErrors: null,
  //             Requirements: null
  //           },
  //           IsCancel: 'false',
  //           IsConfirm: 'false',
  //           IsRevoke: 'false',
  //           NidEngineer: '16ec368c-0118-473c-973b-1cb8a73718b8'
  //         },
  //         EngOrgan_OfficeInfo: {
  //           NidEngOrgOff: '00000000-0000-0000-0000-000000000000'
  //         },
  //         Eng_Card: null,
  //         Eng_Competence: {
  //           Eng_Competence: [
  //             {
  //               CI_Ability: '2',
  //               CI_Base: '2',
  //               IsActive: 'true',
  //               NIdCompetence: '3280a54f-b3a1-459a-beae-1c907235c1ab',
  //               NIdEng: '16ec368c-0118-473c-973b-1cb8a73718b8',
  //               PrecentLimitation: '100',
  //               RegDate: '1397/09/12'
  //             },
  //             {
  //               CI_Ability: '1',
  //               CI_Base: '2',
  //               IsActive: 'true',
  //               NIdCompetence: '0cf338bf-9266-4544-ac65-9efe990b7230',
  //               NIdEng: '16ec368c-0118-473c-973b-1cb8a73718b8',
  //               PrecentLimitation: '100',
  //               RegDate: '1397/09/12'
  //             }
  //           ]
  //         },
  //         Eng_Holidays: null,
  //         Eng_Info: {
  //           ADPstudyFieldRel: '100',
  //           ArchitectureCode: null,
  //           BirthDate: '1397/09/12',
  //           BirthPlace: 'jk',
  //           CI_Ability: '0',
  //           CI_Degree: '0',
  //           CI_EngineerType: '2',
  //           CI_MilitaryService: '0',
  //           CI_Region: '0',
  //           CI_Score: '0',
  //           CI_University: '1',
  //           CreatedDate: '1397/09/12',
  //           Email: null,
  //           EngFamily: 'guj',
  //           EngName: 'Test Update',
  //           FatherName: 'hbj',
  //           IdExportPlace: null,
  //           IdNo: '3610700289',
  //           IdentityCode: '6016',
  //           IsCommitment: 'false',
  //           IsMale: 'false',
  //           IsMarried: 'false',
  //           IsOk: 'false',
  //           MobileNo: '09155805570',
  //           MunicipalityCode: '0',
  //           NIdEng: '16ec368c-0118-473c-973b-1cb8a73718b8',
  //           NIdEng_tmp: '0',
  //           NationalCode: '3610700289',
  //           Password: '49964060',
  //           PercentRestriction: '0',
  //           SaveDate: '1397/09/12'
  //         },
  //         Eng_JobAgreement: {
  //           Eng_JobAgreement: {
  //             CI_JobAgreementBaseExport: '0',
  //             CI_JobAgreementType: '1',
  //             CI_Region: '0',
  //             JobAgreementExpireDate: '1397/09/30',
  //             JobAgreementExportDate: '1397/09/12',
  //             NIdEng: '16ec368c-0118-473c-973b-1cb8a73718b8',
  //             NIdJobAgreement: 'fa4fb519-f1cf-4467-9bf2-5e7adaf3230f',
  //             NIdJobAgreement_tmp: '0'
  //           }
  //         },
  //         Eng_OrganOffCity: null,
  //         Eng_OtherData: null,
  //         Eng_OtherData_Temp: null,
  //         Eng_Picture: {
  //           NIdEng: '16ec368c-0118-473c-973b-1cb8a73718b8',
  //           NIdPicture: '96c4c4f9-f34f-4f0f-b6f1-3995750e8f19',
  //           NIdPicture_tmp: '0',
  //           PicMohr: '',
  //           PicNationalCode: '',
  //           PicSignature: '',
  //           PicVoucher: '',
  //           Picture: ''
  //         },
  //         ErrorResult: {
  //           BizErrors: null,
  //           Requirements: null
  //         },
  //         IsChangePass: 'false',
  //         IsNezam: 'false',
  //         IsShowBuildingReportAllEng: 'false',
  //         IsShowCommitment: 'true',
  //         NidEngineer: '16ec368c-0118-473c-973b-1cb8a73718b8',
  //         NidUser: '7bc16d9a-9ac4-47af-bc28-adad1622a054',
  //         ProvinceName: 'قزوین',
  //         SecurityPass: 'NBn+H56Nqh+uospXdhMNHQ==',
  //         SecurityRequestID: 'd70e04f5-5f2f-4cdf-9598-f66fcf16d0e5',
  //         SecurityUserName: 'Lm4WnEqEYC5kEshrgKgKgA==',
  //         SendByAfagh: 'false',
  //         UserName: 'مدير سيستم (sa)'
  //       },
  //       NidCheckerGroup: '00000000-0000-0000-0000-000000000000',
  //       NidEng: '00000000-0000-0000-0000-000000000000',
  //       NidFil: '00000000-0000-0000-0000-000000000000',
  //       NidWorkitem: '0',
  //       CI_CancelType: '0',
  //       CI_ExecFloor: '0',
  //       CI_ExecLevel: '0',
  //       CI_SazeType: '0',
  //       CI_Year: '0',
  //       Floor: '0',
  //       Height: '0',
  //       Infrastructure: '0',
  //       IsConfirm: 'false',
  //       IsRefreshOnly: 'false',
  //       IsSendToSaraRequest: 'false',
  //       NIdBuildingGroup: '00000000-0000-0000-0000-000000000000',
  //       NIdDetail: '00000000-0000-0000-0000-000000000000',
  //       NIdRealPerson: '00000000-0000-0000-0000-000000000000',
  //       NidBlackList: '00000000-0000-0000-0000-000000000000',
  //       NidProc: '00000000-0000-0000-0000-000000000000',
  //       NidRefer: '00000000-0000-0000-0000-000000000000',
  //       NidTask: '00000000-0000-0000-0000-000000000000',
  //       NidWorkFlowDeff: '00000000-0000-0000-0000-000000000000',
  //       OtherFileType: '0',
  //       Sara_WorkflowID: '0',
  //       SecretariatNo: '0',
  //       Skip: '0',
  //       StudyFiled: '0',
  //       SysCI_RequestStatus: '0',
  //       Take: '0',
  //       UserGUID: '00000000-0000-0000-0000-000000000000'
  //     }
  //   }
  // },
  // mixins: {
  //   baseFormMixin
  // },
  // components: {
  //   ShowModal,
  //   SearchOffices
  // },
  // computed: {
  //   yearDataSource: function () {
  //     return CiItems.CI_ENG_TYPE
  //   },
  //   citiesDataSource: function () {
  //     return CiItems.CI_CITIES
  //   },
  //   mode () {
  //     return this.isEditable ? 'e' : 'r'
  //   }
  // },
  // updated () {
  //   this.$emit('formDataOfEngInfo', this.EngFields)
  // },
  // methods: {
  //   setIdOfTypeToModel (e) {
  //     // // console.log('Setter: ', e.Id)
  //     // this.EngFields.CI_EngineerType = e.Id
  //   },
  //   closeModal (e) {
  //     this.isShowModal = e
  //   },
  //   getDataFromGrid (dataItem) {
  //     // this.$emit('onGetDataFromGrid', dataItem)

  //     // console.log(dataItem)

  //     this.results.pRequest.ClsEngineer.EngOrgan_OfficeInfo.OfficeCode = dataItem.OfficeCode

  //     this.isShowModal = false
  //   }
  // }
}
</script>
