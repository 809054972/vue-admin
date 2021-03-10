<template>
    <div id="login">
        this is Login
        <el-button>moren</el-button>
    </div>
</template>

<script>
export default {
    name: 'login'
}
</script>

<style lang="scss" scoped>  //不加scoped表示对全局有效，加了只对当前有效
#login {
    height: 100vh;  //vh指可视区，100vh满屏，50vh半屏
    background-color: #344a5f;
}
</style>