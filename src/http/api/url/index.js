import services from "./services";
import endpoints from "./endpoints";
import URL from "./generators";

export const AUTH = new URL(services.auth, endpoints.auth);
export const USER = new URL(services.user, endpoints.user);
export const RESTAURANT = new URL(services.restaurant, endpoints.restaurant);
