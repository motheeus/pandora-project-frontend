import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8801",
  headers: {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik1hdGhldXMiLCJzb2JyZW5vbWUiOiJaZW5rZXIiLCJ1c2VybmFtZSI6Im16ZW5rZXJycnIiLCJjYXJnbyI6ImFkbWluIiwiaWF0IjoxNzI4NTI5NjU2LCJleHAiOjE3Mjg3ODg4NTZ9.XWim6bWcCwfCe-2ArOX1te0K46NIPPZI-Gil5pB1cQw`,
  },
});
