import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  // Beta endpoint: replace with HubSpot Forms API or an email provider before launch.
  console.log("Form submission", payload);

  return NextResponse.redirect(new URL("/contact-us?submitted=true", request.url));
}
