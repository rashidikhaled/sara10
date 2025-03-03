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
              v-model="dataContext.nosaziPreCode"
              label="کد نوسازی قدیم :"
              label-width="100px"
              :m="dataContext.nosaziPreCodeEnable ? 'e' : 'r'"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.MainAddress"
              label="آدرس :"
              label-width="100px"
              :m="m"
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
              v-model="dataContext.mainContext.Base_Info.BlockNo"
              label="نام بلوک ساختمانی :"
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
        </form-row>
      </internal-section>

      <internal-section class="q-mb-md" title="شماره شناسنامه">
        <form-row :xs="1" :sm="2" :md="4" :lg="4" :xl="4">
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.Asli"
              label="اصلی :"
              label-width="65px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.Fari"
              label="فرعی :"
              label-width="65px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.Ghete"
              label="قطعه :"
              label-width="65px"
              :m="m"
            />
            <!-- :label-width="$q.screen.lt.md ? '65px' : '45px'" -->
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.RegisterSection"
              label="پخش ثبتی :"
              label-width="65px"
              :m="m"
            />
          </form-control>
        </form-row>
      </internal-section>

      <internal-section class="q-mb-md" title="اطلاعات زمین">
        <form-row :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.DocArea"
              label="مساحت زمین طبق سند :"
              label-width="130px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_HouseStatus"
              label="ماهیت فیزیکی :"
              label-width="130px"
              ciName="CI_HouseStatus"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.CurrentArea"
              label="مساحت زمین طبق موجود :"
              label-width="130px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_GeoStatus"
              label="موقعیت زمین :"
              label-width="130px"
              ciName="CI_GeoStatus"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_DocType"
              label="نوع سند :"
              label-width="130px"
              ciName="CI_DocType"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_OwnerType"
              label="نوع مالکیت :"
              label-width="130px"
              ciName="CI_OwnerType"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_DocStatus"
              label="وضعیت سند :"
              label-width="130px"
              ciName="CI_DocStatus"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_UsingGroup"
              label="نوع استفاده :"
              label-width="130px"
              ciName="CI_UsingGroup"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.BuildingCount"
              label="تعداد ساختمان :"
              label-width="130px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.ApartmentCount"
              label="تعداد آپارتمان :"
              label-width="130px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.ShopCount"
              label="تعداد واحد غیر مسکونی :"
              label-width="130px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.FloorCount"
              label="تعداد طبقات :"
              label-width="130px"
              :m="m"
            />
          </form-control>
        </form-row>
      </internal-section>

      <internal-section title="اطلاعات تکمیلی">
        <form-row :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_PoolType"
              label="نوع استخر :"
              label-width="115px"
              ciName="CI_PoolType"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_ShaftType"
              label="نوع چاه :"
              label-width="115px"
              ciName="CI_ShaftType"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.AntenType"
              label="دکل و نوع آنتن :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.PoolCubature"
              label="حجم استخر :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.ShaftCount"
              label="تعداد چاه :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_OperatorType"
              label="نوع اپراتور :"
              label-width="115px"
              ciName="CI_OperatorType"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.PoolArea"
              label="مساحت استخر :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.UsefulTreeCount"
              label="تعداد درختان مثمر :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.AntenHeight"
              label="ارتفاع دکل و آنتن :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_GlasshouseType"
              label="نوع گلخانه :"
              label-width="115px"
              ciName="CI_GlasshouseType"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.NonUsefulTreeCount"
              label="تعداد درختان غیر مثمر :"
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
              v-model="dataContext.mainContext.Base_Info.GlasshouseArea"
              label="مساحت گلخانه :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.MoTreeCount"
              label="تعداد درختان مو :"
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
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.InsideTreeType"
              label="درختان داخل ملک :"
              label-width="115px"
              source-type="local"
              :options="eumTreeType"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.OutsideTreeType"
              label="درختان خارج ملک :"
              label-width="115px"
              source-type="local"
              :options="eumTreeType"
              :m="m"
            />
          </form-control>
          <form-control>
            <!-- <safa-checkbox
              v-model="dataContext.mainContext.Base_Info.ParkingRamp"
              label="رمپ ورودی پارکینگ :"
              label-width="115px"
              :m="m"
            /> -->
            <div class="flex items-center full-height">
              <safa-label style="width: 115px">رمپ ورودی پارکینگ :</safa-label>
              <safa-checkbox
                v-model="dataContext.mainContext.Base_Info.ParkingRamp"
                :m="m"
              />
            </div>
          </form-control>
          <form-control>
            <div class="flex items-center q-gutter-x-sm full-height">
              <safa-label style="width: 115px">کد شکل :</safa-label>
              <safa-radio
                label="نامنظم"
                :val="'0'"
                v-model="dataContext.mainContext.Base_Info.HasRegularShape"
                :m="m"
              />
              <safa-radio
                label="منظم"
                :val="'1'"
                v-model="dataContext.mainContext.Base_Info.HasRegularShape"
                :m="m"
              />
            </div>
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_SideCode"
              label="جهت نما :"
              label-width="115px"
              ciName="CI_SideCode"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.PostBox"
              label="تعداد صندوق پستی :"
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
  name: "USearchUTreeInfoUHouseBaseInfo",

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
    return {
      eumTreeType: [
        {
          ID: "0",
          Title: "نامشخص"
        },
        {
          ID: "1",
          Title: "درخت مثمر"
        },
        {
          ID: "2",
          Title: "درخت غیر مثمر"
        }
      ]
    }
  }
}
</script>
