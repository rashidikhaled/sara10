<template>
    <!-- v-if="canEdit" -->
  <td
    v-if="true"
    :style="'min-width: ' + tdWidth"
  >
    <div class="row items-center justify-space-between q-col-gutter-x-md">
      <div class="col-12 col-md">
        <safa-combo2
          :options="firstComboDatasource"
          :searchValue="true"
          source-type="local"
          style="width: 100%"
          :value="firstComboValue"
          @input="setfirstComboValue"
          :m="mode"
        />
      </div>
      <div class="col-12 col-md">
        <safa-combo2
          :options="secondComboDatasource"
          :searchValue="true"
          source-type="local"
          style="width: 100%"
          :value="secondComboValue"
          @input="setSecondComboValue"
          :m="customMode(secondComboDatasource)"
        />
          <!-- :m="(!secondComboDatasource || secondComboDatasource.length===0)? 'r':'e'" -->
      </div>
      <div class="col-12 col-md">
        <safa-combo2
          :options="combo3SortedList"
          :searchValue="true"
          source-type="local"
          style="width: 100%"
          :value="thirdComboValue"
          @input="setThirdComboValue"
          :m="customMode(thirdComboDatasource)"
        />
          <!-- :m="(!thirdComboDatasource || thirdComboDatasource.length===0)? 'r':'e'". -->
      </div>
    </div>
  </td>
  <td
    v-else
    :class="{ numeric: column.numeric }"
    :style="'min-width: ' + tdWidth"
  >
    {{ firstText || '' }} &nbsp;&nbsp; >>> &nbsp;&nbsp; {{ secondText || '' }} >>> &nbsp;&nbsp; {{ thirdText || '' }}
  </td>
</template>
<script>
import ResponseParser from 'src/utils/responseParser'

