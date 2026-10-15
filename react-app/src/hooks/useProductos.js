import { useSyncExternalStore } from "react";
import {
  listarProductos,
  suscribirProductos
} from "../services/db";

export function useProductos() {
  return useSyncExternalStore(suscribirProductos, listarProductos);
}
