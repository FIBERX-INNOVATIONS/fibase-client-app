import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
  RouteMeta
} from "vue-router";

const LoginView                         = () => import("@/views/LoginView.vue");

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
                    requires_no_auth: true
                }
            }
        ];
    }

    // Method to expose router so it can be used in main.ts
    public getRouter(): Router { return this.router; }

}

export default RouterManager;