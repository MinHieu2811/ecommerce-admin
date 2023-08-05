import { format } from "date-fns";
import { OrderClient } from "./components";
import { formatter } from "@/lib/utils";
import { OrderColumn } from "./components/column";

const OrderPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb?.order?.findMany({
    where: {
      storeId: params?.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!orders) {
    return null;
  }
  const formattedOrders: OrderColumn[] =
    orders?.map((order) => ({
      id: order?.id,
      phone: order?.phone,
      address: order?.address,
      products: order?.orderItems?.map((item) => item?.product?.name)?.join(', '),
      totalPrice: formatter?.format(order?.orderItems?.reduce((total, item) => {
        return total + Number(item?.product?.price)
      }, 0)),
      isPaid: order?.isPaid,
      createdAt: format(order?.createdAt, "MMMM do, yyyy"),
    })) || [];
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrderPage;
