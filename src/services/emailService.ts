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

/**
 * Dispatches correspondence directly via EmailJS to mohitgujjar2121@gmail.com
 */
export async function sendCorrespondence(
  payload: EmailPayload,
): Promise<EmailSendResult> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "EmailJS credentials missing. Please check VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env.",
    );
  }

  const templateParams = {
    name: `Portfolio Reply from ${payload.name}`,
    email: TARGET_EMAIL,
    message: `Name: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\nMessage: ${payload.message}`,
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, {
      publicKey: publicKey,
    });

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
