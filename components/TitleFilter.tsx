import React from "react";
import { Input, Tooltip } from "@mantine/core";
import { Search } from "tabler-icons-react";

export default function TitleInput({ setTitle, title }: any) {
  return (
    <Input
      rightSection={
        <Tooltip label="Filter by Title" position="top-end" withArrow className="text-gray-600">
          <div>
            <Search size={18} style={{ display: "block", opacity: 0.5 }} />
          </div>
        </Tooltip>
      }
      placeholder="Title"
      value={title}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}
    />
  );
}
