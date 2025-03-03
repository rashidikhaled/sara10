<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitterModel"
      horizontal
      class="fit"
      :min-height="$q.screen.lt.md ? '200px' : '150px'"
    >
      <template v-slot:before>
        <safa-splitter
          v-model="verticalSplitterModeltop"
          :horizontal="$q.screen.lt.md"
          class="fit"
          style="min-height:150px"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                helper="peacDetalisTarheTafsisli1"
                v-model="results.Sh_PeaceLetter"
                :m="m"
                title="صلح مقدار درمسیر"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                helper="peacDetalisTarheTafsisli2"
                v-model="results.Base_PlanMosavab"
                title="طرح و کاربری مصوب"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <safa-splitter
          v-model="verticalSplitterModelbottom"
          :horizontal="$q.screen.lt.md"
          class="fit"
          style="min-height:150px"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                helper="peacDetalisTarheTafsisli3"
                v-model="results.Base_PlanMojaz"
                title="طرح و کاربری مجاز"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                helper="peacDetalisTarheTafsisli4"
                v-model="results.Base_PlanForWork"
                title="طرح و کاربری ملاک عمل"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      horizontalSplitterModel: 50,
      verticalSplitterModeltop: 50,
      verticalSplitterModelbottom: 50
    }
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
