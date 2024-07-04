import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

const CardInfo = ({ budgetList }) => {
  
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    budgetList && calculateTotalBudget();
  }, [budgetList]);

  const calculateTotalBudget = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((item) => {
      totalBudget_ += Number(item.amount);
      totalSpend_ += item.totalSpend;
    });
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  const cardInfoList = [
    {
      id: 1,
      name: "Total Budget",
      amount: totalBudget,
      icon: (
        <PiggyBank
          className={`w-12 h-12 p-3 bg-primary rounded-full text-white`}
        />
      ),
    },
    {
      id: 2,
      name: "Total Spend",
      amount: totalSpend,
      icon: (
        <ReceiptText className="w-12 h-12 p-3 bg-primary rounded-full text-white" />
      ),
    },
    {
      id: 3,
      name: "No. Of Budget",
      amount: budgetList?.length,
      icon: (
        <Wallet className="w-12 h-12 p-3 bg-primary rounded-full text-white" />
      ),
    },
  ];

  return (
    <div>
      {budgetList.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cardInfoList.map((item) => (
            <div
              key={item.id}
              className="p-7 border rounded-lg flex items-center justify-between"
            >
              <div>
                <h2 className="text-sm">{item.name}</h2>
                <h2 className="text-2xl font-bold">${item.amount}</h2>
              </div>
              {item.icon}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cardInfoList.map((_, index) => (
            <div
              key={index}
              className="w-full h-[150px] bg-slate-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardInfo;
