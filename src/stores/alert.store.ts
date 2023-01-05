import { defineStore } from "pinia";

export interface CustomAlertInterface {
  msg: string;
  type: "error" | "success" | "warning" | "info";
  enabled: boolean;
}

export interface SnackBarInterface {
  msg: string;
  enabled: boolean;
  timeout: number;
}

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    customAlert: {
      msg: "",
      type: "success",
      enabled: false,
    } as CustomAlertInterface,
    snackbarAlert: {
      msg: "",
      enabled: false,
      timeout: 2000, // BUGGED, DOESN'T RESET TIMER ON CHANGE
    } as SnackBarInterface,
  }),
  actions: {
    success(message: any) {
      this.customAlert = { msg: message, type: "success", enabled: true };
    },
    error(message: any) {
      this.customAlert = { msg: message, type: "error", enabled: true };
    },
    info(message: any) {
      this.customAlert = { msg: message, type: "info", enabled: true };
    },
    warning(message: any) {
      this.customAlert = { msg: message, type: "warning", enabled: true };
    },
    clear() {
      const empty = "";
      this.customAlert = { msg: empty, type: "success", enabled: false };
    },
    successSnackbar(message: any) {
      this.clearSnackbar();
      this.snackbarAlert = {
        msg: message,
        enabled: true,
        timeout: 2000,
      };
    },
    clearSnackbar() {
      const empty = "";
      this.snackbarAlert = {
        msg: empty,
        enabled: false,
        timeout: 0,
      };
    },
  },
});
