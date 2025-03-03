<template>
  <fit>
    <internal-section>
      <safa-group
        :m="m"
        margin="0"
      >
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocType"
          cdcName="CI_DocType"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          label="نوع سند"
          label-width="90px"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_DocStatus"
          cdcName="CI_DocStatus"
          :m="m"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          label="وضعیت سند"
          label-width="90px"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_OwnerType"
          cdcName="CI_OwnerType"
          :m="m"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          label="نوع مالکیت"
          label-width="90px"
        />

        <!-- row 2 -->
        <safa-text
          v-model="value.Base_ApartmentInfo.TotalArea"
          cdcName="TotalArea"
          m="r"
          label="مجموع کل زیربنا"
          label-width="90px"
          type="number"
        />
        <safa-custom-text
          v-model="value.Base_ApartmentInfo.SharingInfrastructure"
          cdcName="SharingInfrastructure"
          m="r"
          label="مساحت زیربنای مشترکات"
          label-width="90px"
          type="decimal"
        />
        <safa-custom-text
          v-model="value.Base_ApartmentInfo.ToftImpart"
          cdcName="ToftImpart"
          m="r"
          label="مساحت سهم العرصه"
          label-width="90px"
          type="decimal"
        />

        <!-- row 3 -->
        <safa-custom-text
          v-model="value.Base_CommonEstate.ViewArea"
          cdcName="ViewArea"
          m="r"
          label="مساحت نما"
          label-width="90px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_ViewCode"
          cdcName="CI_ViewCode"
          m="r"
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          label="نوع نما"
          label-width="90px"
        />
        <safa-text
          v-model="value.Base_CommonEstate.RegisterSection"
          cdcName="RegisterSection"
          m="r"
          label="بخش ثبتی"
          label-width="90px"
        />
        <safa-datepicker
          v-model="value.Base_CommonEstate.DocExportDate"
          cdcName="DocExportDate"
          :m="m"
          label="تاریخ صدور سند"
          label-width="90px"
        />
        <safa-datepicker
          v-model="value.Base_ApartmentInfo.ActDate"
          cdcName="ActDate"
          m="r"
          label="تاریخ اثر"
          label-width="90px"
        />
      </safa-group>
    </internal-section>
    <safa-splitter
      v-model="verticalSplitter"
      :horizontal="$q.screen.lt.md"
      :min-height="$q.screen.lt.md? '300px' : '150px'"
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            :allowCopy="true"
            :m="m"
            :selectable="true"
            fit
            height="100%"
            helper="shahrsazi.baseOwner"
            max-height="100%"
            title="مالکین"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.Base_RegisterPlack"
            cdcName="Base_RegisterPlack"
            :m="m"
            fit
            height="100%"
            helper="registerPlack"
            max-height="100%"
            title="پلاک ثبتی"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  name: 'TabBaseOwner',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      verticalSplitter: 50
    }
  }
}
</script>
