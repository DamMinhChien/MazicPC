import { Table, Card } from "react-bootstrap";
import columnLabels from "../../../utils/columnLabels";

const ProductSpecsTable = ({ product }) => {
  if (!product) return null;

  // Lấy danh sách key bỏ qua 12 trường đầu
  const entries = Object.entries(product).slice(15);

  return (
    <Card className="shadow-sm border-0 rounded-4">
      <Card.Body className="p-4">

        <Table bordered hover striped responsive className="align-middle shadow-sm mb-0">
          <tbody>
            {entries.map(([key, value]) => {
              const label = columnLabels[key];
              if (!label) return null;

              // Nếu là boolean -> Có / Không
              if (typeof value === "boolean") value = value ? "Có" : "Không";

              return (
                <tr key={key}>
                  <th className="w-25 fw-bold" 
                  >
                    {label}
                  </th>
                  <td className="text-dark">{String(value)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ProductSpecsTable;
