import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white border-b border-gray-700 px-6 py-3 flex items-center justify-between">
      <Link href={ROUTES.HOME} className="font-bold text-lg hover:opacity-80 transition">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hover:opacity-80 transition"
        >
          <rect width="40" height="40" rx="10" fill="#0D9488" />
          <path d="M12.5 20H27.5" stroke="white" stroke-width="2.5" stroke-linecap="round" />
          <path d="M20 12.5V27.5" stroke="white" stroke-width="2.5" stroke-linecap="round" />
          <path
            d="M23.75 16.25L16.25 23.75"
            stroke="#99F6E4"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <path
            d="M16.25 16.25L23.75 23.75"
            stroke="#99F6E4"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </svg>
      </Link>

      <div className="flex items-center gap-4">
        <select
          className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
          defaultValue="en"
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
        </select>
        <button className="bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 px-3 py-1 rounded text-sm">
          Sign Out
        </button>
      </div>
    </header>
  );
}
