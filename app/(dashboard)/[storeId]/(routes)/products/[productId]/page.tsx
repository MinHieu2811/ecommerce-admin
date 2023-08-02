import { Skeleton } from "@/components/ui/skeleton";
import { ProductForm } from "./components";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const products = await prismadb?.product?.findUnique({
    where: {
      id: params?.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb?.category?.findMany({
    where: {
      storeId: params?.storeId,
    },
  });

  const sizes = await prismadb?.size?.findMany({
    where: {
      storeId: params?.storeId,
    },
  });

  const colors = await prismadb?.color?.findMany({
    where: {
      storeId: params?.storeId,
    },
  });

  if (!categories?.length || !colors?.length || !sizes?.length) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={products || null}
        />
      </div>
    </div>
  );
};

export default ProductPage;
