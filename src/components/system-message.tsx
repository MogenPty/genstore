interface Props {
  Icon: React.ExoticComponent<React.SVGProps<SVGSVGElement>>;
  message: string;
}

export const SystemMessage = ({ Icon, message }: Props) => {
  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border border-primary border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full">
        <Icon className="size-12 text-black" />
        <p className="font-medium text-base">{message}</p>
      </div>
    </div>
  );
};
