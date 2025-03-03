<template>
  <q-dialog :value="value" @input="closeModal" persistent>
    <q-card style="width: 400px; max-width: 80vw;" v-if="data">
      <div class="usergroup-list" v-if="data!==null">
        <div class="info-box">
          <div class="flex items-center"><span>نوع درخواست:</span>
            <span style="flex-grow: 1"><input
              onclick="this.select()" :value="data.WorkflowCaption" style="width: 100%" readonly/></span></div>
          <div class="flex items-center"><span>مرحله بعدی:</span>
            <span style="flex-grow: 1"><input
              onclick="this.select()" :value="data.NodeTitle" style="width: 100%" readonly/></span></div>
          <div v-if="taskInfo" class="flex items-center"><span>شماره درخواست:</span>
            <span style="flex-grow: 1"><input
              onclick="this.select()" :value="taskInfo.NidWorkItem" style="width: 100%" readonly/></span>
          </div>
        </div>
        <q-separator/>
        <div class="user-group-list">
          <div class="bg-white" style="position: sticky;top: 0; z-index: 1;">
            <div class="flex items-center q-ma-sm" ><span>جستجو:</span>
              <span style="flex-grow: 1"><input
                onclick="this.select()" v-model="searchTxt" style="width: 100%"/></span>
            </div>
          </div>
          <q-list>
            <q-item clickable
                    active-class="text-green"
                    :active="selectedUser && (selectedUser.NidUserGroup === user.NidUserGroup)"
                    @click="selectedUser=user" v-ripple v-for="(user,index) in userGroups" :key="index">
              <q-item-section avatar>
                <user-avatar :src="user.NidUserGroup | avatar" size="32px"
                             :default-src="getDefaultImage(user)"/>
                <!--<q-avatar size="32px">
                  &lt;!&ndash;                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVYUbi-Jf5QxIW-koSAO97ZmKrOXadXeJ3xQ&usqp=CAU" />&ndash;&gt;
                  <q-img src="https://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png"/>
                </q-avatar>-->
                <!--<q-avatar size="48px">
                  <q-img
                    :src="userImage(user.NidUserGroup)"
                    style="width:50px;height:50px"
                  />
                </q-avatar>-->
              </q-item-section>
              <q-item-section>{{user.UserGroupTitle}}</q-item-section>
              <q-item-section side>
                {{ user.UserGroupType ==='User'? 'کاربر':'گروه' }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-separator/>
        <div class="selected-usergroup" v-if="selectedUser!==null">
          <q-list>
            <q-item-label header>کاربر/گروه انتخاب شده</q-item-label>
            <q-item active-class="bg-green-2 text-dark" active focused>
              <q-item-section avatar>
                <user-avatar :src="selectedUser.NidUserGroup | avatar" size="32px"
                             :default-src="getDefaultImage(selectedUser)"/>
                <!--<q-avatar size="48px">
                  <q-img
                    :src="userImage(user.NidUserGroup)"
                    style="width:50px;height:50px"
                  />
                </q-avatar>-->
              </q-item-section>
              <q-item-section>{{selectedUser.UserGroupTitle}}</q-item-section>
              <q-item-section side>
                {{ selectedUser.UserGroupType ==='User'? 'کاربر':'گروه' }}
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator/>
        </div>
        <!--        {{selectedUser}}-->
        <div class="q-pa-sm">
          <div class="select-actions row q-col-gutter-x-sm">
            <div class="col-6">
              <q-btn @click="closeModal" outline class="full-width">انصراف</q-btn>
            </div>
            <div class="col-6">
              <q-btn :disabled="selectedUser===null" @click="createTask" class="full-width" color="primary">تایید
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import kartableMixin from '../mixins/kartableMixin'

/* {
              "FromNidTask": "18d5bc64-b953-49ae-aff9-7b6d65f6b60a",
              "NidNode": "7",
              "SwimLineCaption": "متقاضی",
              "NodeTitle": "صدور پروانه",
              "WorkflowCaption": "صدور پروانه اینترنتی",
              "AssingTo": "",
              "AssingToUserName": "",
              "EumAssingType": "User/Group",
              "UserGroups": "[{\"NidTaskTypeUserGroup\":\"1\",\"NidTaskType\":\"1CA53940-BB29-4880-AF22-F4F5C53EA844\",\"UserGroupTitle\":\"حسن علی منضور\",\"UserGroupType\":\"User\",\"NidUserGroup\":\"37e5f7ef-4d07-4715-89fc-2b63b6019750\"},{\"NidTaskTypeUserGroup\":\"2\",\"NidTaskType\":\"1CA53940-BB29-4880-AF22-F4F5C53EA844\",\"UserGroupTitle\":\"علی اکبری\",\"UserGroupType\":\"User\",\"NidUserGroup\":\"37e5f7ef-4d07-4715-89fc-2b63b6019750\"},{\"NidTaskTypeUserGroup\":\"3\",\"NidTaskType\":\"1CA53940-BB29-4880-AF22-F4F5C53EA844\",\"UserGroupTitle\":\"پشتیبانی ستاد\",\"UserGroupType\":\"Group\",\"NidUserGroup\":\"37e5f7ef-4d07-4715-89fc-2b63b6019750\"}]"
            } */
export default {
  name: 'CreateTaskDialog',
  mixins: [kartableMixin],
  props: {
    value: Boolean,
    data: Object,
    taskInfo: Object
  },
  data () {
    return {
      selectedUser: null,
      searchTxt: ''
    }
  },
  computed: {
    userGroups () {
      if (!this.data || !this.data.UserGroups) return []
      let allList = JSON.parse(this.data.UserGroups)
      return allList.filter((x) => {
        return x.UserGroupTitle.toLowerCase().includes(this.convertToArabicText(this.searchTxt.toLowerCase()))
      })
    }
  },
  methods: {
    convertToArabicText (str) {
      if (typeof str === 'number') str = str.toString()
      if (typeof str !== 'string') return str
      return str
        .replace('ی', 'ي')
        .replace('ک', 'ک')
    // .replace('ت', 'ة')
    // .replace('ا', 'إ')
    // .replace('ا', 'أ')
    // .replace('و', 'ؤ')
    },
    createTask () {
      this.$emit('createTask', this.selectedUser)
      this.closeModal()
    },
    closeModal () {
      this.selectedUser = null
      this.$emit('input', false)
      this.redirectToKartable()
    }
  }
}
</script>

<style scoped lang="scss">
  .info-box {
    padding: 14px;
    background-color: #eee;

    > div {
      &:not(:last-child) {
        margin-bottom: 10px;
      }

      > span:first-child {
        margin-right: 7px;
        min-width: 90px;
      }
    }
  }

  .user-group-list {
    margin: 8px;
    min-height: 120px;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-height: 240px;
    overflow: auto;
  }
</style>
