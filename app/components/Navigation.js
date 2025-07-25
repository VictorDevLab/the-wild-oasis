import Link from "next/link";
import Logo from "./Logo";

export default function Navigation() {
    return (
        <div>
            <Logo />
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/cabins">Cabins</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/account">Your account</Link></li>
            </ul>
        </div>
    );
}
