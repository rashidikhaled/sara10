<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <fit>
    <safa-status :result="getInfoRes" />
    <safa-status :result="saveInfoRes" />
    <safa-tabs :padding="false" fit class="fit" v-model="activeTab">
      <template v-slot:tabs>
          <tab-menu name="mergeTwoArchiveCode" label="ادغام آرشیو" />
          <tab-menu name="mergeTwoArchiveHistory" label="تاریخچه ادغام آرشیو" />

      </template>
      <tab-content name="mergeTwoArchiveCode">
        <form-wrapper :title="title">
          <template v-slot:header>
            <safa-status :result="requestResult"/>
            <safa-status :result="mergeArchiveBizCodeRes"/>
            <safa-status :result="getArchiveMergeHistoryRes"/>
            <formHeaderByNosaziCode v-model="baseNosaziCode" @fetched="fetched"/>
          </template>
          <FormRow>
            <FormControl>
              <safa-combo
                v-model="selectedArchiveGrp"
                cdcName="CI_ArchiveGroup"
                ciName="CI_ArchiveGroup"
                domainName="CI_SaraM1"
                label="گروه آرشیو"
                label-width="80px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="baseLibResults.ArchiveWrapper.BizCode"
                cdcName="BizCode"
                label="کلید اصلی آرشیو"
                label-width="80px"
                m="r"
                validations="required"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="newBizCode"
                cdcName="newBizCode"
                label="کلید آرشیو جهت ادغام"
                label-width="80px"
                validations="required"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="newOwnerName"
                cdcName="name"
                label="نام مالک"
                label-width="80px"
                m="r"
              >
                <template v-slot:append>
                  <q-icon
                    class="cursor-pointer"
                    color="primary"
                    name="search"
                    size="xs"
                    style="position: relative; right: 5px"
                    title="جستجوی مالک"
                    @click="handleOwnerClick"
                  />
                </template>
              </safa-text>
            </FormControl>
            <safa-text
              v-model="newAddress"
              cdcName="address"
              class="col-12"
              label="آدرس"
              label-width="80px"
              m="r"
              type="textarea"
            />
          </FormRow>
          <template v-slot:footer>
            <btn-default label="ادغام" @click="mergeBizCode"/>
          </template>
        </form-wrapper>

        <safa-popup v-model="showArchiveBizCodeSearch" title="جستجوی کلید آرشیو">
          <ArchiveBizCodeSearch
            v-model="baseNosaziCode"
            :selectedArchiveGrp="selectedArchiveGrp"
            @getNewBaseNosaziCode="getNewBaseNosaziCode"
          />
        </safa-popup>
      </tab-content>
      <tab-content name="mergeTwoArchiveHistory">
        <fit>
          <safa-grid
          :columns="archiveMergeHistoryColumns"
          fit
          :suppressRowClickSelection="false"
          title="تاریخچه ادغام آرشیو"
          min-height="250px"
          height="100%"
          max-height="100%"
          m="r"
          v-model="archiveMergeHistory"
          :allowMultipleSelection="false"
        />
        </fit>
      </tab-content>
    </safa-tabs>
  </fit>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import ArchiveBizCodeSearch from './partials/ArchiveBizCodeSearch.vue'

