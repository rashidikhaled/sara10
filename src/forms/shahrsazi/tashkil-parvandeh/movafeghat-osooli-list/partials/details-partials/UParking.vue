<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-grid
            helper="agBaseSupplyParking"
            v-model="value.Base_SupplyParking"
            :add-row="true"
            :allow-copy="true"
            :copy-with-count="true"
            :m="m"
            title="نحوه تامین پارکینگ"
            fit
            height="100%"
            max-height="100%"
            :bordered="false"
            :deleteRow="true"
          />
          <q-separator />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator />
          <!-- ="baseParking" -->
          <safa-grid
            :columns="columns"
            v-model="value.Base_Parking"
            :add-row="true"
            :allow-copy="true"
            :copy-with-count="true"
            :m="m"
            title="پارکینگ ها"
            fit
            height="100%"
            max-height="100%"
            :bordered="false"
             :deleteRow="true"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    value: {
      type: Object
    }
  },
  data () {
    return {
      horizontalSplitter: 50,
      columns: [
        {
          field: 'CI_UsingGroup',
          title: 'گروه كاربري',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: 210
        },
        {
          field: 'CI_RequiredParkingType',
          title: 'نوع پارکینگ مورد نیاز',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: 180
        },
        {
          field: 'RequireNo',
          title: 'تعداد مورد نياز',
          editor: 'numeric',
          width: 150
        },
        {
          field: 'DelNo',
          title: 'تعداد کسری',
          editor: 'numeric',
          width: 135
        },
        {
          field: 'BuyNo',
          title: 'تعداد خريداری شده',
          editor: 'numeric',
          width: 175
        }, {
          field: 'SupplyNo',
          title: 'تعداد پارکینگ تأمین شده',
          editor: 'numeric',
          width: 200
        }, {
          field: 'InspectedNo',
          title: 'تعداد پارکینگ رسیدگی شده',
          editor: 'numeric',
          width: 275
        },
        {
          field: 'Coef',
          title: 'ضريب',
          editor: 'numeric',
          width: 100
        },
        {
          field: 'SharedParkingCount',
          title: 'تعداد پارکینگ مشارکتی',
          editor: 'numeric',
          width: 190
        },
        {
          field: 'Com100ParkingCount',
          title: 'تعداد پارکینگ بر اساس تبصره 5 ماده صد قانون شهرداری',
          editor: 'numeric',
          width: 365
        },
        {
          field: 'ProductYear',
          title: 'تاریخ ساخت',
          editor: 'date',
          width: 135
        },
        {
          field: 'Comments',
          title: 'توضيحات',
          editor: 'text',
          width: 120
        }
      ]
    }
  }
}
</script>
