import { format } from "date-fns";
import { BillboardColumn } from "./[billboardId]/components/columns";
import { BillboardClient } from "./components";

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb?.billboard?.findMany({
    where: {
      storeId: params?.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!billboards) {
    return null;
  }
  const formattedBillboards: BillboardColumn[] =
    billboards?.map((billboard) => ({
      id: billboard?.id,
      label: billboard?.label,
      createdAt: format(billboard?.createdAt, "MMMM do, yyyy"),
    })) || [];
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardPage;
