interface Props {
  params: Promise<{
    category: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { category } = await params;
  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Category Page: {category}</h1>
    </div>
  );
};

export default Page;
