<template>
  <FormWrapper :title="title">
    <fit>
      <safa-label class="q-mb-sm">
        {{ txtSubjec }}
      </safa-label>
      <text-template class="q-mb-sm" v-model="txt_Comments" cdcName="Comments" :rows="3" />
      <safa-label isEllipsis :class="txtDescColor">
        {{ txtDesc }}
      </safa-label>
    </fit>

    <template #footer>
      <form-actions :showEditButton="false">
        <btn-cancel @click="btn_close_Click" label="خروج" />
      </form-actions>
    </template>
  </FormWrapper>
</template>

<script>
export default {
  props: {
    clsCommission_BlankList: {
      type: Object,
      required: true
    }

    // #todo
    // isSendMethod: {
    //   type: Boolean,
    //   required: true
    // }
  },

  data () {
    return {
      name: "MessageBlackList",
      title: "پیغام لیست سیاه",

      desc: "",

      txtDescColor: "",
      txtSubjec: "",
      txt_Comments: "",
      txtDesc: ""
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.txtSubjec = `پرونده با کد نوسازی ${this.clsCommission_BlankList.Commission_BlackList.NosaziCode} با توضیحات زیر در لیست سیاه می باشد.`
      if (this.clsCommission_BlankList.Commission_BlackList.IsErrorStop) {
        this.txtDescColor = "text-red"
        this.txtDesc = "امکان ادامه عملیات وجود ندارد."
      } else {
        this.txtDescColor = "text-green"
        this.txtDesc = "امکان ادامه عملیات وجود دارد."
      }

      this.txt_Comments =
        this.clsCommission_BlankList.Commission_BlackList.DescInputBalckList
    },

    btn_close_Click () {
      // # todo
      // if (this.txtDesc == "امکان ادامه عملیات وجود دارد.")
      //   if (this.isSendMethod)
      //     ViewModels.ClsWFOperation.SendMethod(
      //       false,
      //       "UShowMessage-Btn_close_Click-a"
      //     );
      //   else ViewModels.ClsWFOperation.BackMethod();
      this.$emit("hide")
    }
  }
}
</script>
