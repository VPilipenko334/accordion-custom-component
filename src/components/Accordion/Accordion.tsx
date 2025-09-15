import React, { useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items?: AccordionItem[];
  oneAtATime?: boolean;
  showCaret?: boolean;
  caretColor?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items = [],
  oneAtATime = false,
  showCaret = true,
  caretColor = "#333333",
}) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      // Close the item
      setOpenItems(
        oneAtATime ? [] : openItems.filter((item) => item !== index)
      );
    } else {
      // Open the item
      setOpenItems(oneAtATime ? [index] : [...openItems, index]);
    }
  };

  const isOpen = (index: number) => openItems.includes(index);

  return (
    <div
      className="builder-accordion"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="accordion-item"
          style={{ borderBottom: "1px solid #e0e0e0" }}
        >
          {/* Title with Caret */}
          <div
            className={`builder-accordion-title ${isOpen(index) ? "open" : "closed"}`}
            onClick={() => toggleItem(index)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f9f9f9";
            }}
          >
            <span style={{ flex: 1, fontWeight: "500" }}>{item.title}</span>

            {showCaret && (
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  marginLeft: "8px",
                  transition: "transform 0.2s ease",
                  transform: isOpen(index) ? "rotate(180deg)" : "rotate(0deg)",
                  color: caretColor,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z" />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          {isOpen(index) && (
            <div
              className={`builder-accordion-detail open`}
              style={{
                padding: "16px",
                backgroundColor: "#ffffff",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
