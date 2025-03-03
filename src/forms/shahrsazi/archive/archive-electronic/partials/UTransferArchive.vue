<template>
  <form-wrapper>
    <safa-status :result="getBaseLibRes" />
    <safa-status :result="getArchiveWrapperRes" />
    <safa-status :result="transferAsyncRes" />
    <fit>
      <FormRow class="q-mb-sm">
        <nosazi-code-input
          label="کدنوسازی جدید"
          label-width="80px"
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @enter="loadObj"
        />
      </FormRow>
      <FormRow>
        <FormControl>
          <safa-text
            v-model="ownerName"
            cdcName="ownerName"
            label="نام مالک"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="address"
            cdcName="address"
            label="آدرس"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="basePreCodes"
            cdcName="Base_RegisterPlack_Str"
            label="کد قدیم"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="selectedArchiveGrp"
            cdcName="selectedArchiveGrp"
            ciName="CI_ArchiveGroup"
            domainName="CI_SaraM1"
            label="گروه آرشیو"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.ArchiveWrapper.BizCode"
            cdcName="Base_RegisterPlack_Str"
            label="کلید آرشیو"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.Base_RegisterPlack_Str"
            cdcName="Base_RegisterPlack_Str"
            label="پلاک ثبتی"
            label-width="80px"
            m="r"
          />
        </FormControl>
      </FormRow>
      <!-- <div
        v-if="
          getBaseLibRes?.data?.ArchiveWrapper?.BizCode &&
          archiveConfig &&
          archiveConfig.username
        "
        class="fit"
      >
        <ArchiveWrap
          ref="archiveRef"
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          :biz-code="archiveBizCode"
          class="fit"
          style="max-height: 10px; opacity: 0"
        />
      </div> -->
      <!-- <div v-else class="flex items-center full-height justify-center">
        <span class="text-grey"
          >عدم یافتن تنظیمات مرتبط با آرشیو ... ({{
            baseNosaziCode.District
          }})</span
        >
      </div> -->
    </fit>

    <template #footer>
      <div class="q-gutter-sm">
        <btn-save
          label="انتقال آرشیو به کدنوسازی جدید"
          :disable="!isSearched"
          @click="saveObj"
        />
        <btn-cancel label="انصراف" @click="$emit('hide')" />
      </div>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import { StringHelper } from 'ui-security'
