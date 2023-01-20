import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function BasicPagination({ handleChange, total, page }: any) {
  const [width, setWidth] = useState<number>()

  const resizeHandler = () => {
    setWidth(
      window.innerWidth,
    );
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={2}>
        <div className="flex justify-center mb-6">
          <Pagination
            count={total}
            page={parseInt(page)}
            size={typeof window !== 'undefined' && window.innerWidth < 400 ? 'medium' : 'large'}
            onChange={(e, value) => {
              parseInt(page) !== value && handleChange("page", value);
            }}
          />
        </div>
      </Stack>
    </ThemeProvider>
  );
}
