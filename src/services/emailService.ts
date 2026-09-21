import emailjs from "@emailjs/browser";

export interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailSendResult {
  success: boolean;
  message: string;
  recipient: string;
}

export const TARGET_EMAIL = "mohitgujjar2121@gmail.com";

// EmailJS Service Credentials (from .env or hardcoded project defaults)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Dispatches correspondence directly via EmailJS to mohitgujjar2121@gmail.com
 */
export async function sendCorrespondence(
  payload: EmailPayload,
): Promise<EmailSendResult> {
  const templateParams = {
    from_name: payload.name,
    from_email: payload.email,
    name: payload.name,
    email: payload.email,
    reply_to: payload.email,
    to_name: "Mohit",
    to_email: TARGET_EMAIL,
    recipient: TARGET_EMAIL,
    subject: payload.subject,
    message: payload.message,
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      {
        publicKey: PUBLIC_KEY,
      },
    );

    console.log(
      "[EmailJS] Correspondence dispatched successfully:",
      response.status,
      response.text,
    );

    return {
      success: true,
      message: `Your correspondence was successfully delivered to ${TARGET_EMAIL}.`,
      recipient: TARGET_EMAIL,
    };
  } catch (error: any) {
    console.error("[EmailJS] Error during send:", error);
    const errorDetail =
      error?.text || error?.message || "Delivery encountered an issue";
    throw new Error(errorDetail);
  }
}
