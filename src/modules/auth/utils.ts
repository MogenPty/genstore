import { cookies as getCookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

export const generateAuthCookie = async ({ prefix, value }: Props) => {
  const cookies = await getCookies();
  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
  });
};

export const deleteAuthCookie = async ({ prefix }: Omit<Props, "value">) => {
  const cookies = await getCookies();
  cookies.delete(`${prefix}-token`);
};

export const getAuthCookie = async ({ prefix }: Omit<Props, "value">) => {
  const cookies = await getCookies();
  return cookies.get(`${prefix}-token`)?.value || null;
};
