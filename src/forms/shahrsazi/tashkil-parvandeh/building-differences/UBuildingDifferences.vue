<template>
  <safa-form :id="formKey" :caption="title" :padding="false" app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
    <form-wrapper
      :has-footer="false"
      title="مغایرت های ساختمان"
      vertical
      :padding="false"
      :bordered="false"
    >
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetchData"
          m="r"
        />
        <safa-status :result="result" />
      </template>
      <div class="row q-col-gutter-sm q-mb-sm q-pl-sm q-pt-sm">
        <div class="col-12 col-sm-4 col-md-3">
          <safa-combo
            v-model="group1"
            :options="groupItems"
            label="دسته اول"
            :label-shrink="false"
            source-type="local"
            @input="load"
          />
        </div>
        <div class="col-12 col-sm-4 col-md-3">
          <safa-combo
            v-model="group2"
            :options="groupItems"
            label="دسته دوم"
            :label-shrink="false"
            source-type="local"
            @input="load"
          />
        </div>
      </div>
      <safa-tabs v-model="currentTab" height="100%" class="fit">
        <template v-slot:tabs>
          <tab-menu label="کاربری ها" name="baseUsing" />
          <tab-menu label="پیشامدگی ها" name="baseFront" />
          <tab-menu label="مغایریت کاربری ها" name="baseUsingContrast" />
          <tab-menu label="مغایریت پیشامدگی ها" name="baseFrontContrast" />
        </template>
        <tab-content name="baseUsing" title="کاربری ها" :padding="false">
          <tab-base-using v-model="currentData" />
        </tab-content>
        <tab-content name="baseFront" title="پیشامدگی ها" :padding="false">
          <tab-base-front v-model="currentData" />
        </tab-content>
        <tab-content
          name="baseUsingContrast"
          title="مغایرت کاربری ها"
          :padding="false"
        >
          <tab-base-using-contrast v-model="currentData" />
        </tab-content>
        <tab-content
          name="baseFrontContrast"
          title="مغایرت پیش آمدگی ها"
          :padding="false"
        >
          <tab-base-front-contrast v-model="currentData" />
        </tab-content>
      </safa-tabs>
    </form-wrapper>
  </safa-form>
</template>
<script>
import requestModel from "./models/request"
import TabBaseUsing from "./partials/TabBaseUsing"
import TabBaseFront from "./partials/TabBaseFront"
import TabBaseUsingContrast from "./partials/TabBaseUsingContrast"
import TabBaseFrontContrast from "./partials/TabBaseFrontContrast"
import baseFormMixin from "src/mixins/baseFormMixin"
//
export default {
  route: "/parvandeh/building-differences",
  guid: "",

  mixins: [baseFormMixin],
  components: {
    TabBaseUsing,
    TabBaseFront,
    TabBaseUsingContrast,
    TabBaseFrontContrast
  },

  data () {
    return {
      title: "مغایرت های ساختمان",
      formKey: "1A7F6340-925F-47E5-AA52-4778A74918D6",
      name: "UBuildingDifferences",
      main: true,
      loading: false,
      currentTab: "baseUsing",
      result: null,
      currentData: { ...requestModel },
      group1: null,
      group2: null,
      groupItems: [
        { Id: 0, Title: "اطلاعات پرونده" },
        { Id: 1, Title: "بازدید" },
        { Id: 2, Title: "مجاز پروانه" },
        { Id: 3, Title: "مجاز پایانکار" },
        { Id: 4, Title: "کنترل نقشه" },
        { Id: 5, Title: "موافقت اصولی" }
      ],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nidNosaziCode: "00000000-0000-0000-0000-000000000000"
    }
  },

  methods: {
    fetchData (value) {
      debugger
      this.nidNosaziCode = (value && value.MainObj && value.MainObj.NidNosaziCode) || '00000000-0000-0000-0000-000000000000'
    },
    // loadRequestHeader() {
    //   let data = {
    //     pNidProc: this.selectedRequest.NidProc,
    //     pIsLoadDeletedNosaziCode: false,
    //   };
    //   this.showLoading();
    //   this.$services.SA.loadRequestHeader(data, {
    //     config: { District: this.selectedDistrict },
    //   })
    //     .then(({ data }) => {
    //       debugger;
    //       this.result = this.getResponse(data);

    //       if (this.result.success) {
    //         this.nidNosaziCode =
    //           (this.result.data &&
    //             this.result.data.MainObj &&
    //             this.result.data.MainObj.NidNosaziCode) ||
    //           "00000000-0000-0000-0000-000000000000";
    //         this.load();
    //       }
    //     })
    //     .catch((response) => {
    //       this.serverError();
    //     })
    //     .finally(() => {
    //       this.hideLoading();
    //     });
    // },
    async load () {
      if (this.loading || this.group1 == null || this.group2 == null) return
      try {
        this.loading = true
        this.showLoading()

        const { data } = await this.$services.SC.getContrastBuilding(
          {
            config: { District: this.baseNosaziCode.District },
            pNidProc: this.selectedRequest.NidProc,
            pNidNosaziCode: this.nidNosaziCode,
            pEumBaseInfoGroup_OtherGroup1: this.group1,
            pEumBaseInfoGroup_OtherGroup2: this.group2
          },
          { config: { District: this.selectedDistrict } }
        )

        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: this.selectedRequest.BizCode
          })
          return
        }
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
        this.loading = false
      }
    }
  },
  created () {
    this.currentData = { ...requestModel }
    if (this.selectedRequest) {
      this.load()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.$nextTick(() => {
        this.hideSidebar(this.name)
      })
    }
  }
}
</script>
