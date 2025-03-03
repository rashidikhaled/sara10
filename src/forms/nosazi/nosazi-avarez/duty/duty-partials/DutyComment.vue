<template>
  <fit>
    <div class="row q-mb-sm">
      <div class="col-12 col-md-3">
        <safa-combo
          v-model="code"
          :options="nosaziCode"
          cdcName="nosazicode"
          label="کد نوسازی"
          sourceType="local"
        >
        </safa-combo>
      </div>
    </div>
    <safa-datatable
      v-model="commentResults.DutyCommentList"
      cdcName="DutyCommentList"
      fit
      height="100%"
      helper="dutyComment"
      max-height="100%"
      minHeight="100%"
      title="توضیحات"
    />
    <!-- <q-btn label="جدید" @click="createNewComment"
    class="btn-default q-mt-md" icon="add"></q-btn> -->

    <safa-popup
      v-model="isShowModal"
      height="220px"
      title="اضافه کردن توضیحات"
      width="500px"
    >
      <DutyCommentNew
        :baseNosaziCode="baseNosaziCode"
        :commentResults="commentResults"
        :formKey="formKey"
        :name="name"
        :title="title"
        @reloadComment="reloadComment"
      />
    </safa-popup>
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import DutyCommentNew from './dutyCommentNew'

export default {
  name: 'DutyComment',
  mixins: [baseFormMixin],
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
    results: Object,
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
  components: { DutyCommentNew },
  watch: {
    code () {
      this.comment()
    }
  },
  methods: {
    loadObj () {
      if (this.baseNosaziCode.District !== 0) {
        let i = 0
        let nosaziCodeArray = this.results.NickNameNids
        nosaziCodeArray.forEach((item) => {
          this.nosaziCode.push({ ID: i++, Title: item })
        })
        this.comment()
      }
    },
    comment () {
      this.showLoading()
      let data = {
        pNid: this.results.NidList[this.code],
        pSysCiDutyType: 1
      }

      this.$services.SB.getDutyComments(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.commentResult = this.getResponse(data)

          if (this.commentResult.success) {
            this.commentResults = this.commentResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.results.NidList[this.code],
              bizCodeTitle: 'NidList'
            })
          }
        })
        .catch((err) => {
          console.error(err)
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
