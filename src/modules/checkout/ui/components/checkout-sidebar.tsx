import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";

interface Props {
  total: number;
  onPurchase: () => void;
  isCancelled?: boolean;
  disabled?: boolean;
}

export const CheckoutSidebar = ({
  total,
  onPurchase,
  isCancelled = false,
  disabled = false,
}: Props) => {
  return (
    <div className="bg-white border rounded-md overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">Total</h2>
        <p className="text-lg font-medium">{formatCurrency(total)}</p>
      </div>
      <div className="flex items-center justify-center p-4">
        <Button
          variant="elevated"
          onClick={onPurchase}
          disabled={disabled}
          size="lg"
          className="text-base w-full disabled:opacity-50"
        >
          Checkout
        </Button>
      </div>
      {isCancelled && (
        <div className="p-4 flex justify-center items-center border-t">
          <div className="bg-red-100 border border-red-400 font-medium px-4 py-3 rounded flex items-center w-full">
            <div className="flex items-center">
              <CircleXIcon className="mr-2 size-6 fill-red-500 text-red-100" />
              <span>Checkout Failed. Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
