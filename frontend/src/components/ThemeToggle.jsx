import { useTheme } from "../contexts/ThemeContextBase";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
      <Sun className="swap-on fill-current w-6 h-6" />
      <Moon className="swap-off fill-current w-6 h-6" />
    </label>
  );
};

export default ThemeToggle;
