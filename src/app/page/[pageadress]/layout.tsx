import Header from "@/components/Header/page";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header isHomePage={false} namepage="Trang cá nhân"></Header>
            {children}
        </>
    );
}
