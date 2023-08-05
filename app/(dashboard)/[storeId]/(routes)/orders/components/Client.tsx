"use client";

import { Heading } from "@/components/common";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./column";
import { DataTable } from "@/components/common";

interface OrderClientProps {
  data: OrderColumn[];
}
export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data?.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};
