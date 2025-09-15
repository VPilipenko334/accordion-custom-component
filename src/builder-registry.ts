"use client";
import { builder, Builder } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import Accordion from "./components/Accordion/Accordion";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(Accordion, {
  name: "Accordion",
  inputs: [
    {
      name: "items",
      type: "list",
      defaultValue: [
        {
          title: "First Item",
          content: "<p>This is the content for the first accordion item.</p>",
        },
        {
          title: "Second Item",
          content: "<p>This is the content for the second accordion item.</p>",
        },
        {
          title: "Third Item",
          content: "<p>This is the content for the third accordion item.</p>",
        },
      ],
      subFields: [
        {
          name: "title",
          type: "string",
          defaultValue: "Accordion Item Title",
        },
        {
          name: "content",
          type: "richText",
          defaultValue: "<p>Add your content here...</p>",
        },
      ],
    },
    {
      name: "oneAtATime",
      type: "boolean",
      defaultValue: false,
      helperText: "Only allow one accordion item to be open at a time",
    },
    {
      name: "showCaret",
      type: "boolean",
      defaultValue: true,
      helperText: "Show the expand/collapse arrow",
    },
    {
      name: "caretColor",
      type: "color",
      defaultValue: "#333333",
      helperText: "Color of the caret arrow",
      showIf: 'options.get("showCaret")',
    },
  ],
});
