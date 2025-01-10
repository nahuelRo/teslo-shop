export const revalidate = 60; // 60 seconds

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import type { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page } = await searchParams;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: page ? +page : 1,
    gender: gender as Gender,
  });

  if (products.length === 0) redirect(`/gender/${gender}`);

  const labels: Record<string, string> = {
    men: "para Hombres",
    women: "para Mujeres",
    kid: "para Niños",
    unisex: "para todos",
  };

  if (!Object.keys(labels).includes(gender)) {
    notFound();
  }

  return (
    <div>
      <>
        <Title
          title={`Articulos de ${labels[gender]}`}
          subtitle="Todos los productos"
          className="mb-2"
        />

        <ProductGrid products={products} />

        <Pagination totalPages={totalPages} />
      </>
    </div>
  );
}
