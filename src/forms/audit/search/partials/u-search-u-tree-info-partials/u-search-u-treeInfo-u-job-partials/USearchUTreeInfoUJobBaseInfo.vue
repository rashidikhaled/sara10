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
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.Telephone"
              label="شماره تلفن :"
              label-width="100px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.JobUnitName"
              label="نام واحد کسبی :"
              label-width="100px"
              :m="m"
            />
          </form-control>
        </form-row>
      </internal-section>

      <internal-section class="q-mb-md" title="اشتراکات">
        <form-row :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.SubScription_Gaz"
              label="شماره اشتراک گاز :"
              label-width="95px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.SubScription_Ab"
              label="شماره اشتراک آب :"
              label-width="95px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.SubScription_Bargh"
              label="شماره اشتراک برق :"
              label-width="95px"
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

      <internal-section title="اطلاعات صنفی">
        <form-row :xs="1" :sm="2" :md="3" :lg="3" :xl="4">
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.TotalArea_Shop"
              label="مساحت واحد کسب :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.HightUpper4"
              label="ارتفاع بیش از چهار متر :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.HalfFloor"
              label="نیم طبقه :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.AnbarArea"
              label="انبار ضمیمه :"
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
              v-model="dataContext.mainContext.Base_Info.ParkingArea"
              label="مساحت پارکینگ :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.DahanehCount"
              label="تعداد دهنه :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.RoomCount"
              label="تعداد اطاق :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.WorkerCount"
              label="تعداد پرسنل :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_JobLocation"
              label="کد محل استقرار :"
              label-width="115px"
              ciName="CI_JobLocation"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.MafrooziDoc"
              label="مفروزی سند :"
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
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_JobLicenceResource"
              label="کد مرجع صدور :"
              label-width="115px"
              ciName="CI_JobLicenceResource"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              v-model="
                dataContext.mainContext.Base_Info.JobLicenceExportationDate
              "
              label="تاریخ صدور :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_JobName"
              label="عنوان شغلی :"
              label-width="115px"
              ciName="CI_JobName"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_JobStatus"
              label="وضعیت واحد صنفی :"
              label-width="115px"
              ciName="CI_JobStatus"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.JobLicenceCode"
              label="شماره صدور :"
              label-width="115px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_DutyYear"
              label="سال محاسبه فعالیت :"
              label-width="115px"
              ciName="CI_DutyYear"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_TradingStatus"
              label="موقعیت تجاری :"
              label-width="115px"
              ciName="CI_TradingStatus"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_GeoStatus"
              label="موقعیت زمین :"
              label-width="115px"
              ciName="CI_GeoStatus"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              v-model="dataContext.mainContext.Base_Info.JobActivateDate"
              label="تاریخ شروع فعالیت :"
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
  name: "USearchUTreeInfoJobBaseInfo",

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
