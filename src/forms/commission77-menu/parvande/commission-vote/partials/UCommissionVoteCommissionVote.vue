<template>
  <fit>
    <internal-section title="مشخصات" class="q-mb-sm" :defaultShow="true">
      <FormRow>
        <FormControl>
          <safa-text
            label="شماره دبیرخانه"
            label-width="80px"
            v-model="value.ClsRequest_Info.Request_Info.SecretariatNo"
            cdcName="SecretariatNo"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام مالک"
            label-width="80px"
            v-model="value.ClsRequest_Info.Request_Info.OwnerName"
            cdcName="OwnerName"
            m="r"
          />
        </FormControl>
        <nosazi-code-input
          v-model="value.formContext.baseNosaziCode"
          cdcName="NosaziCode"
          label="کد نوسازی"
          label-width="80px"
          m="r"
        />
        <safa-text
          label="آدرس"
          label-width="80px"
          v-model="value.ClsRequest_Info.Request_Info.Address"
          cdcName="Address"
          class="col-12"
          m="r"
        />
      </FormRow>
    </internal-section>
    <internal-section
      title="اطلاعات کمیسیون"
      class="q-mb-sm"
      :defaultShow="true"
    >
      <FormRow>
        <FormControl>
          <safa-combo
            ciName="CI_Commission"
            domainName="Commission77"
            v-model="value.ClsRequest_Info.Request_Info.CI_Commission"
            cdcName="CI_Commission"
            label="شماره کمیسیون"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            ciName="CI_RequestType"
            domainName="Commission77"
            v-model="value.ClsRequest_Info.Request_Info.CI_RequestType"
            cdcName="CI_RequestType"
            label="گروه کمیسیون"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره درخواست"
            label-width="80px"
            v-model="value.ClsRequest_Info.Request_Info.NidWorkItem"
            cdcName="NidWorkItem"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ برگزاری کمیسیون"
            label-width="80px"
            v-model="value.ClsRequest_Info.Request_Info.HoldingDate"
            cdcName="HoldingDate"
            m="r"
          />
        </FormControl>
      </FormRow>
    </internal-section>
    <safa-grid
      v-model="value.ClsRequest_Info.ListFicheInVote"
      cdcName="ListFicheInVote"
      id="com77Votinggrd_FicheDetails"
      title="جزئیات عوارض"
      :columns="grdFicheDetailsColumns"
      :suppressRowClickSelection="false"
      m="r"
      fit
      class="q-mb-sm"
      max-height="100%"
      min-height="250px"
      height="100%"
      paginate
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
    />
    <internal-section title="اطلاعات رای" class="q-mb-sm" :defaultShow="true">
      <FormRow>
        <FormControl>
          <safa-combo
            v-model="value.ClsRequest_Vote.Request_Vote.CI_VoteTypeNew"
            ciName="CI_VoteType"
            domainName="Commission77"
            cdcName="CI_VoteType"
            label="نوع رای"
            label-width="80px"
            :m="mode"
            :validations="['required']"
            required
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره"
            label-width="80px"
            v-model="value.ClsRequest_Vote.Request_Vote.VoteNoe"
            cdcName="VoteNoe"
            :m="mode"
          />
          <!-- :m="txtVoteNoMode" -->
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ"
            label-width="80px"
            v-model="value.ClsRequest_Vote.Request_Vote.VoteDate"
            cdcName="VoteDate"
            :m="mode"
            :validations="['required']"
            required
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مقدار"
            label-width="80px"
            v-model="value.ClsRequest_Vote.Request_Vote.VoteValue"
            cdcName="VoteValue"
            :m="mode"
          />
        </FormControl>
        <text-template
          label="متن"
          label-width="80px"
          v-model="value.ClsRequest_Vote.Request_Vote.VoteDescryption"
          formKey="e6c5a5b2-3e10-4747-b6a3-3ad3e7e09142"
          cdcName="VoteDescryption"
          :m="mode"
          :rows="2"
          :validations="['required']"
          required
        />
      </FormRow>
    </internal-section>

    <internal-section title="توافق" :defaultShow="true">
      <FormRow>
        <FormControl>
          <safa-text
            label="تعداد اقساط"
            label-width="80px"
            v-model="value.ClsRequest_Vote.Request_Vote.NumberOfInstallments"
            cdcName="NumberOfInstallments"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مبلغ کل عوارض"
            label-width="80px"
            v-model="value.ClsRequest_Vote.Request_Vote.DutyPrice"
            cdcName="DutyPrice"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مبلغ نقد"
            label-width="80px"
            v-model="value.ClsRequest_Vote.Request_Vote.Cash"
            cdcName="Cash"
            :m="mode"
          />
        </FormControl>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="بخشودگی دارد"
            label-width="80px"
            v-model="value.ClsRequest_Vote.Request_Vote.IsAbsolution"
            cdcName="IsAbsolution"
            :m="mode"
          />
        </FormControl>
      </FormRow>
    </internal-section>

    <safa-popup
      v-model="showDetails"
      title="جزئیات"
      width="900px"
      height="500px"
    >
      <safa-splitter v-model="splitterModel">
        <template #before>
          <safa-grid
            height="100%"
            max-height="100%"
            fit
            helper="subCalculate"
            m="r"
            v-model="selectedRow.SubFicheDetail"
            :allowMultipleSelection="false"
            title="ریز محاسبات فیش"
            cdcName="SubFicheDetail"
            paginate
            pageSize="20"
          />
        </template>
        <template #after>
          <safa-grid
            height="100%"
            max-height="100%"
            fit
            helper="ficheDetails"
            m="r"
            v-model="selectedRow.DutyFicheLog"
            :allowMultipleSelection="false"
            title="جزئیات فیش"
            cdcName="DutyFicheLog"
            ref="DutyFicheOtherListRef"
            paginate
            pageSize="20"
          />
        </template>
      </safa-splitter>
    </safa-popup>
  </fit>