export default {
  data () {
    return {
      options: {},
      secondOptions: {},
      firstComboValue: null,
      firstComboDatasource: [],
      firstText: '',
      secondComboValue: null,
      thirdComboValue: null,
      secondText: '',
      thirdText: '',
      secondComboDatasource: [],
      thirdComboDatasource: []
    }
  },
  mounted () {
    this.createFirstComboDatasource()
    this.bindComboText()
  },
  beforeMount () {
    this.options = this.column.options || {
      serviceUrl: '',
      responseKey: '',
      paramName: '',
      from: {},
      to: {}
    }
    // this.secondOptions = this.column.secondOptions || {
    //   serviceUrl: '',
    //   responseKey: '',
    //   paramName: '',
    //   from: {},
    //   to: {}
    // }
  },
  inheritAttrs: false,
  props: {
    field: String,
    dataItem: Object,
    inEdit: Boolean,
    editable: Boolean,
    isCI: Boolean,
    domain: String,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    column: Object,
    ciAutoBind: Boolean,
    editor: String,
    mode: String
  },
  computed: {
    tdWidth () {
      return this.column.width || '160px'
    },
    combo3SortedList () {
      let list = [...this.thirdComboDatasource]

      return list.sort((a, b) => a.Title > b.Title ? 1 : -1)
    }
  },
  methods: {
    customMode (arr) {
      return this.editable === true && Array.isArray(arr) && arr.length > 0 ? 'e' : 'r'
    },
    setfirstComboValue (val) {
      // let value = ev.target.value
      let value = val
      this.secondComboValue = value
      if (!Number.isNaN(Number(value))) value = Number(value)

      const payload = {
        field: this.options.combo1Opts.field,
        value: value,
        dataItem: this.dataItem,
        event: val
      }

      this.$emit('change', payload)
    },
    setSecondComboValue (val) {
      // let value = ev.target.value
      let value = val
      this.thirdComboValue = value
      if (!Number.isNaN(Number(value))) value = Number(value)

      const payload = {
        field: this.options.combo2Opts.field,
        value: value,
        dataItem: this.dataItem,
        event: val
      }

      this.$emit('change', payload)
    },
    setThirdComboValue (val) {
      // let value = ev.target.value
      let value = val
      this.thirdCombovalue = value
      if (!Number.isNaN(Number(value))) value = Number(value)

      const payload = {
        field: this.options.combo3Opts.field,
        value: value,
        dataItem: this.dataItem,
        event: val
      }

      this.$emit('change', payload)
    },
    bindComboText () {
      this.firstComboValue = this.firstText =
        (this.dataItem && this.dataItem[this.options.combo1Opts.field]) || ''
      this.secondComboValue = this.secondText =
        (this.dataItem && this.dataItem[this.options.combo2Opts.field]) || ''
      this.thirdComboValue = this.thirdText =
        (this.dataItem && this.dataItem[this.options.combo3Opts.field]) || ''

      // // console.log('VVVVVVVVVVVV this.thir///dvalue', this.thirdComboValue)

      // dataitem CI_TechnicalCommitteeSubUsing

      // CI_TechnicalCommitteeSubUsing

      // // console.log('///////this.dataItem[this.secondOptions.to.field]', this.dataItem[this.secondOptions.to.field])

      // // console.log('//////this.secondOptions', this.secondOptions)

      // // console.log('///////this.dataItem', this.dataItem)

      if (this.firstComboValue && this.firstComboDatasource) {
        const selectedItem = this.firstComboDatasource.filter(
          x => x.ID === this.firstComboValue
        )[0]
        if (selectedItem) {
          this.firstText = selectedItem.Title
        }
      }
      if (this.secondComboValue && this.secondComboDatasource) {
        const selectedItem = this.secondComboDatasource.filter(
          x => x.ID === this.secondComboValue
        )[0]
        if (selectedItem) {
          this.secondText = selectedItem.Title
        }
      }

      // console.log('/////this.thirdComboValue ', this.thirdComboValue)

      if (this.thirdComboValue && this.thirdComboDatasource) {
        const selectedItem = this.thirdComboDatasource.filter(
          x => x.ID === this.thirdComboValue
        )[0]
        if (selectedItem) {
          this.thirdText = selectedItem.Title
        }
      }
    },
    async createFirstComboDatasource () {
      // console.log(this.options)
      if (!this.options) return
      const CI = this.options.combo1Opts.ciName
      const DOMAIN = this.options.combo1Opts.domainName
      if (!CI || !DOMAIN) return

      const self = this
      this.$ci.get({
        name: CI,
        domain: DOMAIN,
        callback: function (list) {
          self.firstComboDatasource = list
        }
      })
    },
    createSecondComboDatesource () {
      if (!this.firstComboValue) return false
      console.log('createSecondComboDatesource', this.firstComboValue)

      this.$services.equipmentCI
        .getUsingTypeFromUsingGroup(this.options.combo1Opts.serviceUrl, {
          [this.options.combo1Opts.paramName]: this.firstComboValue
        })
        .then(({ data }) => {
          let cleanResponse = new ResponseParser(data).get()
          if (!cleanResponse.hasError) {
            this.secondComboDatasource =
              cleanResponse.data[this.options.combo1Opts.responseKey] || []
          }
        })
    },
    createThirdComboDatesource () {
      if (!this.secondComboValue) return false
      // console.log('@@@@', this.secondComboValue)
      this.$services.equipmentCI
        .getUsingTypeFromUsingGroup(this.options.combo2Opts.serviceUrl, {
          [this.options.combo2Opts.paramName]: this.secondComboValue
        })
        .then(({ data }) => {
          let cleanResponse = new ResponseParser(data).get()
          if (!cleanResponse.hasError) {
            this.thirdComboDatasource =
              cleanResponse.data[this.options.combo2Opts.responseKey] || []
          }
        })
    }
  },
  watch: {
    firstComboValue (newValue) {
      this.createSecondComboDatesource()
    },
    secondComboValue (newValue) {
      this.createThirdComboDatesource()
    },

    // thirdComboValue (newValue) {
    //   this.createThirdComboDatesource()
    // },

    dataItem (newValue) {
      // this.firstComboValue = this.firstText =
      //   (this.dataItem && this.dataItem[this.options.combo1Opts.field]) || ''

      this.bindComboText()
    },
    firstComboDatasource () {
      this.bindComboText()
    },
    secondComboDatasource () {
      this.bindComboText()
    },
    thirdComboDatasource () {
      // console.log('/////////this.thirdComboDatasource', this.thirdComboDatasource)

      this.bindComboText()
    }
  }
}
</script>
