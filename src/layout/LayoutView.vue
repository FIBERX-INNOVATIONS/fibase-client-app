<template>
    <template v-if="route.name">
        {{ route.name  }}
        {{ is_authenticated }}
        {{ MemberAuthenticatorUtil.isFullyLoggedIn() }}
        {{ route.meta.is_auth_page }}
        <AuthLayout v-if="route.meta.is_auth_page" />

        <DashboardLayout v-else />
    </template>
</template>

<script setup lang="ts">
import LayoutViewController from "@/controllers/layout_view_controller";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

const props         = defineProps({});
const controller    = new LayoutViewController(props)

const { 
    components, 
    computed_refs,
    route
} = controller;

const { is_authenticated } = computed_refs

const { 
    AuthLayout,
    DashboardLayout
} = components;

</script>