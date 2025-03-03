<template>
  <section class="UWaitListSendToReviewer">
    <section padding>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <safa-text type="textarea" />
        </div>

        <div>
          <q-btn label="مشاهده" color="primary" @click="showModal" />
        </div>

        <div>
          <safa-checkbox
            label="مورد مسیر به نام شهرداری منتقل شده است"
            v-model="results.Sh_BaroKaf.IsTransferToUrban"
            cdcName="IsTransferToUrban"
          />
        </div>

        <div>
          <safa-securityPanel
            id="32c45498-6b11-4d78-acbe-9d285f57ebe1"
            caption="کپی کروکی از بازدید"
          >
            <q-btn label="کپی کروکی از بازدید" color="primary" />
          </safa-securityPanel>
        </div>
      </div>

      <div class="col-1">
        <ShowModal
          :show="isShowModal"
          @hide="isShowModal = false"
          title="رسم کروکی"
          @onCloseModal="closeModal"
        >
        </ShowModal>
      </div>
    </section>
  </section>
</template>

<script>
import ShowModal from "src/components/ShowModal"

export default {
  name: "baro-kaf-info",
  title: "اطلاعات برو کف",
  data () {
    return {
      items: [],
      isShowModal: false
    }
  },
  props: {
    results: Object
  },
  components: {
    ShowModal
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
