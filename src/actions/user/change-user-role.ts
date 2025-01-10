"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== "admin")
    return { ok: false, message: "Debe de estar autenticado" };

  try {
    const newRole = role === "admin" ? "admin" : "user";

    const allUsersAdmins = await prisma.user.findMany({
      where: { role: "admin" },
    });

    if (allUsersAdmins.length === 1) {
      return { ok: false, message: "No se puede eliminar el único admin" };
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admins/users");

    return { ok: true };
  } catch (error) {
    console.log(JSON.stringify(error));
    return {
      ok: false,
      message: "No se pudo actualizar el rol del usuario",
    };
  }
};
