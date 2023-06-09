import { User } from "@prisma/client";
import supabase from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function authenticateUser(
    request: Request
): Promise<User | null> {
    const header = request.headers.get('authorization');
    if (header != null) {
        const token = header.split(' ')[1]

        const { data, error } = await supabase.auth.getUser(token);
        console.log(data);

        if(error || !data) {
            return null;
        }

        return await prisma.user.findFirst({where: { uid: data.user.id }});
    }
    return null;
}