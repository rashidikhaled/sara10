<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          v-model="
            value.ClsRequestService_Info.RequestService_Info.CI_RequesterType
          "
          cdcName="CI_RequesterType"
          label="شرکت خدماتی"
          label-width="100px"
          :m="m"
          source-type="local"
          :options="requesterTypeSource"
          ref="ciRequesterType"
          required
          :validations="['required', validations.CI_RequesterType]"
        />
      </FormControl>
      <FormControl :class="{'flex no-wrap items-center': !noSelectinCIRequesterType }">
        <safa-combo
          v-model="
            value.ClsRequestService_Info.RequestService_Info.CI_RedirectName
          "
          cdcName="CI_RedirectName"
          label="نام تابعه"
          label-width="100px"
          source-type="local"
          :options="redirectNameOptions"
          :m="m"
          required
          :validations="['required', validations.CI_RedirectName]"
          :class="{'col': !noSelectinCIRequesterType}"
        />
        <q-icon color="primary" name="info" size="sm" v-if="!noSelectinCIRequesterType">
          <q-tooltip> مقدار فیلد نام تابعه از تنظیمات کاربر خوانده میشود. </q-tooltip>
        </q-icon>
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.ClsRequestService_Info.RequestService_Info.CI_Project"
          cdcName="CI_Project"
          label="عنوان پروژه"
          label-width="100px"
          m="e"
          ciName="CI_Project"
          domain-name="Dig"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRequestService_Info.RequestService_Info.NIdWorkItem"
          cdcName="NIdWorkItem"
          label="کد رهگیری"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.ClsRequestService_Info.RequestService_Info.CI_Region"
          cdcName="CI_Region"
          label="منطقه"
          label-width="100px"
          m="e"
          source-type="local"
          :options="districts"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="
            value.ClsRequestService_Info.RequestService_Info.RequesterRegion
          "
          cdcName="RequesterRegion"
          label="ناحیه"
          label-width="100px"
          :m="m"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRequestService_Info.RequestService_Info.Boulevard"
          cdcName="Boulevard"
          label="آدرس مسیر حفاری بلوار"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRequestService_Info.RequestService_Info.MainStreet"
          cdcName="MainStreet"
          label="خیابان اصلی"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRequestService_Info.RequestService_Info.ByStreet"
          cdcName="ByStreet"
          label="خیابان فرعی"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRequestService_Info.RequestService_Info.MainAlley"
          cdcName="MainAlley"
          label="کوچه اصلی"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRequestService_Info.RequestService_Info.ByAlley"
          cdcName="ByAlley"
          label="کوچه فرعی"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-map-measure
          v-model="
            value.ClsRequestService_Info.RequestService_Info.DigPathLength
          "
          cdcName="DigPathLength"
          label="طول ترسیم"
          label-width="100px"
          required
          :validations="['required', validations.digPathLength]"
          :m="m"
          @getMapInfo="getMapInfo"
        />
      </FormControl>
      <!-- <FormControl>
          <safa-text
            v-model="value.ClsRequestService_Info.RequestService_Info.DigPathLength"
            cdcName="DigPathLength"
            label="طول ترسیم"
            label-width="100px"
            :m="m"
            required
          :validations="['required', validations.digPathLength]"
        >
        <template v-slot:append>
            <q-icon
              v-if="m === 'e'"
              title="درج خط"
              style="position: relative; right: 9px; font-size: 24px"
              @click="drawingLengthModal = true"
              color="primary"
              name="square_foot"
              class="cursor-pointer"
            />
          </template>
        </safa-text>
        </FormControl> -->
        <FormControl>
        <safa-text
          label="تلفن همراه پیگیری کننده"
          label-width="100px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.FollowerCellphoneNo
          "
          cdcName="FollowerCellphoneNo"
          :validations="
            value.ClsRequestService_Info.RequestService_Info
              .FollowerCellphoneNo &&
            value.ClsRequestService_Info.RequestService_Info
              .FollowerCellphoneNo !== ''
              ? validations.mobile
              : ''
          "
          type="number"
          dir="ltr"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام پیگیری کننده"
          label-width="100px"
          v-model="value.ClsRequestService_Info.RequestService_Info.FollowerName "
          cdcName="FollowerName "
          :m="m"
        />
      </FormControl>
    </FormRow>
    <div class="row q-mb-sm">
      <text-template
        label="توضیحات درخواست"
        v-model="value.ClsRequestService_Info.RequestService_Info.Description"
        cdcName="Description"
        :rows="2"
        :m="m"
        label-width="100px"
        type="textarea"
      />
    </div>
    <safa-datatable
      v-model="value.ClsRequestService_Info.RequestService_Time"
      cdcName="RequestService_Time"
      title="مدت و زمان اجرای عملیات حفاری"
      :columns="GridRequestServiceTimeColumns"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      :m="m"
      :defaultNewRow="defaultNewRow"
      min-height="350px"
      height="100%"
      max-height="100%"
      @update="updateRequestServiceTime"
      fit
    />
    <safa-popup
      title=""
      width="600px"
      height="315px"
      v-model="drawingLengthModal"
    >
      <fit>
        <div class="fit">
          <q-scroll-area class="full-height q-px-sm">
            <EditPoint allowEdit />
          </q-scroll-area>
        </div>
        <q-separator class="q-gutter-sm q-mt-sm" />
        <div class="q-gutter-sm q-pa-sm">
          <btn-default label="اعمال" @click="drawingLength" />
          <btn-cancel @click="drawingLengthModal = false" />
        </div>
      </fit>
    </safa-popup>
  </fit>
