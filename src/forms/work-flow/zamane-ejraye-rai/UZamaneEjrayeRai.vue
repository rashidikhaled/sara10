<template>
  <!-- <safa-form :id="formKey" :caption="title"> -->
    <form-wrapper vertical :title="title">
      <template #header>
        <safa-status :result="isConfirmMokatebatRes" />
        <safa-status :result="saveRequestSecRes" />
        <safa-status :result="exportLetterOnArchiveAndMokatebatRes" />
      </template>
      <fit>
        <button-group ref="bgroups" class="q-mb-sm">
          <btn-default label="زمان اجرای رای" icon="receipt_long" @click="ejra" />
          <!-- <btn-default label="زمان اجرای رای" icon="receipt_long" @click="ejra" /> -->
        </button-group>
        <q-separator class="q-mb-sm" />
        <div class="fit">
          <!-- <text-template label="" /> -->
        </div>
        <div v-if="showParameters">
          <q-separator class="q-mb-sm" />
          <FormRow>
            <FormControl>
              <safa-text label="پیوست" label-width="60px" />
            </FormControl>
            <FormControl>
              <safa-text label="رونوشت" label-width="60px" />
            </FormControl>
            <FormControl>
              <safa-combo
                ciName="CI_PrintType"
                domainName="Commission100"
                label="نوع چاپ"
                label-width="60px"
              />
            </FormControl>
            <FormControl>
              <safa-text label="اقدام کننده" label-width="60px" />
            </FormControl>
            <FormControl>
              <safa-text label="شعبه" label-width="60px" />
            </FormControl>
            <text-template
              label="توضیحات"
              label-width="60px"
              class="col-12 q-mb-sm"
              :rows="4"
            />
          </FormRow>
        </div>
      </fit>
      <template v-slot:footer>
        <div class="q-gutter-sm">
          <btn-default label="اجرا" @click="ejra" />
          <btn-default label="ثبت" @click="sabt" />
          <btn-default label="ثبت و صدور" @click="sabtVaSodor" />
          <btn-default
            label="پارامتر ها"
            @click="showParameters = !showParameters"
            :icon="showParameters ? 'expand_more' : 'expand_less'"
          />
        </div>
      </template>
    </form-wrapper>
  <!-- </safa-form> -->
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableMixin from "src/kartable/mixins/kartableMixin"
export default {
  mixins: [baseFormMixin, kartableMixin],
  data () {
    return {
      title: "زمان اجرا",
      name: "UZamaneEjrayeRai",
      //   formKey: "",
      main: true,

      model: {},
      showParameters: false,
      isConfirmMokatebatRes: null,
      saveRequestSecRes: null,
      exportLetterOnArchiveAndMokatebatRes: null
    }
  },
  mounted () {},
  methods: {
    async ejra () {
      // if (!this.isValidForm()) return
      this.showLoading()
      try {
        const payLoad = {
          pNidProc: this.taskInfo.NidProc,
          pReportName: "ZamaneEjrayeRai"
        }
        const { data } = await this.$services.SC.isConfirmMokatebat(
          payLoad,
          this.config
        )
        this.isConfirmMokatebatRes = this.getResponse(data)
        if (this.isConfirmMokatebatRes.success) {
          console.log(data.IsConfirmMokatebatResult)
          this.showSuccess("عملیات با موفقیت انجام شد.")
          this.print()
        //   await this.log({
        //     action: this.logActions.save,
        //     bizCode: this.selectedDistrict,
        //     bizCodeTitle: "NidProc"
        //   })
        }
      } catch (e) {
        this.serverError()
        console.error("error", e)
      } finally {
        this.hideLoading()
      }
    },
    async sabt () {
      this.showLoading()
      try {
        const payLoad = {
          pRequestSec: {
            EumSecNoGroup: "10",
            NidProc: this.taskInfo.NidProc,
            SecretariatReceiver: null,
            SecretariatSummary: null,
            SecretariatTypeDesc: null,
            Sh_RequestSec: {
              EumSecNoGroup: "10",
              NidProc: this.taskInfo.NidProc,
              NidSec: "00000000-0000-0000-0000-000000000000",
              ReportPath: "/BuildingPolice/ZamaneEjrayeRai",
              SecDate: null,
              SecNo: null
            },
            Sh_RequestSec_List: null
          },
          pUser: this.currentUser,
          pDtoWorkflowData: null
        }
        const { data } = await this.$services.SI.saveRequestSec(
          payLoad,
          this.config
        )
        this.saveRequestSecRes = this.getResponse(data)
        if (this.saveRequestSecRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد.")
          console.log(data.SaveRequestSecResult)
        //   await this.log({
        //     action: this.logActions.save,
        //     bizCode: this.taskInfo.NidProc,
        //     bizCodeTitle: "NidProc"
        //   })
        }
      } catch (e) {
        this.serverError()
        console.error("error", e)
      } finally {
        this.hideLoading()
      }
    },
    async sabtVaSodor () {
      this.showLoading()
      try {
        const payLoad = {
          pRequestSec: {
            ErrorResult: null,
            EumSecNoGroup: "10",
            NidProc: this.taskInfo.NidProc,
            SecretariatReceiver: null,
            SecretariatSummary: null,
            SecretariatTypeDesc: null,
            Sh_RequestSec: {
              EumSecNoGroup: "10",
              NidProc: this.taskInfo.NidProc,
              NidSec: "00000000-0000-0000-0000-000000000000",
              ReportPath: "/BuildingPolice/ZamaneEjrayeRai",
              SecDate: null,
              SecNo: null
            },
            Sh_RequestSec_List: null
          },
          pUser: this.currentUser,
          pDtoWorkflowData: null
        }
        const { data } =
          await this.$services.SC.exportLetterOnArchiveAndMokatebat(
            payLoad,
            this.config
          )
        this.exportLetterOnArchiveAndMokatebatRes = this.getResponse(data)
        if (this.exportLetterOnArchiveAndMokatebatRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد.")
          console.log(data.ExportLetterOnArchiveAndMokatebatResult)
        //   await this.log({
        //     action: this.logActions.save,
        //     bizCode: this.taskInfo.NidProc,
        //     bizCodeTitle: "NidProc"
        //   })
        }
      } catch (e) {
        this.serverError()
        console.error("error", e)
      } finally {
        this.hideLoading()
      }
    },
    print () {
      // const reportPath =
      //   "/BuildingPolice/ZamaneEjrayeRaiParameter="
      // const queryParams = {
      //   NidImpart: this.model.ClsCommission_Impart.Commission_Impart.NidImpart,
      //   NidUser: this.getNidUser(),
      //   NidCommission: this.selectedRequest.NidProc
      // }
      // this.showReport(reportPath, queryParams)
      // await this.log({
      //   action: this.logActions.confirmOutput,
      //   bizCode: this.model.ClsCommission_Impart.Commission_Impart.NidImpart,
      //   bizCodeTitle: "NidImpart"
      // })
    }
  },
  computed: {
    config () {
      return {
        config: {
          District: this.taskInfo.District
        }
      }
    }
  }
}
</script>
