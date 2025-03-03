<template>
  <div class="full-height">
    <safa-splitter
      v-model="splitterModel"
      horizontal
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.md ? '300px' :'420px'"
    >
      <template v-slot:before>
        <fit>
         <safa-grid
              helper="agFirstCategoryUser"
              fit
              title="کاربری های دسته اول"
              min-height="150px"
              height="100%"
              max-height="100%"
              :m="m"
              v-model="results.Base_Using_Revisit"
              paginate
            />
        </fit>
      </template>
      <template v-slot:after>
      <fit>
          <safa-grid
              helper="secondCategoryUser"
              min-height="150px"
              height="100%"
              max-height="100%"
              :m="m"
              title="کاربری های دسته دوم"
              v-model="results.Base_Using_Other"
              paginate
              fit
            />
        </fit>
      </template>
    </safa-splitter>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      splitterModel: 50
    }
  },
  props: {
    results: Object
  }
}
</script>
