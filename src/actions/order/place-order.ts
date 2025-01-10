"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  try {
    // Verificar session de usuario
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return { ok: false, message: "No hay session de usuario" };
    }

    // Obtener la informacion de los productos
    // Recuerden que podemos llevar 2+ productos con el mismo ID
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds.map((product) => product.productId),
        },
      },
    });

    // Calcular los montos // Encabezado
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

    // Los totales de tax, subtotal y total
    const { subTotal, tax, total } = productIds.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find((p) => p.id === item.productId);

        if (!product) throw new Error(`${item.productId} no existe - 500`);

        const subtotal = product.price * productQuantity;
        totals.subTotal += subtotal;
        totals.tax += subtotal * 0.15;
        totals.total += subtotal * 1.15;

        return totals;
      },
      {
        subTotal: 0,
        tax: 0,
        total: 0,
      }
    );

    // Crear la transacción de base de datos
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductPromises = products.map((product) => {
        // Acumular los valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida - 500`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity, no hacer esto
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductPromises);

      // Verificar valores negativos en la existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validar si el price es cero, entonces, lanzar error

      // 3. Crear la dirección de la orden
      const { country, ...rest } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...rest,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        updatedProducts,
        order,
        orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
    };
  } catch (error) {
    console.log(JSON.stringify(error));
    return { ok: false, message: "Error al crear la orden" };
  }
};
