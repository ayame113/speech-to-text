import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { serveDirWithTs } from "https://deno.land/x/ts_serve@v1.4.4/mod.ts";

serve((req) => serveDirWithTs(req));
