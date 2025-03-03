<template>
  <fit>
    <form-row class="q-my-sm">
      <form-control>
        <safa-text
          label="عنوان منبع تامین"
          label-width="100px"
          :m="m"
          v-model="value.SupplySources_Info.SupplySourcesTitle"
          cdcName="SupplySourcesTitle"
          required
          validations="required"
        >
        </safa-text>
      </form-control>
      <nosazi-code-input
        label="کدنوسازی"
        v-model="value.SupplySources_Info.baseNosaziCode"
        cdcName="baseNosaziCode"
        label-width="100px"
        :m="m"
      />
    </form-row>
    <form-row class="q-mb-sm">
      <form-control>
        <safa-combo
          label=" نحوه ی دریافت"
          domainName="Estate"
          ciName="CI_GettingKind"
          v-model="value.SupplySources_Info.CI_GettingKind"
          cdcName="CI_GettingKind"
          label-width="100px"
          :m="m"
        >
        </safa-combo>
      </form-control>
      <form-control>
        <safa-combo
          label="مالکیت دریافتی"
          domainName="Estate"
          ciName="CI_GettingOwner"
          v-model="value.SupplySources_Info.CI_GettingOwner"
          cdcName="CI_GettingOwner"
          label-width="100px"
          :m="m"
        >
        </safa-combo>
      </form-control>
      <form-control>
        <safa-text
          label="نام موقوفه"
          v-model="value.SupplySources_Info.EndowmentName"
          cdcName="EndowmentName"
          label-width="100px"
          :m="m"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ ارزیابی"
          label-width="100px"
          :m="m"
          v-model="value.SupplySources_Info.AssessmentDate"
          cdcName="AssessmentDate"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ واگذاری به شهرداری"
          label-width="100px"
          :m="m"
          v-model="value.SupplySources_Info.CessionDate"
          cdcName="CessionDate"
        />
      </form-control>
      <form-control>
        <safa-text
          label="شماره نقشه"
          v-model="value.SupplySources_Info.MapNo"
          cdcName="MapNo"
          label-width="100px"
          :m="m"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-combo
          label="میزان مالکیت شهرداری"
          domainName="Estate"
          ciName="CI_MunicipalityOwner"
          v-model="value.SupplySources_Info.CI_MunicipalityOwner"
          cdcName="CI_MunicipalityOwner"
          label-width="100px"
          :m="m"
        >
        </safa-combo>
      </form-control>
      <form-control>
        <safa-text
          label="مساحت سهم شهرداری"
          v-model="value.SupplySources_Info.MunicipalityArea"
          cdcName="MunicipalityArea"
          label-width="100px"
          :m="m"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-combo
          label="منطقه"
          domainName="Estate"
          ciName="CI_Region"
          v-model="value.SupplySources_Info.CI_Region"
          cdcName="CI_Region"
          label-width="100px"
          :m="m"
        >
        </safa-combo>
      </form-control>
      <form-control>
        <safa-text
          label="شماره سند"
          v-model="value.SupplySources_Info.DocNo"
          cdcName="DocNo"
          label-width="100px"
          :m="m"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ سند"
          label-width="100px"
          :m="m"
          v-model="value.SupplySources_Info.DocDate"
          cdcName="DocDate"
        />
      </form-control>
    </form-row>
    <form-row class="q-mb-sm">
      <form-control>
        <safa-checkbox
          label="سند به طور کلی به نام شهرداری است"
          label-width="100px"
          :m="m"
          v-model="value.SupplySources_Info.IsMunicipalityOwner"
          cdcName="IsMunicipalityOwner"
        />
      </form-control>
      <form-control>
        <safa-checkbox
          label="خارج از محدوده ی قانونی"
          label-width="100px"
          :m="m"
          v-model="value.SupplySources_Info.IsOutOfBound"
          cdcName="IsOutOfBound"
        />
      </form-control>
    </form-row>
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="comment" label="توضیحات"/>
        <tab-menu name="price" label="قیمت گذاری"/>
        <tab-menu name="file" label="قراردادها"/>
        <tab-menu name="other" label="سایر اطلاعات"/>
      </template>
      <tab-content name="comment">
        <fit>
          <text-template
            label="توضیحات"
            label-width="90px"
            :m="m"
            :rows="3"
            formKey="2397553A-F7A4-4D89-A214-627ACCD0D676"
            v-model="value.SupplySources_Info.Description"
            cdcName="Description"
            fit
          />
        </fit>
      </tab-content>
      <tab-content name="price">
        <fit>
          <form-row class="q-my-sm">
            <form-control>
              <safa-text
                label="ارزش کل قطعات واگذار شده به شهرداری"
                label-width="100px"
                :m="m"
                v-model="value.SupplySources_Info.TotalValuePartsTransferredMunicipalities"
                cdcName="TotalValuePartsTransferredMunicipalities"
              />
            </form-control>
            <form-control>
              <safa-text
                label="هزینه کل زمین"
                label-width="100px"
                :m="m"
                v-model="value.SupplySources_Info.TotalLandCost"
                cdcName="TotalLandCost"
              />
            </form-control>
            <form-control>
              <safa-text
                label="ارزش کل امتیازات"
                label-width="100px"
                :m="m"
                v-model="value.SupplySources_Info.OverallRating"
                cdcName="OverallRating"
              />
            </form-control>
            <form-control>
              <safa-text
                label="قیمت تمام شده کل واحدهای سهم شهرداری"
                label-width="100px"
                :m="m"
                v-model="value.SupplySources_Info.TotalCostShareMunicipalUnits"
                cdcName="TotalCostShareMunicipalUnits"
              />
            </form-control>
          </form-row>
        </fit>
      </tab-content>
      <tab-content name="file">
        <fit>
          <safa-grid
            v-model="value.SupplySources_Contract"
            cdcName="SupplySources_Contract"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            paginate
            :addRow="true"
            :deleteRow="true"
            :allowCopy="true"
            helper="ContractColumns"
            :m="m"
          />
        </fit>
        <!-- helper="DetailsColumn" -->
      </tab-content>
      <tab-content name="other">
        <fit>
          <safa-grid
            v-model="value.SupplySources_Other"
            cdcName="SupplySources_Other"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            paginate
            :addRow="true"
            :deleteRow="true"
            :allowCopy="true"
            helper="OtherColumns"
            :m="m"
          />
        </fit>
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
export default {
  props: {
    baseNosaziCode: { type: Object },
    title: String,
    formKey: String,
    name: String,
    m: String,
    value: Object
  },

  data () {
    return {
      activeTab: 'comment'
    }
  }
}
</script>
