<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          v-model="value.Request.JobLocationName"
          label="محل خدمت دفتر متخلف:"
          label-width="125px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Request.JobLocationNosaziCode"
          label="کد نوسازی محل تخلف:"
          label-width="115px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Request.ComplainantName"
          label="نام شاکی:"
          label-width="55px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Request.ComplainantMobile"
          label="موبایل شاکی:"
          label-width="70px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Request.Date"
          label="تاریخ درخواست:"
          label-width="85px"
          m="r"
        />
      </FormControl>
    </FormRow>

    <fit>
      <safa-datatable2
        :value="value.Request.ViolationVoteList"
        helper="violationVoteList2"
        :m="m"
        fit
        class="fit"
        min-height="150px"
        height="100%"
        max-height="100%"
        :showRowNumber="false"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
        :delete-row="false"
        :allow-copy="false"
      >   <!-- ولیدیشن قرار داده شد -->
        <template #cell-UserNameOffending="{ row, col }">
          <safa-combo2
            v-if="row['UserNameOffending']"
            v-model="row['NidUserOffending']"
            :options="[
              {
                ID: 0,
                Title: row['UserNameOffending']
              }
            ]"
            source-type="local"
            :m="m"
            @input="cmbUsersLoaded(row, col, $event)"
          />
        </template>
        <template #cell-CI_VoteMain="{ row }">
          <FormRow :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <FormControl>
              <safa-combo2
                v-model="row['CI_VoteMain']"
                ciName="CI_VoteMain"
                domainName="Analysis"
                :m="m"
              />
            </FormControl>

            <FormControl>
              <safa-combo2
                v-model="row['CI_VoteSub']"
                ciName="CI_VoteSub"
                domainName="Analysis"
                :m="m"
              />
            </FormControl>
          </FormRow>
        </template>
        <template #cell-OldUser="{ row }">
          <btn-default
            class="full-width"
            label="آرای قبلی کاربر"
            @click="btnOldUserClick(row)"
          />
        </template>
      </safa-datatable2>
    </fit>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      name: "ViolationVoteVoting"
    }
  },

  methods: {
    btnOldUserClick (row) {
      var tmpParent = { ...row }
      if (tmpParent.NidUserOffending) {
        this.$emit(
          "userVoteUserOld",
          tmpParent.NidUserOffending,
          tmpParent.NidRequest
        )
      }
    }
  }
}
</script>

<style></style>
