<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      horizontal
      class="q-mb-sm"
      margin="0"
      style="min-height: 250px"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="splitterModel"
            vertical
            margin="0"
            style="min-height: 250px"
          >
            <template v-slot:before>
              <fit>
                <safa-grid
                  v-model="getHouseResult.Base_PlanMosavab"
                  helper="placedUsingAndDesignColumns"
                  :m="m"
                  title="طرح و کاربری مصوب"
                  fit
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
              </fit>
            </template>

            <template v-slot:after>
              <fit>
                <safa-sketch
                  class="fit"
                  :readonly="m == 'r'"
                  :sketch-id="croqieGuid"
                />

                <!-- # todo -->
                <!-- <div>
                  <btn-default
                    label="مشاهده"
                    @click="showDrawingPatern = true"
                  />
                </div> -->
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>

      <template v-slot:after>
        <fit>
          <safa-grid
            v-model="getHouseResult.Base_PlanMojaz"
            helper="mojazUsingAndDesignColumns"
            :m="m"
            title="طرح و کاربری مجاز"
            fit
            min-height="150px"
            height="100%"
            max-height="100%"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    getHouseResult: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    },
    croqieGuid: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      splitterModel: 50
    }
  }
}
</script>
