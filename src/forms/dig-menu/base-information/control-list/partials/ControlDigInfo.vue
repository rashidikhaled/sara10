<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="کد لیست کنترلی"
          label-width="90px"
          v-model="value.BlackList_Info.CI_BlackList"
          cdcName="CI_BlackList"
          :m="m"
          domainName="Dig"
          ciName="CI_BlackList"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="علت ورود"
          label-width="90px"
          v-model="value.BlackList_Info.CI_BlackListCause"
          cdcName="CI_BlackListCause"
          :m="m"
          domainName="Dig"
          ciName="CI_BlackListCause"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد"
          label-width="90px"
          v-model="value.BlackList_Info.BlackListCode"
          cdcName="BlackListCode"
          :m="m"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="عنوان"
          label-width="90px"
          v-model="value.BlackList_Info.BlackListSubject"
          cdcName="BlackListSubject"
          :m="m"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ شروع"
          label-width="90px"
          v-model="value.BlackList_Info.BL_StartDate"
          cdcName="BL_StartDate"
          :m="m"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ انقضا"
          label-width="90px"
          v-model="value.BlackList_Info.ExpireDate"
          cdcName="ExpireDate"
          :m="m"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع درخواست"
          label-width="90px"
          v-model="value.BlackList_Info.CI_DigRequestType"
          cdcName="CI_DigRequestType"
          domainName="Dig"
          ciName="CI_DigRequestType"
          :m="m"
          required
          validations="required"
        />
      </FormControl>
      <FormControl v-if="value.BlackList_Info.CI_BlackList !== 0">
        <safa-combo
          label="منطقه"
          label-width="90px"
          v-model="value.BlackList_Info.Region"
          cdcName="region"
          :options="regionOptions"
          sourceType="local"
          :m="m"
          required
          validations="required"
        />
      </FormControl>
      <text-template
        label="توضیحات"
        label-width="90px"
        v-model="value.BlackList_Info.BL_Comments"
        cdcName="BL_Comments"
        :m="m"
        :rows="1"
        class="col-12"
      />
    </FormRow>

    <safa-grid
      v-if="value.BlackList_Info.CI_BlackList === 0"
      title="مناطق"
      v-model="gridsModel.BlackListRegion"
      :columns="regionColumns"
      :pageSize="25"
      m="e"
      fit
      paginate
    />

    <safa-grid
      v-if="value.BlackList_Info.CI_BlackList === 1"
      title="لیست شرکت عوامل اجرائی"
      v-model="gridsModel.BlackListCompany1"
      :columns="companiesInfoColumns"
      :pageSize="25"
      fit
      paginate
    />

    <safa-splitter
      v-if="value.BlackList_Info.CI_BlackList === 2"
      class="fit"
      margin="0"
      vertical
      v-model="vSplitter"
    >
      <template v-slot:before>
        <fit>
          <safa-grid
            title="لیست توابع"
            v-model="gridsModel.BlackListRedirect"
            :columns="requesterRedirectNameColumns"
            :pageSize="25"
            :getRowStyle="
              ({ data }) => {
                return {
                  background: data.Color,
                };
              }
            "
            fit
            paginate
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="لیست شرکت ها"
            v-model="gridsModel.BlackListCompany2"
            :columns="companiesInfoColumns"
            :pageSize="25"
            fit
            paginate
          />
        </fit>
      </template>
    </safa-splitter>

    <safa-grid
      v-if="value.BlackList_Info.CI_BlackList === 3"
      title="لیست شرکت خدماتی"
      v-model="gridsModel.BlackListPolygon"
      :columns="requesterRedirectNameColumns"
      :pageSize="25"
      :getRowStyle="
        ({ data }) => {
          return {
            background: data.Color,
          };
        }
      "
      fit
      paginate
    />
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    ListCI_Region: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    },
    gridsModel: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    regionOptions () {
      return this.ListCI_Region ?? []
    },
    // lockRegionGrid () {
    //   //   return this.blackList.ListCI_Region ?? []
    //   const isNew = this.blackList.ListCI_Region.some((s) => s.isNew)
    //   if (isNew && this.isEditable) return "e"
    //   return "r"
    //   // return blackList.ListCI_Region.length > 0 ? 'r'
    // }
    regionColumns () {
      return [
        {
          field: "Title",
          title: "منطقه",
          width: "300px",
          editor: "combo",
          source: this.ListCI_Region ?? []
        }
      ]
    }
  },
  data () {
    return {
      vSplitter: 50,
      requesterRedirectName2: [],
      requesterRedirectName: [],

      companiesInfoColumns: [
        {
          field: "isSelectedNode",
          title: "",
          width: "45px",
          filterable: false,
          lockPosition: true,
          pinned: "right",
          editor: "selection"
        },
        {
          field: "Title",
          title: "شرکت",
          width: "300px"
        },
        {
          field: "RegisterCode",
          title: "شماره ثبت",
          width: "150px"
        },
        {
          field: "CompanyName",
          title: "نام شرکت",
          width: "150px"
        },
        {
          field: "ManagerName",
          title: "نام مدیرعامل",
          width: "150px"
        },
        {
          field: "ManagerNatCode",
          title: "کدملی مدیرعامل",
          width: "150px"
        },
        {
          field: "ManagerTel",
          title: "تلفن شرکت",
          width: "150px"
        },
        {
          field: "ManagerMobile",
          title: "همراه مدیرعامل",
          width: "150px"
        }
      ],
      requesterRedirectNameColumns: [
        {
          field: "isSelectedNode",
          title: "",
          width: "45px",
          filterable: false,
          lockPosition: true,
          pinned: "right",
          editor: "selection"
        },
        {
          field: "RedirectName",
          title: "نام تابعه",
          width: "300px"
        },
        {
          field: "Tel",
          title: "تلفن شرکت خدماتی",
          width: "150px"
        },
        {
          field: "RedirectComplaintsTel",
          title: "تلفن رسیدگی به شکایات",
          width: "150px"
        }
      ]
    }
  },
  methods: {
    randColor () {
      return (
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(4, "0")
          .toUpperCase() +
        "2e"
      )
    }
  }
}
</script>
