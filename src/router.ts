import { createRouter, createWebHistory, Router, RouteRecordRaw, RouteMeta } from "vue-router";
import MemberAuthenticatorUtil from "./utils/member_authenticator_util";

const LoginView = () => import("@/views/auth/LoginView.vue");
const TwoFactorLoginView = () => import("@/views/auth/TwoFactorLoginView.vue");
const LogoutView = () => import("@/views/auth/LogoutView.vue");
const DashboardView = () => import("@/views/DashboardView.vue");
const RegisteredAppListView = () => import("@/views/registered_app/ListView.vue");
const CurrencyListView = () => import("@/views/currency/ListView.vue");
const PaymentMethodListView = () => import("@/views/payment_method/ListView.vue");

const MyProfileView = () => import("@/views/MyProfileView.vue");

class RouterManager {
    public readonly name = "router_manager";
    private routes: RouteRecordRaw[];
    private router: Router;

    constructor() {
        this.routes = this.getRoutes();
        this.router = this.createRouter();

        this.setupRouterGuards();
    }

    // Method to create the router instance
    private createRouter(): Router {
        return createRouter({ history: createWebHistory("/"), routes: this.routes });
    }

    // Method to set up route gaurds
    private setupRouterGuards(): void {
        this.router.beforeEach(async (to, from, next) => {
            const route = this.routes.find((el) => el.name === to.name);

            if (!route) {
                console.warn("Route not found, redirecting back...");
                return next(from.fullPath);
            }

            const { title_key, permission_name = "" as string } = (route.meta || {}) as RouteMeta;

            const is_logged_in = MemberAuthenticatorUtil.isLoggedIn();
            const is_fully_authenticated = MemberAuthenticatorUtil.isFullyLoggedIn();
            const has_permission = permission_name
                ? MemberAuthenticatorUtil.memberHasPermissionTo(permission_name as string)
                : true;

            if (!is_logged_in && route.name !== "Login") {
                return next("/login");
            } else if (is_logged_in && !is_fully_authenticated && route.name !== "TwoFactorLogin") {
                return next("/two-factor-login");
            } else if (is_fully_authenticated && !has_permission) {
                return next("/dashboard"); // change to 404 page later
            }

            return next();
        });
    }

    // Method to get routes array
    private getRoutes(): RouteRecordRaw[] {
        return [
            {
                path: "/",
                name: "Home",
                component: LoginView,
                meta: {
                    page_meta_key: "home_page",
                    title_key: "home_page",
                    permission_name: "",
                    is_auth_page: true
                }
            },
            {
                path: "/login",
                name: "Login",
                component: LoginView,
                meta: {
                    page_meta_key: "login_page",
                    title_key: "login_page",
                    permission_name: "",
                    is_auth_page: true
                }
            },
            {
                path: "/two-factor-login",
                name: "TwoFactorLogin",
                component: TwoFactorLoginView,
                meta: {
                    page_meta_key: "two_factor_login_page",
                    title_key: "two_factor_login_page",
                    permission_name: "",
                    is_auth_page: true
                }
            },
            {
                path: "/logout",
                name: "Logout",
                component: LogoutView,
                meta: {
                    page_meta_key: "logout_page",
                    title_key: "logout_page",
                    permission_name: "",
                    is_auth_page: true
                }
            },
            {
                path: "/dashboard",
                name: "Dashboard",
                component: DashboardView,
                meta: {
                    page_meta_key: "dashboard_page",
                    title_key: "dashboard_page",
                    permission_name: "",
                    is_auth_page: false
                }
            },
            {
                path: "/registered-apps",
                name: "RegisteredAppList",
                component: RegisteredAppListView,
                meta: {
                    page_meta_key: "registered_app_page",
                    title_key: "registered_app_page",
                    permission_name: "registered_app_module.get_registered_app_list",
                    is_auth_page: false
                }
            },
            {
                path: "/currencies",
                name: "CurrencyList",
                component: CurrencyListView,
                meta: {
                    page_meta_key: "currency_page",
                    title_key: "currency_page",
                    permission_name: "currency_module.get_currency_list",
                    is_auth_page: false
                }
            },
            {
                path: "/payment-config/methods",
                name: "PaymentMethodList",
                component: PaymentMethodListView,
                meta: {
                    page_meta_key: "payment_method_page",
                    title_key: "payment_method_page",
                    permission_name: "payment_method_module.get_payment_method_list",
                    is_auth_page: false
                }
            },
            {
                path: "/my-profile",
                name: "MyProfile",
                component: MyProfileView,
                meta: {
                    page_meta_key: "my_profile_page",
                    title_key: "my_profile_page",
                    permission_name: "",
                    is_auth_page: false
                }
            }
        ];
    }

    // Method to expose router so it can be used in main.ts
    public getRouter(): Router {
        return this.router;
    }
}

export default RouterManager;