export default {
  components: { ArchiveBizCodeSearch },
  mixins: [baseFormMixin],
  data () {
    return {
      name: 'MergeTwoArchiveCode',
      title: 'ادغام دو کلید آرشیو',
      formKey: '8c5239a6-7262-43b9-9015-e5d8ad2a458a',
      main: true,
      activeTab: 'mergeTwoArchiveCode',
      sidebarCompatible: true,

      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibResults: { ArchiveWrapper: { BizCode: '' } },
      requestResult: null,
      mergeArchiveBizCodeRes: null,
      getArchiveMergeHistoryRes: null,
      archiveMergeHistory: [],
      archiveMergeHistoryColumns: [
        {
          field: "SourceBizCode",
          title: "بیز کد مبدا",
          width: 130
        },
        {
          field: "SourceDomain",
          title: "دامنه مبدا",
          width: 130
        },
        {
          field: "DestinationBizCode",
          title: "بیز کد مقصد",
          width: 130
        },
        {
          field: "DestinationDomain",
          title: "دامنه مقصد",
          width: 130
        },
        {
          field: "MergeDate",
          title: "تاریخ ادغام",
          editor: "date",
          width: 115
        },
        {
          field: "MergeTime",
          title: "زمان ادغام",
          width: 115
        }
      ],
      archiveWrapperResult: null,
      selectedArchiveGrp: null,
      newBizCode: '',
      newOwnerName: '',
      newAddress: '',
      showArchiveBizCodeSearch: false,
      isView: false
    }
  },
  methods: {
    mergeBizCode () {
      if (this.newBizCode === '') {
        this.showError('لطفا کلید آرشیو را وارد کنید.')
      } else {
        this.showConfirm('آیا از ادغام دو کلید آرشیو اطمینان دارید؟').onOk(
          () => {
            this.mergeArchiveBizCode()
          }
        )
      }
    },
    fetched (val) {
      this.baseLibResults = val
      if (val.ArchiveWrapper) {
        this.selectedArchiveGrp =
          this.baseLibResults.ArchiveWrapper &&
          this.baseLibResults.ArchiveWrapper.CI_ArchiveGroup
        this.getArchiveMergeHistory()
      }
    },
    getArchiveWrapper () {
      this.showLoading()
      let payLoad = {
        pNidNosaziCode:
          (this.baseLibResults.ArchiveWrapper &&
            this.baseLibResults.ArchiveWrapper.NidNosaziCode) ||
          '',
        pCI_ArchiveGroup: this.selectedArchiveGrp
      }
      this.$services.SA.getArchiveWrapper(payLoad, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.archiveWrapperResult = this.requestResult.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: strNosaziCode,
                nosaziCode: strNosaziCode,
                bizCodeArchive:
                  (this.archiveWrapperResult.ArchiveWrapper &&
                    this.archiveWrapperResult.ArchiveWrapper.BizCode) ||
                  '',
                bizCodeTitle: 'کد نوسازی'
              })
            }
            this.isView = true
          }
        })
        .catch((err) => {
          this.serverError()
          console.log('error', err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    mergeArchiveBizCode () {
      if (!this.isValidForm()) return
      const payLoad = {
        pDomainArchive: this.baseNosaziCode.District,
        pBizCode_Main: this.baseLibResults.ArchiveWrapper.BizCode,
        pBizCode_ForMerge: this.newBizCode
      }

      this.showLoading()
      this.$services.SC.mergeArchiveBizCode(payLoad, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.mergeArchiveBizCodeRes = this.getResponse(data)
          if (this.mergeArchiveBizCodeRes.success) {
            this.resetValidation()
            this.showSuccess('ادغام آرشیو با موفقیت انجام شد.')
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeArchive:
                (this.archiveWrapperResult.ArchiveWrapper &&
                  this.archiveWrapperResult.ArchiveWrapper.BizCode) ||
                '',
              bizCodeTitle: 'baseNosaziCode'
            })
          }
        })
        .catch((err) => {
          this.serverError()
          console.log('error', err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getArchiveMergeHistory () {
      const payLoad = {
        pNidNosaziCode:
          (this.baseLibResults.ArchiveWrapper &&
            this.baseLibResults.ArchiveWrapper.NidNosaziCode) ||
          ''
      }

      this.showLoading()
      this.$services.SC.getArchiveMergeHistory(payLoad, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.getArchiveMergeHistoryRes = this.getResponse(data)
          if (this.getArchiveMergeHistoryRes.success) {
            this.archiveMergeHistory = this.getArchiveMergeHistoryRes.data.ArchiveMergeHistory
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              nosaziCode: strNosaziCode,
              bizCodeArchive:
                  (this.archiveWrapperResult.ArchiveWrapper &&
                    this.archiveWrapperResult.ArchiveWrapper.BizCode) ||
                  '',
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
        .catch((err) => {
          this.serverError()
          console.log('error', err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleOwnerClick () {
      if (this.baseLibResults.ArchiveWrapper.BizCode === '') {
        return this.showError('لطفا کد نوسازی را وارد نمایید.')
      }
      this.showArchiveBizCodeSearch = true
    },
    getNewBaseNosaziCode (e) {
      console.log(e, 'getNewData')
      this.newBizCode = e.newBizCode || ''
      this.newOwnerName = e.newOwnerName || ''
      this.newAddress = e.newAddress || ''
      this.showArchiveBizCodeSearch = false
    }
  },
  watch: {
    selectedArchiveGrp () {
      if (this.baseNosaziCode.District !== 0) {
        this.getArchiveWrapper()
      }
    }
  }
}
</script>
