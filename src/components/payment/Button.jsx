/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import cn from "../../utils/classNames";

export default function Button({
  isLoading,
  loadingText,
  children,
  icon,
  className,
  disabled,
  onClick,
  outline,
  theme = "none", // Default theme is 'none'
  ...rest
}) {
  const getThemeStyles = () => {
    switch (theme) {
      case "primary":
        return {
          base: cn("text-white bg-co-primary", "border-co-primary"),
          hover: cn("hover:bg-white hover:text-co-primary"),
        };
      case "secondary":
        return {
          base: cn("text-white bg-co-secondary", "border-co-secondary"),
          hover: cn("hover:bg-white hover:text-co-secondary"),
        };
      default:
        return {
          base: cn("text-co-black bg-transparent", "border-co-gray"),
          hover: cn("hover:bg-co-black"),
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center gap-1 justify-center",
        "px-4 py-2",
        "text-sm font-bold",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "transition duration-200 ease-in-out",
        "border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-black disabled:hover:bg-gray-700 disabled:hover:text-black",
        outline ? themeStyles.base : "focus:border-co-black",
        outline ? themeStyles.hover : "hover:bg-co-gray",
        className || "",
      )}
      {...rest}
    >
      {isLoading && (
        <div className="w-4 h-4 border-4 bg-transparent border-l-blue-700 rounded-full animate-spin" />
      )}
      {icon}
      {isLoading ? loadingText : children}
    </button>
  );
}
