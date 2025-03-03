<template>
  <fit>
    <internal-section
      v-model="infoRequest"
      default-open
      title="اطلاعات ورودی گزارش"
      class="q-mt-sm"
    >
      <div class="q-gutter-sm">
        <!-- 1 -->
        <div class="flex items-center q-gutter-sm">
          <span>به مدت</span>
          <safa-text
            class="q-mx-sm"
            style="max-width: 50px"
            v-model="value.CommitteeLicense.Duration"
            validations="required"
          />
          <span>روز</span>
          <span>( به صورت</span>
          <safa-checkbox
            label="صبح"
            v-model="value.CommitteeLicense.IsDayShift"
            cdcName="IsDayShift"
          />
          <safa-checkbox
            label="بعدازظهر"
            v-model="value.CommitteeLicense.IsAfternoonShift"
            cdcName="IsAfternoonShift"
          />
          <safa-checkbox
            label="شب"
            v-model="value.CommitteeLicense.IsNightShift"
            cdcName="IsNightShift"
          />
          <span>)</span>
          <span class="q-mx-sm">{{ value.CommitteeLicense.ShiftCount }}</span>
          <span>شیفت،</span>
          <safa-text
            style="max-width: 80px"
            class="q-mx-sm"
            v-model="value.CommitteeLicense.CoordinateDays"
            validations="required"
          />
          <span>ساعت قبل از حفاری با نماینده سازمان فاوا به شماره تماس</span>
          <safa-text
            class="q-mx-sm"
            v-model="value.CommitteeLicense.FavaAgentTel"
          />
          <span> و </span>
          <safa-text
            class="q-mx-sm"
            v-model="value.CommitteeLicense.AgentName"
          />
          <span>شماره تماس</span>
          <safa-text
            class="q-mx-sm"
            v-model="value.CommitteeLicense.AgentTel"
          />
          <span>نماینده پیمانکار</span>
          <safa-text
            class="q-mx-sm"
            v-model="value.CommitteeLicense.AgentSide"
          />
          <span>هماهنگ گردد.</span>
        </div>

        <div class="flex items-center q-gutter-x-sm">
          <safa-combo2
            label="تمهیدات و نکات ضروری"
            ciName="cmbCi_Arrangements"
            v-model="cmbCi_Arrangements"
            :options="cmbCi_ArrangementsOpt"
            type="multiple"
            source-type="local"
            cdcName="cmbCi_Arrangements"
            label-width="120px"
          />
        </div>
      </div>
    </internal-section>
    <safa-grid
      title="لیست آیتم های ذخیره شده"
      v-model="value.CommitteeLicenses"
      :columns="grdCommitteeLicensesColumns"
      m="r"
      min-height="200px"
      fit
      paginate
      cdcName="grdCommitteeLicenses"
      @row:click="handleClickRow"
    />
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    cmbCi_ArrangementsOpt: Array,
    value: Object
  },
  data () {
    return {
      infoRequest: true,
      IsDayShift: false,
      IsAfternoonShift: false,
      IsNightShift: false,
      Duration: "",
      CoordinateDays: "",
      FavaAgentTel: "",
      Shift: 0,
      AgentName: "",
      AgentTel: "",
      AgentSide: "",
      cmbCi_Arrangements: [],

      // grid
      grdCommitteeLicenses: [],
      grdCommitteeLicensesColumns: [
        {
          field: "NidCommitteeLicense",
          title: "کد",
          width: 100
        },
        {
          field: "CreateDate",
          title: "تاریخ ایجاد",
          width: 100
        },
        {
          field: "CreateTime",
          title: "زمان ایجاد",
          width: 100
        },
        { field: "UserName", title: "کاربر ایجاد کننده", width: 130 }
      ]
    }
  },
  watch: {
    cmbCi_Arrangements () {
      this.value.CommitteeLicense.Description =
        this.cmbCi_Arrangements.toString()
    },
    "value.CommitteeLicense.IsDayShift" () {
      this.value.CommitteeLicense.IsDayShift === true
        ? (this.value.CommitteeLicense.ShiftCount += 1)
        : (this.value.CommitteeLicense.ShiftCount -= 1)
    },
    "value.CommitteeLicense.IsAfternoonShift" () {
      this.value.CommitteeLicense.IsAfternoonShift === true
        ? (this.value.CommitteeLicense.ShiftCount += 1)
        : (this.value.CommitteeLicense.ShiftCount -= 1)
    },
    "value.CommitteeLicense.IsNightShift" () {
      this.value.CommitteeLicense.IsNightShift === true
        ? (this.value.CommitteeLicense.ShiftCount += 1)
        : (this.value.CommitteeLicense.ShiftCount -= 1)
    }
  },
  methods: {
    handleClickRow (e) {
      this.$emit("selectedRow", e)
    }
  },
  mounted () {}
}
</script>
