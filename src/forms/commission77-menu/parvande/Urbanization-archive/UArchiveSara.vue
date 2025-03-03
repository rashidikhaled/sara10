<template>
  <safa-form
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes"/>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          ref="baseNosaziCodeRef"
          @fetched="fetched"
          :actions="false"
        />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="گروه"
              domainName="CI_SaraM1"
              ciName="CI_ArchiveGroup"
              v-model="ciArchiveGroup"
              cdcName="CI_ArchiveGroup"
              label-width="60px"
              validations="required"
            />
          </FormControl>
          <div>
            <btn-search label="جستجو" @click="loadObj"/>
          </div>
        </FormRow>
        <div class="fit">
          <ArchiveWrap
            v-if="showArchive"
            :name="archiveConfig.username"
            :pass="archiveConfig.password"
            :biz-code="archiveBizCode"
          />
        </div>
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import commission77Mixin from "src/forms/commission77-menu/mixins/commission77Mixin.js"

export default {
  mixins: [baseFormMixin, commission77Mixin],

  data () {
    return {
      name: 'UArchiveSara',
      title: 'آرشیو شهرسازی',
      formKey: '2C6A6CA4-528C-4DAE-BAF4-AD76225E0B1B',
      main: true,
      showArchive: false,
      ciArchiveGroup: 0,
      nosaziCodeInfo: null,
      loadObjRes: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      archiveBizCode: ''
    }
  },
  computed: {
    archiveConfig () {
      if (!this.selectedDistrict) {
        // eslint-disable-next-line no-undef
        return window.getConfigValue('archiveCore')
      } else {
        // eslint-disable-next-line no-undef
        const districtConfig =
          window.getConfigValue('archiveCore').district || {}
        return districtConfig[this.selectedDistrict]
      }
    }
  },
  mounted () {
    if (this.isSelectedCommission77()) {
      this.$nextTick(() => {
        this.baseNosaziCode = convertStringToNosaziCodeObject(
          this.selectedCommission77.NosaziCode
        )
        this.$stKartable.dispatch("setSelectedRequest", this.selectedCommission77) // به دلیل ساختار فرم هدر که  ما حتما باید برای این بخش و فعلا فقط در این فرم مشاهده شده سلکت کارتابل رو هم به روز کنیم
      })
    } else {
      this.hideSidebar(this.name)
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
      // console.log(archiveStore)
    },
    async fetched (e) {
      await this.loadObj()
    },
    loadObj () {
      if (!this.baseNosaziCode) {
        return this.showError('لطفا کد نوسازی را انتخاب نمایید.')
      }
      if (!this.isValidForm()) return
      this.showLoading()
      console.log("getArchiveBizCodeFromNosaziCode payload", {
        pNosaziCode: { ...this.baseNosaziCode },
        pCI_ArchiveGroup: this.ciArchiveGroup
      })
      this.$services.commission77
        .getArchiveBizCodeFromNosaziCode({
          pNosaziCode: { ...this.baseNosaziCode },
          pCI_ArchiveGroup: this.ciArchiveGroup
        })
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.archiveBizCode =
              this.loadObjRes.data?.ArchiveBizCode
            this.updateArchiveBizCode(this.archiveBizCode)
            this.showArchive = true
            this.log({
              action: this.logActions.view,
              bizCode: this.selectedCommission77.NosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: this.selectedCommission77.NosaziCode
            })
          }
        })
        .catch((e) => {
          this.showArchive = false

          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
