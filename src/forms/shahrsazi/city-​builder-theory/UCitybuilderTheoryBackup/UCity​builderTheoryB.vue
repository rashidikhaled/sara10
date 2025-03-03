<!-- <template>
  <safa-form :id="formKey" :caption="title">
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetched"
          cdcName="baseNosaziCode"
        />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="revisit" label="بازدید"></tab-menu>
            <tab-menu name="revisitArse" label="بازدید عرصه"></tab-menu>
            <tab-menu name="revisitBuilding" label="بازدید ساختمان"></tab-menu>
          </template>
          comment: first tab
          <tab-content name="revisit">
            <fit>
              <div v-scroll class="fit scroll">
                <q-tree
                  ref="tree"
                  default-expand-all
                  selected-color="primary"
                  node-key="nosaziCodeString"
                  label-key="label"
                  :nodes="nosaziCodeTrees"
                  class="bordered"
                  accordion
                  :duration="0"
                >
                </q-tree>
              </div>
              <safa-datatable
                title="بازدیدکنندگان"
                fit
                min-height="100px"
                height="100%"
                max-height="100%"
                v-model="Result.RevisitList_InNidRequest"
                cdcName="Result.RevisitList_InNidRequest"
                :columns="RevisitListColumns"
                :take="20"
                :m="mode"
                :addRow="true"
                :allowCopy="true"
                :isEditable="true"
                :isDeleteabl="true"
              />
            </fit>
          </tab-content>
          comment: second tab
          <tab-content name="revisitArse">
            <fit>
              <safa-datatable
                title="سایر امکانات"
                fit
                min-height="100px"
                height="100%"
                max-height="100%"
                v-model="othersPossibilities"
                cdcName="othersPossibilities"
                :columns="othersPossibilitiesColumns"
                :take="20"
                :m="mode"
                :addRow="true"
                :allowCopy="true"
                :isEditable="true"
                :isDeleteabl="true"
              />
            </fit
            >
          </tab-content>
          comment: third tab
          <tab-content name="revisitBuilding">
            <fit>
              <form-row class="q-mb-sm">
                <form-control>
                  <safa-text
                    label="تعداد پارکینگ موردنیاز"
                    v-model="Result.Base_BuildingInfo.ParkingNeedCount"
                    :m="mode"
                  />
                </form-control>
                <form-control>
                  <safa-text
                    label="تعداد واحد پارکینگ تامین شده"
                    v-model="Result.Base_BuildingInfo.ParkingSupplyCount"
                    :m="mode"
                  />
                </form-control>
                <form-control>
                  <safa-text
                    label="کسری وصول شده پارکینگ"
                    v-model="Result.Base_BuildingInfo.ParkingGet"
                    :m="mode"
                  />
                </form-control>
                <form-control>
                  <safa-text
                    label="تراکم مجاز در پروانه ساختمانی"
                    v-model="Result.Base_BuildingInfo.AllowableDensityLicence"
                    :m="mode"
                  />
                </form-control>
                <form-control>
                  <safa-text
                    label="سطح اشغال"
                    v-model="Result.Base_BuildingInfo.BusyArea"
                    :m="mode"
                  />
                </form-control>
              </form-row>
              <safa-splitter v-model="splitterValueHorizontal" horizontal>
                <template v-slot:before>
                  <fit>
                    <safa-datatable
                      title="کاربریها"
                      fit
                      min-height="100px"
                      height="100%"
                      max-height="100%"
                      v-model="Result.Base_Using"
                      cdcName="Using"
                      :columns="UsingColumns"
                      :take="20"
                      :m="mode"
                      :addRow="true"
                      :allowCopy="true"
                      :isEditable="true"
                      :isDeleteabl="true"
                    />
                  </fit>
                </template>

                <template v-slot:after>
                  <fit>
                    <safa-splitter v-model="splitterValueVerticalR" vertical>
                      <template v-slot:before>
                        <safa-splitter
                          v-model="splitterValueVerticalL"
                          vertical
                        >
                          <template v-slot:before>
                            <fit>
                              <safa-datatable
                                title="پارکینگ ها"
                                fit
                                min-height="100px"
                                height="100%"
                                max-height="100%"
                                v-model="Result.Base_Parking"
                                cdcName="Base_Parking"
                                :columns="ParkingsColumns"
                                :take="20"
                                :m="mode"
                                :addRow="true"
                                :allowCopy="true"
                                :isEditable="true"
                                :isDeleteabl="true"
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
                                cdcName="Base_OtherEquipment"
                                :columns="otherEquipmentColumns"
                                :take="20"
                                :m="mode"
                                :addRow="true"
                                :allowCopy="true"
                                :isEditable="true"
                                :isDeleteabl="true"
                                class="q-mb-sm"
                              />
                            </fit>
                          </template>
                        </safa-splitter>
                      </template>
                      <template v-slot:after>
                        <fit>
                          <safa-datatable
                            title="نحوه تامین پارکینگ"
                            fit
                            min-height="100px"
                            height="100%"
                            max-height="100%"
                            v-model="Result.Base_SupplyParking"
                            cdcName="Base_SupplyParking"
                            :columns="SupplyParkingColumns"
                            :take="20"
                            :m="mode"
                            :addRow="true"
                            :allowCopy="true"
                            :isEditable="true"
                            :isDeleteabl="true"
                            class="q-mb-sm"
                          />
                        </fit>
                      </template>
                    </safa-splitter>
                  </fit>
                </template>
              </safa-splitter>
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import baseLibInNosaziCodeModel from '../models/baseLibInNosaziCode'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      // آی دی ست شده برای این فرم صحیح نمیباشد، همچنین این فرم به درستی پیاده سازی نشده ، با بررسی انجام شده متوجه شدیم که این فرم با فرم اطلاعات بازدید یکی میباشد

      // title: 'نظریه شهرساز',
      // formKey: 'cdb38a73-2c5d-4593-8435-ad2fc63115f5',
      // name: 'UCitybuilderTheory',
      main: true,

      activeTab: 'revisit',
      sidebarCompatible: true,
      workflowCompatible: true,
      selectedNosazi: '',
      baseLibInNosaziCode: { ...baseLibInNosaziCodeModel },
      nidProc: '00000000-0000-0000-0000-000000000000',

      nosaziCodeTrees: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },

      horizontalSplitterModel: 50,
      VerticalSplitterModel: 50,
      splitterValueHorizontal: 50,
      splitterValueVerticalR: 50,
      splitterValueVerticalL: 50,
      Result: {
        Base_BuildingInfo: {
          ParkingNeedCount: null,
          ParkingSupplyCount: null,
          ParkingGet: null,
          AllowableDensityLicence: '',
          BusyArea: ''
        },
        RevisitList_InNidRequest: [],
        Base_SupplyParking: [],
        Base_Using: [],
        Base_Parking: [],
        Base_OtherEquipment: []
      },
      selectNosaziCode: null,
      selectedRequestFromRequestList: null,

      // services
      getHouseRes: null,
      getBuildingRes: null,
      getRevisitRes: null,

      //   grids

      RevisitListColumns: [
        { title: 'نام', field: 'Name' },
        { title: 'نام خانوادگی', field: 'LastName' },
        { title: 'تاریخ بازدید', field: 'RevisitDate' },
        { title: 'آیا انجام شده است', field: 'IsDoIt' }
      ],

      othersPossibilities: [],
      othersPossibilitiesColumns: [
        {
          title: 'گروه سایر امکانات/نوع سایر امکانات',
          field: 'CI_OtherEquipmentGroup',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        { title: 'مقدار', field: 'OtherEquipmentValue' },
        {
          title: 'اظهارنظر',
          field: 'CI_Suggest',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        { title: 'تاریخ', field: 'CreateDate' },
        { title: 'توضیحات', field: 'Comments', width: '200px' }
      ],

      Base_Parking: [],
      ParkingsColumns: [
        {
          title: 'گروه کاربری',
          field: 'CI_UsingGroup',
          width: '120px',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'نوع پارکینگ موردنیاز',
          field: 'CI_RequiredParkingType',
          width: '120px',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'تعداد موردنیاز',
          field: 'RequireNo',
          width: '120px',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'تعداد کسری',
          field: 'DelNo',
          width: '120px',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'تعداد خریداری شده',
          field: 'BuyNo',
          width: '120px',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'تعداد پارکینگ تامین شده',
          field: 'SupplyNo',
          width: '120px',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'نوع پارکینگ موردنیاز',
          field: 'CI_RequiredParkingType',
          width: '120px',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'ضریب',
          field: 'Coef',
          width: '120px',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'تاریخ ساخت',
          field: 'ProductYear',
          width: '120px',
          editor: 'date',
          cell: 'grid-combo'
        },
        { title: 'توضیحات', field: 'Comments', width: '300px' }
      ],

      Base_OtherEquipment: [],
      otherEquipmentColumns: [
        {
          title: 'گروه سایر امکانات/نوع سایر امکانات',
          field: 'CI_OtherEquipmentGroup',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        { title: 'مقدار', field: 'OtherEquipmentValue' },
        {
          title: 'اظهارنظر',
          field: 'CI_Suggest',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        { title: 'تاریخ', field: 'CreateDate' },
        { title: 'توضیحات', field: 'Comments', width: '200px' }
      ],

      SupplyParkingColumns: [
        { title: 'طبقه', field: 'FloorNo', editor: 'numeric', cell: 'numeric' },
        {
          title: 'نوع تامین پارکینگ',
          field: 'CI_SupplyParkingType',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'نحوه تامین پارکینگ',
          field: 'CI_SupplyParkingHow',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'تعداد',
          field: 'DoorCount',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'نوع مالکیت پارکینگ',
          field: 'CI_OwnerParkingType',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        { title: 'مساحت', field: 'Area', editor: 'numeric', cell: 'numeric' }
      ],

      Base_Using: [],
      UsingColumns: [
        { title: 'شماره ساختمان', field: 'BuildingNo1' },
        { title: 'طبقه', field: 'FloorNo' },
        {
          title: 'کاربری اصلی/نوع استفاده فرعی',
          field: 'CI_UsingType',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'مساحت کاربری',
          field: 'UsingArea',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'وضعیت کاربری',
          field: 'CI_UsingStatus',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'تعداد واحد',
          field: 'UnitCount',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'نوع ساختمان',
          field: 'CI_BuildingKind',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'نوع سقف',
          field: 'CI_RoofType',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'نوع سازه',
          field: 'CI_SazehType',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'جنس دیوار',
          field: 'CI_WallType',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'نوع نما',
          field: 'CI_ViewCode',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'مرحله ساختمانی',
          field: 'CI_BuildingStep',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'گروه ساختمانی',
          field: 'CI_BuildingType',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'تاریخ احداث کاربری',
          field: 'GenerateDate',
          editor: 'date'
        },
        {
          title: 'تاریخ تبدیل',
          field: 'ConversionDate',
          editor: 'date'
        },
        {
          title: 'قدمت ساختمان از',
          field: 'CreateYearFrom',
          editor: 'date'
        },
        { title: 'قدمت ساختمان تا', field: 'CreateYearTo', editor: 'date' },
        {
          title: 'ارتفاع مفید',
          field: 'UsefulHeight',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'ضخامت سقف',
          field: 'RoofThickness',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'دهنه متوسط',
          field: 'Dahaneh',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'درصد پیشرفت',
          field: 'ProgressPercent',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'مساحت تغییر کاربری',
          field: 'EditUsingArea',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'شماره واحد',
          field: 'UnitNo',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'عمق کاربری',
          field: 'UsingDepth',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'تعداد عمق اول',
          field: 'Depth1No',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'تعداد عمق دوم',
          field: 'Depth2No',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'تعداد عمق سوم',
          field: 'Depth3No',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'مساحت عمق اول',
          field: 'Depth1Area',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'مساحت عمق دوم',
          field: 'Depth2Area',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'مساحت عمق سوم',
          field: 'Depth3Area',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'وضعیت زیربنا',
          field: 'CI_HowChangeBuilding',
          editor: 'combo',
          domain: 'CI_SaraM1',
          cell: 'grid-combo'
        },
        {
          title: 'سطح اشغال',
          field: 'BusyArea',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'احداث مازاد بر سطح',
          field: 'OverOnArea',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'احداث مازاد بر تراکم',
          field: 'OverOnTarakom',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'احداث مازاد بر طول مجاورین',
          field: 'OverOnLengthNear',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'احداث مازاد یا بدون پروانه',
          field: 'OverOrNoParvaneh',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'زیربنای غیرمجاز در معبر',
          field: 'IllegalInfrastructure',
          editor: 'numeric',
          cell: 'numeric'
        },
        {
          title: 'فاصله جرم گذاری اصلی',
          field: 'MassDistance_Main',
          editor: 'numeric',
          cell: 'numeric'
        },
        { title: ' فاصله جرم گذاری فرعی', field: 'MassDistance_Sub' },
        { title: 'تاریخ اثر', field: 'ActDate', editor: 'date' }
      ]
    }
  },
  props: {
    value: Object
  },

  mounted () {
    // eslint-disable-next-line no-sequences, no-unused-expressions
    this.loadObj()
    this.loadObjHouse()
    this.loadObjBuilding()
    this.loadObj2()
  },
  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    }
    // archiveConfig () {
    //   // eslint-disable-next-line no-undef
    //   return window.getConfigValue('archiveCore')
    // },
    // query () {
    //   const sql = [];
    //   // NosaziCode fields
    //   ["Region", "Block", "House", "Building", "Apartment", "Shop"]
    //     .filter((field) => this.baseNosaziCode[field] !== 0)
    //     .forEach((field) => {
    //       sql.push(`BN.${field} = ${this.baseNosaziCode[field]}`)
    //     })
    //   sql.push("**")
    //   return " WHERE " + sql.join(" AND ")
    // }
  },

  methods: {
    fetched (val) {
      this.baseLibInNosaziCode = val
      this.loadObj()
    },
    loadObj () {
      this.showLoading()
      const payload = {
        pNidProc: this.nidProc,
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SC.getRevisitList(payload)
        .then(({ data }) => {
          this.getRevisitRes = this.getResponse(data)
          if (this.getRevisitRes.success) {
            this.Result.RevisitList_InNidRequest =
              this.getRevisitRes.data.RevisitList
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    loadObj2 () {
      this.selectedNosazi = ''
      this.nosaziCodeTrees = []
      this.childTree = null
      // if (!this.baseNosaziCode.District) {
      //   return this.showError("کد نوسازی به درستی تعیین نشده است.")
      // }
      this.showLoading()
      this.$services.SA.getNosaziCodeTreeChild(
        {
          pNosaziCode: {
            ...this.baseNosaziCode,
            ...this.options,
            NidUser: '00000000-0000-0000-0000-000000000000',
            NidBase: '00000000-0000-0000-0000-000000000000',
            NidNosaziCode: '00000000-0000-0000-0000-000000000000',
            NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
            NidRevisit: '00000000-0000-0000-0000-000000000000'
          }
        },
        this.config
      )
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (!res.data.Base_Front) res.data.Base_Front = []
          if (res.success !== true) {
            return this.showError('اطلاعات کد نوسازی بارگذاری نشد')
          }
          this.childTree = res.data['ChildTree'] || []
          const isValid = !!this.childTree.length
          if (isValid) {
            this.nosaziCodeTrees = this.createNosaziCodeTree(this.childTree)
          } else {
            this.showError('not correct')
          }
        })
        .catch((response) => {
          this.serverError()
          console.error('load error', response)
        })
        .finally(() => {
          this.hideLoading()
          // this.$nextTick(() => {
          //   if (this.$refs.tree) {
          //     this.$refs.tree.expandAll()
          //   }
          // })
        })
    },
    selectedNosaziCodeChanged (e) {
      if (e) {
        this.selectNosaziCode = e
        this.baseNosaziCode = convertStringToNosaziCodeObject(
          e.nosaziCodeString
        )
      }
    },
    selectRequestFromRequestList (val) {
      this.selectedRequestFromRequestList = val
    },
    loadObjHouse () {
      this.showLoading()
      const payload = {
        // "3e0d0975-fd81-42e0-902b-0c9130890357",
        PNidBase: this.value.NidBase,
        PLoadFun: 'Base_OtherEquipment',
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SC.getRevisitHouse(payload)
        .then(({ data }) => {
          this.getHouseRes = this.getResponse(data)
          if (this.getHouseRes.success) {
            this.othersPossibilities =
              this.getHouseRes.data.Base_OtherEquipment
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    loadObjBuilding () {
      this.showLoading()
      const payload = {
        // "acd2e4b3-8791-49eb-bade-c39227724e32"
        PNidBase: this.value.NidBase,
        PLoadFun:
          'Base_BuildingInfo,Base_Parking,Base_OtherEquipment,Base_SupplyParking,Base_Using',
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SC.getRevisitBuilding(payload)
        .then(({ data }) => {
          this.getBuildingRes = this.getResponse(data)
          // this.getBuildingRes.success --> it's false
          if (this.getBuildingRes.success) {
            this.Result.Base_Parking = this.getBuildingRes.data.Base_Parking
            this.Result.Base_SupplyParking =
              this.getBuildingRes.data.Base_SupplyParking
            this.Result.Base_OtherEquipment =
              this.getBuildingRes.data.Base_OtherEquipment
            this.Result.Base_Using = this.getBuildingRes.data.Base_Using
            this.Result.Base_BuildingInfo =
              this.getBuildingRes.data.Base_BuildingInfo
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
 -->
