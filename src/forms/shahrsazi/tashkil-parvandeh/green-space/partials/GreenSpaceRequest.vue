<template>
  <form-wrapper hideTitle>
    <safa-status :result="sendRequestRes" />
    <safa-status :result="sendRequestAgainRes" />
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="نام مالک"
            label-width="120px"
            :label-shrink="true"
            v-model="model.FirstName"
            cdcName="FirstName"
            m="r"
            required
            validations="required"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام خانوادگی مالک"
            label-width="120px"
            :label-shrink="true"
            v-model="model.LastName"
            cdcName="LastName"
            m="r"
            required
            validations="required"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام پدر مالک"
            label-width="120px"
            :label-shrink="true"
            v-model="model.FatherName"
            cdcName="FatherName"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-if="eumOwnerCharacter === 2"
            label="کد اقتصادی مالک"
            label-width="120px"
            :label-shrink="true"
            v-model="model.NationalCode"
            cdcName="NationalCode"
            m="r"
          />
          <safa-text
            v-else
            label="کد ملی مالک"
            label-width="120px"
            :label-shrink="true"
            v-model="model.NationalCode"
            cdcName="NationalCode"
            m="r"
            type="number"
            required
            :validations="['required', validations.NationalCode]"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تلفن همراه مالک"
            label-width="120px"
            :label-shrink="true"
            v-model="model.MobileNo"
            cdcName="MobileNo"
            type="number"
            required
            validations="required"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label-width="120px"
            :label-shrink="true"
            label="پلاک ثبتی"
            v-model="model.PlatteNo"
            cdcName="PlatteNo"
            required
            validations="required"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد نوسازی"
            label-width="120px"
            :label-shrink="true"
            v-model="model.SdiCode"
            cdcName="SdiCode"
            m="r"
            required
            validations="required"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label-width="120px"
            :label-shrink="true"
            label="مساحت ملک"
            v-model="model.ProjectArea"
            cdcName="ProjectArea"
            type="number"
            required
            validations="required"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ارجاع درخواست شهرسازی"
            label-width="120px"
            :label-shrink="true"
            v-model="model.ReferenceNo"
            cdcName="ReferenceNo"
            m="r"
            required
            validations="required"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="پلاک آبی"
            label-width="120px"
            :label-shrink="true"
            v-model="model.Plack"
            cdcName="Plack"
            m="r"
          />
        </FormControl>
        <text-template
          label="نشانی"
          label-width="120px"
          :label-shrink="true"
          class="col-12"
          m="r"
          :rows="3"
          v-model="customAddress"
          cdcName="Address"
          required
          validations="required"
        />
      </FormRow>
    </fit>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-save v-if="requestNo" label="ارسال مجدد" @click="sendRequestAgain" />
        <btn-save v-else label="ارسال" @click="sendRequest" />
      </div>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import customValidation from "src/utils/customValidation"
