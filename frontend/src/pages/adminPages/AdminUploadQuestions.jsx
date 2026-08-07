import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance"
import { useAuth } from "../../context/AuthContext";

const AdminUploadQuestions = () => {
  const { token } = useAuth();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    if (selected.type !== "text/csv" && !selected.name.endsWith(".csv")) {
      alert("Please select a CSV file.");
      return;
    }

    setFile(selected);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post(
        "/admin/upload-question",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / event.total
            );
            setProgress(percent);
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6 mt-6">

    <h2 className="text-xl font-semibold mb-4">
        CSV Format
    </h2>

    <div className="overflow-x-auto">

        <table className="min-w-full border border-gray-300">

            <thead className="bg-gray-100">

                <tr>
                    <th className="border p-2">category</th>
                    <th className="border p-2">subCategory</th>
                    <th className="border p-2">difficulty</th>
                    <th className="border p-2">question</th>
                    <th className="border p-2">option1</th>
                    <th className="border p-2">option2</th>
                    <th className="border p-2">option3</th>
                    <th className="border p-2">option4</th>
                    <th className="border p-2">correctAnswer</th>
                </tr>

            </thead>

            <tbody>

                <tr>

                    <td className="border p-2">Development</td>

                    <td className="border p-2">Java</td>

                    <td className="border p-2">Easy</td>

                    <td className="border p-2">
                        Who developed Java?
                    </td>

                    <td className="border p-2">
                        James Gosling
                    </td>

                    <td className="border p-2">
                        Dennis Ritchie
                    </td>

                    <td className="border p-2">
                        Bjarne Stroustrup
                    </td>

                    <td className="border p-2">
                        Guido van Rossum
                    </td>

                    <td className="border p-2">
                        James Gosling
                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>

      <div className="bg-white rounded-lg shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Upload Questions CSV
        </h1>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-5"
        />

        {file && (
          <p className="mb-3 text-gray-700">
            Selected File: <strong>{file.name}</strong>
          </p>
        )}

        {loading && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="mt-2">{progress}% Uploaded</p>
          </>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>

      </div>

      {result && (
        <div className="mt-8 bg-white shadow rounded-lg p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Upload Summary
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="bg-blue-100 p-4 rounded">
              <p>Total Rows</p>
              <h3 className="text-2xl font-bold">
                {result.summary.totalRows}
              </h3>
            </div>

            <div className="bg-green-100 p-4 rounded">
              <p>Inserted</p>
              <h3 className="text-2xl font-bold">
                {result.summary.inserted}
              </h3>
            </div>

            <div className="bg-yellow-100 p-4 rounded">
              <p>Invalid</p>
              <h3 className="text-2xl font-bold">
                {result.summary.invalid}
              </h3>
            </div>

            <div className="bg-red-100 p-4 rounded">
              <p>Duplicates</p>
              <h3 className="text-2xl font-bold">
                {result.summary.duplicates}
              </h3>
            </div>

          </div>

          {/* Invalid Rows */}

          {result.invalidRows.length > 0 && (

            <div className="mt-8">

              <h2 className="text-xl font-bold text-red-600 mb-3">
                Invalid Rows
              </h2>

              <table className="w-full border">

                <thead className="bg-gray-200">

                  <tr>

                    <th className="border p-2">Row</th>
                    <th className="border p-2">Reason</th>

                  </tr>

                </thead>

                <tbody>

                  {result.invalidRows.map((item, index) => (

                    <tr key={index}>

                      <td className="border p-2">{item.row}</td>

                      <td className="border p-2">{item.reason}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

          {/* Duplicate Rows */}

          {result.duplicateRows.length > 0 && (

            <div className="mt-8">

              <h2 className="text-xl font-bold text-orange-600 mb-3">
                Duplicate Rows
              </h2>

              <table className="w-full border">

                <thead className="bg-gray-200">

                  <tr>

                    <th className="border p-2">Row</th>

                    <th className="border p-2">Reason</th>

                  </tr>

                </thead>

                <tbody>

                  {result.duplicateRows.map((item, index) => (

                    <tr key={index}>

                      <td className="border p-2">{item.row}</td>

                      <td className="border p-2">{item.reason}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>
      )}

    </div>
  );
};

export default AdminUploadQuestions;