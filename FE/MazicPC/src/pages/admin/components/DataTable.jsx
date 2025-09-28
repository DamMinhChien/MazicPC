import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Table, Form, Button } from "react-bootstrap";
import ButtonIcon from "../../../components/ButtonIcon";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const DataTable = ({
  data,
  onEdit,
  onDelete,
  pageSize = 10,
  globalFilter,
  onGlobalFilterChange,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  // auto toggle checkbox "chọn tất cả"
  useEffect(() => {
    setSelectAll(selectedIds.length === data.length);
  }, [selectedIds, data]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageSize: pageSize,
    }));
  }, [pageSize]);

  const renderCell = (value) => {
    if (typeof value === "boolean") {
      return <Form.Check type="checkbox" checked={value} disabled />;
    }
    if (typeof value === "object" && value !== null) {
      const keys = Object.keys(value);
      if (keys.length >= 2) {
        return (
          <Form.Select size="sm" value={value[keys[0]]} disabled>
            <option value={value[keys[0]]}>{value[keys[1]]}</option>
          </Form.Select>
        );
      }
      return JSON.stringify(value).slice(0, 10) + "...";
    }
    return value?.toString();
  };

  const columns = useMemo(() => {
    const baseCols =
      data && data.length > 0
        ? Object.keys(data[0]).map((key) => ({
            header: key,
            accessorKey: key,
            cell: (info) => renderCell(info.getValue()),
          }))
        : [];

    return [
      {
        id: "select",
        header: () => (
          <Form.Check
            type="checkbox"
            checked={selectAll}
            onChange={() => {
              if (selectAll) {
                setSelectedIds([]);
              } else {
                setSelectedIds(data.map((row) => row.id));
              }
              setSelectAll(!selectAll);
            }}
          />
        ),
        cell: ({ row }) => (
          <Form.Check
            type="checkbox"
            checked={selectedIds.includes(row.original.id)}
            onChange={() => {
              const id = row.original.id;
              setSelectedIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              );
            }}
          />
        ),
      },
      ...baseCols,
      {
        id: "actions",
        header: "Thao tác",
        cell: ({ row }) => (
          <div className="d-flex gap-2 justify-content-center">
            <ButtonIcon
              bg={"warning"}
              label="Sửa"
              size="sm"
              onClick={() => onEdit(row.original)}
              icon={<FaEdit />}
            />
            <ButtonIcon
              bg={"danger"}
              label="Xóa"
              size="sm"
              onClick={() => onDelete(row.original.id)}
              icon={<FaTrash />}
            />
          </div>
        ),
      },
    ];
  }, [data, selectAll, selectedIds]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!data || data.length === 0) return <p>Không có dữ liệu</p>;
  return (
    <div className="table-scroll-x">
      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                return (
                  <th
                    key={header.id}
                    style={{ cursor: canSort ? "pointer" : "default" }}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      <span>
                        {canSort && !header.column.getIsSorted() && (
                          <FaSort className="ms-2 text-primary" />
                        )}
                        {header.column.getIsSorted() === "asc" && (
                          <FaSortUp className="ms-2 text-primary" />
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <FaSortDown className="ms-2 text-primary" />
                        )}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="table-group-divider">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td style={{ whiteSpace: "nowrap" }} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* pagination */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div>
          Trang {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount()}
        </div>
        <div className="d-flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
