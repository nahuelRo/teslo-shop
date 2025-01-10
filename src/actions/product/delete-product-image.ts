"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return { ok: false, message: "La URL no es válida" };
  }

  const imageName = imageUrl.split("/").pop()?.split("?")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    // Revalidar los paths
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);

    return { ok: true };
  } catch (error) {
    console.log(JSON.stringify(error));
    return { ok: false, message: "Error al eliminar la imagen" };
  }
};
