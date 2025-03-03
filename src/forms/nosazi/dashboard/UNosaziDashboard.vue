<template>
  <!-- <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper :padding="false" :title="title"> -->
      <div class="row Dashboard q-pa-md">
        <div class="col">
          <div class="row q-col-gutter-lg">
            <div class="col-12 col-sm-6 col-md-8">
              <div class="row q-card q-pa-md">
                <div class="col-12 chart-title q-mb-sm">
                  جمع مبالغ فیش های تایید شده
                </div>
                <canvas
                  id="requestsChart"
                  style="max-height: 250px; height: 250px"
                />
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <div
                class="row q-card q-pa-md q-mb-sm"
                style="max-height: 310px; height: 310px"
              >
                <div class="col-12 chart-title">فیش های صادره</div>
                <div class="row fit">
                  <div class="col-3 column q-pt-md">
                    <div class="row reverse q-my-sm" style="color: #ddbbaa">
                      <q-icon name="lens" size="8px" />
                      <p
                        class="q-mx-xs q-mb-none"
                        style="font-size: 19px; color: #ddbbaa"
                      >
                        715,850,205
                      </p>
                      <p
                        class="col-12 text-center"
                        style="color: #ddbbaa; font-size: 10px"
                      >
                        باقی مانده
                      </p>
                      <q-separator
                        class="col-12"
                        style="
                          background-color: #8d82fd !important;
                          height: 1px;
                        "
                      />
                    </div>

                    <div class="row reverse q-my-sm" style="color: #4c65dc">
                      <q-icon name="lens" size="8px" />
                      <p class="q-mx-xs q-mb-none" style="font-size: 19px">
                        13,8386,316
                      </p>
                      <p
                        class="col-12 text-center"
                        style="color: #4c65dc; font-size: 10px"
                      >
                        دریافت شده
                      </p>
                      <q-separator
                        class="col-12"
                        style="
                          background-color: #4c65dc !important;
                          height: 1px;
                        "
                      />
                    </div>

                    <!-- <div class="row reverse q-my-sm" style="color: #4c65dc">
                  <q-icon size="8px" name="lens"/>
                  <p class="q-mx-xs q-mb-none" style="font-size: 19px">31.2%</p>
                  <p class="col-12 text-center" style="color: #4c65dc; font-size:10px">چک ها و سایر</p>

                </div> -->
                  </div>
                  <div class="col row items-center justify-center">
                    <canvas id="parvaanehChart" style="max-height: 250px" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-8">
              <div class="row q-card q-pa-md">
                <div class="col-12 chart-title q-mb-sm">
                  مبالغ فیش ها برحسب منطقه
                </div>
                <canvas
                  id="exportsChart"
                  style="max-height: 250px; height: 250px"
                />
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <div class="row q-card q-pa-md">
                <div class="col-12 chart-title q-mb-sm">تخفیفات</div>
                <canvas
                  id="incomeChart"
                  style="max-height: 250px; height: 250px"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="row q-card q-pa-md">
                <div class="col-12 chart-title q-mb-sm">برآورد سالیانه</div>
                <canvas
                  id="yearlyChart"
                  style="max-height: 250px; height: 250px"
                  @click="test"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- </form-wrapper>
  </safa-form> -->
</template>

<script>
import Chart from "chart.js"

