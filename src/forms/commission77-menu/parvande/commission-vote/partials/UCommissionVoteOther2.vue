<template>
  <fit>
    <safa-grid
      title="لیست سایر 2"
      paginate
      v-model="gridContext.grdOtherVote2"
      cdcName="grdOtherVote2"
      :columns="grdOtherVote2Column"
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
      ref="grdOtherVote2"
    />
    <internal-section title="مشخصات سایر 2" :defaultShow="true">
      <form-row>
        <form-control>
          <safa-text
            label="کمیسیون :"
            label-width="100px"
            v-model="value.formContext.other2.txtCommission"
            cdcName="Number"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="پرونده :"
            label-width="100px"
            v-model="value.formContext.other2.txtFile"
            cdcName="txtFile"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="مطالبه :"
            label-width="100px"
            v-model="value.formContext.other2.txtDemand"
            cdcName="txtDemand"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="بانک :"
            label-width="100px"
            v-model="value.formContext.other2.txtBank"
            cdcName="txtBank"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="جلسه حضور :"
            label-width="100px"
            v-model="value.formContext.other2.txtAttendanceMeeting"
            cdcName="txtAttendanceMeeting"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شکایت :"
            label-width="100px"
            v-model="value.formContext.other2.txtComplaint"
            cdcName="txtComplaint"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="علیه :"
            label-width="100px"
            v-model="value.formContext.other2.txtAgainst"
            cdcName="txtAgainst"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="دایر بر عدم :"
            label-width="100px"
            v-model="value.formContext.other2.txtOnTheLackOf"
            cdcName="txtOnTheLackOf"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="محتویات پرونده :"
            label-width="100px"
            v-model="value.formContext.other2.txtFileContents"
            cdcName="txtFileContents"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="ماده 77 شهرداریها :"
            label-width="100px"
            v-model="value.formContext.other2.txtMatter77"
            cdcName="txtMatter77"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="پرداخت :"
            label-width="100px"
            v-model="value.formContext.other2.txtPayment"
            cdcName="txtPayment"
            :m="mode"
          />
        </form-control>
        <form-control>
          <safa-text
            label="واقع در :"
            label-width="100px"
            v-model="value.formContext.other2.txtLocatedAt"
            cdcName="txtLocatedAt"
            :m="mode"
          />
        </form-control>
        <form-control className="col-12">
          <text-template
            label="توضیحات :"
            label-width="100px"
            v-model="value.formContext.other2.txtDescriptionOther2"
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
      grdOtherVote2Column: [
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
        { field: "Commission" },
        { field: "File" },
        { field: "Demand" },
        { field: "Bank" },
        { field: "AttendanceMeeting" },
        { field: "Complaint" },
        { field: "Against" },
        { field: "OnTheLackOf" },
        { field: "FileContents" },
        { field: "Matter77" },
        { field: "Payment" },
        { field: "LocatedAt" },
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
    value: Object,
    mode: String,
    formKey: String,
    name: String,
    title: String,
    gridContext: Object
  }
}
</script>
