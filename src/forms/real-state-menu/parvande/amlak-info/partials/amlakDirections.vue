<template>
  <safa-form id="" caption="جهات ملک">
    <fit>
      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-text
            label="کد پستی"
            v-model="PostCode"
            label-width="80px"
            type="number"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="کد اقتصادی"
            v-model="EconomicCode"
            label-width="80px"
            type="number"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="پلاک آبی"
            v-model="Plack"
            label-width="80px"
            type="number"
          ></safa-text>
        </form-control>
      </div>
      <div class="q-mb-sm">
        <div>
          <safa-text
            label="آدرس"
            v-model="MainAddress"
            label-width="80px"
          ></safa-text>
        </div>
      </div>
      <safa-splitter v-model="horizontalSplitterModel" horizontal>
        <template v-slot:before>
          <fit>
            <safa-datatable
              title="شماره شناسایی قدیم"
              fit
              min-height="100px"
              height="100%"
              max-height="100%"
              v-model="oldId"
              helper="oldIdColumns"
              :m="mode"
              :take="20"
              :addRow="false"
              :allowCopy="false"
              :deleteRow="false"
              :isEditable="true"
              class="q-mb-sm"
            />
          </fit>
        </template>

        <template v-slot:after>
          <fit>
            <safa-grid
              title="جهات اربعه"
              fit
              min-height="100px"
              height="100%"
              max-height="100%"
              v-model="fourDirections"
              helper="fourDirectionsColumns"
              :m="mode"
              :take="20"
              :addRow="false"
              :allowCopy="false"
              :deleteRow="false"
              :isEditable="true"
              class="q-mb-sm"
            />
          </fit>
        </template>
        <form-row>
          <form-control>
            <safa-text
              label="نام کاربر ایجاد کننده"
              v-model="RequesterName"
              label-width="100px"
            ></safa-text>
          </form-control>

          <form-control>
            <safa-datepicker
              label="تاریخ ایجاد"
              v-model="creationDate"
              label-width="80px"
            ></safa-datepicker>
          </form-control>
        </form-row>
      </safa-splitter>
    </fit>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "amlakDirections",
      PostCode: "",
      EconomicCode: "",
      Plack: "",
      MainAddress: "",
      RequesterName: "",
      creationDate: "",
      horizontalSplitterModel: 50,

      oldId: [],
      // oldIdColumns: [
      // { field: "PreDistrick", title: "کد قدیم منطقه"  },
      // { field: "PreRegion", title: "کد قدیم حوزه" },
      // { field: "PreBlock", title: "کد قدیم بلوک" },
      // { field: "PreHouse", title: "کد قدیم ملک" },
      // { field: "PreSub1", title: "کد قدیم فرعی1" },
      // { field: "PreSub2", title: "کد قدیم فرعی2" },
      // { field: "FileIdMother", title: "شماره شناسایی پرونده مادر" ,width:"120px"},
      // ],

      fourDirections: []
      // fourDirectionsColumns: [
      //   {
      //     field: "CI_PathType",
      //     title: "نوع معبر",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_SideCode",
      //     title: "جهت معبر",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   { field: "PathName", title: "نام معبر" },
      //   { field: "availableBarLen", title: "اضلاع و جهات نسبی موجود" },
      //   { field: "EdgeBarCurrent", title: "طول بر موجود" },
      //   { field: "EdgeLenCurrent", title: "طول ضلع موجود" },
      //   { field: "PathWidth", title: "عرض معبر" },
      //   { field: "EdgeAndSideDoc", title: "اضلاع و جهات نسبی سند" },
      //   { field: "EdgeLenDoc", title: "طول ضلع طبق سند" },
      //   { field: "EdgeBarDoc", title: "طول بر طبق سند" },
      //   { field: "PathRadifInBlock", title: "معبر در بلوک دارایی" },
      //   { field: "Depth1", title: "مساحت عمق اول" },
      //   { field: "Depth2", title: "مساحت عمق دوم" },
      //   { field: "Depth3", title: "مساحت پشت جبهه" },
      //   { field: "AfterEditSideLen", title: "طول ضلع پس از رعایت بر اصلاحی" },
      //   { field: "AfterEditBarLen", title: "طول بر پس از رعایت بر اصلاحی" },
      //   { field: "Remain", title: "باقیمانده" },
      //   { field: "GoFrontLenAllow", title: "طول مجاز پیشروی ملک" },
      //   { field: "DesignLen", title: "طول طراحی شده ملک" },
      //   { field: "GoFrontLenOther", title: "طول پیشروی مجاورین" },
      //   { field: "AddLen", title: "اضافه" },
      //   { field: "BackwardLen", title: "طول عقب نشینی" },
      //   { field: "RemainSideLen", title: "طول ضلع باقیمانده" },
      //   { field: "RemainBarLen", title: "طول بر باقیمانده" },
      //   { field: "AfterEditWidth", title: "عرض گذراصلاحی" },
      //   { field: "Comments", title: "توضیحات" },
      // ],
    }
  }
}
</script>
