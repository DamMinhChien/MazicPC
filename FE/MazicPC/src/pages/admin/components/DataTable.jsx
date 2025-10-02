import { useState, useEffect, useMemo } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from "react-icons/fa";
import ButtonIcon from "../../../components/ButtonIcon";
import columnLabels from "../../../utils/columnLabels";

const DataTable = ({
  data,
  onEdit,
  onDelete,
  pageSize = 10,
  globalFilter,
  onGlobalFilterChange,
  selectedIds,
  onSelectedIdsChange,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });

  // Toggle checkbox "select all"
  useEffect(() => {
    setSelectAll(selectedIds.length === data.length && data.length > 0);
    console.log("data:", data);
  }, [selectedIds, data]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageSize }));
  }, [pageSize]);

  // Render cell tùy loại dữ liệu
  const renderCell = (value) => {
    if (typeof value === "boolean") return <Form.Check type="checkbox" checked={value} disabled />;
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

    // Nếu là string và là link ảnh
  if (typeof value === "string" && (value.startsWith("http://") || value.startsWith("https://"))) {
    const ext = value.split(".").pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    if (imageExtensions.includes(ext)) {
      return <img src={value} alt="" className="img-thumbnail" width={100} />;
    }
    // Nếu không phải ảnh, vẫn hiển thị link bình thường
    return <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>;
  }

    return value?.toString();
  };

  // Columns
  const columns = useMemo(() => {
    const baseCols = data && data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          header: columnLabels[key] || key,
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
              if (selectAll) onSelectedIdsChange([]);
              else onSelectedIdsChange(data.map((row) => row.id));
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
              const newSelected = selectedIds.includes(id)
                ? selectedIds.filter(x => x !== id)
                : [...selectedIds, id];
              onSelectedIdsChange(newSelected);
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
              bg="warning"
              label="Sửa"
              size="sm"
              icon={<FaEdit />}
              onClick={() => onEdit(row.original)}
            />
            <ButtonIcon
              bg="danger"
              label="Xóa"
              size="sm"
              icon={<FaTrash />}
              onClick={() => onDelete(row.original.id)}
            />
          </div>
        ),
      },
    ];
  }, [data, selectedIds, selectAll]);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, pagination },
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
                  className="text-nowrap"
                    key={header.id}
                    style={{ cursor: canSort ? "pointer" : "default" }}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      <span>
                        {canSort && !header.column.getIsSorted() && <FaSort className="ms-2 text-primary" />}
                        {header.column.getIsSorted() === "asc" && <FaSortUp className="ms-2 text-primary" />}
                        {header.column.getIsSorted() === "desc" && <FaSortDown className="ms-2 text-primary" />}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="align-middle">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div>
          Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
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
