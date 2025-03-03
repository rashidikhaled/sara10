<template>
<fit>
      <safa-splitter
        v-model="horizontalSplitterModel"
        horizontal
        class="fit"
        :min-height="$q.screen.lt.md ? '1000px' : '150px'"
        margin="0"
      >
        <template v-slot:before>
          <div class="row q-col-gutter-x-sm full-height">
            <div
              class="col-12 col-md-4 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  v-model="value.Base_Bezel"
                  ref="grid"
                  name="grid"
                  helper="shahrsazi.pakhha"
                  m="r"
                  @checkBoxSelectedChanged="checkBoxSelectedChanged"
                  :paginate="false"
                  :loadingAnimation="false"
                  title="پخ ها"
                  height="100%"
                  max-height="100%"
                ></safa-datatable>
              </fit>
            </div>
            <div
              class="col-12 col-md-4 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  v-model="value.Base_Gap"
                  ref="grid"
                  name="grid"
                  helper="shahrsazi.crater"
                  m="r"
                  :paginate="false"
                  :loadingAnimation="false"
                  title="دهانه"
                  height="100%"
                  max-height="100%"
                ></safa-datatable>
              </fit>
            </div>
            <div
              class="col-12 col-md-4 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  v-model="value.Base_Neighbor"
                  ref="grid"
                  name="grid"
                  helper="shahrsazi.mojaverinInOtherSpecificationTab"
                  :m="m"
                  :paginate="false"
                  :loadingAnimation="false"
                  title="مجاورین"
                  height="100%"
                  max-height="100%"
                ></safa-datatable>
              </fit>
            </div>
          </div>
        </template>
        <template v-slot:after>
          <div class="row q-col-gutter-x-sm full-height">
            <div
              class="col-12 col-md-4 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  v-model="value.Base_Wall"
                  ref="grid"
                  name="grid"
                  helper="shahrsazi.wallProperties"
                  :m="m"
                  :paginate="false"
                  :loadingAnimation="false"
                  title="مشخصات دیوارها"
                  height="100%"
                  max-height="100%"
                ></safa-datatable>
              </fit>
            </div>
            <div
              class="col-12 col-md-4 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  v-model="value.Base_Door"
                  ref="grid"
                  name="grid"
                  helper="shahrsazi.doorProperties"
                  m="r"
                  :paginate="false"
                  :loadingAnimation="false"
                  title="مشخصات درها"
                  height="100%"
                  max-height="100%"
                ></safa-datatable>
              </fit>
            </div>
            <div
              class="col-12 col-md-4 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <safa-datatable
                v-model="value.Base_GreenSpace"
                ref="grid"
                name="grid"
                helper="shahrsazi.greenArea"
                m="r"
                :paginate="false"
                :loadingAnimation="false"
                title="فضای سبز"
                height="100%"
                max-height="100%"
              ></safa-datatable>
            </div>
          </div>
        </template>
      </safa-splitter>
      </fit>
</template>

<script>
export default {
  data () {
    return {
      horizontalSplitterModel: 50,
      pakhItems: [],
      dahaneItems: [],
      mojaverinItems: [],
      wallItems: [],
      doorItems: [],
      greenAreaItems: []
    }
  },
  props: {
    value: Object,
    m: String
  },
  mounted () {
    this.pakhItems = this.value.Base_Bezel

    this.dahaneItems = this.value.Base_Gap

    this.mojaverinItems = this.value.Base_Neighbor

    this.wallItems = this.value.Base_Wall

    this.doorItems = this.value.Base_Door

    this.greenAreaItems = this.value.Base_GreenSpace
  },
  methods: {
    pakhRowUpdated (e) {
      this.value.Base_Bezel = e.gridItems
    },
    dahaneRowUpdated (e) {
      this.value.Base_Gap = e.gridItems
    },
    mojaverinRowUpdated (e) {
      this.value.Base_Neighbor = e.gridItems
    },
    wallRowUpdated (e) {
      this.value.Base_Wall = e.gridItems
    },
    doorRowUpdated (e) {
      this.value.Base_Door = e.gridItems
    },
    greenAreaRowUpdated (e) {
      this.value.Base_GreenSpace = e.gridItems
    },
    checkBoxSelectedChanged (e) {
      // alert('sdsddssd')

      // console.log('///// e check', e)

      this.value.Base_Bezel.map((obj) => {
        if (obj.NidBezel === e.dataItem.NidBezel) {
          obj.IsObserve = e.value
        }
        return obj
      })
    }
  }
}
</script>
