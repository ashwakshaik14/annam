// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Nav() {
//   const [userInfo, setUserInfo] = useState({ username: "", role: "" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const username = localStorage.getItem("username");
//     const role = localStorage.getItem("role");
//     if (username && role) {
//       setUserInfo({ username, role });
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear(); // or remove only specific keys
//     navigate("/login"); // or wherever your login page is
//   };

//   return (
//     <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
//       <ul style={{ listStyle: "none", display: "flex", gap: "20px", alignItems: "center" }}>
//         <li><a href="/quiz">Students Quiz</a></li>
//         <li><a href="/upload">Upload Video</a></li>
//         <li><a href="/quizzes">Edit Quiz</a></li>
//         <li style={{ marginLeft: "auto" }}>
//           👤 <strong>{userInfo.username}</strong> ({userInfo.role})
//         </li>
//         <li>
//           <button onClick={handleLogout} style={{ cursor: "pointer", background: "none", border: "none", color: "blue" }}>
//             🚪 Logout
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Nav;









import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [userInfo, setUserInfo] = useState({ username: "", role: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    if (username && role) {
      setUserInfo({ username, role });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "20px", alignItems: "center" }}>
        {/* Admin Links */}
        {userInfo.role === "admin" && (
          <>
            <li><a href="/quiz">Students Quiz</a></li>
            <li><a href="/upload">Upload Video</a></li>
            <li><a href="/quizzes">Edit Quiz</a></li>
          </>
        )}

        {/* Always show user info and logout */}
        <li style={{ marginLeft: "auto" }}>
          👤 <strong>{userInfo.username}</strong> ({userInfo.role})
        </li>
        <li>
          <button onClick={handleLogout} style={{ cursor: "pointer", background: "none", border: "none", color: "blue" }}>
            🚪 Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
