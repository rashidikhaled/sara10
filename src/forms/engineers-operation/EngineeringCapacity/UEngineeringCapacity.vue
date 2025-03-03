<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="90BBA2FE-5569-45B3-9A7B-EB92B3B19CA1"
  >
    <form-wrapper :title="title">
      <Fit>
        <safa-status :result="result" />
        <FormRow class="q-my-sm">
          <FormControl>
            <safa-text
              m="r"
              label="نام"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.EngName"
            />
          </FormControl>
          <FormControl>
            <safa-text
              m="r"
              label="نام خانوادگي"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.EngFamily"
            />
          </FormControl>
          <FormControl>
            <safa-text
              m="r"
              label="نام پدر"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.FatherName"
            />
          </FormControl>
          <FormControl>
            <safa-text
              m="r"
              label="شماره شناسنامه"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.IdNo"
            />
          </FormControl>
          <FormControl>
            <safa-text
              m="r"
              label="کد ملی"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.NationalCode"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="سال کاری"
              :m="mode"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.CI_Year"
              domainName="engineer"
              ciName="CI_Years"
            />
          </FormControl>
          <FormControl>
            <safa-text m="r" label="کد دفتر جاري" label-width="100px" />
          </FormControl>
          <FormControl>
            <safa-text
              m="r"
              label="شماره عضويت نظام مهندسي"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.MunicipalityCode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              m="r"
              label="کد نظام معماری"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.ArchitectureCode"
            />
          </FormControl>
          <text-template
            label=" توضیحات"
            :rows="1"
            class="col-12"
            :m="mode"
            label-width="100px"

          />
          <FormControl>
            <safa-combo
              m="r"
              label="مدرک تحصیلی"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.CI_Degree"
              domainName="engineer"
              ciName="CI_Degree"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              m="r"
              label="محل اخذ"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.CI_University"
              domainName="engineer"
              ciName="CI_University"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              m="r"
              label="تاریخ آخرین مدرک"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.LastDegreeDate"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              m="r"
              label="رشته تحصیلی"
              label-width="100px"
              v-model="model.StudySelectedItem"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              m="r"
              label="امتیاز"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.CI_Score"
              domainName="engineer"
              ciName="CI_Score"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              m="r"
              label="وضعیت نظام وظیفه"
              label-width="100px"
              v-model="model.ClsEngineerCapacity.Eng_Info.CI_MilitaryService"
              domainName="engineer"
              ciName="CI_MilitaryService"
            />
          </FormControl>
        </FormRow>
        <safa-datatable
          :columns="CapacityrColumn"
          title=""
          :m="mode"
          fit
          height="100%"
          max-height="100%"
          min-height="150px"
          show-selected-checkbox
          :allowMultipleSelection="false"
          class="q-mt-sm"
          :padding="false"
          v-model="model.ClsEngineerCapacity.Eng_CapacityReq"
        >
        </safa-datatable>
      </Fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
        >
          <template v-slot:after>
            <btn-cancel label="انصراف درخواست" @click="cancelReqClick"  />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "درخواست ظرفیت سالانه",
      formKey: "78EBEA4F-ABB8-4ACA-A18B-1BDFAD400FCF",
      name: "UEngineeringCapacity",
      main: true,
      CapacityrColumn: [
        {
          field: "CI_Ability",
          title: "نوع صلاحیت",
          editor: "combo",
          width: "150px",
          domain: "engineer"
        },
        {
          field: "CI_City",
          title: "شهرستان",
          editor: "combo",
          width: "150px",
          domain: "engineer"
        },
        {
          field: "MeterReq",
          title: "متراژ ظرفیت اعلام شده",
          width: "150px"
        },
        {
          field: "MeterConfirm",
          title: "متراژ ظرفیت تایید شده",
          width: "150px",
          editable: false
        },
        {
          field: "ConfirmDate",
          title: "تاریخ تایید",
          editor: "date",
          width: "150px",
          editable: false
        },
        {
          field: "ConfirmTime",
          title: "ساعت تایید",
          width: "150px",
          editable: false
        },
        {
          field: "CancelDate",
          title: "تاریخ انصراف",
          editor: "date",
          width: "150px",
          editable: false
        },
        {
          field: "CI_CapacityReqStatus",
          title: "وضعیت",
          editor: "combo",
          width: "150px",
          domain: "engineer",
          editable: false
        },
        {
          field: "CapacityReqComments",
          title: "توضیحات",
          width: "250px"
        }
      ],
      model: {
        "CI_RequestType": "0",
        "CI_Years": "0",
        ClsEngineerCapacity: {
          CI_Year: 1401,
          Eng_Info: {
            EngName: "",
            EngFamily: "",
            FatherName: "",
            IdNo: "",
            NationalCode: "",
            MunicipalityCode: "",
            CI_Degree: 0,
            CI_University: 0,
            LastDegreeDate: "",
            CI_Score: 0,
            CI_MilitaryService: 0,
            ArchitectureCode: ""
          },
          Eng_CapacityReq: []
        },
        StudySelectedItem: 0
      },
      result: null
    }
  },
  methods: {
    cancelReqClick () {
      if (this.model.ClsEngineerCapacity != null) {
        this.model.ClsEngineerCapacity.IsCancel = true
        this.ClsEngineerCapacity.Eng_CapacityReq.forEach(item => {
          if ((item.CancelDate === null || item.CancelDate === "") && (item.ConfirmDate === null || item.ConfirmDate === "")) {
            item.CancelUserGuid = this.getNidUser()
            item.CancelUserName = this.getUserDisplayName()
          } else {
            this.showError("درخواست تایید شده و امکان انصراف ندارد")
          }
        })
        this.saveObj()
      }
    },
    loadObj () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          NidEngineer: this.getNidUser()
        }
      }
      this.$services.eng
        .getEngCapacityReq(payLoad)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.model =
              this.result.data.GetEngCapacityReqResult
            this.model.ClsEngineerCapacity = this.result.data.GetEngCapacityReqResult.ClsEngineerCapacity
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // normalize(){
    //     "CI_ExecLevel": 0,
    // }
    saveObj () {
      this.showLoading()
      if (this.model.ClsEngineerCapacity !== null) {
        this.model.ClsEngineerCapacity.NidEngineer = this.getNidUser()
        this.model.ClsEngineerCapacity.CI_ExecLevel = 0
        this.model.CI_ExecLevel = 0

        this.model.ClsEngineerCapacity.Eng_CapacityReq.forEach(item => {
          if (item.RegDate === null || item.RegDate === "") {
            item.RegUserGuid = this.getNidUser()
            item.RegUserName = this.getUserDisplayName()
          }
        })
      }
      let payLoad = {
        pRequest: this.model
      }
      this.$services.eng
        .sveEngCapacityReq(payLoad)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('ذخیره با موفقیت انجام شد.')
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  created () {
    this.loadObj()
  }
}
</script>
