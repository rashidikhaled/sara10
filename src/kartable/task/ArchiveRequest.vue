<template>
  <form-wrapper :title="title">
    <template #header>
    <safa-status :result="result" />
    <safa-status :result="sendToPermanentKartablresult" />
      <form-header-by-nosazi-code
        v-model="baseNosaziCode"
        m="r"
        :actions="false"
      />
    </template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="شماره پرونده"
            label-width="80px"
            m="r"
            v-model="taskInfo.NidWorkItem"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نوع پرونده"
            label-width="80px"
            m="r"
            v-model="taskInfo.WorkflowTitel"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ تشکیل"
            label-width="80px"
            m="r"
            v-model="taskInfo.TaskStartDate"
          />
        </FormControl>
        <text-template
          class="col-12"
          label="توضیحات"
          label-width="80px"
          type="textarea"
          v-model="comments"
          formKey="D89825F5-4431-46EF-9A95-447A7A75FF10"
          :rows="3"
          required
          validations="required"
        />
      </FormRow>
      <div class="fit">
        <fit>
          <q-toolbar
            :class="['items-center q-px-sm q-py-xs', $q.dark.isActive?'bg-dark':'bg-grey-3']"
            style="min-height: 34px; border-radius: 3px"
          >
            <q-toolbar-title class="text-body2">ساختار درختی</q-toolbar-title>
          </q-toolbar>
          <div class="custom-scroll fit">
            <q-tree
              :nodes="nosaziCodeTrees"
              class="bordered"
              default-expand-all
              label-key="label"
              accordion
              node-key="key"
              :duration="0"
              ref="tree"
              selected-color="primary"
            />
          </div>
        </fit>
      </div>
    </fit>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-default label="ارسال" @click="handleArchiveRequest"/>
        <btn-cancel @click="$emit('hide')"/>
      </div>
    </template>
  </form-wrapper>
</template>
<script>
import { convertStringToNosaziCodeObject, createRevisitTree, createTree } from '../utils/nosaziCodeOperation'
import ResponseParser from '../utils/responseParser'
import kartableMixin from '../mixins/kartableMixin'

export default {
  mixins: [kartableMixin],
  props: { taskInfo: Object },
  data () {
    return {
      name: 'ArchiveRequest',
      title: 'اطلاعات بایگانی دائم',
      comments: '',

      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      childTree: [],
      nosaziCodeTrees: [],

      model: {
        Sh_RequestInfo: {
          NidWorkItem: '',
          RequestDate: '',
          RequesterAddress: '',
          WorkflowTitel: ''
        },
        Sh_Workflow: {
          WorkflowTitel: ''
        }
      },
      result: null,
      sendToPermanentKartablresult: null
    }
  },

  mounted () {
    this.baseNosaziCode = convertStringToNosaziCodeObject(
      this.taskInfo.BizCode
    )
    this.loadTree()
  },

  methods: {
    createNosaziCodeTree (list) {
      return createTree(list)
    },
    createRevisitTree (list) {
      return createRevisitTree(list)
    },
    async loadTree () {
      this.nosaziCodeTrees = []
      this.showLoading()
      await this.$services.SA.getNosaziCodeTreeChild(
        {
          pNosaziCode: {
            ...this.baseNosaziCode,
            NidUser: '00000000-0000-0000-0000-000000000000',
            NidBase: '00000000-0000-0000-0000-000000000000',
            NidNosaziCode: '00000000-0000-0000-0000-000000000000',
            NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
            NidRevisit: '00000000-0000-0000-0000-000000000000'
          }
        },
        this.config
      )
        .then(async ({ data }) => {
          this.result = new ResponseParser(data).get()
          this.childTree = this.result.data['ChildTree'] || []
          const isValid = !!this.childTree.length
          if (this.log) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.taskInfo.BizCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: this.taskInfo.BizCode
            })
          }
          if (isValid) {
            this.nosaziCodeTrees = this.createNosaziCodeTree(this.childTree)
          } else {
            this.showError('کد نوسازی معتبر نمیباشد.')
          }
        })
        .catch((err) => {
          this.serverError()
          console.error('err', err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handleArchiveRequest () {
      this.showConfirm('آیا از ارسال به بایگانی دائم اطمینان دارید؟').onOk(
        () => {
          this.sendToPermanentKartablNew()
        }
      )
    },

    async sendToPermanentKartablNew () {
      if (!this.isValidForm()) return
      this.showLoading()
      try {
        const payLoad = {
          pNidProc: this.taskInfo.NidProc,
          pComments: this.comments,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.taskInfo.WorkflowTitel,
            WorkflowGuid: this.taskInfo.NidWorkflowDeff
          }
        }
        const { data } = await this.$services.SC.sendToPermanentKartablNew(
          payLoad,
          this.config
        )
        this.sendToPermanentKartablresult = new ResponseParser(data).get()
        if (this.sendToPermanentKartablresult.success) {
          this.showSuccess('ارسال به بایگانی دائم با موفقیت انجام شد.')
          this.$emit('archivedRequest')
        }
      } catch (e) {
        this.serverError()
        console.error('error', e)
      } finally {
        this.hideLoading()
      }
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.taskInfo.Domain
        }
      }
    }
  }
}
</script>
