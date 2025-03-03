<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper vertical title="اطلاعات مسئولین">
     <template #header>
        <safa-status :result="result" />
      </template>
      <fit>
        <!-- <section padding> -->
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="منطقه"
              :use-input="false"
              source-type="local"
              :options="districts"
              v-model="selectedRegion"
              @input="load"
              label-width="50px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کاربر"
              :m="userMode"
              v-model="selectedStaffInfo.UserName"
              label-width="50px"
              @click="userListDialogState = true"
            >
              <template v-slot:append>
                <q-icon
                  name="search"
                  :disabled="!isEditable"
                  @click="userListDialogState = true"
                />
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-combo
              label="سمت مسئول"
              ci-name="CI_StaffPost"
              domain-name="CI_SaraM1"
              :m="newMode"
              v-model="selectedStaffInfo.CI_StaffPost"
              label-width="70px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام"
              :m="nameMode"
              v-model="selectedStaffInfo.Name"
              label-width="50px"
            />
          </FormControl>
        </FormRow>

        <safa-datatable
          helper="shStaffInfo"
          m="r"
          v-model="staffInfoRequest.Sh_StaffInfo"
          @selectedChange="handleSelectedChanged"
          fit
          max-height="100%"
          height="100%"
          minHeight="100%"
          title="اطلاعات مسئولین"
        />
      </fit>
      <safa-popup v-model="userListDialogState" title="لیست کاربران" vertical>
        <form-wrapper>
          <UsersList
            @selected="handleUserSelectionChanged"
            :formKey="formKey"
            :title="title"
            :name="name"
            :selectedRegion="selectedRegion"
          />
        </form-wrapper>
      </safa-popup>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="edit"
          @save="handleSave"
          @cancel="isEditable = false"
        >
          <template #after>
            <btn-new label="جدید" @click="handleAdd" v-if="!isEditable"/>
            <btn-delete
              label="حذف"
              :disable="!hasSelectedStaff"
              @click="handleRemove"
              v-if="!isEditable"
            />
          </template>
        </FormActions>
        <template>
        </template>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import staffInfoModel from './models/staffInfo'
import shStaffInfoModel from './models/shStaffInfo'
import UsersList from './partials/UsersList'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/staff-info',
  mixins: [baseFormMixin],
  components: {
    UsersList
  },
  data () {
    return {
      title: 'شهرسازی- اطلاعات مسئولین',
      formKey: 'ab50fbc3-870e-4528-b0a0-d51f80f6bbeb',
      name: 'UStaffInfo',
      main: true,
      isView: false,
      result: null,
      currentAction: 'view', // edit, new
      userListDialogState: false,
      selectedRegion: 1,
      staffInfoRequest: { ...staffInfoModel },
      selectedStaffInfo: { ...shStaffInfoModel },
      newMode: 'r',
      userMode: 'r',
      nameMode: 'r',
      isNew: false
    }
  },
  computed: {
    config () {
      return {
        config: {
          District: this.selectedRegion
        }
      }
    },
    hasSelectedStaff () {
      return this.selectedStaffInfo && this.selectedStaffInfo['NidStaffInfo']
    },
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },
  methods: {
    handleSelectedChanged (e) {
      const { NidStaffInfo } = e.dataItem || {}
      this.selectedStaffInfo = this.staffInfoRequest.Sh_StaffInfo.filter(
        (x) => x.NidStaffInfo === NidStaffInfo
      )[0]
    },
    handleUserSelectionChanged (user) {
      this.userListDialogState = false
      this.selectedStaffInfo.UserGID = user.NidUser
      this.selectedStaffInfo.UserName = user.username
    },

    handleAdd () {
      this.selectedStaffInfo = { ...staffInfoModel }
      this.isEditable = true
      this.newMode = 'e'
      this.nameMode = 'e'
      this.isNew = true
    },
    handleEdit () {
      if (!this.hasSelectedStaff) {
        return
      }
      this.currentAction = 'edit'
    },
    edit () {
      this.isEditable = true
      this.userMode = 'e'
      this.nameMode = 'e'
    },
    handleRemove () {
      if (!this.hasSelectedStaff) {
        return
      }
      this.showConfirm(
        'آیا از حذف مسئول (' + this.selectedStaffInfo.Name + ') مطمئن هستید؟ '
      ).onOk(async () => {
        this.showLoading()
        try {
          const response = await this.$services.SC.deleteStaffInfo(
            {
              pStaffInfo: {
                ...this.staffInfoRequest,
                Sh_StaffInfoObj: this.selectedStaffInfo
              }
            },
            this.config
          )
          this.result = this.getResponse(response.data)
          if (!this.result.success) {
            this.showError('حذف مسئول انجام نشد')
            return
          }
          this.selectedStaffInfo = { ...staffInfoModel }
          await this.log({
            action: this.logActions.delete,
            bizCode: this.selectedStaffInfo.NidStaffInfo,
            bizCodeTitle: 'NidStaffInfo'
          })

          this.showSuccess('مسئول با موفقیت حذف شد')
          this.load()
        } catch (e) {
          console.error(e)
          this.showError('خطایی رخ داد')
        } finally {
          this.hideLoading()
        }
      })
    },

    async handleSave () {
      if (this.selectedStaffInfo && this.selectedStaffInfo['NidStaffInfo']) {
        this.showLoading()
        try {
          this.staffInfoRequest.Sh_StaffInfoObj = this.selectedStaffInfo
          let payLoad = {
            pStaffInfo: this.staffInfoRequest
          }
          const response = await this.$services.SC.saveStaffInfo(
            payLoad,
            this.config
          )
          this.result = this.getResponse(response.data)
          if (!this.result.success) {
            this.showError('اطلاعات ذخیره نشد')
            return
          }
          this.selectedStaffInfo = { ...staffInfoModel }
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedStaffInfo.NidStaffInfo,
            bizCodeTitle: 'NidStaffInfo'
          })

          this.showSuccess('مسئول با موفقیت ذخیره شد')
          this.load()
          this.isEditable = false
          this.newMode = 'r'
          this.nameMode = 'r'
        } catch (e) {
          this.serverError()
        } finally {
          this.hideLoading()
        }
      } else {
        this.showError('لطفا یک ردیف از گرید انتخاب نمایید.')
      }
    },
    async load () {
      this.currentAction = 'view'
      this.showLoading()
      try {
        let response = await this.$services.SC.getStaffInfo(
          {
            pDistrict: this.selectedRegion
          },
          this.config
        )
        this.result = this.getResponse(response.data)
        if (!this.result.success) {
          this.showError('اطلاعات بارگذاری نشد')
          return
        }
        this.staffInfoRequest = this.result.data
        if (!this.isView) {
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRegion.toString(),
            bizCodeTitle: 'منطقه انتخاب شده'
          })
        }
        this.isView = true
      } catch (e) {
        console.error(e)
        this.showError('خطایی رخ داد')
      } finally {
        this.hideLoading()
      }
    }
  },

  mounted () {
    this.load()
  }
}
</script>
