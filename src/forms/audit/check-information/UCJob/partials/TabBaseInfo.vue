<template>
    <fit>
      <div class="q-pa-sm">
          <form-row>
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
            <form-control>
              <safa-text
                v-model="value.Base_Info.Telephone"
                label="شماره تلفن :"
                label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.JobUnitName"
                label="نام واحد کسبی :"
                label-width="90px"
                :m="m"
              />
            </form-control>
              <form-control>
              <safa-text
                v-model="value.Base_Info.SubScription_Gaz"
                label="شماره اشتراک گاز :"
                label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.SubScription_Ab"
                label="شماره اشتراک آب :"
                label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.SubScription_Bargh"
                label="شماره اشتراک برق :"
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
                v-model="value.Base_Info.TotalArea_Shop"
                label="مساحت واحد کسب :"
            label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.HightUpper4"
                label="ارتفاع بیش از چهار متر :"
            label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.HalfFloor"
                label="نیم طبقه :"
            label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.AnbarArea"
                label="انبار ضمیمه :"
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
                v-model="value.Base_Info.ParkingArea"
                label="مساحت پارکینگ :"
            label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.DahanehCount"
                label="تعداد دهنه :"
            label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.RoomCount"
                label="تعداد اطاق :"
            label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.WorkerCount"
                label="تعداد پرسنل :"
            label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_JobLocation"
                label="کد محل استقرار :"
            label-width="90px"
                ciName="CI_JobLocation"
                domainName="CI_SaraM1"
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
                v-model="value.Base_Info.TajavozArea"
                label="مساحت تجاوز به حریم گذرها :"
            label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_JobLicenceResource"
                label="کد مرجع صدور :"
            label-width="90px"
                ciName="CI_JobLicenceResource"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                v-model="
                  value.Base_Info.JobLicenceExportationDate
                "
                label="تاریخ صدور :"
            label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_JobName"
                label="عنوان شغلی :"
            label-width="90px"
                ciName="CI_JobName"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_JobStatus"
                label="وضعیت واحد صنفی :"
            label-width="90px"
                ciName="CI_JobStatus"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.JobLicenceCode"
                label="شماره صدور :"
            label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_DutyYear"
                label="سال محاسبه فعالیت :"
            label-width="90px"
                ciName="CI_DutyYear"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_TradingStatus"
                label="موقعیت تجاری :"
            label-width="90px"
                ciName="CI_TradingStatus"
                domainName="CI_SaraM1"
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
              <safa-datepicker
                v-model="value.Base_Info.JobActivateDate"
                label="تاریخ شروع فعالیت :"
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
  name: "USearchUTreeInfoJobBaseInfo",

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
