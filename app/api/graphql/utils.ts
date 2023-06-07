import { PrismaClient } from '@prisma/client';
import { SupabaseClient } from '@supabase/supabase-js';

export interface Context {
    prisma: PrismaClient
    supabase: SupabaseClient
    request: any
}

