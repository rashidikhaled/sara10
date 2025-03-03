<template>
  <fit>
    <!-- value.ClsLicense.ClsIncomeFiche.ExportLicenseInfo. -->
    <safa-grid
      v-model="licenseAsphaltCoating"
      cdcName="LicenseAsphaltCoating"
      :columns="licenseAsphaltCoatingColumns"
      paginate
      title="محاسبه خسارت"
      m="r"
      fit
      :suppressRowClickSelection="false"
      :pageSize="20"
    />
  </fit>
</template>

<script>
export default {

  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String,
    model: Object
  },

  data () {
    return {
      // licenseAsphaltCoatingColumns: []
    }
  },
  computed: {
    licenseAsphaltCoating: {
      get () {
        const list = this.value?.ClsLicense?.ExportLicenseInfo?.License_AsphaltCoating ?? []
        if (Array.isArray(list) && list.length > 0) {
          const tmp = []
          list.forEach((item) => {
            let obj = {}
            for (let key in item) {
              obj[key] = item[key].Value
            }
            tmp.push(obj)
          })
          return tmp
        }
        return []
      },
      set () {
      }
    },
    licenseAsphaltCoatingColumns: {
      get () {
        const list =
      this.value?.ClsLicense?.ExportLicenseInfo?.License_AsphaltCoating ?? []
        if (Array.isArray(list) && list.length > 0) {
          let cols = []
          for (let key in list[0]) {
            const title = list[0][key].Header ?? `${key}.Value`
            cols.push({
              field: key,
              title,
              width: title.length > 20 ? "220px" : "150px"
            })
          }
          return cols
        }
        return []
      },
      set () {}
    }
  }
}
</script>
