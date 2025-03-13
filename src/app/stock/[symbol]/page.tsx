import StockInfoPage from "@/components/pages/StockInfoPage";

interface stockParams {
  params: Promise<{symbol: string}>;
 
}

export default async function Page({ params }: stockParams) {
  const { symbol } = await params;

  return (
    <div className="w-full h-full bg-white ">
      <StockInfoPage symbol={symbol}/>
    </div>
  );
}
