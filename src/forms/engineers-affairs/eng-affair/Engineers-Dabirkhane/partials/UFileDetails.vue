<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="شماره ارجاع"
          m="r"
          label-width="100px"
          v-model="value.ClsFil_Info.Fil_Info.NidWorkItem"
          cdcName="NidWorkItem"
          :labelShrink="true"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="دبیرخانه شهرداری"
          v-model="value.ClsFil_Info.Fil_Info.StrNoTownDabir"
          cdcName="StrNoTownDabir"
          :labelShrink="true"
          :m="m === 'e' ? strNoTownDabirMode : 'r'"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <nosazi-code-input
          v-model="value.ClsFil_Info.Fil_Info.CodeString"
          label="کد نوسازی"
          label-width="100px"
          cdcName="CodeString"
          :m="m === 'e' ? nosaziCodeMode : 'r'"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="منطقه"
          ciName="CI_Region"
          domainName="engineer"
          :use-input="false"
          v-model="value.ClsFil_Info.Fil_Info.CI_Region"
          cdcName="CI_Region"
          :labelShrink="true"
          :m="m === 'e' ? comboCIRegionMode : 'r'"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_RequestType"
          domainName="engineer"
          input-debounce="0"
          label="نوع درخواست"
          v-model="value.ClsFil_Info.Fil_Info.CI_RequestType"
          cdcName="CI_RequestType"
          :labelShrink="true"
          :m="m === 'e' ? comboRequestMode : 'r'"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          locale="fa"
          format="jYYYY/jMM/jDD"
          display-format="dddd jDD jMMMM jYYYY"
          label="تاریخ درخواست"
          v-model="value.ClsFil_Info.Fil_Info.EnterDate"
          cdcName="EnterDate"
          :labelShrink="true"
          m="r"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_UsingType"
          domainName="engineer"
          input-debounce="0"
          label="کاربری ملک"
          v-model="value.ClsFil_Info.Fil_Info.CI_UsingType"
          cdcName="CI_UsingType"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_SazehType"
          domainName="engineer"
          input-debounce="0"
          label="نوع سازه"
          v-model="value.ClsFil_Info.Fil_Info.CI_SazehType"
          cdcName="CI_SazehType"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_ConstructionStage"
          domainName="engineer"
          input-debounce="0"
          label="مرحله ساختمانی"
          v-model="value.ClsFil_Info.Fil_Info.CI_ConstructionStage"
          cdcName="CI_ConstructionStage"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="زیربنا"
          v-model="value.ClsFil_Info.Fil_Info.infrastructure"
          cdcName="infrastructure"
          :labelShrink="true"
          :m="m"
          label-width="100px"
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد سقف"
          v-model="value.ClsFil_Info.Fil_Info.Floor"
          cdcName="Floor"
          :labelShrink="true"
          :m="m"
          label-width="100px"
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_City"
          domainName="engineer"
          input-debounce="0"
          label="شهر"
          v-model="cmbCity"
          cdcName="cmbCity"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_FilesType"
          domainName="engineer"
          input-debounce="0"
          label="نوع پرونده"
          v-model="value.ClsFil_Info.Fil_Info.CI_FilesType"
          cdcName="CI_FilesType"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          locale="fa"
          format="jYYYY/jMM/jDD"
          display-format="dddd jDD jMMMM jYYYY"
          label="تاریخ تشکیل پرونده"
          v-model="value.ClsFil_Info.Fil_Info.FileDate"
          cdcName="FileDate"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="زیرزمین"
          v-model="value.ClsFil_Info.Fil_Info.Underground"
          cdcName="Underground"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_Years"
          domainName="engineer"
          input-debounce="0"
          label="سال کاری"
          v-model="value.ClsFil_Info.Fil_Info.CI_Years"
          cdcName="CI_Years"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد پرونده مادر"
          v-model="value.ClsFil_Info.Fil_Info.MotherCode"
          cdcName="MotherCode"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد رهگیری شهرداری"
          v-model="value.ClsFil_Info.Fil_Info.UrbanNidKartablItem"
          cdcName="UrbanNidKartablItem"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک ثبتی"
          v-model="value.ClsFil_Info.Fil_Info.RegisterPlack"
          cdcName="RegisterPlack"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره مجوز"
          v-model="value.ClsFil_Info.Fil_Info.ExportLicenseNo"
          cdcName="ExportLicenseNo"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          locale="fa"
          format="jYYYY/jMM/jDD"
          display-format="dddd jDD jMMMM jYYYY"
          label="تاریخ مجوز"
          v-model="value.ClsFil_Info.Fil_Info.ExportLicenseDate"
          cdcName="ExportLicenseDate"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره ارجاع پروانه"
          v-model="value.ClsFil_Info.Fil_Info.ParvanehIdRef"
          cdcName="ParvanehIdRef"
          :labelShrink="true"
          m="r"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="متراژ اصلاحیه پروانه"
          v-model="value.ClsFil_Info.Fil_Info.ParvanehMeterEdit"
          cdcName="ParvanehMeterEdit"
          :labelShrink="true"
          m="r"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <engineer-info-box
          label="هماهنگ کننده"
          label-width="100px"
          v-model="txtIdentityCodeCoordinator"
          :m="m"
          hideSearchBtn
          :labelShrink="true"
          showingLoading
          @fetched="getEngineerInfo"
          ref="engineerInfoBox"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_Lab"
          domainName="engineer"
          input-debounce="0"
          label="آزمایشگاه"
          v-model="value.ClsFil_Info.Fil_Info.CI_Lab"
          cdcName="CI_Lab"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره تعهد نظارت"
          v-model="value.ClsFil_Info.Fil_Info.CommitmentSupervisionNo"
          cdcName="CommitmentSupervisionNo"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          locale="fa"
          format="jYYYY/jMM/jDD"
          display-format="dddd jDD jMMMM jYYYY"
          label="تاریخ تعهد نظارت"
          v-model="value.ClsFil_Info.Fil_Info.CommitmentSupervisionDate"
          cdcName="CommitmentSupervisionDate"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="متراژ گودبرداری"
          v-model="value.ClsFil_Info.Fil_Info.MetrajGodBardari"
          cdcName="MetrajGodBardari"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت عرصه"
          v-model="value.ClsFil_Info.Fil_Info.MetrajGodBardari"
          cdcName="MetrajGodBardari"
          :labelShrink="true"
          :m="m"
          label-width="100px"
        />
      </FormControl>
    </FormRow>

    <div class="row items-center q-col-gutter-x-lg q-col-gutter-y-md q-mb-sm">
      <safa-label class="col-12 col-sm-auto">
        آیا ساختمان نیاز به اجرای سازه نگهبان دارد؟</safa-label
      >
      <safa-radio
        label=" بلی"
        class="col-12 col-sm-auto"
        v-model="value.ClsFil_Info.Fil_Info.IsChangeBuildingGroup"
        cdcName="IsChangeBuildingGroup"
        :labelShrink="true"
        :val="true"
        :m="m"
      />
      <safa-radio
        label="خیر"
        class="col-12 col-sm-auto"
        v-model="value.ClsFil_Info.Fil_Info.IsChangeBuildingGroup"
        cdcName="IsChangeBuildingGroup"
        :labelShrink="true"
        :val="false"
        :m="m"
      />
    </div>
    <safa-grid
      v-if="value.ClsFil_Info"
      helper="OwnerSpecification"
      title="مشخصات مالک"
      :m="m === 'e' ? grdOwnerMode : 'r'"
      min-height="200px"
      height="100%"
      max-height="100%"
      v-model="value.ClsFil_Info.Fil_Owner"
      fit
      cdcName="Fil_Owner"
    />
  </fit>
</template>
<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      showEngineerInfo: false,
      searchInfo: {},

      nosaziCodeMode: "e",
      strNoTownDabirMode: "e",
      comboCIRegionMode: "e",
      comboRequestMode: "e",
      grdOwnerMode: "r",

      txtIdentityCodeCoordinator: null,

      cmbCity: null
    }
  },
  methods: {
    getEngineerInfo ({ engineerInfo }) {
      this.$emit('getCoordinatorEngineerInfo', engineerInfo)
    }
  }
}
</script>
