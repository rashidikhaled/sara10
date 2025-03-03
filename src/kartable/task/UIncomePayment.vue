<template>
<form-wrapper :padding="false" title="فیش های درآمد">
  <fit>
    <safa-status :result="result" />
    <div class="flex justify-start q-pa-sm">
      <btn-default @click="loadFiches" size="sm">بازآوری</btn-default>
    </div>
    <safa-datatable
      :bordered="false"
      :columns="ficheColumns"
      :paginate="false"
      :value="ficheList"
      m="r"
      fit
      height="100%"
      min-height="240px"
      max-height="100%"
      title="فیش های درآمدی قابل پرداخت"
    ></safa-datatable>
  </fit>
</form-wrapper>
  <!--<q-page class="row">
    <base-form-container
        title="فیش های درآمد"
        :loading="loading"
    >

      <template #footer>
        <div class="row justify-center">
          <q-btn
              style="min-width: 120px"
              dense
              outline
              color="primary"
              label="بازآوری"
              @click="loadFiches"
          />
        </div>
      </template>
    </base-form-container>
  </q-page>-->
</template>

<script>
export default {
  name: 'UIncomePayment',
  mixins: [],
  data () {
    return {
      loading: false,
      ficheList: [],
      main: true,
      result: null,
      ficheColumns: [
        {
          title: 'شماره فیش',
          field: 'FicheNo'
        },
        {
          title: 'شناسه قبض',
          field: 'BillID'
        },
        {
          title: 'شناسه پرداخت',
          field: 'PaymentID'
        },
        {
          title: 'مبلغ قابل پرداخت',
          field: 'Payable'
        },
        {
          title: 'تاریخ تأیید',
          field: 'ExportPermanentDate'
        },
        {
          title: 'ساعت تأیید',
          field: 'ExportPermanentTime'
        }
      ]
    }
  },
  props: {
    taskInfo: Object
  },
  computed: {
    nidProc () {
      return (this.taskInfo && this.taskInfo.NidProc) || null
    }
  },
  methods: {
    async loadFiches () {
      if (!this.nidProc) {
        this.showError('مشخصات درخواست تعیین نشده است')
        return
      }
      try {
        this.loading = true
        //   crowd: 'http://192.168.100.201/Wcf.Crowd/SrvCrowdNew.svc/json/'
        // eslint-disable-next-line no-undef
        const { data } = await this.$services.crud.getAllFicheByIncomeList({
          NidProc: this.nidProc,
          District: 1
        })
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.ficheList = (data.All_FicheByIncomeList?.All_FicheByIncomeList ?? [])
            .map(x => x.Income_Fiche)
        }
        // end
      } catch (e) {
        this.showError(e.message)
      } finally {
        this.loading = false
      }
    }
  },

  beforeMount () {
    this.loadFiches()
  },
  watch: {
    nidProc () {
      this.loadFiches()
    }
  }
}
</script>
