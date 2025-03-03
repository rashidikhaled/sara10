<template>
  <fit>
    <safa-grid
      title="لیست سایر 1"
      paginate
      v-model="gridContext.grdOtherVote1"
      cdcName="grdOtherVote1"
      :columns="grdOtherVote1Column"
      :suppressRowClickSelection="false"
      :allow-multiple-selection="false"
      fit
      m="r"
      height="100%"
      min-height="200px"
      max-height="100%"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      class="q-mb-sm"
      ref="grdOtherVote1"
    />
    <internal-section title="مشخصات سایر 1" :defaultShow="true">
      <form-row>
        <form-control>
          <safa-text
            label="شماره :"
            label-width="100px"
            v-model="value.formContext.other1.txtNumber"
            cdcName="Number"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="مورخ :"
            label-width="100px"
            v-model="value.formContext.other1.txtDate"
            cdcName="Date"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره حساب بانک :"
            label-width="100px"
            v-model="value.formContext.other1.txtBankAccountNumber"
            cdcName="BankAccountNumber"
            :m="mode"
          />
        </form-control>

        <form-control>
          <safa-text
            label="شعبه :"
            label-width="100px"
            v-model="value.formContext.other1.txtBranch"
            cdcName="Branch"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="مورخه :"
            label-width="100px"
            v-model="value.formContext.other1.txtDated"
            cdcName="Dated"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="در تاریخ :"
            label-width="100px"
            v-model="value.formContext.other1.txtInDate"
            cdcName="InDate"
            :m="mode"
          />
        </form-control>

        <form-control>
          <safa-text
            label="تحویل گیرنده :"
            label-width="100px"
            v-model="value.formContext.other1.txtTransferee"
            cdcName="Transferee"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="سایر :"
            label-width="100px"
            v-model="value.formContext.other1.txtOther1"
            cdcName="Other"
            :m="mode"
          />
        </form-control>
        <form-control className="col-12">
          <text-template
            label="توضیحات"
            label-width="100px"
            v-model="value.formContext.other1.txtDescriptionOther1"
            cdcName="txtDescriptionOther2"
            :m="mode"
          />
        </form-control>
      </form-row>
    </internal-section>
  </fit>
</template>
<script>
export default {
  data () {
    return {
      grdOtherVote1Column: [
        {
          field: "isSelectedNode",
          title: "",
          width: 45,
          filterable: false,
          lockPosition: false,
          pinned: "right",
          editor: "selection",
          headerCheckboxSelection: false
        },
        { field: "Number" },
        { field: "Date" },
        { field: "BankAccountNumber" },
        { field: "Branch" },
        { field: "Dated" },
        { field: "InDate" },
        { field: "Transferee" },
        { field: "Other" },
        { field: "Description" },
        { field: "CreateDate" },
        { field: "CreateTime" },
        { field: "UserName", title: "کاربر ایجاد کننده" },
        { field: "EditDate" },
        { field: "EditTime" },
        { field: "EditorUserName" }
      ]
    }
  },
  props: {
    formKey: String,
    name: String,
    title: String,
    value: Object,
    mode: String,
    gridContext: Object
  }
}
</script>
