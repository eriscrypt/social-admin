<script setup lang="ts"></script>

<template>
  <div class="table">
    <div class="table-head">
      <slot name="head"></slot>
    </div>
    <div class="table-body">
      <slot name="body"></slot>
    </div>
    <div class="table-foo">
      <slot name="foo"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table {
  padding: 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  display: grid;
  gap: 15px;
  backdrop-filter: blur(20px);

  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.table-foo {
  background: rgba(0, 0, 0, 0.15);
  padding: 10px;
  border-radius: 6px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-body {
  height: 100%;
}
</style>
