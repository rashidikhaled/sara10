<template>
  <fit>
    <safa-datatable
      v-model="apartmentResults.Sh_ApartmentEarlySold_List"
      ref="grid2"
      helper="ownershipInfo"
      fit
      max-height="100%"
      height="100%"
      minHeight="100%"
      @dbclick="dbclick"
      :hideHeader="true"
      :bordered="false"
      title="اطلاعات آپارتمان"
    />
    <ShowModal
      v-model="isShowModal"
      title="اطلاعات تشکیل پرونده عرصه"
      vertical
      :padding="false"
    >
      <BaseHouseInfoParvandeh
        :value="{
          NidBase: apartmentResults.NosaziCode_House.NidBase,
          District: 1
        }"
        read-only
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      />
    </ShowModal>
  </fit>
</template>
<script>
import BaseHouseInfoParvandeh from './base-house-info-parvandeh/BaseHouseInfoParvandeh.vue'
export default {
  data: function () {
    return {
      ownershipForm: true,
      isShowModal: false
    }
  },
  props: {
    apartmentResults: Object,
    baseNosaziCode: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  components: {
    BaseHouseInfoParvandeh
  },
  methods: {
    tashkiParvandeInfo () {
      this.isShowModal = true
      this.ownershipForm = false
    },
    closeModal () {
      this.isShowModal = false
      this.ownershipForm = true
    },
    dbclick ({ event, target, row }) {
      this.selectedRow = row
      this.$emit('showOwnershipTabMethod', this.selectedRow)
    }
  }
}
</script>
