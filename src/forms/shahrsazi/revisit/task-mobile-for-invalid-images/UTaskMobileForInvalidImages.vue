<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper :title="title">
      <safa-status :result="requestResult"/>
      <fit>
        <safa-datatable
          v-model="
            getTaskMobileForInvalidImagesResult.TaskMobileForInvalidImages
          "
          :m="mode"
          height="100%"
          helper="grdRevisitImageOnly"
          margin="0"
          max-height="100%"
          min-height="200px"
          title="اعلام مامور بازدید تبلت - بازبینی عکس"
          :allowMultipleSelection="false"
        />
      </fit>
      <template v-slot:footer>
        <FormActions :showEditButton="false">
          <btn-default
            label="تقاضای عکسبرداری مجدد"
            @click="addMobileTaskForInvalidImages"
          />
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/revisit/task-mobile-for-invalid-images',
  mixins: [baseFormMixin],

  data () {
    return {
      title: 'تبلت بازدید برای عکسبرداری مجدد',
      formKey: '9606367b-63c5-4203-83b2-c5276fbb60f5',
      name: 'UTaskMobileForInvalidImages',
      main: true,
      workflowCompatible: true,
      requestResult: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      getTaskMobileForInvalidImagesResult: {
        TaskMobileForInvalidImages: []
      },
      addMobileTaskForInvalidImagesResult: {}
    }
  },

  computed: {
    config () {
      return {
        config: { District: this.selectedDistrict || 1 } }
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.loadData()
    } else {
      this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید.')
      this.$nextTick(() => {
        this.hideSidebar(this.name)
      })
    }
  },
  methods: {
    loadData () {
      this.getTaskMobileForInvalidImages()
    },
    // loadData

    getTaskMobileForInvalidImages () {
      let data = {
        pNidWorkItem: this.selectedRequest.NidWorkItem,
        PNidProc: this.selectedRequest.NidProc
      }
      this.$services.SC.getTaskMobileForInvalidImages(data, this.config)
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.getTaskMobileForInvalidImagesResult = this.requestResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.bizCode,
              bizCodeTitle: 'bizCode'
            })
          }
        })
        .catch((response) => {
          console.error(response, 'error_response')
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // end getTaskMobileForInvalidImages

    addMobileTaskForInvalidImages () {
      let data = {
        PNidProc: this.selectedRequest.NidProc,
        pUser: this.currentUser
      }
      this.$services.SC.addMobileTaskForInvalidImages(data, this.config)
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.data.ErrorResult.BizErrors.length === 0) {
            this.addMobileTaskForInvalidImagesResult = this.requestResult.data
            this.showSuccess("درخواست بازبینی عکس ها به تبلت مامور بازدید ارسال شد")
            this.loadData()
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.bizCode,
              bizCodeTitle: 'bizCode'
            })
          } else {
            this.showError(
              this.requestResult.data.ErrorResult.BizErrors[0].ErrorTitel
            )
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
    // end addMobileTaskForInvalidImages
  }
}
</script>
