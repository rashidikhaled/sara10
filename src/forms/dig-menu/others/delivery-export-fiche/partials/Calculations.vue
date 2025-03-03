<template>
  <fit>
    <safa-splitter v-model="horizontalSplitterModel" horizontal margin="0">
      <template v-slot:before>
        <fit>
          <safa-grid
            v-model="licenseAsphaltCoating"
            :columns="licenseAsphaltCoatingColumns"
            :suppressRowClickSelection="false"
            fit
            paginate
            cdcName="License_AsphaltCoating"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            v-model="value.ClsLicense.ClsIncomeFiche.Income_Fiche"
            :columns="incomeFicheColumns"
            :suppressRowClickSelection="false"
            fit
            paginate
            cdcName="Income_Fiche"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      horizontalSplitterModel: 50,
      incomeFicheColumns: [
        { title: "شماره فیش", field: "FicheNo" },
        { title: "تاریخ فیش", field: "FicheDate" },
        { title: "تاریخ تایید", field: "ConfirmDate" },
        { title: "تاریخ ابطال", field: "CancelDate" },
        { title: "مبلغ فیش", field: "Price" },
        { title: "شناسه پرداخت", field: "PaymentID" },
        { title: "شناسه قبض", field: "BillID" },
        { title: "نحوه تایید", field: "RequestStatus" },
        { title: "کاربر", field: "UserName" },
        { title: "کاربر تایید کننده شهرداری", field: "UserNameShahrdari" },
        { title: "کسر هزار ریال", field: "Deduction" }
      ]
    }
  },
  computed: {
    licenseAsphaltCoating () {
      const list =
        this.value?.ClsLicense?.ExportLicenseInfo?.License_AsphaltCoating ?? []
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
    licenseAsphaltCoatingColumns () {
      const list =
        this.value?.ClsLicense?.ExportLicenseInfo?.License_AsphaltCoating ?? []
      if (Array.isArray(list) && list.length > 0) {
        let cols = []
        for (let key in list[0]) {
          const title = list[0][key].Header ?? `${key}.Value`
          cols.push({
            field: key,
            title,
            width: `${title.length * 5 + 50}px`
          })
        }
        return cols
      }
      return []
    }
  }
}
</script>
