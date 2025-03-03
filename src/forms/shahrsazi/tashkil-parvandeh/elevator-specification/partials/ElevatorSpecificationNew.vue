<template>
    <form-wrapper vertical >
      <fit>
        <safa-status :result="elevatorResult" />
        <safa-status :result="getAllAsansorResult" />
        <form-row :lg="2" :md="2" :sm="2" :xl="2" :xs="2" class="q-mb-sm">
          <form-control>
            <div class="flex no-wrap">
              <safa-text
                label="شناسه ملی آسانسور"
                v-model="txtNationalCode"
                label-width="100px"
              >
              </safa-text>
              <btn-search class="q-ml-sm" label="جستجو" @click="doSearch" />
            </div>
          </form-control>
        </form-row>
        <form-row class="q-mb-sm">
          <form-control>
              <safa-text
                label="شماره ساختمان"
                v-model="baseElevatorItem.txtPlaque"
                label-width="100px"
              />
          </form-control>
          <form-control>
              <safa-text
                label="شناسه ملی آسانسور"
                v-model="baseElevatorItem.txtElevatorNationalCode"
                m="r"
                label-width="100px"
                />
              </form-control>
            <form-control>
              <safa-text
              m="r"
              label="شماره نامه"
              v-model="baseElevatorItem.txtSecretariatNumber"
              label-width="100px"
              />
            </form-control>
            <form-control>
              <safa-text
              label="تاریخ نامه"
              m="r"
              v-model="baseElevatorItem.txtDateSecretariat"
                label-width="100px"
              />
          </form-control>
        </form-row>
        <text-template
          label="توضیجات جدید"
          type="textarea"
          v-model="baseElevatorItem.txtComments"
          formKey="9c24c9ec-7222-4614-a01a-65b4a572cee1"
        >
        </text-template>
      </fit>
      <template v-slot:footer>
        <div class="row q-gutter-x-sm">
          <btn-save label="ذخیره" @click="save" />
          <btn-cancel label="انصراف" @click="cancel" />
        </div>
      </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import loaderMixin from 'src/mixins/loaderMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
const defaultModel = {
  Context: {
    Base_Elevator: [],
    Builing: null,
    Certification: null,
    Confirmation: null,
    Description: null,
    ErrorResult: {
      BizErrors: [],
      Requirements: null
    },
    NidBase: '00000000-0000-0000-0000-000000000000',
    Request: null,
    _District: 0
  }
}
export default {
  mixins: [baseFormMixin, loaderMixin],
  data: function () {
    return {
      model: {
        ...defaultModel
      },
      txtNationalCode: '', // طبق زمل فقط در سرچ استفاده میشه

      baseElevatorItem: {
        txtPlaque: '',
        txtSecretariatNumber: '',
        txtDateSecretariat: '',
        txtElevatorNationalCode: '',
        txtComments: ''
      },
      elevatorResult: null,
      getAllAsansorResult: null
    }
  },
  props: {
    nidBase: String,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    baseNosaziCode: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    doSearch () {
      let paylaod = { pNationalCode: this.txtNationalCode }
      this.$services.SC.getAllAsansor(paylaod)
        .then(async ({ data }) => {
          this.getAllAsansorResult = this.getResponse(data)
          if (this.getAllAsansorResult.success) {
            this.getAllAsansorResult = this.getAllAsansorResult.data
            this.baseElevatorItem.txtSecretariatNumber = this?.getAllAsansorResult?.Confirmation?.SecretariatNumber?.replace("شماره نامه دبیرخانه اداره کل:", "")
            this.baseElevatorItem.txtDateSecretariat = this?.getAllAsansorResult?.Confirmation?.DateSecretariat?.replace("تاریخ نامه دبیرخانه اداره کل :", "")
            this.baseElevatorItem.txtElevatorNationalCode = this?.getAllAsansorResult?.Confirmation?.ElevatorNationalCode
            this.baseElevatorItem.txtComments = this?.getAllAsansorResult?.Description
            await this.log({
              action: this.logActions.view,
              bizCode: "this.txtNationalCode",
              bizCodeTitle: 'txtNationalCode',
              saveDesc: `نمایش اطلاعات برای فرم اضافه کردن آسانسور با شناسه ملی آسانسور ${this.txtNationalCode} انجام گردید.`
            })
          }
        })
        .catch(({ data }) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      this.model.Context.Base_Elevator = []
      this.model.Context.NidBase = this.nidBase
      this.model.Context.Base_Elevator.push({
        LetterNo: this.baseElevatorItem.txtSecretariatNumber,
        LetterDate: this.baseElevatorItem.txtDateSecretariat,
        ElevatorID: this.baseElevatorItem.txtElevatorNationalCode,
        Description: this.baseElevatorItem.txtComments,
        BuildingNo: parseInt(this.baseElevatorItem.txtPlaque) || 0
      })
      let data = {
        pElevator: this.model.Context,
        pNidBase: this.nidBase,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: this.selectedRequest?.NidWorkflowDeff || '00000000-0000-0000-0000-000000000000',
          WorkflowGuid: this.selectedRequest?.NidWorkflowDeff || '00000000-0000-0000-0000-000000000000'
        }
      }

      this.showLoading()
      this.$services.SC.saveElevator(data)
        .then(async ({ data }) => {
          this.elevatorResult = this.getResponse(data)
          if (this.elevatorResult.success) {
            this.elevatorResult = this.elevatorResult.data
            this.$emit('backToElevatorSpecification', true)

            await this.log({
              action: this.logActions.save,
              bizCode: this.nidBase,
              bizCodeTitle: 'NidBase',
              nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
            })
          }
        })
        .catch(({ data }) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.backToMainform = true
      this.$emit('backToElevatorSpecification', this.backToMainform)
    }
  }
}
</script>
