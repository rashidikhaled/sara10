<template>
  <div>
    <pre dir="ltr">{{ dataItem }}</pre>
    <grid :data-items="getFilteredProducts" :columns="columns"> </grid>
  </div>
</template>

<script>
export default {
  name: 'DutyAllCalculationDetailsGrid',
  props: {
    dataItem: Object
  },
  data () {
    return {
      // products: products,
      columns: [
        { field: 'ProductID', filterable: false, title: 'ID', width: '50px' },
        { field: 'ProductName', title: 'Product Name' },
        { field: 'UnitPrice', filter: 'numeric', title: 'Unit Price' },
        { field: 'UnitsInStock', title: 'Units In Stock' },
        { field: 'Category.CategoryName', title: 'Category Name' }
      ]
    }
  },
  computed: {
    getFilteredProducts () {
      // const result = filterBy(this.products, { field: 'Category.CategoryID', operator: 'eq', value: this.dataItem.CategoryID })

      return []
    }
  }
}
</script>
