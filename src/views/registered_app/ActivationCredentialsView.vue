<template>
    <section class="w-full max-w-4xl space-y-5 text-sm text-slate-900">
        <div class="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
            <p class="font-semibold">Save these activation credentials now.</p>
            <p class="mt-1 text-xs leading-5">
                The private key is only shown for this activation response. Copy it before closing
                this modal.
            </p>
        </div>

        <div class="grid gap-3 md:grid-cols-2">
            <CredentialValue label="App ID" :value="safeApp.public_id" @copy="copyText" />
            <CredentialValue label="App Prefix" :value="safeApp.prefix" @copy="copyText" />
            <CredentialValue label="App Name" :value="safeApp.name" @copy="copyText" />
            <CredentialValue label="Base URL" :value="safeApp.base_url" @copy="copyText" />
            <CredentialValue
                label="Key Algorithm"
                :value="safeApp.auth?.key_algorithm"
                @copy="copyText"
            />
            <CredentialValue
                label="Key Version"
                :value="safeApp.auth?.key_version?.toString()"
                @copy="copyText"
            />
            <CredentialValue
                label="Last Key Rotated At"
                :value="safeApp.auth?.last_key_rotated_at"
                @copy="copyText"
            />
        </div>

        <div class="space-y-2">
            <div class="flex items-center justify-between gap-3">
                <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Private Key
                </label>
                <button
                    type="button"
                    class="rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700"
                    @click="copyText(privateKey)"
                    :disabled="!privateKey"
                >
                    {{ copied_value === privateKey ? "Copied" : "Copy" }}
                </button>
            </div>

            <textarea
                readonly
                :value="privateKey || '-'"
                class="min-h-[260px] w-full resize-y rounded-md border border-slate-300 bg-slate-950 p-3 font-mono text-xs leading-5 text-slate-50 outline-none"
            ></textarea>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, ref } from "vue";

import { RegisteredAppStatusUpdateResponseInterface } from "@/types/api_service_type";

const props = defineProps<{
    activation_data: RegisteredAppStatusUpdateResponseInterface;
}>();

const copied_value = ref("");
const safeApp = computed(() => props.activation_data.safe_app);
const privateKey = computed(() => props.activation_data.private_key ?? "");

const copyText = async (value?: string | null): Promise<void> => {
    const text = value ?? "";

    if (!text) {
        return;
    }

    try {
        if (window.navigator.clipboard?.writeText) {
            await window.navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        }

        copied_value.value = text;
        window.setTimeout(() => {
            if (copied_value.value === text) {
                copied_value.value = "";
            }
        }, 2000);
    } catch (error) {
        console.error("Failed to copy activation credential", error);
    }
};

const CredentialValue = defineComponent({
    name: "CredentialValue",
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ""
        }
    },
    emits: ["copy"],
    setup(component_props, { emit }) {
        return () =>
            h("div", { class: "rounded-md border border-slate-200 bg-white p-3" }, [
                h(
                    "p",
                    { class: "mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500" },
                    component_props.label
                ),
                h("div", { class: "flex items-center justify-between gap-2" }, [
                    h(
                        "p",
                        {
                            class: "min-w-0 truncate font-mono text-xs text-slate-900",
                            title: component_props.value || "-"
                        },
                        component_props.value || "-"
                    ),
                    h(
                        "button",
                        {
                            type: "button",
                            class: "shrink-0 rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100",
                            disabled: !component_props.value,
                            onClick: () => emit("copy", component_props.value)
                        },
                        "Copy"
                    )
                ])
            ]);
    }
});
</script>
