<template>
  <fit>
    <safa-datatable2
      title="آرای قبلی کاربر"
      :value="value.ViolationVoteUserListOld"
      helper="violationVoteUserListOld"
      :m="m"
      fit
      class="fit"
      min-height="150px"
      height="100%"
      max-height="100%"
      :showRowNumber="false"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      :add-row="false"
      :delete-row="false"
      :allow-copy="false"
    >   <!-- ولیدیشن قرار داده شد -->
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
    </safa-datatable2>
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
      name: "ViolationVotePreviousUserVotes"
    }
  }
}
</script>

<style></style>
