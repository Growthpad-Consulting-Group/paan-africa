async function postToSlack(message: any) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[slackUtils] SLACK_WEBHOOK_URL not set, skipping Slack notification");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message, username: "PAAN Summit", icon_emoji: ":tada:" }),
    });

    if (!response.ok) {
      console.error("[slackUtils] Slack notification failed:", response.status, await response.text());
    }
  } catch (error) {
    console.error("[slackUtils] Error sending Slack notification:", error);
  }
}

export async function notifyNewTicketPurchaseSlack({
  name,
  email,
  ticketType,
  amount,
  currency,
  company,
  country,
  reference,
}: { name?: any; email?: any; ticketType?: any; amount?: any; currency?: any; company?: any; country?: any; reference?: any }) {
  const message =
    `:tada: *New PAAN Summit Ticket Purchase*\n` +
    `*Name:* ${name || "N/A"}\n` +
    `*Email:* ${email || "N/A"}\n` +
    `*Company:* ${company || "N/A"}\n` +
    `*Country:* ${country || "N/A"}\n` +
    `*Ticket Type:* ${ticketType || "N/A"}\n` +
    `*Amount:* ${currency || ""} ${amount ? (amount / 100).toLocaleString() : "N/A"}\n` +
    `*Reference:* ${reference || "N/A"}`;

  await postToSlack(message);
}

export async function notifyNewExhibitionApplicationSlack({
  companyName,
  contactPerson,
  email,
  phone,
  country,
  industry,
  boothSize,
}: { companyName?: any; contactPerson?: any; email?: any; phone?: any; country?: any; industry?: any; boothSize?: any }) {
  const message =
    `:star2: *New PAAN Summit Exhibition Application*\n` +
    `*Company:* ${companyName || "N/A"}\n` +
    `*Contact:* ${contactPerson || "N/A"} (${email || "N/A"})\n` +
    `*Phone:* ${phone || "N/A"}\n` +
    `*Country:* ${country || "N/A"}\n` +
    `*Industry:* ${industry || "N/A"}\n` +
    `*Preferred Booth Size:* ${boothSize || "N/A"}`;

  await postToSlack(message);
}

export async function notifyNewSpeakerApplicationSlack({
  fullName,
  email,
  phone,
  organization,
  jobTitle,
  country,
  sessionTitle,
  sessionType,
}: { fullName?: any; email?: any; phone?: any; organization?: any; jobTitle?: any; country?: any; sessionTitle?: any; sessionType?: any }) {
  const message =
    `*New PAAN Summit Speaker Application*\n` +
    `*Name:* ${fullName || "N/A"}\n` +
    `*Contact:* ${email || "N/A"} (${phone || "N/A"})\n` +
    `*Organization:* ${organization || "N/A"}\n` +
    `*Job Title:* ${jobTitle || "N/A"}\n` +
    `*Country:* ${country || "N/A"}\n` +
    `*Session:* ${sessionTitle || "N/A"} (${sessionType || "N/A"})`;

  await postToSlack(message);
}

export async function notifyNewAgencyContactSlack({
  name,
  email,
  company,
  agency,
  message: enquiryMessage,
}: { name?: any; email?: any; company?: any; agency?: any; message?: any }) {
  const message =
    `:email: *New Agency Contact Enquiry*\n` +
    `*Agency:* ${agency || "N/A"}\n` +
    `*Contact:* ${name || "N/A"} (${email || "N/A"})\n` +
    `*Company:* ${company || "N/A"}\n` +
    `*Message:* ${enquiryMessage || "N/A"}`;

  await postToSlack(message);
}
