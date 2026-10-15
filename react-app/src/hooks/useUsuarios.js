import { useSyncExternalStore } from "react";
import {
  listarUsuarios,
  suscribirUsuarios
} from "../services/db";

export function useUsuarios() {
  return useSyncExternalStore(suscribirUsuarios, listarUsuarios);
}