</template>
<script>

import converter from "xml-js"
export default {
  data () {
    return {
      grdFicheDetailsColumns: [
        {
          field: "isSelected",
          width: 41,
          headerCheckboxSelection: true,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false
        },
        {
          field: "showDetail",
          btnTitle: "نمایش جزئیات",
          cellRenderer: "agCallbackBtn",
          width: 160,
          callback: (params) => this.grdCommissionShowDetail(params)
        },
        {
          field: "NidWorkItem",
          title: "شماره ارجاع",
          width: 150,
          ignoreDefaultCol: true
        },
        { field: "Price", title: "مبلغ کل درخواست", width: 170 },
        { field: "TitleRequest" },
        { field: "FicheNo" },
        { field: "CI_IncomeAccountGroup" },
        { field: "PriceFiche" },
        { field: "IncomeCreateDate", title: "ردیف درآمدی" },
        { field: "IncomeStatusFiche" }
      ],

      // Btn & Sections Visibility
      tavafoghnamehSectionVisible: false,

      // Context
      selectedRow: {
        SubFicheDetail: [],
        DutyFicheLog: []
      },
      splitterModel: 50,
      showDetails: false,

      // Forms & Controls Edit/ReadOnly Modes
      txtVoteNoMode: "r"
    }
  },
  props: {
    value: Object,
    NidUser: String,
    NidRequest: String,
    mode: String,
    formKey: String,
    name: String,
    title: String
  },
  methods: {
    async grdCommissionShowDetail (dataItem) {
      this.selectedRow = {
        SubFicheDetail: [],
        DutyFicheLog: []
      }
      // eslint-disable-next-line camelcase
      const { Request_Info, Request_FicheDetail, SubFicheDetail } = this.value.ClsRequest_Info
      // eslint-disable-next-line camelcase
      if (Request_Info) {
        if (Request_FicheDetail.length > 0) {
          this.selectedRow = {
            ...dataItem,
            SubFicheDetail: SubFicheDetail ?? [],
            DutyFicheLog: SubFicheDetail.length > 0
              ? converter
                .xml2js(
                  SubFicheDetail.find(
                    (i) => i.DutyFicheOtherFiled !== null
                  ).DutyFicheOtherFiled,
                  { compact: true }
                )
                .ArrayOfClsLog.ClsLog.map((e) => {
                  return {
                    ...e,
                    Subject: e.Subject._text,
                    Value: e.Value._text,
                    Comment: e.Comment._text
                  }
                })
              : []
          }
        }
        this.showDetails = true
      }
    }
  }
}
</script>
