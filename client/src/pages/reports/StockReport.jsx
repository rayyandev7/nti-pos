import { useEffect, useState } from "react";
import { getStockReport } from "../../services/reportService";

const StockReport = () => {
    const [products, setProducts] = useState([]);
    const [totalInventoryValue, setTotalInventoryValue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStockReport();
    }, []);

    const fetchStockReport = async () => {
        try {
            const data = await getStockReport();
            setProducts(data.products);
            setTotalInventoryValue(data.totalInventoryValue);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div style={{ padding: "25px" }}>
            <h1 style={{ marginBottom: "20px" }}>Stock Report</h1>

            <div
                style={{
                    background: "#2d3748",
                    color: "#fff",
                    padding: "15px 20px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    fontSize: "18px",
                    fontWeight: "bold",
                }}
            >
                Total Inventory Value: Rs.{" "}
                {totalInventoryValue.toLocaleString()}
            </div>

            <div style={{ overflowX: "auto" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr style={{ background: "#1f2937", color: "#fff" }}>
                            <th style={thStyle}>Product</th>
                            <th style={thStyle}>SKU</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Brand</th>
                            <th style={thStyle}>Purchase Price</th>
                            <th style={thStyle}>Selling Price</th>
                            <th style={thStyle}>Current Stock</th>
                            <th style={thStyle}>Stock Value</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td style={tdStyle}>{product.name}</td>
                                <td style={tdStyle}>{product.sku}</td>
                                <td style={tdStyle}>{product.category}</td>
                                <td style={tdStyle}>{product.brand}</td>
                                <td style={tdStyle}>
                                    Rs. {product.purchasePrice}
                                </td>
                                <td style={tdStyle}>
                                    Rs. {product.sellingPrice}
                                </td>
                                <td style={tdStyle}>{product.stock}</td>
                                <td style={tdStyle}>
                                    Rs. {product.stockValue}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const thStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
};

const tdStyle = {
    border: "1px solid #ddd",
    padding: "12px",
};

export default StockReport;