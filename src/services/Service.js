import MemoryInterface from "./memory/memoryIterface";
import LocalStorageInterface from "./localStorage/localStorageInterface";
import SupabaseInterface from "./supabase/supabaseInterface";

let serviceConf = "LocalStorageInterface";

let service;

switch (serviceConf) {
  case "MemoryInterface":
    service = new MemoryInterface();
    break;
  case "LocalStorageInterface":
    service = new LocalStorageInterface();
    break;
  case "SupabaseInterface":
    service = new SupabaseInterface();
    break;
  default:
    throw new Error("Service iterface not implemented");
}

export default service;