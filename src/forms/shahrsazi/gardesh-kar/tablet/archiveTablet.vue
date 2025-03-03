<template>
  <form-wrapper title="لیست آرشیو">
    <formHeader :task-info="taskInfo"/>
    <internal-section>
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-3 col-sm-6">
          <safa-text
            label="نام کارشناس"
            m="r"
          />
        </div>
        <div class="col-12 col-md-3 col-sm-6">
          <safa-text
            label="نام خانوادگی"
            m="r"
          />
        </div>
        <div class="col-12 col-md-3 col-sm-6">
          <safa-text
            label="ساعت بازدید"
            m="r"
          />
        </div>
        <div class="col-12 col-md-3 col-sm-6">
          <safa-datePicker
            label="تاریخ بازدید"
            m="r"
          />
        </div>
        <safa-datatable/>
      </div>
    </internal-section>
    <internal-section>
      <safa-datatable/>
    </internal-section>
  </form-wrapper>
</template>
<script>
export default {
  name: 'archiveTablet',
  route: '/archive/archive-tablet',
  data () {
    return {}
  },
  methods: {
    load () {
      this.$services.CiSrvSara.Sh_AllImageDetails_List()
        .then(response => {
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()

          this.showError(error.message)
        })
    }
  }
}
</script>
