import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  categorySlug?: string | null;
  categoryName?: string | null;
  subCategoryName?: string | null;
}

export const BreadcrumbNavigation = ({
  categorySlug,
  categoryName,
  subCategoryName,
}: Props) => {
  if (!categoryName || categorySlug === "all") {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {subCategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-xl font-medium underline text-black"
              >
                <Link href={`/${categorySlug}`}>{categoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-lg font-medium text-black">
              &gt;
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xl font-medium">
                {subCategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-medium">
              {categoryName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
