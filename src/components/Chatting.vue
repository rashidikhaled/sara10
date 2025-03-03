<template>
  <div class="row chatting">
    <q-tabs
      full-style
      align="justify"
      class="col-12"
      v-model="currentTab"
    >
      <q-tab name="channel" label="کانال ها"/>
      <q-tab name="group" label="گروها"/>
    </q-tabs>

    <div class="col-12 q-pa-md" style="background-color: #f3f4f6">
      <q-input
        dense
        borderless
        input-class="q-px-md"
        placeholder="جستجو"
        class="bg-white search-input"
      >
        <template #append>
          <q-icon size="15px" name="search"/>
        </template>
      </q-input>
    </div>

    <q-tab-panels
      animated
      v-model="currentTab"
      class="col-12"
    >
      <q-tab-panel name="channel">
        <q-list
          v-if="!selectedChannel"
          separator
        >
          <q-item
            v-for="(channel, i) in channels" :key="channel.id"
            v-ripple
            clickable
            @click="selectedChannel = channel.id"
          >
            <q-item-section avatar side>
              <q-avatar size="46px">
                <q-img :src="`http://dev.safarayaneh.com:7010/img/ProfilePics/${((i + 3) % 9) + 1}.png`"/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-group-title">{{ channel.label}}</q-item-label>
              <q-item-label class="text-group-subtitle">{{ channel.messages[channel.messages.length-1].message}}
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-badge color="negative" text-color="white" :label="channel.unreadMessage"/>
            </q-item-section>
          </q-item>
        </q-list>
        <template v-else>
          <div class="row reverse text-center">
            <q-btn
              icon="close"
              @click="selectedChannel = null"
            />
          </div>
          <q-timeline class="q-pl-md">
            <q-timeline-entry heading>{{ currentChannel.label}}</q-timeline-entry>

            <q-timeline-entry
              v-for="(message, i) in currentChannel.messages" :key="i"
              :title="message.title"
              :subtitle="message.stamp + '\n توسط ' + message.sender"
              :avatar="`http://dev.safarayaneh.com:7010/img/ProfilePics/${((i + 3) % 9) + 1}.png`"
            >
              <div>
                {{ message.message}}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </template>
      </q-tab-panel>
      <q-tab-panel name="group">
        <q-list
          v-if="!selectedGroup"
          separator
          bordered
        >
          <q-item
            v-for="(group, i) in groups" :key="group.id"
            v-ripple
            clickable
            @click="selectedGroup = group.id"
          >
            <q-item-section avatar side>
              <q-avatar size="46px">
                <q-img :src="`http://dev.safarayaneh.com:7010/img/ProfilePics/${(i % 9) + 1}.png`"/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-group-title">{{ group.label}}</q-item-label>
              <q-item-label class="text-group-subtitle">{{ group.messages[group.messages.length-1].message[0]}}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge color="negative" text-color="white" :label="group.unreadMessage"/>
            </q-item-section>
          </q-item>
        </q-list>
        <template v-else>
          <div
            class="fit q-pa-md"
          >
            <div class="row reverse text-center">
              <q-btn
                icon="close"
                @click="selectedGroup = null"
              />
            </div>
            <div style="height: 68vh !important;">
              <q-chat-message
                v-for="(message, i) in currentGroup.messages" :key="i"
                :text="message.message"
                :sent="message.sender !== 'مدیر سیستم'"
                :name="message.sender"
                :avatar="`http://dev.safarayaneh.com:7010/img/ProfilePics/${(i % 9) + 1}.png`"
              />
            </div>

            <q-form>
              <q-input
                ref="sendingInput"
                dense
                filled
                clearable
                placeholder="پیام برای ارسال"
                v-model="textToSend"
              >
                <template #before>
                  <q-btn
                    round
                    dense
                    flat
                    type="submit"
                    :disable="!textToSend"
                    @click="sendMessage"
                  >
                    <q-icon name="send" :color="textToSend ? 'primary' :''"/>
                  </q-btn>
                </template>
              </q-input>
            </q-form>
          </div>
        </template>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: 'Chatting',

  data () {
    return {
      currentTab: 'group',
      selectedChannel: null,
      selectedGroup: null,
      textToSend: '',
      channels: [
        {
          id: '3f2294f3-3e04-4a24-8785-fb69348d0d90',
          label: 'اخبار روزانه',
          icon: 'groups',
          unreadMessage: 3,
          stamp: 'دو ساعت پیش',
          messages: [
            {
              title: 'مراسم ختم قرآن مجید',
              message: 'امروز پس از اقامه نماز جماعت ظهر به امامت حاج آقا حبیبیان، مراسم قرائت قرآن مجید برگزار خواهد شد.',
              sender: 'محمدعلی جعفری',
              stamp: '1399/02/28'
            },
            {
              title: 'مواد ضدعفونی کننده',
              message: 'جهت حفظ سلامت کارکنان، مواد ضدعفونی کننده در اختیار همگان قرار میگیرد. لطفا به واحد پشتیبانی مراجعه فرمایید',
              sender: 'حسن  حیدری',
              stamp: '1399/02/25'
            },
            {
              title: 'اعزام به گلزار شهدا',
              message: 'وسایل ایاب و ذهاب به مقصد گلزار شهدا فراهم گردیده، لطفا راس ساعت 10 صبح جلوی درب اصلی حضور به هم رسانید',
              sender: 'محمد علی جعفری',
              stamp: '1399/02/18'
            }
          ]
        },
        {
          id: '98b2a531-9bee-4608-9b1a-30f32ad97604',
          label: 'جلسات',
          icon: 'groups',
          unreadMessage: 1,
          stamp: 'دو هفته پیش',
          messages: [
            {
              title: 'جلسه هماهنگی اعضا',
              message: 'کارکنان محترم توجه فرمایید جلسه هماهنگی جهت استفاده از سیستم سرا 9 همه روز ساعت 13:00 در محل سالن جلسات برگزار میشود. حضور کلیه کارکنان الزامی می باشد',
              sender: 'سید حبیب پورلقمان',
              stamp: '1399/02/10'
            }
          ]
        },
        {
          id: '646fa96a-b1e5-439c-9134-c2d3e196d36b',
          label: 'مدیران بخشها',
          icon: 'groups',
          unreadMessage: 2,
          stamp: 'دیروز',
          messages: [
            {
              title: 'بخشنامه اجرایی 236',
              message: 'مدیران هر بخش لطفا با دقت پیگیر اجرای بندهای طرح شده در بخشنامه 236 باشند. مسئولیت هر گونه قصور متوجه راس هر بخش می باشد',
              sender: 'سید حبیب پورلقمان',
              stamp: '1399/02/27'
            },
            {
              title: 'شکایات ارباب رجوع',
              message: 'طی گزارشات واصله، برخی از ارباب رجوع ها از چرخه اداری جهت تکمیل فرایند درخواستی، شکایت دارند. استفاده از راهکارهای سیستمی بجای امور کاغذی و نامه نگاری را در اولویت کاری قرار دهید',
              sender: 'مریم بیرانوند اصل',
              stamp: '1399/02/25'
            }
          ]
        },
        {
          id: 'bf8d7e80-437b-463a-9a4d-3e574ceca69f',
          label: 'بازرسی',
          icon: 'groups',
          unreadMessage: 3,
          stamp: 'سه روز پیش',
          messages: [
            {
              title: 'اعلام ضوابط',
              message: 'دیده شده که برخی موارد کارکنان محترم بدون توجه به مفاد طرح تفصیلی اقدام به اعلام ضابطه و دستور نقشه می نمایند. صراحت برخورد با موارد اینچنین از مدیران ذی ربط در دستور کار قرار گیرد',
              sender: 'محمدحسن میرزایی',
              stamp: '1399/02/25'
            },
            {
              title: 'شکایات ارباب رجوع',
              message: 'ارباب رجوع شاکی یعنی عملکرد نادرست از جانب کارکنان. رعایت حقوق ارباب رجوع از اهم وظایف کارگزاران می باشد.',
              sender: 'مریم بیرانوند اصل',
              stamp: '1399/02/22'
            },
            {
              title: 'بخشنامه انظباطی',
              message: 'طی بخشنامه ارسالی از سوی وزارت محترم، رعایت کلیه شئونات اسلامی الزامی و نشانگر شخصیت پرسنل می باشد.',
              sender: 'حمیده پوریحی',
              stamp: '1399/02/12'
            }
          ]
        }
      ],
      groups: [
        {
          id: '0badc0a7-48b2-44b8-9e52-6e551ba56ed6',
          label: 'درآمد',
          icon: 'groups',
          unreadMessage: 3,
          stamp: 'دو ساعت پیش',
          messages: [
            {
              message: ['ارباب رجوع با کد 28056 تاییده سازمان ندارد.'],
              sender: 'مدیر سیستم',
              stamp: '1399/02/28'
            },
            {
              message: ['به واحد مربوطه ارجاع شد'],
              sender: 'حسن  حیدری',
              stamp: '1399/02/25'
            },
            {
              message: ['طرح تفصیلی بیش از 180٪ اجازه نمیدهد'],
              sender: 'محمد علی جعفری',
              stamp: '1399/02/18'
            }
          ]
        },
        {
          id: 'db22f728-6fe8-4115-9a92-63b5d74adb33',
          label: 'نوسازی',
          icon: 'groups',
          unreadMessage: 1,
          stamp: 'دو هفته پیش',
          messages: [
            {
              message: ['همکاران کی امروز میتونه جای من بمونه'],
              sender: 'محدثه میرآقلو',
              stamp: '1399/02/28'
            }
          ]
        },
        {
          id: '8652a62b-b12d-4618-b838-046652102cfa',
          label: 'صدور گواهی',
          icon: 'groups',
          unreadMessage: 2,
          stamp: 'دیروز',
          messages: [
            {
              message: [
                'آقای رضایی جانباز هستند. لطفا در کارشون مساعدت بیشتری شود',
                'شماره درخواست 28036 جهت تعمیرات ساختمان'
              ],
              sender: 'پگاه سلحشوری',
              stamp: '1399/02/28'
            },
            {
              message: ['من کارهای آقای رضایی رو انجام دادم. مراحل دبیرخانه رو به تعویق انداختم'],
              sender: 'میثم گودرزی',
              stamp: '1399/02/28'
            },
            {
              message: ['اجازه صدور احداث بنا وجود نداره؟ از کجا باید دسترسی بگیرم'],
              sender: 'میثم گودرزی',
              stamp: '1399/02/28'
            }
          ]
        }
      ]
    }
  },

  computed: {
    currentChannel () {
      return this.channels.filter(x => x.id === this.selectedChannel)[0] || {}
    },
    currentGroup () {
      return this.groups.filter(x => x.id === this.selectedGroup)[0] || {}
    }
  },

  methods: {
    sendMessage () {
      if (!this.currentGroup || !this.textToSend) {
        return
      }
      this.currentGroup.messages.push({
        message: [this.textToSend],
        sender: 'مدیر سیستم'
      })
      this.textToSend = ''
      this.$refs.sendingInput.focus()
    }
  }
}
</script>
