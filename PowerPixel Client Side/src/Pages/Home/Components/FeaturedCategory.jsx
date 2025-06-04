import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const pcTabs = [
  "Laptop Deals",
  "Student Deals",
  "New Arrivals",
  "Bestsellers",
  "Featured",
];

const FeaturedCategory = () => {
  const [value, setValue] = React.useState(2); // Default to 'New Arrivals'

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mt-10 w-full text-center">
      {/* Tab Header */}
      <Box
        sx={{
          backgroundColor: "#ffffff", // Correct raw color
          borderRadius: 1,
          display: "inline-block",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Category Tabs"
          textColor="#555"
          indicatorColor="#555"
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
              minWidth: 120,
              color: "#555",
            },
            "& .Mui-selected": {
              color: "#f97316",
            },
          }}
        >
          {pcTabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
      </Box>

      {/* Dynamic Content */}
      <Box
        className="mt-6 p-6 rounded"
        sx={{
          backgroundColor: "#f9fafb",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {pcTabs[value]}
        </Typography>
        <p style={{ color: "#4B5563" }}>
          This is sample content for <strong>{pcTabs[value]}</strong>
        </p>
      </Box>
    </div>
  );
};

export default FeaturedCategory;
