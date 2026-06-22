<template>
    <div :class="class_styles.wrapper_class_style">
        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <section :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.movement_title_text }}
                </h4>

                <ProfileValue icon="bullet_lsit_svg_icon" :label="content_obj.entry_type_label_text" :value="entry_type_text" />
                <ProfileValue
                    icon="arrow_long_right_svg_icon"
                    :label="content_obj.direction_label_text"
                    :value="direction_text"
                />
                <ProfileValue
                    icon="wallet_svg_icon"
                    :label="content_obj.balance_field_label_text"
                    :value="balance_field_text"
                />
                <ProfileValue icon="dollar_currency_svg_icon" :label="content_obj.amount_label_text" :value="amount_text" />
                <ProfileValue
                    icon="arrow_left_short_circle_svg_icon"
                    :label="content_obj.before_label_text"
                    :value="before_balance_text"
                />
                <ProfileValue
                    icon="arrow_right_short_cirlce_svg_icon"
                    :label="content_obj.after_label_text"
                    :value="after_balance_text"
                />
            </section>

            <section :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.context_title_text }}
                </h4>

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.transaction_label_text"
                    :value="transaction_text"
                />
                <ProfileValue icon="wallet_svg_icon" :label="content_obj.wallet_label_text" :value="wallet_text" />
                <ProfileValue icon="member_icon" :label="content_obj.identity_label_text" :value="identity_text" />
                <ProfileValue icon="dollar_currency_svg_icon" :label="content_obj.currency_label_text" :value="currency_text" />
                <ProfileValue icon="clock_svg_icon" :label="content_obj.created_at_label_text" :value="created_at_text" />
                <ProfileValue
                    icon="member_shield_svg_icon"
                    :label="content_obj.created_by_label_text"
                    :value="created_by_text"
                />
            </section>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <section :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.description_title_text }}
                </h4>
                <p :class="class_styles.long_text_class_style">
                    {{ state_refs.profile_record.value?.description || content_obj.no_description_text }}
                </p>
            </section>

            <section :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.reason_title_text }}
                </h4>
                <p :class="class_styles.long_text_class_style">
                    {{ state_refs.profile_record.value?.reason || content_obj.no_reason_text }}
                </p>
            </section>
        </div>

        <section :class="class_styles.grid_class_style?.grid_wrapper_class_style">
            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                {{ content_obj.metadata_title_text }}
            </h4>
            <pre v-if="metadata_text" :class="class_styles.metadata_class_style">{{ metadata_text }}</pre>
            <p v-else :class="class_styles.metadata_empty_class_style">
                {{ content_obj.no_metadata_text }}
            </p>
        </section>
    </div>
</template>

<script setup lang="ts">
import IdentityWalletLedgerProfileViewProps from "@/props_definition/identity_wallet_ledger/profile_view_props";

import IdentityWalletLedgerProfileViewController from "@/controllers/identity_wallet_ledger/profile_view_controller";

const props = defineProps(IdentityWalletLedgerProfileViewProps);

const controller = new IdentityWalletLedgerProfileViewController(props);

const { state_refs, computed_refs, components } = controller.getComponentDefinition();

const { class_styles, content_obj } = controller;

const { ProfileValue } = components;

const {
    entry_type_text,
    direction_text,
    balance_field_text,
    amount_text,
    before_balance_text,
    after_balance_text,
    transaction_text,
    wallet_text,
    identity_text,
    currency_text,
    created_at_text,
    created_by_text,
    metadata_text
} = computed_refs;
</script>
