<template>
  <div class="Versioningbyproc">
    <div>

      <q-toolbar style="background-color: whitesmoke">
        <q-btn v-show="ShowClose" icon="cancel_presentation" flat round title="Close" @click="Close"/>
        <q-toolbar-title style="font-size:22px;">

          <div class="row justify-between" style="background-color:whitesmoke; font-size: 16px;">
            <div>
              <span>نام لایه :</span>
              <span style="color: blue;margin: 5px">{{ Title }}</span>
            </div>
            <!--            <div>-->
            <!--              <span>نسخه :</span>-->
            <!--              <span style="color: blue;margin: 5px;">{{Ver}}</span>-->
            <!--            </div>-->
            <div v-if="ShowّApply">
              <q-btn v-show="!isApply" color="green" label="تایید نسخه و اعمال تغییرات "
                     @click="DataVersionSubmit"></q-btn>
              <Span v-show="isApply" style="font-size: 16px; color: green">تغییرات با موفقیت انجام شد</Span>
            </div>

          </div>

        </q-toolbar-title>

      </q-toolbar>

      <div class="row justify-between">
        <div>
          <span style="font-size: 16px;margin: 5px;">درج شده ها</span>

          <span style="font-size: 20px;margin: 5px;color: blue">{{ PIns.Count }}</span>
        </div>
        <div class="row items-center " style="margin: 5px;">

          <q-slider class="col-auto" :min="1" :max="10" style="height: 20px;margin: 2px;width: 100px;"
                    v-model="PIns.Width"
                    @input="ShowOnMap('Insert')"/>
          <div style="width: 15px;height: 15px;color: #3c6f88;margin :5px;"
               v-bind:style="{backgroundColor:PIns.Color, borderColor:PIns.Color}">

            <q-popup-proxy>
              <q-color @change="changeColor" v-model="PIns.Color"/>
            </q-popup-proxy>
          </div>
          <q-checkbox v-model="PIns.ChShowonMap" @input="ShowOnMap('Insert')" dense size="sm"
                      style="width: 15px;height: 15px;"></q-checkbox>
        </div>
      </div>
      <DataTable :columns="columns" @row-click="RowClick" @addticket="a"
                 :custom-filter="true" :customButtons="[]"
                 height="300px" m="r"
                 style="margin: 1px;"
                 v-model="PIns.Items"/>
      <div class="col-auto">
        <div class="row bg-blue-1 items-center justify-end ">
          <q-btn flat dense icon="last_page" @click="PageNavigation('Last','Ins')" title="آخرین صفحه"></q-btn>
          <q-btn flat dense icon="chevron_right" @click="PageNavigation('Next','Ins')" title="بعدی"></q-btn>

          <input style="width: 50px;" v-model="PIns.CPage"/>
          <span style="margin: 5px;"> از  </span>
          <span>{{ PIns.TotalPage }} </span>
          <q-btn flat dense icon="chevron_left" @click="PageNavigation('Back','Ins')" title="قبلی"></q-btn>
          <q-btn flat dense icon="first_page" @click="PageNavigation('First','Ins')" title="اولین"></q-btn>
        </div>

      </div>
      <hr/>
      <div class="row justify-between">
        <div>
          <span style="font-size: 20px;margin: 5px;">آپدیت شده ها</span>
          <span style="font-size: 20px;margin: 5px;color: blue">{{ PUp.Count }}</span>
        </div>
        <div class="row items-center " style="margin: 5px;">

          <q-slider class="col-auto" :min="1" :max="10" style="height: 20px;margin: 2px;width: 100px;"
                    v-model="PUp.Width"
                    @input="ShowOnMap('Update')"/>
          <div style="width: 15px;height: 15px;color: #3c6f88;margin :5px;"
               v-bind:style="{backgroundColor:PUp.Color, borderColor:PUp.Color}">

            <q-popup-proxy>
              <q-color v-model="PUp.Color"/>
            </q-popup-proxy>
          </div>
          <q-checkbox v-model="PUp.ChShowonMap" @input="ShowOnMap('Update')" dense size="sm"
                      style="width: 15px;height: 15px;"></q-checkbox>
        </div>
      </div>
      <DataTable :columns="columns" @row-click="RowClick" @addticket="a"
                 :custom-filter="true" :customButtons="[]"
                 height="600px" m="r"
                 style="margin: 1px;"
                 v-model="PUp.Items"/>
      <div class="col-auto">
        <div class="row bg-blue-1 items-center justify-end ">
          <q-btn flat dense icon="last_page" @click="PageNavigation('Last','UP')" title="آخرین صفحه"></q-btn>
          <q-btn flat dense icon="chevron_right" @click="PageNavigation('Next','UP')" title="بعدی"></q-btn>

          <input style="width: 50px;" v-model="PUp.CPage"/>
          <span style="margin: 5px;"> از  </span>
          <span>{{ PUp.TotalPage }} </span>
          <q-btn flat dense icon="chevron_left" @click="PageNavigation('Back','UP')" title="قبلی"></q-btn>
          <q-btn flat dense icon="first_page" @click="PageNavigation('First','UP')" title="اولین"></q-btn>
        </div>

      </div>
      <hr/>
      <div class="row justify-between">
        <div>
          <span style="font-size: 16px;margin: 5px;">حذف  شده ها</span>
          <span style="font-size: 20px;margin: 5px;">{{ PDel.Count }}</span>
        </div>
        <div class="row items-center " style="margin: 5px;">

          <q-slider class="col-auto" :min="1" :max="10" style="height: 20px;margin: 2px;width: 100px;"
                    v-model="PDel.Width"
                    @input="ShowOnMap('Delete')"/>
          <div style="width: 15px;height: 15px;color: #3c6f88;margin :5px;"
               v-bind:style="{backgroundColor:PDel.Color, borderColor:PDel.Color}">

            <q-popup-proxy>
              <q-color v-model="PDel.Color"/>
            </q-popup-proxy>
          </div>
          <q-checkbox v-model="PDel.ChShowonMap" @input="ShowOnMap('Delete')" dense size="sm"
                      style="width: 15px;height: 15px;"></q-checkbox>
        </div>

      </div>
      <DataTable :columns="columns" @row-click="RowClick" @addticket="a"
                 :custom-filter="true" :customButtons="[]"
                 height="300px" m="r"
                 style="margin: 1px;"
                 v-model="PDel.Items"/>
      <div class="col-auto">
        <div class="row bg-blue-1 items-center justify-end ">
          <q-btn flat dense icon="last_page" @click="PageNavigation('Last','Delete')" title="آخرین صفحه"></q-btn>
          <q-btn flat dense icon="chevron_right" @click="PageNavigation('Next','Delete')" title="بعدی"></q-btn>

          <input style="width: 50px;" v-model="PDel.CPage"/>
          <span style="margin: 5px;"> از  </span>
          <span>{{ PDel.TotalPage }} </span>
          <q-btn flat dense icon="chevron_left" @click="PageNavigation('Back','Delete')" title="قبلی"></q-btn>
          <q-btn flat dense icon="first_page" @click="PageNavigation('First','Delete')" title="اولین"></q-btn>
        </div>

      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Versioningbyproc',
  props: {
    NidProc: {
      type: String

    },
    TaskInfo: {
      type: Object,
      default: null
    },
    ShowّApply: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isApply: false,
      ShowClose: true,
      columns: [],
      NidLayer: 0,
      NidWorkItem: 0,
      PIns: {
        From: 0,
        Count: 0,
        Items: [],
        Color: '#00FF00',
        Width: 2,
        WKT: 'NotLoad',
        ChShowonMap: false,
        TotalPage: 1,
        CPage: 1

      },
      PUp: {
        From: 0,
        Count: 0,
        Items: [],
        Color: '#0090ff',
        Width: 2,
        WKT: 'NotLoad',
        ChShowonMap: false,
        TotalPage: 1,
        CPage: 1

      },
      PDel: {
        From: 0,
        Count: 0,
        Items: [],
        Color: '#ed0f56',
        Width: 2,
        WKT: 'NotLoad',
        ChShowonMap: false,
        TotalPage: 1,
        CPage: 1
      },
      Title: ''
    }
  },
  mounted () {
    this.LoadObj()
  },
  methods: {
    changeColor (color) {
      this.$emit('update:color', color)
    },
    DataVersionSubmit () {
      let thisc = this
      let pdata = {
        NidLayer: this.NidLayer,
        NidProc: this.NidProc,
        NidWorkItem: this.NidWorkItem
      }
      this.$KaisMap.SrvMap('DataVersionSubmit', pdata).then(R => {
        if (R.data.success === true) {
          alert('تغییرات با موفقیت انجام شد')
          thisc.isApply = true
        }
      })
    },
    Close () {
      this.$emit('close', '')
    },
    RowClick (Row) {
      this.selectedRow = Row

      this.$KaisMap.ShowWkt(Row)
    },
    LoadObj () {
      let thisc = this
      this.columns = [{ field: 'AD_Confirme', title: 'وضعیت', width: 250, cell: 'vconfirm' }]
      this.Items = []
      if (this.TaskInfo !== null) {
        this.ShowClose = false
        this.NidProc = this.TaskInfo.NidProc
        this.Title = this.TaskInfo.ProcArea
        this.NidLayer = this.TaskInfo.BizCode
        this.NidWorkItem = this.TaskInfo.NidWorkItem
      } else {
        this.NidLayer = this.$KaisMap.SelectedLayer.Layer.NidLayer
        this.Title = `${this.$KaisMap.SelectedLayer.Layer.LayerTitle}`
      }

      this.$forceUpdate()
      this.$KaisLayer.LoadFields(this.NidLayer, FieldList => {
        FieldList.forEach(c => {
          thisc.columns.push({ title: c.Alias, field: c.Name, domain: 'Base_Domain' })
        })
        thisc.$forceUpdate()
      })

      this.LoadInsert()
      this.LoadUpdate()
      this.LoadDelete()
    },
    ShowOnMap (PAction) {
      // eslint-disable-next-line no-unused-vars
      let tmpColor = '#edc708'
      // eslint-disable-next-line no-unused-vars
      let tmpWidth = 3
      let tmpChShowonMap = false
      let tmpObj = this.PIns

      if (PAction === 'Insert') {
        tmpColor = this.PIns.Color
        tmpWidth = this.PIns.Width
        tmpChShowonMap = this.PIns.ChShowonMap
        tmpObj = this.PIns
      } else if (PAction === 'Update') {
        tmpColor = this.PUp.Color
        tmpWidth = this.PUp.Width
        tmpObj = this.PUp
        tmpChShowonMap = this.PUp.ChShowonMap
      } else if (PAction === 'Delete') {
        // eslint-disable-next-line no-unused-vars
        tmpColor = this.PDel.Color
        // eslint-disable-next-line no-unused-vars
        tmpWidth = this.PDel.Width
        tmpObj = this.PDel
        tmpChShowonMap = this.PDel.ChShowonMap
      }
      let style = this.$KaisMap.GetStyleByColor(tmpObj.Color, tmpObj.Width)
      let tmp1 = `&StrWhere=and  NidProc='${this.NidProc}' and AD_Action='${PAction}'`
      if (this.tmpChShowonMap === true) {
        this.GetBoundingBox(this.NidProc, this.NidLayer, PAction, tmpObj)
      }
      let MainUrl = `${this.$KaisMap.UrlMapService}MvtVer?key=${this.NidLayer}&x={x}&y={y}&z={z}${tmp1}`
      this.$KaisMap.AddMVT1(`LV_${this.NidProc}${PAction}`, MainUrl, style,
        tmpChShowonMap, '')
    },
    GetBoundingBox (NidProc, NidLayer, aDAction, PObj) {
      let thisc = this
      let tmpStyle = thisc.$KaisMap.GetStyleByColor('rgba(187,222,251,0.2)', 1, '#bbdefb')
      if (PObj.WKT === 'NotLoad') {
        PObj.WKT = 'Loading'
        let pdata = {
          NidLayer: NidLayer,
          NidProc: NidProc,
          AD_Action: aDAction
        }
        this.$KaisMap.SrvMap('DataVersionBoundingBox', pdata).then(R => {
          if (R.data.success) {
            PObj.WKT = R.data.data[0]

            thisc.$KaisMap.ShowWkt(R.data.data[0], true, tmpStyle)
          }
        })
      } else {
        thisc.$KaisMap.ShowWkt(PObj.WKT, true, tmpStyle)
      }
    },
    LoadInsert () {
      let thisc = this
      let Pfrom = (this.PIns.CPage - 1) * 20
      let pdata = {
        NidLayer: this.NidLayer,
        NidProc: this.NidProc,
        Action: 'Insert',
        PFrom: Pfrom
      }
      this.$KaisMap.SrvMap('GetLayerDataVersionByNidProc', pdata).then(R => {
        if (R.data.success === true) {
          thisc.PIns.Items = R.data.data.Items
          thisc.PIns.Items.forEach(x => {
            x.NidLayer = thisc.NidLayer
          })
          thisc.PIns.Count = R.data.data.Paging.Count
          let tmpTotal = thisc.PIns.Count
          thisc.PIns.TotalPage = parseInt(tmpTotal / 20) === tmpTotal / 20
            ? parseInt(tmpTotal / 20)
            : parseInt(tmpTotal / 20) + 1
        }
      })
    },
    LoadUpdate () {
      let thisc = this
      let Pfrom = (this.PUp.CPage - 1) * 20
      let pdata = {
        NidLayer: this.NidLayer,
        NidProc: this.NidProc,
        Action: 'Update',
        PFrom: Pfrom
      }
      this.$KaisMap.SrvMap('GetLayerDataVersionByNidProc', pdata).then(R => {
        if (R.data.success === true) {
          thisc.PUp.Items = R.data.data.Items
          thisc.PUp.Items.forEach(x => {
            x.NidLayer = thisc.NidLayer
          })
          thisc.PUp.Count = R.data.data.Paging.Count
          let tmpTotal = thisc.PUp.Count
          thisc.PUp.TotalPage = parseInt(tmpTotal / 20) === tmpTotal / 20
            ? parseInt(tmpTotal / 20)
            : parseInt(tmpTotal / 20) + 1
        }
      })
    },
    LoadDelete () {
      let thisc = this
      let Pfrom = (this.PDel.CPage - 1) * 20
      let pdata = {
        NidLayer: this.NidLayer,
        NidProc: this.NidProc,
        Action: 'Delete',
        PFrom: Pfrom
      }
      this.$KaisMap.SrvMap('GetLayerDataVersionByNidProc', pdata).then(R => {
        if (R.data.success === true) {
          thisc.PDel.Items = R.data.data.Items
          thisc.PDel.Items.forEach(x => {
            x.NidLayer = thisc.NidLayer
          })
          thisc.PDel.Count = R.data.data.Paging.Count
          let tmpTotal = thisc.PDel.Count
          thisc.PDel.TotalPage = parseInt(tmpTotal / 20) === tmpTotal / 20
            ? parseInt(tmpTotal / 20)
            : parseInt(tmpTotal / 20) + 1
        }
      })
    },
    PageNavigation (PCommand, PMode) {
      let PObj = this.PUp
      if (PMode === 'Ins') {
        PObj = this.PIns
      } else if (PMode === 'Delete') {
        PObj = this.PDel
      }
      switch (PCommand) {
        case 'Next':
          PObj.CPage = PObj.CPage + 1
          break
        case 'Back':
          PObj.CPage = PObj.CPage - 1
          break
        case 'Last':
          PObj.CPage = PObj.TotalPage
          break
        case 'First':
          PObj.CPage = 1
      }
      if (PObj.CPage < 1) PObj.CPage = 1
      if (PObj.CPage > PObj.TotalPage) PObj.CPage = PObj.TotalPage
      if (PMode === 'Ins') {
        this.LoadInsert()
      } else if (PMode === 'Delete') {
        this.LoadDelete()
      } else {
        this.LoadUpdate()
      }
    }
  }
}
</script>
