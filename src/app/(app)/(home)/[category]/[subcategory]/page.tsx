interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { category, subcategory } = await params;
  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Category Page: {category}</h1> /
      <h2 className="text-xl">Subcategory Page: {subcategory}</h2>
    </div>
  );
};

export default Page;
