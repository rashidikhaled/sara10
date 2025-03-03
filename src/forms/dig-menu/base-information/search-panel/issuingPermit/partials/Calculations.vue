<template>
  <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-datepicker
            label="تاریخ"
            m="r"
            v-model="value.ClsLicense.ExportLicenseDate"
            label-width="92px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsLicense.ExportLicenseNo"
            cdcName="ExportLicenseNo"
            label="شماره"
            label-width="90px"
            m="r"
          />
        </FormControl>
      </FormRow>
    <fit>
      <safa-grid
        v-model="value.ClsLicense.ClsIncomeFiche.Income_Fiche"
        cdcName="ReceiptIssuance"
        title="صدور فیش"
        :columns="ReceiptIssuanceColumns"
        height="100%"
        max-height="100%"
        min-height="400px"
        fit
        m="r"
        paginate
        :pageSize="20"
      />
    </fit>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    rowSelectData: Object
  },
  data () {
    return {
      exState1: true,
      ReceiptIssuance: [],
      ReceiptIssuanceColumns: [
        // {
        //   field: "CI_RedirectName",
        //   title: "نام تابعه",
        //   width: "200px",
        //   editor: "combo",
        //   domain: "Dig"
        // },
        {
          field: "FicheNo",
          title: "شماره فیش",
          width: "100px"
        },
        {
          field: "FicheDate",
          title: "تاریخ استعلام",
          width: "100px",
          editor: "date"
        },
        {
          field: "ConfirmDate",
          title: "تاریخ تایید",
          width: "100px",
          editor: "date"
        },
        {
          field: "CancelDate",
          title: "تاریخ ابطال",
          width: "100px",
          editor: "date"
        },
        {
          field: "RequestStatus",
          title: "نحوه تایید",
          width: "100px"
        },
        {
          field: "Price",
          title: "مبلغ فیش",
          width: "100px"
        },
        {
          field: "PaymentID",
          title: "شناسه پرداخت",
          width: "120px"
        },
        {
          field: "BillID",
          title: "شناسه قبض",
          width: "100px"
        },
        {
          field: "UserName",
          title: "کاربر",
          width: "80px"
        },
        {
          field: "UserNameShahrdari",
          title: "کاربر تایید کننده شهرداری",
          width: "180px"
        },
        {
          field: "Deduction",
          title: "کسر هزار ریال",
          width: "120px"
        }
      ]
    }
  },
  methods: {},
  mounted () {}
}
</script>
