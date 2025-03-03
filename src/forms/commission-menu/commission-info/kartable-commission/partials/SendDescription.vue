<template>
  <!-- <FormWrapper :title="title"> -->
  <fit>
    <div class="q-ma-sm" style="flex-grow: 1">
      <safa-text
        fit
        type="textarea"
        v-model="txtDescription"
        cdcName="Description"
        label="توضیحات"
        label-width="60px"
        :rows="9"
      />
    </div>
    <div class="col-auto" style="width: 100%; height: 3px">
        <q-separator inset/>
    </div>
    <div class="q-gutter-x-xs q-ma-sm">
      <btn-save class="q-mr-sm" label="تایید" @click="sendClick" />
      <btn-default label="انصراف" @click="$emit('hide')" />
    </div>
  </fit>
  <!-- <template #footer>
      <form-actions
        m="e"
        @save="sendClick"
        @cancel="$emit('hide')"
        saveButtonTitle="تایید"
      />
    </template> -->

  <!-- <safa-popup title="" v-model="showNextStep" width="500px" height="285px">
      <NextStep @hide="showNextStep = false" />
    </safa-popup> -->
  <!-- </FormWrapper> -->
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

// import NextStep from "./NextStep.vue"

export default {
  mixins: [baseFormMixin],

  components: {
    // NextStep
  },

  props: {
    sendCompleted: {
      type: Function,
      required: true
    },
    showMessageBalckList: {
      type: Boolean,
      required: true
    },
    doSend: {
      type: Function,
      required: true
    },
    isExpertSend: {
      type: Boolean,
      default: false
    },
    formKey: {
      type: String,
      default: '1dc491c8-26b9-45ca-9e56-d8e2de6fa0bd' // کلید فرم کارتابل کمیسیون
    },
    selectedNidCommission: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      name: "SendDescription",
      title: "توضیحات ارسال",
      txtDescription: ""
    }
  },

  methods: {
    sendClick () {
      this.showLoading()
      this.$services.commissions
        .getNextStateList({
          pNidCommission: this.selectedNidCommission
        })
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          let tmpNextNidTask = "00000000-0000-0000-0000-000000000000"
          if (res.success) {
            if (
              res.data.GetNextStateListResult.NextStateList != null &&
              res.data.GetNextStateListResult.NextStateList.length > 1
            ) {
              // #todo Force
              // this.showNextStep = true;
              // this.showNextStepAction = "send";
              // this.nextStateList =
              //   res.data.GetNextStateListResult.NextStateList;
            } else {
              // فراخوانی ارسال پرونده
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedNidCommission,
                bizCodeTitle: "NidCommission",
                saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
              })
              if (
                this.doSend(
                  this.txtDescription,
                  tmpNextNidTask,
                  this.isExpertSend
                )
              ) {
                this.showMessageBalckList = false
              }
            }
          } else {
            if (!this.sendCompleted) this.sendCompleted(false)
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
    }
  }
}
</script>
