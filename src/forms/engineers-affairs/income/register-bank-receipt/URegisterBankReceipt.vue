<template>
  <form-wrapper :title="title" :padding="false">
    <safa-status :result="formResult" />
    <fit>
      <safa-tabs v-model="activeTab" class="fit" :padding="true">
        <template v-slot:tabs>
          <tab-menu name="bankFile" label="فایل بانک" />
          <tab-menu name="paymentCode" label="شناسه پرداخت" />
        </template>

        <tab-content name="bankFile" title="فایل بانک">
          <fit>
            <div class="row q-gutter-sm q-mb-sm">
              <!-- <safa-uploader
                class="col-md-3"
                label="بارگذاری فایل"
                @change="selectFile"
                label-width="80px"
              /> -->
              <safa-file-uploader
                  class="col-md-3"
                  label="بارگذاری فایل"
                  label-width="90px"
                  cdcName="File"
                  :max-size="5"
                  type=".Epay"
                  @change="changeFile"
                  required
                  validations="required"
                />
              <btn-default :disable="!isEditable" label="ثبت فیش " />
              <btn-default label="فیش های نامعتبر" @click="getUnvalidFiches" />
            </div>
            <safa-datatable
              title="لیست فایل بانک"
              v-model="model.ClsCheckIncomeFiche.AcceptFiches"
              :columns="bankFileColumns"
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              min-height="100px"
              height="100%"
              max-height="100%"
              fit
              paginate
              m="r"
            />
          </fit>
        </tab-content>
        <tab-content name="paymentCode" title="شناسه پرداخت">
          <fit>
            <FormRow>
              <FormControl>
                <safa-datepicker
                  v-model="model.ClsCheckIncomeFiche.FromDate"
                  label="از تاریخ"
                  label-width="60px"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  v-model="model.ClsCheckIncomeFiche.ToDate"
                  label="تا تاریخ"
                  label-width="60px"
                />
              </FormControl>
              <div class="row q-gutter-sm q-mb-sm">
                <btn-default label="نمایش" @click="showFichesFromBank" />
                <btn-default :disable="true" label="ثبت فیش" />
              </div>
            </FormRow>
            <safa-datatable
              title="لیست شناسه های پرداخت"
              v-model="model.ClsCheckIncomeFiche.AcceptFiches"
              :columns="paymentCodeColumns"
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              min-height="100px"
              height="100%"
              max-height="100%"
              fit
              paginate
              m="r"
            />
          </fit>
        </tab-content>
      </safa-tabs>
    </fit>
    <safa-popup
      v-model="showUnvalidReceipts"
      title="لیست فیش های نامعتبر"
      :padding="false"
    >
      <safa-datatable
        title="لیست فیش های نامعتبر"
        v-model="model.InvalidFicheLog"
        :columns="unvalidReceiptsColumns"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        min-height="100px"
        height="100%"
        max-height="100%"
        fit
        paginate
        m="r"
      />
    </safa-popup>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "ثبت اطلاعات فیش از بانک",
      formKey: "53b14b97-f428-4ec1-afd8-e2a8ea0d5255",
      name: "URegisterBankReceipt",
      main: true,
      sidebarCompatible: true,

      activeTab: "bankFile",
      showUnvalidReceipts: false,
      paymentCodeColumns: [
        {
          field: "AccountNo",
          title: "شماره حساب"
        },
        {
          field: "FicheType",
          title: "نوع فیش"
        },
        {
          field: "FicheSerial",
          title: "شماره فیش"
        },

        {
          field: "BranchNo",
          title: "کد شعبه"
        },

        {
          field: "FileDate",
          title: "تاریخ فیش"
        },

        {
          field: "CountOfEngineers",
          title: "تعداد مهندسان پرونده"
        },

        {
          field: "Price",
          title: "مبلغ"
        },

        {
          field: "InValidMessage",
          title: "علت مغایرت"
        }
      ],
      unvalidReceiptsColumns: [
        {
          field: "AccountNo",
          title: " شماره حساب"
        },
        {
          field: "BankDate",
          title: "تاریخ پرداخت"
        },
        {
          field: "BranchNo",
          title: "کد شعبه"
        },

        {
          field: "FishDate",
          title: "تاریخ فیش"
        },

        {
          field: "LogDate",
          title: "تاریخ ثبت"
        },

        {
          field: "LogTime",
          title: " زمان تبت "
        },

        {
          field: "Price",
          title: "مبلغ"
        },

        {
          field: "Comments",
          title: "علت مغایرت"
        }
      ],
      bankFileColumns: [
        {
          field: "AccountNo",
          title: "شماره حساب"
        },
        {
          field: "FicheType",
          editor: "combo",
          title: " نوع فیش"
        },
        {
          field: "FicheSerial",
          title: " شماره فیش"
        },
        {
          field: "BranchNo",
          title: "کد شعبه"
        },

        {
          field: "FileDate",
          title: "تاریخ فیش"
        },

        {
          field: "CountOfEngineers",
          title: "تعداد مهندسان پرونده "
        },
        {
          field: "Price",
          title: "مبلغ "
        },
        {
          field: "InValidMessage",
          title: "علت مغایرت "
        }
      ],
      model: {
        InvalidFicheLog: [],
        ClsCheckIncomeFiche: {
          AcceptFiches: [],
          FromDate: "",
          ToDate: ""
        }
      },
      files: [],
      fileContent: [],
      formResult: null
    }
  },
  methods: {
    readFile (event) {
      this.fileContent = event.target.result.split('\r\n')
    },
    changeFile (file) {
      var reader = new FileReader()
      reader.addEventListener("load", this.readFile)
      reader.readAsText(file)
      this.files = file
    },
    showFichesFromBank () {
      const payload = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: 0,
          ClsCheckIncomeFiche: {
            FileExtension: ".Epay",
            FromDate: this.model.ClsCheckIncomeFiche.FromDate,
            IsShowOnly: true,
            ToDate: this.model.ClsCheckIncomeFiche.ToDate,
            File: "",
            TotalAccept: 0,
            AcceptFiches: ""
          }
        }
      }
      this.$services.eng
        .acceptFichesFromBank(payload)
        .then(({ data }) => {
          this.formResult = this.getResponse(data)
          if (this.formResult.success) {
            this.model.ClsCheckIncomeFiche.AcceptFiches = this.formResult.data.ClsCheckIncomeFiche.AcceptFiches
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getUnvalidFiches () {
      this.showUnvalidReceipts = true
      this.showLoading()
      let payload = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: 0,
          NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
          NidEng: "00000000-0000-0000-0000-000000000000",
          NidFil: "00000000-0000-0000-0000-000000000000",
          NidWorkitem: "0",
          CI_CancelType: "0",
          CI_ExecFloor: "0",
          CI_ExecLevel: "0",
          CI_SazeType: "0",
          CI_Year: "0",
          Height: "0",
          Infrastructure: "0",
          IsConfirm: "false",
          IsRefreshOnly: "false",
          IsSendToSaraRequest: "false",
          NIdBuildingGroup: "00000000-0000-0000-0000-000000000000",
          NIdDetail: "00000000-0000-0000-0000-000000000000",
          NIdRealPerson: "00000000-0000-0000-0000-000000000000",
          NidBlackList: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidRefer: "00000000-0000-0000-0000-000000000000",
          NidTask: "00000000-0000-0000-0000-000000000000",
          NidWorkFlowDeff: "00000000-0000-0000-0000-000000000000",
          SecretariatNo: "0",
          Skip: "0",
          StudyFiled: "0",
          SysCI_RequestStatus: "0",
          Take: "200",
          UserGUID: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.eng
        .getIncomeFicheLog(payload)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.model.InvalidFicheLog =
              res.data.GetIncomeFicheLogResult.InvalidFicheLog
            this.isEditable = false
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
