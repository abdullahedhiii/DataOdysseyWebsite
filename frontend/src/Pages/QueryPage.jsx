import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FiUpload,
  FiMap,
  FiCode,
  FiCheck,
  FiFileText,
  FiDownload,
} from "react-icons/fi";
import { useUserContext } from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";
import SubmissionWindow from "../Components/SubmissionWindow";

const QueryPage = () => {
  const [selectedDialect, setSelectedDialect] = useState("MySQL");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState([]);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [showSubmissionWindow, setShowSubmissionWindow] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", { selectedDialect, selectedFile });
    
    try {
      const formData = new FormData();
      formData.append("teamName", user.teamName);
      formData.append("email", user.email);
      formData.append("dialect", selectedDialect);
      formData.append("query", selectedQuery.id);
      formData.append("file", selectedFile);
      
      //here response will contain whether the submitted query is correct or accordingly points,leaderboard will be updated
      const response = await axios.post("/api/submitFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setShowSubmissionWindow(true);
    } catch (err) {
      alert("Failed to upload file: " + err.message);
    }
  };

  useEffect(() => {
    if (!user.loggedIn) navigate("/");
    else {
      axios
        .get("/api/queries/" + user.level, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setQueries(res.data.queries);
          setSelectedQuery(res.data.queries[0]);
          alert("found " + res.data.queries.length + " queries for your level");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user, user.loggedIn]);

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FiMap className="text-red-500" />
            Competition Map
          </h2>
          <div className="aspect-video relative bg-gray-800 rounded-lg overflow-hidden">
            <img
              src="/images/sample_map.jpg"
              alt="Competition Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {queries.map((query) => (
            <div
              key={query.id}
              className={`bg-gray-900 rounded-xl p-6 border transition-colors ${
                selectedQuery.id === query.id
                  ? "border-red-500" // Permanent red border if selected
                  : "border-gray-800 hover:border-red-500" // Hover red border if not selected
              }`}
              onClick={() => setSelectedQuery(query)} // Mark query as selected when clicked
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {query.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    query.difficulty === "Hard"
                      ? "bg-red-500/20 text-red-500"
                      : query.difficulty === "Easy"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {query.difficulty}
                </span>
              </div>
              <pre className="bg-gray-800 rounded-lg p-4 text-gray-300 text-sm overflow-x-auto mb-4">
                {query.description}
              </pre>
              <div className="flex justify-between items-center">
                <button
                  className="text-red-500 hover:text-red-400 flex items-center gap-2"
                  onClick={() => console.log("Download PDF")}
                >
                  <FiDownload /> PDF
                </button>
                <button
                  className="text-white hover:text-red-500 flex items-center gap-2"
                  onClick={() => setSelectedQuery(query)}
                >
                  <FiFileText /> Mark Selected
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FiCode className="text-red-500" />
            Submit Solution
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Select Query
                </label>
                <select
                  value={selectedDialect}
                  onChange={(e) => setSelectedDialect(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                  required
                  >
                  <option value="MySQL">MySQL</option>
                  <option value="Oracle">Oracle</option>
                  <option value="NoSQL">NoSQL</option>
                  <option value="Postgres">Postgres</option>
                </select>
              </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Upload Solution File(eg: sol1.txt or sol1.sql)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-800 text-white rounded-lg tracking-wide border border-gray-700 cursor-pointer hover:border-red-500 transition-colors">
                  <FiUpload className="w-8 h-8" />
                  <span className="mt-2 text-base">
                    {selectedFile ? selectedFile.name : "Select a file"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FiCheck className="w-5 h-5" />
              Submit Solution
            </button>
          </form>
        </div>
      </div>
      {showSubmissionWindow && (
        <SubmissionWindow 
          fileName={selectedFile.name} 
          query={selectedQuery} 
          dialect={selectedDialect}
          status = "submitting"
          toggleWindow = {()=>{setShowSubmissionWindow(prev => !prev);}}
        />
      )}
      <div className="fixed top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default QueryPage;
