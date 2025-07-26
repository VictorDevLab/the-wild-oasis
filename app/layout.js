import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
//import global styles in the layout
import "@/app/_styles/globals.css"
import {Josefin_Sans} from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap"
})

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "The Wild Oasis"
  },
  description: "Luxurious cabin hotels located in the heart of Sahara Desert in Africa"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className}  bg-primary-950 text-primary-100 min-h-screen`}>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by the Wild Oasis</footer>
      </body>
    </html>
  );
}
