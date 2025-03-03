<template>
  <fit>
    <internal-section>
      <safa-group
        label-width="130px"
        margin="0"
        :size="{
          md: 4,
          lg: 4,
          sm: 2,
          xs: 1,
        }"
      >
        <safa-custom-text
          type="decimal"
          label="مساحت طبق سند"
          v-model="value.Base_HouseInfo.DocArea"
          label-width="130px"
          :m="m"
        />
        <safa-text
          label="بخش ثبتی"
          v-model="value.Base_CommonEstate.RegisterSection"
          type="number"
          :m="m"
          label-width="130px"
        />
        <safa-text
          label="شماره سند اعیان"
          v-model="value.Base_HouseInfo.AyanDocNo"
          type="number"
          :m="m"
          label-width="130px"
        />
        <safa-combo
          label="نوع سند"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocType"
          :m="m"
          label-width="130px"
        />
        <safa-text
          label="شماره قطعه"
          v-model="value.Base_HouseInfo.PieceNo"
          type="number"
          :m="m"
          label-width="130px"
        />
        <safa-datepicker
          label="تاریخ صدور سند"
          v-model="value.Base_CommonEstate.DocExportDate"
          :m="m"
          label-width="130px"
        />
        <safa-combo
          label="مرجع صدور سند"
          ci-name="CI_DocRefrence"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocRefrence"
          :m="m"
          label-width="130px"
        />
        <safa-text
          label="شماره سند عرصه"
          v-model="value.Base_HouseInfo.ArsehDocNo"
          :m="m"
          type="number"
          label-width="130px"
        />
        <safa-datepicker
          label="تاریخ انتقال سند"
          v-model="value.Base_CommonEstate.DocTransferDate"
          :m="m"
          label-width="130px"
        />

        <!-- row 4 -->
        <safa-combo
          label="وضعیت سند"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          :m="m"
          label-width="130px"
        />
        <safa-custom-text
          label="مساحت سند مادر"
          v-model="value.Base_HouseInfo.MotherDocArea"
          label-width="130px"
          :m="m"
          type="decimal"
        />

        <!-- row 5 -->
        <safa-combo
          label="وضعیت سند مادر"
          ci-name="CI_MotherDocStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          :m="m"
          label-width="130px"
        />
        <safa-checkbox
          label="حقوق ارتفاقی"
          v-model="value.Base_HouseInfo.HoughogheErtefaghi"
          :m="m"
        />
      </safa-group>
    </internal-section>
    <safa-splitter v-model="gridSplitter" class="fit" horizontal margin="0">
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="baseRegisterPlack"
            title="پلاک ثبتی"
            :m="m"
            v-model="value.Base_RegisterPlack"
            fit
            height="100%"
            max-height="100%"
            paginate
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <text-template
            label="ملاحضات سند"
            identifier="2b08bc9a-f3ef-44dd-8b11-2ac75b0c0f99"
            formKey="5044c8c7-e331-4bef-83ab-bb8487e67f60"
            :m="m"
            v-model="value.Base_CommonEstate.DocComments"
            :fit="false"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: "TabRegisterPlaque",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      gridSplitter: 60
    }
  }
}
</script>
