import Banner from "@/Components/Home/Banner";
import Navbar from "@/shared/Navbar";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />

      <Toaster />
    </div>
  );
}