export default {
  mixins: [baseFormMixin],
  props: {
    selectedRequestModel: Object,
    value: Object,
    config: Object,
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      sendRequestRes: null,
      sendRequestAgainRes: null,
      eumOwnerCharacter: 1,
      CutTreeConfig: {
        Username: "",
        Password: ""
      },
      model: {
        Address: "",
        FirstName: "",
        FatherName: "",
        LastName: "",
        MobileNo: "",
        NationalCode: "",
        PlatteNo: "",
        SdiCode: "",
        ReferenceNo: "",
        ProjectArea: "",
        RequestNo: "",
        Plack: "",
        Username: "",
        Password: "",
        SaraUserName: "",
        SaraUserID: ""
      },
      validations: {
        NationalCode: customValidation.nationalCode
      }
    }
  },
  computed: {
    requestNo () {
      return this.value?.Sh_CutTreeOwnRequest?.CutTreeOwnRequestNo ?? null
    },
    customAddress () {
      if (this.model.Plack === "" || this.isNullOrEmpty(this.model.Plack)) {
        return this.model.Address
      }
      return this.model.Address + " پلاک " + this.model.Plack
    }
  },
  mounted () {
    const conf = window.getConfigValue("esupParams").CutTreeConfig ?? null
    this.CutTreeConfig = {
      Username: conf && conf.CutTreeUsername ? conf.CutTreeUsername : null,
      Password: conf && conf.CutTreePassword ? conf.CutTreePassword : null
    }
    this.normalizedModel()
  },
  methods: {
    isNullOrEmpty: (val) => val === "" || val === null || val === undefined, // isNaN(val),
    normalizedModel () {
      const res = this.selectedRequestModel
      if (Array.isArray(res.Base_RegisterPlack)) {
        const list =
          res.Base_RegisterPlack?.sort((a, b) =>
            a.CI_RegisterPlackTypeGroup > b.CI_RegisterPlackTypeGroup ? 1 : -1
          ) ?? []
        const str =
          list.map((x) => x.RegisterPlackTypeValue)?.join(" - ") ?? ""
        this.model.PlatteNo = str ?? ""
      }
      this.$nextTick(() => {
        this.model.SdiCode = this.selectedRequest?.BizCode?.trim() ?? ""
        this.model.ReferenceNo = this.selectedRequest?.NidWorkItem ?? null
        this.model.Plack = res?.Base_CommonEstate_Address?.Plack ?? "" // پلاک آبی
        this.model.Address = res?.Base_AddressInfo?.MainAddress?.trim() ?? ""

        const owner = res?.Base_Owner ?? null
        if (Array.isArray(owner) && owner.length > 0) {
          let _o = owner[0]
          this.eumOwnerCharacter = _o?.EumOwnerCharacter ?? 1
          this.model.FirstName = this.toTrim(_o?.OwnerName ?? '')
          this.model.FatherName = this.toTrim(_o?.OwnerFatherName ?? '')
          this.model.LastName = this.toTrim(_o?.OwnerLastName ?? '')
          this.model.NationalCode = this.toTrim(_o?.NationalCode ?? '')
          this.model.MobileNo = this.toTrim(_o.CellPhone ?? '')
        }
      })
    },
    toTrim (v) {
      if (typeof v === "string") {
        return v?.trim()
      } else return v ?? ""
    },
    sendRequest () {
      if (
        this.CutTreeConfig.Username === null ||
        this.CutTreeConfig.Password === null
      ) {
        this.showError(
          "تنظیمات برنامه به درستی انجام نشده است. لطفا با پشتیبان برنامه تماس حاصل فرمایید."
        )
        console.error("تنظیمات نام کاربری و رمزعبور به درستی انجام نشده است.")
        return
      }
      if (!this.isValidForm()) return
      this.showLoading()
      this.model = {
        ...this.model,
        Username: this.CutTreeConfig.Username,
        Password: this.CutTreeConfig.Password,
        PlatteNo: this.model.PlatteNo || 0,
        ProjectArea: this.model.ProjectArea || 2,
        SaraUserName: this.getUserDisplayName(),
        SaraUserID: this.getNidUser()
      }
      let payload = {
        pCutTreeOwnRequestDTO: this.model
      }
      this.$services.SC.saveShCutTreeOwnRequest(payload, this.config)
        .then(async ({ data }) => {
          this.sendRequestRes = this.getResponse(data)
          if (this.sendRequestRes.success) {
            this.value = this.sendRequestRes.data
            if (this.value.Sh_CutTreeOwnRequest) {
              this.showError(this.value.Sh_CutTreeOwnRequest.CutTreeOwnTitle)
            } else {
              await this.log({
                action: this.logActions.save,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `ثبت درخواست فضای سبز برای شماره پرونده ${this.selectedRequest.NidWorkItem} انجام گردید.`
              })
              this.$emit("sendRequestDone")
            }
          }
        })
        .catch((e) => {
          console.error("error", e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async sendRequestAgain () {
      if (
        this.CutTreeConfig.Username === null ||
        this.CutTreeConfig.Password === null
      ) {
        this.showError(
          "تنظیمات برنامه به درستی انجام نشده است. لطفا با پشتیبان برنامه تماس حاصل فرمایید."
        )
        console.error("تنظیمات نام کاربری و رمزعبور به درستی تنظیم نشده است")
        return
      }
      try {
        if (!this.isValidForm()) return
        if (!this.requestNo) {
          return this.showError("شماره درخواست معتبر نمی باشد.")
        }
        this.showLoading()
        let payload = {
          Username: this.CutTreeConfig.Username,
          Password: this.CutTreeConfig.Password,
          RequestNo: this.requestNo
        }
        // console.log('payload :>> ', payload)
        // debugger
        const { data } = await this.$services.SC.processRecirculationCutTreeOwn(
          payload,
          this.config
        )
        this.sendRequestAgainRes = this.getResponse(data)
        if (this.sendRequestAgainRes.success) {
          let res = this.sendRequestAgainRes.data
          if (
            res &&
            res.ProcessRecirculationCutTreeOwnResponse &&
            res.ProcessRecirculationCutTreeOwnResponse.Data !== {}
          ) {
            this.showError(
              `${
                res?.ProcessRecirculationCutTreeOwnResponse?.Data?.Code ?? ""
              }: ${
                res?.ProcessRecirculationCutTreeOwnResponse?.Data?.Sentence ??
                ""
              }`
            )
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
