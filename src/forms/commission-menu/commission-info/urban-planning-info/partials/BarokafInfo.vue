<template>
  <fit>
    <safa-grid
      helper="baseEdgeParvandeh"
      title="جهات اربعه"
      v-model="model.Base_Edge"
      cdcName="Base_Edge"
      fit
      height="100%"
      min-height="200px"
      max-height="100%"
      m="r"
    />
    <FormRow>
      <text-template
        class="q-ma-sm"
        label="توضیحات بروکف"
        label-width="90px"
        m="r"
        :rows="3"
        v-model="model.Base_CommonEstate.DocComments"
        cdcName="DocComments"
      />
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    model: Object,
    default: () => {}
  },
  data () {
    return {
      name: "BarokafInfo"
      // columns: [
      //   {
      //     field: "CI_SideCode",
      //     title: "جهت معبر",
      //     domain: "CI_SaraM1",
      //     editor: "combo",
      //     width: "124px",
      //   },
      //   {
      //     field: "CI_PathType",
      //     title: "نوع معبر / حدود",
      //     domain: "CI_SaraM1",
      //     editor: "combo",
      //     width: "160px",
      //   },
      //   {
      //     field: "EdgeLenDoc",
      //     title: "طول ضلع طبق سند یا تعهد ابعاد",
      //     width: "175px",
      //   },
      //   {
      //     field: "EdgeBarDoc",
      //     title: "طول بر طبق سند",
      //     width: "115px",
      //   },
      //   {
      //     field: "EdgeLenCurrent",
      //     title: "طول ضلع موجود",
      //     width: "115px",
      //   },
      //   {
      //     field: "EdgeBarCurrent",
      //     title: "طول بر موجود",
      //     width: "86px",
      //   },
      //   {
      //     field: "PathWidth",
      //     title: "عرض معبر",
      //     width: "80px",
      //   },
      //   {
      //     field: "AfterEditSideLen",
      //     title: "طول ضلع پس از رعايت بر اصلاحی",
      //     width: "185px",
      //   },
      //   {
      //     field: "AfterEditBarLen",
      //     title: "طول بر پس از رعايت بر اصلاحی",
      //     width: "200px",
      //   },
      //   {
      //     field: "AfterEditWidth",
      //     title: "عرض گذر اصلاحی",
      //     width: "112px",
      //   },
      //   {
      //     field: "BarLenEffective",
      //     title: "طول بر موثر",
      //     width: "77px",
      //   },
      //   {
      //     field: "PathName",
      //     title: "نام معبر",
      //     width: "72px",
      //   },
      //   {
      //     field: "EdgeAndSideCurrent",
      //     title: "اضلاع و جهات نسبي موجود",
      //     width: "153px",
      //   },
      //   {
      //     field: "EdgeAndSideDoc",
      //     title: "اضلاع و جهات نسبي سند",
      //     width: "147px",
      //   },

      //   {
      //     field: "Depth1",
      //     title: "مساحت عمق اول",
      //     width: "103px",
      //     cell: "grid-area-format",
      //   },
      //   {
      //     field: "Depth2",
      //     title: "مساحت عمق دوم",
      //     width: "106px",
      //     cell: "grid-area-format",
      //   },
      //   {
      //     field: "Depth3",
      //     title: "مساحت پشت جبهه",
      //     width: "133px",
      //     cell: "grid-area-format",
      //   },
      //   {
      //     field: "GoFrontLenAllow",
      //     title: "طول مجاز پيشروی ملک",
      //     width: "130px",
      //   },
      //   {
      //     field: "DesignLen",
      //     title: "طول طراحی شده ملک",
      //     width: "130px",
      //   },
      //   {
      //     field: "GoFrontLen",
      //     title: "طول موجود پیشروی ملک",
      //     width: "135px",
      //   },
      //   {
      //     field: "ActDate",
      //     title: "تاریخ اثر",
      //     editor: "date",
      //     width: "120px",
      //   },
      //   {
      //     field: "Comments",
      //     title: "توضيحات",
      //     width: "130px",
      //   },

      //   {
      //     field: "CI_ValBlockFord",
      //     title: "معبر در بلوک دارایی",
      //     domain: "CI_SaraM1",
      //     editor: "combo",
      //     width: "113px",
      //   },

      //   {
      //     field: "ValBlockRowNo",
      //     title: "ردیف بلوک ارزشی",
      //     width: "100px",
      //   },
      //   {
      //     field: "CI_Moshrefiat",
      //     title: "مشرفیت",
      //     domain: "CI_SaraM1",
      //     editor: "combo",
      //     width: "128px",
      //   },
      //   {
      //     field: "CI_ViewCode",
      //     title: "نوع نما",
      //     domain: "CI_SaraM1",
      //     editor: "combo",
      //     width: "116px",
      //   },
      //   {
      //     field: "CI_Privacy",
      //     title: "حریم",
      //     domain: "CI_SaraM1",
      //     editor: "combo",
      //     width: "119px",
      //   },
      //   {
      //     field: "SideWalkWidth",
      //     title: "عرض پیاده رو",
      //     width: "81px",
      //   },
      //   {
      //     field: "RegisterPlack",
      //     title: "پلاک ثبتی",
      //     width: "72px",
      //   },
      //   {
      //     field: "EntranceWith",
      //     title: "عرض معبر ورودی",
      //     width: "117px",
      //   },
      //   {
      //     field: "BackwardLen",
      //     title: "طول عقب نشينی",
      //     width: "100px",
      //   },
      //   {
      //     field: "RemainSideLen",
      //     title: "طول ضلع باقيمانده",
      //     width: "100px",
      //   },
      // ],
    }
  }
}
</script>
