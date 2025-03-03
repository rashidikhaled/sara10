<template>
  <fit>
    <FormRow class="q-ma-sm">
      <FormControl>
        <safa-text
          label="میدان/محله/شهرک مجتمع/بازار/پاساژ"
          label-width="90px"
          v-model="value.Base_AddressInfo.Sector"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان اصلی"
          label-width="90px"
          v-model="value.Base_AddressInfo.MainAddress"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان فرعی"
          label-width="90px"
          v-model="value.Base_AddressInfo.SubAddress"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کوچه"
          label-width="90px"
          v-model="value.Base_AddressInfo.Alley"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک آبی"
          label-width="90px"
          v-model="value.Base_AddressInfo.Plack"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد پستی"
          label-width="90px"
          v-model="value.Base_AddressInfo.PostCode"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد اقتصادی"
          label-width="90px"
          v-model="value.Base_AddressInfo.EconomicCode"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="horizontalSplitterModel" horizontal>
      <template v-slot:before>
        <safa-splitter v-model="VerticalSplitterModel" vertical>
          <template v-slot:before>
            <fit>
              <safa-grid
                title="شماره شناسایی قدیم"
                v-model="value.Base_PreCodeInfo"
                :columns="oldIdentifierNumColumn"
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
          <template v-slot:after>
            <fit>
              <safa-grid
                title="شماره شناسایی پرونده"
                v-model="value.Base_File"
                :columns="fileIdentifierNumColumn"
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
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="جهات اربعه"
            v-model="value.Base_Edge"
            :columns="quadrupleDirectionsColumn"
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
    }
  },

  data () {
    return {
      VerticalSplitterModel: 50,
      horizontalSplitterModel: 50,
      oldIdentifierNumColumn: [
        { field: "PreDistrick", title: "کد قدیم منطقه", width: "" },
        { field: "PreRegion", title: "کد قدیم حوزه", width: "" },
        { field: "PreBlock", title: "کد قدیم بلوک", width: "" },
        { field: "PreHouse", title: "کد قدیم ملک", width: "" },
        { field: "PreSub1", title: "کد قدیم فرعی 1", width: "" },
        { field: "PreSub2", title: "کد قدیم فرعی 2", width: "" }
      ],
      fileIdentifierNumColumn: [
        { field: "FileIdMother", title: "شماره شناسایی پرونده مادر", width: "" }
      ],
      quadrupleDirectionsColumn: [
        {
          field: "CI_PathType",
          editor: "combo",
          domain: "Estate",
          title: "نوع معبر",
          width: ""
        },
        {
          field: "CI_SideCode",
          editor: "combo",
          domain: "Estate",
          title: "جهت معبر",
          width: ""
        },
        { field: "PathName", title: "نام معبر", width: "" },
        {
          field: "EdgeAndSideCurrent",
          title: "اضلاع و جهات نسبی موجود",
          width: ""
        },
        { field: "EdgeBarCurrent", title: "طول بر موجود", width: "" },
        { field: "EdgeLenCurrent", title: "طول ضلع موجود", width: "" },
        { field: "PathWidth", title: "عرض معبر", width: "" },
        { field: "EdgeAndSideDoc", title: "اضلاع و جهات نسبی سند", width: "" },
        { field: "EdgeLenDoc", title: "طول ضلع طبق سند", width: "" },
        { field: "EdgeBarDoc", title: "طول بر طبق سند", width: "" },
        { field: "PathRadifInBlock", title: "معبر در بلوک دارایی", width: "" },
        { field: "Depth1", title: "مساحت عمق اول", width: "" },
        { field: "Depth2", title: "مساحت عمق دوم", width: "" },
        { field: "Depth3", title: "مساحت پشت جبهه", width: "" },
        {
          field: "AfterEditSideLen",
          title: "طول ضلع پس از رعایت بر اصلاحی",
          width: ""
        },
        {
          field: "AfterEditBarLen",
          title: "طول بر پس از رعایت بر اصلاحی",
          width: ""
        },
        { field: "Remain", title: "باقیمانده", width: "" },
        { field: "GoFrontLenAllow", title: "طول مجاز پیشروی ملک", width: "" },
        { field: "DesignLen", title: "طول طراحی شده ملک ", width: "" },
        { field: "GoFrontLenOther", title: "طول پیشروی مجاورین", width: "" },
        { field: "AddLen", title: "اضافه", width: "" },
        { field: "BackwardLen", title: "طول عقب نشینی", width: "" },
        { field: "RemainSideLen", title: "طول ضلع باقیمانده", width: "" },
        { field: "RemainBarLen", title: "طول بر باقیمانده", width: "" },
        { field: "AfterEditWidth", title: "عرض گذر اصلاحی", width: "" },
        { field: "Comments", title: "توضیحات", width: "" }
      ]
    }
  }
}
</script>
