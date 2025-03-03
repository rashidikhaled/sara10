<template>
  <fit>
    <div class="q-pa-sm">
      <div class="row q-col-gutter-sm">
        <div class="col-3">
          <safa-combo
            ciName="CI_VergeType"
            domainName="CI_SaraM1"
            input-debounce="0"
            label="اطلاعات دبیرخانه"
            :value="selectedSec"
            sourceType="local"
            :options="cboSecOptions"
          />
        </div>
        <div v-if="!forceReadonly" class="col-2">
          <btn-default label="ثبت دبیرخانه" @click="btnRegisterSecOnClick" />
        </div>
      </div>
    </div>
    <fit>
      <safa-grid
        v-model="detaileModel.Sh_MovafeghatOsooli_List"
        ref="engineer-list-grid"
        name="grid"
        :columns="movafeghatOsooliListColumns"
        :add-row="false"
        :allowMultipleSelection="false"
        @row:click="rowClick"
        @row:dblclick="dbclick"
        fit
        height="100%"
        max-height="100%"
        min-height="150px"
        title="لیست موافقت اصولی "
      />
    </fit>
  </fit>
</template>

<script>
import BaseFormMixin from "src/mixins/BaseFormMixin.js"
// import { ClsEnumEumSecNoGroup } from "src/forms/shahrsazi/config/enums.js"
export default {
  data () {
    return {
      selectedSec: 0,
      movafeghatOsooliListColumns: [
        {
          title: "اولویت",
          field: "PriorityMovafeghatOsooli"
        },
        {
          title: "توضیحات کنترل فنی",
          field: "ControlComments"
        },
        {
          title: "تاریخ",
          field: "CreateDate"
        },
        {
          title: "ساعت",
          field: "CreateTime"
        },
        {
          title: "توضیحات",
          field: "Comments",
          width: "auto"
        }
      ]
    }
  },
  mixins: [BaseFormMixin],
  props: {
    detaileModel: {
      type: Object
    },
    cboSecOptions: Array
  },
  methods: {
    btnRegisterSecOnClick () {
      this.$emit("registerSecretariatInfo")
    },
    openNewTab () {
      this.$emit("onEmitopenNewTab")
    },
    dbclick (e) {
      this.$emit("rowdbclick", e)
    },
    rowClick (e) {
      this.$emit("rowClick", e)
    }
  }
}
</script>
