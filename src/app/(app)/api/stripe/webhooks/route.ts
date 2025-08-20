import config from "@payload-config";
import { getPayload } from "payload";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { ExpandedLineItem } from "@/modules/checkout/types";

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (error! instanceof Error) console.error("Webhook Error:", error);

    return NextResponse.json(
      {
        message: `Webhook Error: ${errorMessage}`,
      },
      { status: 400 }
    );
  }

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "account.updated",
  ];

  const payload = await getPayload({
    config,
  });

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      // Handle the event
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as Stripe.Checkout.Session;

          if (!data.metadata?.userId)
            throw new Error("UserId is required in metadata");

          const user = await payload.findByID({
            collection: "users",
            id: data.metadata.userId,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const expandedSession = await stripe.checkout.sessions.retrieve(
            data.id,
            {
              expand: ["line_items.data.price.product"],
            },
            {
              stripeAccount: event.account,
            }
          );

          if (
            !expandedSession.line_items?.data ||
            !expandedSession.line_items.data.length
          ) {
            throw new Error("No line items found in the session");
          }

          const lineItems = expandedSession.line_items
            .data as ExpandedLineItem[];

          for (const item of lineItems) {
            await payload.create({
              collection: "orders",
              data: {
                name: item.price.product.name,
                user: user.id,
                product: item.price.product.metadata.id,
                stripeSessionId: data.id,
                stripeAccountId: event.account as string,
              },
            });
          }
          break;
        case "account.updated":
          data = event.data.object as Stripe.Account;

          await payload.update({
            collection: "tenants",
            where: {
              stripeAccountId: {
                equals: data.id,
              },
            },
            data: {
              stripeDetailsSubmitted: data.details_submitted,
            },
          });
          break;
        default:
          console.warn(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      console.error("Error handling event:", error);
      return NextResponse.json({ message: "Webhook Error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
