<template>
    <div class="nav" @click="handleClick">
        this is for test page index.
    </div>
</template>
<script>
export default {
  methods: {
    handleClick(i) {
      alert("click triggered!");
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.nav {
  font-size: 30px;
  padding: 4px 10px;
  border: 1px solid red;
}
</style>