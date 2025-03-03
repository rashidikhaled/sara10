<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="اطلاعات دبیرخانه"
          label-width="100px"
          :label-shrink="false"
          source-type="local"
          :options="cboSecOptions"
          :value="selectedSec"
          @input="$emit('selectedSecChange', selectedSec)"
          cdcName="selectedSec"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره موافقت اصولی"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Sh_MovafeghatOsooli.CertificateNo"
          cdcName="CertificateNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ موافقت اصولی"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Sh_MovafeghatOsooli.CertificateDate"
          cdcName="CertificateDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت کل زیر بنا"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          cdcName="InfrastructureArea"
          type="decimal"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت نورگیر"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.LightfastArea"
          cdcName="LightfastArea"
          type="decimal"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="استقراربنا"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
          cdcName="CI_BuildingPosition"
          ciName="CI_BuildingPosition"
          domainName="CI_SaraM1"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label=" مساحت سهم العرصه چند ساختمانی"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
          cdcName="MultiBuildingToftImpartArea"
          type="decimal"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع سقف"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.CI_RoofType"
          cdcName="CI_RoofType"
          ciName="CI_RoofType"
          domainName="CI_SaraM1"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تراکم مجاز در پروانه ی ساختمانی"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          cdcName="AllowableDensityLicence"
          type="number"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="سطح اشغال"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.BusyArea"
          cdcName="BusyArea"
          type="number"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع نما"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_CommonEstate.CI_ViewCode"
          cdcName="CI_ViewCode"
          ciName="CI_ViewCode"
          domainName="CI_SaraM1"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت نما"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_CommonEstate.ViewArea"
          cdcName="ViewArea"
          type="decimal"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="عرض دهنه ی تجاری"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          cdcName="CommercialGapWidth"
          type="number"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label=" عمق حریم تجاری"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
          cdcName="CommercialGapDepth"
          type="number"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت ایست رمپ"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.RampArea"
          cdcName="RampArea"
          type="decimal"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ارتفاع تا کف معبر بالا"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.UpperHeight"
          cdcName="UpperHeight"
          type="number"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ارتفاع تا کف معبر پایین"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.DownerHeight"
          cdcName="DownerHeight"
          type="number"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مجموع ارتفاع کل"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.Height"
          cdcName="Height"
          type="number"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ارتفاع جان پناه"
          label-width="100px"
          :label-shrink="false"
          v-model="value.Base_BuildingInfo.Defilade"
          cdcName="Defilade"
          type="number"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <safa-splitter
      v-model="spH"
      horizontal
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg ? '500px' : '150px'"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="سایر امکانات"
            v-model="value.Base_OtherEquipment"
            cdcName="Base_OtherEquipment"
            helper="principalAgreementOther"
            :m="m"
            fit
            min-height="400px"
            max-height="100%"
            height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="spV"
            :horizontal="$q.screen.lt.lg"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="مشخصات دیوارها"
                  v-model="value.Base_Wall"
                  cdcName="Base_Wall"
                  helper="principalAgreementWall"
                  :m="m"
                  fit
                  min-height="400px"
                  max-height="100%"
                  height="100%"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="مشخصات درها"
                  v-model="value.Base_Door"
                  cdcName="Base_Door"
                  helper="principalAgreementDoor"
                  :m="m"
                  fit
                  min-height="400px"
                  max-height="100%"
                  height="100%"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      spH: 50,
      spV: 50,
      selectedSec: 0
    }
  },
  props: {
    value: Object,
    cboSecOptions: Array,
    m: String
  }
}
</script>
