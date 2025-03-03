<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      vertical
      :hasFooter="false"
      title="شهر و خانه"
    >
      <template #header>
        <formHeaderByNosaziCode
          :taskInfo="taskInfo"
          v-model="baseNosaziCode"
          @fetched="getParcel"
        />
      </template>
      <safa-datatable
        v-model="loadResult.data.TmpParcel"
        ref="technical-grid"
        name="grid"
        helper="cityAndHouse"
        height="100%"
        max-height="100%"
        min-height="100%"
        margin="0"
        title="شهر و خانه"
      ></safa-datatable>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/parvande/city-and-house',

  data () {
    return {
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      title: 'شهرسازی- شهر و خانه',
      formKey: 'db59a9c8-5272-44ec-86b5-b09df28aae6d',
      name: 'UCityAndHouse',
      main: true,
      loadPrequest: {
        pNosaziCode: ''
      },
      loadResult: {
        data: {
          TmpParcel: []
        }
      },
      items: []
    }
  },
  mixins: [baseFormMixin],
  components: {},
  mounted () {},
  methods: {
    getParcel () {
      this.showLoading()
      this.loadPrequest.pNosaziCode =
          this.baseNosaziCode.District +
          '-' +
          this.baseNosaziCode.Region +
          '-' +
          this.baseNosaziCode.Block +
          '-' +
          this.baseNosaziCode.House +
          '-' +
          this.baseNosaziCode.Building +
          '-' +
          this.baseNosaziCode.Apartment +
          '-' +
          this.baseNosaziCode.Shop

      this.showLoading()
      this.$services.SC.getParcel(this.loadPrequest, {
        config: {
          District: this.baseNosaziCode.District
        }
      }).then(async response => {
        this.loadResult = this.getResponse(response.data)

        const strNosaziCode = this.convertToNosaziCodeString(
          this.baseNosaziCode
        )

        await this.log({
          action: this.logActions.view,
          bizCode: strNosaziCode,
          bizCodeTitle: 'کد نوسازی',
          nosaziCode: strNosaziCode
        })

        // console.log('//////this.loadResult', this.loadResult)
      })
        .catch(response => {
          this.serverError()
          console.debug('load error', response)
        }
        )
        .finally(
          this.hideLoading()
        )
    }
  }
}
</script>
