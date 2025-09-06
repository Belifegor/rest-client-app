import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-card py-4">
      <div className="container mx-auto flex items-center justify-between px-6 text-sm text-muted-foreground">
        <a
          href="https://github.com/Belifegor/rest-client-app/tree/develop"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
        <span>{new Date().getFullYear()}</span>
        <Link href="https://rs.school/courses/reactjs" target="_blank" rel="noopener noreferrer">
          <Image
            src="/rsschool-logo.png"
            alt="RS School Logo"
            width={100}
            height={24}
            className="h-6 w-auto font-semibold hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>
    </footer>
  );
}