export default {
  mixins: [baseFormMixin],
  props: {
    oldBizCode: {
      type: String,
      default: ""
    },
    token: String,
    selectedArchiveGrp: {
      type: Number,
      default: 1
    },
    title: String,
    formKey: String
    // name: String
  },

  data () {
    return {
      name: "UTransferArchive",
      isSearched: false,
      showTransferModal: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      ownerName: "",
      address: "",
      model: {
        ArchiveWrapper: {
          BizCode: null
        },
        Base_RegisterPlack_Str: ""
      },
      getBaseLibRes: null,
      getArchiveWrapperRes: null,
      transferAsyncRes: null,
      getBaseLibResult: null,

      archiveBizCode: ""
    }
  },

  methods: {
    async loadObj (val) {
      this.baseNosaziCode = val
      try {
        const payload = {
          pNosaziCode: {
            Apartment: this.baseNosaziCode.Apartment,
            Block: this.baseNosaziCode.Block,
            Building: this.baseNosaziCode.Building,
            CI_City: 0,
            District: this.baseNosaziCode.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House: this.baseNosaziCode.House,
            IsRoot: false,
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            Region: this.baseNosaziCode.Region,
            Shop: this.baseNosaziCode.Shop
          },
          pLoadFunc:
            "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode",
          pIsLoadDeletedNosaziCode: false
        }
        this.showLoading()
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          payload,
          { config: { District: this.baseNosaziCode.District } }
        )
        this.getBaseLibRes = this.getResponse(data)
        if (this.getBaseLibRes.success) {
          this.getBaseLibResult = this.getBaseLibRes.data
          this.ownerName =
            this.getBaseLibResult.Base_Owner &&
            this.getBaseLibResult.Base_Owner.length > 0
              ? this.getBaseLibResult.Base_Owner[0].OwnerName ||
                "" + " " + this.getBaseLibResult.Base_Owner[0].OwnerLastName
              : ""
          this.address =
            this.getBaseLibResult?.Base_AddressInfo?.MainAddress ?? ""
          this.isSearched = true
          await this.getArchiveWrapper(
            this.getBaseLibResult.ArchiveWrapper.NidNosaziCode
          )
          // await this.updateArchiveBizCode(res.ArchiveWrapper.BizCode)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async getArchiveWrapper (pNidNosaziCode) {
      try {
        const payload = {
          pNidNosaziCode,
          pCI_ArchiveGroup: this.selectedArchiveGrp
        }
        const { data } = await this.$services.SA.getArchiveWrapper(payload,
          { config: { District: this.baseNosaziCode.District } }
        )
        this.getArchiveWrapperRes = this.getResponse(data)
        if (this.getArchiveWrapperRes.success) {
          this.model = this.getArchiveWrapperRes.data
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },

    async updateArchiveBizCode (bizCode) {
      this.archiveBizCode = bizCode
    },

    saveObj () {
      const oldCode = this.oldBizCode ?? ""
      const newCode = this.getBaseLibResult?.ArchiveWrapper?.BizCode ?? ""
      if (oldCode === "") {
        return this.showError("کدنوسازی مبدا به درستی انتخاب نشده است.")
      }
      if (newCode === "") {
        return this.showError("کدنوسازی مقصد به درستی انتخاب نشده است.")
      }

      this.showConfirm(`آیا از انتقال آرشیو اطمینان دارید؟`).onOk(async () => {
        try {
          const BizCode = oldCode,
            DestBizCode = newCode
          this.showLoading()

          // const archiveToken = await this.$store.dispatch(
          //   "archiveApi/fetchToken",
          //   this.archiveConfig
          // )

          // const archiveAuth = 'bearer ' + archiveToken; // archiveToken by second login and get archiveToken from Store

          // eslint-disable-next-line no-undef
          const archiveAuth = archiveStore.archiveToken // by first login *resolve : #1798

          const url = `${this.$store.getters["archiveApi/baseUrl"]}Archive/TransferBizcodeFiles`
          // const body = JSON.stringify({ BizCode, DestBizCode })
          const body = {
            pdata1: new StringHelper().convert({ BizCode, DestBizCode })
          }
          const headers = new Headers()
          headers.append("Content-Type", "application/json")
          headers.append("Authorization", archiveAuth)
          const result = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers
          })
          const res = await result.json()
          if (res.success) {
            this.transferAsyncRes = this.getResponse(res.data)
            if (this.transferAsyncRes.success) {
              this.showError("عملیات انتقال آرشیو با موفقیت انجام گردید.")
              const strNosazi =
                convertNosaziCodeObjectToString(this.baseNosaziCode) ?? ""
              await this.log({
                action: this.logActions.transfer,
                bizCode: BizCode,
                bizCodeTitle: "BizCode",
                bizCodeArchive: DestBizCode ?? "",
                nosaziCode: strNosazi,
                saveDesc: `عملیات انتقال آرشیو برای ${strNosazi.split("-").reverse().join("-") ?? ''} با موفقیت انجام گردید`
              })
              this.$emit("hide")
              this.$emit("transfer")
            }
          } else {
            await this.$store.dispatch(
              "archiveApi/resetToken",
              this.archiveConfig
            )
            this.showError(res.errors[0].message)
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      })
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line standard/computed-property-even-spacing
      return window.getConfig("archiveCore")
    },
    archiveToken () {
      const { username = "", password = "" } = this.archiveConfig ?? {}
      console.log(username, password)
      const key = `${username}:${password}`
      return this.$store.getters["archiveApi/getTokens"][key] ?? ""
    },
    basePreCodes () {
      const tmp = this.model ?? {}
      if (tmp && tmp.Base_PreCodeInfo) {
        return (
          tmp.Base_PreCodeInfo.map((x) => x.PreCode || "")
            .map((x) => x.split("-").reverse().join("-"))
            .join("، ")
            .toString() || "---"
        )
      } else return "---"
    }
  }
}
</script>
