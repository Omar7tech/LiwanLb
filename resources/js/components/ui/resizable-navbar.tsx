import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

/* ---------------------- NAVBAR WRAPPER ---------------------- */

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 20);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

/* ---------------------- DESKTOP NAV ---------------------- */

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06)"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{ minWidth: "800px" }}
      className={cn(
        "relative z-60 mx-auto hidden  flex-row items-center justify-between rounded-full bg-transparent px-4 py-2 lg:flex",
        visible && "bg-[#fafafa]/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "inset-0 hidden whitespace-nowrap flex-1 flex-row items-center justify-center space-x-1 text-[20px]  text-[#3A3B3A] lg:flex",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
        prefetch="click"
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-3 py-2"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 rounded-full bg-yellow-500/20"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

interface NavDropdownProps {
  label: string;
  items: Array<{ id: number; name: string; slug: string }>;
  mainLink: string;
  className?: string;
}

export const NavDropdown = ({ label, items, mainLink, className }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative hidden whitespace-nowrap flex-1 flex-row items-center justify-center text-[20px] text-[#3A3B3A] lg:flex",
        className
      )}
      onMouseEnter={() => {
        setIsOpen(true);
        setHovered(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        setHovered(false);
      }}
    >
      <Link
        prefetch="click"
        href={mainLink}
        className="relative px-3 py-2 flex items-center gap-1"
      >
        {hovered && (
          <motion.div
            layoutId="hovered"
            className="absolute inset-0 rounded-full bg-yellow-500/20"
          />
        )}
        <span className="relative z-20">{label}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-20 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </Link>

      <AnimatePresence>
        {isOpen && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full w-[320px] z-100"
          >
            {/* Invisible bridge to prevent gap */}
            <div className="h-2" />
            
            {/* Dropdown Container */}
            <div className="bg-white rounded-lg shadow-xl ring-1 ring-black/5 overflow-hidden p-2 min-w-[280px]">
              
              {/* Items List */}
              <div className="flex flex-col">
                {items.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/work/${item.slug}`}
                    className="group block relative rounded-md hover:bg-neutral-50 transition-colors duration-200"
                  >
                    
                    {/* Content */}
                    <div className="relative px-5 py-3.5 flex items-center justify-between">
                      
                      {/* Work Name - Bigger and cleaner */}
                      <span className="text-lg font-light text-neutral-600 group-hover:text-black transition-colors duration-200 tracking-wide">
                        {item.name}
                      </span>
                      
                      {/* Arrow */}
                      <svg
                        className="w-4 h-4 text-neutral-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------------------- MOBILE NAV ---------------------- */

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible ? "0 0 24px rgba(34, 42, 53, 0.06)" : "none",
        width: visible ? "90%" : "100%",
        borderRadius: visible ? "8px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center bg-transparent py-2 lg:hidden",
        visible && "bg-white/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div className={cn("flex w-full flex-row items-center justify-between px-5", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-18 z-50 flex w-full flex-col gap-4 rounded-sm bg-[#fafafa] px-4 py-8 shadow-sm",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ---------------------- TOGGLE ---------------------- */

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-[#f2ae1d] size-8"  onClick={onClick} />
  ) : (
    <IconMenu2 className="text-[#f2ae1d] size-8" onClick={onClick} />
  );
};

/* ---------------------- LOGO ---------------------- */

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 "
    >
      <img
        src="/images/logo.png"
        alt="logo"
        width={60}
        height={60}
      />

    </a>
  );
};

/* ---------------------- BUTTON ---------------------- */

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "gradient";
} & (React.ComponentPropsWithoutRef<"a"> | React.ComponentPropsWithoutRef<"button">)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white text-[#e19a12]   transition duration-200 inline-block";

  const variantStyles = {
    primary: "shadow bg-white",
    secondary: "bg-transparent shadow-none",
    gradient:
      "bg-gradient-to-b from-primary-gold to-[#e19a12] text-white",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
