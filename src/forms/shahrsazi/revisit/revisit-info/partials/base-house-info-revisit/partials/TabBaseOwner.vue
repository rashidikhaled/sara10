<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      class="fit"
      horizontal
      margin="0"
      style="min-height:250px"
    >
      <template v-slot:before>
        <fit>
          <safa-grid
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            :CopyWithCount="true"
            :allowCopy="true"
            :bordered="false"
            :m="m"
            :columns="ownercolumns"
            fit
            height="100%"
            max-height="100%"
            title="مالکین"
          />
          <q-separator/>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator/>
          <!-- helper="agBaseEdge" -->
          <safa-grid
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            :bordered="false"
            :m="m"
            fit
            height="100%"
            :columns="getBasejahatArbayecolumns"
            max-height="100%"
            title="جهات اربعه"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseOwner',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    },
    isMamoorBazdid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getBasejahatArbayecolumns () {
      if (this.isMamoorBazdid) {
        return this.jahatArbaye.map(x => {
          const r = { ...x }
          if (r.lockForMamoorBazdid) {
            r.isEditable = false
          } else {
            r.isEditable = true
          }
          return r
        })
      } else {
        return this.jahatArbaye
      }
    }
  },
  data () {
    return {
      horizontalSplitter: 50,
      jahatArbaye: [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          "field": "CI_SideCode",
          "title": "جهت معبر",
          "editor": "ci",
          "domain": "CI_SaraM1",
          "width": 125,
          lockForMamoorBazdid: true
        },
        {
          "field": "CI_PathType",
          "title": "نوع معبر/حدود",
          "editor": "ci",
          "domain": "CI_SaraM1",
          "width": 240,
          lockForMamoorBazdid: true

        },
        {
          "field": "EdgeLenDoc",
          "title": "طول ضلع طبق سند یا تعهد ابعاد",
          "width": 240,
          "editor": "decimal ",
          lockForMamoorBazdid: true

        },
        {
          "field": "EdgeBarDoc",
          "title": "طول بر طبق سند",
          "width": 180,
          "editor": "decimal ",
          lockForMamoorBazdid: true
        },
        {
          "field": "PathWidthDoc",
          "title": "عرض معبر طبق سند",
          "width": 125,
          lockForMamoorBazdid: true
        },
        {
          "field": "EdgeLenCurrent",
          "title": "طول ضلع موجود",
          "width": 160,
          "editor": "decimal ",
          lockForMamoorBazdid: true

        },
        {
          "field": "EdgeBarCurrent",
          "title": "طول بر موجود",
          "width": 160,
          "editor": "decimal ",
          lockForMamoorBazdid: true
        },
        {
          "field": "PathWidth",
          "title": "عرض معبر",
          "width": 160,
          lockForMamoorBazdid: true

        },
        {
          "field": "AfterEditSideLen",
          "title": "طول ضلع پس از رعايت بر اصلاحی",
          "width": 250,
          "editor": "decimal ",
          lockForMamoorBazdid: true

        },
        {
          "field": "AfterEditWidth",
          "title": "عرض گذر اصلاحی",
          "width": 160,
          lockForMamoorBazdid: true
        },
        {
          "field": "BarLenEffective",
          "title": "طول بر موثر",
          "width": 160,
          "editor": "decimal "
        },
        {
          "field": "PathName",
          "title": "نام معبر",
          "width": 160
        },
        {
          "field": "EdgeAndSideCurrent",
          "title": "اضلاع و جهات نسبي موجود",
          "width": 215
        },
        {
          "field": "EdgeAndSideDoc",
          "title": "اضلاع و جهات نسبي سند",
          "width": 215
        },
        {
          "field": "Depth1",
          "title": "مساحت عمق اول",
          "width": 160,
          "editor": "numeric"
        },
        {
          "field": "Depth2",
          "title": "مساحت عمق دوم",
          "width": 160,
          "editor": "numeric"
        },
        {
          "field": "Depth3",
          "title": "مساحت پشت جبهه",
          "width": 175,
          "editor": "numeric"
        },
        {
          "field": "GoFrontLenAllow",
          "title": "طول مجاز پيشروی ملک",
          "width": 200
        },
        {
          "field": "DesignLen",
          "title": "طول طراحی شده ملک",
          "width": 200
        },
        {
          "field": "GoFrontLen",
          "title": "طول موجود پیشروی ملک",
          "width": 200
        },
        {
          "field": "ActDate",
          "title": "تاریخ اثر",
          "editor": "date",
          "width": 175
        },
        {
          "field": "Comments",
          "title": "توضیحات",
          "width": 200
        },
        {
          "field": "CI_ValBlockFord",
          "title": "معبر در بلوک دارایی",
          "domain": "CI_SaraM1",
          "editor": "ci",
          "width": 215
        },
        {
          "field": "ValBlockRowNo",
          "title": "ردیف بلوک ارزشی",
          "width": 160,
          "editor": "decimal "
        },
        {
          "field": "CI_Moshrefiat",
          "title": "مشرفیت",
          "domain": "CI_SaraM1",
          "editor": "ci",
          "width": 175
        },
        {
          "field": "CI_ViewCode",
          "title": "نوع نما",
          "domain": "CI_SaraM1",
          "editor": "ci",
          "width": 200
        },
        {
          "field": "CI_Privacy",
          "title": "حریم",
          "domain": "CI_SaraM1",
          "editor": "ci",
          "width": 175
        },
        {
          "field": "SideWalkWidth",
          "title": "عرض پیاده رو",
          "width": 175,
          lockForMamoorBazdid: true

        },
        {
          "field": "RegisterPlack",
          "title": "پلاک ثبتی",
          "width": 175
        },
        {
          "field": "EntranceWith",
          "title": "عرض معبر ورودی",
          "width": 175,
          lockForMamoorBazdid: true
        },
        {
          "field": "BackwardLen",
          "title": "طول عقب نشينی",
          "width": 175
        },
        {
          "field": "RemainSideLen",
          "title": "طول ضلع باقيمانده",
          "width": 170,
          lockForMamoorBazdid: true
        }
      ],
      ownercolumns: [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          "field": "EumOwnerCharacter",
          "title": "شخصیت",
          "editor": "combo",
          "source": [
            {
              "ID": 1,
              "Title": "حقیقی"
            },
            {
              "ID": 2,
              "Title": "حقوقی"
            }
          ],
          "width": "116px"
        },
        {
          "field": "OwnerLastName",
          "title": "نام خانوادگی/شخصیت حقوقی",
          "width": 240
        },
        {
          "field": "OwnerName",
          "title": "نام مالک",
          "width": 110
        },
        {
          "field": "NationalCode",
          "title": "کد ملی/کد اقتصادی",
          "width": 170
        },
        {
          "field": "DateCheckSabt",
          "title": "تاریخ استعلام ثبت احوال",
          "width": 200,
          "editor": "date",
          "editable": false
        },
        {
          "field": "OwnerFatherName",
          "title": "نام پدر /کد سازمانی",
          "width": 135
        },
        {
          "field": "IDCardNo",
          "title": "شماره شناسنامه/شماره ثبت",
          "width": 210,
          "params": {
            "pattern": [
              "[0-9]",
              "فقط عدد قابل قبول میباشد"
            ],
            "type": "numeric"
          }
        },
        {
          "field": "Telephone",
          "title": "تلفن",
          "params": {
            "pattern": [
              "[0-9]",
              "فقط عدد قابل قبول میباشد"
            ],
            "type": "numeric"
          },
          "width": 120
        },
        {
          "field": "ToftImpart",
          "title": "سهم عرصه",
          "editor": "numeric",
          "width": 125
        },
        {
          "field": "ToftDang",
          "title": "دانگ عرصه",
          "editor": "numeric",
          "width": 125
        },
        {
          "field": "ToftHabeh",
          "title": "حبه عرصه",
          "editor": "numeric",
          "width": 125
        },
        {
          "field": "AyanImpart",
          "title": "سهم اعیان",
          "editor": "numeric",
          "width": 125
        },
        {
          "field": "AyanDang",
          "title": "دانگ اعیان",
          "editor": "numeric",
          "width": 125
        },
        {
          "field": "AyanHabeh",
          "title": "حبه اعیان",
          "editor": "numeric",
          "width": 125
        },
        {
          "field": "Address",
          "title": "آدرس",
          "width": 200
        },
        {
          "field": "EconomicID",
          "title": " شناسه ملی",
          "width": 125,
          "editor": "numeric"
        },
        {
          "field": "EmissionPlace",
          "title": "محل صدور/محل ثبت",
          "width": 190
        },
        {
          "field": "ToftTotalImpart",
          "title": "سهم کل از عرصه",
          "width": 150,
          "editor": "numeric"
        },
        {
          "field": "AyanTotalImpart",
          "title": " سهم کل از اعیان",
          "width": 150,
          "editor": "numeric"
        },
        {
          "field": "CellPhone",
          "title": "شماره تلفن همراه",
          "params": {
            "pattern": [
              "[0-9]",
              "فقط عدد قابل قبول میباشد"
            ],
            "type": "numeric"
          },
          "width": 180
        },
        {
          "field": "DocNo",
          "title": "شماره سند",
          "width": 125,
          "editor": "numeric"
        },
        {
          "field": "ActDate",
          "title": "تاریخ اثر",
          "editor": "date",
          "width": 140
        },
        {
          "field": "BirthDate",
          "title": "تاریخ تولد مالک",
          "editor": "date",
          "width": 155
        },
        {
          "field": "BuildingNo",
          "title": "شماره ساختمان",
          "editor": "numeric",
          "width": 155
        },
        {
          "field": "PostCode",
          "title": "کد پستی",
          "width": 155,
          "editor": "numeric"
        },
        {
          "field": "Comments",
          "title": "توضیحات",
          "width": 200
        }
      ]
    }
  }
}
</script>
