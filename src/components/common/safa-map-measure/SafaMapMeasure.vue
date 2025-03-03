<template>
  <div>
    <ComponentDecoration displayText="" :errorMessage="errorMessage" :id="id" :isEllipsis="isEllipsis"
      :labelShrink="labelShrink" :labelWidth="labelWidth" :mode="mode" :subtext="subtext">
      <safa-text :required="required" :showRequiredSymbol="required" :label="label" :labelShrink="labelShrink"
        :labelWidth="labelWidth" :cdcName="cdcName" v-model="value" :validations="validations" type="number" m="r">
        <template v-slot:append>
          <div v-if="m === 'e'" style="position: relative; right: 7px" class="flex items-center">
            <safa-securityPanel caption="ترسیم خط طولی" id="1b3b309d-a8a5-4454-9980-feca44b06351" form-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902">
              <q-icon title="ترسیم خط طولی" style="font-size: 20px" color="primary" name="draw" class="cursor-pointer" @click="onLine" />
            </safa-securityPanel>
            <safa-securityPanel caption="ترسیم براساس UTM" id="f8240503-ee3c-4870-8f02-28f32b3f57d3" form-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902">
              <q-icon title="ترسیم براساس UTM" style="font-size: 22px" color="primary" name="square_foot" class="cursor-pointer" @click="onUTM" />
            </safa-securityPanel>
            <safa-securityPanel caption="حذف ترسیم های قبلی" id="0bf3704c-43c8-4b78-a03c-4558892fa17f" form-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902">
            <q-icon  title="حذف ترسیم های قبلی" style="font-size: 20px" color="primary" name="clear"
              class="cursor-pointer" @click="clearHandler" />
            </safa-securityPanel>
          </div>
        </template>
      </safa-text>
    </ComponentDecoration>

    <safa-popup title="جدول مختصات" width="830px" height="305px" v-model="showUtmModal" :padding="false">
      <fit>
        <div class="fit">
          <q-scroll-area class="full-height">
            <div class="EditPoint">
              <div class="flex items-center justify-between q-pa-sm bg-grey-3">
                <div v-if="allowEdit" class="flex items-center q-gutter-x-sm">
                  <btn-default color="primary" icon="draw">
                    <span>ترسیم هندسه جدید</span>
                    <q-popup-proxy v-model="showDrawMethods">
                      <div class="flex column" style="width: 240px">
                        <span class="full-width text-center bg-grey-3 q-py-sm">نوع ترسیم</span>
                        <div class="q-pa-sm q-gutter-y-sm">
                          <btn-default v-for="item in drawModes" :key="item.type" class="full-width"
                            :label="`${item.label} [${item.type}]`" :icon="item.icon" flat v-ripple
                            @click="drawHandler(item.type)" v-close-popup />
                        </div>
                      </div>
                    </q-popup-proxy>
                  </btn-default>
                  <btn-default icon="cloud_upload">
                    <q-popup-proxy v-model="showUploadUTMFileDialog">
                      <div class="flex column" style="width: 200px">
                        <span class="full-width text-center bg-grey-3 q-py-sm">آپلود فایل UTM</span>
                        <div class="q-pa-sm q-gutter-y-sm">
                          <safa-file-uploader
                            class="full-width"
                            label="انتخاب فایل"
                            label-width="90px"
                            cdcName="File"
                            :max-size="5"
                            @change="uploadFile"
                            type=".TXT"
                          />
                        </div>
                      </div>
                    </q-popup-proxy>
                  </btn-default>
                </div>
                <div class="flex items-center q-gutter-x-sm" style="direction: ltr">
                  <btn-save label="درج" v-if="allowEdit" @click="addPoint" icon="add_location_alt" />
                  <btn-default :label="NewPoint.Coord" @click="toggleMode(NewPoint.Coord)" style="width: 55px" />
                  <div class="flex items-center q-gutter-x-sm" v-if="NewPoint.Coord == 'DD' && allowEdit">
                    <safa-text v-model="NewPoint.LatX" type="number" label="Lng:" label-width="25px" ref="DDLatX" />
                    <safa-text v-model="NewPoint.LngY" type="number" label="Lat:" label-width="25px" ref="DDLatY" @keypress.enter="addPoint" />
                  </div>
                  <div class="flex items-center q-gutter-x-sm" v-else-if="NewPoint.Coord == 'UTM' && allowEdit">
                    <btn-default :label="NewPoint.ZL" @click="NewPoint.ZL = NewPoint.ZL === 'R' ? 'S' : 'R'"
                      style="width: 40px" />

                    <safa-text style="width: 65px" type="number" v-model="NewPoint.ZN" label="Zone:" label-width="35px" />
                    <safa-text style="max-width: 170px" type="number" v-model="NewPoint.LatX" label="X:" label-width="15px" ref="UTMLatX" />
                    <safa-text style="max-width: 170px" type="number" v-model="NewPoint.LngY" label="Y:" label-width="15px" ref="UTMLngY" @keypress.enter="addPoint" />
                  </div>
                </div>
              </div>

              <div class="full-width">
                <q-markup-table class="fit map-measure-tablet" separator="cell" square dense bordered flat>
                  <thead>
                    <tr>
                      <th class="text-center" style="width: 45p; padding-right: 8px">
                        ردیف
                      </th>
                      <th style="min-width: 250px; flex-grow: 1">مختصات</th>
                      <th style="width: 40px;">حذف</th>
                      <th v-if="allowEdit && NewPoint.Coord == 'DD'" style="min-width: 60px; width: 60px">
                        فاصله
                      </th>
                      <th v-if="allowEdit && NewPoint.Coord == 'DD'" style="width: 80px; padding-left: 8px;">
                        درج با فاصله
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, index) in Points" :key="index" @click="ShowPoint(item)">
                      <td class="text-center" style="width: 45p; padding-right: 8px">
                        {{ index }}
                      </td>
                      <td style="min-width: 250px; flex-grow: 1">
                        <div v-if="NewPoint.Coord == 'DD'">
                          <safa-text class="full-width" v-model="item.DD" @input="Show" @focus="ShowPoint(item)"
                            style="direction: ltr; text-align: left" />
                        </div>
                        <div class="flex items-center q-gutter-x-sm" style="direction: ltr" v-else>
                          <safa-text v-model="item.UTM.X" m="r" label="X:" label-width="15px" />
                          <q-separator vertical />
                          <safa-text v-model="item.UTM.Y" m="r" label="Y:" label-width="15px" />
                          <q-separator vertical />
                          <safa-label style="min-width: 45px;">Zone: {{ item.UTM.ZN }}</safa-label>
                          <q-separator vertical />
                          <safa-label>Zone Letter: {{ item.UTM.ZL }}</safa-label>
                        </div>
                      </td>
                      <td style="width: 50px;">
                        <btn-delete flat class="full-width full-height" :outlined="false" icon="delete_sweep"
                          @click="DeletePoint(index)" label="" />
                      </td>
                      <td v-if="allowEdit && NewPoint.Coord == 'DD'" style="min-width: 60px; width: 60px">
                        <safa-text type="number" class="full-width" v-model="item.Dis" />
                      </td>
                      <td v-if="allowEdit && NewPoint.Coord == 'DD'" style="width: 80px;">
                        <btn-default flat class="full-width full-height" :outlined="false" icon="add_location_alt"
                          @click="addPointDis(item, index)" />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </div>
            </div>
          </q-scroll-area>
        </div>
        <q-separator />
        <div class="flex items-center justify-between q-pa-sm">
        <div class="q-gutter-sm">
          <btn-default label="اعمال" @click="confirmUTM" />
          <btn-cancel @click="clearHandler" />
        </div>
        <span>
          طول ترسیم:&nbsp;{{ currentPathLength }}
        </span>
      </div>
      </fit>
    </safa-popup>
  </div>
