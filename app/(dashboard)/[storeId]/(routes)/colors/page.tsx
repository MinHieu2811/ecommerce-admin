import { format } from "date-fns";
import { ColorColumn } from "./[colorId]/components/columns";
import { ColorClient } from "./components";

const ColorPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb?.color?.findMany({
    where: {
      storeId: params?.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!colors) {
    return null;
  }
  const formattedColors: ColorColumn[] =
    colors?.map((color) => ({
      id: color?.id,
      name: color?.name,
      value: color.value,
      createdAt: format(color?.createdAt, "MMMM do, yyyy"),
    })) || [];
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorPage;
