<template>
  <fit>
    <safa-splitter v-model="splitterValueHorizontal" horizontal>
      <template v-slot:before>
        <fit>
          <safa-splitter v-model="splitterValueVertical" vertical>
            <template v-slot:before>
                <text-template
                  label="توضیحات"
                  v-model="value.Base_CommonEstate.Comments"
                  formKey="C85D49C7-E001-4C4F-97B6-EF3678A71583"
                  cdcName="comments"
                  fit
                  :rows="1"
                  :m="m"
                />
            </template>
            <template v-slot:after>
                <safa-grid
                  title="سایر امکانات"
                  v-model="value.Base_OtherEquipment"
                  :columns="otherFacilityColumn"
                  fit
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="ضمائم"
            v-model="value.Base_Attachment"
            :columns="attachedColumn"
            fit
            min-height="150px"
            height="100%"
            max-height="100%"
            :m="m"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    },
    formKey: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      splitterValueHorizontal: 50,
      splitterValueVertical: 50,

      otherFacilityColumn: [
        {
          field: "CI_OtherEquipmentType",
          editor: "combo",
          domain: "Estate",
          title: "نوع سایر امکانات",
          width: ""
        },
        { field: "OtherEquipmentValue", title: "مقدار", width: "" },
        { field: "Comments", title: "توضیحات", width: "" }
      ],
      attachedColumn: [
        {
          field: "CI_AttachmentType",
          editor: "combo",
          domain: "Estate",
          title: "نوع ضمیمه",
          width: ""
        },
        { field: "AttachmentValue", title: "مقدار", width: "" },
        { field: "Comments", title: "توضیحات", width: "" }
      ]
    }
  }
}
</script>
