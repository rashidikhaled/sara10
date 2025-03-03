<template>
    <form-wrapper>
      <fit>
        <safa-datatable
          title="اضافه کردن آسانسور"
          m="e"
          v-model="elavatorSpecificationResult"
          :columns="elevatorSpecificationColumns"
          fit
          max-hight="100%"
          hight="100%"
          min-hight="100%"
          :border="false"
        />
      </fit>
      <template #footer>
        <form-actions :showEditButton="false">
          <btn-save label="ذخیره" @click="saveObj" />
          <btn-cancel label="انصراف" @click="cancel" />
        </form-actions>
      </template>
    </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      elavatorSpecificationResult: [],
      elevatorSpecificationColumns: [
        { field: "BuildingNo", title: "شماره ساختمان" },
        { field: "ElevatorID", title: "شناسه ملی آسانسور" },
        { field: "LetterNo", title: "شماره نامه" },
        { field: "LetterDate", title: "تاریخ نامه", editor: "date" },
        {
          field: "CI_ElevatorType",
          title: "مشخصات آسانسور",
          editor: "combo",
          ciName: "CI_ElevatorType",
          domain: "CI_SaraM1"
        }
      ],
      backToMainform: false,
      elevatorResult: null,
      elevatorResults: {}
    }
  },
  props: {
    nidBase: String,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
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
    saveObj () {
      let payload = {
        pElevator: {
          Base_Elevator: this.elavatorSpecificationResult,
          ErrorResult: { BizErrors: [] },
          NidBase: this.nidBase
        },
        pNidBase: this.nidBase,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: this.selectedRequest?.NidWorkflowDeff || '00000000-0000-0000-0000-000000000000',
          WorkflowGuid: this.selectedRequest?.NidWorkflowDeff || '00000000-0000-0000-0000-000000000000'
        }
      }
      this.showLoading()
      this.$services.SC.saveElevator(payload)
        .then(async ({ data }) => {
          this.elevatorResult = this.getResponse(data)
          if (this.elevatorResult.success) {
            this.elevatorResults = this.elevatorResult.data
            this.backToMainform = true
            this.$emit("closeManualAddElevatorForm", this.backToMainform)
            await this.log({
              action: this.logActions.save,
              bizCode: this.nidBase,
              bizCodeTitle: "NidBase",
              nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
            })
          }
        })
        .catch((err) => {
          this.showError(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.backToMainform = true
      this.$emit("closeManualAddElevatorForm", this.backToMainform)
    }
  }
}
</script>
