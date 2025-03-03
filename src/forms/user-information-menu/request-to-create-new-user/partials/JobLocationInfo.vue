<template>
  <div>
    <FormRow class="q-mb-sm">
      <FormControl>
        <div class="row q-col-gutter-sm">
          <safa-combo
            class="col"
            label="محل خدمت"
            label-width="90px"
            sourceType="local"
            :options="jobLocations"
            v-model="value.jobLocation.NidJobLocation"
            :required="activeTab === 'jobLocationInfo_tab'"
            :validations="activeTab === 'jobLocationInfo_tab' ? 'required' : ''"
            :m="m"
            cdcName="NidJobLocation"
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
              @click="showJoinedHandler"
            />
          </div>
        </div>
      </FormControl>
      <!-- <FormControl>
        <safa-combo
          label="حوزه فعالیت"
          sourceType="local"
          label-width="90px"
          v-model="value.jobLocation.CI_JobType"
           :m="m"
           cdcName=""
        />
      </FormControl> -->
      <FormControl>
        <safa-combo
          label="نوع قرارداد کاری"
          label-width="90px"
          source-type="local"
          :options="jobTyps"
          v-model="value.jobLocation.CI_JobType"
          :required="activeTab === 'jobLocationInfo_tab'"
          :validations="activeTab === 'jobLocationInfo_tab' ? 'required' : ''"
          :m="m"
          cdcName="CI_JobType"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="سمت"
          label-width="90px"
          sourceType="local"
          :options="posts"
          v-model="value.jobLocation.post"
          :required="activeTab === 'jobLocationInfo_tab'"
          :validations="activeTab === 'jobLocationInfo_tab' ? 'required' : ''"
          :m="m"
          cdcName="post"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پست سازمانی"
          label-width="90px"
          v-model="value.jobLocation.organPost"
          :required="activeTab === 'jobLocationInfo_tab'"
          :validations="activeTab === 'jobLocationInfo_tab' ? 'required' : ''"
          :m="m"
          cdcName="organPost"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مناطق دارای دسترسی"
          label-width="90px"
          v-model="value.jobLocation.allowDomains"
          :required="activeTab === 'jobLocationInfo_tab'"
          :validations="activeTab === 'jobLocationInfo_tab' ? 'required' : ''"
          :m="m"
          cdcName="allowDomains"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="آی پی های مجاز"
          label-width="90px"
          v-model="value.jobLocation.allowedIP"
          :m="m"
          cdcName="allowedIP"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="شروع خدمت"
          label-width="90px"
          v-model="value.jobLocation.startDate"
          :required="activeTab === 'jobLocationInfo_tab'"
          :validations="activeTab === 'jobLocationInfo_tab' ? 'required' : ''"
          :m="m"
          cdcName="startDate"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="پایان خدمت"
          label-width="90px"
          v-model="value.jobLocation.endDate"
          :m="m"
          cdcName="endDate"
        />
      </FormControl>
    </FormRow>

    <safa-popup
      title="کاربران زیر مجموعه"
      v-model="showJoined"
      width="600px"
      height="400px"
      padding
    >
      <safa-datatable
        v-model="joinedJobLocations"
        hideHeader
        :columns="joinedJobLocationsColumns"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
        fit
        paginate
        m="r"
      />
    </safa-popup>
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    jobLocations: {
      type: Array,
      default: () => []
    },
    posts: {
      type: Array,
      default: () => []
    },
    jobTyps: {
      type: Array,
      default: () => []
    },
    activeTab: String,
    m: String
  },

  data () {
    return {
      name: "JobLocationInfo",
      showJoined: false,
      joinedJobLocations: [],
      joinedJobLocationsColumns: [
        {
          field: "username",
          title: "نام کاربری",
          width: "150px"
        },
        {
          field: "firstName",
          title: "نام",
          width: "100px"
        },
        {
          field: "lastName",
          title: "نام خانوادگی",
          width: "100px"
        },
        {
          field: "CI_JobType",
          title: "شهر محل خدمت",
          editor: "combo",
          width: "100px"
        },
        {
          field: "jobLocationName",
          title: "تاریخ شروع",
          width: "100px"
        },
        {
          field: "jobLocationName",
          title: "تاریخ پایان",
          width: "100px"
        },
        {
          field: "jobLocationName",
          title: "محل خدمت",
          width: "150px"
        },
        {
          field: "active",
          title: "فعال",
          editor: "checkbox",
          width: "60px"
        },
        {
          field: "isSysAdmin",
          title: "مدیر سیستم",
          editor: "checkbox",
          width: "60px"
        }
      ]
    }
  },

  methods: {
    showJoinedHandler () {
      this.showLoading()
      this.$services.security
        .getJobLocationUsers({
          NidJobLocation: this.value.jobLocation.NidJobLocation
        })
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.joinedJobLocations = res.data.data.list
            this.showJoined = true
          }
        })
        .catch((response) => {
          console.error(response, "error_getJobLocationUsers")
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  watch: {}
}
</script>

<style lang="scss">
.btnInRow .q-btn__wrapper {
  padding: 4px 6px;
}
</style>
