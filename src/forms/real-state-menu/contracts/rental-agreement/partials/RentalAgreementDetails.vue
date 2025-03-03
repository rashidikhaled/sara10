<template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            v-model="value.ContractRent_Info.ContractRentNo"
            cdcName="ContractRentNo"
            label="شماره قرارداد اجاره/استیجاره"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="value.ContractRent_Info.ContractRentDate"
            cdcName="ContractRentDate"
            label="تاریخ قراداد اجاره/استیجاره"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="value.ContractRent_Info.CI_ContractRentSubject"
            cdcName="CI_ContractRentSubject"
            ciName="CI_ContractRentSubject"
            domain-name="Estate"
            label="موضوع قرارد اجاره/استیجاره"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            v-model="value.ContractRent_Info.IsDraftContract"
            cdcName="IsDraftContract"
            label="قرارداد پیش نویس می باشد"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            v-model="value.ContractRent_Info.IsDocumentContract"
            cdcName="IsDocumentContract"
            label="قرارداد از نوع سند می باشد"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ContractRent_Info.CalcRenterDebPrice"
            cdcName="CalcRenterDebPrice"
            label="مبلغ کل"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ContractRent_Info.DocNo"
            cdcName="DocNo"
            label="شماره تنظیم سند"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="value.ContractRent_Info.DocDate"
            cdcName="DocDate"
            label="تاریخ تنظیم سند"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ContractRent_Info.BureauNo"
            cdcName="BureauNo"
            label="شماره دفترخانه"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="value.ContractRent_Info.ContractStartDate"
            cdcName="ContractStartDate"
            label="تاریخ شروع قرارداد"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="value.ContractRent_Info.ContractEndDate"
            cdcName="ContractEndDate"
            label="تاریخ پایان قرارداد"
            label-width="100px"
            :m="m"
          />
        </FormControl>
      </FormRow>
      <safa-notice
        >منظور از شماره سند عرصه و تاریخ تنظیم سند همان شماره سند انتقالی به نام شهرداری می باشد.</safa-notice>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="Description" label="توضیحات" />
          <tab-menu
            name="RentalTerminationInformation"
            label="اطلاعات فسخ قرارداد اجاره/استیجاره"
          />
          <tab-menu name="LeaseTerms" label="شرایط قرارداد اجاره/استیجاره" />
          <tab-menu name="OtheInfo" label="سایر اطلاعات" />
        </template>
        <tab-content name="Description">
          <fit>
            <text-template
              v-model="value.ContractRent_Info.Description"
              cdcName="Description"
              class="q-my-sm"
              :rows="5"
              :m="m"
            />
          </fit>
        </tab-content>
        <tab-content name="RentalTerminationInformation">
          <fit>
            <FormRow>
              <FormControl>
                <safa-text
                  label="شماره فسخ"
                  cdcName="CancelNo"
                  v-model="value.ContractRent_Info.CancelNo"
                  label-width="100px"
                  :m="m"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="تاریخ فسخ"
                  cdcName="CancelDate"
                  v-model="value.ContractRent_Info.CancelDate"
                  label-width="100px"
                  :m="m"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  label="علت فسخ"
                  cdcName="CI_ContractCancelReason"
                  ciName="CI_ContractCancelReason"
                  domain-name="Estate"
                  v-model="value.ContractRent_Info.CI_ContractCancelReason"
                  label-width="100px"
                  :m="m"
                />
              </FormControl>
            </FormRow>
            <text-template
              label="توضیحات"
              v-model="value.ContractRent_Info.CancelDesc"
              cdcName="CancelDesc"
              class="q-my-sm"
              :rows="5"
              :m="m"
            />
          </fit>
        </tab-content>
        <tab-content name="LeaseTerms">
          <fit>
            <safa-grid
              v-model="value.ContractRent_ContractTerms"
              fit
              height="100%"
              max-height="100%"
              min-height="100%"
              paginate
              :suppressRowClickSelection="false"
              :columns="Termscolumns"
              :m="m"
            />
          </fit>
        </tab-content>
        <tab-content name="OtheInfo">
          <fit>
            <FormRow>
              <FormControl>
                <safa-text
                  label="افزوده سرقفلی"
                  cdcName="AddedTheLocks"
                  v-model="value.ContractRent_Info.AddedTheLocks"
                  label-width="100px"
                  :m="m"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="حق انتقال"
                  cdcName="TheRightTransfer"
                  v-model="value.ContractRent_Info.TheRightTransfer"
                  label-width="100px"
                  :m="m"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="آخرین تارخ تسویه حساب"
                  cdcName="LastPonyDate"
                  v-model="value.ContractRent_Info.LastPonyDate"
                  label-width="100px"
                  :m="m"
                />
              </FormControl>
            </FormRow>
          </fit>
        </tab-content>
      </safa-tabs>
    </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    formKey: String,
    title: String,
    name: String,
    m: String,
    value: Object,
    List: Object
  },
  data () {
    return {
      // variables
      activeTab: "Description",

      // grids
      Termscolumns: [
        {
          field: "CI_ContractRent_ContractTermsType",
          title: "نوع شرایط قرارداد",
          width: "",
          editor: "combo",
          domain: "Estate"
        },
        { field: "Description", title: "توضیحات", width: "" }
      ]
    }
  }
}
</script>
