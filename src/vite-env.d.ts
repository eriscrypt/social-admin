/// <reference types="vite/client" />
/// <reference path="./stores/users.d.ts" />
/// <reference path="./stores/notifications.d.ts" />

interface ApiParams {
  method?: string;
  body?: any;
  headers?: any;
}
