import { redirect } from "next/navigation";

// Clean, shareable URL for social posts: /listings
// Sends people straight to the listings section on the homepage.
export default function ListingsPage() {
  redirect("/#listings");
}
