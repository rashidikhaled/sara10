<template>
  <form-wrapper :title="title">
    <template v-slot:header>
      <form-header-by-nosazi-code
        v-model="baseNosaziCode"
        from-request
        lazy
        @fetched="fetched"
        ref="baseNosaziCode"
      />
    </template>
    <fit>
      <FormRow class="q-gutter-sm">
        <FormControl>
          <safa-combo
            v-model="selectedArchiveGrp"
            cdcName="selectedArchiveGrp"
            ciName="CI_ArchiveGroup"
            domainName="CI_SaraM1"
            label="گروه آرشیو"
            label-width="80px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="baseLibResults.Base_RegisterPlack_Str"
            cdcName="Base_RegisterPlack_Str"
            label="پلاک ثبتی"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-if="baseLibResults.ArchiveWrapper"
            v-model="baseLibResults.ArchiveWrapper.BizCode"
            label="کلید آرشیو"
          />
          <div v-else class="flex items-center">
            <span class="text-grey"
              ><q-icon color="amber" name="warning" size="xs" />&nbsp; اطلاعات
              کد نوسازی معتبر نمی باشد.</span
            >
          </div>
        </FormControl>
        <div v-if="showArchiveTajmi" class="flex items-center col-12 col-md-3">
          <span class="bg-red-2 text-dark">&nbsp; آرشیو تجمیعی</span>
        </div>
      </FormRow>
      <div v-if="archiveConfig && archiveConfig.username" class="fit">
        <ArchiveWrap
          v-if="showArchive"
          ref="archiveRef"
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          :biz-code="archiveBizCode"
          class="fit"
          style="min-height: 300px"
        />
      </div>
      <div v-else class="flex items-center full-height justify-center">
        <span class="text-grey"
          >عدم یافتن تنظیمات مرتبط با آرشیو ... ({{
            baseNosaziCode.District
          }})</span
        >
      </div>
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "آرشیو الکترونیک",
      name: "ArchivElectronic",
      formKey: "4714B2F1-5C3A-4631-B50A-4CE38068FC7C",
      sidebarCompatible: true,
      workflowCompatible: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      selectedArchiveGrp: 1,
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {}
      },
      resourcePermissionResult: null,
      resourceResult: null,
      ciResult: null,
      ciArchiveGroup: [],
      showArchive: false,
      showArchiveTajmi: false,
      archiveBizCode: ""
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line standard/computed-property-even-spacing
      return window.getConfig("archiveCore").district[
        (this.baseNosaziCode && this.baseNosaziCode.District) || 1
      ]
    }
  },
  methods: {
    changeNosazi (code) {
      console.log(code)
      // this.baseNosaziCode
    },
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },

    fetched (value) {
      if (value.IsExistInTajmi_ === true) {
        this.showArchiveTajmi = true
      } else {
        this.showArchiveTajmi = false
      }
      this.baseLibResults = value
      if (value.ArchiveWrapper) {
        this.updateArchiveBizCode(this.baseLibResults.ArchiveWrapper.BizCode)
        this.showArchive = true
      } else {
        this.showArchive = false
      }
    },
    // handelChangeCmb
    getArchiveWrapper () {
      this.showLoading()
      let payLoad = {
        pNidNosaziCode: this.baseLibResults.ArchiveWrapper.NidNosaziCode,
        pCI_ArchiveGroup: this.selectedArchiveGrp
      }
      this.$services.SA.getArchiveWrapper(payLoad, { config: { District: this.baseNosaziCode.District } })
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            this.updateArchiveBizCode(
              this.baseLibResults.ArchiveWrapper.BizCode
            )

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              nosaziCode: strNosaziCode,
              bizCodeArchive: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeTitle: "کد نوسازی",
              saveDesc: `بارگذاری اطلاعات آرشیو برای شماره درخواست ${strNosaziCode} انجام گردید.`
            })
            this.showArchive = true
          }
        })
        .catch((e) => {
          this.showArchive = false
          console.log("error", e)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  watch: {
    // selectedArchiveGrp() {
    //   this.fetched(value);
    // },
    archiveConfig () {
      /* const self = this
      this.$nextTick(function () {
        if (self.$refs.archiveRef) { self.$refs.archiveRef.login() }
        this.$forceUpdate()
      }) */
    }
  },
  mounted () {
    // this.getUserResourcePermissions()
    // this.getCiArciveType()
  }
}
</script>
