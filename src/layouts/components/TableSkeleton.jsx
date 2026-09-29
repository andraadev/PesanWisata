import React, { useEffect } from 'react';

const TableSkeleton = ({ rows = 3, columns = 0 }) => {
  return (
    <>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={`skeleton-${rowIndex}`}>
          {[...Array(columns)].map((_, columnIndex) => (
            <td key={`skeleton-${columnIndex}`}>
              <span className="placeholder col-12 placeholder-wave"></span>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
