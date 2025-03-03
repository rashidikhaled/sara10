<template>
  <fit>
    <FormRow class="q-my-sm q-pl-sm">
      <FormControl>
        <safa-text v-model="passParam.pName" label="نام" @keyup.enter="search"/>
      </FormControl>
      <FormControl>
        <safa-text v-model="passParam.pFamilly" label="نام خانوادگی" @keyup.enter="search"/>
      </FormControl>
      <FormControl>
        <safa-text v-model="passParam.pUrbanityCode" label="کد شهرداری" @keyup.enter="search"/>
      </FormControl>
      <div class="col-auto">
        <btn-default label="جستجو" @click="search"/>
      </div>
    </FormRow>
    <safa-datatable
      v-model="value"
      :addRow="false"
      :allowCopy="false"
      :allowMultipleSelection="true"
      :columns="engineerColumn"
      :countData="totalRow"
      :deleteRow="false"
      :hideHeader="true"
      :page="page"
      :paginate="true"
      :perPage="[10]"
      :serverServe="true"
      :take="take"
      fit
      height="100%"
      m="r"
      max-height="100%"
      title="لیست مهندسین ناظر"
      @dbclick="dbClick"
      @updatePagination="updatePaging"
    />
  </fit>
</template>
<script>
export default {
  props: { value: Array, passParam: Object },
  data () {
    return {
      engineerColumn: [
        { field: 'UrbanityCode', title: 'کد شهرداری' },
        { field: 'JobAgreement', title: 'شماره پروانه اشتغال' },
        { field: 'MembershipNo', title: 'شماره عضويت نظام مهندسی' },
        { field: 'ControllerName', title: 'نام' },
        { field: 'ControllerFamily', title: 'نام خانوادگی' },
        { field: 'CI_Ability', title: 'كد نوع صلاحيت', domain: 'CI_SaraM1' },
        { field: 'ControllerCode', title: 'كد نظام معماری' },
        { field: 'CommitmentNo', title: 'ميزان زيربنای تعهد شده' },
        { field: 'CommitmentSupervisionNo', title: 'شماره تعهد نظارت' },
        { field: 'CommitmentSupervisionDate', title: 'تاریخ تعهد نظارت' },
        { field: 'EngBase', title: 'پایه مهندس' },
        { field: 'CI_EngStudyField', title: 'رشته تحصیلی', domain: 'CI_SaraM1' }
      ],
      skip: 0,
      take: 10,
      page: 1
    }
  },
  methods: {
    search () {
      this.$emit('searchData', { page: this.page, take: this.take })
    },
    updatePaging ({ page, perPage, total, lastPage, from, to }) {
      this.page = page
      this.take = perPage
      this.search()
    },
    dbClick (row) {
      this.$emit('selectedRow', row)
    }
  },
  computed: {
    totalRow () {
      if (this.value.length > 0) {
        return (this.value[0] || {}).TotalCount || 0
      } else {
        return 0
      }
    }
  }
}
</script>
