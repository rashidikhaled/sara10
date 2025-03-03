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
            style="min-height: 150px"
          >
            <fit>
              <safa-datatable
                v-model="results.Base_Bezel"
                cdcName="Base_Bezel"
                ref="grid"
                name="grid"
                helper="shahrsazi.pakhha"
                :m="m"
                title="پخ ها"
                :paginate="false"
                :loadingAnimation="false"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              ></safa-datatable>
            </fit>
          </div>
          <div
            class="col-12 col-md-4 q-mb-sm q-mb-md-none"
            style="min-height: 150px"
          >
            <fit>
              <safa-datatable
                v-model="results.Base_Gap"
                cdcName="Base_Gap"
                ref="grid"
                name="grid"
                helper="shahrsazi.crater"
                :m="m"
                :paginate="false"
                :loadingAnimation="false"
                title="دهانه"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              ></safa-datatable>
            </fit>
          </div>
          <div
            class="col-12 col-md-4 q-mb-sm q-mb-md-none"
            style="min-height: 150px"
          >
            <safa-datatable
              title="مشخصات درها "
              fit
              height="100%"
              max-height="100%"
              helper="baseDoor"
              :m="m"
              v-model="results.Base_Door"
              cdcName="Base_Door"
            />
          </div>
        </div>
      </template>
      <template v-slot:after>
        <div class="row q-col-gutter-x-sm full-height">
          <div
            class="col-12 col-md-4 q-mb-sm q-mb-md-none"
            style="min-height: 150px"
          >
            <fit>
              <safa-datatable
                v-model="results.Base_Neighbor"
                cdcName="Base_Neighbor"
                ref="grid"
                name="grid"
                helper="shahrsazi.mojaverinInOtherSpecificationTab"
                m="r"
                :show-selected-checkbox="false"
                :allowMultipleSelection="false"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                :paginate="false"
                :loadingAnimation="false"
                title="مجاورین"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              ></safa-datatable>
            </fit>
          </div>
          <div
            class="col-12 col-md-4 q-mb-sm q-mb-md-none"
            style="min-height: 150px"
          >
            <fit>
              <safa-datatable
                v-model="results.Base_Wall"
                cdcName="Base_Wall"
                ref="grid"
                name="grid"
                helper="shahrsazi.wallProperties"
                :m="m"
                :paginate="false"
                :loadingAnimation="false"
                title="مشخصات دیوارها"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              ></safa-datatable>
            </fit>
          </div>
          <div
            class="col-12 col-md-4 q-mb-sm q-mb-md-none"
            style="min-height: 150px"
          >
            <safa-datatable
              title="فضای سبز"
              fit
              height="100%"
              max-height="100%"
              helper="baseGreenSpace"
              :m="m"
              v-model="results.Base_GreenSpace"
              cdcName="Base_GreenSpace"
            />
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
      firstVerticalSplitter: 50,
      secondVerticalSplitter: 50,
      pakhItems: [],
      dahaneItems: [],
      mojaverinItems: [],
      wallItems: [],
      doorItems: [],
      greenAreaItems: []
    }
  },
  props: {
    results: Object,
    m: String
  },
  mounted () {},
  methods: {}
}
</script>
