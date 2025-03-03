<template>
  <safa-form :id="formKey" :caption="title" app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="saveResult" />
      </template>
      <fit>
        <div>
          <FormRow class="q-mb-sm" :xs="2" :sm="2">
            <FormControl>
              <safa-combo v-model="selectedRegion" :options="districts" label="منطقه" :use-input="false"
                source-type="local" label-width="95px"></safa-combo>
            </FormControl>
            <FormControl>
              <btn-default label="انتخاب از نقشه" @click="selectFromMap" />
            </FormControl>
          </FormRow>
          <FormRow class="q-mb-sm" :xs="2" :sm="2">
            <FormControl>
              <safa-text v-model="results.ZabeteStatic_Info.P_Name" m="r" label="عنوان" label-width="95px" />
            </FormControl>
            <FormControl>
              <safa-text v-model="results.ZabeteStatic_Info.LayerName_EN" m="r" label="نام لاتین لایه"
                label-width="95px" />
            </FormControl>
            <FormControl>
              <safa-text v-model="results.ZabeteStatic_Info.LayerName_FA" m="r" label="نام فارسی لایه"
                label-width="95px" />
            </FormControl>
            <FormControl>
              <safa-text v-model="results.ZabeteStatic_Info.P_Key" m="r" label="کلید" label-width="95px" />
            </FormControl>
            <FormControl>
              <safa-text v-model="results.ZabeteStatic_Info.ShomareNomeMaskaneShahrsazi" :m="mode"
                label="شماره نامه مسکن شهرسازی" label-width="95px" />
            </FormControl>
            <FormControl>
              <safa-datepicker v-model="results.ZabeteStatic_Info.LetterDate" :m="mode" label="تاریخ نامه"
                label-width="95px" />
            </FormControl>
            <FormControl>
              <safa-datepicker v-model="results.ZabeteStatic_Info.MosavabeDate" :m="mode" label="تاریخ مصوبه"
                label-width="95px" />
            </FormControl>
          </FormRow>
          <div class="col-12 q-mb-sm q-mt-sm">
            <text-template v-model="results.ZabeteStatic_Info.KholaseMozoMosavabe"
              formKey="bd16d16c-9415-461d-b262-ceda0fcff8c0" :m="mode" label="خلاصه موضوع مصوبه" label-width="95px" />
          </div>
        </div>
        <safa-splitter v-model="gridSplitter" class="fit" horizontal margin="0"
          :min-height="$q.screen.lt.lg ? '300px' : '150px'">
          <template v-slot:before>
            <fit>
              <safa-datatable v-model="results.ZabeteStatic_Plan" :m="mode" helper="elameZabeteCommissionUserType"
                title="نوع کاربری ملاک عمل" class="fit" margin="0" height="100%" min-height="100px" />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable v-model="results.ZabeteStatic_Zabete" :m="mode" helper="elameZabeteCommissionZavabet"
                title="ضوابط" class="fit" margin="0" height="100%" min-height="100px" />
            </fit>
          </template>
        </safa-splitter>
        <safa-popup
          v-model="readOnlyArchive"
          title="آرشیو کمیسیون ماده 5"
        >
          <ArchiveWrap
              v-if="readOnlyArchive"
              style="min-height: 300px"
              class="fit"
              ref="archiveRef"
              :name="archiveConfig.username"
              :pass="archiveConfig.password"
              :bizCode="archiveBizCode"
              :options="archiveReadOnlyOptions"
            />
        </safa-popup>
        <safa-popup
          v-model="fullArchive"
          title="آرشیو کمیسیون ماده 5"
        >
          <ArchiveWrap
            v-if="fullArchive"
            style="min-height: 300px"
            class="fit"
            ref="archiveRef"
            :name="archiveConfig.username"
            :pass="archiveConfig.password"
            :bizCode="archiveBizCode"
          />
        </safa-popup>
      </fit>
      <template v-slot:footer>
        <form-actions :m="mode" @cancel="isEditable = false" @edit="isEditable = true" @save="save">
          <template #after>
            <btn-default @click="onShowArchiveReadonly" label="نمایش آرشیو" />
            <btn-default @click="onShowArchiveEdit" label="آرشیو" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import mapMixin from 'src/mixins/mapMixin'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  route: '/elame-zabete-commission/UElameZabeteCommission',
  mixins: [baseFormMixin, mapMixin],
  data: function () {
    return {
      gridSplitter: 50,
      name: 'UElameZabeteCommission',
      formKey: '1d626a76-7b20-4a98-ab94-d12652518313',
      title: 'اعلام ضابطه کمیسیون',
      main: true,
      readOnlyArchive: false,
      fullArchive: false,
      strNosaziCode: null,
      layerNameEN: null,
      archiveBizCode: null,
      sidebarCompatible: true,
      result: null,
      archiveReadOnlyOptions: {
        showToolbar: false
      },
      results: {
        ZabeteStatic_Info: {
          P_Key: '',
          P_Name: '',
          LayerName_EN: ''
        },
        ZabeteStatic_Plan: [],
        ZabeteStatic_Zabete: []
      },
      saveResult: null,
      SCSettings: null,
      saveResults: {},
      selectedRegion: 1
    }
  },
  async mounted () {
    if (this.selectedRequest) {
      this.selectedRegion = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      ).District
    }
    await this.load()
  },
  async created () {
    await this.loadFormSetting()
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      this.archiveBizCode = bizCode
    },
    onShowArchiveReadonly () {
      this.fullArchive = false
      this.readOnlyArchive = true
      this.updateArchiveBizCode(this.results.NidZStatic_Info)
    },
    onShowArchiveEdit () {
      this.fullArchive = true
      this.readOnlyArchive = false
      this.updateArchiveBizCode(this.results.NidZStatic_Info)
    },
    async loadFormSetting () {
      try {
        this.SCSettings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "BuildingSettings",
            defaultValue: { ShahrsaziSettings: { LayerIdCommision5: '' } },
            nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
          }
        )
        this.selectFromMap()
      } catch (e) {
        this.showError("خطا در دریافت تنظیمات شهرسازی.")
      }
    },
    load () {
      this.showLoading()
      this.results = {
        ZabeteStatic_Info: {
          P_Key: '',
          P_Name: '',
          LayerName_EN: ''
        },
        ZabeteStatic_Plan: [],
        ZabeteStatic_Zabete: []
      }
      this.strNosaziCode = this.lastLocation?.Code || null
      this.layerNameEN = this.lastLocation.Items[0]?.LayerName_EN || null
      let data = {
        pP_Key: this.strNosaziCode,
        pLayerName_EN: this.layerNameEN
      }
      this.$services.SC.loadZabeteStatic(data,
        { config: { District: this.selectedRegion } })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRegion.toString(),
              bizCodeTitle: 'شماره منطقه'
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      this.showLoading()
      this.results.ZabeteStatic_Info.P_Key = this.strNosaziCode
      this.results.ZabeteStatic_Info.P_Name = this.layerNameEN
      this.results.ZabeteStatic_Info.LayerName_EN = this.layerNameEN
      let data = {
        pZabetehStatic: this.results,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.SC.saveZabetehStatic(data,
        { config: { District: this.selectedRegion } })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.saveResults = this.saveResult.data
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRegion.toString(),
              bizCodeTitle: 'شماره منطقه'
            })
            this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectFromMap () {
      if (this.SCSettings.ShahrsaziSettings.LayerIdCommision5 !== '' || this.SCSettings.ShahrsaziSettings.LayerIdCommision5 !== null) {
        this.selectLayer({ id: this.SCSettings.ShahrsaziSettings.LayerIdCommision5, name: 'لایه اعلام ضابطه کمیسیونها (کمیسیون 5)' })
      } else {
        this.showError('لایه کمیسیون ماده 5 در تنظیمات شهرسازی یافت نشد.')
      }
    }
  },
  computed: {
    lastLocation () {
      return this.$store.getters['map/lastLocation']
    },
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    },
    archiveConfig () {
      // eslint-disable-next-line standard/computed-property-even-spacing
      return window.getConfig("shahrsazi.UElameZabeteCommission.archive").district[this.selectedRegion || 1]
    }
  },
  watch: {
    lastLocation: {
      async handler () {
        await this.load()
      },
      deep: true
    }
  }
}
</script>
