import "../globals.css";
import Structure from "./components/Structure";
import NextAuthProviders from "../providers/NextAuthProviders";
import EditModal from "./(routes)/users/[userId]/components/EditModal";
import SpeakModal from "../providers/SpeakModal";


export default function SiteLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
      <NextAuthProviders>   
          <SpeakModal />
          <EditModal />
          <Structure>
            {children}
          </Structure>
      </NextAuthProviders>
      </>
    );
  }