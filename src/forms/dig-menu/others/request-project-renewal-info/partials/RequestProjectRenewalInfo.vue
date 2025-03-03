<template>
  <fit>
    <safa-splitter v-model="splitterHorizontalModelTop" horizontal>
      <template v-slot:before>
        <fit>
          <safa-splitter v-model="splitterhorizontalModelDown" vertical>
            <template v-slot:before>
              <fit>
                <safa-grid
                  title="محاسبه تأخیر"
                  v-model="
                    value.ClsLicense.ExportLicenseInfo.License_AsphaltCoating
                  "
                  :columns="licenseAsphaltCoating"
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
                  title="محاسبه خسارت روکش آسفالت"
                  v-model="
                    licenseAsphaltCoatingRows
                  "
                  :columns="licenseAsphaltCoating"
                  :suppressRowClickSelection="false"
                  fit
                  paginate
                  cdcName="License_AsphaltCoating"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            :title="ficheGridHeader"
            v-model="value.ClsLicense.ClsIncomeFiche.Income_Fiche"
            :columns="IncomeFicheColumns"
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
    ficheGridHeader: String
  },

  data () {
    return {
      splitterHorizontalModelTop: 50,
      splitterhorizontalModelDown: 50,
      IncomeFicheColumns: [
        { field: "FicheNo", title: "شماره فیش", width: "150px" },
        { field: "FicheDate", title: "تاریخ فیش", width: "100px" },
        { field: "ConfirmDate", title: "تاریخ تایید", width: "100px" },
        { field: "CancelDate", title: "تاریخ ابطال", width: "100px" },
        { field: "RequestStatus", title: "نحوه تایید", width: "150px" },
        { field: "Price", title: "مبلغ فیش", width: "150px" },
        { field: "PaymentID", title: "شناسه پرداخت", width: "150px" },
        { field: "BillID", title: "شناسه قبض", width: "150px" },
        { field: "UserName", title: "کاربر", width: "200px" },
        { field: "UserNameShahrdari", title: "کاربر تایید کننده شهرداری", width: "200px" },
        { field: "Deduction", title: "کسر هزار ریال", width: "150px" }
      ]
    }
  },
  computed: {
    licenseAsphaltCoatingRows: {
      get () {
        const list = this.value?.ClsLicense?.ExportLicenseInfo?.License_Columns ?? []
        if (Array.isArray(list) && list.length > 0) {
          const tmp = []
          list.forEach((item) => {
            let obj = {}
            for (let key in item) {
              obj[key] = item[key].Value
            }
            tmp.push(obj)
          })
          return tmp ?? []
        }
        return []
      },
      set () {
      }
    },
    licenseAsphaltCoating: {
      get () {
        const list = this.value?.ClsLicense?.ExportLicenseInfo?.License_Columns ?? []
        if (Array.isArray(list) && list.length > 0) {
          let cols = []
          for (let key in list[0]) {
            const title = list[0][key]?.Header ?? `${key}.Value`
            cols.push({
              field: key,
              title,
              width: `${title.length * 5 + 50}px`
            })
          }
          return cols
        }
        return []
      },
      set () {
      }
    }

  }
}
</script>
