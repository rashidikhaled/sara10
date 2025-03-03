<template>
  <section>
    <form-wrapper :hasFooter="false" :title="title">
      <section>
        <div class="form-title">لیست بدهکاران</div>

        <div class="row q-col-gutter-md">
          <!-- <div class="col-4">
            <safa-text
              label="کد نوسازی"
              :labelShrink="false"
            />
          </div>

          <div class="col-4">
            <safa-text
              label="نام و نام خانوادگی"
              :labelShrink="false"
            />
          </div> -->

          <div class="col-2">
            <safa-label>تعداد: {{ this.generateLength(30, 40) }}</safa-label>
          </div>

          <div class="col-2">
            <safa-label
            >مبلغ کل: {{ Math.floor(Math.random() * 10000000) }}
            </safa-label
            >
          </div>

          <div class="col-2">
            <q-btn
              class="btn-save"
              label="ارسال به سامانه پیامکی"
              @click="sendToSms"
            />
          </div>

          <div class="col-2">
            <q-btn
              class="btn-edit"
              label="بازگشت"
              @click="backToDashboardlist"
            />
          </div>

          <div class="col-12">
            <safa-datagrid
              ref="grid"
              v-model="gridRows"
              :allowCopy="false"
              :allowMultipleSelection="true"
              :allowNewRow="false"
              :allowRemoveRow="false"
              :defaultFilter="filter"
              :selectOnlyCheckbox="true"
              :selectable="true"
              :showSelectedCheckbox="true"
              helper="nosaziYearChart"
              name="grid"
              title="بدهکاران"
            ></safa-datagrid>
          </div>
        </div>
      </section>
    </form-wrapper>
  </section>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'جزئیات چارت سالانه',
      formKey: '87917171-9369-4EDA-8BA5-BF3ECD04C443',
      name: 'UNosaziYearChartDetails',
      route: 'nosazi-dashboard/nosazi-year-chart-details',
      items: [
        {
          NosaziCode: '1-8-46-192-2-10-0',
          FullName: 'علی خدایی',
          BedehkarPrice: '100000',
          MobileNumber: '09380237866'
        },
        {
          NosaziCode: '1-4-76-10-1-20-0',
          FullName: 'رضا نیکزاد',
          BedehkarPrice: '500000',
          MobileNumber: '09390237856'
        },
        {
          NosaziCode: '1-8-46-192-2-0-0',
          FullName: 'سارا خالقی',
          BedehkarPrice: '1000000',
          MobileNumber: '09120237812'
        },
        {
          NosaziCode: '1-4-76-21-1-2-0',
          FullName: 'فرهاد دوستی',
          BedehkarPrice: '700000',
          MobileNumber: '09390237866'
        },
        {
          NosaziCode: '1-8-46-180-2-0-0',
          FullName: 'ملیکا شبگرد',
          BedehkarPrice: '123000',
          MobileNumber: '09120237865'
        },
        {
          NosaziCode: '1-4-80-10-1-2-0',
          FullName: 'عزیز هاشمی',
          BedehkarPrice: '470000',
          MobileNumber: '09030237900'
        },
        {
          NosaziCode: '1-8-60-192-2-0-0',
          FullName: 'محمد بخارایی',
          BedehkarPrice: '10000000',
          MobileNumber: '09120237870'
        },
        {
          NosaziCode: '1-8-12-191-2-0-0',
          FullName: 'سلماز چنگیزی',
          BedehkarPrice: '1200000',
          MobileNumber: '09370237866'
        },
        {
          NosaziCode: '1-8-30-191-2-0-0',
          FullName: 'رضا بهاری',
          BedehkarPrice: '300000',
          MobileNumber: '09300237866'
        },
        {
          NosaziCode: '1-8-46-166-2-0-0',
          FullName: 'صادق کاویانی',
          BedehkarPrice: '410000',
          MobileNumber: '09390137866'
        },
        {
          NosaziCode: '1-4-76-10-1-12-0',
          FullName: 'بهنام صبوحی',
          BedehkarPrice: '3000000',
          MobileNumber: '09100237820'
        },
        {
          NosaziCode: '1-4-76-10-20-2-0',
          FullName: 'مریم دوستی',
          BedehkarPrice: '3600000',
          MobileNumber: '09350237822'
        },
        {
          NosaziCode: '1-4-76-10-1-2-3',
          FullName: 'مجید خزایی',
          BedehkarPrice: '2360000',
          MobileNumber: '09360237866'
        },
        {
          NosaziCode: '1-4-76-11-1-2-0',
          FullName: 'سحر طوسی',
          BedehkarPrice: '700000',
          MobileNumber: '09121237866'
        },
        {
          NosaziCode: '1-78-1000-1001-0-0-0',
          FullName: 'سمانه رکن آبادی',
          BedehkarPrice: '900000',
          MobileNumber: '09351037866'
        },
        {
          NosaziCode: '1-8-46-191-22-10-0',
          FullName: 'سمیه جوادی',
          BedehkarPrice: '1500000',
          MobileNumber: '09300240866'
        },
        {
          NosaziCode: '1-4-76-10-1-2-11',
          FullName: 'حسین نیکزاد',
          BedehkarPrice: '300000',
          MobileNumber: '09120266866'
        },
        {
          NosaziCode: '1-4-76-11-11-2-0',
          FullName: 'منصور جندقی',
          BedehkarPrice: '6000000',
          MobileNumber: '09330127866'
        },
        {
          NosaziCode: '2-4-76-10-1-2-0',
          FullName: 'لاریسا جودی',
          BedehkarPrice: '400000',
          MobileNumber: '09380107866'
        },
        {
          NosaziCode: '1-3-76-10-1-2-0',
          FullName: 'آنیتا مقدم',
          BedehkarPrice: '800000',
          MobileNumber: '09380238066'
        },
        {
          NosaziCode: '1-4-90-11-1-2-0',
          FullName: 'سام نقدی',
          BedehkarPrice: '300000',
          MobileNumber: '09390211166'
        },
        {
          NosaziCode: '1-7-60-190-2-0-0',
          FullName: 'دادفر شریعتی',
          BedehkarPrice: '400000',
          MobileNumber: '09370222266'
        },
        {
          NosaziCode: '1-4-76-12-1-3-0',
          FullName: 'نامور پایدار',
          BedehkarPrice: '1500000',
          MobileNumber: '09120230066'
        },
        {
          NosaziCode: '1-4-76-10-1-6-0',
          FullName: 'رخشنده عبدالکریمی',
          BedehkarPrice: '2500000',
          MobileNumber: '09380428966'
        },
        {
          NosaziCode: '1-4-76-10-10-12-0',
          FullName: 'هنگام محمدرضایی',
          BedehkarPrice: '6000000',
          MobileNumber: '09120225866'
        },
        {
          NosaziCode: '1-4-76-11-11-2-0',
          FullName: 'مارال رحماندوست',
          BedehkarPrice: '4000000',
          MobileNumber: '09100212366'
        },
        {
          NosaziCode: '1-4-76-30-15-2-0',
          FullName: 'پانته شرف',
          BedehkarPrice: '2000000',
          MobileNumber: '09360127866'
        },
        {
          NosaziCode: '1-4-76-16-10-2-0',
          FullName: 'ایرانا خراسانی',
          BedehkarPrice: '1200000',
          MobileNumber: '09190237866'
        },
        {
          NosaziCode: '1-4-76-11-10-2-0',
          FullName: 'گلبهار اصلانی',
          BedehkarPrice: '3000000',
          MobileNumber: '09380466966'
        },
        {
          NosaziCode: '1-4-76-19-11-2-0',
          FullName: 'زیبا عبادی',
          BedehkarPrice: '7000000',
          MobileNumber: '09390125866'
        },
        {
          NosaziCode: '1-4-76-16-10-2-0',
          FullName: 'آذربانو اشتری',
          BedehkarPrice: '1200000',
          MobileNumber: '09370149866'
        },
        {
          NosaziCode: '1-4-76-17-11-2-0',
          FullName: 'افسون عالی',
          BedehkarPrice: '600000',
          MobileNumber: '09120247866'
        },
        {
          NosaziCode: '1-4-76-19-20-2-0',
          FullName: 'یزدان یار موسوی',
          BedehkarPrice: '1000000',
          MobileNumber: '09360237700'
        },
        {
          NosaziCode: '1-4-76-30-10-2-0',
          FullName: 'افسر تهرانی',
          BedehkarPrice: '7100000',
          MobileNumber: '09380237820'
        },
        {
          NosaziCode: '1-4-76-90-11-2-0',
          FullName: 'گوهرناز فتاحی',
          BedehkarPrice: '8000000',
          MobileNumber: '09380237826'
        },
        {
          NosaziCode: '1-4-76-60-12-2-0',
          FullName: 'گوهردخت توفیق',
          BedehkarPrice: '7200000',
          MobileNumber: '09380237865'
        },
        {
          NosaziCode: '1-4-76-11-12-2-0',
          FullName: 'هدیه پناهنده',
          BedehkarPrice: '3000000',
          MobileNumber: '09380277866'
        },
        {
          NosaziCode: '1-4-76-18-10-2-0',
          FullName: 'اختر یاحقی',
          BedehkarPrice: '4500000',
          MobileNumber: '09312237866'
        },
        {
          NosaziCode: '1-4-76-12-11-2-0',
          FullName: 'آرش محجوبی',
          BedehkarPrice: '3000000',
          MobileNumber: '09387897866'
        },
        {
          NosaziCode: '1-4-76-20-11-2-0',
          FullName: 'سرور رحمانیان',
          BedehkarPrice: '8000000',
          MobileNumber: '09380782666'
        }
      ],
      gridRows: []
    }
  },
  mounted () {
    this.fillGrid()
  },
  methods: {
    sendToSms () {
      this.showSending()

      setTimeout(this.serviceCall, 3000)
    },
    serviceCall () {
      this.hideSending()
    },
    backToDashboardlist () {
      this.$router.push('/nosazi/dashboard')
    },
    fillGrid () {
      const rnd = Math.floor(Math.random() * this.items.length)

      // console.log('////////rnd', rnd)

      if (rnd < 20) {
        for (let index = 0; index <= 20; index++) {
          this.gridRows.push(this.items[rnd + index])
        }
      } else if (rnd > 20) {
        for (let index = 20; index > 0; index--) {
          this.gridRows.push(this.items[rnd - index])
        }
      }
    },
    generateLength (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }
  }
}
</script>