export default {
  route: "/nosazi/dashboard",
  data () {
    return {
      title: "داشبورد نوسازی",
      formKey: "0bfc62dc-f71a-4599-b9ec-14b8e6108efb",
      name: "UNosaziDashboard",
      main: true,
      charts: {
        requestsChart: null,
        parvaanehChart: null,
        incomeChart: null,
        exportsChart: null
      }
    }
  },

  computed: {
    requestsChartDef () {
      return {
        type: "line",
        data: {
          labels: [
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند",
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر"
          ],
          datasets: [
            {
              label: "خالص نوسازی",
              borderColor: "#EAB645",
              backgroundColor: "#EAB645",
              fontFamily: "Shabnam",
              fill: false,
              data: [
                7652168, 9635842, 6589214, 7520336, 8563215, 5632156, 6853247,
                7698534, 6398751, 8654129, 9856214, 9254862
              ]
            },
            {
              label: "آموزش و پرورش",
              borderColor: "#8d82fd",
              backgroundColor: "#8d82fd",
              fill: false,
              data: [
                382608, 481792, 329460, 376016, 428160, 281607, 342662, 384926,
                319937, 432706, 492810, 462743
              ]
            },
            {
              label: "پسماند",
              borderColor: "#4c65dc",
              backgroundColor: "#4c65dc",
              fill: false,
              data: [
                3826084, 4379928, 3468007, 3008134, 4077721, 2448763, 3807359,
                3079413, 2559500, 4327064, 4285310, 4407077
              ]
            },
            {
              label: "آتش نشانی",
              borderColor: "#37CC7A",
              backgroundColor: "#37CC7A",
              fill: false,
              data: [
                765216, 963584, 658921, 752033, 856321, 563215, 685324, 769853,
                639875, 865412, 985621, 925486
              ]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontFamily: "Shabnam",
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
                  fontFamily: "Shabnam",
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
        type: "bar",
        data: {
          labels: [
            "منطقه ۱",
            "منطقه ۲",
            "منطقه ۳",
            "منطقه ۴",
            "منطقه ۵",
            "منطقه ۶",
            "منطقه ۷",
            "منطقه ۸",
            "منطقه ۹",
            "منطقه ۱۰",
            "منطقه ۱۱",
            "منطقه ۱۲"
          ],
          datasets: [
            {
              label: "خالص نوسازی",
              borderColor: "#EAB645",
              backgroundColor: "#EAB645",
              shadow: "rgba(210, 236, 252, 0.63)",
              fill: false,
              data: [
                15304336, 9635842, 6589214, 15792705, 8563215, 5632156, 6853247,
                7698534, 6398751, 19904496, 9856214, 9254862
              ]
            },
            {
              label: "آموزش و پرورش",
              borderColor: "#8d82fd",
              backgroundColor: "#8d82fd",
              shadow: "rgba(141, 130, 253, 0.63)",
              fill: false,
              data: [
                1530433 / 2,
                963584 / 2,
                658921 / 2,
                1579270 / 2,
                856321 / 2,
                563215 / 2,
                685324 / 2,
                769853 / 2,
                639875 / 2,
                1990449 / 2,
                985621 / 2,
                925486 / 2
              ]
            },
            {
              label: "پسماند",
              borderColor: "#4c65dc",
              backgroundColor: "#4c65dc",
              shadow: "#4c65dc",
              fill: false,
              data: [
                2904738 * 2,
                1875632 * 2,
                1369854 * 2,
                3192650 * 2,
                1789652 * 2,
                1156984 * 2,
                1398654 * 2,
                1569874 * 2,
                1369824 * 2,
                3570852 * 2,
                1863257 * 2,
                1821547 * 2
              ]
            },
            {
              label: "آتش نشانی",
              borderColor: "#37CC7A",
              backgroundColor: "#37CC7A",
              fill: false,
              data: [
                1530433, 963584, 658921, 1579270, 856321, 563215, 685324,
                769853, 639875, 1990449, 985621, 925486
              ]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: true,
            position: "bottom"
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
                  fontFamily: "Shabnam",
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
        type: "bar",
        data: {
          labels: [
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند",
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر"
          ],
          datasets: [
            {
              label: "تخفیفات",
              borderColor: "#4c65dc",
              backgroundColor: "#4c65dc",
              shadow: "#4c65dc",
              fill: false,
              data: [
                2365214, 2696321, 2369851, 2636547, 2869325, 1765236, 1865324,
                1963257, 2236587, 2369875, 2398654, 2563248
              ]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false,
            position: "bottom"
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
                  fontFamily: "Shabnam",
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
    yearlyChartDef () {
      return {
        type: "bar",
        data: {
          labels: [
            "1389",
            "1390",
            "1391",
            "1392",
            "1393",
            "1394",
            "1395",
            "1396",
            "1397",
            "1398"
          ],
          datasets: [
            {
              label: "دریافت شده",
              borderColor: "#EAB645",
              backgroundColor: "#EAB645",
              fill: false,
              data: [67, 60, 64, 56, 48, 41, 32, 26, 30, 33]
            },
            {
              label: "دریافت نشده",
              borderColor: "#8d82fd",
              backgroundColor: "#ddccbb",
              fill: false,
              data: [33, 40, 36, 44, 52, 59, 68, 74, 70, 67]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false,
            position: "bottom"
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
                  display: false
                },
                stacked: true
              }
            ],
            yAxes: [
              {
                gridLines: {
                  color: "rgba(229, 229, 229, 0.75)"
                },
                stacked: true
              }
            ]
          }
        }
      }
    },
    parvaanehChartDef () {
      return {
        type: "doughnut",
        data: {
          labels: ["باقی مانده", "پرداخت شده"],
          datasets: [
            {
              borderColor: ["#ddccbb", "#4c65dc", "#EAB645"],
              backgroundColor: ["#ddccbb", "#4c65dc", "#EAB645"],
              data: [715850205, 138386316] // 715850205‬
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
              text: "854,236,521",
              color: "#8b8c8d", // Default is #000000
              fontStyle: "Shabnam", // Default is Arial
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
            const fontStyle = centerConfig.fontStyle || "Arial"
            const txt = centerConfig.text
            const color = centerConfig.color || "#000"
            const maxFontSize = centerConfig.maxFontSize || 24
            const sidePadding = centerConfig.sidePadding || 20
            const sidePaddingCalculated =
              (sidePadding / 100) * (chart.innerRadius * 2)
            // Start with a base font of 30px
            ctx.font = "24px " + fontStyle

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
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            let centerX = (chart.chartArea.left + chart.chartArea.right) / 2
            let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2
            ctx.font = fontSizeToUse + "px " + fontStyle
            ctx.fillStyle = color

            if (!wrapText) {
              ctx.fillText(txt, centerX, centerY)
              return
            }

            const words = txt.split(" ")
            let line = ""
            const lines = []

            // Break words up into multiple lines if necessary
            for (let n = 0; n < words.length; n++) {
              const testLine = line + words[n] + " "
              const metrics = ctx.measureText(testLine)
              const testWidth = metrics.width
              if (testWidth > elementWidth && n > 0) {
                lines.push(line)
                line = words[n] + " "
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
    test (evt, array) {
      // console.log('/////////array', array)

      // if (array.length !== 0) {
      //   var position = array[0]._index
      //   var activeElement = this.tooltip._data.datasets[0].data[position]
      //   // console.log(activeElement)
      // } else {
      //   // console.log('You selected the background!')
      // }

      this.$router.push("/nosazi-dashboard/nosazi-year-chart-details")
    }
  },

  mounted () {
    this.registerChartPlugins()
    this.createChart("requestsChart", this.requestsChartDef)
    this.createChart("parvaanehChart", this.parvaanehChartDef)
    this.createChart("incomeChart", this.incomeChartDef)
    this.createChart("exportsChart", this.exportsChartDef)
    this.createChart("yearlyChart", this.yearlyChartDef)
  }
}
</script>
