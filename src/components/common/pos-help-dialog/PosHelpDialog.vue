<template>
  <form-wrapper :hideTitle="true" :padding="false" dir="ltr">
    <fit>
      <!-- <safa-label style="width:95px">{{warningText}}</safa-label> -->
       <SafaNotice style="direction: rtl;" :message="warningText" type="warning"/>
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
              :src="`${posGuidBaseUrl}/${slide.url}`"
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
  mounted () {
    this.warningText = `خطا در اتصال به دستگاه پوز چنانچه سایت در بستر https می باشد مراحل زیر را طی کنید`
  },
  props: {
    posGuidBaseUrl: {
      type: String,
      default: "pos-guide"
    }
  },
  data () {
    return {
      title: '',
      name: 'PosHelpDialog',
      activeSlide: 0,
      warningText: '',
      helpDialog: [
        {
          id: 0,
          url: 'siteSetting.png',
          alt: 'باز کردن siteSetting',
          desc: `باز کردن siteSetting`
        },
        {
          id: 1,
          url: 'insecureContent.png',
          alt: 'مطابق شکل insecureContent گزینه Allow را انتخاب کنید',
          desc: `مطابق شکل insecureContent گزینه Allow را انتخاب کنید`
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
