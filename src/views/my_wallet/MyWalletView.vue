<template>
    <section :class="class_styles.wrapper">
        <BreadcrumbUI v-bind="controller.breadcrumb_props" />

        <header>
            <h1 :class="class_styles.heading">{{ content.title_text }}</h1>
            <p :class="class_styles.subtitle">{{ content.subtitle_text }}</p>
        </header>

        <div v-if="!controller.can_view_currencies" :class="class_styles.state">{{ content.permission_text }}</div>

        <div v-else-if="is_loading_wallets" :class="class_styles.state" role="status">{{ content.loading_text }}</div>

        <div v-else-if="has_wallet_error" :class="class_styles.error" role="alert">
            <p>{{ content.wallet_error_text }}</p>
            <ButtonUI v-bind="controller.getRetryProps('wallets')" />
        </div>

        <div v-else-if="!currencies.length" :class="class_styles.state">{{ content.empty_text }}</div>

        <template v-else>
            <div :class="class_styles.overview">
                <article :class="class_styles.card" :aria-label="content.title_text">
                    <div :class="class_styles.orb" aria-hidden="true"></div>
                    <div :class="class_styles.card_top">
                        <div :class="class_styles.currency_control">
                            <label for="MyWalletCurrency" :class="class_styles.currency_label">{{ content.currency_text }}</label>
                            <InputUI v-bind="currency_input" :title="currency ? `${currency.code} · ${currency.name}` : undefined" />
                        </div>
                        <div :class="class_styles.brand_group">
                            <span :class="class_styles.brand">{{ content.brand_text }}</span>
                            <div :class="class_styles.chip" aria-hidden="true"></div>
                        </div>
                    </div>
                    <div :class="class_styles.balance_row">
                        <div :class="class_styles.balance_content" aria-live="polite" aria-atomic="true">
                            <p :class="class_styles.balance_label">{{ content.available_text }}</p>
                            <p :class="balance_class_style" :title="balance" :aria-label="balance">
                                <template v-for="(part, index) in balance_parts" :key="index">
                                    <span>{{ part }}</span
                                    ><wbr v-if="index < balance_parts.length - 1" />
                                </template>
                            </p>
                        </div>
                    </div>
                    <div :class="class_styles.card_bottom">
                        <span :class="class_styles.card_note">{{ currency?.code }} · {{ content.card_note_text }}</span>
                        <span :class="class_styles.holder" :title="controller.member_name">{{ controller.member_name }}</span>
                    </div>
                </article>
                <aside :class="class_styles.summary">
                    <h2 :class="class_styles.section_title">{{ content.overview_text }}</h2>
                    <div :class="class_styles.summary_grid">
                        <div :class="class_styles.metric">
                            <p :class="class_styles.metric_label">{{ content.locked_text }}</p>
                            <p :class="class_styles.metric_value">{{ locked_balance }}</p>
                        </div>
                        <div :class="class_styles.metric">
                            <p :class="class_styles.metric_label">{{ content.pending_text }}</p>
                            <p :class="class_styles.metric_value">{{ pending_balance }}</p>
                        </div>
                    </div>
                    <div v-if="wallet">
                        <p :class="class_styles.metric_label">{{ content.wallet_id_text }}</p>
                        <p :class="class_styles.reference">{{ wallet.public_id }}</p>
                    </div>
                    <p v-else :class="class_styles.subtitle">{{ content.no_wallet_text }}</p>
                    <div :class="class_styles.actions">
                        <ButtonUI v-bind="controller.deposit_props" />
                        <ButtonUI v-bind="controller.withdrawal_props" />
                    </div>
                    <p :class="class_styles.action_note">{{ content.coming_soon_text }}</p>
                </aside>
            </div>
        </template>
        <section :class="class_styles.transactions" :aria-label="content.transactions_text">
            <header :class="class_styles.transaction_header">
                <div>
                    <h2 :class="class_styles.section_title">{{ content.transactions_text }}</h2>
                    <p :class="class_styles.subtitle">{{ content.transactions_description_text }}</p>
                </div>
                <span :class="class_styles.badge">{{ content.all_wallets_text }}</span>
            </header>
            <div v-if="!controller.can_view_transactions" :class="class_styles.state">{{ content.permission_text }}</div>
            <div v-else-if="is_loading_transactions" :class="class_styles.state" role="status">
                {{ content.loading_transactions_text }}
            </div>
            <div v-else-if="has_transaction_error" :class="class_styles.state_padding">
                <div :class="class_styles.error" role="alert">
                    <p>{{ content.transaction_error_text }}</p>
                    <ButtonUI v-bind="controller.getRetryProps('transactions')" />
                </div>
            </div>
            <div v-else-if="!transactions.length" :class="class_styles.state">{{ content.no_transactions_text }}</div>
            <template v-else>
                <div :class="class_styles.table_wrapper"><DataTableUI v-bind="transaction_table" /></div>
                <div :class="class_styles.footer">
                    <p>
                        {{
                            content.pagination_text
                                .replace("{page}", String(current_page))
                                .replace("{pages}", String(total_pages))
                                .replace("{total}", String(total_items))
                        }}
                    </p>
                    <PaginationUI v-if="total_pages > 1" v-bind="pagination_props" />
                </div>
            </template>
        </section>
    </section>
</template>

<script setup lang="ts">
import MyWalletViewController from "@/controllers/my_wallet/view_controller";

const controller = new MyWalletViewController({});

const { state_refs, computed_refs, components } = controller.getComponentDefinition();

const { class_styles, content } = controller;

const { BreadcrumbUI, InputUI, ButtonUI, DataTableUI, PaginationUI } = components;

const {
    currencies,
    transactions,
    is_loading_wallets,
    is_loading_transactions,
    has_wallet_error,
    has_transaction_error,
    current_page,
    total_pages,
    total_items
} = state_refs;

const {
    currency,
    wallet,
    currency_input,
    balance,
    balance_class_style,
    balance_parts,
    locked_balance,
    pending_balance,
    transaction_table,
    pagination_props
} = computed_refs;
</script>
