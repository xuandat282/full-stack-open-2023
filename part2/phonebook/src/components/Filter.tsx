import React from "react";

interface FilterProps {
  filter: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter = ({ filter, handleFilterChange }: FilterProps) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