</template>

<script>
import { currentDate } from "src/utils/index"
import Joi from "joi"
import baseFormMixin from "src/mixins/baseFormMixin"
import EditPoint from "kais-map/src/lib-components/dialogs/EditPoint.vue"
export default {
  mixins: [baseFormMixin],
  components: { EditPoint },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: {
      type: String,
      default: "e"
    },
    noSelectinCIRequesterType: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      name: "generalInfo",
      drawingLengthModal: false,
      redirectNameOptions: [],
      requesterTypeSource: [],
      defaultNewRow: {
        AgainRenewal: null,
        CI_CauseRenewal: 0,
        CI_Phase: 0,
        Delay: 0,
        Description: null,
        Duration: 0,
        EndDate: null,
        EndTime: null,
        NIdRequestService: "00000000-0000-0000-0000-000000000000",
        NIdTime: "00000000-0000-0000-0000-000000000000",
        RegDate: null,
        StartDate: currentDate(),
        StartTime: null,
        Total: 0
      },
      GridRequestServiceTimeColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          editor: "combo",
          domain: "Dig",
          validations: "required",
          width: "130px"
        },
        {
          field: "StartDateExtension",
          title: "تاریخ شروع",
          editor: "date",
          validations: "required",
          width: "130px"
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          editor: "date",
          // validations: "required",
          width: "130px"
        },
        {
          field: "Duration",
          title: "مدت (روز)",
          editable: false,
          width: "60px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "300px"
        }
      ],
      validations: {
        mobile: Joi.string().length(11).required().messages({
          "any.required": `اطلاعاتی وارد نشده است.`
        }),
        digPathLength: Joi.custom(
          function (value, helper) {
            if (
              this.value.ClsRequestService_Info.RequestService_Info
                .DigPathLength === 0
            ) {
              return helper.message("مقدار 0 برای طول ترسیم مجاز نمی باشد.")
            }
            return true
          }.bind(this)
        ),
        CI_RequesterType: Joi.custom(
          function (value, helper) {
            if (this.value.ClsRequestService_Info.RequestService_Info.CI_RequesterType === 0) {
              return helper.message("مقدار نامشخص مجاز نمی باشد.")
            }
            return true
          }.bind(this)
        ),
        CI_RedirectName: Joi.custom(
          function (value, helper) {
            if (this.value.ClsRequestService_Info.RequestService_Info.CI_RedirectName === 0) {
              return helper.message("مقدار نامشخص مجاز نمی باشد.")
            }
            return true
          }.bind(this)
        ),
        CI_Project: Joi.custom(
          function (value, helper) {
            if (
              this.value.ClsRequestService_Info.RequestService_Info
                .CI_Project === 0
            ) {
              return helper.message(
                "مقدار وارد شده برای عنوان پروژه مجاز نمی باشد."
              )
            }
            return true
          }.bind(this)
        )
      }
    }
  },
  watch: {
    "value.ClsRequestService_Info.RequestService_Info.DigPathLength": {
      handler () {
        if (
          this.value.ClsRequestService_Info.RequestService_Info
            .DigPathLength === null ||
          this.value.ClsRequestService_Info.RequestService_Info
            .DigPathLength === ""
        ) {
          this.value.ClsRequestService_Info.RequestService_Info.DigPathLength = 0
        }
      },
      deep: true
    },
    "value.ClsRequestService_Info.RequestService_Info.CI_RequesterType": {
      handler (newVal, oldVal) {
        if (this.noSelectinCIRequesterType) return
        if (!Array.isArray(this.requesterTypeSource) || this.requesterTypeSource.length === 0) return
        // this.value.ClsRequestService_Info.RequestService_Info.CI_RedirectName = this.requesterTypeSource?.find(f => f.ID === newVal)?.RedirectName ?? 0
        const updatedRedirectNameList = this.requesterTypeSource?.find(f => f.ID === newVal)?.RedirectName
        if (Array.isArray(updatedRedirectNameList) && updatedRedirectNameList.length > 0) {
          this.getRedirectNameList(updatedRedirectNameList)
          this.value.ClsRequestService_Info.RequestService_Info.CI_RedirectName = updatedRedirectNameList[0].ID
        }
      },
      immediate: true
    }
  },
  methods: {
    drawingLength () {
      this.drawingLengthModal = false
    },
    updateRequestServiceTime () {
      this.$emit("updateRequestServiceTime")
    },
    async getRedirectNameList (list) {
      try {
        this.showLoading()
        if (list && list.length > 0) {
          this.redirectNameOptions = list
        } else {
          const { data } = await this.$services.excavation.getClsCIRedirectName({ CI_RequesterType: this.value?.ClsRequestService_Info?.RequestService_Info?.CI_RequesterType ?? 0 })
          const res = this.getResponse(data)
          if (res.success) {
            this.redirectNameOptions = res.data.GetClsCI_RedirectNameResult?.CI_RedirectName ?? []
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getMapInfo (e) {
      this.$emit("getMapInfo", e)
    },
    fillRequesterInfoSource (list, handleProcess = false) {
      if (handleProcess) {
        if (list && Object.values(list).length > 0) {
          this.requesterTypeSource = Object.values(list)?.map((item) => ({
            ID: item.RequesterType.ID,
            Title: item.RequesterType.Title,
            RedirectName: item?.RedirectName
          })) ?? []

          const activeRedirectName = this.requesterTypeSource.find(e => e.ID === this.value.ClsRequestService_Info.RequestService_Info.CI_RequesterType)
          if (activeRedirectName) {
            this.getRedirectNameList(activeRedirectName.RedirectName)
          }
        }
      } else {
        this.requesterTypeSource = list?.map((item) => {
          return {
            ID: item.RequesterType[0].ID,
            Title: item.RequesterType[0].Title,
            RedirectName: item?.RedirectName
          }
        }) ?? []
        this.getRedirectNameList()
      }
    }
  },
  computed: {
    customMode () {
      if (this.noSelectinCIRequesterType === false) {
        return "r"
      } else return this.m
    },
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    ciRequesterTypeTitle () {
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  }
}
</script>
