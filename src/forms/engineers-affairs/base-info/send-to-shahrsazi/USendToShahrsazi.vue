<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <FormWrapper :title="title">
      <fit>
        <FormRow>
          <form-control class="q-mt-md">
            <safa-combo
              v-model="comboValue"
              ciName="CI_RequestType"
              domainName="engineer"
              label="درخواست"
            />
          </form-control>
        </FormRow>
      </fit>
      <template #footer>
        <div class="row q-qutter-md">
          <btn-default label="ارسال" @click="send" />
          <btn-default label="انصراف" @click="cancel" />
        </div>
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      addBtn: false,
      comboValue: "",
      title: "ارسال به شهرسازی",
      formKey: "a8a0bb2a-8742-4246-8898-b5f982fb307b",
      name: "USendToShahrsazi",
      main: true
    }
  },

  methods: {
    // loadData() {
    //   this.showLoading();
    //   let payLoad = {
    //     pRequest: {
    //       CI_RequestType: 0,
    //       CI_Years: this.getRefBuildingGroupResult.CI_Years,
    //     },
    //   };
    //   this.$services.engineers
    //     .getRefBuildingGroup(payLoad)
    //     .then(({ data }) => {
    //       const response = this.getResponse(data);
    //       if (response.success) {
    //         this.getRefBuildingGroupResult =
    //           response.data.GetRef_BuildingGroupResult;
    //         // await this.log({
    //         //   action: this.logActions.view,
    //         //   bizCode: "",
    //         //   bizCodeTitle: "",
    //         // });
    //       }
    //     })
    //     .catch((res) => {
    //       console.error(res);
    //     })
    //     .finally(() => {
    //       this.hideLoading();
    //     });
    // },
    send () {
      if (this.comboValue === "") {
        this.showError("لطفا پرونده مورد نظر را انتخاب نمایید.")
        return
      }
      this.showLoading()
      let payLoad = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
        }
      }
      this.$services.engineers
        .BackToSara(payLoad)
        .then(({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.getRefBuildingGroupResult =
              response.data.GetRef_BuildingGroupResult
          }
        })

        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
