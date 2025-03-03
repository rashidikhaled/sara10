<template>
  <!-- <div> -->
  <fit>
    <!-- <div class="row q-my-md"> -->
    <div class="row q-mb-sm">
      <safa-combo
        label="کد نوسازی"
        sourceType="local"
        :options="nosaziCode"
        v-model="code"
        class="col-12 col-sm-4 col-md-3"
      >
      </safa-combo>
    </div>
    <!-- </div> -->
    <!-- <div class="form-row"> -->
    <safa-datatable
      helper="dutyComment"
      v-model="commentResults.DutyCommentList"
      :hideHeader="true"
      title="توضیحات"
    />
    <!-- </div> -->
    <div class="col-auto q-mt-sm">
      <btn-new @click="createNewComment"></btn-new>
    </div>
    <!-- <ShowModal
      :show="isShowModal"
      @hide="isShowModal = false"
      title="اضافه کردن توضیحات"
      @onCloseModal="closeModal"
    > -->
    <ShowModal
      v-model="isShowModal"
      @hide="isShowModal = false"
      title="اضافه کردن توضیحات"
      @onCloseModal="closeModal"
    >
      <DutyCommentNew
        :commentResults="commentResults"
        @reloadComment="reloadComment"
      />
      <!-- </ShowModal> -->
    </ShowModal>
    <!-- </div> -->
  </fit>
</template>
<script>
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
import DutyCommentNew from './dutyCommentNew'
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      commentResults: { DutyCommentList: [], DutyComment: {} },
      commentResult: null,
      nosaziCode: [],
      code: 0,
      showNewComment: false,
      isShowModal: false
    }
  },
  props: {
    results: Object
  },
  components: { DutyCommentNew },
  mounted () {
    let i = 0
    let nosaziCodeArray = this.results.NickNameNids
    nosaziCodeArray.forEach(item => {
      this.nosaziCode.push({ ID: i++, Title: item })
    })
    this.comment()
  },
  watch: {
    code () {
      this.comment()
    }
  },
  methods: {
    comment () {
      this.showLoading()
      let data = {
        pNid: this.results.NidJobList[this.code],
        pSysCiDutyType: 2
      }

      this.$services.SB.getDutyComments(data)
        .then(({ data }) => {
          this.commentResult = this.getResponse(data)

          if (this.commentResult.success) {
            this.commentResults = this.commentResult.data
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    createNewComment () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = false
    },
    reloadComment () {
      this.isShowModal = false
      this.comment()
    }
  }
}
</script>
