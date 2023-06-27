<script setup>
</script>

<template>
  <!--  Блок с фильтрами -->
  <div class="font-sans bg-white flex flex-row justify-start m-4 gap-4">
    <div class="flex flex-col">
      <button class="bg-frozen-sky py-2 px-4 text-white rounded-xl">Фильтры</button>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-row flex-wrap justify-start gap-1">
        <div class="flex flex-row bg-white p-1 text-xs text-frozen-sky border-2 border-frozen-sky rounded-3xl">
          <div class="flex flex-row gap-1"><p> ИП Гринин Денис Николаевич</p>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  Шапка таблицы-->
  <div
      class="grid grid-row grid-cols-8 sticky top-0 bg-frozen-sky text-xs text-white rounded-t-md px-1 py-1 z-100 items-center place-items-start m-4">
    <div class="grid grid-col grid-cols-1">
      <div class=" grid grid-row "> Проект</div>
      <div class=" grid grid-row"></div>
    </div>
    <div class="grid grid-col grid-cols-1">
      <div class=" grid grid-row "> Затраты</div>
    </div>
    <div class="grid grid-col grid-cols-1">
      <div class=" grid grid-row "> Контрагент</div>
    </div>
    <div class="grid grid-col grid-cols-1">
      <div class=" grid grid-row "> Дата план</div>
    </div>
    <div class="grid grid-col grid-cols-1">
      <div class=" grid grid-row "> Дата факт</div>
    </div>
    <div class="grid grid-col grid-cols-1">
      <div class=" grid grid-row "> Итог</div>
    </div>
    <div class="grid grid-col grid-cols-1">
      <div class="grid grid-row ">Июль</div>
      <div class="grid grid-row grid-cols-3 gap-1">
        <div class="grid grid-col ">План</div>
        <div class="grid grid-col">Факт</div>
        <div class="grid grid-col">Разница</div>
      </div>
    </div>
    <div class="grid grid-col grid-cols-1">
      <div class="grid grid-row ">Август</div>
      <div class="grid grid-row grid-cols-3 gap-1">
        <div class="grid grid-col ">План</div>
        <div class="grid grid-col">Факт</div>
        <div class="grid grid-col">Разница</div>
      </div>
    </div>
  </div>

</template>
<style scoped>
</style>
