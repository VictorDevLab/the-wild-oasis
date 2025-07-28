import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
    return (
        <div className="grid grid-cols-[220px_1fr] h-screen gap-8 pt-12 w-full">
            <SideNavigation />
            {children}
        </div>
    );
}