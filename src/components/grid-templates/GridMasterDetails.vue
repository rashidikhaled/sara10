<template>
  <div class="rtl text-right">
    <safa-datagrid :columns="columns" :data-items="gridData"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      columns: [
        {
          field: 'id',
          title: 'id'
        },
        {
          field: 'postId',
          title: 'Post Id'
        },
        {
          field: 'name',
          title: 'Name'
        },
        {
          field: 'email',
          title: 'Email'
        }
      ],
      rows: []
    }
  },
  computed: {
    gridData () {
      if (!this.rows) return []
      return this.rows && this.rows.map((row, index) => {
        row.ID = index + 1
        return row
      })
    }
  },
  props: {
    dataItem: Object
  },
  async mounted () {
    try {
      // console.log('component &********', this)
      const url = this.dataItem['detailsUrl']
      const res = await fetch(url, {
        method: 'GET'
      })
      this.rows = await res.json()
    } catch (ex) {
      console.log('ex', ex)
    }
  }
}
</script>
