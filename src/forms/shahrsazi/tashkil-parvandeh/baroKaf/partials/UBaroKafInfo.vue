<template>
  <safa-form :id="formKey" :caption="title">
    <fit>
      <!-- <safa-group label-width="132px"> -->

      <div class="q-mb-sm">
        <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
          <div class="col">
            <safa-text
                  label="آدرس"
                  v-model="results.Base_AddressInfo.MainAddress"
                  cdcName="MainAddress"
                  m="r"
                  label-width="132px"
                />
          </div>
        </div>
      </div>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            ciName="CI_Criterion"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="ضابطه محل"
            v-model="results.Sh_BaroKaf.CI_Criterion"
            cdcName="CI_Criterion"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="decimal"
            label="مساحت طبق سند"
            v-model="results.Base_HouseInfo_Config.DocArea"
            cdcName="DocArea"
            m="r"
            label-width="132px"
            cdc-name="مساحت طبق سند"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="decimal"
            label="مساحت واقع در حریم املاک"
            v-model="results.Sh_BaroKaf.ToAdjusentArea"
            cdcName="ToAdjusentArea"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            type="number"
            label="شماره کروکی"
            v-model="results.Sh_BaroKaf.KorokiNumber"
            cdcName="KorokiNumber"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-securityPanel
            caption="مساحت وضع موجود"
            id="0c86fe7a-5c3c-4f43-8c93-035d28526788"
          >
            <safa-custom-text
              type="decimal"
              label="مساحت وضع موجود"
              v-model="results.Base_HouseInfo_Revisit.CurrentArea"
              cdcName="CurrentArea"
              :m="m"
              label-width="132px"
            />
          </safa-securityPanel>
          <safa-securityPanel
            caption="مساحت وضع موجود"
            v-sp-else
            id="0c86fe7a-5c3c-4f43-8c93-035d28526788"
          >
            <safa-custom-text
              type="decimal"
              label="مساحت وضع موجود"
              v-model="results.Base_HouseInfo_Revisit.CurrentArea"
              cdcName="CurrentArea"
              m="r"
              label-width="132px"
            />
          </safa-securityPanel>
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="decimal"
            label="عمق واقع در حریم املاک"
            v-model="results.Sh_BaroKaf.ToAdjusentLen"
            cdcName="ToAdjusentLen"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            locale="fa"
            placeholder="تاریخ کروکی"
            label="تاریخ کروکی"
            v-model="results.Sh_BaroKaf.KorokiDate"
            cdcName="KorokiDate"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="decimal"
            label="مساحت پس از رعایت بر اصلاحی"
            v-model="results.Base_HouseInfo_Config.AreaAfterEdit"
            cdcName="AreaAfterEdit"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="decimal"
            label="مساحت پیشروی در حریم گذرها"
            v-model="results.Sh_BaroKaf.ToGangwayArea"
            cdcName="ToGangwayArea"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            ciName="CI_VergeType"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="حق مرغوبیت"
            v-model="results.Sh_BaroKaf.CI_VergeType"
            cdcName="CI_VergeType"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="decimal"
            label="مساحت باقیمانده"
            v-model="results.Base_HouseInfo_Config.RemainArea"
            cdcName="RemainArea"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="decimal"
            label="عمق پیشروی در حریم گذرها"
            v-model="results.Sh_BaroKaf.ToGangwayLen"
            cdcName="ToGangwayLen"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl v-if="showCIVergeType">
          <safa-combo
            ciName="CI_VergeType"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="حق مرغوبیت آپارتمان"
            v-model="results.Sh_BaroKaf_Apartment.CI_VergeType"
            cdcName="CI_VergeType"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            type="number"
            label="میزان در مسیر"
            v-model="results.Sh_BaroKaf.PathValue"
            cdcName="PathValue"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            type="number"
            label="میزان در مسیر بر اساس سند مالکیت"
            v-model="results.Sh_BaroKaf.PathValueBaseonDeed"
            cdcName="PathValueBaseonDeed"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            ciName="CI_Train"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="قطار شهری"
            v-model="results.Sh_BaroKaf.CI_Train"
            cdcName="CI_Train"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            ciName="CI_AreaType"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="مساحت ملاک عمل"
            v-model="results.Sh_BaroKaf.CI_AreaType"
            cdcName="CI_AreaType"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            ciName="CI_Frontage"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="نوع حریم"
            v-model="results.Sh_BaroKaf.CI_Frontage"
            cdcName="CI_Frontage"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            ciName="CI_QuotaDuty"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="سهم خدمات"
            v-model="results.Sh_BaroKaf.CI_QuotaDuty"
            cdcName="CI_QuotaDuty"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            ciName="CI_BoundCode"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="محدوده"
            v-model="results.Base_HouseInfo_Revisit.CI_BoundCode"
            cdcName="CI_BoundCode"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            type="number"
            label="عرض سطح اشغال"
            v-model="results.Base_HouseInfo_Revisit.BusyAreaWidth"
            cdcName="BusyAreaWidth"
            :m="m"
            label-width="132px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            :m="m"
            type="number"
            label="حریم فضای سبز"
            v-model="results.Sh_BaroKaf.GreenArea"
            cdcName="GreenArea"
            label-width="132px"
          />
        </FormControl>
      </FormRow>
      <!-- </safa-group> -->
      <div class="row q-col-gutter-md" style="padding-bottom: 8px">
        <div class="col-md-auto">
          <safa-checkbox
            label="الویت بندی کاری دارد"
            v-model="results.Sh_BaroKaf.ValueAddedPriorityUsing"
            cdcName="ValueAddedPriorityUsing"
            label-width="110px"
            :m="m"
          />
        </div>
        <div class="col-md-auto">
          <safa-checkbox
            label="تغییر کاربری دارد"
            v-model="results.Sh_BaroKaf.ValueAddedChangeUsing"
            cdcName="ValueAddedChangeUsing"
            label-width="160px"
            :m="m"
          />
        </div>
        <div class="col-md-auto">
          <safa-checkbox
            label="تغییر عرض گذر"
            v-model="results.Sh_BaroKaf.ValueAddedChangeWith"
            cdcName="ValueAddedChangeWith"
            label-width="160px"
            :m="m"
          />
        </div>
        <div class="col-md-auto">
          <safa-checkbox
            label="ملک در بافت فرسوده قرار دارد؟"
            v-model="results.Sh_BaroKaf.IsWornOut"
            cdcName="IsWornOut"
            label-width="160px"
            :m="m"
          />
        </div>
      </div>
      <safa-grid
        v-model="results.Base_Edge"
        cdcName="Base_Edge"
        height="100%"
        maxHeight="100%"
        minHeight="200px"
        ref="jahate-arbae-grid"
        name="grid"
        helper="jahateArbaeBarokaf"
        title="جهات اربعه"
        :addRow="true"
        :m="m"
        fit
      />
    </fit>
  </safa-form>
</template>

<script>
export default {
  name: "baro-kaf-info",
  title: "اطلاعات برو کف",
  props: {
    results: Object,
    m: String,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    showCIVergeType: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  }
}
</script>
