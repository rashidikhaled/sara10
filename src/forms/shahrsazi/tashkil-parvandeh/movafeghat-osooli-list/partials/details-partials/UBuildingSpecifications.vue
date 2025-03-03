<template>
  <fit>
    <internal-section>
      <form-row>
        <form-control>
      <safa-text
        label="شماره موافقت اصولی"
        :m="m"
        label-width="120px"
        v-model="value.Sh_MovafeghatOsooli.CertificateNo"
      />
    </form-control>
  <form-control>
      <safa-text
        label="تراکم مجاز در پروانه ساختمانی"
        v-model="value.Base_BuildingInfo.AllowableDensityLicence"
        :m="m"
        label-width="120px"
      />
    </form-control>
  <form-control>
      <safa-custom-text
        label-width="120px"
        v-model="value.Base_BuildingInfo.RampArea"
        type="decimal"
        label="مساحت ایست رمپ"
        :m="m"
      />
    </form-control>
  <form-control>
      <safa-datepicker
        label="تاریخ موافقت اصولی"
        v-model="value.Sh_MovafeghatOsooli.CertificateDate"
        :m="m"
        label-width="120px"
      />
    </form-control>
  <form-control>
      <safa-text
        label="سطح اشغال"
        :m="m"
        label-width="120px"
        v-model="value.Base_BuildingInfo.BusyArea"
      />
    </form-control>
  <form-control>
      <safa-text
        label="ارتفاع تا کف معبر بالا"
        v-model="value.Base_BuildingInfo.UpperHeight"
        :m="m"
        label-width="120px"
      />
    </form-control>
  <form-control>
      <safa-custom-text
        label-width="120px"
        type="decimal"
        label="مساحت کل زیر بنا"
        v-model="value.Base_BuildingInfo.InfrastructureArea"
        :m="m"
      />
    </form-control>
  <form-control>
      <safa-combo
        ciName="CI_EngStudyField"
        v-model="value.Base_CommonEstate.CI_ViewCode"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="نوع نما"
        :m="m"
        label-width="120px"
      />
    </form-control>
  <form-control>
      <safa-text
        label="ارتفاع تا کف معبر پایین"
        v-model="value.Base_BuildingInfo.DownerHeight"
        :m="m"
        label-width="120px"
      />
    </form-control>
  <form-control>
      <safa-custom-text
        :m="m"
        label-width="120px"
        type="decimal"
        label="مساحت نورگیر"
        v-model="value.Base_BuildingInfo.LightfastArea"
      />
    </form-control>
    <form-control>
      <safa-custom-text
        type="decimal"
        label="مساحت نما"
        label-width="120px"
        v-model="value.Base_CommonEstate.ViewArea"
        :m="m"
      />
    </form-control>
  <form-control>
      <safa-text
        label="مجموع ارتفاع کل"
        v-model="value.Base_BuildingInfo.Height"
        :m="m"
        label-width="120px"
      />
    </form-control>
  <form-control>
      <safa-combo
        ciName="CI_EngStudyField"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="استقرار بنا"
        v-model="value.Base_BuildingInfo.CI_BuildingPosition"
        :m="m"
        label-width="120px"
      />
    </form-control>
  <form-control>
      <safa-text
        label="عرض دهنه تجاری"
        v-model="value.Base_CommonEstate.CommercialGapWidth"
        :m="m"
        label-width="120px"
      />
    </form-control>
  <form-control>
      <safa-text
        label="ارتفاع جان پناه"
        v-model="value.Base_BuildingInfo.Defilade"
        :m="m"
        label-width="120px"
      />
    </form-control>
  <form-control>
      <safa-combo
        ciName="CI_EngStudyField"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="نوع سقف"
        v-model="value.Base_BuildingInfo.CI_RoofType"
        :m="m"
        label-width="120px"
      />
    </form-control>
  <form-control>
      <safa-text
        label="عمق حریم تجاری"
        :m="m"
        label-width="120px"
        v-model="value.Base_BuildingInfo.CommercialGapDepth"
      />
    </form-control>
  <form-control>
      <safa-custom-text
        :m="m"
        label-width="120px"
        type="decimal"
        label="مساحت سهم العرصه چند ساختمانی"
        v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
      />
    </form-control>
    </form-row>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <fit>
            <safa-grid
              helper="baseDoor"
              v-model="value.Base_Door"
              :m="m"
              title="مشخصات درها"
              fit
              height="100%"
              min-height="150px"
              max-height="100%"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <fit>
            <safa-grid
              helper="wallProperties"
              v-model="value.Base_Wall"
              :add-row="true"
              :allow-copy="true"
              :copy-with-count="true"
              :m="m"
              title="مشخصات دیوارها"
              fit
              height="100%"
              min-height="150px"
              max-height="100%"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <fit>
            <safa-grid
              helper="agBaseOtherEquipment"
              v-model="value.Base_OtherEquipment"
              :add-row="true"
              :allow-copy="true"
              :copy-with-count="true"
              :m="m"
              title="سایر امکانات"
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
export default {
  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
