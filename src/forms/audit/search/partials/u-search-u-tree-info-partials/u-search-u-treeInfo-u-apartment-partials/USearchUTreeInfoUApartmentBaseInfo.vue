<template>
  <fit>
    <div class="q-pa-sm">
      <internal-section class="q-mb-md" title="اطلاعات پرونده">
        <form-row class="q-mb-sm" :xs="1" :sm="1" :md="2" :lg="2" :xl="2">
          <form-control>
            <nosazi-code-input
              v-model="dataContext.nosaziCode"
              label="کد نوسازی :"
              label-width="90px"
              :enabled="
                m === 'e'
                  ? dataContext.nosaziCodeEnable
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
              v-model="dataContext.preNosaziCode"
              label="کد نوسازی ممیزی :"
              label-width="90px"
              :enabled="
                m === 'e'
                  ? dataContext.preNosaziCodeEnable
                    ? '1-1-1-1-1-1-1'
                    : '0-0-0-0-0-0-0'
                  : '0-0-0-0-0-0-0'
              "
              m="e"
              :actions="false"
            />
          </form-control>
        </form-row>
        <form-row :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.MainAddress"
              label="آدرس :"
              label-width="100px"
              m="r"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.FamousRegion"
              label="در محل مشهور به :"
              label-width="100px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.Plack"
              label="پلاک آبی :"
              label-width="100px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.PostCode"
              label="کدپستی :"
              label-width="100px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.BlockNo"
              label="نام بلوک ساختمانی :"
              label-width="100px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.FloorDone"
              label="طبقه وقوع :"
              label-width="100px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.EntranceDoorNo"
              label="شماره درب ورودی :"
              label-width="100px"
              :m="m"
            />
          </form-control>
          <FormControl>
            <safa-combo
              label="جهت وقوع :"
              label-width="100px"
              v-model="dataContext.mainContext.Base_Info.CI_SideCode"
              :m="m"
              ciName="CI_SideCode"
              domainName="CI_SaraM1"
            />
          </FormControl>
        </form-row>
      </internal-section>

      <internal-section class="q-mb-md" title="شماره شناسنامه">
        <form-row :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.Asli"
              label="اصلی :"
              label-width="70px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.Fari"
              label="فرعی :"
              label-width="70px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.Ghete"
              label="قطعه :"
              label-width="70px"
              :m="m"
            />
            <!-- :label-width="$q.screen.lt.md ? '70px' : '45px'" -->
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.RegisterSection"
              label="پخش ثبتی :"
              label-width="70px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.MafrooziDoc"
              label="مفروزی سند :"
              label-width="70px"
              :m="m"
            />
          </form-control>
        </form-row>
      </internal-section>

      <internal-section title="اطلاعات اصلی">
        <form-row :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.ToftImpart"
              label="مساحت سهم العرصه :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.ApartmentMoshaArea"
              label="مساحت مشاعات :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.TotalArea_Apartment"
              label="مساحت کل زیر بنا :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_DocType"
              label="نوع سند :"
              label-width="115px"
              ciName="CI_DocType"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.ApartmentFrontArea"
              label="مساحت بالکن :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.TajavozArea"
              label="مساحت تجاوز به حریم گذرها :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.AnbarArea"
              label="مساحت انبار تخصصی :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_FrontType"
              label="کد نوع بالکن :"
              label-width="115px"
              ciName="CI_FrontType"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.ParkingArea"
              label="مساحت پارکینگ اختصاصی :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.ApartmentUsefulArea"
              label="مساحت زیربنای مفید :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.Populations"
              label="جمعیت :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.ParkingCount"
              label="تعداد پارکینگ :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.CarCount"
              label="تعداد خودرو :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.FamilyCount"
              label="تعداد خانوار :"
              label-width="115px"
              :m="m"
            />
          </form-control>
        </form-row>
      </internal-section>
    </div>
  </fit>
</template>

<script>
export default {
  name: "USearchUTreeInfoUApartmentBaseInfo",

  props: {
    m: {
      type: String,
      default: "r"
    },
    dataContext: {
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
