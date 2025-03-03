<template>
  <section class="row full-height">
    <div class="col custom-scroll" style="min-height: 0">
      <div v-show="activeTab === 'takhalof'" class="q-pa-sm fit">
        <div class="row q-py-md items-center">
          <div class="col-12 col-md-4">
            <q-img
              contain
              height="150px"
              src="images/shahrdari-logo.png"
              width="150px"
            />
          </div>
          <div class="col-12 col-md-4 text-center">
            <h1
              class="q-ma-none text-bold text-positive"
              style="font-size: 2.4rem"
            >
              لایحه
            </h1>
          </div>
          <q-space />
          <div class="col-12 col-md-auto">
            <div class="column" style="width: 300px">
              <div class="q-mb-md">
                <safa-text
                  v-model="model.ComLayehe.RevisitDate"
                  cdcName="RevisitDate"
                  m="r"
                  label="تاریخ بازدید از ملک:"
                  label-width="110px"
                />
              </div>
              <div class="q-mb-md">
                <safa-text
                  v-model="model.ComLayehe.LayeheNo"
                  cdcName="LayeheNo"
                  m="r"
                  label="شماره لایحه:"
                  label-width="110px"
                />
              </div>
              <div>
                <safa-text
                  :value="today"
                  cdcName="today"
                  m="r"
                  label="تاریخ:"
                  label-width="110px"
                />
              </div>
              <!--          <div class="flex items-center q-mb-md"><span style="min-width: 110px">تاریخ بازدید از ملک:</span><span>{{ model.ComLayehe.RevisitDate }}</span></div>
                        <div class="flex items-center q-mb-md"><span style="min-width: 110px">شماره لایحه:</span><span>{{ model.ComLayehe.LayeheNo }}</span></div>
                        <div class="flex items-center"><span style="min-width: 110px">تاریخ:</span><span>{{ today }}</span></div>-->
            </div>
          </div>
        </div>
        <internal-section ref="sec1" title="مشخصات ملک">
          <FormRow :lg="4" :md="4" :xl="4" :xxl="4">
            <FormControl>
              <safa-text
                m="r"
                v-model="model.ComLayehe.OwnerName"
                cdcName="OwnerName"
                label="نام مالک / نام ذینفع"
                label-width="110px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                v-model="model.ComLayehe.RequesterName"
                cdcName="RequesterName"
                label="تشکیل دهنده پرونده"
                label-width="110px"
              />
            </FormControl>
            <FormControl class-name="col-12 col-md-6">
              <safa-text
                m="r"
                v-model="model.ComLayehe.RegisterPlak"
                cdcName="RegisterPlak"
                label="پلاک ثبتی"
                label-width="110px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                v-model="model.ComLayehe.DocArea"
                cdcName="DocArea"
                label="مساحت طبق سند"
                label-width="110px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                v-model="model.ComLayehe.CurArea"
                cdcName="CurArea"
                label="مساحت وضع"
                label-width="110px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                v-model="model.ComLayehe.AreaAfterEdit"
                cdcName="AreaAfterEdit"
                label="مقدار در مسیر"
                label-width="110px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                v-model="model.ComLayehe.MeghdarDarMasir"
                cdcName="MeghdarDarMasir"
                label="مساحت پس از بر اصلاحی"
                label-width="110px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                v-model="model.ComLayehe.SazehType"
                cdcName="SazehType"
                label="نوع سازه"
                label-width="110px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                v-model="model.ComLayehe.RoofType"
                cdcName="RoofType"
                label="نوع سقف"
                label-width="110px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                v-model="model.ComLayehe.Mahdoode"
                cdcName="Mahdoode"
                label="محدوده ملک"
                label-width="110px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                v-model="model.ComLayehe.BuildingType"
                cdcName="BuildingStep"
                label="نوع ساختمان"
                label-width="110px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                v-model="model.ComLayehe.BuildingStep"
                cdcName="BuildingType"
                label="مرحله ساختمانی"
                label-width="110px"
              />
            </FormControl>
            <form-control class="col-12 col-md-9">
              <safa-text
                m="r"
                v-model="model.ComLayehe.Address"
                cdcName="Address"
                label="نشانی ملک"
                label-width="110px"
              />
            </form-control>
          </FormRow>

          <!-- <safa-datatable
           helper="tarh"
           m="r"
             fit
             height="100%"
             max-height="100%"
             min-height="200px"
             @row-click="selectedRow"
             @DeleteClick="handelDeleteCapacity"
             :show-selected-checkbox="true"
             :allowMultipleSelection="false"
             :addRow="false"
             :deleteRow="false"
             :allowCopy="false"
             paginate
         /> -->

          <!-- <safa-datatable
            title=""
            columns=""
            height="150px"
          />
          />
          <safa-datatable
            title=""
            columns=""
            height="150px"
          />
          /> -->
          <!-- <safa-datatable
            title=""
            columns=""
            height="150px"
          />
          />
          <safa-datatable
            title=""
            columns=""
            height="150px"
          />
          /> -->
          <!-- <safa-datatable
            title=""
            columns=""
            height="150px"
          />
          />
          <safa-datatable
            title=""
            columns=""
            height="150px"
          />
          />
          <safa-datatable
            title=""
            columns=""
            height="150px"
          /> -->
          <!-- /> -->

          <!-- </FormRow> -->
        </internal-section>
        <internal-section ref="sec2" title="طرح">
          <div>
            <q-markup-table
              :dark="$q.dark.isActive"
              bordered
              dense
              flat
              separator="cell"
              square
            >
              <thead>
                <tr>
                  <th colspan="2">تفضیلی</th>
                  <th colspan="2">کاربری</th>
                  <th>تراکم</th>
                  <th>سطح اشغال</th>
                  <th>تعداد واحد</th>
                  <th>تعداد طبقات</th>
                </tr>
                <tr>
                  <th>مجاز</th>
                  <th>مصوب</th>
                  <th>مجاز</th>
                  <th>مصوب</th>
                  <th>مجاز</th>
                  <th>مجاز</th>
                  <th>مجاز</th>
                  <th>مجاز</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">{{ model.ComLayehe.MojazPlan }}</td>
                  <td class="text-center">{{ model.ComLayehe.MosavabPlan }}</td>
                  <td class="text-center">{{ model.ComLayehe.MojazUsing }}</td>
                  <td class="text-center">
                    {{ model.ComLayehe.MosavabUsing }}
                  </td>
                  <td class="text-center">
                    {{ model.ComLayehe.TarakomMojaz }}
                  </td>
                  <td class="text-center">
                    {{ model.ComLayehe.BusyAreaMojaz }}
                  </td>
                  <td class="text-center">
                    {{ model.ComLayehe.VahedCountMojaz }}
                  </td>
                  <td class="text-center">
                    {{ model.ComLayehe.FloorCountMojaz }}
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </internal-section>
        <internal-section ref="sec3" title="مشخصات آخرین گواهی های صادره">
          <div>
            <q-markup-table
              :dark="$q.dark.isActive"
              bordered
              dense
              flat
              separator="cell"
              square
            >
              <thead>
                <tr>
                  <th colspan="2">پروانه</th>
                  <th colspan="2">عدم خلاف</th>
                  <th colspan="2">پایان کار</th>
                </tr>
                <tr>
                  <th>شماره</th>
                  <th>تاریخ</th>
                  <th>شماره</th>
                  <th>تاریخ</th>
                  <th>شماره</th>
                  <th>تاریخ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, index) in allCertificats"
                  :key="`allCertificats_${index}`"
                >
                  <td class="text-center">
                    {{ row.ParvanehLicenceNo }}
                  </td>
                  <td class="text-center">
                    {{ row.ParvanehLicenceDate }}
                  </td>
                  <td class="text-center">
                    {{ row.TreepassLicenceNo }}
                  </td>
                  <td class="text-center">
                    {{ row.TreepassLicenceDate }}
                  </td>
                  <td class="text-center">
                    {{ row.PayanLicenceNo }}
                  </td>
                  <td class="text-center">
                    {{ row.PayanLicenceDate }}
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </internal-section>
        <internal-section ref="sec4" title="مشخصات کالبدی ملک">
          <div>
            <q-markup-table
              :dark="$q.dark.isActive"
              bordered
              dense
              flat
              separator="cell"
              square
            >
              <thead>
                <tr>
                  <th colspan="5">بنای در حد ضابطه</th>
                  <th colspan="2">بنابر اساس آخرین مجوز/ رسیدگی شده</th>
                  <th colspan="2">بنابراجرا</th>
                  <th>مغایرت</th>
                  <th>درصد سطح اشغال ناخالص</th>
                </tr>
                <tr>
                  <th>طبقه</th>
                  <th class="bg-cyan-1 text-cyan-10">مساحت</th>
                  <th>تعداد واحد مجاز</th>
                  <th>تعداد واحد موجود</th>
                  <th>مغایرت تعداد واحد</th>
                  <th>مورد استفاده</th>
                  <th>مساحت</th>
                  <th>مورد استفاده</th>
                  <th class="bg-green-1 text-green-10">مساحت</th>
                  <th class="bg-deep-purple-1 text-deep-purple-10">مساحت</th>
                  <th class="bg-pink-1 text-pink-10">وضع موجود</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in model.ComLayehe.ComLayehe_Usings"
                  :key="`ComLayehe_Usings_${index}`"
                >
                  <td>
                    {{ item.FloorType }}
                  </td>
                  <td class="bg-cyan-1 text-cyan-10 text-center" dir="ltr">
                    {{ item.ZabetehArea }}
                  </td>
                  <td>
                    {{ item.MojazUnitCount }}
                  </td>
                  <td>
                    {{ item.MojodUnitCount }}
                  </td>
                  <td>
                    {{ item.DiffUnitCount }}
                  </td>
                  <td>
                    {{ item.LastLicenceUsingType }}
                  </td>
                  <td>
                    {{ item.LastLicenceUsingArea }}
                  </td>
                  <td>
                    {{ item.CurUsingType }}
                  </td>
                  <td class="bg-green-1 text-green-10 text-center" dir="ltr">
                    {{ item.CurUsingArea }}
                  </td>
                  <td
                    class="bg-deep-purple-1 text-deep-purple-10 text-center"
                    dir="ltr"
                  >
                    {{ item.DiffArea }}
                  </td>
                  <td class="bg-pink-1 text-pink-10 text-center" dir="ltr">
                    {{ item.BusyAreaCur }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="5">
                    جمع:&nbsp;{{ ComLayehe_Usings_ZabetehAreaSum }}
                  </td>
                  <td colspan="2">
                    جمع:&nbsp;{{ ComLayehe_Usings_LastLicenceUsingAreaSum }}
                  </td>
                  <td colspan="2">
                    جمع:&nbsp;{{ ComLayehe_Usings_CurUsingAreaSum }}
                  </td>
                  <td colspan="1">
                    جمع:&nbsp;{{ ComLayehe_Usings_DiffAreaSum }}
                  </td>
                  <td colspan="1">
                    جمع:&nbsp;{{ ComLayehe_Usings_BusyAreaCurSum }}
                  </td>
                </tr>
              </tfoot>
            </q-markup-table>
          </div>
        </internal-section>
        <internal-section ref="sec5" title="تخلفات شهرسازی">
          <!-- helper="takhalofatSharsazi" -->
          <safa-datatable
            v-model="model.ComLayehe.ComLayehe_TakhalofatSharsazi"
            cdcName="ComLayehe_TakhalofatSharsazi"
            :addRow="false"
            :allowCopy="false"
            :allowMultipleSelection="false"
            :deleteRow="false"
            :show-selected-checkbox="true"
            fit
            :columns="[
              { field: 'Penalty', title: 'عنوان' },
              {
                field: 'BuildingDate',
                title: 'تاریخ وقوع تخلف از نظر شهرسازی',
                width: '150px',
              },
              {
                field: 'TrespassDateInMunicipality',
                title: 'تاریخ وقوع تخلف از نظر شهرداری',
                width: '150px',
              },
              {
                field: 'TrespassDateInEngineer',
                title: 'تاریخ وقوع تخلف از نظر مهندس ناظر',
                width: '150px',
              },
              {
                field: 'TrespassDateHappendNotMelak',
                title: 'تاریخ وقوع خلاف ملاک عمل',
                width: '150px',
              },
              {
                field: 'PenaltyValue',
                title: 'مساحت',
                calculateFunc: ({ column, rows }) => {
                  if (!rows) return '';
                  const result = rows.reduce(function (a, b) {
                    return a + parseFloat(b[column.field]);
                  }, 0);
                  return `جمع : ${result}`;
                },
              },
              { field: 'UsingGroup', title: 'گروه کاربري اصلي موجود' },
              { field: 'UnitCount', title: 'تعداد واحد' },
              { field: 'Floor', title: 'کد طبقه' },
              { field: 'FloorNo', title: 'طبقه' },
              { field: 'SysValue', title: 'مقدار سیستمی' },
              { field: 'TrepassStatus', title: 'وضعیت تخلف' },
              { field: 'TrepassValueAmar', title: 'متراژ کسراز آمار' },
            ]"
            m="r"
            paginate
            title="تخلفات شهرسازی"
          >
          </safa-datatable>
        </internal-section>
        <internal-section
          ref="sec6"
          v-if="!hideMojazParvaneh"
          title="مشخصات مجازساختمان مطابق آخرين گواهی"
        >
          <div>
            <q-markup-table
              :dark="$q.dark.isActive"
              bordered
              dense
              flat
              separator="cell"
              square
            >
              <thead :class="$q.dark.isActive ? 'bg-darken1' : 'bg-blue-1'">
                <tr>
                  <th rowspan="2">طبقات</th>
                  <th
                    v-for="(col, i) in mojazColumns"
                    :key="`mojazColumns_${i}`"
                    :colspan="2"
                  >
                    {{ col }}
                  </th>
                  <!--            <th colspan="2">بهداشتی - درمانی</th>-->
                  <!--            <th colspan="2">تجاری</th>-->
                  <!--            <th colspan="2">صنعتی</th>-->
                  <!--            <th colspan="2">اداری</th>-->
                  <!--            <th colspan="2">مسکونی</th>-->
                  <th rowspan="2">ارتفاع</th>
                </tr>
                <tr>
                  <!--            <th style="border-right: 1px solid rgba(0, 0, 0, 0.12)">واحد</th>-->
                  <template
                    v-for="(col, i) in new Array(mojazColumns.length).fill('')"
                  >
                    <th
                      :key="`mojazColumns2_${i}`"
                      v-if="i === 0"
                      :style="`border-right: 1px solid ${
                        $q.dark.isActive
                          ? 'rgba(255, 255, 255, 0.28)'
                          : 'rgba(0, 0, 0, 0.12)'
                      }`"
                    >
                      واحد
                    </th>
                    <th v-else :key="`mojazColumns3_${i}`">واحد</th>
                    <th :key="`mojazColumns4_${i}`">مساحت</th>
                  </template>
                  <!--            <th>مساحت</th>-->
                  <!--            <th>واحد</th>-->
                  <!--            <th>مساحت</th>-->
                  <!--            <th>واحد</th>-->
                  <!--            <th>مساحت</th>-->
                  <!--            <th>واحد</th>-->
                  <!--            <th>مساحت</th>-->
                  <!--            <th>واحد</th>-->
                  <!--            <th>مساحت</th>-->
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, index) in mojazRows"
                  :key="`mojazRows_${index}`"
                >
                  <td>
                    {{ row.FloorType }}
                  </td>
                  <!--            <td>-->
                  <!--              {{ item.Vahed }}-->
                  <!--            </td>-->
                  <!--            <td>-->
                  <!--              {{ item.UsingArea }}-->
                  <!--            </td>-->
                  <template v-for="(col, i) in mojazColumns">
                    <td
                      :key="`mojazColumns5_${i}`"
                      :class="$q.dark.isActive ? 'bg-darken3' : 'bg-grey-1'"
                      class="text-center"
                    >
                      {{ row[col].Vahed }}
                    </td>
                    <td
                      :key="`mojazColumns6_${i}`"
                      :class="$q.dark.isActive ? 'bg-darken3' : 'bg-grey-1'"
                      class="text-center"
                    >
                      {{ row[col].UsingArea }}
                    </td>
                  </template>
                  <td class="text-center">
                    {{ row.Height }}
                  </td>
                  <!--            <td>-->
                  <!--              {{ item.PayanLicenceDate }}-->
                  <!--            </td>-->
                </tr>

                <!--          <tr>-->
                <!--            <td v-for="i in new Array(12).fill('')"></td>-->
                <!--          </tr>-->
              </tbody>
              <!-- <tfoot>
                <tr>
                  <td :colspan="mojazColumns.length * 2 + 1"></td>
                  <td class="text-center">جمع: {{ mojazTotal }}</td>
                </tr>
              </tfoot> -->
            </q-markup-table>
          </div>
        </internal-section>
        <internal-section
          ref="sec7"
          title="مشخصات موجود ساختمان مطابق آخرین بازدید"
        >
          <div>
            <q-markup-table
              :dark="$q.dark.isActive"
              bordered
              dense
              flat
              separator="cell"
              square
            >
              <thead :class="$q.dark.isActive ? 'bg-darken1' : 'bg-blue-1'">
                <tr>
                  <th rowspan="2">طبقات</th>
                  <th
                    v-for="(col, i) in mojudColumns"
                    :key="`mojudColumns1_${i}`"
                    :colspan="2"
                  >
                    {{ col }}
                  </th>
                  <!--            <th colspan="2">بهداشتی - درمانی</th>-->
                  <!--            <th colspan="2">تجاری</th>-->
                  <!--            <th colspan="2">صنعتی</th>-->
                  <!--            <th colspan="2">اداری</th>-->
                  <!--            <th colspan="2">مسکونی</th>-->
                  <th rowspan="2">ارتفاع</th>
                  <th rowspan="2">احداث مازاد بر سطح</th>
                </tr>
                <tr>
                  <!--            <th style="border-right: 1px solid rgba(0, 0, 0, 0.12)">واحد</th>-->
                  <template
                    v-for="(col, i) in new Array(mojudColumns.length).fill('')"
                  >
                    <th
                      :key="`mojudColumns2_${i}`"
                      v-if="i === 0"
                      :style="`border-right: 1px solid ${
                        $q.dark.isActive
                          ? 'rgba(255, 255, 255, 0.28)'
                          : 'rgba(0, 0, 0, 0.12)'
                      }`"
                    >
                      واحد
                    </th>
                    <th v-else :key="`mojudColumns3_${i}`">واحد</th>
                    <th :key="`mojudColumns4_${i}`">مساحت</th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, index) in mojudRows"
                  :key="`mojudRows2_${index}`"
                >
                  <td>
                    {{ row.FloorType }}
                  </td>
                  <!--            <td>-->
                  <!--              {{ item.Vahed }}-->
                  <!--            </td>-->
                  <!--            <td>-->
                  <!--              {{ item.UsingArea }}-->
                  <!--            </td>-->
                  <template v-for="(col, i) in mojudColumns">
                    <td
                      :key="`mojudColumns5_${i}`"
                      :class="$q.dark.isActive ? 'bg-darken3' : 'bg-grey-1'"
                      class="text-center"
                    >
                      {{ row[col]?.Vahed || "" }}
                    </td>
                    <td
                      :key="`mojudColumns6 _${i}`"
                      :class="$q.dark.isActive ? 'bg-darken3' : 'bg-grey-1'"
                      class="text-center"
                    >
                      {{ row[col].UsingArea }}
                    </td>
                  </template>
                  <td class="text-center">
                    {{ row.Height }}
                  </td>
                  <td class="text-center">
                    {{ row.OverOnArea }}
                  </td>
                  <!--            <td>-->
                  <!--              {{ item.PayanLicenceDate }}-->
                  <!--            </td>-->
                </tr>

                <!--          <tr>-->
                <!--            <td v-for="i in new Array(12).fill('')"></td>-->
                <!--          </tr>-->
              </tbody>
              <!--<tfoot>
                 <tr>
                  <td :colspan="mojudColumns.length * 2 + 1"></td>
                  <td class="text-center">جمع: {{ mojudTotal }}</td>
                  <td></td>
                </tr>
              </tfoot> -->
            </q-markup-table>
          </div>
        </internal-section>
        <internal-section
          ref="sec8"
          v-if="!hideMojazParvaneh"
          title="مجاز پروانه - کاربریهای ساختمان"
        >
          <safa-datatable
            :addRow="false"
            :allowCopy="false"
            :allowMultipleSelection="false"
            :deleteRow="false"
            :show-selected-checkbox="true"
            fit
            helper="mojazKarbariSakhteman"
            m="r"
            paginate
            v-model="model.ComLayehe.ComLayehe_Base_Using_Parvaneh"
            cdcName="ComLayehe_Base_Using_Parvaneh"
            title="مجاز پروانه-کاربری های ساختمان"
          >
          </safa-datatable>
        </internal-section>
        <internal-section
          ref="sec9"
          v-if="!hideMojazParvaneh"
          title="مجاز پروانه - پیش آمدگی های ساختمان"
        >
          <safa-datatable
            :addRow="false"
            :allowCopy="false"
            :allowMultipleSelection="false"
            :deleteRow="false"
            :show-selected-checkbox="true"
            fit
            helper="mojazpishamad"
            m="r"
            v-model="model.ComLayehe.ComLayehe_Base_Front_Parvaneh"
            cdcName="ComLayehe_Base_Front_Parvaneh"
            paginate
            title="مجاز پروانه - پیش آمدگی های ساختمان"
          >
          </safa-datatable>
        </internal-section>
        <internal-section ref="sec10" title="توضیحات شهرداری">
          <div class="row q-col-gutter-sm">
            <div class="col column q-col-gutter-sm">
              <div class="col-auto">
                <text-template
                  :formKey="'84a2fd27-e3ec-47a9-958d-04a5be08708d'"
                  :m="'r'"
                  v-model="model.ComLayehe.Comments"
                  cdcName="Comments"
                  class="col-12"
                  label="توضیحات"
                  label-width="110px"
                />
              </div>
              <div class="col-auto">
                <text-template
                  :formKey="'94a2fd27-e3ec-47a9-958d-04a5be08708d'"
                  :m="'r'"
                  v-model="model.ComLayehe.UrbanIdia"
                  cdcName="UrbanIdia"
                  class="col-12"
                  label="تقاضای شهرداری"
                  label-width="110px"
                />
              </div>
              <div class="col-auto row q-col-gutter-sm">
                <div class="col-auto" style="width: 420px">
                  <safa-text
                    label-width="110px"
                    :m="'r'"
                    label="ایجاد کننده درخواست:"
                    :value="assignToUserName"
                    cdcName="assignToUserName"
                  />
                </div>
                <div class="col-auto" style="width: 420px">
                  <safa-text
                    label-width="auto"
                    :m="'r'"
                    label="گروه ایجاد کننده درخواست:"
                    :value="taskArea"
                    cdcName="taskArea"
                  />
                </div>
              </div>
            </div>
            <div
              class="col-auto column"
              style="min-width: 340px; width: 340px; min-height: 264px"
            >
              <div class="col-auto">امضاء شهردار:</div>
              <div class="col">
                <img
                  v-if="imgUserSignature"
                  :src="imgUserSignature"
                  class="fit"
                />
              </div>
              <div class="col-auto"></div>
            </div>
          </div>
        </internal-section>
        <div class="q-pt-xs"></div>
      </div>
      <div v-show="activeTab === 'parking'" class="fit">
        <safa-splitter v-model="parkingSplitter" fit>
          <template #before>
            <safa-datatable
              :columns="parkingRequirementColumns"
              v-model="model.ComLayehe.ComLayehe_Base_ParkingRequirement"
              cdcName="ComLayehe_Base_ParkingRequirement"
              title="پارکینگ مورد نیاز طبق زیربنای پروانه"
            />
          </template>
          <template #after>
            <safa-datatable
              :columns="parkingRequirementColumns"
              v-model="
                model.ComLayehe.ComLayehe_Base_ParkingRequirementInDensity
              "
              cdcName="ComLayehe_Base_ParkingRequirementInDensity"
              title="پارکینگ مورد نیاز طبق زیربنای احداثی"
            />
          </template>
        </safa-splitter>
      </div>
      <div v-show="activeTab === 'history'" class="fit">
        <VoteHistory :formKey="formKey"/>
      </div>
      <div v-show="activeTab === 'moghayerat'" class="q-pa-sm fit">
        <Moghayerat />
      </div>
    </div>
    <div style="min-width: 1px">
      <q-separator class="full-height" vertical />
    </div>
    <div class="col-auto full-height" style="min-width: 30px">
      <btn-verticals>
        <btn-vertical
          label="تخلف"
          :active="activeTab === 'takhalof'"
          @click="activeTab = 'takhalof'"
        />
        <div style="min-width: 30px">
          <q-separator class="q-mx-sm" />
        </div>
        <btn-vertical
          label="پارکینگ"
          :active="activeTab === 'parking'"
          @click="activeTab = 'parking'"
        />
        <div style="min-width: 30px">
          <q-separator class="q-mx-sm" />
        </div>
        <btn-vertical
          label="سوابق رای"
          :active="activeTab === 'history'"
          @click="activeTab = 'history'"
        />
        <div style="min-width: 30px">
          <q-separator class="q-mx-sm" />
        </div>
        <btn-vertical
          label="مغایرت آرا"
          :active="activeTab === 'moghayerat'"
          @click="activeTab = 'moghayerat'"
        />
      </btn-verticals>
    </div>
  </section>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
import fileHelper from "src/mixins/fileHelper"
import PersianDate from "persian-date"
import VoteHistory from "../../voting/partials/VoteHistory"
import Moghayerat from "src/forms/commission-menu/commission-info/karshenasi/partials/Moghayerat.vue"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin, fileHelper],
  props: {
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      activeTab: "takhalof", // 'takhalof', 'parking', 'history', 'moghayerat'
      NidCommission: null,
      NidKartable: null,
      NidProc: null,
      NosaziCode: null,
      Region: null,
      Requestby: null,
      list: [],
      allCertificats: [],
      model: {
        "ComLayehe": {
          "Address": "",
          "AreaAfterEdit": 0,
          "BuildingStep": "",
          "BuildingType": "",
          "BusyAreaMojaz": 0,
          "ComLayehe_Base_Front_Parvaneh": [],
          "ComLayehe_Base_ParkingRequirement": [],
          "ComLayehe_Base_ParkingRequirementInDensity": [],
          "ComLayehe_Base_Using_Parvaneh": [],
          "ComLayehe_ShahrdariLicence": [],
          "ComLayehe_TakhalofatSharsazi": [],
          "ComLayehe_UsingMojazInLastLicence": [],
          "ComLayehe_UsingMojodInLastRevisit": [],
          "ComLayehe_Usings": [],
          "Comments": "",
          "CurArea": 0,
          "DocArea": 0,
          "FloorCountMojaz": 0,
          "LayeheNo": "",
          "Mahdoode": "",
          "MeghdarDarMasir": 0,
          "MojazPlan": "",
          "MojazUsing": "",
          "MojazUsingID": "",
          "MosavabPlan": "",
          "MosavabUsing": "",
          "MosavabUsingID": "",
          "OwnerName": "",
          "RegisterPlak": "",
          "RequesterName": "",
          "RevisitDate": "",
          "RoofType": "",
          "SazehType": "",
          "SignUser": "",
          "TarakomMojaz": 0,
          "UrbanIdia": "",
          "VahedCountMojaz": 0
        },
        "ErrorResult": {
          "BizErrors": "",
          "Requirements": ""
        },
        TaskInfo: {
          "ErrorResult": {
            "BizErrors": "",
            "Requirements": ""
          },
          "ListArchiveTemporaryShahrsazi": "",
          "ListForms": "",
          "ListTask": "",
          "ListTask_ForFormula": {
            "ClsTask.ClsDtoTask": [
            ]
          },
          "NidProc": "00000000-0000-0000-0000-000000000000",
          "WorkflowStateDeffList": ""
        }
      },
      certification: {
        ParvanehLicenceNo: "-",
        ParvanehLicenceDate: "-",
        TreepassLicenceNo: "-",
        TreepassLicenceDate: "-",
        PayanLicenceNo: "-",
        PayanLicenceDate: "-"
      },
      today: "",
      mojazColumns: [],
      mojazRows: [],
      mojazTotal: 0,
      mojudColumns: [],
      mojudRows: [],
      mojudTotal: 0,
      taskArea: "",
      assignToUserName: "",
      imgUserSignature: null,
      userSignatureText: null,
      parkingSplitter: 50,
      parkingRequirementColumns: [
        {
          title: "گروه کاربری",
          field: "UsingGroup"
        },
        {
          title: "تعداد",
          field: "ParkingCount"
        },
        {
          title: "مساحت",
          field: "ParkingArea",
          calculateFunc: "sum"
        }
      ]
    }
  },
  components: { VoteHistory, Moghayerat },
  methods: {
    // await this.getBillFine();
    async loadObj () {
      try {
        this.showLoading()
        let payLoad = {
          pDistrict: this.convertToNosaziCodeObject(
            this.selectedCommission.BizCode
          ).District,
          pNidProcSara8: this.selectedCommission.NidProc
        }
        const { data } = await this.$services.commissions.getBillFine(payLoad)
        let res = this.getResponse(data)
        if (res.success) {
          this.log({
            action: this.logActions.view,
            bizCode: this.selectedCommission.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedCommission.BizCode,
            saveDesc: `بارگذاری اطلاعات فرم ${this.title ?? ''} انجام گردید.`
          })
          let { GetBillFineResult } = res.data
          // [MAP DATA]
          if (GetBillFineResult.BillFine !== null) {
            if (GetBillFineResult?.BillFine?.ComLayehe?.ComLayehe_Usings) {
              GetBillFineResult.BillFine.ComLayehe.ComLayehe_Usings =
                GetBillFineResult.BillFine.ComLayehe.ComLayehe_Usings.map(
                  (x, y) => ({
                    ...x,
                    ZabetehArea: this.formatArea(x.ZabetehArea),
                    DiffArea: this.formatArea(x.DiffArea),
                    CurUsingArea: this.formatArea(x.CurUsingArea),
                    BusyAreaCur: this.formatArea(x.BusyAreaCur)
                  })
                )
            }

            // [MAP DATA]

            // [FAKE DATA]
            // if (GetBillFineResult.BillFine.ComLayehe.ComLayehe_UsingMojazInLastLicence.length === 0) {
            //   GetBillFineResult.BillFine.ComLayehe.ComLayehe_UsingMojazInLastLicence = [
            //     {
            //       'FloorType': 'همكف',
            //       'Height': 5,
            //       'UsingArea': 100,
            //       'UsingType': 'بهداشتي-درماني',
            //       'Vahed': 1
            //     },
            //     {
            //       'FloorType': 'طبقه اول',
            //       'Height': 4,
            //       'UsingArea': 200,
            //       'UsingType': 'تجاري',
            //       'Vahed': 2
            //     },
            //     {
            //       'FloorType': 'طبقه اول',
            //       'Height': 0,
            //       'UsingArea': 500,
            //       'UsingType': 'صنعتی',
            //       'Vahed': 1
            //     },
            //     {
            //       'FloorType': 'طبقه دوم',
            //       'Height': 3,
            //       'UsingArea': 400,
            //       'UsingType': 'اداري',
            //       'Vahed': 1
            //     },
            //     {
            //       'FloorType': 'طبقه سوم',
            //       'Height': 0,
            //       'UsingArea': 100,
            //       'UsingType': 'مسکوني',
            //       'Vahed': 1
            //     },
            //     {
            //       'FloorType': 'جمع',
            //       'Height': 0,
            //       'UsingArea': 400,
            //       'UsingType': 'اداري',
            //       'Vahed': 1
            //     },
            //     {
            //       'FloorType': 'جمع',
            //       'Height': 0,
            //       'UsingArea': 100,
            //       'UsingType': 'بهداشتي-درماني',
            //       'Vahed': 1
            //     },
            //     {
            //       'FloorType': 'جمع',
            //       'Height': 0,
            //       'UsingArea': 200,
            //       'UsingType': 'تجاري',
            //       'Vahed': 2
            //     },
            //     {
            //       'FloorType': 'جمع',
            //       'Height': 0,
            //       'UsingArea': 500,
            //       'UsingType': 'صنعتی',
            //       'Vahed': 1
            //     },
            //     {
            //       'FloorType': 'جمع',
            //       'Height': 0,
            //       'UsingArea': 100,
            //       'UsingType': 'مسکوني',
            //       'Vahed': 1
            //     }
            //   ]
            // }   // => just for test
            // if (GetBillFineResult.BillFine.ComLayehe.ComLayehe_UsingMojodInLastRevisit.length === 0) {
            //   GetBillFineResult.BillFine.ComLayehe.ComLayehe_UsingMojodInLastRevisit = [
            //     {
            //       'FloorType': 'ساختمان 10طبقه اول',
            //       'Height': 1,
            //       'OverOnArea': 0,
            //       'UsingArea': 1,
            //       'UsingType': '',
            //       'Vahed': 1
            //     },
            //     {
            //       'FloorType': 'ساختمان 11طبقه اول',
            //       'Height': 1,
            //       'OverOnArea': 0,
            //       'UsingArea': 1,
            //       'UsingType': '',
            //       'Vahed': 1
            //     },
            //     {
            //       'FloorType': 'ساختمان 1همكف',
            //       'Height': 0,
            //       'OverOnArea': 0,
            //       'UsingArea': 100,
            //       'UsingType': 'مسکوني',
            //       'Vahed': 1
            //     },
            //     {
            //       'FloorType': 'مجموع',
            //       'Height': 1,
            //       'OverOnArea': 0,
            //       'UsingArea': 2,
            //       'UsingType': '',
            //       'Vahed': 2
            //     },
            //     {
            //       'FloorType': 'مجموع',
            //       'Height': 1,
            //       'OverOnArea': 0,
            //       'UsingArea': 100,
            //       'UsingType': 'مسکوني',
            //       'Vahed': 1
            //     }
            //   ]
            // }   // => just for test
            // if (GetBillFineResult.BillFine.ComLayehe.ComLayehe_ShahrdariLicence.length === 0) {
            //   GetBillFineResult.BillFine.ComLayehe.ComLayehe_ShahrdariLicence = [{
            //     'LicenceDate': '1401/05/08',
            //     'LicenceNo': '1241864',
            //     'LicenceType': 'پايانکار'
            //   }]
            // }  // => just for test
            // [FAKE DATA]

            // this.model = { ...GetBillFineResult.BillFine }
            this.model.ErrorResult = GetBillFineResult.BillFine.ErrorResult
            if (GetBillFineResult.BillFine.ComLayehe !== null) {
              this.model.ComLayehe = GetBillFineResult.BillFine.ComLayehe
            }
            if (GetBillFineResult.BillFine.TaskInfo !== null) {
              this.model.TaskInfo = GetBillFineResult.BillFine.TaskInfo
            }
            await this.updateMojazColumns()
            await this.updateMojazRows()
            await this.updateMojudColumns()
            await this.updateMojudRows()
            await this.updateLicenses()
            // [TASK INFO]
            this.taskArea = ""
            this.assignToUserName = ""
            if (
              this.model.TaskInfo &&
              this.model.TaskInfo.ListTask &&
              this.model.TaskInfo.ListTask.length > 0
            ) {
              this.taskArea = this.model.TaskInfo.ListTask[0].TaskArea
              this.assignToUserName =
                this.model.TaskInfo.ListTask[0].AssingToUserName
            }
            // [TASK INFO]

            // [USER SIGNATURE]
            // اگه تایید مدیران نداشته باشه این سرویس برای گرفتن امضا نباید صدا زده بشه طبق بررسی آقای صفری
            if (GetBillFineResult.BillFine.ComLayehe && GetBillFineResult.BillFine.ComLayehe.SignUser !== '11111111-1111-1111-1111-111111111111')
            {
              await this.userSignature(GetBillFineResult.BillFine.ComLayehe.SignUser)
            }
            this.userSignatureText = null
            // arrayBufferToBase64 // byte[] to base64
            // [USER SIGNATURE]

            /*
          SetSignUserPicture(false, GetBillFineResult.BillFine.ComLayehe.SignUser, a =>
          {
              if (a != null)
              {
                  TxtSign.Visibility = Visibility.Collapsed;
                  ImgUserSignature.Visibility = Visibility.Visible;
                  var tmpImage = new BitmapImage();
                  tmpImage.SetSource(new MemoryStream(a));
                  ImgUserSignature.Source = tmpImage;
              }
              else
              {
                  TxtSign.Text = "امضاء مورد نظر یافت نشد";
                  TxtSign.Visibility = Visibility.Visible;
                  ImgUserSignature.Visibility = Visibility.Collapsed;
              }
          });
          * */
            this.$emit("getAreaAfterEditValue", this.model.ComLayehe)
            return GetBillFineResult
          }
        }
      } catch (e) {
        console.error("getBillFine error", e)
      } finally {
        this.hideLoading()
      }
    },
    async userSignature (nidUser) {
      if (!nidUser?.trim()) return
      try {
        this.showLoading()
        const { data } = await this.$services.security.userSignature({
          NidUser: nidUser?.toUpperCase(),
          populate: true
        })
        if (data.success) {
          this.imgUserSignature = data.data.signatureImage
        } else {
          if (Array.isArray(data.msg)) {
            let htmlMsg = ""
            data.msg.forEach((error) => {
              htmlMsg += `<li>${error}</li>`
            })
            this.showError(htmlMsg)
          } else {
            this.showError(data.msg)
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    formatArea (value, digit = 2) {
      return (value || 0).toFixed(digit)
    },
    groupBy (list, field) {
      const result = list.reduce((group, item) => {
        const prop = item[field]
        group[prop] = group[prop] ?? []
        group[prop].push(item)
        return group
      }, {})
      return result
    },
    async updateMojazColumns () {
      // this.model.ComLayehe.ComLayehe_UsingMojazInLastLicence
      return new Promise((resolve) => {
        this.mojazColumns = []
        this.$nextTick(() => {
          const tempC = this.groupBy(
            this.model.ComLayehe?.ComLayehe_UsingMojazInLastLicence || [],
            "UsingType"
          )
          Object.keys(tempC).forEach((col) => {
            this.mojazColumns.push(col)
          })
          resolve()
        })
      })

      // this.groupBy(this.model.ComLayehe.ComLayehe_UsingMojazInLastLicence, 'UsingType')
    },
    async updateMojazRows () {
      return new Promise((resolve) => {
        const groupByFloors = this.groupBy(
          this.model.ComLayehe?.ComLayehe_UsingMojazInLastLicence || [],
          "FloorType"
        )
        const cols = [...this.mojazColumns]
        this.mojazRows = []
        this.$nextTick(() => {
          Object.keys(groupByFloors).forEach((floor) => {
            console.log(floor)
            let row = { ...groupByFloors[floor][0] }
            cols.forEach((col) => {
              row[col] = {
                UsingArea: "",
                Vahed: ""
              }
            })
            groupByFloors[floor].forEach((item) => {
              if (item.UsingType) {
                row[item.UsingType] = {
                  UsingArea: this.formatArea(item.UsingArea, 3),
                  Vahed: this.formatArea(item.Vahed, 3)
                }
              }
            })
            console.log("---------------- row", row)
            this.mojazRows.push(Object.freeze(row))
          })
          this.mojazTotal = this.mojazRows.reduce((x, y) => x + y.Height, 0)
          resolve()
        })
      })
      // this.model.ComLayehe.ComLayehe_UsingMojazInLastLicence
    },
    async updateMojudColumns () {
      return new Promise((resolve) => {
        this.mojudColumns = []
        this.$nextTick(() => {
          const tempC = this.groupBy(
            this.model.ComLayehe?.ComLayehe_UsingMojodInLastRevisit || [],
            "UsingType"
          )
          Object.keys(tempC).forEach((col) => {
            this.mojudColumns.push(col)
          })
          resolve()
        })
      })
    },
    async updateMojudRows () {
      return new Promise((resolve) => {
        const groupByFloors = this.groupBy(
          this.model.ComLayehe?.ComLayehe_UsingMojodInLastRevisit || [],
          "FloorType"
        )
        const cols = [...this.mojudColumns]
        this.mojudRows = []
        this.$nextTick(() => {
          Object.keys(groupByFloors).forEach((floor) => {
            console.log(floor)
            let row = { ...groupByFloors[floor][0] }
            cols.forEach((col) => {
              row[col] = {
                UsingArea: "",
                Vahed: ""
              }
            })
            groupByFloors[floor].forEach((item) => {
              if (item.UsingType) {
                row[item.UsingType] = {
                  UsingArea: this.formatArea(item.UsingArea, 3),
                  Vahed: this.formatArea(item.Vahed, 3)
                }
              }
            })
            console.log("---------------- row", row)
            this.mojudRows.push(Object.freeze(row))
          })
          this.mojudTotal = this.mojudRows.reduce((x, y) => x + y.Height, 0)
          resolve()
        })
      })
    },
    async updateLicenses () {
      return new Promise((resolve) => {
        this.certification = {
          ParvanehLicenceNo: "-",
          ParvanehLicenceDate: "-",
          TreepassLicenceNo: "-",
          TreepassLicenceDate: "-",
          PayanLicenceNo: "-",
          PayanLicenceDate: "-"
        }
        this.$nextTick(() => {
          const licenses = [
            ...(this.model.ComLayehe?.ComLayehe_ShahrdariLicence || [])
          ]
          this.allCertificats = []
          let tmpResult = []
          licenses.forEach((license) => {
            if (license.LicenceType) {
              if (
                license.LicenceType.includes("پروانه") &&
                tmpResult.length === 0
              ) {
                this.certification.ParvanehLicenceDate = license.LicenceDate
                this.certification.ParvanehLicenceNo = license.LicenceNo
                this.certification.TreepassLicenceDate = "-"
                this.certification.TreepassLicenceNo = "-"
                this.certification.PayanLicenceDate = "-"
                this.certification.PayanLicenceNo = "-"
                tmpResult.push({ ...this.certification })
              } else if (
                license.LicenceType.includes("پروانه") &&
                tmpResult.length > 0
              ) {
                this.certification.ParvanehLicenceDate = license.LicenceDate
                this.certification.ParvanehLicenceNo = license.LicenceNo
                this.certification.TreepassLicenceDate = "-"
                this.certification.TreepassLicenceNo = "-"
                this.certification.PayanLicenceDate = "-"
                this.certification.PayanLicenceNo = "-"
                tmpResult.push({ ...this.certification })
              } else if (
                license.LicenceType.includes("خلاف") &&
                tmpResult.length === 0
              ) {
                this.certification.TreepassLicenceDate = license.LicenceDate
                this.certification.TreepassLicenceNo = license.LicenceNo
                this.certification.ParvanehLicenceDate = "-"
                this.certification.ParvanehLicenceNo = "-"
                this.certification.PayanLicenceDate = "-"
                this.certification.PayanLicenceNo = "-"
                tmpResult.push({ ...this.certification })
              } else if (
                license.LicenceType.includes("خلاف") &&
                tmpResult.length > 0
              ) {
                this.certification.TreepassLicenceDate = license.LicenceDate
                this.certification.TreepassLicenceNo = license.LicenceNo
                this.certification.ParvanehLicenceDate = "-"
                this.certification.ParvanehLicenceNo = "-"
                this.certification.PayanLicenceDate = "-"
                this.certification.PayanLicenceNo = "-"
                tmpResult.push({ ...this.certification })
              } else if (
                license.LicenceType.includes("پايانکار") &&
                tmpResult.length === 0
              ) {
                this.certification.PayanLicenceDate = license.LicenceDate
                this.certification.PayanLicenceNo = license.LicenceNo
                this.certification.TreepassLicenceDate = "-"
                this.certification.TreepassLicenceNo = "-"
                this.certification.ParvanehLicenceDate = "-"
                this.certification.ParvanehLicenceNo = "-"
                tmpResult.push({ ...this.certification })
              } else if (
                license.LicenceType.includes("پايانکار") &&
                tmpResult.length > 0
              ) {
                this.certification.PayanLicenceDate = license.LicenceDate
                this.certification.PayanLicenceNo = license.LicenceNo
                this.certification.TreepassLicenceDate = "-"
                this.certification.TreepassLicenceNo = "-"
                this.certification.ParvanehLicenceDate = "-"
                this.certification.ParvanehLicenceNo = "-"
                tmpResult.push({ ...this.certification })
              }
              this.allCertificats = tmpResult
            }
          })
          resolve()
        })
      })
    },
    changeSectionsState (isCollapse) {
      this.$nextTick(() => {
        try {
          if (this.$refs.sec1) {
            this.$refs.sec1.isShow = isCollapse
          }
          if (this.$refs.sec2) {
            this.$refs.sec2.isShow = isCollapse
          }
          if (this.$refs.sec3) {
            this.$refs.sec3.isShow = isCollapse
          }
          if (this.$refs.sec4) {
            this.$refs.sec4.isShow = isCollapse
          }
          if (this.$refs.sec5) {
            this.$refs.sec5.isShow = isCollapse
          }
          if (this.$refs.sec6) {
            this.$refs.sec6.isShow = isCollapse
          }
          if (this.$refs.sec7) {
            this.$refs.sec7.isShow = isCollapse
          }
          if (this.$refs.sec8) {
            this.$refs.sec8.isShow = isCollapse
          }
          if (this.$refs.sec9) {
            this.$refs.sec9.isShow = isCollapse
          }
          if (this.$refs.sec10) {
            this.$refs.sec10.isShow = isCollapse
          }
        } catch (ex) {
          console.error("--- changeSectionsState", ex)
        }
      })
    },
    collapseAll () {
      this.changeSectionsState(true)
    },
    expandAll () {
      this.changeSectionsState(false)
    }
  },
  computed: {
    ComLayehe_Usings_ZabetehAreaSum () {
      if (this.model.ComLayehe && this.model.ComLayehe.ComLayehe_Usings) {
        return this.formatArea(
          this.model.ComLayehe.ComLayehe_Usings.reduce(
            (x, item) => x + Number(item.ZabetehArea),
            0
          ),
          3
        )
      }
      return 0
    },
    ComLayehe_Usings_LastLicenceUsingAreaSum () {
      if (this.model.ComLayehe && this.model.ComLayehe.ComLayehe_Usings) {
        return this.formatArea(
          this.model.ComLayehe.ComLayehe_Usings.reduce(
            (x, item) => x + Number(item.LastLicenceUsingType),
            0
          ),
          3
        )
      }
      return 0
    },
    ComLayehe_Usings_CurUsingAreaSum () {
      if (this.model.ComLayehe && this.model.ComLayehe.ComLayehe_Usings) {
        return this.formatArea(
          this.model.ComLayehe.ComLayehe_Usings.reduce(
            (x, item) => x + Number(item.CurUsingArea),
            0
          ),
          3
        )
      }
      return 0
    },
    ComLayehe_Usings_DiffAreaSum () {
      if (this.model.ComLayehe && this.model.ComLayehe.ComLayehe_Usings) {
        return this.formatArea(
          this.model.ComLayehe.ComLayehe_Usings.reduce(
            (x, item) => x + Number(item.DiffArea),
            0
          ),
          3
        )
      }
      return 0
    },
    ComLayehe_Usings_BusyAreaCurSum () {
      if (this.model.ComLayehe && this.model.ComLayehe.ComLayehe_Usings) {
        return this.formatArea(
          this.model.ComLayehe.ComLayehe_Usings.reduce(
            (x, item) => x + Number(item.BusyAreaCur),
            0
          ),
          3
        )
      }
      return 0
    },
    hideMojazParvaneh () {
      if (
        // eslint-disable-next-line no-undef
        window.getConfigValue("esupParams") &&
        // eslint-disable-next-line no-undef
        window.getConfigValue("esupParams").hasOwnProperty("HideMojazParvaneh")
        // eslint-disable-next-line no-undef
      ) {
        // eslint-disable-next-line no-undef
        return !!window.getConfigValue("esupParams").HideMojazParvaneh
      }
      console.error("پارامتر HideMojazParvaneh در تنظیمات تعریف نشده است.")
      return false
    }
  },
  created () {
    PersianDate.toCalendar("persian")
    this.today = new PersianDate().toLocale("fa").format("L")
  }
}
</script>
<style lang="scss" scoped></style>
