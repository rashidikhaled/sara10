<template>
  <div>
    <div style="display:flex; flex-wrap:nowrap; padding-left:6px;">
      <div
        class="fieldsInfoBox q-gutter-sm"
        style="display:flex;"
      >
        <safa-text
          :label="label"
          :value="value"
          @input="updateValue"
          :validations="validations"
          v-bind="$attrs"
          @keyup.enter="selectedOffice"
        >
          <template v-slot:append>
            <q-icon
              v-show="value"
              style="position: relative;right: 5px;font-size: 18px;"
              @click="clearSearch"
              :disabled="isEditable"
              color="primary"
              name="clear"
              class="cursor-pointer"
            />
            <q-icon
              style="position: relative;right: 5px;font-size: 18px;"
              @click="showSearchModal = true"
              :disabled="isEditable"
              color="primary"
              name="more_horiz"
              class="cursor-pointer"
            />
          </template>
        </safa-text>
        <btn-search @click="selectedOffice" />
      </div>
      <safa-popup
        title="جستجوی دفتر"
        v-model="showSearchModal"
        width="900px"
        height="600px"
      >
        <SearchOffices @selectedOffice="selectedOffice" />
      </safa-popup>
    </div>
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import SearchOffices from "./SearchOffices.vue"

export default {
  inheritAttrs: false,
  components: { SearchOffices },
  mixins: [baseFormMixin],

  props: {
    value: [Number, String],
    validations: [Array, String],
    label: {
      type: String,
      default: "کد دفتر"
    },
    labelWidth: {
      type: String,
      default: "70px"
    }
  },

  data () {
    return {
      name: "OfficeInfoBox",
      title: "اطلاعات دفتر",
      showSearchModal: false
    }
  },

  methods: {
    updateValue (newVal) {
      this.$emit("input", newVal)
    },
    clearSearch () {
      this.updateValue(null)
      this.resetValidation()
    },
    selectedOffice (val) {
      const officeCode = (val && val.OfficeCode) || this.value
      // const officeCode = (val && val.row && val.row.OfficeCode) || this.value
      this.value = officeCode
      this.showSearchModal = false
      this.updateValue(officeCode)
      this.$emit("fetched", officeCode)
    }
  }
}
</script>
