import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
  RouteMeta
} from "vue-router";
import MemberAuthenticatorUtil from "./utils/member_authenticator_util";

const LoginView                         = () => import("@/views/LoginView.vue");
const TwoFactorLoginView                = () => import("@/views/TwoFactorLoginView.vue");
const LogoutView                        = () => import("@/views/LogoutView.vue");
const DashboardView                     = () => import("@/views/DashboardView.vue");
const RegisteredAppListView             = () => import("@/views/registered_app/ListView.vue");

const MyProfileView                     = () => import("@/views/MyProfileView.vue");

class RouterManager {
    public readonly name = "router_manager";
    private routes: RouteRecordRaw[];
    private router: Router;

    constructor() {
        this.routes                     = this.getRoutes();
        this.router                     = this.createRouter();

        this.setupRouterGuards();
    }

    // Method to create the router instance
    private createRouter (): Router  {
        return createRouter({ history: createWebHistory("/"), routes: this.routes });
    }

    // Method to set up route gaurds
    private setupRouterGuards (): void {
        this.router.beforeEach(async (to, from, next) => {
            const route = this.routes.find((el) => el.name === to.name);

            if (!route) {
                console.warn("Route not found, redirecting back...");
                return next(from.fullPath);
            }

            const {
                title_key,
                permission_name = "" as string,
            } = (route.meta || {}) as RouteMeta;

            const is_logged_in              = MemberAuthenticatorUtil.isLoggedIn()
            const is_fully_authenticated    = MemberAuthenticatorUtil.isFullyLoggedIn();
            const has_permission            = permission_name ? MemberAuthenticatorUtil.memberHasPermissionTo((permission_name as string)) : true;

            if (!is_logged_in && route.name !== "Login") {
                return next("/login");
            }
            else if ((is_logged_in && !is_fully_authenticated) && route.name !== "TwoFactorLogin") {
                return next("/two-factor-login");
            }
            else if(is_fully_authenticated && !has_permission) {
                return next("/dashboard"); // change to 404 page later
            }

            return next();
        });
    }

    // Method to get routes array
    private getRoutes (): RouteRecordRaw[] {
        return [
            { 
                path: "/", 
                name: "Home", 
                component: LoginView,
                meta: {
                    title_key: "home-page",
                    permission_name: "", 
                    is_auth_page: true,
                }
            },
            { 
                path: "/login", 
                name: "Login", 
                component: LoginView,
                meta: {
                    title_key: "login-page",
                    permission_name: "", 
                    is_auth_page: true,
                }
            },
            { 
                path: "/two-factor-login", 
                name: "TwoFactorLogin", 
                component: TwoFactorLoginView,
                meta: {
                    title_key: "two-factor-login-page", 
                    permission_name: "", 
                    is_auth_page: true,
                }
            },
            { 
                path: "/logout", 
                name: "Logout", 
                component: LogoutView,
                meta: {
                    title_key: "logout-page", 
                    permission_name: "", 
                    is_auth_page: true,
                }
            },
            { 
                path: "/dashboard", 
                name: "Dashboard", 
                component: DashboardView,
                meta: {
                    title_key: "dashboard-page", 
                    permission_name: "", 
                    is_auth_page: false
                }
            },
            { 
                path: "/registered-apps", 
                name: "RegisteredAppLis", 
                component: RegisteredAppListView,
                meta: {
                    title_key: "registered-app-list-page", 
                    permission_name: "", 
                    is_auth_page: false
                }
            },
            { 
                path: "/my-profile", 
                name: "MyProfile", 
                component: MyProfileView,
                meta: {
                    title_key: "my-profile-page", 
                    permission_name: "", 
                    is_auth_page: false
                }
            },
        ];
    }

    // Method to expose router so it can be used in main.ts
    public getRouter(): Router { return this.router; }

}

export default RouterManager;