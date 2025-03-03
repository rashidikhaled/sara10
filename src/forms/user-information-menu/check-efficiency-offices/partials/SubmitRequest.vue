<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-combo
          label="نوع درخواست"
          label-width="95px"
          v-model="value.NidRequest"
          cdcName="requestType"
          required
          validations="required"
          sourceType="local"
          :options="requestTypeOptions"
          @input="changeNidRequest"
          ref="requestType"
        />
      </FormControl>
      <nosazi-code-input
        label="محل تخلف"
        label-width="95px"
        v-model="value.JobLocationNosaziCode"
        cdcName="JobLocationNosaziCode"
      />
    </FormRow>
    <q-separator class="q-my-sm" />
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="محل خدمت"
          label-width="95px"
          v-model="value.JobLocationName"
          m="r"
          cdcName="JobLocationName"
          required
          validations="required"
        >
          <template v-slot:append>
            <q-icon
              style="position: relative; right: 5px; font-size: 18px"
              @click="showSearchJobModal = true"
              title="لیست محل خدمت"
              color="primary"
              name="search"
              class="cursor-pointer"
            />
          </template>
        </safa-text>
      </FormControl>

      <FormControl>
        <safa-text
          label="نام شاکی"
          label-width="95px"
          v-model="value.ComplainantName"
          cdcName="ComplainantName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="موبایل شاکی"
          label-width="95px"
          v-model="value.ComplainantMobile"
          cdcName="ComplainantMobile"
          type="number"
        />
      </FormControl>
      <FormControl v-if="isReview">
        <safa-text
          label="مانیتورینگ ثبت تخلفات"
          label-width="95px"
          v-model="value.Monitoring"
          cdcName="Monitoring"
        />
      </FormControl>
      <FormControl v-if="isReview">
        <safa-datepicker
          label="تاریخ صدور رای"
          label-width="95px"
          v-model="value.VoteDate"
          cdcName="voteDate"
        />
      </FormControl>
      <FormControl v-if="isReview">
        <safa-text
          label="رای صادره"
          label-width="95px"
          v-model="value.Vote"
          cdcName="Vote"
        />
      </FormControl>
    </FormRow>
    <safa-grid
      title="تخلفات"
      v-model="value.ViolationVoteList"
      cdcName="violationVoteList"
      :columns="violationVoteListColumns"
      required
      validations="required"
      :defaultNewRow="{
        CI_Violation: null,
        CI_VoteMain: null,
        CI_VoteSub: null,
        Date: null,
        Description: null,
        DescriptionVote: null,
        NidRequest: '00000000-0000-0000-0000-000000000000',
        NidUserOffending: null,
        NidVote: '00000000-0000-0000-0000-000000000000',
        NidWorkItem: null,
        Time: null,
        UserNameOffending: null,
        ViolationCount: null,
      }"
      m="e"
      fit
      :deleteRow="false"
      :allowCopy="false"
      paginate
    />
    <safa-popup v-model="showSearchJobModal" title="جستجوی محل خدمت ">
      <search-jobs v-model="value" @selectedJobLocation="selectedJobLocation" />
    </safa-popup>
  </fit>
</template>

<script>
import Joi from "joi"
import SearchJobs from "./SearchJobs.vue"
export default {
  components: { SearchJobs },
  data () {
    return {
      showSearchJobModal: false,
      isReview: false,
      validations: {
        mobile: Joi.string().length(11).required().messages({
          "string.base": `تلفن همراه میبایست به صورت عدد باشد.`,
          "string.length": `تلفن همراه میبایست 11 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        })
      },
      violationVoteListColumns: [
        {
          field: "CI_Violation",
          title: "عنوان تخلف",
          editor: "combo",
          domain: "Analysis",
          validations: "required,number",
          width: "200px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "auto"
        }
      ]
    }
  },
  props: {
    requestType: {
      type: String,
      default: ""
    },
    value: {
      type: Object,
      default: () => {}
    },
    requestTypeOptions: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectedJobLocation (job) {
      this.$emit("selectedJobLocation", job)
      this.showSearchJobModal = false
    },
    changeNidRequestHandler () {
      if (this.value.RequestType === null || this.value.RequestType === "") {
        this.isReview = false
        return
      }
      const t = (this.$refs.requestType.selectedItem && this.$refs.requestType.selectedItem.Title) || ''
      if (t.includes("تجدید")) {
        this.isReview = true
      }
    },
    changeNidRequest () {
      if (this.value.RequestType === null || this.value.RequestType === "") {
        this.isReview = false
        return
      }
      const t = (this.$refs.requestType.selectedItem && this.$refs.requestType.selectedItem.Title) || ''
      if (t.includes("تجدید")) {
        this.isReview = false
      } else this.isReview = true
    }
  },
  watch: {
    "value.RequestType": {
      handler (newVal, oldVal) {
        const requestTypeTitle = this.requestTypeOptions.find(
          (f) => f.ID === newVal
        )?.Title ?? ''
        if (requestTypeTitle.includes("تجدید")) {
          this.isReview = true
        }
      },
      deep: true
    }
  }
}
</script>
