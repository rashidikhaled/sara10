<template>
  <fit>
    <!-- <safa-splitter
      v-model="spliterModel"
      vertical
      class="fit"
    > -->
      <!-- <template v-slot:before>
        <safa-grid
          height="100%"
          max-height="100%"
          fit
          :columns="columns"
          m="r"
          :allowMultipleSelection="false"
          title="پیش آگهی"
          class="q-mb-sm"
          v-model="dataModel.ClsRequest_Notice.Result_Request_Notice"
          cdcName="Request_Notice"
          :suppressRowClickSelection="false"
        />
      </template> -->
      <safa-splitter
          v-model="spliterModel"
          horizontal
          class="fit"
          margin="0"
        >
      <template v-slot:before>
          <!-- <template v-slot:before> -->
            <safa-grid
              height="100%"
              max-height="100%"
              fit
              :columns="ProclamationHistory"
              m="r"
              :allowMultipleSelection="false"
              @row:click="selectRow"
              title="سوابق ابلاغیه"
              v-model="dataModel.ClsProclamation.CommissionProclamationList"
              cdcName="ProclamationList"
              :suppressRowClickSelection="false"
              :getRowStyle="getRowStyle"
              ref="ProclamationListGrid"
            />
          </template>
          <template v-slot:after>
            <safa-grid
              min-height="100%"
              height="100%"
              max-height="100%"
              fit
              helper="AvarezDetails"
              m="r"
              :allowMultipleSelection="false"
              title="جزئیات عوارض"
              class="q-mb-sm"
              v-model="dataModel.Duty_FicheByFicheNo"
              @DetailsClick="onShowAvarezDetailsInfo"
              cdcName="Duty_FicheByFicheNo"
              :suppressRowClickSelection="false"
            />
          </template>
        </safa-splitter>
    <!-- </safa-splitter> -->
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "سوابق",
      name: "History",
      dutyFicheOtherFiled: [],
      spliterModel: 50,
      ProclamationHistory: [
        {
          field: "CreateDate",
          title: "تاریخ ایجاد",
          width: "80px"
        },
        {
          field: "ProclamationNo",
          title: "شماره ابلاغیه",
          width: "120px"
        },
        {
          field: "ProclamationDate",
          title: "تاریخ ابلاغیه",
          width: "100px",
          editor: "date"
        },
        {
          field: "HoldingDate",
          title: "تاریخ برگزاری",
          width: "100px",
          editor: "date"
        },
        {
          field: "CI_ProclamationType",
          title: "نوع ابلاغیه",
          editor: "combo",
          domain: "Commission77",
          width: "140px"
        },
        {
          field: "CI_DeliveryType",
          title: "نحوه تحویل",
          editor: "combo",
          domain: "Commission77",
          width: "100px"
        },
        {
          field: "CI_Destination",
          title: "دریافت کننده",
          editor: "combo",
          domain: "Commission77",
          width: "120px"
        },
        {
          field: "CI_ProclamationAgent",
          title: "مامور ابلاغ",
          editor: "combo",
          domain: "Commission77",
          width: "120px"
        },
        {
          field: "AgentName",
          title: "نام مامور ابلاغ",
          width: "150px"
        },
        {
          field: "AgentNationalCode",
          title: "کد ملی مامور ابلاغ",
          width: "150px"
        },
        {
          field: "DestinationName",
          title: "نام دریافت کننده",
          width: "150px"
        },
        {
          field: "DestinationNationalCode",
          title: "کد ملی دریافت کننده",
          width: "150px"
        },
        {
          field: "DestinationMobile",
          title: "شماره همراه دریافت کننده",
          width: "170px"
        },
        {
          field: "CreatorUserName",
          title: "ایجاد کننده",
          width: "100px"
        },
        {
          field: "CancelDate",
          title: "تاریخ ابطال",
          width: "100px",
          editor: "date"
        },
        {
          field: "HoldingDate",
          title: "تاریخ برگزاری کمیسیون",
          width: "170px"
        },
        {
          field: "HoldingTime",
          title: "زمان برگزاری کمیسیون",
          width: "150px",
          editor: "date"
        }

      ],
      columns: [
        {
          field: "NoticeNo",
          title: "شماره پیش آگهی"
        },
        {
          field: "NoticeDate",
          title: "تاریخ پیش آگهی",
          editor: "date"
        },
        {
          field: "DeadlineDate",
          title: "مهلت اخطار به روز"
        },
        {
          field: "DescNotice",
          title: "توضیحات"
        }
      ]
    }
  },
  props: {
    dataModel: Object,
    m: String,
    showFormActions: Boolean
  },
  methods: {
    getRowStyle ({ data }) {
      if (!data) return
      if (data.IsCancel) {
        return {
          backgroundColor: "#f69697"
        }
      }
    },
    selectRow (row) {
      this.$emit("getAllOtherRequestInfo", row.data.NidRequest)
    },
    onShowAvarezDetailsInfo ({ dataItem }) {
      this.$emit("onShowAvarezDetailsInfo", dataItem)
    }
  }
}
</script>
