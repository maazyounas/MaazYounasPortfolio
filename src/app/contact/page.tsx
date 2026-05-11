import { ContactPage, ContactPageData } from "@/features/contact";
import connectDB from "@/lib/server/db";
import Contact from "@/models/Contact";

export const dynamic = "force-dynamic";

export default async function Page() {
  let data: ContactPageData | null = null;

  try {
    await connectDB();
    const rawData = await Contact.findOne().lean();
    data = (rawData ? {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(rawData as any),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _id: String((rawData as any)._id)
    } : null) as unknown as ContactPageData | null;
  } catch (error) {
    console.error("Contact Page Data Fetch Error:", error);
  }

  return <ContactPage initialData={data} />;
}
