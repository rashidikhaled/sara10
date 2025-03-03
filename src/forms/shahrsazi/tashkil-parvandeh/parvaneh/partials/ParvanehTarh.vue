<template>
  <fit>
    <safa-splitter v-model="splitter" class="fit" vertical>
      <template v-slot:before>
        <safa-splitter
          v-model="gridsplitter"
          class="fit"
          height="200px"
          margin="0"
          horizontal
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                v-model="results.Base_PlanMosavab"
                ref="grid2"
                helper="payankarTarhUserAccept"
                title="طرح و کاربری مصوب"
                margin="0"
                height="100%"
                max-height="100%"
                :bordered="false"
              />
            </fit>
          </template>
          <template v-slot:after>
            <safa-splitter
              v-model="gridsplitter"
              class="fit"
              min-height="200px"
              margin="0"
            >
              <template v-slot:before>
                <fit>
                  <safa-datatable
                    class="fit"
                    v-model="results.Base_PlanMojaz"
                    ref="grid2"
                    helper="payankarTarhUserValid"
                    title="طرح و کاربری مجاز"
                    height="100%"
                    max-height="100%"
                    :bordered="false"
                  ></safa-datatable>
                  <q-separator />
                </fit>
              </template>
              <template v-slot:after>
                <fit>
                  <q-separator />
                  <safa-datatable
                    class="fit"
                    v-model="results.Base_PlanForWork"
                    ref="grid2"
                    helper="payankarTarhUserMalek"
                    title="طرح و کاربری ملاک عمل"
                    height="100%"
                    max-height="100%"
                    :bordered="false"
                  ></safa-datatable>
                </fit>
              </template>
            </safa-splitter>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <fit>
          <div class="flex items-center justify-center">
            <safa-sketch
              class="fit"
              :readonly="true"
              v-if="results.NidLib"
              :sketch-id="calcSketchId"
            />
          </div>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      gridsplitter: 50,
      splitter: 60
    }
  },
  props: {
    results: Object
  },
  computed: {
    calcSketchId () {
      if (
        this.results.NidLib &&
        this.results.NidLib.RMovafeghatOsooli &&
        this.results.NidLib.RMovafeghatOsooli.NidBase
      ) {
        return this.results.NidLib.RMovafeghatOsooli.NidBase
      } else {
        return "00000000-0000-0000-0000-000000000000"
      }
    }
  }
}
</script>
