<template>
  <fit>
    <div>
      <text-template
        label="توضیحات"
        :m="m"
        v-model="value.Commission_Fine.Comments"
        formKey="5041efa4-78f7-4166-acc6-3ad40ede6ad2"
        :rows="3"
      />
    </div>
    <safa-splitter
      v-model="splitterModel"
      class="q-mt-sm"
      fit
      margin="0"
      vertical
      :min-height="$q.screen.lt.lg ? '200px' : '150px'"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="commissionFineDetalis"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            v-model="value.Commission_FineDetails"
            :m="m"
            title="جزئیات"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            helper="commissionFineDetaliOther"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            v-model="value.Base_OtherEquipment"
            :m="m"
            title="سایر امکانات"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  data () {
    return {
      items: [],
      splitterModel: 50
    }
  },
  props: { value: Object, m: String }
}
</script>
