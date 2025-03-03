<template>
    <fit>
      <safa-splitter v-model="splitterValueHorizontalOuter" horizontal>
        <template v-slot:before>
          <fit>
            <safa-splitter v-model="splitterValueHorizontalInner" horizontal>
              <template v-slot:before>
                <safa-splitter v-model="splitterValueVerticalR" vertical>
                  <template v-slot:before>
                    <fit>
                      <safa-datatable
                        title="گواهی های شهرداری"
                        fit
                        min-height="100px"
                        height="100%"
                        max-height="100%"
                        v-model="Result.Base_ShahrsaziArchive"
                        :columns="Base_ShahrsaziArchiveColumns"
                        :m="mode"
                        :take="20"
                        :addRow="false"
                        :allowCopy="false"
                        :deleteRow="false"
                        :isEditable="true"
                        class="q-mb-sm"
                      />
                    </fit>
                  </template>
                  <template v-slot:after>
                    <fit>
                      <safa-datatable
                        title="نوع تاسیسات"
                        fit
                        min-height="100px"
                        height="100%"
                        max-height="100%"
                        v-model="Result.Base_Installation"
                        :columns="Base_InstallationColumns"
                        :m="mode"
                        :take="20"
                        :addRow="false"
                        :allowCopy="false"
                        :deleteRow="false"
                        :isEditable="true"
                        class="q-mb-sm"
                      />
                    </fit>
                  </template>
                </safa-splitter>
              </template>
              <template v-slot:after>
                <fit>
                  <safa-splitter v-model="splitterValueVerticalL" vertical>
                    <template v-slot:before>
                      <fit>
                        <safa-datatable
                          title="سندهای ملک"
                          fit
                          min-height="100px"
                          height="100%"
                          max-height="100%"
                          v-model="Base_HouseDoc"
                          :columns="Base_HouseDocColumns"
                          :m="mode"
                          :take="20"
                          :addRow="false"
                          :allowCopy="false"
                          :deleteRow="false"
                          :isEditable="true"
                          class="q-mb-sm"
                        />
                      </fit>
                    </template>
                    <template v-slot:after>
                      <fit>
                        <safa-datatable
                          title="سایر امکانات"
                          fit
                          min-height="100px"
                          height="100%"
                          max-height="100%"
                          v-model="Result.Base_OtherEquipment"
                          :columns="Base_OtherEquipmentColumns"
                          :m="mode"
                          :take="20"
                          :addRow="false"
                          :allowCopy="false"
                          :deleteRow="false"
                          :isEditable="true"
                          class="q-mb-sm"
                        />
                      </fit>
                    </template>
                  </safa-splitter>
                </fit>
              </template>
            </safa-splitter>
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <text-template
              v-model="Result.Base_CommonEstate.Comments"
              label="توضیحات"
              label-width="73px"
              fit
              :m="mode"
            />
          </fit>
        </template>
      </safa-splitter>
    </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

const defaultModel = {
  Base_Using: {
    Append: "",
    BuildingNo: "",
    BusyArea: "",
    CI_BuildingKind: "",
    CI_BuildingStep: "",
    CI_BuildingType: "",
    CI_RoofType: "",
    CI_SazehType: "",
    CI_UsingGroup: "",
    CI_UsingType: "",
    CI_WallType: "",
    CreateYearFrom: "",
    CreateYearTo: "",
    CurUsingGroup: "",
    CurUsingType: "",
    Dahaneh: "",
    Depth1Area: "",
    Depth1No: "",
    Depth2Area: "",
    Depth2No: "",
    Depth3Area: "",
    Depth3No: "",
    EditUsingArea: "",
    FloorNo: "",
    GenerateDate: "",
    IllegalInfrastructure: "",
    NId: "",
    NidCopy: "",
    NidUsing: "",
    OverOnArea: "",
    OverOnLengthNear: "",
    OverOnTarakom: "",
    OverOrNoParvaneh: "",
    ProgressPercent: "",
    RoofThickness: "",
    SysCI_IncomGroup: "",
    UnitCount: "",
    UnitNo: "",
    UsefulHeight: "",
    UsingArea: "",
    UsingArea_Cur: "",
    UsingDepth: "",
    Base_ShahrsaziArchive: []
  },
  Base_CommonEstate: {
    CI_BuildingStep: "",
    CI_DocRefrence: "",
    CI_DocStatus: "",
    CI_DocType: "",
    CI_HouseUser: "",
    CI_OwnerType: "",
    CI_SideCode: "",
    CI_UsingGroup: "",
    CI_UsingType: "",
    Comments: "",
    CommercialGapWidth: "",
    DevotionName: "",
    DocComments: "",
    DocExportDate: "",
    DocTransferDate: "",
    Nid: "",
    NidCopy: "",
    Populations: "",
    RegisterSection: "",
    TafkikComments: "",
    TafkikDate: "",
    TafkikNo: "",
    TrusteeName: ""
  },
  Base_ShahrsaziArchive: []
}
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "commentsAndOthers",
      Result: {
        Base_Using: { ...defaultModel },
        Base_CommonEstate: { ...defaultModel },
        Base_ShahrsaziArchive: [],
        Base_Installation: [],
        Base_OtherEquipment: []
      },
      Base_HouseDoc: [],

      // splitter
      splitterValueHorizontalOuter: 50,
      splitterValueHorizontalInner: 50,
      splitterValueVerticalR: 50,
      splitterValueVerticalL: 50,

      // columns:
      Base_ShahrsaziArchiveColumns: [
        {
          title: "نوع سوابق شهرسازی",
          field: "CI_ShahrsaziArchiveKind",
          editor: "combo",
          domain: "Estate",
          cell: "grid-combo"
        },
        {
          title: "مرجع صدور مجوز",
          field: "CI_LicenceExportationRefrence",
          editor: "combo",
          domain: "Estate",
          cell: "grid-combo"
        },
        {
          title: "شماره گواهی",
          field: "CertificateNo",
          width: "80px"
        },
        {
          title: "تاریخ گواهی",
          field: "CertificateDate"
        },
        {
          title: "آیا معتبر است؟",
          field: "IsValid"
        },
        {
          title: "تاریخ اعتبار",
          field: "CreditDate"
        },
        {
          title: "توضیحات",
          field: "Comments"
        }
      ],

      Base_InstallationColumns: [
        {
          title: "تاریخ اعتبار",
          field: "CreditDate"
        },
        {
          title: "توضیحات",
          field: "Comments"
        }
      ],

      Base_HouseDocColumns: [
        {
          title: "تاریخ اعتبار",
          field: "CreditDate"
        },
        {
          title: "توضیحات",
          field: "Comments"
        }
      ],

      Base_OtherEquipmentColumns: [
        {
          title: "تاریخ اعتبار",
          field: "CreditDate"
        },
        {
          title: "توضیحات",
          field: "Comments"
        }
      ]
    }
  }
}
</script>
