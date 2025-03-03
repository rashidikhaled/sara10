<template>
    <fit>
      <internal-section title="جزئیات اطلاعات">
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره صورتجلسه تحویل"
              label-width="100px"
              cdcName="TransferMainMinutesNo"
              v-model="value.TransferMain_Info.TransferMainMinutesNo"
              :m="m"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ صورتجلسه تحویل "
              label-width="100px"
              v-model="value.TransferMain_Info.TransferMainMinutesDate"
              :m="m"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ تحویل"
              label-width="100px"
              cdcName="TransferMainDate"
              v-model="value.TransferMain_Info.TransferMainDate"
              :m="m"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره سند"
              label-width="100px"
              cdcName="DocNo"
              v-model="value.TransferMain_Info.DocNo"
              :m="m"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="وضعیت تحویل"
              label-width="100px"
              cdcName="CITransferStatus"
              ciName="CI_TransferStatus"
              domainName="Estate"
              v-model="value.TransferMain_Info.CI_TransferStatus"
              :m="m"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="وضعیت تخریب"
              label-width="100px"
              cdcName="CIDestructionStatus"
              ciName="CI_DestructionStatus"
              domainName="Estate"
              v-model="value.TransferMain_Info.CI_DestructionStatus"
              :m="m"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام بهره برداری موقت"
              label-width="100px"
              cdcName="TmpBeneficName"
              v-model="value.TransferMain_Info.TmpBeneficName"
              :m="m"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="از تاریخ"
              label-width="100px"
              cdcName="TmpBeneficStartDate"
              v-model="value.TransferMain_Info.TmpBeneficStartDate"
              :m="m"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تا تاریخ"
              label-width="100px"
              cdcName="TmpBeneficEndDate"
              v-model="value.TransferMain_Info.TmpBeneficEndDate"
              :m="m"
            />
          </FormControl>
        </FormRow>
      </internal-section>
      <fit>
      <safa-splitter v-model="spModel" vertical fit>
        <template v-slot:before>
        <fit>
          <safa-grid
            v-model="value.TransferMain_Person_1"
            helper="agtransferMainColumnPerson1"
            fit
            cdcName="TransferDoc_Person_2"
            :m="m"
            class="q-mb-sm"
            :deleteRow="false"
            :allowCopy="false"
          />
          </fit>
        </template>
        <template #after>
          <fit>
            <safa-splitter v-model="spModel2" vertical fit>
              <template #before>
              <fit>
                <safa-grid
                  v-model="value.TransferMain_Person_2"
                  helper="agtransferMainColumnPerson2"
                  fit
                  cdcName="TransferDoc_Person_2"
                  :m="m"
                  class="q-mb-sm"
                  :deleteRow="false"
                  :allowCopy="false"
                />
                </fit>
              </template>
              <template #after>
              <fit>
                <safa-grid
                  v-model="value.TransferMain_Item"
                  helper="agTransferMain_ItemColumn"
                  fit
                  cdcName="TransferDoc_Person_2"
                  :m="m"
                  class="q-mb-sm"
                  :deleteRow="false"
                  :allowCopy="false"
                />
                </fit>
              </template>
            </safa-splitter>
          </fit>
        </template>
      </safa-splitter>
      </fit>
    </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: {
      type: String,
      default: "r"
    }
  },
  data () {
    return {
      name: "transferInfo",
      spModel: 30,
      spModel2: 50
      // agtransferMainColumnPerson1: [
      //   {
      //     field: "CI_TransferPersonType",
      //     title: "نوع اشخاص تحویل دهنده",
      //     domain: "Estate",
      //     editor: "combo",
      //     width: "150px"
      //   },
      //   {
      //     field: "Name",
      //     title: "نام",
      //     width: "100px"
      //   },
      //   { field: "AgentName", title: " نام نماینده", width: "200px" },
      //   { field: "Description", title: "توضیحات", width: "300px" }
      // ],
      // agtransferMainColumnPerson2: [
      //   {
      //     field: "CI_TransferPersonType",
      //     title: "نوع اشخاص تحویل گیرنده",
      //     domain: "Estate",
      //     editor: "combo",
      //     width: "150px"
      //   },
      //   {
      //     field: "Name",
      //     title: "نام",
      //     width: "100px"
      //   },
      //   { field: "AgentName", title: " نام نماینده", width: "200px" },
      //   { field: "Description", title: "توضیحات", width: "300px" }
      // ],
      // agTransferMain_ItemColumn: [
      //   {
      //     field: "CI_TransferItemType",
      //     title: "نوع قلم",
      //     width: "150px",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     field: "Cnt",
      //     title: "تعداد",
      //     width: "100px"
      //   },
      //   { field: "Model", title: "مدل", width: "100px" },
      //   { field: "Description", title: "توضیحات", width: "300px" }
      // ]
    }
  }
}
</script>
