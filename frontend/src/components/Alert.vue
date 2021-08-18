<template>
    <div class="alert">
        {{ msg }}
    </div>
</template>

<script>
export default ({
    props: ['msg'],
})
</script>

<style>
.alert-container {
    width: 100%;
}
.alert{
    background-color:rgba(255, 0, 0, 0.6);
    color:white;
    border-radius: 5px;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 16px;
}
</style>