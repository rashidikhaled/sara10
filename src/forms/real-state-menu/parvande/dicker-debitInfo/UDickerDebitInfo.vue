<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title" :padding="false">
      <fit>
        <safa-tabs v-model="activeTab" :padding="true">
          <template v-slot:tabs>
            <tab-menu name="propertyInfo" label="اطلاعات ملک" />
            <tab-menu
              name="municipalityAnalysis"
              label="آنالیز بهای تمام شده برای شهرداری"
            />
          </template>
          <!-- first tab -->
          <tab-content name="propertyInfo" title="اطلاعات ملک">
              <fit>
                <form-row class="q-mb-sm">
                  <form-control>
                    <safa-text
                      label="نام مودی"
                      v-model="Owned_Info.BudgetTitle"
                      :m="mode"
                      label-width="100px"
                      cdcName="BudgetTitle"
                    />
                  </form-control>
                  <form-control>
                    <safa-text
                      v-model="Owned_Info.Id"
                      cdcName="Id"
                      label="کد ملی"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                  <form-control>
                    <safa-text
                      label="میزان بدهی(ریال)"
                      v-model="Owned_Info.Debt"
                      :m="mode"
                      label-width="100px"
                      cdcName="Debt"
                    />
                  </form-control>
                  <form-control>
                    <safa-datepicker
                      v-model="Owned_Info.debtsDate"
                      cdcName="debtsDate"
                      label="تاریخ بدهی"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                </form-row>
              <form-row class="q-mb-sm">
                  <nosazi-code-input
                    :m="mode"
                    label="کد نوسازی"
                    v-model="baseNosaziCode1"
                    cdcName="baseNosaziCode1"
                    label-width="60px"
                  />
                </form-row>

                <form-row class="q-mb-sm">
                  <form-control>
                    <safa-combo
                      ciName="CI_CauseDebt"
                      domainName="Estate"
                      label="علت بدهی"
                      v-model="Owned_Info.CI_CauseDebt"
                      :m="mode"
                      label-width="100px"
                      cdcName="CI_CauseDebt"
                    />
                  </form-control>
                  <form-control>
                    <safa-text
                      v-model="Owned_Info.declarationLetter"
                      cdcName="declarationLetter"
                      label="نامه اعلام بدهی به مرکز"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                  <form-control>
                    <safa-text
                      label="شماره"
                      v-model="Owned_Info.number"
                      :m="mode"
                      label-width="100px"
                      cdcName="number"
                    />
                  </form-control>
                  <form-control>
                    <safa-datepicker
                      v-model="Owned_Info.date"
                      cdcName="date"
                      label="تاریخ"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                  <form-control>
                    <safa-text
                      label="نام مالک"
                      v-model="Owned_Info.ownerName"
                      :m="mode"
                      label-width="100px"
                      cdcName="ownerName"
                    />
                  </form-control>
                </form-row>
                <form-row class="q-mb-sm">
                  <form-control>
                    <safa-text
                      v-model="Owned_Info.Id2"
                      cdcName="Id2"
                      label="کد ملی"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                  <form-control>
                    <safa-text
                      label="آدرس"
                      v-model="Owned_Info.address"
                      :m="mode"
                      label-width="100px"
                      cdcName="address"
                    />
                  </form-control>
                   <form-control>
                    <safa-text
                      v-model="Owned_Info.registerPelak"
                      cdcName="registerPelak"
                      label="پلاک ثبتی"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                </form-row>
                 <form-row class="q-mb-sm">
                  <nosazi-code-input
                    :m="mode"
                    label="کد نوسازی"
                    v-model="baseNosaziCode2"
                    cdcName="baseNosaziCode2"
                    label-width="60px"
                  />
                 </form-row>
                  <form-row class="q-mb-sm">
                  <form-control>
                    <safa-combo
                      ciName="CI_DocType2"
                      domainName="Estate"
                      label="نوع سند"
                      v-model="Owned_Info.CI_DocType2"
                      :m="mode"
                      label-width="100px"
                      cdcName="CI_DocType2"
                    />
                  </form-control>

                  <form-control>
                    <safa-text
                      v-model="Owned_Info.CI_OwnerType"
                      cdcName="CI_OwnerType"
                      label="نوع مالکیت عرصه"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                  <form-control>
                    <safa-combo
                      ciName="CI_CessionItem"
                      domainName="Estate"
                      label="مورد واگذاری"
                      v-model="Owned_Info.CI_CessionItem"
                      :m="mode"
                      label-width="100px"
                      cdcName="CI_CessionItem"
                    />
                  </form-control>
                  <form-control>
                    <safa-text
                      label="کلاسه بایگانی"
                      v-model="Owned_Info.archiveClass"
                      :m="mode"
                      label-width="100px"
                      cdcName="archiveClass"
                    />
                  </form-control>
                </form-row>
                <form-row class="q-mb-sm">
                  <form-control className="col-12">
                    <text-template
                      v-model="Owned_Info.Description"
                      cdcName="Description"
                      label="توضیحات"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                </form-row>
              </fit>
            <!-- <propertyInfo /> -->
          </tab-content>
          <!-- second tab -->
          <tab-content
            name="municipalityAnalysis"
            title="آنالیز بهای تمام شده برای شهرداری"
          >
              <fit>
                <form-row class="q-mb-sm">
                  <form-control>
                    <safa-text
                      label="جمع قیمت تمام شده برای شهرداری"
                      v-model="Owned_Info2.fixedPrice"
                      :m="mode"
                      label-width="100px"
                      cdcName="fixedPrice"
                    />
                  </form-control>
                  <form-control>
                    <safa-text
                      v-model="Owned_Info2.numOfPeaceAgreement"
                      cdcName="numOfPeaceAgreement"
                      label="شماره صلح نامه"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                  <form-control>
                    <safa-datepicker
                      v-model="Owned_Info2.dateOfPeaceAgreement"
                      cdcName="dateOfPeaceAgreement"
                      label="تاریخ صلح نامه"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                  <form-control>
                    <safa-datepicker
                      v-model="Owned_Info2.propertyDelivery"
                      cdcName="propertyDelivery"
                      label="تاریخ تحویل ملک به شهرداری"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                  <form-control>
                    <safa-datepicker
                      v-model="Owned_Info2.documentTransfer"
                      cdcName="documentTransfer"
                      label="تاریخ انتقال سند به نام شهرداری"
                      label-width="100px"
                      :m="mode"
                    />
                  </form-control>
                </form-row>
                <safa-grid
                  v-model="costMunicipality"
                  cdcName="costMunicipality"
                  title="آنالیز بهای تمام شده برای شهرداری"
                  helper="costMunicipalityColumns"
                  height="100%"
                  :suppressRowClickSelection="false"
                  max-height="100%"
                  min-height="200px"
                  fit
                  :m="mode"
                />
              </fit>
            <!-- <municipalityAnalysis /> -->
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveData"
          @cancel="isEditable = false"
        >
          <btn-delete v-if="isEditable == false" />
          <btn-cancel label="خروج" @click="exit" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "اطلاعات املاک حاصل از تهاتر با بدهی مودیان",
      formKey: "654014EF-FE54-4FB0-B176-957DFE474C86",
      name: "UDickerDebitInfo",
      main: true,
      sidebarCompatible: true,

      activeTab: "propertyInfo",

      // first tab
      Owned_Info: {
        archiveClass: "",
        BudgetTitle: 0,
        Id: 0,
        Debt: "",
        debtsDate: "",
        CI_CauseDebt: 0,
        declarationLetter: "",
        number: "",
        date: "",
        ownerName: "",
        Id2: "",
        address: "",
        registerPelak: "",
        CI_DocType2: 0,
        CI_OwnerType: "",
        CI_CessionItem: 0,
        Description: ""
      },
      baseNosaziCode1: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseNosaziCode2: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // second tab
      Owned_Info2: {
        fixedPrice: "",
        numOfPeaceAgreement: "",
        dateOfPeaceAgreement: "",
        propertyDelivery: "",
        documentTransfer: ""
      },
      costMunicipality: []
      // costMunicipalityColumns: [
      //   {
      //     title: "ارزش ملک مورد تهاتر",
      //     field: "OwnershipPrice"
      //   },
      //   {
      //     title: "هزینه کارشناس رسمی دادگستری سهم شهرداری",
      //     field: "TechnicianPrice"
      //   },
      //   {
      //     title: "بدهی پلاک بابت مزایای ورود به محدوده",
      //     field: "DebtEntryLimits"
      //   },
      //   {
      //     title: "تخفیف نقدی",
      //     field: "RightToReside"
      //   },
      //   {
      //     title: "سایر هزینه ها",
      //     field: "CashDiscountFloatingPoint"
      //   }
      // ]
    }
  },
  // طبق گفته ی آقای صفری این فرم سرویسی ندارد .در سرا 8 نیز عملکردی ندارد
  methods: {
    saveData () {},
    exit () {
      this.hideSidebar("UDickerDebitInfo")
    }
  }
}
</script>
