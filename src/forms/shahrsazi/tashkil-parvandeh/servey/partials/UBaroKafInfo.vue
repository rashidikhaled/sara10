<template>
  <fit>
    <div class="q-mb-sm">
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <div class="col-4">
          <div class="column q-gutter-sm">
            <safa-custom-text
              label="مساحت طبق سند"
              v-model="results.Base_HouseInfo_Revisit.DocArea"
              :m="m"
              label-width="132px"
              cdc-name="مساحت طبق سند"
              type="decimal"
            />
            <safa-custom-text
              type="decimal"
              label="مساحت وضع موجود"
              v-model="results.Base_HouseInfo_Revisit.CurrentArea"
              :m="m"
              label-width="132px"
            />
            <safa-custom-text
              type="decimal"
              label="میزان در مسیر"
              v-model="results.Sh_BaroKaf.PathValue"
              :m="m"
              label-width="132px"
            />
            <safa-custom-text
              type="decimal"
              label="میزان در مسیررعایت شده"
              v-model="results.Sh_BaroKaf.PathValueBaseonDeed"
              :m="m"
              label-width="132px"
            />
            <safa-custom-text
              type="decimal"
              label="میزان تجاوز به معبر"
              :m="m"
              label-width="132px"
              v-model="results.Sh_BaroKaf.ToGangwayArea"
            />
            <safa-custom-text
              type="decimal"
              label="اختلاف مساحت خارج معبر"
              :m="m"
              label-width="132px"
              v-model="results.Sh_BaroKaf.ToGangwayLen"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="column q-gutter-sm">
            <!-- <safa-combo
            ciName="CI_Frontage"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="نوع حریم"
            v-model="results.Sh_BaroKaf.CI_Frontage"
            :m="m"
            label-width="132px"
          ></safa-combo>
          <safa-custom-text
            label="میزان در حریم"
            label-width="132px"
            type="decimal"
            v-model="results.Sh_BaroKaf.ToAdjusentArea"
            :m="m"
          /> -->
            <safa-custom-text
              type="decimal"
              label="مساحت اصلاحی"
              v-model="results.Base_HouseInfo_Config.AreaAfterEdit"
              m="r"
              label-width="132px"
            />
            <!-- <safa-custom-text
            label="مبلغ تعرفه قدیم"
            label-width="132px"
            v-model="results.Sh_BaroKaf.KorokiNumber"
            type="money"
            m="r"
          /> -->
            <safa-text
              :m="m"
              type="number"
              label="حریم فضای سبز / منطقه ثامن"
              v-model="results.Sh_BaroKaf.GreenArea"
              label-width="132px"
            />
            <safa-combo
              label="وضعیت ملک"
              :m="m"
              ci-name="CI_HouseStatus"
              domain-name="CI_SaraM1"
              v-model="results.Base_HouseInfo_Revisit.CI_HouseStatus"
              label-width="132px"
            />
            <text-template
              label="نظرات برو کف"
              :label-shrink="false"
              :formKey="formKey"
              v-model="results.Sh_BaroKaf.BarKafComments"
              :m="m"
              label-width="132px"
              :fit="false"
              style="min-height: 50px !imporatnt"
            />
          </div>
        </div>

        <div class="col-4">
          <div class="column">
            <safa-datatable
              margin="0"
              height="215px"
              helper="frontage"
              :m="m"
              title="حرائم"
              v-model="results.Base_FrontAge"
              fit
            />
          </div>
        </div>
        <!-- به درخواست مشهد این فیلد اضافه شد -->
        <div class="col-4">
          <safa-securityPanel
            id="962d8197-4d0b-3a25-8e26-25ac0978de72"
            caption="میزان در مسیر برابر گواهی قبلی"
          >
            <safa-text
              :m="m"
              type="number"
              label="میزان در مسیر برابر گواهی قبلی"
              v-model="results.Sh_BaroKaf.PreviousPathValue"
              label-width="132px"
            />
          </safa-securityPanel>
        </div>
      </div>
    </div>
    <safa-grid
      v-model="results.Base_Edge"
      fit
      height="100%"
      maxHeight="100%"
      minHeight="200px"
      ref="jahate-arbae-grid"
      name="grid"
      helper="jahateArbaeSurvey"
      :m="m"
      title="جهات اربعه"
    />
  </fit>
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
