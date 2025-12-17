import { Outlet } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import ThemeToggle from './ThemeToggle';
import ScrollReveal from '../common/ScrollReveal';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children || <Outlet />}
      </main>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Eshtari Ltd</p>
        </aside>
      </footer>
    </div>
  );
}
