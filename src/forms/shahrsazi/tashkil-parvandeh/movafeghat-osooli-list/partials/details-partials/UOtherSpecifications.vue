<template>
  <fit>
    <internal-section>
      <form-row>
      <form-control>
        <safa-combo
          ciName="CI_CreateDesign"
          domainName="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
          :m="m"
          label-width="110px"
          label="الگوی ساخت"
        />
      </form-control>
      <form-control>
        <safa-text
         label="قدمت ساختمان قبل از"
         v-model="value.Base_BuildingInfo.CreateYearTo"
         label-width="110px"
         :m="m"
         />
      </form-control>
      <form-control>
        <safa-combo
          ciName="CI_EngStudyField"
          domainName="CI_SaraM1"
          label="وضعیت استحکام بنا"
          v-model="value.Base_BuildingInfo.CI_StableStatus"
          label-width="110px"
          :m="m"
        />
        </form-control>
        <form-control>
        <safa-datepicker
        label="تاریخ شروع عملیات ساختمانی"
        v-model="value.Base_BuildingInfo.StartDate"
        label-width="110px"
        :m="m"
         />
        </form-control>
      <form-control>
        <safa-text
         label="قدمت ساختمان بعد از"
         v-model="value.Base_BuildingInfo.CreateYearFrom"
         label-width="110px"
         :m="m"
         />
        </form-control>
      <form-control>
        <safa-combo
          ciName="CI_EngStudyField"
          domainName="CI_SaraM1"
          label="وضعیت تاریخی بنا"
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
          label-width="110px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-datepicker
         label="تاریخ اتمام عملیات ساختمانی"
         v-model="value.Base_BuildingInfo.EndDate"
         label-width="110px"
         :m="m"
         />
        </form-control>
      <form-control>
        <safa-combo
          ciName="CI_EngStudyField"
          domainName="CI_SaraM1"
          label="مرحله ساختمانی"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          label-width="110px"
          :m="m"
        />
      </form-control>
    <form-control>
        <safa-combo
          ciName="CI_EngStudyField"
          domainName="CI_SaraM1"
          label="بهره بردار"
          v-model="value.Base_CommonEstate.CI_HouseUser"
          label-width="110px"
          :m="m"
        />
      </form-control>
    </form-row>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-grid
              helper="baseBezel"
              :add-row="true"
              :allow-copy="true"
              :copy-with-count="true"
              v-model="value.Base_Bezel"
              :m="m"
              title="پخ ها"
              fit
              height="100%"
              min-height="150px"
              max-height="100%"
            />
          </fit>
        </div>
        <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-grid
              :columns="DahaneColumn"
              :add-row="true"
              :allow-copy="true"
              :copy-with-count="true"
              v-model="value.Base_Gap"
              :m="m"
              title="دهانه"
              fit
              height="100%"
              min-height="150px"
              max-height="100%"
            />
          </fit>
        </div>
        <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-grid
              helper="baseInstallation"
              v-model="value.Base_Installation"
              :add-row="true"
              :allow-copy="true"
              :copy-with-count="true"
              :m="m"
              title="تاسیسات"
              fit
              height="100%"
              min-height="150px"
              max-height="100%"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
</template>
<script>
import FormControl from '../../../../../../components/common/FormControl.vue'
export default {
  components: { FormControl },
  data () {
    return {
      DahaneColumn: [
        {
          field: 'CI_SideCode',
          title: 'جهت',
          domain: 'CI_SaraM1'
        },
        {
          field: 'BarLen',
          title: 'طول بر'
        },
        {
          field: 'SpanArea',
          title: 'مساحت حریم'
        },
        {
          field: 'SpanDepth',
          title: 'عمق حریم'
        },
        {
          field: 'GapWidth',
          title: 'عرض دهنه'
        }
      ]
    }
  },
  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
