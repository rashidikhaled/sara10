<template>
  <div
    :class="$attrs.class"
    class="nosazi-header flex items-center no-wrap ellipsis justify-between"
    v-if="!hideNosaziCodeHeader"
  >
    <div
      class="ellipsis"
      style="flex-grow: 1; min-width: 0"
      :title="headerInfo"
    >
      <div
        class="header-ticker ellipsis flex items-center"
        :class="{ 'has-ticker': headerInfo.length > 200 }"
      >
        <div class="text-no-wrap inline-block ticker_text">
          {{ headerInfo }}
        </div>
      </div>
    </div>
    <div class="flex items-center no-wrap" v-if="isMobile">
      <nosazi-code-input
        v-bind="nosaziAttrs"
        :loading="loading"
        :invalidDistrict="invalidDistrict"
        :m="m === 'r' || disabled || forceReadonly ? 'r' : 'e'"
        :value="nosaziCode"
        @input="updateCode"
        @enter="raisedEnter"
        ref="nosaziInput"
      />
      <q-btn
        title="جستجوی کدنوسازی"
        flat
        round
        size="11px"
        icon="search"
        color="primary"
        @click="raisedBtn(nosaziCode)"
      />
    </div>
    <div style="flex-shrink: 1" v-else>
      <nosazi-code-input
        v-bind="nosaziAttrs"
        :loading="loading"
        :invalidDistrict="invalidDistrict"
        :m="m === 'r' || disabled || forceReadonly ? 'r' : 'e'"
        :value="nosaziCode"
        @input="updateCode"
        @enter="raisedEnter"
        ref="nosaziInput"
      />
    </div>
    <safa-status v-if="result" :result="result" />
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "NosaziCodeFormHeader",
  mixins: [baseFormMixin],
  inheritAttrs: false,
  props: {
    m: String,
    disabled: Boolean,
    value: {
      type: [Object, String],
      default: ""
    },
    fromRequest: {
      type: Boolean,
      default: true
    },
    EumNosaziCodeGroup: {
      type: Number,
      default: 0
    },
    lazy: Boolean,
    isLoadDeletedNosaziCode: {
      type: Boolean,
      default: false
    },
    pLoadFunc: {
      type: String,
      default:
        "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo,Sh_RequestInfo"
    },
    extraPayload: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      baseLibInNosaziCode: null,
      NidLib: null,
      loading: false,
      invalidDistrict: false,
      result: null,
      nosaziCode: "0-0-0-0-0-0-0"
    }
  },
  computed: {
    isMobile () {
      return ["mobile", "cordova"].some((e) => this.$q.platform.is[e])
    },
    hideNosaziCodeHeader () {
      let isHide = false
      let parent = this.$parent
      for (let i = 0; i < 10; i++) {
        if (!parent) break
        if (
          Object.keys(parent.$attrs).length > 0 &&
          parent.$attrs.hideNosaziCodeHeader
        ) {
          isHide = true
          break
        } else {
          parent = parent.$parent
        }
      }
      return isHide
    },
    headerInfo () {
      if (
        !this.baseLibInNosaziCode ||
        this.baseLibInNosaziCode === {} ||
        Object.keys(this.baseLibInNosaziCode).length === 0
      ) {
        return "مشخصات مالک: ---"
      }

      const data = {
        ownerName: "",
        address: "",
        preCodeInfo: ""
        // workflowTitel:'',
      }
      // WorkflowTitel
      // if (this.NidLib.RRequest) {
      //   if (this.NidLib.RRequest.WorkflowTitel !== null) {
      //         data.workflowTitel = this.NidLib.RRequest.WorkflowTitel
      //       }
      //       }

      // address
      if (this.baseLibInNosaziCode.Base_AddressInfo) {
        if (this.baseLibInNosaziCode.Base_AddressInfo.MainAddress !== null) {
          data.address = this.baseLibInNosaziCode.Base_AddressInfo.MainAddress
        }
      }
      if (
        this.baseLibInNosaziCode.Base_CommonEstate_Address &&
        this.baseLibInNosaziCode.Base_CommonEstate_Address.Plack
      ) {
        if (this.baseLibInNosaziCode.Base_CommonEstate_Address.Plack !== null) {
          data.address +=
            " پلاک: " +
            this.baseLibInNosaziCode.Base_CommonEstate_Address.Plack
        }
      }
      if (
        this.baseLibInNosaziCode.Base_CommonEstate_Address &&
        this.baseLibInNosaziCode.Base_CommonEstate_Address.Vahed
      ) {
        if (this.baseLibInNosaziCode.Base_CommonEstate_Address.Vahed !== null) {
          data.address +=
            " واحد: " +
            this.baseLibInNosaziCode.Base_CommonEstate_Address.Vahed
        }
      }

      // owner name
      if (Array.isArray(this.baseLibInNosaziCode.Base_Owner)) {
        data.ownerName = this.baseLibInNosaziCode.Base_Owner.map(
          (x) => `${x.OwnerName} ${x.OwnerLastName}`
        ).join(" - ")
      }

      // previous code
      /* if (Array.isArray(this.baseLibInNosaziCode.Base_PreCodeInfo)) {
        data.preCodeInfo = this.baseLibInNosaziCode.Base_PreCodeInfo
          .map(x => x.PreCode || '')
          .map(x => x.split('-').reverse().join('-'))
          .join('، ')
      } */

      const result = []
      // if (data.workflowTitel) result.push(`نوع درخواست: ${data.workflowTitel}`)
      if (data.ownerName) result.push(`نام مالک: ${data.ownerName}`)
      if (data.address) result.push(`آدرس: ${data.address}`)
      return result.join(" , ")
    },
    nosaziAttrs () {
      const internalAttrs = this.$attrs
      if (typeof internalAttrs.class !== "undefined") {
        internalAttrs.class = undefined
      }

      return internalAttrs
    }
  },
  methods: {
    updateCode (code) {
      this.nosaziCode = code
      this.accessValidation(this.nosaziCode)
      if (!this.lazy) {
        this.emitValue(code)
      }
    },
    isValidNosaziCode (baseNosaziCode) {
      if (typeof baseNosaziCode !== "object") return false
      return !!(
        baseNosaziCode &&
        baseNosaziCode.District &&
        baseNosaziCode.Region &&
        baseNosaziCode.Block
      )
    },
    accessValidation (baseNosaziCode) {
      try {
        this.invalidDistrict = false
        const nosaziCode = this.convertToNosaziCodeString(baseNosaziCode)
        const hasAccess = (
          this.currentUser.jobLocation || this.currentUser.JobLocation
        )?.allowDomains
          ?.split(",")
          ?.some((x) => nosaziCode.substring(nosaziCode.indexOf("-"), 0) === x)
        if (hasAccess === false) {
          this.invalidDistrict = true
          return false
        } else {
          return true
        }
      } catch (error) {
        console.log(error)
      }
    },
    raisedEnter (code) {
      this.nosaziCode = code
      this.$emit("enter", this.nosaziCode)
      if (this.lazy) {
        this.emitValue()
      }
      this.load()
    },
    async load () {
      const codeObj = this.convertToNosaziCodeObject(this.nosaziCode)

      if (!this.isValidNosaziCode(codeObj)) {
        if (this.$refs.nosaziInput.enabled === "1-1-1-1-1-1-1") {
          this.showError("کد نوسازی بدرستی تنظیم نشده است.")
        }
        return
      }
      if (this.accessValidation(this.nosaziCode) === false) {
        this.showError("کد انتخاب شده در محل خدمت کاربر نمی باشد.")
        return
      }
      try {
        this.loading = true
        /* this.showLoading({
          message: 'در حال بارگذاری هدر کد نوسازی'
        }) */
        // this.hasFetchedData = false
        // Fetch Request Header
        // console.log("getBaseLibInNosaziCode::codeObj", codeObj)
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          {
            pNosaziCode: {
              CI_City: 0,
              EumBaseInfoGroup: 0,
              EumNosaziCodeGroup: this.EumNosaziCodeGroup,
              EumNosaziCodeObjType: 0,
              EumRevisitGroup: 0,
              IsRoot: "false",
              NidBase: "00000000-0000-0000-0000-000000000000",
              NidNosaziCode: "00000000-0000-0000-0000-000000000000",
              ...codeObj
            },
            pLoadFunc: this.pLoadFunc,
            pIsLoadDeletedNosaziCode: this.isLoadDeletedNosaziCode
          },
          // this.config
          {
            config: {
              District: codeObj.District
            }
          }
        )
        // console.log("getBaseLibInNosaziCode::response", codeObj.District)
        this.result = this.getResponse(data)
        if (!this.result.success) {
          this.baseLibInNosaziCode = null
          this.$emit("error", {
            errors: this.result.errors,
            data: codeObj
          })
          // this.showError(this.result.errors[0].text);
          return
        }
        /* if (this.result.success !== true) {
          // this.showError('اطلاعات کدنوسازی بارگذاری نشد')
          return
        } else {
          // const NosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
          // await this.log({
          //   action: this.logActions.view,
          //   bizCode: NosaziCode,
          //   bizCodeTitle: 'NosaziCode'
          // })
        } */
        this.baseLibInNosaziCode = this.result.data
        // this.$emit('input', codeObj)
        this.$emit("fetched", {
          ...(this.baseLibInNosaziCode || {}),
          nosaziCodeObject: this.convertToNosaziCodeObject(this.nosaziCode),
          nosaziCodeString: this.convertToNosaziCodeString(this.nosaziCode),
          success: this.result.success
        })

        // end1
      } catch (ex) {
        console.log("error ..........", ex)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.loading = false
      }
    },
    emitValue () {
      if (typeof this.value === "string") {
        this.$emit("input", this.convertToNosaziCodeString(this.nosaziCode))
      } else {
        this.$emit("input", this.convertToNosaziCodeObject(this.nosaziCode))
      }
    },
    raisedBtn (nosaziCode) {
      this.raisedEnter(nosaziCode)
    },
    async getSettingData () {
      try {
        const result = await this.loadFormSetting("Sharsazi-PersonalSetting")
        if (
          this.selectedRequest === null &&
          result &&
          result.PersonalSettingNosazi
        ) {
          this.nosaziCode = {
            ...this.nosaziCode,
            District:
              parseInt(result.PersonalSettingNosazi.DefaultDistrict) || 0,
            Region: parseInt(result.PersonalSettingNosazi.DefaultRegion) || 0
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  beforeMount () {
    this.$nextTick(function () {
      const { BizCode, NosaziCode } = this.selectedRequest || {}
      if (this.fromRequest && (BizCode || NosaziCode)) {
        this.nosaziCode = BizCode || NosaziCode
        this.emitValue()
        setTimeout(this.load, 700)
      }
    })
    /* else if (this.isValidNosaziCode(this.value)) {
      this.baseNosaziCode = this.value
      // this.load()
    } */
  },
  async created () {
    await this.getSettingData()
  },

  mounted () {},
  watch: {
    value: {
      handler () {
        this.nosaziCode = this.convertToNosaziCodeString(this.value)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.nosazi-header {
  .nosazicode-box input[type="number"],
  .nosazicode-box .nosazi-disabled-input {
  }
}

.ticker_text {
  transform: translateX(0);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
}

.header-ticker.has-ticker:hover .ticker_text {
  animation: ticker 20s infinite linear;
  text-overflow: unset;
  text-overflow: fade;
  white-space: nowrap;
  overflow: visible;
  max-width: none;
}

@media only screen and (max-width: 550px) {
  .minimialScreen .form-title {
    display: none !important;
  }
  .header--section {
    padding: 5px;
  }
  .n-action-wrap {
    display: none;
  }
}

@keyframes ticker {
  100% {
    transform: translateX(-100%);
  }
}
</style>
