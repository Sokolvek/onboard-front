<template>
    <header class="header">
        <nav class="nav">
            <ul class="nav-list">
                <li class="nav-item">
                    <router-link to="/signup">Register</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/login">Login</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>

</script>

<style scoped>

.header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #0d6efd;
    overflow: hidden;
}
.nav{
    padding: 20px;

}
.nav-list{
    display: flex;
    gap: 10px;
}

.nav-item > a{
    color: white;
    text-decoration: none;
}
</style>