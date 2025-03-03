<template>
  <section>
    <btn-default
      label="مشاهده"
      @click="isShowModal=true"
    />

    <ShowModal
      :show="isShowModal"
      @hide="isShowModal = false"
      title="لیست جدید"
      @onCloseModal="isShowModal = false"
    >
      <UDrawCroque />
    </ShowModal>
  </section>
</template>

<script>
import UDrawCroque from './UDrawCroque'
export default {
  name: 'TabCroque',
  components: { UDrawCroque },
  data () {
    return {
      isShowModal: false
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    showModal () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = e
    }
  }
}
</script>
