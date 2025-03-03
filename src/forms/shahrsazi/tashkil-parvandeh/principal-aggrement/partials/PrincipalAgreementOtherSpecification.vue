<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="الگوی ساخت"
          label-width="100px"
          :label-shrink="false"
          :m="m"
          ciName="CI_CreateDesign"
          domainName="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
          cdcName="CI_CreateDesign"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ شروع عملیات ساختمانی"
          label-width="100px"
          :label-shrink="false"
          :m="m"
          v-model="value.Base_BuildingInfo.StartDate"
          cdcName="StartDate"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ اتمام عملیات ساختمانی"
          label-width="100px"
          :label-shrink="false"
          :m="m"
          v-model="value.Base_BuildingInfo.EndDate"
          cdcName="EndDate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت استحکام بنا"
          label-width="100px"
          :label-shrink="false"
          :m="m"
          ciName="CI_StableStatus"
          domainName="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_StableStatus"
          cdcName="CI_StableStatus"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="قدمت ساختمان قبل از"
          label-width="100px"
          :label-shrink="false"
          :m="m"
          v-model="value.Base_BuildingInfo.CreateYearTo"
          cdcName="CreateYearTo"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-text
          type="number"
          label="قدمت ساختمان بعد از"
          label-width="100px"
          :label-shrink="false"
          :m="m"
          v-model="value.Base_BuildingInfo.CreateYearFrom"
          cdcName="CreateYearFrom"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="  مرحله ی ساختمانی"
          label-width="100px"
          :label-shrink="false"
          :m="m"
          ciName="CI_BuildingStep"
          domainName="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          cdcName="CI_BuildingStep"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت تاریخی بنا"
          label-width="100px"
          :label-shrink="false"
          :m="m"
          ciName="CI_HistoricalStatus"
          domainName="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
          cdcName="CI_HistoricalStatus"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="بهره بردار"
          label-width="100px"
          :label-shrink="false"
          :m="m"
          ciName="CI_HouseUser"
          domainName="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_HouseUser"
          cdcName="CI_HouseUser"
        />
      </FormControl>
    </FormRow>
    <safa-splitter
      v-model="horizontalSplitterModel"
      cdcName="horizontalSplitterModel"
      horizontal
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg ? '800px' : '150px'"
    >
      <template v-slot:before>
        <safa-splitter
          v-model="verticalSplitterModel"
          cdcName="verticalSplitterModel"
          :horizontal="$q.screen.lt.lg"
          class="fit"
          margin="0"
          style="min-height: 250px"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                title="تأسیسات"
                v-model="value.Base_Installation"
                cdcName="Base_Installation"
                ref="grid2"
                helper="principalAgreementTasisat"
                :m="m"
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                v-model="value.Base_GreenSpace"
                cdcName="Base_GreenSpace"
                title="فضای سبز"
                fit
                helper="principalAgreementGreen"
                :m="m"
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <safa-splitter
          v-model="verticalSplitterModel2"
          cdcName="verticalSplitterModel2"
          :horizontal="$q.screen.lt.lg"
          class="fit"
          margin="0"
          style="min-height: 250px"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                title="پخ ها"
                v-model="value.Base_Bezel"
                cdcName="Base_Bezel"
                ref="grid2"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
                helper="principalAgreementPakh"
                :m="m"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                title="دهانه"
                v-model="value.Base_Gap"
                cdcName="Base_Gap"
                ref="grid2"
                helper="principalAgreementDahane"
                :m="m"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      horizontalSplitterModel: 50,
      verticalSplitterModel: 50,
      verticalSplitterModel2: 50
    }
  },
  props: {
    value: Object,
    m: String
  },
  methods: {}
}
</script>
