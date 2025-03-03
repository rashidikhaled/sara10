<template>
  <form-wrapper :title="title" :padding="false">
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu
          name="reqList"
          label="لیست بررسی"
        />
        <tab-menu
          name="userInfo"
          label="مشخصات فردی"
        />
      </template>
      <tab-content
        name="reqList"
        :padding="false"
      >
        <safa-datatable
          :columns="reqListColumns"
          fit
          :m="mode"
          height="100%"
          max-height="100%"
          min-height="200px"
          paginate
        />
      </tab-content>
      <tab-content name="userInfo">
        <Fit>
          <!-- <div class="row q-col-gutter-sm q-mb-sm">
            <EngineerInfoBox
              label="کد عضویت"
              label-width="80px"
              v-model="identityCode"
              @fetched="fetched"
            />
          </div> -->
          <FormRow class="q-mb-sm">
            <form-control>
              <EngineerInfoBox
                label="کد عضویت"
                label-width="80px"
                v-model="identityCode"
                @fetched="fetched"
              />
            </form-control>
          </FormRow>
          <FormRow>
            <FormControl>
              <safa-text
                m="r"
                label="نام"
                v-model="model.ClsEngineer.Eng_Info.EngName"
                label-width="80px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="نام خانوادگی"
                label-width="80px"
                v-model="model.ClsEngineer.Eng_Info.EngFamily"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="نام پدر"
                label-width="80px"
                v-model="model.ClsEngineer.Eng_Info.FatherName"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="شماره شناسنامه"
                label-width="80px"
                v-model="model.ClsEngineer.Eng_Info.IdNo"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="کد ملی"
                label-width="80px"
                v-model="model.ClsEngineer.Eng_Info.NationalCode"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                ciName="CI_Years"
                domainName="engineer"
                label="سال کاری"
                :m="mode"
                label-width="80px"
                v-model="model.CI_Years"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="کد دفتر جاری"
                v-model="model.EngineerLastOffice.OfficeCode"
                label-width="80px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="شماره عضویت نظام مهندسی"
                label-width="80px"
                v-model="model.ClsEngineer.Eng_Info.MunicipalityCode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="کد نظام معماری"
                label-width="80px"
                v-model="model.ClsEngineer.Eng_Info.ArchitectureCode"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                m="r"
                label="مدرک تحصیلی"
                label-width="80px"
                domainName="engineer"
                ciName="CI_Degree"
                v-model="model.ClsEngineer.Eng_Info.CI_Degree"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                m="r"
                label="محل اخذ"
                label-width="80px"
                domainName="engineer"
                ciName="CI_University"
                v-model="model.ClsEngineer.Eng_Info.CI_University"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                m="r"
                label="تاریخ آخرین مدرک"
                label-width="80px"
                v-model="model.ClsEngineer.Eng_Info.LastDegreeDate"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                m="r"
                domainName="engineer"
                ciName="CI_StudyField"
                label="رشته تحصیلی"
                label-width="80px"
                v-model="model.ClsEngineer.Eng_Info.CI_StudyField"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                m="r"
                label="امتیاز"
                label-width="80px"
                domainName="engineer"
                ciName="CI_SCORE"
                v-model="model.ClsEngineer.Eng_Info.CI_Score"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                m="r"
                label="وضعیت نظام وظیفه"
                label-width="80px"
                domainName="engineer"
                ciName="CI_MilitaryService"
                v-model="model.ClsEngineer.Eng_Info.CI_MilitaryService"
              />
            </FormControl>
            <text-template
              label="توضیحات"
              :m="mode"
              :rows="1"
              v-model="model.ClsEngineer.Eng_Info.EngComments"
              label-width="80px"
              class="col-12"
            />
          </FormRow>
          <safa-datatable
            :columns="userInfoColumns"
            v-model="model.ClsEngineer.ClsEngineerCapacity.Eng_CapacityReq"
            title=""
            :m="mode"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            show-selected-checkbox
            :allowMultipleSelection="false"
            class="q-mt-sm"
            paginate
            :padding="false"
          />
        </Fit>
      </tab-content>
    </safa-tabs>

    <template v-slot:footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveData"
        @cancel="isEditable = false"
      >
        <template v-slot:after>
          <btn-cancel
            label="ابطال"
            v-if="!isEditable"
          />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "بررسی درخواست ظرفیت سالانه",
      // formKey: "c8e962f3-17d3-4fa4-97de-985023a5aa85",
      // name: "EngCapacityReq",
      main: true,
      activeTab: "reqList",
      identityCode: null,
      model: {
        CI_Years: 1400,
        ClsEngineer: {
          Eng_Info: {
            ArchitectureCode: null,
            CI_Ability: 0,
            CI_Degree: 0,
            CI_MilitaryService: 0,
            CI_Score: 0,
            CI_University: 0,
            EngComments: "",
            EngFamily: "",
            EngName: "",
            FatherName: "",
            IdNo: "",
            IdentityCode: "",
            LastDegreeDate: "",
            MunicipalityCode: ""
          },
          ClsEngineerCapacity: {
            Eng_CapacityReq: []
          }
        },
        EngineerLastOffice: {
          OfficeCode: ""
        }
      },
      reqListColumns: [
        {
          field: "IdentityCode",
          title: " کد عضویت "
        },
        {
          field: "EngName",
          title: "نام "
        },
        {
          field: "EngFamily",
          title: "نام خانوادگی"
        },
        {
          field: "BirthDate",
          title: "تاریخ تولد",
          editor: "date"
        },
        {
          field: "BirthPlace",
          title: "محل تولد "
        },
        {
          field: "IdExportPlace",
          title: "محل صدور "
        },
        {
          field: "IdNo",
          title: "شماره شناسنامه"
        },
        {
          field: "NationalCode",
          title: "کد ملی"
        },
        {
          field: "MunicipalityCode",
          title: "کد نظام مهندسی"
        },
        {
          field: "ArchitectureCode",
          title: "کد نظام معماری "
        },
        {
          field: "Ability",
          title: "نوع صلاحیت"
        },
        {
          field: "City",
          title: "شهرستان "
        },
        {
          field: "MeterReq",
          title: "متراژ ظرفیت اعلام شده"
        },
        {
          field: "RegDate",
          title: "تاریخ درخواست",
          editor: "date"
        },
        {
          field: "CapacityReqStatus",
          title: "وضعیت"
        }
      ],
      userInfoColumns: [
        {
          field: "CI_Ability",
          title: "نوع صلاحیت",
          editor: "combo",
          domain: "engineer",
          width: "150px"
        },
        {
          field: "CI_City",
          title: "شهرستان",
          editor: "combo",
          domain: "engineer",
          width: "150px"
        },
        {
          field: "MeterConfirm",
          title: "متراژ ظرفیت اعلام شده",
          width: "150px"
        },
        {
          field: "ConfirmDate",
          title: "تاریخ تایید",
          editor: "date",
          width: "150px"
        },
        {
          field: "CancelDate",
          title: "تاریخ انصراف",
          editor: "date",
          width: "150px"
        },
        {
          field: "CI_CapacityReqStatus",
          title: "وضعیت",
          editor: "combo",
          domain: "engineer",
          width: "150px"
        },
        {
          field: "CapacityReqComments",
          title: "توضیحات",
          width: "250px"
        }
      ]
    }
  },

  mounted () {},

  methods: {
    fetched (val) {
      this.identityCode = val.IdentityCode
      this.getEngInfoWithEngineerCode()
    },
    async getEngInfoWithEngineerCode () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          EngineerCode: this.identityCode
        }
      }
      await this.$services.engineers
        .GetEngInfoWithEngineerCode(payLoad)
        .then(async (response) => {
          const requestResult = this.getResponse(response.data)
          if (requestResult.success) {
            this.model = requestResult.data.GetEng_InfoWithEngineerCodeResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: "کد عضویت مهندس"
            })
          }
        })
        .catch((error) => {
          console.error("GetEngInfoWithEngineerCode Error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: "0",
          CI_Years:
            this.getQtaGroupDetailResult.ClsQta_GroupStudyFieldQuota.CI_Years
        }
      }
      this.$services.engineers
        .getQtaGroupDetail(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.getQtaGroupDetailResult =
              response.data.GetQtaGroupDetailResult
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveData () {
      // this.showLoading();
      // let payLoad = {
      //   pRequest: {
      //     CI_RequestType: "0",
      //     CI_Years: "0",
      //     ClsQta_GroupStudyFieldQuota:
      //       this.getQtaGroupDetailResult.ClsQta_GroupStudyFieldQuota,
      //   },
      // };
      // this.$services.engineers
      //   .saveQtaGroupDetail(payLoad)
      //   .then(async ({ data }) => {
      //     const response = this.getResponse(data);
      //     if (response.success) {
      //       this.showSuccess("عملیات با موفقیت انجام گردید.");
      //       await this.log({
      //         action: this.logActions.save,
      //         bizCode: "",
      //         bizCodeTitle: "",
      //       });
      //       this.isEditable = false;
      //     }
      //   })
      //   .catch((res) => {
      //     console.error(res);
      //   })
      //   .finally(() => {
      //     this.hideLoading();
      //   });
    }
  }
}
</script>
