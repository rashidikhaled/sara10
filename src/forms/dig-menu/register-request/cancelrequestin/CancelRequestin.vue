 <template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <FormWrapper :title="title">
    <template #header>
      <safa-status :result="cancelRequestinEsupRes" />
    </template>
      <fit>
        <div class="row q-col-gutter-sm">
          <safa-text
            v-model="selecterRowInfo.BizCode"
            cdcName="BizCode"
            label="شماره درخواست"
            label-width="100px"
            m="r"
            class="col-12"
          />
          <safa-text
            v-model="selecterRowInfo.NidWorkItem"
            cdcName="NidWorkItem"
            label="شماره فرآیند"
            label-width="100px"
            m="r"
            class="col-12"
          />
        </div>
      </fit>
      <template #footer>
        <div class="q-gutter-sm">
          <btn-default label="ابطال" @click="cancelRequestin" />
          <btn-cancel @click="closeForm" />
        </div>
      </template>
    </FormWrapper>
  </safa-form>
</template >

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "ابطال درخواست مجوز",
      formKey: "dabddd77-53c7-4d0a-a699-1a81a8370989",
      name: "CancelRequestin",
      main: true,
      cancelRequestinEsupRes: null,
      selecterRowInfo: {
        BizCode: "",
        NidWorkItem: ""
      }
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.selecterRowInfo = this.selectedRequest
    } else this.hideSidebar(this.name)
  },

  methods: {
    cancelRequestin () {
      this.showConfirm("آیا از ابطال درخواست مورد نظر مطمئن هستید؟").onOk(
        () => {
          this.cancelRequestinEsup()
        }
      )
    },
    async cancelRequestinEsup () {
      try {
        let payload = {
          pRequest: {
            NidProc: this.selectedRequest.NidProc
          }
        }
        this.showLoading()
        const { data } = await this.$services.excavation.cancelRequestinEsup(
          payload
        )
        this.cancelRequestinEsupRes = this.getResponse(data)
        if (this.cancelRequestinEsupRes.success) {
          // this.cancelResult =
          //   this.cancelRequestinEsupRes.data.CancelRequestinEsupResult

          this.showSuccess("عملیات با موفقیت انجام شد")
          this.closeForm()
          this.log({
            action: this.logActions.delete,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            saveDesc: "ابطال درخواست انتخاب شده"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    closeForm () {
      this.hideSidebar(this.name)
    }
  }
}
</script>
