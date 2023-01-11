import { Rating, Group, Stack } from "@mantine/core";
import React from "react";

export default function StarRating({ setRating, rating, readOnly }: any) {
  return (
    <Stack>
      <Group className="h-full">
        <Rating
          fractions={2}
          size="md"
          className="m-auto"
          onChange={(value: any) => setRating(value)}
          value={rating}
          readOnly={readOnly}
        />
      </Group>
    </Stack>
  );
}
