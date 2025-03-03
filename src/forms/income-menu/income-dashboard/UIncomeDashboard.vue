<template>
  <div class="row Dashboard q-pa-md">
    <div class="col">
      <div class="row q-col-gutter-lg">

        <div class="col-12 col-sm-6 col-md-8">
          <div class="row q-card q-pa-md">
            <div class="col-12 chart-title q-mb-sm">جمع مبالغ فیش های تایید شده</div>
            <canvas
              @click="confirmedFicheClick"
              id="requestsChart"
              style="max-height: 250px; height: 250px; cursor:pointer"
            />
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <div
            class="row q-card q-pa-md q-mb-sm"
            style="max-height: 310px; height: 310px"
          >
            <div class="col-12 chart-title">دسته بندی فیش ها</div>
            <div class="row fit">
              <div class="col-3 column q-pt-md">

                <div
                  class="row reverse "
                  style="color: #7b68ee"
                >
                  <q-icon
                    size="8px"
                    name="lens"
                  />
                  <p
                    class="q-mx-xs q-mb-none"
                    style="font-size: 19px"
                  >30%</p>
                  <p
                    class="col-12 text-center"
                    style="color: #7b68ee; font-size:10px"
                  >تایید شده</p>
                  <q-separator
                    class="col-12"
                    style="background-color: #8d82fd !important; height: 1px"
                  />
                </div>

                <div
                  class="row reverse q-mt-sm"
                  style="color: #EAB645"
                >
                  <q-icon
                    size="8px"
                    name="lens"
                  />
                  <p
                    class="q-mx-xs q-mb-none"
                    style="font-size: 19px"
                  >50%</p>
                  <p
                    class="col-12 text-center"
                    style="color: #EAB645; font-size:10px"
                  >موقت</p>
                  <q-separator
                    class="col-12"
                    style="background-color: #EAB645 !important; height: 1px"
                  />
                </div>

                <div
                  class="row reverse q-mt-sm"
                  style="color: #c2383a"
                >
                  <q-icon
                    size="8px"
                    name="lens"
                  />
                  <p
                    class="q-mx-xs q-mb-none"
                    style="font-size: 19px"
                  >15%</p>
                  <p
                    class="col-12 text-center"
                    style="color: #c2383a; font-size:10px"
                  >ابطال</p>
                  <q-separator
                    class="col-12"
                    style="background-color: #c2383a !important; height: 1px"
                  />
                </div>
                <div
                  class="row reverse q-mt-sm"
                  style="color: #37CC7A"
                >
                  <q-icon
                    size="8px"
                    name="lens"
                  />
                  <p
                    class="q-mx-xs q-mb-none"
                    style="font-size: 19px"
                  >5%</p>
                  <p
                    class="col-12 text-center"
                    style="color: #37CC7A; font-size:10px"
                  >انصراف</p>
                </div>

              </div>
              <div class="col row items-center justify-center">
                <canvas
                  id="parvaanehChart"
                  style="max-height: 250px;"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-8">
          <div class="row q-card q-pa-md">
            <div class="col-12 chart-title q-mb-sm">
              <safa-combo
                class="col-md-3"
                label="مبالغ فیش ها بر حسب"
                sourceType="local"
                :options="ficheAmount"
                v-model="selectedFicheAmountType"
              />
            </div>
            <canvas
              v-show="showExportsChart"
              id="exportsChart"
              style="max-height: 250px; height: 250px"
            />
            <canvas
              v-show="showExportsChartMount"
              id="exportsChartMount"
              style="max-height: 250px; height: 250px"
            />
            <canvas
              v-show="shoeExportsChartIncomeCode"
              id="exportsChartIncomeCode"
              style="max-height: 250px; height: 250px"
            />
            <canvas
              v-show="showExportsChartYear"
              id="exportsChartYear"
              style="max-height: 250px; height: 250px"
            />
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <div class="row q-card q-pa-md">
            <div class="col-12 chart-title q-mb-sm">مبالغ برحسب کدهای درآمدی</div>
            <canvas
              @click="incomeCodeClick"
              id="incomeChart"
              style="max-height: 250px; height: 250px; cursor:pointer"
            />
          </div>
        </div>
        <div class="col-12 last-kartableDetails-grid">
          <div class="row q-card q-pa-md">
            <div class="col-12 row q-mb-sm">
              <span class="chart-title">آخرین های کارتابل</span>
              <q-space />
              <q-btn
                dense
                rounded
                outline
                style="color:#6457e8 !important;font-size: 1em;"
                color="#6457e8"
                @click="navigateToKartable"
              >
                <q-icon
                  name="find_in_page"
                  style="color:#6457e8 !important;"
                />
                <div style="color:#6457e8 !important; font-size: .8em;">ورود به کارتابل
                </div>
              </q-btn>
            </div>
            <safa-datagrid
              :hideToolbar="true"
              :allowNewRow="false"
              :allowRemoveRow="false"
              :allowCopy="false"
              class="col-12"
              v-model="data"
              :columns="columns"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  route: '/income/dashboard',

  data () {
    return {
      title: 'داشبورد درآمد',
      name: 'UIncomeDashboard',
      ficheAmount: [
        { ID: 0, Title: 'منطقه' },
        { ID: 1, Title: 'ماه' },
        { ID: 2, Title: 'کدهای درآمدی' },
        { ID: 3, Title: 'سال' }
      ],
      selectedFicheAmountType: 0,
      showExportsChart: true,
      showExportsChartMount: false,
      shoeExportsChartIncomeCode: false,
      showExportsChartYear: false,
      charts: {
        requestsChart: null,
        parvaanehChart: null,
        incomeChart: null,
        exportsChart: null,
        exportsChartMount: null,
        exportsChartIncomeCode: null,
        exportsChartYear: null
      },
      columns: [
        {
          field: 'status',
          title: 'وضعیت',
          width: 180
        },
        {
          field: 'NidWorkflowItem',
          title: 'شماره درخواست',
          width: 150
        },
        {
          field: 'financialYear',
          title: 'سال کاری',
          width: 150
        },
        {
          field: 'owner',
          title: 'درخواست کننده',
          width: 180
        },
        {
          field: 'progress',
          title: 'درصد پیشرفت',
          cell: 'GridProgressLine'
        }
      ],
      data: [
        {
          status: 'محاسبات درآمد',
          NidWorkflowItem: '164879',
          financialYear: 'سال کاری 99',
          owner: 'محمدعلی زعفرانی پور',
          progress: 80
        },
        {
          status: 'محاسبات درآمد',
          NidWorkflowItem: '164879',
          financialYear: 'سال کاری 98',
          owner: 'زیبا نیک نژاد',
          progress: 60
        },
        {
          status: 'محاسبات درآمد',
          NidWorkflowItem: '164879',
          financialYear: 'سال کاری 97',
          owner: 'جعفر جافری',
          progress: 70
        }
      ]
    }
  },

  computed: {
    requestsChartDef () {
      return {
        type: 'line',
        data: {
          labels: [
            'تیر',
            'مرداد',
            'شهریور',
            'مهر',
            'آبان',
            'آذر',
            'دی',
            'بهمن',
            'اسفند',
            'فروردین',
            'اردیبهشت',
            'خرداد'
          ],
          datasets: [
            {
              label: 'پروانه',
              borderColor: '#EAB645',
              backgroundColor: '#EAB645',
              fontFamily: 'Shabnam',
              fill: false,
              data: [
                45079014,
                46900036,
                51095058,
                50090049,
                50120015,
                45060018,
                52300825,
                46000078,
                50000089,
                53000069,
                54000025,
                54037036
              ]
            },
            {
              label: 'پایانکار',
              borderColor: '#8d82fd',
              backgroundColor: '#8d82fd',
              fill: false,
              data: [
                11000014,
                10000025,
                15000036,
                13010958,
                14000017,
                13000095,
                11002846,
                12000056,
                13990188,
                15000047,
                13000025,
                10000098
              ]
            },
            {
              label: 'عدم خلاف',
              borderColor: '#4c65dc',
              backgroundColor: '#4c65dc',
              fill: false,
              data: [
                12640065,
                13000025,
                15000045,
                12100924,
                10000032,
                12000041,
                14200674,
                13200765,
                11000036,
                12040041,
                10000025,
                14000074
              ]
            },
            {
              label: 'استعلام',
              borderColor: '#37CC7A',
              backgroundColor: '#37CC7A',
              fill: false,
              data: [
                26000011,
                28000032,
                23005752,
                27000079,
                20270014,
                25000028,
                29010065,
                30950014,
                24000065,
                28000052,
                20000045,
                24000065
              ]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontFamily: 'Shabnam',
              fontSize: 10
            }
          },
          title: {
            display: false
          },
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0 // disables bezier curves
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                },
                ticks: {
                  fontFamily: 'Shabnam',
                  fontSize: 10
                }
              }
            ],
            yAxes: [
              {
                display: false
              }
            ]
          }
        }
      }
    },
    exportsChartDef () {
      return {
        type: 'bar',
        data: {
          labels: [
            'منطقه ۱',
            'منطقه ۲',
            'منطقه ۳',
            'منطقه ۴',
            'منطقه ۵',
            'منطقه ۶',
            'منطقه ۷',
            'منطقه ۸',
            'منطقه ۹',
            'منطقه ۱۰',
            'منطقه ۱۱',
            'منطقه ۱۲'
          ],
          datasets: [
            {
              label: 'پروانه',
              borderColor: '#EAB645',
              backgroundColor: '#EAB645',
              shadow: 'rgba(210, 236, 252, 0.63)',
              fill: false,
              data: [
                20124525,
                495213,
                5900065,
                8500024,
                9800910,
                19010095,
                15050925,
                11901354,
                7650210,
                17998084,
                7000052,
                14530920
              ]
            },
            {
              label: 'پایانکار',
              borderColor: '#8d82fd',
              backgroundColor: '#8d82fd',
              shadow: 'rgba(141, 130, 253, 0.63)',
              fill: false,
              data: [
                10000015,
                312802,
                1503854,
                5000065,
                7000014,
                10200026,
                6954814,
                6000014,
                4024018,
                13120020,
                5000036,
                3912022
              ]
            },
            {
              label: 'عدم خلاف',
              borderColor: '#4c65dc',
              backgroundColor: '#4c65dc',
              shadow: '#4c65dc',
              fill: false,
              data: [
                6000054,
                2500001,
                2165805,
                3000025,
                5000065,
                12000014,
                5990056,
                8000014,
                5000026,
                8210051,
                6000054,
                8000014
              ]
            },
            {
              label: 'استعلام',
              borderColor: '#37CC7A',
              backgroundColor: '#37CC7A',
              fill: false,
              data: [
                13524125,
                4000014,
                401695,
                2500014,
                8000002,
                10300089,
                5000078,
                4000049,
                7000046,
                11000058,
                5000065,
                9000065
              ]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            display: false
          },
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0 // disables bezier curves
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                },
                ticks: {
                  fontFamily: 'Shabnam',
                  fontSize: 10
                }
              }
            ],
            yAxes: [
              {
                display: false
                // gridLines: {
                //   display: false
                // },
                // ticks: {
                //   display: false //this will remove only the label
                // }
              }
            ]
          }
        }
      }
    },
    exportsChartIncomeCodeDef () {
      return {
        type: 'bar',
        data: {
          labels: [
            'منطقه ۱',
            'منطقه ۲',
            'منطقه ۳',
            'منطقه ۴',
            'منطقه ۵',
            'منطقه ۶',
            'منطقه ۷',
            'منطقه ۸',
            'منطقه ۹',
            'منطقه ۱۰',
            'منطقه ۱۱',
            'منطقه ۱۲'
          ],
          datasets: [
            {
              label: 'تراکم ساختمانی',
              borderColor: '#EAB645',
              backgroundColor: '#EAB645',
              shadow: 'rgba(210, 236, 252, 0.63)',
              fill: false,
              data: [
                27090025,
                26985714,
                25489393,
                28451628,
                25354781,
                25954183,
                27024508,
                25034707,
                30001414,
                27988928,
                21509829,
                25647823
              ]
            },
            {
              label: 'زیربنای مسکونی',
              borderColor: '#8d82fd',
              backgroundColor: '#8d82fd',
              shadow: 'rgba(141, 130, 253, 0.63)',
              fill: false,
              data: [
                21035428,
                25015436,
                23458982,
                27036473,
                23654145,
                25469869,
                19099847,
                22025471,
                24062865,
                25413632,
                20364854,
                24659949
              ]
            },
            {
              label: 'پذیره تجاری',
              borderColor: '#4c65dc',
              backgroundColor: '#4c65dc',
              shadow: '#4c65dc',
              fill: false,
              data: [
                21875465,
                19870214,
                15036512,
                22364032,
                20145903,
                18026569,
                21035858,
                20369895,
                20145854,
                21036457,
                20453908,
                20982419
              ]
            },
            {
              label: 'پذیره اداری',
              borderColor: '#37CC7A',
              backgroundColor: '#37CC7A',
              fill: false,
              data: [
                8021525,
                8195436,
                8235414,
                7952102,
                8000911,
                8014525,
                6998595,
                8107903,
                8504852,
                6145009,
                8035413,
                8023624
              ]
            },
            {
              label: ' پذیره صنعتی',
              borderColor: '#ba3641',
              backgroundColor: '#ba3641',
              shadow: 'rgba(210, 236, 252, 0.63)',
              fill: false,
              data: [
                4000833,
                4235802,
                4012332,
                3985213,
                4023625,
                4002124,
                3869416,
                4236917,
                3953681,
                4589183,
                3458082,
                4239119
              ]
            },
            {
              label: 'کارشناسی',
              borderColor: '#4dc997',
              backgroundColor: '#4dc997',
              shadow: 'rgba(141, 130, 253, 0.63)',
              fill: false,
              data: [
                2500103,
                2050001,
                2103513,
                2360525,
                2000924,
                2103926,
                2103728,
                2350901,
                2014616,
                2036495,
                2035146,
                2079350
              ]
            },
            {
              label: 'حق مشرفیت',
              borderColor: '#e6eb5b',
              backgroundColor: '#e6eb5b',
              shadow: '#4c65dc',
              fill: false,
              data: [
                1900011,
                2000015,
                2000825,
                1920024,
                1803011,
                1700332,
                2065414,
                2036565,
                1703502,
                2154082,
                1998562,
                1063828
              ]
            },
            {
              label: 'پایانکار',
              borderColor: '#205e8a',
              backgroundColor: '#205e8a',
              fill: false,
              data: [
                2203911,
                2103825,
                2350911,
                2014613,
                2100117,
                1950065,
                2103532,
                2360529,
                2000998,
                2036465,
                2035125,
                2179388
              ]
            },
            {
              label: 'کسری نصاب تفکیک',
              borderColor: '#965be3',
              backgroundColor: '#965be3',
              shadow: 'rgba(210, 236, 252, 0.63)',
              fill: false,
              data: [
                2313925,
                2500414,
                2150841,
                2103625,
                2360565,
                2000914,
                2514623,
                2100133,
                1950068,
                1936428,
                2035129,
                2179309
              ]
            },
            {
              label: 'پذیره آموزشی',
              borderColor: '#cc7a3b',
              backgroundColor: '#cc7a3b',
              shadow: 'rgba(141, 130, 253, 0.63)',
              fill: false,
              data: [
                3200808,
                3238832,
                3251432,
                3025445,
                3500114,
                3001456,
                3020741,
                3659402,
                3001765,
                3023911,
                3458065,
                2950059
              ]
            },
            {
              label: 'صدور المثنی',
              borderColor: '#e3945b',
              backgroundColor: '#e3945b',
              shadow: '#4c65dc',
              fill: false,
              data: [
                1598525,
                2350652,
                2050825,
                2602414,
                2000541,
                1900998,
                2214603,
                2100947,
                1550014,
                2036498,
                2035165,
                2179465
              ]
            },
            {
              label: 'حفاری',
              borderColor: '#9c2411',
              backgroundColor: '#9c2411',
              fill: false,
              data: [
                1898625,
                2000514,
                1900963,
                2414641,
                2100945,
                1550065,
                2150714,
                2050852,
                2502414,
                2036452,
                2035214,
                2179343
              ]
            },
            {
              label: 'سایر',
              borderColor: '#62e37e',
              backgroundColor: '#62e37e',
              fill: false,
              data: [
                3020562,
                3201214,
                3601219,
                3029832,
                2986316,
                2468235,
                2836541,
                3092598,
                3106846,
                3098224,
                3105632,
                3605943
              ]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            display: false
          },
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0 // disables bezier curves
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                },
                ticks: {
                  fontFamily: 'Shabnam',
                  fontSize: 10
                }
              }
            ],
            yAxes: [
              {
                display: false
                // gridLines: {
                //   display: false
                // },
                // ticks: {
                //   display: false //this will remove only the label
                // }
              }
            ]
          }
        }
      }
    },
    exportsChartMountDef () {
      return {
        type: 'bar',
        data: {
          labels: [
            'تیر',
            'مرداد',
            'شهریور',
            'مهر',
            'آبان',
            'آذر',
            'دی',
            'بهمن',
            'اسفند',
            'فروردین',
            'اردیبهشت',
            'خرداد'
          ],
          datasets: [
            {
              label: 'پروانه',
              borderColor: '#EAB645',
              backgroundColor: '#EAB645',
              shadow: 'rgba(210, 236, 252, 0.63)',
              fill: false,
              data: [
                45079014,
                46900036,
                51095058,
                50090049,
                50120015,
                45060018,
                52300825,
                46000078,
                50000089,
                53000069,
                54000025,
                54037036
              ]
            },
            {
              label: 'پایانکار',
              borderColor: '#8d82fd',
              backgroundColor: '#8d82fd',
              shadow: 'rgba(141, 130, 253, 0.63)',
              fill: false,
              data: [
                11000014,
                10000025,
                15000036,
                13010958,
                14000017,
                13000095,
                11002846,
                12000056,
                13990188,
                15000047,
                13000025,
                10000098
              ]
            },
            {
              label: 'عدم خلاف',
              borderColor: '#4c65dc',
              backgroundColor: '#4c65dc',
              shadow: '#4c65dc',
              fill: false,
              data: [
                12640065,
                13000025,
                15000045,
                12100924,
                10000032,
                12000041,
                14200674,
                13200765,
                11000036,
                12040041,
                10000025,
                14000074
              ]
            },
            {
              label: 'استعلام',
              borderColor: '#37CC7A',
              backgroundColor: '#37CC7A',
              fill: false,
              data: [
                26000011,
                28000032,
                23005752,
                27000079,
                20270014,
                25000028,
                29010065,
                30950014,
                24000065,
                28000052,
                20000045,
                24000065
              ]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            display: false
          },
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0 // disables bezier curves
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                },
                ticks: {
                  fontFamily: 'Shabnam',
                  fontSize: 10
                }
              }
            ],
            yAxes: [
              {
                display: false
                // gridLines: {
                //   display: false
                // },
                // ticks: {
                //   display: false //this will remove only the label
                // }
              }
            ]
          }
        }
      }
    },
    exportsCharYeartDef () {
      return {
        type: 'bar',
        data: {
          labels: ['89', '90', '91', '92', '93', '94', '95', '96', '97', '98'],
          datasets: [
            {
              label: 'پروانه',
              borderColor: '#EAB645',
              backgroundColor: '#EAB645',
              shadow: 'rgba(210, 236, 252, 0.63)',
              fill: false,
              data: [
                50079011,
                46900025,
                51095086,
                50090014,
                51120041,
                49060425,
                52300832,
                46050041,
                51009823,
                53019019
              ]
            },
            {
              label: 'پایانکار',
              borderColor: '#8d82fd',
              backgroundColor: '#8d82fd',
              shadow: 'rgba(141, 130, 253, 0.63)',
              fill: false,
              data: [
                11050036,
                10095051,
                15000022,
                13010914,
                14000052,
                13000003,
                11002816,
                11007431,
                13990176,
                15470022
              ]
            },
            {
              label: 'عدم خلاف',
              borderColor: '#4c65dc',
              backgroundColor: '#4c65dc',
              shadow: '#4c65dc',
              fill: false,
              data: [
                12640062,
                13050063,
                13098025,
                12100943,
                10000028,
                12000019,
                14200617,
                13200786,
                11000024,
                13040736
              ]
            },
            {
              label: 'استعلام',
              borderColor: '#37CC7A',
              backgroundColor: '#37CC7A',
              fill: false,
              data: [
                25900032,
                27060043,
                23005755,
                27000052,
                20270025,
                25000046,
                25010057,
                30950065,
                24000009,
                27006417
              ]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            display: false
          },
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0 // disables bezier curves
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                },
                ticks: {
                  fontFamily: 'Shabnam',
                  fontSize: 10
                }
              }
            ],
            yAxes: [
              {
                display: false
                // gridLines: {
                //   display: false
                // },
                // ticks: {
                //   display: false //this will remove only the label
                // }
              }
            ]
          }
        }
      }
    },
    incomeChartDef () {
      return {
        type: 'bar',
        data: {
          labels: [
            'تراکم ساختمانی',
            'زیربنای مسکونی',
            'پذیره تجاری',
            'پذیره اداری',
            'پذیره صنعتی',
            'کارشناسی',
            'حق مشرفیت',
            'پایانکار',
            'کسری نصاب تفکیک',
            'پذیره آموزشی',
            'صدور المثنی',
            'حفاری',
            'سایر'
          ],
          datasets: [
            {
              label: 'عدم خلاف',
              borderColor: '#4c65dc',
              backgroundColor: '#4c65dc',
              shadow: '#4c65dc',
              fill: false,
              data: [
                270000,
                250000,
                200000,
                80000,
                40000,
                2000,
                10000,
                20000,
                30000,
                10000,
                20000,
                60000
              ]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false,
            position: 'bottom'
          },
          title: {
            display: false
          },
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0 // disables bezier curves
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                },
                ticks: {
                  fontFamily: 'Shabnam',
                  fontSize: 10
                }
              }
            ],
            yAxes: [
              {
                display: false
                // gridLines: {
                //   display: false
                // },
                // ticks: {
                //   display: false //this will remove only the label
                // }
              }
            ]
          }
        }
      }
    },
    parvaanehChartDef () {
      return {
        type: 'doughnut',
        data: {
          labels: ['  تایید شده', ' موقت', ' ابطال', 'انصراف'],
          datasets: [
            {
              borderColor: ['#7b68ee', '#c2383a', '#EAB645', '#37CC7A'],
              backgroundColor: ['#7b68ee', '#c2383a', '#EAB645', '#37CC7A'],
              data: [30, 15, 50, 5]
            }
          ]
        },
        options: {
          responsive: true,
          cutoutPercentage: 80,
          legend: {
            display: false
          },
          title: {
            display: false
          },
          animation: {
            animateScale: true,
            animateRotate: true
          },
          elements: {
            center: {
              text: '452',
              color: '#8b8c8d', // Default is #000000
              fontStyle: 'Shabnam', // Default is Arial
              sidePadding: 20, // Default is 20 (as a percentage)
              minFontSize: 24, // Default is 20 (in px), set to false and text will not wrap.
              lineHeight: 25 // Default is 25 (in px), used for when text wraps
            }
          }
        }
      }
    }
  },

  methods: {
    createChart (name, options) {
      // Dispose previous version
      if (this.charts[name]) {
        this.charts[name].distroy()
        this.charts[name] = null
      }
      const ctx = document.getElementById(name)
      this.charts[name] = new Chart(ctx, options)
    },
    registerChartPlugins () {
      Chart.pluginService.register({
        beforeDraw: function (chart) {
          if (chart.config.options.elements.center) {
            const ctx = chart.chart.ctx
            // Get options from the center object in options
            const centerConfig = chart.config.options.elements.center
            const fontStyle = centerConfig.fontStyle || 'Arial'
            const txt = centerConfig.text
            const color = centerConfig.color || '#000'
            const maxFontSize = centerConfig.maxFontSize || 24
            const sidePadding = centerConfig.sidePadding || 20
            const sidePaddingCalculated =
              (sidePadding / 100) * (chart.innerRadius * 2)
            // Start with a base font of 30px
            ctx.font = '24px ' + fontStyle

            // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            const stringWidth = ctx.measureText(txt).width
            const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated

            // Find out how much the font can grow in width.
            const widthRatio = elementWidth / stringWidth
            const newFontSize = Math.floor(24 * widthRatio)
            const elementHeight = chart.innerRadius * 2

            // Pick a new font size so it will not be larger than the height of label.
            let fontSizeToUse = Math.min(
              newFontSize,
              elementHeight,
              maxFontSize
            )
            let minFontSize = centerConfig.minFontSize
            const lineHeight = centerConfig.lineHeight || 25
            let wrapText = false

            if (minFontSize === undefined) {
              minFontSize = 20
            }

            if (minFontSize && fontSizeToUse < minFontSize) {
              fontSizeToUse = minFontSize
              wrapText = true
            }

            // Set font settings to draw it correctly.
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            let centerX = (chart.chartArea.left + chart.chartArea.right) / 2
            let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2
            ctx.font = fontSizeToUse + 'px ' + fontStyle
            ctx.fillStyle = color

            if (!wrapText) {
              ctx.fillText(txt, centerX, centerY)
              return
            }

            const words = txt.split(' ')
            let line = ''
            const lines = []

            // Break words up into multiple lines if necessary
            for (let n = 0; n < words.length; n++) {
              const testLine = line + words[n] + ' '
              const metrics = ctx.measureText(testLine)
              const testWidth = metrics.width
              if (testWidth > elementWidth && n > 0) {
                lines.push(line)
                line = words[n] + ' '
              } else {
                line = testLine
              }
            }

            // Move the center up depending on line height and number of lines
            centerY -= (lines.length / 2) * lineHeight

            for (let n = 0; n < lines.length; n++) {
              ctx.fillText(lines[n], centerX, centerY)
              centerY += lineHeight
            }
            // Draw text in center
            ctx.fillText(line, centerX, centerY)
          }
        }
      })
    },
    incomeCodeClick () {
      this.selectedFicheAmountType = 2
      // this.shoeExportsChartIncomeCode = true
    },
    confirmedFicheClick () {
      this.selectedFicheAmountType = 1
    }
  },

  mounted () {
    this.registerChartPlugins()
    this.createChart('requestsChart', this.requestsChartDef)
    this.createChart('parvaanehChart', this.parvaanehChartDef)
    this.createChart('incomeChart', this.incomeChartDef)
    this.createChart('exportsChart', this.exportsChartDef)
    this.createChart('exportsChartMount', this.exportsChartMountDef)
    this.createChart('exportsChartIncomeCode', this.exportsChartIncomeCodeDef)
    this.createChart('exportsChartYear', this.exportsCharYeartDef)
  },
  watch: {
    selectedFicheAmountType () {
      if (this.selectedFicheAmountType === 0) {
        this.showExportsChart = true
        this.showExportsChartMount = false
        this.shoeExportsChartIncomeCode = false
        this.showExportsChartYear = false
      } else if (this.selectedFicheAmountType === 1) {
        this.showExportsChart = false
        this.showExportsChartMount = true
        this.shoeExportsChartIncomeCode = false
        this.showExportsChartYear = false
      } else if (this.selectedFicheAmountType === 2) {
        this.showExportsChart = false
        this.showExportsChartMount = false
        this.shoeExportsChartIncomeCode = true
        this.showExportsChartYear = false
      } else {
        this.showExportsChart = false
        this.showExportsChartMount = false
        this.shoeExportsChartIncomeCode = false
        this.showExportsChartYear = true
      }
    }
  }
}
</script>
<style scoped>
.last-kartableDetails-grid .kendo-grid-wrap {
  max-height: auto !important;
}
</style>
