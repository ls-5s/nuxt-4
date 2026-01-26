<!-- layouts/custom.vue -->
<template>
    <div class="custom-layout">
        <!-- 页眉：固定内容，不再用插槽 -->
        <header class="layout-header">
            布局固定页眉（不再接收页面传值）
        </header>

        <!-- 主体：左侧侧边栏 + 右侧内容 -->
        <div class="layout-body">
            <!-- ✅ header插槽放到侧边栏 -->
            <aside class="layout-sidebar">
                <slot name="header">
                    默认侧边栏内容（页面没传header时显示）
                </slot>
            </aside>

            <!-- 默认插槽：页面核心内容 -->
            <main class="layout-main">
                <slot />
            </main>
        </div>

        <footer class="layout-footer">
            custom布局的固定页脚
        </footer>
    </div>
</template>

<style scoped>
.custom-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.layout-header {
    padding: 20px;
    background: #9f7aea;
    color: white;
}

.layout-body {
    flex: 1;
    display: flex;
}

.layout-sidebar {
    width: 200px;
    padding: 20px;
    background: #f7f3e9;
}

.layout-main {
    flex: 1;
    padding: 20px;
}

.layout-footer {
    padding: 10px;
    background: #9f7aea;
    color: white;
    text-align: center;
}
</style>