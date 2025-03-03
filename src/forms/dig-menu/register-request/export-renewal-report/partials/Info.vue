<template>
  <fit>
    <safa-splitter
      v-model="splitterValueHorizontal"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <FormRow class="q-my-sm">
            <FormControl>
              <safa-combo
                v-model="value.RequestService_Info.CI_RequestType"
                cdcName="CI_RequestType"
                ciName="CI_RequestType"
                domain-name="Dig"
                label="نوع درخواست"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                v-model="value.RequestService_Info.ExportLicenseDate"
                cdcName="ExportLicenseDate"
                label="تاریخ مجوز"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="value.RequestService_Info.ExportLicenseNo"
                cdcName="ExportLicenseNo"
                label="شماره مجوز"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                v-model="value.RequestService_Info.CI_RequesterType"
                cdcName="CI_RequesterType"
                ciName="CI_RequesterType"
                domainName="Dig"
                label="شرکت خدماتی"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                v-model="value.RequestService_Info.CI_RedirectName"
                cdcName="CI_RedirectName"
                ciName="CI_RedirectName"
                domainName="Dig"
                label="نام تابعه"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                v-model="value.RequestService_Info.CI_Project"
                cdcName="CI_Project"
                ciName="CI_Project"
                domainName="Dig"
                label="عنوان پروژه"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="value.RequestService_Info.NIdWorkItem"
                cdcName="NIdWorkItem"
                label="کد رهگیری"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                v-model="value.RequestService_Info.CI_Region"
                cdcName="CI_Region"
                ciName="CI_Region"
                domainName="Dig"
                label="منطقه"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="value.RequestService_Info.RequesterRegion"
                cdcName="RequesterRegion"
                label="ناحیه"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="value.RequestService_Info.Boulevard"
                cdcName="Boulevard"
                label="آدرس محل حفاری بلوار"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="value.RequestService_Info.MainStreet"
                cdcName="MainStreet"
                label="خیابان اصلی"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="value.RequestService_Info.ByStreet"
                cdcName="ByStreet"
                label="خیابان فرعی"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="value.RequestService_Info.MainAlley"
                cdcName="MainAlley"
                label="کوچه اصلی"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="value.RequestService_Info.ByAlley"
                cdcName="ByAlley"
                label="کوچه فرعی"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="value.RequestService_Info.DigPathLength"
                cdcName="DigPathLength"
                label="طول ترسیم"
                label-width="80px"
                m="r"
              />
            </FormControl>
          </FormRow>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="splitterValueVertical"
            class="fit"
            vertical
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  v-model="value.RequestServiceMojavez_Time"
                  :columns="RequestServiceMojavezTimeColumns"
                  :show-selected-checkbox="true"
                  :allowMultipleSelection="false"
                  :addRow="false"
                  :deleteRow="false"
                  :allowCopy="false"
                  fit
                  paginate
                  cdcName="RequestServiceMojavez_Time"
                  m="r"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  v-model="value.RequestService_Time"
                  :columns="RequestServiceTimeColumns"
                  :show-selected-checkbox="true"
                  :allowMultipleSelection="false"
                  required
                  fit
                  paginate
                  cdcName="RequestService_Time"
                  :m="m"
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
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    formKey: String,
    title: String,
    name: String,
    value: Object,
    m: String
  },
  data () {
    return {
      // #values
      RequestServiceMojavezTimeColumns: [
        {
          field: "StartDate",
          title: "تاریخ شروع",
          width: "100px",
          editor: "date"
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          width: "100px",
          editor: "date"
        },
        {
          field: "Duration",
          title: "مدت(روز)",
          width: "100px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px"
        }
      ],
      RequestServiceTimeColumns: [
        {
          field: "",
          title: "نوبت تمدید",
          width: "100px",
          editable: false

        },
        {
          field: "StartDate",
          title: "تاریخ شروع",
          width: "100px",
          editor: "date",
          editable: false
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          width: "100px",
          editor: "date",
          validations: "required"
        },
        {
          field: "CI_CauseRenewal",
          title: "علت تمدید",
          width: "100px",
          domain: "Dig",
          editor: "combo",
          editable: false
        },
        {
          field: "Duration",
          title: "مدت(روز)",
          width: "100px",
          editable: false
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px",
          editable: false
        }
      ],
      splitterValueHorizontal: 50,
      splitterValueVertical: 50
    }
  }
}
</script>
