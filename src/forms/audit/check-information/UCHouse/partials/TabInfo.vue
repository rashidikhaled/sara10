<template>
  <fit>
      <div class="q-pa-sm">
    <form-row>
            <form-control>
              <nosazi-code-input
                v-model="value.Base_Info.nosaziCode"
                label="کد نوسازی :"
                label-width="90px"
                :enabled="
                  m === 'e'
                    ? value.Base_Info.nosaziCodeEnable
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
                v-model="value.Base_Info.preNosaziCode"
                label="کد نوسازی ممیزی :"
                label-width="90px"
                :enabled="
                  m === 'e'
                    ? value.Base_Info.preNosaziCodeEnable
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
                v-model="value.Base_Info.nosaziPreCode"
                label="کد نوسازی قدیم :"
                label-width="90px"
                :m="value.Base_Info.nosaziPreCodeEnable ? 'e' : 'r'"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.MainAddress"
                label="آدرس :"
                label-width="90px"
                :m="m"
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
                v-model="value.Base_Info.BlockNo"
                label="نام بلوک ساختمانی :"
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
              <!-- :label-width="$q.screen.lt.md ? '65px' : '45px'" -->
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
                v-model="value.Base_Info.DocArea"
                label="مساحت زمین طبق سند :"
                label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_HouseStatus"
                label="ماهیت فیزیکی :"
                label-width="90px"
                ciName="CI_HouseStatus"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.CurrentArea"
                label="مساحت زمین طبق موجود :"
                label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_GeoStatus"
                label="موقعیت زمین :"
                label-width="90px"
                ciName="CI_GeoStatus"
                domainName="CI_SaraM1"
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
              <safa-combo2
                v-model="value.Base_Info.CI_OwnerType"
                label="نوع مالکیت :"
                label-width="90px"
                ciName="CI_OwnerType"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_DocStatus"
                label="وضعیت سند :"
                label-width="90px"
                ciName="CI_DocStatus"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_UsingGroup"
                label="نوع استفاده :"
                label-width="90px"
                ciName="CI_UsingGroup"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.BuildingCount"
                label="تعداد ساختمان :"
                label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.ApartmentCount"
                label="تعداد آپارتمان :"
                label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.ShopCount"
                label="تعداد واحد غیر مسکونی :"
                label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.FloorCount"
                label="تعداد طبقات :"
                label-width="90px"
                :m="m"
              />
            </form-control>
                    <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_PoolType"
                label="نوع استخر :"
                 label-width="90px"
                ciName="CI_PoolType"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_ShaftType"
                label="نوع چاه :"
                 label-width="90px"
                ciName="CI_ShaftType"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.AntenType"
                label="دکل و نوع آنتن :"
                 label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.PoolCubature"
                label="حجم استخر :"
                 label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.ShaftCount"
                label="تعداد چاه :"
                 label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_OperatorType"
                label="نوع اپراتور :"
                 label-width="90px"
                ciName="CI_OperatorType"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.PoolArea"
                label="مساحت استخر :"
                 label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.UsefulTreeCount"
                label="تعداد درختان مثمر :"
                 label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.AntenHeight"
                label="ارتفاع دکل و آنتن :"
                 label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_GlasshouseType"
                label="نوع گلخانه :"
                 label-width="90px"
                ciName="CI_GlasshouseType"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.NonUsefulTreeCount"
                label="تعداد درختان غیر مثمر :"
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
                v-model="value.Base_Info.GlasshouseArea"
                label="مساحت گلخانه :"
                 label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.MoTreeCount"
                label="تعداد درختان مو :"
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
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.InsideTreeType"
                label="درختان داخل ملک :"
                 label-width="90px"
                source-type="local"
                :options="eumTreeType"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.OutsideTreeType"
                label="درختان خارج ملک :"
                 label-width="90px"
                source-type="local"
                :options="eumTreeType"
                :m="m"
              />
            </form-control>
            <form-control>
              <!-- <safa-checkbox
                v-model="value.Base_Info.ParkingRamp"
                label="رمپ ورودی پارکینگ :"
                 label-width="90px"
                :m="m"
              /> -->
              <div class="flex items-center full-height">
                <safa-label style="width: 115px">رمپ ورودی پارکینگ :</safa-label>
                <safa-checkbox
                  v-model="value.Base_Info.ParkingRamp"
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
                  v-model="value.Base_Info.HasRegularShape"
                  :m="m"
                />
                <safa-radio
                  label="منظم"
                  :val="'1'"
                  v-model="value.Base_Info.HasRegularShape"
                  :m="m"
                />
              </div>
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_SideCode"
                label="جهت نما :"
                 label-width="90px"
                ciName="CI_SideCode"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.PostBox"
                label="تعداد صندوق پستی :"
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
  name: "TabInfo",

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
    return {
      eumTreeType: [
        {
          ID: "InsideTreeType",
          Title: "درخت مثمر"
        },
        {
          ID: "OutsideTreeType",
          Title: "درخت غیر مثمر"
        }
      ]
    }
  }
}
</script>
