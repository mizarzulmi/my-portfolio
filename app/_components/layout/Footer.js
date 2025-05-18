import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-bg border-t border-custom">
      <div className="custom-w mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm">
            Mizar Zulmi Ramadhan © {new Date().getFullYear()}
          </p>
          <div className="flex gap-6"></div>
        </div>
      </div>
    </footer>
  );
}
