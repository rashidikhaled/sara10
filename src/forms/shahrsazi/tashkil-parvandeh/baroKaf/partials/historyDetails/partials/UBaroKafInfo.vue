<template>
  <safa-form :id="formKey" :caption="title">
    <div>
      <div>
        <safa-group :m="m">
          <safa-combo
            ciName="CI_Criterion"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="ضابطه محل"
            v-model="results.Sh_BaroKaf.CI_Criterion"
            cdcName="CI_Criterion"
            label-width="100px"
          ></safa-combo>
          <safa-custom-text
            label="مساحت طبق سند"
            v-model="results.Base_HouseInfo_Config.DocArea"
            cdcName="DocArea"
            m="r"
            label-width="100px"
            type="decimal"
          />
          <safa-custom-text
            type="decimal"
            label="مساحت واقع در حریم املاک"
            v-model="results.Sh_BaroKaf.ToAdjusentArea"
            cdcName="ToAdjusentArea"
            label-width="100px"
          />
          <safa-text
            type="number"
            label="شماره کروکی"
            v-model="results.Sh_BaroKaf.KorokiNumber"
            cdcName="KorokiNumber"
            label-width="100px"
          />
          <safa-custom-text
            type="deciaml"
            label="مساحت وضع موجود"
            v-model="results.Base_HouseInfo_Revisit.CurrentArea"
            cdcName="CurrentArea"
            m="r"
            label-width="100px"
          />
          <safa-text
            type="number"
            label="عمق واقع در حریم املاک"
            v-model="results.Sh_BaroKaf.ToAdjusentLen"
            cdcName="ToAdjusentLen"
            label-width="100px"
          />
          <safa-datepicker
            locale="fa"
            placeholder="تاریخ کروکی"
            format="jYYYY/jMM/jDD"
            display-format="dddd jDD jMMMM jYYYY"
            label="تاریخ کروکی"
            v-model="results.Sh_BaroKaf.KorokiDate"
            cdcName="KorokiDate"
            label-width="100px"
          ></safa-datepicker>
          <safa-custom-text
            type="decimal"
            label="مساحت پس از رعایت بر اصلاحی"
            v-model="results.Base_HouseInfo_Config.AreaAfterEdit"
            cdcName="AreaAfterEdit"
            label-width="100px"
            :m="m"
          />
          <safa-custom-text
            type="decimal"
            label="مساحت پیشروی در حریم گذرها"
            v-model="results.Sh_BaroKaf.ToGangwayArea"
            cdcName="ToGangwayArea"
            label-width="100px"
            :m="m"
          />
          <safa-combo
            ciName="CI_VergeType"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="حق مرغوبیت"
            v-model="results.Sh_BaroKaf.CI_VergeType"
            cdcName="CI_VergeType"
            label-width="100px"
          ></safa-combo>
          <safa-custom-text
            type="decimal"
            label="مساحت باقیمانده"
            v-model="results.Base_HouseInfo_Config.RemainArea"
            cdcName="RemainArea"
            label-width="100px"
            :m="m"
          />
          <safa-text
            type="number"
            label="عمق پیشروی در حریم گذرها"
            v-model="results.Sh_BaroKaf.ToGangwayLen"
            cdcName="ToGangwayLen"
            label-width="100px"
          />
          <safa-text
            type="number"
            label="میزان در مسیر"
            v-model="results.Sh_BaroKaf.PathValue"
            cdcName="PathValue"
            label-width="100px"
          />
          <safa-text
            label="میزان در مسیر بر اساس سند مالکیت"
            v-model="results.Sh_BaroKaf.PathValueBaseonDeed"
            cdcName="PathValueBaseonDeed"
            label-width="100px"
          />
          <safa-combo
            ciName="CI_Train"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="قطار شهری"
            v-model="results.Sh_BaroKaf.CI_Train"
            cdcName="CI_Train"
            label-width="100px"
          ></safa-combo>
          <safa-combo
            ciName="CI_AreaType"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="مساحت ملاک عمل"
            v-model="results.Sh_BaroKaf.CI_AreaType"
            cdcName="CI_AreaType"
            label-width="100px"
          ></safa-combo>
          <safa-combo
            ciName="CI_Frontage"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="نوع حریم"
            v-model="results.Sh_BaroKaf.CI_Frontage"
            cdcName="CI_Frontage"
            label-width="100px"
          ></safa-combo>
          <safa-combo
            ciName="CI_QuotaDuty"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="سهم خدمات"
            v-model="results.Sh_BaroKaf.CI_QuotaDuty"
            cdcName="CI_QuotaDuty"
            label-width="100px"
          ></safa-combo>
          <safa-combo
            ciName="CI_BoundCode"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="محدوده"
            v-model="results.Base_HouseInfo_Revisit.CI_BoundCode"
            cdcName="CI_BoundCode"
            label-width="100px"
          ></safa-combo>
          <safa-text
            label="عرض سطح اشغال"
            v-model="results.Base_HouseInfo_Revisit.BusyAreaWidth"
            cdcName="BusyAreaWidth"
            label-width="100px"
          />
        </safa-group>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-3">
            <safa-text
              :m="m"
              type="number"
              label="حریم فضای سبز"
              v-model="results.Sh_BaroKaf.GreenArea"
              cdcName="GreenArea"
              label-width="100px"
            />
          </div>
          <div class="col-12 col-md-9 q-mb-md">
            <safa-text
              label="آدرس"
              v-model="results.Base_AddressInfo.MainAddress"
              cdcName="MainAddress"
              m="r"
              label-width="100px"
            />
          </div>
        </div>
        <div class="row q-col-gutter-md" style="padding-bottom: 8px">
          <div class="col-md-auto">
            <safa-checkbox
              label="الویت بندی کاری دارد"
              v-model="results.Sh_BaroKaf.ValueAddedPriorityUsing"
              cdcName="ValueAddedPriorityUsing"
              label-width="100px"
            />
          </div>
          <div class="col-md-auto">
            <safa-checkbox
              label="تغییر کاربری دارد"
              v-model="results.Sh_BaroKaf.ValueAddedChangeUsing"
              cdcName="ValueAddedChangeUsing"
              label-width="100px"
            />
          </div>
          <div class="col-md-auto">
            <safa-checkbox
              label="تغییر عرض گذر"
              v-model="results.Sh_BaroKaf.ValueAddedChangeWith"
              cdcName="ValueAddedChangeWith"
              label-width="100px"
            />
          </div>
        </div>
      </div>
      <safa-grid
        v-model="results.Base_Edge"
        cdcName="Base_Edge"
        height="100%"
        maxHeight="100%"
        minHeight="220px"
        ref="jahate-arbae-grid"
        name="grid"
        helper="shahrsazi.jahateArbae"
        :m="m"
        title="جهات اربعه"
        fit
      ></safa-grid>
    </div>
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
    }
  },

  methods: {
    // editDataGrid () {
    //   alert('dskjdk')
    // },
    rowUpdated ({ dataItem, gridItems }) {
      this.results.Base_Edge = this.$refs["jahate-arbae-grid"].gridItems
    }
  }
}
</script>
