<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20c96248-c0c2-4da0-bb07-9480b0c95dce"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <!-- <FormControl>
          <EngineerInfoBox
            label="کدعضویت مهندس"
            :m="mode"
            v-model="model.checker.pIdentityCode"
            labelWidth="90px"
            @fetched="fetched"
          />
        </FormControl> -->
          <FormControl>
            <safa-text
              label="کد عضویت مهندس"
              label-width="90px"
              v-model="model.checker.pIdentityCode"
              cdcName="pIdentityCode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد ارجاع"
              label-width="70px"
              v-model="model.checker.pNidWorkItem"
              cdcName="pNidWorkItem"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="وضعیت"
              label-width="80px"
              source-type="local"
              :options="eumStayForRefCheckerStatus"
              v-model="model.checker.pEumStayForRefCheckerStatus"
              cdcName="pEumStayForRefCheckerStatus"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ ارسال به لیست انتظار از"
              label-width="90px"
              v-model="model.checker.pSendToStayRefCheckerDate_From"
              cdcName="pSendToStayRefCheckerDate_From"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ ارسال به لیست انتظار تا"
              label-width="90px"
              v-model="model.checker.pSendToStayRefCheckerDate_To"
              cdcName="pSendToStayRefCheckerDate_To"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ ارسال به بازیبن از"
              label-width="90px"
              v-model="model.checker.pSendToCheckerDate_From"
              cdcName="pSendToCheckerDate_From"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ ارسال به بازیبن تا"
              label-width="90px"
              v-model="model.checker.pSendToCheckerDate_To"
              cdcName="pSendToCheckerDate_To"
            />
          </FormControl>
          <div class="q-gutter-sm">
            <btn-search @click="loadData" />
            <btn-cancel @click="reset" label="پاک کردن" />
          </div>
        </FormRow>
        <safa-datatable
          helper="refStayForRefCheckerColumns"
          v-model="checkerList"
          title="لیست انتظار"
          m="r"
          fit
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
          @SendToCheckerClick="sendToChecker"
          :take="20"
          cdcName="checkerList"
        />
      </fit>
    </form-wrapper>
    <safa-popup title="ارسال به بازبین" v-model="showSendToChecker">
      <SendToChecker v-model="selectedRow" />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import SendToChecker from "./partials/SendToChecker.vue"
const defultModel = {
  checker: {
    pIdentityCode: "",
    pEumStayForRefCheckerStatus: 1,
    pNidWorkItem: "",
    pSendToStayRefCheckerDate_From: "",
    pSendToStayRefCheckerDate_To: "",
    pSendToCheckerDate_From: "",
    pSendToCheckerDate_To: ""
  }
}

export default {
  components: { SendToChecker },
  mixins: [baseFormMixin],
  data () {
    return {
      title: "لیست انتظار ارسال به بازبین",
      formKey: "c53b4dc3-cb99-462c-bebb-e014ab952527",
      name: "UWaitingList",
      main: true,

      model: { checker: { ...defultModel } },
      eumStayForRefCheckerStatus: [
        { ID: 1, Title: "در انتظار" },
        { ID: 2, Title: "ارسال شده" }
      ],
      checkerList: [],
      loadRes: null,
      selectedRow: null,
      showSendToChecker: false
    }
  },

  methods: {
    loadData () {
      this.showLoading()
      const payload = {
        pNIdEng_Refer: "00000000-0000-0000-0000-000000000000",
        pIdentityCode: this.model.checker.pIdentityCode,
        pEumStayForRefCheckerStatus:
          this.model.checker.pEumStayForRefCheckerStatus,
        pNidWorkItem:
          this.model.checker.pNidWorkItem === ""
            ? 0
            : this.model.checker.pNidWorkItem,
        pSendToStayRefCheckerDate_From:
          this.model.checker.pSendToStayRefCheckerDate_From,
        pSendToStayRefCheckerDate_To:
          this.model.checker.pSendToStayRefCheckerDate_To,
        pSendToCheckerDate_From: this.model.checker.pSendToCheckerDate_From,
        pSendToCheckerDate_To: this.model.checker.pSendToCheckerDate_To,
        pFromRow: 0,
        pToRow: 50
      }
      this.$services.engineers
        .getRefStayForRefChecker(payload)
        .then(async ({ data }) => {
          this.loadRes = this.getResponse(data)
          if (this.loadRes.success) {
            this.checkerList =
              this.loadRes.data.GetRef_StayForRefCheckerResult.Ref_StayForRefChecker
            await this.log({
              action: this.logActions.view,
              bizCode: this.model.checker.pIdentityCode,
              bizCodeTitle: "کد عضویت"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    sendToChecker ({ dataItem }) {
      this.selectedRow = dataItem
      this.showSendToChecker = true
    },
    reset () {
      this.model = { checker: { ...defultModel } }
    }
  }
}
</script>
