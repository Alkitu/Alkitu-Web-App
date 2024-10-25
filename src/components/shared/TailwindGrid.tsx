import { cn } from "@/lib/utils";

type GapSize =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96;
type ColorOption = "red" | "blue" | "yellow" | "orange" | "purple" | "green";

type MaxWidthOption = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "";

type PaddingOption = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "";

type TailwindGridProps = {
  children: React.ReactNode;
  show?: boolean;
  fullSize?: boolean;
  className?: string;
  gapX?: GapSize;
  mdGapX?: GapSize;
  lgGapX?: GapSize;
  gapY?: GapSize;
  mdGapY?: GapSize;
  lgGapY?: GapSize;
  bgColor?: ColorOption;
  maxWidth?: MaxWidthOption;
  mdMaxWidth?: MaxWidthOption;
  lgMaxWidth?: MaxWidthOption;
  padding?: PaddingOption;
};

function TailwindGrid({
  children,
  show = false,
  className,
  fullSize = false,
  gapX = 4,
  mdGapX = 6,
  lgGapX = 6,
  gapY = 0,
  mdGapY = 0,
  lgGapY = 0,
  bgColor = "blue",
  maxWidth = "",
  mdMaxWidth = "",
  lgMaxWidth = "",
  padding = "xs",
}: TailwindGridProps) {
  const gapXClasses = {
    0: "gap-x-0",
    0.5: "gap-x-0.5",
    1: "gap-x-1",
    1.5: "gap-x-1.5",
    2: "gap-x-2",
    2.5: "gap-x-2.5",
    3: "gap-x-3",
    3.5: "gap-x-3.5",
    4: "gap-x-4",
    5: "gap-x-5",
    6: "gap-x-6",
    7: "gap-x-7",
    8: "gap-x-8",
    9: "gap-x-9",
    10: "gap-x-10",
    11: "gap-x-11",
    12: "gap-x-12",
    14: "gap-x-14",
    16: "gap-x-16",
    20: "gap-x-20",
    24: "gap-x-24",
    28: "gap-x-28",
    32: "gap-x-32",
    36: "gap-x-36",
    40: "gap-x-40",
    44: "gap-x-44",
    48: "gap-x-48",
    52: "gap-x-52",
    56: "gap-x-56",
    60: "gap-x-60",
    64: "gap-x-64",
    72: "gap-x-72",
    80: "gap-x-80",
    96: "gap-x-96",
  } as const;

  const mdGapXClasses = {
    0: "md:gap-x-0",
    0.5: "md:gap-x-0.5",
    1: "md:gap-x-1",
    1.5: "md:gap-x-1.5",
    2: "md:gap-x-2",
    2.5: "md:gap-x-2.5",
    3: "md:gap-x-3",
    3.5: "md:gap-x-3.5",
    4: "md:gap-x-4",
    5: "md:gap-x-5",
    6: "md:gap-x-6",
    7: "md:gap-x-7",
    8: "md:gap-x-8",
    9: "md:gap-x-9",
    10: "md:gap-x-10",
    11: "md:gap-x-11",
    12: "md:gap-x-12",
    14: "md:gap-x-14",
    16: "md:gap-x-16",
    20: "md:gap-x-20",
    24: "md:gap-x-24",
    28: "md:gap-x-28",
    32: "md:gap-x-32",
    36: "md:gap-x-36",
    40: "md:gap-x-40",
    44: "md:gap-x-44",
    48: "md:gap-x-48",
    52: "md:gap-x-52",
    56: "md:gap-x-56",
    60: "md:gap-x-60",
    64: "md:gap-x-64",
    72: "md:gap-x-72",
    80: "md:gap-x-80",
    96: "md:gap-x-96",
  } as const;

  const lgGapXClasses = {
    0: "lg:gap-x-0",
    0.5: "lg:gap-x-0.5",
    1: "lg:gap-x-1",
    1.5: "lg:gap-x-1.5",
    2: "lg:gap-x-2",
    2.5: "lg:gap-x-2.5",
    3: "lg:gap-x-3",
    3.5: "lg:gap-x-3.5",
    4: "lg:gap-x-4",
    5: "lg:gap-x-5",
    6: "lg:gap-x-6",
    7: "lg:gap-x-7",
    8: "lg:gap-x-8",
    9: "lg:gap-x-9",
    10: "lg:gap-x-10",
    11: "lg:gap-x-11",
    12: "lg:gap-x-12",
    14: "lg:gap-x-14",
    16: "lg:gap-x-16",
    20: "lg:gap-x-20",
    24: "lg:gap-x-24",
    28: "lg:gap-x-28",
    32: "lg:gap-x-32",
    36: "lg:gap-x-36",
    40: "lg:gap-x-40",
    44: "lg:gap-x-44",
    48: "lg:gap-x-48",
    52: "lg:gap-x-52",
    56: "lg:gap-x-56",
    60: "lg:gap-x-60",
    64: "lg:gap-x-64",
    72: "lg:gap-x-72",
    80: "lg:gap-x-80",
    96: "lg:gap-x-96",
  } as const;

  const gapYClasses = {
    0: "gap-y-0",
    0.5: "gap-y-0.5",
    1: "gap-y-1",
    1.5: "gap-y-1.5",
    2: "gap-y-2",
    2.5: "gap-y-2.5",
    3: "gap-y-3",
    3.5: "gap-y-3.5",
    4: "gap-y-4",
    5: "gap-y-5",
    6: "gap-y-6",
    7: "gap-y-7",
    8: "gap-y-8",
    9: "gap-y-9",
    10: "gap-y-10",
    11: "gap-y-11",
    12: "gap-y-12",
    14: "gap-y-14",
    16: "gap-y-16",
    20: "gap-y-20",
    24: "gap-y-24",
    28: "gap-y-28",
    32: "gap-y-32",
    36: "gap-y-36",
    40: "gap-y-40",
    44: "gap-y-44",
    48: "gap-y-48",
    52: "gap-Y-52",
    56: "gap-Y-56",
    60: "gap-Y-60",
    64: "gap-Y-64",
    72: "gap-Y-72",
    80: "gap-Y-80",
    96: "gap-Y-96",
  } as const;

  const mdGapYClasses = {
    0: "md:gap-Y-0",
    0.5: "md:gap-Y-0.5",
    1: "md:gap-Y-1",
    1.5: "md:gap-Y-1.5",
    2: "md:gap-Y-2",
    2.5: "md:gap-Y-2.5",
    3: "md:gap-Y-3",
    3.5: "md:gap-Y-3.5",
    4: "md:gap-Y-4",
    5: "md:gap-Y-5",
    6: "md:gap-Y-6",
    7: "md:gap-Y-7",
    8: "md:gap-Y-8",
    9: "md:gap-Y-9",
    10: "md:gap-Y-10",
    11: "md:gap-Y-11",
    12: "md:gap-Y-12",
    14: "md:gap-Y-14",
    16: "md:gap-Y-16",
    20: "md:gap-Y-20",
    24: "md:gap-Y-24",
    28: "md:gap-Y-28",
    32: "md:gap-Y-32",
    36: "md:gap-Y-36",
    40: "md:gap-Y-40",
    44: "md:gap-Y-44",
    48: "md:gap-Y-48",
    52: "md:gap-Y-52",
    56: "md:gap-Y-56",
    60: "md:gap-Y-60",
    64: "md:gap-Y-64",
    72: "md:gap-Y-72",
    80: "md:gap-Y-80",
    96: "md:gap-Y-96",
  } as const;

  const lgGapYClasses = {
    0: "lg:gap-y-0",
    0.5: "lg:gap-y-0.5",
    1: "lg:gap-y-1",
    1.5: "lg:gap-y-1.5",
    2: "lg:gap-y-2",
    2.5: "lg:gap-y-2.5",
    3: "lg:gap-y-3",
    3.5: "lg:gap-y-3.5",
    4: "lg:gap-y-4",
    5: "lg:gap-y-5",
    6: "lg:gap-y-6",
    7: "lg:gap-y-7",
    8: "lg:gap-y-8",
    9: "lg:gap-y-9",
    10: "lg:gap-y-10",
    11: "lg:gap-y-11",
    12: "lg:gap-y-12",
    14: "lg:gap-y-14",
    16: "lg:gap-y-16",
    20: "lg:gap-y-20",
    24: "lg:gap-y-24",
    28: "lg:gap-y-28",
    32: "lg:gap-y-32",
    36: "lg:gap-y-36",
    40: "lg:gap-y-40",
    44: "lg:gap-y-44",
    48: "lg:gap-y-48",
    52: "lg:gap-y-52",
    56: "lg:gap-y-56",
    60: "lg:gap-y-60",
    64: "lg:gap-y-64",
    72: "lg:gap-y-72",
    80: "lg:gap-y-80",
    96: "lg:gap-y-96",
  } as const;

  const bgColorClasses: Record<ColorOption, string> = {
    red: "bg-red-200/20",
    blue: "bg-blue-200/20",
    yellow: "bg-yellow-200/20",
    orange: "bg-orange-200/20",
    purple: "bg-purple-200/20",
    green: "bg-green-200/20",
  };

  const maxWidthClasses: Record<MaxWidthOption, string> = {
    xs: "max-w-[320px]",
    sm: "max-w-[640px]",
    md: "max-w-[768px]",
    lg: "max-w-[1024px]",
    xl: "max-w-[1280px]",
    "2xl": "max-w-[1536px]",
    "": "",
  };

  const mdMaxWidthClasses: Record<MaxWidthOption, string> = {
    xs: "md:max-w-[320px]",
    sm: "md:max-w-[640px]",
    md: "md:max-w-[768px]",
    lg: "md:max-w-[1024px]",
    xl: "md:max-w-[1280px]",
    "2xl": "md:max-w-[1536px]",
    "": "",
  };

  const lgMaxWidthClasses: Record<MaxWidthOption, string> = {
    xs: "lg:max-w-[320px]",
    sm: "lg:max-w-[640px]",
    md: "lg:max-w-[768px]",
    lg: "lg:max-w-[1024px]",
    xl: "lg:max-w-[1280px]",
    "2xl": "lg:max-w-[1536px]",
    "": "",
  };

  const paddingClasses: Record<PaddingOption, string> = {
    xs: "px-4 md:px-6 lg:px-8",
    sm: "px-6 md:px-8 lg:px-10",
    md: "px-8 md:px-10 lg:px-12",
    lg: "px-10 md:px-12 lg:px-14",
    xl: "px-12 md:px-14 lg:px-16",
    "2xl": "px-14 md:px-16 lg:px-20",
    "": "",
  };

  const getPadding = () => (fullSize || padding === "" ? "" : padding);

  return (
    <>
      <section
        className={cn(
          "px-4 min-w-[320px]  w-full md:px-6 lg:px-8  bg-red-500/10 z-50 pointer-events-none mx-auto",
          "grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid relative  z-50 justify-center ",
          paddingClasses[getPadding()],
          maxWidthClasses[maxWidth],
          mdMaxWidthClasses[mdMaxWidth],
          lgMaxWidthClasses[lgMaxWidth],
          gapXClasses[gapX],
          mdGapXClasses[mdGapX],
          lgGapXClasses[lgGapX],
          gapYClasses[gapY],
          mdGapYClasses[mdGapY],
          lgGapYClasses[lgGapY]
        )}
      >
        {show && (
          <div
            className={cn(
              "grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid absolute w-full z-50 justify-center box-border mx-auto",
              paddingClasses[getPadding()],
              maxWidthClasses[maxWidth],
              mdMaxWidthClasses[mdMaxWidth],
              lgMaxWidthClasses[lgMaxWidth],
              gapXClasses[gapX],
              mdGapXClasses[mdGapX],
              lgGapXClasses[lgGapX],
              gapYClasses[gapY],
              mdGapYClasses[mdGapY],
              lgGapYClasses[lgGapY]
            )}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-screen text-center text-zinc-900 col-span-1 ",
                  bgColorClasses[bgColor],
                  index >= 4 && index < 8 ? "hidden md:block" : "",
                  index >= 8 ? "hidden lg:block" : ""
                )}
              >
                {index + 1}
              </div>
            ))}
          </div>
        )}
      </section>
      <section
        className={cn(
          paddingClasses[getPadding()],
          "min-w-[320px]  w-full",
          "grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid relative items-center justify-center mx-auto  ",
          maxWidthClasses[maxWidth],
          mdMaxWidthClasses[mdMaxWidth],
          lgMaxWidthClasses[lgMaxWidth],
          gapXClasses[gapX],
          mdGapXClasses[mdGapX],
          lgGapXClasses[lgGapX],
          gapYClasses[gapY],
          mdGapYClasses[mdGapY],
          lgGapYClasses[lgGapY],
          className
        )}
      >
        {children}
      </section>
    </>
  );
}

export default TailwindGrid;
