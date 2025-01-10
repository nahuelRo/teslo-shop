"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    console.log(name, email, password);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return { ...user, ok: true, message: "Usuario creado" };
  } catch (error) {
    console.log(JSON.stringify(error));
    return {
      ok: false,
      message: "No se pudo crear el usuario",
    };
  }
};
