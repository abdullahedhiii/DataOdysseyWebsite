import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FiUpload,
  FiMap,
  FiCode,
  FiCheck,
  FiDownload,
  FiUnlock,
  FiBookOpen,
  FiChevronDown,
} from "react-icons/fi";
import { useUserContext } from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";
import SubmissionWindow from "../Components/SubmissionWindow";
import Demo from "../Components/Demo";

const QueryPage = () => {
  const [selectedDialect, setSelectedDialect] = useState("mysql");
  const [selectedQuery, setSelectedQuery] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const { user, socket, setUser } = useUserContext();
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [showSubmissionWindow, setShowSubmissionWindow] = useState(false);
  const [showDemo,setDemo] = useState(true);

  const levelChanger = ({ email, level }) => {
    if (email == user.email && level < 8) {
      setUser((prev) => ({ ...prev, level: level }));
      zoomToLevel(2.5, levels[level - 1].x, levels[level - 1].y);
    }
  };

  useEffect(() => {
    if(socket) socket.on("levelUpdated", levelChanger);
    if(user) setDemo(user.firstLogin);
  }, []);



  const fetchQueries = async (e) => {
    axios
      .get(`/api/queries/${user.level}.${user.team_id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setQueries(res.data.queries);
        console.log(res.data.queries);
        //  setSelectedQuery(res.data.queries[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmit = async (e) => {
    // const language = selectedDialect === 'MySql' ? 'mysql' : (selectedDialect === '')
    let db = ''
    if(user.level <= 5){
      if(selectedDialect === 'mysql') db = import.meta.env.VITE_MURDER_DB_MYSQL
      else if(selectedDialect === 'oracle') db = import.meta.env.VITE_MURDER_DB_ORACLE
      else if(selectedDialect === 'postgresql') db = import.meta.env.VITE_MURDER_DB_POSTGRE
      else throw new Error('Invalid dialect found!')
    }
    e.preventDefault();
    console.log('trying to submitt ',db,db + userAnswer); 
    const options = {
      method: "POST",
      url: "https://onecompiler-apis.p.rapidapi.com/api/v1/run",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "onecompiler-apis.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        language: selectedDialect,
        stdin: "",
        files: [
          {
            name: "TestQuery.sql",
            content: db + userAnswer,
          },
        ],
      },
    };

    try {
      const testRes = await axios.request(options);

      if (testRes.data.exception || testRes.data.stderr ||testRes.data.status == 'failed') {
        alert("invalid query", testRes.data);
        console.log(testRes);
        
        return;
      }
      else console.log(testRes.data);
      

      const response = await axios.post(
        "/api/submitFile",
        JSON.stringify({
          query: selectedQuery,
          email: user.email,
          team_id: user.team_id,
          answer: testRes.data.stdout,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setShowSubmissionWindow(true);
    } catch (err) {
      alert("Failed to upload file: " + err.message);
    }
  };

  let scale = 1; // Initial zoom level
  let offsetX = 0; // Horizontal offset
  let offsetY = 0; // Vertical offset

  const zoomToLevel = (newScale, centerX = 0.5, centerY = 0.5) => {
    scale = newScale;
    const mapImage = document.getElementById("map-image");
    const mapWrapper = document.getElementById("map-wrapper");

    // Calculate offsets to center based on the given coordinates
    const containerWidth = mapWrapper.offsetWidth;
    const containerHeight = mapWrapper.offsetHeight;
    const imageWidth = mapImage.naturalWidth * scale;
    const imageHeight = mapImage.naturalHeight * scale;

    offsetX = containerWidth / 2 - centerX * imageWidth;
    offsetY = containerHeight / 2 - centerY * imageHeight;

    // Apply the transformation
    mapImage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  };
  const levels = [
    { number: 1, x: 0.01, y: 0.01 },
    { number: 2, x: -0.06, y: 0.09 },
    { number: 3, x: -0.06, y: 0.31 },
    { number: 4, x: -0.065, y: 0.4 },
    { number: 5, x: 0.025, y: 0.38 },
    { number: 6, x: 0.25, y: 0.38 },
    { number: 7, x: 0.178, y: 0.054 },
    { number: 8, x: 0.123, y: 0.17 },
  ];
  
  useEffect(() => {
    // zoomToLevel(2.5,0.178,0.053);
    console.log(
      "zooming to current level " +
        levels[user.level - 1].x +
        " " +
        levels[user.level - 1].y
    );
    const currLevel = levels[user.level - 1];
    zoomToLevel(2.5,currLevel.x,currLevel.y)
  }, []);

  useEffect(() => {
    if (!user.loggedIn) navigate("/");
    else {
      fetchQueries();
    }
  }, [user, user.loggedIn]);

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className={`max-w-7xl mx-auto space-y-6`}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FiMap className="text-red-500" />
              Progress Map
            </h2>
            <div
              className="relative bg-gray-800 rounded-lg overflow-hidden flex justify-center items-center"
              style={{ height: "400px" }}
            >
              <div
                className="absolute size-full flex justify-center items-center inset-0"
                id="map-wrapper"
              >
                <img
                  id="map-image"
                  src="/images/sample_map.jpg"
                  alt="Competition Map"
                  className="size-full"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    transformOrigin: "center",
                  }}
                  onClick={() => {
                    zoomToLevel(2, 0.2, 0.2);
                  }}
                />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0"></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FiBookOpen className="text-red-500" />
                  Selected Challenge
                </h2>
                <p className="text-gray-400 mt-1">Level {user.level} Queries</p>
              </div>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-red-500/10 text-red-500">
                {queries.length} Queries Available
              </span>
            </div>

            {selectedQuery.id ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">
                    {selectedQuery.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedQuery.difficulty === "Hard"
                        ? "bg-red-500/20 text-red-500"
                        : selectedQuery.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {selectedQuery.difficulty}
                  </span>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap break-words font-mono">
                    {selectedQuery.description}
                  </pre>
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="relative w-48">
                    <select
                      className="appearance-none w-full px-4 py-2 pr-10 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors outline-none cursor-pointer"
                      onChange={(e) => setSelectedDialect(e.target.value)}
                    >
                      <option value="mysql">MySQL</option>
                      <option value="oracle">Oracle</option>
                      <option value="postgresql">PostgreSQL</option>
                    </select>

                    <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => window.open(selectedQuery.pdfURL, "_blank")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                  >
                    <FiDownload className="text-red-500" />
                    View PDF
                  </button>
                </div>

                <div className="h-full">
                  <textarea
                    name="queryEditor"
                    id="queryEditorId"
                    placeholder="Write your query here"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="bg-white w-full p-4 rounded-lg text-black text-base whitespace-pre-wrap break-words font-mono h-[180px]"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    showSubmissionWindow && "cursor-not-allowed"
                  }`}
                  disabled={showSubmissionWindow}
                  onClick={handleSubmit}
                >
                  <FiCheck className="w-5 h-5" />
                  Submit Solution
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-400">No query selected</p>
            )}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiUnlock className="text-red-500" />
            Available Queries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {queries.map((query) => (
              <button
                key={query.id}
                onClick={() => setSelectedQuery(query)}
                className={`p-4 rounded-lg text-left transition-all h-full ${
                  selectedQuery.id === query.id
                    ? "bg-red-500/10 border-2 border-red-500"
                    : "bg-gray-800 border-2 border-transparent hover:border-red-500/50"
                } `}
                disabled={query.markDone}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">{query.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ml-2 ${
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
                <p className="text-sm text-gray-400 break-words whitespace-pre-wrap line-clamp-3">
                  {query.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiCode className="text-red-500" />
            Submit Solution
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  SQL Dialect
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
                  Solution File
                </label>
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 cursor-pointer hover:border-red-500 transition-colors">
                  <FiUpload className="text-red-500" />
                  <span className="truncate">
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
            </div> */}
        {/* 
            <button
              type="submit"
              className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors ${showSubmissionWindow && 'cursor-not-allowed'}`}
              disabled = {showSubmissionWindow}
            >
              <FiCheck className="w-5 h-5" />
              Submit Solution
            </button>
          </form>
        </div>       */}
      </div>
      
      {
        showDemo && <Demo setDemo={setDemo}/>
      }

      
      {showSubmissionWindow && (
        <SubmissionWindow
          query={selectedQuery}
          dialect={selectedDialect}
          toggleWindow={() => {
            setShowSubmissionWindow((prev) => !prev);
            fetchQueries();
          }}
        />
      )}

      <div className="fixed top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default QueryPage;
