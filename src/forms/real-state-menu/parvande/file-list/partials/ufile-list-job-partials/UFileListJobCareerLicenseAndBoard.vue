<template>
  <fit>
    <safa-splitter
      v-model="splitterModel2"
      vertical
      class="q-mb-sm"
      margin="0"
      style="min-height: 250px"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_JobLicence"
            helper="Base_JobLicence"
            :m="m"
            title="مشخصات مجوز"
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
          <safa-datatable
            v-model="value.Base_JobTablo"
            helper="Base_JobTablo"
            :m="m"
            title="مشخصات تابلو"
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
    <safa-splitter
      v-model="splitterModel2"
      vertical
      class="q-mb-sm"
      margin="0"
      style="min-height: 250px"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_JobVacation"
            helper="Base_JobVacation"
            :m="m"
            title="تعطیلات شغلی"
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
          <safa-splitter
            v-model="splitterModel"
            vertical
            margin="0"
            style="min-height: 250px"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  v-model="value.Base_JobOtherEquipment"
                  helper="Base_JobOtherEquipment"
                  :m="m"
                  title="سایر امکانات"
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
                <safa-datatable
                  v-model="value.Base_JobAsset"
                  helper="Base_JobAsset"
                  :m="m"
                  title="مبلغ دارایی"
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
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  },

  data () {
    return {
      splitterModel: 50,
      splitterModel2: 35
    }
  }
}
</script>
