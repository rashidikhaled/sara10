<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-text
          label="شماره حکم ورود"
          label-width="100px"
          v-model="model.EnterOrder.EnterOrderNo"
          cdcName="EnterOrderNo"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ حکم ورود"
          label-width="100px"
          v-model="model.EnterOrder.EnterOrderDate"
          cdcName="EnterOrderDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ساعت حکم ورود"
          label-width="100px"
          v-model="model.EnterOrder.EnterOrderTime"
          cdcName="EnterOrderTime"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع حکم ورود قضایی"
          label-width="100px"
          v-model="model.EnterOrder.CI_EnterOrderType"
          cdcName="CI_EnterOrderType"
          :m="m"
          ciName="CI_EnterOrderType"
          domainName="BuildingPolice"
        />
      </FormControl>
    </FormRow>
    <div class="row q-mt-sm">
      <text-template
        label="توضیحات"
        class="col-12"
        label-width="100px"
        v-model="model.EnterOrder.Comments"
        cdcName="Comments"
        formkey="e7feb5dc-89f4-40a0-bc89-4349b385d5f3"
        :m="m"
        :rows="2"
        fit
      />
    </div>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      // splittermodel: 50,
      // warrantListColumns: [
      //   {
      //     field: 'CI_WarrantType',
      //     title: 'عنوان / جزییات تقاضا',
      //     editor: 'combo',
      //     domain: 'BuildingPolice',
      //     width: '200px'
      //   },
      //   {
      //     field: 'Date',
      //     title: 'تاریخ',
      //     width: '100px',
      //     editor: 'date'
      //   },
      //   { field: 'Time', title: 'ساعت', width: '100px' },
      //   { field: 'Comment', title: 'توضیحات', width: '300px' }
      // ],
      // warrantOrderListColumns: [
      //   { field: 'IsSelect', title: '', width: '40px', editor: 'checkbox' },
      //   {
      //     field: 'CI_WarrantTypeOrder',
      //     title: 'عنوان / جزییات تقاضا',
      //     editor: 'combo',
      //     domain: 'BuildingPolice',
      //     width: '200px',
      //     editable: false
      //   },
      //   { field: 'Comment', title: 'توضیحات', width: '300px' }
      // ]
    }
  },
  props: {
    m: String,
    model: Object
  }
}
</script>
