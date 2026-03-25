"use client";

import React, { Children, isValidElement } from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const StickyTabItem = ({ title, id, children }) => {
  return null;
};

const StickyTabs = ({
  children,
  mainNavHeight = '4rem',
  rootClassName = "bg-white text-gray-900 shadow-[0_-20px_40px_-15px_rgba(2,132,199,0.08)]",
  navSpacerClassName = "bg-gradient-to-b from-transparent to-white pointer-events-none",
  sectionClassName = "bg-transparent",
  stickyHeaderContainerClassName = "shadow-sm backdrop-blur-xl bg-white/80",
  headerContentWrapperClassName = "border-t border-white/50",
  headerContentLayoutClassName = "mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8",
  titleClassName = "my-0 text-xl font-bold leading-none md:text-2xl lg:text-3xl text-primary",
  contentLayoutClassName = "",
}) => {
  // To allow elements to slide correctly under the transparent sticky header, 
  // we align top relative to the main navigational height.
  const stickyTopValue = `calc(${mainNavHeight} - 1px)`;
  const navHeightStyle = { height: mainNavHeight };
  const stickyHeaderStyle = { top: stickyTopValue };

  return (
    <div className={cn("", rootClassName)}>
      <div
        className={cn(
          "sticky left-0 top-0 z-[60] w-full",
          navSpacerClassName
        )}
        style={navHeightStyle}
        aria-hidden="true"
      />

      {Children.map(children, (child) => {
        if (!isValidElement(child) || child.type !== StickyTabItem) {
          if (process.env.NODE_ENV === 'development' && child != null) {
            console.warn('StickyTabs component expects <StickyTabs.Item> components as direct children.');
          }
          return null;
        }

        const { title, id, children: itemContent } = child.props;

        return (
          <section
            key={id || title}
            className={cn(
              "relative",
              sectionClassName
            )}
          >
            <div
              className={cn(
                "sticky z-[50] -mt-px flex flex-col",
                stickyHeaderContainerClassName
              )}
              style={stickyHeaderStyle}
            >
              <div className={cn(headerContentWrapperClassName)}>
                <div className={cn(headerContentLayoutClassName)}>
                  <div className="flex items-center justify-between">
                    <h2 className={cn(titleClassName)}>
                      {title}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className={cn(contentLayoutClassName)}>
              {itemContent}
            </div>
          </section>
        );
      })}
    </div>
  );
};

StickyTabs.Item = StickyTabItem;

export default StickyTabs;
