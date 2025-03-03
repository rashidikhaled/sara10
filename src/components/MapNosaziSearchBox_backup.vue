<template>
  <div class="map-nosazi-searchbox relative-position items-center" dir="ltr">
    <auto-width-input
      v-for="(part, i) in sections"
      :key="part"
      :min="0"
      maxlength="10"
      :title="getPartName(i)"
      type="number"
      :data-index="i"
      @blur="onBlur"
      @keyup.enter="processKey"
      @keyup.ctrl.enter="search"
      onclick="this.select()"
      v-model="code[part]"
      :ref="`nosaziInputRef_${i}`"
    />
    <span class="q-mx-sm"
      ><q-icon
        class="cursor-pointer text-theme-color"
        @click="search"
        size="sm"
        name="travel_explore"
    /></span>
    <!--    <div class="search-result">

        </div>-->
    <div v-if="loading" class="loading-overlay text-center absolute-full">
      <q-spinner-dots color="white" size="2em" />
    </div>
  </div>
</template>

<script>
import AutoWidthInput from "./common/AutoWidthInput"
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  name: "MapNosaziSearchBox",
  components: { AutoWidthInput },
  mixins: [baseFormMixin, mapMixin],
  data () {
    return {
      loading: false,
      sections: [
        "District",
        "Region",
        "Block",
        "House",
        "Building",
        "Apartment",
        "Shop"
      ],
      code: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  computed: {
    lastLocation () {
      return this.$store.getters["map/lastLocation"]
    },
    currentValue () {
      return this.code
    }
  },
  props: {
    actionIndex: {
      type: Number,
      default: 7 // service call on which input position
    },
    serviceFunc: Function
  },
  methods: {
    onBlur (e) {
      /* const currentIndex = parseInt(e.target.getAttribute('data-index'))
      if ((currentIndex + 1) >= this.actionIndex) {
        this.callService()
      } */
    },
    callService () {
      if (typeof this.serviceFunc === "undefined") {
        this.search()
      } else {
        this.serviceFunc(this.currentValue)
      }
    },
    processKey (e) {
      const currentIndex = parseInt(e.target.getAttribute("data-index"))
      if (
        currentIndex + 1 >= this.actionIndex ||
        (e.key === "Enter" && e.ctrlKey)
      ) {
        this.callService()
      } else {
        const currentIndex = parseInt(e.target.getAttribute("data-index"))
        const elem = this.$refs[`nosaziInputRef_${currentIndex + 1}`]
        if (elem) {
          elem[0].setFocus()
        }
      }
    },
    search () {
      const code = this.convertToNosaziCodeString(this.currentValue)
      this.showCodeOnMap(code, true)
    },
    getPartName (index) {
      return ["منطقه", "حوزه", "بلوک", "ملک", "ساختمان", "آپارتمان", "صنفی"][
        index
      ]
    }
  },
  watch: {
    selectedNosaziCode: {
      handler () {
        this.code = this.selectedNosaziCode
        this.search()
      },
      deep: true
    },
    lastLocation: {
      handler () {
        this.code = convertStringToNosaziCodeObject(this.lastLocation.Code)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.map-nosazi-searchbox {
  direction: rtl;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 2px 4px;
  min-width: 260px;

  input[type="number"] {
    margin: 0 1px;
    border-radius: 0;
    font-weight: 500;
    min-width: 40px;
    color: #000;
    height: 24px;
    border: none;
    border-left: 1px solid #eee;

    &::selection {
      background: #62e4f5;
      color: #005f6b;
    }
  }
}

.loading-overlay {
  background: rgba(0, 87, 184, 0.9);
}
</style>
