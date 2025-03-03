<template>
  <!-- <td v-if="!dataItem.inEdit" :class="className">{{ dataItem[field] }}</td> -->
    <td class="grid-template">
      <safa-combo
      ref="gcombo"
      :class="className"
      v-model="selectedValue"
      source-type="local"
      :m="mode"
      :options="items"
    />
    </td>
</template>
<script>
export default {
  data: function () {
    return {
      model: true,
      items: [
        {
          ID: '0',
          Title: 'نامشخص'
        },
        {
          ID: '1',
          Title: 'بدهکار'
        },
        {
          ID: '2',
          Title: 'بستانکار'
        },
        {
          ID: '3',
          Title: 'تعهد پرداخت'
        },
        {
          ID: '4',
          Title: 'تهاتر غیر نقدی'
        },
        {
          ID: '5',
          Title: 'ماده 17'
        },
        {
          ID: '6',
          Title: 'توافقنامه'
        },
        {
          ID: '7',
          Title: 'صلحنامه'
        },
        {
          ID: '8',
          Title: 'اوراق بستانکاری'
        },
        {
          ID: '9',
          Title: 'علی الحساب'
        },
        {
          ID: '10',
          Title: 'تهاتر با املاک'
        },
        {
          ID: '11',
          Title: 'تورم'
        },
        {
          ID: '12',
          Title: 'محاسبه سالهای قبل'
        },
        {
          ID: '13',
          Title: 'توضیحات'
        },
        {
          ID: '14',
          Title: 'تخفیف نقدی'
        }
      ],
      selectedValue: ''
    }
  },
  computed: {
    text () {
      let type = ''
      if (this.eumOddmentType === 0) {
        type = 'نامشخص'
      } else if (this.eumOddmentType === 1) {
        type = 'بدهکار'
      } else if (this.eumOddmentType === 2) {
        type = 'بستانکار'
      } else if (this.eumOddmentType === 3) {
        type = 'تعهد پرداخت'
      } else if (this.eumOddmentType === 4) {
        type = 'تهاتر غیر نقدی'
      } else if (this.eumOddmentType === 5) {
        type = 'ماده 17'
      } else if (this.eumOddmentType === 6) {
        type = 'توافقنامه'
      } else if (this.eumOddmentType === 7) {
        type = 'صلحنامه'
      } else if (this.eumOddmentType === 8) {
        type = 'اوراق بستانکاری'
      } else if (this.eumOddmentType === 9) {
        type = 'علی الحساب'
      } else if (this.eumOddmentType === 10) {
        type = 'تهاتر با املاک'
      } else if (this.eumOddmentType === 11) {
        type = 'تورم'
      } else if (this.eumOddmentType === 12) {
        type = 'محاسبه سالهای قبل'
      } else if (this.eumOddmentType === 13) {
        type = 'توضیحات'
      } else if (this.eumOddmentType === 14) {
        type = 'تخفیف نقدی'
      }
      return type
    },
    eumOddmentType () {
      return this.dataItem[this.field]
    },
    mode () {
      return this.dataItem.inEdit ? 'e' : 'r'
    }
  },
  props: {
    field: String,
    dataItem: Object,
    format: String,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    rowType: String,
    level: Number,
    expanded: Boolean,
    editor: String,
    values: String
  }
}
</script>
