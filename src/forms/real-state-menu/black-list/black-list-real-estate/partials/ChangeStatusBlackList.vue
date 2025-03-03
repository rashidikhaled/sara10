<template>
  <form-wrapper title="تغییر وضعیت">
    <template v-slot:header>
      <formHeaderByNosaziCode
        v-model="baseNosaziCode"
        cdcName="baseNosaziCode"
      />
    </template>
    <safa-status :result="baseLibResult"/>
    <safa-status :result="result"/>
    <fit>
      <div class="row q-col-gutter-sm ">
        <safa-combo-enum
          v-model="selectedStatus"
          cdcName="Status"
          class="col-md-3 "
          enum-name="EumBlackListControl"
          label="وضعیت"
          label-width="50px"
        ></safa-combo-enum>
        <div class="col-md-12">
          <text-template
            v-model="comments"
            :rows="5"
            cdcName="comments"
            formKey="ada36a28-b28c-4e91-ba10-48739d9c4610"
            label="توضیحات  "
            label-width="50px"
          ></text-template>
        </div>
      </div>
    </fit>
    <template v-slot:footer>
      <div class="row q-gutter-sm">
        <btn-save @click="accept"/>
        <btn-cancel
          label=" انصراف "
          @click="cancle"
        />
      </div>
    </template>
  </form-wrapper>
</template>
<script>
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibResult: null,
      baseLibResults: {
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_PreCodeInfo: {},
        BuildingObj: {},
        Sh_RequestInfo: {}
      },
      ownerName: '',
      oldNosaziCode: '',
      result: null,
      comments: '',
      exitBlackList: false,
      statusList: [
        { ID: 0, Title: 'هشدار' },
        { ID: 1, Title: 'توقف' },
        { ID: 2, Title: 'توقف صدور' }
      ],
      selectedStatus: 0
    }
  },
  methods: {
    changeStatusBlackListMethod () {
      let data = {
        pNidBlack: this.nidBlack,
        pComments: this.comments,
        pUserName: this.currentUser.FullName,
        // pUserCode: '7bc16d9a-9ac4-47af-bc28-adad1622a054',
        pUserCode: this.getNidUser(),
        IsAdmin: true,
        pDomain: this.taskInfo.Domain,
        pEumBlackListControl: this.selectedStatus
      }
      this.$services.SA.changeBlackListControl(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('تغییر وضعیت لیست سیاه با موفقیت انجام شد.')
            this.cancle()
            await this.log({
              action: this.logActions.update,
              bizCode: this.nidBlack,
              bizCodeTitle: 'NidBlack',
              saveDesc: `تغییر وضعیت لیست سیاه انجام گردید.`
            })
          }
        })
        .catch(e => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    accept () {
      this.changeStatusBlackListMethod()
    },
    cancle () {
      this.exitBlackList = true
      this.$emit('backToBlackListForm', this.exitBlackList)
    }
  },
  props: {
    nosaziCode: String,
    nidNosaziCode: String,
    entryCause: Number,
    nidBlack: String,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    baseNosaziCodeFromParent: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.baseNosaziCode = convertStringToNosaziCodeObject(this.nosaziCode)
  }
}
</script>
