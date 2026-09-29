const TableError = ({ colSpan, onRetry }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center py-4 text-danger">
        <p className="mb-2">Gagal memuat data. Silakan coba lagi nanti.</p>

        <button type="button" className="btn btn-outline-primary btn-sm" onClick={onRetry}>
          Coba Lagi
        </button>
      </td>
    </tr>
  );
};

export default TableError;
