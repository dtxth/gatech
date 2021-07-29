  export type CalculaterResponse = {
    discount: number;
    discounted_cost: number;
    tax: number;
    total_cost: number;
  };
  
  export type CalculaterRequest = {
    amount: number;
    cost: number;
    region: string;
  };
  
