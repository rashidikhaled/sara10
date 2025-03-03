<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77"
  >
    <form-wrapper vertical :title="title">
      <!-- <template #header>
        <safa-status :result="userListResult" />
      </template> -->
      <fit>
        <form-row>
          <form-control>
            <safa-combo
              label="انتخاب کاربر"
              :m="m"
              label-width="90px"
            />
          </form-control>
          <form-control>
            <safa-combo
              label="سمت"
              :m="m"
              label-width="90px"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              label="تاریخ اعتبار از"
              :m="m"
              label-width="90px"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              label="تاریخ اعتبار تا"
              :m="m"
              label-width="90px"
            />
          </form-control>
        </form-row>
      </fit>
      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-save @click="save" label="ثبت" />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "اعضای صدور رای",
      formKey: 'B65FE692-36EA-0001-0025-66B8EB0E9E77',
      name: "UVotingMembers",
      main: true
    }
  },

  mounted () {},

  methods: {
    save () {}
  },
  props: {
    m: String
  }
}
</script>
