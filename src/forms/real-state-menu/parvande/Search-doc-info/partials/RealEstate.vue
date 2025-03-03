<template>
  <fit>
    <form-row>
      <!-- <form-control>
        <safa-text
          label="نام مالک قبلی و آدرس"
          label-width="100px"
          v-model="OldOwnerNameAddress"
          cdcName="OldOwnerNameAddress"
          m="r"
        />
      </form-control>
      <form-control>
        <safa-text
          label="پلاک آبی"
          label-width="100px"
          v-model="Plack"
          cdcName="Plack"
        />
      </form-control> -->
      <form-control>
        <safa-text
          label="نام مستاجر"
          label-width="100px"
          v-model="value.RenterName"
          cdcName="RenterName"
        />
      </form-control>
      <form-control>
        <safa-text
          label="آدرس مستاجر"
          label-width="100px"
          v-model="value.RenterAddress"
          cdcName="RenterAddress"
        />
      </form-control>
      <form-control>
        <safa-text
          label="تلفن مستاجر"
          label-width="100px"
          v-model="value.RenterTel"
          cdcName="RenterTel"
        />
      </form-control>
    </form-row>
    <internal-section title="قرارداد">
      <form-row class="q-mt-sm">
        <form-control>
          <safa-text
            label="شماره قرارداد"
            label-width="100px"
            v-model="value.ContractNo"
            cdcName="ContractNo"
          />
        </form-control>
        <form-control>
          <safa-text
            label="مبلغ اجاره ماهیانه"
            label-width="100px"
            v-model="value.RentPrice"
            cdcName="RentPrice"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="قرارداد اجاره"
            ciName="CI_ContractRent"
            domainName="Estate"
            label-width="100px"
            v-model="value.CI_ContractRent"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره صورتجلسه تحویل مورد اجاره"
            label-width="100px"
            v-model="value.TransferRentNo"
            cdcName="TransferRentNo"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ قرارداد اجاره از:"
            label-width="100px"
            v-model="value.TransferRentDateFrom"
            cdcName="TransferRentDateFrom"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تا:"
            label-width="100px"
            v-model="value.TransferRentDateTo"
            cdcName="TransferRentDateTo"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ شروع قرارداد ار:"
            label-width="100px"
            v-model="value.ContractStartDateFrom"
            cdcName="ContractStartDate"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تا:"
            label-width="100px"
            v-model="value.ContractStartDateTo"
            cdcName="ContractStartDateTo"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ صورتجلسه تحویل مورد اجاره از:"
            label-width="100px"
            v-model="value.TransferRentDateFrom"
            cdcName="TransferRentDateFrom"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تا:"
            label-width="100px"
            v-model="value.TransferRentDateTo"
            cdcName="TransferRentDateTo"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ اتمام قرارداد از:"
            label-width="100px"
            v-model="value.ContractEndDateFrom"
            cdcName="ContractEndDateFrom"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تا:"
            label-width="100px"
            v-model="value.ContractEndDateTo"
            cdcName="ContractEndDateTo"
          />
        </form-control>
      </form-row>
    </internal-section>

    <internal-section title="صورتجلسه">
      <form-row>
        <form-control>
          <safa-text
            label="شماره صورتجلسه تحویل ملک"
            label-width="100px"
            v-model="value.RealEstateTransferNo"
            cdcName="RealEstateTransferNo"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره صورتجلسه واگذاری ملک"
            label-width="100px"
            v-model="value.AssignmentNo"
            cdcName="AssignmentNo"
          />
        </form-control>
         <form-control>
          <safa-datepicker
            label="تاریخ صورتجلسه واگذاری ملک از:"
            label-width="100px"
            v-model="value.AssignmentDateFrom"
            cdcName="AssignmentDateFrom"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تا:"
            label-width="100px"
            v-model="value.AssignmentDateTo"
            cdcName="AssignmentDateTo"
          />
        </form-control>
      </form-row>
    </internal-section>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object
  },
  data () {
    return {
      name: "RealEstate"
    }
  }
}
</script>
