<template>
  <fit>
    <safa-splitter v-model="splitterValueHorizontal" class="fit" horizontal>
      <template v-slot:before>
        <fit>
          <safa-splitter v-model="splitterValueVerticalT" class="fit">
            <template v-slot:before>
              <safa-grid
                :columns="broughtColumns"
                title="آورده ها"
                v-model="value.ContractPartnership_Brought_1"
                height="100%"
                min-height="100px"
                ref="ContractPartnership_Brought_1"
                :suppressRowClickSelection="false"
                cdcName="ContractPartnership_Brought_1"
                :m="m"
                :bordered="false"
                fit
              />
            </template>
            <template v-slot:after>
              <fit>
                <safa-grid
                  :columns="partnershipBroughtColumns"
                  title="آورده شریک"
                  v-model="value.ContractPartnership_Brought_2"
                  height="100%"
                  min-height="100px"
                  :suppressRowClickSelection="false"
                  ref="ContractPartnership_Brought_2"
                  cdcName="ContractPartnership_Brought_2"
                  :m="m"
                  :bordered="false"
                  fit
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter v-model="splitterValueVerticalB" class="fit">
            <template v-slot:before>
              <safa-grid
                :columns="contractPartnershipAfterProject_1Columns"
                title="سهم ما بعد از انجام پروژه"
                v-model="value.ContractPartnership_AfterProject_1"
                ref="ContractPartnership_AfterProject_1"
                :suppressRowClickSelection="false"
                height="100%"
                min-height="100px"
                cdcName="ContractPartnership_AfterProject_1"
                :m="m"
                :bordered="false"
                fit
              />
            </template>
            <template v-slot:after>
              <fit>
                <safa-grid
                  :columns="contractPartnershipAfterProject_2Columns"
                  title="سهم شریک بعد از انجام پروژه"
                  :m="m"
                  height="100%"
                  min-height="100px"
                  :suppressRowClickSelection="false"
                  ref="ContractPartnership_AfterProject_2"
                  cdcName="ContractPartnership_AfterProject_2"
                  v-model="value.ContractPartnership_AfterProject_2"
                  :bordered="false"
                  fit
                />
              </fit>
            </template>
          </safa-splitter>
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
      default: () => ({})
    },
    m: String
  },
  data () {
    return {
      name: "PartiesContract",
      ttle: "طرفین قرارداد",
      splitterValueHorizontal: 50,
      splitterValueVerticalT: 50,
      splitterValueVerticalB: 50,
      broughtColumns: [
        {
          field: "CI_BroughtType",
          title: "نوع آورده",
          width: "100px",
          editor: "combo",
          domain: "Estate"
        },
        {
          field: "Price",
          title: "ارزش",
          width: "100px"
        },
        {
          field: "Area",
          title: "مساحت",
          width: "100px"
        },
        {
          field: "TransferDate",
          title: "تاریخ تحویل",
          editor: "date",
          width: "100px"
        },
        {
          field: "LetterNo",
          title: "شماره نامه",
          width: "100px"
        },
        {
          field: "LetterDate",
          title: "تاریخ نامه",
          editor: "date",
          width: "100px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px"
        }
      ],
      partnershipBroughtColumns: [
        {
          field: "CI_BroughtType",
          title: "نوع آورده",
          editor: "combo",
          domain: "Estate",
          width: "100px"
        },
        {
          field: "Price",
          title: "ارزش",
          width: "100px"
        },
        {
          field: "Area",
          title: "مساحت",
          width: "100px"
        },
        {
          field: "TransferDate",
          title: "تاریخ تحویل",
          editor: "date",
          width: "100px"
        },
        {
          field: "LetterNo",
          title: "شماره نامه",
          width: "100px"
        },
        {
          field: "LetterDate",
          title: "تاریخ نامه",
          editor: "date",
          width: "100px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px"
        }
      ],
      contractPartnershipAfterProject_1Columns: [
        {
          field: "CI_ContractPartnershipQuotaType",
          title: "نوع سهم",
          editor: "combo",
          domain: "Estate",
          width: "100px"
        },
        {
          field: "Rate",
          title: "میزان",
          width: "100px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "auto"
        }
      ],
      contractPartnershipAfterProject_2Columns: [
        {
          field: "CI_ContractPartnershipQuotaType",
          title: "نوع سهم",
          editor: "combo",
          domain: "Estate",
          width: "100px"
        },
        {
          field: "Rate",
          title: "میزان",
          width: "100px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "auto"
        }
      ]
    }
  }
}
</script>
