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
            </div>پارامترهای مربوط به محاسبه ضریب بازتاب
          </div>
          <div class="q-mt-lg" v-if="section1">
            <div class="row q-col-gutter-sm">
              <safa-text
                class="col-12 col-md"
                label="TO"
                v-model="model.Ref_CheckingInfo_Calculator.ParamCoefReflectionTO"
                :m="m"
              />
              <safa-text
                class="col-12 col-md"
                label="TS"
                v-model="model.Ref_CheckingInfo_Calculator.ParamCoefReflectionTS"
                :m="m"
              />
              <safa-text
                class="col-12 col-md"
                label="S"
                v-model="model.Ref_CheckingInfo_Calculator.ParamCoefReflectionS"
                :m="m"
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
            </div>پارامترهای مربوط به محاسبه ضریب زلزله و برش پایه
          </div>
          <div class="q-mt-lg" v-if="section2">
            <div class="row q-col-gutter-sm">
              <safa-text
                label="نسبت شتاب مبنای طرح"
                class="col-12 col-md"
                v-model="model.Ref_CheckingInfo_Calculator.ParamCoefEqA"
                :m="m"
              />
              <safa-text
                label="ضریب اهمیت ساختمان"
                class="col-12 col-md"
                v-model="model.Ref_CheckingInfo_Calculator.ParamCoefEqI"
                :m="m"
              />
              <safa-text
                label="طبقه بندی نوع زمین ساختگاه"
                class="col-12 col-md"
                v-model="model.Ref_CheckingInfo_Calculator.ParamCoefEqF"
                :m="m"
              />
              <safa-text
                label="ارتفاع ساختمان از تراز پایه"
                class="col-12 col-md"
                v-model="model.Ref_CheckingInfo_Calculator.ParamCoefEqH"
                :m="m"
              />
              <safa-text
                label="وزن کل ساختمان"
                class="col-12 col-md"
                v-model="model.Ref_CheckingInfo_Calculator.ParamCoefEqW"
                :m="m"
              />
            </div>
          </div>
        </q-intersection>
      </div>
    </div>
    <FormRow :lg="2" :md="2" :sm="1" :xl="3">
      <FormControl v-for="(item,index) in list" :key="index">
        <div
          class="duty-calculation-wrapper rounded-borders overflow-hidden fit"
          :class="$q.dark.isActive?'bg-lighten4':'bg-grey-2'"
        >
          <div class="duty-calculation-list full-height overflow-auto">
            <q-intersection class="duty-c-item q-py-xs q-px-md" once transition="slide-down">
              <div class="duty-row row">
                <div class="duty__expand q-ml-md">
                  <q-btn icon="expand_more" color="blue" flat round @click="section3 = !section3" />
                </div>
                {{item.title}}
              </div>
              <div class="q-mt-lg" v-if="section3">
                <div class="row q-col-gutter-sm">
                  <safa-text
                    class="col-12 col-md"
                    label="شمالی - جنوبی"
                    v-model="item.NSValue"
                    :m="m"
                  />
                  <safa-text
                    class="col-12 col-md"
                    label="شرقی - غربی"
                    v-model="item.EWValue"
                    :m="m"
                  />
                </div>
              </div>
            </q-intersection>
          </div>
        </div>
      </FormControl>
    </FormRow>
  </div>
</template>
<script>
export default {
  props: { model: Object, m: String },
  mounted () {
    const x = this.model.Ref_CheckingInfo_Calculator
    this.list = [
      {
        title: "زمان تناوب اصلی ساختمان",
        NSValue: x.ParamCoefNS_T,
        EWValue: x.ParamCoefEW_T
      },
      {
        title: "ضریب بازتاب ساختمان",
        NSValue: x.ParamCoefNS_B,
        EWValue: x.ParamCoefEW_B
      },
      {
        title: "ضریب رفتار ساختمان",
        NSValue: x.ParamCoefNS_R,
        EWValue: x.ParamCoefEW_R
      },
      {
        title: "نیروی جانبی اضافی",
        NSValue: x.ParamCoefNS_FT,
        EWValue: x.ParamCoefEW_FT
      },
      {
        title: "نیروی برشی در تراز پایه",
        NSValue: x.ParamCoefNS_V,
        EWValue: x.ParamCoefEW_V
      },
      {
        title: "ضریب بزرگنمایی برون مرکزی اتفاقی",
        NSValue: x.ParamCoefNS_AJ,
        EWValue: x.ParamCoefEW_AJ
      },
      {
        title: "ضریب زلزله",
        NSValue: x.ParamCoefNS_C,
        EWValue: x.ParamCoefEW_C
      }
    ]
  },
  data () {
    return {
      section1: false,
      section2: false,
      section3: true,
      list: [
        { title: "زمان تناوب اصلی ساختمان", NSValue: 0, EWValue: 0 },
        { title: "ضریب بازتاب ساختمان", NSValue: 0, EWValue: 0 },
        { title: "ضریب رفتار ساختمان", NSValue: 0, EWValue: 0 },
        { title: "نیروی جانبی اضافی", NSValue: 0, EWValue: 0 },
        { title: "نیروی برشی در تراز پایه", NSValue: 0, EWValue: 0 },
        { title: "ضریب بزرگنمایی برون مرکزی اتفاقی", NSValue: 0, EWValue: 0 },
        { title: "ضریب زلزله", NSValue: 0, EWValue: 0 }
      ]
    }
  }
}
</script>
