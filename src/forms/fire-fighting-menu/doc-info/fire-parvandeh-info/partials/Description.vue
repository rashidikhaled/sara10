<template>
  <fit>
    <!-- <safa-status :result="result" /> -->
    <safa-splitter v-model="splitterModel" vertical class="fit" margin="0">
      <template v-slot:before>
        <fit>
          <safa-grid
            title="ضمائم"
            helper="baseAttachment"
            :m="m"
            fit
            max-height="100%"
            min-height="200px"
            v-model="value.Base_Attachment"
            cdcName="Base_Attachment"
            :suppressRowClickSelection="false"
            :insertNewRowBefore="false"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            :m="m"
            title="نامه ها"
            fit
            max-height="100%"
            :columns="letters"
            min-height="200px"
            v-model="value.Sh_Letter"
            cdcName="Sh_Letter"
            :suppressRowClickSelection="false"
            :insertNewRowBefore="false"
          />
        </fit>
      </template>
    </safa-splitter>
    <div >
      <text-template
        class="col-12 q-mt-sm q-px-sm"
        label="توضیحات"
        :rows="3"
        v-model="value.Base_CommonEstate.Comments"
        cdcName="Comments"
        :m="m"
      />
    </div>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  name: "Description",
  mixins: [baseFormMixin],

  data () {
    return {
      splitterModel: 50,
      letters: [
        {
          field: "CI_LetterType",
          title: "کد نوع نامه",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "225px"
        },
        {
          field: "LetterNo",
          title: "شماره نامه",
          width: "90px"
        },
        {
          field: "LetterDate",
          title: "تاريخ نامه",
          editor: "date",
          width: "122px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "90px"
        },
        {
          field: "DabirkhanehNo",
          title: "شماره ثبت دبیرخانه",
          width: "140px"
        },
        {
          field: "DabirkhanehDate",
          title: "تاريخ ثبت دبیرخانه",
          editor: "date",
          width: "140px"
        },
        {
          field: "LetterHeader",
          title: "عنوان نامه",
          width: "90px"
        },
        {
          field: "LetterSummary",
          title: "خلاصه نامه",
          width: "120px"
        },
        {
          field: "LetterExportRef",
          title: "مرجع صدور نامه",
          width: "120px"
        }
      ]
      // baseAttachment: [
      //   {
      //     field: "CI_AttachmentType",
      //     title: "نوع ضميمه",
      //     domain: "CI_SaraM1",
      //     editor: "combo",
      //     width: "270px",
      //   },
      //   {
      //     field: "AttachmentValue",
      //     title: "مقدار",
      //     editor: "numeric",
      //     width: "80px",
      //   },
      //   {
      //     field: "Comments",
      //     title: "توضيحات",
      //     editor: "text",
      //     width: "300px",
      //   },
      // ],
      // letters: [
      //   {
      //     field: "CI_LetterType",
      //     title: "کد نوع نامه",
      //     editor: "combo",
      //     domain: "CI_SaraM1",
      //     width: "225px",
      //   },
      //   {
      //     field: "LetterNo",
      //     title: "شماره نامه",
      //     width: "77px",
      //   },
      //   {
      //     field: "LetterDate",
      //     title: "تاريخ نامه",
      //     editor: "date",
      //     width: "122px",
      //   },
      //   {
      //     field: "Comments",
      //     title: "توضیحات",
      //     width: "70px",
      //   },
      //   {
      //     field: "DabirkhanehNo",
      //     title: "شماره ثبت دبیرخانه",
      //     width: "120px",
      //   },
      //   {
      //     field: "DabirkhanehDate",
      //     title: "تاريخ ثبت دبیرخانه",
      //     editor: "date",
      //     width: "110px",
      //   },
      //   {
      //     field: "LetterHeader",
      //     title: "عنوان نامه",
      //     width: "90px",
      //   },
      //   {
      //     field: "LetterSummary",
      //     title: "خلاصه نامه",
      //     width: "90px",
      //   },
      //   {
      //     field: "LetterExportRef",
      //     title: "مرجع صدور نامه",
      //     width: "auto",
      //   },
      // ],
    }
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
