import { Webhook } from "svix";
import { headers } from "next/headers";
import connectToDB from "@/app/api/db/connect";
import Users from "../../models/User";

export async function POST(req) {
  const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!CLERK_WEBHOOK_SIGNING_SECRET) {
    throw new Error(
      "Error: Please add CLERK_WEBHOOK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(CLERK_WEBHOOK_SIGNING_SECRET);

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }
  const eventType = evt.type;
  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const newuser = {
      username: first_name + " " + last_name,
      isVerified: true,
      email: email_addresses[0]?.email_address,
      avatar: image_url,
      clerk_id: id,
    };
    await connectToDB();
    await Users.create(newuser);
    return new Response("Webhook received", { status: 200 });
  }
  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    await connectToDB();
    const found = await Users.findOne({ clerk_id: id });
    if (!found) {
      console.log("No user with the provided id");
      return new Response("Webhook received", { status: 404 });
    }
    const newuser = {
      username: first_name + " " + last_name,
      isVerified: true,
      email: email_addresses[0]?.email_address,
      avatar: image_url,
      clerk_id: id,
    };
    await Users.findByIdAndUpdate(found._id, newuser, {
      new: true,
      runValidators: true,
    });
    console.log("User Successfully updated");
    return new Response("Webhook received", { status: 200 });
  }
  if (eventType === "user.deleted") {
    await connectToDB();
    const { id } = evt.data;
    const found = await Users.findOne({ clerk_id: id });
    if (!found) {
      console.log("USER NOT FOUND");

      return new Response("Webhook received", { status: 404 });
    }
    await Users.findByIdAndDelete(found._id);
    console.log("User Successfully deleted");
    return new Response("Webhook received", { status: 200 });
  }
  return new Response("Webhook received", { status: 200 });
}
