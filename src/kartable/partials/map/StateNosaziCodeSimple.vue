<template>
  <section class="row q-col-gutter-md">
    <div
        class="col-12"
        v-if="workflowState.description"
    >
      <q-banner class="bg-accent text-justify">
        {{ workflowState.description }}
      </q-banner>
    </div>

    <div class="col-12 col-sm-6 col-md-4">
      <q-form
          ref="theForm"
          autofocus
          class="column fit q-pa-md-sm frame-box"
          @submit="load"
      >
        <base-nosazi-code-input
            required
            live-update
            v-model="dataModel.nosaziCode"
            @last-input="$refs.theForm.submit()"
        >
        </base-nosazi-code-input>
        <q-btn
            label="انتخاب کد وارد شده"
            color="primary"
            @click="$refs.theForm.submit()"
        />
        <q-btn
            outline
            icon-right="location_on"
            class="q-mt-md"
            label="انتخاب از روی نقشه"
            color="primary"
            @click="isSelectingFromMap = !isSelectingFromMap"
        />
      </q-form>
    </div>

    <div class="col-12 col-sm-6 col-md-8">
      <div class="frame-box q-pa-xs">
        <base-map
            style="height: 400px;"
            update-view
            :zoom="zoom"
            :center="center"
            :wkt-list="wktList"
            :style="{cursor: isSelectingFromMap ? 'crosshair' : ''}"
            @update:selectedCoords="locationSelected"
        />
      </div>
    </div>

    <base-loading-progress v-model="loading"/>
  </section>
</template>

<script>
export default {
  name: 'StateNosaziCodeSimple',

  props: {
    value: {
      type: Object
    },
    model: {
      type: Object,
      default: () => ({})
    },
    workflow: {
      type: Object,
      default: () => ({})
    },
    workflowState: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      loading: false,
      isSelectingFromMap: false,
      dataModel: {
        nosaziCode: '',
        WKT: '',
        NidNosaziCode: '',
        ...this.model?.payload
      }
    }
  },

  computed: {
    zoom () {
      return this.dataModel.WKT ? 18 : 12
    },
    center () {
      if (this.dataModel.WKT) {
        return null
      }
      return webconfig.mapConfig?.lonLat
    },
    wktList () {
      if (!this.dataModel.WKT) {
        return []
      }
      return [{ location: this.dataModel.WKT }]
    }
  },

  methods: {
    async load () {
      try {
        this.loading = true
        // Update step model to go to next
        this.$emit('update:undone', {
          workflowState: this.workflowState
        })

        this.isSelectingFromMap = false
        const { data } = await this.$services.call({
          service: 'crowd',
          path: 'CheckRequestValidity',
          payload: {
            pCode: this.dataModel.nosaziCode
          }
        })
        if (!data?.RequestValidity?.Sh_RequestInfo?.NidNosaziCode) {
          this.$dialog.error('کد نوسازی معتبر نمیباشد')
          return
        }

        this.dataModel = {
          nosaziCode: this.dataModel.nosaziCode,
          NidNosaziCode: data.RequestValidity.Sh_RequestInfo.NidNosaziCode,
          WKT: data.RequestValidity.WKT
        }

        this.$emit('input', this.dataModel)
        this.$emit('change-nosazi-code', this.dataModel.nosaziCode)

        // Update step model to go to next
        this.$emit('update:done', {
          done: true,
          workflowState: this.workflowState,
          payload: this.dataModel
        })

        // end
      } catch (e) {
        this.$dialog.error(e.message)
      } finally {
        this.loading = false
      }
    },
    async locationSelected ([lon, lat]) {
      if (!this.isSelectingFromMap || !lon || !lat) {
        return
      }
      this.isSelectingFromMap = false
      try {
        this.loading = true
        const { data } = await this.$services.call({
          service: 'map',
          path: 'MapFind',
          payload: {
            PWKt: '',
            PBuffer: 0,
            // eslint-disable-next-line no-undef
            PWhere: ` and layerid in(${webconfig.mapConfig?.mojoodLayerIDs}) and Geometry::STGeomFromText('Point(${lon} ${lat})', 4326).MakeValid().STIntersects(Geom.MakeValid()) = 1`,
            Pfrom: 1,
            Pto: 2
          }
        })
        const [{ Code }] = data || []
        if (Code) {
          this.dataModel.nosaziCode = Code
          await this.load()
        }
      } catch (e) {
        this.$logger.catchError(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
