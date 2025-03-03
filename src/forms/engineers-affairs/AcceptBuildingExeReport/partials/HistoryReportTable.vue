<template>
  <safa-form
    :id="formKey"
    appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="loadObjRes" />
      </template>
      <fit>
        <FormRow>
          <FormControl>
            <!-- <safa-securityPanel
              id="43f1445c-526d-4a47-9d34-bf2556983a22"
              caption="جهت صدور"
            > -->
            <safa-combo
              label="جهت صدور"
              label-width="80px"
              ciName="CI_BuildingExecRep_FormOperation_Cause"
              domainName="engineer"
              v-model="model.CI_BuildingExecRep_FormOperation_Cause"
            />
          </FormControl>
        </FormRow>
        <fit>
          <safa-grid
            v-model="listGrid"
            :columns="columns"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            class="q-my-sm"
            m="r"
          />
        </fit>
        <FormRow :lg="3" :xl="3" :md="3" :sm="2">
          <FormControl>
            <safa-text
              label="تعداد واحد پارکینگ مورد نیاز :"
              label-width="150px"
              v-model="model.RequiredParkingCount"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تعداد واحد پارکینگ تامین شده :"
              label-width="150px"
              v-model="model.SuppliedParkingCount"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="محل تامین پارکینگ :"
              label-width="150px"
              v-model="model.SuppliedParkingLocation"
            />
          </FormControl>
          <FormControl>
            <div class="q-gutter-md flex">
              <div>آیا درصد طول مجاز رعایت شده است؟</div>
              <safa-radio
                label="بلی"
                :val="true"
                v-model="model.IsObservedAllowedLength"
              />
              <safa-radio
                label="خیر"
                :val="false"
                v-model="model.IsObservedAllowedLength"
              />
            </div>
          </FormControl>
          <FormControl>
            <div class="q-gutter-md flex">
              <div>آیا نماهای جانبی انجام شده است؟</div>
              <safa-radio
                label="بلی"
                :val="true"
                v-model="model.IsObservedNeighbourView"
              />
              <safa-radio
                label="خیر"
                :val="false"
                v-model="model.IsObservedNeighbourView"
              />
            </div>
          </FormControl>
        </FormRow>
        <div class="row q-mt-sm">
          <div class="q-gutter-md flex">
            <div>
              آیین نامه 2800 زلزله و مقررات ملی ساختمان در حیطه وظایف اینجانب در
              احداث این بنا رعایت
            </div>
            <safa-radio
              label="گردیده است"
              :val="true"
              v-model="model.IsObservedRule"
            />
            <safa-radio
              label="نگردیده است"
              :val="false"
              v-model="model.IsObservedRule"
            />
          </div>
        </div>
        <div class="q-my-sm">
          <text-template
            label="متن گزارش"
            :rows="3"
            label-width="80px"
            v-model="model.Comments"
          />
        </div>
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    selectedItem2: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  components: {},
  data () {
    return {
      title: "گزارشات جدولی",
      formKey: "7cfea8ad-9da1-4ef9-9d80-225e3cabfee1",
      name: "UOperationBuildingForm",
      main: true,

      // variables
      listGrid: [],
      loadObjRes: null,
      model: {
        CI_BuildingExecRep_FormOperation_Cause: 0,
        RequiredParkingCount: 0,
        SuppliedParkingCount: 0,
        SuppliedParkingLocation: 0,
        IsObservedAllowedLength: false,
        IsObservedNeighbourView: false,
        IsObservedRule: false,
        Comments: ""
      },
      columns: [
        {
          field: "FloorNo",
          title: "طبقات",
          width: "150px"
        },
        {
          field: "AllowedArea",
          title: "مساحت مجاز (متر مربع)",
          width: "150px"
        },
        {
          field: "ExecutedArea",
          title: "مساحت اجرا شده (مترمربع)",
          width: "150px"
        },
        {
          field: "DiffArea",
          title: "اختلاف مساحت (مترمربع)",
          width: "150px"
        },
        {
          field: "CI_UsingType_Allowed",
          title: "نوع استفاده مجاز",
          width: "150px",
          editor: "combo",
          ciName: "CI_UsingType",
          domain: "engineer",
          editable: false
        },
        {
          field: "CI_UsingType_Executed",
          title: "نوع استفاده اجرا شده",
          width: "150px",
          editor: "combo",
          ciName: "CI_UsingType",
          domain: "engineer"
        },
        {
          field: "Height_Allowed",
          title: "ارتفاع مجاز",
          width: "150px",
          editable: false
        },
        {
          field: "Height_Executed",
          title: "ارتفاع اجرا شده",
          width: "150px"
        },
        {
          field: "UnitCount_Allowed",
          title: "تعداد واحد مجاز",
          width: "150px",
          editable: false
        },
        {
          field: "UnitCount_Executed",
          title: "تعداد واحد اجرا شده",
          width: "150px"
        }
      ],
      nidBuildingExecRep: "00000000-0000-0000-0000-000000000000"
    }
  },

  created () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.engineers
        .getBuildingReportFormOperation({
          pNIdBuildingExecRep: this.selectedItem2.NIdBuildingExecRep
        })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.listGrid =
              this.loadObjRes.data?.GetBuildingReport_FormOperationResult.BuildingExecRep_FormOperation_Floors_Main
            this.model =
              this.loadObjRes.data?.GetBuildingReport_FormOperationResult.BuildingExecRep_FormOperation_Main
            this.log({
              action: this.logActions.view,
              bizCode: this.selectedItem2.NIdBuildingExecRep,
              bizCodeTitle: "NIdBuildingExecRep"
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
