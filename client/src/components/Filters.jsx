/* eslint-disable react/prop-types */
import { Box, HStack, IconButton, Select } from "@chakra-ui/react";
import { BsTable, BsBarChartFill } from "react-icons/bs";

const Filters = ({
  frequency,
  setFrequency,
  type,
  setType,
  viewData,
  setViewData,
}) => {
  return (
    <HStack spacing="24px">
      <Box id="frequency">
        <Select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="7" disabled hidden>
            Select Frequency
          </option>
          <option value="7">Last 1 Week</option>
          <option value="30">Last 1 Month</option>
          <option value="180">Last 6 Month</option>
          <option value="365">Last 1 Year</option>
        </Select>
      </Box>
      <Box id="type">
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all" disabled hidden>
            {" "}
            Select Type
          </option>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>
      </Box>
      <HStack
        spacing="10px"
        border="1px solid"
        borderColor="#CBD5E0"
        borderRadius={4}
      >
        <IconButton
          icon={<BsTable />}
          aria-label="Table View"
          onClick={() => setViewData("table")}
          color={viewData === "table" ? "blue" : "gray"}
          backgroundColor="transparent"
          _hover={{ backgroundColor: "transparent" }}
        />
        <IconButton
          icon={<BsBarChartFill />}
          aria-label="Analytics View"
          onClick={() => setViewData("analytics")}
          color={viewData === "analytics" ? "blue" : "gray"}
          backgroundColor="transparent"
          _hover={{ backgroundColor: "transparent" }}
        />
      </HStack>
    </HStack>
  );
};

export default Filters;
