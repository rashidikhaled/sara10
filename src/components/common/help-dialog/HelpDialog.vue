<template>
  <form-wrapper :hideTitle="true" :padding="false" dir="ltr">
    <fit>
      <q-carousel
        v-model="activeSlide"
        swipeable
        animated
        keep-alive
        class="fit"
        ref="carousel"
      >
        <q-carousel-slide
          v-for="(slide, _index) in helpDialog"
          :name="slide.id"
          :key="_index"
          class="column no-wrap"
        >
          <div class="slider_item text-center col">
            <q-img
              :alt="slide.alt"
              :title="slide.alt"
              :src="`program-guide/${slide.url}`"
            />
          </div>
          <div class="col-auto">
            <h6 dir="rtl" class="text-weight-bold text-center q-px-md text-body1 q-mt-md q-mb-none q-pa-none"
                style="letter-spacing: 0">
              {{ slide.desc }}
            </h6>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </fit>
    <template #footer>
      <div class="flex items-center justify-between q-gutter-xs q-px-sm">
        <q-btn icon="chevron_left" rounded :disable="activeSlide===0" @click="$refs.carousel.previous()">قبلی</q-btn>

        <div class="q-carousel__navigation-inner flex flex-center no-wrap">
          <q-btn
            :class="[
              'custom-navigation-dot',
              { active: slide.id === activeSlide },
            ]"
            v-for="(slide, _index) in helpDialog"
            :key="_index"
            @click.prevent="$refs.carousel.goTo(slide.id)"
          />
        </div>

        <q-btn icon-right="chevron_right" rounded :disable="activeSlide>=helpDialog.length-1" @click="$refs.carousel.next()">بعدی</q-btn>
      </div>
    </template>
  </form-wrapper>
</template>

<script>
export default {
  data () {
    return {
      title: 'راهنمای برنامه',
      name: 'HelpDialog',
      activeSlide: 0,
      helpDialog: [
        {
          id: 0,
          url: 'close_all_open_tabs.gif',
          alt: 'بستن همه تب های باز',
          desc: `مدیریت تب های باز`
        },
        {
          id: 1,
          url: 'header_open_tabs_search.gif',
          alt: 'جستجو در بین تب های باز',
          desc: `جستجو روی تب های باز`
        },
        {
          id: 2,
          url: 'open_bulletin_board.gif',
          alt: 'تابلو اعلانات',
          desc: `مشاهده ی آخرین اخبار و اطلاعیه های سیستم`
        },
        {
          id: 3,
          url: 'popup_maximize.gif',
          alt: 'به حداکثر رساندن پنجره',
          desc: `قابلیت تمام صفحه کردن پنجره ها`
        },
        {
          id: 4,
          url: 'popup_minimize.gif',
          alt: 'به حداقل رساندن پنجره',
          desc: `قابلیت به حداقل رساندن پنجره ها`
        },
        {
          id: 5,
          url: 'popup_resize.gif',
          alt: 'تغییر اندازه پنجره بازشو',
          desc: `تغییر اندازه پنجره ها`
        },
        {
          id: 6,
          url: 'sidebar_search.gif',
          alt: 'جستجو در سایدبار',
          desc: `جستجو در سایدبار`
        },
        {
          id: 7,
          url: 'split_map.gif',
          alt: 'split کردن صفحه از طریق هندلر',
          desc: `امکان جداسازی نقشه با کارتابل و یا فرم های دیگر`
        },
        {
          id: 8,
          url: 'toggle_dark_mode.gif',
          alt: 'تغییر حالت دارک / لایت مد',
          desc: `امکان فعال سازی حالت دارک در برنامه`
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.q-carousel {
  .slider_item {
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    border-radius: 5px;
    overflow: hidden;

    body.body--dark & {
      border-color: var(--dark-border);
    }
  }

  &__navigation-inner {
    .custom-navigation-dot {
      position: relative;
      border: 1px solid #bbb;
      box-shadow: inset 1px 1px 4px #bfbfbf;
      background-color: transparent;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      margin-left: 5px;
      cursor: pointer;
      transition: all 0.2s ease;
      overflow: hidden;

      &::before {
        position: absolute;
        background: var(--q-color-primary);
        content: "";
        width: 100%;
        height: 100%;
        transform: scale(0);
        transition: all 0.2s ease;
        border-radius: 50%;
      }

      &.active {
        background: var(--q-color-primary);

        &::before {
          transform: scale(1);
          transition: all 0.2s ease;
        }
      }
    }
  }
}
</style>
