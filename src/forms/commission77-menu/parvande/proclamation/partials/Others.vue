<template>
  <fit>
    <form-row
      :xl="4"
      :lg="3"
      :md="3"
      class="q-mb-sm"
    >
      <form-control>
        <safa-combo
          label="ماده"
          label-width="90px"
          :m="lockFields"
          domainName="Commission77"
          ciName="CI_Commission"
          v-model="OthersDataModel.otherFields.CI_Commission"
          cdcName="CI_Commission"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="آقای/خانم"
          label-width="90px"
          :m="lockFields"
          domainName="Commission77"
          ciName="CI_Gender"
          cdcName="CI_Gender"
          v-model="OthersDataModel.otherFields.CI_Gender"
        />
      </form-control>
      <form-control>
        <safa-text
          label="سمت"
          label-width="90px"
          cdcName="Post"
          :m="lockFields"
          v-model="OthersDataModel.otherFields.Post"
        />
      </form-control>
      <form-control>
        <safa-text
          label="واقع در"
          label-width="90px"
          cdcName="LocatedAt"
          :m="lockFields"
          v-model="OthersDataModel.otherFields.LocatedAt"
        />
      </form-control>
      <form-control>
        <safa-text
          label="روز"
          label-width="90px"
          cdcName="Day"
          :m="lockFields"
          v-model="OthersDataModel.otherFields.Day"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="مورخه"
          label-width="90px"
          cdcName="Dated"
          :m="lockFields"
          v-model="OthersDataModel.otherFields.Dated"
        />
      </form-control>
      <form-control>
        <safa-text
          label="ساعت"
          label-width="90px"
          cdcName="Time"
          :m="lockFields"
          v-model="OthersDataModel.otherFields.Time"
        />
      </form-control>
      <form-control>
        <safa-text
          label="سایر"
          label-width="90px"
          cdcName="Other"
          :m="lockFields"
          v-model="OthersDataModel.otherFields.Other"
        />
      </form-control>
      <text-template
        label="توضیحات"
        label-width="90px"
        :rows="1"
        class="col-12"
        :m="lockFields"
        cdcName="Description"
        v-model="OthersDataModel.otherFields.Description"
      />
    </form-row>
    <safa-grid
    height="100%"
    max-height="100%"
    fit
    helper="OtherRequestInfoColumns77"
    m="r"
    :allowMultipleSelection="false"
    v-model="OthersDataModel.ClsOtherRequestInfo.OtherRequestInfo"
    @row:click="selectedRow"
    title="لیست سایر"
    cdcName="OtherRequestInfo"
    :suppressRowClickSelection="false"
    />
    <!-- <form-actions
      :m="lockFields"
      @edit="isEditable=true"
      @cancel="isEditable=false"
      @save="saveOthers"
    >
    <template v-slot:after>
      <btn-default
          label="جدید"
          @click="neWList"
        />
        <btn-default
          label="حذف"
          @click="deleteOthers"
          />
        </template>
      </form-actions> -->
    </fit>

</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "سایر",
      name: "Others",
      spliterModel: 50,
      expantionState: false,
      lockFields: false
    }
  },
  props: {
    OthersDataModel: Object,
    mode2: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectedRow (row) {
      this.$emit("othersListSelectedRow", row)
    },
    saveOthers () {
      this.$emit("saveOthers")
    },
    deleteOthers () {
      this.$emit("deleteOthers")
    },
    neWList () {
      this.$emit("neWList")
    }
  },
  watch: {
    mode2: {
      handler () {
        this.mode2 === true ? this.lockFields = 'e' : this.lockFields = 'r'
      },
      immediate: true
    }
  }
}
</script>
