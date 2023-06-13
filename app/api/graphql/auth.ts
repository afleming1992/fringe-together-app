import supabase from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { User } from "@supabase/supabase-js";

export async function authenticateUser(
    request: Request
): Promise<User | null> {
    const {data: { user } } = await supabase.auth.getUser();
    return user;
}