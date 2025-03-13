
import NegotationPage from "@/components/pages/NegotationPage";

interface stockParams {
  params: Promise<{symbol: string}>;
 
}

export default async function Page({ params }: stockParams) {
  const { symbol } = await params;

  return (
    <div className="w-full h-full bg-white ">
      <NegotationPage props={{symbol}}/>
    </div>
  );
}
