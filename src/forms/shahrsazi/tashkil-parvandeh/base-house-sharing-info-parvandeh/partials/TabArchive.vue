<template>
  <fit>
    <safa-tabs :padding="false" fit class="fit" v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="BaseShahrsaziArchiveTab" label="سوابق و اشتراکات" />
        <tab-menu name="BaseCommissionHistoryTab" label="سوابق کمیسیونها" />
        <tab-menu
          name="BaseRenovationPaymentHistoryTab"
          label="پرداخت آخرین مفاصای نوسازی"
        />
        <tab-menu name="BaseResourceInfoTab" label="منبع برداشت اطلاعات" />
        <tab-menu name="BaseCommission77HistoryTab" label="سوابق کمیسیون 77 " />
        <tab-menu name="BaseDigTab" label="حفاری " />
      </template>
      <tab-content name="BaseShahrsaziArchiveTab">
        <fit>
          <safa-datatable
            helper="baseShahrsaziArchive"
            :m="m"
            v-model="value.Base_ShahrsaziArchive"
            cdcName="Base_ShahrsaziArchive"
            title="سوابق و اشتراکات"
            :emptyRowLimit="1"
            paginate
            fit
          />
        </fit>
      </tab-content>
      <tab-content name="BaseCommissionHistoryTab">
        <fit>
          <safa-datatable
            helper="baseCommissionHistory"
            :m="m"
            v-model="value.Base_CommissionHistory"
            cdcName="Base_CommissionHistory"
            title="سوابق کمیسیونها"
            :emptyRowLimit="1"
            paginate
            fit
          />
        </fit>
      </tab-content>
      <tab-content name="BaseRenovationPaymentHistoryTab">
        <fit>
          <safa-datatable
            helper="baseRenovationPaymentHistory"
            :m="m"
            v-model="value.Base_RenovationPaymentHistory"
            cdcName="Base_RenovationPaymentHistory"
            title="پرداخت آخرین مفاصای نوسازی"
            :emptyRowLimit="1"
            paginate
            fit
          />
        </fit>
      </tab-content>
      <tab-content name="BaseResourceInfoTab">
        <fit>
          <safa-datatable
            helper="baseResourceInfo"
            :m="m"
            v-model="value.Base_ResourceInfo"
            cdcName="Base_ResourceInfo"
            title="منبع برداشت اطلاعات"
            :emptyRowLimit="1"
            paginate
            fit
          />
        </fit>
      </tab-content>
      <tab-content name="BaseCommission77HistoryTab">
        <fit>
          <safa-datatable
            :m="m"
            helper="baseCommission77History"
            v-model="value.Base_Commission77History"
            cdcName="Base_Commission77History"
            title="سوابق کمیسیون 77 "
            :emptyRowLimit="1"
            paginate
            fit
          />
        </fit>
      </tab-content>
      <tab-content name="BaseDigTab">
        <fit>
          <safa-datatable
            :m="m"
            helper="baseDig"
            v-model="value.Base_Dig"
            cdcName="Base_Dig"
            title="حفاری "
            :emptyRowLimit="1"
            paginate
            fit
          />
        </fit>
      </tab-content>
    </safa-tabs>
  </fit>
</template>
<script>
export default {
  name: "TabArchive",

  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    m: String
  },
  data () {
    return {
      activeTab: "BaseShahrsaziArchiveTab"
    }
  }
}
</script>
