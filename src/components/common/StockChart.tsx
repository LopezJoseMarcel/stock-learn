"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import useStockData from "@/hooks/useStockData";
import { Button } from "@mui/material";

interface StockChartParams {
  params: {
    symbol: string;
  };
}

const StockChart = ({ params }: StockChartParams) => {
  const { stocks, isLoading, hasMore, loadMore, size, setSize } = useStockData(params.symbol);
  

  return (
    <div className="w-full p-4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={stocks}>
          <XAxis hide dataKey="datetime" />
          <YAxis />
          <Tooltip contentStyle={{backgroundColor: '#fff5eb', border: 'none', borderRadius: '16px'}}  
            itemStyle={{color: '#666666', fontWeight:"bold", textAlign:"center"}}
            labelStyle={{color: '#666666', textAlign:"center"}}
            
          />
          <Line type="monotone" dataKey="close" stroke="#ff9d23" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex gap-2">
        
          <Button 
            onClick={loadMore} 
            disabled={!hasMore} 
            className="w-full"
            loading={isLoading}
            variant="outlined"
            sx={{color:'#16c47f', border:"1px solid #16c47f" }}
            >
            Load More
          </Button>
        
          <Button 
            disabled={size < 2 || !hasMore}
            onClick={() => setSize(size - 1)} 
            className="w-full"
            variant="outlined"
            sx={{color:'#16c47f', border:"1px solid #16c47f" }}
            >
            Show less
          </Button>
       
      </div>
    </div>
  );
};

export default StockChart;