</template>

<!-- eslint-disable eqeqeq no-unused-vars -->
<script>
import mapMixin from "src/mixins/mapMixin"
import { WKT } from "ol/format"
import { toLonLat } from 'ol/proj'
// import { getLength, getArea } from "ol/sphere"

// import Point from "ol/geom/Point"
// import LineString from "ol/geom/LineString"
// import Polygon from "ol/geom/Polygon"

export default {
  mixins: [mapMixin],
  props: {
    validations: [String, Array],
    isEllipsis: {
      type: Boolean,
      default: false
    },
    labelShrink: {
      type: Boolean,
      default: false
    },
    labelWidth: String,
    displayText: String,
    required: Boolean,
    showRequiredSymbol: Boolean,
    id: String,
    mode: String,
    subtext: String,
    errorMessage: String,
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [Number, String],
      default: 0
    },
    dir: {
      type: String,
      default: "ltr"
    },
    cdcName: {
      type: String,
      default: "PathLength"
    },
    m: {
      type: String,
      default: "r"
    },
    allowEdit: {
      type: Boolean,
      default: true
    },
    drawModes: {
      type: Array,
      default: () => [
        {
          type: "LINESTRING",
          icon: "linear_scale",
          label: "خطی"
        },
        {
          type: "POLYGON",
          icon: "change_history",
          label: "چندضلعی"
        }
      ]
    }
  },

  data () {
    return {
      name: "SafaMapMeasure",
      currentLineLength: 0,
      showUtmModal: false,
      isLine: null,
      isUTM: null,

      showDrawMethods: false,
      showUploadUTMFileDialog: false,
      NewPoint: { LatX: 0, LngY: 0, ZN: 0, Coord: "DD", ZL: "R" },
      StrType: "POLYGON",
      StrPoint: "",
      Valid: false,
      WKT: "",
      Points: []
    }
  },

  computed: {
    Valid1 () {
      if (this.StrType == "POINT") {
        return this.Points.length == 1
      }
      if (this.StrType == "LINESTRING") {
        return this.Points.length > 1
      }
      if (this.StrType == "POLYGON") {
        return this.Points.length > 2
      }
      return false
    },
    BackColor () {
      if (this.Valid1 == false) {
        return "#F8D7DA"
      } else {
      }
      return "#D4EDDA"
    },
    currentPathLength () {
      const coordinates2 = this.Points.map((point) => {
        const [lat, lon] = point.DD.split(" ").map(Number)
        return [lon, lat]
      })

      const haversine = ([lon1, lat1], [lon2, lat2]) => {
        const R = 6371000
        const toRadians = (degree) => degree * (Math.PI / 180)

        const dLon = toRadians(lon2 - lon1)
        const dLat = toRadians(lat2 - lat1)

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        return Math.round(R * c * 100) / 100
      }
      const length = coordinates2.reduce((acc, point1, i) => {
        const point2 = coordinates2[(i + 1) % coordinates2.length]
        return acc + haversine(point1, point2)
      }, 0)

      return length.toFixed(2)
    }
  },

  methods: {
    toggleMode (currentType) {
      this.NewPoint.Coord = currentType === "DD" ? "UTM" : "DD"
      this.LoadObj()
    },

    onLine () {
      this.clearHandler()
      this.isUTM = null
      this.isLine = true
      this.Points = []
      this.WKT = ""
      this.$KaisMap.StrMeasureType = "LineString"
      this.$KaisMap.StartMeasureing()
      this.$KaisMap.Events.addEventListener("measure:end", (e) => {
        let outputWKT = ""

        if (e.data?.WKT) {
          try {
            const lonLatCoordinates = new WKT()
              .readFeature(e.data.WKT)
              .getGeometry()
              .getCoordinates()
              .map((coord) => toLonLat(coord))

            outputWKT = `LINESTRING(${lonLatCoordinates
              .map((coord) => `${coord[0]} ${coord[1]}`)
              .join(", ")})`
          } catch (ex) { }
        }

        this.$emit("input", e.data.value)
        this.$emit("getMapInfo", {
          PathLength: e.data.value ?? 0, // طول ترسیم
          WKT: outputWKT ?? "",
          CI_Region: e.data?.CI_Region ?? 0, // Item1 منطقه
          RequesterRegion: e.data?.RequesterRegion ?? "", // Item2 ناحیه
          AreaCode: e.data?.AreaCode ?? "" // Item3 ناحیه
        })
      })
    },

    onUTM () {
      // this.clearHandler();
      this.isLine = null
      this.isUTM = this.showUtmModal = true
      this.$nextTick(this.LoadObj)
    },

    confirmUTM () {
      // let currentPathLength = this.generatePathLength()
      this.$emit("input", this.currentPathLength)
      this.$emit("getMapInfo", {
        PathLength: this.currentPathLength ?? 0, // طول ترسیم
        WKT: this.WKT ?? "",
        CI_Region: 0, // Item1 منطقه
        RequesterRegion: "", // Item2 ناحیه
        AreaCode: "" // Item3 ناحیه
      })
      this.showUtmModal = false
    },

    clearHandler () {
      this.showUtmModal = false
      // this.Points = []
      // this.WKT = ""
      // this.mapClear()
      // this.$emit("input", 0)
      // this.$emit("getMapInfo", {
      //   PathLength: 0, // طول ترسیم
      //   WKT: "",
      //   CI_Region: 0, // Item1 منطقه
      //   RequesterRegion: "", // Item2 ناحیه
      //   AreaCode: "" // Item3 ناحیه
      // })
      // this.$KaisMap.StrEDITWKT = ""
      // this.currentLineLength = 0
      // this.showUtmModal = false
    },

    drawHandler (ptype) {
      this.$KaisMap.SelectedLayer = { Layer: { StrGeomType: ptype } }
      this.$KaisMap.EditStrGeomType = ptype
      this.StrType = ptype

      const self = this
      this.StrType = this.$KaisMap.EditStrGeomType

      this.$KaisMap.Draw(this.StrType, (s, wkt) => {
        self.WKT = wkt
        self.LoadObj()
      })
    },
    addPointDis (Pitem, index) {
      if (!this.$KaisMap.EditStrGeomType) this.$KaisMap.EditStrGeomType = "LINESTRING"

      let P = ""
      this.$KaisMap.setDrawDisCallBack((s) => {
        if (P != s) {
          Pitem.ToP = s
          this.$KaisMap.DrawLineByDis(Pitem)
        }
        P = s
      })
      this.$KaisMap.setDrawDisEndCallBack((s) => {
        this.NewPoint = {
          LatX: s.geometry.coordinates[0],
          LngY: s.geometry.coordinates[1],
          ZN: 0,
          Coord: "DD",
          ZL: "R"
        }
        this.Points.splice(index, 0, {
          DD: `${this.NewPoint.LatX} ${this.NewPoint.LngY}`
        })
        this.Show()
      })
    },
    addPoint () {
      if (this.NewPoint.Coord == "UTM") {
        let TmpUtm = this.$latlng.convertUtmToLatLng(
          this.NewPoint.LatX,
          this.NewPoint.LngY,
          this.NewPoint.ZN,
          this.NewPoint.ZL
        )
        this.Points.push({
          DD: `${TmpUtm.lng} ${TmpUtm.lat}`,
          UTM: {
            X: Number(this.NewPoint.LatX),
            Y: Number(this.NewPoint.LngY),
            ZN: Number(this.NewPoint.ZN),
            ZL: this.NewPoint.ZL
          }
        })
      } else {
        this.Points.push({ DD: `${this.NewPoint.LatX} ${this.NewPoint.LngY}` })
      }
      this.NewPoint.LatX = this.NewPoint.LngY = 0
      this.$nextTick(this.$refs[this.NewPoint.Coord == "UTM" ? 'UTMLatX' : 'DDLatX'].setFocus)
      this.Show()
    },
    LoadObj () {
      let StrPoint = this.WKT.replace(/LINESTRING/gi, "")
        .replace(/POINT/gi, "")
        .replace(/POLYGON/gi, "")
        .replace("(", "")
        .replace("(", "")
        .replace(")", "")
        .replace(")", "")
      StrPoint = StrPoint.replace(/MULTI/gi, "")
        .replace(/POINT/gi, "")
        .replace(/POLYGON/gi, "")
        .replace("(", "")
        .replace("(", "")
        .replace(")", "")
        .replace(")", "")
      StrPoint = StrPoint.replace(/ , /gi, ",")
        .replace(/, /gi, ",")
        .replace(/ ,/gi, ",")
      this.StrPoint = StrPoint
      // this.StrType = StrType
      let TmpP = this.StrPoint.split(",")
      let t = []
      TmpP.forEach((x) => {
        if (x != "") {
          let StrXY = x.split(" ")
          if (StrXY[0] == "") StrXY.splice(0, 1)
          let TmpUtm = this.$latlng.convertLatLngToUtm(StrXY[1], StrXY[0], 9)
          t.push({
            DD: x,
            UTM: {
              X: TmpUtm.Easting,
              Y: TmpUtm.Northing,
              ZN: TmpUtm.ZoneNumber,
              ZL: TmpUtm.ZoneLetter
            }
          })
        }
      })
      this.Points = t

      this.Show()
    },
    ShowPoint (item) {
      this.Show()
      let TmpPoint = `POINT (${item.DD})`
      if (!this.$KaisMap.EditStrGeomType)
      { this.$KaisMap.EditStrGeomType = this.getGeomTypeByWKT() }
      this.$KaisMap.ShowWkt({ WKT: TmpPoint })
    },
    Edit () {
      this.$KaisMap.Clear()
      let fobj = this.$KaisMap.EditWKT({ WKT: this.WKT })
      this.$KaisMap.ZoomToFeature(fobj)
    },

    DeletePoint (index) {
      this.Points.splice(index, 1)
      this.Show()
    },
    Show () {
      let StrP = ""
      this.Points.forEach((x) => {
        if (StrP == "") {
          StrP = x.DD
        } else {
          StrP = `${StrP},${x.DD}`
        }
      })
      let StrWkt = `${this.StrType}(${StrP})`
      if (this.StrType == "POLYGON") {
        StrWkt = `${this.StrType}((${StrP}))`
      }
      this.WKT = StrWkt
      this.$KaisMap.Clear()
      let self = this
      this.$KaisMap.EditCallBack = (PWKT) => {
        self.WKT = PWKT
        self.LoadObj()
      }
      this.$KaisMap.StrEDITWKT = StrWkt
      if (this.allowEdit) {
        this.$KaisMap.EditWKT({ WKT: StrWkt })
        if (this.$KaisMap.SelectedLayer.Layer)
        { this.$KaisMap.SelectedLayer.Layer.IsVaildGeom = this.Valid1 }
      } else {
        this.$KaisMap.ShowWkt({ WKT: StrWkt })
      }
    },
    getGeomTypeByWKT () {
      if (this.WKT.startsWith("LINESTRING"))
      { return "LINESTRING" }
      else if (this.WKT.startsWith("POLYGON"))
      { return "POLYGON" }
      else
      { return "" }
    },
    uploadFile (file) {
      const self = this
      let reader = new FileReader()
      reader.addEventListener("load", ($e) => {
        try {
          const regex = /(\d+\.\d+),(\d+\.\d+)/g

          self.Points = [...$e.target.result.matchAll(regex)].reduce(
            (acc, match) => {
              const utmPoint = {
                X: parseFloat(match[1]),
                Y: parseFloat(match[2]),
                ZN: 39,
                ZL: "R"
              }
              const ddPoint = this.$latlng.convertUtmToLatLng(
                ...Object.values(utmPoint)
              )

              acc.push({ DD: `${ddPoint.lng} ${ddPoint.lat}`, UTM: utmPoint })
              return acc
            },
            []
          )

          this.ShowPoint(self.Points[0])
        } catch (ex) {
          this.showError("هنگام آپلود فایل UTM خطایی رخ داد!")
          console.error(ex)
        } finally {
          this.showUploadUTMFileDialog = false
        }
      })
      reader.readAsText(file)
    }
    //   generatePathLength () {
    //     // // V1
    //     // const formatLength = (line) => {
    //     //   const length = getLength(line);
    //     //   let output;
    //     //   if (length > 100) {
    //     //     output = Math.round((length / 1000) * 100) / 100 + " km";
    //     //   } else {
    //     //     output = Math.round(length * 100) / 100 + " m";
    //     //   }
    //     //   return output;
    //     // };
    //     // const formatArea = (polygon) => {
    //     //   const area = getArea(polygon);
    //     //   let output;
    //     //   if (area > 10000) {
    //     //     output = Math.round((area / 1000000) * 100) / 100 + " km\xB2";
    //     //   } else {
    //     //     output = Math.round(area * 100) / 100 + " m\xB2";
    //     //   }
    //     //   return output;
    //     // };
    //     // const coordinates = this.Points.map((point) => {
    //     //   const { X, Y } = point.UTM;
    //     //   return [X, Y];
    //     // });
    //     // const geometry = new Polygon([coordinates]);
    //     // let length;
    //     // if (this.StrType === "POLYGON") {
    //     //   length = formatArea(geometry);
    //     // } else if (this.StrType === "LINESTRING") {
    //     //   length = formatLength(geometry);
    //     // }

    //     // V2
    //     const coordinates2 = this.Points.map((point) => {
    //       const [lat, lon] = point.DD.split(" ").map(Number)
    //       return [lon, lat]
    //     })

    //     const haversine = ([lon1, lat1], [lon2, lat2]) => {
    //       const R = 6371000
    //       const toRadians = (degree) => degree * (Math.PI / 180)

    //       const dLon = toRadians(lon2 - lon1)
    //       const dLat = toRadians(lat2 - lat1)

    //       const a =
    //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.cos(toRadians(lat1)) *
    //         Math.cos(toRadians(lat2)) *
    //         Math.sin(dLon / 2) *
    //         Math.sin(dLon / 2)

    //       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    //       return Math.round(R * c * 100) / 100
    //     }
    //     const length = coordinates2.reduce((acc, point1, i) => {
    //       const point2 = coordinates2[(i + 1) % coordinates2.length]
    //       return acc + haversine(point1, point2)
    //     }, 0)

  //     return length.toFixed(2)
  //   }
  },

  watch: {
    value () {
      this.currentLineLength = this.value
      if (this.value === 0) this.mapClear()
    },
    showUtmModal: {
      handler (newVal) {
        if (newVal) {
          this.WKT = this.$KaisMap.StrEDITWKT
          this.StrType = this.$KaisMap.EditStrGeomType || this.getGeomTypeByWKT()
          this.LoadObj()
          this.Show()
        }
      },
      immediate: true
    }
  },

  mounted () {
    if (!this.$KaisMap.EditStrGeomType) this.$KaisMap.EditStrGeomType = "LINESTRING"
    this.$forceUpdate()
  },

  created () {
    this.clearHandler()
  }
}
</script>

<style scoped>
.map-measure-tablet.q-table--cell-separator tbody tr > td {
  padding: 1px
}
</style>
