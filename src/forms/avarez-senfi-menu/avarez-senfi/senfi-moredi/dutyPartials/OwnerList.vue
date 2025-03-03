<template>
  <form-wrapper :padding="false">
    <safa-grid
      title="لیست مالکین"
      v-model="ownerList"
      :columns="columns"
      fit
      m="e"
      height="100%"
      max-height="100%"
      min-height="200px"
      paginate
      @row:click="selectedChange"
    />
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-default label="تایید" @click="confirm" />
        <btn-default label="انصراف" @click="$emit('hide')" />
      </div>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  mixins: [baseFormMixin],
  props: {
    sessionList: Array,
    baseNosaziCode: Object,
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      columns: [
        { field: "OwnerName", title: "نام مالک", width: "100px" },
        { field: "OwnerLastName", title: "نام خانوادگی مالک", width: "100px" },
        { field: "OwnerFatherName", title: "نام پدر", width: "100px" },
        { field: "AyanImpart", title: "سهم عرصه", width: "100px" },
        { field: "ToftDang", title: "دانگ عرصه", width: "100px" },
        { field: "ToftHabeh", title: "حبه عرصه", width: "100px" },
        { field: "ToftImpart", title: "سهم اعیان", width: "100px" },
        { field: "AyanDang", title: "دانگ اعیان", width: "100px" },
        { field: "AyanHabeh", title: "حبه اعیان", width: "100px" },
        { field: "AyanTotalImpart", title: "سهم کل از اعیان", width: "100px" },
        { field: "ToftTotalImpart", title: "سهم کل از عرصه", width: "100px" }
      ],
      ownerList: [],
      owner: null,
      getBaseOwnerBySessionsRes: null
    }
  },
  mounted () {
    this.getBaseOwnerBySessions()
  },
  methods: {
    async getBaseOwnerBySessions () {
      try {
        this.showLoading()
        const { data } = await this.$services.SB.getBaseOwnerBySessions(
          { pSessionList: this.sessionList ?? [] },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.getBaseOwnerBySessionsRes = this.getResponse(data)
        if (this.getBaseOwnerBySessionsRes.success) {
          this.ownerList = this.getBaseOwnerBySessionsRes.data.Base_Owner ?? []
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode,
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    selectedChange (params) {
      this.owner = params.data ?? null
    },
    confirm () {
      if (!this.owner) {
        return this.showError("لطفا حداقل یک مالک را انتخاب نمایید.")
      } else {
        this.$emit("selectedOwner", this.owner)
        this.$emit('hide')
      }
    }
  }
}
</script>
