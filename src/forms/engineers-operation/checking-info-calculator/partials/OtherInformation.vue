<template>
  <div>
    <div
      class="duty-calculation-wrapper rounded-borders overflow-hidden fit"
      :class="$q.dark.isActive?'bg-lighten4':'bg-grey-2'"
    >
      <div class="duty-calculation-list full-height overflow-auto">
        <q-intersection class="duty-c-item q-py-xs q-px-md" once transition="slide-down">
          <div class="duty-row row">
            <div class="duty__expand q-ml-md">
              <q-btn icon="expand_more" color="blue" flat round @click="section1 = !section1" />
            </div>آنالیز سازه
          </div>
          <div class="q-mt-lg" v-if="section1">
            <div class="row q-col-gutter-sm">
              <safa-text
                class="col-12 col-md"
                :m="m"
                label="روش آنالیز سازه"
                v-model="model.Ref_CheckingInfo_Calculator.StructuresAnalysisType"
              />
              <safa-text
                class="col-12 col-md"
                :m="m"
                label="حد شکل پذیری سازه"
                v-model="model.Ref_CheckingInfo_Calculator.StructuresShapeLimit"
              />
              <safa-text
                class="col-12 col-md"
                :m="m"
                label="محل فرض شده برای تراز پایه ساختمان"
                v-model="model.Ref_CheckingInfo_Calculator.CI_CheckerAssumedPlaceBuildingBase"
              />
              <safa-text
                class="col-12 col-md"
                :m="m"
                label="وضعیت دیافراگم ها به لحاظ صلبیت"
                v-model="model.Ref_CheckingInfo_Calculator.CI_CheckerDiaphragmStatus"
              />
            </div>
          </div>
        </q-intersection>
      </div>
    </div>

    <div
      class="duty-calculation-wrapper rounded-borders overflow-hidden fit"
      :class="$q.dark.isActive?'bg-lighten4':'bg-grey-2'"
    >
      <div class="duty-calculation-list full-height overflow-auto">
        <q-intersection class="duty-c-item q-py-xs q-px-md" once transition="slide-down">
          <div class="duty-row row">
            <div class="duty__expand q-ml-md">
              <q-btn icon="expand_more" color="blue" flat round @click="section2 = !section2" />
            </div>گروه بندی ساختمان بر اساس استاندارد 2800 ایران
          </div>
          <div class="q-mt-lg" v-if="section2">
            <div class="row q-col-gutter-sm">
              <safa-text
                label="بر حسب شکل"
                :m="m"
                class="col-12 col-md"
                v-model="model.Ref_CheckingInfo_Calculator.CI_CheckerBuildingGroupStandardInShape"
              />
              <safa-text
                label="بر حسب اهمیت"
                :m="m"
                class="col-12 col-md"
                v-model="model.Ref_CheckingInfo_Calculator.CI_CheckerBuildingGroupStandardInImportance"
              />
            </div>
          </div>
        </q-intersection>
      </div>
    </div>

    <div
      class="duty-calculation-wrapper rounded-borders overflow-hidden fit"
      :class="$q.dark.isActive?'bg-lighten4':'bg-grey-2'"
    >
      <div class="duty-calculation-list full-height overflow-auto">
        <q-intersection class="duty-c-item q-px-md" once transition="slide-down">
          <div class="duty-row row">
            <div class="duty__expand q-ml-md">
              <q-btn icon="expand_more" color="blue" flat round @click="section3 = !section3" />
            </div>نوع سیستم باربر جانبی بر اساس استاندارد 2800 ایران
          </div>
          <div class="q-mt-lg" v-if="section3">
            <div class="row q-col-gutter-sm">
              <safa-text
                label="در جهت شمالی- جنوبی"
                :m="m"
                class="col-12 col-md"
                v-model="model.Ref_CheckingInfo_Calculator.LoadTypeInSideNS"
              />
              <safa-text
                label="در جهت شرقی- غربی"
                :m="m"
                class="col-12 col-md"
                v-model="model.Ref_CheckingInfo_Calculator.LoadTypeInSideEW"
              />
            </div>
          </div>
        </q-intersection>
      </div>
    </div>

    <div
      class="duty-calculation-wrapper rounded-borders overflow-hidden fit"
      :class="$q.dark.isActive?'bg-lighten4':'bg-grey-2'"
    >
      <div class="duty-calculation-list full-height overflow-auto">
        <q-intersection class="duty-c-item q-py-xs q-px-md" once transition="slide-down">
          <div class="duty-row row">
            <div class="duty__expand q-ml-md">
              <q-btn icon="expand_more" color="blue" flat round @click="section4 = !section4" />
            </div>نرم افزارهای مورد استفاده در محاسبات سازه
          </div>
          <div class="q-mt-lg" v-if="section4">
            <div class="row q-col-gutter-sm">
              <safa-text
                :m="m"
                label="آنالیز سازه"
                class="col-12 col-md"
                v-model="model.Ref_CheckingInfo_Calculator.SoftwaresInStructures"
              />
              <safa-text
                :m="m"
                label="آنالیز فنداسیون"
                class="col-12 col-md"
                v-model="model.Ref_CheckingInfo_Calculator.SoftwaresInFondation"
              />
            </div>
          </div>
        </q-intersection>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { model: Object, m: String },
  data () {
    return {
      section4: false,
      section3: false,
      section2: false,
      section1: false
    }
  }
}
</script>
