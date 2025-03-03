<template>
  <fit>
    <safa-status :result="loadObjRes" />
    <FormRow>
      <FormControl>
        <nosazi-code-input
          v-model="baseNosaziCode"
          label="کد نوسازی"
          label-width="100px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <q-separator class="q-my-sm" />
    <div v-if="archiveConfig && archiveConfig.username" class="fit">
      <ArchiveWrap
        v-if="showArchive"
        ref="archiveRef"
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :biz-code="archiveBizCode"
        class="fit"
        style="min-height: 300px"
      ></ArchiveWrap>
    </div>
    <div v-else class="flex items-center full-height justify-center">
      <span class="text-grey"
      >عدم یافتن تنظیمات مرتبط با آرشیو ... ({{
          baseNosaziCode.District
        }})</span
      >
    </div>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveEngineer")
    },
    config () {
      return { config: { District: this.value?.District || 1 } }
    }
  },

  data () {
    return {
      // #services
      loadObjRes: null,
      archiveBizCode: "",

      // #variables
      baseLibResults: null,
      CommentReport: "",
      showArchive: false,
      baseNosaziCode: {
        District: 1,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  mounted () {
    console.log(this.value.CodeString)
    this.baseNosaziCode = convertStringToNosaziCodeObject(this.value.CodeString)
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
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
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(payload, this.config)
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.baseLibResults = this.loadObjRes.data
            if (this.baseLibResults.ArchiveWrapper) {
              this.showArchive = true
              this.updateArchiveBizCode(
                this.baseLibResults.ArchiveWrapper.BizCode
              )
            } else this.showArchive = false
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

    updateArchiveBizCode (bizCode) {
      this.archiveBizCode = bizCode
    }
  }
}
</script>
