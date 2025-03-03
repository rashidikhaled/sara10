<template>
  <div>
    <FormRow class="q-mb-sm">
      <FormControl>
        <div class="row q-col-gutter-sm">
          <safa-combo
            class="col"
            label="محل خدمت"
            label-width="80px"
            sourceType="local"
            :options="jobLocations"
          />
          <div class="q-gutter-sm btnInRow">
            <!-- <btn-default
              label=""
              title="محل خدمت کاربران"
              icon="list_alt"
            /> -->
            <btn-default
              :disable="!value.jobLocation.NidJobLocation"
              label=""
              title="نمایش کاربران زیر مجموعه محل خدمت"
              icon="groups"
            />
          </div>
        </div>
      </FormControl>
    </FormRow>
    <FormRow>
      <FormControl>
        <safa-combo
          label="نوع قرارداد کاری"
          label-width="80px"
          source-type="local"
          :options="jobTyps"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="سمت"
          label-width="80px"
          sourceType="local"
          :options="posts"
        />
      </FormControl>
      <FormControl>
        <safa-text label="مناطق دارای دسترسی" label-width="80px" />
      </FormControl>
      <FormControl>
        <safa-text label="آی پی های مجاز" label-width="80px" />
      </FormControl>
      <FormControl>
        <safa-datepicker label="تاریخ شروع خدمت" label-width="80px" />
      </FormControl>
      <FormControl>
        <safa-datepicker label="تاریخ پایان خدمت" label-width="80px" />
      </FormControl>
    </FormRow>
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    // value: {
    //   type: Object,
    //   default: () => {},
    // },
    // jobLocations: {
    //   type: Array,
    //   default: () => [],
    // },
    // posts: {
    //   type: Array,
    //   default: () => [],
    // },
    // jobTyps: {
    //   type: Array,
    //   default: () => []
    // }
    m: String
  },

  data () {
    return {
      name: "JobLocationInfo"
    }
  }
}
</script>
