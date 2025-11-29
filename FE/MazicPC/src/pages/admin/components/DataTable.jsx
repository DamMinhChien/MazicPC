import { useState, useEffect, useMemo } from "react";
import { Table, Form, Button } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from "react-icons/fa";
import ButtonIcon from "../../../components/ButtonIcon";
import columnLabels from "../../../utils/columnLabels";
import dayjs from "dayjs";

const DataTable = ({
  data,
  onEdit,
  onDelete,
  pageSize = 10,
  globalFilter,
  onGlobalFilterChange,
  selectedIds,
  onSelectedIdsChange,
  canDelete = true,
  canEdit = true,
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
    // Boolean
    if (typeof value === "boolean")
      return <Form.Check type="checkbox" checked={value} disabled />;

    // Object
    if (typeof value === "object" && value !== null) {
      // Nếu là mảng
      if (Array.isArray(value)) {
        return (
          <Form.Select
            size="sm"
            value={value[0]} // chọn giá trị đầu tiên làm hiển thị
            onChange={(e) => e.preventDefault()} // chặn người dùng thay đổi
          >
            {value.map((item, index) => (
              <option key={index} value={item}>
                {typeof item === "object" ? JSON.stringify(item) : item}
              </option>
            ))}
          </Form.Select>
        );
      }

      const keys = Object.keys(value);
      if (keys.length >= 2) {
        return (
          <Form.Select
            size="sm"
            value={value[keys[0]]}
            onChange={(e) => e.preventDefault()} // chặn người dùng thay đổi
          >
            <option value={value[keys[0]]}>{value[keys[1]]}</option>
          </Form.Select>
        );
      }
      return JSON.stringify(value).slice(0, 10) + "...";
    }

    // String là link ảnh
    if (
      typeof value === "string" &&
      (value.startsWith("http://") || value.startsWith("https://"))
    ) {
      const ext = value.split(".").pop().toLowerCase();
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
      if (imageExtensions.includes(ext)) {
        return <img src={value} alt="" className="img-thumbnail" width={100} />;
      }
      return (
        <a href={value} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      );
    }

    // String là ngày
    if (typeof value === "string" && dayjs(value).isValid()) {
      return dayjs(value).format("DD/MM/YYYY HH:mm:ss");
    }

    return value?.toString();
  };
  // Columns
  const columns = useMemo(() => {
    const baseCols =
      data && data.length > 0
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
                ? selectedIds.filter((x) => x !== id)
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
            {canEdit && (
              <ButtonIcon
                bg="warning"
                label="Sửa"
                size="sm"
                icon={<FaEdit />}
                onClick={() => onEdit(row.original)}
              />
            )}
            {canDelete && (
              <ButtonIcon
                bg="danger"
                label="Xóa"
                size="sm"
                icon={<FaTrash />}
                onClick={() => onDelete(row.original.id)}
              />
            )}
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
            Trang trước
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Trang sau
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
