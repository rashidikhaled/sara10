<template>
    <fit>
      <div class="q-pa-sm">
          <form-row >
            <form-control>
              <nosazi-code-input
                v-model="value.nosaziCode"
                label="کد نوسازی :"
                label-width="90px"
                :enabled="
                  m === 'e'
                    ? value.nosaziCodeEnable
                      ? '1-1-1-1-1-1-1'
                      : '0-0-0-0-0-0-0'
                    : '0-0-0-0-0-0-0'
                "
                m="e"
                :actions="false"
              />
            </form-control>
            <form-control>
              <nosazi-code-input
                v-model="value.preNosaziCode"
                label="کد نوسازی ممیزی :"
                label-width="90px"
                :enabled="
                  m === 'e'
                    ? value.preNosaziCodeEnable
                      ? '1-1-1-1-1-1-1'
                      : '0-0-0-0-0-0-0'
                    : '0-0-0-0-0-0-0'
                "
                m="e"
                :actions="false"
              />
            </form-control>
                   <form-control>
              <safa-text
                v-model="value.Base_Info.MainAddress"
                label="آدرس :"
                  label-width="90px"
                m="r"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.FamousRegion"
                label="در محل مشهور به :"
                  label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.Plack"
                label="پلاک آبی :"
                  label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.PostCode"
                label="کدپستی :"
                  label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.BlockNo"
                label="نام بلوک ساختمانی :"
                  label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.FloorDone"
                label="طبقه وقوع :"
                  label-width="90px"
                :m="m"
              />
            </form-control>
            <FormControl>
              <safa-combo
                label="جهت وقوع :"
                  label-width="90px"
                v-model="value.Base_Info.CI_SideCode"
                :m="m"
                ciName="CI_SideCode"
                domainName="CI_SaraM1"
              />
            </FormControl>
              <form-control>
              <safa-text
                v-model="value.Base_Info.Asli"
                label="اصلی :"
                 label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.Fari"
                label="فرعی :"
                 label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.Ghete"
                label="قطعه :"
                 label-width="90px"
                :m="m"
              />
              <!-- :label-width="$q.screen.lt.md ? '70px' : '45px'" -->
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.RegisterSection"
                label="پخش ثبتی :"
                 label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.MafrooziDoc"
                label="مفروزی سند :"
                 label-width="90px"
                :m="m"
              />
            </form-control>
               <form-control>
              <safa-text
                v-model="value.Base_Info.ToftImpart"
                label="مساحت سهم العرصه :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.ApartmentMoshaArea"
                label="مساحت مشاعات :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.TotalArea_Apartment"
                label="مساحت کل زیر بنا :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_DocType"
                label="نوع سند :"
               label-width="90px"
                ciName="CI_DocType"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.ApartmentFrontArea"
                label="مساحت بالکن :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.TajavozArea"
                label="مساحت تجاوز به حریم گذرها :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.AnbarArea"
                label="مساحت انبار تخصصی :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_FrontType"
                label="کد نوع بالکن :"
               label-width="90px"
                ciName="CI_FrontType"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.ParkingArea"
                label="مساحت پارکینگ اختصاصی :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.ApartmentUsefulArea"
                label="مساحت زیربنای مفید :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.Populations"
                label="جمعیت :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.ParkingCount"
                label="تعداد پارکینگ :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.CarCount"
                label="تعداد خودرو :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.FamilyCount"
                label="تعداد خانوار :"
               label-width="90px"
                :m="m"
              />
            </form-control>
          </form-row>
         </div>
    </fit>
  </template>

<script>
export default {
  name: "BaseInfo",

  props: {
    m: {
      type: String,
      default: "r"
    },
    value: {
      type: Object,
      required: true
    },
    isLoadedFromMenu: Boolean
  },

  data () {
    return {}
  }
}
</script>
